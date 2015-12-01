/**
 * <p>Name: nas_check_iden.js</p>
 * <p>Description: 公用证件类型校验</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author liyj
 * @version 1.0
**/

//alert('nas_check_iden.js引用成功');
//从XML里查询查询证件类型定义的长度(如果长度是0则不限制！)和是否允许输入数字
iden_length = new Array();			//各个证件类型允许输入的最大长度
iden_method = new Array();			//各个证件类型是否允许输入字符，0:不允许输入字符(18位身份证的最好一位是可以输入字符的)，1:允许输入字符

identity_current_value = 1;		//当前证件类型的值
identity_current_text = "";		//当前证件类型的显示值


iden_check_is_ok = "";	//是否校验成功，给担保人用

//适用于营业的程序生成的证件类型的xml数据格式
function nas_check_iden(xml_info)
{
	var source = document.XMLDocument;
	
	var mark = xml_info + "/option";	
	var node = source.selectNodes(mark);
	var info = "";
	var text = "";
	var arr_temp = new Array();
	
	for(info = node.nextNode(); info; info = node.nextNode())
	{
		text = info.text;	
		arr_temp = text.split(' ');
		if (arr_temp[0]!="")
		{
			iden_length[arr_temp[0]] = arr_temp[2];
			iden_method[arr_temp[0]] = arr_temp[3];
		}
	}
}

//适用于crm客户维系生成的证件类型的xml数据格式
//xml_info:证件类型所在的xml节点位置，从根节点开始写，例如：root/info/certType
function nas_check_iden_retain(xml_info){
    var source = document.XMLDocument;
    
    var mark = xml_info + "/option";    
    var node = source.selectNodes(mark);
    
    for(info = node.nextNode(); info; info = node.nextNode())
    {
        var value = info.selectNodes("value").nextNode().text;
        var text = info.selectNodes("caption").nextNode().text;
        var maxLeng = "";
        var ifChar = "";
        if(info.selectNodes("Preserve1").nextNode() != null)
            maxLeng = info.selectNodes("Preserve1").nextNode().text;
        else
            maxLeng = "0";
        if(info.selectNodes("Preserve2").nextNode() != null)
            ifChar = info.selectNodes("Preserve2").nextNode().text;
        else
            ifChar = "1";
        if (value!="")
        {
            iden_length[value] = maxLeng;
            iden_method[value] = ifChar;
        }
    }
}

//根据证件类型s_field确定证件号码d_field的最大长度
function setlength(s_field,d_field)
{
	index = s_field.value;
	the_length = iden_length[index];
	
	text_index = s_field.selectedIndex;
	
	if (text_index > -1){
		text = s_field.options[text_index].text;
	}
	else{
		text = "未知";
	}
    
	if (the_length && the_length!="" && the_length!="0"){	
        d_field.maxLength = the_length;
    }
	else{	
        d_field.maxLength = 32;
    }
		
	identity_current_value = index;
	identity_current_text = text;
}

//检查证件号码输入是否正确，此函数应该在证件号码的文本框中调用
function on_key_id(kind_field,code_field,next_field)
{	
	var ss=event.keyCode;
	
	var index=kind_field.selectedIndex;
    var text=kind_field.options[index].text;
    var identity_code=code_field.value;  
    var identity_current_value=kind_field.value;
   
	var iden_curren_method = iden_method[identity_current_value]; 
    var iden_maxlength = iden_length[identity_current_value];
	
	if(iden_curren_method ==0 ||iden_curren_method =="0" )
	{
		if(text.indexOf("身份证")!= -1 && iden_maxlength == 18)
		{   
			return nas_onkey(event,0,code_field,next_field,'ck_17_number','前17位只能输入数字,最后一位可以输入字符！','true');
		}
		else
		{		
			return nas_onkey(event,0,code_field,next_field,'ck_number','只能输入数字','true');
		}		
	}
	else if(iden_curren_method ==1 ||iden_curren_method =="1")
	{
		if(text.indexOf("身份证")!= -1 && iden_maxlength == 18)
		{   
			return nas_onkey(event,0,code_field,next_field,'ck_17_number','前17位只能输入数字,最后一位可以输入字符！','true');
		}
		else if(text.indexOf("身份证")!= -1 && iden_maxlength == 15)
		{   
			return nas_onkey(event,0,code_field,next_field,'ck_number','只能输入数字','true');
		}
		else
		{	
			return nas_onkey(event,0,code_field,next_field,'','','true');
		}
	} 
	else
	{
		return nas_onkey(event,0,code_field,next_field,'','','true');
	}
	return true;
}

