/*
 * Name: nas_set_inherit.js
 * Description: ���̳���Ϣ����һ֡��ֵ��ȥ
 * Ӫҵϵͳ����
*/

function nas_set_inherit(xml_info,this_kind,the_cid,the_aid)
{
	//���ü̳б�ʶ���̳пͻ�ID���̳��ʻ�ID
	if (this_kind == "cus")
	{
		if (typeof(window.parent.frames['header'].document.forms[0].Inherit_flag)!='undefined')
		{	window.parent.frames['header'].document.forms[0].Inherit_flag.value = "1";}
		if (typeof(window.parent.frames['header'].document.forms[0].Customer_id)!='undefined')
		{	window.parent.frames['header'].document.forms[0].Customer_id.value = the_cid;}
		if (typeof(window.parent.frames['header'].document.forms[0].Account_id)!='undefined')
		{	window.parent.frames['header'].document.forms[0].Account_id.value = "";}		
	}
	else if (this_kind == "acc")
	{
		if (typeof(window.parent.frames['header'].document.forms[0].Inherit_flag)!='undefined')
		{	window.parent.frames['header'].document.forms[0].Inherit_flag.value = "2";}
		if (typeof(window.parent.frames['header'].document.forms[0].Customer_id)!='undefined')
		{	window.parent.frames['header'].document.forms[0].Customer_id.value = the_cid;}
		if (typeof(window.parent.frames['header'].document.forms[0].Account_id)!='undefined')
		{	window.parent.frames['header'].document.forms[0].Account_id.value = the_aid;}	
	}
	else
	{
		if (typeof(window.parent.frames['header'].document.forms[0].Inherit_flag)!='undefined')
		{	window.parent.frames['header'].document.forms[0].Inherit_flag.value = "0";}
		if (typeof(window.parent.frames['header'].document.forms[0].Customer_id)!='undefined')
		{	window.parent.frames['header'].document.forms[0].Customer_id.value = "";}
		if (typeof(window.parent.frames['header'].document.forms[0].Account_id)!='undefined')
		{	window.parent.frames['header'].document.forms[0].Account_id.value = "";}		
	}
	
	var i;
	var xml_name;
	var xml_name_node;
	var filed_name;
	var the_filed;
	var set_dis;
	
	var source = document.XMLDocument;
		
	//���ÿͻ���Ϣ
	var mark = xml_info + "/Cus_info";
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
				filed_name = "window.parent.frames[1].document.forms[0]."+xml_name.toLowerCase();
												
				the_filed = eval(filed_name);	
				
				if (typeof(the_filed) == 'undefined'){
					
					filed_name = "window.parent.frames[0].tabset1_tab1.all(\""+xml_name.toLowerCase()+"\")";					
					the_filed = eval(filed_name);
					
				}							
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
					}
					
				}				
			}
			
		}
	}

	////�����ʻ���Ϣ
	if (this_kind == "acc")
	{
		//������������---������
		var bank_mark = xml_info+"/Acc_info/Bank_id";
		
		var bank_node = source.selectNodes(bank_mark);
		var bank_xml = bank_node.nextNode();	
		if (bank_xml)
		{
			if (typeof(window.parent.frames[1].document.forms[0].bank_id)!='undefined')
			{
				window.parent.frames[1].document.forms[0].bank_id.value = bank_xml.text;
				
				window.parent.frames[1].bank_relation(window.parent.frames[1].document.forms[0].bank_id);
			}
			bank_filed = "window.parent.frames[0].tabset1_tab2.all(\"bank_id\")";
			if (typeof(eval(bank_filed))!='undefined')
			{
				window.parent.frames[0].tabset1_tab2.all("bank_id").value = bank_xml.text;
				
				window.parent.frames[0].bank_relation(window.parent.frames[0].tabset1_tab2.all("bank_id"));
			}
		}
	
	
		//�����ʻ���Ϣ
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
					
					filed_name = "window.parent.frames[1].document.forms[0]."+xml_name.toLowerCase();										
					
					the_filed = eval(filed_name);
					if (typeof(the_filed) == 'undefined'){
						filed_name = "window.parent.frames[0].tabset1_tab2.all(\""+xml_name.toLowerCase()+"\")";
						
						the_filed = eval(filed_name);
					}	
					
					if (typeof(the_filed)!='undefined')
					{
						xml_name_node = text_xml_acc.selectNodes(xml_name).nextNode();	
						if (xml_name_node)
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
						}						
						
						
					}
				}
				window.parent.frames[0].tabset1_tab2.all("pay_way").disabled = true;
				window.parent.frames[0].tabset1_tab2.all("bank_id").disabled = true;
				window.parent.frames[0].tabset1_tab2.all("bank_account").disabled = true;
				window.parent.frames[0].tabset1_tab2.all("account_name").disabled = true;
				window.parent.frames[0].tabset1_tab2.all("bank_charge").disabled = true;
				window.parent.frames[0].tabset1_tab2.all("agreement_no").disabled = true;					    				
				window.parent.frames[0].tabset1_tab2.all("pre_paid_fee").disabled = true;				
			}
			
		}
	}

}





