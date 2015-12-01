function feeCheck(event)
{
	var other_ss = "此处只能输入数字和小数点！"; 
	var ss=event.keyCode;
	if(ss>=32 && ss<=45||ss==47) 
	{	alert(other_ss);
	    return false;
	}
	else if(ss>=58 && ss<=127) 
	{	alert(other_ss);
		return false;
	}
	return true;
}