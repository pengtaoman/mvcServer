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
		alert("�ǿռ��");
		return false;
	}
	// ����1 �������id��name 
	// ����2 ����������� 
	// ��ѡ����3	���ڵĸ�ʽ�� "date"(ֻ������)    "datetime"(��ʱ��)
	var isVDate = DateUtil.parseDate("workDate","��������ȷ�����ڸ�ʽ","datetime");
	if (!isVDate){	// ������ɹ� ���ύ��
		return;
	}
}

window.DateCallBack=function(dateValue,inputField,openWindow){
	alert("dateValue is " + dateValue);
	alert("inputField is " + inputField.name);
	alert("openWindow is " + openWindow.document);
}