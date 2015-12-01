/**
 * <p>Name: nas_check_ip_count.js</p>
 * <p>Description: 检测IP个数是否合理</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/

//alert('nas_check_ip_count.js引用成功');
function nas_check_ip_count(ip_field,count_radix)
{
	if (typeof(ip_field)!='undefined')
	{
		if (ip_field.value != "")
		{
			if ((ip_field.value%count_radix) != 0)
			{
				alert('IP个数应为'+count_radix+'的整数倍！');
				ip_field.focus();
				ip_field.select();
				return false;
			}
		}
	}
	return true;	
}



