//<script language='JavaScript'>
//���������in_string:ĸ����start_int��Ҫ��ȡ����ʼλ��(��0��ʼ)��sub_length��Ҫ��ȡ�ĳ���(����ֵ""���ȡ������ĩβ);
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


