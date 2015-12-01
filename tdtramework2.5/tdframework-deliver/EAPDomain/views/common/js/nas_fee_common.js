/**
 * <p>Name: nas_fee_common.js</p>
 * <p>Description: 费用校验函数</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/

//alert('nas_fee_common.js引用成功');
function refresh_fee_string(the_text)
{
	if (typeof(the_text)!='undefined')
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
				/*var duoyu_xiaoshu = xiaoshu_is_there + 3;
				var four_or_five = the_value.substr(duoyu_xiaoshu,1);
				if (four_or_five > 4)
				{
					the_value = the_value.substr(0,duoyu_xiaoshu);
					the_value = the_value*1 + 0.01;
				}
				else
				{
					the_value = the_value.substr(0,duoyu_xiaoshu);
				}*/
				the_value = (Math.round(the_value*100))/100;
			}
		}
	
		the_text.value = the_value;
	}
	else
	{
		alert("在格式化费用时对控件"+the_text+"的命名指定不正确；对"+ the_text +"的格式化没有进行。请确认。");
		return true;
	}

}



function check_decimal_number(form_field,method,limit_top,decimal)
{
	if (typeof(form_field)!='undefined' )
	{
		if (form_field.disabled==false)
		{
			
			var num_expr = /^[\d\.]+$/;
			var matchArray = form_field.value.match(num_expr);
		
			var other_ss = "此处只能输入数字和小数点！";
			var too_big = "数字的值过大！不能超过"+ limit_top + "！";
			var de_err = "数字的小数点后的精度为"+decimal+"位！";
			var err_format = "非法的小数格式！";
			var sub_s;
			var first_point;
			var next_point;
		
			if (form_field.value == ".")
			{		if (method == 0)
					{	alert("错误的数字格式");
						if (!form_field.disabled)
						{
							form_field.select();
						}
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
						//form_field.select();
						return false;
					}
					else {return other_ss;}
				}
				else
				{	var v_text = form_field.value;
					if (v_text != 0 && v_text!= '0' && v_text!= null)
					{
						if(v_text/1 > limit_top/1)
						{	if (method == 0)
							{	alert(too_big);
								form_field.focus();
								//form_field.select();
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
								//form_field.select();
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
								//form_field.select();
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
				form_field.value = '';
				if (method == 0)
				{return true;}
				else {return "";}
			}
		}
	}
	else
	{
		alert("在小数校验时对控件"+form_field+"的命名指定不正确；对"+ form_field +"的校验没有进行。请确认。");
		return true;
	}
}



function fee_current()
{
	var sum_fee = 0;
	sum_fee = parseFloat(sum_fee);
	var the_count = 0;
	
	var sum_temp = 0;
	var favour_temp = 0;

	if (typeof(document.forms[0].fee_num)!='undefined')
	{
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
	
			/*if (sum_leng>0)
			{
				for (var j=0;j<sum_leng;j++)
				{
					alert(document.forms[0].fee_num[j].name+'----'+document.forms[0].fee_num[j].value);
				}
			}
	
			if (fav_leng>0)
			{
				for (var j=0;j<fav_leng;j++)
				{
					alert(document.forms[0].favour_sum[j].name+'----'+document.forms[0].favour_sum[j].value);
				}
			}*/
	
	
			if (sum_leng > fav_leng)
			{	the_count = fav_leng;}
			else
			{	the_count = sum_leng;}
	
			if (the_count > 1)
			{
				for (var i=0;i<the_count;i++)
				{
					//alert(i+'************');
					if (document.forms[0].fee_num[i].value == "" || document.forms[0].fee_num[i].value == null)
					{
						document.forms[0].fee_num[i].value = 0;
					}
					if (document.forms[0].favour_sum[i].value == "" || document.forms[0].favour_sum[i].value == null)
					{
						document.forms[0].favour_sum[i].value = 0;
					}
					
					//sum_temp = Math.floor(parseFloat(document.forms[0].fee_num[i].value)*100);
					//favour_temp = Math.floor(parseFloat(document.forms[0].favour_sum[i].value)*100);
					sum_temp = parseFloat(document.forms[0].fee_num[i].value);
					favour_temp = parseFloat(document.forms[0].favour_sum[i].value);
					
					//alert((parseFloat(document.forms[0].fee_num[i].value)*100) + "--0");
					
					//sum_fee +=  (sum_temp - favour_temp)/100;
					sum_fee +=  (sum_temp - favour_temp);
					//alert(sum_fee+"--1");
					sum_fee = parseFloat(sum_fee);
					//alert(sum_fee+"--2");
				}
			}
			else
			{
				if (document.forms[0].fee_num.value == "" || document.forms[0].fee_num.value == null)
				{
					document.forms[0].fee_num.value = 0;
				}
				if (document.forms[0].favour_sum.value == "" || document.forms[0].favour_sum.value == null)
				{
					document.forms[0].favour_sum.value = 0;
				}
				
				//sum_temp = Math.floor(parseFloat(document.forms[0].fee_num.value*100));
				//favour_temp = Math.floor(parseFloat(document.forms[0].favour_sum.value*100));
				
				sum_temp = parseFloat(document.forms[0].fee_num.value);
				favour_temp = parseFloat(document.forms[0].favour_sum.value);
				
				//sum_fee +=  (sum_temp - favour_temp)/100;
				sum_fee +=  (sum_temp - favour_temp);
				
				sum_fee = parseFloat(sum_fee);
				
			}
	
	
		}
	}
	
	/*if(document.forms[0].preserve6)
	{
		sum_fee += 100 + document.forms[0].preserve6.value*1 -100;
	}
	if(document.forms[0].pre_paid_fee)
	{
		sum_fee += 100 + document.forms[0].pre_paid_fee.value*1 -100;
	}*/

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




