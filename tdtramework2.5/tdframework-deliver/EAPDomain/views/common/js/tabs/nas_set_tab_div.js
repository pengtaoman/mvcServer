/**
 * <p>Name: nas_set_tab_div.js</p>
 * <p>Description: 多TAB页面的按钮显示</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/
//alert('nas_set_tab_div.js引用成功');

function nas_set_tab_div(old_name,new_name)
{
	//alert(button_div.innerHTML);
	//alert(CusDivFee.innerHTML);

	var obj;

	var fee_info;
	var button_info;
	var via_info;

	//首先要把费用层的信息取到；
	if (old_name == "")
	{
		eval("if (typeof("+new_name+"Fee)!=\"undefined\"){ "+
				" fee_info = "+new_name+"Fee.innerHTML;}");
	}
	else
	{
		eval("if (typeof("+old_name+"Fee)!=\"undefined\"){ "+
				" fee_info = "+old_name+"Fee.innerHTML;}");
	}
	//取到按钮信息
	if (old_name == "")
	{
		eval("if (typeof("+new_name+"Button)!=\"undefined\"){ "+
				" button_info = "+new_name+"Button.innerHTML;}");
	}
	else
	{
		eval("if (typeof("+old_name+"Button)!=\"undefined\"){ "+
				" button_info = "+old_name+"Button.innerHTML;}");
	}

	//取到经办人信息
	if (old_name == "")
	{
		eval("if (typeof("+new_name+"Via)!=\"undefined\"){ "+
				" via_info = "+new_name+"Via.innerHTML;}");
		//via_info = eval(new_name+"Via.innerHTML");
	}
	else
	{
		eval("if (typeof("+old_name+"Via)!=\"undefined\"){ "+
				" via_info = "+old_name+"Via.innerHTML;}");
		//via_info = eval(old_name+"Via.innerHTML");
	}

	var item_info;
	//取到当前层的子产品项目信息
	eval("if (typeof("+new_name+"Item)!=\"undefined\"){ "+
		" item_info = "+new_name+"Item.innerHTML;}");
	
	//把原来的清空:包括按钮层和费用层
	if (old_name != "")
	{
		eval("if (typeof("+old_name+"Button)!=\"undefined\"){ "+
				old_name+"Button.innerHTML='';"+
				"if ("+old_name+"Button.style)"+
				"{"+
				"	obj="+old_name+"Button.style;"+
				"	obj.visibility='hidden';"+
				"	obj.position='absolute';"+
				"}"+
			"}");

		eval("if (typeof("+old_name+"Via)!=\"undefined\"){ "+
				old_name+"Via.innerHTML='';"+
				"if ("+old_name+"Via.style)"+
				"{"+
				"	obj="+old_name+"Via.style;"+
				"	obj.visibility='hidden';"+
				"	obj.position='absolute';"+
				"}"+
			"}");


		eval("if (typeof("+old_name+"Fee)!=\"undefined\"){ "+
				old_name+"Fee.innerHTML='';"+
				"if ("+old_name+"Fee.style)"+
				"{"+
				"	obj="+old_name+"Fee.style;"+
				"	obj.visibility='hidden';"+
				"	obj.position='absolute';"+
				"}"+
			"}");

		//将子产品项目信息层置成不能见
		/*调试用：if (old_name == "GsmDiv")
		{
			alert(old_name+"Item");
			if (typeof(GsmDivItem) != "undefined")
			{
				if (GsmDivItem.style)
				{
					obj=GsmDivItem.style;
					obj.visibility='hidden';
					obj.position='absolute';

					alert(obj.position);
					alert(obj.visibility);

				}
			}
		}*/

		eval("if (typeof("+old_name+"Item)!=\"undefined\"){ "+
				"if ("+old_name+"Item.style)"+
				"{"+
				"	obj="+old_name+"Item.style;"+
				"	obj.visibility='hidden';"+
				"	obj.position='absolute';"+
				"}"+
			"}");
	}
	//将当前TAB页设置按钮层和费用层;
	if (new_name != "")
	{
		eval("if (typeof("+new_name+"Button)!=\"undefined\"){ "+
				//new_name+"Button.innerHTML=button_div.innerHTML;"+
				new_name+"Button.innerHTML=button_info;"+
				"if ("+new_name+"Button.style)"+
				"{"+
				"	obj="+new_name+"Button.style;"+
				"	obj.visibility='visible';"+
				"	obj.position='relative';"+
				"}"+
			"}");


		eval("if (typeof("+new_name+"Via)!=\"undefined\"){ "+
				//new_name+"Via.innerHTML=Via_div.innerHTML;"+
				new_name+"Via.innerHTML=via_info;"+
				"if ("+new_name+"Via.style)"+
				"{"+
				"	obj="+new_name+"Via.style;"+
				"	obj.visibility='visible';"+
				"	obj.position='relative';"+
				"}"+
			"}");


		//如果费用信息不空
		if (fee_info!="")
		{
			eval("if (typeof("+new_name+"Fee)!=\"undefined\"){ "+
				new_name+"Fee.innerHTML=fee_info;"+
				"if ("+new_name+"Fee.style)"+
				"{"+
				"	obj="+new_name+"Fee.style;"+
				"	obj.visibility='visible';"+
				"	obj.position='relative';"+
				"}"+
			"}");
		}

		//如果子产品项目信息不空，则置成可见的
		if (item_info != "")
		{
			//将子产品项目信息层置成可见
			eval("if (typeof("+new_name+"Item)!=\"undefined\"){ "+
					"if ("+new_name+"Item.style)"+
					"{"+
					"	obj="+new_name+"Item.style;"+
					"	obj.visibility='visible';"+
					"	obj.position='relative';"+
					"}"+
				"}");
		}

	}

	if (typeof(document.forms[0].CurrentFeeDiv)!="undefined")
		document.forms[0].CurrentFeeDiv.value=new_name+"Fee";

	if (typeof(document.forms[0].CurrentItemDiv)!="undefined")
		document.forms[0].CurrentItemDiv.value=new_name+"Item";

	//alert(document.forms[0].CurrentFeeDiv.value);

	return;

}

