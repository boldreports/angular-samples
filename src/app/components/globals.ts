export const Globals = {
    SERVICE_URL: 'https://demos.boldreports.com/services/api/ReportViewerWebApi',
    DESIGNER_SERVICE_URL: 'https://demos.boldreports.com/services/api/ReportDesignerWebApi',
    TOOLBAR_OPTIONS: {
        showToolbar: true,
        items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Find,
        customGroups: [{
            items: [{
                type: 'Default',
                cssClass: 'e-icon e-edit e-reportviewer-icon ej-webicon CustomGroup',
                prefixIcon: "e-viewer-icons edit",
                id: 'edit-report',
                // Need to add the proper header and content once, the tool tip issue resolved.
                tooltip: {
                    header: 'Edit Report',
                    content: 'Edit this report in designer'
                }
            }],
            // Need to remove the css (e-reportviewer-toolbarcontainer ul.e-ul:nth-child(4)) once the group index issue resolved
            cssClass: 'e-show'
        }]
    },
    DESTROY_REPORT: true,
    EXPORT_ITEM_CLICK: () => {
        Globals.DESTROY_REPORT = false;
    },
    EDIT_REPORT: (args) => {
        if (args.value === 'edit-report') {
            const path = location.href.split('#');
            const reportPath = location.href.lastIndexOf('external-parameter-report') !== -1 ? 'external-parameter-report' :
                location.href.lastIndexOf('parameter-customization') !== -1 ? 'parameter-customization' : args.model.reportPath;
            const ReportDesignerPath = reportPath.indexOf('.rdlc') !== -1 ? 'report-designer/rdlc' : 'report-designer';
            window.open(`${path[0]}#/${ReportDesignerPath}?report-name=${reportPath}`,
                path[1].indexOf('/preview') === -1 ? '_blank' : '_self');

        }
    }
};
