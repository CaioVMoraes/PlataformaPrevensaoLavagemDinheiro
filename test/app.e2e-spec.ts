import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Server } from 'node:http';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AlertView } from '../src/modules/alerts/alert.presenter';
import { ChatbotAnswer } from '../src/modules/chatbot/chatbot-response';
import { AuditLog } from '../src/shared/database/mock-data';
import { AuditEventType } from '../src/shared/domain/audit-event-type';
import { ApiErrorResponse, ApiSuccessResponse } from '../src/shared/http/api-response';
import { HttpExceptionFilter } from '../src/shared/http/http-exception.filter';

interface HealthStatus {
  status: 'ok';
  service: string;
  mockedData: true;
}

describe('PLD investigation API (e2e)', () => {
  let app: INestApplication;
  let server: Server;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
    server = app.getHttpServer() as Server;
  });

  afterEach(async () => {
    await app.close();
  });

  it('reports that the mocked microservice is healthy', async () => {
    const response = await request(server).get('/health').expect(200);
    const body = response.body as ApiSuccessResponse<HealthStatus>;

    expect(body).toEqual({
      success: true,
      data: {
        status: 'ok',
        service: 'pld-investigation-api',
        mockedData: true,
      },
    });
  });

  it('never exposes unmasked CPF and account data', async () => {
    const response = await request(server).get('/alerts').expect(200);
    const body = response.body as ApiSuccessResponse<AlertView[]>;
    const alert = body.data.find((candidate) => candidate.id === 'ALT-1001');

    expect(alert).toBeDefined();
    expect(alert?.customer.cpf).toBe('123.***.***-45');
    expect(alert?.customer.account).toBe('****5678');
    expect(JSON.stringify(body)).not.toContain('12345678945');
    expect(JSON.stringify(body)).not.toContain('003412345678');
  });

  it('blocks closing an investigation whose report was not reviewed', async () => {
    const response = await request(server)
      .post('/investigations/INV-5002/close')
      .send({
        user: 'Bruno Martins',
        userRole: 'Coordenador PLD',
        conclusion: 'Tentativa de fechamento para validar a regra de negocio.',
      })
      .expect(400);
    const body = response.body as ApiErrorResponse;

    expect(body).toEqual({
      success: false,
      message: 'Report must be reviewed before closing the investigation',
      code: 'REPORT_NOT_REVIEWED',
    });
  });

  it('returns evidence, justification and sources in chatbot answers', async () => {
    const response = await request(server)
      .post('/chatbot/query')
      .send({
        user: 'Camila Rocha',
        investigationId: 'INV-5001',
        question: 'Quais evidencias sustentam o risco sugerido?',
      })
      .expect(201);
    const body = response.body as ApiSuccessResponse<ChatbotAnswer>;

    expect(body.data.investigationId).toBe('INV-5001');
    expect(body.data.evidences).toHaveLength(2);
    expect(body.data.justification).not.toHaveLength(0);
    expect(body.data.sources).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Investigacao' }),
        expect.objectContaining({ name: 'Normas internas' }),
      ]),
    );
    expect(body.data.humanDecisionRequired).toBe(true);
  });

  it('records status changes in the audit trail', async () => {
    await request(server)
      .patch('/alerts/ALT-1002/status')
      .send({
        status: 'IN_ANALYSIS',
        user: 'Equipe avaliadora',
        reason: 'Cenario automatizado da avaliacao final.',
      })
      .expect(200);

    const response = await request(server).get('/audit').expect(200);
    const body = response.body as ApiSuccessResponse<AuditLog[]>;
    const auditLog = body.data.find(
      (candidate) =>
        candidate.action === AuditEventType.STATUS_CHANGED && candidate.resource === 'ALT-1002',
    );

    expect(auditLog).toMatchObject({
      user: 'Equipe avaliadora',
      action: AuditEventType.STATUS_CHANGED,
      resource: 'ALT-1002',
      result: 'SUCCESS',
      metadata: {
        reason: 'Cenario automatizado da avaliacao final.',
        previousStatus: 'PENDING',
        newStatus: 'IN_ANALYSIS',
      },
    });
  });
});
