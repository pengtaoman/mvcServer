 /**
  *查询
  */
function queryStatus(){
	//alert("查询条件为空则查询全部");
    myform.action = "batchFileManager.do?method=query";
	document.forms[0].target="list";	    	
	document.forms[0].submit();
}