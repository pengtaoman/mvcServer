//У�����ָ�ʽ
//���������field_name:ҪУ��Ŀؼ������ƣ�form_field:ҪУ��Ŀؼ���method:������ʽ


//��������ַ�������
function check_number_bit(field_name,form_field,method)
{
	var message = field_name + "ÿ���ַ�Ӧ���������!";
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

//�ؼ��õ����� 
function select_focus(form_field)
{
	//����У������뽹��
	var this_form = form_field.form.name;
	var this_field = form_field.name;
	var select_express = "document." + this_form + "." + this_field + ".select()";
	var focus_express = "document." + this_form + "." + this_field + ".focus()";
	eval("setTimeout('" + select_express + "',1)");
	eval("setTimeout('" + focus_express + "',1)");
}