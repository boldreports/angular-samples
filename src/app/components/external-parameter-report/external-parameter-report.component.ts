/**
 * Product Line Sales - The sample demonstrates the product details information based on barcode report item.
 */
import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { DatePicker } from '@syncfusion/ej2-angular-calendars';
import { DropDownList, MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-angular-dropdowns';
MultiSelect.Inject(CheckBoxSelection)
import { Globals } from '../globals';

@Component({
  selector: 'ej-sample',
  templateUrl: './external-parameter-report.component.html',
  styleUrls: ['./external-parameter-report.component.css']
})
export class ExternalParameterReportComponent {
  @ViewChild('externalparameterreport', { static: false }) externalParameterReport;
  // Specifies the report Web API service URL. It is used to process the reports.
  public serviceUrl = Globals.SERVICE_URL;
  // Specifies the path of the RDL report file
  public reportPath: string;
  public toolbarSettings: ej.ReportViewer.ToolbarSettings = {
    customGroups: Globals.TOOLBAR_OPTIONS.customGroups,
    toolbars: ej.ReportViewer.Toolbars.All & ~ej.ReportViewer.Toolbars.Vertical 
  };
  public onToolbarItemClick = Globals.EDIT_REPORT;
  public onExportItemClick = Globals.EXPORT_ITEM_CLICK;
  public parameterSettings: any;

  constructor(private http: HttpClient) {
    this.reportPath = 'product-line-sales.rdl';
    this.parameterSettings = { hideParameterBlock: true };
  }

  public loadReport(): void {
    let reportViewer = this.externalParameterReport;
    let productCategory = (<any>jQuery("#category"))[0].ej2_instances[0].value;
    let productSubcategory = (<any>jQuery("#subcategory"))[0].ej2_instances[0].value;
    let startDate = (<any>jQuery("#startdate"))[0].value;
    let endDate = (<any>jQuery("#enddate"))[0].value;
    let parameters = [{ name: 'ProductCategory', labels: [productCategory], values: [productCategory] }, { name: 'ProductSubcategory', labels: productSubcategory, values: productSubcategory }, { name: 'StartDate', labels: [startDate], values: [startDate] }, { name: 'EndDate', labels: [endDate], values: [endDate] }];
    reportViewer.widget.model.parameters = parameters;
    reportViewer.widget.reload()
  }

  ngAfterViewInit(): void {
    var userAgent = window.navigator.userAgent;
    var isMobile = /mobile/i.test(userAgent);
    var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
    if (wheelEvent && !isMobile) {
      window.addEventListener(wheelEvent, function () { }, { passive: false });
    }
    const observableCollection = this.http.get(Globals.SERVICE_URL + '/GetExternalParameterData', { responseType: 'json' });
    forkJoin(observableCollection).subscribe(
      (parameterDataCollection: object) => {
        var startDate: DatePicker = new DatePicker({ value: new Date("1/1/2003"), width: "180px" });
        var endDate: DatePicker = new DatePicker({ value: new Date("12/31/2003"), width: "180px" });
        let catogoryList = JSON.parse(parameterDataCollection[0].ProductCategoryDetail);
        let subCategoryList = JSON.parse(parameterDataCollection[0].ProductSubCategoryDetail);
        var subCategoryDropDownList = subCategoryList.filter(({ ProductCategoryID }) => ProductCategoryID == 1);
        var category: DropDownList = new DropDownList({
          dataSource: catogoryList,
          fields: {
            text: "Name",
            value: "ProductCategoryID",
          },
          index: 1,
          width: "180px",
          change: function (e) {
            var categoryID = e.value;
            var categoryDropDownList = subCategoryList.filter(({ ProductCategoryID }) => ProductCategoryID == categoryID);
            if (subCategory.value != null)
              subCategory.clear();
            subCategory.dataSource = categoryDropDownList;
          }
        });
        var subCategory: MultiSelect = new MultiSelect({
          dataSource: subCategoryDropDownList,
          fields: {
            text: "Name",
            value: "ProductSubcategoryID",
          },
          mode: 'CheckBox',
          showClearButton: true,
          showDropDownIcon: true,
          showSelectAll: true,
          width: "180px",
          value: [2],
          placeholder: "Select Option"
        });
        startDate.appendTo('#startdate');
        endDate.appendTo('#enddate');
        category.appendTo('#category');
        subCategory.appendTo('#subcategory');
      });
  }
}
