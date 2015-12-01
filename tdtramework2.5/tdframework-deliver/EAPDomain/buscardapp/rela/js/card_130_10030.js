BusCard.define('/buscardapp/rela/js/card_130_10030.js',function(_buscard,cardParam){ 
	var Me = this;
	var a = arguments[0];
	var b = arguments[1];
	var webPath = a.path.contextPath;
	var cardInstance = this;
	var collData = BusCard.util.doGet(webPath + "/secondAcceptAjaxAction.do?method=initPage&", cardInstance.getCardRelationInfo());
//	var resultJsonStr = BusCard.util.doGet(webPath + "/secondAcceptAjaxAction.do?method=getTreatyCancelInfo&", cardInstance.getCardRelationInfo());
//	var resultJson = BusCard.parse(resultJsonStr);
//	if (resultJson == false) {
//		$("saveBtn").disabled = true;
//		return;
//	}
//	var data = BusCard.util.parse(resultJson);
	if (collData) {
		var bankData = collData.bankTypeList;
		var bankCardKindData = collData.bankCardKindList;
		var bankChargeData = collData.bankChargeList;
		BusCard.util.$rs(cardInstance.$("bankId"), bankData);
		BusCard.util.$rs(cardInstance.$("cardKind"), bankCardKindData);
		BusCard.util.$rs(cardInstance.$("bankCharge"), bankChargeData);
	}
//	if (data) {
//		cardInstance.$("bankId").value = data.bankId;
//		cardInstance.$("cardKind").value = data.cardKind;
//		cardInstance.$("bankCharge").value = data.bankCharge;
//		cardInstance.$("cardNo").value = data.cardNo;
//		cardInstance.$("beginDate").value = data.beginDate;
//	}
});
