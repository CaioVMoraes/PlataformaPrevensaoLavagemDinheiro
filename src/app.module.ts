import { Module } from '@nestjs/common';
import { AuditModule } from './modules/audit/audit.module';
import { ChatbotModule } from './modules/chatbot/chatbot.module';
import { HealthController } from './modules/health/health.controller';
import { InvestigationsModule } from './modules/investigations/investigations.module';
import { ReportsModule } from './modules/reports/reports.module';
import { AlertsModule } from './modules/alerts/alerts.module';

@Module({
  imports: [AuditModule, AlertsModule, InvestigationsModule, ChatbotModule, ReportsModule],
  controllers: [HealthController],
})
export class AppModule {}
