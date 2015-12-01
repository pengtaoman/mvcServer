/**
 * <p>Name: nas_generate_items_hidden.js</p>
 * <p>Description: �Ӳ�Ʒ��Ŀ��Ϣ���ɺ���--------------����һ֡����һ֡��ֵ</p>
 * <p>AppArea: Ӫҵϵͳ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/
//alert('nas_generate_items_hidden.js���óɹ�');
//item_xml: ���Ӳ�Ʒ��Ŀ��Ϣ��·�����磺 root/Create/SubProduct_9/


///////////////////////////////////////
//ȡ�ñ��ε�ҵ������
comm_source = document.XMLDocument;
var svc_node=comm_source.selectNodes("root/Create/ServiceKind");
var svc_info = svc_node.nextNode();
var svc_name = "";
if(svc_info)
{	svc_name = svc_info.text;}

//֧����ϲ�Ʒ����ȡ����֡�����
if (typeof(window.parent.frames[1].base_package_name)!='undefined')
{
	base_package_name = new Array();
	base_package_name = window.parent.frames[1].base_package_name;
	
	var package_svc_kind="";
	var old_group_name="";
	for (var old_i=0;old_i<base_package_name.length;old_i++)
	{	
		package_svc_kind="";
		old_group_name="";
		old_group_name = base_package_name[old_i];
		
		//�Ѻͱ���ҵ��������ͬ���޳�
		if (old_group_name!="")
		{
			package_svc_kind = old_group_name.substring(6,7);
			
			if (package_svc_kind == "1")
			{
				package_svc_kind = old_group_name.substring(6,8);
			}
			if (package_svc_kind == svc_name)
			{
				base_package_name[old_i]="";//���
			}
		}		
	}
}
else
{
	base_package_name = new Array();
}

/*
if (eval("typeof(window.parent.frames[1].group_count_"+svc_name+")!='undefined'"))
{
	eval("group_count_"+svc_name+" = window.parent.frames[1].group_count_"+svc_name+"");
}
else
{
	eval("group_count_"+svc_name+" = -1");
}
if (eval("typeof(window.parent.frames[1].subproduct_"+svc_name+")!='undefined'"))
{
	eval("subproduct_"+svc_name+" = window.parent.frames[1].subproduct_"+svc_name+"");
}
else
{
	eval("subproduct_"+svc_name+" = -1");
}

if (eval("typeof(window.parent.frames[1].mutex_arr_"+svc_name+")!='undefined'"))
{
	eval("mutex_arr_"+svc_name+" = new Array()");
	eval("mutex_arr_"+svc_name+" = window.parent.frames[1].mutex_arr_"+svc_name+"");
}
else
{
	eval("mutex_arr_"+svc_name+" = new Array()");
}
if (eval("typeof(window.parent.frames[1].rel_arr_"+svc_name+")!='undefined'"))
{
	eval("rel_arr_"+svc_name+" = new Array()");
	eval("rel_arr_"+svc_name+" = window.parent.frames[1].rel_arr_"+svc_name+"");
}
else
{
	eval("rel_arr_"+svc_name+" = new Array()");
}
*/

//�������ȡ��֡������ֱ���滻��Ӧҵ���
eval("group_count_"+svc_name+" = -1");
eval("subproduct_"+svc_name+" = -1");
eval("mutex_arr_"+svc_name+" = new Array()");
eval("rel_arr_"+svc_name+" = new Array()");

