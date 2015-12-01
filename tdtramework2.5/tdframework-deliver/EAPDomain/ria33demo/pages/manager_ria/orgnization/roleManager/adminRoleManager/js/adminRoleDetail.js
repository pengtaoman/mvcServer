var dialog=unieap.getDialog();
var obj=dialog.getObject();
var operatorType=obj["operatorType"];
var roleID = obj["roleID"];
//var isFirstOpenTree=true;
//
//
//
dojo.addOnLoad(init);


/**
 * 如果往后台传递其他变量参数，可以重新写getPostData方法
 */
function getPostData(item){
	var dc = new unieap.ds.DataCenter();	
	var nodeType = item.data.nodeType;

	if(nodeType){		
		dc.setParameter("nodeType",nodeType);	   
    }
    return dc;
}


//初始化
function init(){	  
	    
	    var url;
	    if(operatorType=="add"){
	    	url = unieap.WEB_APP_NAME +"/ria_org_adminrole.do?method=getAdminRoleDetails";
	    }else if(operatorType=="update"){
	    	url = unieap.WEB_APP_NAME +"/ria_org_adminrole.do?method=getAdminRoleDetails&roleID="+roleID;
	    }
	    	
		unieap.Action.requestData({
	               url :url,
		           sync: true,
		           load: function(a) {
		           	  //包含人员列表
		           	  containPsns.getDataProvider().setDataStore(a.getDataStore("usersDS"));
		           	  //可管理的业务角色列表
		           	  busRoles.getDataProvider().setDataStore(a.getDataStore("adminedBusRolesDS"));
		           	  //可管理的动态角色列表
		           	  dynimicRoles.getDataProvider().setDataStore(a.getDataStore("adminedDynamicRolesDS"));
		           	  
		           	  if(operatorType=="update"){   
		           	  	//adminRoleInfoForm.getBinding().setDataStore(C); 
		           	  	adminRoleInfoForm.getBinding().bind(a.getDataStore('roleDetail').getRowSet().getRow(0));

		           	  }
		           	  
		           },
		           error:function(a){
		           	   MessageBox.alert({
							title : "信息提示框",
							message : "详细信息失败！",
							onComplete : "",
							icon : "error"
						});
		           }
	  });
}

//提交
function submitAdminRoleInfo(){

	var dc = new unieap.ds.DataCenter(); 
		
	if(adminRoleInfoForm.validate()){
		
		var url="";
		errorMessage="";
		if(operatorType=="add"){		
			url = "/ria_org_adminrole.do?method=addAdminRole";
			errorMessage = "增加管理员失败！";
			
			var ds = new unieap.ds.DataStore("roleDetail"); 
			var baseData = adminRoleInfoForm.getHelper().collectData();
			ds.getRowSet().addRow(baseData);
			dc.addDataStore(ds);
			
			
		}else if(operatorType=="update"){
			url = "/ria_org_adminrole.do?method=updateAdminRole&roleID="+roleID;
			errorMessage="修改管理员失败！";
			dc.addDataStore(adminRoleInfoForm.getBinding().getDataStore());			
		}


	  	unieap.Action.requestData({
           url : unieap.WEB_APP_NAME +url,
           sync: true,
           load: function(a) {           	               	      
	           	  var backData={};           	      
           	      backData.roleName = roleName.getValue();
           	      backData.description = description.getValue();
           	      backData.operator = operatorType;
           	      if(operatorType=="add"){
           	      	var adminRoleID = a.getDetail();
           	      	backData.adminRoleID = adminRoleID;
           	      }          	      
           	      dialog.setReturn(backData);	
	              dialog.close();          	      
           },
           error:function(a){
            	   MessageBox.alert({
					title : "信息提示框",
					message : errorMessage,
					onComplete : "",
					icon : "error"
				});
           }
		},dc);
	}
	
}


//关闭对话框
function close_Dialog(){
	 //dialog关闭后返回的参数
	 var searchData={};
	 searchData.operator = "close";
	 dialog.setReturn(searchData);
	 dialog.close();
}
   

/**
 * 如果往后台传递其他变量参数，可以重新写getPostData方法
 */
function getPostData(item){
	var dc = new unieap.ds.DataCenter();	
	var nodeType = item.data.nodeType;

	if(nodeType){		
		dc.setParameter("nodeType",nodeType);	
		dc.setParameter("dimID",item.data.dimID);   
    }
    return dc;
	
}

/**
 * 自定义组织单元树的样式
 */
function selfDefineIconClass(item,opened, isExpandable){

	if(item.data.nodeType=="unit"){
		return 'unitNode';
	}else if(item.data.nodeType=="dimension"){
		return 'dimensionNode';
	}else{
	   var clsName = (!item || isExpandable) ? (opened ? "dijitFolderOpened" : "FolderClosed") : "Leaf";   
       return clsName 
	}
		
}
