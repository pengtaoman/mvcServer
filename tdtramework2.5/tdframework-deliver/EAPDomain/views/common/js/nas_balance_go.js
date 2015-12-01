/**
 * <p>Name: nas_balance_info.js</p>
 * <p>Description: 结算函数</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/

//alert('nas_balance_info.js引用成功');
function nas_balance_info (fee_status,reg_num)
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

	if(eval(feestatus)=="1")
	{
		//统一var url ="/uni_business/accept_fee/get_fee/bbc_getfee.jsp?flag=查询&query_condition="+eval(regnum)+"&query_flag=1&pay_mode=1&back_fee_mode=1";
		//综合var url = '/accept_pay/get_fee/bbc_getfee.php?flag=查询&query_condition=".$accept_number."&query_flag=1&pay_mode=1&back_fee_mode=1';
		var url =	url_pay;
		top.frames[0].document[0].set_sel.value='缴费';
	}
	else if(eval(feestatus)=="3")
	{
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



