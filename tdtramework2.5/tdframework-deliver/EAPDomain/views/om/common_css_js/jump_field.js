//<script language = "JavaScript"> 
//使控件获得焦点
//输入参数：to_field-光标将要跳转到的控件
//输出参数：true/false
function jump_field(to_field) 
{ 
	if (false==to_field.disabled || false==to_field.readOnly) 
   	{ 
    	var the_form_name = to_field.form.name;
    	var the_field_name = to_field.name;
    	
   		var do_focus="document."+the_form_name+"."+the_field_name+".focus()";
    	var do_select="document."+the_form_name+"."+the_field_name+".select()";
 	
   		eval(do_focus); 
 
	   	if((to_field.type=="text"||to_field.type=="password")&&to_field.value!="") 
	   	{	 
	   		eval(do_select);   	 
	   	} 
 
	   	return true; 
	} 
	else 
	{     
		return false;
	} 
} 
//</script> 

