/**
 *局部刷新获取数据源表描述
 */
function init(tableId,mianColumn){
	if(tableId == ''){ 
		return;
	}else{
		document.getElementById("tableId").value = tableId;
		
		getFilterInfo();
		getTableDesc();
		showMagInfo();
		
		if(mianColumn != ''){
			document.getElementById("filterName").value = mianColumn;
			doSearch();
		}
	}		
}
/**
 *局部刷新获取数据源表描述
 */
function getFilterInfo(){
	var tableId = document.getElementById("tableId").value;
	if(tableId == '') 
		return ;
	
	var paramters = "tableId="+tableId;
	//显示操作方式下拉框
	var result = executeRequest("filterRelManage","getFilterColl",paramters);
	var obj = document.getElementById("filterName");
	obj.outerHTML = obj.outerHTML.substring(0,obj.outerHTML.indexOf(">")+1) + result + "</select>";
}
/**
 *局部刷新获取数据源表描述
 */
function getTableDesc(){
	var tableId = document.getElementById("tableId").value;
	if(tableId == '') 
		return ;
		
	document.getElementById("bSave").disabled = 'true';
	//当改变数据源表时，清空信息列表内容
	window.setTimeout("",1);
	parent.document.getElementById('list').src = '';
	
	var paramters = "tableId="+tableId;
	//显示操作方式下拉框
	var result = executeRequest("filterRelManage","getTableDesc",paramters);
	var obj = document.getElementById("tableDesc");
	if(result == 'null'){
		result = '';
	}
	obj.value = result;
}
/**
 *显示提示信息
 */
function showMagInfo(){
	document.getElementById("alertMsg").style.display = 'inline';
}
/**
 *查询方法
 */
function checkParamNull(){
	var tableId = document.getElementById("tableId").value;
	if(tableId == ''){
		alert("数据源表不能为空，请选择");
		document.getElementById("tableId").focus();
		return false;
	}
	
	var filterName = document.getElementById("filterName").value;
	if(filterName == ''){
		alert("主过滤器不能为空，请选择");
		document.getElementById("filterName").focus();
		return false;
	}
	
	return true;
}
/**
 *查询方法
 */
function doSearch(){
	if(!checkParamNull()){
		return;
	}
	
	document.forms[0].action=APP_PATH+"/om/filterRelManage.do?method=queryPassiveFilter";
	document.forms[0].target='list';
    document.forms[0].submit();
}
/**
 *返回方法
 */
function goBack(){
	var operType = parent.detail.document.getElementById("operType").value;
	var tableId = document.getElementById("tableId").value;
	
	if(confirm('确定要进行返回操作吗？')){
		if(operType=='' || tableId==''){
			window.close();
		}else if(operType=='add' || operType=='modify'){
			window.returnValue = tableId;
			window.close();
		}
	}
}
/**
 *保存方法
 */
function saveMethod(webpath){
	parent.list.doSave(webpath);
}






