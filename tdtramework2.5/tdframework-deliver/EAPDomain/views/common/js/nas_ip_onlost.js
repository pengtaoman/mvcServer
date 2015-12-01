//<script language = "JavaScript">
//onblur或提交前校验控件是否满足约定
//输入参数：this_field:要校验的控件;
//			check_kind:校验方式:"ck_number":允许数字；"ck_decimal":允许数字和小数点；"ck_comma":允许数字和逗号；"ck_single":允许数字和字母；"ck_sample":允许数字字母下划线,并只能由下划线开头；"ck_noblank":不能包括空格；"ck_date":允许数字和横线（日期）；"ck_underline":允许数字字母下划线；"ck_phone":标准电话格式：(86)-010-88888888-888
//			err_message:出错时的错误提示信息
//返回值：
//	数组：check_result
//		  数组元素check_result.status:true/false	校验成功/失败; 
//		  数组元素check_result.message:""/错误提示信息	空串(校验成功的时候)/错误提示信息(校验失败的时候);

//alert("包含 nas_ip_onlost.js");

function nas_ip_onlost(this_field,check_kind,err_message)
{
	var check_result = new Array();
	var is_allow = decimal_check(this_field,check_kind);
	if(is_allow)
 	{	
 		check_result.status=true;
 		check_result.message="";
		return check_result;
 	}
 	else
 	{
 		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
 	}
}
function decimal_check(this_field,check_kind)
{
	if (check_kind == "ck_number")			//只能是数字
	{	
		var decimal_expr = /^[\d]+$/;
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "ck_decimal")	//只能是数字和小数点
	{
		var decimal_expr = /^[\d\.]+$/;
		//alert(this_field.value);
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "ck_comma")		//只能是数字和逗号
	{
		var decimal_expr = /^[\d\,]+$/;
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "ck_single")		//只能是数字和字母
	{
		var decimal_expr = /^[a-zA-Z0-9]{0,}$/;
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "ck_sample")	//由字母、数字和下划线组成并以字母或数字开头
	{	
		var decimal_expr = /^[a-zA-Z0-9]{1,}[\w]{0,}/;
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "ck_underline")	//由字母、数字和下划线组成
	{	
		var decimal_expr = /^[\w]+$/;
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "ck_noblank")	//不能包含空格
	{	
		var the_value = this_field.value;
		var first_point = the_value.indexOf(' ');
 		if (first_point != -1)
		{	var match_array = null;}
		else
		{	var match_array = 1;}
	}
	else if (check_kind == "ck_date")	//只能是数字和横线
	{	
		var decimal_expr = /^[\d\-]+$/;
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "165_account_without")	//165帐号校验，不带@符
	{	
		var decimal_expr  =/^[a-z]+[a-z0-9_\-\.]*[@]{0,0}[a-z0-9_\-\.]*$/; 
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "165_account_without_allownum")	//165帐号校验，不带@符，允许数字开头
	{	
		var decimal_expr  =/^[a-z0-9_\-\.]+[a-z0-9_\-\.]*[@]{0,0}[a-z0-9_\-\.]*$/; 
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "165_account_with")	//165帐号校验，带@符
	{	
		var decimal_expr  =/^[a-z]+[a-z0-9_\-\.]*[@]{0,1}[a-z0-9_\-\.]*$/; 
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "165_password_without")	//165密码校验，不带@符
	{	
		var decimal_expr  =/^[A-Za-z0-9_\-\.]+$/; 
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "165_password_with")	//165密码校验，带@符
	{	
		var decimal_expr  =/^[a-zA-Z0-9_\-\.]+[@]{0,1}[A-Za-z0-9_\-\.]*$/; 
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "ck_phone")	//标准电话格式：(86)-010-88888888-888
	{	
		var decimal_expr = /^((\(\d+\)){0,1}(\-{0,1}\d+\-{0,1}\d+\-{0,1}\d+)\,{0,1})*$/;
		var match_array = this_field.value.match(decimal_expr);
	}	
	else if (check_kind == "ck_calling_number")	//主叫号码格式
	{	
		var count1=0;
		var count2=0;
		var count3=0;
		var calling_number_pattern_1 = /^[0]+[\d]*$/;
		var calling_number_pattern_2 = /^[0-9]*$/;
		var newArray=this_field.value.split(',');
		for (var i=0;i<newArray.length;i++)
		{	
			if (newArray[i]=="")
			{
			break;
			}
			else if (newArray[i]=="0000")
			{
			count3++;
			}
		
			else
			{
				if (newArray[i].match(calling_number_pattern_2))
				{
				count2++;
				}
				else
				{	
					return false;
				}
				if (newArray[i].match(calling_number_pattern_1))
				{
					count1++;
					if (count1>=1)
					{	
					return false;
					}
				}
					 
			}
		}
		if ((count3==1 && count2>=1) || (count3>1))
		{
				return false;
		}
		return true;
	}	
	else if (check_kind == "ck_ip")	//IP地址校验
	{	
		var decimal_expr = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
		var match_array = this_field.value.match(decimal_expr); 
		
		if (match_array != null)
		{
			for (var i = 1; i < 5; i++) 
			{
				var thisSegment = match_array[i];
				if (thisSegment > 255) 
				{
					match_array = null;
					break;
				}
		    }	  
		}
	}
	else
	{	var match_array = 1;}
	
	if (match_array == null)
	{	return false;}
	else
	{	return true;}
}
//</script>


