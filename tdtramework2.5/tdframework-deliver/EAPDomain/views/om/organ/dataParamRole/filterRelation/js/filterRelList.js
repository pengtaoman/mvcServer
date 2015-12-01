/**
 * 页面初始化
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
 *打开修改页面
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
 *执行删除方法
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
 	//删除确认
 	if(!confirm('请确认是否要删除过滤器关系配置信息')){
 		return false;
 	}
 	
 	//EC TABLE属性刷新
	EccnUtil.noExport('ec');
	EccnUtil.refresh('ec');
	
	document.forms[0].action=webpath+"/om/filterRelManage.do?method=deleteFilterRel";
	document.forms[0].target='detail';
	document.forms[0].submit();
}