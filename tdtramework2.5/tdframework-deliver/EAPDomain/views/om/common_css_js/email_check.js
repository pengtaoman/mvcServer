//<script language = "JavaScript">
//校验email
//输入参数：
//	1。field_name:错误提示信息"必须是有效的邮件地址！"前面要显示的文字：一般是要校验的页面控件的标签名字；
//	2。form_field：要校验的页面控件
//返回值：
//	数组：check_result
//		数组元素check_result.status:true/false	校验成功/失败; 
//		数组元素check_result.message:""/错误提示信息	空串(校验成功的时候)/错误提示信息(校验失败的时候);
function email_check(field_name,form_field)
{   
	var err_message=field_name+'必须是有效的邮件地址！';
	var mail_patten=/^[_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.){1,4}[a-z]{2,3}$/i; 
	var emailvalue=form_field.value;
	var matchArray = emailvalue.match(mail_patten);
	var check_result = new Array();
	
	if (emailvalue.length!=0 && matchArray==null)
	{
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}
	else
	{
		check_result.status=true; 
		check_result.message=""; 
		return check_result;
	}
}
//</script>

