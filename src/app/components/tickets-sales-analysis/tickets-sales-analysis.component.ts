/**
 * Tickets Sales Analysis - This sample analyze the tickets sold in theater with random data
 */
import { Component } from '@angular/core';
import { Globals } from '../globals';
@Component({
  selector: 'ej-sample',
  templateUrl: './tickets-sales-analysis.component.html',
  styleUrls: ['./tickets-sales-analysis.component.css']
})
export class TicketsSalesComponent {
  // Specifies the report Web API service URL. It is used to process the reports.
  public serviceUrl = Globals.SERVICE_URL;
  // Specifies the path of the RDL report file
  public reportPath: string;
  public toolbarSettings = Globals.TOOLBAR_OPTIONS;
  public onToolbarItemClick = Globals.EDIT_REPORT;
  public onExportItemClick = Globals.EXPORT_ITEM_CLICK;

  constructor() {
    this.reportPath = 'tickets-sales-analysis.rdl';
  }
}
