Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    items:{html:'<a href="https://help.rallydev.com/apps/2.0rc3/doc/#!/example/standard-report">Standard Report</a>'},
    launch: function() {
        this._projectPicker = Ext.create('Rally.ui.picker.project.ProjectPicker', {
            fieldLabel: 'select project',
            listeners:{
                change: function(combobox){
                    if ( this.down('#report')) {
                        this._report.destroy();
                    }
                    this._onProjectSelected();
                },
                scope: this
            }
        });
        this.add(this._projectPicker);
    },
    _onProjectSelected: function(){
        this._report = Ext.create('Rally.ui.report.StandardReport',{
            itemId: 'report',
            project: this._projectPicker.getValue(),
            projectScopeUp: this.getContext().getProjectScopeUp(),
            projectScopeDown: this.getContext().getProjectScopeDown(),
            width: 600,
            height: 400,
            reportConfig: {
                report: Rally.ui.report.StandardReport.Reports.VelocityChart,
            }
        });
        this.add(this._report);
    }
});
