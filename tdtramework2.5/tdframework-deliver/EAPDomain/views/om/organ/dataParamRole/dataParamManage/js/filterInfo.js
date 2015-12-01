
//初始化方法
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
	//调整自己所在的iframe框架大小
	adjustIframeSize();
	//调整其他的iframe框架大小
	parent.adujstIframeSize();
}
/*
 *显示等待条
 */
function showWaitingBar(){
	WaitingBar.setMsg("正在查询数据，请稍等");
	WaitingBar.showMe();  //显示等待条
	//WaitingBar.hideMe();
}
//获取该表配的过滤器
function getTable(tableId){
	if(tableId == ''){
		return;
	}	
	var flag = document.getElementById("flag").value;
	document.getElementById('bDelete').disabled = 'true';
	//当改变数据源表时，清空信息列表内容
	window.setTimeout("",1);
	parent.document.getElementById('resultPage').src = '';
	
	var webpath=document.getElementById('webpath').value;
	document.EAPForm.action=webpath+"/om/dataparammanage.do?method=getFilters&flag="+flag;
	document.EAPForm.target='_self';
	document.EAPForm.submit();	
}
//查询方法
function doSearch(webpath){
	var tableId=document.getElementById('tableId').value;
	if(tableId==''){
		alert("请选择过滤表名");
		return false;
	}
	
	parent.document.getElementById("iframeSpace2").style.height = "300px";
	
	document.EAPForm.action=webpath+"/om/dataparammanage.do?method=query";
	document.EAPForm.target='resultPage';
    document.EAPForm.submit();
}
//保存方法
function doSave(){
	//parent.list.doSave();	
	parent.document.resultPage.doSave();
}
/**
 *返回方法
 */
function goBack(){
	var flag = parent.document.getElementById('closeFlag').value;
	
	if(confirm('确定要进行返回操作吗？')){
		if(flag == 'close'){
			window.returnValue = "true";
			window.close();
		}else{
			window.close();
		}
	}
}
/**
 *调整iframe框架大小
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