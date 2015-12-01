
//初始化方法
function init(){
	
	document.getElementById('bcheck').disabled=true;
 	document.getElementById('bback').disabled=true;
}

//查询方法
function doSearch(webpath){
		
	document.EAPForm.action=webpath+"/om/checkperson.do?method=query";
	document.EAPForm.target='list';
    document.EAPForm.submit();
}
//审核方法
function docheck(webpath){
	
	document.EAPForm.action=webpath+"/om/checkperson.do?method=check";
	document.EAPForm.target='list';
    document.EAPForm.submit();
}
//审核回退方法
function doBack(webpath){
	document.EAPForm.action=webpath+"/om/checkperson.do?method=undoCheck";
	document.EAPForm.target='list';
    document.EAPForm.submit();
}