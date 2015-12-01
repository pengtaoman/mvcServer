
function importExcel(){
    if (!unieap.byId("impFile").getValue()) {
        return;
    }
    unieap.Action.upload({
        url: unieap.appPath + "/importExcel.do?method=importExcel",
        form: 'form',
        load: function(res){
            var dc = new unieap.ds.DataCenter(res);
            dataCenter.append(dc, 'discard');
            unieap.byId("grid").getBinding().setDataStore(dc.getDataStore('studentStore'));
            var row = dc.getDataStore('classStore').getRowSet().getRow(0);
            unieap.byId("gridTitlePane").setTitle(row.getItemValue('className'));
        },
        error: function(dc){
            alert('error');
        }
    });
}
