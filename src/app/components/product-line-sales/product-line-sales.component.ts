/**
 * Product Line Sales - This sample demonstrates the product sales details information based on category and sub category of products report parameters.
 */
import { Component } from '@angular/core';
import { Globals } from '../globals';
@Component({
  selector: 'ej-sample',
  templateUrl: './product-line-sales.component.html',
  styleUrls: ['./product-line-sales.component.css']
})
export class ProductLineSalesComponent {
  // Specifies the report Web API service URL. It is used to process the reports.
  public serviceUrl = Globals.SERVICE_URL;
  // Specifies the path of the RDL report file
  public reportPath: string;
  public toolbarSettings = Globals.TOOLBAR_OPTIONS;
  public onToolbarItemClick = Globals.EDIT_REPORT;
  public onExportItemClick = Globals.EXPORT_ITEM_CLICK;

  constructor() {
    this.reportPath = 'product-line-sales.rdl';
  }
}
