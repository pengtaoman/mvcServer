var eccn = new ECCN("ec");
var APP_PATH = document.getElementsByTagName("contextPath")[0].value;

function init() {
	eccn.init();
	parent.frames["Head"].document.getElementById("serviceId").readOnly= true;
}

function doCustInfoQuery(custId) {
	var paramValue="&custId="+custId;
	paramValue += "&serviceId="+parent.frames["Head"].document.getElementById("serviceId").value;
	//paramValue += "&strServingStatus="+$('strServingStatus').value;
	//paramValue += "&strQueryMethod="+$('strQueryMethod').value;	
	//paramValue += "&productId="+parent.frames["Head"].document.getElementById("productId").value;
	
	document.forms[0].action=APP_PATH+"/OfferStandardAcceptAction.do?method=doStandardInfoQuery"+paramValue;
	document.forms[0].target="Content";
  	document.forms[0].submit();
}

