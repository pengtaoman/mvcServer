//<script language = "JavaScript">
//the_form:要提交的窗体；the_file:提交给的服务器文件；submitparam:被请求文件要求的提交参数
function submit_fun(the_form,file_name,the_parameter)
{
	generete_hidden(the_form);
	
	
	
	var submitparam = "<input type='hidden' name='accept_submit' value = '"+the_parameter+"'>";
	the_form.insertAdjacentHTML("BeforeEnd",submitparam);
	
	
	the_form.action=file_name;	
	the_form.method='POST';
	
	
	
	the_form.submit();
}
function generete_hidden(the_form)
{
	var i=0;
	var add_name;
	var add_value;
	for (i=0;i<the_form.elements.length;i++)
	{
		//if (document.forms[0].elements[i].disabled == true)
		if (the_form.elements[i].disabled == true && the_form.elements[i].type != "submit" && the_form.elements[i].type != "button")
		{
			add_name = the_form.elements[i].name;
			add_value = the_form.elements[i].value;

			var add_col_str = "<input type='hidden' name='"+add_name+"' value = '"+add_value+"'>";
			the_form.insertAdjacentHTML("BeforeEnd",add_col_str);
		}
	}
}
function generete_var()
{
	/*var i=0;
	var add_name;
	var add_value;
	for (i=0;i<document.forms[0].elements.length;i++)
	{
		if (document.forms[0].elements[i].disabled == true && document.forms[0].elements[i].type != "submit" && document.forms[0].elements[i].type != "button")
		{
			add_name = document.forms[0].elements[i].name;
			add_value = document.forms[0].elements[i].value;

			var add_col_str = "<input type='hidden' name='"+add_name+"' value = '"+add_value+"'>";
			document.forms[0].insertAdjacentHTML("BeforeEnd",add_col_str);
		}
	}*/
	generete_hidden();
}

//向页面追加hidden控件
//element_name：要追加的hidden控件的名字；element_value：要追加的hidden控件的值；the_form：容器窗体
function add_hidden_element(element_name,element_value,the_form)
{
	var add_col_str = "<input type='hidden' name='"+element_name+"' value = '"+element_value+"'>";
	the_form.insertAdjacentHTML("BeforeEnd",add_col_str);
	return true;
}

//</script>


