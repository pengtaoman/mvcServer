/**
 * <p>Name: nas_accept_common.js</p>
 * <p>Description: Ԥ�㡢�ύ����ѯ���롢��ѯ�ύ����</p>
 * <p>AppArea: Ӫҵϵͳ����ҵ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @date 20021206
 * @version 1.0
**/

//alert('nas_accept_common.js���óɹ�');


fee_str_arr = new Array();
no_err_message=true;
identity_current_value = 1;
identity_current_text = "";

function f_print_go_service_update(srl_name,trg_name,opr_name)
{
	var check_ok = check_column();

	if (check_ok)
	{

		uni_fee ();
		uni_sub_str();
		document.forms[0].action=srl_name;
		document.forms[0].target=trg_name;
		document.forms[0].OptrType.value=opr_name;
		document.forms[0].print_click.value=1;
		/*alert(document.forms[0].action);
		alert(document.forms[0].target);
		alert(document.forms[0].OptrType.value);*/

		go_disabled(document.forms[0]);

		set_disabled();

		document.forms[0].submit();
	}
	return;
}

function commit_go_service_update(srl_name,trg_name,opr_name)
{
	var check_ok = check_column();
	var print_click=document.forms[0].print_click.value;

	if (check_ok)
	{
		//Ϊʲôע�ͣ�
		/*if(print_click!=1){
			alert("���Ƚ������ӡ������");
			return;
		}*/
		uni_fee ();
		uni_sub_str();
		document.forms[0].action=srl_name;
		document.forms[0].target=trg_name;
		document.forms[0].OptrType.value=opr_name;

		/*alert(document.forms[0].action);
		alert(document.forms[0].target);
		alert(document.forms[0].OptrType.value);*/

		go_disabled(document.forms[0]);

		set_disabled();

		document.forms[0].submit();
	}
	return;
}

function on_load_focus(this_filed)
{
	if (this_filed == "")
	{
		this_filed.focus();
	}
	else
	{
		if (typeof(document.forms[0].Service_id)!='undefined')
		{	document.forms[0].Service_id.focus();
		}
	}
	return;
}

function nas_select_pass(srv_id,srl_name,trg_name,opr_name)
{
	if (srv_id.value == "" || !area_code_equa(srv_id))
	{
		alert("������ҵ���ʶ�ţ�");
		srv_id.focus();
	}
	else
	{
		document.forms[0].method="POST";
		document.forms[0].action=srl_name;
		document.forms[0].target=trg_name;
		document.forms[0].OptrType.value=opr_name;

		/*alert(document.forms[0].method);
		alert(document.forms[0].action);
		alert(document.forms[0].target);
		alert(document.forms[0].OptrType.value);*/

		if (typeof(document.forms[0].BQuery)!='undefined')
			document.forms[0].BQuery.disabled = true;

		document.forms[0].submit();
	}
	return;
}

function nas_select_info(srv_id,pass,srl_name,trg_name,opr_name)
{
	if (srv_id.value == "" || !area_code_equa(srv_id))
	{
		alert("������ҵ���ʶ�ţ�");
		srv_id.focus();
	}
	else
	{
		document.forms[0].method="POST";
		document.forms[0].action=srl_name;
		document.forms[0].target=trg_name;
		document.forms[0].OptrType.value=opr_name;

		if (typeof(document.forms[0].BBudget)!='undefined')
			document.forms[0].BBudget.disabled = true;
		if (typeof(document.forms[0].BSubmit)!='undefined')
			document.forms[0].BSubmit.disabled = true;
		if (typeof(document.forms[0].BFprint)!='undefined')
			document.forms[0].BFprint.disabled = true;
		if (typeof(document.forms[0].BFprint)!='undefined')
			document.forms[0].BFprint.disabled = true;
		if (typeof(document.forms[0].BBalance)!='undefined')
			document.forms[0].BBalance.disabled = true;

		if (typeof(document.forms[0].BQuery)!='undefined')
			document.forms[0].BQuery.disabled = true;

		document.forms[0].submit();
	}
	return;
}

function budget_go(srl_name,trg_name,opr_name)
{
	var check_ok = check_column();
	//var check_ok = 1;

	if (check_ok)
	{
		uni_sub_str();
		document.forms[0].action=srl_name;
		document.forms[0].target=trg_name;
		document.forms[0].OptrType.value=opr_name;

		/*alert(document.forms[0].action);
		alert(document.forms[0].target);
		alert(document.forms[0].OptrType.value);*/
		go_disabled(document.forms[0]);

		set_disabled();

		document.forms[0].submit();
	}
	return;
}

//��װԤ�㣬��tabҳ�Ĵ���
function budget_go_new(srl_name,trg_name,opr_name)
{
	var check_ok = check_column();
	if (check_ok)
	{
		if (typeof(tabset1_tab3)!='undefined')
		{
			if (typeof(tabset1_tab3.all('ser_div').all("Sub_str"))!='undefined')
			{
				var sub_str ="";
				sub_str = nas_generate_unit_new("tabset1_tab3.all('ser_div')","check_box_create_add_info");
				tabset1_tab3.all('ser_div').all("Sub_str").value = sub_str;
				document.forms[0].Sub_str_fj.value = sub_str;

			}
		}
		/*if (typeof(tabset1_tab3.all('ser_div').all("Sub_str_cz"))!='undefined')
		{
			var sub_str_cz ="";
			sub_str_cz = nas_generate_unit_new("tabset1_tab3.all('ser_div')","check_box_cz");
			tabset1_tab3.all('ser_div').all("Sub_str_cz").value = sub_str_cz;


		}*/
		attbus_roam = 0;
		in_roam = 0;
		out_roam = 0;
		if(document.forms[0].service_kind_str == '8~9~15~' || document.forms[0].service_kind_str == '8~9~' || document.forms[0].service_kind_str == '9~8~15~' || document.forms[0].service_kind_str == '9~8~')
		{
			if(window.parent.frames[0].tabset1_tab4.all("sub_att_div").all("in_roam")[0].checked == true)
				 in_roam = 1;
			else
				in_roam = 0;
			if(window.parent.frames[0].tabset1_tab4.all("sub_att_div").all("in_roam")[1].checked == true)
				out_roam = 1;
			else
				out_roam = 0;
		}
		//0 δ��ͨ  1 ����������  2 ����������  3 ���ʼӹ�������

		if(in_roam == 0 && out_roam == 0)
		{
			attbus_roam = 0;
		}
		else if(in_roam == 1 && out_roam == 1)
		{
			attbus_roam = 3;
		}
		else if(in_roam == 1 && out_roam == 0)
		{
			attbus_roam = 2;
		}
		else if(in_roam == 0 && out_roam == 1)
		{
			attbus_roam = 1;
		}
		document.forms[0].attbus_roam.value = attbus_roam;
		document.forms[0].action=srl_name;
		document.forms[0].target=trg_name;
		document.forms[0].OptrType.value=opr_name;

		go_disabled(document.forms[0]);

		set_disabled();

		document.forms[0].submit();
	}
}

function budget_go_toll(srl_name,trg_name,opr_name)
{
	var check_ok = check_column();
	//var check_ok = 1;

	if (check_ok)
	{
		document.forms[0].action=srl_name;
		document.forms[0].target=trg_name;
		document.forms[0].OptrType.value=opr_name;

		/*alert(document.forms[0].action);
		alert(document.forms[0].target);
		alert(document.forms[0].OptrType.value);*/
		go_disabled(document.forms[0]);

		//set_disabled();
		set_bt_disabled();
		document.forms[0].submit();
	}
}

function commit_go_toll(srl_name,trg_name,opr_name)
{
	var check_ok = check_column();

	if (check_ok)
	{

		uni_fee ();
		uni_sub_str();
		document.forms[0].action=srl_name;
		document.forms[0].target=trg_name;
		document.forms[0].OptrType.value=opr_name;

		/*alert(document.forms[0].action);
		alert(document.forms[0].target);
		alert(document.forms[0].OptrType.value);*/

		go_disabled(document.forms[0]);

		//set_disabled();
		set_bt_disabled();
		document.forms[0].submit();
	}
}

function commit_go(srl_name,trg_name,opr_name)
{
	var check_ok = check_column();
	//var check_ok = 1;
	if (check_ok)
	{

		uni_fee ();

		uni_sub_str();
		document.forms[0].action=srl_name;
		document.forms[0].target=trg_name;
		document.forms[0].OptrType.value=opr_name;

		/*alert(document.forms[0].action);
		alert(document.forms[0].target);
		alert(document.forms[0].OptrType.value);*/

		go_disabled(document.forms[0]);

		set_disabled();

		document.forms[0].submit();
	}
	return;
}

//��װ��
function commit_go_new(srl_name,trg_name,opr_name)
{
	var check_ok = check_column();
	//var check_ok = 1;
	if (check_ok)
	{

		uni_fee ();

		document.forms[0].action=srl_name;
		document.forms[0].target=trg_name;
		document.forms[0].OptrType.value=opr_name;

		/*alert(document.forms[0].action);
		alert(document.forms[0].target);
		alert(document.forms[0].OptrType.value);*/

		go_disabled(document.forms[0]);

		set_disabled();

		document.forms[0].submit();
	}
	return;
}

function inherit_go(iden_kind,iden_code,srl_name,trg_name,opr_name)
{
	var inherit_allow = 0;
	if (typeof(document.forms[0].Inherit_allow)!='undefined')
	{
		inherit_allow = document.forms[0].Inherit_allow.value;
	}
	else if (typeof(document.forms[0].InheritAllow)!='undefined')
	{
		inherit_allow = document.forms[0].InheritAllow.value;
	}

	if (checkclientcode(iden_kind,iden_code))
	{
		//alert(document.forms[0].Inherit_allow.value);

		code_user_accord();

		if (iden_kind.value!="" && iden_kind.value!="-200" && iden_code.value!="" && (inherit_allow=="1" || inherit_allow=="2"))
		{
			document.forms[0].action=srl_name;
			document.forms[0].target=trg_name;
			document.forms[0].OptrType.value=opr_name;

			/*alert(document.forms[0].action);
			alert(document.forms[0].target);
			alert(document.forms[0].OptrType.value);*/

			//���ӣ�
			//set_disabled();

			document.forms[0].submit();
		}
	}
	return;
}

//java���ƶ�ҵ��ҳ�����̳а�Ť��Ҫִ�е��¼� add wangjunjie 20040419
function inherit_fun(srl_name,trg_name,opr_name)
{
	if(document.forms[0].Query_mode.value == "1")
	{
		if(document.forms[0].iden_id.value == "")
		{
			alert("������֤������.");
			return;
		}
	}
	else
	{
		if(document.forms[0].ser_id.value == "")
		{
			alert("������ҵ���ʶ��.");
			return;
		}
	}
	document.forms[0].action=srl_name;
	document.forms[0].target=trg_name;
	document.forms[0].OptrType.value=opr_name;
	document.forms[0].submit();
	return;
}

function only_check(iden_kind,iden_code)
{
	if (checkclientcode(iden_kind,iden_code))
	{
		code_user_accord();
	}
	return;
}

function uni_fee ()
{
	var fee_str = "";
	if (typeof(fee_str_arr)!='undefined')
	{
		for(var i=0;i<fee_str_arr.length;i++)
		{
			if (typeof(fee_str_arr[i])!='undefined' && typeof(document.forms[0].favour_sum[(i+1)])!='undefined' && typeof(document.forms[0].favour_reason[(i+1)])!='undefined')
			{
				fee_str += fee_str_arr[i]+document.forms[0].favour_sum[(i+1)].value+"`"+document.forms[0].favour_reason[(i+1)].value+"`0`~";
			}
		}
	}
	if (typeof(document.forms[0].Fee_str)!='undefined')
	{
		document.forms[0].Fee_str.value = fee_str;
	}
	//alert(document.forms[0].Fee_str.value);
	return;
}

function uni_sub_str ()
{
	var sub_str = "";

	if (typeof(document.forms[0].Sub_str)!='undefined')
	{
		sub_str = nas_generate_unit("");

		document.forms[0].Sub_str.value = sub_str;
		//alert(document.forms[0].Sub_str.value);
	}
	return;
}


