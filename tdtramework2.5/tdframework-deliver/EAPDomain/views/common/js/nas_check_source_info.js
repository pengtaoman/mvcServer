/**
 * <p>Name: nas_check_source_info.js</p>
 * <p>Description: ����ԭ�е���Դ��Ϣ</p>
 * <p>AppArea: Ӫҵϵͳ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/
//alert('nas_check_source_info.js���óɹ�');
function nas_check_source_info(xml_info,this_fild)
{
	var source = document.XMLDocument;
	//������Ϣ
	var e_mark = xml_info + "/ErrInfo";
	var e_node=source.selectNodes(e_mark);
	var e_text_xml = "";
	var e_temp = "";
	e_text_xml=e_node.nextNode();
	
	var if_alert = "yes";
	var alert_info = "ѡ����·����û�п��õ���Դ!������ѡ��!";
	if(e_text_xml)
	{
		e_temp = e_text_xml.text;
		
		if (e_temp != "")
		{	alert_info = e_temp;
			if_alert = "no";
		}
	}			
	
	//������/��ѯ���
	var mark = xml_info + "/SubmitKind";
	var r_mark;
	var node=source.selectNodes(mark);
	var text_xml = "";
	var temp = "";
	text_xml=node.nextNode();
	if(text_xml)
	{
		temp = text_xml.text;
		
		if (temp=="Switch")
		{
			//�Ƿ�ɹ�
			r_mark = xml_info + "/SwitchOk";
		}
		else if (temp=="Dslam")
		{
			//�Ƿ�ɹ�
			r_mark = xml_info + "/DslamOk";
		}
		else if (temp=="DistBox")
		{
			//�Ƿ�ɹ�
			r_mark = xml_info + "/DistBoxOk";
		}
		else if (temp=="ADSL")
		{
			//�Ƿ�ɹ�
			r_mark = xml_info + "/AdslOk";
		}
		var r_node=source.selectNodes(r_mark);
		var r_text_xml = "";
		var r_temp = "";
		r_text_xml=r_node.nextNode();			
		
		if(r_text_xml)
		{
			r_temp = r_text_xml.text;
			
			if (r_temp == "ok")
			{
				nas_check_source_info_ok(xml_info,source);
			}
			else
			{	nas_check_source_info_err(alert_info,if_alert);}
		}
		else
		{	nas_check_source_info_err(alert_info,if_alert);}
	}
	else
	{	nas_check_source_info_err(alert_info,if_alert);}
	
	return;
}

function nas_check_source_info_ok(xml_info,source)
{
	return;
}

function nas_check_source_info_err(alert_info,if_alert)
{
	if (if_alert == "yes")
	{
		alert(alert_info);
	}
	
	if (typeof(window.parent.frames['header'].document.forms[0].Road_name_info)!='undefined')
	{
		window.parent.frames['header'].document.forms[0].Road_name_info.value = "-200";
		window.parent.frames['header'].document.forms[0].Road_name_info.focus();				
	}
	return;
}
