/**
 * <p>Name: nas_generate_xsl.js</p>
 * <p>Description: ��̬����XSL��Ϣ</p>
 * <p>AppArea: Ӫҵϵͳ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**///alert('nas_generate_xsl.js���óɹ�');
//�������������壺
var field_node;
var field_node_info;
var element_label_col;//��ǩռ������	��������
var element_label_name;//��ǩ��ʾ������	��������
var element_label_css;//��ǩ�����е���ʽ��	���Բ��䣬ȡ��Ӧ�е�Ĭ��ֵ;���Ͷ�Ӧ�е�Ĭ��ֵ��ͬʱ����Ҫ����
var element_label_type;//�Ƿ��Ƕ�̬span		ֻ���ڸ����Ƕ�̬spanʱ����
var element_label_span;//�Ƿ��Ǿ�̬span		ֻ���ڸ����Ǿ�̬spanʱ���ã���������ֵ����SPAN������
var element_field_col;//�ؼ�ռ������	��������
var element_field_css;//�ؼ������е���ʽ��	���Բ��䣬ȡ��Ӧ�е�Ĭ��ֵ;���Ͷ�Ӧ�е�Ĭ��ֵ��ͬʱ����Ҫ����
var element_field_space;//�����һ���������ö���ؼ����ؼ����Ѽ����ո�ָ��� Ŀǰֻ���ύ��ť��һ����Ҫ����
var element_field_name;//�ؼ�������������
var element_field_type;//�ؼ����ͣ� �����"text"���͵Ŀؼ����������ã��������ͱ�������
var element_field_class;//�ؼ��������ʽ�� ����Ǳ�׼��text�ؼ�ʹ�õ���ʽ��newtextType���׼��select������ʹ�õ�newdrawdownType��ʽ������Ҫ���ã�������Ӧ�����ã�����ͺ�text����һ������ʽ��
var element_field_maxlength;//text��password�������Կؼ�������������ֵ���������͵Ŀؼ���������
var element_field_value;//�ؼ���Ĭ�Ͼ�ֵ̬�� ����ÿؼ�Ӧ�ô�JSP��ȡ�����ݿ����ֵ����Ӧ���ã�
var element_field_value_select;//�ؼ��Ķ�ֵ̬�� Ӧ���ó���JSP�����ɵ�XML·����
var element_field_checked;//�ؼ��Ƿ��ʼѡ�У�ֻ�ڿؼ���checkbox��radio����ʱ�������ã�
var element_field_dis;//�ؼ��Ƿ����ûҵģ� ֻ���ڸÿؼ���Ҫ�ûһ�ֻ��ʱ����Ҫ���ã�
var element_field_action;//�ؼ��ĸ��¼�Ҫ���õķ����� ������Ҫ���ã�
var element_kind;//�Ƿ����ⲿ�ӿڣ����ÿؼ������Ƿ���һ���ⲿ��js���ɺ󷵻أ�Ŀǰֻ�и���ҵ����������ⲿ�ӿ�;
var element_external_info;//������ⲿ�ӿڣ����ڴ������ⲿ�ӿڵĺ�������

var element_label_col_text;
var element_label_name_text;
var element_label_css_text;
var element_label_type_text;
var element_label_span_text;
var element_field_col_text;
var element_field_css_text;
var element_field_space_text;
var element_field_name_text;
var element_field_type_text;
var element_field_class_text;
var element_field_maxlength_text;
var element_field_value_text;
var element_field_value_select_text;
var element_field_checked_text;
var element_field_dis_text;
var element_kind_text;
var element_external_info_text;
var element_span_name;
var element_span_name_text;
var element_span_kind;
var element_span_kind_text;
var act_name;
var act_function;
var act_name_temp;
var act_func_temp;
var element_info;
var action_node_info;
var allow_col;
var this_col;
var show_kind;

