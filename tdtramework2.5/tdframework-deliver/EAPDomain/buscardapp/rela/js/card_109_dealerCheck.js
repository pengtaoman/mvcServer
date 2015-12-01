BusCard.define('/buscardapp/rela/js/card_109_dealerCheck.js',function(_buscard,cardParam){ 
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
	Me.uimDealerCheck=function(oldCardNum){
		//需要从资源组获取的参数	
		var queryInfoObj = {
			"UIM_KIND":"0",
			"BELONGS_TO" : "0"
		};
		var queryJsonInfo = BusCard.util.toJson(queryInfoObj);
		var parameter = "mktResId="+oldCardNum;
		parameter += "&serviceOfferId="+Me.serviceOfferId;	
		parameter += "&mktResType=2";
		parameter += "&queryJsonInfo="+queryJsonInfo;
		parameter += "&productId="+Me.productId;
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction","getQueryResourceInfo",parameter);
		var jsonResultObj =  (typeof resultJsonStr=='string')?eval("("+resultJsonStr+")"):resultJsonStr;
		
		if(jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1"){
			uimDealer=jsonResultObj.allId.BELONGS_TO;						
			var p="phoneDealer="+numberDealer+"&serviceOfferId="+Me.serviceOfferId+
			"&cardDealer="+jsonResultObj.allId.BELONGS_TO+"&serviceKind="+productInfo.netType+"&isCode=3";
			var result = executeRequest("goodsSaleAcceptAction","doCheckResSame",p);
			if(!!result){
				 messageBox.alert({
	                busiCode : "08410213",
	                infoList : [result]
                 });
				return false;
			}
		}
	
	}
	//getdata前回调
	this.addPreDataBuilderAspect(function(_buscard,param){
		if(b.cityCode==b.serviceRelation.cityCode){ //非异地
			Me.uimDealerCheck(Me.$("oldCardNum").innerHTML);
		}
	});
	
});