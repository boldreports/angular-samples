/**
 * HR Payroll - This demo showcases an HR Payroll report showing salaries, deductions, demographics, and performance insights in the Angular Bold Report Viewer.
 */
 import { Component } from '@angular/core';
 import { Globals } from '../globals';
 @Component({
   selector: 'ej-sample',
   templateUrl: './hr-payroll.component.html',
   styleUrls: ['./hr-payroll.component.css']
 })
 export class HRPayrollComponent {
   // Specifies the report Web API service URL. It is used to process the reports.
   public serviceUrl = Globals.SERVICE_URL;
   // Specifies the path of the RDL report file
   public reportPath: string;
   public toolbarSettings = Globals.TOOLBAR_OPTIONS;
   public onToolbarItemClick = Globals.EDIT_REPORT;
   public onExportItemClick = Globals.EXPORT_ITEM_CLICK;
 
   constructor() {
     this.reportPath = 'hr-payroll.rdl';
   }
 }
 