function show_customer_level_info()
{
	var info_value="";
	cus_span_info_1.innerHTML=info_value;
	cus_span_info_2.innerHTML=info_value;
	cus_span_info_3.innerHTML=info_value;
	cus_span_info_4.innerHTML=info_value;
	cus_span_info_5.innerHTML=info_value;
	cus_span_info_6.innerHTML=info_value;
	cus_span_info_7.innerHTML=info_value;
	cus_span_info_8.innerHTML=info_value;
	cus_span_info_9.innerHTML=info_value;
	cus_span_info_10.innerHTML=info_value;
	cus_span_info_11.innerHTML=info_value;
	//cus_span_info_12.innerHTML=info_value;

	var aa = 3;

	var temp_div = "";
	var div_value = "";

	if (document.forms[0].Customer_kind.value < 30)
	//if (aa < 30)
	{

		info_value = "�Ա�";
		cus_span_info_1.innerHTML=info_value;

		temp_div = find_Obj("sex_div");
		div_value = temp_div.innerHTML;
		info_value = "<select name='Sex' class='newdrawdownType'  onkeypress='nas_enter_jump(event,this)'>";
		//info_value += "<xsl:for-each select='Sex/option'><option><xsl:attribute name='value'><xsl:value-of select='value'/></xsl:attribute><xsl:value-of select='caption'/></option></xsl:for-each>";
		info_value += div_value;
		info_value += "</select>";
		cus_span_info_2.innerHTML=info_value;


		info_value = "��������";
		cus_span_info_3.innerHTML=info_value;

		temp_div = find_Obj("bir_div");
		div_value = temp_div.innerText;
		info_value = "<input type='text' class='newtextType' name='Birthday' size='13'  maxlength='10' onkeypress=\" return nas_date_onkey(event,this,'-',0);\"  ";
		//info_value = "<xsl:attribute name='value'><xsl:value-of select='Birthday'/></xsl:attribute>";
		info_value += "value='";
		info_value += div_value;
		info_value += "'></input>";
		cus_span_info_4.innerHTML=info_value;


		info_value = "����ˮƽ";
		cus_span_info_5.innerHTML=info_value;

		temp_div = find_Obj("grd_div");
		div_value = temp_div.innerHTML;
		info_value = "<select name='Bringup_grade' class='newdrawdownType'  onkeypress='nas_enter_jump(event,this)'>";
		//info_value += "<xsl:for-each select='Bringup_grade/option'><option><xsl:attribute name='value'><xsl:value-of select='value'/></xsl:attribute><xsl:value-of select='caption'/></option></xsl:for-each>";
		info_value += div_value;
		info_value += "</select>";
		cus_span_info_6.innerHTML=info_value;

		info_value = "н��ˮƽ";
		cus_span_info_7.innerHTML=info_value;

		temp_div = find_Obj("Inc_div");
		div_value = temp_div.innerHTML;
		info_value = "<select name='Income_level' class='newdrawdownType'  onkeypress='nas_enter_jump(event,this)'>";
		//info_value = "<xsl:for-each select='Income_level/option'><option><xsl:attribute name='value'><xsl:value-of select='value'/></xsl:attribute><xsl:value-of select='caption'/></option></xsl:for-each>";
		info_value += div_value;
		info_value += "</select>";
		cus_span_info_8.innerHTML=info_value;

	}
	else
	{
		info_value = "��λ����*";
		cus_span_info_1.innerHTML=info_value;

		temp_div = find_Obj("grp_div");
		div_value = temp_div.innerHTML;
		info_value = "<select name='Group_kind' class='newdrawdownType'  onkeypress='nas_enter_jump(event,this)'>";
		//info_value += "<xsl:for-each select='Group_kind/option'><option><xsl:attribute name='value'><xsl:value-of select='value'/></xsl:attribute><xsl:value-of select='caption'/></option></xsl:for-each>";
		info_value += div_value;
		info_value += "</select>";
		cus_span_info_2.innerHTML=info_value;


		info_value = "����*";
		cus_span_info_3.innerHTML=info_value;

		temp_div = find_Obj("cor_div");
		div_value = temp_div.innerHTML;
		info_value = "<input type='text' class='newtextType' name='Corporation' size='13'  maxlength='64'  onkeypress='nas_enter_jump(event,this)' ";
		//info_value += "<xsl:attribute name='value'><xsl:value-of select='Corporation'/></xsl:attribute>";
		info_value += "value='";
		info_value += div_value;
		info_value += "'></input>";
		cus_span_info_4.innerHTML=info_value;


		info_value = "֤������*";
		cus_span_info_5.innerHTML=info_value;

		temp_div = find_Obj("corkind_div");
		div_value = temp_div.innerHTML;
		info_value = "<select name='Corporation_iden_kind' class='newdrawdownType' onChange='change_id(document.forms[0].Corporation_iden_code);'  onkeypress='nas_enter_jump(event,this)'>";
		//info_value += "<xsl:for-each select='Corporation_iden_kind/option'><option><xsl:attribute name='value'><xsl:value-of select='value'/></xsl:attribute><xsl:value-of select='caption'/></option></xsl:for-each>";
		info_value += div_value;
		info_value += "</select>";
		cus_span_info_6.innerHTML=info_value;

		info_value = "֤�����*";
		cus_span_info_7.innerHTML=info_value;

		temp_div = find_Obj("corcode_div");
		div_value = temp_div.innerHTML;
		info_value = "<input type='text' class='newtextType' name='Corporation_iden_code' size='13' maxlength='32'  onfocus = 'setlength(document.forms[0].Corporation_iden_kind,this);' onkeypress = 'return on_key_id(document.forms[0].Corporation_iden_kind,this,this);'   onBlur=\"checkclientcode(document.forms[0].Corporation_iden_kind,this)\"";
		//info_value += "<xsl:attribute name='value'><xsl:value-of select='Corporation_iden_code'/></xsl:attribute>";
		info_value += "value='";
		info_value += div_value;
		info_value += "'></input>";
		cus_span_info_8.innerHTML=info_value;

		info_value = "���˵绰*";
		cus_span_info_9.innerHTML=info_value;

		temp_div = find_Obj("corphone_div");
		div_value = temp_div.innerHTML;
		info_value = "<input type='text' class='newtextType' name='Corporation_phone' size='13' maxlength='32'  onkeypress='nas_enter_jump(event,this)' ";
		//info_value += "<xsl:attribute name='value'><xsl:value-of select='Corporation_phone'/></xsl:attribute>";
		info_value += "value='";
		info_value += div_value;
		info_value += "'></input>";
		cus_span_info_10.innerHTML=info_value;


		//info_value = "<select  name='company_cust_kind' class='drawdownType'>";
		//info_value = info_value + create_comp_kind();
		//info_value = info_value + "</select>";
	}

	if (typeof(document.forms[0].Sex)!='undefined')
		nas_select_default("myform","Sex","Create/Sex/selected");
	if (typeof(document.forms[0].Income_level)!='undefined')
		nas_select_default("myform","Income_level","Create/Income_level/selected");
	if (typeof(document.forms[0].Bringup_grade)!='undefined')
		nas_select_default("myform","Bringup_grade","Create/Bringup_grade/selected");
	if (typeof(document.forms[0].Group_kind)!='undefined')
		nas_select_default("myform","Group_kind","Create/Group_kind/selected");
	if (typeof(document.forms[0].Corporation_iden_kind)!='undefined')
		nas_select_default("myform","Corporation_iden_kind","Create/Corporation_iden_kind/selected");

	//temp_div = find_Obj("bir_div");
	//div_value = temp_div.innerHTML;
	//alert(document.forms[0].Birthday.value);

	return;
}

function find_Obj(name,doc_id)
{
	var p,i,x;

	if (!doc_id)
		doc_id=document;

	if((p=name.indexOf("?"))>0&&parent.frames.length)
	{	doc_id=parent.frames[name.substring(p+1)].document; name=name.substring(0,p);	}

	if(!(x=doc_id[name])&&doc_id.all)
		x=doc_id.all[name];
	for (i=0;!x&&i<doc_id.forms.length;i++)
		x=doc_id.forms[i][name];

	for(i=0;!x&&doc_id.layers&&i<doc_id.layers.length;i++)
		x=find_Obj(name,doc_id.layers[i].document);
	if(!x && doc_id.getElementById)
		x=doc_id.getElementById(name);

	return x;
}

function bus_solution_change(the_solution,srl_name,trg_name,opr_name)
{
	/*var the_value = the_solution.value;

	///////////��ԭ���ı���ס
	document.forms[0].reset();
	var the_form = the_solution.form;
	//--���ϴ��������ûҵĻָ�
	for (i=0;i<the_form.elements.length;i++)
	{
		if (the_form.elements[i].disabled == true && (the_form.elements[i].type == "text" || the_form.elements[i].type == "select-one"))
		{
			the_form.elements[i].disabled = false;
			//alert(the_form.elements[i].name +"--" +the_form.elements[i].disabled);
		}
	}
	//--���´����ͻ����ͺʹ����̡�����С��


	///////////

	fee_div.innerHTML="";
	fee_div.style.position = 'absolute';	//fee_div.style.visibility = 'hidden';
	*/

	//if (check_second_allow(the_solution,''))
	if (allow_change_solution())
	{
		document.forms[0].action = srl_name;
		document.forms[0].target = trg_name;
		document.forms[0].OptrType.value = opr_name;

	/*alert(document.forms[0].action);
	alert(document.forms[0].target);
	alert(document.forms[0].OptrType.value);*/

	//set_disabled();

		document.forms[0].submit();
	}

	return;

}

function number_go(the_field,ser_kind_check,resource_kind)
{
	if(document.forms[0].Innet_method.value != ""){
		var check_resource = nas_get_relation_value('root/Create/Innet_method/option','value','Preserve1',document.forms[0].Innet_method.value);
		if (check_resource == "1" || check_resource == "2")
		{
			if (the_field.value != "" && area_code_equa(the_field) && check_second_allow(the_field,document.forms[0].Area_code.value))
			{
				document.forms[0].action = srl_name;
				document.forms[0].target = trg_name;
				document.forms[0].OptrType.value = opr_name;
				set_disabled();
				document.forms[0].submit();
			}
		}
	}else{
		alert("��ѡ���豸���ͣ�");
	}
}

//��װ������
function number_go_new(the_field,ser_kind_check,resource_kind)
{
	if(the_field.value != "")
	{
		document.forms[0].ser_kind_check.value = ser_kind_check;
		document.forms[0].resource_kind.value = resource_kind;
		document.forms[0].resource.value = the_field.value;
		document.forms[0].action = "SourceComm";
		document.forms[0].target = "bottom";
		document.forms[0].OptrType.value = "resource_check_new";
		set_disabled();
		document.forms[0].submit();
	}

}


function set_disabled()
{
	var the_value;

	if (typeof(document.forms[0].service_id_temp)!='undefined')
	{
		document.forms[0].service_id.value = document.forms[0].service_id_temp.value;
		document.forms[0].service_id_temp.disabled = true;


	}

	set_bt_disabled();

	return;
}

function set_bt_disabled()
{
	var the_value;

	if (typeof(document.forms[0].BBudget)!='undefined')
		document.forms[0].BBudget.disabled = true;
	if (typeof(document.forms[0].BSubmit)!='undefined')
		document.forms[0].BSubmit.disabled = true;
	if (typeof(document.forms[0].BFprint)!='undefined')
		document.forms[0].BFprint.disabled = true;
	if (typeof(document.forms[0].BBalance)!='undefined')
		document.forms[0].BBalance.disabled = true;

	if (typeof(document.forms[0].BFprint)!='undefined')
		document.forms[0].BFprint.disabled = true;

	return;
}

function budget_again()
{
	if (typeof(window.parent.frames['header'].document.forms[0].BBudget)!='undefined')
	{
		if (window.parent.frames['header'].document.forms[0].BSubmit.disabled == false)
			window.parent.frames['header'].document.forms[0].BBudget.disabled = false;
	}
	if (typeof(window.parent.frames['header'].document.forms[0].BFprint)!='undefined')
		{	window.parent.frames['header'].document.forms[0].BFprint.disabled = true;}

	if (typeof(window.parent.frames['header'].document.forms[0].BSubmit)!='undefined')
		{	window.parent.frames['header'].document.forms[0].BSubmit.disabled = true;}

	if (typeof(window.parent.frames['header'].document.forms[0].BFprint)!='undefined')
		window.parent.frames['header'].document.forms[0].BFprint.disabled = true;

	return;
}


