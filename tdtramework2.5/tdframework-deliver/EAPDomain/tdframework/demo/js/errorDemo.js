
function init(){
    var message = document.all("open").value;
    alert("����ʱ��ӿڲ���:"+message);
}
 /**
  *��ѯ
  */
function query(){
	EAPForm.action = APP_PATH+"/demoErrorAction.do?method=query";
	EAPForm.submit();
	
}

function showAll(){
	//EAPForm.action = "demoExtremeTable?method=query";
	//EAPForm.submit();
}