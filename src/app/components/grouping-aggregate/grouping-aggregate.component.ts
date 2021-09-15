/**
 * Grouping Aggregate - This sample demonstrates the sorting, group total support in Tablix report item.
 */
import { Component } from '@angular/core';
import { Globals } from '../globals';
@Component({
  selector: 'ej-sample',
  templateUrl: './grouping-aggregate.component.html',
  styleUrls: ['./grouping-aggregate.component.css']
})
export class GroupingAggregateComponent {
  // Specifies the report Web API service URL. It is used to process the reports.
  public serviceUrl = Globals.SERVICE_URL;
  // Specifies the path of the RDL report file
  public reportPath: string;
  public toolbarSettings = Globals.TOOLBAR_OPTIONS;
  public onToolbarItemClick = Globals.EDIT_REPORT;
  public onExportItemClick = Globals.EXPORT_ITEM_CLICK;

  constructor() {
    this.reportPath = 'grouping-aggregate.rdl';
  }
}
