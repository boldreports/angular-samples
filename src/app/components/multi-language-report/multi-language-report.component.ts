/**
 * Multi Language Report - This demo showcases a Multi Language Report that allows users to view report in various languages.
 */
import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';
import { createSpinner, showSpinner, hideSpinner } from "@syncfusion/ej2-angular-popups";
import { Globals } from '../globals';

@Component({
  selector: 'ej-sample',
  templateUrl: './multi-language-report.component.html',
  styleUrls: ['./multi-language-report.component.css']
})
export class MultiLanguageReportComponent {
    @ViewChild('multilanguagereport', { static: false }) multiLanguageReport;
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
        this.reportPath = 'multi-language-report.rdl';
        this.parameterSettings = { hideParameterBlock: true };
    }
    public languagesList: any = [{ Name: "English", languageId: "en-US" }, { Name: "French", languageId: "fr-CA" }, { Name: "German", languageId: "de-DE" }, { Name: "Hindi", languageId: "hi-IN" }, { Name: "Spanish", languageId: "es-ES" }, { Name: "Dutch", languageId: "nl-NL" }, { Name: "Korean", languageId: "ko-KR" }, { Name: "Hebrew", languageId: "he-IL" }, { Name: "Russian", languageId: "ru-RU" }];
    public tooltipLocales: any = {
        "en-US": { header: "Edit Report", content: "Edit this report in designer" },
        "fr-CA": { header: "Modifier le rapport", content: "Modifier ce rapport dans le concepteur" },
        "de-DE": { header: "Bericht bearbeiten", content: "Bearbeiten Sie diesen Bericht im Designer" },
        "hi-IN": { header: "रिपोर्ट संपादित करें", content: "इस रिपोर्ट को डिज़ाइनर में संपादित करें" },
        "es-ES": { header: "Editar informe", content: "Editar este informe en el diseñador" },
        "nl-NL": { header: "Rapport bewerken", content: "Bewerk dit rapport in de ontwerper" },
        "ko-KR": { header: "보고서 편집", content: "디자이너에서 이 보고서를 편집합니다" },
        "he-IL": { header: "ערוך דוח", content: "ערוך דוח זה במעצב" },
        "ru-RU": { header: "Редактировать отчет", content: "Редактировать этот отчет в дизайнере" }
    };
    public loadReport(): void {
        const reportViewer = this.multiLanguageReport;
        const selectedLanguageId = (<any>jQuery("#languages"))[0].ej2_instances[0].value;
        const tooltipData = this.tooltipLocales[selectedLanguageId];
        const selectedLanguage = this.languagesList.find(lang => lang.languageId === selectedLanguageId);
        const parameters = [{ name: 'Language', labels: [selectedLanguage.Name], values: [selectedLanguage.Name] }];
        reportViewer.widget.model.parameters = parameters;
        reportViewer.widget.reload();
        reportViewer.widget.setModel({'locale': selectedLanguageId});
        const item = reportViewer.widget.model.toolbarSettings.customGroups[0].items[0];
        item.tooltip = {
            header: tooltipData.header,
            content: tooltipData.content
        };
    }
    ngAfterViewInit(): void {
        createSpinner({target: document.getElementById("spinner-container")});
        showSpinner(document.getElementById("spinner-container"));
        $(".e-spinner-pane").css("background-color", "rgba(0, 0, 0, 0.4)");
        const languages: DropDownList = new DropDownList({
            dataSource: this.languagesList,
            fields: {
                text: "Name",
                value: "languageId",
            },
            index: 0,
            width: "180px",
            showClearButton: false
        });
        languages.appendTo('#languages');
        hideSpinner(document.getElementById("spinner-container"));
        $("#r-w-property-title").css("display", "block");
        $(".r-w-property").css("display", "inline-flex");
        $(".r-w-genearte").css("display", "block");
    }
}