
/**
 * <p>Name: nas_set_service_kind.js</p>
 * <p>Description: �����û������ҵ������Զ�ȷ��ҵ�����͵�ֵ</p>
 * <p>AppArea: Ӫҵϵͳ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/

//alert('nas_set_service_kind.js���óɹ�');

function nas_set_service_kind(service_id_value,service_kind)
{
	var str_head;
	if  (service_id_value.length > 0)
	{
		str_head = service_id_value.substr(0,1);		
		var mach_check=/^\d+$/i; 
		var matchArray = str_head.match(mach_check);
		if (matchArray==null)
		{
			if (nas_search(service_kind,"5"))
			{
				service_kind.value = "5";
			}
		}
		else
		{
			if (service_id_value.length == 11)
			{
				str_head = service_id_value.substr(0,3);
				if (str_head=="133"||str_head=="153"||str_head=="134")
				{
					if (nas_search(service_kind,"8"))
						service_kind.value = "8";
				}
				else if (str_head=="130"||str_head=="131"||str_head=="132"||str_head=="156"||str_head=="155")
				{
					if (nas_search(service_kind,"9"))
						service_kind.value = "9";
				}
				else
				{
					
				}
			}
			else
			{
				
			}
		}
	}
		
	return;
}
function nas_search(the_field,the_value)
{
	for(var i = 0; i < the_field.length; i++)
	{
		if(the_field[i].value == the_value)
		{
			return true;
		}
	}
	
	return false;
	
}

