/**
 * <p>Name: nas_generate_substr.js</p>
 * <p>Description: ��ҵ�����ɺ���</p>
 * <p>AppArea: Ӫҵϵͳ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/
//alert('nas_generate_substr.js���óɹ�');
mutex_arr = new Array();
rel_arr = new Array();
function nas_generate_substr(sub_xml,rel_xml,group_xml,this_fild,had_str)
{
	var source = document.XMLDocument;

	if (had_str == "")
	{//nas_generate_substr("root/Create/SubSrv1","","","","")
		if (rel_xml == "")
		{	rel_xml = "root/Create/Sub_str";}
		var had_v=source.selectNodes(rel_xml);
		var had_t = had_v.nextNode();
		if (had_t)
		{
			had_str=had_t.text;
		}
	}	
	var str_arr = had_str.split('');	
	
	//alert(str_arr);
	var return_info = "";
		
	var sub_mark = sub_xml + "/option";
	var sub_id_mark = sub_xml + "/option/value";
	var sub_name_mark = sub_xml + "/option/caption";
	var sub_valid_mark = sub_xml + "/option/Preserve1";
	var sub_checked_mark = sub_xml + "/option/Preserve2";
	var sub_mutex_mark = sub_xml + "/option/Preserve_1";
	var sub_relating_mark = sub_xml + "/option/Preserve_2";

	var sub_v=source.selectNodes(sub_mark);
	var sub_id_v=source.selectNodes(sub_id_mark);
	var sub_name_v=source.selectNodes(sub_name_mark);
	var sub_valid_v=source.selectNodes(sub_valid_mark);
	var sub_checked_v=source.selectNodes(sub_checked_mark);
	var sub_mutex_v=source.selectNodes(sub_mutex_mark);
	var sub_relating_v=source.selectNodes(sub_relating_mark);

	var sub_t = "";
	var sub_id_t = "";
	var sub_name_t = "";
	var sub_valid_t = "";
	var sub_checked_t = "";
	var sub_mutex_t = "";
	var sub_relating_t = "";

	var sub_temp = "";
	var sub_id_temp = "";
	var sub_name_temp = "";
	var sub_valid_temp = "";
	var sub_checked_temp = "";
	var sub_mutex_temp = "";
	var sub_relating_temp = "";

	var i = 0;	//ʵ����ʾ��ָʾ��������������һ��
	var j = 0;	//��������ָʾ���������Ժ���ҵ�����Ĵ��봮

	var end_id = "";
	var default_id = "";

	return_info += "<input type='hidden' name='Sub_str' />";
	return_info += "<table width = '620px' border='2' cellpadding='1' cellspacing='2' bordercolor='#E6E6E6' bgcolor='#FFFFFF'>";
	return_info += "<tr class='trType' align='center'><td width='100%' bordercolor='#E6E6E6' bgcolor='#E6E6E6' colspan='6'><p align='center'>����ҵ����Ϣ</p></td></tr>";

	
	for(sub_t=sub_v.nextNode();sub_t;sub_t=sub_v.nextNode())
	{
		sub_temp = "";
		sub_id_temp = "";
		sub_name_temp = "";
		sub_valid_temp = "";

		sub_checked_temp = "";
		sub_mutex_temp = "";
		sub_relating_temp = "";

		sub_temp=sub_t.text;

		if (sub_temp!="")
		{

			sub_id_t=sub_id_v.nextNode();
			sub_name_t=sub_name_v.nextNode();
			sub_valid_t=sub_valid_v.nextNode();
			sub_checked_t=sub_checked_v.nextNode();
			sub_mutex_t=sub_mutex_v.nextNode();
			sub_relating_t=sub_relating_v.nextNode();

			if (sub_id_t && sub_name_t && sub_valid_t && sub_checked_t && sub_mutex_t && sub_relating_t)
			{
				
				
				sub_id_temp=sub_id_t.text;
				sub_name_temp=sub_name_t.text;
				sub_valid_temp=sub_valid_t.text;
				sub_checked_temp=sub_checked_t.text;
				sub_mutex_temp=sub_mutex_t.text;
				sub_relating_temp=sub_relating_t.text;
				
				
				if ((sub_checked_temp == "1" && str_arr[j] != "0") || (sub_checked_temp == "0" && str_arr[j] == "1"))
				{
					sub_checked_temp = "checked";
				}
				else
				{
					sub_checked_temp = "";
				}
				j++;
				

				if (sub_id_temp!="" && sub_name_temp!="" && sub_valid_temp!="")
				{
					if (sub_valid_temp == 1)
					{
						
						i++;
						//alert(i%4);
						//1:����4�����һ��
						//2:��1:��һ��

						if (i%4 == 1)
						{
							return_info += "<tr class='newtrType'><td width='150' bordercolor='#A2BEE1' bgcolor='#A2BEE1' height='0'><input type='checkbox'  name='check_box_create_add_info' value = '"+ sub_id_temp + "' "+sub_checked_temp+" onclick='nas_sub_click(this.value)'/>"+sub_name_temp+"</td>";
						}
						else if (i%4 == 0)
						{
							return_info += "<td width='150' bordercolor='#A2BEE1' bgcolor='#A2BEE1' height='0'><input type='checkbox'  name='check_box_create_add_info' value = '"+ sub_id_temp +"' "+sub_checked_temp+" onclick='nas_sub_click(this.value)'/>"+sub_name_temp+"</td></tr>";
						}
						else
						{
							return_info += "<td width='150' bordercolor='#A2BEE1' bgcolor='#A2BEE1' height='0'><input type='checkbox'  name='check_box_create_add_info' value = '"+ sub_id_temp + "' "+sub_checked_temp+" onclick='nas_sub_click(this.value)'/>"+sub_name_temp+"</td>";
						}
						
						default_id = sub_id_temp - 1;
						
					}
					else
					{
						return_info += "<input type='hidden'  name='check_box_create_add_info' value = '"+ sub_id_temp + "'/>";
					}
					mutex_arr[parseInt(sub_id_temp*1)] = sub_mutex_temp?sub_mutex_temp:"";
					rel_arr[parseInt(sub_id_temp*1)] = sub_relating_temp?sub_relating_temp:"";
					
					/*alert(sub_id_temp);
					alert(rel_arr[sub_id_temp]);
					alert(mutex_arr[sub_id_temp]);*/
					
					end_id = sub_id_temp;
				}
			}
		}
	}
	//������������
	if (i%4 == 1)
	{
		return_info += "<td width='150' bordercolor='#A2BEE1' bgcolor='#A2BEE1' height='0'></td>";
		return_info += "<td width='150' bordercolor='#A2BEE1' bgcolor='#A2BEE1' height='0'></td>";
		return_info += "<td width='150' bordercolor='#A2BEE1' bgcolor='#A2BEE1' height='0'></td>";
		return_info += "</tr>";
	}
	else if (i%4 == 2)
	{
		return_info += "<td width='150' bordercolor='#A2BEE1' bgcolor='#A2BEE1' height='0'></td>";
		return_info += "<td width='150' bordercolor='#A2BEE1' bgcolor='#A2BEE1' height='0'></td>";
		return_info += "</tr>";
	}
	else if (i%4 == 3)
	{
		return_info += "<td width='150' bordercolor='#A2BEE1' bgcolor='#A2BEE1' height='0'></td>";
		return_info += "</tr>";
	}
	else
	{}

	return_info += "</table>";


	if (default_id!="" && had_str == "")//�����ѡ�񣬲��Ҳ���ҵ����--û�д��봮
	{
		//alert(document.forms[0].check_box_create_add_info[default_id].value);
		//nas_sub_click(document.forms[0].check_box_create_add_info[default_id].value);		
	}//ʹ���һ��Ĭ��ѡ�����ҵ�񴥷�onclick����;
	
	//alert(return_info);
	return return_info;

}

