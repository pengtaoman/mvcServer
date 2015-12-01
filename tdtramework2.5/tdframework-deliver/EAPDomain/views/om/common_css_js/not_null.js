//<script language = "JavaScript">
//非空校验
//输入参数：field_name:控件标签的名字：将在错误提示信息里显示的；this_field:要校验的控件；
//返回值：数组：check_result
//		  数组元素check_result.status:true/false	校验成功/失败; 
//		  数组元素check_result.message:""/错误提示信息	空串(校验成功的时候)/错误提示信息(校验失败的时候);
function not_null(field_name,this_field)
{
	var err_message = field_name + "不能为空！"; 
	var check_result = new Array();
	
	if(this_field.value=="")
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

