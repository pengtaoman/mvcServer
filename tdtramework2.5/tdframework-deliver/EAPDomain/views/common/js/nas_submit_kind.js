/**
 * <p>Name: nas_submit_kind.js</p>
 * <p>Description: 取得本次提交类型</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/

//alert('nas_submit_kind.js引用成功');
function nas_submit_kind(xml_info)
{
	var source = document.XMLDocument;
	var mark = xml_info + "/SubmitKind";
	var node=source.selectNodes(mark);
	var text_xml = "";
	var temp = "";
	text_xml=node.nextNode();

	if(text_xml)
	{
		temp = text_xml.text;
	}
	
	return temp;
	
}

