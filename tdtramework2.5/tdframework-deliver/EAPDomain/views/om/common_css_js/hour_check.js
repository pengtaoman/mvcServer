function hour_check(begin_hour,begin_minute,end_hour,end_minute,field_name)
{
	
	var check_result = new Array();
	
	//时间必须为HH(用正则表达式判断是否是数字)
	var err_message=field_name+'的起始时间必须由HH格式的二位数字组成!';
	var begin_hour_patten=/^[0-9]{2,2}$/i; 
	var matchArray = begin_hour.match(begin_hour_patten);	
	if (begin_hour.length!=0 && matchArray==null)
	{
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}	
	
	//分钟必须为MI(用正则表达式判断是否是数字)
	var err_message=field_name+'的起始分钟必须由MI格式的二位数字组成!';
	var begin_minute_patten=/^[0-9]{2,2}$/i; 
	var matchArray = begin_minute.match(begin_minute_patten);	
	if (begin_minute.length!=0 && matchArray==null)
	{
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}	
	
	
	//时间必须为HH(用正则表达式判断是否是数字)
	var err_message=field_name+'的结束时间必须由HH格式的二位数字组成!';
	var end_hour_patten=/^[0-9]{2,2}$/i; 
	var matchArray = begin_hour.match(end_hour_patten);	
	if (end_hour.length!=0 && matchArray==null)
	{
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}	
	
	//分钟必须为MI(用正则表达式判断是否是数字)
	var err_message=field_name+'的结束时间必须由MI格式的二位数字组成!';
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
		var err_message='正确的'+field_name+'的格式应如8:00-20:00!';
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
		var err_message = field_name+"的起始时间应在0-24之间！请重新输入!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	if (begin_minute_int<0 || begin_minute_int>59) 	
	{
		var err_message = field_name+"的分钟应在0-59之间！请重新输入!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	if (end_hour_int<0 || end_hour_int>24) 	
	{
		var err_message = field_name+"的起始时间应在0-24之间！请重新输入!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	if (end_minute_int<0 || end_minute_int>59) 	
	{
		var err_message = field_name+"的分钟应在0-59之间！请重新输入!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	
	if (parseInt((begin_hour+begin_minute),10)>2400)
	{
		var err_message = field_name+"不可以超出24:00!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	
	if (parseInt((end_hour+end_minute),10)>2400)
	{
		var err_message = field_name+"不可以超出24:00!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	
	check_result.status=true; 
	check_result.message="";
	return check_result;
}