/**
 * <p>Name: nas_get_relation_value.js</p>
 * <p>Description: ͨ����ֵ֪ȷ��ͬ�����еĹ���ֵ�����ѭ��ֵ��</p>
 * <p>AppArea: Ӫҵϵͳ����	Ŀǰ������Դ����ύʱ�����ݵ�ǰ������ֵȥƥ���������ʽ�Ƿ���Ҫ��Դ��⣺ ��ʵ���򵥵İ취��������TAGLIB��Ϣʱ����ID��Ϊ�����Դ洢</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**///alert('nas_get_relation_value.js���óɹ�');
//����˵���� root_xml�� ����'root/Create/Innet_method/option'		
//			 this_xml_name = 'value';		ralation_xml_name = 'check_resource';		--XML ��ǩ��(�����ֵ�ԭ�򣺼��ٳ������ϣ�ֻҪ֪�����־Ϳ��Ե���)
//			 this_value = document.forms[0].Innet_method.value		--��ǰѡ���������ʽ��ֵ
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
	
	for(root_value=root_node.nextNode();root_value;root_value=root_node.nextNode())//ѭ��option
	{
		ththis_found='no';
		rel_found='no';
			
		if (root_value.hasChildNodes())
		{
			for (i=0;i<root_value.childNodes.length;i++)
			{
				xml_name = root_value.childNodes(i).nodeName;
				//��THISֵ
				if (xml_name == this_xml_name)//�ҵ��ڵ���
				{	
					xml_name_node = root_value.selectNodes(xml_name).nextNode();					
					if (xml_name_node)
					{
						xml_name_value = xml_name_node.text;						
						if (xml_name_value == this_value)//�͵�ǰֵһ�£��ҵ�
						{
							this_found='yes';
						}
						else//���ǵ�ǰֵ�Ͳ������������ֵܣ�ƥ�䲻��
						{
							break;
						}
					}
					else//�ýڵ��ǿյĲ��������������ֵ�,ƥ�䲻��
					{
						break;
					}
				}
				//�ҹ���ֵ
				else if (xml_name == ralation_xml_name)//�����ڵ�ȡֵ
				{	
					xml_name_node = root_value.selectNodes(xml_name).nextNode();					
					if (xml_name_node)
					{
						re_value = xml_name_node.text;
						rel_found='yes';
					}
				}
				
				//��ǰֵ�ҵ��ˡ�����ֵȡ���ˣ��Ͳ����ٲ��������ֵ�
				if (this_found=='yes' && rel_found=='yes')
				{
					break;
				}				
			}
		}
		//��ǰֵ�ҵ��ˡ�����ֵȡ���ˣ��Ͳ����ٲ��������ڵ�
		if (this_found=='yes' && rel_found=='yes')
		{
			break;
		}
	}
	
	//alert(re_value);
	return re_value;
}
