/**
 *��������Դ���ʶ�������˿������������˿���
 *�ֲ�ˢ�»�ȡ��������Ϣ
 */
function showPassiveSelect(tableId,mainParamNames,passiveParamName){
	var valueInfo;
	var paramters = 'tableId='+tableId+'&mainParamNames='+mainParamNames+'&passiveParamName='+passiveParamName;
	if(mainParamNames!=null && mainParamNames!='' && mainParamNames!='null'){
		valueInfo = mainParamNames.split("~");
	}
	
	for(var i=0;i<valueInfo.length;i++){
		var paramValue = document.getElementById(valueInfo[i]).value;
		if(paramValue == ''){
			return;
		}
		
		paramters = paramters+'&'+valueInfo[i]+'='+paramValue;
	}
	//alert(paramters);
	var result = executeRequest("filterRelManage","getPassiveSelect",paramters);
	
	//var result_info = result.split("~!^#");
	//var selectValue = result_info[0];
	//var hiddenValue = result_info[1];
	//alert(selectValue+","+hiddenValue);
	
	//document.getElementById(passiveParamName+'_sql').value = hiddenValue;
	var obj = document.getElementById(passiveParamName);
	obj.outerHTML = obj.outerHTML.substring(0,obj.outerHTML.indexOf(">")+1) + result +"</select>";
	
	TitleBar.addTitleBarByTag('select');	
}