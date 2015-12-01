function ip_check (field_name,this_field) 
{
	var check_result = new Array();
	var err_message="";
	var IPvalue=this_field.value;
	
	var ipPattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
	var ipArray = IPvalue.match(ipPattern); 

	if (ipArray == null)
		{
		err_message = field_name + ': '+IPvalue+'不是正确的IP地址,正确的IP如12.34.56.78 !';
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
		}
	else 
	{
		for (i = 1; i < 5; i++) 
		{
		var thisSegment = ipArray[i];
		if (thisSegment > 255) 
			{
			err_message = field_name + ': '+IPvalue+'不是正确的IP地址,正确的IP如12.34.56.78 !';
			check_result.status=false; 
			check_result.message=err_message; 
			return check_result; 	
			}
	    	}	  
	}
	check_result.status=true; 
	check_result.message=""; 
	return check_result; 	
}