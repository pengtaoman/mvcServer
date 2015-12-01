//<script language = "JavaScript">
//У�����ָ�ʽ
//���������form_field:ҪУ��Ŀؼ���limit_top:���õ����ֵ��decimal_len:С��λ��(����С����)
//����ֵ�����飺check_result
//		  ����Ԫ��check_result.status:true/false	У��ɹ�/ʧ��; 
//		  ����Ԫ��check_result.message:""/������ʾ��Ϣ	�մ�(У��ɹ���ʱ��)/������ʾ��Ϣ(У��ʧ�ܵ�ʱ��);
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
			var err_message = "��������ָ�ʽ!";
			check_result.status=false; 
			check_result.message=err_message; 
			return check_result; 
	}
	else if (form_field.value != null && form_field.value != "")
	{				
		if (matchArray == null)
		{	
			var err_message = "�˴�ֻ���������ֺ�С����!";
			check_result.status=false; 
			check_result.message=err_message; 
			return check_result; 
		}
		else
		{	
			var v_text = form_field.value;
			if (v_text > limit_top)
			{	
				var err_message = "����" + "��ֵ���󣡲��ܳ���"+ limit_top + "!";
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
					var err_message = "���õ�" + "С�����ľ���Ϊ"+(decimal_len-1)+"λ!";
					check_result.status=false; 
					check_result.message=err_message; 
					return check_result; 
					
				}
				next_point = sub_s.substr(1);
				if (next_point.indexOf('.') != -1)
				{
					form_field.focus();
					var err_message = "�Ƿ���С����ʽ!";
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

