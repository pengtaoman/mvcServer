BusCard.define('/orderaccept/attrapp/attr_prod_300000.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	dojo.require("orderaccept.prodofferaccept.util");
	var _targetDom = Me.$("300000");
	if (!_targetDom) { return false; }
	var userTypeChang = function(param) {
		if(!param){
			if(orderaccept.prodofferaccept.util.ProdOfferHelper.judgeByWideAttrParamValue(Me.$('300000'),Me.$('100542'),Me.$('100081'))== false){
	   			 var tips = "\u5f53\u524d\u901f\u7387\u4e0e\u7528\u6237\u7c7b\u578b\u548c\u627f\u8f7d\u65b9\u5f0f\u4e0d\u5339\u914d\uff0c\u4f1a\u5f71\u54cd\u65bd\u5de5,\u8bf7\u91cd\u65b0\u9009\u62e9\u901f\u7387!";
	   			 orderaccept.common.dialog.MessageBox.alert({
					message: tips
				});
	   		}
		}
		try {
			/*add by zhuguojun 20121121 政企协议转订单时，不考虑用户类型对周价的影响，以协议为准 start*/
			if($ac$.requestParam.actionCD != orderaccept.prodofferaccept.util.ActionCDConst.PROTOCOL_ACCEPT){
				return;
			}
			/*add by zhuguojun 20121121 政企协议转订单时，不考虑用户类型对周价的影响，以协议为准 end*/
			var uniqueId = null;
			var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
			//区分自主版和非自主版,e9共享版不支持
			if($ac$.selectedMainProdOfferInfoVO.bindType == 2){
				var parentDom = dijit.getEnclosingWidget(Me.getParent().dom);
				var model = parentDom.getModel();
				uniqueId = model.cardParam.uniqueId;
				//alert(uniqueId);
				var threeValues = getThreeValues(uniqueId);	
				var subProdOfferOrderProviderMap = prodOfferAcceptLoader.multipleSubProdOfferHandler.subProdOfferOrderProviderMap;
				var targetProdvider = null;
				for(var key in subProdOfferOrderProviderMap){
					if (!subProdOfferOrderProviderMap.hasOwnProperty(key)) {
				        continue;
			        }
		    		if(key == ("subProdOfferTreeContainer"+uniqueId)){
						targetProdvider = subProdOfferOrderProviderMap[key];
						break;
		    		}
				}
				var targetDom = targetProdvider.prodOfferInfoWidget.mainProdOfferDetailWidget.prodOfferAttrCard.busCardInstance.$('300003');
				if(threeValues!=null&&threeValues!=""){
					//targetDom.value =  threeValues.defaultValue;
					targetDom.value = "";
				}
				if(!param){
//					var tipName = targetProdvider.prodOfferInfoWidget.prodOfferInfoVO.prodOfferName;
					//alert("周期价格已设置成所选用户类型规定的默认值,请点击["+tipName+"]的销售品详情进行确认！");
//					orderaccept.common.dialog.MessageBox.alert({
//										busiCode : "08410235",
//										infoList : [tipName]
//									});
				}
			}else{
				var mainProdOfferWidget = prodOfferAcceptLoader.mainProdOfferWidget;
				if(!!mainProdOfferWidget){
					var prodBasicTRs = dojo.query(".main-product-basic",mainProdOfferWidget.domNode);
					if((!prodBasicTRs)||prodBasicTRs.length ==0){
						return;
					}
					//直接取第一个
					uniqueId = dojo.attr(prodBasicTRs[0],"uniqueId");
				}
				if (dojo.getObject("prodOfferAcceptLoader.mainProdOfferDetailWidget.prodOfferAttrCard.busCardInstance") != null) {
					var pricObj = prodOfferAcceptLoader.mainProdOfferDetailWidget.prodOfferAttrCard.busCardInstance
					        .$("300003");
					if (pricObj&&pricObj != null) {
						var priceValue = pricObj.value;
//						if(priceValue!=null&&priceValue!=""){
//							return;
//						}
						var threeValues = getThreeValues(uniqueId);
						if(threeValues!=null&&threeValues!=""){
							//pricObj.value = threeValues.defaultValue;
							pricObj.value = "";
						}
						if(!param){
							//alert("周期价格已设置成所选用户类型规定的默认值,请点击["+$ac$.selectedMainProdOfferInfoVO.prodOfferName+"]的销售品详情进行确认！");
//							orderaccept.common.dialog.MessageBox.alert({
//										busiCode : "08410235",
//										infoList : [$ac$.selectedMainProdOfferInfoVO.prodOfferName]
//									});
						}
						/*if (priceValue == "") {
							// alert("周价为空!将设置成所选用户类型规定的默认值。");
							pricObj.value = threeValues.defaultValue;
						} else {
							if (priceValue > threeValues.maxValue || priceValue < threeValues.minValue) {
								alert("周价超出产品所属用户类型的范围!将设置成所选用户类型规定的默认值。");
								pricObj.value = threeValues.defaultValue;
							}
						}*/
					}
				}
			}
		}
		catch (e) {
			if (window.console && window.console.warn) {
				window.console.warn("warn in /orderaccept/attrapp/attr_prod_300000.js:" + e.message);
			}
		}
	};
	var getThreeValues = function(uniqueId) {
		var maxValue = "",
			minValue = "",
			defValue = "";
		var serviceCardWidgetMap = prodOfferAcceptLoader.serviceCardWidgetMap, serviceCardWidget;
		for (var p in serviceCardWidgetMap) {
			if (!serviceCardWidgetMap.hasOwnProperty(p)) {
			        continue;
		        }
	    		if(p == ("serviceCardWidget_"+uniqueId)){
					serviceCardWidget = serviceCardWidgetMap[p];
					break;
	    		}
		}
		// var attrList =
		// serviceCardWidget.attrCardWidget.productInfoVO.attrList;
		var busCardInstance = serviceCardWidget.busCardInstance;
		var attrCardWidgetModel = dijit.getEnclosingWidget(busCardInstance.getChildren()[0].dom);
		var attrList = attrCardWidgetModel.productInfoVO.attrList;
		for (var i = 0; i < attrList.length; i++) {
			if (attrList[i].attrCd == "300000") {
				for (var j = 0; j < attrList[i].attrValueList.length; j++) {
					if (attrList[i].attrValueList[j].attrValue == Me.$("300000").value) {// 所选类型
//						if(attrList[i].valueUnit == orderaccept.prodofferaccept.util.AttrUnitConst.unitConst){
//							maxValue = attrList[i].attrValueList[j].maxValue;
//							minValue = attrList[i].attrValueList[j].minValue;
//							defValue = attrList[i].attrValueList[j].defaultValue;
//						}else if(attrList[i].valueUnit == orderaccept.prodofferaccept.util.AttrUnitConst.minuteConst){
//							maxValue = (attrList[i].attrValueList[j].maxValue)/100;
//							minValue = (attrList[i].attrValueList[j].minValue)/100;
//							defValue = (attrList[i].attrValueList[j].defaultValue)/100;
//						}
						maxValue = attrList[i].attrValueList[j].maxValue;
						minValue = attrList[i].attrValueList[j].minValue;
						defValue = attrList[i].attrValueList[j].defaultValue;
						break;
					}
				}
				break;
			}
		}
		return {
			maxValue : maxValue,
			minValue : minValue,
			defaultValue : defValue
		}
	}
	Me.$("300000").onchange = userTypeChang;
	var uniqueId = null;
	var ifChangeMainFlag = false;
	var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
	if($ac$.selectedMainProdOfferInfoVO.bindType == 2){
		var parentDom = dijit.getEnclosingWidget(Me.getParent().dom);
		var model = parentDom.getModel();
		uniqueId = model.cardParam.uniqueId;
		var targetSelectMem = dojo.filter(selectedMemberProdOfferList||[],function(_data){
			return _data.uniqueId == uniqueId;
		});
		if(targetSelectMem.length>0){
			if(!!(targetSelectMem[0].offerInstVO)){
    			//说明是主销售品变更
    			if(targetSelectMem[0].offerInstVO.prodOfferId != targetSelectMem[0].prodOfferId){
    				ifChangeMainFlag = true;
    			}
    		}
		}
		if((targetSelectMem&&targetSelectMem[0]&&targetSelectMem[0].action == "new")||ifChangeMainFlag){
			userTypeChang(true);
		}
	}else{
		var mainProdOfferWidget = prodOfferAcceptLoader.mainProdOfferWidget;
		if(!!mainProdOfferWidget){
			var prodBasicTRs = dojo.query(".main-product-basic",mainProdOfferWidget.domNode);
			if((!prodBasicTRs)||prodBasicTRs.length ==0){
				return;
			}
			//直接取第一个
			uniqueId = dojo.attr(prodBasicTRs[0],"uniqueId");
		}
		var targetSelectMem = dojo.filter(selectedMemberProdOfferList||[],function(_data){
			return _data.uniqueId == uniqueId;
		});
		if(targetSelectMem.length>0){
			if(!!(targetSelectMem[0].offerInstVO)){
    			//说明是主销售品变更
    			if(targetSelectMem[0].offerInstVO.prodOfferId != targetSelectMem[0].prodOfferId){
    				ifChangeMainFlag = true;
    			}
    		}
		}
		if((targetSelectMem&&targetSelectMem[0]&&targetSelectMem[0].action == "new")||ifChangeMainFlag){
			userTypeChang(true);
		}
	}
	        };
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	        /**
	         * 综合查询页面处理分支
	         * @method
	         */
	        var allInfoQueryPageDispatch = function() {};
	        /**
	         * 二次业务处理分支
	         * @method
	         */
	        var secondBusinessPageDispatch = function() {
	            var Me=this;
	            var oldValue=Me.$("300000").value;
	            if( Me.$("300000")){
		            Me.$("300000").onchange=function(){
		              var executeRequest=_buscard.executeRequest;
		              var param = "prodInstId="+$("userId").value+"&productId="+$("productId").value+"&attrId=300000&attrValue="+Me.$("300000").value;
	                  var result = executeRequest("secondAcceptAjaxAction", "ifChangeUserKind", param);
	                  var arr = result.split("~");
	                  if(arr[0]==-1){
	                    alert(arr[1]);
	                    Me.$("300000").value=oldValue;
	                    return false;
	                  }
	                }
	            }
	        };
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {};
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
