//var APP_PATH = document.getElementsByTagName("contextPath")[0].value;
function showTitle(obj) {
	var allElements = document.body.getElementsByTagName("INPUT");
	for (var i = 0; i < allElements.length; i ++) {
		var e = allElements[i];
		if (e.type == 'file') {	
			e.title = obj.value;
		}
	}
}

function load_submit() { 
 	if(EAPForm.fileName.value == "") {
      	alert("�ļ������ڣ��������ϴ�");
     	return false;
    }else{
    	WaitingBar.setMsg("�ļ������У����Ե�");
		//��ʾ�ȴ�����
		WaitingBar.showMe();	
    }   
    EAPForm.action =APP_PATH+"/upLoadAction.do?method=doUpLoad";
    EAPForm.submit();      
}