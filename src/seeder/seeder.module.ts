import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { RoleModule } from '../role/role.module';
import { UserModule } from '../user/user.module';
import { HealthCenterModule } from '../health-center/health-center.module';

@Module({
  providers: [SeederService],
  imports: [RoleModule, UserModule, HealthCenterModule],
})
export class SeederModule {}
