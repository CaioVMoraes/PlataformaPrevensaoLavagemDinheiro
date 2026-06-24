import { CloseInvestigationDto } from './dto/close-investigation.dto';

export const INVESTIGATION_PATTERNS = {
  LIST: 'investigations.list',
  GET: 'investigations.get',
  CLOSE: 'investigations.close',
} as const;

export interface GetInvestigationPayload {
  investigationId: string;
}

export interface CloseInvestigationPayload {
  investigationId: string;
  input: CloseInvestigationDto;
}