/**
 * <p>Name: nas_relation_build.js</p>
 * <p>Description: �����ؼ����ɺ���</p>
 * <p>AppArea: Ӫҵϵͳ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/
//alert('nas_relation_build.js���óɹ�');
//XML����̶���this_fild��ֵҪ�����value
function nas_relation_build(this_fild,relation_fild,this_xml,have_empty)
{
	relation_fild.length = 0;
	var m = 0;
	if (have_empty == "yes")
	{
		relation_fild.add(document.createElement("OPTION"));
		relation_fild.options[0].value='-200';
		relation_fild.options[0].text='';
		m = 1;
	}
	else if (have_empty == "yes_empty")
	{
		relation_fild.add(document.createElement("OPTION"));
		relation_fild.options[0].value='';
		relation_fild.options[0].text='';
		m = 1;
	}
	else
	{
		m = 0;
	}

	var source = document.XMLDocument;
	var mark = this_xml+'/Bank_charge_'+this_fild.value;
	var v=source.selectNodes(mark);
	//var t=v.nextNode(); wangjj update 20030331
	for (var t = v.nextNode(); t != null; t = v.nextNode())//wangjj add 20030331
    {        		
		if (t)
		{
			var rel_mark_value = mark+'/option/value';
			var rel_mark_text = mark+'/option/caption';
			var rel_mark_default = mark+'/selected';
    	
			var rel_v_value=source.selectNodes(rel_mark_value);
			var rel_v_text=source.selectNodes(rel_mark_text);
			var rel_v_default=source.selectNodes(rel_mark_default);
			var t_default=rel_v_default.nextNode();
			
			if (t_default)
			{
				var rel_default = t_default.text;
			}
			else
			{
				var rel_default = "";
			}
    	
			for(var t_value=rel_v_value.nextNode();t_value;t_value=rel_v_value.nextNode())
			{
				var t_text=rel_v_text.nextNode();
    	
				if (t_text)
				{
					if (t_text.text != null && t_value.text != null)
					{
						relation_fild.add(document.createElement("OPTION"));
						relation_fild.options[m].value=t_value.text;
						relation_fild.options[m].text=t_text.text;
    	
						if (t_value.text == rel_default)
						{
							relation_fild.options[m].selected = true;
						}
						m=m+1;
					}
				}
			}
		}
	}
	
	if (have_empty == "end")
	{
		relation_fild.add(document.createElement("OPTION"));
		relation_fild.options[m].value='-200';
		relation_fild.options[m].text='';
		m=m+1;
	}
	else if (have_empty == "end_empty")
	{
		relation_fild.add(document.createElement("OPTION"));
		relation_fild.options[m].value='';
		relation_fild.options[m].text='';
		m=m+1;
	}
	
	return;
}

//add by zhouty : ���������й����õģ����������й������ݱ���-----------------���¼���
function nas_relation_build_comm(relation_fild,this_xml,have_empty,match_value)
{
	//��ȷ���Ƿ����ɿ���
	relation_fild.length = 0;	
	var m = 0;
	if (have_empty == "yes")
	{
		relation_fild.add(document.createElement("OPTION"));
		relation_fild.options[0].value='-200';
		relation_fild.options[0].text='';
		m = 1;
	}
	else if (have_empty == "yes_empty")
	{
		relation_fild.add(document.createElement("OPTION"));
		relation_fild.options[0].value='';
		relation_fild.options[0].text='';
		m = 1;
	}
	else
	{	m = 0;}

	var the_source = document.XMLDocument;	
	//��¼���������Ĭ��ֵ
	var rel_mark_default = this_xml+'/selected';
	var rel_v_default=the_source.selectNodes(rel_mark_default);
	var t_default=rel_v_default.nextNode();	
	var rel_default="";
	if (t_default)
	{	rel_default = t_default.text;}
	else
	{	rel_default = "";}

	//��ʼѭ������ÿ������
	var the_mark = this_xml + "/option";
	//var the_mark = "root/Create/ProductId_9_11/option";
	var the_node =the_source.selectNodes(the_mark);
	var the_info;
	//��OPTION��ѭ��
	var xml_name;
	var xml_value_node;
	var xml_value;
	var the_id_value;
	var the_name_value;
	var name_ok;
	var id_ok;
	var this_found;
	
	//alert(the_mark+"-----root/Create/ProductId_9_11/option");
	
	for (the_info = the_node.nextNode(); the_info != null; the_info = the_node.nextNode())
    {        		
		xml_name = null;
		xml_value_node = null;
		xml_value = "";
		the_id_value = "";
		the_name_value = "";
		name_ok = "no";
		id_ok = "no";
		this_found= "no";
		
		if (the_info)//�Ѿ��ҵ�OPTION
		{	//ȡֵ��Ϊ���������б���׼��
			if (the_info.hasChildNodes())
			{
				for (i=0;i<the_info.childNodes.length;i++)
				{
					xml_name = the_info.childNodes(i).nodeName;					
					xml_value_node = the_info.selectNodes(xml_name).nextNode();
					if (xml_value_node)
					{	xml_value = xml_value_node.text;}
					//alert(xml_name);
					//alert(xml_value);
					
					//��¼IDֵ
					if (xml_name == "value")
					{	the_id_value = xml_value;
						id_ok = 'yes';
					}//��¼NAMEֵ
					else if (xml_name == 'caption')
					{	the_name_value = xml_value;
						name_ok = "yes";
					}
					//ƥ��ֵ��
					if (xml_value == match_value)
					{	this_found = 'yes';
					}
					
					//����������Ʋ�Ϊ�գ��������ֵƥ��
					if (match_value != "")
					{
						if (xml_value.indexOf(match_value) != "-1" || this_found=='yes')
						{
							this_found='yes';
						}
					}//û������������Ĭ����ƥ�䵽��
					else
					{
						this_found='yes';
					}
					
					//ֵƥ�䵽�ˡ�IDֵȡ���ˡ�NAMEֵҲȡ���ˣ��Ͳ����ٲ��������ֵ�
					if (this_found=='yes' && id_ok=='yes' && name_ok=='yes')
					{
						break;
					}
				}
			}
			
			//�����Ҫ��ֵ�����ˣ���ʼ������
			if (this_found=='yes' && id_ok=='yes' && name_ok=='yes')
			{
				if (the_name_value != null && the_id_value != null)
				{
					relation_fild.add(document.createElement("OPTION"));
					relation_fild.options[m].value=the_id_value;
					relation_fild.options[m].text=the_name_value;
					
					//�Ƿ��Ĭ��ѡ����ͬ
					if (the_id_value == rel_default)
					{
						relation_fild.options[m].selected = true;
					}
					m=m+1;
				}
			}
		}
	}
	
	if (have_empty == "end")
	{
		relation_fild.add(document.createElement("OPTION"));
		relation_fild.options[m].value='-200';
		relation_fild.options[m].text='';
		m=m+1;
	}
	else if (have_empty == "end_empty")
	{
		relation_fild.add(document.createElement("OPTION"));
		relation_fild.options[m].value='';
		relation_fild.options[m].text='';
		m=m+1;
	}
	
	
	return;	
}

//�ɽ���ͨ���޸�
/*
function nas_comm_relation_build(relation_fild,relation_xml,rela_condition_name,condition_value,have_empty)
{
	relation_fild.length = 0;
	var m = 0;
	if (have_empty == "yes")
	{
		relation_fild.add(document.createElement("OPTION"));
		relation_fild.options[0].value='-200';
		relation_fild.options[0].text='';
		m = 1;
	}
	else if (have_empty == "yes_empty")
	{
		relation_fild.add(document.createElement("OPTION"));
		relation_fild.options[0].value='';
		relation_fild.options[0].text='';
		m = 1;
	}
	else
	{
		m = 0;
	}

	var source = document.XMLDocument;
	var mark = this_xml+'/Bank_charge_'+this_fild.value;
	var v=source.selectNodes(mark);
	//var t=v.nextNode(); wangjj update 20030331
	for (var t = v.nextNode(); t != null; t = v.nextNode())//wangjj add 20030331
    {        		
		if (t)
		{
			var rel_mark_value = mark+'/option/value';
			var rel_mark_text = mark+'/option/caption';
			var rel_mark_default = mark+'/selected';
    	
			var rel_v_value=source.selectNodes(rel_mark_value);
			var rel_v_text=source.selectNodes(rel_mark_text);
			var rel_v_default=source.selectNodes(rel_mark_default);
			var t_default=rel_v_default.nextNode();
			
			if (t_default)
			{
				var rel_default = t_default.text;
			}
			else
			{
				var rel_default = "";
			}
    	
			for(var t_value=rel_v_value.nextNode();t_value;t_value=rel_v_value.nextNode())
			{
				var t_text=rel_v_text.nextNode();
    	
				if (t_text)
				{
					if (t_text.text != null && t_value.text != null)
					{
						relation_fild.add(document.createElement("OPTION"));
						relation_fild.options[m].value=t_value.text;
						relation_fild.options[m].text=t_text.text;
    	
						if (t_value.text == rel_default)
						{
							relation_fild.options[m].selected = true;
						}
						m=m+1;
					}
				}
			}
		}
	}
	
	if (have_empty == "end")
	{
		relation_fild.add(document.createElement("OPTION"));
		relation_fild.options[m].value='-200';
		relation_fild.options[m].text='';
		m=m+1;
	}
	else if (have_empty == "end_empty")
	{
		relation_fild.add(document.createElement("OPTION"));
		relation_fild.options[m].value='';
		relation_fild.options[m].text='';
		m=m+1;
	}
	
	return;
}
*/
/**
 * <p>Description: �����û����룬ȷ�������б����ʾ����</p>
 * @author zhouty
 * @date 20030812
**/
//����û�����			Ӧ�ÿ�����չtoString
function nas_find_xml_value(the_xml,the_field,to_clean)
{
	var exist_yes = false;
	
	var select_value = the_field.value;
	
	if (select_value != "" && select_value != null)
	{
		//����Ƿ��и�ֵ���ڣ�
		var the_source = document.XMLDocument;	
		//ֱ��ȥ��
		var the_mark = the_xml + "/option/value";
		var the_node =the_source.selectNodes(the_mark);
		var the_info;
		for (the_info = the_node.nextNode(); the_info != null; the_info = the_node.nextNode())
	    {	if (the_info.text == select_value)
			{
				exist_yes = true;
				break;
			}
		}
	}
	
	//�������ֵ������
	if (exist_yes != true && to_clean == "yes")
	{
		if (the_field.selectedIndex == -1 && the_field.length > 0)
		{
			the_field.selectedIndex = 0;
		}
		
		if (the_field.selectedIndex != -1)
		{
			the_field.options[the_field.selectedIndex].text = "";
		}
		the_field.value = "";
	}
	
	return exist_yes;
	
}
//��׽���ⰴ��������
function nas_catch_keydown(the_event,the_field,the_xml)
{
	switch(the_event.keyCode)
	{
		case 13:	//Enter;
			//���ֵ
			nas_find_xml_value(the_xml,the_field,"yes");
			
			nas_enter_jump(the_event,the_field);	
			//the_field.options[the_field.length] = new Option("","",false,true);
			the_event.returnValue = false;			
			break;
		case 32:	//Space;
			
			if (the_field.selectedIndex == -1 && the_field.length > 0)
			{
				the_field.selectedIndex = 0;
			}
			var query_value = the_field.options[the_field.selectedIndex].text;
			if (query_value != "")
			{
				nas_relation_build_comm(the_field,the_xml,"yes_empty",query_value);//������Ĭ�Ͽյ�
			}
			else
			{
				nas_relation_build_comm(the_field,the_xml,"","");//ȡ���е��������� add wangjunjie 20030905
			}
			the_event.returnValue = false;
			break;
		case 27:	//Esc;
			the_event.returnValue = false;
			break;
		case 46:	//Delete;
			//if(confirm("ɾ����ǰѡ��!?"))
			//{
			//	the_field.options[the_field.selectedIndex] = null;
			//	if(the_field.length>0)
			//	{
			//		the_field.options[0].selected = true;
			//	}
			//}
			the_event.returnValue = false;
			break;
		case 8:		//Back Space;
			if (the_field.selectedIndex == -1 && the_field.length > 0)
			{
				the_field.selectedIndex = 0;
			}
			if (the_field.selectedIndex != -1)
			{
				if (the_field.options[the_field.selectedIndex].value == "-200" || the_field.options[the_field.selectedIndex].value == "" || the_field.options[the_field.selectedIndex].value == null)
				{
					var s = the_field.options[the_field.selectedIndex].text;
					the_field.options[the_field.selectedIndex].text = s.substr(0,s.length-1);
				}
			}
			the_event.returnValue = false;
			break;
	}
	
}
//��׽�����¼�����Ӧ�û����������ϵ�����
function nas_catch_press(the_event,the_field)
{
	if (typeof(the_field)!='undefined')
	{
		if (the_field.selectedIndex == -1 && the_field.length > 0)
		{
			the_field.selectedIndex = 0;
		}
		
		if (the_field.selectedIndex != -1)
		{
			if (the_field.options[the_field.selectedIndex].value == "-200" || the_field.options[the_field.selectedIndex].value == "" || the_field.options[the_field.selectedIndex].value == null)
			{
				the_field.options[the_field.selectedIndex].text = the_field.options[the_field.selectedIndex].text + String.fromCharCode(the_event.keyCode);
				//the_field.options[the_field.selectedIndex].value = the_field.options[the_field.selectedIndex].text ;
			}
		}
		the_event.returnValue = false;
	}
	
	return;	
}


