function init(){
	//��ʼ�� �ֶ����ú� ���������� �����б�ֵ
	document.getElementById('columnType').value=document.getElementById('columnTypeHid').value;
	var filterTemp=document.getElementById('filterIdHid').value;
	if(filterTemp=="noFilter"){
		document.getElementById('filterEff').value="";
	}else{
		document.getElementById('filterEff').value=filterTemp;
	}
}
//�޸ķ���
function modify(webpath){
	
	document.EAPForm.action=webpath+"/om/datasourceinfo.do?method=modify";
	document.EAPForm.target='list';
	document.EAPForm.submit();
}

