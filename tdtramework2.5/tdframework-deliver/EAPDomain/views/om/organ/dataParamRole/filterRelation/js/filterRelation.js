/**
 *�ֲ�ˢ�»�ȡ����Դ������
 */
function getTableDesc(){
	var tableId = document.getElementById("tableId").value;
	if(tableId == '') 
		return ;
	
	var paramters = "tableId="+tableId;
	//��ʾ������ʽ������
	var result = executeRequest("filterRelManage","getTableDesc",paramters);
	var obj = document.getElementById("tableDesc");
	if(result == 'null'){
		result = '';
	}
	obj.value = result;
}
/**
 *��ѯ����
 */
function doSearch(webpath){
	var tableId = document.getElementById("tableId").value;
	if(tableId == ''){ 
		alert("����Դ����Ϊ�գ���ѡ��");
		document.getElementById("tableId").focus();
		return ;
	}
	
	document.forms[0].action=webpath+"/om/filterRelManage.do?method=queryFilterRel";
	document.forms[0].target='list';
    document.forms[0].submit();
}
/*
 *������ҳ��
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
 *ɾ������
 */
function doDelete(webpath){
	parent.list.doDelete(webpath);
}



