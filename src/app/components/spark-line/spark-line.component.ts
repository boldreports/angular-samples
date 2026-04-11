/**
 * spark-line - This RDLC report demonstrates the spark-line records rendered in Bold Report Viewer.
 */
import { Component, ViewChild } from '@angular/core';
import { Globals } from '../globals';
import { rdlcData } from '../rdlcData';
@Component({
  selector: 'ej-sample',
  templateUrl: './spark-line.component.html',
  styleUrls: ['./spark-line.component.css']
})
export class SparkLine {
  @ViewChild('viewer') viewerInst;
  // Specifies the report Web API service URL. It is used to process the reports.
  public serviceUrl = Globals.SERVICE_URL;
  // Specifies the path of the RDL report file
  public reportPath: string;
  public toolbarSettings = Globals.TOOLBAR_OPTIONS;
  public onToolbarItemClick = Globals.EDIT_REPORT;
  public onExportItemClick = Globals.EXPORT_ITEM_CLICK;

  constructor() {
    this.reportPath = 'spark-line.rdlc';
  }

  public onReportLoaded(args): void {
    const reportNameWithoutExt = args.model.reportPath.split('.')[0];
    this.viewerInst.widget.model.dataSources = rdlcData[reportNameWithoutExt];
}

}
