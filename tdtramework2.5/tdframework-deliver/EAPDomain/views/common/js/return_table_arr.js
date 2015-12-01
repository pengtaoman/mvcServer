/***********************把xml里的数据组成javascript数组返回**************/
/*
输入参数说明：
super_name：需要读取的XML数组上一层目录:例如"/root/CustomerInfo"
xml_name_arr：需要返回的XML标识名称数组;例如cus_xml_name=new Array("First_name","Identity_kind_name","Identity_code","User_contact_phone")
输出说明：返回一个javascript一维数组,可以传给画表格的公用函数
*/
function return_table_arr(super_name,xml_name_arr)
{	
	var table_info=new Array();
	var table_info_len=xml_name_arr.length;	
	var source = document.XMLDocument;	    	   		
	var sup_str = source.selectNodes(super_name);
   	var j=0;
    for (var i = sup_str.nextNode(); i != null; i = sup_str.nextNode())
    {        		
		if (table_info_len > 0)
		{	    			
			for (k=0;k<table_info_len;k++)
			{																		
				var info_count=j*table_info_len+k;
				//alert("info_count is"+info_count);
				//alert("get the name is:"+xml_name_arr[k]);
				//alert("test is"+i.selectNodes("First_name").nextNode().text);
				table_info[info_count]=i.selectNodes(xml_name_arr[k]).nextNode().text;											
			}				
		}		
        j++;         
    }   			
	return table_info;
}