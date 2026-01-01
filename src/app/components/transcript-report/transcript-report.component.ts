/**
    * Transcript report sample - This sample analyze the student's performance in a fictitious school with random data.
 */
import { Component } from '@angular/core';
import { Globals } from '../globals';
@Component({
    selector: 'ej-sample',
    templateUrl: './transcript-report.component.html',
    styleUrls: ['./transcript-report.component.css'],
    standalone: false
})
export class TranscriptReportComponent {
    // Specifies the report Web API service URL. It is used to process the reports.
    public serviceUrl = Globals.SERVICE_URL;
    // Specifies the path of the RDL report file
    public reportPath: string;
    public toolbarSettings = Globals.TOOLBAR_OPTIONS;
    public onToolbarItemClick = Globals.EDIT_REPORT;
    public onExportItemClick = Globals.EXPORT_ITEM_CLICK;

    constructor() {
        this.reportPath = 'transcript-report.rdl';
    }
}
