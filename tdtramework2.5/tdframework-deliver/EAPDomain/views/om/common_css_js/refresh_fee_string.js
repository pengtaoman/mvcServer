//<script language = "JavaScript">
//�����ÿؼ�ˢ�³ɱ�׼���ø�ʽ(����λС����)
//���������Ҫ��ʽ���Ŀؼ�
function refresh_fee_string(the_text)
{
	var the_value = the_text.value;
	if (the_value == null || the_value == '')
	{
		the_value = "0.00";
	}
	else
	{
		var xiaoshu_is_there = the_value.indexOf(".");
		if (xiaoshu_is_there != -1)
		{
			var xiaoshu = the_value.substr(xiaoshu_is_there,the_value.length);
		}
		else
		{
			var xiaoshu = "";
		}
		if (xiaoshu.length == 0)
		{	
			the_value = the_value + ".00";
		}
		if (xiaoshu.length == 1)
		{	
			the_value = the_value + "00";
		}
		if (xiaoshu.length == 2)
		{	
			the_value = the_value + "0";
		}
		if (xiaoshu.length > 3)
		{	
			var duoyu_xiaoshu = xiaoshu_is_there + 3;
			var four_or_five = the_value.substr(duoyu_xiaoshu,1);
			if (four_or_five > 4)
			{
				the_value = the_value.substr(0,duoyu_xiaoshu);
				the_value = the_value*1 + 0.01;
			}
			else
			{
				the_value = the_value.substr(0,duoyu_xiaoshu);
			}
		}
	}
	the_text.value = the_value;
}
//</script>

