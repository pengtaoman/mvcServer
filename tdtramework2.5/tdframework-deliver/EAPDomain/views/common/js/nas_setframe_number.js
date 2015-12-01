/**
 * <p>Name: nas_setframe_number.js</p>
 * <p>Description: 生成上一帧的函数</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/

//alert('nas_setframe_number.js引用成功');
function nas_setframe_number(xml_info,this_fild)
{
	var source = document.XMLDocument;
	var kind_mark = xml_info + "/SubmitKind";
	var kind_node=source.selectNodes(kind_mark);
	var kind_text_xml = "";
	var kind_temp = "";
	kind_text_xml=kind_node.nextNode();

	if(kind_text_xml)
	{
		kind_temp = kind_text_xml.text;
		
		
		if (kind_temp=="Number")
		{
			var mark = xml_info + "/NumOk";
			var node=source.selectNodes(mark);
			var text_xml = "";
			var temp = "";
			text_xml=node.nextNode();
			
			if(text_xml)
			{
				temp = text_xml.text;
				if (temp == "ok")
				{
					////////////////////////设置小区和局向
					var area_mark = xml_info + "/NumArea";
					var area_node=source.selectNodes(area_mark);
					var area_text_xml = "";
					var area_temp = "";
					area_text_xml=area_node.nextNode();
					
					var bur_mark = xml_info + "/NumBureau";
					var bur_node = source.selectNodes(bur_mark);
					var bur_text_xml = "";
					var bur_temp = "";
					bur_text_xml = bur_node.nextNode();
					
					
					if (typeof(window.parent.frames['header'].document.forms[0].Area_id)!='undefined')
					{
						if(area_text_xml)
						{
							area_temp = area_text_xml.text;
							//area_temp = "123456";
							
							if (area_temp!="")
							{
								window.parent.frames['header'].document.forms[0].Area_id.value = area_temp;
								
								if (window.parent.frames['header'].document.forms[0].Area_id.value!="")
								{
									window.parent.frames['header'].document.forms[0].Area_id.disabled = true;
								}
								else
								{
									window.parent.frames['header'].document.forms[0].Area_id.disabled = false;
								}
							}
							else
							{
								window.parent.frames['header'].document.forms[0].Area_id.disabled = false;
							}
						}
						else
						{
							//初始化小区&false
							window.parent.frames['header'].document.forms[0].Area_id.disabled = false;
						}
					}
					if (typeof(window.parent.frames['header'].document.forms[0].Bureau_id)!='undefined')
					{
						if(bur_text_xml)
						{
							bur_temp = bur_text_xml.text;
							//bur_temp = "1000";
							
							if (bur_temp!="")
							{
								window.parent.frames['header'].document.forms[0].Bureau_id.value = bur_temp;					
								if (window.parent.frames['header'].document.forms[0].Bureau_id.value!="")
								{
									window.parent.frames['header'].document.forms[0].Bureau_id.disabled = true;
								}
								else
								{
									window.parent.frames['header'].document.forms[0].Bureau_id.disabled = false;
								}
							}
							else
							{
								window.parent.frames['header'].document.forms[0].Bureau_id.disabled = false;
							}
						}
						else
						{
							//初始化局向&false
							window.parent.frames['header'].document.forms[0].Bureau_id.disabled = false;
						}
					}
				}//号码有效
				else
				{
					var err_mark = xml_info + "/ErrInfo";
					var err_node=source.selectNodes(err_mark);
					var err_text_xml = "";
					var err_temp = "";
					err_text_xml=err_node.nextNode();
					
					if(err_text_xml)
					{
						err_temp = err_text_xml.text;
						if (err_temp!="")
						{
							alert(err_temp);
						}
					}
					//window.parent.frames['header'].document.forms[0].Service_id.value = window.parent.frames['header'].document.forms[0].Area_code.value;
					window.parent.frames['header'].document.forms[0].New_service_id.value = window.parent.frames['header'].document.forms[0].Area_code.value;
					window.parent.frames['header'].document.forms[0].New_service_id.disabled = false;
					window.parent.frames['header'].document.forms[0].New_service_id.focus();
					//初始化小区&false
					//初始化局向&false
					if (typeof(window.parent.frames['header'].document.forms[0].Area_id)!='undefined')
					{
						window.parent.frames['header'].document.forms[0].Area_id.disabled = false;
					}
					if (typeof(window.parent.frames['header'].document.forms[0].Bureau_id)!='undefined')
					{
						window.parent.frames['header'].document.forms[0].Bureau_id.disabled = false;
					}
				}//号码无效、或检测失败
			}
			else
			{
				alert('号码检测失败！请稍后再试！');
				//window.parent.frames['header'].document.forms[0].Service_id.value = window.parent.frames['header'].document.forms[0].Area_code.value;
				window.parent.frames['header'].document.forms[0].New_service_id.value = window.parent.frames['header'].document.forms[0].Area_code.value;
				window.parent.frames['header'].document.forms[0].New_service_id.disabled = false;
				window.parent.frames['header'].document.forms[0].New_service_id.focus();
				//初始化小区&false
				//初始化局向&false
				if (typeof(window.parent.frames['header'].document.forms[0].Area_id)!='undefined')
				{
					window.parent.frames['header'].document.forms[0].Area_id.disabled = false;
				}
				if (typeof(window.parent.frames['header'].document.forms[0].Bureau_id)!='undefined')
				{
					window.parent.frames['header'].document.forms[0].Bureau_id.disabled = false;
				}
			}
		}
		if (kind_temp=="Number_new_acc")
		{
			var mark = xml_info + "/NumOk";
			var node=source.selectNodes(mark);
			var text_xml = "";
			var temp = "";
			text_xml=node.nextNode();
					
			temp = text_xml.text;
			if (temp == "ok" || temp == "ok_new")
			{
				//设置imsi					
				var imsi_node=source.selectNodes(xml_info + "/Imsi");
			
				imsi_temp=imsi_node.nextNode().text;
				if (typeof(window.parent.frames['header'].document.forms[0].imsi)!='undefined')
				{					
					window.parent.frames['header'].document.forms[0].imsi.value = imsi_temp;	
				}
				//设置source_id					
				var dealer_id_node=source.selectNodes(xml_info + "/Dealer_id");
			
				dealer_id_temp=dealer_id_node.nextNode().text;
				if (typeof(window.parent.frames['header'].document.forms[0].source_id)!='undefined')
				{					
					window.parent.frames['header'].document.forms[0].source_id.value = dealer_id_temp;
				}
				//设置页面显示代理商				
				var dealer_name_node=source.selectNodes(xml_info + "/Dealer_name");
			
				dealer_name_temp=dealer_name_node.nextNode().text;
				if (typeof(window.parent.frames[0].tabset1_tab3)!='undefined')
				{	
					if (typeof(window.parent.frames[0].tabset1_tab3.all("dealer"))!='undefined')
					{					
						window.parent.frames[0].tabset1_tab3.all("dealer").value = dealer_name_temp;													
					}		
				}
				//设置是否预配		
				var if_pre_coop_node=source.selectNodes(xml_info + "/If_pre_coop");
			
				if_pre_coop_temp=if_pre_coop_node.nextNode().text;
				if (typeof(window.parent.frames['header'].document.forms[0].if_pre_coop)!='undefined')
				{	
					window.parent.frames['header'].document.forms[0].if_pre_coop.value = if_pre_coop_temp;
				}
				
				//设置卡类型		
				var card_kind=source.selectNodes(xml_info + "/Card_kind");
			
				card_kind_temp=card_kind.nextNode().text;
				if (typeof(window.parent.frames['header'].document.forms[0].card_kind)!='undefined')
				{	
					window.parent.frames['header'].document.forms[0].card_kind.value = card_kind_temp;
				}
				
				//如果预配,设置卡号		
				var cardno_node=source.selectNodes(xml_info + "/CardNo");
			
				cardno_temp=cardno_node.nextNode().text;
				
				var resource_kind=source.selectNodes(xml_info + "/Resource_kind").nextNode().text;
				if(cardno_temp != ""){
					if(resource_kind =="1"){
						if (typeof(window.parent.frames['header'].document.forms[0].card_number)!='undefined')
						{
							window.parent.frames['header'].document.forms[0].card_number.value = cardno_temp;
							window.parent.frames['header'].document.forms[0].card_number.disabled = true;
						}
					}else{
						if (typeof(window.parent.frames['header'].document.forms[0].service_id)!='undefined')
						{
							window.parent.frames['header'].document.forms[0].service_id.value = cardno_temp;
							window.parent.frames['header'].document.forms[0].service_id.disabled = true;
						}
					}
					
				}else{
					if(resource_kind =="1"){
						if (typeof(window.parent.frames['header'].document.forms[0].card_number)!='undefined')
						{
							window.parent.frames['header'].document.forms[0].card_number.disabled = false;
						}
					}else{
						if (typeof(window.parent.frames['header'].document.forms[0].service_id)!='undefined')
						{
							window.parent.frames['header'].document.forms[0].service_id.disabled = false;
						}
					}
				}
				//设置新装预配卡的附加业务
				if (temp == "ok_new")
				{
					var had_str=source.selectNodes(xml_info + "/attach").nextNode().text;
					
					var str_arr = had_str.split('');
					this_fild_check="window.parent.frames['header'].tabset1_tab3.all('ser_div').all('check_box_create_add_info')";
					
						var str_fild = this_fild_check +".length";
						if (typeof(eval(str_fild))!='undefined')
						{
							
							for (var i=0;i<str_arr.length;i++)
							{
								
								check_fild = this_fild_check + "["+i+"].checked=true";
								
								if (str_arr[i]=="1")
								{
									eval(check_fild)
								}							
							}
						}//多于一个
						else
						{
							check_fild = this_fild_check + ".checked=true";
							if (str_arr[i]=="1")
							{
								eval(check_fild)
							}	
						}															
				}				
									
			}//号码有效
			else
			{
				var err_mark = xml_info + "/ErrInfo";
				var err_node=source.selectNodes(err_mark);
				var err_text_xml = "";
				var err_temp = "";
				err_text_xml=err_node.nextNode();
				
				if(err_text_xml)
				{
					err_temp = err_text_xml.text;
					if (err_temp!="")
					{
						alert(err_temp);
					}
				}				
			}//号码无效、或检测失败			
		}
	}
}




