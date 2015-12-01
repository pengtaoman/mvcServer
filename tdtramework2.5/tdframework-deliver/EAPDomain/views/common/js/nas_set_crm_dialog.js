/**
 * <p>Name: nas_set_crm_dialog.js</p>
 * <p>Description: 取可供继承的信息变成数组，准备传给dialog</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @date 20030107
 * @version 1.0
**/

//alert('nas_set_crm_dialog.js引用成功');

function nas_set_crm_dialog(xml_info,this_fild)
{
	var source = document.XMLDocument;
	var mark = xml_info + "/option";
	var node=source.selectNodes(mark);
	var text_xml = "";
	var temp = "";
	var arr_temp = new Array();
	var arr_return = new Array();
	var i = 0;

	for(text_xml=node.nextNode();text_xml;text_xml=node.nextNode())
	{
		temp = text_xml.text;
		
		//alert(temp);
		
		arr_temp = temp.split(' ');
		
		if (arr_temp[0]!="")
		{
			arr_return[i] = "<tr class='trType'  bgcolor='#E6E6E6' id='0'>";
			arr_return[i] += "<td width='10px'>";
			arr_return[i] += "<input type='radio' value='"+arr_temp[0]+"@*.*@"+arr_temp[2]+"@*.*@"+arr_temp[6]+"' name='R1' onClick=\"getRowId(this,'"+arr_temp[0]+"','"+arr_temp[2]+"','"+arr_temp[6]+"')\"></td>";
			arr_return[i] += "<td width='0px' align='center'>"+arr_temp[0]+"</td>";
			arr_return[i] += "<td width='0px' align='center'>"+arr_temp[1]+"</td>";
			arr_return[i] += "<td width='0px' align='center'>"+arr_temp[2]+"</td>";
			arr_return[i] += "<td width='0px' align='center'>"+arr_temp[3]+"</td>";
			arr_return[i] += "<td width='0px' align='center'>"+arr_temp[4]+"</td>";
			arr_return[i] += "<td width='0px' align='center'>"+arr_temp[5]+"</td>";
			arr_return[i] += "</tr>";
			
			i++;
		}
	}
	/*
	arr_return[0] = "<tr class='trType'  bgcolor='#E6E6E6' id='0'>";
	arr_return[0] += "<td width='5%'>";
	arr_return[0] += "<input type='radio' value='67@*.*@41' name='R1' onClick=\"getRowId(this,'67','41')\"></td>";
	arr_return[0] += "<td width='15%' align='center'>67</td>";
	arr_return[0] += "<td width='15%' align='center'>zhouty</td>";
	arr_return[0] += "<td width='15%' align='center'>41</td>";
	arr_return[0] += "<td width='15%' align='center'>预付费帐户</td>";
	arr_return[0] += "<td width='15%' align='center'>02904111009</td>";
	arr_return[0] += "<td width='20%' align='center'>家庭住址：软件园20号</td>";
	arr_return[0] += "</tr>";
	*/	
	
	return arr_return;
	
}



