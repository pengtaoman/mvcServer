/**
 * <p>Name: nas_generate_items_curr.js</p>
 * <p>Description: �Ӳ�Ʒ��Ŀ��Ϣ���ɺ�У�����֡����</p>
 * <p>AppArea: Ӫҵϵͳ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/
//alert('nas_generate_items_curr.js���óɹ�');
//item_xml: ���Ӳ�Ʒ��Ŀ��Ϣ��·�����磺 root/Create/SubProduct_9/

base_package_name = new Array();

///////��ʼ������ҵ��Ľ������飬��Щȫ�ֱ�������һ֡��ֵ����Ԥ�㡢�ύ������¼�ʹ��
//��ҵ��һ���ж��ٸ�����
group_count_8 = -1;
group_count_9 = -1;
group_count_15 = -1;
//��ҵ���Ӳ�ƷID
subproduct_8 = -1;
subproduct_9 = -1;
subproduct_15 = -1;
//��ҵ����Ŀ��Ϣ�Ļ���͹�������
mutex_arr_8 = new Array();
mutex_arr_8 = new Array();
mutex_arr_15 = new Array();

rel_arr_8 = new Array();
rel_arr_8 = new Array();
rel_arr_15 = new Array();

//onclick�¼������Ļ������
function nas_item_click(this_fild,svc_kind)
{
	//alert(this_fild);
	//alert(svc_kind);
	
	if (this_fild.checked==true)
	{
	
		var this_fild_value = this_fild.value;

		//alert(this_fild_value);
		//alert("rel_arr_"+svc_kind+"["+this_fild_value+"]");
		//alert(eval("rel_arr_"+svc_kind+"["+this_fild_value+"]"));
		
		var rela_str = eval("rel_arr_"+svc_kind+"["+this_fild_value+"]");
		var mutex_str = eval("mutex_arr_"+svc_kind+"["+this_fild_value+"]");
		
		
		
		var this_rela_arr = rela_str.split('~');
		var this_mutex_arr = mutex_str.split('~');
		
		
		//alert(rela_str);//alert(mutex_str);//alert(groups);
		var groups = eval("group_count_"+svc_kind);//ȡ������
		var k=0;//���������
		var items=0;
		var i=0;//���ҵ��飻
		var j=0;//�����е���Ŀ��
		var obj_item;
		
		//������������
		for (k=0;k<this_rela_arr.length;k++)
		{
			for (i=0;i<=groups;i++)
			{
				obj_item = eval("document.forms[0].group_"+svc_kind+"_"+i);
				items = obj_item.length;//alert(items);
				for (j=0;j<items;j++)
				{
					if(obj_item[j].value==this_rela_arr[k])//��ÿؼ���VALUE�봮�е�һ�£�����λ
					{
						obj_item[j].checked = true;
						break;//ID��Ψһ�ģ��ҵ������˳���
					}
				}
			}
			
		}
		//�������ȡ��
		for (k=0;k<this_mutex_arr.length;k++)
		{
			for (i=0;i<=groups;i++)
			{
				obj_item = eval("document.forms[0].group_"+svc_kind+"_"+i);
				items = obj_item.length;//alert(items);
				for (j=0;j<items;j++)
				{
					if(obj_item[j].value==this_mutex_arr[k])//��ÿؼ���VALUE�봮�е�һ�£�����λ
					{
						obj_item[j].checked = false;
						break;//ID��Ψһ�ģ��ҵ������˳���
					}
				}
			}
			
		}
		
		//alert("ok");
		
	}
	return;	
}

//��Ŀѡ�񴮵Ĵ���
function nas_item_str_selected(svc_kind,in_item_str)	//ѭ����ҵ�������µĸ�����(����ؼ�)�����ݴ�ȷ����ѡ����Щ��
{
	//alert(svc_kind);
	
	var in_item_arr = new Array();
	in_item_arr = in_item_str.split("`");
	var groups = eval("group_count_"+svc_kind);//ȡ�ø������µ����ţ���ı��Ҳ���Ǹ���Ŀؼ�������
	
	var k=0;//���������
	var items=0;
	var i=0;//���ҵ��飻
	var j=0;//�����е���Ŀ��
	var obj_item;
	
	for (i=0;i<=groups;i++)//��ҵ�������µ�������
	{
		obj_item = eval("document.forms[0].group_"+svc_kind+"_"+i);//ȡ������һ��
		items = obj_item.length;//alert(items);
		for (j=0;j<items;j++)//��i����еĸ�����Ŀ
		{
			for (k=0;k<in_item_arr.length;k++)//�����봮���бȽ�
			{
				if(obj_item[j].value==in_item_arr[k])//��ÿؼ���VALUE�봮�е�һ�£�����λ
				{
					obj_item[j].checked = true;
					break;//ID��Ψһ�ģ��ҵ������˳���
				}
			}
		}
	}
	
	return;	
}