//�ϲ��������ĺ�����onclickǰ������Ҫ����
function nas_generate_unit(this_fild)
{
	if (typeof(document.forms[0].check_box_create_add_info)!='undefined')
	{
		var the_str = "";
		if (typeof(document.forms[0].check_box_create_add_info.length)!='undefined')
		{
			for (var i=0;i<document.forms[0].check_box_create_add_info.length;i++)
			{
				if (document.forms[0].check_box_create_add_info[i].checked==true)
				{
					the_str +="1";
				}
				else
				{
					the_str +="0";
				}
			}
		}//����һ��
		else
		{
			if (document.forms[0].check_box_create_add_info[i].checked==true)
			{
				the_str ="1";
			}
			else
			{
				the_str ="0";
			}
		}
		//alert(the_str);
		return the_str;
	}//���ڸ���ҵ��
	else
	{
		return "";
	}
}

//onclick�¼������ģ�
function nas_sub_click(this_fild_value)
{
	var current_str = nas_generate_unit('');
	var current_length = current_str.length;
	//alert(current_str);
	//alert(current_length);
	
	//�ִ����Ǵ�0λ��ʼ�ģ����������Ǵ�1��ʼ��
	//alert(current_str.indexOf('0',2));	//return;
	//alert(current_str.slice(0,1));

	var a_first_point = this_fild_value;//������ֵһ�£�����IDֵ��:Ӧ���Ǵ�λ�õ�+1

	var k = 0;
	var trans_str = "";
	var s_sub_point;	//��ǰ���Ҵ���λ��
	var s_cir_point;	//ѭ��������ҵ���Ӧ�������±�ֵ��
	var last_compare;	//һ��5������ѭ�����ϴ�����ѭ�����ֵ��

	var if_check;

	while (k < 5)
	{
		last_compare = current_str;//�ϴαȽϵĴ�
		
		/****����ѭ��Start**/
		s_sub_point = a_first_point; //������ѭ������ʼ������ǰλ�ü�1--Ҳ���ǵ�ǰ����ֵfirst_point
		
		while (s_sub_point < current_length)
		{
			//alert(s_sub_point + "��" + current_str);
			s_cir_point = current_str.indexOf('1',s_sub_point);
			
			if_check = ((typeof(mutex_arr[(s_cir_point+1)])!='undefined') && (typeof(rel_arr[(s_cir_point+1)])!='undefined') && mutex_arr[(s_cir_point+1)]!="" && rel_arr[(s_cir_point+1)]!="" && current_str!="");
			
			if (if_check)
			{
				trans_str = trans_new_str(mutex_arr[(s_cir_point+1)],current_str,rel_arr[(s_cir_point+1)],s_cir_point);
				current_str = trans_str;
			}
	 		s_sub_point++;	//s_sub_point = s_cir_point+1;//----��һ���ң���Ӧ�ӱ����ҵ����ڼ�1����Ϊ�������Ѿ����ˣ�����֮ǰ�Ŀ���Ҳ��ѡ�е�
	 		
	 		//alert(current_str);
		}
		
		s_sub_point = 0;
		
		while (s_sub_point <= a_first_point)//���ҵ�ǰclick֮ǰ��
		{
			s_cir_point = current_str.indexOf('1',s_sub_point)

			if_check = ((typeof(mutex_arr[(s_cir_point+1)])!='undefined') && (typeof(rel_arr[(s_cir_point+1)])!='undefined') && mutex_arr[(s_cir_point+1)]!="" && rel_arr[(s_cir_point+1)]!="" && current_str!="");

			if (if_check)
			{
				//alert(mutex_arr[(s_cir_point+1)] + "--" + rel_arr[(s_cir_point+1)]);
				trans_str = trans_new_str(mutex_arr[(s_cir_point+1)],current_str,rel_arr[(s_cir_point+1)],s_cir_point);
				current_str = trans_str;
			}
			
			s_sub_point++;//s_sub_point = s_cir_point+1;//----��һ���ң���Ӧ�ӱ����ҵ����ڼ�1����Ϊ�������Ѿ����ˣ�����֮ǰ�Ŀ���Ҳ��ѡ�е�
		}
		
		k=k+1;
		
		/****����ѭ��End**/
		if (last_compare == current_str)
		{
			break;
		}
	}
	
	/*alert(document.forms[0].check_box_create_add_info[1].id);
	alert(document.forms[0].check_box_create_add_info[1].name);
	alert(document.forms[0].check_box_create_add_info[1].value);
	alert(document.forms[0].check_box_create_add_info[1].type);*/
	
	for (var j=0;j<current_length;j++)
	{
		var i = j+1;

		if (current_str.slice(j,i) == 1 || current_str.slice(j,i) == '1')
		{

			if(document.forms[0].check_box_create_add_info[j].type=='checkbox')
			{
				document.forms[0].check_box_create_add_info[j].checked = true;
			}
		}
		else
		{
			if(document.forms[0].check_box_create_add_info[j].type=='checkbox')
			{
				document.forms[0].check_box_create_add_info[j].checked = false;
			}
		}
	}

	budget_again();

}

