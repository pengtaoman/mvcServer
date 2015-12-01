var APP_PATH = document.getElementsByTagName("contextPath")[0].value;
var eccn=new ECCN("ec");
function init(){
	eccn.init();
}

/* 点击预受理按钮事件 */
function onPreAcceptBtn(preRgstNo) {
	var custHeadDocument = parent.parent.parent.document;
	var custHeadGetElement = parent.parent.parent.$ || parent.parent.parent.document.getElementById;
	// 一次受理检测
	var parameters = "customerId=" + custHeadGetElement("custIdHidden").value;
	parameters += "&cityCode=" + custHeadGetElement("queryCityCode").value;
	parameters += "&actionCD=301";
	var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "doCheckOrderValid",
	        parameters);
	var result = executeAjaxResult(resultJsonStr);
	if (result === false) { return false; }
	
	var parameter = "&preRgstNo=" + preRgstNo;
    var preAcceptOfferList = BusCard.$remote("preAcceptBO").getPreAcceptOfferInfoList({"preRgstNo":preRgstNo});
	if(!!preAcceptOfferList && preAcceptOfferList.length > 0){
	    parameter += "&operFlag=preAccept";
	}
	if (detectedOrderDetailFrame()) {
		var orderDetalFrame = detectedOrderDetailFrame();
		custHeadDocument.EAPForm.target = "orderDetailFrame";
		orderDetalFrame.contentWindow.parent.$switchPane$([false, true]);
		parameter += parameter + "&custXml=" + custHeadGetElement('custXml').value + "&operFlag=preAccept"
		        + "&tempSaveOrderXML=" + custHeadGetElement("tempSaveOrderXML").value
		        + "&custOrderId=" + custHeadGetElement("custOrderId").value + "&accountXml="
		        + custHeadGetElement("accountXml").value + "&accountId=" + custHeadGetElement("accountId").value;
		__executeRequest("prodOfferSaleAction", "initProdOfferOrderWithAjax", parameter
		                .substring(1), true, function(xhr) {
			        orderDetalFrame.contentWindow.initOrderAcceptPage(xhr.responseText);
		        });
		
	} else {
		parameter+="&custId="+custHeadGetElement("custIdHidden").value;
		var targetUrl=custHeadDocument.EAPForm.action = APP_PATH
		        + "/prodOfferSaleAction.do?method=initProdOfferOrder" + parameter;
		custHeadDocument.EAPForm.action=targetUrl;
		newWin = window.open("about:blank", 'prodOfferSalePage',
		        'status=0,resizable=1,scrollbars=yes,top=10,left=10,width='
		                + (window.screen.width - 20) + ',height='
		                + (window.screen.height - 100));
		custHeadDocument.EAPForm.target = "prodOfferSalePage";
		custHeadDocument.EAPForm.submit();
		
	}
}	
var detectedOrderDetailFrame = function() {
	var parent = window.parent;
	do {
		if (parent.document.getElementById("orderDetailFrame")) {
			return parent.document.getElementById("orderDetailFrame");
		} else {
			parent = parent.parent;
		}
		
	} while (parent&&parent!=parent.parent);
	
};
