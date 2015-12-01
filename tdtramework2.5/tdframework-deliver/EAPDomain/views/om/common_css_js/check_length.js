//<script language = "JavaScript">
//检查控件的长度
//输入参数：this_field:要校验的控件；field_name:错误提示信息中要显示的控件名字；min_length:该控件值的最小长度；max_length:该控件值的最大长度
//返回值：数组：check_result
//		  数组元素check_result.status:true/false	校验成功/失败; 
//		  数组元素check_result.message:""/错误提示信息	空串(校验成功的时候)/错误提示信息(校验失败的时候);
function check_length(this_field,field_name,min_length,max_length)
{
	var the_field_length = this_field.value.length;
	var check_result = new Array();
	
	if (the_field_length > max_length)
	{
		var err_message = field_name + "的长度应该不大于" + max_length;
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 
	}
	else if (the_field_length < min_length)
	{
		var err_message = field_name + "的长度应该不小于" + min_length;
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

