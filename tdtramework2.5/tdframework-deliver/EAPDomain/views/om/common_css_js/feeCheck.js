function feeCheck(event)
{
	var other_ss = "�˴�ֻ���������ֺ�С���㣡"; 
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