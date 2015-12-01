BusCard.define('/buscardapp/rela/js/card_141_14101.js',function(_buscard,cardParam){ 
var Me = this;
var a = arguments[0];
var b = arguments[1];
var c = b.serviceRelation.userId;
var webPath = a.path.contextPath;
var esn;
var executeRequest = _buscard.executeRequest;

//Check irIntegerface 

$("newEsnNumber").onblur = function (){
	var newEsnNumber=Me.$("newEsnNumber").value;
	if(newEsnNumber!=""){
		doCheckEsn(newEsnNumber);
	}
	
}
doQueryEsn();

//Query old ESN

function doQueryEsn(){
	Me.hidden("oldEsnResInstId");
	var parameter = "userId=" + c;
	var result = BusCard.util.doGet(webPath + "/secondAcceptAjaxAction.do",{method:"getOldEsn",userId:c});
	Me.$("oldEsnNumber").value = result.UIMID;
	Me.$("dataImis").value = result.IMSI;
	Me.$("oldEsnResInstId").value=result.INST_ID;
	Me.$("oldEsnNumber").readOnly = true;
	Me.$("dataImis").readOnly = true;
	esn = result.UIMID;
}

//Check ESN

function doCheckEsn(newEsnNumber){
	var parameter = "newEsnNumber=" + newEsnNumber+"&cityCode="+b.serviceRelation.cityCode;
	var resultJsonStr = executeRequest("secondAcceptAjaxAction", "esnCheckForExists", parameter);
	var jsonResultObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
	if(jsonResultObj.FLAG==1){
		alert("esn\u53f7\u7801\u5df2\u5b58\u5728");
		Me.$("newEsnNumber").value="";
		return;
	}	
	Me.$("newEsnNumber").value=newEsnNumber;
}
});