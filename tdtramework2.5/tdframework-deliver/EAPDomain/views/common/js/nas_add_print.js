/**
 * <p>Name: nas_add_print.js</p>
 * <p>Description: ��Ӵ�ӡ�ؼ�</p>
 * <p>AppArea: Ӫҵϵͳ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/

//alert('nas_add_print.js���óɹ�');

function nas_add_print()
{
	//alert("ok");	
	
	
	var submitparam = "<object ID='NeuPrint' WIDTH='0' HEIGHT='0' CLASSID='clsid:FBFD55C9-C23C-11D3-B65D-004005E66149' CODEBASE='/swiftprint.ocx'><param name='_Version' value='65536' /><param name='_ExtentX' value='1870' /><param name='_ExtentY' value='670' /><param name='_StockProps' value='0' /></object>";

	document.forms[0].insertAdjacentHTML("BeforeEnd",submitparam);
	
	
	//alert(document.forms[0].NeuPrint);
}
