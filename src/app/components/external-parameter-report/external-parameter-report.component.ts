/**
 * Product Line Sales - The sample demonstrates the product details information based on barcode report item.
 */
import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

import { Globals } from '../globals';
@Component({
  selector: 'ej-sample',
  templateUrl: './external-parameter-report.component.html',
  styleUrls: ['./external-parameter-report.component.css'],
})
export class ExternalParameterReportComponent {
  @ViewChild('externalparameterreport', { static: false }) externalParameterReport;
  // Specifies the report Web API service URL. It is used to process the reports.
  public serviceUrl = Globals.SERVICE_URL;
  // Specifies the path of the RDL report file
  public reportPath: string;
  public toolbarSettings = Globals.TOOLBAR_OPTIONS;
  public onToolbarItemClick = Globals.EDIT_REPORT;
  public onExportItemClick = Globals.EXPORT_ITEM_CLICK;
  public parameterSettings: any;

  constructor(private http: HttpClient) {
    this.reportPath = 'product-line-sales.rdl';
    this.parameterSettings = { hideParameterBlock: true };
  }

  public loadReport(): void {
    let reportViewer=this.externalParameterReport;
    let productCategory = (<any>jQuery("#category")).ejDropDownList("getSelectedValue");
    let productSubcategory = (<any>jQuery("#subcategory")).ejDropDownList("getSelectedValue").split(",");
    let startDate = jQuery("#startdate").data("ejDatePicker").getValue();
    let endDate = jQuery("#enddate").data("ejDatePicker").getValue();
    let parameters = [{ name: 'ProductCategory', labels: [productCategory], values: [productCategory] }, { name: 'ProductSubcategory', labels: productSubcategory, values: productSubcategory }, { name: 'StartDate', labels: [startDate], values: [startDate] }, { name: 'EndDate', labels: [endDate], values: [endDate] }];
    reportViewer.widget.model.parameters=parameters;
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
        (<any>jQuery("#startdate")).ejDatePicker({ value: new Date("1/1/2003"), width: '180px' });
        (<any>jQuery("#enddate")).ejDatePicker({ value: new Date("12/31/2003"), width: '180px' });
        let catogoryList = JSON.parse(parameterDataCollection[0].ProductCategoryDetail);
        let subCategoryList = JSON.parse(parameterDataCollection[0].ProductSubCategoryDetail);
        var subCategoryDropDownList = subCategoryList.filter(({ ProductCategoryID }) => ProductCategoryID == 1);
        (<any>jQuery("#category")).ejDropDownList({
          dataSource: catogoryList,
          fields: {
            text: "Name",
            value: "ProductCategoryID",
          },
          selectedIndex: 1,
          width: "180px",
          change: function (args) {
            (<any>jQuery("#checkall")).ejCheckBox({ checked: false });
            var categoryDropDownList = subCategoryList.filter(({ ProductCategoryID }) => ProductCategoryID == (<any>jQuery("#category")).ejDropDownList("getSelectedValue"));
            var subCategoryObj = $('#subcategory').data("ejDropDownList");
            subCategoryObj.option("dataSource", categoryDropDownList);
          },
        });
        (<any>jQuery("#subcategory")).ejDropDownList({
          dataSource: subCategoryDropDownList,
          fields: {
            text: "Name",
            value: "ProductSubcategoryID",
          },
          showCheckbox: true,
          change: dropDownCheckAll,
          headerTemplate: "<div id='checkall_wrap' ><input id ='checkall' type='checkbox'/ ></div>",
          selectedIndex: 1,
          width: "180px",
          watermarkText: "Select Option"
        });
        var flag;
        (<any>jQuery("#checkall")).ejCheckBox({ text: "Select All", change: selectAllSubCategory });
        function selectAllSubCategory(args) {
          if (!flag) {
            var subCategoryObj = (<any>jQuery("#subcategory")).ejDropDownList("instance");
            if (args.isChecked) subCategoryObj.checkAll();
            else subCategoryObj.uncheckAll();
          }
        }
        function dropDownCheckAll(args) {
          var subCategoryObj = (<any>jQuery("#subcategory")).ejDropDownList("instance");
          var instance = $("#checkall").data("ejCheckBox");
          if (!args.isChecked) {
              flag = true;
              instance.setModel({ checked: false });
              flag = false;
          }
          if (subCategoryObj.getSelectedItem().length == subCategoryObj.getListData().length) {
            (<any>jQuery("#checkall")).ejCheckBox({ checked: true });
          }
        }
      });
  }
}
