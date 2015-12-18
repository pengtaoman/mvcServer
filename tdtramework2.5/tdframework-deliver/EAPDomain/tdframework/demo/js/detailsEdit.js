	
function dialogSubmit(){
    var result = getAlldata(eval(unieap.FORM_NAME));
    alert(result);
    executeRequest('demoExtremeTable','doModify',result);
    //window.dialogArguments.ajax.submit('ec',document.forms.ec);
}

function pos1(name){
	var params=collectIframsParams(name);
	if(!checkValue()){
		return false;
	}
	var dateValue=getCertainPageWindow('tab','demo_tab_1').document.all("workDate").value;
	//alert(dateValue);
    //可以添加第二个参数，组件输入自定义的日期格式，如"YYYY-MM-DD HH:mm";
    var isVDate=DateValid.datetime(dateValue);
	if (!isVDate){	// 如果不成功 则不提交表单
		alert("请选择或输入正确的日期");
		return;
	}
	executeRequest("demoExtremeTable","doModify",params);
	window.close();
}

function pos2(name){
	var params=collectIframsParams(name);
	    //var dateValue=document.all('tab').contentWindow.document.all('__tab_areatab0').contentWindow.document.all("workDate").value;
	    //alert(dateValue);
	    // 可以添加第二个参数，组件输入自定义的日期格式，如"YYYY-MM-DD HH:mm";
	    //var isVDate=DateValid.datetime(dateValue);
		//if (!isVDate){	// 如果不成功 则不提交表单
		//	alert("请选择或输入正确的日期");
		//	return;
		//}
	executeRequest("demoExtremeTable","doModify",params);
	parent.myFrame.rows="120,*,0";
}