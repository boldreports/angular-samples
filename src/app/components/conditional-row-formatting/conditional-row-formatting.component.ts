/**
 * Conditional Row Formatting - This sample demonstrates the support to view shared dataset and Tablix rows with conditional formatting.
 */
import { Component } from '@angular/core';
import { Globals } from '../globals';
@Component({
  selector: 'ej-sample',
  templateUrl: './conditional-row-formatting.component.html',
  styleUrls: ['./conditional-row-formatting.component.css']
})
export class ConditionalRowFormattingComponent {
  // Specifies the report Web API service URL. It is used to process the reports.
  public serviceUrl = Globals.SERVICE_URL;
  // Specifies the path of the RDL report file
  public reportPath: string;
  public toolbarSettings = Globals.TOOLBAR_OPTIONS;
  public onToolbarItemClick = Globals.EDIT_REPORT;
  public onExportItemClick = Globals.EXPORT_ITEM_CLICK;

  constructor() {
    this.reportPath = 'conditional-row-formatting.rdl';
  }
}
