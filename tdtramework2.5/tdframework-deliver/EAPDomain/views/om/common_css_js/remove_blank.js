//<script language='JavaScript'>
function remove_blank(in_string)
{
	var out_string = in_string;
	var re_blank = / /g;
	var re_blank_cn = /¡¡/g;
	out_string = out_string.replace(re_blank,'');
	out_string = out_string.replace(re_blank_cn,'');

	return out_string;
}
//</script>


