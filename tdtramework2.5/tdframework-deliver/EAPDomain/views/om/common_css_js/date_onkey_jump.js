//<script language = "JavaScript">
//����У���¼�
//���������event:�����¼���this_field:ҪУ��Ŀؼ���marker:���ڵĵ����ָ�����err_method:������ʾ��ʽ��0-��ʾ������ʾ��Ϣ������false;1-����ʾ������ʾ��Ϣ����������ʾ��Ϣ���أ�����ֵ-����ʾ������ʾ��Ϣ������false;
//����ֵ����err_method����ȷ��
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
	//���ꡢ�º��Զ��ӷָ���  
	if (t1.length == 4 || (t1.length==7 && t1.charAt(4)==marker))
	{
		this_field.value=t1+marker;
	}	
	//��ת���ɱ�׼��MM��ʽ���-
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
	//��ת���ɱ�׼��DD��ʽ
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