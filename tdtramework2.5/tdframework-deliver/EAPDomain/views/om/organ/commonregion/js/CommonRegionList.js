var PATH;
function doDelete(path){
	if(!confirm("ȷ��Ҫɾ��ѡ�е�������?")){
		return false;
	}
	setButtonDisabled();
	document.getElementById("mainForm").action=path+"/om/commonRegionAction.do?method=doDeleteCommonRegion";
	document.getElementById("mainForm").target="_self";
	document.getElementById("mainForm").submit();
}

function doModify(){
	setButtonDisabled();
	document.getElementById("mainForm").action=path+"/om/commonRegionAction.do?method=initModifyPage";
	document.getElementById("mainForm").target="_self";
	document.getElementById("mainForm").submit();
}

function doAddNew(){
	setButtonDisabled();
	document.getElementById("mainForm").action=path+"/om/commonRegionAction.do?method=initAddNewPage";
	document.getElementById("mainForm").target="_self";
	document.getElementById("mainForm").submit();
}

function init(path,operFlag){
	this.path=path;
	var message=document.getElementById("message").value;
	if(message!=""){
		alert(message);
	}
	//����֮��Ҫˢ����
	if(operFlag=="AFTER_STORE"){
		parent.refreshZoneItemTree();
	}
}

function setButtonDisabled(){
	document.getElementById("AddNew").disabled=true;
	document.getElementById("Modify").disabled=true;
	document.getElementById("Delete").disabled=true;
}