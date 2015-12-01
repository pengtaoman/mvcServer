defineModule(
		"orderaccept.prodofferaccept.loader.MemberOrderGroupProductLoader",
		[
				"../util",
				"./ProdOfferNewLoader",
				"../widget/servicecard/ServiceCardWidget",
				"../widget/attrcard/ProductOfferAttrCardWidget",
				"../../custom/TooltipDialog",
				"../builder.prodofferdetail.ProdOfferDetailBuilder",
				"../widget/commcard/CommCardWidget",
				"../builder/subprodoffergrid/MemSubProdOfferCartDataProvider",
				"../OrderShowLoader",
				"../formatter/FormatterProvider",
				"../widget/commheader/CommHeaderWidget",
				"orderaccept.prodofferaccept.widget.memberordergroupproduct.MemberOrderGroupProductWidget",
				"orderaccept.prodofferaccept.widget.memberordergroupproduct.MemberOrderGroupOfferInstWidget"],
		function(util, ProdOfferNewLoader, ServiceCardWidget,
				ProductOfferAttrCardWidget, TooltipDialog, 
				ProdOfferDetailBuilder, CommCardWidget,
				MemSubProdOfferCartDataProvider, OrderShowLoader,FormatterProvider) {
			/**
			 * 定义换受理整体控制器
			 * 
			 * @class
			 * @extends
			 */
			dojo
					.declare(
							"orderaccept.prodofferaccept.loader.MemberOrderGroupProductLoader",
							[ProdOfferNewLoader], {
								layoutTemplateUrl : dojo
										.moduleUrl(
												"orderaccept.prodofferaccept",
												"view/memberOrderGroupProductLayout.html"),

								memberOrderGroupProductWidget : null,

								memberOrderGroupProductWidgetClass : null,
								
								memberOrderGroupOfferInstWidgetClass : orderaccept.prodofferaccept.widget.memberordergroupproduct.MemberOrderGroupOfferInstWidget,

								memberProdInstWidgetInstance : null,
								
								subGroupWidgetInstance : null,
								
								subProdOfferOrderGrid : null,
								
								subProdOfferContentTemplate : dojo.cache("orderaccept.prodofferaccept.view",
		          				      "memberOrderGroupSubProdOffer.html"),
								
								postscript : function() {
									this.init();
									this.asynExecute(this._asynLoadSriptList(), dojo.hitch(this, "_asynCallback"));
								},
								/**
								 * 初始化页面
								 */
								init : function(){
									if(!!unieap){
										unieap.getTopWin = function() {
											return window;
										};
									}
									//渲染页面
									this.renderLayout();
									//渲染集团下拉列表
									//this.renderGroupName();
									//渲染集团订购销售品列表
									//this.renderGroupOfferInstList();
									
								},
								renderLayout : function(){
									this.inherited(arguments);
									this.renderSubProdOfferLayout();
								},
								renderGroupOfferInstList : function(){
									var loader = this,
										custId = dojo.byId("common-groupId").value;
							        //辽宁需要判断是否是选中的集团内用户，如果非集团用户，需要把集团销售品过滤掉
									var groupInfo = BusCard.$remote("groupInfoBO").getGroupInfoByCustId({
										custId: dojo.byId("common-groupId").value
									});
					                $ac$.set("groupInfo", groupInfo);	
							        var list = BusCard.$remote("groupUserInfoBO").getGroupUserInfo({
							        	prodInstId : $ac$.requestParam.prodInstId,
							        	groupId : groupInfo.groupId,
							        	ifValid : 1
							        });
									var ifGroupUser = list.length==0?0:1,//1 集团用户 2 非集团用户
									    param = "method=doMemberOrderGroupProductXml&custId="+custId+"&ifGroupUser="+ifGroupUser;
							        var groupProdOfferInstList = util.ServiceFactory
							                .getService("url:shoppingCartAction.do?" + param);
							        
							        dojo.global.$appContext$.set("_groupProdOfferInstList", groupProdOfferInstList);
							        if (loader.memberOrderGroupOfferInstWidgetInstance) {
								        loader.memberOrderGroupOfferInstWidgetInstance.destroyRecursive();
							        }
							        loader.memberOrderGroupOfferInstWidgetInstance = new this.memberOrderGroupOfferInstWidgetClass();
							        dojo.place(loader.memberOrderGroupOfferInstWidgetInstance.domNode, unieap
							                        .byId("mainProdOfferTreePane").containerNode, "last");
								},

								_asynCallback : function() {
									var controller = this;
									controller.registerClass();
									// 监听各种事件
			       					controller.initBehavior();
			       					// 初始化检测
			      					controller.initCheck();
			      					// 初始化订单数据构建器
							        controller.initDataBuilder();
							        controller.initSpecialDataBuilder();
							        // 初始化功能导向
							        controller.initFunctionNavigatorWidget();
							        // 初始化订单信息
							        controller.initOrderInfoWidget();
							        // 初始化经办人信息
							        controller.initViaInfoWidget();
							        // 初始化自主版或加装包套餐时可选包受理
			       					controller.initMultipleSubProdOfferHandler();
							         // 初始化一些全局处理
							        controller.initGlobalHelper();
							        // 初始化全局销售品提示框.温馨提示框
							        controller.initTipsWidgets();
							        // 初始化等待条
			        				controller.initWaitingBar();
							        // 触发onload 事件
							        controller.fireEvent("onload");
								},
								renderSubProdOfferOrderGrid :function(){
							        var targetNode = unieap.byId('subProdOfferTreeContainer');
							        var loader = this;
							        if (targetNode.subProdOfferOrderGrid) {
								        targetNode.subProdOfferOrderGrid.destroyRecursive();
							        }
							        var cm = new BusCard.widget.grid.ColumnModel({
								                metaData : loader.getSubProdOfferColumns()
							                });
							        var ds = new BusCard.widget.grid.DataSource([], cm);
							        targetNode.subProdOfferOrderGrid = new loader.subProdOfferOrderGridClass({
								                cm : cm,
								                ds : ds
							                });
							        dojo.place(targetNode.subProdOfferOrderGrid.domNode,unieap.byId('subProdOfferCart').containerNode,"last");
							        unieap.byId('subProdOfferCart').paneNode.style.overflow = 'auto';
									loader.subProdOfferOrderGrid = unieap.byId('subProdOfferTreeContainer').subProdOfferOrderGrid;
								},

								/**
								 * 异步加装的模块,这里的模块要尽量保证其所依赖的模块已经加装完毕
								 * 
								 * @method
								 */
								_asynLoadSriptList : function() {
									return [
											"orderaccept.prodofferaccept.widget.commcard.CommCardWidget",
											"orderaccept.prodofferaccept.widget.memberordergroupproduct.MemberProdInstWidget",
											"orderaccept.prodofferaccept.behavior.MemberOrderGroupProductBehavior",
											"orderaccept.prodofferaccept.widget.functionnavigator.MemberOrderFuncNavigatorWidget",
											"orderaccept.prodofferaccept.widget.messagetips.WarmTipsWidget",
											"orderaccept.prodofferaccept.loader.MultipleSubProdOfferHandler",
											"orderaccept.prodofferaccept.widget.messagetips.ProdOfferInfoTipsWidget",
							                "orderaccept.prodofferaccept.widget.messagetips.WarmTipsWidget",
							                "orderaccept.prodofferaccept.widget.messagetips.CollectTipsWidget",
							                "orderaccept.prodofferaccept.widget.messagetips.ProdOfferAcceptTipsWidget",
							                "orderaccept.prodofferaccept.data.MemberOrderGroupProductDataBuilder",
							                "orderaccept.prodofferaccept.check.MemberOrderGroupProductCheck",
							                "orderaccept.prodofferaccept.data.SpecialDataHandler",
							                "orderaccept.prodofferaccept.widget.manageaccnbrwidget.ManageAccNbrWidget",
							                "orderaccept.prodofferaccept.data.MemberOrderSpecialDataHandler",
											"orderaccept.custom.popup"];
								},

								registerClass : function() {
									var controller = this;
									controller.commCardWidetClass=orderaccept.prodofferaccept.widget.commcard.CommCardWidget
									controller.memberProdInstWidgetClass = orderaccept.prodofferaccept.widget.memberordergroupproduct.MemberProdInstWidget;
									controller.functionNavigatorWidgetClass = orderaccept.prodofferaccept.widget.functionnavigator.MemberOrderFuncNavigatorWidget;
									controller.warmTipesWidgetClass = orderaccept.prodofferaccept.widget.messagetips.WarmTipsWidget;
									controller.subProdOfferOrderGridClass = orderaccept.custom.BusCardGrid;
									controller.prodOfferInfoTipsWidgetClass = orderaccept.prodofferaccept.widget.messagetips.ProdOfferInfoTipsWidget;
							        controller.warmTipesWidgetClass = orderaccept.prodofferaccept.widget.messagetips.WarmTipsWidget;
							        controller.prodOfferAcceptTipsWidgetClass = orderaccept.prodofferaccept.widget.messagetips.ProdOfferAcceptTipsWidget;
							        controller.collectTipsWidgetClass = orderaccept.prodofferaccept.widget.messagetips.CollectTipsWidget;
							        controller.manageAccNbrWidgetClass = orderaccept.prodofferaccept.widget.manageaccnbrwidget.ManageAccNbrWidget;
									controller.popupClass = orderaccept.custom.popup;
								},
								initBehavior : function() {
									this.behaviorInstance = new orderaccept.prodofferaccept.behavior.MemberOrderGroupProductBehavior(this);
								},
								initCheck : function() {
									this.checkInstance = new orderaccept.prodofferaccept.check.MemberOrderGroupProductCheck(this);
								},
								initDataBuilder : function() {
									this.dataBuilder = new orderaccept.prodofferaccept.data.MemberOrderGroupProductDataBuilder(this);
								},
								initSpecialDataBuilder : function() {
							        this.specDataBuilder = new orderaccept.prodofferaccept.data.MemberOrderSpecialDataHandler(this);
						        },
								/**
								 * 初始化集团下拉框
								 * 
								 * @method
								 */
								renderGroupName : function(groupNameList) {

									BusCard.$rs(dojo.byId("common-groupId"),groupNameList.list);
									dojo.byId("common-groupId").value= -1;
								},
								/**
								 * 渲染成员产品信息
								 */
								renderMemberProdInst : function(){
									 // 4:获取个人集团销售品
							        var param = "method=getGRPPersonalByGRPId&groupProdOfferId="+this.requestParam.groupProdOfferId, 
							        	memberGroupOfferVO = util.ServiceFactory
							                .getService("url:prodOfferSaleAjaxAction.do?" + param);
							        if(!memberGroupOfferVO){
							        	orderaccept.common.dialog.MessageBox.alert({
							        		message:"没有配置集团个人销售品，无法订购！"
							        	})
							        	return false;
							        }
							        // 1: 删除主销售品视图组件
									var domNode = unieap.byId("mainProdOfferPane").containerNode;
							        if (this.memberProdInstWidgetInstance) {
								        this.memberProdInstWidgetInstance.destroyRecursive();
								        this.memberProdInstWidgetInstance = null;
							        }
							        changeStep(3);
							        // 2: 重新初始主销售品视图组件
							        this.memberProdInstWidgetInstance = new this.memberProdInstWidgetClass();
							        dojo.place(this.memberProdInstWidgetInstance.domNode, domNode, "first");
							        // 3: 子群信息
							        this.renderSubGroupInfo();
							       
							        dojo.mixin(this.requestParam,{"memberGroupOfferInfo" : memberGroupOfferVO}) ;  
							        // 5:展示可选包受理
							        if(this.initSubProdOfferPane()===false){
							        	if (this.memberProdInstWidgetInstance) {
									        this.memberProdInstWidgetInstance.destroyRecursive();
									        this.memberProdInstWidgetInstance = null;
								        }
							        	return false;
							        };
							        // 6: 关闭主销售品树面板
							        if (unieap.byId('BorderPane')) {
								        unieap.byId('BorderPane').close();
							        }
							        // 7:默认打开基础销售品和可选受理面板
							        this.openProdOfferAcceptPane();
							        $ac$.set("submitFlag",1);
							       
								},
									/**
								 * 根据新的销售品ID重新生成可选包相关视图
								 * 
								 * @param {String} id 主销售品id
								 */
						       renderSubProdOffer : function(param) {
											
											// 根据个人产品实例ID和集团销售品ID获取已订购的集团销售品可选包信息
							        var resultParam = "method=getAlreadyOrderOffer&prodInstId="+$ac$.get("_memberProdInstInfo").prodInstVO.prodInstId
							        	+"&groupProdOfferInstId="+param.groupProdOfferInstId+"&groupProdOfferId="+param.groupProdOfferId
							        	+"&memberGroupOfferId="+param.memberGroupOfferId+"&groupProductId="+$ac$.get("groupProdInstInfo").productId
							        	+"&memberProductId="+$ac$.requestParam.productId, 
							        	alreadyOrderOfferInfo = util.ServiceFactory
							                .getService("url:orderDetailAction.do?" + resultParam);
							       		
							        if(alreadyOrderOfferInfo.flag&&alreadyOrderOfferInfo.flag==-1){
							        	orderaccept.common.dialog.MessageBox.alert({
							        		message:"获取成员销售品实例接口异常！"
							        	})
							        	return false;
							        }
							        //检测是否在其他集团下重复订购
							        if(alreadyOrderOfferInfo.userHasGroupOfferInfoList.length>0
							        	&&!this.checkInstance.checkProdOfferOrder(alreadyOrderOfferInfo.userHasGroupOfferInfoList)){
							        	return false;
							        }
							        
							       	$ac$.set("userHasGroupOfferInfoList",
				                        alreadyOrderOfferInfo.userHasGroupOfferInfoList);
				                    $ac$.set("userHasGroupOfferMetaInfoList",
				                        alreadyOrderOfferInfo.userHasGroupOfferMetaInfoList);    
							        //将用户个人可选包和集团可选包规格数据合并
				                    $ac$.set("userHasProdOfferInfoList",
												$ac$.get("userHasProdOfferInfoList").concat(alreadyOrderOfferInfo.userHasGroupOfferInfoList));    
				                    $ac$.set("userHasProdOfferMetaInfoList",
												$ac$.get("userHasProdOfferMetaInfoList").concat(alreadyOrderOfferInfo.userHasGroupOfferMetaInfoList));
							        var groupProdOfferInstId = param.groupProdOfferInstId,
								        uniqueId = param.uniqueId || "",
								        targetNode = unieap.byId('subProdOfferTreeContainer' + uniqueId),
								        loader = this;
							        if (targetNode.subProdOfferTree) {
								        targetNode.subProdOfferTree.destroyRecursive();
							        }
							        targetNode.subProdOfferTree = util.WidgetProvider.getSubProdOfferTree({
								                id : 'subProdOfferTree' + uniqueId,
								                url : loader.buildSubProdOfferTreeURL(groupProdOfferInstId, param.groupProdOfferId)
							                });
							        var _node = !!unieap.byId('subProdOfferBorderPan' + uniqueId) ? unieap
							                .byId('subProdOfferBorderPan' + uniqueId).containerNode : dojo
							                .byId('subProdOfferBorderPan' + uniqueId);
							        dojo.place(targetNode.subProdOfferTree.domNode, _node, 'first');
							       // loader.personalSubProdOffer(3, mainProdOfferId, uniqueId);
						        },
						        buildSubProdOfferTreeURL : function(offerInstid,offerId) {
							        return BusCard.path.contextPath
							                + "/orderDetailAction.do?method=getProdOfferTreeForMember&groupProdOfferInstId="
							                + offerInstid+"&groupProdOfferId="+offerId+"&groupProductId="
							                +$ac$.get("groupProdInstInfo").productId+"&memberProductId="+$ac$.requestParam.productId;
						        },
								/** 
								 * 子群信息
								 */
								renderSubGroupInfo : function(){
									var tr = dojo.query(".main-product-basic", this.memberProdInstWidgetInstance.domNode)[0],
										subTr = tr;
									while(true){
										subTr = subTr.nextSibling;
										if (subTr && (subTr.tagName || "").toUpperCase() == 'TR') {
									        break;
								        }
									}
									var	cardParam = {
											groupProdOfferInstId:this.requestParam.groupProdOfferInstId,
											alreadyMemberProdInst:$ac$.get("_alreadyMemberProdInst")==undefined? null:$ac$.get("_alreadyMemberProdInst").prodInstId,
											cardMetaData:{
												gType:2,
												cardId:101											
												}
									};
									this.subGroupWidgetInstance = new this.commCardWidetClass(
										{cardParam:cardParam}
									);
									this.subGroupWidgetInstance.renderCard(dojo.query(".subGroupInfo",subTr)[0],"last");
								},
								getSubProdOfferColumns : function() {
							        var prodOfferNameFormatter = function(value, inRowIndex) {
								        
								        var bindingData = this.getDataSource().getRawData()[inRowIndex];
								        bindingData.rowIndex = inRowIndex;
								        return FormatterProvider.SubProdOfferHelper.createSubProdOfferDetail(
								                inRowIndex, bindingData);
							        };
							        var prodOfferStartDate = function(value, inRowIndex) {
								        var bindingData = this.getDataSource().getRawData()[inRowIndex];
								        return FormatterProvider.SubProdOfferHelper.createSubProdOfferStartDate(
								                inRowIndex, bindingData);
							        };
							        var prodOfferEndDate = function(value, inRowIndex) {
								        var bindingData = this.getDataSource().getRawData()[inRowIndex];
								        return FormatterProvider.SubProdOfferHelper.createSubProdOfferEndDate(
								                inRowIndex, bindingData);
							        };
							        var prodOfferServiceId = function(value, inRowIndex) {
								        var bindingData = this.getDataSource().getRawData()[inRowIndex];
								        return FormatterProvider.SubProdOfferHelper
								                .createSubProdOfferServiceIdList(inRowIndex, bindingData);
							        };
							        var prodOfferStatus = function(value, inRowIndex) {
								        var bindingData = this.getDataSource().getRawData()[inRowIndex];
								        return FormatterProvider.SubProdOfferHelper.createSubProdOfferStatus(
								                inRowIndex, bindingData);
							        };

							        return cm = [{
								                width : '28%',
								                name : 'prodOfferName',
								                text : '可选销售品',
								                render : prodOfferNameFormatter
							                }, {
								                width : '12%',
								                name : 'startDate',
								                text : '开始时间',
								                render : prodOfferStartDate
							                }, {
								                width : '12%',
								                name : 'endDate',
								                text : '结束时间',
								                render : prodOfferEndDate
							                }, {
								                width : '7%',
								                name : 'orderStatus',
								                text : '订购状态',
								                render : prodOfferStatus
							                }, {
								                width : '26%',
								                name : 'serviceIdList',
								                text : '使用号码',
								                render : prodOfferServiceId
							                }
				
							        ];
							        
						        },
						        showOneSubProdOffer : function(subProdOfferInfo,userHasGroupOfferInfoList){
															        
							        if(!!userHasGroupOfferInfoList){
							        	// 根据个人产品实例ID和集团销售品ID获取已订购的个人集团销售品信息
							        	var param = "method=getAlreadyOrderIndividualOffer&prodInstId="+$ac$.get("_memberProdInstInfo").prodInstVO.prodInstId
								        	+"&groupProdOfferId="+subProdOfferInfo.prodOfferId, 
								        	alreadyOrderIndividualOfferInfo = util.ServiceFactory
								                .getService("url:orderDetailAction.do?" + param);
								        dojo.mixin(this.requestParam,{"alreadyOrderIndividualOfferInfo" : alreadyOrderIndividualOfferInfo}) ; 
	
							        	var rowData = util.ProdOfferHelper.createProdOfferRowData(subProdOfferInfo);
								        dojo.mixin(rowData.showData,{chooseNumberObj:
								        	{
								        		serviceKind:$ac$.get("_memberProdInstInfo").productInfoVO.netType,
								        		serviceId:dojo.byId("serviceId").value,
								        		productId:this.requestParam.productId	
								        	}
								        });
							        	rowData.showData.disabledOption = "DISABLED";
							        	this.subProdOfferOrderGrid.add(rowData);
							        }else{
							        	
							        }
							        
						        },
						        initSubProdOfferPane : function(){
						        	var loader = this;
					                // 1.加载可选包左侧区域
					                 if(loader.renderSubProdOffer({
					                 			groupProdOfferId : this.requestParam.groupProdOfferId,
						                        groupProdOfferInstId : this.requestParam.groupProdOfferInstId,
												memberGroupOfferId : this.requestParam.memberGroupOfferInfo.prodOfferId						                        
					                        })===false){return false};
					                // 2.加载可选包右侧表格区域
					                loader.renderSubProdOfferOrderGrid();
					                // 3.生成可选包表格对应的数据处理类
					                if(loader.multipleSubProdOfferHandler
					                	&&loader.multipleSubProdOfferHandler.subProdOfferOrderProviderMap
					                	&&loader.multipleSubProdOfferHandler.subProdOfferOrderProviderMap['subProdOfferTreeContainer']
					                	&&loader.multipleSubProdOfferHandler.subProdOfferOrderProviderMap['subProdOfferTreeContainer'].prodOfferDetailBuilder){
											var builder = loader.multipleSubProdOfferHandler.subProdOfferOrderProviderMap['subProdOfferTreeContainer'].prodOfferDetailBuilder;
											builder.destroy();
						                	
					                }
					                var memSubProdOfferCartDataProvider = new MemSubProdOfferCartDataProvider(
					                        this, "", null);
					                loader.multipleSubProdOfferHandler.subProdOfferOrderProviderMap['subProdOfferTreeContainer']
					                	= memSubProdOfferCartDataProvider;
					                // 4.展示可选包右侧选中的销售品数据
					                //loader.showOneSubProdOffer(this.requestParam.memberGroupOfferInfo,$ac$.get("userHasGroupOfferInfoList"));
					                loader.showSubProdOfferCart(memSubProdOfferCartDataProvider);	
						        },
						        /**
						         * 展示可选包数据
						         */
						        showSubProdOfferCart : function(memSubProdOfferCartDataProvider){
						        	memSubProdOfferCartDataProvider.showOrderedProdOffer();
						        },
						        /**
								 * 渲染可选包受理布局,可以重复调用
								 * 
								 * @method
								 */
						        renderSubProdOfferLayout : function() {
							        
							        unieap.byId("subProdOfferPane").destroyDescendants();
							        
							        unieap.byId("subProdOfferPane").containerNode.innerHTML = BusCard.Template
							                .create(this.subProdOfferContentTemplate).apply({});
							        
							        dojo.parser.parse(unieap.byId("subProdOfferPane").containerNode);
							        
							        //this.renderSubProdOfferSearch();
							        
						        },
						        _viaInfoCallback : function(){
						        	this.inherited(arguments);
						        	dojo.query("[id=effectDate]",unieap.byId("viaInfoPane").containerNode)[0].disabled=true;
						        },
						        changeGroupOffer : function() {
						        	if (this.memberProdInstWidgetInstance) {
								        this.memberProdInstWidgetInstance.destroyRecursive();
								        this.memberProdInstWidgetInstance = null;
							        }
						        	if(unieap.byId("subProdOfferTree")){
						        		unieap.byId("subProdOfferTree").destroy();
						        	}
									if(this.multipleSubProdOfferHandler
										&&this.multipleSubProdOfferHandler.subProdOfferOrderProviderMap
										&&this.multipleSubProdOfferHandler.subProdOfferOrderProviderMap['subProdOfferTreeContainer']){
											this.multipleSubProdOfferHandler.subProdOfferOrderProviderMap['subProdOfferTreeContainer'].subProdOfferOrderGrid
											.destroy()
										}
									var panes = ["mainProdOfferPane","subProdOfferPane","orderInfoPane","viaInfoPane"];
									dojo.forEach(panes, function(paneId) {
												var pane = unieap.byId(paneId);
												if (pane && pane.open) {
													pane.toggle();
												}

											});
									$ac$.set("submitFlag",0);		
								}
								
						        
							});
		});