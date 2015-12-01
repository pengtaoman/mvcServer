/**
 * <p>Name: nas_get_relation_value.js</p>
 * <p>Description: 通过已知值确定同级树中的关联值（针对循环值）</p>
 * <p>AppArea: 营业系统公用	目前用在资源检测提交时，根据当前入网的值去匹配该入网方式是否需要资源检测： 其实更简单的办法是在生成TAGLIB信息时，将ID作为其属性存储</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**///alert('nas_get_relation_value.js引用成功');
//参数说明： root_xml： 例：'root/Create/Innet_method/option'		
//			 this_xml_name = 'value';		ralation_xml_name = 'check_resource';		--XML 标签名(用名字的原因：减少程序的耦合，只要知道名字就可以调用)
//			 this_value = document.forms[0].Innet_method.value		--当前选择的入网方式的值
function nas_get_relation_value(root_xml,this_xml_name,ralation_xml_name,this_value)
{
	var source = document.XMLDocument;
	var mark = root_xml;
	var root_node=source.selectNodes(mark);
	var root_value;
	
	var this_found='no';
	var rel_found='no';
	var re_value='';
	
	
	var xml_name;
	var xml_name_node;
	var xml_name_value;
	
	for(root_value=root_node.nextNode();root_value;root_value=root_node.nextNode())//循环option
	{
		ththis_found='no';
		rel_found='no';
			
		if (root_value.hasChildNodes())
		{
			for (i=0;i<root_value.childNodes.length;i++)
			{
				xml_name = root_value.childNodes(i).nodeName;
				//找THIS值
				if (xml_name == this_xml_name)//找到节点了
				{	
					xml_name_node = root_value.selectNodes(xml_name).nextNode();					
					if (xml_name_node)
					{
						xml_name_value = xml_name_node.text;						
						if (xml_name_value == this_value)//和当前值一致，找到
						{
							this_found='yes';
						}
						else//不是当前值就不用找了其他兄弟，匹配不上
						{
							break;
						}
					}
					else//该节点是空的不用在找了其他兄弟,匹配不上
					{
						break;
					}
				}
				//找关联值
				else if (xml_name == ralation_xml_name)//关联节点取值
				{	
					xml_name_node = root_value.selectNodes(xml_name).nextNode();					
					if (xml_name_node)
					{
						re_value = xml_name_node.text;
						rel_found='yes';
					}
				}
				
				//当前值找到了、关联值取得了，就不用再查找其他兄弟
				if (this_found=='yes' && rel_found=='yes')
				{
					break;
				}				
			}
		}
		//当前值找到了、关联值取得了，就不用再查找其他节点
		if (this_found=='yes' && rel_found=='yes')
		{
			break;
		}
	}
	
	//alert(re_value);
	return re_value;
}
