BusCard.define('/buscardapp/rela/js/getStandardAddrForTest.js', function(_buscard, cardParam) {
	        var Me = this;
	        Me.needResourceComfirm = true;
	        var util = dojo.require("orderaccept.prodofferaccept.util");
	        var a = arguments[0];
	        var b = arguments[1];
	        // Me.belongCode = b.belongCode;
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
	        		Me.getResourceConfirmForTest();
	        	}else{
	        		Me.getStandardAdd();
	        	}
	        };
	        
	        Me.doCheckBeforeConfirmTest = function(){
	        	var tip = null;
	        	if(!!window.prodOfferAcceptLoader){
	        		var serviceIdArray=[];
	        		//�ۺ϶���������߼�
	        		if((!!$ac$.get("_switch8091_"))&&$ac$.get("_switch8091_")==0){
	        			var serviceWidgetObj = prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_"+cardParam.uniqueId];
	        			var attrBusCardInstance = serviceWidgetObj.attrCardWidget.busCardInstance;
				       	if(!!attrBusCardInstance.$(util.SpecAttrCdConst.portSpeedAttrCd)&&attrBusCardInstance.$(util.SpecAttrCdConst.portSpeedAttrCd).value == ""){
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
					       	if(serviceCardWidgetMap[key].cardParam.serviceOfferId == 301 || serviceCardWidgetMap[key].cardParam.serviceOfferId == 93){
					       		var attrBusCardInstance = serviceCardWidgetMap[key].attrCardWidget.busCardInstance;
						       	if(!!attrBusCardInstance.$(util.SpecAttrCdConst.portSpeedAttrCd)&&attrBusCardInstance.$(util.SpecAttrCdConst.portSpeedAttrCd).value == ""){
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
	        
	        
	        Me.getResourceConfirmForTest = function(){
	        	//��Դȷ��ǰ�ļ��
	        	if(Me.doCheckBeforeConfirmTest()){
	        		return ;
	        	}
	        	//var standardAddrURL="http://136.96.9.187:8181/integration/addressqueryFinal.jsp?basecode=20090710231205123&authcode=7F5E767B5D5006CD";				
	        	//��ȡ��Դȷ�ϵ�URL
	        	var standardAddrURL = executeRequest("prodOfferSaleAjaxAction", "getStandardAddrRelURL", "");
	        	//ƴ����
	        	standardAddrURL=standardAddrURL + "&speedRate=0M";
	        	//standardAddrURL=standardAddrURL + "&regioncode="+BusCard.$session.areaCode.substring(1);
	        	standardAddrURL=standardAddrURL + "&prodSpecId="+cardParam.productId;
	        	var oParamter = {
					"resConfirmURL" : standardAddrURL
				};
				var windowResourceStardardAddress=window.showModalDialog(BusCard.path.contextPath+"/orderaccept/prodofferaccept/view/ResourceConfirm.jsp",oParamter,"DialogWidth:1024px;DialogHeight:768px;status:no;location:no;resizable:yes");
				if(windowResourceStardardAddress!=null){
		       		var validateresult = windowResourceStardardAddress["validateresult"];//��ȡ��Դ�����ʶ
		       		var addrDetail = windowResourceStardardAddress["addressName"];//��׼��ַ����
		       		var addrId = windowResourceStardardAddress["addressId"];//��׼��ַid
		       		var modeshowname = windowResourceStardardAddress["Modeshowname"];//���뷽ʽ����
		       		var connmodechoose = windowResourceStardardAddress["Connmodechoose"];//���뷽ʽid
		       		var modeshowid=windowResourceStardardAddress["Modeshowid"];//���뷽ʽ�����id
		       		var siteofficename = windowResourceStardardAddress["siteofficename"];//������id
		       		if(validateresult == ""){
		       			alert("\u8fd4\u56de\u7684\u8d44\u6e90\u6807\u8bc6\u4e3a\u7a7a\uff0c\u8bf7\u786e\u8ba4");
		       			return false;
		       		}
		       		//��ȡ��Դȷ��ʧ���Ƿ�������������Ŀ���
		       		var param = "cityCode=" + Me.cityCode;
		       		var switch8092 = executeRequest("prodOfferSaleAjaxAction", "getSwitchUseResourceConfirm8092", param);
		       		
		       		
		       		//�����Դȷ��ʧ�ܣ���ֵΪ��0
					if(validateresult == 0 || validateresult == "0"){
						alert("\u5bf9\u5e94\u4ea7\u54c1\u7f16\u7801\u3010"+cardParam.productId+"\u3011\u6ca1\u6709\u8d44\u6e90\u4fe1\u606f\u3002");
						if((!!switch8092)&&switch8092 == 1){
							return false;
		       			}else{
		       				//���⴦��
				       		if(siteofficename==""||siteofficename=="null"||siteofficename==null){
				       			alert("\u8fd4\u56de\u4ea4\u6362\u5c40id\u4e3a"+siteofficename+",\u8d44\u6e90\u786e\u8ba4\u5931\u8d25");
				       			return false;
				       		}
							Me.setAllProductServiceInfo(addrDetail,addrId,siteofficename,connmodechoose);
		       			}
					}else{
						//���⴦��
			       		if(siteofficename==""||siteofficename=="null"||siteofficename==null){
			       			alert("\u8fd4\u56de\u4ea4\u6362\u5c40id\u4e3a"+siteofficename+",\u8d44\u6e90\u786e\u8ba4\u5931\u8d25");
			       			return false;
			       		}
						Me.setAllProductServiceInfo(addrDetail,addrId,siteofficename,connmodechoose);
					}
				}
	        };
	        
	        /**
	         * ����ҳ���������ֵ
	         */
	        Me.setAllProductServiceInfo = function(addrDetail,addrId,siteofficename,connmodechoose){
	        	if(window.prodOfferAcceptLoader){
					//��ȡ��׼��ַ��Ϣ��ҳ�渳ֵ
					var serviceCardWidgetMap = prodOfferAcceptLoader.serviceCardWidgetMap;
					var serviceWidgetObj = serviceCardWidgetMap["serviceCardWidget_"+cardParam.uniqueId];
					if(serviceWidgetObj.busCardInstance.$('addrId')){
        				//if(serviceWidgetObj.busCardInstance.$('addrId').value == ""){
        					serviceWidgetObj.busCardInstance.$('addrId').value = addrDetail;
        					serviceWidgetObj.busCardInstance.$('addrId').rvalue = addrId;
        				//}
        			}
        			if(serviceWidgetObj.busCardInstance.$('addrDetail')){
        				//if(serviceWidgetObj.busCardInstance.$('addrDetail').value == ""){
        					serviceWidgetObj.busCardInstance.$('addrDetail').value = addrDetail;
        				//}
        			}
        			if(serviceWidgetObj.attrCardWidget&&serviceWidgetObj.attrCardWidget.busCardInstance){
        				var attrBusCardInstance = serviceWidgetObj.attrCardWidget.busCardInstance;
	        			if(attrBusCardInstance.$('60056')){
	        				attrBusCardInstance.$('60056').value=siteofficename;
	        			}
	        			if(attrBusCardInstance.$('100542')){
	        				attrBusCardInstance.$('100542').value=connmodechoose;
	        			}
        			}
			        var prodChgClass = "orderaccept.prodofferaccept.loader.ProductChangeAcceptLoader";
			        var prodOfferLoader = dojo.getObject("prodOfferAcceptLoader");
					if(!!prodOfferLoader && prodOfferLoader.declaredClass == prodChgClass){					
					  	//�ƻ���ʱ�������⴦��
						if(Me.doMoveSpecialHandler){
						   Me.doMoveSpecialHandler();   
						}  
					}
				}else{
					//����ҵ��
					if(Me.$('addrId')){
					    Me.$('addrId').value=addrDetail;
					    Me.$('addrId').rvalue=addrId;
				    }
				    if(Me.$('addrDetail')){
				        Me.$('addrDetail').value=addrDetail;
				    }
				    //������Id
				    
				  BusCard.each(BusCard.query("[controlFieldName]",$("prodAttrCardContainer")),function(node){
					if(node.id=='60056'){
					  node.value=siteofficename;
					}
				  });
				  BusCard.each(BusCard.query("[controlFieldName]",$("prodAttrCardContainer")),function(node){
					if(node.id=='100542'){
					  node.value=connmodechoose;
					}
				  }); 
				  	//�ƻ���ʱ�������⴦��
					if(Me.doMoveSpecialHandler){
					   Me.doMoveSpecialHandler();   
					}  
				}
	        };
	        
	        /**
	         * ��Դȷ��ǰ�ļ��
	         */
	        Me.doCheckBeforeConfirm = function(){
	        	var tip = null;
	        	if(!!window.prodOfferAcceptLoader){
	        		var serviceIdArray=[];
	        		//�ۺ϶���������߼�
	        		var serviceCardWidgetMap = prodOfferAcceptLoader.serviceCardWidgetMap;
	        		for(var key in serviceCardWidgetMap){
	        			if (!serviceCardWidgetMap.hasOwnProperty(key)) {
					        continue;
				       	}
				       	//��װ�ż��
				       	if(serviceCardWidgetMap[key].cardParam.serviceOfferId == 301){
				       		var attrBusCardInstance = serviceCardWidgetMap[key].attrCardWidget.busCardInstance;
					       	if(!!attrBusCardInstance.$(util.SpecAttrCdConst.portSpeedAttrCd)&&attrBusCardInstance.$(util.SpecAttrCdConst.portSpeedAttrCd).value == ""){
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
        			if(serviceIdArray.length >0){
        				tip = serviceIdArray.join(",");
        			}
	        	}
	        	
	        	if(tip == null){
	        		return false;
	        	}else{
	        		orderaccept.common.dialog.MessageBox.alert({
			        	message:tip+"û��ѡ�����ʣ���ѡ��!"
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
	        	var standardAddrURL="http://136.96.9.222:8080/integration/addressqueryFinal.jsp?basecode=20090710231205123&authcode=7F5E767B5D5006CD";
	        	//ƴ����
	        	standardAddrURL=standardAddrURL + "&prodInfo="+Me.getProdInfo();
	        	standardAddrURL=standardAddrURL + "&regioncode="+BusCard.$session.areaId;
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
				        	message:"���ص���Դ��ʶΪ�գ���ȷ��!"
				        });
		       			return false;
		       		}
		       		//�����Դȷ��ʧ�ܣ���ֵΪ��0
					if(validateresult == 0 || validateresult == "0"){
						orderaccept.common.dialog.MessageBox.alert({
				        	message:"��Դȷ��ʧ��!"
				        });
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
						doMoveSpecialHandler();
					}
				}
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
				                }
			                });
				}else{
			        standardAddInterface = new StandardAddInterface({
				                "$" : function(id) {
					                return Me.$(id)
				                }
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
        				var rate = !!attrBusCardInstance.$(util.SpecAttrCdConst.portSpeedAttrCd)?attrBusCardInstance.$(util.SpecAttrCdConst.portSpeedAttrCd).value:"";
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
					       	if(serviceCardWidgetMap[key].cardParam.serviceOfferId == 301){
					       		//û�б�׼��ַ�ؼ��򲻻�ȡ
			        			if(serviceCardWidgetMap[key].busCardInstance.$('link_addrId')){
			        				var cardParameter = serviceCardWidgetMap[key].cardParam;
			        				//��Ʒ���Կ�Ƭʵ��
			        				var attrBusCardInstance = serviceCardWidgetMap[key].attrCardWidget.busCardInstance;
			        				var rate = !!attrBusCardInstance.$(util.SpecAttrCdConst.portSpeedAttrCd)?attrBusCardInstance.$(util.SpecAttrCdConst.portSpeedAttrCd).value:"";
			        				productInfoAll.push({
			        					productId : cardParameter.productId,
			        					rate : rate,
			        					uniqueId : cardParameter.uniqueId
			        				});
			        			}
					       	}
					       	
	        			}
        			}
					return BusCard.toJson(productInfoAll).replace(/\"/g, "'");
	        	}else{
	        		//д����ҵ����߼�,����ҵ��ʱ����Ϊֻ��һ�������࣬����uniqueId��0
	        		var productInfoAll = [];
	        		var rate=!!Me.$(util.SpecAttrCdConst.portSpeedAttrCd)?Me.$(util.SpecAttrCdConst.portSpeedAttrCd).value:"";
	        		productInfoAll.push({
	        					productId : Me.productId,
	        					rate : rate,
	        					uniqueId : 0
	        				}); 
	        	    return BusCard.toJson(productInfoAll).replace(/\"/g, "'");       		
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
								                 return inst.attrId == '100081';
								              });
							            } 
										!!instSpeedVO ? attrCardWidget.busCardInstance.$("100081").value = instSpeedVO.attrValue:null;										
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
