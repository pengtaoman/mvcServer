dojo.provide("unieap.tests.robot.logic.ds.test_rowset");
dojo.require("unieap.ds");
dojo.addOnLoad(function(){
    test_RowSet();
})
function test_RowSet(){
    var testRowSet = null;
    var rowset = getRowSet();
    test(rowset);
}

function test(rowset){
    doh.registerGroup("RowSet方法测试", [
	function test_isModified(){
        doh.is(false, rowset.isModified());
		 rowset.addRow({
            'primary': 'primary3'
        });
		 doh.is(true, rowset.isModified());
    }, 
	
	function test_toData(){
        var data = rowset.toData();
        doh.is('primary1', data['primary'][0]['primary']);
        doh.is('filter1', data['filter'][0]['filter']);
    }, 
	
	function test_getTotalCount(){
        doh.is(3, rowset.getTotalCount());
    }, 
	
	function test_getRowCount(){
		doh.is(2, rowset.getRowCount());
        rowset.addRow({
            'primary': 'primary3'
        });
        doh.is(3, rowset.getRowCount());
    }, 
	
	function test_getInitialCount(){
        doh.is(2, rowset.getInitialCount());
    }, 
	
	function test_isEmpty(){
        doh.is(false, rowset.isEmpty());
        doh.is(true, (new unieap.ds.RowSet()).isEmpty())
    }, 
	
	function test_reset(){
        doh.is(false, rowset.isEmpty());
        rowset.reset();
        doh.is(true, rowset.isEmpty())
        
    }, 
	function test_addRow(){
         rowset.addRow({
            'primary': 'primary3'
        });
		doh.is('primary3',rowset.getItemValue(2,'primary'))
    },
	function test_addRows(){
		rowset.addRows([{
			'primary': 'primary3'
		},{
			'primary': 'primary4'
		}])
		doh.is('primary3',rowset.getItemValue(2,'primary'))
		doh.is('primary4',rowset.getItemValue(3,'primary'))
	},
	function test_insertRow(){
		rowset.insertRow({
			'primary': 'primary3'
		})
		doh.is('primary3',rowset.getItemValue(2,'primary'))
		rowset.insertRow({
			'primary': 'primary4'
		},0)
		doh.is('primary4',rowset.getItemValue(0,'primary'))
	},
	function test_deleteRow(){
		rowset.deleteRow(0);
		doh.is(1,rowset.getRowCount());
	},
	function test_deleteRows(){
		doh.is(2,rowset.getRowCount());
		doh.is(0,rowset.getRowCount(2));
		rowset.deleteRows([-1,0,1,2,3,4,5]);
		doh.is(0,rowset.getRowCount());
		doh.is(2,rowset.getRowCount(2));
	},
	function test_deleteAllRows(){
		doh.is(2,rowset.getRowCount());
		doh.is(0,rowset.getRowCount(2));
		rowset.deleteAllRows();
		doh.is(0,rowset.getRowCount());
		doh.is(3,rowset.getRowCount(2));
	},
	function test_unDeleteRow(){
		rowset.deleteRow(0);
		doh.is(1,rowset.getRowCount());
		rowset.unDeleteRow(0)
		doh.is(2,rowset.getRowCount());
	},
	function test_unDeleteAll(){
		rowset.deleteAllRows();
		rowset.unDeleteAll();
		doh.is(3,rowset.getRowCount());
	},
	function test_rowsDiscard(){
		rowset.rowsDiscard();
		doh.is(0,rowset.getRowCount());
		doh.is(0,rowset.getRowCount(2));
	},
	function test_selectRows(){
		rowset.selectRows(true);
		doh.is(2,rowset.getSelectedCount())
		var rows=rowset.getSelectedRows();
		doh.is(rows[0]['data']['primary'],'primary1')
		doh.is(rows[1]['data']['primary'],'primary2')
		var indexs=rowset.getSelectedRowIndexs();
		doh.is(0,indexs[0]);
		doh.is(1,indexs[1]);
		doh.is(2,indexs.length);
		var unrows=rowset.getUnSelectedRows();
		doh.is(0,unrows.length);
		var unindexs=rowset.getUnSelectedRowIndexs();
		doh.is(0,unindexs.length);
		
	},
	function test_deleteSelectedRows(){
		rowset.selectRows(true);
		rowset.deleteSelectedRows();
		doh.is(0,rowset.getRowCount());
		doh.is(2,rowset.getRowCount(2));
	},
	function test_getRow(){
		var row=rowset.getRow(0);
		doh.is(row['data']['primary'],'primary1');
		row=rowset.getRow();
		doh.is(null,row);
		row=rowset.getRow(-1);
		doh.is(null,row);
	},
	function test_getRowData(){
		var data=rowset.getRowData(0);
		doh.is(data['primary'],'primary1');
	},
	function test_forEach(){
		rowset.forEach(function(row,index){
			var v='primary'+(index+1);
			var rv=row['data']['primary'];
			doh.is(v,rv);
		})
	},
	function test_every(){
		var e=rowset.every(function(row){
			return row['data']['primary']=='primary1'
		})
		doh.is(false,e)
	},
	function test_some(){
		var e=rowset.some(function(row){
			return row['data']['primary']=='primary1'
		})
		doh.is(true,e)
	}
	
], function(){
        var fs = doh._groups['RowSet.functions'];
        dojo.forEach(fs, function(test){
            dojo.mixin(test, {
                setUp: function(){
                    rowset = getRowSet();
                }
            })
        })
    });
}

function getRowSet(){
    return new unieap.ds.RowSet({
        'primary': [{
            'primary': 'primary1'
        },{
			'primary': 'primary2'
		}],
        'filter': [{
            'filter': 'filter1'
        }]
    });
}
