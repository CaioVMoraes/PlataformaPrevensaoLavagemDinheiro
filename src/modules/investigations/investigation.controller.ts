import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiSuccessResponse, successResponse } from '../../shared/http/api-response';
import { CloseInvestigationDto } from './dto/close-investigation.dto';
import { InvestigationClientService } from './investigation.client.service';
import { InvestigationView } from './investigation.presenter';

@Controller('investigations')
export class InvestigationController {
  constructor(private readonly investigationClientService: InvestigationClientService) {}

  @Get()
  async listInvestigations(): Promise<ApiSuccessResponse<InvestigationView[]>> {
    // API HTTP -> microservice call boundary.
    return successResponse(await this.investigationClientService.listInvestigations());
  }

  @Get(':investigationId')
  async getInvestigation(
    @Param('investigationId') investigationId: string,
  ): Promise<ApiSuccessResponse<InvestigationView>> {
    return successResponse(
      await this.investigationClientService.getInvestigation(investigationId),
    );
  }

  @Post(':investigationId/close')
  async closeInvestigation(
    @Param('investigationId') investigationId: string,
    @Body() input: CloseInvestigationDto,
  ): Promise<ApiSuccessResponse<InvestigationView>> {
    return successResponse(
      await this.investigationClientService.closeInvestigation(investigationId, input),
    );
  }
}
