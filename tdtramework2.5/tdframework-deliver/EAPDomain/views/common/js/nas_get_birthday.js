//<script language = "JavaScript">
//��֤������(15λ/18λ)���֤ȡ�ó�������
//���������֤������Ŀؼ�
//����ֵ��  ���飺date_array;
//			����Ԫ��date_array.year=YYYY��date_array.month=MM��date_array.day=DD��date_array.datestring=YYYYMMDD

function nas_get_birthday(identity_code)
{
	var v_text = identity_code.value;
	var birthday=new Array();
	
	if (identity_code.maxLength == 15 && v_text.length==15)
	{
		var birthday_year = v_text.substr(6,2);
		var birthday_month = v_text.substr(8,2);
		var birthday_day = v_text.substr(10,2);
		birthday_year = "19" + birthday_year;
		
		birthday.year=birthday_year;
		birthday.month=birthday_month;
		birthday.day=birthday_day;
		birthday.datestring=birthday_year+birthday_month+birthday_day+"";
		return birthday;
		
	}
	if (identity_code.maxLength == 18 && v_text.length==18)
	{
		var birthday_year = v_text.substr(6,4);
		var birthday_month = v_text.substr(10,2);
		var birthday_day = v_text.substr(12,2);
		birthday.year=birthday_year;
		birthday.month=birthday_month;
		birthday.day=birthday_day;
		birthday.datestring=birthday_year+birthday_month+birthday_day+"";
		return birthday;						
	}
	birthday.year="";
	birthday.month="";
	birthday.day="";
	date_array.datestring="";
	return birthday;	
}

//</script>

