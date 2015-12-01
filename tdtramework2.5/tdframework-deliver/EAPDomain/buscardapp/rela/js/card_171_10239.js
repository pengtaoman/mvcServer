BusCard.define('/buscardapp/rela/js/card_171_10239.js',function(_buscard,cardParam){ 
Me = this;
var cardInfo = arguments[1];
var serviceOfferId = cardInfo.serviceOfferId;
//for compatibility
var executeRequest = _buscard.executeRequest;

var switch701 = executeRequest("prodOfferSaleAjaxAction","ifClearDeviceNo","");
var productId = $("productId").value;

Me.$("cardNo").onblur = function(){
	var cardNo = Me.$("cardNo").value;
	if(cardNo == ""){
		return;
	}
	var cardRecordId = $("cardRecordIdSel").value;
	
	//serviceofferId
	var param = "&actionCD="+$("serviceActionCD").value;
	var jsonStr = executeRequest("prodOfferSaleAjaxAction","getServiceOfferId",param);
	var serviceOfferId = executeAjaxResult(jsonStr);
	if (serviceOfferId == false) {
		return false;
	}
	var param = "cardNo="+cardNo+"&serviceOfferId="+serviceOfferId+"&cardRecordId="+cardRecordId+"&checkSaleCard=1&productId="+productId;
	var checkJsonStr = executeRequest("goodsSaleAcceptAction","checkCardInfo",param);
	var checkResult = executeAjaxResult(checkJsonStr);
	if (checkResult == false) {
		if(switch701=='1')
			this.value = "";
		this.focus();
		return false;
	}
	
	//get card_mejor from resuore（CARD_MAJORbi_unique_feecard_portal_p use  socket interface
	
	//add lock
	
	
	
	var parameter = "cardIdQuery="+cardNo+"&cardRecordIdSel="+cardRecordId+"&serviceOfferId="+serviceOfferId+"&productId="+productId;
	var resultJsonStr = executeRequest("goodsSaleAcceptAction","getChangeCardInfo",parameter);
	try{
		var jsonResultObj =  (typeof resultJsonStr=='string')?eval("("+resultJsonStr+")"):resultJsonStr;
		
		if(jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1"){
			if((jsonResultObj.allId.CARD_VALUE/100) != $("preCardValue").value){
				orderaccept.common.dialog.MessageBox.alert({busiCode:'08410196'});
				if(switch701=='1')
					this.value = "";
				this.focus();
				return ;
			}
			
			$("cardName").value = jsonResultObj.allDesc.RESOURCE_KIND;
			$("cardValue").value = (jsonResultObj.allId.CARD_VALUE||'')/100;
			//$("realValue").value = (jsonResultObj.allId.CARD_VALUE||'')/100;
			$("cardRangetype").value = jsonResultObj.allDesc.CARD_SCOPE;
			$("cardFaceId").value = jsonResultObj.allDesc.DESIGN_ID;
			$("validDate").value = (jsonResultObj.allId.VALID_DATE||'')==''?'':jsonResultObj.allId.VALID_DATE.substring(0,10); 
			$("cardLargessValue").value = (jsonResultObj.allId.CARD_LARGESS_VALUE||'')/100;
			$("cardNetrange").value = jsonResultObj.allDesc.CARD_NETRANGE;
			$("belongsTo").value = jsonResultObj.allDesc.BELONGS_TO;
			$("belongsToID").value = jsonResultObj.allId.BELONGS_TO||'';
			
			
			$("mkt_Res_Inst_Id").value = jsonResultObj.allId.INST_ID||'';
			$("card_medium").value = jsonResultObj.allId.CARD_MEDIUM||'';  
			$("local_kind").value = jsonResultObj.allId.LOCAL_KIND||'';  
			$("card_major").value = jsonResultObj.allId.CARD_MAJOR||'';  
			
		}else{
			if(switch701=='1')
				this.value ="";
			this.focus();
			return false;
		}
		
		//changecard
		//get parameter from resouce	
		var queryInfoObj = {
			"BELONGS_TO" : "0"
		};
		var queryJsonInfo = BusCard.util.toJson(queryInfoObj);
		var parameter = "mktResId="+cardNo;
		parameter += "&serviceOfferId="+serviceOfferId;	
		parameter += "&mktResType=3";
		parameter += "&queryJsonInfo="+queryJsonInfo;
		parameter += "&productId=100229";
		parameter += "&otherObjectID="+cardRecordId;
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction","getQueryResourceInfo",parameter);
		var jsonResultObj =  (typeof resultJsonStr=='string')?eval("("+resultJsonStr+")"):resultJsonStr;
		if(jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1"){
			var parama = "serviceOfferId="+serviceOfferId+"&resDealer="+jsonResultObj.allId.BELONGS_TO+"&serviceKind=22&isCode=3";
			var result = executeRequest("goodsSaleAcceptAction","doSourceDealerCheck",parama);
			if(!!result){
				orderaccept.common.dialog.MessageBox.alert({busiCode:'08410213',infoList:[result]});
		//		 messageBox.alert({
		//            busiCode : "08410213",
		//            infoList : [result]
		//            });
				$("cardIdQuery").value = "";
				$("cardIdQuery").focus();
				return false;
			}
		}
		//add yanzheng
	}catch(e){
		if(switch701=='1')
			this.value ="";
		this.focus();
		return false;
	}
};

Me.$("batchFlag").onchange = function(){
	var batchFlag = Me.$("batchFlag").value;
	if(batchFlag=='1'){
		$("batchDIV").style.display = "";
		$("resetBtn").style.display = "";
		$("numberSegmentTR").style.display = "none";
		$("saveBtn").style.display = "";
		$("print_Btn").style.display = "none";
		$("chargeBtn").style.display = "none";
		$("commitBtn").style.display = "none";
//		$("commitBtn").disabled = true;
	}else{
		$("batchDIV").style.display = "none";
		$("resetBtn").style.display = "none";
		$("saveBtn").style.display = "";
		$("print_Btn").style.display = "";
		$("chargeBtn").style.display = "";
		$("commitBtn").style.display = "";
		$("commitBtn").disabled = true;
	}
};

Me.setObjDisabled = function (name) {
	if(name && Me.$(name) && Me.$(name).type == "text"){
		Me.$(name).readOnly = true;
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
