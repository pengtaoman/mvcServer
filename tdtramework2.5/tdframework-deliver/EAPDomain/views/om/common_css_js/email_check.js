//<script language = "JavaScript">
//У��email
//���������
//	1��field_name:������ʾ��Ϣ"��������Ч���ʼ���ַ��"ǰ��Ҫ��ʾ�����֣�һ����ҪУ���ҳ��ؼ��ı�ǩ���֣�
//	2��form_field��ҪУ���ҳ��ؼ�
//����ֵ��
//	���飺check_result
//		����Ԫ��check_result.status:true/false	У��ɹ�/ʧ��; 
//		����Ԫ��check_result.message:""/������ʾ��Ϣ	�մ�(У��ɹ���ʱ��)/������ʾ��Ϣ(У��ʧ�ܵ�ʱ��);
function email_check(field_name,form_field)
{   
	var err_message=field_name+'��������Ч���ʼ���ַ��';
	var mail_patten=/^[_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.){1,4}[a-z]{2,3}$/i; 
	var emailvalue=form_field.value;
	var matchArray = emailvalue.match(mail_patten);
	var check_result = new Array();
	
	if (emailvalue.length!=0 && matchArray==null)
	{
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

