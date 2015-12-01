/**
 * <p>Name: nas_crm_balance_go.js</p>
 * <p>Description: 产品受理结算按钮</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/
//alert('nas_crm_balance_go.js引用成功');

function nas_crm_balance_go(submit_status,register_number,balance_kind,service_kind,php_app_address)
{
	//检测是否都有了
	
	//alert(balance_kind);
	
	if (submit_status == "yes" && register_number != "")
	{
	
		if (balance_kind == "1")
		{
			var url = php_app_address+"accept_pay/get_fee/bbc_getfee.php?flag=查询&query_condition="+register_number+"&query_flag=1&pay_mode=1&back_fee_mode=1";
			top.parent.frames[0].document[0].set_sel.value='缴费';
			for(var i=0;i<top.parent.frames[0].document.all.length;i++)
			{	if (top.parent.frames[0].document.all.item(i).name=='受理缴费')
				{	top.parent.frames[0].document.all.item(i).click();break;}
			}
			top.parent.frames[2].location.href=url;
					
		}
		else if (balance_kind == "3")
		{
			var url = php_app_address+"accept_pay/return_busfee/bbc_returnbusfee.php?flag=查询&query_condition="+register_number+"&query_flag=1&pay_mode=1&back_fee_mode=1";
			top.parent.frames[0].document[0].set_sel.value='退费';
			for(var i=0;i<top.parent.frames[0].document.all.length;i++)
			{	if (top.parent.frames[0].document.all.item(i).name=='受理缴费')
				{	top.parent.frames[0].document.all.item(i).click();break;}
			}
			
			top.parent.frames[2].location.href=url;
			
		}
	}
	
	return;
}

