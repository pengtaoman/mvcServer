//<script language="javascript">
  function hour_get(date_string)
{
	var date_array=new Array();
	if (date_string.length!=0)
	{		
		var begin_hour = date_string.substr(0,2);
		var begin_minute = date_string.substr(3,2);
		var end_hour = date_string.substr(6,2);
		var end_minute = date_string.substr(9,2);
									
		date_array.begin_hour=begin_hour;
		date_array.begin_minute=begin_minute;
		date_array.end_hour=end_hour;
		date_array.end_minute=end_minute;
		date_array.hourstring1=begin_hour+begin_minute+"";
		date_array.hourstring2=end_hour+end_minute+"";
		return date_array;
	}
	
	date_array.begin_hour="";
	date_array.begin_minute="";
	date_array.end_hour="";
	date_array.end_minute="";
	date_array.hourstring1="";
	date_array.hourstring2="";
	
	return date_array;	
}

//</script>

 