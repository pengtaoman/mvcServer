//<script language='JavaScript'>
//输入参数：in_string:母串；start_int：要截取的起始位置(从0开始)；sub_length：要截取的长度(传空值""则截取到串的末尾);
function sub_string(in_string,start_int,sub_length)
{
	var start_int=parseInt(start_int);
	var end_int=parseInt(sub_length);
	
	if (in_string != "" || in_string!=null)
  	{
  		if (sub_length != "")
  		{	var out_string = in_string.substr(start_int,sub_length);}
  		else
  		{	var out_string = in_string.substr(start_int);}
  		return out_string;
  	}
 	else
  	{
  		return in_string;
  	}
}
//</script>


