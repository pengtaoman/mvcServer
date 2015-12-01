BusCard.define('/buscardapp/rela/js/getStandardAddr.js', function(_buscard, cardParam) {
	        var Me = this;
			var MessageBox = dojo.require("orderaccept.common.dialog.MessageBox");
			var util = dojo.require("orderaccept.prodofferaccept.util");
	        Me.needResourceComfirm = false;
	        var a = arguments[0];
	        var b = arguments[1];
	        // Me.belongCode = b.belongCode;
	        //标准地址不允许手工填写
	        if(Me.$("addrId")){
	        	Me.$("addrId").disabled = true;
	        }
	        
	        Me.belongCode = "";
	        if (!Me.belongCode && Me.getCardRelationInfo().serviceRelation)
	            Me.belongCode = Me.getCardRelationInfo().serviceRelation.belongCode;
	        Me.cityCode = b.cityCode;
	        Me.getStandardAddr = function() {
	        	//初始化标准地址开关
				GetSwitchForAddr.initSwitch(Me.cityCode);
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
	        
	        if (Me.$("link_addrId")) {
		        // 包含异地地址处理
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
			        // 如果区域是5级的,取4级区域
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
			        //var serviceRelation = b.serviceRelation;
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
	        /*换受理标准地址规则与速率规则修改 start*/
	        /*获取速率属性实例值 start*/
			var serviceCard = util.DomHelper.getParentWidget(Me.dom,
								"orderaccept.prodofferaccept.widget.servicecard.ServiceCardWidget");
            /*获取速率属性实例值 end*/
	        var serviceRelation = b.serviceRelation || this.serviceRelation || {};
	        var prodChgClass = "orderaccept.prodofferaccept.loader.ProductChangeAcceptLoader";
	        var mktGetAddressNameDAO = BusCard.$remote("mktGetAddressNameDAO");
	        var addrIdDom = Me.$("addrId");
	        var prodOfferAcceptLoader = dojo.getObject("prodOfferAcceptLoader");
			if(!!prodOfferAcceptLoader && prodOfferAcceptLoader.declaredClass == prodChgClass){				
	        	Me.$("addrId").disabled = false;
			    BusCard.addEventListener(Me.$("addrId"),"propertychange",function(){
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
								                 //return inst.attrId == '100081';
								                 return dojo.some(util.SpeedAttrArray||[],function(attrCd){
								                 	return inst.attrId == attrCd;
								                 });
								              });
							            } 
										!!instSpeedVO && !!attrCardWidget.busCardInstance.$(instSpeedVO.attrId+"") ? attrCardWidget.busCardInstance.$(instSpeedVO.attrId+"").value = instSpeedVO.attrValue:null;										
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
	        /*换受理标准地址规则与速率规则修改 end*/
        });
