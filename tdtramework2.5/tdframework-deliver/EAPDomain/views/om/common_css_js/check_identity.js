function check_identity(identity_length_array,identity_method_array,identity_kind_field_name,identity_kind_field,identity_code_field)
{
	var err_message=identity_kind_field_name+'�������!';
	var check_result = new Array();
	var select_point=identity_kind_field.selectedIndex;
	var select_value=identity_kind_field.options[select_point].value;
	var select_text=identity_kind_field.options[select_point].text;
	var code_value=identity_code_field.value;
	
	if (!identity_length_array)
	{
		var identity_length_array = new Array();
		identity_length_array[1] = '15';
		identity_length_array[2] = '18';
		identity_length_array[3] = '18';
		identity_length_array[4] = '15';
		identity_length_array[5] = '12';
	}
	
	if (!identity_method_array)
	{
		var identity_method_array = new Array();
		identity_method_array[1] = '0';
		identity_method_array[2] = '1';
		identity_method_array[3] = '1';
		identity_method_array[4] = '1';
		identity_method_array[5] = '1';
	}
	
	//�����15λ���֤��֤�����볤�Ȳ�Ϊ15λ
	if (select_text.indexOf("15")!=-1 && code_value.length!=15 && code_value.length!=0)
	{
		err_message=identity_kind_field_name+'���ȴ���!';
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}
	
	//�����18λ���֤��֤�����볤�Ȳ�Ϊ18λ
	if (select_text.indexOf("18")!=-1 && code_value.length!=18 && code_value.length!=0)
	{
		err_message=identity_kind_field_name+'���ȴ���!';
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}
	
	if (code_value.length>identity_length_array[select_value])
	{
		err_message=identity_kind_field_name+'���ȳ���������Ƴ���!';
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}
	
	//ȷ����ǰ֤�����͵�У�����
	//0	ȫΪ����
	//1	ȫΪ���֣���ĸ
	//2	�����ַ����
	if ( code_value.length!=0)
	{
		if (identity_method_array[select_value] == 0 || identity_method_array[select_value] == "0")
		{	var decimal_expr = /^[\d]+$/;	}
		else if  (identity_method_array[select_value]  == 1 || identity_method_array[select_value]  == "1")
		{	var decimal_expr = /^[\w]+$/;	}
		else if (identity_method_array[select_value]  == 2 || identity_method_array[select_value]  == "2")
		{	var decimal_expr = /^[*]+$/;	}
		
		var match_array = code_value.match(decimal_expr);
		
		if (match_array==null)
		{
			if (identity_method_array[select_value] == 0 || identity_method_array[select_value] == "0")
				{	err_message=identity_kind_field_name+'Ӧ��Ϊ����!';	}
			else if  (identity_method_array[select_value]  == 1 || identity_method_array[select_value]  == "1")
				{	err_message=identity_kind_field_name+'Ӧ��Ϊ���ֺ���ĸ�����!';	}
			else if (identity_method_array[select_value]  == 2 || identity_method_array[select_value]  == "2")
				{	err_message=identity_kind_field_name+'��ʽ����!';	}
			else
				{	err_message=identity_kind_field_name+'��ʽ����!';	}	
				
			check_result.status=false; 
			check_result.message=err_message; 
			return check_result; 	
		}
	}
	
	//�ж�15λ���֤�������Ƿ���ȷ
	if (select_text.indexOf("15")!=-1 && code_value.length==15)
	{	var year = code_value.substr(6,2);
		var month = code_value.substr(8,2);
		var day = code_value.substr(10,2);
		var new_year = "19" + year;
		var year_int=parseInt(new_year,10);
		var month_int=parseInt(month,10);
		var day_int=parseInt(day,10);
		
		if ((year_int%4==0)&&(year_int%100!=0) || (year_int%400==0)) 
		{
			var day_number=new Array(31,29,31,30,31,30,31,31,30,31,30,31);
		}
		else
		{
	    		var day_number=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
		}
		
		if (year_int<1900) 
		{
		var err_message = identity_kind_field_name+"����û�����壡���������룡";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
		}	
	
		if (month_int<1 || month_int>12) 	
		{
		var err_message = identity_kind_field_name+"���·ݲ���ȷ!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
		}
	
		if (day_int<1 || day_int>day_number[(month-1)])	
		{
		var err_message = identity_kind_field_name+"�����ڲ��ֲ���ȷ!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
		}
	}		 	
	
	
	//�ж�18λ���֤�������Ƿ���ȷ
	if (select_text.indexOf("18")!=-1 && code_value.length==18)
	{	
		var year = code_value.substr(6,4);
		var month = code_value.substr(10,2);
		var day = code_value.substr(12,2);
		var year_int=parseInt(year,10);
		var month_int=parseInt(month,10);
		var day_int=parseInt(day,10);
		
		if ((year_int%4==0)&&(year_int%100!=0) || (year_int%400==0)) 
		{
			var day_number=new Array(31,29,31,30,31,30,31,31,30,31,30,31);
		}
		else
		{
	    		var day_number=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
		}
		
		if (year_int<1900) 
		{
		var err_message = identity_kind_field_name+"����û������!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
		}	
	
		if (month_int<1 || month_int>12) 	
		{
		var err_message = identity_kind_field_name+"���·ݲ���ȷ!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
		}
	
		if (day_int<1 || day_int>day_number[(month-1)])	
		{
		var err_message = identity_kind_field_name+"�����ڲ��ֲ���ȷ!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
		}
	}		 	
	
	check_result.status=true; 
	check_result.message="";
	return check_result;		 		
}
