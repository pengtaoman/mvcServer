/**
 * <p>Name: nas_setframe_number.js</p>
 * <p>Description: ������һ֡�����뺯��</p>
 * <p>AppArea: Ӫҵϵͳ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/

//alert('nas_setframe_number.js���óɹ�');
function nas_setframe_number(xml_info,this_fild)
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
		
		
		if (kind_temp=="Number")
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
					////////////////////////����С���;���
					var area_mark = xml_info + "/NumArea";
					var area_node=source.selectNodes(area_mark);
					var area_text_xml = "";
					var area_temp = "";
					area_text_xml=area_node.nextNode();
					
					var bur_mark = xml_info + "/NumBureau";
					var bur_node = source.selectNodes(bur_mark);
					var bur_text_xml = "";
					var bur_temp = "";
					bur_text_xml = bur_node.nextNode();
					
					
					if (typeof(window.parent.frames[0].document.forms[0].Area_id)!='undefined')
					{
						if(area_text_xml)
						{
							area_temp = area_text_xml.text;
							//area_temp = "123456";
							
							if (area_temp!="")
							{
								window.parent.frames[0].document.forms[0].Area_id.value = area_temp;
								
								if (window.parent.frames[0].document.forms[0].Area_id.value!="")
								{
									window.parent.frames[0].document.forms[0].Area_id.disabled = true;
								}
								else
								{
									window.parent.frames[0].document.forms[0].Area_id.disabled = false;
								}
							}
							else
							{
								window.parent.frames[0].document.forms[0].Area_id.disabled = false;
							}
						}
						else
						{
							//��ʼ��С��&false
							window.parent.frames[0].document.forms[0].Area_id.disabled = false;
						}
					}
					if (typeof(window.parent.frames[0].document.forms[0].Bureau_id)!='undefined')
					{
						if(bur_text_xml)
						{
							bur_temp = bur_text_xml.text;
							//bur_temp = "1000";
							
							if (bur_temp!="")
							{
								window.parent.frames[0].document.forms[0].Bureau_id.value = bur_temp;					
								if (window.parent.frames[0].document.forms[0].Bureau_id.value!="")
								{
									window.parent.frames[0].document.forms[0].Bureau_id.disabled = true;
								}
								else
								{
									window.parent.frames[0].document.forms[0].Bureau_id.disabled = false;
								}
							}
							else
							{
								window.parent.frames[0].document.forms[0].Bureau_id.disabled = false;
							}
						}
						else
						{
							//��ʼ������&false
							window.parent.frames[0].document.forms[0].Bureau_id.disabled = false;
						}
					}
				}//������Ч
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
					//window.parent.frames[0].document.forms[0].Service_id.value = window.parent.frames[0].document.forms[0].Area_code.value;
					window.parent.frames[0].document.forms[0].New_service_id.value = window.parent.frames[0].document.forms[0].Area_code.value;
					window.parent.frames[0].document.forms[0].New_service_id.disabled = false;
					window.parent.frames[0].document.forms[0].New_service_id.focus();
					//��ʼ��С��&false
					//��ʼ������&false
					if (typeof(window.parent.frames[0].document.forms[0].Area_id)!='undefined')
					{
						window.parent.frames[0].document.forms[0].Area_id.disabled = false;
					}
					if (typeof(window.parent.frames[0].document.forms[0].Bureau_id)!='undefined')
					{
						window.parent.frames[0].document.forms[0].Bureau_id.disabled = false;
					}
				}//������Ч������ʧ��
			}
			else
			{
				alert('������ʧ�ܣ����Ժ����ԣ�');
				//window.parent.frames[0].document.forms[0].Service_id.value = window.parent.frames[0].document.forms[0].Area_code.value;
				window.parent.frames[0].document.forms[0].New_service_id.value = window.parent.frames[0].document.forms[0].Area_code.value;
				window.parent.frames[0].document.forms[0].New_service_id.disabled = false;
				window.parent.frames[0].document.forms[0].New_service_id.focus();
				//��ʼ��С��&false
				//��ʼ������&false
				if (typeof(window.parent.frames[0].document.forms[0].Area_id)!='undefined')
				{
					window.parent.frames[0].document.forms[0].Area_id.disabled = false;
				}
				if (typeof(window.parent.frames[0].document.forms[0].Bureau_id)!='undefined')
				{
					window.parent.frames[0].document.forms[0].Bureau_id.disabled = false;
				}
			}
		}
		if (kind_temp=="Number_new_acc")
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
					////////////////////////����С���;���
					var area_mark = xml_info + "/NumArea";
					var area_node=source.selectNodes(area_mark);
					var area_text_xml = "";
					var area_temp = "";
					area_text_xml=area_node.nextNode();
					
					var bur_mark = xml_info + "/NumBureau";
					var bur_node = source.selectNodes(bur_mark);
					var bur_text_xml = "";
					var bur_temp = "";
					bur_text_xml = bur_node.nextNode();
					
					if(area_text_xml)
					{
						area_temp = area_text_xml.text;
						//area_temp = "123456";
						
						
						if (area_temp!="")
						{
							window.parent.frames[1].document.forms[0].Area_id_name.value = area_temp;
							
							if (window.parent.frames[1].document.forms[0].Area_id_name.value!="")
							{
								window.parent.frames[1].document.forms[0].Area_id_name.disabled = true;
							}
							else
							{
								window.parent.frames[1].document.forms[0].Area_id_name.disabled = false;
							}
						}
						else
						{
							window.parent.frames[1].document.forms[0].Area_id_name.disabled = false;
						}
					}
					else
					{
						//��ʼ��С��&false
						window.parent.frames[1].document.forms[0].Area_id_name.disabled = false;
					}
					
					if(bur_text_xml)
					{
						bur_temp = bur_text_xml.text;
						//bur_temp = "1000";
						
						if (bur_temp!="")
						{
							window.parent.frames[1].document.forms[0].Bureau_id_name.value = bur_temp;					
							if (window.parent.frames[1].document.forms[0].Bureau_id_name.value!="")
							{
								window.parent.frames[1].document.forms[0].Bureau_id_name.disabled = true;
							}
							else
							{
								window.parent.frames[1].document.forms[0].Bureau_id_name.disabled = false;
							}
						}
						else
						{
							window.parent.frames[1].document.forms[0].Bureau_id_name.disabled = false;
						}
					}
					else
					{
						//��ʼ������&false
						window.parent.frames[1].document.forms[0].Bureau_id_name.disabled = false;
					}
				}//������Ч
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
					
					window.parent.frames[1].document.forms[0].New_service_id.disabled = false;
					window.parent.frames[1].document.forms[0].New_service_id.focus();
					//��ʼ��С��&false
					//��ʼ������&false
					if (typeof(window.parent.frames[1].document.forms[0].Area_id)!='undefined')
					{
						window.parent.frames[1].document.forms[0].Area_id.disabled = false;
					}
					if (typeof(window.parent.frames[1].document.forms[0].Bureau_id)!='undefined')
					{
						window.parent.frames[1].document.forms[0].Bureau_id.disabled = false;
					}
				}//������Ч������ʧ��
			}
			else
			{
				alert('������ʧ�ܣ����Ժ����ԣ�');
				window.parent.frames[1].document.forms[0].New_service_id.disabled = false;
				window.parent.frames[1].document.forms[0].New_service_id.focus();
				//��ʼ��С��&false
				//��ʼ������&false
				if (typeof(window.parent.frames[1].document.forms[0].Area_id)!='undefined')
				{
					window.parent.frames[1].document.forms[0].Area_id.disabled = false;
				}
				if (typeof(window.parent.frames[1].document.forms[0].Bureau_id)!='undefined')
				{
					window.parent.frames[1].document.forms[0].Bureau_id.disabled = false;
				}
			}
		}
	}
}




