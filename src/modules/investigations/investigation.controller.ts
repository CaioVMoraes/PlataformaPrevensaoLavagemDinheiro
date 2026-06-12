import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiSuccessResponse, successResponse } from '../../shared/http/api-response';
import { CloseInvestigationDto } from './dto/close-investigation.dto';
import { InvestigationView } from './investigation.presenter';
import { InvestigationService } from './investigation.service';

@Controller('investigations')
export class InvestigationController {
  constructor(private readonly investigationService: InvestigationService) {}

  @Get()
  listInvestigations(): ApiSuccessResponse<InvestigationView[]> {
    return successResponse(this.investigationService.listInvestigations());
  }

  @Get(':investigationId')
  getInvestigation(
    @Param('investigationId') investigationId: string,
  ): ApiSuccessResponse<InvestigationView> {
    return successResponse(this.investigationService.getInvestigation(investigationId));
  }

  @Post(':investigationId/close')
  closeInvestigation(
    @Param('investigationId') investigationId: string,
    @Body() input: CloseInvestigationDto,
  ): ApiSuccessResponse<InvestigationView> {
    return successResponse(this.investigationService.closeInvestigation(investigationId, input));
  }
}
