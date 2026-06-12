import { Alert } from '../../shared/domain/alert';
import { AlertStatus } from '../../shared/domain/alert-status';
export declare class AlertRepository {
    private readonly alerts;
    findAll(): Alert[];
    findById(alertId: string): Alert | null;
    updateStatus(alertId: string, status: AlertStatus): Alert | null;
    private cloneAlert;
}
