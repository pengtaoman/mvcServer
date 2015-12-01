
init();

function init(){
	unieap.Action.requestData({
	               url : unieap.WEB_APP_NAME +"/ria_org_user.do?method=getAdminUsers",
		           sync: true,
		           load: function(a) {
		        	  dataCenter.addDataStore(a.getDataStore("adminUserDS"));
		           },
		           error:function(a){
		           	   MessageBox.alert({
							title : "信息提示框",
							message : "获取管理员列表失败！",
							onComplete : "",
							icon : "error"
						});
		           }
	});		
}



/**
 * 增加管理员
 */
function addAdminUser(){		
	DialogUtil.showDialog(
		{
			url: unieap.WEB_APP_NAME+"/ria_org_user.do?method=beginAdminDetail",
			height: 400,
			width: 400,
			dialogData: {operatorType:"add"},
			onComplete: dialogCallBack
		}
	);		
}


/**
 * 修改管理员
 */
function modifyAdminUser(){
	
	var selectedRows = adminUserGrid.getBinding().getRowSet().getSelectedRows();
	
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
	   url : unieap.WEB_APP_NAME +"/ria_org_user.do?method=beginAdminDetail",
	   width :400, 
	   height :400, 
	   title : "修改管理员对话框",
	   dialogData:{operatorType:"update",userID:selectedRows[0].getItemValue("id")},
	   onComplete : dialogCallBack
	});	
}


/**
 * 弹出对话框关闭后的回调函数
 */
function dialogCallBack(value){
	var operatorType = value.operator;
	
	var fullName = value.fullName;
	var account = value.account;
	var desc = value.description;
	var userID = value.userID;
	
	if(operatorType=="add"){

	  	 
	  	var data = {
	    	id:userID,
	    	account:account,
	        fullName: fullName,
	        description: desc
	    };
	    
	    adminUserGrid.getBinding().insertRow(data);	    
	    adminUserGrid.getBinding().getRowSet().resetUpdate();  //更新rowset的状态
    	MessageBox.alert({
			title : "信息提示框",
			message : "增加管理员成功！",
			onComplete : function(){
				
			}
		});	
	    
	}else if(operatorType=="update"){
		
		var selectedRows = adminUserGrid.getBinding().getRowSet().getSelectedRows();
		selectedRows[0].setItemValue("account",account);
	  	selectedRows[0].setItemValue("fullName",fullName);
	  	selectedRows[0].setItemValue("description",desc);
	  	adminUserGrid.getBinding().getRowSet().resetUpdate();  //更新rowset的状态
	  	
	  	MessageBox.alert({
			title : "信息提示框",
			message : "更新管理员成功！",
			onComplete : function(){
				
			}
		});	
	}

	
}


/**
 * 删除管理员
 */
function deleteAdminUser(){
	
	var rowsIndex = adminUserGrid.getManager("SelectionManager").getSelectedRowIndexs();
	
	if(rowsIndex.length<=0){
		MessageBox.alert({
			title : "信息提示框",
			message : "请选择一条记录！",
			onComplete : "",
			icon : "warn"
		});
		return;
	}
	
	//删除选中行
	adminUserGrid.getBinding().getDataStore().getRowSet().deleteRows(rowsIndex);
		
	var gridDS = adminUserGrid.getBinding().getDataStore();
	//收集删除的row
	gridDS = gridDS.collect("delete");
	
	var dc = new unieap.ds.DataCenter();
	dc.addDataStore(gridDS);
	
	unieap.Action.requestData({
           url : unieap.WEB_APP_NAME +"/ria_org_user.do?method=removeAdmin",
           sync: true,
           load: function(a) {
 				 
 				 //设置RowSet的状态
 				 adminUserGrid.getBinding().getDataStore().getRowSet().resetUpdate();
 				 
           	  	 MessageBox.alert({
					title : "信息提示框",
					message : "安全管理员删除成功！",
					onComplete : "",
					icon : "info"
				 });
				 	
           },
           error:function(a){
   	    	
           	   MessageBox.alert({
					title : "信息提示框",
					message : "安全管理员删除失败！",
					onComplete : function(){
						adminUserGrid.getBinding().getDataStore().getRowSet().discardUpdate();
						adminUserGrid.refresh();
           	  		    //adminUserGrid.getBinding().setDataStore(adminUserGrid.getBinding().getDataStore());
					}
				});
           }
	},dc); 	
  	
	
	
}