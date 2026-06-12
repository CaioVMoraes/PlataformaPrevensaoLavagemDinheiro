import { Controller, Get } from '@nestjs/common';
import { ApiSuccessResponse, successResponse } from '../../shared/http/api-response';

interface HealthStatus {
  status: 'ok';
  service: string;
  mockedData: true;
}

@Controller('health')
export class HealthController {
  @Get()
  getHealth(): ApiSuccessResponse<HealthStatus> {
    return successResponse({
      status: 'ok',
      service: 'pld-investigation-api',
      mockedData: true,
    });
  }
}
