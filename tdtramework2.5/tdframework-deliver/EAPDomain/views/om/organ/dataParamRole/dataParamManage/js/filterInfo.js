
//��ʼ������
function init(flag){
	var tableId = document.getElementById('tableId').value;
	if(tableId == ''){
		return;
	}
	
	if(flag=='modify'){
		getTable();
	}else if(flag=='detailPage'){
		getTable();
		document.getElementById('bDelete').style.display='none';
	}else if(flag=='setCheckbox'){
		document.getElementById('bDelete').style.display='none';
		document.getElementById('bSearch').disabled = '';
		document.getElementById('bSearch').click();
	}else if(flag=='showSave'){
		document.getElementById('bSearch').disabled = '';
		document.getElementById('bSearch').click();
	}else if(flag=='adjust'){
		document.getElementById('bSearch').disabled = '';
		document.getElementById('tableDesc').disabled = 'true';
	}else{
		document.getElementById('bSearch').disabled = '';
	}
	//�����Լ����ڵ�iframe��ܴ�С
	adjustIframeSize();
	//����������iframe��ܴ�С
	parent.adujstIframeSize();
}
/*
 *��ʾ�ȴ���
 */
function showWaitingBar(){
	WaitingBar.setMsg("���ڲ�ѯ���ݣ����Ե�");
	WaitingBar.showMe();  //��ʾ�ȴ���
	//WaitingBar.hideMe();
}
//��ȡ�ñ���Ĺ�����
function getTable(tableId){
	if(tableId == ''){
		return;
	}	
	var flag = document.getElementById("flag").value;
	document.getElementById('bDelete').disabled = 'true';
	//���ı�����Դ��ʱ�������Ϣ�б�����
	window.setTimeout("",1);
	parent.document.getElementById('resultPage').src = '';
	
	var webpath=document.getElementById('webpath').value;
	document.EAPForm.action=webpath+"/om/dataparammanage.do?method=getFilters&flag="+flag;
	document.EAPForm.target='_self';
	document.EAPForm.submit();	
}
//��ѯ����
function doSearch(webpath){
	var tableId=document.getElementById('tableId').value;
	if(tableId==''){
		alert("��ѡ����˱���");
		return false;
	}
	
	parent.document.getElementById("iframeSpace2").style.height = "300px";
	
	document.EAPForm.action=webpath+"/om/dataparammanage.do?method=query";
	document.EAPForm.target='resultPage';
    document.EAPForm.submit();
}
//���淽��
function doSave(){
	//parent.list.doSave();	
	parent.document.resultPage.doSave();
}
/**
 *���ط���
 */
function goBack(){
	var flag = parent.document.getElementById('closeFlag').value;
	
	if(confirm('ȷ��Ҫ���з��ز�����')){
		if(flag == 'close'){
			window.returnValue = "true";
			window.close();
		}else{
			window.close();
		}
	}
}
/**
 *����iframe��ܴ�С
 */
function adjustIframeSize() {
	var a = window.parent.document.getElementsByTagName('iframe');
	for (var i=0; i<a.length; i++) {
		if (a[i].name == self.name) {
			a[i].style.height = document.body.scrollHeight+10;
			return;
		}
	}
}