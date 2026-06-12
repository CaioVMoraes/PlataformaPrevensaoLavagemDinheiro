import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AnalystRole } from '../../../shared/domain/analyst-role';

export class CloseInvestigationDto {
  @IsString()
  @IsNotEmpty()
  user!: string;

  @IsEnum(AnalystRole)
  userRole!: AnalystRole;

  @IsString()
  @IsNotEmpty()
  conclusion!: string;
}
