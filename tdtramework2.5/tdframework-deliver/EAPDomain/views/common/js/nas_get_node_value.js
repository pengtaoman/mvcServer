//取某一节点的值
function nas_get_node_value(xml_info)
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
	}
	
	return temp;
	
}