//group_count_8 = -1;//һ���ж��ٸ�����
//group_count_9 = -1;//һ���ж��ٸ�����
//group_count_15 = -1;//һ���ж��ٸ�����

    
//////////////////////
//��ֱ��д��Ҫ������һ֡�ĺ���
//�������ӣ� nas_generate_items_hidden("root/Create/SubProduct_9/","9",div_name)
function nas_generate_items_hidden(item_xml,svc_kind,div_name,dis_kind)
{
	var subp_node=comm_source.selectNodes(item_xml+"id");
	var subp_info = subp_node.nextNode();
	var subp_id = "";	//��ǰ�Ӳ�Ʒ��ID
	if(subp_info)
	{	subp_id = subp_info.text;}
	eval("subproduct_"+svc_kind+" = subp_id");	
	
	
	
	var package_mark;//alert(package_mark);
	var show_info="";
	show_info += "<table width = '620px' border='2' cellpadding='1' cellspacing='2' bordercolor='#E6E6E6' bgcolor='#FFFFFF'>";
	
	//���ɻ�����
	package_mark = item_xml + "base_package/group";
	show_info += "<tr class='trType' align='center'><td width='100%' bordercolor='#E6E6E6' bgcolor='#E6E6E6' colspan='5'><p align='center'>������</p></td></tr>";
	show_info += generate_str(package_mark,svc_kind,subp_id,"base");

	//���ɹ��ܰ�
	package_mark = item_xml + "extend_package/group";
	show_info += "<tr class='trType' align='center'><td width='100%' bordercolor='#E6E6E6' bgcolor='#E6E6E6' colspan='5'><p align='center'>���ܰ�</p></td></tr>";
	show_info += generate_str(package_mark,svc_kind,subp_id,"extend");

	//����
	show_info += "</table>";
	
	//alert(show_info);
	//document.write(show_info);//��ֱ��д������һ֡��
	
	
	//ȷ����
	if (div_name!="")
	{
		var div_obj = eval("window.parent.frames[1]."+div_name);
	}
	else
	{
		var div_obj = window.parent.frames[1].item_div;
	}
	
	var v = 'show';
	
	//alert(div_obj);
	if (div_obj.style)
	{
		//alert(div_obj.style);
		var obj=div_obj.style;
		v=(v=='show')?'visible':(v='hide')?'hidden':v;
	}		
	obj.visibility=v;
	obj.position='relative';
	
	div_obj.innerHTML=show_info;
	
	//window.parent.frames[1].fee_current();
	//window.parent.frames[1].mutex_arr = mutex_arr;

	//alert(window.parent.frames[1].nihao);
	
	//��Ԥ�㡢�ύ������¼���Ҫ��ȫ�ֱ�����ֵ����һ֡��ȫ�ֱ�����
	eval("window.parent.frames[1].base_package_name = base_package_name");
    
    //alert(eval("window.parent.frames[1].group_count_"+svc_kind+""));
    //alert(eval("group_count_"+svc_kind+""));
    
	eval("window.parent.frames[1].group_count_"+svc_kind+" = group_count_"+svc_kind+"");
	eval("window.parent.frames[1].subproduct_"+svc_kind+" = subproduct_"+svc_kind+"");
	eval("window.parent.frames[1].mutex_arr_"+svc_kind+" = mutex_arr_"+svc_kind+"");
	eval("window.parent.frames[1].rel_arr_"+svc_kind+" = rel_arr_"+svc_kind+"");
	
	
	//alert(rel_arr_9[10039]);
	
	//ִ����Ŀ��Ϣ��ҳ�����Ե����ã�
	if (svc_kind == "9")
	{
		var svc_head="G";
	}
	if (svc_kind == "8")
	{
		var svc_head="C";
	}
	if (svc_kind == "15")
	{
		var svc_head="Cdma1X";
	}
	
	//alert("sss");
	nas_items_set_value_hidden("root/Create/SubProduct_"+svc_kind+"/",svc_head);
	
	if (typeof(window.parent.frames[1].document.forms[0].BBudget)!='undefined')
		window.parent.frames[1].document.forms[0].BBudget.disabled = false;
	if (typeof(window.parent.frames[1].document.forms[0].BSubmit)!='undefined')
		window.parent.frames[1].document.forms[0].BSubmit.disabled = false;
	if (typeof(window.parent.frames[1].document.forms[0].BFprint)!='undefined')
		window.parent.frames[1].document.forms[0].BFprint.disabled = false;
	
	if (dis_kind == "0")//�Ӳ�Ʒ�仯ʱ���û�����
	{
		if (svc_kind == "9")
		{
			if (typeof(window.parent.frames[1].document.forms[0].GBusSolutionId)!='undefined')
			{
				window.parent.frames[1].document.forms[0].GBusSolutionId.disabled = false;
				//window.parent.frames[1].document.forms[0].GBusSolutionId.readOnly = false;
			}
			if (typeof(window.parent.frames[1].document.forms[0].GProductId)!='undefined')
			{
				window.parent.frames[1].document.forms[0].GProductId.disabled = false;
				//window.parent.frames[1].document.forms[0].GProductId.readOnly = false;
			}
			if (typeof(window.parent.frames[1].document.forms[0].GSubProduct)!='undefined')
			{
				window.parent.frames[1].document.forms[0].GSubProduct.disabled = false;
				//window.parent.frames[1].document.forms[0].GSubProduct.readOnly = false;
			}
			if (typeof(window.parent.frames[1].document.forms[0].GServiceId)!='undefined')
			{
				window.parent.frames[1].document.forms[0].GServiceId.disabled = false;
				window.parent.frames[1].document.forms[0].GServiceId.readOnly = false;
			}
			if (typeof(window.parent.frames[1].document.forms[0].GSimCard)!='undefined')
			{
				window.parent.frames[1].document.forms[0].GSimCard.disabled = false;
				window.parent.frames[1].document.forms[0].GSimCard.readOnly = false;
			}
		}
		if (svc_kind == "8")
		{
			if (typeof(window.parent.frames[1].document.forms[0].CBusSolutionId)!='undefined')
			{
				window.parent.frames[1].document.forms[0].CBusSolutionId.disabled = false;
				//window.parent.frames[1].document.forms[0].CBusSolutionId.readOnly = false;
			}
			if (typeof(window.parent.frames[1].document.forms[0].CProductId)!='undefined')
			{
				window.parent.frames[1].document.forms[0].CProductId.disabled = false;
				//window.parent.frames[1].document.forms[0].CProductId.readOnly = false;
			}
			if (typeof(window.parent.frames[1].document.forms[0].CSubProduct)!='undefined')
			{
				window.parent.frames[1].document.forms[0].CSubProduct.disabled = false;
				//window.parent.frames[1].document.forms[0].CSubProduct.readOnly = false;
			}
			if (typeof(window.parent.frames[1].document.forms[0].CServiceId)!='undefined')
			{
				window.parent.frames[1].document.forms[0].CServiceId.disabled = false;
				window.parent.frames[1].document.forms[0].CServiceId.readOnly = false;
			}
			if (typeof(window.parent.frames[1].document.forms[0].CUimCard)!='undefined')
			{
				window.parent.frames[1].document.forms[0].CUimCard.disabled = false;
				window.parent.frames[1].document.forms[0].CUimCard.readOnly = false;
			}
		}
		if (svc_kind == "15")
		{
			if (typeof(window.parent.frames[1].document.forms[0].Cdma1XProductId)!='undefined')
			{
				window.parent.frames[1].document.forms[0].Cdma1XProductId.disabled = false;
				//window.parent.frames[1].document.forms[0].Cdma1XProductId.readOnly = false;
			}
			if (typeof(window.parent.frames[1].document.forms[0].Cdma1XSubProduct)!='undefined')
			{
				window.parent.frames[1].document.forms[0].Cdma1XSubProduct.disabled = false;
				//window.parent.frames[1].document.forms[0].Cdma1XSubProduct.readOnly = false;
			}
		}
	}
	else if (dis_kind == "1")//���������û����ͣ����������ѡ���ˣ����Ʒ���Ӳ�Ʒ���ûҲ��ûָ� (ֻ��8��9�ģ�û��15��)
	{
		if (svc_kind == "9")
		{
			if (typeof(window.parent.frames[1].document.forms[0].GBusSolutionId)!='undefined')
			{
				window.parent.frames[1].document.forms[0].GBusSolutionId.disabled = false;
				//window.parent.frames[1].document.forms[0].GBusSolutionId.readOnly = false;
			}
			if (typeof(window.parent.frames[1].document.forms[0].GServiceId)!='undefined')
			{
				window.parent.frames[1].document.forms[0].GServiceId.disabled = false;
				window.parent.frames[1].document.forms[0].GServiceId.readOnly = false;
			}
			if (typeof(window.parent.frames[1].document.forms[0].GSimCard)!='undefined')
			{
				window.parent.frames[1].document.forms[0].GSimCard.disabled = false;
				window.parent.frames[1].document.forms[0].GSimCard.readOnly = false;
			}
		}
		if (svc_kind == "8")
		{
			if (typeof(window.parent.frames[1].document.forms[0].CBusSolutionId)!='undefined')
			{
				window.parent.frames[1].document.forms[0].CBusSolutionId.disabled = false;
				//window.parent.frames[1].document.forms[0].CBusSolutionId.readOnly = false;
			}
			if (typeof(window.parent.frames[1].document.forms[0].CServiceId)!='undefined')
			{
				window.parent.frames[1].document.forms[0].CServiceId.disabled = false;
				window.parent.frames[1].document.forms[0].CServiceId.readOnly = false;
			}
			if (typeof(window.parent.frames[1].document.forms[0].CUimCard)!='undefined')
			{
				window.parent.frames[1].document.forms[0].CUimCard.disabled = false;
				window.parent.frames[1].document.forms[0].CUimCard.readOnly = false;
			}
		}
	}


	//����Ҫ������֡���ɵĶ�������ѡ����Ӳ�Ʒ����Ŀ��Ϣ��û�б�Ҫ��¼
	//������֯ԭʼ��
	/*if (typeof(window.parent.frames[1].document.forms[0].OldItemStr)!='undefined')
	{
		window.parent.frames[1].document.forms[0].OldItemStr.value = window.parent.frames[1].crm_uni_budget_str();
	}*/
	
	return;
}

