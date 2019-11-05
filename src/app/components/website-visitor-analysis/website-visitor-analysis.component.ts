/**
 * Website Visitor Analysis - This sample analyze the user behavior for a fictitious e-commerce website with random data.
 */
import { Component } from '@angular/core';
import { Globals } from '../globals';
@Component({
  selector: 'ej-sample',
  templateUrl: './website-visitor-analysis.component.html',
  styleUrls: ['./website-visitor-analysis.component.css']
})
export class WebsiteVisitorAnalysisComponent {
  // Specifies the report Web API service URL. It is used to process the reports.
  public serviceUrl = Globals.SERVICE_URL;
  // Specifies the path of the RDL report file
  public reportPath: string;
  public toolbarSettings = Globals.TOOLBAR_OPTIONS;
  public onToolbarItemClick = Globals.EDIT_REPORT;
  public onExportItemClick = Globals.EXPORT_ITEM_CLICK;

  constructor() {
    this.reportPath = 'website-visitor-analysis.rdl';
  }
}
