BusCard.define('/buscardapp/rela/js/card_108_dealerCheck.js',function(_buscard,cardParam){ 
   var Me = this;
	var a = arguments[0];
	var b = arguments[1];
	Me.productId = b.productId;
	Me.cityCode = b.serviceRelation.cityCode;
	Me.serviceOfferId = b.serviceOfferId;
	var executeRequest = _buscard.executeRequest;
    var messageBox = dojo.require("orderaccept.common.dialog.MessageBox");
   	//��ȡ��Ʒ����
	var productInfo=BusCard.$remote('productToServiceDAO').queryById({productId:Me.productId});
	//�����Ƿ����һ��
	Me.numberDealerCheck=function(){
		var queryInfoObj = {
			"IF_VIRTUAL":"0",
			"BELONGS_TO" : "0"
		};
		var queryJsonInfo = BusCard.util.toJson(queryInfoObj);
		var parameter = "mktResId="+Me.$("serviceId").value;
		parameter += "&serviceOfferId="+Me.serviceOfferId;	
		parameter += "&mktResType=1";
		parameter += "&queryJsonInfo="+queryJsonInfo;
		parameter += "&productId="+Me.productId;
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction","getQueryResourceInfo",parameter);
		var jsonResultObj =  (typeof resultJsonStr=='string')?eval("("+resultJsonStr+")"):resultJsonStr;
		if(jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1"){
		    ifVirtual=jsonResultObj.allId.IF_VIRTUAL;
			//��������� ����
			if(jsonResultObj.allId.IF_VIRTUAL!="1"){
			    numberDealer=jsonResultObj.allId.BELONGS_TO;
				var param = "serviceOfferId="+Me.serviceOfferId+"&resDealer="+jsonResultObj.allId.BELONGS_TO;
				var result = executeRequest("goodsSaleAcceptAction","doSourceDealerCheck",param);
				if(!!result){
					//alert(result);
					 messageBox.alert({
		                busiCode : "08410213",
		                infoList : [result]
	                 });
	                 Me.$("serviceId").value=""
					return false;
				}
			}
		}

	};
   BusCard.addEventListener(Me.$("serviceId"), 'blur', function() {
		   if(Me.$("serviceId")&&Me.$("serviceId").value!=""){
				//�����Ʒ������8����70 ���к��������Ա�����ļ��
				if(productInfo.netType==8||productInfo.netType==70){
					Me.numberDealerCheck();
				}
			}
		});
});