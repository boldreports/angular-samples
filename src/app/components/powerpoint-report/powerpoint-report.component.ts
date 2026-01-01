/**
 * Powerpoint Report - This sample demonstrates the online food ordering details which is presented as a power point report using page break.
 */
import { Component } from '@angular/core';
import { Globals } from '../globals';
@Component({
  selector: 'ej-sample',
  templateUrl: './powerpoint-report.component.html',
  styleUrls: ['./powerpoint-report.component.css'],
  standalone: false
})
export class PowerpointReportComponent {
  // Specifies the report Web API service URL. It is used to process the reports.
  public serviceUrl = Globals.SERVICE_URL;
  // Specifies the path of the RDL report file
  public reportPath: string;
  public exportSettings = Globals.EXPORT_OPTIONS;
  public toolbarSettings = Globals.TOOLBAR_OPTIONS;
  public onToolbarItemClick = Globals.EDIT_REPORT;
  public onExportItemClick = Globals.EXPORT_ITEM_CLICK;

  constructor() {
    this.reportPath = 'powerpoint-report.rdl';
  }
}