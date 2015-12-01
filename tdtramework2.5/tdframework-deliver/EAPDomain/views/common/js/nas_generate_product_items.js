/**
 * <p>Name: nas_generate_product_items.js</p>
 * <p>Description: �Ӳ�Ʒ��Ŀ��Ϣ���ɺ���</p>
 * <p>AppArea: Ӫҵϵͳ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/
//alert('nas_generate_product_items.js���óɹ�');

//item_xml: ���Ӳ�Ʒ��Ŀ��Ϣ��·�����磺 root/Create/SubProduct_9/

base_package_name = new Array();

comm_source = document.XMLDocument;
//ȡ�ñ����м���ҵ������
var svc_node=comm_source.selectNodes("root/Create/ServiceKindStr");
var svc_info = svc_node.nextNode();
var svc_str = "";					
if(svc_info)
{	svc_str = svc_info.text;}

svc_arr = svc_str.split('~');
var svc_i=0;
for (svc_i=0;svc_i<svc_arr.length;svc_i++)
{
	eval("group_count_"+svc_arr[svc_i]+" = -1");
	eval("subproduct_"+svc_arr[svc_i]+" = -1");
	//group_count_8 = -1;//һ���ж��ٸ�����
	//group_count_9 = -1;//һ���ж��ٸ�����
	//group_count_15 = -1;//һ���ж��ٸ�����
	
	eval("mutex_arr_"+svc_arr[svc_i]+" = new Array()");
	eval("rel_arr_"+svc_arr[svc_i]+" = new Array()");
	
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
						first_row_col += "<input type='"+input_type+"' name='group_"+svc_kind+"_"+the_groups+"' value='"+item_id+ "' "+checked_type+" onclick='crm_budget_again();nas_item_click(this,\""+svc_kind+"\")' onMouseMove=\"\" onMouseOut=\"\" /><SPAN TITLE=\""+item_remark+"\">"+item_name+"</SPAN>";
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
							normal_row_col += "<input type='"+input_type+"' name='group_"+svc_kind+"_"+the_groups+"' value='"+item_id+ "' "+checked_type+" onclick='crm_budget_again();nas_item_click(this,\""+svc_kind+"\")' onMouseMove=\"\" onMouseOut=\"\" /><SPAN TITLE=\""+item_remark+"\">"+item_name+"</SPAN>";
							normal_row_col += "</td>";
						}
						else if (i%4 == 0)
						{
							normal_row_col += "<td width='138px' bordercolor='"+the_color+"' bgcolor='"+the_color+"' height='0'>";
							normal_row_col += "<input type='"+input_type+"' name='group_"+svc_kind+"_"+the_groups+"' value='"+item_id+ "' "+checked_type+" onclick='crm_budget_again();nas_item_click(this,\""+svc_kind+"\")' onMouseMove=\"\" onMouseOut=\"\" /><SPAN TITLE=\""+item_remark+"\">"+item_name+"</SPAN>";
							normal_row_col += "</td></tr>";
						}
						else
						{
							normal_row_col += "<td width='138px' bordercolor='"+the_color+"' bgcolor='"+the_color+"' height='0'>";
							normal_row_col += "<input type='"+input_type+"' name='group_"+svc_kind+"_"+the_groups+"' value='"+item_id+ "' "+checked_type+" onclick='crm_budget_again();nas_item_click(this,\""+svc_kind+"\")' onMouseMove=\"\" onMouseOut=\"\" /><SPAN TITLE=\""+item_remark+"\">"+item_name+"</SPAN>";
							normal_row_col += "</td>";
						}
					}
				}
				//rel_arr[parseInt(item_id*1)] = item_rela_str?item_rela_str:"";
				//mutex_arr[parseInt(item_id*1)] = item_mutex_str?item_mutex_str:"";
				
				the_obj = eval("rel_arr_"+svc_kind);
				the_obj[parseInt(item_id*1)] = item_rela_str?item_rela_str:"";
				
				the_obj = eval("mutex_arr_"+svc_kind);
				the_obj[parseInt(item_id*1)] = item_mutex_str?item_mutex_str:"";
				
				
				//alert(rel_arr[parseInt(item_id*1)]);
				//alert(mutex_arr[parseInt(item_id*1)]);
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
		if (i%4 == 1)
		{
			return_info += "<td width='138px' bordercolor='"+the_color+"' bgcolor='"+the_color+"' height='0'></td>";
			return_info += "<td width='138px' bordercolor='"+the_color+"' bgcolor='"+the_color+"' height='0'></td>";
			return_info += "<td width='138px' bordercolor='"+the_color+"' bgcolor='"+the_color+"' height='0'></td>";
			return_info += "</tr>";
		}
		else if (i%4 == 2)
		{
			return_info += "<td width='138px' bordercolor='"+the_color+"' bgcolor='"+the_color+"' height='0'></td>";
			return_info += "<td width='138px' bordercolor='"+the_color+"' bgcolor='"+the_color+"' height='0'></td>";
			return_info += "</tr>";
		}
		else if (i%4 == 3)
		{
			return_info += "<td width='138px' bordercolor='"+the_color+"' bgcolor='"+the_color+"' height='0'></td>";
			return_info += "</tr>";
		}
		else
		{}

	}

	return return_info;
}
function nas_generate_product_items(item_xml,svc_kind)
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
	document.write(show_info);
	
	
	//������֯ԭʼ��������ҵ������ONLOAD�¼���������Ҳ����ؼ�
	/*if (typeof(document.forms[0].OldItemStr)!='undefined')
	{
		document.forms[0].OldItemStr.value = crm_uni_budget_str();
	}*/
	
	return;
	
}

