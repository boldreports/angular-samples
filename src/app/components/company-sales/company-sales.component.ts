/**
 * Company sales - This sample demonstrates the Sales data by year with grouping.
 */
import { Component } from '@angular/core';
import { Globals } from '../globals';
@Component({
  selector: 'ej-sample',
  templateUrl: './company-sales.component.html',
  styleUrls: ['./company-sales.component.css']
})
export class CompanySalesComponent {
  // Specifies the report Web API service URL. It is used to process the reports.
  public serviceUrl = Globals.SERVICE_URL;
  // Specifies the path of the RDL report file
  public reportPath: string;
  public toolbarSettings = Globals.TOOLBAR_OPTIONS;
  public onToolbarItemClick = Globals.EDIT_REPORT;
  public onExportItemClick = Globals.EXPORT_ITEM_CLICK;

  constructor() {
    this.reportPath = 'company-sales.rdl';
  }
}
