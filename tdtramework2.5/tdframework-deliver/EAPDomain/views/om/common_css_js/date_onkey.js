//<script language = "JavaScript">
//键盘校验事件
//输入参数：event:键盘事件；this_field:要校验的控件；marker:日期的单个分隔符；err_method:错误提示方式：0-显示错误提示信息，返回false;1-不显示错误提示信息，将错误提示信息返回；其他值-不显示错误提示信息，返回false;
//返回值：由err_method参数确定
//要求输入的数字形式是：yyyy-mm-dd hh:mm:ss
function date_onkey(event,this_field,marker,err_method)
{
    var scode = event.keyCode;//获得键盘至值。    
    
	if(scode == 13)
	{  	
		return true;
	}
	//如果输入的不是数字，报错。
	/*
   	if ((scode >= 32 && scode <= 47) || (scode >= 58 && scode <= 127))
	{		
		var err_message = "日期输入只能是数字";
		if (err_method == 0)
		{
			alert (err_message);
			this_field.focus();
			return false;
		}
		else if (err_method == 1)
		{	
			return err_message;
		}   
		else 
		{	
			return false;
		}
	}
	*/
	var t1 = this_field.value + "";//转换为字符串。	
	
	//在年、月后自动加分隔符  
	if(t1.length == 4 || (t1.length == 7 && t1.charAt(4) == marker && t1.charAt(1)!=marker))
	{
		this_field.value = t1 + marker;
	}	
	//在日子后面加上空格。
	if(t1.length == 10 && (t1.charAt(4) == marker) && (t1.charAt(7) == marker))
	{
		this_field.value = t1 + " ";
	}
	//将时分秒中的":"显示出来。
	if(t1.length == 13 || (t1.length == 16 && t1.charAt(13) == ":") && (t1.charAt(4) == marker) && (t1.charAt(7) == marker))
	{
		this_field.value = t1 + ":";
	}
	//月转换成标准的MM格式后加-
	if(t1.length == 6 && t1.charAt(4) == marker)
	{
		var x = t1.substr(5,1);
		var y = t1.substring(0,5);
		x = parseInt(x);
		if(x > 1)
		{
			this_field.value = y + "0" + x + marker;
		}
	}	
	//日转化成标准的DD格式
	if(t1.length == 9 && t1.charAt(4) == marker && t1.charAt(7) == marker)
	{
		var x = t1.substr(8,1);
		var y = t1.substring(0,8);
		x = parseInt(x);
		if(x > 4)
		{
			this_field.value = y + "0" + x + ' ' ;
		}
	}	
	//小时转变成标准的格式。		
	if(t1.length == 12 && t1.charAt(10) == ' ' && t1.charAt(4) == marker && t1.charAt(7) == marker)
	{
		var x = t1.substr(11,1);
		var y = t1.substring(0,11);
		x = parseInt(x);
		if(x > 3)
		{
			this_field.value = y + "0" + x + ':';
		}
	}	
	//分钟转变成标准的格式。		
	if(t1.length == 15 && t1.charAt(13) == ':' && t1.charAt(10) == ' ' && t1.charAt(4) == marker && t1.charAt(7) == marker)
	{
		var x = t1.substr(14,1);
		var y = t1.substring(0,14);
		x = parseInt(x);
		if(x > 6)
		{
			this_field.value = y + "0" + x + ':';
		}
	}	
	//秒钟转变成标准的格式。		
	if(t1.length == 18 && t1.charAt(16) == ':' && t1.charAt(13) == ':' && t1.charAt(10) == ' ' && t1.charAt(4) == marker && t1.charAt(7) == marker)
	{
		var x = t1.substr(17,1);
		var y = t1.substring(0,17);
		x = parseInt(x);
		if(x > 6)
		{
			this_field.value = y + "0" + x;
		}
	}	
	if(scode == 8)
	{
		if (t1.length == 4)
		{
			var x = t1.substring(0,3);
			this_field.value = x;
		}
		if (t1.length == 7 && t1.charAt(4) == marker)
		{
			var x = t1.substring(0,6);
			this_field.value = x;
		}
	}	
}

	//函数名称：date_replace
	//用途：将4，7，10，13，16位置的字符替换为相应的字符。
function date_replace(this_field,marker)
{
	
	var field = this_field.value + "";
	var temp = field.substring(0,4);
/*
	var i;
	var j;
	i = field.indexOf("-",0);
	alert(i);
	j = field.indexOf("-",4);
	alert(j);
*/	
	//如果前面的4位不满4位，自动补零。
	if(temp.length < 4)
	{
		var len = 4 - temp.length;
		for(var i=0;i<len;i++)
			temp += '0';
	}
	
	//判断是否为空。
	if(field.substring(5,7).length < 1)
		temp = temp + marker + "01";
	else if(field.substring(5,7).length == 1)
		temp = temp + marker + '0' + field.substring(5,7);
	else
		temp = temp + marker + field.substring(5,7);
		
	//如果数字不对，进行转换。
	if(field.substr(5,1) > 1)
		temp = temp.substring(0,5) + "0" + temp.substring(6,19);
	else if(parseInt(field.substr(5,2)) > 12)
		temp = temp.substring(0,5) + "12" + temp.substring(7,19);
		
	if(field.substring(8,10).length < 1)
		temp = temp + marker + "01";
	else if(field.substring(8,10).length == 1)		
		temp = temp + marker + '0' + field.substring(8,10);
	else
		temp = temp + marker + field.substring(8,10);

	//如果数字不对，进行转换。
	if(field.substr(8,1) > 3)
		temp = temp.substring(0,8) + "0" + temp.substring(9,19);
	else if(parseInt(field.substr(8,2)) > 31)
		temp = temp.substring(0,8) + "28" + temp.substring(10,19);
		
	if(field.substring(11,13).length < 1)
	 	temp = temp + ' ' + "00";
	 else if(field.substring(11,13).length == 1)
	 	temp = temp + ' ' + '0' + field.substring(11,13);
	 else
	 	temp = temp + ' ' + field.substring(11,13);

	//如果数字不对，进行转换。
	if(field.substr(11,1) > 3)
		temp = temp.substring(0,11) + "0" + temp.substring(12,19);
	else if(parseInt(field.substr(11,2)) > 24)
		temp = temp.substring(0,11) + "24" + temp.substring(13,19);

	if(field.substring(14,16).length < 1)
	 	temp = temp + ':' + "00";
	 else if(field.substring(14,16).length == 1)
	 	temp = temp + ':' + '0' + field.substring(14,16);
	 else
	 	temp = temp + ':' + field.substring(14,16);

	//如果数字不对，进行转换。
	if(field.substr(14,1) > 6)
		temp = temp.substring(0,14) + "0" + temp.substring(15,19);
	else if(parseInt(field.substr(14,2)) > 60)
		temp = temp.substring(0,14) + "60" + temp.substring(16,19);

	if(field.substring(17,19).length < 1)
		temp = temp + ':' + "00";
	else if(field.substring(17,19).length == 1)
		temp = temp + ':' + '0' + field.substring(17,19);
	else
		temp = temp + ':' + field.substring(17,19);
	
	//如果数字不对，进行转换。
	if(field.substr(17,1) > 6)
		temp = temp.substring(0,17) + "0" + temp.substring(18,19);
	else if(parseInt(field.substr(17,2)) > 60)
		temp = temp.substring(0,17) + "60";
	
	this_field.value = temp;
	
}
//</script>

