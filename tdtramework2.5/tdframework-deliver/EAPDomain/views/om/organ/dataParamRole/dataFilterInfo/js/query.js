
//初始化方法
function init(){
	TitleBar.addTitleBarByTag('select');
}

//查询方法
function doSearch(webpath){
	parent.myFrame.rows="110,*,0";
	
	document.EAPForm.action=webpath+"/om/datafilterinfo.do?method=query";
	document.EAPForm.target='list';
    document.EAPForm.submit();
}

//新增按钮
function doAdd(webpath){
	parent.myFrame.rows="110,*,0";
    //document.EAPForm.action=webpath+"/om/datafilterinfo.do?method=insertInit";
	//document.EAPForm.target='list';
    //document.EAPForm.submit();
    
    var url=webpath+"/om/datafilterinfo.do?method=insertInit";
    var style="status:no;dialogWidth:750px;dialogHeight:230px";
    window.showModalDialog(url,window,style);
	
}

//删除方法
function doDelete(webpath){
	parent.list.doDelete(webpath);

}

/**
 *显示动态参数帮助信息
 */
function showHelpMag(webpath){
	var url=webpath+"/views/om/organ/dataParamRole/dataFilterInfo/helpPage.jsp";
    var style="status:no;dialogWidth:650px;dialogHeight:450px";
    window.showModalDialog(url,window,style);
}




