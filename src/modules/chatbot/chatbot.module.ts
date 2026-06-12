import { Module } from '@nestjs/common';
import { AuditModule } from '../audit/audit.module';
import { InvestigationsModule } from '../investigations/investigations.module';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';

@Module({
  imports: [InvestigationsModule, AuditModule],
  controllers: [ChatbotController],
  providers: [ChatbotService],
})
export class ChatbotModule {}
