/**
 * Northwind Products and Suppliers Report - This sample demonstrates the sales performance of different products.
 */
import { Component } from '@angular/core';
import { Globals } from '../globals';
@Component({
  selector: 'ej-sample',
  templateUrl: './northwind-products-suppliers-report.component.html',
  styleUrls: ['./northwind-products-suppliers-report.component.css']
})
export class NorthwindProductsSuppliersReportComponent {
  // Specifies the report Web API service URL. It is used to process the reports.
  public serviceUrl = Globals.SERVICE_URL;
  // Specifies the path of the RDL report file
  public reportPath: string;
  public toolbarSettings = Globals.TOOLBAR_OPTIONS;
  public onToolbarItemClick = Globals.EDIT_REPORT;
  public onExportItemClick = Globals.EXPORT_ITEM_CLICK;

  constructor() {
    this.reportPath = 'northwind-products-suppliers-report.rdl';
  }
}
