//<script language = "JavaScript">
//����У���¼�
//���������event:�����¼���this_field:ҪУ��Ŀؼ��� marker:���ڵĵ����ָ�����err_method:������ʾ��ʽ��0-��ʾ������ʾ��Ϣ������false;1-����ʾ������ʾ��Ϣ����������ʾ��Ϣ���أ�����ֵ-����ʾ������ʾ��Ϣ������false;
//����ֵ����err_method����ȷ��


//alert("���� nas_hour_onkey.js�ɹ�");

var hour_status=true;
function nas_hour_onkey(event,this_field,marker_kind,err_method)
{
    var scode=event.keyCode;      
	if(scode == 13)
	{	
		for (i=0;i<this_field.form.elements.length;i++)
		{
			if (this_field.form.elements[i].name == this_field.name && this_field.form.elements[i].type == this_field.type && this_field.form.elements[i] == this_field)
			{
				break;
			}
		}
		i++;				
		for (i;i<this_field.form.elements.length;i++)
		{
			//alert(this_field.form.elements[i].name+'--'+this_field.form.elements[i].type+'--'+this_field.form.elements[i].value);
			
			if (this_field.form.elements[i].type == "submit" || this_field.form.elements[i].type == "select-one" || this_field.form.elements[i].type == "text" )
			{
				if (this_field.form.elements[i].disabled != true )
				{
					this_field.form.elements[i].focus();
					if (this_field.form.elements[i].type == "text" )
					{
						this_field.form.elements[i].select();
					}
				}
				break;
			}
		}		
		return true;
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
	if (marker_kind == "colon")
	{
		var marker2=":";
		
	}
	else
	{
		var marker2=":";
	}
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



function hour_get(date_string)
{
	var date_array=new Array();
	if (date_string.length!=0)
	{		
		var begin_hour = date_string.substr(0,2);
		var begin_minute = date_string.substr(3,2);
		var end_hour = date_string.substr(6,2);
		var end_minute = date_string.substr(9,2);
									
		date_array.begin_hour=begin_hour;
		date_array.begin_minute=begin_minute;
		date_array.end_hour=end_hour;
		date_array.end_minute=end_minute;
		date_array.hourstring1=begin_hour+begin_minute+"";
		date_array.hourstring2=end_hour+end_minute+"";
		return date_array;
	}
	
	date_array.begin_hour="";
	date_array.begin_minute="";
	date_array.end_hour="";
	date_array.end_minute="";
	date_array.hourstring1="";
	date_array.hourstring2="";
	
	return date_array;	
}



function hour_check(begin_hour,begin_minute,end_hour,end_minute,field_name)
{
	
	var check_result = new Array();
	
	//ʱ�����ΪHH(��������ʽ�ж��Ƿ�������)
	var err_message=field_name+'����ʼʱ�������HH��ʽ�Ķ�λ�������!';
	var begin_hour_patten=/^[0-9]{2,2}$/i; 
	var matchArray = begin_hour.match(begin_hour_patten);	
	if (begin_hour.length!=0 && matchArray==null)
	{
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}	
	
	//���ӱ���ΪMI(��������ʽ�ж��Ƿ�������)
	var err_message=field_name+'����ʼ���ӱ�����MI��ʽ�Ķ�λ�������!';
	var begin_minute_patten=/^[0-9]{2,2}$/i; 
	var matchArray = begin_minute.match(begin_minute_patten);	
	if (begin_minute.length!=0 && matchArray==null)
	{
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}	
	
	
	//ʱ�����ΪHH(��������ʽ�ж��Ƿ�������)
	var err_message=field_name+'�Ľ���ʱ�������HH��ʽ�Ķ�λ�������!';
	var end_hour_patten=/^[0-9]{2,2}$/i; 
	var matchArray = begin_hour.match(end_hour_patten);	
	if (end_hour.length!=0 && matchArray==null)
	{
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}	
	
	//���ӱ���ΪMI(��������ʽ�ж��Ƿ�������)
	var err_message=field_name+'�Ľ���ʱ�������MI��ʽ�Ķ�λ�������!';
	var end_minute_patten=/^[0-9]{2,2}$/i; 
	var matchArray = begin_minute.match(end_minute_patten);	
	if (end_minute.length!=0 && matchArray==null)
	{
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}
	
	if ( begin_hour.length==0 && begin_minute.length==0 && end_hour.length==0 && end_minute.length==0)
	{
		check_result.status=true; 
		check_result.message=''; 
		return check_result; 	
	}
	
	if ( begin_hour.length==0 || begin_minute.length==0 || end_hour.length==0 || end_minute.length==0)
	{
		var err_message='��ȷ��'+field_name+'�ĸ�ʽӦ��8:00-20:00!';
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result; 	
	}
		
	var begin_hour_int=parseInt(begin_hour,10);
	var begin_minute_int=parseInt(begin_minute,10);
	var end_hour_int=parseInt(end_hour,10);
	var end_minute_int=parseInt(end_minute,10);
	
	
	if (begin_hour_int<0 || begin_hour_int>24) 	
	{
		var err_message = field_name+"����ʼʱ��Ӧ��0-24֮�䣡����������!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	if (begin_minute_int<0 || begin_minute_int>59) 	
	{
		var err_message = field_name+"�ķ���Ӧ��0-59֮�䣡����������!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	if (end_hour_int<0 || end_hour_int>24) 	
	{
		var err_message = field_name+"����ʼʱ��Ӧ��0-24֮�䣡����������!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	if (end_minute_int<0 || end_minute_int>59) 	
	{
		var err_message = field_name+"�ķ���Ӧ��0-59֮�䣡����������!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	
	if (parseInt((begin_hour+begin_minute),10)>2400)
	{
		var err_message = field_name+"�����Գ���24:00!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	
	if (parseInt((end_hour+end_minute),10)>2400)
	{
		var err_message = field_name+"�����Գ���24:00!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	
	if (parseInt((end_hour+end_minute),10) <= parseInt((begin_hour+begin_minute),10))
	{
		var err_message = field_name+"��ʼʱ�������ڽ���ʱ��!";
		check_result.status=false; 
		check_result.message=err_message; 
		return check_result;
	}
	begin_hour,begin_minute,end_hour,end_minute,
	
	check_result.status=true; 
	check_result.message="";
	return check_result;
}





//</script>

