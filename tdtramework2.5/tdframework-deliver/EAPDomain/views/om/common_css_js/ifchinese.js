function ifchinese(inputstring)
{

	var string_length=inputstring.length;
	if (string_length==0)
	{
		return true;
	}	
	for (var i=0;i<string_length;i++)
	{		
		if (inputstring.charAt(i).charCodeAt()>127)
		{
		return false;		
		}		
	}	
	return true;
}
