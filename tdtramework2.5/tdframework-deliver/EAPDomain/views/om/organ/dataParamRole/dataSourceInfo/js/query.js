//��ʼ������
function init(){
	TitleBar.addTitleBarByTag('select');
}

//��ѯ����
function doSearch(webpath){	
	document.forms[0].action=webpath+"/om/datasourceinfo.do?method=query";
	document.forms[0].target='list';
    document.forms[0].submit();
}
//������ť
function doAdd(webpath){
    var url=webpath+"/om/datasourceinfo.do?method=insertInit";
    var style="status:no;dialogWidth:750px;dialogHeight:650px";
    window.showModalDialog(url,window,style);	
}

//ɾ������
function doDelete(webpath){
	parent.list.doDelete(webpath);
}


