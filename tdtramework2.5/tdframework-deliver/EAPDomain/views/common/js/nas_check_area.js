/*
	У��绰����������Ƿ���ȷ���绰����ĳ����Ƿ���ȷ��
	jsp�ļ�����׼�������ţ�Area_code���绰���볤�ȣ�TelePhoneLen
	add by:jiangyun
*/
function nas_check_area(this_field)
{   
	var code_value = this_field.value;
	
	var code_length = code_value.length;
    var code_mobile = code_value.substring(0,2);
    var area_check_ok = 0;
    var error_info = "";
    var should_length;
    var area_index;
    
    var the_form_name = this_field.form.name;
    var the_field_name = this_field.name;
    var do_focus="document."+the_form_name+"."+the_field_name+".focus()";
    var do_select="document."+the_form_name+"."+the_field_name+".select()";

	if (code_length != 0)
	{
		var decimal_expr = /^[\d]+$/;
	 	var match_array = this_field.value.match(decimal_expr);
	 	if (match_array == null)
	 	{	
	 		error_info = "ֻ���������֣�";
			area_check_ok = 0;
	 	}
	 	else
	 	{	
			if (code_length == 11 && code_mobile == "13")
			{
				area_check_ok = 1;
			}
			else
			{
				
				var should_area_in = nas_get_node_value("root/Create/Area_code");
				should_length = should_area_in.length;
				var current_area_info = code_value.substring(0,should_length);
				var province = nas_get_node_value("root/Create/Province");
				
				if (should_area_in != current_area_info)
				{	error_info = "����ĵ绰�������Ų���ȷ!����Ӧ�ǣ�"+should_area_in;
					area_check_ok = 0;
				}
				else
				{
					var telePhoneLen = nas_get_node_value("root/Create/TelePhoneLen");
					var right_length = should_length + parseInt(telePhoneLen);
					
					if (code_length != right_length)
					{
						if (province == "����")
						{
							var phone_no = code_value.substring(should_length);
							//alert(phone_no);
							if (phone_no.length == 11 && phone_no.substring(0,2) == "13")
							{
								area_check_ok = 1;
							}
							else
							{
								error_info = "����ĵ绰���볤�Ȳ���ȷ!��ȷ�ĳ���ӦΪ��"+right_length+"λ";
								area_check_ok = 0;
							}
						}
						else
						{
							error_info = "����ĵ绰���볤�Ȳ���ȷ!��ȷ�ĳ���ӦΪ��"+right_length+"λ";
							area_check_ok = 0;
						}
					}
					else
					{
						area_check_ok = 1;
					}
				}
			} 
		}
		if (area_check_ok == 1)
	    {	return true;}
	    else
	    {
	    	alert(error_info);
	    	if (this_field.disabled==false)
	   		{	eval(do_focus);
		       	if(this_field.type=="text" && this_field.value!="")
		       	{	eval(do_select);   	}
		    }
		    return false;
	    }
	}
	else
	{	return true;}
}