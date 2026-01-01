/**
 * Dynamic Logos - This demo showcases a dynamic business report, where company-specific logos and content are updated automatically based on parameter selections.
 */
 import { Component } from '@angular/core';
 import { Globals } from '../globals';
 @Component({
   selector: 'ej-sample',
   templateUrl: './dynamic-logos.component.html',
   styleUrls: ['./dynamic-logos.component.css'],
  standalone: false
 })
 export class DynamicLogosComponent {
   // Specifies the report Web API service URL. It is used to process the reports.
   public serviceUrl = Globals.SERVICE_URL;
   // Specifies the path of the RDL report file
   public reportPath: string;
   public toolbarSettings = Globals.TOOLBAR_OPTIONS;
   public onToolbarItemClick = Globals.EDIT_REPORT;
   public onExportItemClick = Globals.EXPORT_ITEM_CLICK;
 
   constructor() {
     this.reportPath = 'dynamic-logos.rdl';
   }
 }
 