/*
function check_all_box(target_form)
{
	for (var i=0;i < target_form.elements.length;i++)
	{
		var ele = target_form.elements[i];
		if (ele.type == "checkbox" && ele.id != "checkall")
			ele.checked = (target_form.checkall.checked ? (1):(0));
	}
}
*/
function check_all_box(target_form)
{
	for (var i=0;i < target_form.function_check_box.length;i++)
	{
		var ele = target_form.function_check_box[i];
		ele.checked = (target_form.checkall.checked ? (1):(0));
	}
}

function CheckSelect(target_form,check_box)
{
	var v_system_checkbox_id = check_box.id.substring(0,3);
	var v_system_row_num = eval("document." + target_form.name + "." + v_system_checkbox_id + ".value");
	v_system_row_num = v_system_row_num.substring(v_system_row_num.indexOf("-")+1);
	//alert (v_system_row_num);

	var v_is_bottom = check_box.value.substring(0,check_box.value.indexOf("-"));	
	if (v_is_bottom == 0)
	{
		for (var i=v_system_row_num;i < target_form.function_check_box.length;i++)
		{
			var e = target_form.function_check_box[i];

			var v_curr_system_checkbox_id = e.id.substring(0,3);
			if (v_curr_system_checkbox_id != v_system_checkbox_id)
				break;
			//alert(e.id);
			
			if (e.id.indexOf(check_box.id) >= 0)
				e.checked = (check_box.checked ? (1):(0));
		}
	}

	for (var j=check_box.id.length-1;j >= 3;j--)
	{
		var sign = 0;
		var parent_id = check_box.id.substring(0,j);
		//alert(parent_id);
		
		if (!check_box.checked)
		{
			for (var i=v_system_row_num;i < target_form.function_check_box.length;i++)
			{
				var ele = target_form.function_check_box[i];

				var v_curr_system_checkbox_id = ele.id.substring(0,3);
				if (v_curr_system_checkbox_id != v_system_checkbox_id)
					break;
				//alert(e.id);

				if (ele.id != parent_id && ele.id.indexOf(parent_id) >= 0 && ele.checked)
					{
						sign = 1;
						//alert(ele.id);
						break;
					}
			}
		}
		
		if (sign == 0)
		{
			var exec_string = "document." + target_form.name + "." + parent_id + ".checked = " + (check_box.checked ? (1):(0));
			//alert(exec_string);
			eval(exec_string);
		}
	}
}

	function check_null(field_name,form_field,method)
	{
		//输入域非空校验
		var message = field_name + "不应为空!";
		var v_text = form_field.value;
		if (v_text != null)
			{
			for (logo = 0;logo <= form_field.value.length;logo = logo + 1)
				{
				v_text = v_text.replace(" ","");
				}
			}
		if (v_text == "" || v_text == null)
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

	function cut_message(message)
	{
		//处理重复提示信息
		var message_in = message;
    	var message_Array = message_in.split("!");
    	var Array_length = message_Array.length;
		for (logo = 0;logo <= Array_length;logo = logo + 1)
			{
			if (message_Array[logo] == null || message_Array[logo] == "")
				{
				message_Array[logo] = "";
				}else{
				message_Array[logo] = message_Array[logo] + "！";
				}
			}
		for (logo_1 = 0;logo_1 <= Array_length;logo_1 = logo_1 + 1)
			{
			for (logo_2 = logo_1 + 1;logo_2 <= Array_length;logo_2 = logo_2 + 1)
				{
				if (message_Array[logo_1] == message_Array[logo_2])
					{
					message_Array[logo_2] = "";
					}
				}
			}
		var message_out = message_Array.join("");
		return message_out;
	}
	