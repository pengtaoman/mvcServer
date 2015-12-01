//<script language = "JavaScript">
//校验email
//输入参数：
//	1。field_name:错误提示信息"必须是有效的邮件地址！"前面要显示的文字：一般是要校验的页面控件的标签名字；
//	2。form_field：要校验的页面控件
//	3。alert_flag：是否提示出错信息：1,提示；2,不提示
function nas_email_check(field_name,form_field,alert_flag)
{   
	var err_message=field_name+'必须是有效的邮件地址！';
	if(alert_flag == null || alert_flag == ''){
		alert_flag = 1;
	}
	var mail_patten=/^[_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.){1,4}[a-z]{2,3}$/i; 
	var emailvalue=form_field.value;
	var matchArray = emailvalue.match(mail_patten);
	var check_result = new Array();
	
	if (emailvalue.length!=0 && matchArray==null)
	{
		if(alert_flag == 1){
			alert(err_message);	
			form_field.focus();
		}
		return false; 	
	}
}
//</script>

