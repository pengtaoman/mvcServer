/**
 * <p>Name: nas_check_ip_count.js</p>
 * <p>Description: ���IP�����Ƿ����</p>
 * <p>AppArea: Ӫҵϵͳ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/

//alert('nas_check_ip_count.js���óɹ�');
function nas_check_ip_count(ip_field,count_radix)
{
	if (typeof(ip_field)!='undefined')
	{
		if (ip_field.value != "")
		{
			if ((ip_field.value%count_radix) != 0)
			{
				alert('IP����ӦΪ'+count_radix+'����������');
				ip_field.focus();
				ip_field.select();
				return false;
			}
		}
	}
	return true;	
}



