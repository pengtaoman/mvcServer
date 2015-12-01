/**
 *�ֲ�ˢ�»�ȡ����Դ������
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
 *�ֲ�ˢ�»�ȡ����Դ������
 */
function getFilterInfo(){
	var tableId = document.getElementById("tableId").value;
	if(tableId == '') 
		return ;
	
	var paramters = "tableId="+tableId;
	//��ʾ������ʽ������
	var result = executeRequest("filterRelManage","getFilterColl",paramters);
	var obj = document.getElementById("filterName");
	obj.outerHTML = obj.outerHTML.substring(0,obj.outerHTML.indexOf(">")+1) + result + "</select>";
}
/**
 *�ֲ�ˢ�»�ȡ����Դ������
 */
function getTableDesc(){
	var tableId = document.getElementById("tableId").value;
	if(tableId == '') 
		return ;
		
	document.getElementById("bSave").disabled = 'true';
	//���ı�����Դ��ʱ�������Ϣ�б�����
	window.setTimeout("",1);
	parent.document.getElementById('list').src = '';
	
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
 *��ʾ��ʾ��Ϣ
 */
function showMagInfo(){
	document.getElementById("alertMsg").style.display = 'inline';
}
/**
 *��ѯ����
 */
function checkParamNull(){
	var tableId = document.getElementById("tableId").value;
	if(tableId == ''){
		alert("����Դ����Ϊ�գ���ѡ��");
		document.getElementById("tableId").focus();
		return false;
	}
	
	var filterName = document.getElementById("filterName").value;
	if(filterName == ''){
		alert("������������Ϊ�գ���ѡ��");
		document.getElementById("filterName").focus();
		return false;
	}
	
	return true;
}
/**
 *��ѯ����
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
 *���ط���
 */
function goBack(){
	var operType = parent.detail.document.getElementById("operType").value;
	var tableId = document.getElementById("tableId").value;
	
	if(confirm('ȷ��Ҫ���з��ز�����')){
		if(operType=='' || tableId==''){
			window.close();
		}else if(operType=='add' || operType=='modify'){
			window.returnValue = tableId;
			window.close();
		}
	}
}
/**
 *���淽��
 */
function saveMethod(webpath){
	parent.list.doSave(webpath);
}