var width_unit = "per";							//���λ��per:�ٷֱȣ� 	�����Ĭ��һ�£�������(������������Ͳ�Ҫ����)
var row_css = "newtrType";						//�м���ʽ��
var column_default_num = "6";					//Ĭ����6�б��
var column_default_width = new Array();			//ÿ��ռ�İٷֱ�
column_default_width[0] = "13";
column_default_width[1] = "21";
column_default_width[2] = "12";
column_default_width[3] = "21";
column_default_width[4] = "12";
column_default_width[5] = "21";
var column_default_css = new Array();			//ÿ���е�Ĭ����ʽ��;
column_default_css[0] = "tdoddType";
column_default_css[1] = "tdevenType";
column_default_css[2] = "tdoddType";
column_default_css[3] = "tdevenType";
column_default_css[4] = "tdoddType";
column_default_css[5] = "tdevenType";
var table_css = "null";
var table_header = "<table width = \"620px\" border=\"2\" cellpadding=\"1\" cellspacing=\"2\" bordercolor=\"#E6E6E6\" bgcolor=\"#FFFFFF\">";
var select_class = "newdrawdownType";				//��׼�����б����ʽ

//��ʼ��
function init_comm_value()
{
	field_node = null;
	field_node_info = "null";

	element_label_col = null;
	element_label_name = null;
	element_label_css = null;
	element_label_type = null;
	element_label_span = null;
	element_field_col = null;
	element_field_css = null;
	element_field_space = null;
	element_kind = null;
	element_external_info = null;

	element_label_col_text = "0";
	element_label_name_text = "null";
	element_label_css_text = "tdoddType";		//label����ʽ���ɲ��䣬ֱ���ñ���Ӧ��Ĭ�ϵģ������ô˴�Ĭ�ϵ�
	element_label_type_text = "null";
	element_label_span_text = "null";
	element_field_col_text = "0";
	element_field_css_text = "tdevenType";		//field����ʽ���ɲ��䣬ֱ���ñ���Ӧ��Ĭ�ϵģ������ô˴�Ĭ�ϵ�
	element_field_space_text = "0";
	element_kind_text = "null";
	element_external_info_text = "null";

	element_info = "";
	action_node_info = "";

	allow_col = 0;
	this_col = 0;
	show_kind = "no_single_label";

	return;
}
//�������ʼ����
function init_span_value()
{
	element_span_name = null;
	element_span_kind = null;
	element_span_name_text = "null";
	element_span_kind_text = "null";
}
//ѭ���ؼ���ʼ��
function init_field_value()
{
	element_field_name = null;
	element_field_type = null;
	element_field_class = null;
	element_field_maxlength = null;
	element_field_value = null;
	element_field_value_select = null;
	element_field_checked = null;
	element_field_dis = null;
	element_field_action = null;
	act_name = null;
	act_function = null;

	element_field_name_text = "null";
	element_field_type_text = "text";			//Ĭ��field������text�ġ�
	element_field_class_text = "newtextType";	//��Ĭ�ϵ�text�ؼ���ȡ��׼��ʽ��
	element_field_maxlength_text = "null";
	element_field_value_text = "null";
	element_field_value_select_text = "null";
	element_field_checked_text = "";			//ֻ��checkbox�õ���Ĭ���ǲ�ѡ��
	element_field_dis_text = "no";				//�ؼ���disabled���ԣ�Ĭ���ǿ��õ�enable
	act_name_temp = "";
	act_func_temp = "";

	return;
}
//�������壺
function nas_generate_xsl(xml_info,div_name)
{
	var preserve = new Array();//����
	preserve[0] = "e";
	preserve[1] = "q";

	var source = document.XMLDocument;
	var node;
	var node_info;
	var k=0;
	var space_i = 0;
	var eval_func;
	var xsl_info = "";

	//��ʼ��
	//ȡ��table��ʾ���룻
	get_table_style(source,xml_info);
	xsl_info = table_header;
	xsl_info += nas_generate_hidden_info(source,xml_info);

	//���ɱ�׼Ԫ������
	//��ʼ��������
	var point_column = 0;
	//�����ؼ�������Ϣ
	var element_mark = xml_info + "/normal/element";
	node = source.selectNodes(element_mark)
	var j;
	for(node_info = node.nextNode(); node_info; node_info = node.nextNode())
	{
		//��ʼ��
		init_comm_value();
		//��ȡ������Ϣ
		if (element_label_col = node_info.selectNodes("element_label_col").nextNode)
		{	element_label_col_text = element_label_col.text;}
		if (element_label_name = node_info.selectNodes("element_label_name").nextNode)
		{	element_label_name_text = element_label_name.text;}
		if (element_label_css = node_info.selectNodes("element_label_css").nextNode)
		{	element_label_css_text = element_label_css.text;}
		if (element_label_type = node_info.selectNodes("element_label_type").nextNode)
		{	element_label_type_text = element_label_type.text;}
		if (element_label_span = node_info.selectNodes("element_label_span").nextNode)
		{	element_label_span_text = element_label_span.text;}
		if (element_field_col = node_info.selectNodes("element_field_col").nextNode)
		{	element_field_col_text = element_field_col.text;}
		if (element_field_css = node_info.selectNodes("element_field_css").nextNode)
		{	element_field_css_text = element_field_css.text;}
		if (element_field_space = node_info.selectNodes("element_field_space").nextNode)
		{	element_field_space_text = element_field_space.text;}
		if (element_kind = node_info.selectNodes("element_kind").nextNode)
		{	element_kind_text = element_kind.text;}
		if (element_external_info = node_info.selectNodes("element_external_info").nextNode)
		{	element_external_info_text = element_external_info.text;}

		this_col = parseInt(element_label_col_text) + parseInt(element_field_col_text);
		if (parseInt(element_label_col_text) >= parseInt(column_default_num))//��ǩ������ռ�в�С��ÿ���������������Ĭ��Ϊ���б�ǩ
		{
			this_col = column_default_num;
			show_kind = "single_label";
		}
		else if (parseInt(this_col) > parseInt(column_default_num))//һ��Ԫ����ռ�д���ÿ����������������Ϸ�
		{
			continue;
		}
		allow_col = parseInt(column_default_num) - point_column;

		//�����ⲿ�ӿڣ��������ǰ��ʾ
		if ((element_kind_text == "external" || element_kind_text == "external_div") && element_external_info_text != "" && element_external_info_text != "null")
		{
			this_col = column_default_num;
		}
		if (parseInt(this_col) > allow_col)//�����ǰ�в����ˣ�����һ��;
		{
			//alert("�����в���");
			//��Ĭ���������հ���
			xsl_info += nas_generate_xsl_fill_line(width_unit,point_column,column_default_width,column_default_num,column_default_css,preserve);
			//������
			xsl_info += nas_generate_xsl_end_line();

			point_column = 0;
		}
		if ((element_kind_text == "external" || element_kind_text == "external_div") && element_external_info_text != "" && element_external_info_text != "null")
		{
			//�ⲿ�ӿ�
			xsl_info += "</table>";
			if (element_kind_text == "external")
			{
				//eval_func = "window.parent.frames[0]."+element_external_info_text;				
				//xsl_info += eval(eval_func);
				
				eval_func = element_external_info_text;				
				xsl_info += eval(eval_func);
				
				/*������Ϣ��
					eval_func = "alert(element_external_info_text);";
					eval(eval_func);
				*/
			}
			else if (element_kind_text == "external_div")
			{
				xsl_info += "<div "+ element_external_info_text + ">";
				//alert(element_external_info_text);
				//xsl_info += "<div id = \"dd\">";
				//xsl_info += "nihao!!!";
				xsl_info += "</div>";
			}
			xsl_info += table_header;
			point_column = 0;

			continue;
		}
		if (point_column == 0) //��������
		{
			//alert("��������");
			xsl_info += nas_generate_xsl_new_line(row_css,preserve);
		}
		//if (xml_info == "root/Service_xml_all")
		//{
			//alert("ok");
		//}
		//����PAGEԪ��
		if (element_label_name_text != "null" && parseInt(element_label_col_text)>0)
		{
			if (element_label_span_text == "null")
			{
				xsl_info += nas_generate_xsl_label(width_unit,"null",element_label_css_text,element_label_col_text,element_label_name_text,column_default_width,point_column,element_label_type_text,preserve);
			}
			else
			{
				//alert(element_label_name_text);
				//alert(nas_generate_xsl_label_span(width_unit,"null",element_label_css_text,element_label_col_text,element_label_name_text,column_default_width,point_column,element_label_type_text,element_label_span_text,preserve));
				xsl_info += nas_generate_xsl_label_span(width_unit,"null",element_label_css_text,element_label_col_text,element_label_name_text,column_default_width,point_column,element_label_type_text,element_label_span_text,preserve);
			}
			
			//�������ۼ�
			point_column += parseInt(element_label_col_text);
		}
		if (show_kind == "no_single_label")
		{
			//��֯�ؼ�
			field_node = node_info.selectNodes("element_field");
			space_i = 0;
			for(field_node_info = field_node.nextNode(); field_node_info; field_node_info = field_node.nextNode())
			{
				//��ʼ��
				init_field_value();
				if (space_i!=0)
				{
					for (k=0;k<parseInt(element_field_space_text);k++)
					{
						element_info += "&#160;";
					}
				}
				space_i ++;
				if (element_field_name = field_node_info.selectNodes("element_field_name").nextNode)
				{	element_field_name_text = element_field_name.text;}
				if (element_field_type = field_node_info.selectNodes("element_field_type").nextNode)
				{	element_field_type_text = element_field_type.text;}

				if (element_field_class = field_node_info.selectNodes("element_field_class").nextNode)
				{	element_field_class_text = element_field_class.text;}
				if (element_field_maxlength = field_node_info.selectNodes("element_field_maxlength").nextNode)
				{	element_field_maxlength_text = element_field_maxlength.text;}

				if (element_field_value = field_node_info.selectNodes("element_field_value").nextNode)
				{	element_field_value_text = element_field_value.text;}
				if (element_field_value_select = field_node_info.selectNodes("element_field_value_select").nextNode)
				{	element_field_value_select_text = element_field_value_select.text;}

				if (element_field_dis = field_node_info.selectNodes("element_field_dis").nextNode)
				{	element_field_dis_text = element_field_dis.text;}
				if (element_field_checked = field_node_info.selectNodes("element_field_checked").nextNode)
				{	element_field_checked_text = element_field_checked.text;}

				element_field_action = field_node_info.selectNodes("element_field_action").nextNode;
				if (element_field_action && element_field_name_text)
				{
					//alert(element_field_name_text + "-" + element_field_action.childNodes[0].firstChild.text);
					//alert(element_field_name_text + "-" + element_field_action.childNodes[1].firstChild.text);
					act_name = new Array();
					act_function = new Array();

					if (element_field_action.childNodes)
					{
						for (j=0;j<element_field_action.childNodes.length;j++)
						{
							act_name_temp = element_field_action.childNodes[j].firstChild;
							act_func_temp = act_name_temp.nextSibling;

							if (act_name_temp && act_func_temp)
							{
								act_name[j] = act_name_temp.text;
								act_function[j] = act_func_temp.text;
							}
						}
					}
				}

				element_info += nas_generate_xsl_field_info(element_field_type_text,element_field_class_text,element_field_name_text,element_field_maxlength_text,act_name,act_function,source,element_field_value_text,element_field_value_select_text,element_field_dis_text,element_field_checked_text);
			}
			//���ɿؼ���Ϣ
			if (element_info != "" && parseInt(element_field_col_text) > 0)
			{
				xsl_info += nas_generate_xsl_label(width_unit,"null",element_field_css_text,element_field_col_text,element_info,column_default_width,point_column,"null",preserve);
				//�������ۼ�
				point_column += parseInt(element_field_col_text);
			}
		}
		if (point_column == parseInt(column_default_num))//������
		{
			//������
			xsl_info += nas_generate_xsl_end_line();
			//�Ӽ�����(�ȴ���������)
			point_column = 0;
		}
	}

	//ѭ����ɣ�����һ�У�
	if (point_column != (parseInt(column_default_num)+1) && point_column!=0)
	{
		//���հ���
		xsl_info += nas_generate_xsl_fill_line(width_unit,point_column,column_default_width,column_default_num,column_default_css,preserve);
		//������
		xsl_info += nas_generate_xsl_end_line();
		//��ռ�����
		point_column = 0;
	}
	xsl_info += "</table>";
	//alert(xsl_info);

	var div_object = find_Obj(div_name);
	var v = 'show';
	var obj;

	if (div_object)
	{
		v=(v=='show')?'visible':(v='hide')?'hidden':v;

		obj=div_object.style;
		if (obj)
		{
			obj.visibility=v;
			obj.position='relative';
			div_object.innerHTML='';
			div_object.innerHTML=xsl_info;
		}
	}

	//����ҳ��װ��ʱ������õķ���
	var js_mark = xml_info + "/script_element/element";
	node = source.selectNodes(js_mark);
	var js_node = null;
	var js_temp = "";
	//alert(xml_info);
	for(node_info = node.nextNode(); node_info; node_info = node.nextNode())
	{
		js_node = node_info.selectNodes("js_name").nextNode();
		if (js_node)
		{
			js_temp = js_node.text;
			if (js_temp!="")
			{
				//alert(js_temp);
				//eval_func = "window.parent.frames[0]."+js_temp;
				eval_func = js_temp;
				//alert(eval_func);
				eval(eval_func);
			}
		}
	}
	//eval(nas_generate_span_xsl('root/Customer_xml_all','Customer_kind',document.forms[0].Customer_kind.value));

	return;
}
/////////////////////////////////////////////�����ܺ������֣�//////////////////////////////////////////////////////
//��ȡ��ʾ��ʽ������Ϣ		��׼��ʽ�˲���Ĭ�ϸ�ʽ����Ҫ�����������ļ���
function get_table_style(source,xml_info)
{
	//ȡ����ʾ���������ȵ�λ
	var col_unit_mark = xml_info + "/table_info/row_width_unit";
	node_info = (source.selectNodes(col_unit_mark)).nextNode;
	if (node_info)
	{	width_unit = node_info.text;}
	//ȡ����ʾ�������е�CSS����
	var row_css_mark = xml_info + "/table_info/row_css";
	node_info = (source.selectNodes(row_css_mark)).nextNode;
	if (node_info)
	{	row_css = node_info.text;}
	//ȡ����ʾ������ÿ�е�����
	var col_num_mark = xml_info + "/table_info/column_default_num";
	node_info = (source.selectNodes(col_num_mark)).nextNode;
	if (node_info)
	{	column_default_num = node_info.text;}
	//ȡ����ʾ������ÿ�еĳ���
	var cul_width_mark = xml_info + "/table_info/column_default_width";
	node = source.selectNodes(cul_width_mark);
	var i = 0;
	for(node_info = node.nextNode(); node_info; node_info = node.nextNode())
	{
		column_default_width[i] = node_info.text;
		i++;
	}
	//ȡ����ʾ������ÿ�е�Ĭ�ϵ���ʽ��
	var col_css_mark = xml_info + "/table_info/column_default_css";
	node = source.selectNodes(col_css_mark);
	var i = 0;
	for(node_info = node.nextNode(); node_info; node_info = node.nextNode())
	{
		column_default_css[i] = node_info.text;
		i++;
	}
	//table����ʽ
	var table_mark = xml_info + "/table_info/table_css";
	node_info = (source.selectNodes(table_mark)).nextNode;
	if (node_info)
	{
		table_css = node_info.text;
	}
	if (table_css != "null" && table_css != "")//���ָ���˷�Ĭ�ϸ�ʽ
	{	table_header = "<table width = \"620px\" border=\"2\" cellpadding=\"1\" cellspacing=\"2\" bordercolor=\"#E6E6E6\" bgcolor=\"#FFFFFF\">";
	}
	return;
}
//����hidden����
function nas_generate_hidden_info(source,xml_info)
{
	//����HIDDEN��
	var hidden_mark = xml_info + "/hidden/element";
	node = source.selectNodes(hidden_mark);
	var hidden_name_node = null;
	var hidden_value_node = null;
	var hidden_select_value_node = null;
	var hidden_name_temp = "null";
	var hidden_value_temp = "null";
	var hidden_select_value_temp = "null";
	var hidden_value = "";
	var return_info = "";

	for(node_info = node.nextNode(); node_info; node_info = node.nextNode())
	{
		hidden_name_temp = "null";
		hidden_value_temp = "null";
		hidden_select_value_temp = "null";
		hidden_value = "";

		hidden_name_node = node_info.selectNodes("name").nextNode();
		hidden_value_node = node_info.selectNodes("value").nextNode();
		hidden_select_value_node = node_info.selectNodes("select_value").nextNode();
		if (hidden_name_node)
		{	hidden_name_temp = hidden_name_node.text;}
		if (hidden_value_node)
		{	hidden_value_temp = hidden_value_node.text;}
		if (hidden_select_value_node)
		{	hidden_select_value_temp = hidden_select_value_node.text;}

		if (hidden_value_temp!="null" && hidden_value_temp!="")//���ָ���˾�ֵ̬����Ϊ��ֵ̬
		{	hidden_value = hidden_value_temp;}
		else
		{	hidden_value = nas_generete_value(source,hidden_select_value_temp);}

		return_info += nas_generate_hidden(hidden_name_temp,hidden_value);
	}
	return return_info;
}
//��������
function nas_generate_xsl_new_line(row_css,preserve)
{
 	if (row_css!="null")
 		return "<tr class=\""+ row_css +"\">";
 	else
 		return "<tr>";

}
function nas_generate_xsl_end_line()
{
	 return "</tr>";
}
function nas_generate_xsl_fill_line(width_unit,the_point,column_default_width,column_default_num,column_default_css,preserve)
{
	var width = "";
	var the_class = "";

	var the_value = "";

	while (parseInt(the_point)<parseInt(column_default_num))
	{
		width = parseInt(column_default_width[the_point]);
		the_class = column_default_css[the_point];

		the_value += nas_generate_xsl_label(width_unit,width,the_class,"null","&#160;","null","null",preserve);

		the_point = parseInt(the_point)+1;
	}

	//alert(the_value);

	return the_value;

}
function nas_generate_xsl_label_span (width_kind,the_width,thecss,colspan,value,column_default_width,the_point,label_type,label_span_text,preserve)
{
	//alert(preserve[0]);
	//������

	var width = 0;
	var the_value = "";

	if (the_width != "null")
	{	width = the_width;}
	else
	{
		//alert(colspan);
		if (colspan != "null")
		{
			for (var i=0;i<parseInt(colspan);i++)
			{
				width += parseInt(column_default_width[parseInt(the_point)+i]);
			}
		}
		else if (colspan == "0")
		{	return "";}
	}

	if (width_kind == "per")
	{
		width += "%";
	}
	else
	{
		width += width_kind;
	}

	if (label_type != "null")
	{
		the_value = "<span name=\""+value+"\" id=\""+value+"\"></span>";
	}
	else if (label_span_text != "null")
	{
		the_value = "<span name=\""+label_span_text+"\" id=\""+label_span_text+"\">"+value+"</span>";
	}
	else
	{	the_value = value;}


	//alert("<td width=\""+width+"\" class=\""+thecss+"\" colspan=\""+colspan+"\" >"+the_value+"</td>");
	return "<td width=\""+width+"\" class=\""+thecss+"\" colspan=\""+colspan+"\" >"+the_value+"</td>";
}


