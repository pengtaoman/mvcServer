/**
 * <p>Name: nas_alertframe_info.js</p>
 * <p>Description: ������һ֡�ĵ�����Ϣ����</p>
 * <p>AppArea: Ӫҵϵͳ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/

//alert('nas_alertframe_info.js���óɹ�');
function nas_alertframe_info(xml_info,this_fild)
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
		if (temp!="")
		{
			alert(temp);
		}//������
	}
}



