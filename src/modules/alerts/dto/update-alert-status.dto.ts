import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AlertStatus } from '../../../shared/domain/alert-status';

export class UpdateAlertStatusDto {
  @IsEnum(AlertStatus)
  status!: AlertStatus;

  @IsString()
  @IsNotEmpty()
  user!: string;

  @IsString()
  @IsNotEmpty()
  reason!: string;
}
