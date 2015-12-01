function go_submit(file_name,the_parameter)
{
	var fee_str_info = link_fee();
	var fee_item = "<input type='hidden' name='fee_str' value = '"+fee_str_info+"'>";
	document.forms[0].insertAdjacentHTML("BeforeEnd",fee_item);
	
	submit_fun(document.forms[0],file_name,the_parameter);
	
}