//<script language="javascript">
//按正则表达式校验
//输入参数：form_field:要校验的控件；num_expr:正则表达式；err_message：出错时要显示的错误提示信息
//返回值：数组：check_result
//		  数组元素check_result.status:true/false	校验成功/失败; 
//		  数组元素check_result.message:""/错误提示信息	空串(校验成功的时候)/错误提示信息(校验失败的时候);
function match_check(form_field,num_expr,err_message)
{
	var matchArray = form_field.value.match(num_expr);
	var check_result = new Array();
	 
	if (form_field.value != null && form_field.value != "" && matchArray == null)
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

