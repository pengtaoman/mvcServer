/**
 * ҳ���ʼ��
 */
var eccn=new ECCN("ec");

function init(message){

    eccn.doPrep=false;
	eccn.ajaxSubmit=false;
	eccn.init();
	if(message!=''){
		alert(message);
	}
	
	parent.query.document.getElementById('bDelete').disabled=false;
}
/*
 *���޸�ҳ��
 */
function showModifyPage(tableId,mainColumn){  
	if(tableId=='' || mainColumn==''){
		return;
	}
	
	var url = APP_PATH + "/views/om/organ/dataParamRole/filterRelation/addIndex.jsp?tableId="+tableId+"&mainColumn="+mainColumn; 
	tableId = showModalDialog(url,window,'status:no;DialogWidth:650px;DialogHeight:360px;');
	
	if(tableId!='' && tableId!=null){
		parent.query.document.getElementById("tableId").value = tableId;
		parent.query.doSearch(APP_PATH);
	}
}
/*
 *ִ��ɾ������
 */
function doDelete(webpath){
 	var canBeSubmit = false;
 	var array=document.getElementsByName('checkboxs');
 	for (i=0;i<array.length;i++){
 		if(array[i].checked==true){
 			canBeSubmit = true;
 			break;
 		}
 	}
 	if(!canBeSubmit){
 		return;
 	}
 	//ɾ��ȷ��
 	if(!confirm('��ȷ���Ƿ�Ҫɾ����������ϵ������Ϣ')){
 		return false;
 	}
 	
 	//EC TABLE����ˢ��
	EccnUtil.noExport('ec');
	EccnUtil.refresh('ec');
	
	document.forms[0].action=webpath+"/om/filterRelManage.do?method=deleteFilterRel";
	document.forms[0].target='detail';
	document.forms[0].submit();
}