BusCard.define('/buscardapp/rela/js/installTimeSegment.js', function(_buscard, cardParam) {
	var Me = this;
	var util = dojo.require("orderaccept.prodofferaccept.util");
	var ConstantsPool = dojo.require("orderaccept.common.js.ConstantsPool");
	var ServiceOfferIdConst = ConstantsPool.load("ServiceOfferIDConst").ServiceOfferIDConst;
	var ProductIdConst = ConstantsPool.load("ProductIdConst").ProductIdConst;
	var messageBox = dojo.require("orderaccept.common.dialog.MessageBox");
	dojo.connect(Me.$("timeName"),"onblur",function(){
		if(!Me.$("timeName").value ){
			return false;
		}
		var reg = /^(\d{2}):(\d{2})-(\d{2}):(\d{2})$/;
		var regResult = Me.$("timeName").value.match(reg);
		if(!regResult || regResult[1]>24 || regResult[3]>24 || regResult[2]>60 || regResult[4]>60){
			MessageBox.alert({
				title:"\u63d0\u793a\u4fe1\u606f",
				message:"\u3010\u9884\u7ea6\u88c5\u673a\u65f6\u95f4\u6bb5\u3011\u683c\u5f0f\u5e94\u4e3a\"HH:ss-HH:ss\""
			});
			Me.$("timeName").value = "";
			return false;
		}
		if(regResult[1]>regResult[3] || (regResult[1]==regResult[3] && regResult[2]>=regResult[4])){			
			MessageBox.alert({
				title:"\u63d0\u793a\u4fe1\u606f",
				message:"\u3010\u9884\u7ea6\u88c5\u673a\u65f6\u95f4\u6bb5\u3011\u4e2d\u7ed3\u675f\u65f6\u95f4\u5e94\u5927\u4e8e\u5f00\u59cb\u65f6\u95f4"
			});
			Me.$("timeName").value = "";
			return false;
		}
	});
	if(dojo.getObject("prodOfferAcceptLoader")){
		var batchFlagElem = dojo.getObject("prodOfferAcceptLoader").orderInfoCardWidget.busCardInstance.$("batchFlag");
		var batchFlagOnChange = function(){
			if(batchFlagElem.value==1){//批量业务，预约装机之间非必填
				if(!!Me.$("bookDate").getAttribute("isnull")){
					Me.$("bookDate").setAttribute("isnull","1");
					var label_bookDate = dojo.query(".formRequested",Me.$("label_bookDate"))[0];
					if(label_bookDate){
						dojo.style(label_bookDate,"display","none");
					}
				}
			}else if(batchFlagElem.value==0){//非批量业务，预约装机时间必填
				var productId = (!!cardParam && cardParam.productId)?cardParam.productId:"";
				var serviceOfferId = (!!cardParam && cardParam.productId)?cardParam.serviceOfferId:"";
				if(serviceOfferId == ServiceOfferIdConst.PROD_NEW 
						&& (productId == "100000" || productId == "230032" || productId == "100025")){
					if(!!Me.$("bookDate").getAttribute("isnull")){
						Me.$("bookDate").setAttribute("isnull","0");
						var label_bookDate = dojo.query(".formRequested",Me.$("label_bookDate"))[0];
						if(!label_bookDate){						
							dojo.place("<span class=\"formRequested\">*</span>",dojo.query(".buscard-label",Me.$("label_bookDate"))[0],"first");
							label_bookDate = dojo.query(".formRequested",Me.$("label_bookDate"))[0];
						}
						dojo.style(label_bookDate,"display","");
					}
				}
			}
		};
		if(batchFlagElem){
			dojo.connect(batchFlagElem,"onchange",batchFlagOnChange);
			batchFlagOnChange();
		}
	}
});	
