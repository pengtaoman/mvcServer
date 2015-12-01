//<script language = "JavaScript">
//按键校验
//输入参数：
//key_event：按键事件；
//err_method：错误信息提示方式：0-显示错误提示信息，返回false;1-不显示错误提示信息，将错误提示信息返回；其他值-不显示错误提示信息，返回false;
//this_field:要校验的页面控件;
//next_field:按回车键，光标要跳转到的控件；
//check_kind:键盘事件的校验类型："ck_number":允许数字；"ck_decimal":允许数字和小数点；"ck_comma":允许数字和逗号；"ck_single":允许数字和字母；"ck_sample":允许数字、字母和下划线；"ck_noblank":不能包含空格
//ck_account_with:165帐号校验，带@符,ck_account_without:165帐号校验，不带@符
//err_message:出错时，要显示的错误提示信息
//enter_value:如果按下了回车键：在跳转的同时返回值是什么：'false':返回false；其他：返回true
//输出参数：由err_method确定
function onkey(key_event,err_method,this_field,next_field,check_kind,err_message,enter_value)
{
 		var witch_key = (navigator.appname=="Nwtscape")?key_event.which:key_event.keyCode;
 		
 		if(witch_key==13)
		{	
			if (false==next_field.disabled || false==next_field.readOnly) 
			{	next_field.focus();}
			
			if (enter_value == "false")
			{	return false;
			}
			else
			{	
				return true;
			}
		}
 		
 		var is_allow = check_allow(witch_key,check_kind);
 		
 		if(!is_allow) 
 		{	
 			if (err_method==0)
			{
				if (err_message!="")
				{	alert (err_message);}
				this_field.focus();
				return false;
			}
			else if (err_method==1)
			{	
				this_field.focus();
				if (err_message!="")
				{	return err_message;}
				else
				{	return "";}
			}   
			else 
			{	return false;}
 		}
 		else
 		{
 			if (err_method==1)
			{	return "";}   
			else 
			{	return true;}
 		}
}
//错误信息全局变量
number_message = "此处只能输入数字！"; 
decimal_message = "此处只能输入数字和小数点！"; 
comma_message = "此处只能输入数字和逗号！"; 
single_message = "此处只能输入数字和英文字母！"; 
sample_message = "此处只能输入数字、字母和下划线！"; 
noblank_message = "此处不能输入空格";
error_account_without_message="此处只能包含小写字母,数字,下划线,减号,小数点!";
error_account_with_message="此处只能包含小写字母,数字,下划线,减号,小数点,@符!";
function check_allow(witch_key,check_kind)
{
	if (check_kind == "ck_number")			//只能是数字
	{	
		return (witch_key>=48 && witch_key<=57);
	}
	else if (check_kind == "ck_decimal")	//只能是数字和小数点
	{
		return ((witch_key>=48 && witch_key<=57) || witch_key==46);
	}
	else if (check_kind == "ck_comma")		//只能是数字和逗号
	{
		return ((witch_key>=48 && witch_key<=57) || witch_key==44);
	}
	else if (check_kind == "ck_date")	//只能是数字和横线
	{	
		return ((witch_key>=48 && witch_key<=57) || witch_key==45);
	}
	else if (check_kind == "ck_single")	//只能是数字和字母
	{
		return ((witch_key>=48 && witch_key<=57) || (witch_key>=65 && witch_key<=90) || (witch_key>=97 && witch_key<=122))
	}
	else if (check_kind == "ck_sample")	//只能是数字、字母和下划线
	{	
		return ((witch_key>=48 && witch_key<=57) || (witch_key>=65 && witch_key<=90) || (witch_key>=97 && witch_key<=122) || witch_key==95)
	}
	else if (check_kind == "ck_account_with")	//165帐号带@符的校验,小写字母,数字,下划线,减号,小数点@	
	{	
		return ((witch_key==45) || (witch_key==46 ) || (witch_key>=48 && witch_key<=57) ||  (witch_key>=97 && witch_key<=122) || (witch_key==95) || (witch_key==64))
	}
	else if (check_kind == "ck_account_without")	//165帐号不带@符的校验	
	{	
		return ((witch_key==45) || (witch_key==46 ) || (witch_key>=48 && witch_key<=57) ||  (witch_key>=97 && witch_key<=122) || (witch_key==95))
	}
	else if (check_kind == "ck_password_with")	//165密码
	{	
		return ((witch_key==45) || (witch_key==46 ) || (witch_key>=48 && witch_key<=57) ||  (witch_key>=65 && witch_key<=90) || (witch_key>=97 && witch_key<=122) || (witch_key==95) || (witch_key==64))
	}
	else if (check_kind == "ck_password_without")	//165密码
	{	
		return ((witch_key==45) || (witch_key==46 ) || (witch_key>=48 && witch_key<=57) || (witch_key>=65 && witch_key<=90) ||  (witch_key>=97 && witch_key<=122) || (witch_key==95))
	}
	else if (check_kind == "ck_password_asia")	//165亚信密码
	{	
		return (!((witch_key==123) || (witch_key==125 ) || (witch_key==35) ||  (witch_key==92) || (witch_key==126) || (witch_key==64) || (witch_key==36)))
	}
	else if (check_kind == "ck_noblank")	//不能包含空格
	{	return (witch_key!=32);}
	else
	{	return true;}	
}
//</script>

