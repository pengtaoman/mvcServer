var dialog=unieap.getDialog();
var obj=dialog.getObject();
var operatorType=obj["operatorType"];
var userID = obj["userID"];

						
function init(){
	
	//初始化时获得详细信息
	unieap.Action.requestData({
	               url : unieap.WEB_APP_NAME +"/ria_org_user.do?method=getInitDetail",
	               parameters:{"operatorType":operatorType,"userID":userID},
		           sync: false,
		           load: function(a) {
		           	
		           	 adminRoleList.getDataProvider().setDataStore(a.getDataStore("adminRoles"));
		           	 userInfoForm.getBinding().setDataStore(a.getDataStore("baseInfoDS"));
		           	 if(hasExtendInfo=="true"){		           	 	
		           	 	unieap.byId("extendInfoForm_user").getBinding().setDataStore(a.getDataStore("extendInfoDS"));
		           	 }

		           },
		           error:function(a){
		           	   MessageBox.alert({
							title : "信息提示框",
							message : "获取管理角色列表失败！",
							onComplete : "",
							icon : "error"
						});
		           }
	});	
	

}

/**
 * 提交管理员信息
 */
function submit_AdminInfo(){
	
	//增加、修改操作
	if(operatorType=="add"){		
		addAdminUser();
	}else if(operatorType=="update"){
		updateAdminUser();
	}	
}


/**
 * 增加管理员
 */
function addAdminUser(){
	//判断基本属性的form输入域是否合法
	if(!userInfoForm.validate()){
		tab.selectChild(baseInfo);
		return;
	} 
	
	//判断扩展属性的form输入域是否合法
	if(hasExtendInfo=="true" && !unieap.byId("extendInfoForm_user").validate()){
			tab.selectChild(extendInfo);
			return;
	}

	var dc = new unieap.ds.DataCenter();
	var ds = new unieap.ds.DataStore("baseInfoDS"); 
	var baseData = userInfoForm.getHelper().collectData();
	ds.getRowSet().addRow(baseData);
	dc.addDataStore(ds);
		
	if(hasExtendInfo=="true"){
		ds = new unieap.ds.DataStore("extendInfoDS"); 
		var extendData = unieap.byId("extendInfoForm_user").getHelper().collectData();
		ds.getRowSet().addRow(extendData);
		dc.addDataStore(ds);
	}


	//增加管理员
	unieap.Action.requestData({
	               url : unieap.WEB_APP_NAME +"/ria_org_user.do?method=addAdministrator",
		           sync: true,
		           load: function(a) {
		        	  var result = a.getCode();
		        	  if(result==0){	
		        	  		var userID = a.getDetail(); 
							baseData.userID=userID;	
							baseData.operator = operatorType;	        	  		
		        	  		dialog.setReturn(baseData);	
		        	  		dialog.close();	             			
	        	  		
		        	  
		        	  }else{
			        	  	MessageBox.alert({
								title : "信息提示框",
								message : "此帐号已经存在！",
								onComplete : ""
							});
		        	  }
		           },
		           error:function(a){
		           	   
		           	   MessageBox.alert({
							title : "信息提示框",
							message : "增加管理员失败！",
							onComplete : ""
						});
		           }
	},dc);	

	
	
}

/**
 * 更新管理员
 */
function updateAdminUser(){
	
	//判断基本属性的form输入域是否合法
	if(!userInfoForm.validate()){
		tab.selectChild(baseInfo);
		return;
	} 
	
	//判断扩展属性的form输入域是否合法
	if(hasExtendInfo=="true" && !unieap.byId("extendInfoForm_user").validate()){
			tab.selectChild(extendInfo);
			return;
	}
	
	
	var dc = new unieap.ds.DataCenter();
	dc.addDataStore(userInfoForm.getBinding().getDataStore());
		
	if(hasExtendInfo=="true"){
		dc.addDataStore(unieap.byId("extendInfoForm_user").getBinding().getDataStore());
	}
	
	//更新管理员
	unieap.Action.requestData({
	               url : unieap.WEB_APP_NAME +"/ria_org_user.do?method=updateAdmin",
	               parameters:{"userID":userID},
		           sync: true,
		           load: function(a) {		           	
		        	  var result = a.getCode();
		        	  if(result==0){	
		        	  		var userID = a.getDetail(); 
		        	  		var baseData = userInfoForm.getHelper().collectData();
							baseData.userID=userID;	
							baseData.operator = operatorType;	        	  		
		        	  		dialog.setReturn(baseData);	
		        	  		dialog.close();	             			
	        	  		
		        	  
		        	  }else{
			        	  	MessageBox.alert({
								title : "信息提示框",
								message : "此帐号已经存在！",
								onComplete : ""
							});
		        	  }
		           },
		           error:function(a){
		           	   MessageBox.alert({
							title : "信息提示框",
							message : "修改管理员失败！",
							onComplete : ""
						});
		           }
	},dc);
	
	
	
	
}



/**
 * 关闭对话框
 */
function close_Dialog(){
	  //dialog关闭后返回的参数
	 var searchData={};
	 searchData.operator = "close";
	 dialog.setReturn(searchData);
	 dialog.close();
}