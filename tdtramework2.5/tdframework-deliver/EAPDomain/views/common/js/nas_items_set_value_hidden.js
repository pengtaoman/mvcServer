/**
 * <p>Name: nas_items_set_value_hidden.js</p>
 * <p>Description: 子产品项目对页面值的限制</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/
//alert('nas_items_set_value_hidden.js引用成功');
//<SCRIPT language="javascript">nas_items_set_value("root/Create/SubProduct_9/","G")</SCRIPT>

function nas_items_set_value_hidden(product_mark,svc_kind)
{
	
	//alert("in");
	var source = document.XMLDocument;
	var package_mark = product_mark + "limit/option";
	var package_node = source.selectNodes(package_mark);
	var package_info;
	
	var the_field_name;
	var the_field_value;
	var the_field;
	for (package_info=package_node.nextNode();package_info;package_info=package_node.nextNode())
	{
		the_field_name = package_info.selectNodes("info_name").nextNode.text;//取控件名
		the_field_value = package_info.selectNodes("begin_value").nextNode.text;//取控件值
		//alert(the_field_name+"--"+the_field_value);
		
		eval("if (typeof(window.parent.frames[1].document.forms[0]."+svc_kind+the_field_name+")!=\"undefined\")"+
		"{"+
		"	window.parent.frames[1].document.forms[0]."+svc_kind+the_field_name+".value = \""+the_field_value+"\";"+
		"}");
	}
	return;
}

