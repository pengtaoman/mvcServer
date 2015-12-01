init();
function init(){
		var ds = new unieap.ds.DataStore("userInfo",[
			{
				"userAccount":account,
				"oldPassword":"",
				"newPassword":"",
				"repeatPassword":""		
			}			
		]);
		
		dataCenter.addDataStore(ds);
	
}



function changePassword(){
	var old_Password = oldPassword.getValue();
	var new_Password = newPassword.getValue();
	var repeat_Password = repeatPassword.getValue();
	
	if(old_Password=="" || old_Password==null){
		MessageBox.alert({
			title : "信息提示框",
			message : "请输入旧密码！",
			onComplete : "",
			icon : "warn"
		});
		
		return;
	}
	
	if(new_Password=="" || new_Password==null){
		MessageBox.alert({
			title : "信息提示框",
			message : "请输入新密码！",
			onComplete : "",
			icon : "warn"
		});
		
		return;
	}
	
	if(repeat_Password=="" || repeat_Password==null){
		MessageBox.alert({
			title : "信息提示框",
			message : "请再一次输入新密码！",
			onComplete : "",
			icon : "warn"
		});
		
		return;
	}
	

	if(repeat_Password != new_Password){
		MessageBox.alert({
			title : "信息提示框",
			message : "两次输入的新密码不一致！",
			onComplete : "",
			icon : "warn"
		});
		
		return;
	}
	
	
	var dc = new unieap.ds.DataCenter();
	
	var ds = userInfoForm.getBinding().getDataStore();
	
	dc.addDataStore(ds);

	unieap.Action.requestData({
	               url : unieap.WEB_APP_NAME +"/ria_org_user.do?method=passwordChange",
		           sync: false,
		           load: function(a) {
						var code = a.getCode();
						if(code==1){
							MessageBox.alert({
								title : "信息提示框",
								message : "输入的旧密码错误！",
								onComplete : "",
								icon : "error"
							});
						}else{
							MessageBox.alert({
								title : "信息提示框",
								message : "密码修改成功！",
								onComplete : "",
								icon : "info"
							});
							
							var ds = new unieap.ds.DataStore("userInfo",[
										{
											"userAccount":account,
											"oldPassword":"",
											"newPassword":"",
											"repeatPassword":""		
										}			
									]);
							
							
							userInfoForm.getBinding().setDataStore(ds);
							
						}

		           },
		           error:function(a){	           		
						MessageBox.alert({
							title : "信息提示框",
							message : "修改密码失败！",
							onComplete : "",
							icon : "error"
						});
		           }
		  },dc);

}  