function budget_again_all()
{
	var again_all = 0;

	if (typeof(window.parent.frames['header'].document.forms[0].BFprint)!='undefined')
	{
		if (window.parent.frames['header'].document.forms[0].BFprint.disabled == false)
		{
			again_all = 1;
			window.parent.frames['header'].document.forms[0].BFprint.disabled = true;
		}
	}

	if (typeof(window.parent.frames['header'].document.forms[0].BSubmit)!='undefined')
	{
		if (window.parent.frames['header'].document.forms[0].BSubmit.disabled == false)
		{
			again_all = 1;
			window.parent.frames['header'].document.forms[0].BSubmit.disabled = true;
		}
	}

	if (typeof(window.parent.frames['header'].document.forms[0].BFprint)!='undefined')
	{
		if (window.parent.frames['header'].document.forms[0].BFprint.disabled == false)
		{
			again_all = 1;
			window.parent.frames['header'].document.forms[0].BFprint.disabled = true;
		}
	}

	if (typeof(window.parent.frames['header'].document.forms[0].BBudget)!='undefined')
	{
		//if (window.parent.frames['header'].document.forms[0].BSubmit.disabled == false)
		if (again_all == 1)
		{
			window.parent.frames['header'].document.forms[0].BBudget.disabled = false;
		}
	}

	return;
}

function allow_change_solution()
{
	var again_all = 0;

	if (typeof(window.parent.frames['header'].document.forms[0].BFprint)!='undefined')
	{
		if (window.parent.frames['header'].document.forms[0].BFprint.disabled == false)
		{
			again_all = 1;
			window.parent.frames['header'].document.forms[0].BFprint.disabled = true;
		}
	}

	if (typeof(window.parent.frames['header'].document.forms[0].BSubmit)!='undefined')
	{
		if (window.parent.frames['header'].document.forms[0].BSubmit.disabled == false)
		{
			again_all = 1;
			window.parent.frames['header'].document.forms[0].BSubmit.disabled = true;
		}
	}

	if (typeof(window.parent.frames['header'].document.forms[0].BFprint)!='undefined')
	{
		if (window.parent.frames['header'].document.forms[0].BFprint.disabled == false)
		{
			again_all = 1;
			window.parent.frames['header'].document.forms[0].BFprint.disabled = true;
		}
	}

	if (typeof(window.parent.frames['header'].document.forms[0].BBudget)!='undefined')
	{
		if (window.parent.frames['header'].document.forms[0].BBudget.disabled == false)
		{
			again_all = 1;
			window.parent.frames['header'].document.forms[0].BBudget.disabled = true;
		}
	}

	if (again_all == 1)
		return true;
	else
	{
		alert("ִ�в����������Ȳ�ѯ��");
		return false;
	}
	return;

}



function go_disabled(the_form)
{
	var i=0;
	var add_name;
	var add_value;
	var add_col_str = "";
	var v;

	if (typeof(disabled_div) !='undefined')
	{
		for (i=0;i<the_form.elements.length;i++)
		{
			if (the_form.elements[i].disabled == true && the_form.elements[i].type != "submit" && the_form.elements[i].type != "button")
			{
				add_name = the_form.elements[i].name;
				add_value = the_form.elements[i].value;

				add_col_str += "<input type='hidden' name='"+add_name+"' value = '"+add_value+"'>";

				//alert(add_col_str);

				//the_form.insertAdjacentHTML("BeforeEnd",add_col_str);
				//window.parent.frames['header'].fee_div.innerHTML=fee_info;
			}
		}

		//alert(add_col_str);

		v = 'show';
		if (disabled_div.style)
		{
			var obj=disabled_div.style;
			v=(v=='show')?'visible':(v='hide')?'hidden':v;
		}
		obj.visibility=v;
		obj.position='relative';

		disabled_div.innerHTML=add_col_str;
	}

	return;
}

function code_user_accord()
{
	if (typeof(document.forms[0].Identity_code)!='undefined' && typeof(document.forms[0].User_identity_code)!='undefined')
	{
		document.forms[0].User_identity_code.value = document.forms[0].Identity_code.value;
	}

	return;
}

function add_print()
{
	var submitparam = "<object ID='NeuPrint' WIDTH='0' HEIGHT='0' CLASSID='clsid:FBFD55C9-C23C-11D3-B65D-004005E66149' CODEBASE='/swiftprint.ocx'><param name='_Version' value='65536' /><param name='_ExtentX' value='1870' /><param name='_ExtentY' value='670' /><param name='_StockProps' value='0' /></object>";

	document.forms[0].insertAdjacentHTML("BeforeEnd",submitparam);

	//alert("ok");
	//document.forms[0].NeuPrint.classid = "clsid:FBFD55C9-C23C-11D3-B65D-004005E66149";
	//alert(document.forms[0].NeuPrint.classid);
	//print_something(document.forms[0].NeuPrint,"����");
	return;

}

function road_go (the_field,srl_name,trg_name,opr_name)
{
	if (the_field.value != ""  && check_second_allow(the_field,''))
	{
		document.forms[0].action = srl_name;
		document.forms[0].target = trg_name;
		document.forms[0].OptrType.value = opr_name;

		/*alert(document.forms[0].action);
		alert(document.forms[0].target);
		alert(document.forms[0].OptrType.value);*/

		//alert("in");
		//alert(document.forms[0].Road_name.value);

		set_bt_disabled();

		//by wangzc
		source_change("1");

		document.forms[0].submit();
	}

	return;

}

function bureau_go (the_field,srl_name,trg_name,opr_name)
{
	if (the_field.value != "" && the_field.value != "-200")
	{
		document.forms[0].action = srl_name;
		document.forms[0].target = trg_name;
		document.forms[0].OptrType.value = opr_name;

		/*alert(document.forms[0].action);
		alert(document.forms[0].target);
		alert(document.forms[0].OptrType.value);*/

		//alert("in");
		//alert(document.forms[0].Road_name.value);

		set_bt_disabled();

		//by wangzc
		source_change("1");

		document.forms[0].submit();
	}

	return;
}

function select_num_go (the_field,srl_name,trg_name,opr_name)
{
	if (the_field.value != "")
	{
		if(the_field == "Scdma")
		{
			document.forms[0].action = srl_name;
			document.forms[0].target = trg_name;
			document.forms[0].OptrType.value = opr_name;
			set_bt_disabled();
			document.forms[0].submit();
		}else
		{
		document.forms[0].action = srl_name;
		document.forms[0].target = trg_name;
		document.forms[0].OptrType.value = opr_name;

		/*alert(document.forms[0].action);
		alert(document.forms[0].target);
		alert(document.forms[0].OptrType.value);*/

		//alert("in");
		//alert(document.forms[0].Road_name.value);

		set_bt_disabled();

		source_change("2");

		document.forms[0].submit();
		}
	}
	else
	{
		if (typeof(the_field)!='undefined')
		{
			if (the_field.type!='hidden')
			{
				alert("��ѡ�����");
				the_field.focus();
			}
			else
			{
				alert("������ϢΪ�գ����ѯ��");
			}
		}
		else
		{
			alert("������Ϣ�ؼ������ڣ�����ϵͳ����Ա��ϵ��");
		}
	}

	return;
}

function area_code_equa (the_field)
{
	if (typeof(document.forms[0].Area_code)!='undefined')
	{
		if (the_field.value != document.forms[0].Area_code.value)
			return true;
		else
			return false;
	}
	return false;
}

function check_second_allow(the_field,roll_value)
{
	if (typeof(document.forms[0].BBudget)!='undefined')
	{
		if (document.forms[0].BBudget.disabled)
		{
			the_field.value = roll_value;
			alert('ִ��״̬��������ִ�в�ѯ������');

			return false;
		}
		else
		{
			return true;
		}
	}
	return true;
}

function source_change(kind)
{
	if (typeof(document.forms[0].Area_code)!='undefined' && typeof(document.forms[0].Bureau_id)!='undefined')
	{
		if (kind == "1" && typeof(document.forms[0].Area_code)!='undefined')
		{
			if (typeof(document.forms[0].Service_id_temp)!='undefined')
			{
				document.forms[0].Service_id_temp.value = document.forms[0].Area_code.value;
				if (typeof(document.forms[0].Service_id)!='undefined')
					document.forms[0].Service_id.value = document.forms[0].Area_code.value;
			}
			else
			{
				if (typeof(document.forms[0].New_service_id)!='undefined')
					document.forms[0].New_service_id.value = document.forms[0].Area_code.value;
			}
			document.forms[0].Area_id.disabled = false;
			document.forms[0].Bureau_id.disabled = false;
		}
		if (kind == "2")
		{
			document.forms[0].Area_id.disabled = false;
			document.forms[0].Bureau_id.disabled = false;
		}
	}
	return;
}


function set_accept_sec_init(){
	if (typeof(document.forms[0].AlertInfo)!='undefined')
	{
		var info = document.forms[0].AlertInfo.value;
	}
	else
	{
		var info = "";
	}
	/*
	if(info != ''){
		alert(info);
	}
	*/
	/*
	var queryPass = document.forms[0].IfQueryPass.value;
	if(queryPass == "no"){
		document.forms[0].BQueryPass.disabled = true;
	}
	*/

	if (typeof(document.forms[0].DisableType)!='undefined')
	{
		var disableType = document.forms[0].DisableType.value;
	}
	else
	{
		var disableType = "";
	}


	//alert(disableType);

	if(disableType == "init"){
		if (typeof(document.forms[0].BBudget)!='undefined')
			document.forms[0].BBudget.disabled = true;
		if (typeof(document.forms[0].BSubmit)!='undefined')
			document.forms[0].BSubmit.disabled = true;
		if (typeof(document.forms[0].BFprint)!='undefined')
			document.forms[0].BFprint.disabled = true;
		if (typeof(document.forms[0].BFprint)!='undefined')
			document.forms[0].BFprint.disabled = true;

	}
	if(disableType == "query" && info != ''){
		if (typeof(document.forms[0].BBudget)!='undefined')
			document.forms[0].BBudget.disabled = true;
		if (typeof(document.forms[0].BSubmit)!='undefined')
			document.forms[0].BSubmit.disabled = true;
		if (typeof(document.forms[0].BFprint)!='undefined')
			document.forms[0].BFprint.disabled = true;
		if (typeof(document.forms[0].BFprint)!='undefined')
			document.forms[0].BFprint.disabled = true;
	}
	if(disableType == "query" && info == ''){
		if (typeof(document.forms[0].BBudget)!='undefined')
			document.forms[0].BBudget.disabled = true;
		if (typeof(document.forms[0].BSubmit)!='undefined')
			document.forms[0].BSubmit.disabled = true;
		if (typeof(document.forms[0].BFprint)!='undefined')
			document.forms[0].BFprint.disabled = true;
		if (typeof(document.forms[0].BFprint)!='undefined')
			document.forms[0].BFprint.disabled = true;
	}
	return;
}

function f_print_go(srl_name,trg_name,opr_name,service_kind_str,apply_event)
{
	var check_ok = check_column();

	if (check_ok)
	{
		uni_fee ();
		uni_sub_str();
		document.forms[0].action=srl_name+"?print_ser_str="+service_kind_str+"&print_apply_event="+apply_event;
		document.forms[0].target=trg_name;
		document.forms[0].OptrType.value=opr_name;
		go_disabled(document.forms[0]);
		set_disabled();
		document.forms[0].submit();
	}
	return;
}

function f_print_go_toll(srl_name,trg_name,opr_name)
{
	var check_ok = check_column();

	if (check_ok)
	{

		uni_fee ();
		uni_sub_str();
		document.forms[0].action=srl_name;
		document.forms[0].target=trg_name;
		document.forms[0].OptrType.value=opr_name;

		/*alert(document.forms[0].action);
		alert(document.forms[0].target);
		alert(document.forms[0].OptrType.value);*/

		go_disabled(document.forms[0]);

		//set_disabled();
		set_bt_disabled();
		document.forms[0].submit();
	}
}

//������ʽ�ı�ʱ���ô˺���
//��������ʽѡ�񱻽и���ʱ������ѡ�š�
//jiangyun add
function innetMethodChangeGo(FieldObject)
{
	if(FieldObject.value == '101' || FieldObject.value == '102'){
		if(typeof(document.forms[0].BNumber) != 'undefined'){
			document.forms[0].BNumber.disabled = true;
		}
		if(typeof(document.forms[0].BPreserveNumber) != 'undefined'){
			document.forms[0].BPreserveNumber.disabled = true;
		}
	}else{
		if(typeof(document.forms[0].BNumber) != 'undefined'){
			document.forms[0].BNumber.disabled = false;
		}
		if(typeof(document.forms[0].BPreserveNumber) != 'undefined'){
			document.forms[0].BPreserveNumber.disabled = false;
		}
	}
	//add by maxl ����У԰������ʽ��������ʾ�Զ���װ
	if(typeof(document.forms[0].IfSelect) != 'undefined'){
		if (document.forms[0].IfSelect.value =="1"){
			if (FieldObject.value =="33" || FieldObject.value == "34" || FieldObject.value == "35" || FieldObject.value == "36"){
				for(var i=0;i<document.forms[0].elements.length;i++)
				{
					if(document.forms[0].elements[i].type=="checkbox")
					{
						if(document.forms[0].elements[i].value=="20")
						{
							document.forms[0].elements[i].checked=true;
						}
					}
				}
			}else{
				for(var i=0;i<document.forms[0].elements.length;i++)
				{
					if(document.forms[0].elements[i].type=="checkbox")
					{
						if(document.forms[0].elements[i].value=="20")
						{
							document.forms[0].elements[i].checked=false;
						}
					}
				}
			}
		}
	}
}

