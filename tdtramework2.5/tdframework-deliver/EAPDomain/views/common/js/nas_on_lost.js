/**
 * <p>Name: nas_on_lost.js</p>
 * <p>Description: �ύǰУ�麯��</p>
 * <p>AppArea: Ӫҵϵͳ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/
//alert('nas_on_lost.js���óɹ�');
/**
������the_m_name����У��ؼ�����ʾ�����֣�
this_field����У��ؼ���
min_length��С����ȷ�ȣ�-1 ʱ������ -2:Ҫô�ǿգ�Ҫô�����ֵһ��
max_length�����ֵ��-1 ʱ������
next_kind��У�����ͣ�
    0:��У�飻
1:����У��
2:С��У��
3:���ֺͶ���У��
4:���ֺͺ���У��
5:���ֺ�Ӣ���ַ�У��
6:��ϵ�绰У��
return_kind�����󷵻����ͣ�0:������٣�1:������Ϣ��
*/
function nas_on_lost(the_m_name,this_field,min_length,max_length,next_kind,return_kind)
{
    if (typeof(this_field)!='undefined')
	{
        if(next_kind == 2)	//�����У�����(С��У��)��ת��
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
		    	    	var the_message = the_m_name+"��ʽ����ȷ��Ӧ����'YYYY-MM-DD'��ʽ"
		    	    else
		    			var the_message = the_m_name+"���Ȳ���ȷ��";
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
				{	var the_message = the_m_name+"����Ϊ�գ�";		}
				else
				{	
					if(next_kind == 4 || next_kind == "4")
		    	    var the_message = the_m_name+"��ʽ����ȷ��Ӧ����'YYYY-MM-DD'��ʽ"
		    	    else
					var the_message = the_m_name+"���Ȳ���С��"+min_length+"λ��";		
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
			    var the_message = the_m_name+"���Ȳ��ܳ���"+max_length+"λ��";
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
			 			var the_message = the_m_name+"ֻ���������֣�";
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
			 			var the_message = the_m_name+"ֻ���������ֺͶ��ţ�";
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
			 			var the_message = the_m_name+"��ʽ��Ч����ȷ�Ϸ���'YYYY-MM-DD'��ʽ��";
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
				 		{	var the_message = the_m_name+"��ʽ��Ч����ȷ�Ϸ���'YYYY-MM-DD'��ʽ��";
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
				 				var the_message = the_m_name+"����ݲ�ӦС��1900��";
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
				 		    	var the_message = the_m_name+"���·ݲ���ȷ��";
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
				 		    	var the_message = the_m_name+"�����ڲ��ֲ���ȷ��";
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
						var message=the_m_name+"����ȷ";
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
				}//5����
		
				if(next_kind ==6 || next_kind == "6")
				{
					var decimal_expr = /^((\(\d+\)){0,1}(\-{0,1}\d+\-{0,1}\d+\-{0,1}\d+)\,{0,1})*$/;
					var match_array = this_field.value.match(decimal_expr);
					if(match_array==null)
					{
						var message="��ʽ����ȷ��Ӧ���ϱ�׼��ʽ�����������ĸ�ʽΪ:(86)-010-88888888-888";
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
		alert("��LostУ���жԿؼ�"+this_field+"������ָ������ȷ����"+ this_field +"��nas_on_lostû�н��С���ȷ�ϡ�");
		return true;
	}
	
}
/*****************************************�ύǰ�ٴ�У��*****************************************/
//next_kind = 0:��У�飻
//next_kind = 1:����У��
//next_kind = 2:С��У�� // min_length��С����ȷ�ȣ�max_length�����ֵ
//next_kind = 3:���ֺͶ���У��
//next_kind = 4:���ֺͺ���У��
//next_kind = 5:���ֺ�Ӣ���ַ�У��
//next_kind = 6:��ϵ�绰У��
//min_length :��С���� = -1 ʱ������ -2:Ҫô�ǿգ�Ҫô�����ֵһ��	(paper_kind.maxLength��Ϊmax_length)
//min_length :��󳤶� = -1 ʱ������
//return_kind = 0:�������
//return_kind = 1:������Ϣ��

