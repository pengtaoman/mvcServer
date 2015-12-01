/**
 * <p>Name: nas_set_source_dis_value.js</p>
 * <p>Description: 设置上一帧的号码资源函数</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/

//alert('nas_set_source_dis_value.js引用成功');
function nas_set_source_dis_value_tow(select_info,is_ok)
{
	if (is_ok == "ok")
	{
		var the_info = new Array();
		
		the_info = select_info.split('@*.*@');
		
		
		if (the_info[1]!="")
		{
			//window.parent.frames['header'].document.forms[0].Service_id_temp.value = the_info[1];
			
			//if (window.parent.frames['header'].document.forms[0].Service_id_temp.value!="")
			//{	window.parent.frames['header'].document.forms[0].Service_id_temp.disabled = true;}
			//else
			//{	
				if (typeof(window.parent.frames['header'].document.forms[0].Service_id_temp)!='undefined')
					window.parent.frames['header'].document.forms[0].Service_id_temp.disabled = false;
				if (typeof(window.parent.frames[1].document.forms[0].New_service_id)!='undefined')
					window.parent.frames[1].document.forms[0].New_service_id.disabled = false;
			//}
			if (typeof(window.parent.frames[1].document.forms[0].Service_id_temp)!='undefined')
				window.parent.frames[1].document.forms[0].Service_id_temp.value = the_info[1];
			if (typeof(window.parent.frames[1].document.forms[0].New_service_id)!='undefined')
				window.parent.frames[1].document.forms[0].New_service_id.value = the_info[1];
			
			if (the_info[3]!="")
			{
				window.parent.frames[1].document.forms[0].Area_id.value = the_info[3];
				
				if (window.parent.frames[1].document.forms[0].Area_id.value!="")
				{	window.parent.frames[1].document.forms[0].Area_id.disabled = true;}
				else
				{	window.parent.frames[1].document.forms[0].Area_id.disabled = false;}
				
			}
			else
			{	window.parent.frames[1].document.forms[0].Area_id.disabled = false;}
			/*if (the_info[4]!="")
			{
				window.parent.frames['header'].document.forms[0].Bureau_id.value = the_info[4];
				if (window.parent.frames['header'].document.forms[0].Bureau_id.value!="")
				{	window.parent.frames['header'].document.forms[0].Bureau_id.disabled = true;}
				else
				{	window.parent.frames['header'].document.forms[0].Bureau_id.disabled = false;}
			}
			else
			{	window.parent.frames['header'].document.forms[0].Bureau_id.disabled = false;}
			*/
		}
		else
		{
			if (typeof(window.parent.frames[1].document.forms[0].Service_id_temp)!='undefined')
				window.parent.frames[1].document.forms[0].Service_id_temp.disabled = false;
			if (typeof(window.parent.frames[1].document.forms[0].New_service_id)!='undefined')
				window.parent.frames[1].document.forms[0].New_service_id.disabled = false;
			window.parent.frames[1].document.forms[0].Area_id.disabled = false;
			window.parent.frames[1].document.forms[0].Bureau_id.disabled = false;
		}
	}
	else
	{
		if (typeof(window.parent.frames[1].document.forms[0].Service_id_temp)!='undefined')
			window.parent.frames[1].document.forms[0].Service_id_temp.disabled = false;
		if (typeof(window.parent.frames[1].document.forms[0].New_service_id)!='undefined')
			window.parent.frames[1].document.forms[0].New_service_id.disabled = false;
		window.parent.frames[1].document.forms[0].Area_id.disabled = false;
		window.parent.frames[1].document.forms[0].Bureau_id.disabled = false;
	}
}




