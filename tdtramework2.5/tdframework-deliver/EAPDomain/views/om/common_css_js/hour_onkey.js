//<script language = "JavaScript">
//键盘校验事件
//输入参数：event:键盘事件；this_field:要校验的控件；marker:日期的单个分隔符；err_method:错误提示方式：0-显示错误提示信息，返回false;1-不显示错误提示信息，将错误提示信息返回；其他值-不显示错误提示信息，返回false;
//返回值：由err_method参数确定
var hour_status=true;
function hour_onkey(event,this_field,next_field,err_method)
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
			
			 var marker1="-";
    		 var marker2=":";
    
			//自动加分隔符  
			if (t1.length == 2)
			{
				this_field.value=t1+marker2;
			}
			
			if (t1.length == 5 && t1.charAt(2)==marker2)
			{
				this_field.value=t1+marker1;
			}
			
			if (t1.length == 8 && t1.charAt(2)==marker2 && t1.charAt(5)==marker1)
			{
				this_field.value=t1+marker2;
			}
			
				
			//时间转为HH格式后加-
			if (t1.length==1)
			{
				var x=t1.substr(0,1);
				var y=t1.substring(0,0);
				x=parseInt(x,10);
				if(x>2)
				{
					this_field.value=y+"0"+x+marker2;
				}
			}
				
			//分钟转为MI格式后加-
			if (t1.length==4 && t1.charAt(2)==marker2)
			{
				var x=t1.substr(3,1);
				var y=t1.substring(0,3);
				x=parseInt(x,10);
				if(x>5)
				{
					this_field.value=y+"0"+x+marker1;
				}
			}
			
			//时间转化为HH格式后加-
			if (t1.length==7 && t1.charAt(2)==marker2 && t1.charAt(5)==marker1)
			{
				var x=t1.substr(6,1);
				var y=t1.substring(0,6);
				x=parseInt(x,10);
				if(x>2)
				{
					this_field.value=y+"0"+x+marker2;
				}
			}
			
			//时间转化为MI格式后加-
			if (t1.length==10 && t1.charAt(2)==marker2 && t1.charAt(5)==marker1 && t1.charAt(8)==marker2)
			{
				var x=t1.substr(9,1);
				var y=t1.substring(0,9);
				x=parseInt(x,10);
				if(x>5)
				{
					this_field.value=y+"0"+x;
				}
			}

			
			if (scode==8)
			{
				if (t1.length==2)
				{
					var x=t1.substring(0,1);
					this_field.value=x;
				}
				if (t1.length==5 && t1.charAt(2)==marker2)
				{
					var x=t1.substring(0,4);
					this_field.value=x;
				}
				if (t1.length==8 && t1.charAt(2)==marker2 &&  t1.charAt(5)==marker1)
				{
					var x=t1.substring(0,7);
					this_field.value=x;
				}
								
			}
		
}
//</script>

