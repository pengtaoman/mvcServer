function link_fee()
{
	var the_str = '';
	
	if (document.forms[0].fee_id && document.forms[0].fee_id)
	{
		
		if (document.forms[0].fee_id.length > 1)
		{
			for (var i=0;i<document.forms[0].fee_id.length;i++)
			{
				if (document.forms[0].fee_id[i])
				{	the_str = the_str + '' + document.forms[0].fee_id[i].value + '`';}
				else
				{	the_str = the_str + '`';}
				if (document.forms[0].fee_name[i])
				{	the_str = the_str + '' + document.forms[0].fee_name[i].value + '`';}
				else
				{	the_str = the_str + '`';}
				if (document.forms[0].fee_sum[i])
				{	the_str = the_str + '' + document.forms[0].fee_sum[i].value + '`';}
				else
				{	the_str = the_str + '`';}
				if (document.forms[0].favour_sum[i])
				{	the_str = the_str + '' + document.forms[0].favour_sum[i].value + '`';}
				else
				{	the_str = the_str + '`';}
				if (document.forms[0].favour_reason[i])
				{	the_str = the_str + '' + document.forms[0].favour_reason[i].value + '';}
				else
				{	the_str = the_str + '';}
				
				the_str = the_str + '~';
				
				//alert(i+'---------'+the_str);			
			}
		}
		else
		{
			if (document.forms[0].fee_id)
			{	the_str = the_str + '' + document.forms[0].fee_id.value + '`';}
			else
			{	the_str = the_str + '`';}
			if (document.forms[0].fee_name)
			{	the_str = the_str + '' + document.forms[0].fee_name.value + '`';}
			else
			{	the_str = the_str + '`';}
			if (document.forms[0].fee_sum)
			{	the_str = the_str + '' + document.forms[0].fee_sum.value + '`';}
			else
			{	the_str = the_str + '`';}
			if (document.forms[0].favour_sum)
			{	the_str = the_str + '' + document.forms[0].favour_sum.value + '`';}
			else
			{	the_str = the_str + '`';}
			if (document.forms[0].favour_reason)
			{	the_str = the_str + '' + document.forms[0].favour_reason.value + '';}
			else
			{	the_str = the_str + '';}
			
			the_str = the_str + '~';
			
			//alert(the_str);	
		}
	}
	
	//document.forms[0].fee_str.value = the_str ;
	
	return the_str;
	
}