function on_key_id_inherit(kind_field,code_field,next_field,key_event,iden_kind,iden_code,srl_name,trg_name,opr_name)
{	
	var ss=event.keyCode;
	var index=kind_field.selectedIndex;
    var text=kind_field.options[index].text;
    var identity_code=code_field.value;  
    var identity_current_value=kind_field.value;
   
	var iden_curren_method = iden_method[identity_current_value]; 
    var iden_maxlength = iden_length[identity_current_value];
	
	var witch_key = (navigator.appname=="Nwtscape")?key_event.which:key_event.keyCode;
 		
	if(witch_key==13)
	{
		inherit_go(iden_kind,iden_code,srl_name,trg_name,opr_name);
		nas_onkey(event,0,code_field,next_field,'','','true');
		return true;
	}
	else 
	{	
		if(iden_curren_method ==0 ||iden_curren_method =="0" )
		{
			if(text.indexOf("身份证")!= -1 && iden_maxlength == 18)
			{   
				return nas_onkey(event,0,code_field,next_field,'ck_17_number','前17位只能输入数字,最后一位可以输入字符！','true');
			}
			else
			{		
				return nas_onkey(event,0,code_field,next_field,'ck_number','只能输入数字','true');
			}		
		}
		else if(iden_curren_method ==1 ||iden_curren_method =="1")
		{
			if(text.indexOf("身份证")!= -1 && iden_maxlength == 18)
			{   
				return nas_onkey(event,0,code_field,next_field,'ck_17_number','前17位只能输入数字,最后一位可以输入字符！','true');
			}
			else
			{	
				return nas_onkey(event,0,code_field,next_field,'','','true');
			}
		} 
		else
		{
			return nas_onkey(event,0,code_field,next_field,'','','true');
		}
		return true;
	}
	
	return true;
}

function checkclientcode(kindfield,sfield)
{
	var v_index=kindfield.selectedIndex;
 	var v_text=kindfield.options[v_index].text;
 	var v_value=sfield.value;
 	if(v_value != "" && no_err_message==true)
	{ 	 	 	 	 	 
		var aa = check_showDLG(sfield);
		
		if(aa == false)
		{	
			iden_check_is_ok = "0";
			return false;
		}
		else
		{
			iden_check_is_ok = "1";
			return true;			
		}
	}
	else
	{
		iden_check_is_ok = "1";
	}
	
	return true;	
}

function checkclientcode_birth(kindfield,sfield,birth_field)
{
	 var v_index=kindfield.selectedIndex;
 	 var v_text=kindfield.options[v_index].text;
 	 var v_value=sfield.value;
 	 if(v_value != "" && no_err_message==true)
 	 {	 	
		if(check_showDLG(sfield)== false)
	 	{	
	 		birth_field.value="";	 		
	 		return false;
	 	}
	 	else
	 	{
	 		var identity_current_value=kindfield.value;
			var password;
			var maxlength_id = iden_length[identity_current_value];
		    
			if(v_text.indexOf("身份证")!=-1 && maxlength_id == 15)
			{
				password = v_value.substring(6,12);
			 	var birthday = "19"+password.substring(0,2)+"-"+password.substring(2,4)+"-"+password.substring(4,6);
				
				birth_field.value = birthday;
			}
			else if(v_text.indexOf("身份证")!=-1 && maxlength_id == 18 )
			{
				password = v_value.substring(8,14);
				var birthday = v_value.substring(6,10)+"-"+v_value.substring(10,12)+"-"+v_value.substring(12,14);
				
				birth_field.value = birthday;
			}	 		
	 		return true; 
		}
	}
	return true;
}

