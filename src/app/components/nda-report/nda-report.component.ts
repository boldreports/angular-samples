/**
 * NDA Reort - This demo showcases the integration of PDF digital signature in a Non-Disclosure Agreement (NDA) report.
 */
 import { Component } from '@angular/core';
 import { Globals } from '../globals';
 @Component({
   selector: 'ej-sample',
   templateUrl: './nda-report.component.html',
   styleUrls: ['./nda-report.component.css']
 })
 export class NDAReportComponent {
   // Specifies the report Web API service URL. It is used to process the reports.
   public serviceUrl = Globals.SERVICE_URL;
   // Specifies the path of the RDL report file
   public reportPath: string;
   public toolbarSettings = Globals.TOOLBAR_OPTIONS;
   public onToolbarItemClick = Globals.EDIT_REPORT;
   public onExportItemClick = Globals.EXPORT_ITEM_CLICK;
 
   constructor() {
     this.reportPath = 'nda-report.rdl';
   }
 }
 