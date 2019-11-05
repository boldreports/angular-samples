/**
 * Report designer control
 */
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Globals } from '../globals';
import { Router, Params } from '@angular/router';
import { EJBarcode } from './../extensions/report-item-extensions/barcode';
import { EJQRBarcode } from './../extensions/report-item-extensions/qrbarcode';
import { rdlcData } from '../rdlcData';

const barcode = 'EJBarcode';
const qrBarcode = 'EJQRBarcode';
window[barcode] = EJBarcode;
window[qrBarcode] = EJQRBarcode;

@Component({
  selector: 'ej-sample',
  templateUrl: './rdlc.component.html',
  styleUrls: ['./rdlc.component.css']
})
export class RDLCComponent implements AfterViewInit {
  @ViewChild('designer') designerInst;
  // Specifies the URL of the WebAPI service. It will be used for processing the report.
  public serviceUrl = Globals.DESIGNER_SERVICE_URL;
  public reportPath: string;
  public isServerReport = false;
  public toolbarSettings: ej.ReportDesigner.ToolbarSettings = {
    items: ej.ReportDesigner.ToolbarItems.All & ~ej.ReportDesigner.ToolbarItems.Save
  };
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
      name: 'qrbarcode',
      className: 'EJQRBarcode',
      imageClass: 'customitem-qrbarcode',
      displayName: 'QR Barcode',
      category: 'Barcodes'
    }];
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

  public onAjaxBeforeLoad(args) {
    args.data = JSON.stringify({ reportType: 'RDLC' });
  }

  public onReportOpened(args) {
    this.isServerReport = args.isServerReport;
  }

  public previewReport(args) {
    if (this.isServerReport) {
      let reportPath = args.model.reportPath;
      reportPath = reportPath.indexOf('//') !== -1 ? reportPath.substring(2) : reportPath;
      const reportNameWithoutExt = reportPath.split('.rdlc')[0];
      const datasource = rdlcData[reportNameWithoutExt];
      args.cancelDataInputDialog = true;
      args.dataSets = datasource;
    }
  }

  ngAfterViewInit(): void {
    this.designerInst.widget.setModel({
      reportType: 'RDLC',
      previewReport: this.previewReport.bind(this)
    });
    if (this.reportPath) {
      this.designerInst.widget.openReport(this.reportPath);
    }
  }
}
