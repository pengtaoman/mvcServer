BusCard.define('/buscardapp/rela/js/card_107_dealerCheck.js',function(_buscard,cardParam){ 
    var Me = this;
	var a = arguments[0];
	var b = arguments[1];
	Me.productId = b.productId;
	Me.cityCode =  b.serviceRelation.cityCode;
	Me.serviceOfferId = b.serviceOfferId;
	var executeRequest = _buscard.executeRequest;
	var messageBox = dojo.require("orderaccept.common.dialog.MessageBox");
	//用于保存卡号归属
	var uimDealer="";
	//用于保存号码归属
	var numberDealer=a.$session.departmentId;
	var  ifVirtual="";
	var uimKind="";
	//获取产品大类
	var productInfo=BusCard.$remote('productToServiceDAO').queryById({productId:Me.productId});
	//对于卡和操作员是否归属一致的检测
	Me.uimDealerCheck=function(newCardNum,newUimResInstId){
		//需要从资源组获取的参数	
		var queryInfoObj = {
			"UIM_KIND":"0",
			"BELONGS_TO" : "0"
		};
		var queryJsonInfo = BusCard.util.toJson(queryInfoObj);
		var parameter = "mktResId="+newCardNum;
		parameter += "&serviceOfferId="+Me.serviceOfferId;	
		parameter += "&mktResType=2";
		parameter += "&queryJsonInfo="+queryJsonInfo;
		parameter += "&productId="+Me.productId;
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction","getQueryResourceInfo",parameter);
		var jsonResultObj =  (typeof resultJsonStr=='string')?eval("("+resultJsonStr+")"):resultJsonStr;
		
		if(jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1"){
			uimDealer=jsonResultObj.allId.BELONGS_TO;			
			uimKind=jsonResultObj.allId.UIM_KIND;
			//判断uimkind 是不是30或者31 如果符合条件就进行卡号和操作员是否归属一致的检测
			if(jsonResultObj.allId.UIM_KIND!=30&&jsonResultObj.allId.UIM_KIND!=31){
				var param = "serviceOfferId="+Me.serviceOfferId+"&resDealer="+jsonResultObj.allId.BELONGS_TO;
				var result = executeRequest("goodsSaleAcceptAction","doSourceDealerCheck",param);
				//alert(result);
				if(!!result){
					//alert(result);
					 messageBox.alert({
		                busiCode : "08410213",
		                infoList : [result]
	                 });
	                Me.$("newCardNum").value="";
	                Me.$("imsi").innerHTML = "";
					Me.$("newCardType").innerHTML ="" ;
					Me.$("newCardCapacity").innerHTML = "";
	                Me.hidden("imsi");
	                Me.hidden("newCardType");
	                Me.hidden("newCardCapacity");
					return false;
				}
				
				var p1 = "mktResId="+b.serviceRelation.serviceId;
				p1 += "&serviceOfferId="+Me.serviceOfferId;	
				p1 += "&mktResType=2";
				p1 += "&queryJsonInfo="+queryJsonInfo;
				p1 += "&productId="+Me.productId;
				var resultStr = executeRequest("prodOfferSaleAjaxAction","getQueryResourceInfo",parameter);
				var jsonObj =  (typeof resultStr=='string')?eval("("+resultStr+")"):resultStr;
				if(jsonObj&& jsonResultObj.flag && jsonResultObj.flag == "1"){
					numberDealer=jsonObj.allId.BELONGS_TO;
				}			
				//二次业务去掉资源检测接口CommDealerAPIBO.doCheckResSame()
				/**var p="phoneDealer="+numberDealer+"&serviceOfferId="+Me.serviceOfferId+"&cardDealer="+jsonResultObj.allId.BELONGS_TO+"&serviceKind="+productInfo.netType+"&isCode=3";
				var result = executeRequest("goodsSaleAcceptAction","doCheckResSame",p);
				if(!!result){
					 messageBox.alert({
		                busiCode : "08410213",
		                infoList : [result]
	                 });
	                Me.$("newCardNum").value="";
	                Me.$("imsi").innerHTML = "";
					Me.$("newCardType").innerHTML ="" ;
					Me.$("newCardCapacity").innerHTML = "";
	                Me.hidden("imsi");
	                Me.hidden("newCardType");
	                Me.hidden("newCardCapacity");
					return false;
				}*/
				
				
				var resultStr = executeRequest("prodOfferSaleAjaxAction","getQueryResourceInfo",parameter);
				var jsonObj =  (typeof resultStr=='string')?eval("("+resultStr+")"):resultStr;
				if(jsonObj&& jsonResultObj.flag && jsonResultObj.flag == "1"){
					numberDealer=jsonObj.allId.BELONGS_TO;
				}
			  //辽宁不需要做预存费检测
			  /*var p2="cityCode="+Me.cityCode+"&newResInstId="+newUimResInstId+"&newResId="+newCardNum;
				var result = executeRequest("goodsSaleAcceptAction","doCheckResFee",p2);
				if(!!result){
					 messageBox.alert({
		                busiCode : "08410213",
		                infoList : [result]
	                 });
	                Me.$("newCardNum").value="";
	                Me.$("imsi").innerHTML = "";
					Me.$("newCardType").innerHTML ="" ;
					Me.$("newCardCapacity").innerHTML = "";
	                Me.hidden("imsi");
	                Me.hidden("newCardType");
	                Me.hidden("newCardCapacity");
					return false;
				}*/
			}
		}
	
	}
   //uim失去焦点时候触发的事件
    BusCard.addEventListener(Me.$("newCardNum"), 'blur', function() {
    	if(b.cityCode==b.serviceRelation.cityCode){ //非异地
    		if(Me.$("newCardNum")&&Me.$("newCardNum").value!=""){
				//如果产品大类是8或者70 进行卡号与操作员归属的检测
				if(productInfo.netType==8||productInfo.netType==70){
					Me.uimDealerCheck(Me.$("newCardNum").value,Me.$("newUimResInstId").value);
				}
			}
    	}
		});
		
	 BusCard.addEventListener(Me.$("newVoiceCard"), 'blur', function() {
	 	if(b.cityCode==b.serviceRelation.cityCode){//非异地
		   if(Me.$("newVoiceCard")&&Me.$("newVoiceCard").value!=""){
				//如果产品大类是8或者70 进行卡号与操作员归属的检测
				if(productInfo.netType==8||productInfo.netType==70){
					Me.uimDealerCheck(Me.$("newVoiceCard").value,Me.$("oldVoiceCardId").value);
				}
			}	 	
	 	}
		});	
	BusCard.addEventListener(Me.$("newDataCard"), 'blur', function() {
		if(b.cityCode==b.serviceRelation.cityCode){//非异地
		   if(Me.$("newDataCard")&&Me.$("newDataCard").value!=""){
				//如果产品大类是8或者70 进行卡号与操作员归属的检测
				if(productInfo.netType==8||productInfo.netType==70){
					Me.uimDealerCheck(Me.$("newDataCard").value,Me.$("newDataCardId").value);
				}
			}		
		}
		});
});