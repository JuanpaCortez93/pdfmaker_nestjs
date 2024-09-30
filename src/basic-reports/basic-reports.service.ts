import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getEmploymentReport, getHelloWorldReport } from 'src/reports';
import { getEmploymentByIdReport, ReportOptions } from 'src/reports/employment-letter-by-id.report';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('Connected to DB');
  }

  constructor(
    private readonly printerService: PrinterService
  ){
    super();
  }

  hello() {
    const docDefinition = getHelloWorldReport({name: 'Juan Pablo'});

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  employmentLetter()
  {
    const docDefinition = getEmploymentReport();
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async employmentLetterById(id:number)
  {

    const employee = await this.employees.findUnique({where: {id}})
    if(!employee) throw new NotFoundException('Employee not found');

    const {name, position, work_schedule, hours_per_day, start_date} = employee;

    const reportOptions : ReportOptions = {
      employerName: "Jhon Duran",
      employerCompany: "Happy Duck Industries",
      employerPosition: "CTO",
      employeeName: name,
      employeePosition: position,
      employeeHours: hours_per_day,
      employeeStartDate: start_date,
      employeeWorkSchedule: work_schedule
    }

    const docDefinition = getEmploymentByIdReport(reportOptions);
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

}
