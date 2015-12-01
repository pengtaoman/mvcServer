/**
 * <p>Name: nas_generate_fee.js</p>
 * <p>Description: 费用生成函数</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/

//alert('nas_generate_fee.js引用成功');
function nas_generate_fee(xml_info,this_fild)
{
	var source = document.XMLDocument;
	var fee_info = "";
	
	var mark = xml_info; 
	var node=source.selectNodes(mark);	
	var text = "";
	
	var fee_id = xml_info + '/feeid';
	var fee_kind = xml_info + '/feekind';
	var fee_name = xml_info + '/feename';
	var fee_value = xml_info + '/feevalue';
	var fee_favour = xml_info + '/feefavour';
	var favour_reason = xml_info + '/favoureason';
	var fee_id_i=source.selectNodes(fee_id);
	var fee_kind_i=source.selectNodes(fee_kind);
	var fee_name_i=source.selectNodes(fee_name);
	var fee_value_i=source.selectNodes(fee_value);
	var fee_favour_i=source.selectNodes(fee_favour);
	var favour_reason_i=source.selectNodes(favour_reason);
	var id_text = "";
	var kind_text = "";
	var name_text = "";
	var value_text = "";
	var favour_text = "";
	var reason_text = "";
	
	fee_str_arr = new Array();
	
	document.write("<input type='hidden' name='Fee_str'></input>");
	document.write("<input type='hidden' name='fee_num'></input>");
	document.write("<input type='hidden' name='favour_sum'></input>");
	document.write("<input type='hidden' name='favour_reason'></input>");
	
	document.write("<table border='0' cellpadding='1' cellspacing='2' width='100%' bgcolor='#FFFFFF' >");
	document.write("<tr class='trType'><td width='100%' bordercolor='#E6E6E6' bgcolor='#E6E6E6' colspan='4'><p align='center'>费用信息</p></td></tr>");
	document.write("<tr class='trType'><td width='25%' bordercolor='#A2BEE1' bgcolor='#A2BEE1'><p align='center'>费用名称(元)</p></td>");
	document.write("<td width='25%' bordercolor='#A2BEE1' bgcolor='#A2BEE1'><p align='center'>费用金额(元)</p></td>");
	document.write("<td width='25%' bordercolor='#A2BEE1' bgcolor='#A2BEE1'><p align='center'>优惠金额(元)</p></td>");
	document.write("<td width='25%' bordercolor='#A2BEE1' bgcolor='#A2BEE1'><p align='center'>优惠原因</p></td></tr>");
	
	var temp = "";	
	var fee_count = 1;
	var fee_arr_str = "";
	
	for(text=node.nextNode();text;text=node.nextNode())
	{
		//temp=text.text;
		//alert(temp);
		var id=fee_kind_i.nextNode();
		var kind=fee_kind_i.nextNode();
		var name=fee_name_i.nextNode();
		var value=fee_value_i.nextNode();
		var favour=fee_favour_i.nextNode();
		var reason=favour_reason_i.nextNode();
		if (id)
		{	id_text=id.text;	}
		if (kind)
		{	kind_text=kind.text;	}
		if (name)
		{	name_text=name.text;	}
		if (value)
		{	value_text=value.text;	}
		if (favour)
		{	favour_text=favour.text;	}
		if (reason)
		{	reason_text=reason.text;	}
		
		if (id_text!="" && name_text!="" && value_text!="")
		{
			document.write("<tr class='trType'><td width='25%' bordercolor='#A2BEE1' bgcolor='#A2BEE1'><p align='center'>"+name_text+"</p></td>");
			
			document.write("<td width='25%' bordercolor='#A2BEE1' bgcolor='#A2BEE1'><p align='center'>");			
			document.write("<input type='text'  name='fee_num' class='textType' maxlength='13' value ='"+value_text+"' readOnly=true ></input></td>");
			document.write("</p></td>");			
			
			refresh_fee_string(document.forms[0].fee_num[fee_count]);
			
			
			if (favour_text == "")
			{
				favour_text = parseFloat(0.00 + 1 - 1);
			}
			if (reason_text == "")
			{
				reason_text = "";
			}
			
			if (Math.abs(value_text) >= Math.abs(favour_text))
			{
				document.write("<td width='25%' bordercolor='#A2BEE1' bgcolor='#E6E6E6'><p align='center'>");
				document.write("<input type='text'  name='favour_sum' class='textType' maxlength='13' onKeyPress='return feeCheck(event,this)' onblur='if (check_decimal_number(this,0,"+value_text+",3)){refresh_fee_string(this);fee_current(this.form);}' value = "+favour_text+"></input></td>");
				refresh_fee_string(document.forms[0].favour_sum[fee_count]);
				document.write("</p></td>");

				document.write("<td width='25%' bordercolor='#E6E6E6' bgcolor='#E6E6E6' height='0'><p align='center'>");
				document.write("<input type='text'  name='favour_reason' class='textType' maxlength='30' value = '"+reason_text+"'></input>");
				document.write("</p></td>");
			}
			else
			{
				document.write("<td width='25%' bordercolor='#A2BEE1' bgcolor='#E6E6E6'><p align='center'>");
				document.write("<input type='text'  name='favour_sum' class='textType' disabled=true maxlength='13' onKeyPress='return feeCheck(event,this)' onblur='if (check_decimal_number(this,0,"+value_text+",3)){refresh_fee_string(this);fee_current(this.form);}' value = "+favour_text+"></input></td>");
				refresh_fee_string(document.forms[0].favour_sum[fee_count]);
				document.write("</p></td>");

				document.write("<td width='25%' bordercolor='#E6E6E6' bgcolor='#E6E6E6' height='0'><p align='center'>");
				document.write("<input type='text'  name='favour_reason' class='textType' disabled=true maxlength='30' value = '"+reason_text+"'></input>");
				document.write("</p></td>");
			}
			
			document.write("</tr>");
			
			fee_arr_str = id_text+"`"+name_text+"`";
			fee_str_arr[fee_count] = fee_arr_str;
			fee_count++;		
			
		}
		id="";
		kind="";
		name="";
		value="";
		favour="";
		reason="";
	}
	
	document.write("<tr class='trType'>");
	document.write("<td width='25%' bordercolor='#E6E6E6' bgcolor='#E6E6E6' height='0'>合计</td>");
	document.write("<td width='25%' bordercolor='#E6E6E6' bgcolor='#E6E6E6' height='0' colspan='3'>");
	document.write("<input type='text' name='total_fee' class='' readOnly=true style='background-color: #E6E6E6; border-style: solid;border-color:#E6E6E6' value=''></input></td>");
	document.write("</tr>");
	
	fee_current(document.forms[0]);
	
	document.write("</table>");

}


/*
function refresh_fee_string(the_text)
{
	var the_value = the_text.value;
	
	if (the_value == null || the_value == '')
	{
		the_value = "0.00";
	}
	else
	{
		var xiaoshu_is_there = the_value.indexOf(".");
		if (xiaoshu_is_there != -1)
		{
			var xiaoshu = the_value.substr(xiaoshu_is_there,the_value.length);
		}
		else
		{
			var xiaoshu = "";
		}
		if (xiaoshu.length == 0)
		{	
			the_value = the_value + ".00";
		}
		if (xiaoshu.length == 1)
		{	
			the_value = the_value + "00";
		}
		if (xiaoshu.length == 2)
		{	
			the_value = the_value + "0";
		}
		if (xiaoshu.length > 3)
		{	
			var duoyu_xiaoshu = xiaoshu_is_there + 3;
			var four_or_five = the_value.substr(duoyu_xiaoshu,1);
			if (four_or_five > 4)
			{
				the_value = the_value.substr(0,duoyu_xiaoshu);
				the_value = the_value*1 + 0.01;
			}
			else
			{
				the_value = the_value.substr(0,duoyu_xiaoshu);
			}
		}
	}
	
	the_text.value = the_value;
	
}



function check_decimal_number(form_field,method,limit_top,decimal)
{
 	var num_expr = /^[\d\.]+$/;
 	var matchArray = form_field.value.match(num_expr);
 	
 	var other_ss = "此处只能输入数字和小数点！"; 
 	var too_big = "费用" + "的值过大！不能超过"+ limit_top + "！";
 	var de_err = "费用的" + "小数点后的精度为2位！";
 	var err_format = "非法的小数格式！";
 	var sub_s;
 	var first_point;
 	var next_point;		
 	
	if (form_field.value == ".")
	{		if (method == 0)
			{	alert("错误的数字格式");
				form_field.select();
				return false;
			}
			else {return other_ss;}
	}
	else if (form_field.value != null && form_field.value != "")
	{				
		if (matchArray == null)
		{	if (method == 0)
			{	alert(other_ss);    
				form_field.focus();
				form_field.select();
				return false;
			}
			else {return other_ss;}
		}
		else
		{	var v_text = form_field.value;
			if (v_text != 0 && v_text!= '0' && v_text!= null)
			{  
				if(v_text > limit_top)
				{	if (method == 0)
					{	alert(too_big);    
						form_field.focus();
						form_field.select();
						return false;
					}
					else {return too_big;}
				}
			}
			first_point = v_text.indexOf('.');
			if (first_point != -1)
			{	sub_s = v_text.substr(first_point);
				if (sub_s.length > decimal)
				{
					if (method == 0)
					{	alert(de_err);
						form_field.focus();
						form_field.select();
						return false;
					}
					else {return de_err;}
				}
				next_point = sub_s.substr(1);
				if (next_point.indexOf('.') != -1)
				{
					if (method == 0)
					{	alert(err_format);
						form_field.focus();
						form_field.select();
						return false;
					}
					else {return err_format;}
				}
			}
			if (method == 0)
			{return true;}
			else {return "";}
		}   
	}
	else if (form_field.value == null || form_field.value == "")
	{
		form_field.value = 0;
		if (method == 0)
		{return true;}
		else {return "";}
	}
}



function fee_current()
{
	var sum_fee = 0;
	var the_count = 0;
	
	if(document.forms[0].fee_num)
	{	
		if (document.forms[0].fee_num.length)
		{	var sum_leng = document.forms[0].fee_num.length;}
		else
		{	var sum_leng = 0;}
		
		if (document.forms[0].favour_sum.length)
		{	var fav_leng = document.forms[0].favour_sum.length;}
		else
		{	var fav_leng = 0;}
		
		//if (sum_leng>0)
		//{
			//for (var j=0;j<sum_leng;j++)
			//{
				alert(document.forms[0].fee_num[j].name+'----'+document.forms[0].fee_num[j].value);
			//}
		//}
		
		//if (fav_leng>0)
		//{
			//for (var j=0;j<fav_leng;j++)
			//{
				//alert(document.forms[0].favour_sum[j].name+'----'+document.forms[0].favour_sum[j].value);
			//}
		//}
		
		
		if (sum_leng > fav_leng)
		{	the_count = fav_leng;}
		else
		{	the_count = sum_leng;}
		
		if (the_count > 1)
		{
			for (var i=0;i<the_count;i++)
			{
				//alert(i+'************');
				//alert(document.forms[0].fee_num[i].value+'------------'+document.forms[0].favour_sum[i].value);
				sum_fee += 100 + document.forms[0].fee_num[i].value*1 - document.forms[0].favour_sum[i].value*1 - 100;
			}
		}
		else
		{
			sum_fee += 100 + document.forms[0].fee_num.value*1 - document.forms[0].favour_sum.value*1 - 100;			
		}
		
		
	}
	//if(document.forms[0].preserve6)
	//{
		//sum_fee += 100 + document.forms[0].preserve6.value*1 -100;			
	//}
	//if(document.forms[0].pre_paid_fee)
	//{
		//sum_fee += 100 + document.forms[0].pre_paid_fee.value*1 -100;			
	//}
	
	document.forms[0].total_fee.value = sum_fee;		
	
	refresh_fee_string(document.forms[0].total_fee);
}


function feeCheck(event)
{
	var other_ss = "此处只能输入数字和小数点！"; 
	var ss=event.keyCode;
	if(ss>=32 && ss<=45||ss==47) 
	{	alert(other_ss);
	    return false;
	}
	else if(ss>=58 && ss<=127) 
	{	alert(other_ss);
		return false;
	}
	return true;
}
*/