//���ݻ��������ϵ���㴮
function trans_new_str(mutex_str,current_str,rel_str,s_point)
{
	//alert(mutex_str);
	//alert(current_str);
	//alert(rel_str);
	//alert(s_point);
	//s_point:��0��ʼ
	
	var re_str = "";
	//��鲻Ҫ���Լ�����(������֮��Ƚ�,λ��Ӧ��һ��)
	if (mutex_str.slice(s_point,(s_point+1)) == "1")
	{
		alert('��ҵ��'+(s_point+1)+'��������ڻ����ϵ����˲飡');
		//return current_str;
		return "";
	}
	
	
	for (var j=0;j<current_str.length;j++)
	{
		var i = j+1;
		
		if (mutex_str.slice(j,i) == '1' && rel_str.slice(j,i) == '1')
		{
			alert('��ҵ��'+(s_point+1)+'��'+i+'��������ϵ���ڳ�ͻ����˲飡');
			//return current_str;
			return "";
		}
		else
		{
			if (mutex_str.slice(j,i) == '1')
			{
				re_str += "0";
			}
			else
			{
				if (rel_str.slice(j,i) == '1' || current_str.slice(j,i) == '1')
				{
					re_str += "1";
				}
				else
				{
					re_str += "0";
				}		
			}	
		}//��黥��͹�������Ҫ��ͻ
	}
	//alert(re_str);

	return re_str;
}




