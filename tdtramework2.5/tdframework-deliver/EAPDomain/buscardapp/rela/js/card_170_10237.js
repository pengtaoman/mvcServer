BusCard.define('/buscardapp/rela/js/card_170_10237.js',function(_buscard,cardParam){ 
Me = this;
var cardInfo = arguments[1];
var serviceOfferId = cardInfo.serviceOfferId;
//for compatibility
var executeRequest = _buscard.executeRequest;


Me.$("backPrice").onblur = function(){
	var realFee = Me.$("realFee").value;
	var backPrice = Me.$("backPrice").value;
	if(backPrice=='')
		return;
	
	if((backPrice-realFee)>0){
		orderaccept.common.dialog.MessageBox.alert({busiCode:'08410199'});
		Me.$("backPrice").value = "";
		Me.$("backPrice").focus();
	}
};

Me.$("backPrice").onkeypress = function(){
	return checkInputChar();
};

var checkInputChar = function(){
	if(!(event.keyCode>=48&&event.keyCode<=57)){
		return false;
	}
	return true;
}

Me.setObjDisabled = function (name) {
	if(name && Me.$(name) && (Me.$(name).type == "text"||Me.$(name).type == "select-one")){
		Me.$(name).disabled = true;
	}
	return;
};


var cardInit = function(){
	/* set obj readOnly */
	Me.setObjDisabled("moblieSourse");
	Me.setObjDisabled("newoldStatus");
	Me.setObjDisabled("resourceKind");
	Me.setObjDisabled("shouldFee");
	Me.setObjDisabled("realFee");
	Me.setObjDisabled("mobileAgent");
	Me.setObjDisabled("deviceNo");
	Me.setObjDisabled("saleKind");
	
	/* card init */
};

cardInit();
});
