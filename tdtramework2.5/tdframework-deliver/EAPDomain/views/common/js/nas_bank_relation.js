//暂无程序用到；
//引用了两个外部程序：
/*
	nas_relation_build
	bankcharge_relation
*/

//本文件已经作废！！！！

function nas_bank_relation(the_kind)
{
	if (the_kind.value != "")
	{
		if (typeof(document.forms[0].Bank_account)!='undefined')
		{
			document.forms[0].Bank_account.disabled = false;
		}
		if (typeof(document.forms[0].Account_name)!='undefined')
		{
			document.forms[0].Account_name.disabled = false;
		}
		if (typeof(document.forms[0].Bank_charge)!='undefined')
		{
			document.forms[0].Bank_charge.disabled = false;
		}
		if (typeof(document.forms[0].Agreement_no)!='undefined')
		{
			document.forms[0].Agreement_no.disabled = false;
		}
		
		nas_relation_build(the_kind,the_kind.form.Bank_charge,'/root/Create','no');
		bankcharge_relation(the_kind.form.Bank_charge);
	}
	else
	{
		if (typeof(document.forms[0].Bank_account)!='undefined')
		{
			document.forms[0].Bank_account.value = "";
			document.forms[0].Bank_account.disabled = true;
		}
		if (typeof(document.forms[0].Account_name)!='undefined')
		{
			document.forms[0].Account_name.value = "";
			document.forms[0].Account_name.disabled = true;
		}
		if (typeof(document.forms[0].Bank_charge)!='undefined')
		{
			document.forms[0].Bank_charge.value = "";
			document.forms[0].Bank_charge.disabled = true;
		}
		if (typeof(document.forms[0].Agreement_no)!='undefined')
		{
			document.forms[0].Agreement_no.value = "";
			document.forms[0].Agreement_no.disabled = true;
		}
		return false;
		
	}
}