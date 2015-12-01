//需./submit_fun.js
//如果要隐藏一个层：例：show_service_info('fee_id','hidden','absolute');	
//如果要显示一个层：例：show_service_info('fee_id','show','relative');
function show_service_info(div_name,param_one,param_two)
{
	show_hide_layers(div_name,param_one,param_two);	
	
}
function find_Obj(name,doc_id)
{
	var p,i,x;

	if (!doc_id)
		doc_id=document;

	if((p=name.indexOf("?"))>0&&parent.frames.length)
	{	doc_id=parent.frames[name.substring(p+1)].document; 
		name=name.substring(0,p);	
	}

	if(!(x=doc_id[name])&&doc_id.all)
		x=doc_id.all[name];

	for (i=0;!x&&i<doc_id.forms.length;i++)
		x=doc_id.forms[i][name];

	for(i=0;!x&&doc_id.layers&&i<doc_id.layers.length;i++)
		x=find_Obj(name,doc_id.layers[i].document);
	if(!x && doc_id.getElementById)
		x=doc_id.getElementById(name);


	return x;
}

function show_hide_layers(obj_name,v,show_kind)
{
	var obj=find_Obj(obj_name);

	if (obj!=null)
	{
		if (obj.style)
		{
			obj=obj.style;
			v=(v=='show')?'visible':(v='hide')?'hidden':v;
		}
		obj.position=show_kind;
		obj.visibility=v;

	}
}  	
function return_submit()
{     
	
	if (document.forms[0].query_svc_num.value=="")
	{		
		return false;	
	}else{
		
		return true;
	}  	
}
function fee_current()
{
	var sum_fee = 0;
	var the_count = 0;
	
	if(document.forms[0].fee_sum)
	{	
		if (document.forms[0].fee_sum.length)
		{	var sum_leng = document.forms[0].fee_sum.length;}
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
				alert(document.forms[0].fee_sum[j].name+'----'+document.forms[0].fee_sum[j].value);
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
				//alert(document.forms[0].fee_sum[i].value+'------------'+document.forms[0].favour_sum[i].value);
				sum_fee += 100 + document.forms[0].fee_sum[i].value*1 - document.forms[0].favour_sum[i].value*1 - 100;
			}
		}
		else
		{
			sum_fee += 100 + document.forms[0].fee_sum.value*1 - document.forms[0].favour_sum.value*1 - 100;			
		}
		document.forms[0].total_fee.value = sum_fee;
		
		refresh_fee_string(document.forms[0].total_fee);
	}	
}

function go_black(url_name)
{
	submit_fun('');
}
function re_auth ()
{
	document.forms[0].auth_ok.value = "no";
	if (document.forms[0].inherit_kind.value != "")
	{
		document.forms[0].inherit_kind.value = "";
		alert('客户证件信息发生变化，请重新做继承操作！');
	}
}

function re_auth_new ()
{
	document.forms[0].authed.value = "";
	if (document.forms[0].inherit_kind.value != "")
	{
		document.forms[0].inherit_kind.value = "";
		document.forms[0].customer_id.value = "";
		document.forms[0].account_id.value = "";
		alert('客户证件信息发生变化，如需要，请重新做继承操作！');
	}
}

