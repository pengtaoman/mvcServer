//<script language="javascript">
//校验165帐号
//输入参数：
//	1.field_name:错误提示信息"仅可包含小写字母,数字,下划线,减号,小数点,以小写字母开头!"前面要显示的文字：一般是要校验的页面控件的标签名字；
//	2.form_field：要校验的页面控件
//返回值：
//	数组：check_result
//		数组元素check_result.status:true/false	校验成功/失败; 
//		数组元素check_result.message:""/错误提示信息	空串(校验成功的时候)/错误提示信息(校验失败的时候);
function service_id_165_check(field_name,form_field,if_at)
{   
	var err_message=field_name+'必须以小写字母开头,且仅可包含小写字母,数字,下划线,减号,小数点!';
	var service_id_patten=/^[a-z]+[a-z0-9_\-\.]*[@]{0,0}[a-z0-9_\-\.]*$/; 
	
	if (if_at==1 || if_at=="1")
	{
		var err_message=field_name+'必须以小写字母开头,且仅可包含小写字母,数字,下划线,减号,小数点,@符,@符最多不超过一个!';
		var service_id_patten=/^[a-z]+[a-z0-9_\-\.]*[@]{0,1}[a-z0-9_\-\.]*$/; 
	}	

	var service_id_value=form_field.value;
	var matchArray = service_id_value.match(service_id_patten);
	var check_result = new Array();
	
	if (service_id_value.length!=0 && matchArray==null)
	{
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}
	
	var pos=service_id_value.indexOf("@");
	
	if (pos==-1)
	{
		if (service_id_value.length>12)
			{
			check_result.status=false; 
			check_result.message='账号长度不可超过12位!'; 
			return check_result; 	
			}
	}
	else
	{
		var before_string=service_id_value.substring(0,pos);
		var back_string=service_id_value.substring(pos+1);
		if (before_string.length>12)
			{
			check_result.status=false; 
			check_result.message='@符号前的账号长度不可超过12位!'; 
			return check_result; 	
			}
		else if (back_string.length>17 || back_string.length==0)
			{
			check_result.status=false; 
			check_result.message='@符号后的账号长度必须在1-17位之间!'; 
			return check_result; 	
			}
	}

	check_result.status=true; 
	check_result.message=""; 
	return check_result;
	
}
//</script>