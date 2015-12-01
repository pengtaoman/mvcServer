//<script language = "JavaScript">
//键盘校验事件
//输入参数：event:键盘事件；this_field:要校验的控件；marker:日期的单个分隔符；err_method:错误提示方式：0-显示错误提示信息，返回false;1-不显示错误提示信息，将错误提示信息返回；其他值-不显示错误提示信息，返回false;
//返回值：由err_method参数确定
var date_status=true;
function date_onkey_jump(event,this_field,next_field,marker,err_method)
{
    var scode=event.keyCode;
    
	if(scode == 13)
	{	
			if (false==next_field.disabled || false==next_field.readOnly) 
			{	next_field.focus();}
			
			else
			{	
				return true;
			}
	}
   	if ((scode>=32 && scode<=47) || (scode>=58 && scode<=127))
	{
		var err_message = "日期输入只能是数字";
		if (err_method==0)
		{
			hour_status=false;	
			alert (err_message);
			hour_status=true;	
			this_field.focus();
			return false;
		}
		else if (err_method==1)
		{	return err_message;}   
		else 
		{	return false;}
	}
	var t1=this_field.value+"";	
	//在年、月后自动加分隔符  
	if (t1.length == 4 || (t1.length==7 && t1.charAt(4)==marker))
	{
		this_field.value=t1+marker;
	}	
	//月转换成标准的MM格式后加-
	if (t1.length==6 && t1.charAt(4)==marker)
	{
		var x=t1.substr(5,1);
		var y=t1.substring(0,5);
		x=parseInt(x);
		if(x>1)
		{
			this_field.value=y+"0"+x+marker;
		}
	}	
	//日转化成标准的DD格式
	if (t1.length==9 && t1.charAt(4)==marker && t1.charAt(7)==marker)
	{
		var x=t1.substr(8,1);
		var y=t1.substring(0,8);
		x=parseInt(x);
		if (x>3)
		{
		this_field.value=y+"0"+x;
		}
	}	
	if (scode==8)
	{
		if (t1.length==4)
		{
			var x=t1.substring(0,3);
			this_field.value=x;
		}
		if (t1.length==7 && t1.charAt(4)==marker)
		{
			var x=t1.substring(0,6);
			this_field.value=x;
		}
	}
}

//</script>