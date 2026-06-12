import { IsNotEmpty, IsString } from 'class-validator';

export class ChatbotQueryDto {
  @IsString()
  @IsNotEmpty()
  user!: string;

  @IsString()
  @IsNotEmpty()
  investigationId!: string;

  @IsString()
  @IsNotEmpty()
  question!: string;
}