function acckind_relation_banks_comm(the_path,acc_kind)
{
	var acc_value = acc_kind.value;

	var source = document.XMLDocument;
	var mark = the_path + '/option';
	var node=source.selectNodes(mark);

	var acc_Preserve = '';
	var t ='';

	var the_value;
	var the_pre1;

	for(t=node.nextNode();t!=null;t=node.nextNode())
	{
		the_value=null;
		the_pre1=null;

		the_value = t.selectNodes('value').nextNode();
		if (the_value!=null)
		{
			if(the_value.text == acc_value)
			{
				the_pre1 = t.selectNodes('Preserve2').nextNode();
				if(the_pre1!=null)
				{
					acc_Preserve = the_pre1.text;
				}
				else
				{
					acc_Preserve = '0';
				}
				break;
			}
		}
	}

	if(acc_Preserve == "0" || acc_Preserve == "")	//���ʻ����Ͳ��漰����
	{
		if (typeof(document.forms[0].BankId)!='undefined')
			document.forms[0].BankId.disabled = true;
		if (typeof(document.forms[0].BankAccount)!='undefined')
			document.forms[0].BankAccount.disabled = true;
		if (typeof(document.forms[0].AccountName)!='undefined')
			document.forms[0].AccountName.disabled = true;
		if (typeof(document.forms[0].BankCharge)!='undefined')
			document.forms[0].BankCharge.disabled = true;
		if (typeof(document.forms[0].AgreementNo)!='undefined')
			document.forms[0].AgreementNo.disabled = true;
	}
	else					//����1���漰���У��ֽ��������Ҳ�鵽����
	{
		if (typeof(document.forms[0].BankId)!='undefined')
			document.forms[0].BankId.disabled = false;
		if (typeof(document.forms[0].BankAccount)!='undefined')
			document.forms[0].BankAccount.disabled = false;
		if (typeof(document.forms[0].AccountName)!='undefined')
			document.forms[0].AccountName.disabled = false;
		if (typeof(document.forms[0].BankCharge)!='undefined')
			document.forms[0].BankCharge.disabled = false;
		if (typeof(document.forms[0].AgreementNo)!='undefined')
			document.forms[0].AgreementNo.disabled = false;

		//���к󣬵������е�onchange�¼���
		/*������Ҳ��,����disabledǰӦ����ɱ仯��
			bank_relation(document.forms[0].Bank_id);
		*/
	}

	return true;

}

function acckind_relation_banks(the_path,acc_kind)
{
	var acc_value = acc_kind.value;

	var source = document.XMLDocument;
	var mark = the_path + '/option';
	var node=source.selectNodes(mark);

	var acc_Preserve = '';
	var t ='';

	var the_value;
	var the_pre1;

	for(t=node.nextNode();t!=null;t=node.nextNode())
	{
		the_value=null;
		the_pre1=null;

		the_value = t.selectNodes('value').nextNode();
		if (the_value!=null)
		{
			if(the_value.text == acc_value)
			{
				the_pre1 = t.selectNodes('Preserve1').nextNode();
				if(the_pre1!=null)
				{
					acc_Preserve = the_pre1.text;
				}
				else
				{
					acc_Preserve = '0';
				}
				break;
			}
		}
	}

	if(acc_Preserve == "0" || acc_Preserve == "")	//���ʻ����Ͳ��漰����
	{
		if (typeof(document.forms[0].Bank_id)!='undefined')
			document.forms[0].Bank_id.disabled = true;
		if (typeof(document.forms[0].Bank_account)!='undefined')
			document.forms[0].Bank_account.disabled = true;
		if (typeof(document.forms[0].Account_name)!='undefined')
			document.forms[0].Account_name.disabled = true;
		if (typeof(document.forms[0].Bank_charge)!='undefined')
			document.forms[0].Bank_charge.disabled = true;
		if (typeof(document.forms[0].Agreement_no)!='undefined')
			document.forms[0].Agreement_no.disabled = true;
	}
	else					//����1���漰���У��ֽ��������Ҳ�鵽����
	{
		if (typeof(document.forms[0].Bank_id)!='undefined')
			document.forms[0].Bank_id.disabled = false;
		if (typeof(document.forms[0].Bank_account)!='undefined')
			document.forms[0].Bank_account.disabled = false;
		if (typeof(document.forms[0].Account_name)!='undefined')
			document.forms[0].Account_name.disabled = false;
		if (typeof(document.forms[0].Bank_charge)!='undefined')
			document.forms[0].Bank_charge.disabled = false;
		if (typeof(document.forms[0].Agreement_no)!='undefined')
			document.forms[0].Agreement_no.disabled = false;

		//���к󣬵������е�onchange�¼���
		/*������Ҳ��,����disabledǰӦ����ɱ仯��
			bank_relation(document.forms[0].Bank_id);
		*/


	}

	return true;

}


//�������ò��֣�
function nas_user_accord()
{
	if (typeof(document.forms[0].first_name)!='undefined' && typeof(document.forms[0].contact_person)!='undefined')
	{
		document.forms[0].contact_person.value = document.forms[0].first_name.value;
	}

	if (typeof(document.forms[0].home_phone)!='undefined' && typeof(document.forms[0].contact_phone)!='undefined')
	{
		document.forms[0].contact_phone.value = document.forms[0].home_phone.value;
	}
	if (typeof(document.forms[0].home_address)!='undefined' && typeof(document.forms[0].comm_address)!='undefined')
	{
		document.forms[0].comm_address.value = document.forms[0].home_address.value;
	}
	if (typeof(document.forms[0].home_zip_code)!='undefined' && typeof(document.forms[0].comm_zip_code)!='undefined')
	{
		document.forms[0].comm_zip_code.value = document.forms[0].home_zip_code.value;
	}
	return;
}



function mailing_relation(the_kind)
{
	if (the_kind.value == "0")
	{
		if (typeof(document.forms[0].MailPerson)!='undefined')
		{
			document.forms[0].MailPerson.value = "";
			document.forms[0].MailPerson.disabled = true;
		}
		if (typeof(document.forms[0].MailAddress)!='undefined')
		{
			document.forms[0].MailAddress.value = "";
			document.forms[0].MailAddress.disabled = true;
		}
		if (typeof(document.forms[0].MailZip)!='undefined')
		{
			document.forms[0].MailZip.value = "";
			document.forms[0].MailZip.disabled = true;
		}
	}
	else if (the_kind.value == "6")
	{
		if (typeof(document.forms[0].MailPerson)!='undefined')
		{
			document.forms[0].MailPerson.disabled = false;
		}
		if (typeof(document.forms[0].MailAddress)!='undefined')
		{
			document.forms[0].MailAddress.disabled = false;
		}
		if (typeof(document.forms[0].MailZip)!='undefined')
		{
			document.forms[0].MailZip.value = "";
			document.forms[0].MailZip.disabled = true;
		}
	}
	else
	{
		if (typeof(document.forms[0].MailPerson)!='undefined')
		{
			document.forms[0].MailPerson.disabled = false;
		}
		if (typeof(document.forms[0].MailAddress)!='undefined')
		{
			document.forms[0].MailAddress.disabled = false;
		}
		if (typeof(document.forms[0].MailZip)!='undefined')
		{
			document.forms[0].MailZip.disabled = false;
		}
	}
	return;
}
function bank_relation(the_kind)
{
	if (the_kind.value != "")
	{
		if (typeof(document.forms[0].bank_account)!='undefined')
		{
			document.forms[0].bank_account.disabled = false;
		}
		if (typeof(document.forms[0].account_name)!='undefined')
		{
			document.forms[0].account_name.disabled = false;
		}
		if (typeof(document.forms[0].bank_charge)!='undefined')
		{
			document.forms[0].bank_charge.disabled = false;
		}
		if (typeof(document.forms[0].agreement_no)!='undefined')
		{
			document.forms[0].agreement_no.disabled = false;
		}

		nas_relation_build(the_kind,the_kind.form.bank_charge,'/root/Create','no');
		bankcharge_relation(the_kind.form.bank_charge);
	}
	else
	{
		if (typeof(document.forms[0].bank_account)!='undefined')
		{
			document.forms[0].bank_account.value = "";
			document.forms[0].bank_account.disabled = true;
		}
		if (typeof(document.forms[0].account_name)!='undefined')
		{
			document.forms[0].account_name.value = "";
			document.forms[0].account_name.disabled = true;
		}
		if (typeof(document.forms[0].bank_charge)!='undefined')
		{
			document.forms[0].bank_charge.value = "";
			document.forms[0].bank_charge.disabled = true;
		}
		if (typeof(document.forms[0].agreement_no)!='undefined')
		{
			document.forms[0].agreement_no.value = "";
			document.forms[0].agreement_no.disabled = true;
		}
		return false;

	}
	return;
}

function bank_relation_comm(the_kind,the_bankcharge)
{
	if (the_kind.value != "")
	{
		if (typeof(document.forms[0].BankAccount)!='undefined')
		{
			document.forms[0].BankAccount.disabled = false;
		}
		if (typeof(document.forms[0].AccountName)!='undefined')
		{
			document.forms[0].AccountName.disabled = false;
		}
		if (typeof(document.forms[0].BankCharge)!='undefined')
		{
			document.forms[0].BankCharge.disabled = false;
		}
		if (typeof(document.forms[0].AgreementNo)!='undefined')
		{
			document.forms[0].AgreementNo.disabled = false;
		}

		nas_relation_build(the_kind,the_bankcharge,'/root/Create','no');
		bankcharge_relation(the_bankcharge);
	}
	else
	{
		if (typeof(document.forms[0].bank_account)!='undefined')
		{
			document.forms[0].BankAccount.value = "";
			document.forms[0].BankAccount.disabled = true;
		}
		if (typeof(document.forms[0].AccountName)!='undefined')
		{
			document.forms[0].AccountName.value = "";
			document.forms[0].AccountName.disabled = true;
		}
		if (typeof(document.forms[0].BankCharge)!='undefined')
		{
			document.forms[0].BankCharge.value = "";
			document.forms[0].BankCharge.disabled = true;
		}
		if (typeof(document.forms[0].AgreementNo)!='undefined')
		{
			document.forms[0].AgreementNo.value = "";
			document.forms[0].AgreementNo.disabled = true;
		}
		return false;

	}
	return;
}

function bankcharge_relation(the_kind)
{
	//alert(the_kind.value);
	if (the_kind.value != "" && the_kind.value != "0")
	{
		if (typeof(document.forms[0].agreement_no)!='undefined')
		{
			document.forms[0].agreement_no.disabled = false;
		}
	}
	else
	{
		if (typeof(document.forms[0].agreement_no)!='undefined')
		{
			document.forms[0].agreement_no.value = "";
			document.forms[0].agreement_no.disabled = true;
		}
	}
	return;
}

//��̬IP�Ͳ������ƵĹ���
function ip_address_onblur(ip_field,max_field)
{
	//���ʧЧ����������1���̶�ʱ��
	//alert(nas_trim(ip_field.value)+'-');
	if (ip_field.value == null || nas_trim(ip_field.value) == "0.0.0.0" || nas_trim(ip_field.value) == "")
	{
		max_field.disabled = false;
	}
	else
	{
		max_field.value = 1;
		max_field.disabled = true;
	}

	return;

}

//���ܣ� ����/�������������Ԥ�����û���������޶�Ȳ������룻
//checkUserType(document.forms[0].User_kind,document.forms[0].Credit_control,document.forms[0].Pay_way,document.forms[0].Service_favour_id,this)
//--change by zhouty �������������  ��һ�����ƾͼ�һ���������� �½��治Ҫ������ˣ� ��user_kind_relation_accept()
function checkUserType(mainField,controlField1,controlField2,controlField3,controlField4,this_field)
{
	if (mainField.value == 0)
	{
		controlField1.value = 0;
		controlField2.value = 1 ;
		controlField3.value = 0 ;
		controlField4.value = "" ;
		controlField1.disabled = true;
		controlField2.disabled = true;
		controlField3.disabled = true;
		controlField4.disabled = true;
	} else {
		controlField1.value = 0;
		controlField2.value = 1 ;
		controlField3.value = 0 ;
		controlField4.value = "" ;
		controlField1.disabled = false;
		controlField2.disabled = false;
		controlField3.disabled = false;
		controlField4.disabled = false;
	}
	return;
}

