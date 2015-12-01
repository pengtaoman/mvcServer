BusCard.define('/buscardapp/protocol/js/card_pi_charge_comm.js',function(_buscard,cardParam){ 
var card = this;
try {
	var buscardContent = BusCard.find(card.dom.getElementsByTagName("DIV"), function(dom) {
				return /buscard-content/.test(dom.className);
			});
	if (buscardContent) {
		buscardContent.style.borderTop = "none";
	}
	this.enableAllSubGroupHeaders();
	this.hiddenTitle();
	card.hiddenSubGroupByIndex(1);
	card.hiddenSubGroupByIndex(2);
	card.hiddenSubGroupByIndex(3);
	card.hiddenSubGroupByIndex(4);
	BusCard.$rs(BusCard.$("back_fee_mode"), [{
						id : 1,
						name : '\u8fd4\u73b0\u91d1'
					}, {
						id : 2,
						name : '\u8f6c\u9884\u5b58'
					}]);
	card.on(BusCard.$("back_fee_mode"),'change', function() {
		         
				if (this.value == '1')
					card.display("dibs_pay");
				else
					card.hidden("dibs_pay");
			});
	// paymentMethodColl = serviceParamBO.getPaymentMethodColl();
	// mainIdentityKindColl = customerParamBO.getMainIdentityKind();
	// String cityCode = userVO.getCityCode();
	// chequeKindColl = serviceParamBO.getChequeKind();
	var bankTypeColl = BusCard.$remote("accountParamBO").getBankType(BusCard.$session.cityCode);
	BusCard.$rs(card.$('bankId'), bankTypeColl.list);
	BusCard.$rs(card.$('bankid'), bankTypeColl.list);
	var bankTypeColl = BusCard.$remote("accountParamBO").getBankType(BusCard.$session.cityCode);
	BusCard.$rs(card.$('posBankId'), bankTypeColl.list);
	var bankCardKindColl = BusCard.$remote("serviceParamBO").getBankCardKind();
	BusCard.$rs(card.$('cardKind'), bankCardKindColl.list);
	var chequeKindColl = BusCard.$remote("serviceParamBO").getChequeKind();
	BusCard.$rs(card.$('checkKind'), chequeKindColl.list);
	var mainIdentityKindColl = BusCard.$remote("customerParamBO").getMainIdentityKind();
	BusCard.$rs(card.$('certType'), mainIdentityKindColl.list);
	var refreshPosBank = function(){
		var bankId = BusCard.$('posBankId').value;
        var posCodeColl = BusCard.$remote("commDealerAPIBO").doGetPosCodes(BusCard.$session.acceptDealer,bankId);
        BusCard.$rs(card.$('posBank'), posCodeColl.list);
	};
	refreshPosBank.apply();
	card.$('posBankId').onchange=refreshPosBank;
}
catch (e) {
	//alert(e.message)
	orderaccept.common.dialog.MessageBox.alert({busiCode:"08420015",infoList:[e.message]});
}
});
