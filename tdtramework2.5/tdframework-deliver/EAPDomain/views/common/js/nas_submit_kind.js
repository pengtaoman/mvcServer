/**
 * <p>Name: nas_submit_kind.js</p>
 * <p>Description: ȡ�ñ����ύ����</p>
 * <p>AppArea: Ӫҵϵͳ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/

//alert('nas_submit_kind.js���óɹ�');
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

