/**
 * <p>Name: nas_setframe_source.js</p>
 * <p>Description: ������Դ�������б���</p>
 * <p>AppArea: Ӫҵϵͳ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/
//alert('nas_setframe_source.js���óɹ�');
function nas_setframe_source(xml_info,this_fild)
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
		if (temp=="Road")
		{
			/*var r_mark = xml_info + "/RoadOk";
			var r_node=source.selectNodes(r_mark);
			var r_text_xml = "";
			var r_temp = "";
			r_text_xml=r_node.nextNode();
		
			if(r_text_xml)
			{
				r_temp = r_text_xml.text;
				
				if (r_temp != "ok")
				{
					if (typeof(window.parent.frames['header'].document.forms[0].Road_name)!='undefined')
					{
						window.parent.frames['header'].document.forms[0].Road_name.value = "";
						window.parent.frames['header'].document.forms[0].Road_name.focus();
					}
				}
			}
			else
			{
				if (typeof(window.parent.frames['header'].document.forms[0].Road_name)!='undefined')
				{
					window.parent.frames['header'].document.forms[0].Road_name.value = "";
					window.parent.frames['header'].document.forms[0].Road_name.focus();
				}
			}*/
			
			
			nas_source_build(window.parent.frames['header'].document.forms[0].Road_name_info,window.parent.frames['header'].document.forms[0].Road_name_info,"root/Create/Road_name_info","yes","Road_whole_name","Road_whole_name");
			/*add by jiangyun */
			var len = window.parent.frames['header'].document.forms[0].Road_name_info.length;
			if(len == 2)
				window.parent.frames['header'].document.forms[0].Road_name_info.selectedIndex = 1;
			else
				window.parent.frames['header'].document.forms[0].Road_name_info.selectedIndex = 0;
			/*end */
			if (typeof(window.parent.frames['header'].document.forms[0].Bus_solution_id)!='undefined')
				window.parent.frames['header'].document.forms[0].Bus_solution_id.disabled = false;
			if (typeof(window.parent.frames['header'].document.forms[0].Service_id_temp)!='undefined')
				window.parent.frames['header'].document.forms[0].Service_id_temp.disabled = false;

			if (typeof(window.parent.frames['header'].document.forms[0].BBudget)!='undefined')
				window.parent.frames['header'].document.forms[0].BBudget.disabled = false;
				
			if (typeof(window.parent.frames['header'].document.forms[0].BQuery)!='undefined')
				window.parent.frames['header'].document.forms[0].BQuery.disabled = false;
				
			if (window.parent.frames['header'].document.forms[0].Road_name_info.value != "" && window.parent.frames['header'].document.forms[0].Road_name_info.value != null && window.parent.frames['header'].document.forms[0].Road_name_info.value != "-200")
			{
				//����ѡ����--�жϾ����Ƿ����
				if (typeof(window.parent.frames['header'].document.forms[0].Bureau_id)!='undefined')
					window.parent.frames['header'].bureau_go(window.parent.frames['header'].document.forms[0].Road_name_info,'SourceComm','bottom','bureau');
				//����У��·�� --- add by zhouty  20030924   ·��Ĭ����ֵ������У�飬������Դ���ʹ���������
				if (typeof(window.parent.frames['header'].document.forms[0].Innet_method)!='undefined' && typeof(window.parent.frames['header'].document.forms[0].SvcKind)!='undefined')
				{
					if (window.parent.frames['header'].document.forms[0].SvcKind.value == '22')//�ۺ����ݵ�
						window.parent.frames['header'].unidata_checck_source(window.parent.frames['header'].document.forms[0].Road_name_info,'bottom',window.parent.frames['header'].document.forms[0].Innet_method.value);
				}
				
			}
			else
			{
				if (typeof(window.parent.frames['header'].document.forms[0].Bureau_id)!='undefined')
					window.parent.frames['header'].document.forms[0].Bureau_id.length = 0;
			}
			
		}
		if (temp=="Bureau")
		{
			if (typeof(window.parent.frames['header'].document.forms[0].Bureau_id)!='undefined')
			{
				window.parent.frames['header'].document.forms[0].Bureau_id.disabled = false;
			
				nas_source_build(window.parent.frames['header'].document.forms[0].Bureau_id,window.parent.frames['header'].document.forms[0].Bureau_id,"root/Create/Bureau_info","yes","Bureau_id","Bureau_id_name");
			}
			
			if (typeof(window.parent.frames['header'].document.forms[0].Area_id)!='undefined')
				window.parent.frames['header'].document.forms[0].Area_id.disabled = false;
			
			if (typeof(window.parent.frames['header'].document.forms[0].Bus_solution_id)!='undefined')
				window.parent.frames['header'].document.forms[0].Bus_solution_id.disabled = false;
			if (typeof(window.parent.frames['header'].document.forms[0].Service_id_temp)!='undefined')
				window.parent.frames['header'].document.forms[0].Service_id_temp.disabled = false;
				
			if (typeof(window.parent.frames['header'].document.forms[0].BBudget)!='undefined')
				window.parent.frames['header'].document.forms[0].BBudget.disabled = false;
				
			if (typeof(window.parent.frames['header'].document.forms[0].BQuery)!='undefined')
				window.parent.frames['header'].document.forms[0].BQuery.disabled = false;
			
		}
	}
	
	return;
	
}
