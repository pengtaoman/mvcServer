//<script language = "JavaScript">
//����У���¼�
//���������event:�����¼���this_field:ҪУ��Ŀؼ���marker:���ڵĵ����ָ�����err_method:������ʾ��ʽ��0-��ʾ������ʾ��Ϣ������false;1-����ʾ������ʾ��Ϣ����������ʾ��Ϣ���أ�����ֵ-����ʾ������ʾ��Ϣ������false;
//����ֵ����err_method����ȷ��
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
		var err_message = "��������ֻ��������";
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
    
			//�Զ��ӷָ���  
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
			
				
			//ʱ��תΪHH��ʽ���-
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
				
			//����תΪMI��ʽ���-
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
			
			//ʱ��ת��ΪHH��ʽ���-
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
			
			//ʱ��ת��ΪMI��ʽ���-
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

