/**
 * Personal Expense Analysis - The sample demonstrates the spending patterns of an individual with random data.
 */
import { Component } from '@angular/core';
import { Globals } from '../globals';
@Component({
  selector: 'ej-sample',
  templateUrl: './personal-expense-analysis.component.html',
  styleUrls: ['./personal-expense-analysis.component.css']
})
export class PersonalExpenseAnalysisComponent {
  // Specifies the report Web API service URL. It is used to process the reports.
  public serviceUrl = Globals.SERVICE_URL;
  // Specifies the path of the RDL report file
  public reportPath: string;
  public toolbarSettings = Globals.TOOLBAR_OPTIONS;
  public onToolbarItemClick = Globals.EDIT_REPORT;
  public onExportItemClick = Globals.EXPORT_ITEM_CLICK;

  constructor() {
    this.reportPath = 'personal-expense-analysis.rdl';
  }
}
