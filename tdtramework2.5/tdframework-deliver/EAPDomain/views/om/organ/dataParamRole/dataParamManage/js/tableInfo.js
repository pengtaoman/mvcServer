/**
 * 页面初始化
 */
var eccn=new ECCN("ec");

function init(message,dataInfo,flag,showNewDataFlag){
    //eccn.doPrep=false;//不使用预查询 
	//不使用ajax翻页
	//eccn.ajaxSubmit=false;
	eccn.init();
	if(message!=''){
		alert(message);
	}	
	var allElements = document.body.getElementsByTagName("INPUT");
	if(showNewDataFlag == '1'){//新增数据可见，先将所有数据选中，再将不可见数据去掉
		for (var i = 0; i < allElements.length; i ++) {
			var e = allElements[i];
			if (e.type == 'checkbox') {
				e.checked=true;
				if(flag=='setCheckbox'){
					e.disabled = "true";
				}
				var info = dataInfo.split("~");
				for(var j=0; j<info.length; j++){
					if(e.value == info[j]){
						e.checked = false;
						break;
					}
				}
			}
		}
	}else if(showNewDataFlag == '0'){//新增数据不可见	，先将所有数据取消选中，再将可见数据选中
		for (var i = 0; i < allElements.length; i ++) {
			var e = allElements[i];
			if (e.type == 'checkbox') {
				e.checked=false;
				if(flag=='setCheckbox'){
					e.disabled = "true";
				}
				var info = dataInfo.split("~");
				for(var j=0; j<info.length; j++){
					if(e.value == info[j]){
						e.checked = true;
						break;
					}
				}
			}
		}

	}

	var parentObj = parent.document.queryPage.document;
	parentObj.getElementById("bDelete").disabled = '';
}


