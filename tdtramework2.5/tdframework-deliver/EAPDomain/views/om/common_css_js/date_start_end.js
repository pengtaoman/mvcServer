//<script language = "JavaScript">
//日期字符串1不能早于日期字符串2
//输入参数：start_date_string:起始日期串：YYYY-MM-DD hh:mm:ss;end_date_string:结束日期串：YYYY-MM-DD hh:mm:ss;rr_message:出错时，显示的错误提示信息
//返回值：数组：check_result
//		  数组元素check_result.status:true/false	校验成功/失败; 
//		  数组元素check_result.message:""/错误提示信息	空串(校验成功的时候)/错误提示信息(校验失败的时候);
function date_start_end (start_date_string,end_date_string,err_message)

{
	var start_date = start_date_string.value;
	var end_date   = end_date_string.value;
	var splitone = '-';
	var splittwo = ':';
	var splitthree = ' ';
	var temp_str = '';
	var check_result = new Array();

	for (var i=1;i<3;i++)
	{
		start_date = start_date.replace(splitone,'*');
		start_date = start_date.replace(splittwo,'*');
		start_date = start_date.replace(splitthree,'*');
		end_date = end_date.replace(splitone,'*');
		end_date = end_date.replace(splittwo,'*');
		end_date = end_date.replace(splitthree,'*');
	}  
    while (start_date.indexOf("*") != -1)
    {
		temp_str = start_date.substring(0,start_date.indexOf("*"));
		start_date=temp_str+start_date.substring((start_date.indexOf("*")+1),start_date.length);
    }

	while (end_date.indexOf("*") != -1)
	{
		temp_str = end_date.substring(0,end_date.indexOf("*"));
		end_date=temp_str+end_date.substring((end_date.indexOf("*")+1),end_date.length);
    }
    start_date = start_date + '';
    end_date = end_date + '';

	if(start_date.length != 0 && end_date.length != 0 && parseInt(start_date)>parseInt(end_date))
	{
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}

	check_result.status=true; 
	check_result.message=""; 
	return check_result;
}
//</script>
