//<script language = "JavaScript">
//����ҳ�������ı���,�ı����������б��״̬Ϊ�ɱ༭״̬�򲻿ɱ༭״̬
//���������
//	1��to_field:Ҫ���õı���
//	2��status��Ҫ���õı����״̬��ȡֵΪtrue��false
function set_form_status(the_form,status)
{
	for (i=0;i<the_form.elements.length;i++)
	{
		if (the_form.elements[i].type.substr(0,4)=="text" || the_form.elements[i].type.substr(0,4)=="sele")
		{
			the_form.elements[i].disabled=status;
		}
	}
	
}
//</script>

