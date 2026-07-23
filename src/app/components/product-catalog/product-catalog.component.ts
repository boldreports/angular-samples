/**
 * Product Catalog - This RDLC report demonstrates the list of products rendered in Bold Report Viewer.
 */
import {  Component, ViewChild  } from '@angular/core';
import { BoldReportViewerModule } from '@boldreports/angular-reporting-components';
import { Globals } from '../globals';
import { rdlcData } from '../rdlcData';
@Component({
  standalone: true,
  imports: [BoldReportViewerModule],
  selector: 'ej-sample',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent {
  @ViewChild('viewer') viewerInst: any;
  // Specifies the report Web API service URL. It is used to process the reports.
  public serviceUrl = Globals.SERVICE_URL;
  // Specifies the path of the RDL report file
  public reportPath: string;
  public toolbarSettings = Globals.TOOLBAR_OPTIONS;
  public onToolbarItemClick = Globals.EDIT_REPORT;
  public onExportItemClick = Globals.EXPORT_ITEM_CLICK;

  constructor() {
    this.reportPath = 'product-catalog.rdlc';
  }

  public onReportLoaded(args: any): void {
    const reportNameWithoutExt: string = args.model.reportPath.split('.')[0];
    (this.viewerInst.widget.model as any).dataSources = (rdlcData as any)[reportNameWithoutExt];
  }

}
