/**
 * <p>Name: nas_on_lost.js</p>
 * <p>Description: 提交前校验函数</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/
//alert('nas_on_lost.js引用成功');
/**
参数：the_m_name：被校验控件供提示的名字；
this_field：被校验控件；
min_length：小数精确度；-1 时不限制 -2:要么是空，要么和最大值一致
max_length：最大值；-1 时不限制
next_kind：校验类型：
    0:不校验；
1:整数校验
2:小数校验
3:数字和逗号校验
4:数字和横线校验
5:数字和英文字符校验
6:联系电话校验
return_kind：错误返回类型；0:返回真假；1:返回消息串
*/
function nas_on_lost(the_m_name,this_field,min_length,max_length,next_kind,return_kind)
{
    if (typeof(this_field)!='undefined')
	{
        if(next_kind == 2)	//如果是校验费用(小数校验)，转走
	    {
	    	check_decimal_number(this_field,0,999999999.99,3);
	    }
        var the_form_name = this_field.form.name;
	    var the_field_name = this_field.name;
	    var do_focus="document."+the_form_name+"."+the_field_name+".focus()";
	    var do_select="document."+the_form_name+"."+the_field_name+".select()";
	    var the_field_length = this_field.value.length;
	   	//alert(the_m_name+this_field.value);
	   	//alert(no_err_message+"on_lost");
	    if(no_err_message==true)
	    {
    		if (min_length == -2 || min_length == "-2")
		    {
		    	if (the_field_length != 0)
		    	{
		    		if(next_kind == 4 || next_kind == "4")
		    	    	var the_message = the_m_name+"格式不正确，应符合'YYYY-MM-DD'格式"
		    	    else
		    			var the_message = the_m_name+"长度不正确！";
		    		//alert(max_length);
		    		if (the_field_length != max_length && max_length != -1)
		    		{
			    		if (this_field.disabled==false)
			    		{
				    		eval(do_focus);
					       	if(this_field.type=="text"&&this_field.value!="")
					       	{	eval(do_select);   	}
					    }		       	
				       	if (return_kind == 0 || return_kind == "0")
					    {		
					    	no_err_message=false;
					    	alert(the_message);	 
					    	no_err_message=true;   	
					    	return false;
					    }
					    if (return_kind == 1 || return_kind == "1")
					    {	return the_message;	    }
					}
		    	}
		    }
		    if (the_field_length < min_length)
		    {
			    if (this_field.value == null || this_field.value == "")
				{	var the_message = the_m_name+"不能为空！";		}
				else
				{	
					if(next_kind == 4 || next_kind == "4")
		    	    var the_message = the_m_name+"格式不正确，应符合'YYYY-MM-DD'格式"
		    	    else
					var the_message = the_m_name+"长度不能小于"+min_length+"位！";		
				}
			    if (this_field.disabled==false)
		    	{
			    	eval(do_focus);
				   	if(this_field.type=="text"&&this_field.value!="")
				   	{	eval(do_select);   	}
				}
		       	if (return_kind == 0 || return_kind == "0")
			    {	no_err_message=false;
			    	alert(the_message);
			    	no_err_message=true;	    	
			    	return false;
			    }
			    if (return_kind == 1 || return_kind == "1")
			    {	return the_message;	    }
			}
			if ((the_field_length > max_length) && (max_length != -1 || max_length != "-1"))
		    {
			    var the_message = the_m_name+"长度不能超过"+max_length+"位！";
			    if (this_field.disabled==false)
		    	{
			    	eval(do_focus);
				  	if(this_field.type=="text"&&this_field.value!="")
				   	{	eval(do_select);   	}
				}
		       	if (return_kind == 0 || return_kind == "0")
			    {	no_err_message=false;
			    	alert(the_message);
			    	no_err_message=true;
			    	return false;
			    }
			    if (return_kind == 1 || return_kind == "1")
			    {	return the_message;	    }
			}
	    	if (this_field.value != null && this_field.value != "")
			{
			    if (next_kind == 1 || next_kind == "1")
			    {
				    var decimal_expr = /^[\d]+$/;
			 		var match_array = this_field.value.match(decimal_expr);
			 		if (match_array == null)
			 		{	
			 			var the_message = the_m_name+"只能输入数字！";
			 			if (this_field.disabled==false)
			    		{
				    		eval(do_focus);
					       	if(this_field.type=="text"&&this_field.value!="")
					       	{	eval(do_select);   	}
					    }
					    if (return_kind == 0 || return_kind == "0")
					    {	
					    	alert(the_message);
					    	return false;
					    }
					    if (return_kind == 1 || return_kind == "1")
					    {	return the_message;			    }
			 		}
				}
				if (next_kind == 3 || next_kind == "3")
			    {
				    var decimal_expr = /^[\d\,]+$/;
			 		var match_array = this_field.value.match(decimal_expr);
			 		if (match_array == null)
			 		{	
			 			var the_message = the_m_name+"只能输入数字和逗号！";
			 			if (this_field.disabled==false)
			    		{
				    		eval(do_focus);
					       	if(this_field.type=="text"&&this_field.value!="")
					       	{	eval(do_select);   	}
					    }
					    if (return_kind == 0 || return_kind == "0")
					    {	
					    	alert(the_message);
					    	return false;
					    }
					    if (return_kind == 1 || return_kind == "1")
					    {	return the_message;			    }
			 		}
				}
				if (next_kind == 4 || next_kind == "4")
			    {
			    	
				    var decimal_expr = /^[\d\-]+$/;
			 		var match_array = this_field.value.match(decimal_expr);
			 		if (match_array == null)
			 		{	
			 			var the_message = the_m_name+"格式无效，请确认符合'YYYY-MM-DD'格式！";
			 			if (this_field.disabled==false && (return_kind==0 || return_kind == "0"))
			    		{
				    		eval(do_focus);
					       	if(this_field.type=="text"&&this_field.value!="")
					       	{	eval(do_select);   	}
					    }
					    if (return_kind == 0 || return_kind == "0")
					    {	
					    	alert(the_message);
					    	return false;
					    }
					    if (return_kind == 1 || return_kind == "1")
					    {	return the_message;			    }
			 		}
				 	var v_text = this_field.value;
				 	
				    var the_year = v_text.substr(0,4);
				 	var point_year = v_text.substr(4,1);
				 	var the_month = v_text.substr(5,2);
				 	var point_month = v_text.substr(7,1);
				 	var the_day = v_text.substr(8,2);
				 	var the_other = v_text.substr(10);
				 	
				 	if (v_text != "" && v_text != null && max_length!=30)
				 	{			
				 	
				 		if ((the_year.indexOf('-') != -1 || the_month.indexOf('-') != -1) || (the_day.indexOf('-') != -1 || point_month != "-") || (point_year != "-" || the_other != ""))
				 		{	var the_message = the_m_name+"格式无效，请确认符合'YYYY-MM-DD'格式！";
				 			if (this_field.disabled==false)
				    		{
					    		eval(do_focus);
						       	if(this_field.type=="text"&&this_field.value!="")
						       	{	eval(do_select);   	}
						    }
						    if (return_kind == 0 || return_kind == "0")
						    {	
						    	alert(the_message);
						    	return false;
						    }
						    if (return_kind == 1 || return_kind == "1")
						    {	return the_message;			    }
				 		}
				 		year_int=parseInt(the_year);
				 	    month_float=parseFloat(the_month);
				 		day_float=parseFloat(the_day);
				 		month_index = month_float-1;
				 		
				 		if((year_int%4==0)&&(year_int%100!=0) || (year_int%400==0)) 
				 		{
				 		    var day_number=new Array(31,29,31,30,31,30,31,31,30,31,30,31);
				 		}
				 		else
				 		{
				 		    var day_number=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
				 		}
				 		if(the_year<"1900")
				 		{
				 				var the_message = the_m_name+"的年份不应小于1900！";
					 			if (this_field.disabled==false)
					    		{
						    		eval(do_focus);
							       	if(this_field.type=="text"&&this_field.value!="")
							       	{	eval(do_select);   	}
							    }
							    if (return_kind == 0 || return_kind == "0")
							    {	
							    	alert(the_message);
							    	return false;
							    }
							    if (return_kind == 1 || return_kind == "1")
							    {	return the_message;			    }
				 		}
				 		if(month_float<1 || month_float>12) 
				 		{
				 		    	var the_message = the_m_name+"的月份不正确！";
					 			if (this_field.disabled==false)
					    		{
						    		eval(do_focus);
							       	if(this_field.type=="text"&&this_field.value!="")
							       	{	eval(do_select);   	}
							    }
							    if (return_kind == 0 || return_kind == "0")
							    {	
							    	alert(the_message);
							    	return false;
							    }
							    if (return_kind == 1 || return_kind == "1")
							    {	return the_message;			    }
				 		}
				 		else if(day_float<1 || day_float>day_number[month_index])
				 		{
				 		    	var the_message = the_m_name+"的日期部分不正确！";
					 			if (this_field.disabled==false)
					    		{
						    		eval(do_focus);
							       	if(this_field.type=="text"&&this_field.value!="")
							       	{	eval(do_select);   	}
							    }
							    if (return_kind == 0 || return_kind == "0")
							    {
							    	alert(the_message);
							    	return false;
							    }
							    if (return_kind == 1 || return_kind == "1")
							    {	return the_message;			    }
				 		}
				 	}
				}		
				if(next_kind ==5 || next_kind == "5")
				{
					var decimal_expr = /^[0-9a-zA-Z]+$/;
					
					var match_array = this_field.value.match(decimal_expr);
					if(match_array==null)
					{
						var message=the_m_name+"不正确";
						if (this_field.disabled==false)
						{
				    		eval(do_focus);
					       	if(this_field.type=="text"&&this_field.value!="")
					       	{	eval(do_select);   	}
					    }
					    if (return_kind == 0 || return_kind == "0")
					    {	
					    	no_err_message=false;
					    	alert(message);
					    	no_err_message=true;
					    	return false;
					    }
					    if (return_kind == 1 || return_kind == "1")
					    {	return message;			    }
					}	
				}//5类型
		
				if(next_kind ==6 || next_kind == "6")
				{
					var decimal_expr = /^((\(\d+\)){0,1}(\-{0,1}\d+\-{0,1}\d+\-{0,1}\d+)\,{0,1})*$/;
					var match_array = this_field.value.match(decimal_expr);
					if(match_array==null)
					{
						var message="格式不正确，应符合标准格式，例如完整的格式为:(86)-010-88888888-888";
						if (this_field.disabled==false)
			    		{
				    		eval(do_focus);
					       	if(this_field.type=="text"&&this_field.value!="")
					       	{	eval(do_select);   	}
					    }
					    if (return_kind == 0 || return_kind == "0")
					    {	
					    	alert(message);
					    	return false;
					    }
					    if (return_kind == 1 || return_kind == "1")
					    {	return message;			    }
					}		
				}
			}
		}
		if (return_kind == 0 || return_kind == "0")
		{	  	return true;	}
		if (return_kind == 1 || return_kind == "1")
		{	return "";			    }
	}
	else
	{
		alert("在Lost校验中对控件"+this_field+"的命名指定不正确；对"+ this_field +"的nas_on_lost没有进行。请确认。");
		return true;
	}
	
}
/*****************************************提交前再次校验*****************************************/
//next_kind = 0:不校验；
//next_kind = 1:整数校验
//next_kind = 2:小数校验 // min_length：小数精确度，max_length：最大值
//next_kind = 3:数字和逗号校验
//next_kind = 4:数字和横线校验
//next_kind = 5:数字和英文字符校验
//next_kind = 6:联系电话校验
//min_length :最小长度 = -1 时不限制 -2:要么是空，要么和最大值一致	(paper_kind.maxLength设为max_length)
//min_length :最大长度 = -1 时不限制
//return_kind = 0:返回真假
//return_kind = 1:返回消息串

