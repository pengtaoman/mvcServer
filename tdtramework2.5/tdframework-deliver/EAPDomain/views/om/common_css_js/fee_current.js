function fee_current()
{
	var sum_fee = 0;
	var the_count = 0;
	
	if(document.forms[0].fee_sum)
	{	
		if (document.forms[0].fee_sum.length)
		{	var sum_leng = document.forms[0].fee_sum.length;}
		else
		{	var sum_leng = 0;}
		if (document.forms[0].favour_sum.length)
		{	var fav_leng = document.forms[0].favour_sum.length;}
		else
		{	var fav_leng = 0;}
		
		/*if (sum_leng>0)
		{
			for (var j=0;j<sum_leng;j++)
			{
				alert(document.forms[0].fee_sum[j].name+'----'+document.forms[0].fee_sum[j].value);
			}
		}
		
		if (fav_leng>0)
		{
			for (var j=0;j<fav_leng;j++)
			{
				alert(document.forms[0].favour_sum[j].name+'----'+document.forms[0].favour_sum[j].value);
			}
		}*/
		
		
		if (sum_leng > fav_leng)
		{	the_count = fav_leng;}
		else
		{	the_count = sum_leng;}
		
		if (the_count > 1)
		{
			for (var i=0;i<the_count;i++)
			{
				//alert(i+'************');
				//alert(document.forms[0].fee_sum[i].value+'------------'+document.forms[0].favour_sum[i].value);
				sum_fee += 100 + document.forms[0].fee_sum[i].value*1 - document.forms[0].favour_sum[i].value*1 - 100;
			}
		}
		else
		{
			sum_fee += 100 + document.forms[0].fee_sum.value*1 - document.forms[0].favour_sum.value*1 - 100;			
		}
		
		
	}
	if(document.forms[0].preserve6)
	{
		sum_fee += 100 + document.forms[0].preserve6.value*1 -100;			
	}
	if(document.forms[0].pre_paid_fee)
	{
		sum_fee += 100 + document.forms[0].pre_paid_fee.value*1 -100;			
	}
	document.forms[0].total_fee.value = sum_fee;		
	refresh_fee_string(document.forms[0].total_fee);
}
