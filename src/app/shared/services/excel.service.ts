import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Subject } from 'rxjs';
import jsPDF from 'jspdf';

// import 'jspdf-autotable';
import autoTable from 'jspdf-autotable'

const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  dataSource = new Subject<any>();
  dataSource$ = this.dataSource.asObservable();
  constructor() { }

  /**
   * Export to Excel file.
   * @param jsonData 
   * @param fileName 
   * @param headers 
   */
  exportToExcel(jsonData: any[], fileName: string, headers: any): void {
    const dataWithHeaders = jsonData.map(item => {
      const row: any = {};
      headers.forEach((header: any) => {
        row[header.label] = item[header.key];
      });
      return row;
    });
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataWithHeaders);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Save the file
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, fileName + '_export_' + new Date().getTime() + '.xlsx');
  }

  /**
   * Export to CSV file.
   * @param jsonData 
   * @param fileName 
   * @param headers 
   */
  exportToCSV(jsonData: any[], fileName: string, headers: any): void {
    const csvContent = [
      headers.join(","),
      ...jsonData.map(e => Object.values(e).join(","))
    ].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, fileName);
  }

  /**
   * Export to Pdf file.
   * @param fileName 
   * @param head 
   * @param transformedData 
   */
  exportToPDF(fileName: string, head: any, transformedData: any) {
    const doc = new jsPDF();
    autoTable(doc, {
      styles: { cellWidth: 'auto' },
      margin: { top: 5, left: 5, right: 5 },
      head: [head],
      body: transformedData
    });
    // Save the PDF
    doc.save(`${fileName}.pdf`);
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        /* Parse data */
        const binaryString = e.target.result;
        const workbook: XLSX.WorkBook = XLSX.read(binaryString, { type: 'binary' });

        /* Get the first worksheet */
        const worksheet: XLSX.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];

        /* Convert to JSON */
        const data = XLSX.utils.sheet_to_json(worksheet);
        // console.log(data)
        this.dataSource.next(data);
        // return data; // Output the imported data to console or process as needed
      };
      reader.readAsBinaryString(file);
    }
  }
}
