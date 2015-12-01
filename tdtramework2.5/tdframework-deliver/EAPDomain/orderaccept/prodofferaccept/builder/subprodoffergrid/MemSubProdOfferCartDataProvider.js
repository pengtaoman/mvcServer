/**
 * 成员订购集团产品，继承可选包方法
 * 
 * @module
 */
defineModule("orderaccept.prodofferaccept.builder.subprodoffergrid.MemSubProdOfferCartDataProvider", [
                "./SubProdOfferCartDataProvider","../../util"], function(SubProdOfferCartDataProvider,util) {
	        
	        dojo.declare("orderaccept.prodofferaccept.builder.subprodoffergrid.MemSubProdOfferCartDataProvider",
	                [SubProdOfferCartDataProvider], {
		                		        /**
		         * 获取当前可选包销售品适用的接入号码的集合
		         */
		        doGetChooseNumList : function(subProdOfferInfo){
		        	var prodvider = this;
		        	var prodBasicList = null;
		        	var relaAccessIdList =relaAccessIdList = [$ac$.get("_memberProdInstInfo").productInfoVO.productId];
		        	var	trs = dojo.query(".main-product-basic", this.controller.memberProdInstWidgetInstance.domNode);
		        	
			        if(prodvider.uniqueId==""||prodvider.uniqueId==-1){
			        	prodBasicList = dojo.filter(trs||[], function(prodBasicTr) {
				        var productId = dojo.attr(prodBasicTr, "productId")
				                || dojo.query("SELECT", prodBasicTr)[0].value;
				        return dojo.some(relaAccessIdList||[], function(productIdInfo) {
					                return productIdInfo == productId;
					                });
				        });
			        }else{
			        	prodBasicList = dojo.filter(trs||[], function(prodBasicTr) {
				        var productId = dojo.attr(prodBasicTr, "productId")
				                || dojo.query("SELECT", prodBasicTr)[0].value;
				        return dojo.some(relaAccessIdList||[], function(productIdInfo) {
					                return productIdInfo == productId;
					                })&&dojo.attr(prodBasicTr, "uniqueId")==prodvider.uniqueId;
				        });
			        }
			        
			        var accessProdBasicTrList = dojo.filter(prodBasicList, function(tr){
			        	return dojo.query(".main-product-check", tr)[0].checked;
			        });
			        var chooseNumberList = dojo.map(accessProdBasicTrList||[], function(prodBasicTr){
			        	var viewId = dojo.attr(prodBasicTr, "viewId");
			        	return {
			        		serviceKind : dojo.attr(prodBasicTr, "serviceKind") || "-1",
			        		serviceKindIndex : dojo.attr(prodBasicTr, "serviceKindIndex") || "-1",
			        		serviceId : dojo.query(".serviceId-" + viewId, prodBasicTr)[0].value,
			        		productId : dojo.attr(prodBasicTr, "productId") || "-1",
			        		uniqueId : dojo.attr(prodBasicTr, "uniqueId")
			        	}
			        });
			        return {
			        	chooseNumberList : chooseNumberList,
			        	allProdBasicList : prodBasicList
			        };     			
		        },
		        showOrderedProdOffer : function(){
		        	if($ac$.get("userHasGroupOfferInfoList").length==0){//订购
		        		var subProdOfferInfo = this.controller.requestParam.memberGroupOfferInfo;
//		        		// 根据个人产品实例ID和集团销售品ID获取已订购的个人集团销售品信息
//			        		param = "method=getAlreadyOrderIndividualOffer&prodInstId="+$ac$.get("_memberProdInstInfo").prodInstVO.prodInstId
//				        	+"&groupProdOfferId="+subProdOfferInfo.prodOfferId, 
//				        	alreadyOrderIndividualOfferInfo = util.ServiceFactory
//				                .getService("url:orderDetailAction.do?" + param);
//				        dojo.mixin(this.controller.requestParam,{"alreadyOrderIndividualOfferInfo" : alreadyOrderIndividualOfferInfo}) ; 

			        	var rowData = util.ProdOfferHelper.createProdOfferRowData(subProdOfferInfo);
				        dojo.mixin(rowData.showData,{chooseNumberObj:
				        	{
				        		serviceKind:$ac$.get("_memberProdInstInfo").productInfoVO.netType,
				        		serviceId:dojo.byId("serviceId").value,
				        		productId:this.controller.requestParam.productId	
				        	}
				        });
			        	rowData.showData.disabledOption = "DISABLED";
			        	this.controller.subProdOfferOrderGrid.add(rowData);
			        	this.setSubGridCssStyle(rowData.showData.prodOfferStyle,rowData.rowIndex);
		        	}else{//已有
		        		var subProdOfferCartDataProvider = this,
				        	keepProdOfferInstList = $ac$.get("userHasGroupOfferInfoList"),
					        //cancelProdOfferInstList = dojo.global.$appContext$.get("cancelProdOfferInstList"+subProdOfferCartDataProvider.uniqueId)||[],
					    	param = {
					    		keepProdOfferInstList :keepProdOfferInstList
					    		//cancelProdOfferInstList : cancelProdOfferInstList
					    	};
					     //清空数据
			        	subProdOfferCartDataProvider.subProdOfferOrderGrid.remove();
					    subProdOfferCartDataProvider.showChgOrderedProdOffer(param);
		        	}
		        },
		        /**
		         * 展示页面上的保留的和退订的销售品信息
		         */
		        showChgOrderedProdOffer : function(param){
		        	var subProdOfferCartDataProvider = this,
			        	keepProdOfferInstList = param.keepProdOfferInstList;
				        //cancelProdOfferInstList = param.cancelProdOfferInstList, 
				        //mainProdOfferInst = param.mainProdOfferInst,
				        //keepProdOfferInstData = [];
				        //cancelProdOfferInstData = [];
//			        dojo.forEach(keepProdOfferInstList||[], function(prodOfferInst){
//			        	if((mainProdOfferInst||dojo.global.$appContext$.get("mainProdOfferInstVO"+subProdOfferCartDataProvider.uniqueId)).prodOfferId != prodOfferInst.prodOfferId){
//			        		keepProdOfferInstData.push(prodOfferInst);
//			        	} 
//			        });
//			        dojo.forEach(cancelProdOfferInstList||[], function(prodOfferInst){
//			        	if((mainProdOfferInst||dojo.global.$appContext$.get("mainProdOfferInstVO"+subProdOfferCartDataProvider.uniqueId)).prodOfferId != prodOfferInst.prodOfferId){
//			        		cancelProdOfferInstData.push(prodOfferInst);
//			        	}
//			        });     
			       	var	keepedProdOfferData = dojo.map(keepProdOfferInstList, function(keepProdOfferInst) {
				                return util.ProdOfferHelper.createKeepProdOfferRowDataForChg(keepProdOfferInst,subProdOfferCartDataProvider.uniqueId||"");
			                });
//			            canceledProdOfferData = dojo.map(cancelProdOfferInstData, function(cancelProdOfferInst) {
//				                return util.ProdOfferHelper.createCancelProdOfferRowDataForChg(cancelProdOfferInst,subProdOfferCartDataProvider.uniqueId||"");
//			                });
					dojo.forEach(keepedProdOfferData, function(rowData){
						 dojo.mixin(rowData.showData,{chooseNumberObj:
								        	{
								        		serviceKind:$ac$.get("_memberProdInstInfo").productInfoVO.netType,
								        		serviceId:dojo.byId("serviceId").value,
								        		productId:subProdOfferCartDataProvider.controller.requestParam.productId	
								        	}
								        });
						subProdOfferCartDataProvider.subProdOfferOrderGrid.add(rowData);
						subProdOfferCartDataProvider.setSubGridCssStyle(rowData.showData.prodOfferStyle,rowData.rowIndex);
					});
		        },
	
		        /**
				 * 获取页面数据(保存订单前使用)
				 */
		        saveSubProdOfferViewData : function() {
			        pageData = {};
			        var subProdOfferCartDataProvider = this;
			        var bindingData = this.subProdOfferOrderGrid.ds.getRawData();
			        var subProdOfferOrderGrid = this.subProdOfferOrderGrid.domNode;
			        dojo.forEach(bindingData||[], function(oneBindingData) {
				                var rowIndex = oneBindingData.showData.rowIndex;
				                var viewId = oneBindingData.showData.viewId;
				                var delayTime = null;
				                var delayUnit = null;
				                var validPeriod = null;
				                var validType = null;
				                var delayEndDate = null;
				                var delayUnorderUnit = null;
				                var delayUnorderTime = null;
				                var subProdOfferDetailDiv = dojo.query(".subProdOfferDetail-"
				                                + rowIndex, subProdOfferOrderGrid)[0];
				                var subProdOfferStartDateDiv = dojo.query(".subProdOfferStartDate-"
				                                + rowIndex, subProdOfferOrderGrid)[0];
				                var chooseStartDateParentNode = dojo.query(
				                        ".productStartDateStyle", subProdOfferStartDateDiv)[0];
				                var subProdOfferEndDateDiv = dojo.query(".subProdOfferEndDate-"
				                                + rowIndex, subProdOfferOrderGrid)[0];
				                var chooseEndDateParentNode = dojo.query(".productEndDateStyle",
				                        subProdOfferEndDateDiv)[0];
				                var chooseCycleEndDateParentNode = dojo.query(".offerEndDateCycleStyle",
				                        subProdOfferEndDateDiv)[0];
				                var chooseNumberDiv = dojo.query(
				                        ".choose_number_class_" + rowIndex, subProdOfferOrderGrid)[0];
				                if (chooseStartDateParentNode
				                        && chooseStartDateParentNode.style.display != "none") {
					                if (dojo.query("[id='delayTime-" + viewId + "']",
					                        subProdOfferStartDateDiv)[0]) {
						                delayTime = dojo.query("[id='delayTime-" + viewId + "']",
						                        subProdOfferStartDateDiv)[0].value;
					                }
					                if (dojo.query("[id='delayUnit-" + viewId + "']",
					                        subProdOfferStartDateDiv)[0]) {
						                delayUnit = dojo.query("[id='delayUnit-" + viewId + "']",
						                        subProdOfferStartDateDiv)[0].value;
					                }
				                }
				                if (chooseEndDateParentNode
				                        && chooseEndDateParentNode.style.display != "none") {
					                if (dojo.query("[id='validPeriod-" + viewId + "']",
					                        subProdOfferEndDateDiv)[0]) {
						                validPeriod = dojo.query("[id='validPeriod-" + viewId
						                                + "']", subProdOfferEndDateDiv)[0].value;
					                }
					                if (dojo.query("[id='validType-" + viewId + "']",
					                        subProdOfferEndDateDiv)[0]) {
						                validType = dojo.query("[id='validType-" + viewId + "']",
						                        subProdOfferEndDateDiv)[0].value;
					                }
				                }else if(chooseCycleEndDateParentNode&& chooseEndDateParentNode.style.display != "none"){
				                	if (dojo.query("[id='cyclePeriod-" + viewId + "']",
					                        subProdOfferEndDateDiv)[0]) {
						                var result = dojo.query("[id='cyclePeriod-" + viewId
						                                + "']", subProdOfferEndDateDiv)[0].value;
						                var cycleResult = result.split("~");
						                validPeriod = cycleResult[0];
						                validType = cycleResult[1];
					                }
				                }
				                if(!subProdOfferDetailDiv.childNodes[0].checked&&oneBindingData.prodOfferInst!=null){
//				                	if (dojo.query("[id='endDateDelayUnit-" + viewId + "']",
//					                        subProdOfferEndDateDiv)[0]) {
//						                delayEndDate = dojo.query("[id='endDateDelayUnit-" + viewId
//						                                + "']", subProdOfferEndDateDiv)[0].value;
//					                }
				                	var offerDelayEndDateViewDiv = dojo.query("[id='offerDelayEndDateView-" + viewId + "']",
					                        subProdOfferEndDateDiv)[0];
									if (offerDelayEndDateViewDiv) {
						                if(offerDelayEndDateViewDiv.style.display==""){
					                        //取下拉框数据
					                        if(dojo.query('.prodDelayEndDateStyle',offerDelayEndDateViewDiv)[0].style.display==""){
					                        	delayUnorderTime = dojo.query("[id='delayEndTime-" + viewId + "']",subProdOfferEndDateDiv)[0].value;
					                        	delayUnorderUnit = dojo.query("[id='endDateDelayUnit-" + viewId + "']",subProdOfferEndDateDiv)[0].value;
					                        //取计算完的时间
					                        }else{
					                        	delayEndDate = dojo.trim(dojo.query(".delay_date_class",subProdOfferEndDateDiv)[0].innerHTML)
					                        }
					                    }
					                }				                	
				                }
				                var serviceKind = dojo.attr(chooseNumberDiv.childNodes[0],"serviceKind");
				                var serviceKindIndex = dojo.attr(chooseNumberDiv.childNodes[0],"serviceKindIndex");
				                subProdOfferCartDataProvider.pageData[rowIndex] = {
					                "checkBoxValue" : subProdOfferDetailDiv.childNodes[0].checked,
					                "delayTime" : delayTime,
					                "delayUnit" : delayUnit,
					                "validPeriod" : validPeriod,
					                "validType" : validType,
					                "orderSatus" : dojo.query(".orderStatus_" + rowIndex,
					                        subProdOfferOrderGrid)[0].innerHTML,
					                "serviceKindIndex" : serviceKindIndex,
					                "serviceKind" : serviceKind,
					                "beginDate" : dojo.trim(dojo.query(".start_date_class",
					                        subProdOfferStartDateDiv)[0].innerHTML),
					                "endDate" : delayEndDate!=null?delayEndDate:dojo.trim(dojo.query(".end_date_class",
					                        subProdOfferEndDateDiv)[0].innerHTML),
					                "delayUnorderUnit" : delayUnorderUnit,
					                "delayUnorderTime" : delayUnorderTime,
					                "prodOfferName" : oneBindingData.showData.prodOfferName,
					                "prodOfferId" : oneBindingData.subProdOfferInfo.prodOfferId
				                };
			                });
		        },
		        dealTimeDisplayByChgMain : function(rowData){
		        
		        },
		        /**
		         * 添加一行
		         */
		        addOneRow : function(rowData){
		        	var _provider = this;
		        	
		        	rowData.uniqueId = _provider.uniqueId;
		        	//添加一行事件
		        	_provider.subProdOfferOrderGrid.add(rowData);
			        //针对销售品的选中后的特殊处理(如升速处理等等)
			        _provider.dealRaiseXDSLSpeed(rowData.subProdOfferInfo,rowData.showData.chooseNumberObj,true,rowData);
			        _provider.setSubGridCssStyle(rowData.showData.prodOfferStyle,rowData.rowIndex);
			        _provider.dealTimeDisplayByChgMain(rowData);
			        //_provider.setPortSpeedSubProdOfferTime(rowData);
		        }
	        });
	        
        });