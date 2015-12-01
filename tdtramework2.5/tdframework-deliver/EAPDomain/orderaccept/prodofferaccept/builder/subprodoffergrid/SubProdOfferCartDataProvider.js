defineModule("orderaccept.prodofferaccept.builder.subprodoffergrid.SubProdOfferCartDataProvider", [
                "../../util",
                "orderaccept.common.js.ConstantsPool",
                "../prodofferdetail.ProdOfferDetailBuilder"], function(
                util, ConstantsPool, ProdOfferDetailBuilder) {
	        /**
			 * 定义可选包购物车数据处理的类
			 * 
			 * @class
			 * @extends
			 */
	        dojo.declare("orderaccept.prodofferaccept.builder.subprodoffergrid.SubProdOfferCartDataProvider", [], {
		       	
		        controller : null,
		        
		        subProdOfferOrderGrid : null,
		        
		        pageData : {},
	        	
		        constructor : function(controller,uniqueId,contentPane) {
		        	//loader对象
			        this.controller = controller;
			        //当前对应的可选包表格对象
			        this.subProdOfferOrderGrid = unieap.byId('subProdOfferTreeContainer'+uniqueId).subProdOfferOrderGrid;
			        //唯一的id.订购或变更e9自主版有值，其余的时候都是空
			        this.uniqueId = uniqueId;
			        //订购或者变更e9自主版时有值，tab页对象
			        this.contentPane = contentPane;
			        //销售品详情的构建器
			        this.prodOfferDetailBuilder = new ProdOfferDetailBuilder(this);
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
			        _provider.dealTimeDisplayByNew(rowData);
			        _provider.setPortSpeedSubProdOfferTime(rowData);
		        },
		        /**
		         * 设置样式，满足样式美观
		         */
		        setSubGridCssStyle : function(cssStyle,rowIndex){
		        	var subGridNode = this.subProdOfferOrderGrid.domNode;
		        	var targetNode = dojo.query(".subProdOfferDetail-"+rowIndex, subGridNode)[0];
		        	var trNode = util.DomHelper.findParentNode(targetNode, function(node) {
				                return node.tagName.toUpperCase() == 'TR';
			                });
			        dojo.attr(trNode,"class",cssStyle);
		        },
		        /**
		         * 设置可选包的隐藏
		         */
		        setSubOfferViewDisplay : function(rowIndex,flag){
		        	var subGridNode = this.subProdOfferOrderGrid.domNode;
		        	var targetNode = dojo.query(".subProdOfferDetail-"+rowIndex, subGridNode)[0];
		        	var trNode = util.DomHelper.findParentNode(targetNode, function(node) {
				                return node.tagName.toUpperCase() == 'TR';
			                });
			        if(!!flag){
			        	trNode.style.display = 'none';
			        }else{
			        	trNode.style.display = '';
			        }
		        },
		        
		        /**
		         * 重置购物车
		         */
		        resetSubProdOfferCart : function(){
		        	//首先清空数据
		        	var subProdOfferCartDataProvider = this;
		        	subProdOfferCartDataProvider.subProdOfferOrderGrid.remove();
		        	//先销毁原来的
		        	this.prodOfferDetailBuilder.destroy();
		        	this.prodOfferDetailBuilder.prodOfferDetailWidgetList= [];
		        	//调用原来的填充购物车的方法进行填充
					//判断当前uniqueId对应的是变更还是新装
		        	if(subProdOfferCartDataProvider.uniqueId==null||subProdOfferCartDataProvider.uniqueId == ""){
		        		if(!!$ac$.mainProdOfferInstVO){
		        			subProdOfferCartDataProvider.showOrderedProdOffer();
		        		}else{
		        			subProdOfferCartDataProvider.showSelectDefaultProdOffer();
		        			subProdOfferCartDataProvider.dealCoopNumOfferForReset();
		        		}
		        	}else{
		        		var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
		        		var targetSelectMem = dojo.filter(selectedMemberProdOfferList||[],function(_data){
							return _data.uniqueId == subProdOfferCartDataProvider.uniqueId;
						});
						if(targetSelectMem.length>0){
							if(!!(targetSelectMem[0].offerInstVO)){
								//变更
								subProdOfferCartDataProvider.showOrderedProdOffer();
							}else{
								subProdOfferCartDataProvider.showSelectDefaultProdOffer();
								subProdOfferCartDataProvider.dealCoopNumOfferForReset();
							}
						}
						
		        	}
		        },
		        
		        /**
				 * 展示默认选中的可选包销售品
				 */
		        showSelectDefaultProdOffer : function() {
		        	var subProdOfferCartDataProvider = this;
		        	var subProdOfferList = [];
		        	//清空数据
		        	subProdOfferCartDataProvider.subProdOfferOrderGrid.remove();
		        	//代码优化 begin
		        	if((!!$ac$.selectedMainProdOfferInfoVO)&&$ac$.selectedMainProdOfferInfoVO.bindType == 2){
		        		//主套餐销售品信息
			        	var mainProdOfferInfo = util.ProdOfferHelper.getMainProdOffer($ac$.get("prodOfferList"))[0];
			        	//成员销售品信息
			        	var memProdOfferInfo = util.ProdOfferHelper.getMainProdOffer($ac$.get("prodOfferList"+subProdOfferCartDataProvider.uniqueId))[0];
			        	//获取成员销售品接入类产品信息(service_kind=8)
			        	var memProductInfo = dojo.filter(memProdOfferInfo.offerProdRelaList||[],function(oneOfferProd){
				        	return oneOfferProd.productInfoVO.prodFuncType == "101" && oneOfferProd.productInfoVO.netType == "8";
			        	})[0];
			        	//获取服务提供
			        	var serviceOfferId = this.controller.getServiceOfferConfigVO(util.ACTION_CD_CONST.PRODUCT_INSTALL).serviceOfferId;
			        	//主套餐销售品类型
			        	var promptInfo = "";
			        	if(memProductInfo){
			        		promptInfo = util.ProdOfferHelper.isT2ProdOffer(mainProdOfferInfo.prodOfferId,memProductInfo.productInfoVO.productId,serviceOfferId);
			        	}
			        	if(promptInfo && promptInfo.code == "1"){//调用规则判断主销售品是否为T2组合且当前成员销售品为语音卡
			        		//成员主销售品id
			        		var memProdOfferId = memProdOfferInfo.prodOfferId;
			        		//T2成员销售品可选包
			        		var memSubProdOfferList = util.ProdOfferHelper.getT2MemProdOfferList(memProdOfferId);
			        		//获取指定可选包
			        		var subProdOfferList = dojo.filter(memSubProdOfferList||[],function(oneProdOffer){
			        			return oneProdOffer.prodOfferId == util.T2ProdOfferConst.VOICE_CARD_SUB_PRODOFFER;
			        		});
			        	}else{
			        		//获取默认选中的可选包销售品集合
				        	subProdOfferList = util.ProdOfferHelper.getSubProdOfferList(dojo.global.$appContext$.get("prodOfferList"+subProdOfferCartDataProvider.uniqueId));
			        	}
		        	}else{
		        		subProdOfferList = util.ProdOfferHelper.getSubProdOfferList(dojo.global.$appContext$.get("prodOfferList"+subProdOfferCartDataProvider.uniqueId));
		        	}
		        	//代码优化 end
					//展示默认选中的销售品
			        dojo.forEach(subProdOfferList,function(subProdOfferInfo) {
			        	  //拼接一行的绑定数据
			        	  var rowData = util.ProdOfferHelper.createProdOfferRowData(subProdOfferInfo);
			        	  //获取使用号码集合
			        	  var chooseNumberObjList = subProdOfferCartDataProvider.doGetChooseNumList(subProdOfferInfo);
			        	  if(chooseNumberObjList.chooseNumberList.length >0 ){
			        	  		//默认取第一个号码为使用号码
			        	  		rowData.showData.chooseNumberObj = chooseNumberObjList.chooseNumberList[0];
			        	  }else{
			        	  		//没有使用号码，则不生成使用号码
			        	  		rowData.showData.chooseNumberObj =null;
			        	  }
			        	  //向表格中添加一行
				          subProdOfferCartDataProvider.addOneRow(rowData);
	                });
	                subProdOfferCartDataProvider.setSelectAbleSubProdOfferTime();
	                subProdOfferCartDataProvider.setBacthPortSpeedSubProdOfferTime();
		        },
		        /**
		         * 获取当前可选包销售品适用的接入号码的集合
		         */
		        doGetChooseNumList : function(subProdOfferInfo){
		        	var prodvider = this;
		        	var prodBasicList = null;
		        	//获取和当前选中的可选包关联的接入类号码
		        	var relaAccessIdList = util.ProdOfferHelper.doGetRelaAccessProductIdList(subProdOfferInfo);
		        	//基础包区域表格中的接入类产品所属的dom节点集合
			        var trs = dojo.query(".main-product-basic", this.controller.mainProdOfferWidget.domNode);
			        //进行判断，如果是非e9自主版走下面的流程
			        if(prodvider.uniqueId==""||prodvider.uniqueId==-1){
			        	prodBasicList = dojo.filter(trs||[], function(prodBasicTr) {
				        var productId = dojo.attr(prodBasicTr, "productId")
				                || dojo.query("SELECT", prodBasicTr)[0].value;
				        return dojo.some(relaAccessIdList||[], function(productIdInfo) {
					                return productIdInfo == productId;
					                });
				        });
				    //e9自主版只能选择成员套餐对应的号码
			        }else{
			        	prodBasicList = dojo.filter(trs||[], function(prodBasicTr) {
				        var productId = dojo.attr(prodBasicTr, "productId")
				                || dojo.query("SELECT", prodBasicTr)[0].value;
				        return dojo.some(relaAccessIdList||[], function(productIdInfo) {
					                return productIdInfo == productId;
					                })&&dojo.attr(prodBasicTr, "uniqueId")==prodvider.uniqueId;
				        });
			        }
			        //获取所有选中的接入类产品的dom节点集合
			        var accessProdBasicTrList = dojo.filter(prodBasicList, function(tr){
			        	return dojo.query(".main-product-check", tr)[0].checked;
			        });
			        //获取可选包销售品适用的使用号码结合
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
		        /**
		         * 变更时用，展示已经订购的销售品
		         */
		        showOrderedProdOffer : function(){
		        	/**
		        	 * keepProdOfferInstList-保存的销售品信息
		        	 * cancelProdOfferInstList-取消的销售品信息
		        	 */
		        	var subProdOfferCartDataProvider = this,
			        	keepProdOfferInstList = dojo.global.$appContext$.get("keepProdOfferInstList"+subProdOfferCartDataProvider.uniqueId)||[],
				        cancelProdOfferInstList = dojo.global.$appContext$.get("cancelProdOfferInstList"+subProdOfferCartDataProvider.uniqueId)||[],
				    	param = {
				    		keepProdOfferInstList :keepProdOfferInstList, 
				    		cancelProdOfferInstList : cancelProdOfferInstList
				    	};
				     //清空数据
		        	subProdOfferCartDataProvider.subProdOfferOrderGrid.remove();
		        	//展示变更时用户已经订购的销售品信息
				    subProdOfferCartDataProvider.showChgOrderedProdOffer(param);
				    //展示变更主销售品除去保留的可选包后剩下的可选包销售品
				    subProdOfferCartDataProvider.showLeftSelectAbleProdOffer();
				    subProdOfferCartDataProvider.setSelectAbleSubProdOfferTime(true);
		        },
		        
		        /**
		         * 展示变更主销售品剩余的默认选中的可选包销售品
		         */
		        showLeftSelectAbleProdOffer : function(){
		        	var subProdOfferCartDataProvider = this;
		        	var leftProdOfferList = dojo.global.$appContext$.get("leftProdOfferList"+subProdOfferCartDataProvider.uniqueId)||[];
		        	dojo.forEach(leftProdOfferList||[],function(leftProdOfferInfo){
		        		  //拼接一行的绑定数据
			        	  var rowData = util.ProdOfferHelper.createProdOfferRowData(leftProdOfferInfo);
			        	  //获取使用号码集合
			        	  var chooseNumberObjList = subProdOfferCartDataProvider.doGetChooseNumList(leftProdOfferInfo);
			        	  if(chooseNumberObjList.chooseNumberList.length >0 ){
			        	  		//默认取第一个号码为使用号码
			        	  		rowData.showData.chooseNumberObj = chooseNumberObjList.chooseNumberList[0];
			        	  }else{
			        	  		//没有使用号码，则不生成使用号码
			        	  		rowData.showData.chooseNumberObj =null;
			        	  }
			        	  //向表格中添加一行
				          subProdOfferCartDataProvider.addOneRow(rowData);
		        	});
		        },
		        
		        /**
		         * 展示页面上的保留的和退订的销售品信息
		         */
		        showChgOrderedProdOffer : function(param){
		        	var subProdOfferCartDataProvider = this,
			        	keepProdOfferInstList = param.keepProdOfferInstList,
				        cancelProdOfferInstList = param.cancelProdOfferInstList, 
				        mainProdOfferInst = param.mainProdOfferInst,
				        keepProdOfferInstData = [],
				        cancelProdOfferInstData = [];
			        dojo.forEach(keepProdOfferInstList||[], function(prodOfferInst){
			        	if((mainProdOfferInst||dojo.global.$appContext$.get("mainProdOfferInstVO"+subProdOfferCartDataProvider.uniqueId)).prodOfferId != prodOfferInst.prodOfferId){
			        		keepProdOfferInstData.push(prodOfferInst);
			        	} 
			        });
			        dojo.forEach(cancelProdOfferInstList||[], function(prodOfferInst){
			        	if((mainProdOfferInst||dojo.global.$appContext$.get("mainProdOfferInstVO"+subProdOfferCartDataProvider.uniqueId)).prodOfferId != prodOfferInst.prodOfferId){
			        		cancelProdOfferInstData.push(prodOfferInst);
			        	}
			        });     
			       	var	keepedProdOfferData = dojo.map(keepProdOfferInstData, function(keepProdOfferInst) {
				                return util.ProdOfferHelper.createKeepProdOfferRowDataForChg(keepProdOfferInst,subProdOfferCartDataProvider.uniqueId||"");
			                }),
			            canceledProdOfferData = dojo.map(cancelProdOfferInstData, function(cancelProdOfferInst) {
				                return util.ProdOfferHelper.createCancelProdOfferRowDataForChg(cancelProdOfferInst,subProdOfferCartDataProvider.uniqueId||"");
			                });
					dojo.forEach([].concat(keepedProdOfferData,canceledProdOfferData), function(rowData){
						var chooseNumberList = subProdOfferCartDataProvider.selectOldUseNumber(rowData);
						if(chooseNumberList.length >0 ){
			        	  	 rowData.showData.chooseNumberObj = chooseNumberList[0];
			        	 }else{
			        	  	 rowData.showData.chooseNumberObj =null;
			        	 }
			        	rowData.uniqueId = subProdOfferCartDataProvider.uniqueId;
			        	//将变更的销售品添加到可选包右侧区域
						subProdOfferCartDataProvider.subProdOfferOrderGrid.add(rowData);
						//变更阶段不进行升速处理
						subProdOfferCartDataProvider.dealRaiseXDSLSpeedForChg(rowData);
						//特殊处理，设置页面样式
						subProdOfferCartDataProvider.setSubGridCssStyle(rowData.showData.prodOfferStyle,rowData.rowIndex);
						
						subProdOfferCartDataProvider.dealTimeDisplayByChgMain(rowData);
					});
		        },
		        
		        /**
		         * 处理变更时使用号码的选中
		         */
		        selectOldUseNumber : function(singleBindingData){
		        	var trs = dojo.query(".main-product-basic", this.controller.mainProdOfferWidget.domNode),
		        		chooseNumberList = [],
		        		currentProdOfferInst = singleBindingData.prodOfferInst;
		        	if(!currentProdOfferInst){
		        		return chooseNumberList;
		        	}
		        	//获取销售品下的关联产品信息
		        	var _relaProdInfoList = currentProdOfferInst.prodInstList || [];
		        	BusCard.each(_relaProdInfoList, function(serviceProdInfo) {
		        		var relaMap = serviceProdInfo.prodInstRela;
		        		for(var p in  relaMap){
		        			var acessProdInfo = relaMap[p];
		        			var userId = p,
		        			prodBasicTr = dojo.filter(trs, function(tr) {      
							        return dojo.attr(tr, "userId") == userId && dojo.query(".main-product-check", tr)[0].checked;
						        })[0],
						        viewId = dojo.attr(prodBasicTr, "viewId");
								chooseNumberList.push({
					        		serviceKind : dojo.attr(prodBasicTr, "serviceKind") || "-1",
					        		serviceKindIndex : dojo.attr(prodBasicTr, "serviceKindIndex") || "-1",
					        		serviceId : dojo.query(".serviceId-" + viewId, prodBasicTr)[0].value,
					        		productId : dojo.attr(prodBasicTr, "productId") || "-1",
					        		uniqueId : dojo.attr(prodBasicTr, "uniqueId"),
				        			userId : userId
				        		});	
		        		}
		        	});
		        	//如果使用号码的集合为空，则从销售品产品关系集合中取
		        	if(chooseNumberList.length==0){
		        		//如果销售品产品关系存在，并且长度大于0的时候
		        		if(currentProdOfferInst.offerProdInstRelaList&&currentProdOfferInst.offerProdInstRelaList.length>0){
			        		var offerProdInstRelaInfo = currentProdOfferInst.offerProdInstRelaList[0];
			        		var userId = offerProdInstRelaInfo.prodInstId;
			        		var prodBasicTr = dojo.filter(trs, function(tr) {      
								        return dojo.attr(tr, "userId") == userId && dojo.query(".main-product-check", tr)[0].checked;
							        })[0];
							var viewId = dojo.attr(prodBasicTr, "viewId");
							chooseNumberList.push({
				        		serviceKind : dojo.attr(prodBasicTr, "serviceKind") || "-1",
				        		serviceKindIndex : dojo.attr(prodBasicTr, "serviceKindIndex") || "-1",
				        		serviceId : dojo.query(".serviceId-" + viewId, prodBasicTr)[0].value,
				        		productId : dojo.attr(prodBasicTr, "productId") || "-1",
				        		uniqueId : dojo.attr(prodBasicTr, "uniqueId"),
				        		userId : userId
			        		});	
		        		}
		        	}
		        	return chooseNumberList;
		        },
		        
		        /**
				 * 展示可选包信息
				 */
		        showOneSubProdOffer : function(subProdOfferInfo,chooseNum) {
			        var rowData = util.ProdOfferHelper.createProdOfferRowData(subProdOfferInfo);
			        rowData.showData.chooseNumberObj = chooseNum;
			        this.addOneRow(rowData);
				    
		        },
		        /**
		         * 判断并获取该销售品是否有升速属性
		         */
		        dealRaiseXDSLSpeed : function(subProdOfferInfo,chooseNum,flag,rowData){
		        	var raiseSpeedObj = util.ProdOfferHelper.getRaiseSpeedObj(subProdOfferInfo);
		        	//如果升速对象为空或者使用号码为空，则不处理
		        	if(raiseSpeedObj == null || chooseNum == null){
		        		return;
		        	}
		        	raiseSpeedObj.uniqueId = chooseNum.uniqueId;
		        	raiseSpeedObj.prodOfferId = subProdOfferInfo.prodOfferId;
		        	raiseSpeedObj.rowData = rowData;
					var publisher = new BusCard.messaging.Publisher();
					if(flag&&rowData.prodOfferInst ==null){
						rowData.rateFlag = chooseNum.uniqueId;
						publisher.publish("/message/raiseSpeed"+chooseNum.uniqueId,raiseSpeedObj);
						//dojo.publish("/message/raiseSpeed"+chooseNum.uniqueId,raiseSpeedObj);
					}else if((!flag)&&rowData.prodOfferInst ==null){
						publisher.publish("/message/decreaseSpeed"+chooseNum.uniqueId,raiseSpeedObj);
						//dojo.publish("/message/decreaseSpeed"+chooseNum.uniqueId,raiseSpeedObj);
						
					}else if((!flag)&&rowData.prodOfferInst !=null){
						publisher.publish("/message/decreaseSpeedHandleByCancelOld"+chooseNum.uniqueId,raiseSpeedObj);
					}else if(flag&&rowData.prodOfferInst !=null){
						publisher.publish("/message/raiseSpeedHandleByCancelOld"+chooseNum.uniqueId,raiseSpeedObj);
					}
		        },
		        
		        /**
		         * 变更主销售品阶段的特殊判断
		         */
		        dealRaiseXDSLSpeedForChg : function(rowData){
		        	var publisher = new BusCard.messaging.Publisher();
	        		var raiseSpeedObj = util.ProdOfferHelper.getRaiseSpeedObj(rowData.subProdOfferInfo);
	        		var chooseNum = rowData.showData.chooseNumberObj;
	        		//如果升速对象为空或者使用号码为空或者，则不处理
		        	if(raiseSpeedObj == null || chooseNum == null){
		        		return;
		        	}
	        		raiseSpeedObj.rowData =rowData;
	        		raiseSpeedObj.uniqueId = chooseNum.uniqueId;
	        		raiseSpeedObj.prodOfferId = rowData.subProdOfferInfo.prodOfferId;
	        		raiseSpeedObj.initStatus = true;
	        		//判断一下是选中还是取消
	        		if(rowData.showData.checkedOption==""){
	        			publisher.publish("/message/decreaseSpeedHandleByCancelOld"+chooseNum.uniqueId,raiseSpeedObj);
	        		}else{
		        		publisher.publish("/message/raiseSpeedHandleByCancelOld"+chooseNum.uniqueId,raiseSpeedObj);
	        		}
		        },
		        
		        /**
		         * 因为变更主销售品，处理页面时间展现(尚未使用)
		         */
		        recoveryTimeDisplayByChgMain : function(rowData){
		        	 var subProdOfferCartDataProvider = this;
		        	 var subProdOfferOrderGrid = this.subProdOfferOrderGrid.domNode;
		        	 var ifChangeMainFlag = subProdOfferCartDataProvider.getIfChangeMainFlag();
		        	 if(ifChangeMainFlag == null){
		        	 	return ;
		        	 //变更主销售品
		        	 }else if(ifChangeMainFlag == 1){
		        	 	var rowIndex = rowData.showData.rowIndex;
		        	 	var viewId = rowData.showData.viewId;
		        	 	var subProdOfferDetailDiv = dojo.query(".subProdOfferDetail-"
				                                + rowIndex, subProdOfferOrderGrid)[0];
				        var subProdOfferStartDateDiv = dojo.query(".subProdOfferStartDate-"
				                                + rowIndex, subProdOfferOrderGrid)[0];
		                var chooseStartDateParentNode = dojo.query(
		                        ".productStartDateStyle", subProdOfferStartDateDiv)[0];
		                var subProdOfferEndDateDiv = dojo.query(".subProdOfferEndDate-"
		                                + rowIndex, subProdOfferOrderGrid)[0];
		        	 	//针对保留的，
		        	 	if(subProdOfferDetailDiv.childNodes[0].checked&&rowData.prodOfferInst != null){
		        	 		var offerDelayEndDateViewDiv = dojo.query("[id='offerDelayEndDateView-" + viewId + "']",
					                        subProdOfferEndDateDiv)[0];
							if (offerDelayEndDateViewDiv) {
								dojo.query('.prodDelayEndDateStyle',offerDelayEndDateViewDiv)[0].style.display="none";
								dojo.query(".delay_date_class",subProdOfferEndDateDiv)[0].innerHTML = util.DateHelper.formatDate(util.DateHelper.getFirstDayAfterPeriod());
			                }				     
		        	 	}
		        	 }
		        },
		        
		        /**
		         * 新装的时候，所有的
		         */
		        dealTimeDisplayByNew : function(rowData){
		        	var _provider = this;
		        	var subProdOfferOrderGrid = this.subProdOfferOrderGrid.domNode;
		        	if(_provider.getIfProdInstallFlag() == true){
		        		var rowIndex = rowData.showData.rowIndex;
				        var subProdOfferStartDateDiv = dojo.query(".subProdOfferStartDate-"
				                                + rowIndex, subProdOfferOrderGrid)[0];
		                var chooseStartDateParentNode = dojo.query(
		                        ".productStartDateStyle", subProdOfferStartDateDiv)[0];
		                if(chooseStartDateParentNode){
	        	 			chooseStartDateParentNode.style.display = "none";
	        	 		}
	        	 		dojo.query(".start_date_class",subProdOfferStartDateDiv)[0].innerHTML = dojo.global.$appContext$.requestParam.today;
		        	}
		        	
		        },
		        
		        /**
		         * 因为变更主销售品，处理页面的时间展现
		         */
		        dealTimeDisplayByChgMain : function(rowData,flag){
		        	 var subProdOfferCartDataProvider = this;
		        	 var subProdOfferOrderGrid = this.subProdOfferOrderGrid.domNode;
		        	 var ifChangeMainFlag = subProdOfferCartDataProvider.getIfChangeMainFlag();
		        	 if(ifChangeMainFlag == null){
		        	 	return ;
		        	 //变更主销售品
		        	 }else if(ifChangeMainFlag == 1){
			            var prodChgClass = "orderaccept.prodofferaccept.loader.ProductChangeAcceptLoader";
			            if(!!this.controller && (this.controller.declaredClass == prodChgClass)){return;}
		        	 	var rowIndex = rowData.showData.rowIndex;
		        	 	var viewId = rowData.showData.viewId;
		        	 	var subProdOfferDetailDiv = dojo.query(".subProdOfferDetail-"
				                                + rowIndex, subProdOfferOrderGrid)[0];
				        var subProdOfferStartDateDiv = dojo.query(".subProdOfferStartDate-"
				                                + rowIndex, subProdOfferOrderGrid)[0];
		                var chooseStartDateParentNode = dojo.query(
		                        ".productStartDateStyle", subProdOfferStartDateDiv)[0];
		                var subProdOfferEndDateDiv = dojo.query(".subProdOfferEndDate-"
		                                + rowIndex, subProdOfferOrderGrid)[0];
		        	 	//针对退订的，隐藏退订时间下拉框，直接展现下月一号(不选中并且是有实例，说明是退订的可选包)
		        	 	if((!(subProdOfferDetailDiv.childNodes[0].checked))&&rowData.prodOfferInst != null){
		        	 		var offerDelayEndDateViewDiv = dojo.query("[id='offerDelayEndDateView-" + viewId + "']",
					                        subProdOfferEndDateDiv)[0];
							if (offerDelayEndDateViewDiv) {
								dojo.query('.prodDelayEndDateStyle',offerDelayEndDateViewDiv)[0].style.display="none";
								dojo.query(".delay_date_class",subProdOfferEndDateDiv)[0].innerHTML =this.getSubProdOfferEndDate();
			                	var memberOfferInfo = subProdOfferCartDataProvider.getMainOfferStandardChgMem();
								if(memberOfferInfo){
									if($ac$.get("offerStandardStartDate_" + memberOfferInfo.prodOfferInstId)){
										var agreeDateObj = $ac$.get("offerStandardStartDate_" + memberOfferInfo.prodOfferInstId);
										dojo.query(".delay_date_class",subProdOfferEndDateDiv)[0].innerHTML =agreeDateObj.beginDate;
									}
								}
			                }
//			                if(!flag){
//				                subProdOfferCartDataProvider.setSubGridCssStyle("prod-offer-reserve",rowData.rowIndex);
//			        	 		rowData.showData.prodOfferStyle = "prod-offer-reserve";
//			                }
		        	 	}
		        	 	//针对新增加的，则将开始时间设置为下月一号(选中并且实例信息为空)
		        	 	if(subProdOfferDetailDiv.childNodes[0].checked && rowData.prodOfferInst == null){
		        	 		if(chooseStartDateParentNode){
		        	 			chooseStartDateParentNode.style.display = "none";
		        	 		}
		        	 		dojo.query(".start_date_class",subProdOfferStartDateDiv)[0].innerHTML = this.getSubProdOfferStartDate();
		        	 		var memberOfferInfo = subProdOfferCartDataProvider.getMainOfferStandardChgMem();
							if(memberOfferInfo){
								if($ac$.get("offerStandardStartDate_" + memberOfferInfo.prodOfferInstId)){
									var agreeDateObj = $ac$.get("offerStandardStartDate_" + memberOfferInfo.prodOfferInstId);
									dojo.query(".start_date_class",subProdOfferStartDateDiv)[0].innerHTML =agreeDateObj.beginDate;
								}
							}
		        	 	}
		        	 }
		        },
		        getSubProdOfferEndDate:function(){
		        	return util.DateHelper.formatDate(util.DateHelper.getFirstDayAfterPeriod());
		        },
		        getSubProdOfferStartDate:function(){
		        	return util.DateHelper.formatDate(util.DateHelper.getFirstDayAfterPeriod());
		        },
		        
		        setBacthPortSpeedSubProdOfferTime : function(){
		        	var _prodvider = this;
					var _flag_ = false;
					var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
					if($ac$.selectedMainProdOfferInfoVO.bindType == 2){
						var uniqueId = _prodvider.uniqueId;
						var targetSelectMem = dojo.filter(selectedMemberProdOfferList||[],function(_data){
							return _data.uniqueId == uniqueId;
						});
						if(targetSelectMem.length>0&&targetSelectMem[0].action == "new"){
							_flag_ = true;
						}
					}else{
						if(!$ac$.mainProdOfferInstVO){
							_flag_ = true;
						}
					}
					if(_flag_){
						var bindData = _prodvider.getSubGridBindingData();
						var SYSDATE = dojo.global.$appContext$.requestParam.today;
					    var subProdOfferOrderGrid = this.subProdOfferOrderGrid.domNode;
						dojo.forEach(bindData||[],function(selectData){
							if(util.ProdOfferHelper.getRaiseSpeedObj(selectData.subProdOfferInfo)==null){
								return;
							}
				        	var rowIndex = selectData.showData.rowIndex;
				        	var subProdOfferStartDateDiv = dojo.query(".subProdOfferStartDate-"
				                                + rowIndex, subProdOfferOrderGrid)[0];
			                var chooseStartDateParentNode = dojo.query(
			                        ".productStartDateStyle", subProdOfferStartDateDiv)[0];
			                if (chooseStartDateParentNode){
			                	chooseStartDateParentNode.style.display = "none"
			                }
			                dojo.query(".start_date_class",
					                        subProdOfferStartDateDiv)[0].innerHTML = SYSDATE;
				        });
					}
		        },
		        
		        /**
		         * 设置新装阶段升速可选包的时间问题
		         */
		        setPortSpeedSubProdOfferTime : function(rowData){
					var _prodvider = this;
					var _flag_ = false;
					var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
					if($ac$.selectedMainProdOfferInfoVO.bindType == 2){
						var uniqueId = _prodvider.uniqueId;
						var targetSelectMem = dojo.filter(selectedMemberProdOfferList||[],function(_data){
							return _data.uniqueId == uniqueId;
						});
						if(targetSelectMem.length>0&&targetSelectMem[0].action == "new"){
							_flag_ = true;
						}
					}else{
						if(!$ac$.mainProdOfferInstVO){
							_flag_ = true;
						}
					}
					if(_flag_){
						if(util.ProdOfferHelper.getRaiseSpeedObj(rowData.subProdOfferInfo)==null){
							return ;
						}
						var SYSDATE = dojo.global.$appContext$.requestParam.today;
					    var subProdOfferOrderGrid = this.subProdOfferOrderGrid.domNode;
					    var rowIndex = rowData.showData.rowIndex;
			        	var subProdOfferStartDateDiv = dojo.query(".subProdOfferStartDate-"
			                                + rowIndex, subProdOfferOrderGrid)[0];
		                var chooseStartDateParentNode = dojo.query(
		                        ".productStartDateStyle", subProdOfferStartDateDiv)[0];
		                if (chooseStartDateParentNode){
		                	chooseStartDateParentNode.style.display = "none"
		                }
		                dojo.query(".start_date_class",subProdOfferStartDateDiv)[0].innerHTML = SYSDATE;
					}
		        },
		        
		        /**
		         * 设置必选的可选包的生效时间和主销售品一致,即为新装的时候立即生效
		         */
		        setSelectAbleSubProdOfferTime : function(flag){
		        	//判断一下当前受理的时候是新装
		        	var _prodvider = this;
		        	//判断是否是新装
		        	if(_prodvider.getIfNewFlag()||flag){
			        	var prodOfferRelaList = null;
				        var mainProdOfferId = null;
				        var mainProdOfferVO = $ac$.selectedMainProdOfferInfoVO;
				        if(mainProdOfferVO.bindType == 2){
				        	//如果是自助版则不需要特殊处理
				        	var mainProdOfferAcceptInfoVO = util.ProdOfferHelper.getMainProdOffer(dojo.global.$appContext$.get("prodOfferList" + _prodvider.uniqueId))[0];
				        	prodOfferRelaList = mainProdOfferAcceptInfoVO.prodOfferRelaList;
				        	mainProdOfferId = mainProdOfferAcceptInfoVO.prodOfferId;
				        }else{
				        	//非自主版需要特殊处理,利用主销售品id获取主销售品的销售品关系
				        	mainProdOfferId = mainProdOfferVO.prodOfferId;
				        	if(!!$ac$.get("prodOfferRelaList_"+_prodvider.uniqueId)){
				        		prodOfferRelaList = $ac$.get("prodOfferRelaList_"+_prodvider.uniqueId);
				        	}else{
					        	var resultData = util.ServiceFactory.getService(
						                "url:orderDetailAction.do?method=getProdOfferRelaListByMainProdOfferId", null, {
							                method : 'post',
							                content : {
								                prodOfferId : mainProdOfferVO.prodOfferId
							                }
							                
						                }
			
						        );
					        	prodOfferRelaList = resultData;
					        	$ac$.set("prodOfferRelaList_"+_prodvider.uniqueId,prodOfferRelaList)
				        	}
				        }
				        //获取当前表格中的绑定数据
				        var bindData = _prodvider.getSubGridBindingData();
				        //获取必选的可选包
				        var selectAbleSubData = dojo.filter(bindData||[],function(_data_){
				        	return dojo.some(prodOfferRelaList || [], function(prodOfferRelaVO) {
					                return prodOfferRelaVO.offerAId == mainProdOfferId
					                        && prodOfferRelaVO.offerZId == _data_.subProdOfferInfo.prodOfferId
					                        && prodOfferRelaVO.selectDefault == 1 && prodOfferRelaVO.selectable == 1
				                })&&_data_.prodOfferInst == null;
				        });
//				        /当前时间
				        var SYSDATE = dojo.global.$appContext$.requestParam.today;
				        //判断是否是变更主销售品
				        var ifChangeMainFlag = _prodvider.getIfChangeMainFlag();
				        if(ifChangeMainFlag == 1){
				        	//变更主销售品，则重新设置其时间
				        	SYSDATE = _prodvider.getSubProdOfferEndDate();
				        }
				        var subProdOfferOrderGrid = this.subProdOfferOrderGrid.domNode;
				        dojo.forEach(selectAbleSubData||[],function(selectData){
				        	var rowIndex = selectData.showData.rowIndex;
				        	var subProdOfferStartDateDiv = dojo.query(".subProdOfferStartDate-"
				                                + rowIndex, subProdOfferOrderGrid)[0];
			                var chooseStartDateParentNode = dojo.query(
			                        ".productStartDateStyle", subProdOfferStartDateDiv)[0];
			                if (chooseStartDateParentNode){
			                	chooseStartDateParentNode.style.display = "none"
			                }
			                dojo.query(".start_date_class",
					                        subProdOfferStartDateDiv)[0].innerHTML = SYSDATE;
					        dojo.query(".sub-prodoffer-del-img_"
				                                + rowIndex, subProdOfferOrderGrid)[0].disabled = true;
                            //设置成必选的属性
				            selectData.showData.selectAble = true;
				        });
		        	}
		        },
		        
		        /**
		         * 判断当前的受理的是否是新装
		         */
		        getIfNewFlag : function(){
		        	var _prodvider = this;
		        	var flag = false;
		        	var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
		        	if(_prodvider.contentPane){
		        		var targetSelectMember = dojo.filter(selectedMemberProdOfferList||[],function(selectedMemberProdOffer){
		        			return selectedMemberProdOffer.uniqueId == _prodvider.uniqueId;
		        		});
		        		if(targetSelectMember.length>0){
		        			if(targetSelectMember[0].action == "new"){
		        				flag = true;
		        			}
		        		}
		        	}else{
		        		//非自主版，直接取第一个
		        		var selectMember = selectedMemberProdOfferList[0];
		        		if(selectMember.action == "new"){
		        			flag = true;
		        		}
		        	}
		        	return flag;
		        },
		        
		        
		        /**
		         * 获取变更主套餐的信息(判断是否是宽带标准化变更)
		         */
		        getMainOfferStandardChgMem : function(){
		        	var _prodvider = this;
		        	var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
		        	if(_prodvider.contentPane){
		        		var targetSelectMember = dojo.filter(selectedMemberProdOfferList||[],function(selectedMemberProdOffer){
		        			return selectedMemberProdOffer.uniqueId == _prodvider.uniqueId;
		        		});
		        		if(targetSelectMember.length>0){
		        			if(!!(targetSelectMember[0].offerInstVO)){
			        			return targetSelectMember[0].offerInstVO;
			        		}
		        		}
		        	}else{
		        		//非自主版，直接取第一个
		        		var selectMember = selectedMemberProdOfferList[0];
		        		if(!!(selectMember.offerInstVO)){
		        			return selectMember.offerInstVO;
		        		}
		        	}
		        	return null;
		        },
		        
		        /**
		         * 判断当前的可选包tab是否是新装
		         */
		        getIfProdInstallFlag : function(){
		        	var _prodvider = this;
		        	var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
		        	if(_prodvider.contentPane){
		        		var targetSelectMember = dojo.filter(selectedMemberProdOfferList||[],function(selectedMemberProdOffer){
		        			return selectedMemberProdOffer.uniqueId == _prodvider.uniqueId;
		        		});
		        		if(targetSelectMember.length>0){
		        			if(!(targetSelectMember[0].offerInstVO)){
			        			return true;
			        		}
		        		}
		        	}else{
		        		//非自主版，直接取第一个
		        		var selectMember = selectedMemberProdOfferList[0];
		        		if(!(selectMember.offerInstVO)){
		        			return true;
		        		}
		        	}
		        	return false;
		        },
		        
		        /**
		         * 获取是否是变更主销售品标识
		         */
		        getIfChangeMainFlag : function(){
		        	var _prodvider = this;
		        	var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
		        	if(_prodvider.contentPane){
		        		var targetSelectMember = dojo.filter(selectedMemberProdOfferList||[],function(selectedMemberProdOffer){
		        			return selectedMemberProdOffer.uniqueId == _prodvider.uniqueId;
		        		});
		        		if(targetSelectMember.length>0){
		        			if(!!(targetSelectMember[0].offerInstVO)){
			        			//说明是主销售品变更
			        			if(targetSelectMember[0].offerInstVO.prodOfferId != targetSelectMember[0].prodOfferId){
			        				return 1;
			        			}
			        		}
		        		}
		        	}else{
		        		//非自主版，直接取第一个
		        		var selectMember = selectedMemberProdOfferList[0];
		        		if(!!(selectMember.offerInstVO)){
		        			//说明是主销售品变更
		        			if(selectMember.offerInstVO.prodOfferId != selectMember.prodOfferId){
		        				return 1;
		        			}
		        		}
		        	}
		        	return null;
		        },
		        
		        /**
				 * 获取页面数据(保存订单前使用)
				 */
		        saveSubProdOfferViewData : function() {
			        pageData = {};
			        var subProdOfferCartDataProvider = this;
			        var bindingData = this.subProdOfferOrderGrid.ds.getRawData();
			        var subProdOfferOrderGrid = this.subProdOfferOrderGrid.domNode;
			        //获取变更主销售品标识
			        var ifChangeMainFlag = subProdOfferCartDataProvider.getIfChangeMainFlag(); 
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
					                "prodOfferId" : oneBindingData.subProdOfferInfo.prodOfferId,
					                "ifChangeMainFlag" : ifChangeMainFlag
				                };
			                });
		        },
		        /**
				 * 刷新页面上的可选包前的复选框是否选中
				 */
		        refreshSubProdOfferCart : function(target, flag) {
			        var subProdOfferOrderGrid = this.subProdOfferOrderGrid.domNode
			        var serviceKindIndex = dojo.attr(target, "serviceKindIndex"),
				        serviceKind = dojo.attr(target, "serviceKind"),
			        	spanElemId = 'selected_number_' + serviceKind + "_" + serviceKindIndex,
			        	spanElemList = dojo.query("[id='" + spanElemId + "']",subProdOfferOrderGrid);
			        dojo.forEach(spanElemList||[], function(spanElem) {
				        var rowIndex = dojo.attr(spanElem, "name");
				        dojo.query(".subProdOfferDetail-" + rowIndex, subProdOfferOrderGrid)[0].childNodes[0].checked = flag;
				        if (!flag) {
					        dojo.query(".orderStatus_" + rowIndex,subProdOfferOrderGrid)[0].innerText = "\u672a\u8ba2\u8d2d";
				        } else {
					        dojo.query(".orderStatus_" + rowIndex,subProdOfferOrderGrid)[0].innerText = "\u8ba2\u8d2d";
				        }	
			        });
		        },
		        /**
				 * 获取表格中的绑定数据
				 */
		        getSubGridBindingData : function() {
			        var allRowData = this.subProdOfferOrderGrid.ds.getRawData();
			        return dojo.filter(allRowData, function(data){
			        	return data.showData.prodOfferStyle != "prod-offer-invalid";
			        });
		        },
		        
		        /**
		         * 获取表格中所有的数据
		         */
		        getAllSubGridData : function(){
		        	return this.subProdOfferOrderGrid.ds.getRawData();
		        },
		        /**
		         * 将购物车中的销售品项设置为无效状态
		         */
		        setInvalidProdOfferCartData : function(invalidProdOfferCartData){
		        	var subProdOfferCartDataProvider = this;
		        	var subProdOfferOrderGridDom = this.subProdOfferOrderGrid.domNode;
		        	dojo.forEach(invalidProdOfferCartData, function(data){
			        	data.showData.prodOfferStyle = "prod-offer-invalid";
			        	var rowIndex = data.rowIndex;
			        	//置为不选
			        	dojo.query(".subProdOfferDetail-"+ rowIndex, subProdOfferOrderGridDom)[0].childNodes[0].checked = false;
			        	dojo.query(".subProdOfferDetail-"+ rowIndex, subProdOfferOrderGridDom)[0].childNodes[0].disabled = "disabled";
			        	dojo.query(".orderStatus_" + rowIndex,subProdOfferOrderGridDom)[0].innerText = "未订购";
			        	//将销售品详情链接设置为不可点击
//			        	if(data.showData.prodOfferDetailFlag == 1){
//			        		dojo.query(".subProdOfferDetail-"+ rowIndex, subProdOfferOrderGridDom)[0].childNodes[4].disabled = true;
//			        	}
			        	//将页面当前条目的样式设置为prod-offer-invalid
//			        	dojo.attr(dojo.query(".subProdOfferDetail-"+ rowIndex, subProdOfferOrderGridDom)[0],"class","prod-offer-invalid");
//			        	dojo.attr(dojo.query(".subProdOfferStartDate-"+ rowIndex, subProdOfferOrderGridDom)[0],"class","prod-offer-invalid");
//			        	dojo.attr(dojo.query(".subProdOfferEndDate-"+ rowIndex, subProdOfferOrderGridDom)[0],"class","prod-offer-invalid");
//			        	dojo.attr(dojo.query(".orderStatus_"+ rowIndex, subProdOfferOrderGridDom)[0],"class","prod-offer-invalid");
//			        	dojo.attr(dojo.query(".choose_number_class_"+ rowIndex, subProdOfferOrderGridDom)[0],"class","prod-offer-invalid");
//			        	dojo.attr(dojo.query(".collect_prodOffer_"+ rowIndex, subProdOfferOrderGridDom)[0],"class","prod-offer-invalid");
			        	subProdOfferCartDataProvider.setSubGridCssStyle(data.showData.prodOfferStyle,data.rowIndex);
			        	subProdOfferCartDataProvider.setSubOfferViewDisplay(rowIndex,true);
			        });
		        },
		        /**
		         * 更新当前可选包的页面样式
		         */
		        updateCurrentProdOfferStyle : function(currentBindData,classStyle){
		        	var subProdOfferCartDataProvider = this;
		        	var subProdOfferOrderGridDom = this.subProdOfferOrderGrid.domNode;
		        	var rowIndex = currentBindData.rowIndex;
		        	
		        	if(classStyle == "prod-offer-del"){
		        		if(currentBindData.showData.prodOfferStyle == "prod-offer-reserve"){
		        			currentBindData.showData.oldProdOfferStyle = currentBindData.showData.prodOfferStyle;
		        		}
		                var viewId = currentBindData.showData.viewId;
		                var subProdOfferEndDateDiv = dojo.query(".subProdOfferEndDate-"
		                                + rowIndex, subProdOfferOrderGridDom)[0];
		                dojo.query(".orderStatus_" + rowIndex, subProdOfferOrderGridDom)[0].innerText = "已退订";
		                if(!dojo.query(".subProdOfferDetail-"+ rowIndex, subProdOfferOrderGridDom)[0].childNodes[0].checked&&currentBindData.prodOfferInst!=null){
		                	if (dojo.query("[id='offerDelayEndDateView-" + viewId + "']",
			                        subProdOfferEndDateDiv)[0]) {
				                dojo.query("[id='offerDelayEndDateView-" + viewId + "']",
			                        subProdOfferEndDateDiv)[0].style.display="";
			                }
			                if(dojo.query("[id='offerEndDateDisplay-" + viewId + "']",
			                        subProdOfferEndDateDiv)[0]){
			                	dojo.query("[id='offerEndDateDisplay-" + viewId + "']",
			                        subProdOfferEndDateDiv)[0].style.display="none";
			                }
		                }
		                
		        	}else if(classStyle == "prod-offer-change"){
		        		if(currentBindData.showData.oldProdOfferStyle&&currentBindData.showData.oldProdOfferStyle == "prod-offer-reserve"){
		        			classStyle = "prod-offer-reserve";
		        		}
		        		var viewId = currentBindData.showData.viewId;
		                var subProdOfferEndDateDiv = dojo.query(".subProdOfferEndDate-"
		                                + rowIndex, subProdOfferOrderGridDom)[0];
		                dojo.query(".orderStatus_" + rowIndex, subProdOfferOrderGridDom)[0].innerText = "用户已有";
		                if(dojo.query(".subProdOfferDetail-"+ rowIndex, subProdOfferOrderGridDom)[0].childNodes[0].checked&&currentBindData.prodOfferInst!=null){
		                	if (dojo.query("[id='offerDelayEndDateView-" + viewId + "']",
			                        subProdOfferEndDateDiv)[0]) {
				                dojo.query("[id='offerDelayEndDateView-" + viewId + "']",
			                        subProdOfferEndDateDiv)[0].style.display="none";
			                }
			                if(dojo.query("[id='offerEndDateDisplay-" + viewId + "']",
			                        subProdOfferEndDateDiv)[0]){
			                	dojo.query("[id='offerEndDateDisplay-" + viewId + "']",
			                        subProdOfferEndDateDiv)[0].style.display="";
			                }
		                }
		        	}else if(classStyle == "prod-offer-add"){
		        		subProdOfferCartDataProvider.setSubOfferViewDisplay(rowIndex,false);
		        		dojo.query(".orderStatus_" + rowIndex, subProdOfferOrderGridDom)[0].innerText = "订购";
		        	}else if(classStyle == "prod-offer-unorder"){
		        		if(!!$ac$.get('currentOperDelView')){
		        			//提供隐藏方法
		        			subProdOfferCartDataProvider.setSubOfferViewDisplay(rowIndex,true);
		        		}
		        		dojo.query(".orderStatus_" + rowIndex, subProdOfferOrderGridDom)[0].innerText = "未订购";
		        	}
		        	subProdOfferCartDataProvider.setSubGridCssStyle(classStyle,rowIndex);
		        	currentBindData.showData.prodOfferStyle = classStyle;
		        	subProdOfferCartDataProvider.dealTimeDisplayByChgMain(currentBindData,true);
		        },
		        
		        /**
		         * 临时保存销售品的样式
		         */
		        _tempSaveOfferStyle : function(currentBindData){
		        	
		        },
		        
		        /**
		         * 外部接口（订购销售品）
		         */
		        batchOrderSubProdOffer : function(prodOfferInfoList){
		        	var subProdOfferCartDataProvider = this;
					//订购展示销售品
			        dojo.forEach(prodOfferInfoList,function(subProdOfferInfo) {
			        	  //拼接一行的绑定数据
			        	  var rowData = util.ProdOfferHelper.createProdOfferRowData(subProdOfferInfo);
			        	  //获取使用号码集合
			        	  var chooseNumberObjList = subProdOfferCartDataProvider.doGetChooseNumList(subProdOfferInfo);
			        	  if(chooseNumberObjList.chooseNumberList.length >0 ){
			        	  		//默认取第一个号码为使用号码
			        	  		rowData.showData.chooseNumberObj = chooseNumberObjList.chooseNumberList[0];
			        	  }else{
			        	  		//没有使用号码，则不生成使用号码
			        	  		rowData.showData.chooseNumberObj =null;
			        	  }
			        	  //向表格中添加一行
				          subProdOfferCartDataProvider.addOneRow(rowData);
	                });
		        },
		        /**
				 * 获取可选包购物车中的数据
				 */
		        getSubProdOfferPageData : function() {
		        	var subProdOfferCartDataProvider = this;
		        	var mainProdOfferPageData = null;
		        	if(subProdOfferCartDataProvider.prodOfferInfoWidget){
		        		mainProdOfferPageData = subProdOfferCartDataProvider.prodOfferInfoWidget.getPageData();
		        		if(!mainProdOfferPageData){
		        			return false;
		        		}
		        		//将当前的可选包的tab页对象放置到主销售品中
		        		mainProdOfferPageData.currentContentPane = this.contentPane;
		        		mainProdOfferPageData.mainProdOfferDetailWidget = subProdOfferCartDataProvider.prodOfferInfoWidget.mainProdOfferDetailWidget;
		        	}
		        	var bindingData = this.getSubGridBindingData();
		        	// 0.数据的正确性的检测，避免引起后续的不必要的错误信息提示
		        	if(!this.controller.route("/checkInstance/checkIfHasUseNumber",bindingData,null)){
			        	return false;
			        }
			        // 1.获取可选包购物车中的数据信息
			        this.saveSubProdOfferViewData();
			        // 2.循环获取销售品详情数据,同时针对销售品详情中数据进行检测
			        for(var p=0;p<bindingData.length;p++){
			        	var data = bindingData[p];
			        	var rowIndex = data.rowIndex;
			        	var prodOfferInst = data.prodOfferInst;
			        	//放入可选包销售品页面状态
			        	data.prodOfferPageInfo = subProdOfferCartDataProvider.pageData[rowIndex];
			        	//针对销售品详情进行数据收集
			        	if(data.prodOfferPageInfo.checkBoxValue&&data.showData.prodOfferDetailFlag == 1&&!!data.handlePageData&&dojo.isFunction(data.handlePageData)){
			        		if(data.handlePageData()===false){
			        			return false;
			        		}	
			        	}
			        	if(!data.relaProdPageInfoList||data.relaProdPageInfoList.length==0){
			        		data.relaProdPageInfoList = subProdOfferCartDataProvider.getDefaultSubrodPageData(data);
						}
						if(!data.offerAttrPageInfoList){
								var attrInstList = {};
								if(!!prodOfferInst&&!!prodOfferInst.offerInstAttrList){									
									dojo.forEach(prodOfferInst.offerInstAttrList,function(attrInstVO){
										var attrVO =  dojo.filter(data.subProdOfferInfo.attrList,function(vo){
														return vo.attrCd == attrInstVO.attrCd;
													})[0];
														
										var convertValue = attrInstVO.attrValue;
										if(!!attrVO && !isNaN(convertValue)){
											if(attrVO.valueUnit == util.AttrUnitConst.unitConst 
													|| attrVO.valueUnit == util.AttrUnitConst.minuteConst){
												convertValue = parseFloat(convertValue+"")/100;
											}
										}
										attrInstList[""+attrInstVO.attrCd] = convertValue;
									})
								}
			        			data.offerAttrPageInfoList = util.AttrUtil.getAttrDefaultValueList(!!prodOfferInst&&!!prodOfferInst.offerInstAttrList?attrInstList:data.subProdOfferInfo.attrList);
						}
						if(!data.relaBusPageInfoList){
							if(!!prodOfferInst){
								var relaBusPageInfoList = [];
								var FavourKindConst = ConstantsPool.load("FavourKindConst").FavourKindConst;
								var chooseNumberObj = !!data&&!!data.showData?data.showData.chooseNumberObj:null;
								var userId = (!!chooseNumberObj&&!!chooseNumberObj.userId?chooseNumberObj.userId:0)+"";
								if(!!prodOfferInst.selfFavourRelaList && prodOfferInst.selfFavourRelaList.length > 0){
									var selfFavourRelaList = prodOfferInst.selfFavourRelaList;//自惠亲情
				        			dojo.forEach(selfFavourRelaList,function(selfFavourRelaVO){
				        				relaBusPageInfoList.push({				        				
											"cityCode" : "",
											"userId" : userId,
											"serviceId" : "",
											"serviceKind" : "0",
											"favourKind" : FavourKindConst.SELF_FAVOUR,// 亲情类型
											"prodOfferId" : selfFavourRelaVO.prodOfferId,// 销售品id
											"operKind" : 2,//操作类型
											"objServiceId" : selfFavourRelaVO.objectServiceId,//亲情类型
											"objCityCode" : selfFavourRelaVO.objCityCode,//地市编码
											"objServiceKind" : selfFavourRelaVO.objServiceKind,//业务类型
											"ifBind" : "-1",
											"netOwner" : selfFavourRelaVO.netOwner,//网络提供商
											"areaId" : "",
											"subGroupType" : selfFavourRelaVO.subGroupType
				        				});
				        			});
								
								}else if(!!prodOfferInst.favourRelaList && prodOfferInst.favourRelaList.length > 0){
									var favourRelaList = prodOfferInst.favourRelaList;//互惠亲情
				        			dojo.forEach(favourRelaList,function(favourRelaVO){
				        				relaBusPageInfoList.push({				        				
											"cityCode" : "",
											"userId" : userId,
											"serviceId" : "",
											"serviceKind" : "0",
											"favourKind" : FavourKindConst.COMMON_FAVOUR,// 亲情类型
											"unitId" : favourRelaVO.unitId,
											"prodOfferId" : favourRelaVO.prodOfferId,// 销售品id
											"operKind" : 2,//操作类型
											"objServiceId" : favourRelaVO.serviceId,//亲情类型
											"objCityCode" : favourRelaVO.cityCode,//地市编码
											"objServiceKind" : favourRelaVO.serviceKind,//业务类型
											"ifBind" : "-1",
											"netOwner" : "",//网络提供商
											"areaId" : "",
											"subGroupType" : ""
				        				});
				        			});
								
								}else if(!!prodOfferInst.ocsSubseridInfoList && prodOfferInst.ocsSubseridInfoList.length > 0){
									var ocsSubseridInfoList = prodOfferInst.ocsSubseridInfoList;//ocs亲情
				        			dojo.forEach(ocsSubseridInfoList,function(ocsSubseridInfoVO){
				        				relaBusPageInfoList.push({				        				
											"cityCode" : "",
											"userId" : userId,
											"serviceId" : "",
											"serviceKind" : "0",
											"favourKind" : FavourKindConst.OCS_FAVOUR,// 亲情类型
											"unitId" : "",
											"prodOfferId" : ocsSubseridInfoVO.prodOfferId,// 销售品id
											"operKind" : 2,//操作类型
											"objServiceId" : ocsSubseridInfoVO.objServiceId,//亲情类型
											"objCityCode" : ocsSubseridInfoVO.cityCode,//地市编码
											"objServiceKind" : ocsSubseridInfoVO.serviceKind,//业务类型
											"ifBind" : "-1",
											"netOwner" : "",//网络提供商
											"areaId" : "",
											"subGroupType" : ocsSubseridInfoVO.subGroupType
				        				});
				        			});								
								}
								if(relaBusPageInfoList.length > 0){
									data.relaBusPageInfoList = relaBusPageInfoList;
								}
							}
						}
						if(!data.resRelaPageInfoList){
			        			data.resRelaPageInfoList = !!prodOfferInst&&!!prodOfferInst.resRelaInfoList?
			        					prodOfferInst.resRelaInfoList:data.resRelaPageInfoList;
						}
			        }
			        
			        // 3.提交数据前
			        var data = {
			        	checkedProdOfferGridData : null,
			        	allSubProdOfferCartData : bindingData
			        };
			        if(!this.controller.route("/checkInstance/doCheckBeforeCommit",data,subProdOfferCartDataProvider)){
			        	return false;
			        }
			        return {
			        	subProdOfferPageData : bindingData,
			        	mainProdOfferPageData : mainProdOfferPageData
			        };
		        },
		        /**
		         * 获取可选包默认产品信息
		         */
		        getDefaultSubrodPageData : function(data){
		        	var relaProdPageInfoList = [];
		        	var controller = this.controller;
		        	//如果页面提交的数据没有产品信息，但是规格数据中有关联的产品信息
		        	if((!data.relaProdPageInfoList||data.relaProdPageInfoList.length==0)&&data.subProdOfferInfo.offerProdRelaList.length>0){
		        		var subProdRelaList = dojo.filter(data.subProdOfferInfo.offerProdRelaList,function(offerProdRela){
		        			return offerProdRela.productInfoVO.prodFuncType != ConstantsPool.load("ProductFuncTypeConst").ProductFuncTypeConst.ACCESS;
		        		});
		        		//通过使用号码的接入类产品过滤出适用的产品集合
				        var relProdRelaList = dojo.filter(subProdRelaList,function(prodInfo){
				        	return dojo.some(prodInfo.productInfoVO.prodRelaList,function(relaProdInfo){
				        			return (relaProdInfo.relaType == util.PRODOFFERTYPE.SUBORDINATE_TYPE)
				        				&&(relaProdInfo.prodA==data.showData.chooseNumberObj.productId);
				        		});
				        });
		        		//可选包下面的关联产品集合，要不就是功能类，要不就是接入类，不会共存
		        		if(relProdRelaList.length>0){
		        			var ifDefault = 0;
		        			if(relProdRelaList.length==1){
		        				//如果只有一个关联产品，则默认选中
		        				ifDefault=1;
		        			}
		        			dojo.forEach(relProdRelaList,function(prodInfo){
			        			var prodInstInfo = null;
			        			if(!!data.prodOfferInst&&!!data.prodOfferInst.prodInstList&&data.prodOfferInst.prodInstList.length>0){
			        				prodInstInfo = dojo.filter(data.prodOfferInst.prodInstList,function(productInfo){
			        					return prodInfo.productId == productInfo.productId;
			        				})[0];		        				
			        			}
			        			
								var attrInstList = {};
								if(!!prodInstInfo&&!!prodInstInfo.prodInstAttrList){									
									dojo.forEach(prodInstInfo.prodInstAttrList,function(attrInstVO){
										var attrVO =  dojo.filter(prodInfo.productInfoVO.attrList,function(vo){
														return vo.attrCd == attrInstVO.attrCd;
													})[0];
														
										var convertValue = attrInstVO.attrValue;
										if(!!attrVO && !isNaN(convertValue)){
											if(attrVO.valueUnit == util.AttrUnitConst.unitConst 
													|| attrVO.valueUnit == util.AttrUnitConst.minuteConst){
												convertValue = parseFloat(convertValue+"")/100;
											}
										}
										attrInstList[""+attrInstVO.attrCd] = convertValue;
									})
								}
			        			var prodInfoData = {
			        				"prodBasicInfo":{
			        					"productId":prodInfo.productId,
			        					"prodInstId" : !!prodInstInfo?prodInstInfo.prodInstId:null,
				        				"prodInstInfo":!!prodInstInfo?prodInstInfo:null,
				        				"checkedStatus":ifDefault==1||prodInfo.ifDefault==1||!!prodInstInfo?true:false
			        				},
			        				"prodAttrInfo" : util.AttrUtil.getAttrDefaultValueList((!!prodInstInfo && !!prodInstInfo.prodInstAttrList)
																	? attrInstList
																	: prodInfo.productInfoVO.attrList),
									"productInfo" : prodInfo								
			        			}
			        			relaProdPageInfoList.push(prodInfoData);
			        			
			        		});
		        		}else{//接入类
		        			var accessProdInfo = dojo.filter(data.subProdOfferInfo.offerProdRelaList,function(prodInfo){
		        				if(prodInfo.productId == data.showData.chooseNumberObj.productId){
		        					return true;
		        				}
		        			})[0];
		        			/*换受理并且是退订的可选包，下面挂接入类的不拼接入类*/
		        			var prodChgClass = "orderaccept.prodofferaccept.loader.ProductChangeAcceptLoader";
		        			var ifProdChange = false;
		        			if(!!controller && !!controller.declaredClass){		        			
								if(controller.declaredClass == prodChgClass 
										&& !data.prodOfferPageInfo.checkBoxValue
										&& data.prodOfferInst != null){	
									ifProdChange = true;								
								}
		        			}
		        			if(!ifProdChange){
		        				var prodInfoData = {
			        				"prodBasicInfo":{
			        					"productId":accessProdInfo.productId,
			        					"prodInstId" :null,
				        				"prodInstInfo":null,
				        				"checkedStatus":true
			        				},
			        				"prodAttrInfo" : null,
									"productInfo" : accessProdInfo			
			        			}
			        			relaProdPageInfoList.push(prodInfoData);
		        			}

		        		}
		        		
		        		
		        	}
		        	return relaProdPageInfoList;
		        },
		        
		        /**
		         * 重置可选包购物车，针对预配的可选包的处理
		         */
		        dealCoopNumOfferForReset : function(){
		        	var _provider = this;
					var uniqueId = _provider.uniqueId||"";
					var prodOfferInfoList = $ac$.get("coopNumOffers"+uniqueId);
					var bindData = _provider.getSubGridBindingData();
					//过滤出需要添加的可选包的集合
					var need2AddList = dojo.filter(prodOfferInfoList,function(prodOfferVO){
						return !dojo.some(bindData||[],function(_data_){
							return _data_.subProdOfferInfo.prodOfferId == prodOfferVO.prodOfferId;
						});
					});
					_provider.batchAddForCoopNum(need2AddList);
		        },
		        
		        /**
		         * 批量增加预配号码相关的可选包 
		         */
		        batchAddForCoopNum : function(need2AddList){
		        	var _provider = this;
		        	dojo.forEach(need2AddList,function(subProdOfferInfo) {
			        	  //拼接一行的绑定数据
			        	  var rowData = util.ProdOfferHelper.createProdOfferRowData(subProdOfferInfo);
			        	  //获取使用号码集合
			        	  var chooseNumberObjList = _provider.doGetChooseNumList(subProdOfferInfo);
			        	  if(chooseNumberObjList.chooseNumberList.length >0 ){
			        	  		//默认取第一个号码为使用号码
			        	  		rowData.showData.chooseNumberObj = chooseNumberObjList.chooseNumberList[0];
			        	  }else{
			        	  		//没有使用号码，则不生成使用号码
			        	  		rowData.showData.chooseNumberObj =null;
			        	  }
			        	  //添加一个标识,说明是和预配卡相关的
			        	  rowData.coopNumRela = true;
			        	  //向表格中添加一行
				          _provider.addSimpleOneRow(rowData);
	                });
		        },
		        
		        /**
		         * 针对预配卡接口。不考虑互斥和依赖
		         * @param prodOfferIdList --对于预配卡需要选中的可选包集合
		         */
		        interFaceForCoopNum : function(prodOfferIdList){
		        	var _provider = this;
		        	//移除原来的预配卡号相关的销售品
		        	_provider.removeCoopNumRelaOffer();
		        	//添加新的预配卡号码
		        	_provider.addForCoopNum(prodOfferIdList);
		        },
		        
		        /**
		         * 添加可选包记录
		         */
		        addForCoopNum : function(prodOfferIdList){
					var _provider = this;
					var uniqueId = _provider.uniqueId||"";
					//1.如果没有销售品集合则不处理
					if(!prodOfferIdList||prodOfferIdList.length == 0){
						//清空预配的可选包集合
						$ac$.set("coopNumOffers"+uniqueId,[]);
						return ;
					}
					//2.可选包表格Dom节点
					var subProdOfferOrderGridDom = this.subProdOfferOrderGrid.domNode;
					//3.获取页面上有效的绑定数据
					var bindData = _provider.getSubGridBindingData();
					
					//4.针对未选中的进行选中
					var need2CheckList = dojo.filter(bindData||[],function(_data){
						return dojo.some(prodOfferIdList||[],function(prodOfferId){return prodOfferId ==_data.subProdOfferInfo.prodOfferId; })&&
						dojo.query(".subProdOfferDetail-" + _data.rowIndex,
						                        subProdOfferOrderGridDom)[0].childNodes[0].checked == false;
					});
					dojo.forEach(need2CheckList||[],function(_temp_){
						_provider.updateOfferStyle(_temp_,"prod-offer-add");
					});
					//5.过滤出需要添加的可选包的集合
					var need2AddList = dojo.filter(prodOfferIdList,function(prodOfferId){
						return !dojo.some(bindData||[],function(_data_){
							return _data_.subProdOfferInfo.prodOfferId == prodOfferId;
						});
					});
					var belongCode = function() {
				        try {
					        return prodOfferAcceptLoader.getBelongCode()
				        }
				        catch (e) {}
			        }();
					var subProdOfferList = util.ServiceFactory.getService(
		                "url:orderDetailAction.do?method=getBatchProdOfferDetail&prodOfferIdListStr="
		                        + dojo.toJson(need2AddList)+"&interfaceType=" + 5 + "&belongCode="
					                + (belongCode || ""));
		            _provider.batchAddForCoopNum(subProdOfferList);
	                //缓存预配号码相关的可选包，供购物车重置用
	                var allData = dojo.map(_provider.getSubGridBindingData()||[],function(_data){
	                	return _data.subProdOfferInfo;
	                });
	                $ac$.set("coopNumOffers"+uniqueId,dojo.map(prodOfferIdList||[],function(prodOfferId){
	                	return BusCard.find(allData||[],function(_data_){
	                		return _data_.prodOfferId == prodOfferId;
	                	});
	                }));
		        },
		        
		        /**
		         * 添加一行的简单方法，不考虑
		         */
		        addSimpleOneRow : function(rowData){
		        	var _provider = this;
		        	rowData.uniqueId = _provider.uniqueId;
		        	_provider.subProdOfferOrderGrid.add(rowData);
		        	_provider.setSubGridCssStyle(rowData.showData.prodOfferStyle,rowData.rowIndex);
		        },
		        
		        /**
		         * 移除预配号码相关的可选包
		         */
		        removeCoopNumRelaOffer : function(){
		        	var _provider = this;
					//获取页面上有效的绑定数据
					var bindData = _provider.getSubGridBindingData();
					var removeBindData = dojo.filter(bindData||[],function(_data_){
						return _data_.coopNumRela == true;
					});
					dojo.forEach(removeBindData||[],function(_data_){
						_provider.updateOfferStyle(_data_,"prod-offer-unorder");
					});
		        },
		        
		        /**
		         * 页面样式
		         */
		        updateOfferStyle : function(_data_,classStyle){
		        	var _provider = this;
		        	var subProdOfferOrderGridDom = this.subProdOfferOrderGrid.domNode;
		        	var rowIndex = _data_.rowIndex;
		        	if(classStyle == "prod-offer-unorder"){
		        		_data_.coopNumRela = false;
						_provider.setSubOfferViewDisplay(rowIndex,true);
	        			dojo.query(".subProdOfferDetail-" + rowIndex,
					                        subProdOfferOrderGridDom)[0].childNodes[0].checked = false;
	        			dojo.query(".orderStatus_" + rowIndex, subProdOfferOrderGridDom)[0].innerText = "未订购";
	        			_provider.setSubGridCssStyle(classStyle,rowIndex);
		        	}else{
		        		_data_.coopNumRela = true;
						_provider.setSubOfferViewDisplay(rowIndex);
		        		dojo.query(".subProdOfferDetail-" + rowIndex,
						                        subProdOfferOrderGridDom)[0].childNodes[0].checked = true;
		        		dojo.query(".orderStatus_" + rowIndex, subProdOfferOrderGridDom)[0].innerText = "订购";
		        		_provider.setSubGridCssStyle(classStyle,rowIndex);
		        	}
		        },

		        /**
		         * 订单暂存提供方法(该方法与非订单暂存方法几乎一致，去掉校验的方法)
		         */
		        getTempSaveSubProdOfferPageData : function(){
		        	var subProdOfferCartDataProvider = this;
		        	// 0.获取可选包区域中的成员销售品信息
		        	var mainProdOfferPageData = null;
		        	if(subProdOfferCartDataProvider.prodOfferInfoWidget){
		        		mainProdOfferPageData = subProdOfferCartDataProvider.prodOfferInfoWidget.getPageData();
		        	}
			        // 1.获取可选包购物车中的数据信息
			        this.saveSubProdOfferViewData();
			        
			        // 2.将可选包右侧区域的页面信息放入绑定数据
			        var bindingData = this.getSubGridBindingData();
			        dojo.forEach(bindingData, function(data){
			        	var rowIndex = data.rowIndex;
			        	data.prodOfferPageInfo = subProdOfferCartDataProvider.pageData[rowIndex];
			        });
			        return {
			        	subProdOfferPageData : bindingData,
			        	mainProdOfferPageData : mainProdOfferPageData
			        };
		        },
		        /**
		         * 展示可选包区域中订单暂存的销售品信息
		         */
		        showTempSaveProdOffer : function(){
		        	var subProdOfferCartDataProvider = this;
		        	var tempSaveObj = dojo.global.$appContext$.get("_tempSaveProdOfferObj_"+subProdOfferCartDataProvider.uniqueId)
		        	//1.展示订单暂存数据中的成员套餐信息
		        	// TODO
		        	var mainProdOfferPageData = tempSaveObj.mainProdOfferPageData;
		        	
		        	
		        	//2.展示订单暂存数据中的可选包销售品信息(稍后根据不同的需求进行调整)
		        	var subProdOfferPageData = tempSaveObj.subProdOfferPageData;
		        	dojo.forEach(subProdOfferPageData, function(rowData){
		        		subProdOfferCartDataProvider.subProdOfferOrderGrid.add(rowData);
		        	});
		        },
		        /**
		         * 展示改单销售品信息(形如变更)
		         * 
		         */
		        showOrderChangeProdOffer : function(){
		        	this.showProdOfferFromOrderItem();
		        },
		        
		        /**
		         * 根据订单项数据来展现可选包购物车中的销售品视图
		         */
		        showProdOfferFromOrderItem : function(){
		        	var subProdOfferCartDataProvider = this;
		        	//1.获取可选包销售品对应的订单项数据
		        	var custOrderHelper = util.CustOrderVOHelper.getInstance(dojo.global.$appContext$.get("_custOrderVO_"));
		        	var subProdOfferOrderItemList = custOrderHelper.getSubProdOfferItemList();
		        	//2.根据销售品订单项数据来生成可选包视图
		        	dojo.forEach(subProdOfferOrderItemList, function(item){
		        		var prodItemList = custOrderHelper.getServiceProdItemListForOfferItem(item);
		        		var rowData = util.ProdOfferHelper.createProdOfferRowDataByOrderItem(item,prodItemList);
			        	//获取使用号码集合
			        	var chooseNumberObjList = subProdOfferCartDataProvider.doGetChooseNumByOrderItem(rowData,custOrderHelper);
			        	if(chooseNumberObjList.length >0 ){
			        	  	//默认取第一个号码为使用号码
			        	  	rowData.showData.chooseNumberObj = chooseNumberObjList[0];
			        	}else{
			        	    //没有使用号码，则不生成使用号码
			        	  	rowData.showData.chooseNumberObj =null;
			        	}
			        	//向表格中添加一行
				        subProdOfferCartDataProvider.subProdOfferOrderGrid.add(rowData);
		        	});
		        },
		        /**
		         * 
		         */
		        doGetChooseNumByOrderItem : function(singleBindingData,custOrderHelper){
		        	var trs = dojo.query(".main-product-basic", this.controller.mainProdOfferWidget.domNode),
		        		chooseNumberList = [],
		        		currentProdOfferOrderItem = singleBindingData.offerItemData;
		        	if(!currentProdOfferOrderItem){
		        		return chooseNumberList;
		        	}
		        	var accessOrderItem = custOrderHelper.getAcessProdItem(currentProdOfferOrderItem);
		        	if(accessOrderItem  == null){
		        		return chooseNumberList;
		        	}
		        	//获取销售品下的关联产品信息
        			var serviceId = accessOrderItem.serviceId,
        				prodBasicTr = dojo.filter(trs, function(tr) {
        					var tempView =  dojo.attr(tr, "viewId");    
					        return dojo.query(".serviceId-" + tempView, tr)[0].value == serviceId;
				        })[0],
				        viewId = dojo.attr(prodBasicTr, "viewId");
						chooseNumberList.push({
			        		serviceKind : dojo.attr(prodBasicTr, "serviceKind") || "-1",
			        		serviceKindIndex : dojo.attr(prodBasicTr, "serviceKindIndex") || "-1",
			        		serviceId : dojo.query(".serviceId-" + viewId, prodBasicTr)[0].value,
			        		productId : dojo.attr(prodBasicTr, "productId") || "-1"
		        		});
		        	return chooseNumberList;
		        }
		        
		        
        });
	});