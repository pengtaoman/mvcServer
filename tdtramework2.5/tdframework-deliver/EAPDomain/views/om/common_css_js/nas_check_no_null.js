/**
 * <p>Name: nas_check_no_null.js</p>
 * <p>Description: 非空校验函数</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/

//alert('nas_check_no_null.js引用成功');
function nas_check_no_null(field_name,formField,kind)
{	
	if (typeof(formField)!='undefined')
	{
		if(formField.disabled==0)
		{
			bb = formField.name;
			if(formField.value=="" && kind==0)
			{
				alert("请输入"+field_name);
				if (!formField.disabled)
				{
					formField.focus();
				}
				return false;
			}
			if (kind==1 || kind == "1")
			{
				if(formField.value=="" || formField.value=="-200" || formField.value== -200 || formField.value== -100 || formField.value== "-100")
				{	
					alert("请选择"+field_name)
					if (!formField.disabled)
					{
						formField.focus();
					}
					return false;
				}
				else
				return true;	
			}	
		}
		else
		{						
			return true;
		}
	}
	else
	{
		alert("非空校验中对控件"+field_name+"的命名指定不正确；对"+ field_name +"的非空性校验没有进行。请确认。");
		return true;
	}
}
