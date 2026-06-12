import { Injectable } from '@nestjs/common';
import { AuditEventType } from '../../shared/domain/audit-event-type';
import { AuditService } from '../audit/audit.service';
import { ChatbotQueryDto } from './dto/chatbot-query.dto';
import { ChatbotAnswer } from './chatbot-response';
import { InvestigationService } from '../investigations/investigation.service';

@Injectable()
export class ChatbotService {
  constructor(
    private readonly investigationService: InvestigationService,
    private readonly auditService: AuditService,
  ) {}

  answerQuestion(input: ChatbotQueryDto): ChatbotAnswer {
    const investigation = this.investigationService.getInvestigation(input.investigationId);
    const totalAmount = investigation.alert.reason.includes('fracionadas')
      ? 'ha indagacao sobre fracionamento operacional'
      : 'ha volume financeiro superior ao perfil esperado';

    this.auditService.register({
      user: input.user,
      action: AuditEventType.CHATBOT_QUERY,
      resource: input.investigationId,
      result: 'SUCCESS',
      metadata: {
        question: input.question,
        evidenceCount: String(investigation.evidences.length),
      },
    });

    return {
      investigationId: investigation.id,
      question: input.question,
      answer:
        `A investigacao ${investigation.id} possui risco sugerido ` +
        `${investigation.suggestedRisk}. Pelo contexto mockado, ${totalAmount}.`,
      suggestedRisk: investigation.suggestedRisk,
      evidences: investigation.evidences,
      justification:
        'A sugestao considera evidencias coletadas, perfil do cliente, recorrencia e motivo do alerta. A IA nao encerra o caso nem aprova relatorio.',
      sources: [
        {
          name: 'Investigacao',
          origin: `investigations/${investigation.id}`,
        },
        {
          name: 'Cliente',
          origin: `alerts/${investigation.alert.id}/customer`,
        },
        {
          name: 'Transacoes',
          origin: `alerts/${investigation.alert.id}/transactions`,
        },
        {
          name: 'Normas internas',
          origin: '.ai/business-rules.md#BR-008',
        },
      ],
      humanDecisionRequired: true,
    };
  }
}
