BusCard.define('/orderaccept/attrapp/attr_offer_300003.js',function(_buscard,cardParam){ 
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	dojo.require("orderaccept.prodofferaccept.util");
	
	//变更的时候判断工号是否有权限更改周价 begin
//	var uniqueId = "";
//	if($ac$.selectedMainProdOfferInfoVO.bindType == 2){
//		var multipleMainProdOfferWidget =orderaccept.prodofferaccept.util.DomHelper.
//							getParentWidget(Me.$("300003"),"unieap.layout.ContentPane");
//			uniqueId = multipleMainProdOfferWidget.uniqueId;			
//	}else{
//		var mainProdOfferWidget = prodOfferAcceptLoader.mainProdOfferWidget;
//		if(!!mainProdOfferWidget){
//			var prodBasicTRs = dojo.query(".main-product-basic",mainProdOfferWidget.domNode);
//			if((!prodBasicTRs)||prodBasicTRs.length ==0){
//				return;
//			}
//			//直接取第一个
//			uniqueId = dojo.attr(prodBasicTRs[0],"uniqueId");
//		}
//	}
//	var targetSelectMem = dojo.filter($ac$.selectedMemberProdOfferList||[],function(_data){
//		return _data.uniqueId == uniqueId;
//	})[0];
//	if(targetSelectMem.offerInstVO&&targetSelectMem.offerInstVO.prodOfferId==targetSelectMem.prodOfferId){
//		var omflag = BusCard.$remote("powerBO").hasAttrSpecRight(BusCard.$session.staffId,"300003");
//		if(!eval(omflag)){
//			Me.$("300003").disabled=true;
//		}
//	}
	var oldValue = Me.$("300003").value;
	Me.$("300003").onchange = function(){
		if(!!oldValue && oldValue != Me.$("300003").value){
			Me.$("300003").title = "原周价为：" + oldValue;
		}
		else{
			Me.$("300003").title = "";
		}
	}

	//变更的时候判断工号是否有权限更改周价 end
	Me.$("300003").onblur = function(){
		var currentValue = Me.$("300003").value;
		if(currentValue==""){
			return;
		}
		if(!/^\d+(\.\d+)?$/.test(currentValue)){
			orderaccept.common.dialog.MessageBox.alert({
				message:"请输入正确的价格！"
			});
			Me.$("300003").value="";
			return false;
		}
		Me.$("300003").value = parseFloat(Me.$("300003").value,10);
		var uniqueId = "";
		//判断当前受理的销售品的类别，区分e9自主版和非e9自主版
		if($ac$.selectedMainProdOfferInfoVO.bindType == 2){
			var multipleMainProdOfferWidget =orderaccept.prodofferaccept.util.DomHelper.
								getParentWidget(Me.$("300003"),"orderaccept.custom.TooltipDialog");
				uniqueId = multipleMainProdOfferWidget.rowData.showData.chooseNumberObj.uniqueId;			
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
		}
		
		var serviceCardWidgetMap =  prodOfferAcceptLoader.serviceCardWidgetMap,
		    serviceCardWidget;
	    	for(var p in serviceCardWidgetMap){
	    		if (!serviceCardWidgetMap.hasOwnProperty(p)) {
			        continue;
		        }
	    		if(p == ("serviceCardWidget_"+uniqueId)){
					serviceCardWidget = serviceCardWidgetMap[p];
					break;
	    		}
			}
			var attrList = serviceCardWidget.attrCardWidget.productInfoVO.attrList;
			for (var i=0;i<attrList.length;i++){
			 	if(attrList[i].attrCd=="300000"){
			 		for(var j=0;j<attrList[i].attrValueList.length;j++){
			 			if(attrList[i].attrValueList[j].attrValue==
			 					serviceCardWidget.attrCardWidget.busCardInstance.$("300000").value){//所选类型
			 				var maxValue = attrList[i].attrValueList[j].maxValue,
			 					minValue = attrList[i].attrValueList[j].minValue;
			 				//if(attrList[i].valueUnit == orderaccept.prodofferaccept.util.AttrUnitConst.unitConst){
			 					if(currentValue>maxValue||currentValue<minValue){
									//alert("周价超出产品所属用户类型的范围("+minValue+"~"+maxValue+")!");
			 						orderaccept.common.dialog.MessageBox.alert({
										busiCode : "08410234",
										infoList : [minValue+"",maxValue+""]
									});
									Me.$("300003").value="";
								}
			 				//}else if(attrList[i].valueUnit == orderaccept.prodofferaccept.util.AttrUnitConst.minuteConst){
			 					//if(currentValue>(parseInt(maxValue)/100)||currentValue<(parseInt(minValue)/100)){
									//alert("周价超出产品所属用户类型的范围("+(parseInt(minValue)/100)+"~"+(parseInt(maxValue)/100)+")!");
									//Me.$("300003").value="";
								//}
//			 				}else{
//			 					alert("用户类型单位配置错误");
//			 				}
			 				break;
			 			}
			 		}
			 		break;
				}
			}
	};
	//处理加载顺序导致的问题
	var dealCurrentAttr = function(){
		if(Me.$("300003").value == ""){
			if($ac$.selectedMainProdOfferInfoVO.bindType == 2){
				var multipleMainProdOfferWidget =orderaccept.prodofferaccept.util.DomHelper.
									getParentWidget(Me.$("300003"),"unieap.layout.ContentPane");
					uniqueId = multipleMainProdOfferWidget.uniqueId;			
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
			}
	 		var serviceCardWidgetMap =  prodOfferAcceptLoader.serviceCardWidgetMap,
			    serviceCardWidget;
		    	for(var p in serviceCardWidgetMap){
		    		if (!serviceCardWidgetMap.hasOwnProperty(p)) {
				        continue;
			        }
		    		if(p == ("serviceCardWidget_"+uniqueId)){
						serviceCardWidget = serviceCardWidgetMap[p];
						break;
		    		}
				}
				if(!serviceCardWidget){
					return;
				}
				
			}
	};
	dealCurrentAttr();
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
	        var secondBusinessPageDispatch = function() {};
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {
			        
				var Me = this;
				Me.$("300003").onblur = function(){
					var currentValue = Me.$("300003").value;
					if(currentValue==""){
						return;
					}
					if(!/^\d+(\.\d+)?$/.test(currentValue)){
						orderaccept.common.dialog.MessageBox.alert({
							message:"请输入正确的价格！"
						});
						Me.$("300003").value="";
						return false;
					}
				}
	        };
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
