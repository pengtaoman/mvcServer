//���кż��



//alert("���� nas_pcnl_check.js�ɹ���");
//4��0�ɹ�
function nas_pcnl_check(field_name,this_field) 
{
	var check_result = new Array();
	var count1=0;		//��0��ͷ�ĸ���
	var count2=0;		//�����ֿ�ͷ
	var count3=0;		//4��0�ĸ���
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
				check_result.status=false; 
				check_result.message='�����'+field_name+'��ʽ!'; 
				return check_result;
			}
			if (newArray[i].length>32)
			{
				check_result.status=false; 
				check_result.message='�����'+field_name+'��ʽ!(���ȹ���)'; 
				return check_result;
			}
			/*
			if (newArray[i].match(calling_number_pattern_1))
			{
				count1++;
				if (count1>=1)
				{	
				check_result.status=false; 
				check_result.message='�����'+field_name+'��ʽ!'; 
				return check_result; 
				}
			}
			*/
				 
		}
	}
	
	if ((count3==1 && count2>=1) || (count3>1))
	{
		check_result.status=false; 
		check_result.message='�����'+field_name+'��ʽ!'; 
		return check_result; 
	}
	
	check_result.status=true; 
	check_result.message=""; 
	return check_result; 	
}


function nas_calling_limit_check(field_name,this_field) 
{
	var check_result = new Array();
	var count1=0;		//��0��ͷ�ĸ���
	var count2=0;		//�����ֿ�ͷ
	var count3=0;		//4��0�ĸ���
	var calling_number_pattern_1 = /^[0]+[\d]*$/;
	var calling_number_pattern_2 = /^[\+,\-]{0,1}[0-9]{1,}$/;
	
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
				check_result.status=false; 
				check_result.message='�����'+field_name+'��ʽ!'; 
				return check_result; 
			}
			if (newArray[i].length>32)
			{
				check_result.status=false; 
				check_result.message='�����'+field_name+'��ʽ!(���ȹ���)'; 
				return check_result;
			}
			/*
			if (newArray[i].match(calling_number_pattern_1))
			{
				count1++;
				if (count1>=1)
				{	
				check_result.status=false; 
				check_result.message='�����'+field_name+'��ʽ!'; 
				return check_result; 
				}
			}
			*/
				 
		}
	}
	
	if ((count3==1 && count2>=1) || (count3>1))
	{
			check_result.status=false; 
			check_result.message='�����'+field_name+'��ʽ!'; 
			return check_result; 
	}
	
	check_result.status=true; 
	check_result.message=""; 
	return check_result; 	
}

/*
function calling_number_check(field_name,this_field) 
{
	var check_result = new Array();
	var count1=0;		//��0��ͷ�ĸ���
	var count2=0;		//�����ֿ�ͷ
	var count3=0;		//4��0�ĸ���
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
				check_result.status=false; 
				check_result.message='�����'+field_name+'��ʽ!'; 
				return check_result; 
			}
			if (newArray[i].match(calling_number_pattern_1))
			{
				count1++;
				if (count1>=1)
				{	
				check_result.status=false; 
				check_result.message='�����'+field_name+'��ʽ!'; 
				return check_result; 
				}
			}
				 
		}
	}
	
	if ((count3==1 && count2>=1) || (count3>1))
	{
			check_result.status=false; 
			check_result.message='�����'+field_name+'��ʽ!'; 
			return check_result; 
	}
	
	check_result.status=true; 
	check_result.message=""; 
	return check_result; 	
}
*/
