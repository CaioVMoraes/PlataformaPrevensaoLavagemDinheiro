import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CloseInvestigationDto } from './dto/close-investigation.dto';
import {
  CloseInvestigationPayload,
  GetInvestigationPayload,
  INVESTIGATION_PATTERNS,
} from './investigation.patterns';
import { InvestigationView } from './investigation.presenter';
import { InvestigationService } from './investigation.service';

@Controller()
export class InvestigationMicroserviceController {
  constructor(private readonly investigationService: InvestigationService) {}

  @MessagePattern(INVESTIGATION_PATTERNS.LIST)
  listInvestigations(): InvestigationView[] {
    return this.investigationService.listInvestigations();
  }

  @MessagePattern(INVESTIGATION_PATTERNS.GET)
  getInvestigation(@Payload() payload: GetInvestigationPayload): InvestigationView {
    return this.investigationService.getInvestigation(payload.investigationId);
  }

  @MessagePattern(INVESTIGATION_PATTERNS.CLOSE)
  closeInvestigation(@Payload() payload: CloseInvestigationPayload): InvestigationView {
    return this.investigationService.closeInvestigation(
      payload.investigationId,
      payload.input as CloseInvestigationDto,
    );
  }
}