/**
		 * ҳ���ʼ��
		 */
var eccn=new ECCN("ec");
function init(flagDisplay,tableName){
    eccn.doPrep=false;//��ʹ��Ԥ��ѯ 
	eccn.init();
	
}
//�ֲ�ˢ�»�ȡ�� ������������
function getPartRefresh(tableName){
	//alert("tableName  "+tableName);
	var param="tableName="+tableName
	var resultName = executeRequest("datafilterinfo","getColumnName",param);
	var objId = document.getElementById("columnId");
	objId.outerHTML = objId.outerHTML.substring(0,objId.outerHTML.indexOf(">")+1) + resultName +"</select>";
	
	var objName = document.getElementById("columnName");
	objName.outerHTML = objName.outerHTML.substring(0,objName.outerHTML.indexOf(">")+1) + resultName +"</select>";
	
	TitleBar.addTitleBarByTag('select');
}


//�������淽��
function doSave(webpath){
	var message=getValue();
	if(message!=''){
		alert(message);
		return false;
	}
	document.getElementById('EAPForm').action=webpath+"/om/datafilterinfo.do?method=doSave";
	document.getElementById('EAPForm').target='list';
	document.getElementById('EAPForm').submit();
	window.close();
}
//У��
function getValue(){
	var message="";
	var descObj=document.getElementById('filterDesc');
	var nameObj=document.getElementById('filterInfo');
	var IdObj=document.getElementById('columnId');
	var colNameObj=document.getElementById('columnName');
	if(descObj.value==''){
		message+="���������Ʋ�����Ϊ�� \n";
		descObj.focus();
	}
	if(nameObj.value==''){
		message+="�����Ʋ�����Ϊ�� \n";
		nameObj.focus();
	}
	if(IdObj.value==''){
		message+="ID�ֶβ�����Ϊ�� \n";
		IdObj.focus();
	}
	if(colNameObj.value==''){
		message+="NAME�ֶβ�����Ϊ�� \n";
		colNameObj.focus();
	}
	return message;
}


