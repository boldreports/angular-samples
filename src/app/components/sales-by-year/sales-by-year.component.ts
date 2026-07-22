/**
 * Sales By Year - This RDLC report demonstrates the Sales record rendered in Bold Report Viewer.
 */
import {  Component, ViewChild  } from '@angular/core';
import { BoldReportViewerModule } from '@boldreports/angular-reporting-components';
import { Globals } from '../globals';
import { rdlcData } from '../rdlcData';
@Component({
  standalone: true,
  imports: [BoldReportViewerModule],
  selector: 'ej-sample',
  templateUrl: './sales-by-year.component.html',
  styleUrls: ['./sales-by-year.component.css']
})
export class SalesByYearComponent {
  @ViewChild('viewer') viewerInst: any;
  // Specifies the report Web API service URL. It is used to process the reports.
  public serviceUrl = Globals.SERVICE_URL;
  // Specifies the path of the RDL report file
  public reportPath: string;
  public toolbarSettings = Globals.TOOLBAR_OPTIONS;
  public onToolbarItemClick = Globals.EDIT_REPORT;
  public onExportItemClick = Globals.EXPORT_ITEM_CLICK;

  constructor() {
    this.reportPath = 'sales-by-year.rdlc';
  }

  public onReportLoaded(args: any): void {
    const reportNameWithoutExt: string = args.model.reportPath.split('.')[0];
    (this.viewerInst.widget.model as any).dataSources = (rdlcData as any)[reportNameWithoutExt];
}

}
