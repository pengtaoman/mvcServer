BusCard.define('/buscardapp/rela/js/agentNumberCardCheck.js',function(_buscard,cardParam){
	var Me = this;
	var a = arguments[0];
	var b = arguments[1];
	Me.productId = b.productId;
	Me.cityCode = b.cityCode;
	Me.serviceOfferId = b.serviceOfferId;
	Me.uniqueId = b.uniqueId;
	var executeRequest = _buscard.executeRequest;
	var messageBox = dojo.require("orderaccept.common.dialog.MessageBox");
	//���ڱ��濨�Ź���
	var uimDealer="";
	//���ڱ���������
	var numberDealer="";
	var  ifVirtual="";
	var uimKind="";
	//��ȡ��Ʒ����
	var productInfo=BusCard.$remote('productToServiceDAO').queryById({productId:Me.productId});
	  //����ǲ���Ԥ�俨 ��Ԥ�俨����Ҫ���п���һ���Լ��
	Me.checkIfCoop=function(value,coopFlag){
		var parameter = "objectId=" + value + "&serviceOfferId=" + Me.serviceOfferId + "&productId=" + Me.productId + "&cityCode=" + Me.cityCode + "&getCoopFlag="+coopFlag;
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getCoopNumInfo", parameter);
		var resultJson = dojo.fromJson(resultJsonStr);
		if (!resultJson || resultJson.flag <= 0) {
			return false;
		}
		if(resultJson.NUMBER != "-1"){
			return true;
		}
		return false;
	}
	   
	//���ڿ��Ͳ���Ա�Ƿ����һ�µļ��
	Me.uimDealerCheck=function(){
		if(Me.$("uimId").value!=""&&Me.$("uimId").value!="9999"){
			  //������������ǲ�����ͨ������д�������Դ���
		    var isCode="";
		//��ȡ������ʽ
			var acceptWay=prodOfferAcceptLoader.orderInfoCardWidget.busCardInstance.$("acceptWay").value;
			if(acceptWay==3){
				isCode="2";
			}else{
				isCode="1";
			}
			//��Ҫ����Դ���ȡ�Ĳ���	
			var queryInfoObj = {
				"UIM_KIND":"0",
				"BELONGS_TO" : "0"
			};
			var queryJsonInfo = BusCard.util.toJson(queryInfoObj);
			var parameter = "mktResId="+Me.$("uimId").value;
			parameter += "&serviceOfferId="+Me.serviceOfferId;	
			parameter += "&mktResType=2";
			parameter += "&queryJsonInfo="+queryJsonInfo;
			parameter += "&productId="+Me.productId;
			var resultJsonStr = executeRequest("prodOfferSaleAjaxAction","getQueryResourceInfo",parameter);
			var jsonResultObj =  (typeof resultJsonStr=='string')?eval("("+resultJsonStr+")"):resultJsonStr;
			if(jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1"){
				uimDealer=jsonResultObj.allId.BELONGS_TO;	
				//��ϵͳ�����̺��������Ϣ����
				$("sourceId").value=jsonResultObj.allId.BELONGS_TO;		
				//$ac$.set("belongsTO_"+Me.uniqueId,jsonResultObj.allId.BELONGS_TO);
				uimKind=jsonResultObj.allId.UIM_KIND;
				//�ж�uimkind �ǲ���30����31 ������������ͽ��п��źͲ���Ա�Ƿ����һ�µļ��
				if(jsonResultObj.allId.UIM_KIND!=30&&jsonResultObj.allId.UIM_KIND!=31){
					var param = "serviceOfferId="+Me.serviceOfferId+"&resDealer="+jsonResultObj.allId.BELONGS_TO+"&serviceKind="+productInfo.netType+"&isCode="+isCode;
					var result = executeRequest("goodsSaleAcceptAction","doSourceDealerCheck",param);
					if(!!result){
						//alert(result);
						 messageBox.alert({
			                busiCode : "08410213",
			                infoList : [result]
		                 });
		                
		                var ifCoop=Me.checkIfCoop(Me.$("uimId").value,"UIM_COOP_FLAG"); 
		                if(ifCoop){
		                	Me.$("serviceId").value="";
		                }
		                Me.$("uimId").value="";
						return false;
					}
				}
			}
			//Ԥ�俨����һ���Լ���ȡ���� 
			 if(numberDealer==""){
			 	Me.numberDealerCheck();
			 }
		}
	  
	
	}
	//�����Ƿ����һ��
	Me.numberDealerCheck=function(){
	   if(Me.$("serviceId").value!=""){
		   //������������ǲ�����ͨ������д�������Դ���
		    var isCode="";
			//��ȡ������ʽ
			var acceptWay=prodOfferAcceptLoader.orderInfoCardWidget.busCardInstance.$("acceptWay").value;
			if(acceptWay==3){
				isCode="2";
			}else{
				isCode="1";
			}
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
					var param = "serviceOfferId="+Me.serviceOfferId+"&resDealer="+jsonResultObj.allId.BELONGS_TO+"&serviceKind="+productInfo.netType+"&isCode="+isCode;
					var result = executeRequest("goodsSaleAcceptAction","doSourceDealerCheck",param);
					if(!!result){
						//alert(result);
						 messageBox.alert({
			                busiCode : "08410213",
			                infoList : [result]
		                 });
		                 var ifCoop=Me.checkIfCoop(Me.$("serviceId").value,"NO_COOP_FLAG"); 
		                 if(ifCoop){
		                 	 Me.$("uimId").value="";
		                 }
		                 Me.$("serviceId").value="";
						return false;
					}
					//Ԥ�俨����һ���Լ���ȡ����
					  if(uimDealer==""){
					 	Me.uimDealerCheck();
					  }
				}
			}
			
		}
	}
	
	//�����Ƿ����һ�µļ��
	Me.numberCardDealerCheck=function(){
	    //������������ǲ�����ͨ������д�������Դ���
	    var isCode="";
		//��ȡ������ʽ
		var acceptWay=prodOfferAcceptLoader.orderInfoCardWidget.busCardInstance.$("acceptWay").value;
		if(acceptWay==3){
			isCode="2";
		}else{
			isCode="1";
		}
		if(Me.$("uimId").value!=""&&Me.$("serviceId").value!=""){
		//��ƷΪ8 ʱ��Ž��м��
			if(productInfo.netType=="8"){
				//�����Ƿ�һ�µļ���������1����Ϊ�����  cdma uimkind ����  30  31 
				if(ifVirtual!="1"){
					if(uimKind!="30"&&uimKind!="31"){
						//��ȡuim
						var param = "serviceOfferId="+Me.serviceOfferId+"&phoneDealer="+numberDealer+"&cardDealer="+uimDealer+"&isCode="+isCode;
						var result = executeRequest("goodsSaleAcceptAction","doCheckResSame",param);
						if(!!result){
							//alert(result);
							 messageBox.alert({
				                busiCode : "08410213",
				                infoList : [result]
				                });
				            Me.$("uimId").value="";
				            Me.$("serviceId").value="";    
							return false;
						}
					}
				
				}
			
			}
		}
	}
	Me.numberCardDealerCheckBefore=function(value,coopFlag){
	    //����ǲ���Ԥ�俨 ��Ԥ�俨����Ҫ���п���һ���Լ��
	    var parameter = "objectId=" + value + "&serviceOfferId=" + Me.serviceOfferId + "&productId=" + Me.productId + "&cityCode=" + Me.cityCode + "&getCoopFlag="+coopFlag;
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getCoopNumInfo", parameter);
		var resultJson = dojo.fromJson(resultJsonStr);
		if (!resultJson || resultJson.flag <= 0) {
			return;
		}
		if(ifVirtual=="1"){
			return;
		}
		if(resultJson.NUMBER == "-1" && ifVirtual!="1"){
			//��ȡ������ʽ
			var acceptWay=prodOfferAcceptLoader.orderInfoCardWidget.busCardInstance.$("acceptWay").value;
			//��Ҫ���ؿ����Ƿ����256  0 ����� 1�������������  2��ͨ������� 3ȫ�����
			var switch256 = executeRequest("prodOfferSaleAjaxAction","ifCheckNumberResSame","");
			if(switch256=="3"){
				Me.numberCardDealerCheck();
			}else if(switch256=="1"){
				if(acceptWay=="3"){
					Me.numberCardDealerCheck();
				}
			}else if(switch256=="2"){
				if(acceptWay!="3"){
					Me.numberCardDealerCheck();
				}
			}
		
		}
	}
	//uimʧȥ����ʱ�򴥷����¼�
		 BusCard.addEventListener(Me.$("uimId"), 'blur', function() {
		 //9999Ϊ������Ӧ�Ŀ���
		   if(Me.$("uimId").value!=""&&Me.$("uimId").value!="9999"){
				//�����Ʒ������8����70 ���п��������Ա�����ļ��
				if(productInfo.netType==8||productInfo.netType==70){
					Me.uimDealerCheck();
					Me.numberCardDealerCheckBefore(Me.$("uimId").value,"UIM_COOP_FLAG");
				}
			}
		});
	   BusCard.addEventListener(Me.$("serviceId"), 'blur', function() {
		   if(Me.$("serviceId").value!=""){
				//�����Ʒ������8����70 ���к��������Ա�����ļ��
				if(productInfo.netType==8||productInfo.netType==70){
					Me.numberDealerCheck();
					Me.numberCardDealerCheckBefore(Me.$("serviceId").value,"NO_COOP_FLAG");
				}
			}
		});
	
	
	
	//Me.$("uimId").onblur = function(){
	  //  if(Me.$("uimId").value!=""){
			//�����Ʒ������8����70 ���п��������Ա�����ļ��
		//	if(productInfo.netType==8||productInfo.netType==70){
			//	Me.uimDealerCheck();
			//	Me.numberCardDealerCheckBefore();
		//	}
		//}
	//}
	//����ʧȥ�����ʱ�򴥷����¼�
	//Me.$("serviceId").onblur=function(){
		//if(Me.$("serviceId").value!=""){
			//�����Ʒ������8����70 ���к��������Ա�����ļ��
		//	if(productInfo.netType==8||productInfo.netType==70){
			//	Me.numberDealerCheck();
				//Me.numberCardDealerCheckBefore();
			//}
		//}
	//}
	var acceptWay=prodOfferAcceptLoader.orderInfoCardWidget.busCardInstance.$("acceptWay");
	//declare batchFlag Object
	var batchFlag=prodOfferAcceptLoader.orderInfoCardWidget.busCardInstance.$("batchFlag");
		BusCard.addEventListener(acceptWay, 'change', function() {
	     /* ����֧��Ԥ��½�Ҵ���������
	      * if((Me.$("acceptSource")&&Me.$("acceptSource").checked==true&&acceptWay.value=="3")
	    		 &&(!batchFlag||batchFlag.value=="0")){ //allow if batch
	         alert("\u9884\u767b\u5f55\u4e0d\u80fd\u9009\u62e9\u4ee3\u7406\u5546\u5165\u7f51");
	         acceptWay.value="1";
	         return false;
	      }else{*/
	      	 if(Me.$("serviceId").value!=""){
				//�����Ʒ������8����70 ���к��������Ա�����ļ��
				if(productInfo.netType==8||productInfo.netType==70){
					Me.numberDealerCheck();
					Me.numberCardDealerCheckBefore(Me.$("serviceId").value,"NO_COOP_FLAG");
				}
			}
			//9999Ϊ������Ӧ�Ŀ���
			if(Me.$("uimId").value!=""&&Me.$("uimId").value!="9999"){
				//�����Ʒ������8����70 ���п��������Ա�����ļ��
				if(productInfo.netType==8||productInfo.netType==70){
					Me.uimDealerCheck();
					Me.numberCardDealerCheckBefore(Me.$("uimId").value,"UIM_COOP_FLAG");
				}
			}
	      //}
		 
		});
		//monitor change batch flag
		BusCard.addEventListener(batchFlag, 'change', function() {
			if((Me.$("acceptSource")&&Me.$("acceptSource").checked==true&&acceptWay.value=="3")&&(!batchFlag||batchFlag.value=="0")){
		         alert("\u975e\u6279\u91cf\u53d7\u7406\u7684\u9884\u767b\u5f55\u4e0d\u80fd\u9009\u62e9\u4ee3\u7406\u5546\u5165\u7f51");
		         batchFlag.value="1";
		         return false;
		     }
		});
		
	    /*����֧��Ԥ��½�Ҵ���������
		//��������������ѡ��Ԥ��¼��
		if(Me.$("acceptSource")){
            dojo.connect(Me.$("acceptSource"),"onclick",function(){
				if(Me.$("acceptSource").checked==true){
					
					if(acceptWay.value=="3"
						&&(!batchFlag||batchFlag.value=="0")){ // allow if batch
						alert("\u4ee3\u7406\u5546\u5165\u7f51\u4e0d\u80fd\u9009\u62e9\u9884\u767b\u5f55");
						Me.$("acceptSource").checked=false;
						return false;
					}
				}
			});
		}*/
	
});