////////////////////old:
/*function nas_relation_build(this_fild,relation_fild,this_xml,have_empty)
{
	relation_fild.length = 0;
	if (have_empty == "yes")
	{
		relation_fild.add(document.createElement("OPTION"));
		relation_fild.options[0].value='-200';
		relation_fild.options[0].text='';
		var m = 1;
	}
	else
	{
		var m = 0;
	}

	var source = document.XMLDocument;
	var mark = this_xml+'/value';
	var v=source.selectNodes(mark);

	for(var t=v.nextNode();t;t=v.nextNode())
	{

		if (this_fild.value == t.text)
		{
			var rel_mark_value = this_xml + '/relation_' +t.text+'/option/value';
			var rel_mark_text = this_xml + '/relation_' +t.text+'/option/caption';
			var rel_mark_default = this_xml + '/relation_' +t.text+'/selected';

			var rel_v_value=source.selectNodes(rel_mark_value);
			var rel_v_text=source.selectNodes(rel_mark_text);
			var rel_v_default=source.selectNodes(rel_mark_default);
			var t_default=rel_v_default.nextNode();
			if (t_default)
			{
				var rel_default = t_default.text;
			}
			else
			{
				var rel_default = "";
			}

			for(var t_value=rel_v_value.nextNode();t_value;t_value=rel_v_value.nextNode())
			{
				var t_text=rel_v_text.nextNode();

				if (t_text)
				{
					if (t_text.text != null && t_value.text != null)
					{
						relation_fild.add(document.createElement("OPTION"));
						relation_fild.options[m].value=t_value.text;
						relation_fild.options[m].text=t_text.text;

						if (t_value.text == rel_default)
						{
							relation_fild.options[m].selected = true;
						}
						m=m+1;
					}
				}
			}
		}
	}
}
*/
