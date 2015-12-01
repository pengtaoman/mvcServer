//<script language = "JavaScript"> 
//校验两次输入密码是否一样
//返回值：数组：check_result
//		  数组元素check_result.status:true/false	校验成功/失败; 
//		  数组元素check_result.message:""/错误提示信息	空串(校验成功的时候)/错误提示信息(校验失败的时候);
function confirm_password(new_password,old_password) 
{ 
	var err_message = "两次输入的密码不符合!"; 
	var check_result=new Array(); 
	if (new_password.value!=old_password.value) 
	{ 
			check_result.status=false; 
			check_result.message=err_message; 
			return check_result; 
	} 
	else
	{	 
			check_result.status=true; 
			check_result.messsage=""; 
			return check_result; 
	} 
}
//</script> 

