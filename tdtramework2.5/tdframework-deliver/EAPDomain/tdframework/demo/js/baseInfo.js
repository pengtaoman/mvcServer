function init(){
	//alert("onchange_Test_tab1");
    //var obj = document.all("certificateType");
    DateUtil.addDateArea("workDate","chooseDate",true);
    //alertCertificate2(obj);
    eapObjsMgr.onReady();
}

function alertCertificate2(obj){
    var paramters = "certificateType="+obj.value;
    var result = executeRequest("demoPartRefresh","demo2",paramters);
    document.all("alterCertificate").innerHTML = result;
}

function alertCertificate(obj){
    alertCertificate2(obj);
    eapObjsMgr.getEAPObj(document.all("certificateNumber")).onReady();
}

function foucsto(){
    if(window.event.keyCode == '13'){
      	nextPage('tab','term');
    }
}

function reCheckDate(){
	if(!checkValue()){
		alert("非空检测");
		return false;
	}
	// 参数1 日期域的id或name 
	// 参数2 日期域的名字 
	// 可选参数3	日期的格式： "date"(只有日期)    "datetime"(有时间)
	var isVDate = DateUtil.parseDate("workDate","请输入正确的日期格式","datetime");
	if (!isVDate){	// 如果不成功 则不提交表单
		return;
	}
}

window.DateCallBack=function(dateValue,inputField,openWindow){
	alert("dateValue is " + dateValue);
	alert("inputField is " + inputField.name);
	alert("openWindow is " + openWindow.document);
}