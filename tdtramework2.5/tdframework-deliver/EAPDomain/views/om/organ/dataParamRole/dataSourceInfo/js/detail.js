function init(ifUsed){
	//��ʼ�� �ֶ����ú� ���������� �����б�ֵ
	document.getElementById('columnType').value=document.getElementById('columnTypeHid').value;
	var filterTemp=document.getElementById('filterIdHid').value;
	if(filterTemp=="noFilter"){
		document.getElementById('filterEff').value="";
	}else{
		document.getElementById('filterEff').value=filterTemp;
	}
	//�������Դ���Ѿ���ʹ�ã������������Ҫ�����Բ��������޸�
	if(ifUsed == 'true'){
		document.getElementById('columnOrder').disabled = 'disabled';
		document.getElementById('columnType').disabled = 'disabled';
		document.getElementById('filterEff').disabled = 'disabled';
	}
}
//�޸ķ���
function modify(webpath){
	
	document.EAPForm.action=webpath+"/om/datasourceinfo.do?method=modify";
	document.EAPForm.target='list';
	document.EAPForm.submit();
	window.close();
}
// У��ҳ���ֶ�˳��ֻ����������
function checkNum(keyVal){
	if(keyVal<48||keyVal>57){
		alert('�˴�ֻ������������');
		return false;
	}
}
