 /**
  *��ѯ
  */
function queryStatus(){
	//alert("��ѯ����Ϊ�����ѯȫ��");
    myform.action = "batchFileManager.do?method=query";
	document.forms[0].target="list";	    	
	document.forms[0].submit();
}