/**
 * <p>Name: nas_setframe_print.js</p>
 * <p>Description: 生成上一帧的打印信息</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/
function nas_setframe_print(xml_info,this_fild)
{
	var source = document.XMLDocument;
	var kind_mark = xml_info;
	var kind_node=source.selectNodes(kind_mark);
	var kind_text_xml = "";
	var kind_temp = "";
	kind_text_xml=kind_node.nextNode();

	if(kind_text_xml)
	{
		kind_temp = kind_text_xml.text;
		
		window.parent.frames['header'].document.forms[0].Print_info.value = kind_temp;
	}
}




