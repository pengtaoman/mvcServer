//<script language = "JavaScript">
//onblur���ύǰУ��ؼ��Ƿ�����Լ��
//���������this_field:ҪУ��Ŀؼ�;
//			check_kind:У�鷽ʽ:"ck_number":�������֣�"ck_decimal":�������ֺ�С���㣻"ck_comma":�������ֺͶ��ţ�"ck_single":�������ֺ���ĸ��"ck_sample":����������ĸ�»���,��ֻ�����»��߿�ͷ��"ck_noblank":���ܰ����ո�"ck_date":�������ֺͺ��ߣ����ڣ���"ck_underline":����������ĸ�»��ߣ�"ck_phone":��׼�绰��ʽ��(86)-010-88888888-888
//			err_message:����ʱ�Ĵ�����ʾ��Ϣ
//����ֵ��
//	���飺check_result
//		  ����Ԫ��check_result.status:true/false	У��ɹ�/ʧ��; 
//		  ����Ԫ��check_result.message:""/������ʾ��Ϣ	�մ�(У��ɹ���ʱ��)/������ʾ��Ϣ(У��ʧ�ܵ�ʱ��);

//alert("���� nas_ip_onlost.js");

function nas_ip_onlost(this_field,check_kind,err_message)
{
	var check_result = new Array();
	var is_allow = decimal_check(this_field,check_kind);
	if(is_allow)
 	{	
 		check_result.status=true;
 		check_result.message="";
		return check_result;
 	}
 	else
 	{
 		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
 	}
}
function decimal_check(this_field,check_kind)
{
	if (check_kind == "ck_number")			//ֻ��������
	{	
		var decimal_expr = /^[\d]+$/;
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "ck_decimal")	//ֻ�������ֺ�С����
	{
		var decimal_expr = /^[\d\.]+$/;
		//alert(this_field.value);
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "ck_comma")		//ֻ�������ֺͶ���
	{
		var decimal_expr = /^[\d\,]+$/;
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "ck_single")		//ֻ�������ֺ���ĸ
	{
		var decimal_expr = /^[a-zA-Z0-9]{0,}$/;
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "ck_sample")	//����ĸ�����ֺ��»�����ɲ�����ĸ�����ֿ�ͷ
	{	
		var decimal_expr = /^[a-zA-Z0-9]{1,}[\w]{0,}/;
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "ck_underline")	//����ĸ�����ֺ��»������
	{	
		var decimal_expr = /^[\w]+$/;
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "ck_noblank")	//���ܰ����ո�
	{	
		var the_value = this_field.value;
		var first_point = the_value.indexOf(' ');
 		if (first_point != -1)
		{	var match_array = null;}
		else
		{	var match_array = 1;}
	}
	else if (check_kind == "ck_date")	//ֻ�������ֺͺ���
	{	
		var decimal_expr = /^[\d\-]+$/;
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "165_account_without")	//165�ʺ�У�飬����@��
	{	
		var decimal_expr  =/^[a-z]+[a-z0-9_\-\.]*[@]{0,0}[a-z0-9_\-\.]*$/; 
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "165_account_without_allownum")	//165�ʺ�У�飬����@�����������ֿ�ͷ
	{	
		var decimal_expr  =/^[a-z0-9_\-\.]+[a-z0-9_\-\.]*[@]{0,0}[a-z0-9_\-\.]*$/; 
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "165_account_with")	//165�ʺ�У�飬��@��
	{	
		var decimal_expr  =/^[a-z]+[a-z0-9_\-\.]*[@]{0,1}[a-z0-9_\-\.]*$/; 
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "165_password_without")	//165����У�飬����@��
	{	
		var decimal_expr  =/^[A-Za-z0-9_\-\.]+$/; 
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "165_password_with")	//165����У�飬��@��
	{	
		var decimal_expr  =/^[a-zA-Z0-9_\-\.]+[@]{0,1}[A-Za-z0-9_\-\.]*$/; 
		var match_array = this_field.value.match(decimal_expr);
	}
	else if (check_kind == "ck_phone")	//��׼�绰��ʽ��(86)-010-88888888-888
	{	
		var decimal_expr = /^((\(\d+\)){0,1}(\-{0,1}\d+\-{0,1}\d+\-{0,1}\d+)\,{0,1})*$/;
		var match_array = this_field.value.match(decimal_expr);
	}	
	else if (check_kind == "ck_calling_number")	//���к����ʽ
	{	
		var count1=0;
		var count2=0;
		var count3=0;
		var calling_number_pattern_1 = /^[0]+[\d]*$/;
		var calling_number_pattern_2 = /^[0-9]*$/;
		var newArray=this_field.value.split(',');
		for (var i=0;i<newArray.length;i++)
		{	
			if (newArray[i]=="")
			{
			break;
			}
			else if (newArray[i]=="0000")
			{
			count3++;
			}
		
			else
			{
				if (newArray[i].match(calling_number_pattern_2))
				{
				count2++;
				}
				else
				{	
					return false;
				}
				if (newArray[i].match(calling_number_pattern_1))
				{
					count1++;
					if (count1>=1)
					{	
					return false;
					}
				}
					 
			}
		}
		if ((count3==1 && count2>=1) || (count3>1))
		{
				return false;
		}
		return true;
	}	
	else if (check_kind == "ck_ip")	//IP��ַУ��
	{	
		var decimal_expr = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
		var match_array = this_field.value.match(decimal_expr); 
		
		if (match_array != null)
		{
			for (var i = 1; i < 5; i++) 
			{
				var thisSegment = match_array[i];
				if (thisSegment > 255) 
				{
					match_array = null;
					break;
				}
		    }	  
		}
	}
	else
	{	var match_array = 1;}
	
	if (match_array == null)
	{	return false;}
	else
	{	return true;}
}
//</script>


