//<script language = "JavaScript">
//У��email
//���������
//	1��field_name:������ʾ��Ϣ"��������Ч���ʼ���ַ��"ǰ��Ҫ��ʾ�����֣�һ����ҪУ���ҳ��ؼ��ı�ǩ���֣�
//	2��form_field��ҪУ���ҳ��ؼ�
//	3��alert_flag���Ƿ���ʾ������Ϣ��1,��ʾ��2,����ʾ
function nas_email_check(field_name,form_field,alert_flag)
{   
	var err_message=field_name+'��������Ч���ʼ���ַ��';
	if(alert_flag == null || alert_flag == ''){
		alert_flag = 1;
	}
	var mail_patten=/^[_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.){1,4}[a-z]{2,3}$/i; 
	var emailvalue=form_field.value;
	var matchArray = emailvalue.match(mail_patten);
	var check_result = new Array();
	
	if (emailvalue.length!=0 && matchArray==null)
	{
		if(alert_flag == 1){
			alert(err_message);	
			form_field.focus();
		}
		return false; 	
	}
}
//</script>

