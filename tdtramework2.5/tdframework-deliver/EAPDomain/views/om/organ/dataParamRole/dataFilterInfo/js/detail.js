function init(){
	document.getElementById('filterSelId').value=document.getElementById('filterSelIdHid').value;
	document.getElementById('filterSelValue').value=document.getElementById('filterSelValueHid').value;
}
//�޸ķ���
function modify(webpath){
	document.EAPForm.action=webpath+"/om/datafilterinfo.do?method=modify";
	document.EAPForm.target='list';
	document.EAPForm.submit();
	window.close();
}

