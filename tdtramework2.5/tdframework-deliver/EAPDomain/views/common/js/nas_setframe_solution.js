/**
 * <p>Name: nas_setframe_solution.js</p>
 * <p>Description: 生成受理方案指定的值</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/
//alert('nas_setframe_solution.js引用成功');
function nas_setframe_solution(xml_info,xml_default)
{
	var source = document.XMLDocument;

	var name_mark = xml_info + "/option/name";
	var value_mark = xml_info + "/option/value";

	var name_node=source.selectNodes(name_mark);
	var value_node=source.selectNodes(value_mark);

	var text_name = "";
	var text_value = "";

	var name_temp = "";
	var value_temp = "";

	var input_name;
	var the_input;
	for(text_name=name_node.nextNode();text_name;text_name=name_node.nextNode())
	{
		text_value=value_node.nextNode();

		if(text_name && text_value)
		{
			name_temp = text_name.text;
			value_temp = text_value.text;

			if (name_temp!="" && value_temp!="")
			{
				//alert (name_temp + "--" + value_temp);
				//name_temp = "Customer_kind";
				//value_temp = "60";

				input_name="document.forms[0]."+name_temp;				
				//alert(input_name);				
				the_input = eval(input_name);				
				//alert(typeof(the_input));
				
				if (typeof(the_input)!='undefined')
				{
					
					the_input.value = value_temp;
					
					if (name_temp == "Customer_kind")
					{
						//show_customer_level_info();
						//改成自动生成后调用这个：
						nas_generate_span_xsl('root/Customer_xml_all','Customer_kind',value_temp);
						//nas_generate_span_xsl('root/Customer_xml_all','Customer_kind',document.forms[0].Customer_kind.value);
					}
					the_input.disabled = true;
				}
			}
		}
	}
	
	/////////////设置受理方案下拉列表的值
	
	var d_mark = xml_default;
	var d_node=source.selectNodes(d_mark);

	var d_name = "";	
	var d_temp = "";

	for(d_name=d_node.nextNode();d_name;d_name=d_node.nextNode())
	{
		if(d_name)
		{
			d_temp = d_name.text;
			

			if (d_temp!="")
			{
				document.forms[0].Bus_solution_id.value = d_temp;
			}
		}
	}
	
}



