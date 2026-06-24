import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, TimeoutError, timeout } from 'rxjs';
import { CloseInvestigationDto } from './dto/close-investigation.dto';
import {
  CloseInvestigationPayload,
  GetInvestigationPayload,
  INVESTIGATION_PATTERNS,
} from './investigation.patterns';
import { InvestigationView } from './investigation.presenter';

export const INVESTIGATIONS_CLIENT_TOKEN = 'INVESTIGATIONS_CLIENT_TOKEN';

@Injectable()
export class InvestigationClientService {
  constructor(
    @Inject(INVESTIGATIONS_CLIENT_TOKEN)
    private readonly investigationsClient: ClientProxy,
  ) {}

  listInvestigations(): Promise<InvestigationView[]> {
    return this.request<InvestigationView[]>(INVESTIGATION_PATTERNS.LIST, {});
  }

  getInvestigation(investigationId: string): Promise<InvestigationView> {
    const payload: GetInvestigationPayload = { investigationId };
    return this.request<InvestigationView>(INVESTIGATION_PATTERNS.GET, payload);
  }

  closeInvestigation(
    investigationId: string,
    input: CloseInvestigationDto,
  ): Promise<InvestigationView> {
    const payload: CloseInvestigationPayload = { investigationId, input };
    return this.request<InvestigationView>(INVESTIGATION_PATTERNS.CLOSE, payload);
  }

  // Converts transport-level and remote HTTP-like errors into proper HTTP exceptions.
  private async request<TResponse>(pattern: string, payload: object): Promise<TResponse> {
    try {
      return await firstValueFrom(
        this.investigationsClient.send<TResponse, object>(pattern, payload).pipe(timeout(3000)),
      );
    } catch (error: unknown) {
      this.rethrowAsHttpError(error);
    }
  }

  private rethrowAsHttpError(error: unknown): never {
    if (error instanceof TimeoutError) {
      throw new ServiceUnavailableException('Investigations service timeout');
    }

    if (error instanceof HttpException) {
      throw error;
    }

    const maybeRemoteError = error as {
      status?: number;
      message?: string | string[];
      response?: { message?: string | string[]; error?: string; statusCode?: number };
    };

    const statusCode =
      maybeRemoteError.response?.statusCode ??
      maybeRemoteError.status ??
      HttpStatus.INTERNAL_SERVER_ERROR;

    if (typeof statusCode === 'number') {
      const message =
        maybeRemoteError.response?.message ??
        maybeRemoteError.message ??
        'Investigations service error';
      throw new HttpException(message, statusCode);
    }

    throw new ServiceUnavailableException('Investigations service unavailable');
  }
}