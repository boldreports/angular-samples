export const Globals = {
    SERVICE_URL: 'https://reports.syncfusion.com/demos/services/api/SamplesReportViewer',
    DESIGNER_SERVICE_URL: 'https://reports.syncfusion.com/demos/services/api/SamplesReportDesigner',
    TOOLBAR_OPTIONS: {
        showToolbar: true,
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
            groupIndex: 3
        }]
    },
    EDIT_REPORT: (args) => {
        if (args.value === 'edit-report') {
            const path = location.href.split('#');
            window.open(`${path[0]}#/report-designer?report-name=${args.model.reportPath}`,
                path[1].indexOf('/preview') === -1 ? '_blank' : '_self');

        }
    }
};