//mainField: 0: Ԥ����		1:�󸶷�
function user_kind_relation_accept(mainField,controlField1,controlField2,controlField3,controlField4,this_field)
{
	//ԭ���ļƷѷ�ʽ��0��Ԥ���ѣ��ۺ����ݵĳ�ʼ�����ݸĳ���2
	if (mainField.value == "0" || mainField.value == "2")
	{
		//����ʱ��������ײ�
		/*if (typeof(document.forms[0].Service_favour_id)!='undefined')
		{
			document.forms[0].Service_favour_id.value=0;
			document.forms[0].Service_favour_id.disabled=true;
		}*/
		if (typeof(document.forms[0].Credit_control)!='undefined')
		{
			document.forms[0].Credit_control.value=0;//���ò�����
			document.forms[0].Credit_control.disabled=true;
		}
		if (typeof(document.forms[0].Pay_way)!='undefined')
		{
			document.forms[0].Pay_way.value=1;//������ñ����ֽ�
			document.forms[0].Pay_way.disabled=true;
		}
		if (typeof(document.forms[0].Service_credit)!='undefined')
		{
			document.forms[0].Service_credit.value="0.00";//����޶�0.00
			//document.forms[0].Service_credit.readOnly=true;
			document.forms[0].Service_credit.disabled=true;
		}

	}
	else
	{
		if (typeof(document.forms[0].Credit_control)!='undefined')
		{
			document.forms[0].Credit_control.disabled=false;
		}
		if (typeof(document.forms[0].Pay_way)!='undefined')
		{
			document.forms[0].Pay_way.disabled=false;
		}
		if (typeof(document.forms[0].Service_credit)!='undefined')
		{
			//document.forms[0].Service_credit.readOnly=false;
			document.forms[0].Service_credit.disabled=false;
		}
	}

	return;
}

//�û�����Ϊ:0Ԥ�����û�,���Ż��ײ�,���ÿ��ƺ�����޶�ɸ���.
function user_kind_relation(xml_info){
	var source = document.XMLDocument;
	var mark = xml_info;
	var node=source.selectNodes(mark);
	var text_xml = "";
	var temp = "";
	text_xml=node.nextNode();
	if (text_xml){
		temp = text_xml.text;
		if (temp=="0"){

			if (typeof(document.forms[0].Service_favour_id)!='undefined')
			{
				document.forms[0].Service_favour_id.disabled=true;
			}
			if (typeof(document.forms[0].Credit_control)!='undefined')
			{
				document.forms[0].Credit_control.value=0;//���ò�����
				document.forms[0].Credit_control.disabled=true;
			}
			if (typeof(document.forms[0].Service_credit)!='undefined')
			{
				document.forms[0].Service_credit.value="0.00";//����޶�0.00
				document.forms[0].Service_credit.readOnly=true;
			}

		} else if (temp=="1") {

			if (typeof(document.forms[0].Service_favour_id)!='undefined')
			{
				document.forms[0].Service_favour_id.disabled=false;
			}
			if (typeof(document.forms[0].Credit_control)!='undefined')
			{
				document.forms[0].Credit_control.disabled=false;
			}
			if (typeof(document.forms[0].Service_credit)!='undefined')
			{
				document.forms[0].Service_credit.readOnly=false;
			}
		}
	}

	return;
}

//�����������Ϊ���Ⲧ�ţ���IP����ֻ��Ϊ0��1
//---change by zhouty 20030710  �������ȥ����ֱ�ӷ���4�ı���;
function check_ip_num(innet_method_field,ip_num_field)
{

	/*if (innet_method_field.value==1){
		if (ip_num_field.value!="1" && ip_num_field.value!="0"){
			alert("Ip ����ֻ��Ϊ0����1");
			ip_num_field.focus();
			ip_num_field.select();
		}
	}
	return;*/

	return nas_check_ip_count(ip_num_field,4);

}


//���ݷ�������ȷ���ܷ���ȡ����
function set_ifquery_pass(the_svc_kind)
{
	var source = document.XMLDocument;
	var mark = "root/IfQueryPass";
	var node=source.selectNodes(mark);
	var text_xml = "";
	var temp = "";
	text_xml=node.nextNode();
	var queryPassKind;
	var the_value;
	var i;

	if (text_xml)
	{
		temp = text_xml.text;

		queryPass = temp.split('~');

		for (i=0;i<queryPass.length;i++)
		{
			the_value = queryPass[i].split('`');

			/*alert(the_value[0]);
			alert(the_value[1]);
			alert(the_svc_kind);*/

			if (the_value[0] == the_svc_kind)
			{
				if (the_value[1] =="0")
				{
					if (typeof(document.forms[0].BQueryPass)!='undefined')
						document.forms[0].BQueryPass.disabled = true;
				} else if (the_value[1] =="1")
				{
					if (typeof(document.forms[0].BQueryPass)!='undefined')
						document.forms[0].BQueryPass.disabled = false;
				} else {
					if (typeof(document.forms[0].BQueryPass)!='undefined')
						document.forms[0].BQueryPass.disabled = false;
				}

				return;
			}
		}
	}
	else
	{
		if (typeof(document.forms[0].BQueryPass)!='undefined')
			document.forms[0].BQueryPass.disabled = false;
		return;
	}

	return;
}

//�ı�ͣ����������,�仯ͣ��ԭ��
function accept_change_openstop(judge_value,rela_field,this_xml){

	if(judge_value == 11){

		if (this_xml == "" )
		{
			this_xml = "/root/Create/Reason_id_open";
		}

		nas_relation_build_comm(rela_field,this_xml,"no","");
	}
	if(judge_value == 10){

		if (this_xml == "" )
		{
			this_xml = "/root/Create/Reason_id_stop";
		}

		nas_relation_build_comm(rela_field,this_xml,"no","");
	}

	return;

}

//�ı�������ʽ�����򡢻������������к���󣬱仯��Ʒ
function accept_change_inmeth(judge_value,rela_field,this_xml)
{

	if(judge_value == 1){

		if (this_xml == "" )
		{
			this_xml = "/root/Create/Product_one";
		}
		else
		{
			this_xml = this_xml + "_one";
		}

		nas_relation_build_comm(rela_field,this_xml,"yes","");
	}
	if(judge_value == 2){

		if (this_xml == "" )
		{
			this_xml = "/root/Create/Product_two";
		}
		else
		{
			this_xml = this_xml + "_two";
		}

		nas_relation_build_comm(rela_field,this_xml,"yes","");
	}
	if(judge_value == 11){

		if (this_xml == "" )
		{
			this_xml = "/root/Create/Product_vone";
		}
		else
		{
			this_xml = this_xml + "_vone";
		}

		nas_relation_build_comm(rela_field,this_xml,"yes","");
	}
	if(judge_value == 12){

		if (this_xml == "" )
		{
			this_xml = "/root/Create/Product_vtwo";
		}
		else
		{
			this_xml = this_xml + "_vtwo";
		}

		nas_relation_build_comm(rela_field,this_xml,"yes","");
	}

	return;
}

//���з����仯��
function accept_calling_to_product(the_field)
{
	if (the_field.value != "")
	{
		if (typeof(document.forms[0].Innet_method)!='undefined')
		{
			document.forms[0].Innet_method.value = 2;
		}

		accept_change_inmeth(2,document.forms[0].Product_id,'');
	}
	else
	{
		if (typeof(document.forms[0].Innet_method)!='undefined')
		{
			document.forms[0].Innet_method.value = 1;
		}

		accept_change_inmeth(1,document.forms[0].Product_id,'');
	}

	return;
}



function check_source_go(the_field,srl_name,trg_name,opr_name)
{
	if (the_field.value != "" && the_field.value != "-200" )
	{
		var check_resource = nas_get_relation_value('root/Create/Innet_method/option','value','Preserve1',document.forms[0].Innet_method.value);
		if (check_resource == "1" || check_resource == "2")
		{
			document.forms[0].action = srl_name;
			document.forms[0].target = trg_name;
			document.forms[0].OptrType.value = opr_name;

			/*alert(document.forms[0].action);
			alert(document.forms[0].target);
			alert(document.forms[0].OptrType.value);*/

			set_disabled();

			document.forms[0].submit();
		}
	}
	return;
}

function install_kind_change(the_field)
{
	if (the_field.value == "2")/*��װ*/
	{
		if (typeof(document.forms[0].Road_name)!='undefined')
		{	document.forms[0].Road_name.disabled = false;}
		if (typeof(document.forms[0].Install_address)!='undefined')
		{	document.forms[0].Install_address.disabled = false;}
		if (typeof(document.forms[0].Road_name_info)!='undefined')
		{	document.forms[0].Road_name_info.disabled = false;}
		if (typeof(document.forms[0].Area_id)!='undefined')
		{	document.forms[0].Area_id.disabled = false;}

		if (typeof(document.forms[0].Pstn_service_id)!='undefined')
		{	document.forms[0].Pstn_service_id.value = '';
			document.forms[0].Pstn_service_id.disabled = true;
		}

		//alert(document.forms[0].Pstn_service_id.value);
	}
	else
	{
		if (typeof(document.forms[0].Pstn_service_id)!='undefined')
		{	document.forms[0].Pstn_service_id.disabled = false;
		}
	}

	return;
}

//����ҵ��ʧЧʱ���У��
function Expiration_date_status(nextField)
{
	nextField.value = "";
	if (typeof(document.forms[0].Expiration_flag)!='undefined')
	{
		if (document.forms[0].Expiration_flag.value == 1)//�̶�ʱ��
		{
			nextField.maxLength = 10;
		}
		else//== 2�״ε�¼��̶�����
		{
			nextField.maxLength = 8;
		}
	}

	nextField.focus();

}

function check_expiration_date(thisEvent,thisField,mask,thisMethod,relationField)
{
	if(relationField.value==1)
	{
		thisField.maxLength = 10;
		return nas_date_onkey(thisEvent,thisField,mask,thisMethod);
	}
	else if (relationField.value==2)
	{
		thisField.maxLength = 8;
		return nas_onkey(thisEvent,0,thisField,thisField,'ck_number','ֻ����������','true');
	}
	else
	{
		thisField.maxLength = 8;
		nas_enter_jump(thisEvent,thisField);
	}
	return true;
}

//����IP�����仯
function ip_num_change(ip_num_field)
{
	ip_num_field.value="0";
	ip_num_field.focus();
}

//ʧЧʱ���onkey�¼�
//20030703	ע��  Ϊʲôд����� �������ظ�
/*function expiration_onkey(event,flag_field,date_field)
{
	//���ʧЧ����������1���̶�ʱ��
	if (flag_field.value == 1)
	{
		return nas_date_onkey(event,date_field,'-',0);
	}
	else if (flag_field.value == 2)//���ʧЧ����������2���״ε�¼��̶�ʱ��
	{
		return nas_onkey(event,0,date_field,date_field,'ck_number','ֻ����������','true');
	}
	else
	{
		nas_enter_jump(event,date_field);
	}
	return;
}*/

//����ҵ������У�����
//add by zhouty 20030718
function accept_check_datapass(the_pass)
{
	var sure;
	if(the_pass.value == "")
	{
		sure = confirm("û��ָ�����룬�Ƿ�Ĭ�Ϲ����������룿");

		if (sure)
		{
			//nas_default_pass(document.forms[0].Identity_code,document.forms[0].Password);
			the_pass.value = " ";
			return true;
		}
		else
		{
			alert("���������룡");
			the_pass.focus();
			return false;
		}
	}
	else//У��һ�³���
	{
		//�ж��Ƿ��Ǻ��֣�����Ǻ�����У�鳤��
		return check_length_for_byte(the_pass,8);
	}
	return true;
}

