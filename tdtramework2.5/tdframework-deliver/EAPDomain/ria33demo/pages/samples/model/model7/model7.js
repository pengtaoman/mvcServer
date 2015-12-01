var emp_ds=new unieap.ds.DataStore("empDataStore");
emp_ds.setRowSetName("emp");
emp_ds.setPageSize(20);
dataCenter.addDataStore(emp_ds);

var asset_ds=new unieap.ds.DataStore("assetDataStore");
asset_ds.setRowSetName("asset");
asset_ds.setPageSize(20);
dataCenter.addDataStore(asset_ds);

var flag=false; //表示是否已经进行了查询



//选择部门
function doQuery(){
	flag=false;
	dojo.require("unieap.dialog.Dialog");
	var config={
		url:unieap.appPath+"/pages/samples/model/model7/model7_dialog.jsp",
		width:'800',
		height:'450',
		title:'查询部门信息',
		onComplete:function(obj){
			unieap.byId("deptNo").setValue(obj['attr_deptno']);
			unieap.byId("deptName").setValue(obj['attr_dname']);
			unieap.byId("deptLoc").setValue(obj['attr_loc']);
			queryEmpInfo(obj['attr_deptno']);
			queryAssetInfo(obj['attr_deptno']);
			flag=true;
		}
	}
	var dialog=new unieap.dialog.Dialog(config);
	dialog.show(unieap.byId("dept").domNode)
}

//查询职员信息表
function queryEmpInfo(deptNo){
	var ds=dataCenter.getDataStore("empDataStore");
	ds.setPageNumber(1);//强制从第一页开始显示
	ds.removeConditionValues();
	ds.setCondition(null);
	ds.setRecordCount(0); //清空原始记录数
	ds.setCondition("attr_deptno=="+deptNo);
	unieap.Action.doQuery(ds,{
		load: function(revDs){
			unieap.byId("empGrid").getBinding().setDataStore(revDs);
		}
	});


}

//资产信息查询
function queryAssetInfo(deptNo){
	var ds=dataCenter.getDataStore("assetDataStore");
	ds.setPageNumber(1);//强制从第一页开始显示
	ds.setRecordCount(0); //清空原始记录数
	ds.setCondition("attr_deptno=="+deptNo);
	unieap.Action.doQuery(ds,{
		load: function(revDs){
			unieap.byId("assetGrid").getBinding().setDataStore(revDs);
		}
	});
}

//员工表增加信息
function emp_add(){
	if(flag){
		unieap.byId("empGrid").getManager("EditManager").insertRow({
			attr_empno:'',
			attr_job:'',
			attr_ename:'',
			attr_sal:'',
			attr_hiredate:'',
			attr_deptno:unieap.byId("deptNo").getValue()
		});
	}else{
		dojo.require("unieap.dialog.MessageBox");
		MessageBox.alert({message :"请先查询数据后再进行增加!"});
	}
}

//删除数据
function emp_del(){
	var index=unieap.byId("empGrid").getManager("SelectionManager").getSelectedRowIndexs();
	if(index.length>0){
		unieap.byId("empGrid").getManager("EditManager").deleteRows(index);
	}else{
		dojo.require("unieap.dialog.MessageBox");
		MessageBox.alert({message :"没有要删除的数据!"});
	}
}

//保存数据
function emp_save(){
	if(flag){
		var store=unieap.byId("empGrid").getBinding().getDataStore();
		unieap.Action.doUpdate(store,{load:function(){
			unieap.byId("empGrid").getManager("ViewManager").refresh();
//			alert('更新成功');
		}})
	}else{
		dojo.require("unieap.dialog.MessageBox");
		MessageBox.alert({message :"请先执行查询操作后再执行本操作!"});
	}
}


//资产表增加信息
function asset_add(){
	if(flag){
		unieap.byId("assetGrid").getManager("EditManager").insertRow({
			attr_assetno:'',
			attr_name:'',
			attr_type:'',
			attr_limit:'',
			attr_start_date:'',
			attr_quantity:'',
			attr_deptno:unieap.byId("deptNo").getValue()
			
		});
	}else{
		dojo.require("unieap.dialog.MessageBox");
		MessageBox.alert({message :"请先执行查询操作后再进行增加!"});
	}
}

//删除资产信息
function asset_del(){
	var index=unieap.byId("assetGrid").getManager("SelectionManager").getSelectedRowIndexs();
	if(index.length>0){
		unieap.byId("assetGrid").getManager("EditManager").deleteRows(index);
	}else{
		dojo.require("unieap.dialog.MessageBox");
		MessageBox.alert({message :"没有要删除的数据!"});
	}
}

//保存资产数据
function asset_save(){
	if(flag){
		var store=unieap.byId("assetGrid").getBinding().getDataStore();
		unieap.Action.doUpdate(store,{load:function(){
			unieap.byId("assetGrid").getManager("ViewManager").refresh();
//			alert('更新成功');
		}})
	}else{
		dojo.require("unieap.dialog.MessageBox");
		MessageBox.alert({message :"请先执行查询操作后再执行本操作!"});
	}
}



