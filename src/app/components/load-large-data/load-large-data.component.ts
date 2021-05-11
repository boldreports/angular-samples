/**
 * Load Large Data - This report demonstrates the complete details of sales orders in Adventure Works
 */
import { Component, ViewChild } from '@angular/core';
import { Globals } from '../globals';
import { rdlcData } from '../rdlcData';
@Component({
  selector: 'ej-sample',
  templateUrl: './load-large-data.component.html',
  styleUrls: ['./load-large-data.component.css']
})
export class LoadLargeDataComponent {
  @ViewChild('viewer') viewerInst;
  // Specifies the report Web API service URL. It is used to process the reports.
  public serviceUrl = Globals.SERVICE_URL;
  // Specifies the path of the RDL report file
  public reportPath: string;
  public toolbarSettings: any;
  public onToolbarItemClick = Globals.EDIT_REPORT;
  public onExportItemClick = Globals.EXPORT_ITEM_CLICK;

  constructor() {
    this.reportPath = 'load-large-data.rdlc';
    this.toolbarSettings = {
      showToolbar: true,
      items: ~ej.ReportViewer.ToolbarItems.Export & ~ej.ReportViewer.ToolbarItems.Print & ~ej.ReportViewer.ToolbarItems.ExportSetup,
      customGroups: [{
        items: [{
          type: 'Default',
          cssClass: 'e-icon e-edit e-reportviewer-icon ej-webicon CustomGroup',
          id: 'edit-report',
          // Need to add the proper header and content once, the tool tip issue resolved.
          tooltip: {
            header: 'Edit Report',
            content: 'Edit this report in designer'
          }
        }],
        // Need to remove the css (e-reportviewer-toolbarcontainer ul.e-ul:nth-child(4)) once the group index issue resolved
        groupIndex: 3,
        cssClass: 'e-show'
      }]
    };
  }
}
