//初始化方法
function init(){
	TitleBar.addTitleBarByTag('select');
}

//查询方法
function doSearch(webpath){	
	document.forms[0].action=webpath+"/om/datasourceinfo.do?method=query";
	document.forms[0].target='list';
    document.forms[0].submit();
}
//新增按钮
function doAdd(webpath){
    var url=webpath+"/om/datasourceinfo.do?method=insertInit";
    var style="status:no;dialogWidth:750px;dialogHeight:650px";
    window.showModalDialog(url,window,style);	
}

//删除方法
function doDelete(webpath){
	parent.list.doDelete(webpath);
}


