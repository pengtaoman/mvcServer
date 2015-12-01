BusCard.define('/buscardapp/rela/js/card_107_dealerCheck.js',function(_buscard,cardParam){ 
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
	Me.uimDealerCheck=function(newCardNum,newUimResInstId){
		//��Ҫ����Դ���ȡ�Ĳ���	
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
			//�ж�uimkind �ǲ���30����31 ������������ͽ��п��źͲ���Ա�Ƿ����һ�µļ��
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
				//����ҵ��ȥ����Դ���ӿ�CommDealerAPIBO.doCheckResSame()
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
			  //��������Ҫ��Ԥ��Ѽ��
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
   //uimʧȥ����ʱ�򴥷����¼�
    BusCard.addEventListener(Me.$("newCardNum"), 'blur', function() {
    	if(b.cityCode==b.serviceRelation.cityCode){ //�����
    		if(Me.$("newCardNum")&&Me.$("newCardNum").value!=""){
				//�����Ʒ������8����70 ���п��������Ա�����ļ��
				if(productInfo.netType==8||productInfo.netType==70){
					Me.uimDealerCheck(Me.$("newCardNum").value,Me.$("newUimResInstId").value);
				}
			}
    	}
		});
		
	 BusCard.addEventListener(Me.$("newVoiceCard"), 'blur', function() {
	 	if(b.cityCode==b.serviceRelation.cityCode){//�����
		   if(Me.$("newVoiceCard")&&Me.$("newVoiceCard").value!=""){
				//�����Ʒ������8����70 ���п��������Ա�����ļ��
				if(productInfo.netType==8||productInfo.netType==70){
					Me.uimDealerCheck(Me.$("newVoiceCard").value,Me.$("oldVoiceCardId").value);
				}
			}	 	
	 	}
		});	
	BusCard.addEventListener(Me.$("newDataCard"), 'blur', function() {
		if(b.cityCode==b.serviceRelation.cityCode){//�����
		   if(Me.$("newDataCard")&&Me.$("newDataCard").value!=""){
				//�����Ʒ������8����70 ���п��������Ա�����ļ��
				if(productInfo.netType==8||productInfo.netType==70){
					Me.uimDealerCheck(Me.$("newDataCard").value,Me.$("newDataCardId").value);
				}
			}		
		}
		});
});