//ѭ�����ɸ�����
function generate_str(package_mark,svc_kind,subp_id,pachage_kind)
{
	//ÿ��groupѭ��
	var package_node = comm_source.selectNodes(package_mark);
	var package_info;
	var the_groups;
	var the_color;
	var base_i;
	
	var the_obj;
	
	var return_info="";	
	for (package_info=package_node.nextNode();package_info;package_info=package_node.nextNode())
	{
		eval("group_count_"+svc_kind+"++");//�ۼ���ı��
		the_groups = eval("group_count_"+svc_kind);//ȡ������
		
		//������ɫ
		if (the_groups%2 == 0)//ż����
		{
			the_color = "#A2BEE1";
		}
		else
		{
			the_color = "#E6E6E6";
		}
		
		//�������������ּ�¼�����飬��Ԥ����ύǰ����У����
		if (pachage_kind == "base")
		{
			base_i = base_package_name.length;
			base_package_name[base_i] = "group_"+svc_kind+"_"+the_groups;
		}
		
		var max_select = package_info.selectNodes("max_select").nextNode.text;//ȡ���ֵ�������1�����ǵ�ѡ��
		var input_type = "checkbox";
		if (max_select == 1)
		{
			input_type = "radio";
		}
		
		
		//ȡ������
		var group_name_info="";
		if (package_info.selectNodes("group_name").nextNode)
		{
			group_name_info = package_info.selectNodes("group_name").nextNode.text;//ȡÿ�����������
		}
		
		var item_node = package_info.selectNodes("item");
		var item_info;

		var item_id;
		var item_name;
		var item_default;
		var item_rela_str;
		var item_mutex_str;
		var item_remark;
		var checked_type = "";
		
		var start_row_col = "";
		var group_name_col = "";
		var first_row_col = "";
		var normal_row_col = "";
		
		
		//��Group���Itemѭ��
		var i = 0;
		for (item_info=item_node.nextNode();item_info;item_info=item_node.nextNode())
		{
			if (item_info)
			{
				item_id = item_info.selectNodes("id").nextNode.text;
				item_name = item_info.selectNodes("name").nextNode.text;
				item_default = item_info.selectNodes("if_default").nextNode.text;
				item_rela_str = item_info.selectNodes("relation_str").nextNode.text;
				item_mutex_str = item_info.selectNodes("mutex_str").nextNode.text;
				item_remark = item_info.selectNodes("f_remark").nextNode.text;

				if (item_default == "1")
				{
					checked_type = "checked='true'";
				}
				else
				{
					checked_type = "";
				}
				
				if (item_id!="" && item_name!="")
				{
					i++;
					
					//ÿ����ĵ�һ�е���ʾ��������ͬ��Ҫ���ӿ����л���ʾ���������------���Ե�һ�е�һ��Ҫ���⴦��
					if (i==1)
					{
						start_row_col += "<tr class='newtrType'>";
						
						first_row_col += "<td width='138px' bordercolor='"+the_color+"' bgcolor='"+the_color+"' height='0'>";
						first_row_col += "<input type='"+input_type+"' name='group_"+svc_kind+"_"+the_groups+"' value='"+item_id+ "' "+checked_type+" onclick='crm_budget_again();nas_item_click(this,\""+svc_kind+"\")'/><SPAN TITLE=\""+item_remark+"\">"+item_name+"</SPAN>";
						first_row_col += "</td>";
					}
					else//
					{
						//alert(i%4);
						//1:����4�����һ��
						//2:��1:��һ��
						if (i%4 == 1)
						{
							normal_row_col += "<tr class='newtrType'><td width='138px' bordercolor='"+the_color+"' bgcolor='"+the_color+"' height='0'>";
							normal_row_col += "<input type='"+input_type+"' name='group_"+svc_kind+"_"+the_groups+"' value='"+item_id+ "' "+checked_type+" onclick='crm_budget_again();nas_item_click(this,\""+svc_kind+"\")'/><SPAN TITLE=\""+item_remark+"\">"+item_name+"</SPAN>";
							normal_row_col += "</td>";
						}
						else if (i%4 == 0)
						{
							normal_row_col += "<td width='138px' bordercolor='"+the_color+"' bgcolor='"+the_color+"' height='0'>";
							normal_row_col += "<input type='"+input_type+"' name='group_"+svc_kind+"_"+the_groups+"' value='"+item_id+ "' "+checked_type+" onclick='crm_budget_again();nas_item_click(this,\""+svc_kind+"\")'/><SPAN TITLE=\""+item_remark+"\">"+item_name+"</SPAN>";
							normal_row_col += "</td></tr>";
						}
						else
						{
							normal_row_col += "<td width='138px' bordercolor='"+the_color+"' bgcolor='"+the_color+"' height='0'>";
							normal_row_col += "<input type='"+input_type+"' name='group_"+svc_kind+"_"+the_groups+"' value='"+item_id+ "' "+checked_type+" onclick='crm_budget_again();nas_item_click(this,\""+svc_kind+"\")'/><SPAN TITLE=\""+item_remark+"\">"+item_name+"</SPAN>";
							normal_row_col += "</td>";
						}
					}
				}
				
				//the_obj = eval("rel_arr_"+svc_kind+"["+parseInt(item_id*1)+"]");				
				the_obj = eval("rel_arr_"+svc_kind);
				the_obj[parseInt(item_id*1)] = item_rela_str?item_rela_str:"";
				
				//alert(the_obj);
				//alert(the_obj.length);
				
				the_obj = eval("mutex_arr_"+svc_kind);
				the_obj[parseInt(item_id*1)] = item_mutex_str?item_mutex_str:"";
				
				//alert(the_obj[parseInt(item_id*1)]);
				
				//the_obj = item_rela_str?item_rela_str:"";				
				//the_obj = eval("mutex_arr_"+svc_kind+"["+parseInt(item_id*1)+"]");
				//the_obj = item_mutex_str?item_mutex_str:"";
				//eval("mutex_arr_"+svc_kind+"["+parseInt(item_id*1)+"]="+item_mutex_str+"?"+item_mutex_str+":''");
				
			}
		}
		//������Ŀѭ����ɣ�����һ���ж����У����е���������Ҫ�������
		var row_count = (i/4);
		var span_count = Math.ceil(i/4);
		//alert(i+"--"+row_count+"--"+span_count);
		if (row_count <= 1)
		{
			group_name_col = "<td width='68px' bordercolor='"+the_color+"' bgcolor='"+the_color+"' height='0'>"+group_name_info+"</td>";
		}
		else
		{
			group_name_col = "<td width='68px' bordercolor='"+the_color+"' bgcolor='"+the_color+"' height='0' rowspan='"+span_count+"'>"+group_name_info+"</td>";
		}
		
		//�ϳ���ʾ��Ϣ: ��һ������Ϣ + ������ + ��һ�е�һ����Ϣ + ������Ŀ��Ϣ
		return_info += start_row_col + group_name_col + first_row_col + normal_row_col;
		
		
		
		//������������
		//alert(i);
		if (i%4 == 1)
		{
			//alert(i+'׷��3��');
			return_info += "<td width='138px' bordercolor='"+the_color+"' bgcolor='"+the_color+"' height='0'></td>";
			return_info += "<td width='138px' bordercolor='"+the_color+"' bgcolor='"+the_color+"' height='0'></td>";
			return_info += "<td width='138px' bordercolor='"+the_color+"' bgcolor='"+the_color+"' height='0'></td>";
			return_info += "</tr>";
		}
		else if (i%4 == 2)
		{
			//alert(i+'׷��2��');
			return_info += "<td width='138px' bordercolor='"+the_color+"' bgcolor='"+the_color+"' height='0'></td>";
			return_info += "<td width='138px' bordercolor='"+the_color+"' bgcolor='"+the_color+"' height='0'></td>";
			return_info += "</tr>";
		}
		else if (i%4 == 3)
		{
			//alert(i+'׷��1��');
			return_info += "<td width='138px' bordercolor='"+the_color+"' bgcolor='"+the_color+"' height='0'></td>";
			return_info += "</tr>";
		}
		else
		{}

	}

	return return_info;
}



