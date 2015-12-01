defineModule("orderaccept.prodofferaccept.widget.manageaccnbrwidget.ManageAccNbrWidget", [
                "orderaccept.custom.TooltipDialog","orderaccept.common.js.ConstantsPool"], function(TooltipDialog,ConstantsPool) {
	        
	        /**
			 * 
			 * 
			 * @class
			 * @requires ["orderaccept.custom.TooltipDialog"]
			 * @module orderaccept.prodofferaccept.widget.manageaccnbrwidget.ManageAccNbrWidget
			 */
	        dojo.declare("orderaccept.prodofferaccept.widget.manageaccnbrwidget.ManageAccNbrWidget", [TooltipDialog], {
	        	constructor : function(){
		        	this.inherited(arguments);	        	
	        		this.chooseNumberList = [];
	        	},	        	
		        postscript : function(){
		        	this.inherited(arguments);
		        	var Me = this;
					dojo.require("orderaccept.prodofferaccept.util");
					var customerData =function(){
						return dojo.global.$appContext$.get("requestParam").customerData;
					}();
					var custId = customerData.custId;
					var cityCode = customerData.cityCode;
					var tempNbrInfoList = [];
					var instNbrInfoLit = [];
					if(!dojo.global.$appContext$.get("pstnPlusCdmaNbrMap")){
						var cdmaServiceKind = ConstantsPool.load(["ServiceKindCDConst"]).ServiceKindCDConst.CDMA_SERVICE_KIND;
						var pstnServiceKind = ConstantsPool.load(["ServiceKindCDConst"]).ServiceKindCDConst.PSTN_SERVICE_KIND;
						// 在途的号码
						var tempPstnInfoList = BusCard.$remote("accessProdItemInfoDAO").selectByProperties({customerId:custId,serviceOfferId:301,serviceKind:pstnServiceKind,cityCode:cityCode});
						var tempCdmaInfoList =BusCard.$remote("accessProdItemInfoDAO").selectByProperties({customerId:custId,serviceOfferId:301,serviceKind:cdmaServiceKind,cityCode:cityCode});
						// 实例号码
						var instPstnInfoList = BusCard.$remote("serviceRelationDAO").query({customerId:custId,serviceKind:pstnServiceKind,ifValid:1,cityCode:cityCode});
						var instCdmaInfoList = BusCard.$remote("serviceRelationDAO").query({customerId:custId,serviceKind:cdmaServiceKind,ifValid:1,cityCode:cityCode});
						
						//合并临时号码到一个集合中
						Array.prototype.push.apply(tempNbrInfoList,tempPstnInfoList);
						Array.prototype.push.apply(tempNbrInfoList,tempCdmaInfoList);
						
						//合并实例号码到一个集合中
						Array.prototype.push.apply(instNbrInfoLit,instPstnInfoList);
						Array.prototype.push.apply(instNbrInfoLit,instCdmaInfoList);
						var pstnPlusCdmaNbrMap = {};
						pstnPlusCdmaNbrMap.tempNbrInfoList = tempNbrInfoList;
						pstnPlusCdmaNbrMap.instNbrInfoLit = instNbrInfoLit;
						dojo.global.$appContext$.set("pstnPlusCdmaNbrMap",pstnPlusCdmaNbrMap);
					}else{
						tempNbrInfoList = dojo.global.$appContext$.get("pstnPlusCdmaNbrMap").tempNbrInfoList;
						instNbrInfoLit = dojo.global.$appContext$.get("pstnPlusCdmaNbrMap").instNbrInfoLit;
					}
					this.chooseNumberList = this.chooseNumberList.concat(tempNbrInfoList);
					this.chooseNumberList = this.chooseNumberList.concat(instNbrInfoLit);
					this.chooseNumberList = this.chooseNumberList.concat(this.getCurrentNbrInfoList());
					//过滤掉重复的记录
					this.filterNumList();
			        var renderHtml = "<div class='buscard-root' style='display:block'>\
										 <div class='buscard-legend'>\
											<span class='buscard-legend-img'></span>\
											<span class='buscard-legend-text' id='buscard-name'>管理账号选择</span>\
										 </div>\
										 <div class='buscard-content'>\ ";
					var index = 1;
					
			        dojo.forEach(this.chooseNumberList,function(numInfo){
			        	var subChosenHtml = "";
			        	if(index % 2 == 1){			        		
							renderHtml += "<div class='buscard-row'>";
			        	}
//			        	var subProdOfferInfo = dojo.filter(subBindingInfo,function(data){		        		
//	       					var showData = data.showData,
//		       				    chooseNumberObj = showData.chooseNumberObj,
//		       			        serviceKind = chooseNumberObj.serviceKind,
//		       			        serviceKindIndex = chooseNumberObj.serviceKindIndex;
//		       			        return serviceKind == numInfo.serviceKind && serviceKindIndex == numInfo.serviceKindIndex;
//			        	});
//			        	if(subProdOfferInfo && subProdOfferInfo.length > 0){
//			        		subChosenHtml = " checked='checked' disabled=true ";
//			        	}
						renderHtml +=" <span>\
										<input type='radio' class='manageAccNumBox' id='manageAccNumBox' "+subChosenHtml+"\
											name='manageAccNumBox' value='" + numInfo.serviceId + "' userId='" + numInfo.userId + "' \
											serviceKind='"+numInfo.serviceKind+"' serviceKindIndex='"+numInfo.serviceKindIndex+"' \
											uniqueId ='"+numInfo.uniqueId+"' defaultNumber='"+numInfo.serviceId+"' productId='"+numInfo.productId+"' />:\
										<input type='text' disabled='disabled'  value='" + numInfo.serviceId + "' /> \
									</span>"
			        	if(index % 2 == 0){			        		
							renderHtml += "</div>";
			        	}
			        	index++;
			        });
					renderHtml += "</div></div>";
			        dojo.place(renderHtml, this.containerNode, "last");
			        var commitButton = "<div style='text-align:center;vertical-align:middle'><a href='javascript:void(0);' dojoAttachEvent='onclick:elementclick'\
			        		dojoAttachTopic='/manageAccNumBtn' toolTipId='"+this.id+"' style='text-align:center;vertical-align:middle;'>确定</a></div>";	
			        dojo.place(commitButton, this.containerNode, "last");
				    this.enableEvtMsgPropagation(this.containerNode);
		        },
		        getCurrentNbrInfoList : function(){
		        	var currentNbrInfoList =[];
	        		try{
						if(!prodOfferAcceptLoader){
							return currentNbrInfoList;
						}
					}catch(e){
						return currentNbrInfoList;
					}
					if(prodOfferAcceptLoader.mainProdOfferWidget == null){
						return currentNbrInfoList;
					}
					var trs = dojo.query(".main-product-basic", prodOfferAcceptLoader.mainProdOfferWidget.domNode);
					dojo.forEach(trs,function(prodBasicTr){
						//if(dojo.attr(prodBasicTr, "serviceKind") == 8 || dojo.attr(prodBasicTr, "serviceKind") ==10){
							var obj = {};
							var viewId = dojo.attr(prodBasicTr, "viewId");
							obj.serviceId = dojo.query(".serviceId-" + viewId, prodBasicTr)[0].value;
							obj.uniqueId = dojo.attr(prodBasicTr, "uniqueId");
							obj.serviceKind = dojo.attr(prodBasicTr, "serviceKind");
							obj.serviceKindIndex = dojo.attr(prodBasicTr, "serviceKindIndex");
							obj.productId = dojo.attr(prodBasicTr, "productId") || "-1",
							currentNbrInfoList.push(obj);
						//}
					});
					return currentNbrInfoList;
	        	},
	        	/**
	        	 * 过滤掉重复的号码
	        	 */
	        	filterNumList : function(){
	        		if(this.chooseNumberList.length==1){
	        			return;
	        		}
	        		var newChooseNumList = [];
	        		dojo.forEach(this.chooseNumberList||[], function(chooseNumberInfo){
	        			if(!dojo.some(newChooseNumList||[],function(newChooseNumInfo){return newChooseNumInfo.serviceId == chooseNumberInfo.serviceId})){
	        				newChooseNumList.push(chooseNumberInfo);
	        			}
	        		});
	        		this.chooseNumberList=newChooseNumList;
	        	}
	        });
	        
        });