import { Body, Controller, Post,Get, Res, UseGuards } from '@nestjs/common';
import { ReportDto } from './dto';
import { SystemAdminService } from './system-admin.service';
import { Response } from 'express';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('system-admin')
export class SystemAdminController {
  constructor(private readonly systemAdminService: SystemAdminService) {}
  @Post()
  getReport(@Body() report: ReportDto) {
    return this.systemAdminService.getReport(report);
  }

  @Get('/report/weekly')
  async getPDFWeek(@Res() res: Response): Promise<void> {
    const buffer = await this.systemAdminService.generatePDFWeekly();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=example.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }

  // @Get('/report/monthly')
  // async getPDFMonth(@Res() res: Response, @Body() report: ReportDto): Promise<void> {
  //   const buffer = await this.systemAdminService.generatePDF(report);

  //   res.set({
  //     'Content-Type': 'application/pdf',
  //     'Content-Disposition': 'inline; filename=example.pdf',
  //     'Content-Length': buffer.length,
  //   });

  //   res.end(buffer);
  // }

  // @Get('/report/semerterly')
  // async getPDFSemester(@Res() res: Response, @Body() report: ReportDto): Promise<void> {
  //   const buffer = await this.systemAdminService.generatePDF(report);

  //   res.set({
  //     'Content-Type': 'application/pdf',
  //     'Content-Disposition': 'inline; filename=example.pdf',
  //     'Content-Length': buffer.length,
  //   });

  //   res.end(buffer);
  // }

  // @Get('/report/yearly')
  // async getPDFYear(@Res() res: Response, @Body() report: ReportDto): Promise<void> {
  //   const buffer = await this.systemAdminService.generatePDF(report);

  //   res.set({
  //     'Content-Type': 'application/pdf',
  //     'Content-Disposition': 'inline; filename=example.pdf',
  //     'Content-Length': buffer.length,
  //   });

  //   res.end(buffer);
  // }

  // @Get('/report/general')
  // async getPDFGeneral(@Res() res: Response, @Body() report: ReportDto): Promise<void> {
  //   const buffer = await this.systemAdminService.generatePDF(report);

  //   res.set({
  //     'Content-Type': 'application/pdf',
  //     'Content-Disposition': 'inline; filename=example.pdf',
  //     'Content-Length': buffer.length,
  //   });

  //   res.end(buffer);
  // }
}
