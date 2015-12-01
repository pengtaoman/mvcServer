/**
		 * 页面初始化
		 */
var eccn=new ECCN("ec");
function init(flagDisplay,tableName){
    eccn.doPrep=false;//不使用预查询 
	eccn.init();
	
}
//局部刷新获取表 列名和列类型
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


//新增保存方法
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
//校验
function getValue(){
	var message="";
	var descObj=document.getElementById('filterDesc');
	var nameObj=document.getElementById('filterInfo');
	var IdObj=document.getElementById('columnId');
	var colNameObj=document.getElementById('columnName');
	if(descObj.value==''){
		message+="过滤器名称不可以为空 \n";
		descObj.focus();
	}
	if(nameObj.value==''){
		message+="表名称不可以为空 \n";
		nameObj.focus();
	}
	if(IdObj.value==''){
		message+="ID字段不可以为空 \n";
		IdObj.focus();
	}
	if(colNameObj.value==''){
		message+="NAME字段不可以为空 \n";
		colNameObj.focus();
	}
	return message;
}


