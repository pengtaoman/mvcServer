/**
 * <p>Name: nas_setframe_br_info.js</p>
 * <p>Description: 设置原有的资源信息</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/
//alert('nas_setframe_br_info.js引用成功');
function nas_setframe_br_info(xml_info,this_fild)
{
	var source = document.XMLDocument;
	//错误信息
	var e_mark = xml_info + "/AlertInfo";
	var e_node=source.selectNodes(e_mark);
	var e_text_xml = "";
	var e_temp = "";
	e_text_xml=e_node.nextNode();
	var alert_info = "该PSTN用户不存在，不能做加装ADSL的受理！";
	
	var if_alert = "yes";
	
	if(e_text_xml)
	{
		e_temp = e_text_xml.text;
		
		if (e_temp != "")
		{	alert_info = e_temp;
			if_alert = "no";
		}
	}			
	
	//处理检测/查询结果
	var mark = xml_info + "/SubmitKind";
	var node=source.selectNodes(mark);
	var text_xml = "";
	var temp = "";
	text_xml=node.nextNode();
	
	if(text_xml)
	{
		temp = text_xml.text;
		
		if (temp=="queryPstn")
		{
			//是否成功
			var r_mark = xml_info + "/QueryPstnOk";
			var r_node=source.selectNodes(r_mark);
			var r_text_xml = "";
			var r_temp = "";
			r_text_xml=r_node.nextNode();			
			if(r_text_xml)
			{
				r_temp = r_text_xml.text;
				
				if (r_temp == "ok")
				{
					nas_setframe_br_info_ok(xml_info,source);
				}
				else
				{	nas_setframe_br_info_err(alert_info,if_alert);}
			}
			else
			{	nas_setframe_br_info_err(alert_info,if_alert);}
		}
		else
		{	nas_setframe_br_info_err(alert_info,if_alert);}
	}
	else
	{	nas_setframe_br_info_err(alert_info,if_alert);}
	
	return;
}

function nas_setframe_br_info_ok(xml_info,source)
{
	
	if (typeof(window.parent.frames['header'].document.forms[0].Road_name)!='undefined')
	{	window.parent.frames['header'].document.forms[0].Road_name.disabled = true;}
	if (typeof(window.parent.frames['header'].document.forms[0].Install_address)!='undefined')
	{	window.parent.frames['header'].document.forms[0].Install_address.disabled = true;}
	if (typeof(window.parent.frames['header'].document.forms[0].Road_name_info)!='undefined')
	{	window.parent.frames['header'].document.forms[0].Road_name_info.disabled = true;}
	if (typeof(window.parent.frames['header'].document.forms[0].Area_id)!='undefined')
	{	window.parent.frames['header'].document.forms[0].Area_id.disabled = true;}
	
	/*var i = 0;
	var sentence = "";
	var do_it = false;
	
	var br_mark = xml_info + "/Pstn_info";
	var br_node;
	var br_text_xml;
	var br_temp;
	
	var br_info_name = Array();
	br_info_name[0] = "Msc";
	br_info_name[1] = "Msc_port";
	br_info_name[2] = "Mdf_no1";
	br_info_name[3] = "Mdf_no2";
	br_info_name[4] = "Install_address";
	br_info_name[5] = "Area_id";
	br_info_name[6] = "Bureau_id";
	br_info_name[7] = "Line_no";
	br_info_name[8] = "Line_info";
	br_info_name[9] = "Dist_box_name";

	var br_field_name = Array();
	br_field_name[0] = "Old_msc";    
	br_field_name[1] = "Old_msc_port";
	br_field_name[2] = "Old_mdf_sound_row_no";
	br_field_name[3] = "Old_mdf_sound_column_no";
	br_field_name[4] = "Old_install_address";
	br_field_name[5] = "Old_area_id";
	br_field_name[6] = "Old_bureau_id";
	br_field_name[7] = "Old_line_no";
	br_field_name[8] = "Old_line_info";
	br_field_name[9] = "Old_dist_box_name";	
	
	for (i=0;i<br_info_name.length;i++)
	{
		br_mark = br_mark + br_info_name[i];
		br_node = source.selectNodes(br_mark);
		br_text_xml = br_node.nextNode();
		br_temp = "";
		if(br_text_xml)
		{
			br_temp = br_text_xml.text;
			
			if (br_temp != "")
			{	
				sentence = "typeof(window.parent.frames['header'].document.forms[0]." + br_field_name[i] +")!='undefined'";
				
				do_it = eval(sentence);
				
				if (do_it)
				{
					sentence = "window.parent.frames['header'].document.forms[0]."+ br_field_name[i] +".value = ''";
				
					eval(sentence);
					
					//测试
					alert(br_info_name[i] + "--" + br_field_name[i]);					
					sentence = "alert(window.parent.frames['header'].document.forms[0]."+ br_field_name[i] +".value)";
					eval(sentence);
				}			
			}
		}
	}*/
	return;
}

function nas_setframe_br_info_err(alert_info,if_alert)
{
	if (if_alert == "yes")
	{
		alert(alert_info);
	}
	
	if (typeof(window.parent.frames['header'].document.forms[0].Road_name)!='undefined')
	{	window.parent.frames['header'].document.forms[0].Road_name.disabled = false;}
	if (typeof(window.parent.frames['header'].document.forms[0].Install_address)!='undefined')
	{	window.parent.frames['header'].document.forms[0].Install_address.disabled = false;}
	if (typeof(window.parent.frames['header'].document.forms[0].Road_name_info)!='undefined')
	{	window.parent.frames['header'].document.forms[0].Road_name_info.disabled = false;}
	if (typeof(window.parent.frames['header'].document.forms[0].Area_id)!='undefined')
	{	window.parent.frames['header'].document.forms[0].Area_id.disabled = false;}
	
	if (typeof(window.parent.frames['header'].document.forms[0].Pstn_service_id)!='undefined')
	{
		window.parent.frames['header'].document.forms[0].Pstn_service_id.value = "";
		window.parent.frames['header'].document.forms[0].Pstn_service_id.focus();
	}
	return;
}

//alert("OK");


