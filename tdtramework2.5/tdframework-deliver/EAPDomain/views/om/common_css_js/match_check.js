//<script language="javascript">
//��������ʽУ��
//���������form_field:ҪУ��Ŀؼ���num_expr:������ʽ��err_message������ʱҪ��ʾ�Ĵ�����ʾ��Ϣ
//����ֵ�����飺check_result
//		  ����Ԫ��check_result.status:true/false	У��ɹ�/ʧ��; 
//		  ����Ԫ��check_result.message:""/������ʾ��Ϣ	�մ�(У��ɹ���ʱ��)/������ʾ��Ϣ(У��ʧ�ܵ�ʱ��);
function match_check(form_field,num_expr,err_message)
{
	var matchArray = form_field.value.match(num_expr);
	var check_result = new Array();
	 
	if (form_field.value != null && form_field.value != "" && matchArray == null)
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