function re_budget ()
{
	document.forms[0].budget_ok.value = "no";
}
function re_submit ()
{
	document.forms[0].submit_ok.value = "no";
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
/*
function uni_check_date(the_field,the_marker,the_name)
{
 var the_value = the_field.value;
 var the_time = date_get(the_value,the_marker);
 var time_ok = date_check(the_time.year,the_time.month,the_time.day,the_name); 
 if (!time_ok.status)
 {
 	alert(time_ok.message);
 	the_field.focus();
 	the_field.select();
 }
}*/
/*function balance_go (fee_status,reg_num) 
{
	 var url="";
	 var feestatus="window.parent.frames[0].document.forms[0]."+fee_status+".value";
	 var regnum="window.parent.frames[0].document.forms[0]."+reg_num+".value";
	 if(eval(feestatus)=="1"){
	  //统一var url ="/uni_business/accept_fee/get_fee/bbc_getfee.jsp?flag=查询&query_condition="+eval(regnum)+"&query_flag=1&pay_mode=1&back_fee_mode=1"; 
	  //综合var url = '/accept_pay/get_fee/bbc_getfee.php?flag=查询&query_condition=".$accept_number."&query_flag=1&pay_mode=1&back_fee_mode=1';
	  var url ="/accept_pay/get_fee/bbc_getfee.php?flag=查询&query_condition="+eval(regnum)+"&query_flag=1&pay_mode=1&back_fee_mode=1";
	  top.frames[0].document[0].set_sel.value='缴费';
	 }else if(eval(feestatus)=="3"){
	  //统一var url = "/uni_business/accept_fee/return_busfee/bbc_returnbusfee.jsp?flag=查询&query_condition="+eval(regnum)+"&query_flag=1&pay_mode=1&back_fee_mode=1";
	  //综合var url = '/accept_pay/return_busfee/bbc_returnbusfee.php?flag=查询&query_condition=".$accept_number."&query_flag=1&pay_mode=1&back_fee_mode=1';\n
	  var url ="/accept_pay/return_busfee/bbc_returnbusfee.php?flag=查询&query_condition="+eval(regnum)+"&query_flag=1&pay_mode=1&back_fee_mode=1";
	  top.frames[0].document[0].set_sel.value='退费';
	  
	 }
	 for(var i=0;i<window.parent.frames[0].document.all.length;i++)
	 
	 { if (top.frames[0].document.all.item(i).name=='受理缴费')
	 
	  { top.frames[0].document.all.item(i).click();break;}
	 
	 }
	 
	 parent.frames[1].open(url,"right_page");
 
}*/
function uni_check_date(the_field,the_marker,the_name)
{
 var the_value = the_field.value;
 var the_time = date_get(the_value,the_marker);
 var time_ok = date_check(the_time.year,the_time.month,the_time.day,the_name); 
 if (!time_ok.status)
 {
 	alert(time_ok.message);
 	the_field.focus();
 	the_field.select();
 }
}
function balance_go (fee_status,reg_num) 
{
	if (fee_status == "")
	{
		alert('费用状态未知！不能结算');
	}
	if (reg_num == "")
	{
		alert('受理编号未知！不能结算');
	}
	
	var feestatus="window.parent.frames[0].document.forms[0]."+fee_status+".value";
	var regnum="window.parent.frames[0].document.forms[0]."+reg_num+".value";
	
	if (typeof(balance_kind)!='undefined')
	{	
		var the_kind = balance_kind;
	}
	else  
	{	var the_kind = "81";}
	
	if (the_kind == "81")
	{
		 var url_pay= "/wvpn_business/wvpn_fee_accept/pay_fee_accept/pay_fee_accept.php?flag=查询&query_condition="+eval(regnum)+"&query_flag=1&pay_mode=1&back_fee_mode=1";
		 var url_repay= "/wvpn_business/wvpn_fee_accept/return_fee_accept/return_fee_accept.php?flag=查询&query_condition="+eval(regnum)+"&query_flag=1&pay_mode=1&back_fee_mode=1";
		 var go_name = "WVPN业务";
		 var click_id = "Z30D";
	}
	else if (the_kind == "12")
	{
		 var url_pay= "/ivpn_business/ivpn_fee_accept/pay_fee_accept/pay_fee_accept.php?flag=查询&query_condition="+eval(regnum)+"&query_flag=1&pay_mode=1&back_fee_mode=1";
		 var url_repay= "/ivpn_business/ivpn_fee_accept/return_fee_accept/return_fee_accept.php?flag=查询&query_condition="+eval(regnum)+"&query_flag=1&pay_mode=1&back_fee_mode=1";
		 var go_name = "IVPN业务";
		 var click_id = "Z31D";
	}
	else
	{
		 var url_pay= "/wvpn_business/wvpn_fee_accept/pay_fee_accept/pay_fee_accept.php?flag=查询&query_condition="+eval(regnum)+"&query_flag=1&pay_mode=1&back_fee_mode=1";
		 var url_repay= "/wvpn_business/wvpn_fee_accept/return_fee_accept/return_fee_accept.php?flag=查询&query_condition="+eval(regnum)+"&query_flag=1&pay_mode=1&back_fee_mode=1";
		 var go_name = "WVPN业务";
		 var click_id = "Z30D";
	}
	 
	 
	 if(eval(feestatus)=="1"){
	  //统一var url ="/uni_business/accept_fee/get_fee/bbc_getfee.jsp?flag=查询&query_condition="+eval(regnum)+"&query_flag=1&pay_mode=1&back_fee_mode=1"; 
	  //综合var url = '/accept_pay/get_fee/bbc_getfee.php?flag=查询&query_condition=".$accept_number."&query_flag=1&pay_mode=1&back_fee_mode=1';
	  var url =	url_pay;
	  top.frames[0].document[0].set_sel.value='缴费';
	 }else if(eval(feestatus)=="3"){
	  //统一var url = "/uni_business/accept_fee/return_busfee/bbc_returnbusfee.jsp?flag=查询&query_condition="+eval(regnum)+"&query_flag=1&pay_mode=1&back_fee_mode=1";
	  //综合var url = '/accept_pay/return_busfee/bbc_returnbusfee.php?flag=查询&query_condition=".$accept_number."&query_flag=1&pay_mode=1&back_fee_mode=1';\n
	  var url = url_repay;
	  top.frames[0].document[0].set_sel.value='退费';
	  
	 }
	 for(var i=0;i<window.parent.frames[0].document.all.length;i++)
	 {	
	 	if (top.frames[0].document.all.item(i).name == go_name)	 
	  	{	
	  		top.frames[0].document.all.item(i).click();
	  		break;
	  	}	 
	 }
	 parent.frames[1].open(url,"right_page");	 
	 
	 top.frames[1].focus();
	 //top.frames[1].document.all(click_id).click();
}
function go_subsrc ()
{
	submit_fun('select_subsrc');
}
function up_correlation(group_id,clsgrp_id)
{	
 	clsgrp_id.length = 0;
 	var m = 0;
 	for (var n=0;n<clsgrp_info.length;n++)
 	{	
 		if (clsgrp_info[n][2] == group_id.value)
 		{	
 			
 			clsgrp_id.add(document.createElement("OPTION"));
 			clsgrp_id.options[m].value=clsgrp_info[n][0];
 			clsgrp_id.options[m].text=clsgrp_info[n][1];
 			if (clsgrp_info[n][0] == clsgrp_info_default)
 				clsgrp_id.options[m].selected = true;
 			m=m+1;
 		}
 	}
} 
function null_up_correlation(group_id,clsgrp_id)
{
	clsgrp_id.length = 0;
		
	clsgrp_id.add(document.createElement("OPTION"));
	clsgrp_id.options[0].value="";
	clsgrp_id.options[0].text="";
	
 	var m = 1;
 	for (var n=0;n<clsgrp_info.length;n++)
 	{	
 		if (clsgrp_info[n][2] == group_id.value)
 		{	
 			
 			clsgrp_id.add(document.createElement("OPTION"));
 			clsgrp_id.options[m].value=clsgrp_info[n][0];
 			clsgrp_id.options[m].text=clsgrp_info[n][1];
 			if (clsgrp_info[n][0] == clsgrp_info_default)
 				clsgrp_id.options[m].selected = true;
 			m=m+1;
 		}
 	}
}
function uni_del_numstr(count_lmt)
{
	var j=0;
	for (var i=0;i<=document.forms[0].num_count.value;i++)
	{
		if (document.forms[0].check_info.length>1)
		{
			if (document.forms[0].check_info[i])
			{
				if (document.forms[0].check_info[i].checked)
				{	document.forms[0].del_num_str.value = document.forms[0].del_num_str.value + document.forms[0].check_info[i].value+'~';
					j++;
				}
			}
		}
		else 
		{
			
			if (document.forms[0].check_info.checked)
			{	document.forms[0].del_num_str.value = document.forms[0].del_num_str.value + document.forms[0].check_info.value+'~';
			
				j++;
			}
		}
	}
	if (j>20)
	{
		alert("一次只能删除"+count_lmt+"个信息！");
		return false;
	}
	else if (document.forms[0].del_num_str.value)
	{
		return true;
	}
	else
	{
		return false;
	}	
}
//连费用串
function go_submit(file_name,the_parameter)
{
	var fee_str_info = link_fee();
	var fee_item = "<input type='hidden' name='fee_str' value = '"+fee_str_info+"'>";
	document.forms[0].insertAdjacentHTML("BeforeEnd",fee_item);
	
	submit_fun(document.forms[0],file_name,the_parameter);
	
}
function link_fee()
{
	var the_str = '';
	
	if (document.forms[0].fee_id && document.forms[0].fee_id)
	{
		
		if (document.forms[0].fee_id.length > 1)
		{
			for (var i=0;i<document.forms[0].fee_id.length;i++)
			{
				if (document.forms[0].fee_id[i])
				{	the_str = the_str + '' + document.forms[0].fee_id[i].value + '`';}
				else
				{	the_str = the_str + '`';}
				if (document.forms[0].fee_name[i])
				{	the_str = the_str + '' + document.forms[0].fee_name[i].value + '`';}
				else
				{	the_str = the_str + '`';}
				if (document.forms[0].fee_sum[i])
				{	the_str = the_str + '' + document.forms[0].fee_sum[i].value + '`';}
				else
				{	the_str = the_str + '`';}
				if (document.forms[0].favour_sum[i])
				{	the_str = the_str + '' + document.forms[0].favour_sum[i].value + '`';}
				else
				{	the_str = the_str + '`';}
				if (document.forms[0].favour_reason[i])
				{	the_str = the_str + '' + document.forms[0].favour_reason[i].value + '';}
				else
				{	the_str = the_str + '';}
				
				the_str = the_str + '~';
				
				//alert(i+'---------'+the_str);			
			}
		}
		else
		{
			if (document.forms[0].fee_id)
			{	the_str = the_str + '' + document.forms[0].fee_id.value + '`';}
			else
			{	the_str = the_str + '`';}
			if (document.forms[0].fee_name)
			{	the_str = the_str + '' + document.forms[0].fee_name.value + '`';}
			else
			{	the_str = the_str + '`';}
			if (document.forms[0].fee_sum)
			{	the_str = the_str + '' + document.forms[0].fee_sum.value + '`';}
			else
			{	the_str = the_str + '`';}
			if (document.forms[0].favour_sum)
			{	the_str = the_str + '' + document.forms[0].favour_sum.value + '`';}
			else
			{	the_str = the_str + '`';}
			if (document.forms[0].favour_reason)
			{	the_str = the_str + '' + document.forms[0].favour_reason.value + '';}
			else
			{	the_str = the_str + '';}
			
			the_str = the_str + '~';
			
			//alert(the_str);	
		}
	}
	
	//document.forms[0].fee_str.value = the_str ;
	
	return the_str;
	
}
function re_delbudget(the_check)
{//计数器
	if (the_check.checked)
	{
		document.forms[0].select_num.value = parseInt(parseInt(document.forms[0].select_num.value) + 1);
	}
	else
	{
		document.forms[0].select_num.value = parseInt(parseInt(document.forms[0].select_num.value) - 1);
	}
	document.forms[0].del_budget_ok.value="";
}
function balance()
{
	if (document.forms[0].need_balance.value == "yes")
	{
		balance_go('fee_status','regster_num');
	}
	else
	{	alert('尚不需结算!');
		return false;
	}
}
function default_go(the_key,the_query)
{
	var scode=(navigator.appname=="Nwtscape")?the_key.which:the_key.keyCode;
    if(scode == 13)
    {
    	the_query.focus();
      	the_query.click();
    }	
}
function pswd_go(the_key,the_query,the_getpass,this_field)
{
	var scode=(navigator.appname=="Nwtscape")?the_key.which:the_key.keyCode;
    if(scode == 13)
    {
      	if (this_field.value != "")
      	{	the_query.focus();
      		the_query.click();
      	}
      	else
      	{	
      		the_getpass.focus();
      		the_getpass.click();
      	}
    }	
}
function password_go(the_key,the_pass)
{
	var scode=(navigator.appname=="Nwtscape")?the_key.which:the_key.keyCode;
    if(scode == 13)
    {
      	the_pass.focus();
    }	
}
function model_onclick()
{
	/*var srcElement, targetID, targetElement;
	srcElement = window.event.srcElement;
	targetID = srcElement.id + "_d";
	targetElement = document.all(targetID);*/
	
	//alert(targetID);
//将缴费的显示出来	
	alert(document.all(Z30D_d).style.display);
	document.all(Z30D_d).style.display = "";
	Z30D.src = "/images/open.gif";
//将集团的隐藏
//置颜色，好象不用
	for(logo = 0 ; logo < window.document.all.length ; logo++)
	{
		if (window.document.all.item(logo).className == "Menu_bottom")
		{
			window.document.all.item(logo).style.color = 'black';
		}
	}
//将缴费的颜色置上
	Z30D.style.color = 'red';
}