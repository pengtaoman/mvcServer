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

//alert('nas_onkey.js���óɹ�');
function nas_onkey(key_event,err_method,this_field,next_field,check_kind,err_message,enter_value)
{
 		var witch_key = (navigator.appname=="Nwtscape")?key_event.which:key_event.keyCode;
 		
 		if(witch_key==13)
		{	
			
			if (typeof(next_field)!='undefined' && false==next_field.disabled && false==next_field.readOnly && this_field!=next_field)
			{	
				for (i=0;i<this_field.form.elements.length;i++)
				{
					if (this_field.form.elements[i].name == next_field.name && this_field.form.elements[i].type == next_field.type && this_field.form.elements[i] == next_field)
					{
						next_field.focus();
					}
				}
			}
			else
			{
				
				for (i=0;i<this_field.form.elements.length;i++)
				{
					if (this_field.form.elements[i].name == this_field.name && this_field.form.elements[i].type == this_field.type && this_field.form.elements[i] == this_field)
					{
						break;
					}
				}
				i++;				
				for (i;i<this_field.form.elements.length;i++)
				{
					//alert(this_field.form.elements[i].name+'--'+this_field.form.elements[i].type+'--'+this_field.form.elements[i].value);
					
					if (this_field.form.elements[i].type == "submit" || this_field.form.elements[i].type == "select-one" || this_field.form.elements[i].type == "text" )
					{
						if (this_field.form.elements[i].disabled != true )
						{
							this_field.form.elements[i].focus();
							if (this_field.form.elements[i].type == "text" )
							{
								this_field.form.elements[i].select();
							}
						}
						break;
					}
				}
				
			}
			
			
			if (enter_value == "false")
			{	return false;
			}
			else
			{	
				return true;
			}
		}
 		
 		var is_allow = check_allow(witch_key,check_kind,this_field);
 		
 		if(!is_allow) 
 		{	
 			if (err_method==0)
			{
				if (err_message!=""){	
                    alert (err_message);
                 }
				this_field.focus();
				return false;
			}
			else if (err_method==1)
			{	
				this_field.focus();
				if (err_message!=""){	
                    return err_message;
                }
				else{
                	return "";
                }
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
//char_message = "�˴�ֻ���������ֺͺͺ���,~��!"; add wangjunjie 20021115 check_kind:ck_char
function check_allow(witch_key,check_kind,this_field)
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
	else if (check_kind == "ck_calling_limit")		//ֻ�������ֺͶ���44���Ӻ�43����45
	{
		return ((witch_key>=48 && witch_key<=57) || (witch_key>=43 && witch_key<=45));
	}
	else if (check_kind == "ck_date")	//ֻ�������ֺͺ���
	{	
		return ((witch_key>=48 && witch_key<=57) || witch_key==45);
	}
    else if (check_kind == "ck_date_time")   //ֻ�������֡����ߡ��ո�32��:��58 ������ʱ����������
    {  
        return ((witch_key>=48 && witch_key<=57) || witch_key==45 || witch_key==32 || witch_key==58);
    }
	else if (check_kind == "ck_single")	//ֻ�������ֺ���ĸ�����������˸����
	{
		return ((witch_key>=48 && witch_key<=57) || (witch_key>=65 && witch_key<=90) || (witch_key>=97 && witch_key<=122) || witch_key==8)
	}
	else if (check_kind == "ck_sample")	//ֻ�������֡���ĸ���»���95
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
	else if (check_kind == "ck_17_number")	//18λ���֤
	{	
		
		if (this_field.value.length < 17 && this_field.maxLength == 18 )
		{			
			return (witch_key>=48 && witch_key<=57);
		}
		else
		{
			/*if ((witch_key>=48 && witch_key<=57 )||(witch_key>=65 && witch_key<=90 )||(witch_key>=97 && witch_key<=122)) 
		    {	return true;}
			else
			{	return false;}*/
			return true;
		}
		
	}
	else if (check_kind == "ck_noblank")	//���ܰ����ո�
	{	return (witch_key!=32);}
	else
	{	return true;}	
}
//</script>

