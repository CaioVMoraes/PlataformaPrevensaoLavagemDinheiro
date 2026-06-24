import { Module } from '@nestjs/common';
import { InvestigationsModule } from './modules/investigations/investigations.module';

@Module({
  // Dedicated process focused only on investigations domain.
  imports: [InvestigationsModule],
})
export class InvestigationsMicroserviceModule {}