/**
 * <p>Name: nas_set_disabled.js</p>
 * <p>Description: 生成上一帧的密码函数</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/

//alert('nas_set_disabled.js引用成功');
function nas_set_disabled_cast(xml_info,this_fild)
{
	var source = document.XMLDocument;
	var mark = xml_info + "/SubmitKind";
	var node=source.selectNodes(mark);
	var text_xml = "";
	var temp = "";
	text_xml=node.nextNode();

	if(text_xml)
	{
		temp = text_xml.text;
		if (temp=="QueryPass")
		{
			if (typeof(window.parent.frames['header'].document.forms[0].BQuery)!='undefined')
				window.parent.frames['header'].document.forms[0].BQuery.disabled = false;
			if (typeof(window.parent.frames['header'].document.forms[0].Password)!='undefined')
				window.parent.frames['header'].document.forms[0].Password.focus();
				
			var a_mark = xml_info + "/AlertInfo";
			var a_node=source.selectNodes(a_mark);
			var a_text_xml = "";
			var a_temp = "";
			a_text_xml=a_node.nextNode();
		
			if(a_text_xml)
			{
				a_temp = a_text_xml.text;
				
				if (a_temp != "")
				{
					if (typeof(window.parent.frames['header'].document.forms[0].Service_id)!='undefined')
						window.parent.frames['header'].document.forms[0].Service_id.focus();
				}
			}
			
			
		}
		else if (temp=="Query")
		{
			if (typeof(window.parent.frames['header'].document.forms[0].BQuery)!='undefined')
				window.parent.frames['header'].document.forms[0].BQuery.disabled = false;
				
			var q_mark = xml_info + "/QueryOk";
			var q_node=source.selectNodes(q_mark);
			var q_text_xml = "";
			var q_temp = "";
			q_text_xml=q_node.nextNode();
		
			if(q_text_xml)
			{
				q_temp = q_text_xml.text;
				
				if (q_temp == "ok")
				{
					if (typeof(window.parent.frames['header'].document.forms[0].BBudget)!='undefined')
						window.parent.frames['header'].document.forms[0].BBudget.disabled = false;
				}
			}
		}
		else if (temp=="Budget")
		{
			var b_mark = xml_info + "/FeeOk";
			var b_node=source.selectNodes(b_mark);
			var b_text_xml = "";
			var b_temp = "";
			b_text_xml=b_node.nextNode();
		
			if(b_text_xml)
			{
				b_temp = b_text_xml.text;
				//alert(b_temp);
				if (b_temp == "yes")
				{
					if (typeof(window.parent.frames['header'].document.forms[0].Bus_solution_id)!='undefined')
						window.parent.frames['header'].document.forms[0].Bus_solution_id.disabled = false;
					if (typeof(window.parent.frames['header'].document.forms[0].Service_id_temp)!='undefined')
						window.parent.frames['header'].document.forms[0].Service_id_temp.disabled = false;
					//if (typeof(window.parent.frames['header'].document.forms[0].BBudget)!='undefined')
						//window.parent.frames['header'].document.forms[0].BBudget.disabled = false;
					if (typeof(window.parent.frames['header'].document.forms[0].BSubmit)!='undefined')
						window.parent.frames['header'].document.forms[0].BSubmit.disabled = false;
						
					if (typeof(window.parent.frames['header'].document.forms[0].BQuery)!='undefined')
						window.parent.frames['header'].document.forms[0].BQuery.disabled = false;
						
					if (typeof(window.parent.frames['header'].document.forms[0].BFprint)!='undefined')	
						window.parent.frames['header'].document.forms[0].BFprint.disabled = false;
				}
				else
				{
					if (typeof(window.parent.frames['header'].document.forms[0].Bus_solution_id)!='undefined')
						window.parent.frames['header'].document.forms[0].Bus_solution_id.disabled = false;
					if (typeof(window.parent.frames['header'].document.forms[0].Service_id_temp)!='undefined')
						window.parent.frames['header'].document.forms[0].Service_id_temp.disabled = false;
					if (typeof(window.parent.frames['header'].document.forms[0].BBudget)!='undefined')
						window.parent.frames['header'].document.forms[0].BBudget.disabled = false;
					
					if (typeof(window.parent.frames['header'].document.forms[0].BQuery)!='undefined')
						window.parent.frames['header'].document.forms[0].BQuery.disabled = false;
				}
			}
			else
			{
				if (typeof(window.parent.frames['header'].document.forms[0].Bus_solution_id)!='undefined')
					window.parent.frames['header'].document.forms[0].Bus_solution_id.disabled = false;
				if (typeof(window.parent.frames['header'].document.forms[0].Service_id_temp)!='undefined')
					window.parent.frames['header'].document.forms[0].Service_id_temp.disabled = false;
				if (typeof(window.parent.frames['header'].document.forms[0].BBudget)!='undefined')
					window.parent.frames['header'].document.forms[0].BBudget.disabled = false;
					
				if (typeof(window.parent.frames['header'].document.forms[0].BQuery)!='undefined')
					window.parent.frames['header'].document.forms[0].BQuery.disabled = false;
			}
				
			//alert('in');
		}
		else if (temp=="Commit")
		{
			if (typeof(window.parent.frames['header'].document.forms[0].Bus_solution_id)!='undefined')
				window.parent.frames['header'].document.forms[0].Bus_solution_id.disabled = false;
			if (typeof(window.parent.frames['header'].document.forms[0].Service_id_temp)!='undefined')
				window.parent.frames['header'].document.forms[0].Service_id_temp.disabled = false;
			//if (typeof(window.parent.frames['header'].document.forms[0].BBudget)!='undefined')
				//window.parent.frames['header'].document.forms[0].BBudget.disabled = false;
			//if (typeof(window.parent.frames['header'].document.forms[0].BSubmit)!='undefined')
				//window.parent.frames['header'].document.forms[0].BSubmit.disabled = false;				
			if (typeof(window.parent.frames['header'].document.forms[0].BQuery)!='undefined')
				window.parent.frames['header'].document.forms[0].BQuery.disabled = false;			
			
			var s_mark = xml_info + "/SubmitOk";
			var s_node=source.selectNodes(s_mark);
			var s_text_xml = "";
			var s_temp = "";
			s_text_xml=s_node.nextNode();
		
			if(s_text_xml)
			{
				s_temp = s_text_xml.text;
				
				if (s_temp == "1")
				{
					if (typeof(window.parent.frames['header'].document.forms[0].BBudget)!='undefined')
						window.parent.frames['header'].document.forms[0].BBudget.disabled = false;
					
					////////////////////////判断结算
					var balance_mark = xml_info + "/GoBalance";
					var balance_node=source.selectNodes(balance_mark);
					var balance_text_xml = "";
					var balance_temp = "";
					balance_text_xml=balance_node.nextNode();
					
					var reg_mark = xml_info + "/registerNum";
					var reg_node = source.selectNodes(reg_mark);
					var reg_text_xml = "";
					var reg_temp = "";
					reg_text_xml = reg_node.nextNode();
					if(balance_text_xml && reg_text_xml)
					{
						balance_temp = balance_text_xml.text;
						reg_temp = reg_text_xml.text;
						if (balance_temp=="yes" && reg_temp!="")
						{
							if (typeof(window.parent.frames['header'].document.forms[0].BBalance)!='undefined')
								window.parent.frames['header'].document.forms[0].BBalance.disabled = false;
						}
					}
					///////////////////////判断打印
					var print_mark = xml_info + "/GoPrint";
					var print_node=source.selectNodes(print_mark);
					var print_text_xml = "";
					var print_temp = "";
					print_text_xml=print_node.nextNode();
					
					if(print_text_xml)
					{
						print_temp = print_text_xml.text;
						if (print_temp=="yes")
						{
							window.parent.frames['header'].document.forms[0].BPrint.disabled = false;
						}
					}
				}
				else
				{
					if (typeof(window.parent.frames['header'].document.forms[0].BBudget)!='undefined')
						window.parent.frames['header'].document.forms[0].BBudget.disabled = false;
				}
			}
			else
			{
				if (typeof(window.parent.frames['header'].document.forms[0].BBudget)!='undefined')
					window.parent.frames['header'].document.forms[0].BBudget.disabled = false;
			}
			
			
			set_disabled_div();
				
		}
		else if (temp=="Number")
		{
			if (typeof(window.parent.frames['header'].document.forms[0].Bus_solution_id)!='undefined')
				window.parent.frames['header'].document.forms[0].Bus_solution_id.disabled = false;
			if (typeof(window.parent.frames['header'].document.forms[0].Service_id_temp)!='undefined')
				window.parent.frames['header'].document.forms[0].Service_id_temp.disabled = false;
				
			if (typeof(window.parent.frames['header'].document.forms[0].BBudget)!='undefined')
				window.parent.frames['header'].document.forms[0].BBudget.disabled = false;
				
			if (typeof(window.parent.frames['header'].document.forms[0].BQuery)!='undefined')
				window.parent.frames['header'].document.forms[0].BQuery.disabled = false;

		}
		else if (temp=="Bureau")
		{
			if (typeof(window.parent.frames['header'].document.forms[0].Bus_solution_id)!='undefined')
				window.parent.frames['header'].document.forms[0].Bus_solution_id.disabled = false;
			if (typeof(window.parent.frames['header'].document.forms[0].Service_id_temp)!='undefined')
				window.parent.frames['header'].document.forms[0].Service_id_temp.disabled = false;
				
			if (typeof(window.parent.frames['header'].document.forms[0].BBudget)!='undefined')
				window.parent.frames['header'].document.forms[0].BBudget.disabled = false;
				
			if (typeof(window.parent.frames['header'].document.forms[0].BQuery)!='undefined')
				window.parent.frames['header'].document.forms[0].BQuery.disabled = false;
		}
		else if (temp=="Select_number")
		{
			if (typeof(window.parent.frames['header'].document.forms[0].Bus_solution_id)!='undefined')
				window.parent.frames['header'].document.forms[0].Bus_solution_id.disabled = false;
			if (typeof(window.parent.frames['header'].document.forms[0].Service_id_temp)!='undefined')
				window.parent.frames['header'].document.forms[0].Service_id_temp.disabled = false;
				
			if (typeof(window.parent.frames['header'].document.forms[0].BBudget)!='undefined')
				window.parent.frames['header'].document.forms[0].BBudget.disabled = false;
				
			if (typeof(window.parent.frames['header'].document.forms[0].BQuery)!='undefined')
				window.parent.frames['header'].document.forms[0].BQuery.disabled = false;
		}
		else if (temp=="Number_new_acc")
		{
			if (typeof(window.parent.frames['header'].document.forms[0].Bus_solution_id)!='undefined')
				window.parent.frames['header'].document.forms[0].Bus_solution_id.disabled = false;
			if (typeof(window.parent.frames['header'].document.forms[0].Service_id_temp)!='undefined')
				window.parent.frames['header'].document.forms[0].Service_id_temp.disabled = false;
				
			if (typeof(window.parent.frames['header'].document.forms[0].BBudget)!='undefined')
				window.parent.frames['header'].document.forms[0].BBudget.disabled = false;
				
			if (typeof(window.parent.frames['header'].document.forms[0].BQuery)!='undefined')
				window.parent.frames['header'].document.forms[0].BQuery.disabled = false;
		}
		else if (temp=="Number_new_toll")
		{
			if (typeof(window.parent.frames['header'].document.forms[0].Bus_solution_id)!='undefined')
				window.parent.frames['header'].document.forms[0].Bus_solution_id.disabled = false;
			if (typeof(window.parent.frames['header'].document.forms[0].Service_id_temp)!='undefined')
				window.parent.frames['header'].document.forms[0].Service_id_temp.disabled = false;
				
			if (typeof(window.parent.frames['header'].document.forms[0].BBudget)!='undefined')
				window.parent.frames['header'].document.forms[0].BBudget.disabled = false;
				
			if (typeof(window.parent.frames['header'].document.forms[0].BQuery)!='undefined')
				window.parent.frames['header'].document.forms[0].BQuery.disabled = false;
		}
		else if (temp=="First_printed")
		{
			if (typeof(window.parent.frames['header'].document.forms[0].Bus_solution_id)!='undefined')
						window.parent.frames['header'].document.forms[0].Bus_solution_id.disabled = false;
			if (typeof(window.parent.frames['header'].document.forms[0].Service_id_temp)!='undefined')
				window.parent.frames['header'].document.forms[0].Service_id_temp.disabled = false;
			//if (typeof(window.parent.frames['header'].document.forms[0].BBudget)!='undefined')
				//window.parent.frames['header'].document.forms[0].BBudget.disabled = false;
			if (typeof(window.parent.frames['header'].document.forms[0].BSubmit)!='undefined')
				window.parent.frames['header'].document.forms[0].BSubmit.disabled = false;
				
			if (typeof(window.parent.frames['header'].document.forms[0].BQuery)!='undefined')
				window.parent.frames['header'].document.forms[0].BQuery.disabled = false;
				
			if (typeof(window.parent.frames['header'].document.forms[0].BFprint)!='undefined')	
				window.parent.frames['header'].document.forms[0].BFprint.disabled = false;
		}
		else if (temp=="Road")
		{
			if (typeof(window.parent.frames['header'].document.forms[0].Bus_solution_id)!='undefined')
				window.parent.frames['header'].document.forms[0].Bus_solution_id.disabled = false;
			if (typeof(window.parent.frames['header'].document.forms[0].Service_id_temp)!='undefined')
				window.parent.frames['header'].document.forms[0].Service_id_temp.disabled = false;
				
			if (typeof(window.parent.frames['header'].document.forms[0].BBudget)!='undefined')
				window.parent.frames['header'].document.forms[0].BBudget.disabled = false;
				
			if (typeof(window.parent.frames['header'].document.forms[0].BQuery)!='undefined')
				window.parent.frames['header'].document.forms[0].BQuery.disabled = false;
			
			/*由路名简拼校验可用线序--去掉	
			var r_mark = xml_info + "/RoadOk";
			var r_node=source.selectNodes(r_mark);
			var r_text_xml = "";
			var r_temp = "";
			r_text_xml=r_node.nextNode();
		
			if(r_text_xml)
			{
				r_temp = r_text_xml.text;
				
				if (r_temp != "ok")
				{
					if (typeof(window.parent.frames['header'].document.forms[0].Road_name)!='undefined')
					{
						window.parent.frames['header'].document.forms[0].Road_name.value = "";
						window.parent.frames['header'].document.forms[0].Road_name.focus();
					}
				}
			}
			else
			{
				if (typeof(window.parent.frames['header'].document.forms[0].Road_name)!='undefined')
				{
					window.parent.frames['header'].document.forms[0].Road_name.value = "";
					window.parent.frames['header'].document.forms[0].Road_name.focus();
				}
			}
			*/
		}
		else 
		{
			if (typeof(window.parent.frames['header'].document.forms[0].Bus_solution_id)!='undefined')
				window.parent.frames['header'].document.forms[0].Bus_solution_id.disabled = false;
			if (typeof(window.parent.frames['header'].document.forms[0].Service_id_temp)!='undefined')
				window.parent.frames['header'].document.forms[0].Service_id_temp.disabled = false;
				
			if (typeof(window.parent.frames['header'].document.forms[0].BBudget)!='undefined')
				window.parent.frames['header'].document.forms[0].BBudget.disabled = false;
				
			if (typeof(window.parent.frames['header'].document.forms[0].BQuery)!='undefined')
				window.parent.frames['header'].document.forms[0].BQuery.disabled = false;			
		}
	}
	return;
}
function set_disabled_div()
{
	var v;
	
	if (typeof(window.parent.frames['header'].disabled_div) !='undefined')
	{

		window.parent.frames['header'].disabled_div.innerHTML= "";

		//v = 'show';//--显示
		v = 'hide';//--隐含
		
		if (window.parent.frames['header'].disabled_div.style)
		{
			var obj=window.parent.frames['header'].disabled_div.style;
			v=(v=='show')?'visible':(v='hide')?'hidden':v;
		}
		obj.visibility=v;
		obj.position='absolute';//不显示
		
		//alert('ok');
	}
	return;
}


