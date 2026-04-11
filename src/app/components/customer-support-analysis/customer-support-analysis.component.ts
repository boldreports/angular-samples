/**
 * Customer Support Analysis - This sample analyze the efficiency of customer support with random data.
 */
import { Component } from '@angular/core';
import { Globals } from '../globals';
@Component({
  selector: 'ej-sample',
  templateUrl: './customer-support-analysis.component.html',
  styleUrls: ['./customer-support-analysis.component.css']
})
export class CustomerSupportAnalysisComponent {
  // Specifies the report Web API service URL. It is used to process the reports.
  public serviceUrl = Globals.SERVICE_URL;
  // Specifies the path of the RDL report file
  public reportPath: string;
  public toolbarSettings = Globals.TOOLBAR_OPTIONS;
  public onToolbarItemClick = Globals.EDIT_REPORT;
  public onExportItemClick = Globals.EXPORT_ITEM_CLICK;

  constructor() {
    this.reportPath = 'customer-support-analysis.rdl';
  }
}
