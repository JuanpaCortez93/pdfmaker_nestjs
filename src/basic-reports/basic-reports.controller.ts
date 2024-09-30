import { Controller, Get, Param, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  async hello(@Res() response:Response) 
  {
    const pdfDoc = this.basicReportsService.hello();
    pdfDoc.info.Title = "Hello world";
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.pipe(response);
    pdfDoc.end();
  }


  @Get('employment-letter')
  async employmentLetter(@Res() response:Response)
  {
    const pdfDoc = this.basicReportsService.employmentLetter();
    pdfDoc.info.Title = "Employee Report";
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:id')
  async employmentLetterById(@Res() response:Response, @Param('id') id:string)
  {
    const pdfDoc = await this.basicReportsService.employmentLetterById(+id);
    pdfDoc.info.Title = "Employee Report";
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

}
