/**
 * <p>Name: nas_set_inherit.js</p>
 * <p>Description: 将继承信息从下一帧赋值上去</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @date 20030107
 * @version 1.0
**/

//alert('nas_set_inherit.js引用成功');

function nas_set_inherit_ForTwo(xml_info,this_kind,the_cid,the_aid)
{
	//设置继承标识、继承客户ID、继承帐户ID
	if (this_kind == "cus")
	{
		if (typeof(window.parent.frames[1].document.forms[0].Inherit_flag)!='undefined')
		{	window.parent.frames[1].document.forms[0].Inherit_flag.value = "1";}
		if (typeof(window.parent.frames[1].document.forms[0].Customer_id)!='undefined')
		{	window.parent.frames[1].document.forms[0].Customer_id.value = the_cid;}
		if (typeof(window.parent.frames[1].document.forms[0].Account_id)!='undefined')
		{	window.parent.frames[1].document.forms[0].Account_id.value = "";}
	}
	else if (this_kind == "acc")
	{
		if (typeof(window.parent.frames[1].document.forms[0].Inherit_flag)!='undefined')
		{	window.parent.frames[1].document.forms[0].Inherit_flag.value = "2";}
		if (typeof(window.parent.frames[1].document.forms[0].Customer_id)!='undefined')
		{	window.parent.frames[1].document.forms[0].Customer_id.value = the_cid;}
		if (typeof(window.parent.frames[1].document.forms[0].Account_id)!='undefined')
		{	window.parent.frames[1].document.forms[0].Account_id.value = the_aid;}
	}
	else
	{
		if (typeof(window.parent.frames[1].document.forms[0].Inherit_flag)!='undefined')
		{	window.parent.frames[1].document.forms[0].Inherit_flag.value = "0";}
		if (typeof(window.parent.frames[1].document.forms[0].Customer_id)!='undefined')
		{	window.parent.frames[1].document.forms[0].Customer_id.value = "";}
		if (typeof(window.parent.frames[1].document.forms[0].Account_id)!='undefined')
		{	window.parent.frames[1].document.forms[0].Account_id.value = "";}
	}
	
	var i;
	var xml_name;
	var xml_name_node;
	var filed_name;
	var the_filed;
	var set_dis;
	
	var source = document.XMLDocument;
	
	//////先设置客户类型--个人/集团
	var kind_mark = xml_info+"/Cus_info/Customer_kind";
	var kind_node = source.selectNodes(kind_mark);
	var kind_xml = kind_node.nextNode();	
	if (kind_xml)
	{
		if (typeof(window.parent.frames[1].document.forms[0].Customer_kind)!='undefined')
		{
			window.parent.frames[1].document.forms[0].Customer_kind.value = kind_xml.text;
			
			window.parent.frames[1].show_customer_level_info();
		}
	}
	
	//设置客户信息
	var mark = xml_info + "/Cus_info";
	var node=source.selectNodes(mark);
	var text_xml = "";
	var temp = "";	
	text_xml=node.nextNode();	
	if(text_xml)
	{
		//alert(text_xml.nodeName);
		temp = text_xml.text;
		//alert(text_xml.getAttribute("First_name"));
		
		if (text_xml.hasChildNodes()) 
		{
			//alert(text_xml.childNodes.length);
			for (i=0;i<text_xml.childNodes.length;i++)
			{
				//alert(text_xml.childNodes(i));//"object"
				//alert(text_xml.childNodes(i).nodeName + "--" + text_xml.childNodes(i).nodeValue);
				//alert(text_xml.childNodes(i).xml);
				//alert(text_xml.childNodes(i).nodeTypeString);
				
				xml_name = text_xml.childNodes(i).nodeName;
				
				filed_name = "window.parent.frames[1].document.forms[0]."+xml_name;
				
				//针对过户，加上前缀
				if (typeof(window.parent.frames[1].document.forms[0].Inherit_field_prefix)!='undefined')
				{	
					filed_name = "window.parent.frames[1].document.forms[0]."+window.parent.frames[1].document.forms[0].Inherit_field_prefix.value+xml_name;
				}
				
				the_filed = eval(filed_name);
				
				if (typeof(the_filed)!='undefined')
				{
					xml_name_node = text_xml.selectNodes(xml_name).nextNode();	
					if (xml_name_node)
					{
						//alert(xml_name_node.text);
						/*if (xml_name_node.text == "-1")
						{
							xml_name_node.text = "";
						}*/						
						the_filed.value = xml_name_node.text;						
						if (xml_name_node.text == "-1.0")
						{
							the_filed.value = "0.00";
						}
						if (xml_name_node.text == "null" || xml_name_node.text == "NULL")
						{
							the_filed.value = "";
						}
					}
					
					the_filed.disabled = true;
					
				}
				else	//针对过户，把客户类型层的公用部分再置回来
				{
					filed_name = "window.parent.frames[1].document.forms[0]."+xml_name;
					the_filed = eval(filed_name);
					if (typeof(the_filed)!='undefined')
					{
						xml_name_node = text_xml.selectNodes(xml_name).nextNode();	
						if (xml_name_node)
						{
							//alert(xml_name_node.text);
							/*if (xml_name_node.text == "-1")
							{
								xml_name_node.text = "";
							}*/
							the_filed.value = xml_name_node.text;
							if (xml_name_node.text == "-1.0")
							{
								the_filed.value = "0.00";
							}
							if (xml_name_node.text == "null" || xml_name_node.text == "NULL")
							{
								the_filed.value = "";
							}
						}
						
						the_filed.disabled = true;
						
					}
				}
			}
		}
	}
	
	//alert(this_kind);
	
	
	////设置帐户信息
	if (this_kind == "acc")
	{
		//首先设置银行---托收行
		var bank_mark = xml_info+"/Acc_info/Bank_id";
		
		var bank_node = source.selectNodes(bank_mark);
		var bank_xml = bank_node.nextNode();	
		if (bank_xml)
		{
			if (typeof(window.parent.frames[1].document.forms[0].Bank_id)!='undefined')
			{
				window.parent.frames[1].document.forms[0].Bank_id.value = bank_xml.text;
				
				window.parent.frames[1].bank_relation(window.parent.frames['header'].document.forms[0].Bank_id);
			}
		}
	
	
		//设置帐户信息
		var mark_acc = xml_info + "/Acc_info";
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
					xml_name = text_xml_acc.childNodes(i).nodeName;
					
					filed_name = "window.parent.frames[1].document.forms[0]."+xml_name;
					
					//针对过户，加上前缀
					
					if (typeof(window.parent.frames[1].document.forms[0].Inherit_field_prefix)!='undefined')
					{	
						filed_name = "window.parent.frames[1].document.forms[0]."+window.parent.frames[1].document.forms[0].Inherit_field_prefix.value+xml_name;
					}
					the_filed = eval(filed_name);
					//alert(typeof(the_filed));
					if (typeof(the_filed)!='undefined')
					{
						xml_name_node = text_xml_acc.selectNodes(xml_name).nextNode();	
						if (xml_name_node)
						{
							//alert(xml_name_node.text);
							/*if (xml_name_node.text == "-1")
							{
								xml_name_node.text = "";
							}*/
							the_filed.value = xml_name_node.text;
							if (xml_name_node.text == "-1.0")
							{
								the_filed.value = "0.00";
							}
							if (xml_name_node.text == "null" || xml_name_node.text == "NULL")
							{
								the_filed.value = "";
							}
							
							
						}
						
						the_filed.disabled = true;
						
					}
				}
			}
		}
	}
	
	//alert(window.parent.frames['header'].document.forms[0].Inherit_flag.value);
	
}



