//<script language = "JavaScript">
//���ÿؼ���ֵ����󳤶ȡ���ʾ״̬
//���������
//	1��to_field:Ҫ���õĿؼ���
//	2��set_value��Ҫ���õ�ֵ��
//	3��set_status��Ҫ���õ�״̬��1-���ã�2-�����ã�3-ֻ��������ֵ-������״̬��(0��ΪĬ��ֵ�����ı䵱ǰ״̬)��
//	4��set_length��Ҫ���õĿؼ�����󳤶ȣ�(this.maxLength��ΪĬ��ֵ�����ı䵱ǰ��󳤶�)
function set_field(to_field,set_value,set_status,set_length)
{
 	to_field.value = set_value;
 	
 	if(to_field.type=="text")
	{	to_field.maxLength=set_length;	}	//�粻��������󳤶ȣ������set_length�ɴ���this.maxLength
 	
 	
 	if (parseInt(set_status) == 1)			//���óɿ�д״̬
 	{
 		to_field.disabled = false;
 		to_field.readOnly = false;
 		to_field.enabled = true;
 	}
 	else if (parseInt(set_status) == 2)		//�û�
 	{
 		to_field.enabled = false;
 		to_field.disabled = true; 		
 	}
 	else if (parseInt(set_status) == 3)		//���ó�ֻ��״̬
 	{
 		to_field.disabled = false;
 		to_field.enabled = true; 		
 		to_field.readOnly = true;
 	}
}
//</script>

