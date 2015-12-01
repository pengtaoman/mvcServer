BusCard.define('/buscardapp/rela/js/card_109_dealerCheck.js',function(_buscard,cardParam){ 
    var Me = this;
	var a = arguments[0];
	var b = arguments[1];
	Me.productId = b.productId;
	Me.cityCode =  b.serviceRelation.cityCode;
	Me.serviceOfferId = b.serviceOfferId;
	var executeRequest = _buscard.executeRequest;
	var messageBox = dojo.require("orderaccept.common.dialog.MessageBox");
	//���ڱ��濨�Ź���
	var uimDealer="";
	//���ڱ���������
	var numberDealer=a.$session.departmentId;
	var  ifVirtual="";
	var uimKind="";
	//��ȡ��Ʒ����
	var productInfo=BusCard.$remote('productToServiceDAO').queryById({productId:Me.productId});
	//���ڿ��Ͳ���Ա�Ƿ����һ�µļ��
	Me.uimDealerCheck=function(oldCardNum){
		//��Ҫ����Դ���ȡ�Ĳ���	
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
	//getdataǰ�ص�
	this.addPreDataBuilderAspect(function(_buscard,param){
		if(b.cityCode==b.serviceRelation.cityCode){ //�����
			Me.uimDealerCheck(Me.$("oldCardNum").innerHTML);
		}
	});
	
});