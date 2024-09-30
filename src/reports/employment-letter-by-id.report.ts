import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header-section';
import { DateFormatter } from 'src/helpers';

const style: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 50, 0, 30],
  },
  body: {
    fontSize: 11,
    alignment: 'justify',
    margin: [0, 0, 0, 40],
  },
  signature: {
    fontSize: 10,
    bold: true,
  },
  footer: {
    fontSize: 10,
    italics: true,
    alignment: 'center',
    margin: [0, 0, 0, 20],
  },
};

export interface ReportOptions {
  employerName: string;
  employerPosition: string;
  employeeName: string;
  employeePosition: string;
  employeeStartDate: Date;
  employeeHours: number;
  employeeWorkSchedule: string;
  employerCompany: string;
}

export const getEmploymentByIdReport = (
  reportOptions: ReportOptions,
): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    styles: style,
    pageMargins: [40, 60, 40, 60],

    header: headerSection({ showLogo: true, showDate: true }),

    content: [
      {
        text: 'EMPLOYMENT CERTIFICATE',
        style: 'header',
      },
      {
        text: `I, ${reportOptions.employeeName}, in my capacity as ${reportOptions.employerPosition} of ${reportOptions.employerCompany}, hereby certify that ${reportOptions.employeeName} has been employed at our company since ${DateFormatter.getDDMMMMYYY(reportOptions.employeeStartDate)}.\n\n
              During their employment, Mr./Ms. ${reportOptions.employeeName} has held the position of ${reportOptions.employeePosition}, demonstrating responsibility, commitment, and professional skills in their duties.\n\n
              Mr./Ms. ${reportOptions.employeeName} works ${reportOptions.employeeHours} hours per week, with a schedule of ${reportOptions.employeeWorkSchedule}, adhering to the policies and procedures established by the company.\n\n
              This certificate is issued at the request of the interested party for any purpose they deem appropriate.\n\n`,
        style: 'body',
      },
      {
        text: `Sincerely,`,
        style: 'signature',
      },
      {
        text: `${reportOptions.employerName},`,
        style: 'signature',
      },
      {
        text: `${reportOptions.employerPosition},`,
        style: 'signature',
      },
      {
        text: `${reportOptions.employerCompany},`,
        style: 'signature',
      },
      {
        text: `${DateFormatter.getDDMMMMYYY(new Date())},`,
        style: 'signature',
      },
    ],
    
    footer: {
      text: 'This document is an employment certificate and does not constitute a contractual obligation.',
      style: 'footer',
    },
  };

  return docDefinition;
};
