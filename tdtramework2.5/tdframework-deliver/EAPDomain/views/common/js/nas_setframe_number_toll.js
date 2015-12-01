/**
 * <p>Name: nas_setframe_number.js</p>
 * <p>Description: 生成上一帧的密码函数</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/

//alert('nas_setframe_number.js引用成功');
function nas_setframe_number_toll(xml_info,this_fild)
{
	var source = document.XMLDocument;
	var kind_mark = xml_info + "/SubmitKind";
	var kind_node=source.selectNodes(kind_mark);
	var kind_text_xml = "";
	var kind_temp = "";
	kind_text_xml=kind_node.nextNode();
	
	if(kind_text_xml)
	{
		kind_temp = kind_text_xml.text;
		if (kind_temp=="Number_new_toll")
		{
			var mark = xml_info + "/NumOk";
			var node=source.selectNodes(mark);
			var text_xml = "";
			var temp = "";
			text_xml=node.nextNode();
		
			if(text_xml)
			{
				temp = text_xml.text;
				if (temp == "ok")
				{
					var new_kind = xml_info + "/NumArea";
				
					var new_node = source.selectNodes(new_kind);
					var new_text_xml = "";
					var new_text = "";
					new_text_xml=new_node.nextNode();
					
					if(new_text_xml)
					{
						new_text = new_text_xml.text;
						
						/*if(new_text == "toll")
						{
							window.parent.frames['header'].document.forms[0].Service_id_toll.disabled = true;
						}
						else if(new_text == "pbx")
						{
							window.parent.frames['header'].document.forms[0].Service_id_pbx.disabled = true;
						}
						else if(new_text == "toll_2me1")
						{
							window.parent.frames['header'].document.forms[0].Service_id_begin.disabled = true;
							window.parent.frames['header'].document.forms[0].Service_id_last.disabled = true;
						}*/
					}
				}//号码有效
				else
				{
					var err_mark = xml_info + "/ErrInfo";
					var err_node=source.selectNodes(err_mark);
					var err_text_xml = "";
					var err_temp = "";
					err_text_xml=err_node.nextNode();
					
					if(err_text_xml)
					{
						err_temp = err_text_xml.text;
						if (err_temp!="")
						{
							alert(err_temp);
						}
					}
					/*var new_kind = xml_info + "/NumArea";
					
					var new_node = source.selectNodes(new_kind);
					var new_text_xml = "";
					var new_text = "";
					new_text_xml=new_node.nextNode();
					
					if(new_text_xml)
					{
						new_text = new_text_xml.text;
						
						if(new_text == "toll")
						{
							window.parent.frames['header'].document.forms[0].Service_id_toll.value = window.parent.frames['header'].document.forms[0].Service_id_temp.value;
						}
						else if(new_text == "pbx")
						{
							window.parent.frames['header'].document.forms[0].Service_id_pbx.value = window.parent.frames['header'].document.forms[0].Service_id_temp.value;
						}
						else if(new_text == "toll_2me1")
						{
							window.parent.frames['header'].document.forms[0].Service_id_begin.value = window.parent.frames['header'].document.forms[0].Service_id_temp.value;
							window.parent.frames['header'].document.forms[0].Service_id_last.value = window.parent.frames['header'].document.forms[0].Service_id_temp.value;
						}
					}*/
				}//号码无效、或检测失败
			}
			else
			{
				alert('号码检测失败！请稍后再试！');
				
			}
		}
	}
}




