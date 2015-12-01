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
      	alert("文件不存在，请重新上传");
     	return false;
    }else{
    	WaitingBar.setMsg("文件处理中，请稍等");
		//显示等待条：
		WaitingBar.showMe();	
    }   
    EAPForm.action =APP_PATH+"/upLoadAction.do?method=doUpLoad";
    EAPForm.submit();      
}