import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiSuccessResponse, successResponse } from '../../shared/http/api-response';
import { AlertView } from './alert.presenter';
import { AlertService } from './alert.service';
import { UpdateAlertStatusDto } from './dto/update-alert-status.dto';

@Controller('alerts')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Get()
  listAlerts(): ApiSuccessResponse<AlertView[]> {
    return successResponse(this.alertService.listAlerts());
  }

  @Get(':alertId')
  getAlert(@Param('alertId') alertId: string): ApiSuccessResponse<AlertView> {
    return successResponse(this.alertService.getAlert(alertId));
  }

  @Patch(':alertId/status')
  updateStatus(
    @Param('alertId') alertId: string,
    @Body() input: UpdateAlertStatusDto,
  ): ApiSuccessResponse<AlertView> {
    return successResponse(this.alertService.updateStatus(alertId, input));
  }
}
