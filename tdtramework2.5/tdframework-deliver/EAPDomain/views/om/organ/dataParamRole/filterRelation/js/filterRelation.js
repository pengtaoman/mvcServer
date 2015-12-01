/**
 *局部刷新获取数据源表描述
 */
function getTableDesc(){
	var tableId = document.getElementById("tableId").value;
	if(tableId == '') 
		return ;
	
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
 *查询方法
 */
function doSearch(webpath){
	var tableId = document.getElementById("tableId").value;
	if(tableId == ''){ 
		alert("数据源表不能为空，请选择");
		document.getElementById("tableId").focus();
		return ;
	}
	
	document.forms[0].action=webpath+"/om/filterRelManage.do?method=queryFilterRel";
	document.forms[0].target='list';
    document.forms[0].submit();
}
/*
 *打开新增页面
 */
function showAddPage(webpath){  
	var tableId = document.getElementById("tableId").value;  
	
	var url = webpath + "/views/om/organ/dataParamRole/filterRelation/addIndex.jsp?tableId="+tableId; 
	var tableId = showModalDialog(url,window,'status:no;DialogWidth:650px;DialogHeight:360px;');
	
	if(tableId!='' && tableId!=null){
		document.getElementById("tableId").value = tableId;
		doSearch(webpath);
	}
}
/*
 *删除方法
 */
function doDelete(webpath){
	parent.list.doDelete(webpath);
}



