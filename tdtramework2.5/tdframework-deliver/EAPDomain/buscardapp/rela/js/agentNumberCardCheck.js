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
	//用于保存卡号归属
	var uimDealer="";
	//用于保存号码归属
	var numberDealer="";
	var  ifVirtual="";
	var uimKind="";
	//获取产品大类
	var productInfo=BusCard.$remote('productToServiceDAO').queryById({productId:Me.productId});
	  //检测是不是预配卡 是预配卡不需要进行卡号一致性检测
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
	   
	//对于卡和操作员是否归属一致的检测
	Me.uimDealerCheck=function(){
		if(Me.$("uimId").value!=""&&Me.$("uimId").value!="9999"){
			  //用于渠道检测是不是普通受理进行代理商资源检测
		    var isCode="";
		//获取入网方式
			var acceptWay=prodOfferAcceptLoader.orderInfoCardWidget.busCardInstance.$("acceptWay").value;
			if(acceptWay==3){
				isCode="2";
			}else{
				isCode="1";
			}
			//需要从资源组获取的参数	
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
				//老系统代理商和受理点信息处理
				$("sourceId").value=jsonResultObj.allId.BELONGS_TO;		
				//$ac$.set("belongsTO_"+Me.uniqueId,jsonResultObj.allId.BELONGS_TO);
				uimKind=jsonResultObj.allId.UIM_KIND;
				//判断uimkind 是不是30或者31 如果符合条件就进行卡号和操作员是否归属一致的检测
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
			//预配卡卡号一致性检测获取参数 
			 if(numberDealer==""){
			 	Me.numberDealerCheck();
			 }
		}
	  
	
	}
	//号码是否归属一致
	Me.numberDealerCheck=function(){
	   if(Me.$("serviceId").value!=""){
		   //用于渠道检测是不是普通受理进行代理商资源检测
		    var isCode="";
			//获取入网方式
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
				//不是虚号码 调用
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
					//预配卡卡号一致性检测获取参数
					  if(uimDealer==""){
					 	Me.uimDealerCheck();
					  }
				}
			}
			
		}
	}
	
	//卡号是否归属一致的检测
	Me.numberCardDealerCheck=function(){
	    //用于渠道检测是不是普通受理进行代理商资源检测
	    var isCode="";
		//获取入网方式
		var acceptWay=prodOfferAcceptLoader.orderInfoCardWidget.busCardInstance.$("acceptWay").value;
		if(acceptWay==3){
			isCode="2";
		}else{
			isCode="1";
		}
		if(Me.$("uimId").value!=""&&Me.$("serviceId").value!=""){
		//产品为8 时候才进行检测
			if(productInfo.netType=="8"){
				//卡号是否一致的检验条件：1、不为虚号码  cdma uimkind 不在  30  31 
				if(ifVirtual!="1"){
					if(uimKind!="30"&&uimKind!="31"){
						//获取uim
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
	    //检测是不是预配卡 是预配卡不需要进行卡号一致性检测
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
			//获取入网方式
			var acceptWay=prodOfferAcceptLoader.orderInfoCardWidget.busCardInstance.$("acceptWay").value;
			//需要开关控制是否调用256  0 不检测 1代理商入网检测  2普通入网检测 3全部检测
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
	//uim失去焦点时候触发的事件
		 BusCard.addEventListener(Me.$("uimId"), 'blur', function() {
		 //9999为虚号码对应的卡号
		   if(Me.$("uimId").value!=""&&Me.$("uimId").value!="9999"){
				//如果产品大类是8或者70 进行卡号与操作员归属的检测
				if(productInfo.netType==8||productInfo.netType==70){
					Me.uimDealerCheck();
					Me.numberCardDealerCheckBefore(Me.$("uimId").value,"UIM_COOP_FLAG");
				}
			}
		});
	   BusCard.addEventListener(Me.$("serviceId"), 'blur', function() {
		   if(Me.$("serviceId").value!=""){
				//如果产品大类是8或者70 进行号码与操作员归属的检测
				if(productInfo.netType==8||productInfo.netType==70){
					Me.numberDealerCheck();
					Me.numberCardDealerCheckBefore(Me.$("serviceId").value,"NO_COOP_FLAG");
				}
			}
		});
	
	
	
	//Me.$("uimId").onblur = function(){
	  //  if(Me.$("uimId").value!=""){
			//如果产品大类是8或者70 进行卡号与操作员归属的检测
		//	if(productInfo.netType==8||productInfo.netType==70){
			//	Me.uimDealerCheck();
			//	Me.numberCardDealerCheckBefore();
		//	}
		//}
	//}
	//号码失去焦点的时候触发的事件
	//Me.$("serviceId").onblur=function(){
		//if(Me.$("serviceId").value!=""){
			//如果产品大类是8或者70 进行号码与操作员归属的检测
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
	     /* 辽宁支持预登陆且代理商入网
	      * if((Me.$("acceptSource")&&Me.$("acceptSource").checked==true&&acceptWay.value=="3")
	    		 &&(!batchFlag||batchFlag.value=="0")){ //allow if batch
	         alert("\u9884\u767b\u5f55\u4e0d\u80fd\u9009\u62e9\u4ee3\u7406\u5546\u5165\u7f51");
	         acceptWay.value="1";
	         return false;
	      }else{*/
	      	 if(Me.$("serviceId").value!=""){
				//如果产品大类是8或者70 进行号码与操作员归属的检测
				if(productInfo.netType==8||productInfo.netType==70){
					Me.numberDealerCheck();
					Me.numberCardDealerCheckBefore(Me.$("serviceId").value,"NO_COOP_FLAG");
				}
			}
			//9999为虚号码对应的卡号
			if(Me.$("uimId").value!=""&&Me.$("uimId").value!="9999"){
				//如果产品大类是8或者70 进行卡号与操作员归属的检测
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
		
	    /*辽宁支持预登陆且代理商入网
		//代理商入网不能选中预登录框
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