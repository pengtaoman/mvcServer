
function init(){
    var message = document.all("open").value;
    alert("日期时间接口测试:"+message);
}
 /**
  *查询
  */
function query(){
	EAPForm.action = APP_PATH+"/demoErrorAction.do?method=query";
	EAPForm.submit();
	
}

function showAll(){
	//EAPForm.action = "demoExtremeTable?method=query";
	//EAPForm.submit();
}