/**
 * <p>Name: nas_generate_items_curr.js</p>
 * <p>Description: 子产品项目信息生成和校验的上帧函数</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/
//alert('nas_generate_items_curr.js引用成功');
//item_xml: 该子产品项目信息的路径，如： root/Create/SubProduct_9/

base_package_name = new Array();

///////初始化各个业务的接收数组，这些全局变量由下一帧赋值；由预算、提交及点击事件使用
//各业务一共有多少个分组
group_count_8 = -1;
group_count_9 = -1;
group_count_15 = -1;
//各业务子产品ID
subproduct_8 = -1;
subproduct_9 = -1;
subproduct_15 = -1;
//各业务项目信息的互斥和关联数组
mutex_arr_8 = new Array();
mutex_arr_8 = new Array();
mutex_arr_15 = new Array();

rel_arr_8 = new Array();
rel_arr_8 = new Array();
rel_arr_15 = new Array();

//onclick事件触发的互斥关联
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
		var groups = eval("group_count_"+svc_kind);//取得组编号
		var k=0;//互斥关联串
		var items=0;
		var i=0;//先找到组；
		var j=0;//再组中的项目；
		var obj_item;
		
		//将关联的置上
		for (k=0;k<this_rela_arr.length;k++)
		{
			for (i=0;i<=groups;i++)
			{
				obj_item = eval("document.forms[0].group_"+svc_kind+"_"+i);
				items = obj_item.length;//alert(items);
				for (j=0;j<items;j++)
				{
					if(obj_item[j].value==this_rela_arr[k])//如该控件的VALUE与串中的一致，则置位
					{
						obj_item[j].checked = true;
						break;//ID是唯一的，找到即可退出；
					}
				}
			}
			
		}
		//将互斥的取消
		for (k=0;k<this_mutex_arr.length;k++)
		{
			for (i=0;i<=groups;i++)
			{
				obj_item = eval("document.forms[0].group_"+svc_kind+"_"+i);
				items = obj_item.length;//alert(items);
				for (j=0;j<items;j++)
				{
					if(obj_item[j].value==this_mutex_arr[k])//如该控件的VALUE与串中的一致，则置位
					{
						obj_item[j].checked = false;
						break;//ID是唯一的，找到即可退出；
					}
				}
			}
			
		}
		
		//alert("ok");
		
	}
	return;	
}

//项目选择串的处理
function nas_item_str_selected(svc_kind,in_item_str)	//循环该业务类型下的各个组(各组控件)，根据串确定该选择哪些。
{
	//alert(svc_kind);
	
	var in_item_arr = new Array();
	in_item_arr = in_item_str.split("`");
	var groups = eval("group_count_"+svc_kind);//取得该类型下的组编号，组的编号也就是该组的控件的名字
	
	var k=0;//互斥关联串
	var items=0;
	var i=0;//先找到组；
	var j=0;//再组中的项目；
	var obj_item;
	
	for (i=0;i<=groups;i++)//该业务类型下的所有组
	{
		obj_item = eval("document.forms[0].group_"+svc_kind+"_"+i);//取得其中一组
		items = obj_item.length;//alert(items);
		for (j=0;j<items;j++)//第i组的中的各个项目
		{
			for (k=0;k<in_item_arr.length;k++)//和输入串进行比较
			{
				if(obj_item[j].value==in_item_arr[k])//如该控件的VALUE与串中的一致，则置位
				{
					obj_item[j].checked = true;
					break;//ID是唯一的，找到即可退出；
				}
			}
		}
	}
	
	return;	
}


