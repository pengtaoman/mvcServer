//<script language = "JavaScript"> 
//У���������������Ƿ�һ��
//����ֵ�����飺check_result
//		  ����Ԫ��check_result.status:true/false	У��ɹ�/ʧ��; 
//		  ����Ԫ��check_result.message:""/������ʾ��Ϣ	�մ�(У��ɹ���ʱ��)/������ʾ��Ϣ(У��ʧ�ܵ�ʱ��);
function confirm_password(new_password,old_password) 
{ 
	var err_message = "������������벻����!"; 
	var check_result=new Array(); 
	if (new_password.value!=old_password.value) 
	{ 
			check_result.status=false; 
			check_result.message=err_message; 
			return check_result; 
	} 
	else
	{	 
			check_result.status=true; 
			check_result.messsage=""; 
			return check_result; 
	} 
}
//</script> 