//���������ĵĳ��Ⱥ�����
//������ the_field: �ؼ�	allow_length: �������󳤶�(maxlength��ֵ)
//add by zhouty 20030718
function check_length_for_byte(the_field,allow_length)
{
	var the_value = the_field.value;
	var result = 0;
	var i = 0;
	// For single byte browser, string length = no. of byte
	if ("��".length == 1)
	{
		// For double byte browser
		for (i=0;i<the_value.length;i++)
		{
			if (the_value.charCodeAt(i) >= 128)
			{
				// Non 7-bit char, count 2 bytes
				result += 2;
			} else {
				// 7-bit char
				result++;
			}
		}
	}
	else
	{
		result = the_field.length;
	}
	if (result > allow_length)
	{
		alert("�����ֵ����!��Ҫ����"+allow_length+"λ!(ÿ�������ַ�ռ��λ)");
		the_field.focus();
		the_field.select();
		return false;
	}
	else
	{
		return true;
	}
}
//��Դ��������˶�������ʽ���жϣ� �����������仯ʱӦǿ������У��
//add by zhouty 20030722
//������ the_field: Ҫ��յĿؼ�(Ҫ�������롢У��)
//		 the_value: ��պ󸳳�ʲôֵ�� һ����'' (��'-200')
function inmth_chg_resource(the_field,the_value)
{
	if (typeof(the_field)!='undefined')
	{	the_field.value = the_value;
	}
	return;
}
//����ҵ��(ҵ����)��ʼ�����õĹ��ú����� ������load_init�й��ò������������Ҫ�ڸ��Ե��ļ��ж��д��
function comm_load_init()
{
	//�����Ƿ���ȡ�������ȷ����ť״̬
	var querypass=get_xml_value("root","IfQueryPass","text");
	if (typeof(document.forms[0].IfQueryPass)!='undefined')
	{	document.forms[0].IfQueryPass.value = querypass;}
	if (typeof(document.forms[0].BQueryPass)!='undefined')
	{
		switch (querypass)
		{
			case "yes":
				document.forms[0].BQueryPass.disabled=false;
				break;
			case "no":
				document.forms[0].BQueryPass.disabled=true;
				break;
			default:
				document.forms[0].BQueryPass.disabled=true;
				break;
		}
	}
	//��Բ�ͬ״̬���ÿؼ�״̬�����
	var optr_type= get_xml_value("root","Submit_kind","text");
	switch (optr_type)
	{
		case "initial":
			if (typeof(document.forms[0].Service_id)!='undefined')
			{	document.forms[0].Service_id.focus();}
			if (typeof(document.forms[0].BQuery)!='undefined')
			{	document.forms[0].BQuery.disabled=false;}
			if (typeof(document.forms[0].BBudget)!='undefined')
			{	document.forms[0].BBudget.disabled=true;}
			if (typeof(document.forms[0].BSubmit)!='undefined')
			{	document.forms[0].BSubmit.disabled=true;}
			if (typeof(document.forms[0].BFprint)!='undefined')
			{	document.forms[0].BFprint.disabled=true;}
			if (typeof(document.forms[0].BBalance)!='undefined')
			{	document.forms[0].BBalance.disabled=true;}
			break;
		case "Query":
			var optr_ok= get_xml_value("root","Query_ok","text");
			if (optr_ok == "yes")
			{
				if (typeof(document.forms[0].First_name)!='undefined')
				{	document.forms[0].First_name.disabled=true;}
				if (typeof(document.forms[0].Identity_kind)!='undefined')
				{	document.forms[0].Identity_kind.disabled=true;}
				if (typeof(document.forms[0].Identity_code)!='undefined')
				{	document.forms[0].Identity_code.disabled=true;}
			}
			else
			{
				if (typeof(document.forms[0].Service_id)!='undefined')
				{	document.forms[0].Service_id.focus();}
				if (typeof(document.forms[0].BBudget)!='undefined')
				{	document.forms[0].BBudget.disabled=true;}
			}
			break;
		default:
			if (typeof(document.forms[0].Service_id)!='undefined')
			{	document.forms[0].Service_id.focus();}
			break;
	}
	//��ʾ��ʾ��Ϣ
	var top_alert_info= get_xml_value("root/Create","AlertInfo","text");
	if (top_alert_info!="") {
		alert(top_alert_info);
	}

	return;
}
function go_payfee()
{

  var feeurl = 'http://'+document.forms[0].pay_fee_ip.value+'/accept_pay/get_fee_uni/bbc_getfee_uni.php?flag=��ѯ&query_condition='+document.forms[0].pay_fee_reg.value+'&query_flag=1&pay_mode=1&back_fee_mode=1&balance=1';
  //alert(feeurl);
  self.parent.location.href=feeurl;

}
/*********************����֤������������**********************/
/******************************************************************************/
function getBirth()
{
 	var identity_code=document.myform.identity_code.value;
 	if (identity_code !="")
	{
	 	 if(checkid_getbir(event)==false)
	 	 return false;
	}
	return;
}
function checkid_getbir(event)
{
	var index=document.myform.identity_kind.selectedIndex;
    var text=document.myform.identity_kind.options[index].text;
    var identity_code=document.myform.identity_code.value;
    var password;
    var maxlength_id = iden_length[identity_current_value];
	if(text.indexOf("���֤")!=-1 && maxlength_id == 15)
	{
		password = identity_code.substring(6,12);
	 	var birthday = "19"+password.substring(0,2)+"-"+password.substring(2,4)+"-"+password.substring(4,6);
		if(check_showDLG(document.myform.identity_code)== false)
 		{
 			document.myform.birthday.value="";
			return false;
	    }
	    else
	    {
	 	   	document.myform.birthday.value = birthday;
	 	}
	}
	else if(text.indexOf("���֤")!=-1 && maxlength_id == 18 )
	{
		password = identity_code.substring(8,14);
		var birthday = identity_code.substring(6,10)+"-"+identity_code.substring(10,12)+"-"+identity_code.substring(12,14);
		if(check_showDLG(document.myform.identity_code)== false)
		{
			document.myform.birthday.value="";
			return false;
		}
		else
		{
			document.myform.birthday.value = birthday;
		}
	}
	else
	{
		if(check_showDLG(document.myform.identity_code)== false )
		{
			document.myform.birthday.value="";
			return false;
		}

	}
	return true;
}

/**
* ���ϲ�Ʒ����ϵͳ����
*/
//ȡҵ�����ʹ�
var svc_arr = new Array();

var comm_source_temp = document.XMLDocument;
var svc_node_temp=comm_source_temp.selectNodes("root/Create/ServiceKindStr");
var svc_info_temp = svc_node_temp.nextNode();
var svc_str_temp = "";					
if(svc_info_temp)
{	svc_str_temp = svc_info_temp.text;}

svc_arr = svc_str_temp.split('~');


//Ԥ��
function crm_go_budget(srl_name,trg_name,opr_name)
{
	if (check_column() && check_base_package())//У��ؼ����Ӳ�Ʒ��Ŀ���
	{
		//��֯��:	ҵ������1`ҵ�����1`�Ӳ�Ʒ���1`�Ӳ�Ʒ��Դ��Ϣ1`��Ŀ�仯��Ϣ1`~ҵ������1`ҵ�����1`�Ӳ�Ʒ���1`�Ӳ�Ʒ��Դ��Ϣ1`��Ŀ�仯��Ϣ1`~
		
		var subproduct_str = crm_uni_budget_str();
		document.forms[0].SubProductStr.value = subproduct_str;
		document.forms[0].action=srl_name;
		document.forms[0].target=trg_name;
		document.forms[0].OptrType.value=opr_name;
		
		document.forms[0].BSubmit.disabled = true;
		document.forms[0].BFprint.disabled = true;
		document.forms[0].BBudget.disabled = true;			
		
		if (typeof(document.forms[0].BBalance)!='undefined')
			document.forms[0].BBalance.disabled = true;
		
		document.forms[0].submit();
	}

	return;

}

function crm_uni_subpg_str()
{
	//alert(svc_str);û���⣬��ȡ��ȫ�ֱ���
	//��֯��ǰ�����ҵ����Ϣ���Ӳ�Ʒ��Ϣ���͸��Ӳ�Ʒ�µİ���Ϣ(��servlet��ȡ�Ӳ�Ʒ��Ŀ��ѡ�������)
	//��֯�Ӳ�Ʒ��Ŀ����Ϣ���ύ���� //ÿ����ҵ�������������ʽ�� ҵ������1`�Ӳ�Ʒ���1`����1`~ҵ������2`�Ӳ�Ʒ���2`����2`~   �磺 8`1`10`~9`1`2`~	Ҫ�ش���SERVLET;	svc_group_str += svc_kind +"`"+subp_id+"`"+the_groups+"`~";

	var i=0;
	var return_str="";

	for (i=0;i<svc_arr.length;i++)//���Ӳ�Ʒѭ��
	{
		if (svc_arr[i]!="")
		{
			return_str += svc_arr[i]+"`"+eval("subproduct_"+svc_arr[i])+"`"+eval("group_count_"+svc_arr[i])+"`~";
		}
	}

	return return_str;
}

function crm_uni_budget_str()
{
	//alert(svc_str);û���⣬��ȡ��ȫ�ֱ���
	var i=0;
	var j=0;
	var k=0;
	var return_str="";
	var the_item;
	
	for (i=0;i<svc_arr.length;i++)//���Ӳ�Ʒѭ��
	{
		if (svc_arr[i]=="8")
		{
			//: ҵ������`ҵ�����`�Ӳ�Ʒ���`
			return_str += "8`"+document.forms[0].CServiceId.value+"`"+subproduct_8+"`";
			//: �仯���=��Դ����=��Դ�ͺ�=��Դֵ=$�仯���=��Դ����=��Դ�ͺ�=��Դֵ=$
			return_str += "1=1=1="+document.forms[0].CServiceId.value+"=$1=2=1="+document.forms[0].CUimCard.value+"=$`";//����=����=1=�绰����=$����=UIM��=1=����=$
			//��Ŀ�仯��Ϣ: f_item_id=f_change_kind=f_begin_date=f_end_date=f_attach_info=$		//1=1====$2=1====$
			for (j=0;j<=group_count_8;j++)//���Ӳ�Ʒ�и���ѭ��
			{
				the_item = eval("document.forms[0].group_8_"+j);//�õ���ITEM�������

				if (typeof(the_item.length)!='undefined')
				{
					for (k=0;k<the_item.length;k++)//�����е�Ԫ��ѭ��
					{
						if (the_item[k].checked==true)
						{
							return_str += the_item[k].value+"=1====$";
						}
					}
				}//����һ��
				else
				{
					if (the_item.checked==true)
					{
						return_str += the_item.value+"=1====$";
					}
				}
			}
			return_str += "`";


			return_str += "~";//����ҵ�����
		}
		if (svc_arr[i]=="9")
		{
			//: ҵ������`ҵ�����`�Ӳ�Ʒ���`
			return_str += "9`"+document.forms[0].GServiceId.value+"`"+subproduct_9+"`";
			//: �仯���=��Դ����=��Դ�ͺ�=��Դֵ=$�仯���=��Դ����=��Դ�ͺ�=��Դֵ=$
			return_str += "1=1=1="+document.forms[0].GServiceId.value+"=$1=2=1="+document.forms[0].GSimCard.value+"=$`";//����=����=1=�绰����=$����=UIM��=1=����=$
			//��Ŀ�仯��Ϣ: f_item_id=f_change_kind=f_begin_date=f_end_date=f_attach_info=$		//1=1====$2=1====$
			for (j=0;j<=group_count_9;j++)//���Ӳ�Ʒ�и���ѭ��
			{
				the_item = eval("document.forms[0].group_9_"+j);//�õ���ITEM�������
				if (typeof(the_item.length)!='undefined')//����һ��
				{
					for (k=0;k<the_item.length;k++)//�����е�Ԫ��ѭ��
					{
						if (the_item[k].checked==true)
						{
							return_str += the_item[k].value+"=1====$";
						}
					}
				}
				else
				{
					if (the_item.checked==true)
					{
						return_str += the_item.value+"=1====$";
					}
				}
			}
			return_str += "`";

			return_str += "~";//����ҵ�����
		}
		if (svc_arr[i]=="15")
		{
			//: ҵ������`ҵ�����`�Ӳ�Ʒ���`
			return_str += "15`"+document.forms[0].CServiceId.value+"`"+subproduct_15+"`";
			//: �仯���=��Դ����=��Դ�ͺ�=��Դֵ=$�仯���=��Դ����=��Դ�ͺ�=��Դֵ=$
			return_str += "1=1=1="+document.forms[0].CServiceId.value+"=$1=2=1="+document.forms[0].CUimCard.value+"=$`";//����=����=1=�绰����=$����=UIM��=1=����=$
			//��Ŀ�仯��Ϣ: f_item_id=f_change_kind=f_begin_date=f_end_date=f_attach_info=$		//1=1====$2=1====$
			for (j=0;j<=group_count_15;j++)//���Ӳ�Ʒ�и���ѭ��
			{
				the_item = eval("document.forms[0].group_15_"+j);//�õ���ITEM�������

				if (typeof(the_item.length)!='undefined')
				{
					for (k=0;k<the_item.length;k++)//�����е�Ԫ��ѭ��
					{
						if (the_item[k].checked==true)
						{
							return_str += the_item[k].value+"=1====$";
						}
					}
				}//����һ��
				else
				{
					if (the_item.checked==true)
					{
						return_str += the_item.value+"=1====$";
					}
				}
			}
			return_str += "`";


			return_str += "~";//����ҵ�����
		}
		
	}

	return return_str;
}
//�ύ
function crm_go_commit(srl_name,trg_name,opr_name)
{
	//alert(document.forms[0].TheSubmitKind.value);
	if (document.forms[0].TheSubmitKind.value == "budget_ok")
	{
		if (check_column())
		{
			//��֯��:	ҵ������1`ҵ�����1`�Ӳ�Ʒ���1`�Ӳ�Ʒ��Դ��Ϣ1`��Ŀ�仯��Ϣ1`~ҵ������1`ҵ�����1`�Ӳ�Ʒ���1`�Ӳ�Ʒ��Դ��Ϣ1`��Ŀ�仯��Ϣ1`~
			var subproduct_str = crm_uni_budget_str();
			document.forms[0].SubProductStr.value = subproduct_str;

			//��֯���ô�
			uni_fee ();

			//��֯�Ӳ�Ʒ��Ŀ����Ϣ���ύ���� //ÿ����ҵ�������������ʽ�� ҵ������1`�Ӳ�Ʒ���1`����1`~ҵ������2`�Ӳ�Ʒ���2`����2`~   �磺 8`1`10`~9`1`2`~	Ҫ�ش���SERVLET;	svc_group_str += svc_kind +"`"+subp_id+"`"+the_groups+"`~";
			var subp_group_str = crm_uni_subpg_str();
			document.forms[0].SubPGroup.value = subp_group_str;

			go_disabled(document.forms[0]);

			
			document.forms[0].action=srl_name;
			document.forms[0].target=trg_name;
			document.forms[0].OptrType.value=opr_name;
			
			document.forms[0].BSubmit.disabled = true;
			document.forms[0].BFprint.disabled = true;
			document.forms[0].BBudget.disabled = true;
			
			//alert(document.forms[0].BSubmit.name);
			//alert(document.forms[0].BSubmit.disabled);

			/*alert(document.forms[0].action);
			alert(document.forms[0].target);
			alert(document.forms[0].OptrType.value);*/
			
			//alert(document.forms[0].IfPreCoop.value);
			
			
			document.forms[0].submit();

		}
	}
	else if (document.forms[0].TheSubmitKind.value == "budget_no")
	{
		alert("���Ƚ���Ԥ�������");
	}

	return;

}

