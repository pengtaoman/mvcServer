defineModule("orderaccept.prodofferaccept.widget.memberordergroupproduct.MemberProdInstWidget", ["orderaccept.custom._BaseWidget",
                "orderaccept.custom._BusCardTemplated", "dijit._Container", "orderaccept.prodofferaccept.util"],
        function(_Widget, _Templated, _Container, util) {
	        dojo.declare("orderaccept.prodofferaccept.widget.memberordergroupproduct.MemberProdInstWidget", [_Widget, _Templated,
	                        _Container], {
		                templatePath : dojo.moduleUrl("orderaccept.prodofferaccept.widget.memberordergroupproduct",
		                        "template/memberOrderGroupProductTp.html"),
		                constructor : function(controller){
		                	this.controller = controller;
		                	this.dateFromString = orderaccept.prodofferaccept.ProductDateBuilder.getDateFromString;
		                	this.formatDate = orderaccept.prodofferaccept.ProductDateBuilder.getStringTimeFromDate;
		                },
		                postMixInProperties : function() {
		                	
			                this.viewInitData = this.buildViewInitData();
		                },

		                buildViewInitData : function() {
			                var Me = this,
				                key = 'key',
				                prodOfferInstId = $ac$.get("requestParam").prodOfferInstId,
				                mainProdOfferInstVO = $ac$.query("$.userHasProdOfferInfoList[?(@.prodOfferInstId=="
				                        + prodOfferInstId + ")]")[0],
				                prodOfferInfoVO = $ac$.query("$.userHasProdOfferMetaInfoList[?(@.prodOfferId=="
				                        + mainProdOfferInstVO.prodOfferId + ")]")[0],        
				                productInfoObj = $ac$.get("_memberProdInstInfo"),
				                productInfo = productInfoObj.productInfoVO,
				                prodInstVO = productInfoObj.prodInstVO,
				                viewId = key + "-" + prodInstVO.prodInstId;
				            	startDate = Me.formatDate(Me.dateFromString(mainProdOfferInstVO.effDate));
				            	endDate = Me.formatDate(Me.dateFromString(mainProdOfferInstVO.expDate));
							
				            offerTpContext = {
				            	prodOfferInfoVO:prodOfferInfoVO,
				            	prodOfferInstId : mainProdOfferInstVO.prodOfferInstId,
				            	startDate:startDate,
				            	endDate:endDate
				            },
			                tpContext = {
				                "viewId" : viewId,
				                "serviceKind" : productInfo.netType,
				                "productId" : productInfo.productId,
				                "productName" : productInfo.productName,
				                "uniqueId" : util.CommUtils.generateUniqueId(),
				                "serviceId" : prodInstVO.accNbr,
				                "prodInstId" : prodInstVO.prodInstId,
				                "disabledOption" : "DISABLED",
				                "checkedOption" : "CHECKED",
				                 "displayAddSubGroup" : !!$ac$.get("_alreadyMemberProdInst")?"display:none":"display:inline",
				                "displayChangeSubGroup" : !!$ac$.get("_alreadyMemberProdInst")?"display:inline":"display:none"
			                };
			                return {
			                			prodOfferInfoList : [].concat(offerTpContext),
										prodViewData : [].concat(tpContext)
									};
				                
			                
		                }
		                
	                });
	        
        });