function nas_generate_xsl_label (width_kind,the_width,thecss,colspan,value,column_default_width,the_point,label_type,preserve)
{
	//alert(preserve[0]);
	//������

	var width = 0;
	var the_value = "";

	if (the_width != "null")
	{	width = the_width;}
	else
	{
		//alert(colspan);
		if (colspan != "null")
		{
			for (var i=0;i<parseInt(colspan);i++)
			{
				width += parseInt(column_default_width[parseInt(the_point)+i]);
			}
		}
		else if (colspan == "0")
		{	return "";}
	}

	if (width_kind == "per")
	{
		width += "%";
	}
	else
	{
		width += width_kind;
	}

	if (label_type != "null")
	{
		the_value = "<span name=\""+value+"\" id=\""+value+"\"></span>";
	}
	else
	{	the_value = value;}


	//alert("<td width=\""+width+"\" class=\""+thecss+"\" colspan=\""+colspan+"\" >"+the_value+"</td>");
	return "<td width=\""+width+"\" class=\""+thecss+"\" colspan=\""+colspan+"\" >"+the_value+"</td>";
}
function nas_generate_hidden(the_name,the_value)
{
	var return_value = "";

	if (the_name == "null")
	{
		return_value = "";
	}
	else
	{
		return_value = "<input type=\"hidden\" name=\""+the_name+"\" value=\""+the_value+"\"></input>";

	}

	return return_value;
}


