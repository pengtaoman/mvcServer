BusCard.define('/buscardapp/rela/js/card_171_10240.js',function(_buscard,cardParam){ 
Me = this;
var cardInfo = arguments[1];
var serviceOfferId = cardInfo.serviceOfferId;
//for compatibility
var executeRequest = _buscard.executeRequest;

Me.setObjDisabled = function (name) {
	if(name && Me.$(name) && Me.$(name).type == "text"){
		Me.$(name).readOnly = true;
	}
	return;
};

Me.$("backCardPrice").onblur = function(){
	var backCardPrice = Me.$("backCardPrice").value||'0';
	var cardValue = Me.$("cardValue").value||'0';
	if(parseFloat(backCardPrice)>parseFloat(cardValue)){
		orderaccept.common.dialog.MessageBox.alert({busiCode:'08410197'});
		return;
	}
};

Me.$("backCardPrice").onkeypress = function(){
	return checkInputChar();
};

var checkInputChar = function(){
	if(!(event.keyCode>=48&&event.keyCode<=57)){
		return false;
	}
	return true;
};

Me.$("batchFlag").onchange = function(){
	var batchFlag = Me.$("batchFlag").value;
	if(batchFlag=='1'){
		$("batchDIV").style.display = "";
		$("resetBtn").style.display = "";
		$("numberSegmentTR").style.display = "block";
		$("saveBtn").style.display = "";
		$("print_Btn").style.display = "none";
		$("chargeBtn").style.display = "none";
		$("chargeBtn").style.display = "none";
	}else{
		$("batchDIV").style.display = "none";
		$("resetBtn").style.display = "none";
		$("numberSegmentTR").style.display = "none";
		$("saveBtn").style.display = "";
		$("print_Btn").style.display = "";
		$("chargeBtn").style.display = "";
		$("commitBtn").disabled = true;
	}
};

Me.initBatchFlag = function(){
	var options = $("batchFlag").options;
	var op1 = document.createElement("option");
	op1.value = 0;
	op1.text = "否";
	options.add(op1);
	
	var op2 = document.createElement("option");
	op2.value = 1;
	op2.text = "是";
	options.add(op2);
};

var cardInit = function(){
	/* set obj readOnly */
	Me.setObjDisabled("cardNo");
	Me.setObjDisabled("cardName");
	Me.setObjDisabled("cardValue");
	Me.setObjDisabled("realValue");
	Me.setObjDisabled("cardLargessValue");
	Me.setObjDisabled("validDate");
	Me.setObjDisabled("cardFaceId");
	Me.setObjDisabled("cardNetrange");
	Me.setObjDisabled("belongsTo");
	Me.setObjDisabled("cardRangetype");
	
	Me.initBatchFlag();
	/* card init */
};

cardInit();

});
