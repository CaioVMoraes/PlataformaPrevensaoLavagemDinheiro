import { Module } from '@nestjs/common';
import { AuditModule } from '../audit/audit.module';
import { AlertController } from './alert.controller';
import { AlertRepository } from './alert.repository';
import { AlertService } from './alert.service';

@Module({
  imports: [AuditModule],
  controllers: [AlertController],
  providers: [AlertRepository, AlertService],
  exports: [AlertRepository, AlertService],
})
export class AlertsModule {}
