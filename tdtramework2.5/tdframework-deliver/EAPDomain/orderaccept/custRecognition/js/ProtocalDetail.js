var turnOrder = function(){
		var prodOfferId = dojo.byId("selectProdOfferId").value;
		parent.dojo.byId("belongCode").value = parent.dojo.byId("belongCodeSelect").value;
		parent.dojo.byId("protocolAcceptInfoVO").value = Jscu.util.CommUtil.toJson(querySelectProtocalVO(prodOfferId));
		var form = parent.document.getElementById("submitForm");
		var targetUrl = dojo.byId("webPath").value + "/prodOfferSaleAction.do?method=initProtocolProdOfferOrder";
		form.action = targetUrl;
		newWin = parent.window.open("about:blank", 'prodOfferSalePage',
		        'status=0,resizable=1,scrollbars=yes,top=10,left=10,width=' + (window.screen.width - 20)
		                + ',height=' + (window.screen.height - 100));
		form.target = "prodOfferSalePage";
		form.submit();
};


function querySelectProtocalVO(prodOfferId){
	var vo = BusCard.jsonPath(protocolAcceptInfoListObj,"$[?(@.protocolProdOfferInfoVO.prodOfferId==" + prodOfferId + ")]")[0];
	return vo;
}

function changeOffer(objSelf, obj){
	dojo.byId("selectProdOfferId").value = obj;
	if(objSelf && objSelf.childNodes[0]){
		objSelf.childNodes[0].checked = "checked";
	}
}