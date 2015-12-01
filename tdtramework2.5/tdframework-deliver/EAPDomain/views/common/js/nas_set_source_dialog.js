/**
 * <p>Name: nas_set_source_dialog.js</p>
 * <p>Description: 取可用号码显示数组，准备传给dialog</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @date 20030227
 * @version 1.0
**/

//alert('nas_set_source_dialog.js引用成功');
function nas_set_source_dialog(xml_info,this_fild)
{
	var source = document.XMLDocument;
	var mark = xml_info;
	var node=source.selectNodes(mark);
	var text_xml = "";
	var temp = "";
	var arr_temp = new Array();
	var arr_return = new Array();
	var i = 0;

	for(text_xml=node.nextNode();text_xml;text_xml=node.nextNode())
	{
		var j = 0;
		
		var phone_number;
		var number_price;
		var area_id_name;
		var bureau_id_name;
		var area_id_obj;
		
		var phone_number_text = "";
		var number_price_text = "";
		var area_id_name_text = "";
		var area_id_name_text_view = "";
		var bureau_id_name_text = "";
		var area_id = "";
		var k = 0;
		
		
		for (j=0;j<text_xml.childNodes.length;j++)
		{
			//alert(text_xml.childNodes[3].baseName);//alert(text_xml.childNodes[3].nodeName);
			
			phone_number = text_xml.childNodes[j].firstChild;
			number_price = phone_number.nextSibling;
			area_id_name = number_price.nextSibling;
			bureau_id_name = area_id_name.nextSibling;
			area_id_obj = bureau_id_name.nextSibling;
			if (area_id_obj)
			{	area_id = area_id_obj.text;}
			if (phone_number)
			{	phone_number_text = phone_number.text;}
			if (number_price)
			{	number_price_text = number_price.text;
				if (number_price_text == "" || number_price_text == null)
				{
					number_price_text = "0.00";
				}
			}
			if (area_id_name)
			{	area_id_name_text = area_id_name.text;
				if (area_id_name_text == "" || area_id_name_text == null)
				{
					area_id_name_text_view = "&nbsp;";
				}
				else
				{
					area_id_name_text_view = area_id_name_text;
				}
			}
			if (bureau_id_name)
			{	bureau_id_name_text = bureau_id_name.text;}
			
			if (phone_number_text != "" && bureau_id_name_text != "")
			{
				
				arr_return[k] = "<tr class='trType'  bgcolor='#E6E6E6' id='0'>";
				arr_return[k] += "<td width='10px'>";
				arr_return[k] += "<input type='radio' value='"+phone_number_text+"@*.*@"+number_price_text+"@*.*@"+area_id+"@*.*@"+bureau_id_name_text+"' name='R1' onClick=\"getRowId(this,'"+phone_number_text+"@*.*@"+number_price_text+"@*.*@"+area_id+"@*.*@"+bureau_id_name_text+"')\">";
				arr_return[k] += (k+1)+"</td>";
				arr_return[k] += "<td width='0px' align='center'>"+phone_number_text+"</td>";
				arr_return[k] += "<td width='0px' align='center'>"+number_price_text+"元</td>";
				arr_return[k] += "<td width='0px' align='center'>"+area_id_name_text_view+"</td>";
				arr_return[k] += "<td width='0px' align='center'>"+bureau_id_name_text+"</td>";
				arr_return[k] += "</tr>";
				//alert(arr_return[k]);
				
				k++;
			}
			
		}
		
		/*
		if (arr_temp[0]!="")
		{
			arr_return[i] = "<tr class='trType'  bgcolor='#E6E6E6' id='0'>";
			arr_return[i] += "<td width='10px'>";
			arr_return[i] += "<input type='radio' value='"+arr_temp[0]+"@*.*@"+arr_temp[2]+"' name='R1' onClick=\"getRowId(this,'"+arr_temp[0]+"','"+arr_temp[2]+"')\"></td>";
			arr_return[i] += "<td width='0px' align='center'>"+arr_temp[0]+"</td>";
			arr_return[i] += "<td width='0px' align='center'>"+arr_temp[1]+"</td>";
			arr_return[i] += "<td width='0px' align='center'>"+arr_temp[2]+"</td>";
			arr_return[i] += "<td width='0px' align='center'>"+arr_temp[3]+"</td>";
			arr_return[i] += "<td width='0px' align='center'>"+arr_temp[4]+"</td>";
			arr_return[i] += "<td width='0px' align='center'>"+arr_temp[5]+"</td>";
			arr_return[i] += "</tr>";
			
			i++;
		}
		*/
	}
	
	return arr_return;
	
}

/**
给Scdma用的
*/
function nas_set_source_dialog_scdma(xml_info,this_fild)
{
	var source = document.XMLDocument;
	var mark = xml_info;
	var node=source.selectNodes(mark);
	var text_xml = "";
	var temp = "";
	var arr_temp = new Array();
	var arr_return = new Array();
	var i = 0;

	for(text_xml=node.nextNode();text_xml;text_xml=node.nextNode())
	{
		var j = 0;
		
		var phone_number;
		var number_price;
		var belongs_to;
		var belongs_to_name;
		
		var phone_number_text = "";
		var number_price_text = "";
		var belongs_to_text = "";
		var belongs_to_name_text = "";
		var k = 0;
		
		
		for (j=0;j<text_xml.childNodes.length;j++)
		{
			//alert(text_xml.childNodes[3].baseName);//alert(text_xml.childNodes[3].nodeName);
			
			phone_number = text_xml.childNodes[j].firstChild;
			number_price = phone_number.nextSibling;
			belongs_to = number_price.nextSibling;
			belongs_to_name = belongs_to.nextSibling;
			if (belongs_to)	
				belongs_to_text = belongs_to.text;
			if (belongs_to_name){	
				belongs_to_name_text = belongs_to_name.text;
				if(belongs_to_name_text == "" || belongs_to_name_text == null)
					belongs_to_name_text = "&nbsp;";
			}
			if (phone_number)
				phone_number_text = phone_number.text;
			if (number_price)
			{	number_price_text = number_price.text;
				if (number_price_text == "" || number_price_text == null)
				{
					number_price_text = "0.00";
				}
			}
			
			if (phone_number_text != "")
			{
				
				arr_return[k] = "<tr class='trType'  bgcolor='#E6E6E6' id='0'>";
				arr_return[k] += "<td width='10px'>";
				arr_return[k] += "<input type='radio' value='"+phone_number_text+"@*.*@"+number_price_text+"@*.*@"+belongs_to_text+"' name='R1' onClick=\"getRowId(this,'"+phone_number_text+"@*.*@"+number_price_text+"@*.*@"+belongs_to_text+"')\">";
				arr_return[k] += (k+1)+"</td>";
				arr_return[k] += "<td width='0px' align='center'>"+phone_number_text+"</td>";
				arr_return[k] += "<td width='0px' align='center'>"+number_price_text+"元</td>";
				arr_return[k] += "<td width='0px' align='center'>"+belongs_to_name_text+"</td>";
				arr_return[k] += "</tr>";
				//alert(arr_return[k]);
				
				k++;
			}
			
		}
		
	}
	
	return arr_return;
	
}



