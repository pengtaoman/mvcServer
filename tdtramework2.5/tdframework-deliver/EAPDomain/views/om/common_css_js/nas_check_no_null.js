/**
 * <p>Name: nas_check_no_null.js</p>
 * <p>Description: �ǿ�У�麯��</p>
 * <p>AppArea: Ӫҵϵͳ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/

//alert('nas_check_no_null.js���óɹ�');
function nas_check_no_null(field_name,formField,kind)
{	
	if (typeof(formField)!='undefined')
	{
		if(formField.disabled==0)
		{
			bb = formField.name;
			if(formField.value=="" && kind==0)
			{
				alert("������"+field_name);
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
					alert("��ѡ��"+field_name)
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
		alert("�ǿ�У���жԿؼ�"+field_name+"������ָ������ȷ����"+ field_name +"�ķǿ���У��û�н��С���ȷ�ϡ�");
		return true;
	}
}
