//<script language = "JavaScript">
//����У��
//���������
//key_event�������¼���
//err_method��������Ϣ��ʾ��ʽ��0-��ʾ������ʾ��Ϣ������false;1-����ʾ������ʾ��Ϣ����������ʾ��Ϣ���أ�����ֵ-����ʾ������ʾ��Ϣ������false;
//this_field:ҪУ���ҳ��ؼ�;
//next_field:���س��������Ҫ��ת���Ŀؼ���
//check_kind:�����¼���У�����ͣ�"ck_number":�������֣�"ck_decimal":�������ֺ�С���㣻"ck_comma":�������ֺͶ��ţ�"ck_single":�������ֺ���ĸ��"ck_sample":�������֡���ĸ���»��ߣ�"ck_noblank":���ܰ����ո�
//ck_account_with:165�ʺ�У�飬��@��,ck_account_without:165�ʺ�У�飬����@��
//err_message:����ʱ��Ҫ��ʾ�Ĵ�����ʾ��Ϣ
//enter_value:��������˻س���������ת��ͬʱ����ֵ��ʲô��'false':����false������������true
//�����������err_methodȷ��
function onkey(key_event,err_method,this_field,next_field,check_kind,err_message,enter_value)
{
 		var witch_key = (navigator.appname=="Nwtscape")?key_event.which:key_event.keyCode;
 		
 		if(witch_key==13)
		{	
			if (false==next_field.disabled || false==next_field.readOnly) 
			{	next_field.focus();}
			
			if (enter_value == "false")
			{	return false;
			}
			else
			{	
				return true;
			}
		}
 		
 		var is_allow = check_allow(witch_key,check_kind);
 		
 		if(!is_allow) 
 		{	
 			if (err_method==0)
			{
				if (err_message!="")
				{	alert (err_message);}
				this_field.focus();
				return false;
			}
			else if (err_method==1)
			{	
				this_field.focus();
				if (err_message!="")
				{	return err_message;}
				else
				{	return "";}
			}   
			else 
			{	return false;}
 		}
 		else
 		{
 			if (err_method==1)
			{	return "";}   
			else 
			{	return true;}
 		}
}
//������Ϣȫ�ֱ���
number_message = "�˴�ֻ���������֣�"; 
decimal_message = "�˴�ֻ���������ֺ�С���㣡"; 
comma_message = "�˴�ֻ���������ֺͶ��ţ�"; 
single_message = "�˴�ֻ���������ֺ�Ӣ����ĸ��"; 
sample_message = "�˴�ֻ���������֡���ĸ���»��ߣ�"; 
noblank_message = "�˴���������ո�";
error_account_without_message="�˴�ֻ�ܰ���Сд��ĸ,����,�»���,����,С����!";
error_account_with_message="�˴�ֻ�ܰ���Сд��ĸ,����,�»���,����,С����,@��!";
function check_allow(witch_key,check_kind)
{
	if (check_kind == "ck_number")			//ֻ��������
	{	
		return (witch_key>=48 && witch_key<=57);
	}
	else if (check_kind == "ck_decimal")	//ֻ�������ֺ�С����
	{
		return ((witch_key>=48 && witch_key<=57) || witch_key==46);
	}
	else if (check_kind == "ck_comma")		//ֻ�������ֺͶ���
	{
		return ((witch_key>=48 && witch_key<=57) || witch_key==44);
	}
	else if (check_kind == "ck_date")	//ֻ�������ֺͺ���
	{	
		return ((witch_key>=48 && witch_key<=57) || witch_key==45);
	}
	else if (check_kind == "ck_single")	//ֻ�������ֺ���ĸ
	{
		return ((witch_key>=48 && witch_key<=57) || (witch_key>=65 && witch_key<=90) || (witch_key>=97 && witch_key<=122))
	}
	else if (check_kind == "ck_sample")	//ֻ�������֡���ĸ���»���
	{	
		return ((witch_key>=48 && witch_key<=57) || (witch_key>=65 && witch_key<=90) || (witch_key>=97 && witch_key<=122) || witch_key==95)
	}
	else if (check_kind == "ck_account_with")	//165�ʺŴ�@����У��,Сд��ĸ,����,�»���,����,С����@	
	{	
		return ((witch_key==45) || (witch_key==46 ) || (witch_key>=48 && witch_key<=57) ||  (witch_key>=97 && witch_key<=122) || (witch_key==95) || (witch_key==64))
	}
	else if (check_kind == "ck_account_without")	//165�ʺŲ���@����У��	
	{	
		return ((witch_key==45) || (witch_key==46 ) || (witch_key>=48 && witch_key<=57) ||  (witch_key>=97 && witch_key<=122) || (witch_key==95))
	}
	else if (check_kind == "ck_password_with")	//165����
	{	
		return ((witch_key==45) || (witch_key==46 ) || (witch_key>=48 && witch_key<=57) ||  (witch_key>=65 && witch_key<=90) || (witch_key>=97 && witch_key<=122) || (witch_key==95) || (witch_key==64))
	}
	else if (check_kind == "ck_password_without")	//165����
	{	
		return ((witch_key==45) || (witch_key==46 ) || (witch_key>=48 && witch_key<=57) || (witch_key>=65 && witch_key<=90) ||  (witch_key>=97 && witch_key<=122) || (witch_key==95))
	}
	else if (check_kind == "ck_password_asia")	//165��������
	{	
		return (!((witch_key==123) || (witch_key==125 ) || (witch_key==35) ||  (witch_key==92) || (witch_key==126) || (witch_key==64) || (witch_key==36)))
	}
	else if (check_kind == "ck_noblank")	//���ܰ����ո�
	{	return (witch_key!=32);}
	else
	{	return true;}	
}
//</script>

