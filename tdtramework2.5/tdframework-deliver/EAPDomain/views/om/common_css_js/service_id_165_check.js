//<script language="javascript">
//У��165�ʺ�
//���������
//	1.field_name:������ʾ��Ϣ"���ɰ���Сд��ĸ,����,�»���,����,С����,��Сд��ĸ��ͷ!"ǰ��Ҫ��ʾ�����֣�һ����ҪУ���ҳ��ؼ��ı�ǩ���֣�
//	2.form_field��ҪУ���ҳ��ؼ�
//����ֵ��
//	���飺check_result
//		����Ԫ��check_result.status:true/false	У��ɹ�/ʧ��; 
//		����Ԫ��check_result.message:""/������ʾ��Ϣ	�մ�(У��ɹ���ʱ��)/������ʾ��Ϣ(У��ʧ�ܵ�ʱ��);
function service_id_165_check(field_name,form_field,if_at)
{   
	var err_message=field_name+'������Сд��ĸ��ͷ,�ҽ��ɰ���Сд��ĸ,����,�»���,����,С����!';
	var service_id_patten=/^[a-z]+[a-z0-9_\-\.]*[@]{0,0}[a-z0-9_\-\.]*$/; 
	
	if (if_at==1 || if_at=="1")
	{
		var err_message=field_name+'������Сд��ĸ��ͷ,�ҽ��ɰ���Сд��ĸ,����,�»���,����,С����,@��,@����಻����һ��!';
		var service_id_patten=/^[a-z]+[a-z0-9_\-\.]*[@]{0,1}[a-z0-9_\-\.]*$/; 
	}	

	var service_id_value=form_field.value;
	var matchArray = service_id_value.match(service_id_patten);
	var check_result = new Array();
	
	if (service_id_value.length!=0 && matchArray==null)
	{
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}
	
	var pos=service_id_value.indexOf("@");
	
	if (pos==-1)
	{
		if (service_id_value.length>12)
			{
			check_result.status=false; 
			check_result.message='�˺ų��Ȳ��ɳ���12λ!'; 
			return check_result; 	
			}
	}
	else
	{
		var before_string=service_id_value.substring(0,pos);
		var back_string=service_id_value.substring(pos+1);
		if (before_string.length>12)
			{
			check_result.status=false; 
			check_result.message='@����ǰ���˺ų��Ȳ��ɳ���12λ!'; 
			return check_result; 	
			}
		else if (back_string.length>17 || back_string.length==0)
			{
			check_result.status=false; 
			check_result.message='@���ź���˺ų��ȱ�����1-17λ֮��!'; 
			return check_result; 	
			}
	}

	check_result.status=true; 
	check_result.message=""; 
	return check_result;
	
}
//</script>