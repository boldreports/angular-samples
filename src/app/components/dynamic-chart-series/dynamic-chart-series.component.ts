/**
 * Dynamic Chart Series - This sample demonstrates the dynamic chart series.
 */
import { Component } from '@angular/core';
import { Globals } from '../globals';
@Component({
  selector: 'ej-sample',
  templateUrl: './dynamic-chart-series.component.html',
  styleUrls: ['./dynamic-chart-series.component.css']
})
export class DynamicChartSeriesComponent {
  // Specifies the report Web API service URL. It is used to process the reports.
  public serviceUrl = Globals.SERVICE_URL;
  // Specifies the path of the RDL report file
  public reportPath: string;
  public toolbarSettings = Globals.TOOLBAR_OPTIONS;
  public onToolbarItemClick = Globals.EDIT_REPORT;
  public onExportItemClick = Globals.EXPORT_ITEM_CLICK;

  constructor() {
    this.reportPath = 'dynamic-chart-series.rdl';
  }
}
