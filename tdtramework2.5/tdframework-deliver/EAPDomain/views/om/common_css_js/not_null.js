//<script language = "JavaScript">
//�ǿ�У��
//���������field_name:�ؼ���ǩ�����֣����ڴ�����ʾ��Ϣ����ʾ�ģ�this_field:ҪУ��Ŀؼ���
//����ֵ�����飺check_result
//		  ����Ԫ��check_result.status:true/false	У��ɹ�/ʧ��; 
//		  ����Ԫ��check_result.message:""/������ʾ��Ϣ	�մ�(У��ɹ���ʱ��)/������ʾ��Ϣ(У��ʧ�ܵ�ʱ��);
function not_null(field_name,this_field)
{
	var err_message = field_name + "����Ϊ�գ�"; 
	var check_result = new Array();
	
	if(this_field.value=="")
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

