var APP_PATH = document.getElementsByTagName("contextPath")[0].value;
var saveCustOrder = null;
var reLoadListPage = null;
function init() {
	if($("listLength").value>0){
		selectTag("tagContent1_2",$("preAcceptId"),"tags1");
		$("preAccept").style.display = "";
		jTip.showAndAutoHide($("preAccept"),"��Ԥ������Ϣ","�˴��鿴Ԥ������Ϣ");
		
	}
	if($("npInfo").value == 'nps'){
		selectTag("tagContent1_5",$("npServiceNo"),"tags1");
		$("npService").style.display = "";
		jTip.showAndAutoHide($("npService"),"npЯ�����","�˴��鿴npҵ����Ϣ");
	}
	checkProtocalInfoCount();
	saveCustOrder = new SaveCustOrder();
	reLoadListPage = new ReLoadListPage();
}

function checkProtocalInfoCount(){
	var count=$("protocalInfoCount").value;
	if(count!="0"){
		$("showProtocalInfo").style.display="";
	}
	//alert(count);
}