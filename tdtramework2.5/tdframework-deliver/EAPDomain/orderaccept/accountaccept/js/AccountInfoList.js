var eccn = new ECCN("ec");


function init(){
	eccn.init();
	
	//������װ��ѡ���ʻ�����
	if(window.opener)
	{
		document.getElementById("ifBatchOper").style.display = "block";
	}
}

onload = function(){
	init();
}

function postValue(accountId,accountName){
//	for (var p in isDefaultFeeChkList) {
//		isDefaultFeeChkList[p].target.checked = false;
//		delete isDefaultFeeChkList[p];
//	}
//	checkDefaultFeeChk(accountId);
	if(window.opener)
	{
		document.getElementById("accId").value = accountId;
	}
	else
	{
		window.parent.document.getElementById("listAccountId").value = accountId;
		window.parent.document.getElementById("listAccountName").value = accountName;
	}
	
	
}

//��ѯ�ʻ���Ϣ����xml��,֧��������װ��ѡ���ʻ�����
function queryAccInfo()
{
	var accId = document.getElementById("accId").value;
	if(accId=='')
	{
		alert("��ѡ���ʻ���");
		return;
	}

	var param = "&accId="+accId;
	var result = executeRequest("accountAcceptAction","getAccInfoXml",param);
	window.opener.$('accountXml').value = "<accouInfoColl>"+result+"</accouInfoColl>";
	window.opener.$('accountId').value = accId;
	
	window.close();
}
//var isDefaultFeeChkList = {};
//function initIsDefaultFeeChk(target, accountId){
//	if(target.checked == true){
//		isDefaultFeeChkList[accountId] = {
//			"target":target
//		}
//	}else{
//		delete isDefaultFeeChkList[accountId];
//	}
//}
//
//function checkDefaultFeeChk(accountId){
//	var isDefaultFeeChkTargetList = $$("isDefaultFeeChk");
//	if(isDefaultFeeChkTargetList){
//		for(var i = 0, len = isDefaultFeeChkTargetList.length; i < len; i++) {
//			if(isDefaultFeeChkTargetList[i].value == accountId){
//				isDefaultFeeChkTargetList[i].checked = true;
//				initIsDefaultFeeChk(isDefaultFeeChkTargetList[i], accountId);
//				break;
//			}
//		}
//	}
//}