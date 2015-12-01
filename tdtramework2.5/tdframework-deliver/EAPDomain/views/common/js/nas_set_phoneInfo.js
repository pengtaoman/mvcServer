/**
 * <p>Name: nas_set_inherit.js</p>
 * <p>Description: 将继承信息从下一帧赋值上去</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author koujy
 * @date 20030616
 * @version 1.0
**/

//alert('nas_set_inherit.js引用成功');

function nas_set_phoneInfo(xml_info)
{
	
	var source = document.XMLDocument;
	//设置生产厂商
	var kind_mark = xml_info+"/Manufacturer";
	var kind_node = source.selectNodes(kind_mark);
	var kind_xml = kind_node.nextNode();
		
	if (kind_xml)
	{
		if (typeof(window.parent.frames['header'].document.forms[0].Manufacturer)!='undefined')
		{
			//alert("in nas_accept_phoneInfo js the Manufacturer is:"+kind_xml.text);
			window.parent.frames['header'].document.forms[0].Manufacturer.value = kind_xml.text;
			
			//window.parent.frames['header'].show_customer_level_info();
		}
	}
	//设置手机型号
	nas_mobile_relation_build(window.parent.frames['header'].document.forms[0].Manufacturer,window.parent.frames['header'].document.forms[0].Mobile_kind,'/root/Create','/Manufacturer_kind_','no');
	kind_mark = xml_info+"/MobileKind";
	kind_node = source.selectNodes(kind_mark);
	kind_xml = kind_node.nextNode();	
	if (kind_xml)
	{
		if (typeof(window.parent.frames['header'].document.forms[0].Mobile_kind)!='undefined')
		{
			//alert("in nas_accept_phoneInfo js the MobileKind is:"+kind_xml.text);
			window.parent.frames['header'].document.forms[0].Mobile_kind.value = kind_xml.text;
			
			//window.parent.frames['header'].show_customer_level_info();
		}
	}
	
	//设置应收价
	kind_mark = xml_info+"/Confirm_price";
	kind_node = source.selectNodes(kind_mark);
	kind_xml = kind_node.nextNode();	
	if (kind_xml)
	{
		if (typeof(window.parent.frames['header'].document.forms[0].Confirm_price)!='undefined')
		{
			//alert("in nas_accept_phoneInfo js the ShoudPay is:"+kind_xml.text);
			window.parent.frames['header'].document.forms[0].Confirm_price.value = kind_xml.text;
			
			//window.parent.frames['header'].show_customer_level_info();
		}
	}
	
	
	
}


















