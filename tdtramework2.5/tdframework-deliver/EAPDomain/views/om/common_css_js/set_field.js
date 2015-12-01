//<script language = "JavaScript">
//设置控件的值、最大长度、显示状态
//输入参数：
//	1。to_field:要设置的控件；
//	2。set_value：要设置的值；
//	3。set_status：要设置的状态：1-可用；2-不可用；3-只读；其他值-不设置状态；(0作为默认值：不改变当前状态)；
//	4。set_length：要设置的控件的最大长度；(this.maxLength作为默认值：不改变当前最大长度)
function set_field(to_field,set_value,set_status,set_length)
{
 	to_field.value = set_value;
 	
 	if(to_field.type=="text")
	{	to_field.maxLength=set_length;	}	//如不需设置最大长度，则参数set_length可传：this.maxLength
 	
 	
 	if (parseInt(set_status) == 1)			//设置成可写状态
 	{
 		to_field.disabled = false;
 		to_field.readOnly = false;
 		to_field.enabled = true;
 	}
 	else if (parseInt(set_status) == 2)		//置灰
 	{
 		to_field.enabled = false;
 		to_field.disabled = true; 		
 	}
 	else if (parseInt(set_status) == 3)		//设置成只读状态
 	{
 		to_field.disabled = false;
 		to_field.enabled = true; 		
 		to_field.readOnly = true;
 	}
}
//</script>

