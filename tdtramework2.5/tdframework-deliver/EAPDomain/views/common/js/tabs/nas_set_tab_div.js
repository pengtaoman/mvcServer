/**
 * <p>Name: nas_set_tab_div.js</p>
 * <p>Description: ��TABҳ��İ�ť��ʾ</p>
 * <p>AppArea: Ӫҵϵͳ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/
//alert('nas_set_tab_div.js���óɹ�');

function nas_set_tab_div(old_name,new_name)
{
	//alert(button_div.innerHTML);
	//alert(CusDivFee.innerHTML);

	var obj;

	var fee_info;
	var button_info;
	var via_info;

	//����Ҫ�ѷ��ò����Ϣȡ����
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
	//ȡ����ť��Ϣ
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

	//ȡ����������Ϣ
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
	//ȡ����ǰ����Ӳ�Ʒ��Ŀ��Ϣ
	eval("if (typeof("+new_name+"Item)!=\"undefined\"){ "+
		" item_info = "+new_name+"Item.innerHTML;}");
	
	//��ԭ�������:������ť��ͷ��ò�
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

		//���Ӳ�Ʒ��Ŀ��Ϣ���óɲ��ܼ�
		/*�����ã�if (old_name == "GsmDiv")
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
	//����ǰTABҳ���ð�ť��ͷ��ò�;
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


		//���������Ϣ����
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

		//����Ӳ�Ʒ��Ŀ��Ϣ���գ����óɿɼ���
		if (item_info != "")
		{
			//���Ӳ�Ʒ��Ŀ��Ϣ���óɿɼ�
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

