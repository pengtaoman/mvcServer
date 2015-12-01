/**
 * <p>Name: nas_common_print.js</p>
 * <p>Description: 营业受理部分公用打印函数</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author guoyl
 * @version 1.0
**/
function nas_common_print(print_ocx)
{
 	//var print_str = document.forms[0].PrintStr.value;
 	var print_str = document.forms[0].Print_info.value;
 	
 	//alert ("打印信息："+print_str);
 	
 	if (print_str == "")	
 	{
 		alert("打印信息串为空，无法打印");
 	}
 	else
 	{
 		print_something(print_ocx,print_str);	
 	}
}