//<script language = "JavaScript">
//设置页面所有文本框,文本区域，下拉列表框状态为可编辑状态或不可编辑状态
//输入参数：
//	1。to_field:要设置的表单域；
//	2。status：要设置的表单域的状态；取值为true或false
function set_form_status(the_form,status)
{
	for (i=0;i<the_form.elements.length;i++)
	{
		if (the_form.elements[i].type.substr(0,4)=="text" || the_form.elements[i].type.substr(0,4)=="sele")
		{
			the_form.elements[i].disabled=status;
		}
	}
	
}
//</script>

