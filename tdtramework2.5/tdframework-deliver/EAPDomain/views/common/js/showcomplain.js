function showcomplain(fieldName,hiddenName) 
{   
	var attach ="";
	Complain_type = fieldName.value;	
	source = window.parent.frames[1].document.XMLDocument;
		
	var mark="";
	var info_id="";
	var attach_str="<table border='2' cellpadding='1' cellspacing='2' width='620' bordercolor='#E6E6E6' bgcolor='#FFFFFF'>";

			
	if (Complain_type ==11 )
	{ 
		mark="/root/ServiceLevelOne"; 
		info_id="/root/ServiceLevelOne/Info_id";
	}
	else if (Complain_type ==12 )
	{ 
		mark="/root/ServiceLevelTwo";
		info_id="/root/ServiceLevelTwo/Info_id";
	}
	else if	(Complain_type == 21)
	{ 
		mark="/root/TroubleLevelOne";
		info_id="/root/TroubleLevelOne/Info_id";
	}   
	else if	(Complain_type == 22)
	{ 
		mark="/root/TroubleLevelTwo";
		info_id="/root/TroubleLevelTwo/Info_id";
	}   
	
	v_id=source.selectNodes(info_id);
	v_name=source.selectNodes(mark);
	
	var info_id_arr=new Array();
	var count_info=0; 
	hiddenName.value="";   
	for(t_id=v_id.nextNode();t_id;t_id=v_id.nextNode())
	{ 
		info_id_arr[count_info]=t_id.text;	
		hiddenName.value+=info_id_arr[count_info]+"~";		
		count_info++;
	}
	j=0;

	for(t_name=v_name.nextNode();t_name!=null;t_name=v_name.nextNode())
	{ 
		attach_str +="<tr class='newtrType'>\n" ; 
		attach_str +="<td width='19%' bgcolor='#A2BEE1' bordercolor='#A2BEE1'>"+ t_name.selectNodes("Info_name").nextNode().text+"</td>\n" ;   
		attach_str +="	<td width='81%' bgcolor='#E6E6E6' bordercolor='#E6E6E6'>\n";
		var onkey_str="";
		var leng_info=eval(t_name.selectNodes('Info_length').nextNode().text);
		var data_type=t_name.selectNodes("Info_datatype").nextNode().text;
		var onblu_str=" onBlur=\"if(this.value.length>eval(this.mylen)){alert(\'输入内容超长!\');return;}\"";
		if(data_type=="I")
		{
			onkey_str=" onkeypress=\"return nas_onkey(event,0,this,this,'ck_number','只允许输入数字!','');\"";			
		}
		else if(data_type=="N")
		{
			onkey_str=" onkeypress=\"return nas_onkey(event,0,this,this,'ck_decimal','只允许输入允许数字和小数点!','');\"";	
			
		}
		else if(data_type=="D")
		{
			onkey_str=" onkeypress=\"return nas_date_onkey(event,this,'-',0);\"";
			onblu_str=" onBlur=\"if(this.value.length>eval(this.mylen)){alert(\'输入内容超长!\');return;}return nas_date_check('-',this,'日期类型的附加信息项');\"";
		}
		if(leng_info > 70)
		{
			attach_str +="  	<TEXTAREA mylen='"+leng_info+"' name='txt"+t_name.selectNodes('Info_id').nextNode().text+"' ROWS='4' COLS='68' "+onkey_str+onblu_str+">\n"; 
			attach_str +="		</TEXTAREA> \n ";
		}
		else
		{
			attach_str +="  	<input type='text' mylen='"+leng_info+"' maxlength='"+leng_info+"' name='txt"+t_name.selectNodes('Info_id').nextNode().text+"' size='68' "+onkey_str+onblu_str+">\n"; 
			attach_str +="		</input> \n ";	
		}
		attach_str +="  </td>  \n   ";  		
		attach_str +="</tr> \n ";  
		j++;      
	}	
		                                                                    	  	
	attach_str +=" </table> ";
	return attach_str;
} 
