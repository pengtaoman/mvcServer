defineModule("orderaccept.prodofferaccept.loader.PromotionChangeLoader", ["../util",
                "../../base/Controller","../widget/commcard/CommCardWidget",
                "../builder/promotiondetail/PromotionDetailBuilder",
                "../widget/attrcard/PromotionItemsCardWidget",
                "../widget/promotionchange/PromotionChangeWidget", 
                "orderaccept.common.dialog.MessageBox",
                "../builder/promotiondetail/PromotionSearchBuilder",
                "../../common/js/ConstantsPool","../widget/resourcecard/ResourceCardWidget"],
        function(util,Controller,CommCardWidget,PromotionDetailBuilder,PromotionItemsCardWidget,
        			PromotionChangeWidget,messageBox,PromotionSearchBuilder,ConstantsPool,ResourceCardWidget) {
	        /**
			 * 定义促销政策变更整体控制器
			 * 
			 * @class
			 * @extends
			 */
	        dojo.declare("orderaccept.prodofferaccept.loader.PromotionChangeLoader", [Controller,PromotionDetailBuilder], {
		        layoutTemplateUrl : dojo.moduleUrl("orderaccept.prodofferaccept",
		                "view/promotionChangeLayout.html"),
                behaviorInstance : null,
                promotionOperatorCardWidget : null,
                dataBuilder : null,
                promotionInfo : null,
                promotionDetailWidget : null,
                promotionItemsCard : null,
                promotionChangeInfo : null,
                promotionChangeDetailWidget : null,
                promotionChangeItemsCard : null,
                promotionItemsWidgetClass : PromotionItemsCardWidget,
                controller : null,
                beanBuildFactory:null,
                resCardInfo : null,
                mktResTypeCd : null,
                promotionSearchBuilderClass : PromotionSearchBuilder,
                promotionSearchBuilderObj : null,
                promotionInstVO : null,
                promotionResInfoList : [],
                constructor : function(param) {
			        this.requestParam = param;
			        this.promotionInstVO = param.salesPromotionInstVO;
			        if(!!unieap){
						unieap.getTopWin = function() {
							return window;
						};
					}
		        },
		        postscript : function() {
			        dojo.global.$appContext$.set("requestParam",this.requestParam);
			        dojo.mixin(this.eventListenerRegistry, dojo.global.$appContext$
			                        .get(this.declaredClass + ".eventListenerRegistry"));
			        
			        dojo.global.$appContext$.deleteProperty(this.declaredClass
			                + ".eventListenerRegistry")
			        
			        var rootNode = dojo.byId("promotion-change-root");
			        
			        rootNode.innerHTML = dojo._getText(this.layoutTemplateUrl);
			        
			        dojo.parser.parse(rootNode);
			        
			        // 异步执行
			        this.asynExecute(this._asynLoadSriptList(), dojo.hitch(this, "_asynCallback"));
			        
		        },
		        _asynCallback : function() {
			        controller = this;
			        // 监听各种事件
			        controller.initBehavior();
			        //初始化促销政策详细信息
			        controller.initPromotionWidget();
			        // 初始营销资源信息
			        controller.initPromotionResRelaWidget();
			        if(controller.requestParam.flag=="modify" || controller.requestParam.flag=="delete"){
			        	unieap.byId("newPromotionInfoPane").destroy();
			        	unieap.byId("newPromotionResRelaPane").destroy();
			        	dojo.byId("chargeBtn").style.display = "";//促销修改时，缴费按钮可见
			        }else{
			        	//controller.renderPromotionGroup();
			        	//controller.renderPromotionInfo();
			        	//controller.filterPromotionInfoByGroup();
			        	var searchObj = dojo.byId("promotionSearch");
			        	if(searchObj){
			        		searchObj.src = BusCard.path.contextPath + "/common/images/search_btn.png";
			        		searchObj.style.cursor = "pointer";
			        		dojo.connect(dojo.query("[id=promotionSearch]")[0],"onclick",function(evt){
			        			controller.showPromotionSearchPage(evt);
			        		});
			        	}
			        }
			        //初始化经办人信息
			        controller.initOperatorInfoWidget();
			        // 初始化表单数据构建器
			        controller.initDataBuilder();
			        // 初始化bean构建器 needing refactoring later
			        controller.initBeanBuildFactory();
			        
		        },
		        /**
				 * 异步加装的模块,这里的模块要尽量保证其所依赖的模块已经加装完毕
				 * 
				 * @method
				 */
		        _asynLoadSriptList : function() {
			        
			        return [
			                "orderaccept.prodofferaccept.behavior.PromotionChangeBehavior",
			                "orderaccept.prodofferaccept.data.PromotionChangeDataBuilder"
			                ];
			                
		        },
		        /**
		         * 营销资源租机信息
		         */
		        initPromotionResRelaWidget : function() {
		        	var loader = this;
		        	var cardInfo = null;
		        	var mktResCd = null;
			        if(loader.promotionInfo.proodOfferInfo.resRelaList){
			        	var resRelaList = loader.promotionInfo.proodOfferInfo.resRelaList;
			        	for(index in resRelaList){
			        		mktResCd = resRelaList[index].mktResCd;
			        		if(mktResCd){
			        			if(mktResCd == 21){
			        				mktResCd = 20;
			        			}
			        			break;
			        		}
			        	}
			        	switch (mktResCd) {
			        	//租机
						case 20:
							cardInfo = BusCard.createInstance({
				        		promotionInstId : loader.requestParam.promotionInstId,
				        		level : 4
				        	}, Jscu.$('promotionResRelaPane'),{gType:2,cardId:182});
							break;
						//补贴券
						case 27:
							cardInfo = BusCard.createInstance({
				        		promotionInstId : loader.requestParam.promotionInstId,
				        		level : 4
				        	}, Jscu.$('promotionResRelaPane'),{gType:2,cardId:181});
							break;
						//礼券
						case 36:
							cardInfo = BusCard.createInstance({
				        		promotionInstId : loader.requestParam.promotionInstId,
				        		level : 4
				        	}, Jscu.$('promotionResRelaPane'),{gType:2,cardId:183});
							break;
						default:
							break;
						}
			        	if(cardInfo){
			        		cardInfo.init(function(){
			        			var card = this;
			        			if(card.$("costPrice")){
					        		card.$("costPrice").innerText = card.$("costPrice").innerText?card.$("costPrice").innerText:0;
					        	}
					        	if(card.$("retailPrice")){
					        		card.$("retailPrice").innerText = card.$("retailPrice").innerText?card.$("retailPrice").innerText:0;
					        	}
					        	if(card.$("subsidyFee")){
					        		card.$("subsidyFee").innerText = card.$("subsidyFee").innerText?card.$("subsidyFee").innerText/100:0;
					        	}
					        	
					        	if(card.$("realFee")){
					        		card.$("realFee").innerText = card.$("realFee").innerText?card.$("realFee").innerText/100:0;
					        	}
					        	
					        	var promotionInstVO = loader.promotionInstVO;
					        	var deviceRentInfoVO = promotionInstVO.deviceRentInfoVO;
					        	if(deviceRentInfoVO){//租机政策
					        		var rentKind = deviceRentInfoVO.rentKind;
					        		var userSource = deviceRentInfoVO.userSource;
					        		if(card.$("rentKind")){
					        			card.$("rentKind").value = rentKind;
					        		}
					        		if(card.$("userSource")){
					        			card.$("userSource").value = userSource;
					        		}
					        	}
			        		});
			        		loader.resCardInfo = cardInfo;
			        		loader.mktResTypeCd = mktResCd;
			        	}else{
			        		unieap.byId("promotionResRelaPane").destroy();
			        	}
			        }	
			        
		        },
		        
		        setValueForCard : function(promotionInstVO){
		        	var loader = this;
		        	var deviceRentInfoVO = promotionInstVO.deviceRentInfoVO;
		        	if(deviceRentInfoVO){//租机政策
		        		var rentKind = deviceRentInfoVO.rentKind;
		        		var resCardInfo = loader.resCardInfo;
		        	}
		        },
		        
		        
//		        changeResItemValue : function(){
//		        	var card = this;
//		        	if(card.$("costPrice")){
//		        		card.$("costPrice").innerText = card.$("costPrice").innerText?card.$("costPrice").innerText/100:0;
//		        	}
//		        	if(card.$("retailPrice")){
//		        		card.$("retailPrice").innerText = card.$("retailPrice").innerText?card.$("retailPrice").innerText:0;
//		        	}
//		        	/* 辽宁电信实收价在卡片中隐藏
//		        	if(card.$("realPrice")){
//		        		if(card.$("realPrice").tagName.toUpperCase()!='INPUT'){
//		        			card.$("realPrice").innerText = card.$("realPrice").innerText?card.$("realPrice").innerText/100:0;
//		        		}else{
//		        			card.$("realPrice").value = card.$("realPrice").value?card.$("realPrice").value:0;
//		        		}
//		        		
//		        	}
//		        	**/
//		        	if(card.$("subsidyFee")){
//		        		card.$("subsidyFee").innerText = card.$("subsidyFee").innerText?card.$("subsidyFee").innerText/100:0;
//		        	}
//		        	
//		        	if(card.$("realFee")){
//		        		card.$("realFee").innerText = card.$("realFee").innerText?card.$("realFee").innerText/100:0;
//		        	}
//		        },
		        
		        findCustRecognitionHeadWin : function() {
		        	try{
			        	var list = window.opener.top.document.getElementById("subframe").contentWindow.unieap.byId("createTab").getChildren();
	
						var menuNoDom = dojo.filter(list,function(node){
							return node.menuId=='841AB'
						});
						
						if(menuNoDom.length==0){
							return null;
						}
			        	var custRecContentWin = menuNoDom[0]._if.contentWindow.document.frames['CustRecognitionContent'];
						return custRecContentWin;
					}catch(e){
						return null;
					}
			        
		        },
		        
		        resetShoppingCartCount : function(){
		        	var custRecognitionWin = this.findCustRecognitionHeadWin();
		        	if(!!custRecognitionWin){
		        		custRecognitionWin.cust_Recognition_Head.showShoppingCartOrderCount();
		        	}
		        },
		        
		        /**
		         * 监听事件
		         */
		        initBehavior : function() {
		        	var loader = this;
		        	loader.behaviorInstance = new orderaccept.prodofferaccept.behavior.PromotionChangeBehavior(loader);
		        	//提交
		        	var promotionChangeSubmitWidget = dojo.byId("promotionChangeSubmitBtn"); 
		        	promotionChangeSubmitWidget.flag = loader.requestParam.flag;
		        	promotionChangeSubmitWidget._loader = loader;
			        dojo.connect(promotionChangeSubmitWidget,"onclick",loader.doSubmitPromotion);
			        
			        //受理完成
			        var promotionChangeCompleteBtn = dojo.byId("promotionChangeCompleteBtn");
			        promotionChangeCompleteBtn.disabled = true;
			        promotionChangeCompleteBtn._loader = loader;
			        dojo.connect(promotionChangeCompleteBtn,"onclick",function(){
			        		return loader.doCompletePromotion.apply(loader,arguments);
			        });
			        
			        //缴费
			        var chargeBtn = dojo.byId("chargeBtn");
			        dojo.connect(chargeBtn,"onclick",loader.doCharge);
			        
			        //免填单打印按钮
			        var printBtn = dojo.byId("printBtn");
			        //先隐藏掉，稍后放开
//			        if(loader.requestParam.flag!="modify"){
//			        	 printBtn.style.display='none';
//			        }
			        printBtn.disabled = true;
			        dojo.connect(printBtn,"onclick",loader.doPrint);
			        
		        },
		        
		        /**
		         * 免填单打印
		         */
		        doPrint : function(){
		        	var custOrderId = $ac$.get("promotionChangeCustOrderId");
		        	var paramData = {};
		        	paramData["custOrderId"] = custOrderId;
		        	paramData["serviceOfferId"] = "-251";
		        	paramData = BusCard.util.toJson(paramData);
		        	//alert(paramData);
		        	var pagePath = BusCard.path.contextPath
			                + "/printAction.do?method=doPrintInit&billKind=10&subBillKind=2000&custOrderId=" + custOrderId+"&_PrintJsonString=["+paramData+"]";
			        window.open(pagePath, "orderPrint",
			                        "height=700,width=1000,status=no,scrollbars=yes,toolbar=no,menubar=no,location=no,top=10,left=10");
		        },
		        /**
				 * 提交促销政策页面信息
				 * 
				 * @method
				 */
		        doSubmitPromotion : function() {
		        	var loader = this;
		        	if(!loader._loader.promotionChangeInfo && loader.flag == "change"){
		        		alert("请先选择目标政策");
		        		return false;
		        	}
			        var promotionData = controller.route("/dataBuilder/process");
			        //promotionData = false;
			        if (!promotionData) {
				        return false;
			        } else {
				        var submitResult = BusCard.doPost(BusCard.path.contextPath
				                        + "/promotionChangeAction.do?method=doSubmit&flag="+loader.flag,
				                        promotionData);
				        if (submitResult && submitResult.flag == -1) {
					        //alert("\u4fc3\u9500\u653f\u7b56\u4fee\u6539\u5931\u8d25\uff01" + submitResult.message);
					        messageBox.alert({
								busiCode : "08410157",
								infoList : [ submitResult.message ]
	 	 	 				});
					        return false;
				        }else{
				        	var resultStr = dojo.fromJson(submitResult.message);
				        	var custOrderId = resultStr.custOrderId;
				        	$ac$.set("promotionChangeCustOrderId",custOrderId);
				        	//alert("客户订单编号:"+custOrderId);
//				        	 messageBox.alert({
//								busiCode : "08410158",
//								infoList : [ custOrderId ]
//	 	 	 				});
				        	loader._loader.resetShoppingCartCount();
				        	var budgetInfo = resultStr.budgetInfo;
				        	if(budgetInfo){//保存订单后存在预算信息时调用预算组件
				        		dojo.byId("order-show-root").style.display = "";
				        		BudgetComponent.doOtherFeeBudget(budgetInfo).render(dojo.byId("order-show-root"));
				        		$ac$.set("budgetInfo",budgetInfo);
				        	}
				        	//置灰提交按钮
							dojo.byId("promotionChangeSubmitBtn").disabled = true;
							dojo.byId("printBtn").disabled = false;
							if(loader.flag=="change"){//变更
								//受理完成按钮设置可用
				        		dojo.byId("promotionChangeCompleteBtn").disabled = false;
							}else if(loader.flag=="modify" || loader.flag == "delete"){//修改/退订
								if(!budgetInfo){//修改不存在预算费用时,受理完成按钮置可用状态
									dojo.byId("promotionChangeCompleteBtn").disabled = false;
								}
							}
				        }
			        }
		        },
		        
		        /**
		         * 受理完成
		         */
		        doCompletePromotion : function(){
		        	var loader = this;
		        	var requestParam = $ac$.get("requestParam");
		        	if(requestParam.flag == "change"){//变更操作
		        		var promotionType = loader.promotionChangeInfo.promotionType;
		        		if(promotionType == "5"){//分月转兑促销,调用账务接口判断是否可以进行变更
		        			var promotionId = loader.promotionChangeInfo.promotionId;
			        		var salesPromotionInstVO = requestParam.salesPromotionInstVO;//原促销实例信息
			        		var param = "&promotionId="+promotionId+"&promotionInstId="+salesPromotionInstVO.promotionInstId;
		        			var level = "";
			        		var transferMonthLevel = ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.TRANSFER_MONTH_LEVEL;
			        		var itemCardData = loader.promotionChangeItemsCard.getCardData();
			        		if(itemCardData){
				        		level = itemCardData[transferMonthLevel]?itemCardData[transferMonthLevel]:0;
				        	}
				        	param += "&level="+level;
				        	var result = util.ServiceFactory.getService("url:promotionChangeAction.do?method=checkPromotionChange" 
				        		+ param);
				        	if(result && result.flag == "-1"){
				        		alert(result.message);
				        		return false;
				        	}
		        		}
		        	}
		        	
		        	var custOrderId = $ac$.get("promotionChangeCustOrderId");//提交后获取到客户订单编号
		        	var submitResult = BusCard.doPost(BusCard.path.contextPath
				          + "/promotionChangeAction.do?method=doComplete&custOrderId="+custOrderId);
					if (submitResult && submitResult.flag == -1) {
						alert("\u53d7\u7406\u5b8c\u6210\u5931\u8d25" + submitResult.message);
						return false;
					}else{
						alert("\u53d7\u7406\u6210\u529f\uff1a\u5ba2\u6237\u8ba2\u5355\u7f16\u53f7\u4e3a"+submitResult.message);
						var custOrderparam = "&custOrderId=" + custOrderId;
				         var resultStr = util.ServiceFactory
				                .getService("url:orderQueryAction.do?method=shoppingCartSubmit" + custOrderparam);
				         if (resultStr.flag < 0) {
					        alert(resultStr.message);
					        return false;
				         }
						loader.resetShoppingCartCount();
						//置灰受理完成按钮
						dojo.byId("promotionChangeCompleteBtn").disabled = true;
						dojo.byId("printBtn").disabled = false;
						//当前为改促销/退订促销操作且产生了费用
						var budgetInfo = $ac$.get("budgetInfo");
						if((requestParam.flag=="modify" || requestParam.flag=="delete")&& budgetInfo){
							dojo.byId("chargeBtn").disabled = false;
						}
					}				    
		        },
		        
		        /**
		         * 缴费
		         */
		        doCharge : function(){
		        	var custOrderId = $ac$.get("promotionChangeCustOrderId");//获取客户点单编号
		        	if (opener && opener.parent.top) {
						opener.parent.top.top_page.MenuBar.activeTopMenuById('System84', '842', '842AA', "custOrderId=" + custOrderId);
						window.close();
						return;
					}else if(parent.opener&& parent.opener.parent.top){
					    parent.opener.parent.top.top_page.MenuBar.activeTopMenuById('System84', '842', '842AA', "custOrderId=" + custOrderId);
						parent.window.close();
					}
					if (parent.top) {
						parent.top.top_page.MenuBar.activeTopMenuById('System84', '842', '842AA', "custOrderId=" + custOrderId);
						if(parent && parent.unieap && parent.unieap.getDialog&&parent.unieap.getDialog()){
							parent.unieap.getDialog().close();
						}
						return;
					}
		        },
		        
		        /**
				 * 促销政策详细信息
				 */
		        initPromotionWidget : function() {
			        var loader = this;
			        var promotionInfoPaneInfo = "";
			        loader.promotionInfo = util.ProdOfferHelper.getSalesPromotionDetail(loader.requestParam.promotionId);
			        var promotionItemInstList = util.ServiceFactory.getService("url:promotionChangeAction.do?method=getPromotionItemInstList" 
			        		+"&promotionInstId="+ loader.requestParam.promotionInstId);
			        
			        loader.promotionInfo.salesPromotionChangeItemList = promotionItemInstList;
			        if(loader.requestParam.flag=="change"){//变更
			        	dojo.mixin(loader.promotionInfo,{flag:"change"});
			        	promotionInfoPaneInfo = "原促销政策详细信息&nbsp;<span style='color:red'>["+loader.promotionInfo.promotionName+"]</span>";
			        }else if(loader.requestParam.flag=="modify"){//修改
			        	dojo.mixin(loader.promotionInfo,{flag:"modify"});
			        	promotionInfoPaneInfo = "促销政策详细信息&nbsp;<span style='color:red'>["+loader.promotionInfo.promotionName+"]</span>";
			        }else if(loader.requestParam.flag=="delete"){//退订
			        	dojo.mixin(loader.promotionInfo,{flag:"delete"});
			        	promotionInfoPaneInfo = "促销政策详细信息&nbsp;<span style='color:red'>["+loader.promotionInfo.promotionName+"]</span>";
			        }
			        loader.promotionDetailWidget  = unieap.byId("promotionInfoPane");
			        loader.promotionItemsCard = new this.promotionItemsWidgetClass({
						promotionInfoVO :loader.promotionInfo
					});	
					if(loader.promotionItemsCard.needRendering){
						loader.promotionItemsCard.renderCard(loader.promotionDetailWidget.containerNode,"first");
						loader.promotionDetailWidget.promotionItemsCard = loader.promotionItemsCard;
					}
					var promotionInfoPane = unieap.byId("promotionInfoPane");	
					if(promotionInfoPane){
						promotionInfoPane.titleNode.innerHTML = promotionInfoPaneInfo;
					}
		        },
		        /**
				 * 渲染变更后的促销政策详细信息
				 */
		        renderPromotionWidget : function(promotionId) {
			        var loader = this;
			        var resCardList = [];
			        loader.promotionChangeInfo = util.ProdOfferHelper.getSalesPromotionDetail(promotionId);
//			        var promotionItemInstList = util.ServiceFactory.getService("url:promotionChangeAction.do?method=getPromotionItemInstList" 
//			        		+"&promotionInstId="+ loader.requestParam.promotionInstId);
			        
//			        loader.promotionChangeInfo.salesPromotionChangeItemList = promotionItemInstList;
			        loader.promotionChangeDetailWidget  = unieap.byId("newPromotionInfoPane");
			        loader.destroyPromotionChangeWidget();
			        dojo.mixin(loader.promotionChangeInfo,{flag:"changeNew"});
			        loader.promotionChangeItemsCard = new this.promotionItemsWidgetClass({
						promotionInfoVO :loader.promotionChangeInfo
					});	
					if(loader.promotionChangeItemsCard.needRendering){
						loader.promotionChangeItemsCard.renderCard(loader.promotionChangeDetailWidget.containerNode,"last");
						loader.promotionChangeDetailWidget.promotionChangeItemsCard = loader.promotionChangeItemsCard;
					}
					
					//渲染变更后促销的营销资源信息
					var newPromotionResWidget = unieap.byId("newPromotionResRelaPane");
					newPromotionResWidget.destroyDescendants();
					var promotionResList = loader.promotionChangeInfo.proodOfferInfo.resRelaList;
					dojo.forEach(promotionResList||[],function(oneResRelaInfo){
						if(!oneResRelaInfo || !oneResRelaInfo.mktResCd){
							return;
						}
						//补贴卷处理
						if(oneResRelaInfo.mktResCd == util.RES_RELA_CONST.SUBSIDY_ACCEPT){
							var sysdate = dojo.global.$appContext$.requestParam.today;
							var param = "&ServiceKind=-1&apply_event=-1&infoId=225";
							var result = util.ServiceFactory.getService("url:businessAcceptAction.do?method=getCityBusinessParamValue" + param);
							var months = result?result:"0";
							var subsidyFee = "";
							var promotionItemsPageInfo = loader.promotionChangeItemsCard.getCardData();
							if(promotionItemsPageInfo){
								for(var p in promotionItemsPageInfo){
									if(p == ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.SUBSIDY_FEE_CD){//补贴金额属性
										subsidyFee = promotionItemsPageInfo[p];
										break;
									}
								}
							}
							
							var initObj = {
								productId : util.RES_RELA_CONST.DEFAULT_PRODUCT,// 产品id
								serviceOfferId : oneResRelaInfo.mktResCd / -1,
//								cityCode : loader.requestParam.customerData.cityCode,
								sysdate : sysdate,
								months : months,
								subsidyFee : subsidyFee
							};
							var resourceCardWidget = new ResourceCardWidget(initObj);
							resourceCardWidget.renderCard(newPromotionResWidget.containerNode,"last");
							var resRelaItemInfo = {
								"resRelaInfo" : oneResRelaInfo,
								"acceptCardObj" : resourceCardWidget.busCardInstance
							};
							resCardList.push(resRelaItemInfo);
						}
					});
					if(resCardList.length>0){
						loader.promotionResInfoList = resCardList;
					}
		        },
		        /**
		         * 初始化经办人卡片信息
		         */
		        initOperatorInfoWidget : function(){
		        	var loader = this;
		        	loader.promotionOperatorCardWidget = new CommCardWidget({
		        		cardParam : {
			                productId : "-111",
			                serviceOfferId : '-100'
		        		},
		                metaData : {
			                id : 'promotionOperatorCardWidget'
		                }
		        	});
		        	loader.promotionOperatorCardWidget.renderCard(unieap.byId("promotionOperatorInfoPane").containerNode,"first");
		        },
		        /**
				 * 删除变更后的促销政策明细信息控件
				 */
		        destroyPromotionChangeWidget : function() {
			        var loader = this;
			        
			        if(loader.promotionChangeItemsCard){
						loader.promotionChangeItemsCard.destroyRecursive();
					}
		        },
		        /**
				 * 初始化促销政策组下拉框
				 * 
				 * @method
				 */
                renderPromotionGroup : function() {
	                BusCard.$rs(dojo.byId("promotion-group"),
	                        this.requestParam.promotionGroupColl.list);
	                
                },
		        /**
				 * 初始化促销政策下拉框
				 * 
				 * @method
				 */
                renderPromotionInfo : function() {
	                BusCard.$rs(dojo.byId("promotion-info"),
	                        this.requestParam.promotionColl.list);
	                
                },
                /**
                 * 根据促销政策组、促销政策名称过滤促销政策信息
                 */
                filterPromotionInfoByGroup : function(){
                	var loader = this;
                	var promotionGroup = dojo.byId("promotion-group").value;
                	var promotionList =this.requestParam.promotionList;
                	var resultData = dojo.map(dojo.filter(dojo.fromJson(promotionList)||[], function(promotion){
        					return promotion.promotionGroup == promotionGroup && promotion.promotionId != loader.requestParam.promotionId;
        				}), function(promotion) {
				        return {
					        id : promotion.promotionId,
					        name : promotion.promotionName
				        };
			        });
                	BusCard.$rs(dojo.byId("promotion-info"),resultData);
                	var promotionId = dojo.byId("promotion-info").value;
                	if(promotionId){
                		 loader.renderPromotionWidget(promotionId);
 			        }
                },
		        /**
		         * 初始化表单数据构建器
		         */
		        initDataBuilder : function() {
			        this.dataBuilder = new orderaccept.prodofferaccept.data.PromotionChangeDataBuilder(this);
			        
		        },
		        
		        initBeanBuildFactory : function(){
		        	this.beanBuildFactory = new util.BeanBuildFactoryProvider().getPOBBFInstance();
		        },
		        
		        /**
		         * 打开促销政策查询页面
		         */
		        showPromotionSearchPage : function(evt){
		        	var promotionSearchBuilder = this.promotionSearchBuilderObj = new this.promotionSearchBuilderClass(this);
		        	var promotionSearchWidget = promotionSearchBuilder.promotionSearchWidget;
		        	if(!promotionSearchWidget){
		        		promotionSearchBuilder.initPromotionSearchPage();
		        		promotionSearchWidget = promotionSearchBuilder.promotionSearchWidget;
		        	}
		        	orderaccept.custom.popup.open({
		        		widget : {
		        			popup : promotionSearchWidget,
		        			around : evt.currentTarget,
		        			onCancel : function(){
		        				orderaccept.custom.popup.close({
		        					widget : promotionSearchWidget
		        				});
		        			}
		        		}
		        	});
		        },
		        
		        /**
		         * 获取选中的促销政策信息
		         */
		        getSelectPromotionInfo : function(promotionInfo){
		        	var promotionSearchBuilder = this.promotionSearchBuilderObj;
		        	orderaccept.custom.popup.close({
    					widget : promotionSearchBuilder.promotionSearchWidget
    				});
    				dojo.byId("promotionName").value = promotionInfo.promotionName;
    				var promotionId = promotionInfo.promotionId;
		        	this.renderPromotionWidget(promotionInfo.promotionId);
		        	var newPromotionPane = unieap.byId("newPromotionInfoPane");
		        	if(newPromotionPane){
		        		newPromotionPane.titleNode.innerHTML = "新促销政策受理&nbsp;<span style='color:red'>["+this.promotionInfo.promotionName+"]</span>改为<span style='color:red'>["+promotionInfo.promotionName+"]";
		        	}
		        }	        
	        });
        });