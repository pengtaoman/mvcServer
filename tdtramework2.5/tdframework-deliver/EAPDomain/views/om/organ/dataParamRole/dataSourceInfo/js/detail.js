function init(ifUsed){
	//初始化 字段作用和 关联过滤器 下拉列表值
	document.getElementById('columnType').value=document.getElementById('columnTypeHid').value;
	var filterTemp=document.getElementById('filterIdHid').value;
	if(filterTemp=="noFilter"){
		document.getElementById('filterEff').value="";
	}else{
		document.getElementById('filterEff').value=filterTemp;
	}
	//如果数据源表已经被使用，则表所配置重要的属性不允许再修改
	if(ifUsed == 'true'){
		document.getElementById('columnOrder').disabled = 'disabled';
		document.getElementById('columnType').disabled = 'disabled';
		document.getElementById('filterEff').disabled = 'disabled';
	}
}
//修改方法
function modify(webpath){
	
	document.EAPForm.action=webpath+"/om/datasourceinfo.do?method=modify";
	document.EAPForm.target='list';
	document.EAPForm.submit();
	window.close();
}
// 校验页面字段顺序只能输入数字
function checkNum(keyVal){
	if(keyVal<48||keyVal>57){
		alert('此处只可以输入数字');
		return false;
	}
}
