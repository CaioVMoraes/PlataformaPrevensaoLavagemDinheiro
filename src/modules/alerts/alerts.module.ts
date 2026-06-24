import { Module } from '@nestjs/common';
import { AuditModule } from '../audit/audit.module';
import { AlertController } from './alert.controller';
import { AlertRepository } from './alert.repository';
import { ALERT_REPOSITORY_TOKEN } from './alert.repository.interface';
import { AlertService } from './alert.service';

@Module({
  imports: [AuditModule],
  controllers: [AlertController],
  providers: [
    AlertService,
    {
      provide: ALERT_REPOSITORY_TOKEN,
      useClass: AlertRepository,
    },
  ],
  exports: [AlertService, ALERT_REPOSITORY_TOKEN],
})
export class AlertsModule {}
