/**
 * Consolidated Balance Sheet - This RDLC report demonstrates the financial balance records rendered in Bold Report Viewer.
 */
import { Component, ViewChild } from '@angular/core';
import { Globals } from '../globals';
import { rdlcData } from '../rdlcData';
@Component({
  selector: 'ej-sample',
  templateUrl: './consolidated-balance-sheet.component.html',
  styleUrls: ['./consolidated-balance-sheet.component.css']
})
export class ConsolidatedBalanceSheetComponent {
  @ViewChild('viewer') viewerInst;
  // Specifies the report Web API service URL. It is used to process the reports.
  public serviceUrl = Globals.SERVICE_URL;
  // Specifies the path of the RDLC report file
  public reportPath: string;
  public toolbarSettings = Globals.TOOLBAR_OPTIONS;
  public onToolbarItemClick = Globals.EDIT_REPORT;
  public onExportItemClick = Globals.EXPORT_ITEM_CLICK;

  constructor() {
    this.reportPath = 'consolidated-balance-sheet.rdlc';
  }

  public onReportLoaded(args): void {
    const reportNameWithoutExt = args.model.reportPath.split('.')[0];
    this.viewerInst.widget.model.dataSources = rdlcData[reportNameWithoutExt];
  }

}