//����������еĸ����Ƿ�����ѡ��һ����Ŀ
function check_base_package()
{
	var group_name;
	var group_obj;
	var if_ok = false;
	
	var package_svc_kind="";
		
	//alert("ok");
	for (var i=0;i<base_package_name.length;i++)
	{
		
		//alert("in");
		
		package_svc_kind="";
				
		group_name = base_package_name[i];
		
		if_ok = false;


		//alert("go");

		//��ȡ����
		if (group_name!="")
		{
			group_obj = eval("document.forms[0]."+group_name);
			//alert(group_name+"---"+group_obj.name);
			//������������ʽ��  "group_"+svc_kind+"_"+the_groups
			//���ҵ������
			
			package_svc_kind = group_name.substring(6,7);
			
			if (package_svc_kind == "1")
			{
				package_svc_kind = group_name.substring(6,8);
			}
			//alert("ϵͳ���ԣ�" + package_svc_kind + ".");
			
			/*if ()
			{
			}*/
			
		}
		//�ж��Ƿ�ѡ��
		if (typeof(group_obj) !='undefined')
		{
			if (typeof(group_obj.length)!='undefined')//����һ��
			{
				for (k=0;k<group_obj.length;k++)//�����е�Ԫ��ѭ��
				{
					if (group_obj[k].checked==true)
					{
						if_ok = true;
						break;
					}
				}
			}
			else
			{
				if (group_obj.checked==true)
				{
					if_ok = true;
				}
			}

			if (if_ok == false)
			{
				
				if (package_svc_kind == "9")
				{
					alert("GSMҵ���Ӳ�Ʒ��Ŀ��Ϣ�л�������ÿ����������ѡ��һ����Ŀ��");
					
					//�Ѳ�ת��ҵ����Ϣ
					setActiveTab(current_tab_obj,"GsmDiv");
				}
				else if (package_svc_kind == "8")
				{
					alert("CDMAҵ���Ӳ�Ʒ��Ŀ��Ϣ�л�������ÿ����������ѡ��һ����Ŀ��");
					setActiveTab(current_tab_obj,"CdmaDiv");
				}
				else if (package_svc_kind == "15")
				{
					alert("Cdma1Xҵ���Ӳ�Ʒ��Ŀ��Ϣ�л�������ÿ����������ѡ��һ����Ŀ��");
					setActiveTab(current_tab_obj,"Cdma1XDiv");
				}
				else
				{
					alert("��������ÿ����������ѡ��һ����Ŀ��");
				}
				return false;
			}
		}
	}

	return true;
}

//�Ӳ�Ʒ�仯
function crm_select_subitem(srl_name,trg_name,opr_name,service_kind,apply_event)
{
	if (service_kind == "9")
	{
		if (document.forms[0].GSubProduct.value!="")
		{
			document.forms[0].ServiceKindSplit.value=service_kind;
			
			document.forms[0].method="POST";		
			document.forms[0].action=srl_name;
			document.forms[0].target=trg_name;
			document.forms[0].OptrType.value=opr_name;
			
			if (typeof(document.forms[0].BBudget)!='undefined')
				document.forms[0].BBudget.disabled=true;
			if (typeof(document.forms[0].BSubmit)!='undefined')
				document.forms[0].BSubmit.disabled=true;
			if (typeof(document.forms[0].BFprint)!='undefined')
				document.forms[0].BFprint.disabled=true;
			
			//��װ�Ӳ�Ʒ�仯Ҫ�����Դֵ; ҵ��������
			if (apply_event == "301")
			{
				crm_init_resource("9","dis_yes");
			}
			
			if (typeof(allow_to_go)!='undefined')
				allow_to_go='no';

			document.forms[0].submit();
			
			if (typeof(document.forms[0].GBusSolutionId)!='undefined')
				document.forms[0].GBusSolutionId.disabled=true;
			if (typeof(document.forms[0].GProductId)!='undefined')
				document.forms[0].GProductId.disabled=true;
			if (typeof(document.forms[0].GSubProduct)!='undefined')
				document.forms[0].GSubProduct.disabled=true;
			
		}
	}
	if (service_kind == "8")
	{
		if (document.forms[0].CSubProduct.value!="")
		{
			document.forms[0].ServiceKindSplit.value=service_kind;
			
			document.forms[0].method="POST";		
			document.forms[0].action=srl_name;
			document.forms[0].target=trg_name;
			document.forms[0].OptrType.value=opr_name;
			
			if (typeof(document.forms[0].BBudget)!='undefined')
				document.forms[0].BBudget.disabled=true;
			if (typeof(document.forms[0].BSubmit)!='undefined')
				document.forms[0].BSubmit.disabled=true;
			if (typeof(document.forms[0].BFprint)!='undefined')
				document.forms[0].BFprint.disabled=true;
			
			//��װ�Ӳ�Ʒ�仯Ҫ�����Դֵ; ҵ��������
			if (apply_event == "301")
			{
				crm_init_resource("8","dis_yes");
			}
			
			if (typeof(allow_to_go)!='undefined')
				allow_to_go='no';
			
			document.forms[0].submit();
			
			if (typeof(document.forms[0].CBusSolutionId)!='undefined')
				document.forms[0].CBusSolutionId.disabled = true;
			if (typeof(document.forms[0].CProductId)!='undefined')
				document.forms[0].CProductId.disabled = true;
			if (typeof(document.forms[0].CSubProduct)!='undefined')
				document.forms[0].CSubProduct.disabled = true;
		}
	}
	if (service_kind == "15")
	{
		if (document.forms[0].Cdma1XSubProduct.value!="")
		{
			document.forms[0].ServiceKindSplit.value=service_kind;
			
			document.forms[0].method="POST";		
			document.forms[0].action=srl_name;
			document.forms[0].target=trg_name;
			document.forms[0].OptrType.value=opr_name;
			
			if (typeof(document.forms[0].BBudget)!='undefined')
				document.forms[0].BBudget.disabled=true;
			if (typeof(document.forms[0].BSubmit)!='undefined')
				document.forms[0].BSubmit.disabled=true;
			if (typeof(document.forms[0].BFprint)!='undefined')
				document.forms[0].BFprint.disabled=true;
			
			if (typeof(allow_to_go)!='undefined')
				allow_to_go='no';
			
			document.forms[0].submit();
			
			if (typeof(document.forms[0].Cdma1XProductId)!='undefined')
				document.forms[0].Cdma1XProductId.disabled = true;
			if (typeof(document.forms[0].Cdma1XSubProduct)!='undefined')
				document.forms[0].Cdma1XSubProduct.disabled = true;
			
		}
	}
	return;
}

//�������仯
function crm_solution_select(srl_name,trg_name,opr_name,service_kind)
{
	//alert("in");
	
	if (service_kind == "9")
	{
		if (document.forms[0].GBusSolutionId.value!="")
		{
			document.forms[0].ServiceKindSplit.value=service_kind;//��������
			
			document.forms[0].method="POST";		
			document.forms[0].action=srl_name;
			document.forms[0].target=trg_name;
			document.forms[0].OptrType.value=opr_name;
			
			if (typeof(document.forms[0].BBudget)!='undefined')
				document.forms[0].BBudget.disabled=true;
			if (typeof(document.forms[0].BSubmit)!='undefined')
				document.forms[0].BSubmit.disabled=true;
			if (typeof(document.forms[0].BFprint)!='undefined')
				document.forms[0].BFprint.disabled=true;
			
			//�������仯Ҫ�����Դֵ
			crm_init_resource("9","dis_yes");
			
			//alert(document.forms[0].GBusSolutionId.value);	
			
			if (typeof(allow_to_go)!='undefined')
				allow_to_go='no';
				
			document.forms[0].submit();
			
			document.forms[0].GBusSolutionId.disabled = true;
			if (typeof(document.forms[0].GProductId)!='undefined')
				document.forms[0].GProductId.disabled = true;
			if (typeof(document.forms[0].GSubProduct)!='undefined')
				document.forms[0].GSubProduct.disabled = true;
			
		}
		else
		{
			window.parent.frames[1].document.forms[0].GProductId.disabled = false;
			window.parent.frames[1].document.forms[0].GSubProduct.disabled = false;
		}
	}
	if (service_kind == "8")
	{
		if (document.forms[0].CBusSolutionId.value!="")
		{
			document.forms[0].ServiceKindSplit.value=service_kind;
			
			document.forms[0].method="POST";		
			document.forms[0].action=srl_name;
			document.forms[0].target=trg_name;
			document.forms[0].OptrType.value=opr_name;
			
			if (typeof(document.forms[0].BBudget)!='undefined')
				document.forms[0].BBudget.disabled=true;
			if (typeof(document.forms[0].BSubmit)!='undefined')
				document.forms[0].BSubmit.disabled=true;
			if (typeof(document.forms[0].BFprint)!='undefined')
				document.forms[0].BFprint.disabled=true;
			
			//�������仯Ҫ�����Դֵ
			crm_init_resource("8","dis_yes");

			if (typeof(allow_to_go)!='undefined')
				allow_to_go='no';
				
			document.forms[0].submit();
			
			document.forms[0].CBusSolutionId.disabled = true;
			if (typeof(document.forms[0].CProductId)!='undefined')
				document.forms[0].CProductId.disabled = true;
			if (typeof(document.forms[0].CSubProduct)!='undefined')
				document.forms[0].CSubProduct.disabled = true;
		}
		else
		{
			window.parent.frames[1].document.forms[0].CProductId.disabled = false;
			window.parent.frames[1].document.forms[0].CSubProduct.disabled = false;
		}
	}
	/*if (service_kind == "15")
	{
		if (document.forms[0].Cdma1XBusSolutionId.value!="")
		{
			document.forms[0].ServiceKindSplit.value=service_kind;
			
			document.forms[0].method="POST";		
			document.forms[0].action=srl_name;
			document.forms[0].target=trg_name;
			document.forms[0].OptrType.value=opr_name;
			
			if (typeof(document.forms[0].BBudget)!='undefined')
				document.forms[0].BBudget.disabled=true;
			if (typeof(document.forms[0].BSubmit)!='undefined')
				document.forms[0].BSubmit.disabled=true;
			if (typeof(document.forms[0].BFprint)!='undefined')
				document.forms[0].BFprint.disabled=true;
			
			if (typeof(document.forms[0].CServiceId)!='undefined')
				document.forms[0].CServiceId.disabled = true;
			if (typeof(document.forms[0].CUimCard)!='undefined')
				document.forms[0].CUimCard.disabled = true;
			if (typeof(document.forms[0].GServiceId)!='undefined')
				document.forms[0].GServiceId.disabled = true;
			if (typeof(document.forms[0].GSimCard)!='undefined')
				document.forms[0].GSimCard.disabled = true;
				
			if (typeof(document.forms[0].Cdma1XProductId)!='undefined')
				document.forms[0].Cdma1XProductId.disabled = true;
			if (typeof(document.forms[0].Cdma1XSubProduct)!='undefined')
				document.forms[0].Cdma1XSubProduct.disabled = true;

			
			document.forms[0].submit();
		}
		else
		{
			//���
		}
	}*/
	
	return;
}

