/***********************��xml����������javascript���鷵��**************/
/*
�������˵����
super_name����Ҫ��ȡ��XML������һ��Ŀ¼:����"/root/CustomerInfo"
xml_name_arr����Ҫ���ص�XML��ʶ��������;����cus_xml_name=new Array("First_name","Identity_kind_name","Identity_code","User_contact_phone")
���˵��������һ��javascript��ά����,���Դ��������Ĺ��ú���
*/
function return_table_much_arr(super_name,xml_name_arr)
{	
	var table_info=new Array();
	var table_col=new Array();
	var table_info_len=xml_name_arr.length;	
	var source = document.XMLDocument;	 
   	var sup_str = source.selectNodes(super_name);
   	var j=0;
    for (var i = sup_str.nextNode(); i != null; i = sup_str.nextNode())
    {        
		table_info[j]=new Array();
		if (table_info_len > 0)
		{	    			
			for (k=0;k<table_info_len;k++)
			{																		
				table_col[k]=i.selectNodes(xml_name_arr[k]).nextNode().text;					
				table_info[j][k]=table_col[k];						
			}				
		}	           
        j++;         
    }   	
	return table_info;
}