//��ֱ����document.write��ʹ�ò��innerHTML
function nas_generate_product_items_indiv(item_xml,svc_kind,div_name)
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
	//document.write(show_info);//�ĳ���������
	
	//ȷ����
	var div_obj = eval(div_name);	
	var v = 'show';	
	//alert(div_obj);
	/*if (div_obj.style)
	{
		//alert(div_obj.style);
		var obj=div_obj.style;
		v=(v=='show')?'visible':(v='hide')?'hidden':v;
	}		
	obj.visibility=v;
	obj.position='relative';*/
	
	div_obj.innerHTML=show_info;
	
	
	//������֯ԭʼ��������ҵ������ONLOAD�¼���������Ҳ����ؼ�
	/*if (typeof(document.forms[0].OldItemStr)!='undefined')
	{
		document.forms[0].OldItemStr.value = crm_uni_budget_str();
	}*/
	
	return;
	
}


//onclick�¼������Ļ������
function nas_item_click(this_fild,svc_kind)
{
	//alert("halelo");
	
	//alert(this_fild);
	
	if (this_fild.checked==true)
	{
	
		var this_fild_value = this_fild.value;
		
		//var rela_str = rel_arr[this_fild_value];
		//var mutex_str = mutex_arr[this_fild_value];			
		
		var rela_str = eval("rel_arr_"+svc_kind+"["+this_fild_value+"]");
		var mutex_str = eval("mutex_arr_"+svc_kind+"["+this_fild_value+"]");
		
		
		var this_rela_arr = rela_str.split('~');
		var this_mutex_arr = mutex_str.split('~');
		
		//alert('hello');
		
		//alert(rela_str);//alert(mutex_str);//alert(groups);
		var groups = eval("group_count_"+svc_kind);//ȡ������
		var k=0;//���������
		var items=0;
		var i=0;//���ҵ��飻
		var j=0;//�����е���Ŀ��
		var obj_item;
		
		//alert("in");
		
		//������������
		for (k=0;k<this_rela_arr.length;k++)
		{
			for (i=0;i<=groups;i++)
			{
				obj_item = eval("document.forms[0].group_"+svc_kind+"_"+i);
				items = obj_item.length;//alert(items);
				for (j=0;j<items;j++)
				{
					if(obj_item[j].value==this_rela_arr[k])//��ÿؼ���VALUE�봮�е�һ�£�����λ
					{
						obj_item[j].checked = true;
						break;//ID��Ψһ�ģ��ҵ������˳���
					}
				}
			}
			
		}
		//�������ȡ��
		for (k=0;k<this_mutex_arr.length;k++)
		{
			for (i=0;i<=groups;i++)
			{
				obj_item = eval("document.forms[0].group_"+svc_kind+"_"+i);
				items = obj_item.length;//alert(items);
				for (j=0;j<items;j++)
				{
					if(obj_item[j].value==this_mutex_arr[k])//��ÿؼ���VALUE�봮�е�һ�£�����λ
					{
						obj_item[j].checked = false;
						break;//ID��Ψһ�ģ��ҵ������˳���
					}
				}
			}
		}
	}
	return;	
}



//��Ŀѡ�񴮵Ĵ���
function nas_item_str_selected(svc_kind,in_item_str)	//ѭ����ҵ�������µĸ�����(����ؼ�)�����ݴ�ȷ����ѡ����Щ��
{
	//alert(svc_kind);
	
	var in_item_arr = new Array();
	in_item_arr = in_item_str.split("`");
	var groups = eval("group_count_"+svc_kind);//ȡ�ø������µ����ţ���ı��Ҳ���Ǹ���Ŀؼ�������
	
	var k=0;//���������
	var items=0;
	var i=0;//���ҵ��飻
	var j=0;//�����е���Ŀ��
	var obj_item;
	
	for (i=0;i<=groups;i++)//��ҵ�������µ�������
	{
		obj_item = eval("document.forms[0].group_"+svc_kind+"_"+i);//ȡ������һ��
		items = obj_item.length;//alert(items);
		for (j=0;j<items;j++)//��i����еĸ�����Ŀ
		{
			for (k=0;k<in_item_arr.length;k++)//�����봮���бȽ�
			{
				if(obj_item[j].value==in_item_arr[k])//��ÿؼ���VALUE�봮�е�һ�£�����λ
				{
					obj_item[j].checked = true;
					break;//ID��Ψһ�ģ��ҵ������˳���
				}
			}
		}
	}
	
	return;	
}


