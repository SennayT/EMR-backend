import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './address/address.module';
import { UserModule } from './user/user.module';
import { HealthCenterModule } from './health-center/health-center.module';
import { RoleModule } from './role/role.module';
import { PatientModule } from './patient/patient.module';
import { VitalsModule } from './vitals/vitals.module';
import { InvestigationRequestModule } from './investigation-request/investigation-request.module';
import { LabTestModule } from './lab-test/lab-test.module';
import { LabResultModule } from './lab-result/lab-result.module';
import dbConfig from '../ormconfig';
import { ConfigModule } from '@nestjs/config';
import { RadiologyModule } from './radiology/radiology.module';
import { HospitalAdminModule } from './hospital-admin/hospital-admin.module';
import { ResearcherModule } from './researcher/researcher.module';
import { EmployeeModule } from './employee/employee.module';
import { MohEmployeeModule } from './moh-employee/moh-employee.module';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { DiseaseModule } from './disease/disease.module';
import { ExaminationModule } from './examination/examination.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { AuthModule } from './auth/auth.module';
import { SystemAdminModule } from './system-admin/system-admin.module';
import { MailModule } from './mail/mail.module';
import { SeederModule } from './seeder/seeder.module';
import 'dotenv/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dbConfig),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        service: process.env.MAIL_SERVICE,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
    }),
    AddressModule,
    UserModule,
    HealthCenterModule,
    RoleModule,
    PatientModule,
    VitalsModule,
    InvestigationRequestModule,
    LabTestModule,
    LabResultModule,
    RadiologyModule,
    HospitalAdminModule,
    ResearcherModule,
    EmployeeModule,
    MohEmployeeModule,
    DiagnosisModule,
    DiseaseModule,
    ExaminationModule,
    PrescriptionModule,
    AuthModule,
    SystemAdminModule,
    MailModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
