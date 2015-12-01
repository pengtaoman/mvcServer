var selectNode;
dojo.require("unieap.dialog.MessageBox");

init();

//点击树节点时触发的事件
function treeNodeClick(node){
	selectNode = node;
	document.getElementById("tree_root_title").value=node.getData().label;	
	
	var userID = node.getData().id;
	
	unieap.Action.requestData({
			url:unieap.WEB_APP_NAME+ "/tree_form_grid.do?method=getPrivilegesOfUser",
			sync:true,
			parameters:{"userID":userID},
			load:function(datacenter){ //load 为请求成功的回调函数
				unieap.byId("userPrivilegeGrid").getBinding().setDataStore(datacenter.getDataStore("userPrivilegeDS"));			
			}			
	});
	
	
}

//自定义树图标
function selfDefineIconClass(item,opened, isExpandable){
	return "testTreeIconForFemale";
}

//初始化
function init(){
	
	//获得Database、Country和Year的datastore
	unieap.Action.requestData({
			url:unieap.WEB_APP_NAME+ "/tree_form_grid.do?method=getInfos",
			sync:true,
			load:function(datacenter){ //load 为请求成功的回调函数			
				dataCenter.addDataStore(datacenter.getDataStore("databaseDS"));
				dataCenter.addDataStore(datacenter.getDataStore("countryDS"));
				dataCenter.addDataStore(datacenter.getDataStore("yearDS"));	
				dataCenter.addDataStore(datacenter.getDataStore("procedureDS"));						
			}			
	});	
}

//新增
function doInsert(){
	
	if(!selectNode){
		MessageBox.alert ({
			title:"信息提示框",
			message:"请选择一个用户！",
			icon:"info"
		}); 
		return;
	}
	document.getElementById("editDiv").style.display="block";
}

//删除用户权限
function doDelete(){
	var rowsIndex = unieap.byId("userPrivilegeGrid").getManager("SelectionManager").getSelectedRowIndexs();   
    unieap.byId("userPrivilegeGrid").getBinding().getDataStore().getRowSet().deleteRows(rowsIndex);
}

//保存用户权限
function doSumbit(){
	
	 //==========持久化以后更新grid的状态，这里省略持久化部分=============
	 
	 MessageBox.alert ({
			title:"信息提示框",
			message:"保存成功！",
			icon:"info"
	 });
	 //刷新grid的RowSet的状态
	 unieap.byId("userPrivilegeGrid").getBinding().getDataStore().getRowSet().resetUpdate();
	 
}

//DataBase下拉框的onChange事件
function dbOnChange(value){
	
	 unieap.Action.requestData({
			url:unieap.WEB_APP_NAME+ "/tree_form_grid.do?method=createQueryInput",
			parameters:{"dbID":unieap.byId("db").getValue()},
			sync:true,
			load:function(datacenter){ //load 为请求成功的回调函数
			    var dsnames = datacenter.getParameter("dsName");

			   var dsName = dsnames.split(",");
			   
			    for(var i=0;i<dsName.length;i++){
			    	dataCenter.addDataStore(datacenter.getDataStore(dsName[i]));
			    }		    
			    	
				var html = datacenter.getParameter("html");
				document.getElementById("queryDiv").innerHTML = html;
				dojo.parser.parse(document.getElementById("queryDiv"));
				
				var buttondiv_display = document.getElementById("buttonDiv").style.display;
				
				if(buttondiv_display=="none"){
					document.getElementById("buttonDiv").style.display="block";
				}
				
			}			
	});
	
	
}

//查询权限列表
function queryPrivilege(){
	
	 unieap.Action.requestData({
			url:unieap.WEB_APP_NAME+ "/tree_form_grid.do?method=getPrivilegeList",
			sync:true,
			load:function(datacenter){ //load 为请求成功的回调函数
				unieap.byId("privilegeListGrid").getBinding().setDataStore(datacenter.getDataStore("privilegeListDS"));
			}			
	});
	
	document.getElementById("privilegeListDiv").style.display="block";
}

//取消新增权限
function CancelNewPrivilege(flag){
	
	hiddenDiv(flag);

}

//新增用户权限
function addNewPrivilege(){
	
	var ds = unieap.byId("privilegeListGrid").getBinding().getDataStore();
	
	//收集更新的ds
	var updateRowSet = ds.collect("update").getRowSet();
	
	for(var i=0;i<updateRowSet.getRowCount();i++){
		var row = updateRowSet.getRow(i);
		var data={
			"database":unieap.byId("db").getValue(),
			"country":unieap.byId("country").getValue(),
			"procedure":row.getItemValue("procedureName")
		};

		//unieap.byId("userPrivilegeGrid").getManager("EditManager").insertRow(data);
		unieap.byId("userPrivilegeGrid").getBinding().insertRow(data);//使用该方法插入数据是在表格的最后一行插入
		
		var rowCount = unieap.byId("userPrivilegeGrid").getBinding().getDataStore().getRowSet().getRowCount();
		
		unieap.byId("userPrivilegeGrid").getManager("SelectionManager").setSelect(rowCount-1);
		
	}
	
	unieap.byId("userPrivilegeGrid").getBinding().getDataStore().getRowSet().resetUpdate();
	
    hiddenDiv(1);
	
	MessageBox.alert ({
			title:"信息提示框",
			message:"新增权限成功！",
			icon:"info"
	}); 	
}

//隐藏div
function hiddenDiv(flag){
	
	document.getElementById("editDiv").style.display="none";
	unieap.byId("form").clear();
	document.getElementById("buttonDiv").style.display="none";
	
	document.getElementById("queryDiv").innerHTML="";
	if(flag==1){
		document.getElementById("privilegeListDiv").style.display="none";
		unieap.byId("privilegeListGrid").getBinding().setDataStore(null);
	}
}





