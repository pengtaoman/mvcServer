/**
 * <p>Name: nas_select_default.js</p>
 * <p>Description: �����б��Ĭ��ѡ��</p>
 * <p>AppArea: ����</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @date 20021206
 * @version 1.0
**/
//alert('nas_select_default.js���óɹ�');
function nas_select_default(form_name,dwname,dwselect)
{
	source = document.XMLDocument;
	mark="/root/"+dwselect; 
   
	v=source.selectNodes(mark);    
	for(t=v.nextNode();t;t=v.nextNode())
	{ 
		temp=t.text; 
		
		if (temp!="-1" && temp!="")
		{
			var dwobject="document."+form_name+"."+dwname+".value='"+temp+"'";
			eval(dwobject);
		}
	}  
}


