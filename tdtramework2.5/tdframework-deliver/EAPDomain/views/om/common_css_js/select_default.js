function dwselect(form_name,dwname,dwselect)
{
	source = document.XMLDocument;
	mark="/root/"+dwselect; 
   
	v=source.selectNodes(mark);    
	for(t=v.nextNode();t;t=v.nextNode()){ 
		temp=t.text; 
		if (temp!="-1" && temp!=""){
			var dwobject="document."+form_name+"."+dwname+".value='"+temp+"'";
			eval(dwobject);
		}
	}
}


function check_null(field_name,form_field,method)
	{
		//输入域非空校验
		var message = field_name + "不应为空!";
		var v_text = form_field.value;
		if (v_text != null)
			{
			for (logo = 0;logo <= form_field.value.length;logo = logo + 1)
				{
				v_text = v_text.replace(" ","");
				}
			}
		if (v_text == "" || v_text == null)
			{
			if (method == 0)
				{
				alert(message);
				select_focus(form_field);
				return;
				}else{
				return message;
				}
			}
		if (method == 0)
			{
			return;
			}else{
			return "";
			}
	}


function select_focus(form_field)
	{
		//处理校验后输入焦点
		var this_form = form_field.form.name;
		var this_field = form_field.name;
		var select_express = "document." + this_form + "." + this_field + ".select()";
		var focus_express = "document." + this_form + "." + this_field + ".focus()";
		eval("setTimeout('" + select_express + "',1)");
		eval("setTimeout('" + focus_express + "',1)");
	}
	
function cut_message(message)
	{
		//处理重复提示信息
		var message_in = message;
    	var message_Array = message_in.split("!");
    	var Array_length = message_Array.length;
		for (logo = 0;logo <= Array_length;logo = logo + 1)
			{
			if (message_Array[logo] == null || message_Array[logo] == "")
				{
				message_Array[logo] = "";
				}else{
				message_Array[logo] = message_Array[logo] + "！";
				}
			}
		for (logo_1 = 0;logo_1 <= Array_length;logo_1 = logo_1 + 1)
			{
			for (logo_2 = logo_1 + 1;logo_2 <= Array_length;logo_2 = logo_2 + 1)
				{
				if (message_Array[logo_1] == message_Array[logo_2])
					{
					message_Array[logo_2] = "";
					}
				}
			}
		var message_out = message_Array.join("");
		return message_out;
	}
	
//数字检验
function myKey(Event) 
 {
    var ss=event.keyCode;
    //var the_form = formField.form.name;
    
    if(ss>=32 && ss<=47) {

    	alert("此处只能输入数字");
		
	   return false;
       }
    if(ss>=58 && ss<=127) {

    	alert("此处只能输入数字");

		  return false;
       }
/*
     var scode=(navigator.appname=="Nwtscape")?event.which:event.keyCode;
     if(scode==13)
     {
	var s_FieldName=formField.name;
	
       	var d_focus="document."+the_form+"."+s_FieldName+".focus()";
       	eval(d_focus);
       	if(formField.type=="text"&&formField.value!="")
       	{
        	var d_select="document."+the_form+"."+s_FieldName+".select()";
          	eval(d_select);
       	}
    }
*/	
 }