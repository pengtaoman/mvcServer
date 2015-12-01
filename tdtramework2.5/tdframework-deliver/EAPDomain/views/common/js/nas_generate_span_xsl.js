/**
 * <p>Name: nas_generate_span_xsl.js</p>
 * <p>Description: 动态显示SPAN填充信息</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/
//alert('nas_generate_span_xsl.js引用成功');
//为什么要把这个文件分出来？？？？？   这个文件作废！ 直接用nas_generate_xsl.js


/*function nas_generate_span_xsl(xml_info,kind,the_value)
{
	var show_kind = "";
	if (kind == "Customer_kind")
	{
		if (the_value < 30)
		{	show_kind = "person";}
		else
		{	show_kind = "group";}
	}
	
	var source = document.XMLDocument;
	var node;
	var node_info;
	
	var field_node;
	var field_node_info;

	var element_span_name;
	var element_span_name_text;
	var element_span_kind;
	var element_span_kind_text;

	var element_field_name;
	var element_field_type;
	var element_field_class;
	var element_field_maxlength;
	var element_field_value;
	var element_field_value_select;
	var element_field_action;	
	var element_field_name_text;
	var element_field_type_text;
	var element_field_class_text;
	var element_field_maxlength_text;
	var element_field_value_text;
	var element_field_value_select_text;
	var element_field_space;
	var element_field_space_text;

	var act_name;
	var act_function;
	var act_name_temp;
	var act_func_temp;

	var info_value="";
	
	var span_object;
	
	//取得显示参数：长度单位
	var span_hidden_mark = xml_info + "/span_hidden/element";
	node = source.selectNodes(span_hidden_mark);
	for(node_info = node.nextNode(); node_info; node_info = node.nextNode())
	{
		element_span_name = null;
		element_span_name_text = "null";
				
		if (element_span_name = node_info.selectNodes("element_span_name").nextNode)
		{	element_span_name_text = element_span_name.text;}
		
		span_object = find_Obj(element_span_name_text);
		span_object.innerHTML=info_value;
	}
	node = source.selectNodes(span_hidden_mark);
	
	
	for(node_info = node.nextNode(); node_info; node_info = node.nextNode())
	{
		element_span_name = null;
		element_span_name_text = "null";
		element_span_kind = null;
		element_span_kind_text = "null";
		field_node = null;
		field_node_info = "null";
		element_field_space = null;
		element_field_space_text = "0";
		
		if (element_span_name = node_info.selectNodes("element_span_name").nextNode)
		{	element_span_name_text = element_span_name.text;}
		if (element_span_kind = node_info.selectNodes("element_span_kind").nextNode)
		{	element_span_kind_text = element_span_kind.text;}
		if (element_field_space = node_info.selectNodes("element_field_space").nextNode)
		{	element_field_space_text = element_field_space.text;}
		
		
		if (element_span_kind_text == show_kind)//本次要显示的
		{
			//组织要填充显示的信息
			field_node = node_info.selectNodes("element_field");			
			for(field_node_info = field_node.nextNode(); field_node_info; field_node_info = field_node.nextNode())
			{
				element_field_name = null;
				element_field_type = null;
				element_field_class = null;
				element_field_maxlength = null;
				element_field_value = null;
				element_field_value_select = null;
				element_field_action = null;
				element_field_name_text = "null";
				element_field_type_text = "null";
				element_field_class_text = "null";
				element_field_maxlength_text = "null";
				element_field_value_text = "null";
				element_field_value_select_text = "null";
				
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
				act_name = null;
				act_function = null;
				if (element_field_action && element_field_name_text)
				{
					act_name = new Array();
					act_function = new Array();
					act_name_temp = "";
					act_func_temp = "";
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
*/
