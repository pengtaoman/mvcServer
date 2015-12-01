function check_decimal_number(form_field,method,limit_top,decimal)
{
 	var num_expr = /^[\d\.]+$/;
 	var matchArray = form_field.value.match(num_expr);
 	
 	var other_ss = "此处只能输入数字和小数点！"; 
 	var too_big = "费用" + "的值过大！不能超过"+ limit_top + "！";
 	var de_err = "费用的" + "小数点后的精度为2位！";
 	var err_format = "非法的小数格式！";
 	var sub_s;
 	var first_point;
 	var next_point;		
 	
	if (form_field.value == ".")
	{		if (method == 0)
			{	alert("错误的数字格式");
				form_field.select();
				return false;
			}
			else {return other_ss;}
	}
	else if (form_field.value != null && form_field.value != "")
	{				
		if (matchArray == null)
		{	if (method == 0)
			{	alert(other_ss);    
				form_field.focus();
				form_field.select();
				return false;
			}
			else {return other_ss;}
		}
		else
		{	var v_text = form_field.value;
			if (v_text != 0 && v_text!= '0' && v_text!= null)
			{  
				if(v_text > limit_top)
				{	if (method == 0)
					{	alert(too_big);    
						form_field.focus();
						form_field.select();
						return false;
					}
					else {return too_big;}
				}
			}
			first_point = v_text.indexOf('.');
			if (first_point != -1)
			{	sub_s = v_text.substr(first_point);
				if (sub_s.length > decimal)
				{
					if (method == 0)
					{	alert(de_err);
						form_field.focus();
						form_field.select();
						return false;
					}
					else {return de_err;}
				}
				next_point = sub_s.substr(1);
				if (next_point.indexOf('.') != -1)
				{
					if (method == 0)
					{	alert(err_format);
						form_field.focus();
						form_field.select();
						return false;
					}
					else {return err_format;}
				}
			}
			if (method == 0)
			{return true;}
			else {return "";}
		}   
	}
	else if (form_field.value == null || form_field.value == "")
	{
		form_field.value = 0;
		if (method == 0)
		{return true;}
		else {return "";}
	}
}
