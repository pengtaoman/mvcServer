/**
 * <p>Name: nas_upframe_printstr.js</p>
 * <p>Description: ����һ֡�Ĵ�ӡ����ֵ</p>
 * <p>AppArea: Ӫҵϵͳ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author guoyl
 * @version 1.0
**/
//alert("���óɹ�");
function nas_upframe_printstr(xml_info,this_fild)
{
	
	var source = document.XMLDocument;
	var mark = xml_info;
	var node=source.selectNodes(mark);
	var text_xml = "";
	var temp = "";
	text_xml=node.nextNode();
	temp = text_xml.text;
	
	window.parent.frames['header'].document[0].PrintStr.value = temp;
		
	//alert(temp);
}


