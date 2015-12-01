//<script language = "JavaScript">
//校验数字格式
//输入参数：form_field:要校验的控件；limit_top:费用的最大值；decimal_len:小数位数(包括小数点)
//返回值：数组：check_result
//		  数组元素check_result.status:true/false	校验成功/失败; 
//		  数组元素check_result.message:""/错误提示信息	空串(校验成功的时候)/错误提示信息(校验失败的时候);
function check_decimal_format(form_field,limit_top,decimal_len)
{
 	var num_expr = /^[\d\.]+$/;
 	var matchArray = form_field.value.match(num_expr);
 	
 	var sub_s;
 	var first_point;
 	var next_point;		
 	var check_result = new Array();
 	
	if (form_field.value == ".")
	{		
			var err_message = "错误的数字格式!";
			check_result.status=false; 
			check_result.message=err_message; 
			return check_result; 
	}
	else if (form_field.value != null && form_field.value != "")
	{				
		if (matchArray == null)
		{	
			var err_message = "此处只能输入数字和小数点!";
			check_result.status=false; 
			check_result.message=err_message; 
			return check_result; 
		}
		else
		{	
			var v_text = form_field.value;
			if (v_text > limit_top)
			{	
				var err_message = "费用" + "的值过大！不能超过"+ limit_top + "!";
				check_result.status=false; 
				check_result.message=err_message; 
				return check_result; 
			}
			first_point = v_text.indexOf('.');
			if (first_point != -1)
			{	
				sub_s = v_text.substr(first_point);
				if (sub_s.length > decimal_len)
				{
					var err_message = "费用的" + "小数点后的精度为"+(decimal_len-1)+"位!";
					check_result.status=false; 
					check_result.message=err_message; 
					return check_result; 
					
				}
				next_point = sub_s.substr(1);
				if (next_point.indexOf('.') != -1)
				{
					form_field.focus();
					var err_message = "非法的小数格式!";
					check_result.status=false; 
					check_result.message=err_message; 
					return check_result; 
				}
			}
			var err_message = "";
			check_result.status=true; 
			check_result.message=err_message; 
			return check_result; 
		}
	}
	else
	{
		var err_message = "";
		check_result.status=true; 
		check_result.message=err_message; 
		return check_result; 
	}
}
//</script>