function crm_budget_again()
{
	/*document.forms[0].BSubmit.disabled=true;
	document.forms[0].BFprint.disabled=true;	
	if (typeof(document.forms[0].BFprint)!='undefined')
	{
		document.forms[0].BFprint.disabled=true;
	}
	document.forms[0].BBudget.disabled=false;*/
	
	if (typeof(document.forms[0].BBalance)!='undefined')
		document.forms[0].BBalance.disabled = true;

	document.forms[0].TheSubmitKind.value="budget_no";
	
	return;
}


function crm_uni_item_select()
{
	//alert(svc_str);û���⣬��ȡ��ȫ�ֱ���
	var i=0;
	var j=0;
	var k=0;
	var return_str="";
	var the_item;

	
	
	for (i=0;i<svc_arr.length;i++)//���Ӳ�Ʒѭ��
	{
		if (svc_arr[i]=="8")
		{
			//��Ŀ�仯��Ϣ: f_item_id1`f_item_id1`f_item_id1`
			for (j=0;j<=group_count_8;j++)//���Ӳ�Ʒ�и���ѭ��
			{
				the_item = eval("document.forms[0].group_8_"+j);//�õ���ITEM�������

				if (typeof(the_item.length)!='undefined')
				{
					for (k=0;k<the_item.length;k++)//�����е�Ԫ��ѭ��
					{
						if (the_item[k].checked==true)
						{
							return_str += the_item[k].value+"`";
						}
					}
				}//����һ��
				else
				{
					if (the_item.checked==true)
					{
						return_str += the_item.value+"`";
					}
				}
			}
			//return_str += "~";//����ҵ�����
		}
		if (svc_arr[i]=="9")
		{
			//��Ŀ�仯��Ϣ: f_item_id1`f_item_id1`f_item_id1`
			for (j=0;j<=group_count_9;j++)//���Ӳ�Ʒ�и���ѭ��
			{
				the_item = eval("document.forms[0].group_9_"+j);//�õ���ITEM�������
				if (typeof(the_item.length)!='undefined')//����һ��
				{
					for (k=0;k<the_item.length;k++)//�����е�Ԫ��ѭ��
					{
						if (the_item[k].checked==true)
						{
							return_str += the_item[k].value+"`";
						}
					}
				}
				else
				{
					if (the_item.checked==true)
					{
						return_str += the_item.value+"`";
					}
				}
			}
			//return_str += "`";
		}
		if (svc_arr[i]=="15")
		{
			//��Ŀ�仯��Ϣ: f_item_id1`f_item_id1`f_item_id1`
			for (j=0;j<=group_count_15;j++)//���Ӳ�Ʒ�и���ѭ��
			{
				the_item = eval("document.forms[0].group_15_"+j);//�õ���ITEM�������

				if (typeof(the_item.length)!='undefined')
				{
					for (k=0;k<the_item.length;k++)//�����е�Ԫ��ѭ��
					{
						if (the_item[k].checked==true)
						{
							return_str += the_item[k].value+"`";
						}
					}
				}//����һ��
				else
				{
					if (the_item.checked==true)
					{
						return_str += the_item.value+"`";
					}
				}
			}
			//return_str += "`";
		}
		
	}

	if (typeof(document.forms[0].SelectItemStr)!='undefined')
	{	document.forms[0].SelectItemStr.value = return_str;
	}	

	return return_str;

}

//���ӡ
//Ŀǰ��װ��ҵ�����ã�����ҵ������
function crm_print(srl_name,trg_name,opr_name)
{
	//alert(document.forms[0].TheSubmitKind.value);
	if (document.forms[0].TheSubmitKind.value == "budget_ok")
	{
		if (check_column())
		{
			//��֯��:	ҵ������1`ҵ�����1`�Ӳ�Ʒ���1`�Ӳ�Ʒ��Դ��Ϣ1`��Ŀ�仯��Ϣ1`~ҵ������1`ҵ�����1`�Ӳ�Ʒ���1`�Ӳ�Ʒ��Դ��Ϣ1`��Ŀ�仯��Ϣ1`~
			var subproduct_str = crm_uni_budget_str();
			document.forms[0].SubProductStr.value = subproduct_str;

			//��֯���ô�
			uni_fee ();
			
			
			//���õ�ǰ��ӡ��ҵ������
			//alert(document.forms[0].MastServiceKind.value);
			document.forms[0].SvcKind.value = document.forms[0].MastServiceKind.value;

			//��֯�Ӳ�Ʒ��Ŀ����Ϣ���ύ���� //ÿ����ҵ�������������ʽ�� ҵ������1`�Ӳ�Ʒ���1`����1`~ҵ������2`�Ӳ�Ʒ���2`����2`~   �磺 8`1`10`~9`1`2`~	Ҫ�ش���SERVLET;	svc_group_str += svc_kind +"`"+subp_id+"`"+the_groups+"`~";
			var subp_group_str = crm_uni_subpg_str();
			document.forms[0].SubPGroup.value = subp_group_str;
			
			//����Ŀ��
			var re_str = crm_uni_item_select();		//��ʹ�ã�Ҫ����ҵ�����ͣ�ʹ�ú�Ԥ����ͬ��SubProductStr
			document.forms[0].SelectItemStr.value = re_str;
			
			
			document.forms[0].BugOk.value = "yes";
			f_print_go_product(srl_name,trg_name,opr_name);			
		}
	}
	else if (document.forms[0].TheSubmitKind.value == "budget_no")
	{
		alert("���Ƚ���Ԥ�������");
	}

	return;
	
}
//����Դ����漰������Ŀ��Ϣ�����ƣ�������������Ʒ���Ӳ�Ʒ�����仯�������Դ
function crm_init_resource(service_kind,dis_yes)
{
	if (service_kind == "9")
	{
	
		if (typeof(document.forms[0].GServiceId)!='undefined')
		{
			document.forms[0].GServiceId.disabled = false;
			document.forms[0].GServiceId.readOnly = false;
			document.forms[0].GServiceId.value = "";
			
			if (dis_yes == "dis_yes")
			{
				document.forms[0].GServiceId.disabled = true;
			}
		}
		if (typeof(document.forms[0].GSimCard)!='undefined')
		{
			document.forms[0].GSimCard.disabled = false;
			document.forms[0].GSimCard.readOnly = false;
			document.forms[0].GSimCard.value = "";
			
			if (dis_yes == "dis_yes")
			{
				document.forms[0].GSimCard.disabled = true;
			}
		}
	}
	else if (service_kind == "8")
	{
		//�������仯Ҫ�����Դֵ
		if (typeof(document.forms[0].CServiceId)!='undefined')
		{
			document.forms[0].CServiceId.disabled = false;
			document.forms[0].CServiceId.readOnly = false;
			document.forms[0].CServiceId.value = "";
			
			if (dis_yes == "dis_yes")
			{
				document.forms[0].CServiceId.disabled = true;
			}
		}
		if (typeof(document.forms[0].CUimCard)!='undefined')
		{
			document.forms[0].CUimCard.disabled = false;
			document.forms[0].CUimCard.readOnly = false;
			document.forms[0].CUimCard.value = "";
			
			if (dis_yes == "dis_yes")
			{
				document.forms[0].CUimCard.disabled = true;
			}
		}
	}
	
	return;
			
}

//��װ�����Դ
function crm_check_resource(srl_name,trg_name,opr_name,check_kind,this_field,check_subproduct,service_kind)
{
	if (this_field.value != "")
	{
	
		if (check_subproduct == "check_sub")//У���Ʒ���Ӳ�Ʒ����Ϊ��
		{
			if (service_kind == "9")
			{
			
				if (document.forms[0].GProductId.value == "")
				{
					alert("��������Դ��Ϣǰ����ѡ���Ʒ��Ϣ.");
					document.forms[0].GProductId.focus();					
					return false;
				}
				if (document.forms[0].GSubProduct.value == "")				
				{
					alert("��������Դ��Ϣǰ����ѡ���Ӳ�Ʒ��Ϣ.");
					document.forms[0].GSubProduct.focus();					
					return false;
				}
			}
			else if (service_kind == "8")
			{
			
				if (document.forms[0].CProductId.value == "")
				{
					alert("��������Դ��Ϣǰ����ѡ���Ʒ��Ϣ.");
					document.forms[0].CProductId.focus();					
					return false;
				}
				if (document.forms[0].CSubProduct.value == "")				
				{
					alert("��������Դ��Ϣǰ����ѡ���Ӳ�Ʒ��Ϣ.");
					document.forms[0].CSubProduct.focus();					
					return false;
				}
			}
		}
		
		document.forms[0].CheckKind.value=check_kind;
			
		document.forms[0].method="POST";		
		document.forms[0].action=srl_name;
		document.forms[0].target=trg_name;
		document.forms[0].OptrType.value=opr_name;
		
		
		if (typeof(allow_to_go)!='undefined')
			allow_to_go='no';
		
		document.forms[0].submit();
	}
	
	return;
	
}

function crm_init_item (svc_kind_str)
{
	var svc_kind_arr = svc_kind_str.split("~");
	var i = 0;
	for (i=0;i<svc_kind_arr.length;i++)
	{
		if (svc_kind_arr[i] == "9")
		{
			nas_select_default("MyForm","GProductId","Create/GProductId/selected");
			
			nas_relation_build_comm(document.forms[0].GSubProduct,'root/Create/SubProduct_9_'+document.forms[0].GProductId.value,'yes_empty','');

			var subp_node=source.selectNodes("root/Create/GSubProductId");
			var subp_info = subp_node.nextNode();
			var subp_name = "";
			if(subp_info)
			{	subp_name = subp_info.text;}
			document.forms[0].GSubProduct.value=subp_name;
			
			nas_generate_product_items_indiv("root/Create/SubProduct_9/","9","GsmDivItem");
		}
		if (svc_kind_arr[i] == "8")
		{
			nas_select_default("MyForm","CProductId","Create/CProductId/selected");
			
			nas_relation_build_comm(document.forms[0].CSubProduct,'root/Create/SubProduct_8_'+document.forms[0].CProductId.value,'yes_empty','');

			var subp_node=source.selectNodes("root/Create/CSubProductId");
			var subp_info = subp_node.nextNode();
			var subp_name = "";
			if(subp_info)
			{	subp_name = subp_info.text;}
			document.forms[0].CSubProduct.value=subp_name;

			
			nas_generate_product_items_indiv("root/Create/SubProduct_8/","8","CdmaDivItem");
		}
		if (svc_kind_arr[i] == "15")
		{
			nas_select_default("MyForm","Cdma1XProductId","Create/Cdma1XProductId/selected");
			
			nas_relation_build_comm(document.forms[0].Cdma1XSubProduct,'root/Create/SubProduct_15_'+document.forms[0].Cdma1XProductId.value,'yes_empty','');

			var subp_node=source.selectNodes("root/Create/Cdma1XSubProductId");
			var subp_info = subp_node.nextNode();
			var subp_name = "";
			if(subp_info)
			{	subp_name = subp_info.text;}
			document.forms[0].Cdma1XSubProduct.value=subp_name;

			
			nas_generate_product_items_indiv("root/Create/SubProduct_15/","15","Cdma1XDivItem");
		}
	}
	
}

