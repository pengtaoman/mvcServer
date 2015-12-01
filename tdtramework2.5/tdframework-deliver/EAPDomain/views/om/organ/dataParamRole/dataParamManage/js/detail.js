function init(){
	//初始化 字段作用和 关联过滤器 下拉列表值
	document.getElementById('columnType').value=document.getElementById('columnTypeHid').value;
	var filterTemp=document.getElementById('filterIdHid').value;
	if(filterTemp=="noFilter"){
		document.getElementById('filterEff').value="";
	}else{
		document.getElementById('filterEff').value=filterTemp;
	}
}
//修改方法
function modify(webpath){
	
	document.EAPForm.action=webpath+"/om/datasourceinfo.do?method=modify";
	document.EAPForm.target='list';
	document.EAPForm.submit();
}

