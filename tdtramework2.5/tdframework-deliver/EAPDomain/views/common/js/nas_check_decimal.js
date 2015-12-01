/**
 * <p>Name: nas_check_decimal.js</p>
 * У�����ָ�ʽ
 * �������:form_field:ҪУ��Ŀؼ���
 *          method:У�鷽ʽ--0����У������ALERT��ʾ��Ϣ��1������ʾ��Ϣ��
 *          limit_top:���õ����ֵ��
 *          decimal:С��λ��(����С����)
 * <p>AppArea: ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
**/

function nas_check_decimal(form_field,method,limit_top,decimal)
{
 	var num_expr = /^[\d\.]+$/;
 	var matchArray = form_field.value.match(num_expr);
 	
 	var other_ss = "�˴�ֻ���������ֺ�С���㣡"; 
 	var too_big = "���õ�ֵ���󣡲��ܳ���"+ limit_top + "��";
 	var de_err = "���õ�С�����ľ���Ϊ"+(decimal-1)+"λ��";
 	var err_format = "�Ƿ���С����ʽ��";
 	var sub_s;
 	var first_point;
 	var next_point;		
 	
	if (form_field.value == ".")
	{		
		if (method == 0)
		{	
			alert("��������ָ�ʽ");
			form_field.select();
			return false;
		}
		else 
		{
			return other_ss;
		}
	}
	else if (form_field.value != null && form_field.value != "")
	{			
        if(form_field.value == 0)
            form_field.value = "";
		if (matchArray == null)
		{	
			if (method == 0)
			{
				alert(other_ss);    
				form_field.focus();
				form_field.select();
				return false;
			}
			else 
			{
				return other_ss;
			}
		}
		else
		{	
			var v_text = form_field.value;
			if (v_text != 0 && v_text!= '0' && v_text!= null)
			{  
				if(v_text > limit_top/1)
				{	
					if (method == 0)
					{	
						alert(too_big);    
						form_field.focus();
						form_field.select();
						return false;
					}
					else 
					{
						return too_big;
					}
				}
			}
			first_point = v_text.indexOf('.');
			if (first_point != -1)
			{	
				sub_s = v_text.substr(first_point);
				if (sub_s.length > decimal)
				{
					if (method == 0)
					{	
						alert(de_err);
						form_field.focus();
						form_field.select();
						return false;
					}
					else 
					{
						return de_err;
					}
				}
				next_point = sub_s.substr(1);
				if (next_point.indexOf('.') != -1)
				{
					if (method == 0)
					{	
						alert(err_format);
						form_field.focus();
						form_field.select();
						return false;
					}
					else 
					{
						return err_format;
					}
				}
			}
			if (method == 0)
			{
				return true;
			}
			else 
			{
				return "";
			}
		}   
	}
	else if (form_field.value == null || form_field.value == "")
	{
		form_field.value = '';
		if (method == 0)
		{
			return true;
		}
		else 
		{
			return "";
		}
	}
}
