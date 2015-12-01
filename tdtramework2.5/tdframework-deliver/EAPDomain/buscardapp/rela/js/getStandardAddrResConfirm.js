BusCard.define('/buscardapp/rela/js/getStandardAddrResConfirm.js', function(_buscard, cardParam) {
	        var Me = this;
	        Me.needResourceComfirm = true;
	        var util = dojo.require("orderaccept.prodofferaccept.util");
	        var a = arguments[0];
	        var b = arguments[1];

	        //��׼��ַ�������ֹ���д
	        if(Me.$("addrId")){
	        	Me.$("addrId").disabled = true;
	        }
	        
	        Me.belongCode = "";
	        if (!Me.belongCode && Me.getCardRelationInfo().serviceRelation)
	            Me.belongCode = Me.getCardRelationInfo().serviceRelation.belongCode;
	        Me.cityCode = b.cityCode;
	        Me.getStandardAddr = function() {
	        	//��ʼ����׼��ַ����
				GetSwitchForAddr.initSwitch(Me.cityCode);
	        	var switch8090 = $ac$.get("_switch8090_");
	        	if(!!switch8090&&switch8090==1){
	        		Me.getResourceConfirm();
	        	}else{
	        		Me.getStandardAdd();
	        	}
	        };
	        
	        /**
	         * ��ȡ���ڵ�����id
	         */
	        Me.getExistSpeedAttrCd = function(attrBusCardInstance){
	        	return dojo.filter(util.SpeedAttrArray||[],function(_attrCd){
			        	return !!attrBusCardInstance.$(_attrCd+"");
			    })[0];
	        };
	        
	        /**
	         * ��Դȷ��ǰ�ļ��
	         */
	        Me.doCheckBeforeConfirm = function(){
	        	var tip = null;
	        	if(!!window.prodOfferAcceptLoader){
	        		var serviceIdArray=[];
	        		//�ۺ϶���������߼�
	        		if((!!$ac$.get("_switch8091_"))&&$ac$.get("_switch8091_")==0){
	        			var serviceWidgetObj = prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_"+cardParam.uniqueId];
	        			//��������ڵ�����id
	        			var existAttrCd = Me.getExistSpeedAttrCd(attrBusCardInstance);
				       	if(!!attrBusCardInstance.$(existAttrCd+"")&&attrBusCardInstance.$(existAttrCd+"").value == ""){
				       		var trs = dojo.query(".main-product-basic", prodOfferAcceptLoader.mainProdOfferWidget.domNode);
				       		var targetTr = dojo.filter(trs||[],function(prodBasicTr){
				       			return dojo.attr(prodBasicTr, "uniqueId") == serviceWidgetObj.cardParam.uniqueId;
				       		})[0];
				       		var viewId = dojo.attr(targetTr, "viewId");
				       		var serviceId =  dojo.query(".serviceId-" + viewId, targetTr)[0].value;
				       		serviceIdArray.push(serviceId);
				       	}
	        			
	        		}else{
		        		var serviceCardWidgetMap = prodOfferAcceptLoader.serviceCardWidgetMap;
		        		for(var key in serviceCardWidgetMap){
		        			if (!serviceCardWidgetMap.hasOwnProperty(key)) {
						        continue;
					       	}
					       	//��װ�ż��
					       	if(serviceCardWidgetMap[key].cardParam.serviceOfferId == ConstantsPool.load("ServiceOfferIDConst").ServiceOfferIDConst.PROD_NEW 
					       	|| serviceCardWidgetMap[key].cardParam.serviceOfferId == ConstantsPool.load("ServiceOfferIDConst").ServiceOfferIDConst.PRODUCT_CHANGE_ACCEPT){
					       		var attrBusCardInstance = serviceCardWidgetMap[key].attrCardWidget.busCardInstance;
						       	var existAttrCd = Me.getExistSpeedAttrCd(attrBusCardInstance);
						       	if(!!attrBusCardInstance.$(existAttrCd+"")&&attrBusCardInstance.$(existAttrCd+"").value == ""){
						       		var trs = dojo.query(".main-product-basic", prodOfferAcceptLoader.mainProdOfferWidget.domNode);
						       		var targetTr = dojo.filter(trs||[],function(prodBasicTr){
						       			return dojo.attr(prodBasicTr, "uniqueId") == serviceCardWidgetMap[key].cardParam.uniqueId;
						       		})[0];
						       		var viewId = dojo.attr(targetTr, "viewId");
						       		var serviceId =  dojo.query(".serviceId-" + viewId, targetTr)[0].value;
						       		serviceIdArray.push(serviceId);
						       	}
					       	}
	        			}
	        		}
        			if(serviceIdArray.length >0){
        				tip = serviceIdArray.join(",");
        			}
	        	}
	        	
	        	if(tip == null){
	        		return false;
	        	}else{
	        		orderaccept.common.dialog.MessageBox.alert({
			        	message:"["+tip+"]"+"\u6ca1\u6709\u9009\u62e9\u901f\u7387\uff0c\u8bf7\u9009\u62e9!"
			        });
	        		return true;
	        	}
	        	return false;

	        };
	        
	        /**
	         * ��ȡ��Դȷ�ϵ�ҳ��
	         */
	        Me.getResourceConfirm = function(){
	        	//��Դȷ��ǰ�ļ��
	        	if(Me.doCheckBeforeConfirm()){
	        		return ;
	        	}
	        	var standardAddrURL = executeRequest("prodOfferSaleAjaxAction", "getStandardAddrRelURL", "");
	        	//ƴ����
	        	standardAddrURL=standardAddrURL + "&prodInfo="+Me.getProdInfo();
	        	//standardAddrURL=standardAddrURL + "&regioncode="+BusCard.$session.areaCode;
	        	var oParamter = {
					"resConfirmURL" : standardAddrURL
				};
				var windowResourceStardardAddress=window.showModalDialog(BusCard.path.contextPath+"/orderaccept/prodofferaccept/view/ResourceConfirm.jsp",oParamter,"DialogWidth:1024px;DialogHeight:768px;status:no;location:no;resizable:yes");
				if(windowResourceStardardAddress!=null){
		       		var validateresult = windowResourceStardardAddress["validateresult"];//��ȡ��Դ�����ʶ
		       		var addressName = windowResourceStardardAddress["addressname"];//��׼��ַ����
		       		var addressId = windowResourceStardardAddress["addressId"];//��׼��ַid
		       		var packageinfo = windowResourceStardardAddress["packageinfo"];//��Դȷ�Ϸ��ص���Ϣ
		       		var siteofficename = windowResourceStardardAddress["siteofficename"];//����������
		       		if(validateresult == ""){
		       			orderaccept.common.dialog.MessageBox.alert({
				        	message:"\u8fd4\u56de\u7684\u8d44\u6e90\u6807\u8bc6\u4e3a\u7a7a\uff0c\u8bf7\u786e\u8ba4"
				        });
		       			return false;
		       		}
		       		//��ȡ��Դȷ��ʧ���Ƿ�������������Ŀ���
		       		var param = "cityCode=" + Me.cityCode;
		       		var switch8092 = executeRequest("prodOfferSaleAjaxAction", "getSwitchUseResourceConfirm8092", param);
		       		//�����Դȷ��ʧ�ܣ���ֵΪ��0
					if(validateresult == 0 || validateresult == "0"){
						orderaccept.common.dialog.MessageBox.alert({
				        	message:"\u8d44\u6e90\u786e\u8ba4\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u8d44\u6e90\u786e\u8ba4!"
				        });
				        if((!!switch8092)&&switch8092 == 1){
				        	return false;
				        }else{
				        	
				        	var paramArgs = {
								"addrDetail":addressName,
							    "addrId":addressId,
							    "packageinfo" :packageinfo,
							    "siteofficename" : siteofficename
							};
							var resourceConfirmInterface = new ResourceConfirmInterface({
				                "$" : function(id) {
					                return Me.$(id)
				                }
			                });
							resourceConfirmInterface.setReturnValue(paramArgs);
							//�ƻ���ʱ�������⴦��
							if(!!Me.doMoveSpecialHandler){
								Me.doMoveSpecialHandler();
							}
				        }
					}else{
						if(!window.prodOfferAcceptLoader){
	        			  if(validateresult == 3&&b.serviceOfferId==9&&(serviceRelation.serviceKind==10||serviceRelation.serviceKind==14)){
	        			    MessageBox.alert({
										title:"\u63d0\u793a\u4fe1\u606f",
										message:"\u6ca1\u6709\u8d44\u6e90\uff0c\u4e0d\u53ef\u4ee5\u7ee7\u7eed\u529e\u7406\u3002"
									});
						   return false;
	        			  }
	        			
	        				
	        			}
	        			if(window.prodOfferAcceptLoader&&(!Me.doCheckWideParamAttr(packageinfo))){
	        				return ;
	        			}
						var paramArgs = {
			 				"addrDetail":addressName,
						    "addrId":addressId,
						    "packageinfo" :packageinfo,
						    "siteofficename" : siteofficename
						};
						var resourceConfirmInterface = new ResourceConfirmInterface({
			                "$" : function(id) {
				                return Me.$(id)
			                }
		                });
						resourceConfirmInterface.setReturnValue(paramArgs);
						//�ƻ���ʱ�������⴦��
						if(!!Me.doMoveSpecialHandler){
							Me.doMoveSpecialHandler();
						}
					}
				}
	        };
	        
	        /**
	         * �������ʺͲ����Ƿ�ƥ��
	         */
	        Me.doCheckWideParamAttr = function(packageinfo){
	        	var serviceCardWidgetMap = prodOfferAcceptLoader.serviceCardWidgetMap;
	        	var packageInfoResult = dojo.filter(packageinfo||[],function(data){
	        		var uniqueId = data.uniqueid;
	    			var serviceCardWidgetObj = serviceCardWidgetMap["serviceCardWidget_"+uniqueId];
	    			var attrBusCardInstance = serviceCardWidgetObj.attrCardWidget.busCardInstance;
	    			return orderaccept.prodofferaccept.util.ProdOfferHelper.judgeByWideAttrParamValue(attrBusCardInstance.$('300000'),attrBusCardInstance.$('100542'),attrBusCardInstance.$('100081')) == false;
	        	})[0];
	        	var tip = null;
	        	if(!!packageInfoResult){
	        		orderaccept.common.dialog.MessageBox.alert({
			        	message:"\u4ea7\u54c1--"+[packageInfoResult.productId]+"\u5bf9\u5e94\u7684\u627f\u8f7d\u65b9\u5f0f\u548c\u5f53\u524d\u7528\u6237\u7c7b\u578b\u548c\u901f\u7387\u4e0d\u5339\u914d\uff0c\u4f1a\u5f71\u54cd\u65bd\u5de5\uff0c\u8bf7\u91cd\u65b0\u8fdb\u884c\u8d44\u6e90\u786e\u8ba4!"
			        });
			        return false;
	        	}
	        	return true;
	        }; 
	        
	        
	        /**
	         * ��ȡ��׼��ַ
	         */
	        Me.getStandardAdd = function(){
		        var standardAddInterface = null;
				var switch8090 = $ac$.get("_switch8090_");
	        	if(!!switch8090&&switch8090==1){
					standardAddInterface = new StandardAddMultipleInterface({
				                "$" : function(id) {
					                return Me.$(id)
				                },
				                "uniqueId" : cardParam.uniqueId
			                });
				}else{
			        standardAddInterface = new StandardAddInterface({
				                "$" : function(id) {
					                return Me.$(id)
				                },
				                "uniqueId" : cardParam.uniqueId
			                });
                }
		        var B = {
			        "StandardAddInterface" : standardAddInterface
		        };
		        var C = BusCard.$session.container2;
		        var D = BusCard.$session.workNo;
		        var A = BusCard.$session.PASSWORD;
		        var E = BusCard.$session.areaCode;
		        if (!Me.belongCode) {
			        Me.belongCode = b.serviceRelation.belongCode;
		        }
		        var F = C + "resource/interfacemanage/standardadd/StandardAddrQuery.jsp?STAFFNO=" + D + "&PASSWORD="
		                + A + "&workNo=" + D + "&regionno=" + E + "&cityCode=" + Me.cityCode + "&areaCode="
		                + Me.belongCode+"&productId="+Me.productId;
		        Me.windowResourceStardardAddress = window.showModalDialog(F, B,
		                "DialogWidth:1024px;DialogHeight:768px;status:no;location:no");
	        };
	        
	        /**
	         * ѡ���׼��ַ��ʱ�򴫲���
	         */
	        Me.getProdInfo = function(){
	        	var productInfoAll = [];
	        	if(!!window.prodOfferAcceptLoader){
	        		//�ۺ϶���������߼�
	        		var serviceCardWidgetMap = prodOfferAcceptLoader.serviceCardWidgetMap;
        			var switch8091 = $ac$.get("_switch8091_");
        			if(!!switch8091&&switch8091==0){
        				var attrBusCardInstance = serviceCardWidgetMap["serviceCardWidget_"+cardParam.uniqueId].attrCardWidget.busCardInstance;
        				var existAttrCd = Me.getExistSpeedAttrCd(attrBusCardInstance);
        				var rate = !!attrBusCardInstance.$(existAttrCd+"")?attrBusCardInstance.$(existAttrCd+"").value:"0M";
        				productInfoAll.push({
        					productId : cardParam.productId,
        					rate : rate,
        					uniqueId : cardParam.uniqueId
        				});
        			}else{
        				for(var key in serviceCardWidgetMap){
		        			if (!serviceCardWidgetMap.hasOwnProperty(key)) {
						        continue;
					       	}
					       	//�����Դȷ�ϵı�׼��ַʱ��ֻ����Ҫ��Դȷ�ϵĲ�Ʒ�Լ�����
					       	if(serviceCardWidgetMap[key].busCardInstance.needResourceComfirm === false){
					       		continue;
					       	}
					       	//����Ĳ�����ȷ��,��ʱ��д�����Ժ�ĵ�
					       	if(serviceCardWidgetMap[key].cardParam.serviceOfferId == ConstantsPool.load("ServiceOfferIDConst").ServiceOfferIDConst.PROD_NEW 
					       	|| serviceCardWidgetMap[key].cardParam.serviceOfferId == ConstantsPool.load("ServiceOfferIDConst").ServiceOfferIDConst.PRODUCT_CHANGE_ACCEPT){
					       		//û�б�׼��ַ�ؼ��򲻻�ȡ
			        			if(serviceCardWidgetMap[key].busCardInstance.$('link_addrId')){
			        				var cardParameter = serviceCardWidgetMap[key].cardParam;
			        				//��Ʒ���Կ�Ƭʵ��
			        				var attrBusCardInstance = serviceCardWidgetMap[key].attrCardWidget.busCardInstance;
			        				var existAttrCd = Me.getExistSpeedAttrCd(attrBusCardInstance);
			        				var rate = !!attrBusCardInstance.$(existAttrCd+"")?attrBusCardInstance.$(existAttrCd+"").value:"0M";
			        				productInfoAll.push({
			        					productId : cardParameter.productId,
			        					rate : rate,
			        					uniqueId : cardParameter.uniqueId
			        				});
			        			}
					       	}
					       	
	        			}
        			}
					return BusCard.toJson(productInfoAll).replace(/\"/g, "");
	        	}else{
	        		//д����ҵ����߼�,����ҵ��ʱ����Ϊֻ��һ�������࣬����uniqueId��0
	        		var productInfoAll = [];

	        		var existAttrCd = dojo.filter(util.SpeedAttrArray||[],function(_attrCd){
			        	return dojo.some(BusCard.query("[controlFieldName]",$("prodAttrCardContainer"))||[],function(node){
			        		return node.id == _attrCd+"";
			        	});
			    	})[0];
	        		var rate="0M";
	        		if(!!existAttrCd){
	        			var rateValueInfo = dojo.filter(BusCard.query("[controlFieldName]",$("prodAttrCardContainer"))||[],function(node){
	        				return node.id == existAttrCd+"";
	        			})[0];
	        			if(!!rateValueInfo){
	        				rate  = rateValueInfo.value;
	        			}
	        			
	        		}
	        		productInfoAll.push({
	        					productId : Me.productId,
	        					rate : rate,
	        					uniqueId : 0
	        				}); 
	        	    return BusCard.toJson(productInfoAll).replace(/\"/g, "");       		
	        	}
	        };
	        
	        if (Me.$("link_addrId")) {
		        // ������ص�ַ����
		        Me.$("link_addrId").onclick = function() {
			        var belongCodeElem = Me.$("belongCode");
			        if (belongCodeElem) {
				        var cityCodeElem = Me.$("cityCode");
				        if (cityCodeElem) {
					        Me.cityCode = cityCodeElem.value;
				        }
				        Me.belongCode = belongCodeElem.value;
			        } else {
				        Me.belongCode = Me.belongCode || b.belongCode;
			        }
			        // ���������5����,ȡ4������
			        if (!Me.$("belongCode") && Me.belongCode) {
				        var commonRegionDAOStub = BusCard.$remote("commonRegionDAO", "om");
				        var commonRegionVO = commonRegionDAOStub.getCommonRegionVO(parseInt(Me.belongCode + ""));
				        if (commonRegionVO.regionLevel >= 5) {
					        Me.belongCode = commonRegionVO.upRegionId + "";
				        }
				        
			        }
			        
			        Me.getStandardAddr();
		        };
	        }
	        try {
		        void function() {
		        	if((!!$ac$.get("orderChangeFlag")) && $ac$.get("orderChangeFlag")== 1){
		        		return ;
		        	}
		        	var serviceRelation = b.serviceRelation || this.serviceRelation;
			        if(!serviceRelation && !!b && !!b.userId && b.userId != 0 && b.userId != "0"){
			        	serviceRelation = BusCard.jsonPath($ac$.get("userHasProdOfferInfoList"),
				        "$[*].prodInstList[?(@.prodInstId==" + b.userId + ")]")[0].serviceRelationVO;
			        }
			        if (serviceRelation) {
				        var addrDetail = serviceRelation.addrDetail;
				        var addressId = serviceRelation.addressId;
				        
				        var addressIdElem = Me.$("addrId");
				        if (addrDetail && Me.$('addrDetail')) Me.$('addrDetail').value = addrDetail;
				        if (addressId && /^(\d+)$/.test(addressId.toString())) {
					        if (addressIdElem) {
						        addressIdElem.rvalue = addressId;
					        }
					        var addressIdText = a.$remote("mktGetAddressNameDAO").getAddressNameById(
					                serviceRelation.cityCode, addressId);
					        if (addressIdText) addressIdText = addressIdText.replace(/"/g, "");
					        if (addressIdText != "null" && addressIdText && addressIdElem && addressIdText != "\"\"")
					            addressIdElem.value = addressIdText;
				        }
			        }
		        }();
	        }
	        catch (e) {
		        alert(e.message)
	        }
	        if (Me.$('addrDetail')) {
		        Me.$('addrDetail').onmouseover = function() {
			        Me.$('addrDetail').title = Me.$('addrDetail').value;
		        };
	        }
	        if (Me.$("addrId")) {
		        Me.$("addrId").onmouseover = function() {
			        Me.$("addrId").title = Me.$("addrId").value;
		        };
	        }
	        /*�������׼��ַ���������ʹ����޸� start*/
	        /*��ȡ��������ʵ��ֵ start*/
			var serviceCard = util.DomHelper.getParentWidget(Me.dom,
								"orderaccept.prodofferaccept.widget.servicecard.ServiceCardWidget");
            /*��ȡ��������ʵ��ֵ end*/
	        var serviceRelation = b.serviceRelation || this.serviceRelation || {};
	        var prodChgClass = "orderaccept.prodofferaccept.loader.ProductChangeAcceptLoader";
	        var mktGetAddressNameDAO = BusCard.$remote("mktGetAddressNameDAO");
	        var addrIdDom = Me.$("addrId");
	        var prodOfferAcceptLoader = dojo.getObject("prodOfferAcceptLoader");
			if(!!prodOfferAcceptLoader && prodOfferAcceptLoader.declaredClass == prodChgClass){
			    BusCard.addEventListener(Me.$("addrId"),"propertychange",function(){
			    	if(!Me.$("ifSpanBureau") || Me.$("ifSpanBureau").disabled == true){return false;}
			    	var addrId = addrIdDom.rvalue;
			        if(!!serviceRelation && !!serviceRelation.addressId){
			        	var instAddrId = serviceRelation.addressId;
			        	var instCityCode = serviceRelation.cityCode;
			        	var instAddrDetail = serviceRelation.addrDetail;
			       		if(addrId != instAddrId){
			       			if(Me.$("ifSpanBureau")){
			       				var ifSpanBureau = Me.$("ifSpanBureau").value;
			       				if(ifSpanBureau == "0"){		
									var addrIdName = mktGetAddressNameDAO.getAddressNameById(instCityCode,instAddrId).replace(/"/g, "");	  
									addrIdDom.rvalue = instAddrId;		  
									addrIdDom.value = addrIdName;				
									!!instAddrDetail?setTimeout(function(){Me.$("addrDetail").value = instAddrDetail},500):null;						
									var attrCardWidget = !!serviceCard && !!serviceCard.attrCardWidget?serviceCard.attrCardWidget:null;
									if(!!attrCardWidget){											
							            var prodInstVO=!!attrCardWidget?attrCardWidget.prodInstVO:null;
							            var instSpeedVO = null;
							            if(!!prodInstVO){
								        	instSpeedVO = prodInstVO.prodInstAttrList.find(function(inst) {
								                 return dojo.some(util.SpeedAttrArray||[],function(attrCd){
								                 	return inst.attrId == attrCd;
								                 });
								              });
							            } 
										!!instSpeedVO  && !!attrCardWidget.busCardInstance.$(instSpeedVO.attrId+"") ? attrCardWidget.busCardInstance.$(instSpeedVO.attrId+"").value = instSpeedVO.attrValue:null;								
									}
									MessageBox.alert({
										title:"\u63d0\u793a\u4fe1\u606f",
										message:"[\u4e0d\u79fb\u673a]\u4e0d\u5141\u8bb8\u53d8\u66f4\u6807\u51c6\u5730\u5740"
									});
			       				}
			       			}
			       		}
			        }
			   });
			}
	        /*�������׼��ַ���������ʹ����޸� end*/
        });
