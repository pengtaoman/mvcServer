/**
 * <p>Name: nas_setframe_pass.js</p>
 * <p>Description: 生成上一帧的密码函数</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/

//alert('nas_setframe_pass.js引用成功');
function nas_setframe_pass(xml_info,this_fild)
{
	var source = document.XMLDocument;
	var mark = xml_info;
	var node=source.selectNodes(mark);
	var text_xml = "";
	var temp = "";
	text_xml=node.nextNode();

	if(text_xml)
	{
		temp = text_xml.text;
		/*if (temp!="")
		{
			//window.parent.frames['header'].document.forms[0].First_name.value = temp;
			if (typeof(window.parent.frames[0].document.forms[0].Password)!='undefined')
				window.parent.frames[0].document.forms[0].Password.value = temp;
		}//有密码*/
		//不管密码是否为空都要赋值
		if (typeof(window.parent.frames[0].document.forms[0].Password)!='undefined')
			window.parent.frames[0].document.forms[0].Password.value = temp;
	}
	
}



