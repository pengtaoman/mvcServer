
//��ʼ������
function init(){
	
	document.getElementById('bcheck').disabled=true;
 	document.getElementById('bback').disabled=true;
}

//��ѯ����
function doSearch(webpath){
		
	document.EAPForm.action=webpath+"/om/checkperson.do?method=query";
	document.EAPForm.target='list';
    document.EAPForm.submit();
}
//��˷���
function docheck(webpath){
	
	document.EAPForm.action=webpath+"/om/checkperson.do?method=check";
	document.EAPForm.target='list';
    document.EAPForm.submit();
}
//��˻��˷���
function doBack(webpath){
	document.EAPForm.action=webpath+"/om/checkperson.do?method=undoCheck";
	document.EAPForm.target='list';
    document.EAPForm.submit();
}