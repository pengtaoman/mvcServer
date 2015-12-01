function hour_check(begin_hour,begin_minute,end_hour,end_minute,field_name)
{
	
	var check_result = new Array();
	
	//ʱ�����ΪHH(��������ʽ�ж��Ƿ�������)
	var err_message=field_name+'����ʼʱ�������HH��ʽ�Ķ�λ�������!';
	var begin_hour_patten=/^[0-9]{2,2}$/i; 
	var matchArray = begin_hour.match(begin_hour_patten);	
	if (begin_hour.length!=0 && matchArray==null)
	{
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}	
	
	//���ӱ���ΪMI(��������ʽ�ж��Ƿ�������)
	var err_message=field_name+'����ʼ���ӱ�����MI��ʽ�Ķ�λ�������!';
	var begin_minute_patten=/^[0-9]{2,2}$/i; 
	var matchArray = begin_minute.match(begin_minute_patten);	
	if (begin_minute.length!=0 && matchArray==null)
	{
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}	
	
	
	//ʱ�����ΪHH(��������ʽ�ж��Ƿ�������)
	var err_message=field_name+'�Ľ���ʱ�������HH��ʽ�Ķ�λ�������!';
	var end_hour_patten=/^[0-9]{2,2}$/i; 
	var matchArray = begin_hour.match(end_hour_patten);	
	if (end_hour.length!=0 && matchArray==null)
	{
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}	
	
	//���ӱ���ΪMI(��������ʽ�ж��Ƿ�������)
	var err_message=field_name+'�Ľ���ʱ�������MI��ʽ�Ķ�λ�������!';
	var end_minute_patten=/^[0-9]{2,2}$/i; 
	var matchArray = begin_minute.match(end_minute_patten);	
	if (end_minute.length!=0 && matchArray==null)
	{
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}
	
	if ( begin_hour.length==0 && begin_minute.length==0 && end_hour.length==0 && end_minute.length==0)
	{
		check_result.status=true; 
		check_result.message=''; 
		return check_result; 	
	}
	
	if ( begin_hour.length==0 || begin_minute.length==0 || end_hour.length==0 || end_minute.length==0)
	{
		var err_message='��ȷ��'+field_name+'�ĸ�ʽӦ��8:00-20:00!';
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}
		
	var begin_hour_int=parseInt(begin_hour,10);
	var begin_minute_int=parseInt(begin_minute,10);
	var end_hour_int=parseInt(end_hour,10);
	var end_minute_int=parseInt(end_minute,10);
	
	
	if (begin_hour_int<0 || begin_hour_int>24) 	
	{
		var err_message = field_name+"����ʼʱ��Ӧ��0-24֮�䣡����������!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	if (begin_minute_int<0 || begin_minute_int>59) 	
	{
		var err_message = field_name+"�ķ���Ӧ��0-59֮�䣡����������!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	if (end_hour_int<0 || end_hour_int>24) 	
	{
		var err_message = field_name+"����ʼʱ��Ӧ��0-24֮�䣡����������!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	if (end_minute_int<0 || end_minute_int>59) 	
	{
		var err_message = field_name+"�ķ���Ӧ��0-59֮�䣡����������!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	
	if (parseInt((begin_hour+begin_minute),10)>2400)
	{
		var err_message = field_name+"�����Գ���24:00!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	
	if (parseInt((end_hour+end_minute),10)>2400)
	{
		var err_message = field_name+"�����Գ���24:00!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	
	check_result.status=true; 
	check_result.message="";
	return check_result;
}