import { ApiSuccessResponse } from '../../shared/http/api-response';
import { AlertView } from './alert.presenter';
import { AlertService } from './alert.service';
import { UpdateAlertStatusDto } from './dto/update-alert-status.dto';
export declare class AlertController {
    private readonly alertService;
    constructor(alertService: AlertService);
    listAlerts(): ApiSuccessResponse<AlertView[]>;
    getAlert(alertId: string): ApiSuccessResponse<AlertView>;
    updateStatus(alertId: string, input: UpdateAlertStatusDto): ApiSuccessResponse<AlertView>;
}
