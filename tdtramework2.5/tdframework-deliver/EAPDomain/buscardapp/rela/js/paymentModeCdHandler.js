BusCard.define('/buscardapp/rela/js/paymentModeCdHandler.js', function(_buscard, cardParam) {
	        var Me = this;
	        var paymentModDom = Me.$("paymentModeCd");
			var requestParam = $ac$.get("requestParam");
	        Me.serviceRelation = Me.getCardRelationInfo();
	        if($ac$.get("orderChangeFlag")== 1){
				 var selectedMemb = dojo.filter($ac$.get("selectedMemberProdOfferList")||[], function(memb) {
		                return memb.uniqueId == cardParam.uniqueId;
		            })[0];	            
	            if(!!selectedMemb){
	            	//获取产品订单项
	            	Me.serviceRelation = selectedMemb.prodItemVO;
	            }
	        }
			var util = dojo.require("orderaccept.prodofferaccept.util");
	        var ConstantsPool = dojo.require("orderaccept.common.js.ConstantsPool");
			var PaymentModeConst = ConstantsPool.load("PaymentModeConst").PaymentModeConst;	
			var selectedMemberList = $ac$.get("selectedMemberProdOfferList");
			var serviceCardWidget = dijit.getEnclosingWidget(Me.dom);
			var mainProdOfferWidget = null;
			var uniqueId = "";
			var prodBasicTr = null;
			if(Me.dom && Me.dom.parentNode){
				mainProdOfferWidget = dijit.getEnclosingWidget(Me.dom.parentNode);
			}
			if(!!serviceCardWidget && serviceCardWidget.cardParam){
				uniqueId = serviceCardWidget.cardParam.uniqueId;
			}
			if(!!mainProdOfferWidget && !!uniqueId){
				prodBasicTr = dojo.query("[uniqueId=" + uniqueId + "]", mainProdOfferWidget.domNode)[0];
			}
			var selectedMember = dojo.filter(selectedMemberList,function(selectedMember){
									return selectedMember.uniqueId == uniqueId;
								})[0];
			var noChange = false;
			if(!!selectedMember && selectedMember.action == "nochange"){
				noChange = true;
			}
			var newProdOfferVO = util.ProdOfferHelper.getMainProdOffer($ac$.get("prodOfferList"))[0] || $ac$.get("prodOfferList")[0];	
	        if(!!Me.serviceRelation){
	        	var serviceRelationVO = Me.serviceRelation;
	        	if((!$ac$.get("orderChangeFlag") || $ac$.get("orderChangeFlag")!= 1)
	        				&& !!serviceRelationVO && !!(Me.serviceRelation.userId > 0)){	        	
		       	    serviceRelationVO = _buscard.$remote("prodInstCommFacadeBO").getServiceRelationByProperties({
			               	     					userId : Me.serviceRelation.userId
		                    				})[0];
	        	}
	        	var serviceKind = prodBasicTr.getAttribute("serviceKind");
	        	//如果是可选包变更，则展现实例的计费方式
	        	//如果是新装或变更主销售品，则展现新的主销售品对应的计费方式,规则如下：
	        	//OCS计费则为预付费；HB计费：如果是CDMA,则默认准实时预付费,其他则默认后付费
	        	//客户要求：按老系统，所有均默认为准时时尚
	        	var paymentModeCd = (Me.serviceRelation.userId > 0)?serviceRelationVO.billMode:
	        										(newProdOfferVO.feeType == PaymentModeConst.PREPAID?PaymentModeConst.PREPAID:
	        												PaymentModeConst.REAL_PREPAID
	        										);
	        	var removeOptions = [];
	        	dojo.forEach(paymentModDom.options,function(option){
	        		//后付费与预付费，不能相互变更
	        		if((paymentModeCd == PaymentModeConst.PREPAID && option.value != PaymentModeConst.PREPAID)
	        				||((paymentModeCd == PaymentModeConst.POSTPAID || paymentModeCd == PaymentModeConst.REAL_PREPAID) 
	        						&& option.value == PaymentModeConst.PREPAID)){
	        			removeOptions.push(option);
	        		}
	        	});
	        	dojo.forEach(removeOptions,function(option){	        	
        			paymentModDom.remove(option.index);
	        	});
                var op = document.createElement("option");
                op.value='';
                op.text='\u8bf7\u9009\u62e9';
                paymentModDom.options.add(op,0);
	        	Me.$("paymentModeCd").value = (Me.serviceRelation.userId > 0)?serviceRelationVO.billMode:"";
	        	if(!noChange){
		        	var paymentOption = dojo.filter(paymentModDom.options,function(option){
						        		return paymentModeCd == option.value;
					        		})[0];
	        		if(!paymentOption){
	        			 Me.$("paymentModeCd").value = "";
	        		}
	        	}
	        }
        });
