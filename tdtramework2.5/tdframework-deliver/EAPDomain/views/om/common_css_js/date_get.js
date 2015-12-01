//<script language="javascript">
 //由页面元素date_string(YYYY-MM_DD格式)得到数组date_array
 //输入参数：date_string:日期串；marker:日期串date_string里的分隔符，如果没有则为""；
 //返回值： 数组：date_array
 //			数组元素date_array.year=YYYY；date_array.month=MM；date_array.day=DD；date_array.datestring=YYYYMMDD
function date_get(date_string,marker)
{
	var date_array = new Array();
	var year = "";
	var month = "";
	var day = "";
	var hour = "";
	var minute = "";
	var second = "";
	if (date_string.length != 0)
	{
		if (marker != "")							//如果传入的字符串有分隔符
		{
			year = date_string.substr(0,4);
			month = date_string.substr(5,2);
			day = date_string.substr(8,2);
			hour = date_string.substr(11,2);
			minute = date_string.substr(14,2);
			second = date_string.substr(17,2);
		}
		else									//如果传入的字符串没有分隔符
		{
			year = date_string.substr(0,4);
			month = date_string.substr(4,2);
			day = date_string.substr(6,2);
			hour = date_string.substr(8,2);
			minute = date_string.substr(10,2);
			second = date_string.substr(12,2);
		}
					
		date_array.year = year;
		date_array.month = month;
		date_array.day = day;
		date_array.hour = hour;
		date_array.minute = minute;
		date_array.second = second;		
		date_array.datestring = year + month + day + "";
		
		return date_array;
	}
	
	date_array.year="";
	date_array.month="";
	date_array.day="";
	date_array.hour = "";
	date_array.minute = "";
	date_array.second = "";		
	date_array.datestring = "";
	
	return date_array;	
}

//</script>

 