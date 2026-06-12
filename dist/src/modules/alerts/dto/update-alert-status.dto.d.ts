import { AlertStatus } from '../../../shared/domain/alert-status';
export declare class UpdateAlertStatusDto {
    status: AlertStatus;
    user: string;
    reason: string;
}