function nas_generete_value(the_source,the_select_value)
{
	var return_info = "";
	var value_mark = "";
	var node = null;
	var node_info = null;

	if (the_select_value != "null" && the_select_value != "")
	{
		value_mark = the_select_value;
		node = the_source.selectNodes(value_mark);
		if (node)
		{
			node_info = node.nextNode;
		}
		if (node_info)
		{
			return_info = node_info.text;
		}
	}

	return return_info;
}

function nas_generate_xsl_field_info(type,the_class,the_name,the_max,act_name,act_function,source,static_value,dyn_value,dis_yes,checked_yes)
{
	var node;
	var node_info;
	var value_mark="";
	var value_node_text="";
	var c_v_node;
	var c_c_node;

	var header = "";
	var param = "";
	var param_act = "";
	var xsl_param = "";
	var ender = "";
	var i = 0;
	var seleted_info = "-1";

	var return_value = "";

	if (the_class == "newtextType" && type == "select" )
	{
		the_class = select_class;
	}

	if (type=="label")
	{
		return_value = the_name;
		//alert(return_value);
		return return_value;
		
		//alert(type+'--'+the_class+'--'+the_name+'--'+the_max+'--'+act_name+'--'+act_function+'--'+source+'--'+static_value+'--'+dyn_value+'--'+dis_yes+'--'+checked_yes);
		
	}
	else if (type=="text" || type=="password")
	{
		if (static_value == "null" || static_value == "")
		{
			if (dyn_value =="null" || dyn_value =="")
			{
				//������XML��Ϣ
				dyn_value = "root/Create/" + the_name;
			}
			value_mark = dyn_value;
			node_info = (source.selectNodes(value_mark)).nextNode;
			if (node_info)
			{
				value_node_text = node_info.text;
			}
		}
		else
		{	value_node_text = static_value;}

		//��ͬ����һ����ʾ
		header += "<input type=\""+type+"\" value=\""+value_node_text+"\" maxlength=\""+the_max+"\"";
		ender += "</input>";
	}
	else if (type=="checkbox" || type=="radio")
	{
		if (static_value == "null" || static_value == "")
		{
			if (dyn_value =="null" || dyn_value =="")
			{
				//������XML��Ϣ
				dyn_value = "root/Create/" + the_name;
			}
			value_mark = dyn_value;
			node_info = (source.selectNodes(value_mark)).nextNode;
			if (node_info)
			{
				value_node_text = node_info.text;
			}
		}
		else
		{	value_node_text = static_value;}

		//��ͬ����һ����ʾ
		header += "<input type=\""+type+"\" value=\""+value_node_text+"\"" + checked_yes + " = true ";
		ender += "</input>";
	}
	else if (type=="select")
	{
		if (dyn_value =="null" || dyn_value =="")
		{
			dyn_value = "root/Create/" + the_name;
		}
		//alert(dyn_value);
		//������XML��Ϣ
		//ȡ�ó�ʼѡ��
		if (static_value=="null" || static_value=="")
		{
			value_mark = dyn_value +"/selected";
			node_info = (source.selectNodes(value_mark)).nextNode;
			if (node_info)
			{
				seleted_info = node_info.text;
			}
		}
		else
		{	seleted_info = static_value;}
		//��ʾ�����б�
		value_mark = dyn_value +"/option";
		node = source.selectNodes(value_mark);
		for(node_info = node.nextNode(); node_info; node_info = node.nextNode())
		{
			c_v_node = node_info.selectNodes("value").nextNode;
			c_c_node = node_info.selectNodes("caption").nextNode;
			if (c_v_node && c_c_node)
			{
				if (c_v_node.text == seleted_info)
				{
					xsl_param += "<option value=\""+(c_v_node.text)+"\" selected>"+(c_c_node.text)+"</option>";
				}
				else
				{
					xsl_param += "<option value=\""+(c_v_node.text)+"\">"+(c_c_node.text)+"</option>";
				}
			}
		}

		header += "<select ";

		ender += "</select>";
	}
	else if (type=="button")
	{
		if (static_value == "null" || static_value == "")
		{
			if (dyn_value =="null" || dyn_value =="")
			{
				//������XML��Ϣ
				dyn_value = "root/Create/" + the_name;
			}
			value_mark = dyn_value;
			node_info = (source.selectNodes(value_mark)).nextNode;
			if (node_info)
			{
				value_node_text = node_info.text;
			}
		}
		else
		{	value_node_text = static_value;}

		//��ͬ����һ����ʾ
		header += "<input type=\"button\" value=\""+value_node_text+"\"";
		ender += "</input>";
	}
	//������Ϣ
	param= " class=\""+the_class+"\" name=\""+the_name+"\"";
	if (dis_yes == "yes")
	{
		param += " disabled=true";
	}
	else if (dis_yes == "readonly")
	{
		param += " readOnly=true";
	}

	//У���¼�����֯
	if (act_name)
	{
		for (i=0;i<act_name.length;i++)
		{
			param_act += " " + act_name[i] + "=\"" + act_function[i] + "\"";
		}
	}
	param_act += " >";

	return_value = header + param + param_act + xsl_param + ender;
	//alert(return_value);
	return return_value;
}
function nas_generate_span_xsl(xml_info,kind,the_value)
{
	var show_kind = "";
	if (kind == "Customer_kind")
	{
		if (the_value == ""){
			show_kind = "";	
		}else if (the_value < 30)
		{	show_kind = "person";}
		else
		{	show_kind = "group";}
	}

	var source = document.XMLDocument;
	var node;
	var node_info;

	var info_value="";
	var span_object;

	//ȡ����ʾ���������ȵ�λ
	var span_hidden_mark = xml_info + "/span_hidden/element";
	node = source.selectNodes(span_hidden_mark);
	for(node_info = node.nextNode(); node_info; node_info = node.nextNode())
	{
		init_span_value();

		if (element_span_name = node_info.selectNodes("element_span_name").nextNode)
		{	element_span_name_text = element_span_name.text;}

		span_object = find_Obj(element_span_name_text);
		span_object.innerHTML=info_value;
	}
	node = source.selectNodes(span_hidden_mark);

	for(node_info = node.nextNode(); node_info; node_info = node.nextNode())
	{
		init_comm_value();
		init_span_value();

		if (element_span_name = node_info.selectNodes("element_span_name").nextNode)
		{	element_span_name_text = element_span_name.text;}
		if (element_span_kind = node_info.selectNodes("element_span_kind").nextNode)
		{	element_span_kind_text = element_span_kind.text;}
		if (element_field_space = node_info.selectNodes("element_field_space").nextNode)
		{	element_field_space_text = element_field_space.text;}


		if (element_span_kind_text == show_kind)//����Ҫ��ʾ��
		{
			//��֯Ҫ�����ʾ����Ϣ
			field_node = node_info.selectNodes("element_field");
			for(field_node_info = field_node.nextNode(); field_node_info; field_node_info = field_node.nextNode())
			{
				init_field_value();

				if (element_field_name = field_node_info.selectNodes("element_field_name").nextNode)
				{	element_field_name_text = element_field_name.text;}
				if (element_field_type = field_node_info.selectNodes("element_field_type").nextNode)
				{	element_field_type_text = element_field_type.text;}

				if (element_field_class = field_node_info.selectNodes("element_field_class").nextNode)
				{	element_field_class_text = element_field_class.text;}
				if (element_field_maxlength = field_node_info.selectNodes("element_field_maxlength").nextNode)
				{	element_field_maxlength_text = element_field_maxlength.text;}

				if (element_field_value = field_node_info.selectNodes("element_field_value").nextNode)
				{	element_field_value_text = element_field_value.text;}
				if (element_field_value_select = field_node_info.selectNodes("element_field_value_select").nextNode)
				{	element_field_value_select_text = element_field_value_select.text;}

				element_field_action = field_node_info.selectNodes("element_field_action").nextNode;

				if (element_field_action && element_field_name_text)
				{
					act_name = new Array();
					act_function = new Array();
					for (j=0;j<element_field_action.childNodes.length;j++)
					{
						act_name_temp = element_field_action.childNodes[j].firstChild;
						act_func_temp = act_name_temp.nextSibling;

						if (act_name_temp && act_func_temp)
						{
							act_name[j] = act_name_temp.text;
							act_function[j] = act_func_temp.text;
						}
					}
				}

				info_value += nas_generate_xsl_field_info(element_field_type_text,element_field_class_text,element_field_name_text,element_field_maxlength_text,act_name,act_function,source,element_field_value_text,element_field_value_select_text);

				for (k=0;k<parseInt(element_field_space_text);k++)
				{
					info_value += "&#160;";
				}
			}

			span_object = find_Obj(element_span_name_text);
			span_object.innerHTML=info_value;
		}
		else
		{
			info_value = "";
		}
		info_value = "";
	}

}
function find_Obj(name,doc_id)
{
	var p,i,x;

	if (!doc_id)
		doc_id=document;

	if((p=name.indexOf("?"))>0&&parent.frames.length)
	{	doc_id=parent.frames[name.substring(p+1)].document; name=name.substring(0,p);	}

	if(!(x=doc_id[name])&&doc_id.all)
		x=doc_id.all[name];
	for (i=0;!x&&i<doc_id.forms.length;i++)
		x=doc_id.forms[i][name];

	for(i=0;!x&&doc_id.layers&&i<doc_id.layers.length;i++)
		x=find_Obj(name,doc_id.layers[i].document);
	if(!x && doc_id.getElementById)
		x=doc_id.getElementById(name);

	return x;
}
