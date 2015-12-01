//dojo.addOnLoad(init);


init();
//初始化
function init(){
	
	unieap.Action.requestData({
           url : unieap.WEB_APP_NAME +"/ria_org_adminrole.do?method=getDirectAdministrativeRoles",
           sync: true,
           error:function(a){
           	   MessageBox.alert({
					title : "信息提示框",
					message : "获取安全管理角色列表失败！",
					onComplete : "",
					icon : "error"
				});
           }
	});	
	
}



//新增管理角色
function addAdminRole(){
	
	DialogUtil.showDialog({ 
	   url : unieap.appPath +"/pages/manager_ria/orgnization/roleManager/adminRoleManager/jsp/adminRoleDetail.jsp",
	   width : "340", 
	   height : "380", 
	   title : "增加安全管理角色对话框",
	   dialogData:{operatorType:"add"},
	   onComplete : dialogCallBack 
	});
	
}





//修改管理角色
function modifyAdminRole(){
	
	var selectedRows = adminRoleGrid.getBinding().getRowSet().getSelectedRows();
	
	if(selectedRows.length<=0){
		MessageBox.alert({
			title : "信息提示框",
			message : "请选择一条记录！",
			onComplete : ""
		});
		return;
	}
	
	if(selectedRows.length>1){
		MessageBox.alert({
			title : "信息提示框",
			message : "只能选择一条记录！",
			onComplete : ""
		});
		return;
	}
	
	
	DialogUtil.showDialog({ 
	   url : unieap.appPath +"/pages/manager_ria/orgnization/roleManager/adminRoleManager/jsp/adminRoleDetail.jsp",
	   width : "340", 
	   height : "380", 
	   title : "修改安全管理角色对话框",
	   dialogData:{operatorType:"update",roleID:selectedRows[0].getItemValue("id")},
	   onComplete : dialogCallBack
	});	
	
}

//删除管理角色
function deleteAdminRole(){
	var rowsIndex = adminRoleGrid.getManager("SelectionManager").getSelectedRowIndexs();
	
	if(rowsIndex.length<=0){
		MessageBox.alert({
			title : "信息提示框",
			message : "请选择一条记录！",
			onComplete : ""
		});
		return;
	}
	
	if(hasAdminRole()){
	
		MessageBox.alert({
			title : "信息提示框",
			message : "超级管理员不允许删除！",
			onComplete : ""
		});
		return;
	}
	
	
	
	//删除选中行
	adminRoleGrid.getBinding().getDataStore().getRowSet().deleteRows(rowsIndex);
	
	var gridDS = adminRoleGrid.getBinding().getDataStore();
	//收集删除的row
	gridDS = gridDS.collect("delete");
	
	var dc = new unieap.ds.DataCenter();
	dc.addDataStore(gridDS);
	
	unieap.Action.requestData({
           url : unieap.WEB_APP_NAME +"/ria_org_adminrole.do?method=removeAdminRoles",
           sync: true,
           load: function(a) {
 				 
 				 if(a.getDetail()=="false"){

						MessageBox.alert({
							title : "信息提示框",
							message : "该角色包含下级角色不能删除！",
							onComplete : function(){
								 adminRoleGrid.getBinding().getDataStore().getRowSet().discardUpdate();
								 adminRoleGrid.refresh();
							}
						 });
						
 				 	
 				 }else{
	 				 //设置RowSet的状态
	 				 adminRoleGrid.getBinding().getDataStore().getRowSet().resetUpdate();
	 				 
	           	  	 MessageBox.alert({
						title : "信息提示框",
						message : "安全管理角色删除成功！",
						onComplete : "",
						icon : "info"
					 });				 	
 				 }
 				 

				 	
           },
           error:function(a){   	    	
           	   MessageBox.alert({
					title : "信息提示框",
					message : "安全管理角色删除失败！",
					onComplete : function(){
						adminRoleGrid.getBinding().getDataStore().getRowSet().discardUpdate();
						adminRoleGrid.refresh();
					}
				});
           }
	},dc); 	
	
		
}

function hasAdminRole(){
	var flag = false;
	var selectedRows = adminRoleGrid.getBinding().getRowSet().getSelectedRows();
	var row;
	for(var i=0;i<selectedRows.length;i++){
		row = selectedRows[i];
		if(row.getItemValue("id")=="adminRole"){
			flag = true;
			break;
		}
	}
	
	return flag;
}



//对话框关闭时的回调函数
function dialogCallBack(value){
	
      var operatorType = value.operator;
	
	  if(operatorType=="add"){	
	  		  	 
	  	 var data = {
	  	 	id:value.adminRoleID,
	        roleName: value.roleName,
	        description: value.description
	     };
	     
	     adminRoleGrid.getBinding().insertRow(data);	    
	     adminRoleGrid.getBinding().getRowSet().resetUpdate();  //更新rowset的状态
	  	
		 MessageBox.alert({
			title : "信息提示框",
			message : "安全管理角色添加成功！",
			onComplete : "",
			icon : "info"
		  });
		 
	  }else if(operatorType=="update"){
	  	
	  	 var roleName = value.roleName;
    	 var description = value.description;

	  	 var selectedRows = adminRoleGrid.getBinding().getRowSet().getSelectedRows();
	  	 selectedRows[0].setItemValue("roleName",roleName);
	  	 selectedRows[0].setItemValue("description",description);	
	  	 adminRoleGrid.getBinding().getRowSet().resetUpdate(); 
	  	  	  	
	  	 MessageBox.alert({
			title : "信息提示框",
			message : "安全管理角色修改成功！",
			onComplete : "",
			icon : "info"
		 });
	 }
	
}