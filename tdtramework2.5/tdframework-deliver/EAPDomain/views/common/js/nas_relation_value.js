/**
 * <p>Name: nas_relation_value.js</p>
 * <p>Description: �����ؼ����ɺ���</p>
 * <p>AppArea: Ӫҵϵͳ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/
//alert('nas_relation_value.js���óɹ�');


function nas_relation_value(source,aim,kind)
{
	var old_value = aim.value;
	if (kind == "1")
	{
		if (source.value!="")
		{
			aim.value = source.value;		//aim.value = 100;
		}
		if (aim.value=="")
		{
			alert(aim.value);
			aim.value = old_value;
		}
	}
	else
	{
		aim.value = source.value;
	}
}

//���relation_filed�ؼ��� clear_kind: 1���ı�  2�������б�
function nas_relation_clear(relation_filed,clear_kind)
{
	if (clear_kind == "1")
	{
		relation_filed.value="";
	}
	else if (clear_kind == "2")
	{
		relation_filed.length = 0;
		relation_filed.add(document.createElement("OPTION"));
		relation_filed.options[0].value='';
		relation_filed.options[0].text='';
	}
	
	return true;
}

