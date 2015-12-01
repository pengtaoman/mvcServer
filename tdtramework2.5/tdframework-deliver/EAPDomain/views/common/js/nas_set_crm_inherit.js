/*
 * Name: nas_set_crm_inherit.js
 * Description: 将继承信息的值赋上去
 * 营业系统公用
*/

//nas_set_crm_inherit('root/Create/InheritInfo',document.forms[0].InheritType.value);

function nas_set_crm_inherit(xml_info,this_kind)
{
	var i;
	var xml_name;
	var xml_name_node;
	var filed_name;
	var the_filed;
	
	var xml_name_acc;
	var xml_name_node_acc;
	var filed_name_acc;
	var the_filed_acc;
	
	var set_dis;

	var source = document.XMLDocument;
	
	if (this_kind == "1" || this_kind == "2")
	{

		
		//设置客户信息
		var mark = xml_info + "/CusInfo";
		var node=source.selectNodes(mark);
		var text_xml = "";
		var temp = "";
		text_xml=node.nextNode();
		if(text_xml)
		{
			temp = text_xml.text;
			if (text_xml.hasChildNodes())
			{
				for (i=0;i<text_xml.childNodes.length;i++)
				{
					xml_name = text_xml.childNodes(i).nodeName;
					//filed_name = "document.forms[0]."+xml_name.toLowerCase();
					filed_name = "document.forms[0]."+xml_name;
					//alert(filed_name);
					the_filed = eval(filed_name);
	
					xml_name_node = text_xml.selectNodes(xml_name).nextNode();
					if (xml_name_node)
					{
						if (typeof(the_filed)!='undefined')
						{
	
							the_filed.value = xml_name_node.text;
							if (xml_name_node.text == "-1.0")
							{
								the_filed.value = "0.00";
							}
							if (xml_name_node.text == "null" || xml_name_node.text == "NULL")
							{
								the_filed.value = "";
							}
							the_filed.disabled = true;
							//the_filed.readOnly = true;
						}
	
					}
				}
	
			}
		}
	}

	if (this_kind == "2")//需要设置帐户信息
	{
		//设置帐户信息
		var mark_acc = xml_info + "/AccInfo";
		var node_acc = source.selectNodes(mark_acc);
		var text_xml_acc = "";
		var temp_acc = "";

		text_xml_acc = node_acc.nextNode();

		if(text_xml_acc)
		{
			temp_acc = text_xml_acc.text;

			if (text_xml_acc.hasChildNodes())
			{
				for (i=0;i<text_xml_acc.childNodes.length;i++)
				{
					xml_name_acc = text_xml_acc.childNodes(i).nodeName;
					filed_name_acc = "document.forms[0]."+xml_name_acc;
					

					the_filed_acc = eval(filed_name_acc);
					
					xml_name_node_acc = text_xml_acc.selectNodes(xml_name_acc).nextNode();
					if (xml_name_node_acc)
					{
						if (typeof(the_filed_acc)!='undefined')
						{
							the_filed_acc.value = xml_name_node_acc.text;
							if (xml_name_node_acc.text == "-1.0")
							{
								the_filed_acc.value = "0.00";
							}
							if (xml_name_node_acc.text == "null" || xml_name_node_acc.text == "NULL")
							{
								the_filed_acc.value = "";
							}
							the_filed_acc.disabled = true;
							//the_filed.readOnly = true;
						}
					}
				}
			}
		}
	}
	
	//alert(document.forms[0].CustomerId.value);
	//alert(document.forms[0].AccountId.value);
	//alert(document.forms[0].InheritType.value);
	
	return;

}

