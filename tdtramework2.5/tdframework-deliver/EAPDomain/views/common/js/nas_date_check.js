//<script language="javascript">
/**
 * <p>Name: nas_date_check.js</p>
 * <p>Description: ����ʱ��У��/p>
 * <p>AppArea: Ӫҵϵͳ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/

//alert('nas_date_check.js���óɹ�');
function nas_date_check(marker,the_date,the_name)
{
	if (typeof(the_date)!='undefined')
	{
	
		var the_date_arr = date_get(the_date.value,marker);
		
		var result =  date_check(the_date_arr,the_name);
		
		if (false==result.status)
		{
			alert(result.message);
			if (!the_date.disabled)
			{
				the_date.focus();
				the_date.select();
			}
			return false;
		}
		return true;
	}
	else
	{
		alert("����У���жԿؼ�"+the_date+"������ָ������ȷ����"+ the_date +"������У��û�н��С���ȷ������ȷ�ԡ�");
		return true;
	}
}

 //��ҳ��Ԫ��date_string(YYYY-MM_DD��ʽ)�õ�����date_array
 //���������date_string:���ڴ���marker:���ڴ�date_string��ķָ��������û����Ϊ""��
 //����ֵ�� ���飺date_array
 //			����Ԫ��date_array.year=YYYY��date_array.month=MM��date_array.day=DD��date_array.datestring=YYYYMMDD
function date_get(date_string,marker)
{
	var date_array=new Array()
	if (date_string.length!=0)
	{
		if (marker!="")							//���������ַ����зָ���
		{
			var year = date_string.substr(0,4);
			var month = date_string.substr(5,2);
			var day = date_string.substr(8,2);
		}
		else									//���������ַ���û�зָ���
		{
			var year = date_string.substr(0,4);
			var month = date_string.substr(4,2);
			var day = date_string.substr(6,2);
		}
					
		date_array.year=year;
		date_array.month=month;
		date_array.day=day;
		date_array.datestring=year+month+day+"";
		return date_array;
	}
	
	date_array.year="";
	date_array.month="";
	date_array.day="";
	date_array.datestring="";
	
	return date_array;	
}


//year�������1900;month������1-12֮��;day������1-31֮��
//����������ꡢ�¡��ա�������ʾ��Ϣ��Ҫ��ʾ�Ŀؼ���ǩ����
//����ֵ�����飺check_result
//		  ����Ԫ��check_result.status:true/false	У��ɹ�/ʧ��; 
//		  ����Ԫ��check_result.message:""/������ʾ��Ϣ	�մ�(У��ɹ���ʱ��)/������ʾ��Ϣ(У��ʧ�ܵ�ʱ��);
function date_check(date_array,field_name)
{
	var check_result = new Array();
	
	//������֡���ҳ���У�
	var year = date_array.year;
	var month = date_array.month;
	var day = date_array.day;
	var hour = date_array.hour;
	var minute = date_array.minute;
	var second = date_array.second;
	
	//��ݱ���ΪYYYY(��������ʽ�ж��Ƿ�������)
	var err_message='���ڱ������YYYY-MM-DD��ʽ,��ݱ�����YYYY��ʽ����λ�������!';
	//var year_patten=/^[0-9]{4,4}$/i; 
	var year_patten=/^\d+$/i; 
	var matchArray = year.match(year_patten);	
	if (year.length!=0 && matchArray==null)
	{
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}	
	
	//�±���ΪMM(��������ʽ�ж��Ƿ�������)
	var err_message='���ڱ������YYYY-MM-DD��ʽ,�·ݱ�����MM��ʽ�Ķ�λ�������!';
	//var month_patten=/^[0-9]{2,2}$/i; 
	var month_patten=/^\d+$/i; 
	var matchArray = month.match(month_patten);
	if (month.length!=0 && matchArray==null)
	{
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}
	//���ڱ���ΪDD(��������ʽ�ж��Ƿ�������)
	var err_message='���ڱ������YYYY-MM-DD��ʽ,���ڱ�����DD��ʽ�Ķ�λ�������!';
	//var day_patten=/^[0-9]{2,2}$/i; 
	var day_patten=/^\d+$/i; 
	var matchArray = day.match(day_patten);	
	if (day.length!=0 && matchArray==null)
	{	
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}
	
	/*alert("ok");
	alert(hour);
	
	//���ڱ���ΪDD(��������ʽ�ж��Ƿ�������)
	var err_message='���ڱ������YYYY-MM-DD��ʽ,Сʱ������hh��ʽ�Ķ�λ�������!';
	var hour_patten=/^[0-9]{2,2}$/i; 
	//var hour_patten=/^\d+$/i; 
	var matchArray = hour.match(hour_patten);	
	if (hour.length!=0 && matchArray==null)
	{	
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}
	
	//���ڱ���ΪDD(��������ʽ�ж��Ƿ�������)
	var err_message='���ڱ������YYYY-MM-DD��ʽ,���ӱ�����mm��ʽ�Ķ�λ�������!';
	var minute_patten=/^[0-9]{2,2}$/i; 
	//var minute_patten=/^\d+$/i; 
	var matchArray = minute.match(minute_patten);	
	if (minute.length!=0 && matchArray==null)
	{	
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}
	
	//���ڱ���ΪDD(��������ʽ�ж��Ƿ�������)
	var err_message='���ڱ������YYYY-MM-DD��ʽ,���ڱ�����ss��ʽ�Ķ�λ�������!';
	var second_patten=/^[0-9]{2,2}$/i; 
	//var second_patten=/^\d+$/i; 
	var matchArray = second.match(second_patten);	
	if (second.length!=0 && matchArray==null)
	{	
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}
	*/
	
	var year_int=parseInt(year,10);
	var month_int;
	var day_int;

	if(month.substr(0,1) == "0")
		month_int = parseInt(month.substr(1,1));
	else
		month_int = parseInt(month);
	
	if(day.substr(0,1) == "0")
		day_int = parseInt(day.substr(1,1));
	else 
		day_int = parseInt(day);

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
		var err_message = field_name+"����û�����壡���������룡";
				
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}	
	if (month_int<1 || month_int>12) 	
	{
		var err_message = field_name+"���·ݲ���ȷ����ȷ�Ϸ���'YYYY-MM-DD'��ʽ��";
		
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	if (day_int<1 || day_int>day_number[(month-1)])	
	{
		var err_message = field_name+"�����ڲ��ֲ���ȷ����ȷ�Ϸ���'YYYY-MM-DD'��ʽ��";
		
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	if (hour<0 || hour>24)	
	{
		var err_message = field_name+"��Сʱ���ֲ���ȷ����ȷ�Ϸ���'YYYY-MM-DD'��ʽ��";
		
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	if (minute<0 || minute>60)	
	{
		var err_message = field_name+"�ķ��Ӳ��ֲ���ȷ����ȷ�Ϸ���'YYYY-MM-DD'��ʽ��";
		
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	if (second<0 || second>60)	
	{
		var err_message = field_name+"�����Ӳ��ֲ���ȷ����ȷ�Ϸ���'YYYY-MM-DD'��ʽ��";
		
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	
	check_result.status=true; 
	check_result.message="";
	return check_result;
}


//�˺�������onchange�¼��С� ?????????�ؼ��Ƿ���ڡ������жϲ�����
function check_date_onblur(field_name,date_field)
{
	var date_string = date_field.value;
	var date_array = date_get(date_string,"-");
	var result = new Array();
	result = date_check(date_array,field_name);
	if(result.status == false)
	{
		alert(result.message);
		jump_field(date_field);
	}
	return result;
}

//</script>

