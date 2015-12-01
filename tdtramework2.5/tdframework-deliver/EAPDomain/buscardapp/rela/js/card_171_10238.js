BusCard.define('/buscardapp/rela/js/card_171_10238.js',function(_buscard,cardParam){ 
Me = this;
var cardInfo = arguments[1];
var serviceOfferId = cardInfo.serviceOfferId;
//for compatibility
var executeRequest = _buscard.executeRequest;

Me.$("favourType").onchange = function(){
	var favourType = Me.$("favourType").value;
	if(favourType=='0'){
		Me.$("favourCount").value = "";
		Me.setObjDisabled("favourCount");
	}else
		Me.setObjNotDisabled("favourCount");
};

Me.$("favourCount").onblur = function(){
	var favourType = Me.$("favourType").value;
	var favourCount = Me.$("favourCount").value;
	if(favourCount=='')
		return;
	if(favourCount && isNaN(favourCount)){
		orderaccept.common.dialog.MessageBox.alert({busiCode:'08410195'});
		Me.$("favourCount").value = "";
		Me.$("favourCount").focus();
		return false;
	}
	if(favourType=='2' && parseFloat(favourCount)>Me.$("cardValue").value){
		orderaccept.common.dialog.MessageBox.alert({busiCode:'08410194'});
		Me.$("favourCount").value = "";
		Me.$("favourCount").focus();
		return false;
	}
	
	if(favourType=='3' && parseFloat(favourCount)>100){
		orderaccept.common.dialog.MessageBox.alert({busiCode:'08410193'});
		Me.$("favourCount").value = "";
		Me.$("favourCount").focus();
		return false;
	}
	
};

Me.$("batchFlag").onchange = function(){
	var batchFlag = Me.$("batchFlag").value;
	if(batchFlag=='1'){
		$("batchDIV").style.display = "";
		$("print_Btn").style.display = "none";
		$("numberSegmentTR").style.display = "block";
		//$("fileUploadTR").style.display = "none";
		//$("fileUploadDescTR").style.display = "none";
		//$("startNum").value=$('cardIdQuery').value;
		$("batchExpBtnTD").style.display = "block";
		//$("startNum").readOnly=true;
		$("commitBtn").disabled = true;
		$("chargeBtn").disabled = true;
	}else{
		$("batchDIV").style.display = "none";
		$("print_Btn").style.display = "";
	}
};

Me.setObjDisabled = function (name) {
	if(name && Me.$(name) && Me.$(name).type == "text"){
		Me.$(name).readOnly = true;
	}
	return;
};

Me.setObjNotDisabled = function (name) {
	if(name && Me.$(name) && Me.$(name).type == "text"){
		Me.$(name).readOnly = false;
	}
	return;
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
	Me.setObjDisabled("cardName");
	Me.setObjDisabled("cardValue");
	//Me.setObjDisabled("realValue");
	Me.setObjDisabled("cardLargessValue");
	Me.setObjDisabled("validDate");
	Me.setObjDisabled("cardFaceId");
	Me.setObjDisabled("cardNetrange");
	Me.setObjDisabled("belongsTo");
	Me.setObjDisabled("cardRangetype");
	if(Me.$("favourType").value=='0')
		Me.setObjDisabled("favourCount");
		
	Me.initBatchFlag();
	/* card init */
};

cardInit();

});
