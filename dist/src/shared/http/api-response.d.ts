export interface ApiSuccessResponse<TData> {
    success: true;
    data: TData;
}
export interface ApiErrorResponse {
    success: false;
    message: string;
    code: string;
}
export type ApiResponse<TData> = ApiSuccessResponse<TData> | ApiErrorResponse;
export declare function successResponse<TData>(data: TData): ApiSuccessResponse<TData>;