function check_showDLG(this_field)
{	
	var the_message="此证件号码不正确";
	var maxLength = iden_length[identity_current_value];	
	
	if(this_field.disabled == 0)
	{
		if(maxLength == 15 && identity_current_text.indexOf("身份证")!=-1)
		{	var decimal_expr = /^[\d]{15}$/;			
			var match_array = this_field.value.match(decimal_expr);
		}
		else if(maxLength == 18 && identity_current_text.indexOf("身份证")!=-1)
		{	
			var decimal_expr = /^[\d]{17}[0-9a-zA-Z]+$/;
			var match_array = this_field.value.match(decimal_expr);
		}
		else
		{	
			var id_method = iden_method[identity_current_value];
			if(id_method == 0 || id_method == "0")
			{ var decimal_expr = /^[\d]+$/;
			  var match_array = this_field.value.match(decimal_expr);
			}
			else if(id_method == 1 || id_method == "1")
			{
				var match_array = "1";
			}
			else
			{	var match_array = "1";}
		}
		
		if(match_array==null)
		{
			no_err_message=false;				
			alert(the_message);
			this_field.focus();
			this_field.select();
			no_err_message=true;			
			return false;
		}								
		var v_text = this_field.value;
		if(maxLength == 15 && identity_current_text.indexOf("身份证")!=-1)
		{
			var paper_year = v_text.substr(6,2);
		 	var the_paper_month = v_text.substr(8,2);
		 	var the_paper_day = v_text.substr(10,2);
		 	the_paper_year = "19" + paper_year;
		}
		if(maxLength == 18 && identity_current_text.indexOf("身份证")!=-1)
		{
			var the_paper_year = v_text.substr(6,4);
		 	var the_paper_month = v_text.substr(10,2);
		 	var the_paper_day = v_text.substr(12,2);
		}
		if (v_text != "" && v_text != null && identity_current_text.indexOf("身份证")!=-1 && (maxLength == 18 || maxLength == 15))
		{
			paper_year_int=parseInt(the_paper_year);
		    paper_month_float=parseFloat(the_paper_month);
			paper_day_float=parseFloat(the_paper_day);
			paper_month_index = paper_month_float-1;
			
			var decimal_expr = /^[\d]+$/;
			var match_array_the_paper_year = the_paper_year.match(decimal_expr);
			var match_array_the_paper_month = the_paper_month.match(decimal_expr);
			var match_array_the_paper_day = the_paper_day.match(decimal_expr);
			
			if (match_array_the_paper_year == null || match_array_the_paper_month == null || match_array_the_paper_day == null)
			{	
				no_err_message=false;
				alert(the_message);
			    this_field.focus();
				this_field.select();
				no_err_message=true;					
			    return false;
			}
			if((paper_year_int%4==0)&&(paper_year_int%100!=0) || (paper_year_int%400==0)) 
			{
				    var paper_day_number=new Array(31,29,31,30,31,30,31,31,30,31,30,31);
			}
			else
			{
			    var paper_day_number=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
			}
			
			var this_paper_date = the_paper_year+""+the_paper_month+""+the_paper_day+"";
			var sys_date1;
		
			if (typeof(document.forms[0].h_date)!='undefined')
			{
				
				sys_date1 = document.forms[0].h_date.value.replace("-","");
			}
			else
			{
				var source = document.XMLDocument;
				var date_v = source.selectNodes("root/Create/H_date");
				var date_t = date_v.nextNode();
				if (date_t)
				{
					sys_date1 = (date_t.text).replace("-","");;
				}
				else
				{
					date_v = source.selectNodes("root/Create/h_date");
					date_t = date_v.nextNode();
					if (date_t)
					{
						sys_date1 = (date_t.text).replace("-","");;
					}
					else
					{
						date_v = source.selectNodes("root/Create/Apply_start_date");
						date_t = date_v.nextNode();
						if (date_t)
						{
							sys_date1 = (date_t.text).replace("-","");;
						}
						else
						{
							sys_date1 = "3003-01-01".replace("-","");
						}
					}
				}
			}
		 	var sys_date = sys_date1.replace("-","");
						
			if(this_paper_date > sys_date || the_paper_year < 1900)
			{				
				no_err_message=false;
				
				alert(the_message);
			    this_field.focus();
				this_field.select();
				no_err_message=true;				
			    return false;
			}
			if(paper_month_float<1 || paper_month_float>12) 
			{
			 	no_err_message=false;
				alert(the_message);
			    this_field.focus();
				this_field.select();
				no_err_message=true;				
			    return false;
			}
			else if(paper_day_float<1 || paper_day_float>paper_day_number[paper_month_index])
			{
			   	no_err_message=false;
				alert(the_message);
			    this_field.focus();
				this_field.select();
				no_err_message=true;
				
			    return false;
			}
		}
	}
	else
	{return true;}
}


function change_id(formField)
{
	formField.value="";
	
	if(formField.name == "Identity_code" || formField.name == "IdentityCode")
	{
		if (typeof(document.forms[0].Birthday)!='undefined')
			document.forms[0].Birthday.value="";
	}
}


