/**
 * <p>Name: nas_common_print.js</p>
 * <p>Description: Ӫҵ�����ֹ��ô�ӡ����</p>
 * <p>AppArea: Ӫҵϵͳ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author guoyl
 * @version 1.0
**/
function nas_common_print(print_ocx)
{
 	//var print_str = document.forms[0].PrintStr.value;
 	var print_str = document.forms[0].Print_info.value;
 	
 	//alert ("��ӡ��Ϣ��"+print_str);
 	
 	if (print_str == "")	
 	{
 		alert("��ӡ��Ϣ��Ϊ�գ��޷���ӡ");
 	}
 	else
 	{
 		print_something(print_ocx,print_str);	
 	}
}