/**
 * <p>Name: nas_crm_balance_go.js</p>
 * <p>Description: ��Ʒ������㰴ť</p>
 * <p>AppArea: Ӫҵϵͳ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/
//alert('nas_crm_balance_go.js���óɹ�');

function nas_crm_balance_go(submit_status,register_number,balance_kind,service_kind,php_app_address)
{
	//����Ƿ�����
	
	//alert(balance_kind);
	
	if (submit_status == "yes" && register_number != "")
	{
	
		if (balance_kind == "1")
		{
			var url = php_app_address+"accept_pay/get_fee/bbc_getfee.php?flag=��ѯ&query_condition="+register_number+"&query_flag=1&pay_mode=1&back_fee_mode=1";
			top.parent.frames[0].document[0].set_sel.value='�ɷ�';
			for(var i=0;i<top.parent.frames[0].document.all.length;i++)
			{	if (top.parent.frames[0].document.all.item(i).name=='����ɷ�')
				{	top.parent.frames[0].document.all.item(i).click();break;}
			}
			top.parent.frames[2].location.href=url;
					
		}
		else if (balance_kind == "3")
		{
			var url = php_app_address+"accept_pay/return_busfee/bbc_returnbusfee.php?flag=��ѯ&query_condition="+register_number+"&query_flag=1&pay_mode=1&back_fee_mode=1";
			top.parent.frames[0].document[0].set_sel.value='�˷�';
			for(var i=0;i<top.parent.frames[0].document.all.length;i++)
			{	if (top.parent.frames[0].document.all.item(i).name=='����ɷ�')
				{	top.parent.frames[0].document.all.item(i).click();break;}
			}
			
			top.parent.frames[2].location.href=url;
			
		}
	}
	
	return;
}

