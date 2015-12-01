//校验两次密码是否相符
//password_field 第一次输入的密码
//re_password_field 第二次输入的密码
//method为0时表示提示错误信息而不返回值,为1时表示仅返回错误信息
function compare_password(password_field,re_password_field,method){
        var message = "密码与确认密码不符!";
        if (password_field.value != re_password_field.value){
            if (method == 0){
                alert(message);
                password_field.select();
                password_field.focus();
                return;
                }else{
                return message;
                }
            }
    if (method == 0){
        return;
        }else{
        return "";
    }
}   

//长度校验函数
//target对象
//min最小长度
//max最大长度
//targetname对象名称
function check_length(target,min,max,targetname){
    if (target.value.length < min || target.value.length > max){
        alert(targetname+"长度应在"+min+"到"+max+"位之间！");
        target.focus();
        target.select();
        return false;
    }
    return true;
}           
//校验帐号长度
function check_WorkNo_length(target){
    if (!check_length(target,3,18,'帐号'))
        return false;
    return true;
}
//校验密码长度
function check_WorkPwd_length(target){
    if (!check_length(target,6,15,'密码'))
        return false;
    return true;
}

	//验证表单对象是否合法
	function checkForm(){
	    getValues();
	//开始校验必填的项目
		if(nas_check_no_null('姓名',myform.EmployeeName,0)==false)
			return false;
		if(nas_check_no_null('职位',myform.BusDutyId,1)==false)
			return false;
		if(nas_check_no_null('所属区域',myform.AreaId,0)==false)
			return false;
		if(nas_check_no_null('组织机构',myform.OrganId,0)==false)
			return false;
		if(nas_check_no_null('职务',myform.DutyId,1)==false)
			return false;
		if(nas_check_no_null('登陆账号',myform.WorkNo,0)==false)
			return false;
		//验证帐号长度
		if  (check_WorkNo_length(myform.WorkNo)==false)
			return false;
		if(nas_check_no_null('密码',myform.WorkPwd,0)==false)
			return false;
		//验证密码长度
		if(check_WorkPwd_length(myform.WorkPwd)==false)
			return false;
		if(nas_check_no_null('确认密码',myform.WorkPwdConfirm,0)==false)
			return false;
		//账号失效日期
		if (nas_check_date(myform.InactiveDate,10)==false)
		{
			return false;
		}
		//密码失效日期
		if (nas_check_date(myform.InactivePwdDate,10)==false)
		{
			return false;
		}
		//出生日期
		if (nas_check_date(myform.Birthday,10)==false)
		{
			return false;
		}
		//入职日期
		if (nas_check_date(myform.HiredDate,10)==false)
		{
			return false;
		}
		//转正日期
		if (nas_check_date(myform.ContractDate,10)==false)
		{
			return false;
		}
		//辞职日期
		if (nas_check_date(myform.ResignedDate,10)==false)
		{
			return false;
		}
		//变更日期
		if (nas_check_date(myform.UpdateDate,10)==false)
		{
			return false;
		}
			
		if (myform.WorkPwd.value!=myform.WorkPwdConfirm.value){
			alert ('两次输入密码不符');
			myform.WorkPwdConfirm.focus();
			myform.WorkPwdConfirm.select();
			return false;
		}
//校验输入值的合法性
		var myMsg=nas_ip_onlost(myform.WorkPwd,'ck_underline','密码必须只能由母、数字和下划线组成');
		if (myMsg.status==false){
			alert (myMsg.message);
			myform.LoginIp.focus();
			return false;
		}

		if (strLoginIp.length!=0){				//校验IP地址的合法性
			var myMsg=nas_ip_onlost(myform.LoginIp,'ck_ip','请输入合法的IP地址');
			if (myMsg.status==false){
				alert (myMsg.message);
				myform.LoginIp.focus();
				return false;
			}
		}
		if (strMac.length!=0){				//校验MAC地址的合法性
			var myMsg=nas_ip_onlost(myform.Mac,'ck_mac','请输入合法的MAC地址');
			if (myMsg.status==false){
				alert (myMsg.message);
				myform.Mac.focus();
				return false;
			}
		}
		if (strMobile.length!=0){				//校验移动电话的合法性
			var myMsg=nas_ip_onlost(myform.Mobile,'ck_mobile','请输入合法的手机号码');
			if (myMsg.status==false){
				alert (myMsg.message);
				myform.Mobile.focus();
				return false;
			}
		}
		if (strEmail.length!=0){	//校验Email地址的合法性
			if (nas_email_check('电子邮件',myform.Email,1)==false)
				return false;
		}
		if (strWorkTelephone.length!=0){				//校验办公电话的合法性
			var myMsg=nas_ip_onlost(myform.WorkTelephone,'ck_number','请输入合法的电话号码');
			if (myMsg.status==false){
				alert (myMsg.message);
				myform.WorkTelephone.focus();
				return false;
			}
		}
		if (strFax.length!=0){				//校验传真的合法性
			var myMsg=nas_ip_onlost(myform.Fax,'ck_number','请输入合法的电话');
			if (myMsg.status==false){
				alert (myMsg.message);
				myform.Fax.focus();
				return false;
			}
		}				
		if (strHoneTelephone.length!=0){				//校验家庭电话的合法性
			var myMsg=nas_ip_onlost(myform.HoneTelephone,'ck_number','请输入合法的电话');
			if (myMsg.status==false){
				alert (myMsg.message);
				myform.HoneTelephone.focus();
				return false;
			}
		}	
		return true;	
	}
	function check_null(){
	}