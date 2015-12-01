/**
 * <p>Name: nas_upframe_fee.js</p>
 * <p>Description: 生成上一帧的费用函数</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/
//alert('nas_upframe_fee.js引用成功');
function nas_upframe_fee(xml_info,this_fild)
{

	var if_echo = "-1";

	var source = document.XMLDocument;
	var mark = xml_info;
	var node=source.selectNodes(mark);
	var text_xml = "";
	var temp = "";
	text_xml=node.nextNode();

	var fee_info = "";

	//var fee_arr_info = "";
	//fee_arr_info += "<script>fee_str_arr = new Array();";
	var fee_arr_info = new Array();
	fee_info += "<table width = '620px' border='2' cellpadding='1' cellspacing='2' bordercolor='#E6E6E6' bgcolor='#FFFFFF'>";
	fee_info += "<tr class='trType'><td width='100%' bordercolor='#E6E6E6' bgcolor='#E6E6E6' colspan='4'><p align='center'>费用信息</p></td></tr>";
	fee_info += "<tr class='newtrType'><td width='25%' bordercolor='#A2BEE1' bgcolor='#A2BEE1'><p align='center'>费用名称(元)</p></td>";
	fee_info += "<td width='25%' bordercolor='#A2BEE1' bgcolor='#A2BEE1'><p align='center'>费用金额(元)</p></td>";
	fee_info += "<td width='25%' bordercolor='#A2BEE1' bgcolor='#A2BEE1'><p align='center'>优惠金额(元)</p></td>";
	fee_info += "<td width='25%' bordercolor='#A2BEE1' bgcolor='#A2BEE1'><p align='center'>优惠原因</p></td></tr>";

	var id_text = "";
	var name_text = "";
	var value_text = "";
	var favour_text = "";
	var reason_text = "";
	var if_change = "";

	var fee_count = 0;

	if(text_xml)
	{
		temp = text_xml.text;

		if (temp!="")
		{
			if_echo = "1";

			var fee_arr = new Array();
			fee_arr = temp.split('~');
			var fee_param_arr = new Array();

			for (var i=0;i<fee_arr.length;i++)
			{
				if (fee_arr[i]!="")
				{
					fee_param_arr = fee_arr[i].split('`');

					//alert(fee_arr[i]);
					ser_kind = fee_param_arr[0];
					id_text = fee_param_arr[1];
					name_text = fee_param_arr[2];
					value_text = fee_param_arr[3];
					favour_text = fee_param_arr[4];
					reason_text = fee_param_arr[5];
					if_change = fee_param_arr[6];
					if (if_change == "")
					{	if_change = "0";}

					if (id_text!="" && name_text!="" && value_text!="")
					{

						fee_info += "<tr class='newtrType'><td width='25%' bordercolor='#A2BEE1' bgcolor='#A2BEE1'><p align='center'>"+name_text+"</p></td>";

						fee_info += "<td width='25%' bordercolor='#E6E6E6' bgcolor='#E6E6E6'><p align='center'>";
						fee_info += "<input type='text'  name='fee_num' class='textType' maxlength='13' value ='"+value_text+"' readOnly=true ></input></td>";
						fee_info += "</p></td>";

					
						if (favour_text == "")
						{
							favour_text = parseFloat(0.00 + 1 - 1);
						}
						if (reason_text == "")
						{
							reason_text = "";
						}

						if ((Math.abs(value_text) >= Math.abs(favour_text)) && if_change == "0")
						{
							fee_info += "<td width='25%' bordercolor='#E6E6E6' bgcolor='#E6E6E6'><p align='center'>";
							fee_info += "<input type='text'  name='favour_sum' class='textType' maxlength='13' onKeyPress='return feeCheck(event,this)' onblur='if (check_decimal_number(this,0,"+value_text+",3)){refresh_fee_string(this);fee_current(this.form);}' value = "+favour_text+"></input></td>";

							//fee_info += "<script>refresh_fee_string(document.forms[0].favour_sum["+fee_count+"]);</script>";

							fee_info += "</p></td>";

							fee_info += "<td width='25%' bordercolor='#E6E6E6' bgcolor='#E6E6E6' height='0'><p align='center'>";
							fee_info += "<input type='text'  name='favour_reason' class='textType' maxlength='30' value = '"+reason_text+"'></input>";
							fee_info += "</p></td>";
						}
						else
						{
							fee_info += "<td width='25%' bordercolor='#E6E6E6' bgcolor='#E6E6E6'><p align='center'>";
							fee_info += "<input type='text'  name='favour_sum' class='textType' disabled=true maxlength='13' onKeyPress='return feeCheck(event,this)' onblur='if (check_decimal_number(this,0,"+value_text+",3)){refresh_fee_string(this);fee_current(this.form);}' value = "+favour_text+"></input></td>";

							//fee_info += "<script>refresh_fee_string(document.forms[0].favour_sum["+fee_count+"]);</script>";

							fee_info += "</p></td>";

							fee_info += "<td width='25%' bordercolor='#E6E6E6' bgcolor='#E6E6E6' height='0'><p align='center'>";
							fee_info += "<input type='text'  name='favour_reason' class='textType' disabled=true maxlength='30' value = '"+reason_text+"'></input>";
							fee_info += "</p></td>";
						}

						fee_info += "</tr>";

						fee_arr_str = ser_kind+"`"+id_text+"`"+name_text+"`"+value_text+"`";

						//fee_arr_info += "fee_str_arr["+fee_count+"] = '"+fee_arr_str+"';";
						fee_arr_info[fee_count] = fee_arr_str;

						fee_count++;
					}
					ser_kind = "";
					id_text = "";
					name_text = "";
					value_text = "";
					favour_text = "";
					reason_text = "";
					if_change = "";
				}
			}
		}//有费用
	}

	fee_info += "<tr class='newtrType'>";
	fee_info += "<td width='25%' bordercolor='#A2BEE1' bgcolor='#A2BEE1' height='0'><p align='center'>合计</p></td>";
	fee_info += "<td width='25%' bordercolor='#E6E6E6' bgcolor='#E6E6E6' height='0' colspan='3'>";
	fee_info += "<input type='text' name='total_fee' class='' readOnly=true style='font-size:12px; background-color: #E6E6E6; border-style: solid;border-color:#E6E6E6' value=''></input></td>";
	fee_info += "</tr>";
	fee_info += "</table>";

	if (if_echo == "1")
	{
		
		window.parent.frames[0].tabset1_tab5.all("fee_div").innerHTML=fee_info;
		window.parent.frames[0].fee_current();
		window.parent.frames[0].fee_str_arr = fee_arr_info;		
	}
}


