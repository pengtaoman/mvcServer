//校验数字格式
//输入参数：field_name:要校验的控件的名称；form_field:要校验的控件；method:反馈方式


//检查所有字符是数字
function check_number_bit(field_name,form_field,method)
{
	var message = field_name + "每个字符应由数字组成!";
	var num_expr = /^\d+$/;
	var matchArray = form_field.value.match(num_expr);
	if (matchArray == null)
		{
		if (method == 0)
			{
			alert(message);
			select_focus(form_field);
			return;
			}else{
			return message;
			}
		}
	if (method == 0)
		{
		return;
		}else{
		return "";
		}
}

//控件得到焦点 
function select_focus(form_field)
{
	//处理校验后输入焦点
	var this_form = form_field.form.name;
	var this_field = form_field.name;
	var select_express = "document." + this_form + "." + this_field + ".select()";
	var focus_express = "document." + this_form + "." + this_field + ".focus()";
	eval("setTimeout('" + select_express + "',1)");
	eval("setTimeout('" + focus_express + "',1)");
}