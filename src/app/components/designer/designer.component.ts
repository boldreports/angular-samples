/**
 * Report designer control
 */
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Globals } from '../globals';
import { Router, Params } from '@angular/router';
import { EJBarcode } from './../extensions/report-item-extensions/barcode.reportitem';
import { EJQRBarcode } from './../extensions/report-item-extensions/qrbarcode.reportitem';

const barcode = 'EJBarcode';
const qrBarcode = 'EJQRBarcode';
window[barcode] = EJBarcode;
window[qrBarcode] = EJQRBarcode;

@Component({
  selector: 'ej-sample',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent implements AfterViewInit {
  @ViewChild('designer') designerInst;
  // Specifies the URL of the WebAPI service. It will be used for processing the report.
  public serviceUrl = Globals.DESIGNER_SERVICE_URL;
  public reportPath: string;
  public toolbarSettings: ej.ReportDesigner.ToolbarSettings = {
    items: ej.ReportDesigner.ToolbarItems.All & ~ej.ReportDesigner.ToolbarItems.Save & ~ej.ReportDesigner.ToolbarItems.Open
  };
  public permissionSettings: ej.ReportDesigner.PermissionSettings = { dataSource: ej.ReportDesigner.Permission.All & ~ej.ReportDesigner.Permission.Create};
  public itemExtensions: any;

  constructor(private router: Router) {
    const params: Params = this.router.parseUrl(this.router.url).queryParams;
    const paramName = 'report-name';
    this.reportPath = params[paramName];
    this.itemExtensions = [{
      name: 'barcode',
      className: 'EJBarcode',
      imageClass: 'customitem-barcode',
      displayName: '1D Barcode',
      category: 'Barcodes'
    }, {
      name: 'matrixbarcode',
      className: 'EJQRBarcode',
      imageClass: 'customitem-qrbarcode',
      displayName: '2D Barcode',
      category: 'Barcodes'
    }];
  }

  public onAjaxBeforeLoad(args): void {
    args.data = JSON.stringify({ reportType: 'RDL' });
  }


  public toolbarRendering(args): void {
    if ($(args.target).hasClass('e-rptdesigner-toolbarcontainer')) {
      const saveButton = ej.buildTag('li.e-rptdesigner-toolbarli e-designer-toolbar-align e-tooltxt', '', {}, {});
      const saveIcon = ej.buildTag('span.e-rptdesigner-toolbar-icon e-toolbarfonticonbasic e-rptdesigner-toolbar-save e-li-item',
        '', {}, { title: 'Save' });
      args.target.find('ul:first').append(saveButton.append(saveIcon));
    }
  }

  public toolbarClick(args): void {
    if (args.event.click === 'Save') {
      args.event.cancel = true;
      args.designerInst.widget.saveToDevice();
    }
  }

  ngAfterViewInit(): void {
    this.designerInst.widget.setModel({
      previewOptions: {
        exportItemClick: Globals.EXPORT_ITEM_CLICK,
        toolbarSettings: {
          items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Find
        }
      }
    });
    if (this.reportPath === 'load-large-data.rdl') {
      this.designerInst.widget.setModel({
        previewOptions: {
          toolbarSettings: {
            items: ~ej.ReportViewer.ToolbarItems.Export & ~ej.ReportViewer.ToolbarItems.Print,
            toolbars: ej.ReportViewer.Toolbars.All & ~ej.ReportViewer.Toolbars.Vertical
          }
        }
      });
    }
    if (this.reportPath) {
      this.designerInst.widget.openReport(this.reportPath.indexOf("external-parameter-report") !== -1 ? "product-line-sales.rdl" : this.reportPath.indexOf("parameter-customization") !== -1 ? "product-line-sales.rdl" : this.reportPath);
    }
  }
}