//<script language="javascript">
//year必须大于1900;month必须在1-12之间;day必须在1-31之间
//输入参数：年、月、日、错误提示信息里要显示的控件标签名字
//返回值：数组：check_result
//		  数组元素check_result.status:true/false	校验成功/失败; 
//		  数组元素check_result.message:""/错误提示信息	空串(校验成功的时候)/错误提示信息(校验失败的时候);
function date_check(date_array,field_name)
{
	var check_result = new Array();
	
	//获得数字。（页面中）
	var year = date_array.year;
	var month = date_array.month;
	var day = date_array.day;
	var hour = date_array.hour;
	var minute = date_array.minute;
	var second = date_array.second;
	
	//年份必须为YYYY(用正则表达式判断是否是数字)
	var err_message='日期必须符合YYYY-MM-DD hh:mm:ss格式,年份必须由YYYY格式的四位数字组成!';
	//var year_patten=/^[0-9]{4,4}$/i; 
	var year_patten=/^\d+$/i; 
	var matchArray = year.match(year_patten);	
	if (year.length!=0 && matchArray==null)
	{
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}	
	//月必须为MM(用正则表达式判断是否是数字)
	var err_message='日期必须符合YYYY-MM-DD hh:mm:ss格式,月份必须由MM格式的二位数字组成!';
	//var month_patten=/^[0-9]{2,2}$/i; 
	var month_patten=/^\d+$/i; 
	var matchArray = month.match(month_patten);
	if (month.length!=0 && matchArray==null)
	{
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}
	//日期必须为DD(用正则表达式判断是否是数字)
	var err_message='日期必须符合YYYY-MM-DD hh:mm:ss格式,日期必须由DD格式的二位数字组成!';
	//var day_patten=/^[0-9]{2,2}$/i; 
	var day_patten=/^\d+$/i; 
	var matchArray = day.match(day_patten);	
	if (day.length!=0 && matchArray==null)
	{	
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}
	//日期必须为DD(用正则表达式判断是否是数字)
	var err_message='日期必须符合YYYY-MM-DD hh:mm:ss格式,小时必须由hh格式的二位数字组成!';
	var hour_patten=/^[0-9]{2,2}$/i; 
	//var hour_patten=/^\d+$/i; 
	var matchArray = hour.match(hour_patten);	
	if (hour.length!=0 && matchArray==null)
	{	
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}
	//日期必须为DD(用正则表达式判断是否是数字)
	var err_message='日期必须符合YYYY-MM-DD hh:mm:ss格式,分钟必须由mm格式的二位数字组成!';
	var minute_patten=/^[0-9]{2,2}$/i; 
	//var minute_patten=/^\d+$/i; 
	var matchArray = minute.match(minute_patten);	
	if (minute.length!=0 && matchArray==null)
	{	
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}
	//日期必须为DD(用正则表达式判断是否是数字)
	var err_message='日期必须符合YYYY-MM-DD hh:mm:ss格式,日期必须由ss格式的二位数字组成!';
	var second_patten=/^[0-9]{2,2}$/i; 
	//var second_patten=/^\d+$/i; 
	var matchArray = second.match(second_patten);	
	if (second.length!=0 && matchArray==null)
	{	
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}

	
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
		var err_message = field_name+"的年没有意义！请重新输入！";
				
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}	
	if (month_int<1 || month_int>12) 	
	{
		var err_message = field_name+"的月份不正确！请确认符合'YYYY-MM-DD hh:mm:ss'格式！";
		
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	if (day_int<1 || day_int>day_number[(month-1)])	
	{
		var err_message = field_name+"的日期部分不正确！请确认符合'YYYY-MM-DD hh:mm:ss'格式！";
		
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	if (hour<0 || hour>60)	
	{
		var err_message = field_name+"的小时部分不正确！请确认符合'YYYY-MM-DD hh:mm:ss'格式！";
		
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	if (minute<0 || minute>60)	
	{
		var err_message = field_name+"的分钟部分不正确！请确认符合'YYYY-MM-DD hh:mm:ss'格式！";
		
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	if (second<0 || second>60)	
	{
		var err_message = field_name+"的秒钟部分不正确！请确认符合'YYYY-MM-DD hh:mm:ss'格式！";
		
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	
	check_result.status=true; 
	check_result.message="";
	return check_result;
}


//此函数用于onchange事件中。
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