function on_key_id_via(kind_field,code_field,next_field,key_event)
{	
	var ss=event.keyCode;
	
	var index=kind_field.selectedIndex;
    var text=kind_field.options[index].text;
    var identity_code=code_field.value;  
    var identity_current_value=kind_field.value;
   
	var iden_curren_method = iden_method[identity_current_value]; 
    var iden_maxlength = iden_length[identity_current_value];	
	
	var witch_key = (navigator.appname=="Nwtscape")?key_event.which:key_event.keyCode;
 		
	if(witch_key==13)
	{
		
		var re_flag = checkclientcode(kind_field,code_field);
		
		if (re_flag)
		{
			next_field.focus();
		}
		else
		{
			return false;
		}
	}
	if(iden_curren_method ==0 ||iden_curren_method =="0" )
	{
		if(text.indexOf("身份证")!= -1 && iden_maxlength == 18)
		{   
			return nas_onkey(event,0,code_field,next_field,'ck_17_number','前17位只能输入数字,最后一位可以输入字符！','true');
		}
		else
		{		
			return nas_onkey(event,0,code_field,next_field,'ck_number','只能输入数字','true');
		}		
	}
	else if(iden_curren_method ==1 ||iden_curren_method =="1")
	{
		if(text.indexOf("身份证")!= -1 && iden_maxlength == 18)
		{   
			return nas_onkey(event,0,code_field,next_field,'ck_17_number','前17位只能输入数字,最后一位可以输入字符！','true');
		}
		else
		{	
			return nas_onkey(event,0,code_field,next_field,'','','true');
		}
	} 
	else
	{
		return nas_onkey(event,0,code_field,next_field,'','','true');
	}
	return true;
}


function on_key_update_id_via(kind_field,code_field,next_field,key_event)
{	
	var ss=event.keyCode;
	
	var index=kind_field.selectedIndex;
    var text=kind_field.options[index].text;
    var identity_code=code_field.value;  
    var identity_current_value=kind_field.value;
   
	var iden_curren_method = iden_method[identity_current_value]; 
    var iden_maxlength = iden_length[identity_current_value];
	
	var witch_key = (navigator.appname=="Nwtscape")?key_event.which:key_event.keyCode;
 		
	if(witch_key==13)
	{
		
		var re_flag = checkclientcode(kind_field,code_field);
		
		if (re_flag)
		{
			go_next_tab();
		}
		else
		{
			return false;
		}
	}
	if(iden_curren_method ==0 ||iden_curren_method =="0" )
	{
		if(text.indexOf("身份证")!= -1 && iden_maxlength == 18)
		{   
			return nas_onkey(event,0,code_field,next_field,'ck_17_number','前17位只能输入数字,最后一位可以输入字符！','true');
		}
		else
		{		
			return nas_onkey(event,0,code_field,next_field,'ck_number','只能输入数字','true');
		}		
	}
	else if(iden_curren_method ==1 ||iden_curren_method =="1")
	{
		if(text.indexOf("身份证")!= -1 && iden_maxlength == 18)
		{   
			return nas_onkey(event,0,code_field,next_field,'ck_17_number','前17位只能输入数字,最后一位可以输入字符！','true');
		}
		else
		{	
			return nas_onkey(event,0,code_field,next_field,'','','true');
		}
	} 
	else
	{
		return nas_onkey(event,0,code_field,next_field,'','','true');
	}
	return true;
}

function go_next_tab()
{
	var svcKindStr = document.forms[0].ServiceKindStr.value;
	var svcArr = svcKindStr.split("~");
	
	var svc_yes = "no";
	//判断是否有GSM业务
	for (var i=0;i<svcArr.length;i++)
	{
		if (svcArr[i]=="9")
		{
			svc_yes = "yes";
			break;
		}
	}
	if (svc_yes == "yes")
	{
		//alert(eval(tabset1_GsmDiv.all("GServiceId")));
		//把层转到业务信息
		setActiveTab(current_tab_obj,"GsmDiv");
		
		document.forms[0].GProductId.focus();
		
		return;
		
	}
	svc_yes = "no";
	//判断是否有CDMA业务
	for (var i=0;i<svcArr.length;i++)
	{
		if (svcArr[i]=="8")
		{
			svc_yes = "yes";
			break;
		}
	}
	if (svc_yes == "yes")
	{
		setActiveTab(current_tab_obj,"CdmaDiv");
		
		document.forms[0].CProductId.focus();
		
		return;
					
	}
	
	svc_yes = "no";
	//判断是否有CDMA1X业务
	for (var i=0;i<svcArr.length;i++)
	{
		if (svcArr[i]=="15")
		{
			svc_yes = "yes";
			break;
		}
	}
	if (svc_yes == "yes")
	{
		setActiveTab(current_tab_obj,"Cdma1XDiv");
		
		document.forms[0].Cdma1XProductId.focus();
		
		return;
	}
    return;
}
