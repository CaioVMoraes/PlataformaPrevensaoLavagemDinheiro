import { ApiSuccessResponse } from '../../shared/http/api-response';
interface HealthStatus {
    status: 'ok';
    service: string;
    mockedData: true;
}
export declare class HealthController {
    getHealth(): ApiSuccessResponse<HealthStatus>;
}
export {};
