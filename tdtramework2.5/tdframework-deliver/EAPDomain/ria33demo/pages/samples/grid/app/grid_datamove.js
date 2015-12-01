
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
	var store = new unieap.ds.DataStore("empDataStore");
    store.setRowSetName("emp");
	store.setPageSize(10);
    unieap.Action.doQuery(store);
    unieap.byId('grid1').getBinding().setDataStore(dataCenter.getDataStore("empDataStore"));
	dataCenter.addDataStore(new unieap.ds.DataStore('store2'));
});
function toRight(){
    var indexs = unieap.byId('grid1').getManager('SelectionManager').getSelectedRowIndexs();
    var rowset1 = unieap.byId('grid1').getBinding().getDataStore().getRowSet();
    var rowset2 = unieap.byId('grid2').getBinding().getDataStore().getRowSet();
    if (!indexs || indexs.length == 0) {
        alert('没有选择的数据')
    }
    move(rowset1, rowset2, indexs);
}

function toLeft(){
    var indexs = unieap.byId('grid2').getManager('SelectionManager').getSelectedRowIndexs();
    var rowset1 = unieap.byId('grid1').getBinding().getDataStore().getRowSet();
    var rowset2 = unieap.byId('grid2').getBinding().getDataStore().getRowSet();
    if (!indexs || indexs.length == 0) {
        alert('没有选择的数据')
    }
    move(rowset2, rowset1, indexs);
}

function move(rowset1, rowset2, indexs){
    var rows = [];
    dojo.forEach(indexs, function(index){
        var row = rowset1.getRow(index);
        rows.push(row.data);
    })
    rowset2.addRows(rows);
    rowset1.deleteRows(indexs);
}

var jobs = {};
function auto(){
    var indexs = unieap.byId('grid1').getManager('SelectionManager').getSelectedRowIndexs();
    var rowset1 = unieap.byId('grid1').getBinding().getDataStore().getRowSet();
    var rowset2 = unieap.byId('grid2').getBinding().getDataStore().getRowSet();
    
    var autofunction = function(){
        jobs.timeout && clearTimeout(jobs.timeout)
        jobs.timeout = setTimeout(function(){
            var row = rowset1.getRow(0);
            if (row) {
                rowset2.addRow(row.data)
                rowset1.deleteRow(0)
                autofunction.call();
            }
            else {
                autofunction2()
            }
        }, 400)
    }
    var autofunction2 = function(){
        jobs.timeout && clearTimeout(jobs.timeout)
        jobs.timeout = setTimeout(function(){
            var row = rowset2.getRow(0);
            if (row) {
                rowset1.addRow(row.data)
                rowset2.deleteRow(0)
                autofunction2.call();
            }
            else {
                autofunction();
            }
        }, 400)
    }
    autofunction();
}

function stop(){
    jobs.timeout && clearTimeout(jobs.timeout);
}
