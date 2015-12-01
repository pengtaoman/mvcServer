//<script language = "JavaScript">
//���ؼ��ĳ���
//���������this_field:ҪУ��Ŀؼ���field_name:������ʾ��Ϣ��Ҫ��ʾ�Ŀؼ����֣�min_length:�ÿؼ�ֵ����С���ȣ�max_length:�ÿؼ�ֵ����󳤶�
//����ֵ�����飺check_result
//		  ����Ԫ��check_result.status:true/false	У��ɹ�/ʧ��; 
//		  ����Ԫ��check_result.message:""/������ʾ��Ϣ	�մ�(У��ɹ���ʱ��)/������ʾ��Ϣ(У��ʧ�ܵ�ʱ��);
function check_length(this_field,field_name,min_length,max_length)
{
	var the_field_length = this_field.value.length;
	var check_result = new Array();
	
	if (the_field_length > max_length)
	{
		var err_message = field_name + "�ĳ���Ӧ�ò�����" + max_length;
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 
	}
	else if (the_field_length < min_length)
	{
		var err_message = field_name + "�ĳ���Ӧ�ò�С��" + min_length;
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	else
	{
		check_result.status=true; 
		check_result.message=""; 
		return check_result;
	}
}
//</script>

