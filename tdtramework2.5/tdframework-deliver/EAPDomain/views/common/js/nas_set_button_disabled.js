/**
 * <p>Name: nas_set_button_disabled.js</p>
 * <p>Description: 控制按钮置灰</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/
/*注意：
	页面调用时，应在所有对按钮处理的最后调用：以保证权限对按钮的控制是最优先的。
*/
//alert('nas_set_button_disabled.js引用成功');
function nas_set_button_disabled(xml_info,set_kind)
{
	var source = document.XMLDocument;
	var mark;
	if (xml_info != "")
	{
		mark = xml_info + "/Button";
	}
	else
	{
		mark = "root/Button";
	}
	var node=source.selectNodes(mark);
	var text_xml = "";
	text_xml=node.nextNode();
	
	if(text_xml)
	{
		var i = 0;
		var xml_name = "";
		var button_name = "";
		var filed_name = "";
		var the_filed;
		
		//alert(text_xml.text);
		
		if (text_xml.hasChildNodes()) 
		{
			//alert(text_xml.childNodes.length);
			for (i=0;i<text_xml.childNodes.length;i++)
			{
				xml_name = text_xml.childNodes(i).nodeName;
				if (xml_name == "Function")
				{
					button_name = text_xml.childNodes(i).text;
					//alert(button_name);
					if (button_name != "")
					{
						//UPDATE BY ZTY 20030730
						if (set_kind == "hidden_frame")
						{
							filed_name = "window.parent.frames['header'].document.forms[0]."+button_name;							
						}
						else
						{
							filed_name = "document.forms[0]."+button_name;
						}
						
						the_filed = eval(filed_name);
						
						if (typeof(the_filed)!='undefined')
						{
							//alert(filed_name);
							//alert(the_filed);
							the_filed.disabled = true;
						}						
					}
				}
			}
		}
	}
	
	return;
}

