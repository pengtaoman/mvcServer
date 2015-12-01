defineModule("orderaccept.prodofferaccept.behavior.ProdOfferNewBehavior", ["../util",
                "../widget/prodoffersearchlist/ProdOfferSearchListWidget", "../widget/attrcard/ProductAttrCardWidget",
                "../widget/subprodoffernum/SubProdOfferNumWidget", "../widget/serviceinfolist/ServiceInfoListWidget",
                "orderaccept.common.js.ConstantsPool", "orderaccept.custom.popup",
                "orderaccept.common.dialog.MessageBox", "../widget/prodoffersearchlist/SubProdOfferSearchListWidget",
                "../widget/promotionsearchlist/PromotionSearchListWidget",
                "../widget/mainprodoffer/orderPreViewWidget",
                "../widget/prodofferfavoritelist/personalSubCollectMoreListWidget"], function(util, searchListWidget,
                ProductAttrCardWidget, SubProdOfferNumWidget, ServiceInfoListWidget, ConstantsPool, popup, messageBox,
                SubsSearchListWidget, PromotionSearchListWidget, orderPreViewWidget, MoreSubOfferCollectWidget) {
	        
	        /**
			 * 对新装页面的行为做统一封装
			 * 
			 * @class
			 * 
			 */
	        dojo.declare("orderaccept.prodofferaccept.behavior.ProdOfferNewBehavior", [], {
		        controller : null,
		        /**
				 * @type Array
				 */
		        handleRegistry : null,
		        
		        promotionRefreshWidget : null,
		        
		        refreshWidget : null,
		        
		        mainProductChangeRefreshWidget : null,
		        
		        constructor : function(controller) {
			        this.controller = controller;
			        this.handleRegistry = [];
		        },
		        postscript : function() {
			        this.subscribe();
		        },
		        /**
				 * 订阅各种消息
				 * 
				 * @method
				 */
		        subscribe : function() {
			        var behavior = this;
			        var controller = this.controller;
			        // 销售品详情点击事件
			        this.handleRegistry.push(dojo.subscribe("/mainProdOfferDetail/click", function(event) {
				                behavior.onMainProdOfferDetailClick.apply(behavior, arguments);
			                }));
			        // 销售品详情按钮点击事件
			        this.handleRegistry.push(dojo.subscribe("/mainProdOfferDetailBtn/click", function(event) {
				                var prodOfferDetailWidget = util.DomHelper.getParentWidget(event.currentTarget,
				                        "orderaccept.custom.TooltipDialog");
				                orderaccept.custom.popup.close({
					                        widget : prodOfferDetailWidget,
					                        notHandleData : true
				                        });
			                }));
			        // 监听功能类产品属性点击事件
			        this.handleRegistry.push(dojo.subscribe("/serviceProdOfferAttr/click", function() {
				                behavior.onServiceProdOfferAttrClick.apply(behavior, arguments);
			                }));
			        // 监听功能类产品属性点击事件
			        this.handleRegistry.push(dojo.subscribe("/batchServiceProdOfferAttr/click", function() {
				                behavior.onBatchServiceProdOfferAttrClick.apply(behavior, arguments);
			                }));
			        // 监听功能类产品选择事件
			        this.handleRegistry.push(dojo.subscribe("/serviceProdCheck/click", function() {
				                behavior.onServiceProdCheckClick.apply(behavior, arguments);
			                }));
			        // 监听产品信息点击事件
			        this.handleRegistry.push(dojo.subscribe("/accessprodattr/click", function(event) {
				                return behavior.onMainProdAttrClick(event);
			                }));
			        // 监听主销售树节点点击事件
			        this.handleRegistry.push(dojo.subscribe("/mainProdOfferTree/dblclick", function() {
				                behavior.onMainProdOfferTreeNodeClick.apply(behavior, arguments);
			                }));
			        // 监听主销售搜索按键事件
			        this.handleRegistry.push(dojo.subscribe("/prodOfferSearch/keyup", function() {
				                behavior.onMainProdOfferSearchKeyup.apply(behavior, arguments);
			                }));
			        // 监听搜索主销售品按钮事件
			        this.handleRegistry.push(dojo.subscribe("/clickProdOfferSearch/click", function() {
				                behavior.onMainProdOfferSearchKeyup.apply(behavior, arguments);
			                }));
			        // 监听销售品搜索框获得焦点事件
			        this.handleRegistry.push(dojo.subscribe("/prodOfferSearch/focus", function() {
				                behavior.onMainProdOfferSearchFocus.apply(behavior, arguments);
			                }));
			        // 监听销售品搜索框获得失去事件
			        this.handleRegistry.push(dojo.subscribe("/prodOfferSearch/blur", function() {
				                behavior.onMainProdOfferSearchBlur.apply(behavior, arguments);
			                }));
			        // 监听销售品高级查询按钮点击事件
			        this.handleRegistry.push(dojo.subscribe("/prodOfferOpenAdvanceSearch/click", function(event) {
				                behavior.onOpenAdvanceSearchClick(event);
			                }));
			        this.handleRegistry.push(dojo.subscribe("/advancesearch/click", function(event) {
				                behavior.onAdvanceSearchClick(event);
			                }));
			        // 监听销售品大类下拉框变更事件
			        this.handleRegistry.push(dojo.subscribe("/prodBigKid/change", function(event) {
				                behavior.getProdByProdBigKind(event);
			                }));
			        // 监听销售品大类下拉框变更事件
			        this.handleRegistry.push(dojo.subscribe("/prodAdvance/change", function(event) {
				                var prodId = event.currentTarget.value;
				                behavior.prodAdvanceChang(prodId);
			                }));
			        
			        // 监听主销售品搜索结果点击事件
			        this.handleRegistry.push(dojo.subscribe("/searchProdItem/dblclick", function(event) {
				        behavior.controller.changeMainProdOffer(event.currentTarget.getAttribute("prodOfferId"),
				                event.currentTarget);
				            // behavior.controller.openProdOfferAcceptPane();
			            }));
			        // 监听主销售品树节点鼠标移入事件
			        this.handleRegistry.push(dojo.subscribe("/mainProdOfferTree/mouseover", function() {
				                behavior.onMainProdOfferTreeNodeMouseOver.apply(behavior, arguments);
			                }));
			        // 监听主销售品树节点鼠标移出事件
			        this.handleRegistry.push(dojo.subscribe("/mainProdOfferTree/mouseout", function() {
				                behavior.onProdOfferInfoMouseOut.apply(behavior, arguments);
			                }));
			        // 监听基础包销售品信息鼠标移入事件
			        this.handleRegistry.push(dojo.subscribe("/prodOfferTips/mouseover", function(event) {
				                behavior.onMainProdOfferMouseOver(event);
			                }));
			        // 监听基础包销售品信息鼠标移出事件
			        this.handleRegistry.push(dojo.subscribe("/prodOfferTips/mouseout", function(event) {
				                behavior.onProdOfferInfoMouseOut(event);
			                }));
			        
			        // 监听企业热推销售品点击事件
			        this.handleRegistry.push(dojo.subscribe("/peddleProdOfferItem/dblclick", function(event) {
				        behavior.controller.changeMainProdOffer(event.currentTarget.getAttribute("prodOfferId"),
				                event.currentTarget);
				            // behavior.controller.openProdOfferAcceptPane();
			            }));
			        // 监听热点销售品点击事件
			        this.handleRegistry.push(dojo.subscribe("/hotProdOfferItem/dblclick", function(event) {
				        behavior.controller.changeMainProdOffer(event.currentTarget.getAttribute("prodOfferId"),
				                event.currentTarget);
				            // behavior.controller.openProdOfferAcceptPane();
			            }));
			        // 监听个人销售品点击事件
			        this.handleRegistry.push(dojo.subscribe("/personalProdOfferItem/dblclick", function(event) {
				        behavior.controller.changeMainProdOffer(event.currentTarget.getAttribute("prodOfferId"),
				                event.currentTarget);
				            // behavior.controller.openProdOfferAcceptPane();
			            }));
			        // 监听个人收藏、热点、企业更多点击事件
			        var moreArray = ["/morePersonalItem/click", "/morePeddleItem/click", "/moreHotItem/click"];
			        dojo.forEach(moreArray, function(index) {
				                behavior.handleRegistry.push(dojo.subscribe(index, function(evt) {
					                        var widget = dijit.getEnclosingWidget(evt.currentTarget);
					                        if (widget.renderMore) {
						                        widget.renderMore();
					                        }
					                        behavior.controller.showMoreProdOffer(evt.srcElement);
				                        }));
			                });
			        // 销售品收藏事件
			        this.handleRegistry.push(dojo.subscribe("/prodOfferCollect/click", function(event) {
				                return behavior.onCollectProdOfferClick(event);
			                }));
			        // 销售品取消收藏事件
			        this.handleRegistry.push(dojo.subscribe("/prodOfferCancelCollect/click", function(event) {
				                return behavior.onCancelCollectProdOfferClick(event);
			                }));
			        // 区域更换事件
			        this.handleRegistry.push(dojo.subscribe("/belongCode/change", function() {
				                return behavior.onBelongCodeChange();
			                }));
			        // 监听销售品号码查询
			        this.handleRegistry.push(dojo.subscribe("/searchnumber/click", function(evt) {
				                return behavior.onSearchNumberClick(evt);
			                }));
			        
			        this.handleRegistry.push(dojo.subscribe("/oldnumberselect/click", function(evt) {
				                return behavior.onOldNumberSelect(evt);
			                }));
			        
			        // FIXME 监听订购新的产品实例点击事件, 由于产品选择已前移,此监听已经没有用处了
			        this.handleRegistry.push(dojo.subscribe("/addproduct/click", function(event) {
				                return behavior.onAddProductClick(event);
			                }));
			        // FIXME 监听删除产品实例点击事件,由于产品选择已前移,此监听已经没有用处了
			        this.handleRegistry.push(dojo.subscribe("/delproduct/click", function(event) {
				                return behavior.onDelProductClick(event);
			                }));
			        // 可选包树上的销售品的点击事件
			        this.handleRegistry.push(dojo.subscribe("/subProdOfferTree/dblclick", function() {
				                return behavior.onSubProdOfferTreeNodeClick.apply(behavior, arguments);
			                }));
			        // 可选包树上的销售品详情的点击事件
			        this.handleRegistry.push(dojo.subscribe("/prodOfferLink/click", function(event) {
				                return behavior.onProdOfferDetailClick(event);
			                }));
			        // 可选包树上的销售品的点击事件
			        this.handleRegistry.push(dojo.subscribe("/subProdOfferTree/mouseover", function() {
				                behavior.onMainProdOfferTreeNodeMouseOver.apply(behavior, arguments);
			                }));
			        // 可选包树上的销售品的点击事件
			        this.handleRegistry.push(dojo.subscribe("/subProdOfferTree/mouseout", function() {
				                behavior.onProdOfferInfoMouseOut.apply(behavior, arguments);
			                }));
			        // 可选包 收藏 销售品的双击点击事件
			        this.handleRegistry.push(dojo.subscribe("/personalSubProdOfferItem/dblclick", function(event) {
				                return behavior.showSubProdOffer(event.currentTarget.getAttribute("prodOfferId"), {
					                        domNode : event.currentTarget
				                        });
			                }));
			        // 可选包 搜索 销售品的双击点击事件
			        this.handleRegistry.push(dojo.subscribe("/searchSubProdOfferItem/dblclick", function(event) {
				                return behavior.showSubProdOffer(event.currentTarget.getAttribute("prodOfferId"), {
					                        domNode : event.currentTarget
				                        });
			                }));
			        // 可选包销售品名称鼠标移入弹出框事件
			        this.handleRegistry.push(dojo.subscribe("/prodOfferName/mouseover", function(event) {
				                return behavior.onSubProdOfferNameMouseOver(event)
			                }));
			        // 可选包销售品鼠标移出弹出框事件
			        this.handleRegistry.push(dojo.subscribe("/prodOfferName/mouseout", function(event) {
				                return behavior.onProdOfferInfoMouseOut(event)
			                }));
			        // 销售品详情确定按钮的点击事件
			        this.handleRegistry.push(dojo.subscribe("/prodOfferDetailBtn/click", function(event) {
				                return behavior.onProdOfferDetailBtnClick(event);
				                
			                }));
			        // 销售品详情确定按钮的点击事件
			        this.handleRegistry.push(dojo.subscribe("/batchProdOfferDetailBtn/click", function(event) {
				                return behavior.onBatchProdOfferDetailBtnClick(event);
				                
			                }));
			        // 主销售品下的产品的复选框的点击事件
			        this.handleRegistry.push(dojo.subscribe("/checkProduct/click", function(event) {
				                return behavior.refreshSubProdOfferCart(event);
			                }));
			        // 可选包销售品前的复选框点击事件
			        this.handleRegistry.push(dojo.subscribe("/subProdOfferCheck/click", function(event) {
				                return behavior.onSubProdOfferCheckBoxClick(event);
			                }));
			        // 删除可选包视图
			        this.handleRegistry.push(dojo.subscribe("/delSubProdOfferView/click", function(event) {
				                return behavior.onSubProdOfferDelViewClick(event);
			                }));
			        // 增加亲情号码点击事件
			        this.handleRegistry.push(dojo.subscribe("/familyNumber/click", function(event) {
				                return behavior.onFamilyNumberClick(event);
			                }));
			        // 增加亲情单元点击事件
			        this.handleRegistry.push(dojo.subscribe("/familyUnit/click", function(event) {
				                return behavior.onFamilyUnitClick(event);
			                }));
			        // 亲情号码复选框点击事件
			        this.handleRegistry.push(dojo.subscribe("/familyNumberCh/click", function(event) {
				                return behavior.onFamilyNumberChClick.apply(behavior, arguments);
				                
			                }));
			        // 促销政策树上销售品点击事件
			        this.handleRegistry.push(dojo.subscribe("/promotionTree/dblclick", function() {
				                return behavior.onPromotionTreeNodeClick.apply(behavior, arguments);
			                }));
			        
			        // 保存订单单击事件处理
			        this.handleRegistry.push(dojo.subscribe("/saveorder/click", function(event) {
				                return behavior.onSaveOrder.apply(behavior, arguments);
				                
			                }));
			        
			        this.handleRegistry.push(dojo.subscribe("/completeorder/click", function(event) {
				                return behavior.onCompleteOrder.apply(behavior, arguments);
				                
			                }));
			        
			        this.handleRegistry.push(dojo.subscribe("/coutinueorder/click", function(event) {
				                return behavior.onCoutinueOrder(event);
			                }));
			        // 促销政策列表复选框点击事件
			        this.handleRegistry.push(dojo.subscribe("/promotionChecked/click", function(event) {
				                return behavior.onPromotionDetailCheckClick(event);
			                }));
			        
			        // 费用修改
			        this.handleRegistry.push(dojo.subscribe("/feeModify/click", function(event) {
				                return behavior.onFeeModifyClick.apply(behavior, arguments);
				                
			                }));
			        // 费用确认
			        this.handleRegistry.push(dojo.subscribe("/feeConfirm/click", function(event) {
				                return behavior.onFeeConfirmClick.apply(behavior, arguments);
			                }));
			        // 添加话费礼券
			        this.handleRegistry.push(dojo.subscribe("/couponsAdd/click", function(event) {
				                return behavior.onCouponsAddClick(event);
			                }));
			        
			        // 促销政策详细信息点击事件
			        this.handleRegistry.push(dojo.subscribe("/promotionDetailLink/click", function(event) {
				                return behavior.onPromotionDetailClick(event);
			                })),

			        // 促销政策详细信息页面确定按钮点击事件
			        this.handleRegistry.push(dojo.subscribe("/promotionDetailBtn/click", function(event) {
				                return behavior.onPromotionDetailBtnClick(event);
			                }));
			        
			        this.handleRegistry.push(dojo.subscribe("/custRecognitionPage/click", function(event) {
				                
				                behavior.OnJump2CustRecognitionPage(event);
				                
			                }));
			        
			        this.handleRegistry.push(dojo.subscribe("/orderDetailPage/click", function(event) {
				                
				                behavior.OnJump2OrderDetailPage(event);
				                
			                }));
			        // 选择销售品属性-担保信息
			        this.handleRegistry.push(dojo.subscribe("/assureSelect/click", function(event) {
				                return behavior.showAssureQueryView(event);
			                }));
			        // 担保信息查询
			        this.handleRegistry.push(dojo.subscribe("/assureQuery/click", function(event) {
				                return behavior.onAssureQueryClick(event)
			                }));
			        // 销售品属性-担保信息确认
			        this.handleRegistry.push(dojo.subscribe("/assureCommit/click", function(event) {
				                return behavior.onAssureCommitClick(event);
			                }));
			        // 销售品属性-客户信息选择
			        this.handleRegistry.push(dojo.subscribe("/assureCustSelect/click", function(event) {
				                return behavior.onAssureCustSelectClick(event);
			                }));
			        // 销售品属性-帐户信息选择
			        this.handleRegistry.push(dojo.subscribe("/assureAccountSelect/click", function(event) {
				                return behavior.onAssureAccountSelectClick(event);
			                }));
			        // 销售品属性-产品信息选择
			        this.handleRegistry.push(dojo.subscribe("/assureProductSelect/click", function(event) {
				                return behavior.onAssureProductSelectClick(event);
			                }));
			        // 产品属性-复选框选择
			        this.handleRegistry.push(dojo.subscribe("/subProdSelect/click", function(event) {
				                return behavior.onSubProdSelectClick(event);
			                }));
			        // 可选包树，选号页面，确定按钮点击事件
			        this.handleRegistry.push(dojo.subscribe("/subProdOfferNumBtn/click", function(event) {
				                return behavior.onSubProdOfferNumBtnClick(event);
			                }));
			        
			        // 管理账号选择确定事件
			        this.handleRegistry.push(dojo.subscribe("/manageAccNumBtn/click", function(event) {
				                return behavior.onManageAccNumBtnClick(event);
			                }));
			        
			        // 自主版套餐选择点击确定按钮时处理
			        this.handleRegistry.push(dojo.subscribe("/mainprodoffer-confirm-button/click", function(event) {
				                return behavior.onMainProdOfferConfirm(event);
			                }));
			        // 自主版套餐选择取消按钮时处理
			        this.handleRegistry.push(dojo.subscribe("/mainprodoffer-check-button/click", function(event) {
				                return behavior.onMainProdOfferCheck(event);
			                }));
			        
			        // 自主版套餐成员套餐选择页面点击添加成员按钮时处理
			        this.handleRegistry.push(dojo.subscribe("/addMemberProdOffer/click", function(event) {
				                return behavior.onAddMemeberProdOffer(event);
			                }));
			        // 缴费按钮点击时间
			        this.handleRegistry.push(dojo.subscribe("/doCharge/click", function(event) {
				                return behavior.onDoChargeClick(event);
			                }));
			        
			        // 批量新装返回上一步
			        this.handleRegistry.push(dojo.subscribe("/backBatch/click", function(event) {
				                return behavior.onBackBatchClick(event);
			                }));
			        // 批量新装提交
			        this.handleRegistry.push(dojo.subscribe("/saveBatch/click", function(event) {
				                return behavior.onSaveBatchClick(event);
			                }));
			        // 生成批量新装模板
			        this.handleRegistry.push(dojo.subscribe("/generationTemplate/click", function(event) {
				                return behavior.onGenerTemplateClick.apply(behavior, arguments);
				                
			                }));
			        // 促销政策作用对象单选按钮点击事件
			        this.handleRegistry.push(dojo.subscribe("/radioBoxTargetNumberChg/click", function(event) {
				                return behavior.onPromotionTargetNumChgClick(event);
			                }));
			        
			        // 购物车中主产品变化时
			        this.handleRegistry.push(dojo.subscribe("/accessProductSelect/change", function(event) {
				                return behavior.onAccessProductChange(event);
			                }));
			        
			        // 购物车中主产品变化时
			        this.handleRegistry.push(dojo.subscribe("/toMainProdOfferSelectPane/click", function(event) {
				                return behavior.onToMainProdOfferSelectPane(event);
			                }));
			        this.handleRegistry.push(dojo.subscribe("/toOrderDetailPage/click", function(event) {
				                return behavior.onToOrderDetailPage(event);
			                }));
			        // 当鼠标移到个人收藏,热点销售品,推荐销售品,搜索结果面板上的销售品时显示资费信息
			        
			        this.handleRegistry.push(dojo.subscribe("/personalProdOfferItem-span/mouseover", function(event) {
				                return behavior.onMainProdOfferTreeNodeMouseOver(event);
			                }));
			        
			        this.handleRegistry.push(dojo.subscribe("/personalProdOfferItem-span/mouseout", function(event) {
				                return behavior.onProdOfferInfoMouseOut(event);
			                }));
			        
			        this.handleRegistry.push(dojo.subscribe("/hotProdOfferItem-span/mouseover", function(event) {
				                return behavior.onMainProdOfferTreeNodeMouseOver(event);
			                }));
			        
			        this.handleRegistry.push(dojo.subscribe("/hotProdOfferItem-span/mouseout", function(event) {
				                return behavior.onProdOfferInfoMouseOut(event);
			                }));
			        
			        this.handleRegistry.push(dojo.subscribe("/peddleProdOfferItem-span/mouseover", function(event) {
				                return behavior.onMainProdOfferTreeNodeMouseOver(event);
			                }));
			        
			        this.handleRegistry.push(dojo.subscribe("/peddleProdOfferItem-span/mouseout", function(event) {
				                return behavior.onProdOfferInfoMouseOut(event);
			                }));
			        
			        this.handleRegistry.push(dojo.subscribe("/searchProdItem-span/mouseover", function(event) {
				                return behavior.onMainProdOfferTreeNodeMouseOver(event);
			                }));
			        
			        this.handleRegistry.push(dojo.subscribe("/searchProdItem-span/mouseout", function(event) {
				                return behavior.onProdOfferInfoMouseOut(event);
			                }));
			        
			        // 监听可选包搜索按键事件
			        this.handleRegistry.push(dojo.subscribe("/subProdOfferSearch/keyup", function() {
				                behavior.onSubProdOfferSearchKeyup.apply(behavior, arguments);
			                }));
			        // 监听可选包搜索框获得焦点事件
			        this.handleRegistry.push(dojo.subscribe("/subProdOfferSearch/focus", function() {
				                behavior.onMainProdOfferSearchFocus.apply(behavior, arguments);
			                }));
			        // 监听可选包搜索框获得失去事件
			        this.handleRegistry.push(dojo.subscribe("/subProdOfferSearch/blur", function() {
				                behavior.onMainProdOfferSearchBlur.apply(behavior, arguments);
			                }));
			        // 免提单打印
			        this.handleRegistry.push(dojo.subscribe("/doPrint/click", function() {
				                behavior.doPrint.apply(behavior, arguments);
			                }));
			        // 变更可选包或主销售品,展示已订购的促销政策详细信息
			        this.handleRegistry.push(dojo.subscribe("/promotionChangeDetailLink/click", function(evt) {
				                behavior.onPromotionChangeDetailClick(evt);
			                }));
			        // 监听促销政策搜索按键事件
			        this.handleRegistry.push(dojo.subscribe("/promotionSearch/keyup", function() {
				                behavior.onPromotionSearchKeyup.apply(behavior, arguments);
			                }));
			        // 监听促销政策搜索获得焦点事件
			        this.handleRegistry.push(dojo.subscribe("/promotionSearch/focus", function() {
				                behavior.onMainProdOfferSearchFocus.apply(behavior, arguments);
			                }));
			        // 监听促销政策搜索光标失去事件
			        this.handleRegistry.push(dojo.subscribe("/promotionSearch/blur", function() {
				                behavior.onMainProdOfferSearchBlur.apply(behavior, arguments);
			                }));
			        // 促销政策查询结果双击事件
			        this.handleRegistry.push(dojo.subscribe("/searchPromotionItem/dblclick", function(event) {
				                behavior.showSalesPromotion(event.currentTarget.getAttribute("promotionId"));
			                }));
			        // 订单预览
			        this.handleRegistry.push(dojo.subscribe("/ordershow/click", function() {
				                behavior.controller.showOrderPreView();
			                }));
			        // 促销收藏
			        this.handleRegistry.push(dojo.subscribe("/promotionCollect/click", function(event) {
				                return behavior.onCollectPromotionClick(event);
			                }));
			        
			        // 取消促销收藏
			        this.handleRegistry.push(dojo.subscribe("/promotionCancelCollect/click", function(event) {
				                return behavior.onCancelCollectPromotionClick(event);
			                }));
			        
			        // 收藏促销双击事件
			        this.handleRegistry.push(dojo.subscribe("/personalPromotionItem/dblclick", function(event) {
				                behavior.showSalesPromotion(event.currentTarget.getAttribute("prodOfferId"));
			                }));
			        // 可选包收藏更多点击事件
			        this.handleRegistry.push(dojo.subscribe("/morePersonalSubItem/click", function(event) {
				                behavior.showMoreSubProdOffer(event);
			                }));
		        },
		        /**
				 * 展示更多的收藏可选包
				 */
		        showMoreSubProdOffer : function(event) {
			        var behavior = this;
			        var loader = behavior.controller;
			        var mainProdOfferId = "";
			        var node = event.currentTarget,
				        uniqueId = node.getAttribute("subUniqueId");
			        if (uniqueId == "") {
				        mainProdOfferId = $ac$.selectedMainProdOfferInfoVO.prodOfferId;
			        } else {
				        var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
				        var targetSelectMem = dojo.filter(selectedMemberProdOfferList || [], function(_data) {
					                return _data.uniqueId == uniqueId;
				                });
				        if (targetSelectMem.length > 0) {
					        mainProdOfferId = targetSelectMem[0].prodOfferId;
				        }
			        }
			        if (!dojo.global.$appContext$.get("_morePersonalSubProdOfferList" + uniqueId)) {
				        var personalSubProdOfferList = dojo.global.$appContext$.get("_personalSubProdOfferList"
				                + uniqueId);
				        var _morePersonalSubProdOfferList = dojo.filter($ac$.get("_allSubProdOffers_") || [], function(
				                        personalSubProdOfferInfo) {
					                return dojo.some($ac$.get("_allowProdOfferIds_" + mainProdOfferId) || [], function(
					                                info) {
						                        return info.prodOfferId == personalSubProdOfferInfo.prodOfferId;
					                        })
					                        && dojo.every(personalSubProdOfferList || [], function(_info_) {
						                                return _info_.prodOfferId != personalSubProdOfferInfo.prodOfferId;
					                                });
				                });
				        dojo.global.$appContext$.set("_morePersonalSubProdOfferList" + uniqueId,
				                _morePersonalSubProdOfferList);
				        if (loader.personalSubCollectMoreListWidgetInstanceMap[uniqueId]) {
					        loader.personalSubCollectMoreListWidgetInstanceMap[uniqueId].destroyRecursive();
				        }
				        var personalSubCollectListWidgetInstance = new MoreSubOfferCollectWidget({
					                uniqueId : uniqueId
				                });
				        loader.personalSubCollectMoreListWidgetInstanceMap[uniqueId] = personalSubCollectListWidgetInstance;
				        dojo.place(personalSubCollectListWidgetInstance.domNode, dojo.byId("subCollect" + uniqueId),
				                "last");
				        
			        }
			        var element = event.srcElement;
			        dojo.byId(element.name).style.display = (dojo.byId(element.name).style.display == "block")
			                ? "none"
			                : "block";
			        dojo.byId(element).innerHTML = (dojo.byId(element).text == "更多>>") ? "隐藏<<" : "更多>>";
		        },
		        onSaveBatchClick : function(event) {
			        
			        this.setBatchButtonDisableStatus(true);
			        if (this.batchCheck()) {
				        var form = $("batchForm");
				        var templateId = dojo.global.$appContext$.get("templateId");
				        if (null == templateId) {
					        
					        templateId = this.onGenerTemplateClick(null, true);
					        if (!templateId) {
						        
						        this.setBatchButtonDisableStatus(false);
					        }
				        }
				        var basecTRS = dojo.query(".main-product-basic");
				        var CDMA_SERVICE_KIND = ConstantsPool.load("ServiceKindCDConst").ServiceKindCDConst.CDMA_SERVICE_KIND;
				        var ifCdmaBatch = "0";
						if($ac$.selectedMainProdOfferInfoVO.bindType == 2 && basecTRS.length > 1){
							ifCdmaBatch = "1";
				        	dojo.forEach(basecTRS,function(basecTR){
				        		if(CDMA_SERVICE_KIND != basecTR.getAttribute("serviceKind")){
				        			ifCdmaBatch = "0";
				        		}
				        	});						
						}
				        var batchRegNo = dojo.global.$appContext$.get("_batchRegNo");
				        var productId = dojo.global.$appContext$.get("_productId");
				        var serviceOfferId = dojo.global.$appContext$.get("_serviceOfferId");
				        var doStartTime = unieap.byId("doStartTime").getValue();
				        var doEndTime = unieap.byId("doEndTime").getValue();
				        var remark = unieap.byId("remark").getValue();
				        var relationGroup = unieap.byId("relationGroup").getValue();
				        var parameters = "&templateId=" + templateId + "&batchRegNo=" + batchRegNo + "&productId="
				                + productId + "&serviceOfferId=" + serviceOfferId + "&doStartTime=" + doStartTime
				                + "&doEndTime=" + doEndTime + "&remark=" + remark + "&relationGroup=" + relationGroup
				                + "&ifCdmaBatch=" + ifCdmaBatch;
                        if(!!remark){
	                        var batchInfoMgrBO = BusCard.$remote("batchInfoMgrBO");
                            if(!!batchInfoMgrBO && !!batchInfoMgrBO.doUpdateBatchInfoByBatchRegNo){
	                           batchInfoMgrBO.doUpdateBatchInfoByBatchRegNo({"batchRegNo":batchRegNo,"remark":remark});
                            }
                        }
				        form.action = BusCard.path.contextPath
				                + "/batchServiceAcceptCommonAction.do?method=doAddBatchRecord" + parameters;
				        form.target = "batchresult";
				        form.submit();
			        } else {
				        this.setBatchButtonDisableStatus(false);
			        }
		        },
		        setBatchButtonDisableStatus : function(status) {
			        var batchBackButton = dojo.byId("batchBackButton");
			        if (batchBackButton) {
				        batchBackButton.disabled = status;
			        }
			        var batchSubmitButton = dojo.byId("batchSubmitButton");
			        if (batchSubmitButton) {
				        batchSubmitButton.disabled = status;
			        }
		        },
		        onBackBatchClick : function() {
			        var behavior = this;
			        dojo.style(dojo.byId("prodoffer-accept-root"), {
				                display : 'block'
			                });
			        dojo.style(dojo.byId("order-show-root"), {
				                display : 'none'
			                });
			        behavior.controller.functionNavigatorWidget.switchGroup(0);
		        },
		        batchCheck : function() {
			        var file = unieap.byId("fileName").getValue();
			        var doStartTimeValidator = unieap.byId('doStartTime').getValidator();
			        var doEndTimeValidator = unieap.byId('doEndTime').getValidator();
			        if (file == null || file == "") {
				        // alert("\u8bf7\u4e0a\u4f20\u6587\u4ef6");
				        messageBox.alert({
					                busiCode : "08410094"
				                });
				        return false;
			        } else if (!doStartTimeValidator.validate()) {
				        // alert("\u6267\u884c\u5f00\u59cb\u65f6\u95f4\u683c\u5f0f\u4e0d\u6b63\u786e");
				        messageBox.alert({
					                busiCode : "08410095"
				                });
				        return false;
			        } else if (!doEndTimeValidator.validate()) {
				        // alert("\u6267\u884c\u7ed3\u675f\u65f6\u95f4\u683c\u5f0f\u4e0d\u6b63\u786e");
				        messageBox.alert({
					                busiCode : "08410096"
				                });
				        return false;
			        }
			        return true;
		        },
		        onGenerTemplateClick : function(event, notDownLoad) {
			        var productId = dojo.global.$appContext$.get("_productId");
			        var serviceOfferId = dojo.global.$appContext$.get("_serviceOfferId");
			        var serviceKind = dojo.global.$appContext$.get("_serviceKind");
			        var param = "&productId=" + productId + "&serviceOfferId=" + serviceOfferId + "&serviceKind="
			                + serviceKind;
			        var result = util.ServiceFactory.getService("url:batchExecMemberAddAction.do?method=doQuery"
			                + param);
			        if (result) {
				        var arrayStr = result.split("&");
				        if (arrayStr.length == 1) {
					        // alert("\u6ca1\u6709\u914d\u7f6e\u8def\u5f84");
					        messageBox.alert({
						                busiCode : "08410097"
					                });
					        return false;
				        } else {
					        dojo.global.$appContext$.set("templateId", arrayStr[0]);
					        if (!notDownLoad) {
						        window.open(BusCard.path.contextPath + arrayStr[1]);
					        } else {
						        return arrayStr[0];
					        }
				        }
			        }
		        },
		        destroy : function() {
			        dojo.forEach(this.handleRegistry, function(handle) {
				                dojo.unsubscribe(handle);
			                });
			        while (this.handleRegistry.length) {
				        this.handleRegistry.pop();
			        }
		        },
		        onMainProdOfferDetailClick : function(event) {
			        var controller = this.controller;
			        var widget = dijit.getEnclosingWidget(event.currentTarget);
			        if (widget.declaredClass == "orderaccept.prodofferaccept.widget.mainprodoffer.MultipleMainProdOfferWidget") {
				        orderaccept.custom.popup.open({
					                widget : {
						                popup : widget.mainProdOfferDetailWidget,
						                around : event.currentTarget
					                }
				                });
			        } else {
				        orderaccept.custom.popup.open({
					                widget : {
						                popup : controller.mainProdOfferDetailWidget,
						                around : event.currentTarget
					                }
				                });
			        }
			        
		        },
		        /**
				 * 在销售品搜索上点击回车所触发的动作,点击回车时会根据当前输入的字符 模糊查询销售品,
				 * 然后根据查询出的销售品列表生成列表视图Widget,同时在页面上 进行渲染
				 * 
				 * @method
				 */
		        onMainProdOfferSearchKeyup : function(event) {
			        var parentNode = event.currentTarget.parentNode;
			        var prodNameNode = dojo.query("[id=prodOfferSearch]", parentNode)[0];
			        var tips = dojo.attr(prodNameNode, "tips");
			        var prodName = prodNameNode.value;
			        if ((prodName != tips) && (event.keyCode == 13 || prodNameNode !== event.currentTarget)) {
				        if (prodName) {
					        var belongCode = dojo.byId("common-belongcode").value;
					        // 这里需要根据实际业务修改
					        if (belongCode == "210101") {
						        // alert("请选择查询区域！");
						        messageBox.alert({
							                busiCode : "08410098"
						                });
						        Me.$("belongCodeColl").focus();
						        return false;
					        }
					        var custType = this.controller.requestParam.customerData.custType;
					        var custId = this.controller.requestParam.customerData.custId;
					        var cityCode = this.controller.requestParam.customerData.cityCode;
					        var param = "belongCode=" + belongCode + "&prodName=" + prodName + "&custType=" + custType
					                + "&cityCode=" + cityCode + "&custId=" + custId + "&method=getProdOfferInfoByName"
					                + this.controller.appendOfferFilterParameters();
					        var prodOfferListVOList = util.ServiceFactory.getService("url:shoppingCartAction.do?"
					                + BusCard.util.native2ascii(param));
					        dojo.global.$appContext$.set("_searchProdOfferList", prodOfferListVOList);
					        if (this.controller.searchListWidgetInstance) {
						        this.controller.searchListWidgetInstance.destroy();
					        }
					        this.controller.searchListWidgetInstance = new searchListWidget();
					        dojo.place(this.controller.searchListWidgetInstance.domNode, unieap
					                        .byId("mainProdOfferSearchResult").containerNode, "last");
					        unieap.byId("TabContainer").selectChild(unieap.byId("mainProdOfferSearchResult"));
				        }
			        }
			        
		        },
		        
		        /**
				 * 可选包搜索
				 * 
				 * @method
				 */
		        onSubProdOfferSearchKeyup : function(event) {
			        var behavior = this;
			        var domNode = event.currentTarget
			        var widgetId = -1;
			        while (true) {
				        var widget = dijit.getEnclosingWidget(domNode);
				        if (widget.declaredClass === "unieap.layout.BorderContainer") {
					        break;
				        }
				        if (widgetId != widget.id) {
					        domNode = widget.domNode;
				        } else {
					        domNode = widget.domNode.parentNode;
				        }
				        widgetId = widget.id;
			        }
			        var subProdOfferCartDataProvider = this.controller.multipleSubProdOfferHandler.subProdOfferOrderProviderMap[domNode.id];
			        var prodOfferId = null;
			        var uniqueId = "";
			        if (subProdOfferCartDataProvider.contentPane) {
				        prodOfferId = subProdOfferCartDataProvider.contentPane.prodOfferInfoVO.prodOfferId;
				        uniqueId = subProdOfferCartDataProvider.uniqueId || "";
			        } else {
				        prodOfferId = $ac$.currentMainProdOfferInfoVO.prodOfferId;
				        uniqueId = subProdOfferCartDataProvider.uniqueId || "";
			        }
			        if (event.keyCode == 13) {
				        var prodOfferName = BusCard.native2ascii(dojo.trim(event.currentTarget.value));
				        if (prodOfferName) {
					        var param = "prodOfferName=" + prodOfferName + "&prodOfferId=" + prodOfferId
					        		+"&accProdListStr="+(behavior.controller.getAccProdIdList(uniqueId)||"")
					                + "&method=getSubProdOfferInfoByName";
					        var prodOfferListVOList = util.ServiceFactory.getService("url:shoppingCartAction.do?"
					                + param);
					        dojo.global.$appContext$.set("_searchSubProdOfferList" + uniqueId, prodOfferListVOList);
					        if (this.controller.searchSubListWidgetInstanceMap[uniqueId]) {
						        this.controller.searchSubListWidgetInstanceMap[uniqueId].destroy();
					        }
					        var subsSearchListWidgetInstance = new SubsSearchListWidget({
						                uniqueId : uniqueId
					                });
					        this.controller.searchSubListWidgetInstanceMap[uniqueId] = subsSearchListWidgetInstance;
					        dojo.place(subsSearchListWidgetInstance.domNode, unieap.byId("subProdOfferSearchResult"
					                        + uniqueId).containerNode, "last");
					        unieap.byId("subProdOfferTab" + uniqueId).selectChild(unieap
					                .byId("subProdOfferSearchResult" + uniqueId));
				        }
			        }
			        
		        },
		        
		        /**
				 * 促销政策搜索
				 */
		        onPromotionSearchKeyup : function(event) {
			        var behavior = this;
			        if (event.keyCode == 13) {
				        var promotionName = BusCard.native2ascii(dojo.trim(event.currentTarget.value));// 输入的促销政策名称
				        if (promotionName) {
					        var retObj = this.controller.getProductIdsAndSubProdOfferIds();
					        var productIds = retObj.productIdList;// 接入类产品id集合
					        var subProdOfferIdList = retObj.subProdOfferIdList;// 可选包销售品id集合
					        var mainProdOfferId = this.controller.mainProdOfferId;// 主套餐id
					        var param = "&promotionName=" + promotionName + "&prodOfferIdList="
					                + dojo.toJson(subProdOfferIdList) + "&productIdList=" + dojo.toJson(productIds)
					                + "&mainProdOfferId=" + mainProdOfferId;
					        var promotionVOlist = util.ServiceFactory
					                .getService("url:orderDetailAction.do?method=getPromotionListByName" + param);
					        dojo.global.$appContext$.set("_promotionSearchList", promotionVOlist);
					        if (this.controller.promotionSearchListWidgetInstance) {
						        this.controller.promotionSearchListWidgetInstance.destroy();
					        }
					        this.controller.promotionSearchListWidgetInstance = new PromotionSearchListWidget();
					        dojo.place(this.controller.promotionSearchListWidgetInstance.domNode, unieap
					                        .byId("promotionSearchResult").containerNode, "last");
					        unieap.byId("promotionTab").selectChild(unieap.byId("promotionSearchResult"));
				        }
			        }
		        },
		        
		        /**
				 * 在销售品搜索获得焦点触发事件
				 * 
				 */
		        onMainProdOfferSearchFocus : function(event) {
			        var currentTarget = event.currentTarget;
			        currentTarget.value = dojo.attr(currentTarget, 'valueCache');
			        // 光标始终在文字最后
			        if (currentTarget.createTextRange) { // IE
				        var r = currentTarget.createTextRange();
				        r.moveStart('character', currentTarget.value.length);
				        r.collapse(true);
				        r.select();
			        } else if (typeof currentTarget.selectionStart == 'number') { // Firefox
				        currentTarget.setSelectionRange(currentTarget.value.length, currentTarget.value.length);
			        }
			        currentTarget.style.color = "#000000";
		        },
		        onOpenAdvanceSearchClick : function(event) {
			        var advanceSearchWidget = unieap.byId("advanceSearchTip");
			        orderaccept.custom.popup.open({
				                widget : {
					                popup : advanceSearchWidget,
					                around : event.currentTarget
				                }
			                });
			        
		        },
		        onAdvanceSearchClick : function(event) {
			        var advanceSearchWidget = unieap.byId("advanceSearchTip");
			        
			        var netType = dojo.query("[id='prodbigkind']", advanceSearchWidget.containerNode)[0].value,
				        product = dojo.query("[id='prod']", advanceSearchWidget.containerNode)[0].value,
				        userType = dojo.query("[id='userType']", advanceSearchWidget.containerNode)[0].value,
				        cycleYear = dojo.query("[id='cycleYear']", advanceSearchWidget.containerNode)[0].value,
				        bandwidth = dojo.query("[id='bandwidth']", advanceSearchWidget.containerNode)[0].value,
				        accessMode = dojo.query("[id='accessMode']", advanceSearchWidget.containerNode)[0].value;
			        
			        var belongCode = dojo.byId("common-belongcode").value;
			        // 这里需要根据实际业务修改
			        if (belongCode == "210101") {
				        // alert("请选择查询区域！");
				        messageBox.alert({
					                busiCode : "08410098"
				                });
				        Me.$("belongCodeColl").focus();
				        return false;
			        }
			        var param = "method=getOfferListByProdAndOtherCondition";
			        param += "&netType=" + netType;
			        param += "&productId=" + product;
			        param += "&belongCode=" + (belongCode == "-1" ? "" : belongCode);
			        param += "&userType=" + (userType == "-1" ? "" : userType);
			        param += "&cycleYear=" + (cycleYear == "-1" ? "" : cycleYear);
			        param += "&bandwidth=" + (bandwidth == "-1" ? "" : bandwidth);
			        param += "&accessMode=" + (accessMode == "-1" ? "" : accessMode);
			        
			        var prodOfferListVOList = util.ServiceFactory.getService("url:shoppingCartAction.do?" + param
			                + this.controller.appendOfferFilterParameters());
			        dojo.global.$appContext$.set("_searchProdOfferList", prodOfferListVOList);
			        
			        if (this.controller.searchListWidgetInstance) {
				        this.controller.searchListWidgetInstance.destroy();
			        }
			        this.controller.searchListWidgetInstance = new searchListWidget();
			        dojo.place(this.controller.searchListWidgetInstance.domNode, unieap
			                        .byId("mainProdOfferSearchResult").containerNode, "last");
			        unieap.byId("TabContainer").selectChild(unieap.byId("mainProdOfferSearchResult"));
			        
			        orderaccept.custom.popup.close({
				                widget : advanceSearchWidget
			                });
			        
		        },
		        /**
				 * 获取卡片
				 * 
				 * @method
				 */
		        getCard : function() {
			        return this.busCardInstance;
		        },
		        getSelectList : function(selectList) {
			        var card = this.getCard();
			        
			        var selectParamList = [];
			        
			        selectParamList = BusCard.map(selectList, function(valueVO) {
				                return {
					                id : valueVO.attrValue,
					                name : valueVO.attrValueName
				                };
			                });
			        selectParamList.unshift({
				                id : "-1",
				                name : "不区分"
			                });
			        return selectParamList;
		        },
		        
		        /**
				 * 高级查询通过销售品大类过滤
				 */
		        getProdByProdBigKind : function(event) {
			        var netTypeValue = event.currentTarget.value,
				        prodList = BusCard.$remote("serviceParamBO").getProdByProdNetType(netTypeValue),
				        advanceSearchWidget = unieap.byId("advanceSearchTip");
			        BusCard.$rs(dojo.query("[id=prod]", advanceSearchWidget.containerNode)[0], prodList.list);
			        this.prodAdvanceChang("-1");
		        },
		        prodAdvanceChang : function(prodId) {
			        advanceSearchWidget = unieap.byId("advanceSearchTip");
			        var prodList = BusCard.$remote("innerInterfaceBO").doQueryCondition({
				                serviceKind : dojo.query("[id='prodbigkind']", advanceSearchWidget.containerNode)[0].value,
				                productId : dojo.query("[id='prod']", advanceSearchWidget.containerNode)[0].value
			                });
			        var userTypeList = this.getSelectList(prodList.userTypeList);
			        var productAccModeList = this.getSelectList(prodList.productAccModeList);
			        var productRateList = this.getSelectList(prodList.productRateList);
			        var offerCycleList = this.getSelectList(prodList.offerCycleList);
			        BusCard.$rs(dojo.query("[id=userType]", advanceSearchWidget.containerNode)[0], userTypeList);
			        BusCard
			                .$rs(dojo.query("[id=accessMode]", advanceSearchWidget.containerNode)[0],
			                        productAccModeList);
			        BusCard.$rs(dojo.query("[id=bandwidth]", advanceSearchWidget.containerNode)[0], productRateList);
			        BusCard.$rs(dojo.query("[id=cycleYear]", advanceSearchWidget.containerNode)[0], offerCycleList);
			        
		        },
		        
		        /**
				 * 在销售品搜索失去焦点触发事件
				 * 
				 */
		        onMainProdOfferSearchBlur : function(event) {
			        var currentTarget = event.currentTarget;
			        if (currentTarget.value == "") {
				        dojo.attr(currentTarget, 'valueCache', "");
				        currentTarget.value = dojo.attr(currentTarget, 'tips');
				        currentTarget.style.color = "#cccccc";
			        } else {
				        dojo.attr(currentTarget, 'valueCache', currentTarget.value);
			        }
		        },
		        /**
				 * 点击主销售品樹上的銷售品節點所触发的动作,点击主销售树上的节点,如果节点对应的主销售品和
				 * 当前受理的不同,根据选择的新的主销售品重新生成MainProdOfferWidget以及各种可选包Widget,
				 * 在新的widget渲染到页面之前需要对原有的各种Widget进行destory操作,
				 * 同时也包括对老的卡片进行destroy操作
				 * 
				 * @method
				 */
		        onMainProdOfferTreeNodeClick : function(node) {
			        var behavior = this;
			        
			        var data = node.getData(),
				        behavior = this,
				        id = node.getData().id,
				        leaf = node.getData().leaf,
				        isCatalog = node.getData().isCatalog
			        if (leaf && isCatalog != '1') {
			            //判断非集团用户不允许订购集团产品
				        var returnResult = true;
				        returnResult = behavior.controller.orderGroupProductCheck(node.getData().id);
				        if (!returnResult) { return; }
				        behavior.controller.changeMainProdOffer(id, node.domNode);
				        
			        }else{
			        	!!node.tree && !!node.tree.expandNode?node.tree.expandNode(node):null;
			        }			        
		        },
		        onMainProdOfferTreeNodeMouseOver : function(node) {
			        var currentTarget = null,
				        prodOfferId = null;
			        if (node && node.getData) {
				        var data = node.getData(),
					        behavior = this,
					        prodOfferId = node.getData().id,
					        leaf = node.getData().leaf,
					        isCatalog = node.getData().isCatalog,
					        currentTarget = dojo.query(".dijitTreeLabel", node.domNode)[0];
				        // 如果是目录 直接返回
				        if (isCatalog == '1') { return false; }
				        
			        } else {
				        currentTarget = node.currentTarget;
				        
				        var liNode = util.DomHelper.findParentNode(currentTarget, function(pNode) {
					                return pNode.tagName.toUpperCase() == 'LI';
				                });
				        
				        prodOfferId = dojo.attr(liNode, "prodOfferId");
				        
			        }
			        
			        var prodOfferInfoTipsWidget = unieap.byId("prodOfferInfoTips"),
				        prodOfferInfoObj = util.ProdOfferHelper.getProdOfferDetail(prodOfferId, {
					                permitFromCache : true,
					                permitCache : true,
					                interfaceType : 1
				                }),
				        prodOfferName = prodOfferInfoObj.prodOfferName,
				        desc = prodOfferInfoObj.prodOfferDesc,
				        effDate = prodOfferInfoObj.effDate,
				        expDate = prodOfferInfoObj.expDate;
			        dojo.query("[id='prodoffer-name']", prodOfferInfoTipsWidget.containerNode)[0].innerHTML = prodOfferName;
			        dojo.query("[id='prodoffer-desc']", prodOfferInfoTipsWidget.containerNode)[0].innerHTML = desc;
			        dojo.query("[id='prodoffer-effDate']", prodOfferInfoTipsWidget.containerNode)[0].innerHTML = effDate;
			        dojo.query("[id='prodoffer-expDate']", prodOfferInfoTipsWidget.containerNode)[0].innerHTML = expDate;
			        unieap.byId("prodOfferInfoTips").domNode.className = 'dijitTooltipDialog dijitTooltipRight';
			        orderaccept.custom.popup.open({
				                widget : {
					                popup : prodOfferInfoTipsWidget,
					                around : currentTarget,
					                pos : "R"
				                }
			                });
			        
		        },
		        onProdOfferInfoMouseOut : function() {
			        var prodOfferInfoTipsWidget = unieap.byId("prodOfferInfoTips");
			        orderaccept.custom.popup.close({
				                widget : prodOfferInfoTipsWidget
			                });
		        },
		        onMainProdOfferMouseOver : function(event) {
			        var prodOfferInfoVO = util.ProdOfferHelper.getMainProdOffer(dojo.global.$appContext$
			                .get("prodOfferList"))[0],
				        prodOfferInfoTipsWidget = unieap.byId("prodOfferInfoTips"),
				        prodOfferName = prodOfferInfoVO.prodOfferName,
				        desc = prodOfferInfoVO.prodOfferDesc,
				        effDate = prodOfferInfoVO.effDate,
				        expDate = prodOfferInfoVO.expDate;
			        dojo.query("[id='prodoffer-name']", prodOfferInfoTipsWidget.containerNode)[0].innerHTML = prodOfferName;
			        dojo.query("[id='prodoffer-desc']", prodOfferInfoTipsWidget.containerNode)[0].innerHTML = desc;
			        dojo.query("[id='prodoffer-effDate']", prodOfferInfoTipsWidget.containerNode)[0].innerHTML = effDate;
			        dojo.query("[id='prodoffer-expDate']", prodOfferInfoTipsWidget.containerNode)[0].innerHTML = expDate;
			        unieap.byId("prodOfferInfoTips").domNode.className = 'dijitTooltipDialog dijitTooltipABLeft dijitTooltipBelow';
			        orderaccept.custom.popup.open({
				                widget : {
					                popup : prodOfferInfoTipsWidget,
					                around : event.currentTarget
				                }
			                });
			        
		        },
		        /**
				 * 点击功能类产品属性所触发的动作,当点击产品属性链接时, 会把产品对应的产品 属性信息展现出来
				 * 
				 * @method
				 */
		        onServiceProdOfferAttrClick : function(event) {
			        var node = event.currentTarget,
				        rowIndex = node.getAttribute("rowIndex"),
				        serviceProdWidget = util.DomHelper.getParentWidget(event.currentTarget,
				                "orderaccept.prodofferaccept.widget.serviceproduct.ServiceProductWidget"),
				        serviceProdList = serviceProdWidget.serviceProdList,
				        serviceProdWidget = serviceProdWidget.serviceProdAttrList[rowIndex];
			        orderaccept.custom.popup.open({
				                widget : {
					                popup : serviceProdWidget,
					                around : event.currentTarget
				                }
			                });
		        },
		        onBatchServiceProdOfferAttrClick : function(event) {
			        var node = event.currentTarget,
				        rowIndex = node.getAttribute("rowIndex"),
				        serviceProdWidget = util.DomHelper.getParentWidget(event.currentTarget,
				                "orderaccept.prodofferaccept.widget.serviceproduct.BatchServiceProductWidget"),
				        serviceProdList = serviceProdWidget.serviceProdList,
				        serviceProdWidget = serviceProdWidget.serviceProdAttrList[rowIndex];
			        orderaccept.custom.popup.open({
				                widget : {
					                popup : serviceProdWidget,
					                around : event.currentTarget
				                }
			                });
		        },
		        /**
				 * 点击功能类产品复选框所触发的动作
				 * 
				 * @method
				 */
		        onServiceProdCheckClick : function(event) {
			        var node = event.currentTarget,
				        rowIndex = node.getAttribute("rowIndex"),
				        serviceProdWidget = util.DomHelper.getParentWidget(event.currentTarget,
				                "orderaccept.prodofferaccept.widget.serviceproduct.ServiceProductWidget");
			        serviceProdWidget.handleServiceProduct(rowIndex, node);
		        },
		        /**
				 * 点击主销售品视图上的产品属性所触发的动作,当点击产品属性链接时, 会把产品对应的服务信息和产品
				 * 属性信息展现出来
				 * 
				 * @method
				 */
		        onMainProdAttrClick : function(event) {
			        var hrefNode = event.currentTarget,
				        tRNode = util.DomHelper.findParentNode(hrefNode, function(node) {
					                return node.tagName.toUpperCase() == 'TR';
				                }),
				        viewId = tRNode.getAttribute("viewId"),
				        productId = dojo.query("select", tRNode)[0].value,
				        uniqueId = dojo.attr(tRNode, "uniqueId"),
				        serviceNode = function() {
					        var serviceTr = tRNode;
					        while (true) {
						        serviceTr = serviceTr.nextSibling;
						        if (serviceTr && (serviceTr.tagName || "").toUpperCase() == 'TR') {
							        break;
						        }
					        }
					        
					        return dojo.query(".mainProdServiceInfo-" + viewId, serviceTr)[0];
					        
				        }(),
				        trWrapperNode = serviceNode.parentNode.parentNode;
			        // fire event by programming
			        if (event.type == 'program') {
				        var isHidden = /hidden\-elem/.test(serviceNode.parentNode.parentNode.className);
				        if (event.display === true) {
					        if (isHidden) {
						        dojo.toggleClass(serviceNode.parentNode.parentNode, "hidden-elem");
					        }
				        } else if (event.display === false) {
					        if (!isHidden) {
						        dojo.toggleClass(serviceNode.parentNode.parentNode, "hidden-elem");
					        }
				        }
				        
			        } else {
				        dojo.toggleClass(serviceNode.parentNode.parentNode, "hidden-elem");
			        }
			        if (dojo.hasClass(trWrapperNode, "hidden-elem")) {
				        dojo.removeClass(hrefNode, "product-serviceinfo-oper-open");
				        dojo.addClass(hrefNode, "product-serviceinfo-oper-close");
				        var serviceCardWidget = this.controller.serviceCardWidgetMap['serviceCardWidget_' + uniqueId];
				        if (serviceCardWidget && serviceCardWidget.attrCardWidget) {
					        serviceCardWidget.attrCardWidget.completeRequiredState();
				        } else {
					        serviceCardWidget.completeRequiredState();
				        }
				        
			        } else {
				        dojo.removeClass(hrefNode, "product-serviceinfo-oper-close");
				        dojo.addClass(hrefNode, "product-serviceinfo-oper-open");
			        }
			        
		        },
		        onCollectProdOfferClick : function(event) {
			        var prodOfferValue = event.currentTarget.getAttribute("value");
			        var context = this;
			        var collectTips = unieap.byId("collectTips");
			        if (prodOfferValue) {
				        // 销售品id~销售品名称
				        var valueArray = prodOfferValue.split("~");
				        var prodOfferId = valueArray[0];
				        var prodOfferName = valueArray[1];
				        var prodOfferType = valueArray[2];
				        var mainProdOfferId = valueArray[3];
				        var operFlag = this.controller.checkInstance.checkCollectProdOffer(prodOfferId, prodOfferType,
				                mainProdOfferId);
				        if (operFlag || operFlag == -1) {
					        dojo.query("[id='tip-info']", collectTips.containerNode)[0].innerHTML = "销售品已被收藏,不能重复收藏！";
					        orderaccept.custom.popup.open({
						                widget : {
							                popup : collectTips,
							                around : event.currentTarget
						                }
					                });
					        window.setTimeout(function() {
						                context.onCollectTipsClose();
					                }, 1500);
					        return;
				        }
				        var param = "&prodOfferId=" + prodOfferId + "&prodOfferName="
				                + BusCard.native2ascii(prodOfferName) + "&prodOfferType=" + prodOfferType
				                + "&mainProdOfferId=" + mainProdOfferId;
				        var result = util.ServiceFactory
				                .getService("url:prodOfferSaleAjaxAction.do?method=savePersonalCollectProdOffer"
				                        + param);
				        if (result) {
					        var saveFlag = result.split("~")[0];
					        var message = result.split("~")[1];
					        if (saveFlag == "success") {
						        dojo.query("[id='tip-info']", collectTips.containerNode)[0].innerHTML = "销售品收藏成功！";
						        
					        } else {
						        dojo.query("[id='tip-info']", collectTips.containerNode)[0].innerHTML = "收藏失败,原因为:"
						                + message;
					        }
					        orderaccept.custom.popup.open({
						                widget : {
							                popup : collectTips,
							                around : event.currentTarget
						                }
					                });
					        window.setTimeout(function() {
						                context.onCollectTipsClose();
					                }, 1500);
				        }
			        }
		        },
		        onCancelCollectProdOfferClick : function(event) {
			        var prodOfferValue = event.currentTarget.getAttribute("value"),
				        collectTips = unieap.byId("collectTips"),
				        context = this;
			        if (prodOfferValue) {
				        // 销售品id~销售品名称
				        var valueArray = prodOfferValue.split("~");
				        var prodOfferId = valueArray[0];
				        var prodOfferType = valueArray[1];
				        var mainProdOfferId = valueArray[2];
			        }
			        var operFlag = this.controller.checkInstance.checkCollectProdOffer(prodOfferId, prodOfferType,
			                mainProdOfferId);
			        if (operFlag == -1) {
				        dojo.query("[id='tip-info']", collectTips.containerNode)[0].innerHTML = "系统默认收藏,不能进行删除！";
				        orderaccept.custom.popup.open({
					                widget : {
						                popup : collectTips,
						                around : event.currentTarget
					                }
				                });
				        window.setTimeout(function() {
					                context.onCollectTipsClose();
				                }, 1500);
				        return;
			        }
			        if (!operFlag) {
				        dojo.query("[id='tip-info']", collectTips.containerNode)[0].innerHTML = "未收藏,不能进行删除操作！";
				        orderaccept.custom.popup.open({
					                widget : {
						                popup : collectTips,
						                around : event.currentTarget
					                }
				                });
				        window.setTimeout(function() {
					                context.onCollectTipsClose();
				                }, 1500);
				        return;
			        }
			        var param = "&prodOfferId=" + prodOfferId;
			        var result = util.ServiceFactory
			                .getService("url:prodOfferSaleAjaxAction.do?method=deleteCollectProdOffer" + param);
			        if (result) {
				        if (parseInt(result) > 0) {
					        dojo.query("[id='tip-info']", collectTips.containerNode)[0].innerHTML = "已收藏销售品删除成功！";
					        orderaccept.custom.popup.open({
						                widget : {
							                popup : collectTips,
							                around : event.currentTarget
						                }
					                });
					        window.setTimeout(function() {
						                context.onCollectTipsClose();
					                }, 1500);
				        }
			        }
		        },
		        onCollectTipsClose : function(event) {
			        var collectTips = unieap.byId("collectTips");
			        orderaccept.custom.popup.close({
				                widget : collectTips
			                });
		        },
		        onBelongCodeChange : function() {
			        var controller = this.controller;
			        // 刷新便捷受理
			        controller.renderProdOfferFavorite();
			        // 刷新主销售品树
			        if (controller.mainProdOfferTree) {
				        controller.mainProdOfferTree.destroy();
				        controller.renderMainProdOfferTree();
			        }
			        // 清空搜索列表
			        if (controller.searchListWidgetInstance) {
				        controller.searchListWidgetInstance.destroy();
				        dojo.byId("prodOfferSearch").value = "";
			        }
			        
			        if (controller.shoppingCartWidgetInstance) {
				        controller.shoppingCartWidgetInstance.destroyRecursive();
				        controller.shoppingCartWidgetInstance = null;
			        }
			        
			        // 清空详情区域
			        controller.clear();
			        controller.mainProdOfferId = "";
		        },
		        onSearchNumberClick : function(evt) {
			        var hrefNode = evt.currentTarget,
				        tRNode = hrefNode.parentNode.parentNode.parentNode,
				        viewId = tRNode.getAttribute("viewId"),
				        productId = tRNode.getAttribute("productId"),
				        uniqueId = tRNode.getAttribute("uniqueId"),
				        userId = dojo.attr(tRNode, "userId"),
				        prodInstId = dojo.attr(tRNode, "prodInstId"),
				        requestParam = dojo.global.$appContext$.get("requestParam");
			        // avoid overriding old user
			        if (userId || prodInstId) {
				        unieap.showTooltip(
				                "<p style='color:red'>\u6b64\u4ea7\u54c1\u5b58\u5728\u5df2\u6709\u7528\u6237</p>",
				                hrefNode, ["below", 'after']);
				        setTimeout(function() {
					                unieap.hideTooltip(hrefNode);
				                }, 4000);
				        return false;
			        }
			        if (dojo.query(".serviceOperOld-" + viewId)[0].checked == true) {
				        if (dojo.query(".serviceOperOld-" + viewId)[0].checked != true) { return; }
				        var param = {
					        id : 'selectOldNumberWidget~' + uniqueId,
					        uniqueId : uniqueId,
					        productId : productId,
					        cityCode : requestParam.customerData.cityCode,
					        customerId : requestParam.customerData.custId
				        },
					        serviceInfoListWidget = unieap.byId("selectOldNumberWidget~" + uniqueId);
				        if (!serviceInfoListWidget) {// 如果不存在
					        serviceInfoListWidget = new ServiceInfoListWidget(param);
				        }
				        orderaccept.custom.popup.open({
					                widget : {
						                popup : serviceInfoListWidget,
						                around : evt.currentTarget
					                }
				                });
				        // 选择在途号码
			        }
		        },
		        onOldNumberSelect : function(evt) {
			        var target = evt.currentTarget;
			        var serviceId = dojo.attr(target, "serviceId");
			        var userId = dojo.attr(target, "userId");
			        var uniqueId = dojo.attr(target, "productUniqueId");
			        var prodOfferInstId = dojo.attr(target, "prodOfferInstId");
			        var cityCode = dojo.attr(target, "cityCode");
			        var serviceKind = dojo.attr(target, "serviceKind");
			        var serviceInfoListWidget = unieap.byId("selectOldNumberWidget~" + uniqueId);
			        
			        var param = "&cityCode=" + cityCode + "&serviceId=" + serviceId + "&serviceKind=" + serviceKind
			                + "&userId=" + userId;
			        var result = util.ServiceFactory
			                .getService("url:prodOfferSaleAjaxAction.do?method=doCheckUncomplete" + param);
			        if (result && result.flag < 0) {
				        // alert(result.message);
				        messageBox.alert({
					                busiCode : "08410099",
					                infoList : [result.message]
				                });
				        orderaccept.custom.popup.close({
					                widget : serviceInfoListWidget
				                });
				        return false;
			        }
			         //是否是包周期变为包周期
			        if (!this.controller.route("/checkInstance/doCheckIfCanChange", [$ac$.currentMainProdOfferInfoVO,
			                        prodOfferInstId,uniqueId])) { return false; }
			        //检测新的号码是否预约
			        if (!this.controller.route("/checkInstance/doChekOldUserServiceReserve", [prodOfferInstId,
			                        serviceId])) { return false; }
			        //已有的余额和新的协议销售品的包周期费用大小
			        if (!this.controller.route("/checkInstance/doCheckProductRestFee", [$ac$.currentMainProdOfferInfoVO,
			                        prodOfferInstId,uniqueId,userId,serviceId])) { return false; }
			        this.controller.oldUserAddedHandler.addOldUser({
				                serviceId : serviceId,
				                userId : userId,
				                prodInstId : userId,
				                prodOfferInstId : prodOfferInstId,
				                uniqueId : uniqueId
			                });
			        orderaccept.custom.popup.close({
				                widget : serviceInfoListWidget
			                });
			        
			        return false;
			        
		        },
		        /**
				 * 由于产品选择前移,此方法已经没有用了 FIXME
				 * 
				 * @deprecated
				 * @method
				 */
		        onAddProductClick : function(event) {
			        var target = event.currentTarget,
				        controller = this.controller;
			        while (true) {
				        if (target && (target.tagName || "").toUpperCase() == 'TR') {
					        
					        break;
				        }
				        target = target.parentNode;
			        }
			        var roleNumMax = parseInt(target.getAttribute("maxCount")) || 0;
			        count = dojo.query("." + target.getAttribute("viewId")).length, viewId = target
			                .getAttribute("viewId");
			        if (count >= roleNumMax) {
				        var productName = dojo.query("[name=mainProdSel-" + viewId + "]", target)[0].options[0].text;
				        // alert("\u4ea7\u54c1[" + productName +
				        // "]\u6700\u591a\u53ea\u80fd\u9009\u62e9" +
				        // roleNumMax
				        // + "\u4e2a");
				        messageBox.alert({
					                busiCode : "08410100",
					                infoList : [productName, roleNumMax]
				                });
				        return false;
			        } else {
				        
				        // 1: 首先渲染产品基本信息, 2: 然后渲染产品对应的服务信息
				        return this.controller.route("/mainProdOfferWidget/insertMainProductRow", dojo.attr(target,
				                        "uniqueId"), function(newUniqueId) {
					                controller.addServiceCardWidget(newUniqueId);
				                });
			        }
			        
		        },
		        /**
				 * 由于产品选择前移,此方法已经没有用了 FIXME
				 * 
				 * @deprecated
				 * @method
				 */
		        onDelProductClick : function(event) {
			        var target = event.currentTarget,
				        controller = this.controller;
			        while (true) {
				        if (target && (target.tagName || "").toUpperCase() == 'TR') {
					        
					        break;
				        }
				        target = target.parentNode;
			        }
			        // 1: 首先删除产品基本信息, 2: 然后删除注册的服务信息
			        return this.controller.route("/mainProdOfferWidget/removeMainProductRow", dojo.attr(target,
			                        "uniqueId"), function(deletedUniqueId) {
				                controller.removeServiceCardWidget(deletedUniqueId);
			                });
			        
		        },
		        /**
				 * 可选包树点击事件
				 * 
				 * @method
				 */
		        onSubProdOfferTreeNodeClick : function(node) {
			        var data = node.getData(),
				        behavior = this,
				        id = node.getData().id,
				        leaf = node.getData().leaf,
				        isCatalog = node.getData().isCatalog
			        if (leaf && isCatalog != '1') {
				        behavior.showSubProdOffer(id, node);
				        
			        }
		        },
		        
		        /**
				 * 展现可选包购物车中的可选包条目
				 * 
				 * @method
				 */
		        showSubProdOffer : function(id, node) {
			        // 获取可选包销售品的详细信息
			        var domNode = node.domNode;
			        var widgetId = -1;
			        while (true) {
				        var widget = dijit.getEnclosingWidget(domNode);
				        if (widget.declaredClass === "unieap.layout.BorderContainer") {
					        break;
				        }
				        if (widgetId != widget.id) {
					        domNode = widget.domNode;
				        } else {
					        domNode = widget.domNode.parentNode;
				        }
				        widgetId = widget.id;
			        }
			        var subProdOfferCartDataProvider = this.controller.multipleSubProdOfferHandler.subProdOfferOrderProviderMap[domNode.id];
			        var subProdOfferDetail = util.ProdOfferHelper.getProdOfferDetail(id),
				        controller = this.controller,
				        bindingData = subProdOfferCartDataProvider.getSubGridBindingData();
			        chooseNumberObjList = subProdOfferCartDataProvider.doGetChooseNumList(subProdOfferDetail);
			        allProdBasicTrList = chooseNumberObjList.allProdBasicList, chooseNumberList = chooseNumberObjList.chooseNumberList;
			        var data = {
				        prodOfferInfoVO : subProdOfferDetail,
				        allProdBasicTrList : allProdBasicTrList,
				        chooseNumberList : chooseNumberList,
				        subBindingData : bindingData,
				        subProdOfferCartDataProvider : subProdOfferCartDataProvider
			        };
			        if (!(this.controller.checkInstance.checkBeforeChooseSubProdOffer(data))) { return false; }
			        // 如果只有一个使用号码，则直接选择，不让其选择使用号码
			        if (chooseNumberList.length == 1) {
				        if (this.controller.checkInstance.doCheckByRateSpeed(subProdOfferDetail, chooseNumberList[0])) { return; }
				        subProdOfferCartDataProvider.showOneSubProdOffer(subProdOfferDetail, chooseNumberList[0]);
				        var data = {
					        rowIndex : subProdOfferCartDataProvider.getSubGridBindingData().length - 1,
					        subProdOfferCartDataProvider : subProdOfferCartDataProvider
				        };
				        this.controller.route("/checkInstance/doCheckedSubProdOffer", data);
				        // 如果没有使用号码则不传值
			        } else if (allProdBasicTrList == 0) {
				        subProdOfferCartDataProvider.showOneSubProdOffer(subProdOfferDetail, null);
				        var data = {
					        rowIndex : subProdOfferCartDataProvider.getSubGridBindingData().length - 1,
					        subProdOfferCartDataProvider : subProdOfferCartDataProvider
				        };
				        this.controller.route("/checkInstance/doCheckedSubProdOffer", data);
			        } else {
				        var subProdOfferNumWidget = new SubProdOfferNumWidget({
					                "bindingData" : bindingData,
					                "chooseNumberList" : chooseNumberList,
					                "subProdOfferCartDataProvider" : subProdOfferCartDataProvider,
					                "subProdOfferDetail" : subProdOfferDetail
				                });
				        orderaccept.custom.popup.open({
					                widget : {
						                popup : subProdOfferNumWidget,
						                around : event.srcElement
					                }
				                });
			        }
		        },
		        
		        /**
				 * 可选包树，选号页面，确定按钮点击事件
				 * 
				 * @method
				 */
		        onSubProdOfferNumBtnClick : function(event) {
			        var controller = this.controller,
				        toolTipId = event.currentTarget.getAttribute("toolTipId"),
				        toolTipWidget = unieap.byId(toolTipId),
				        toolTipDomNode = dojo.byId(toolTipId),
				        subProdOfferNumBox = dojo.query(".subProdOfferNumBox", toolTipDomNode),
				        subProdOfferDetail = toolTipWidget.subProdOfferDetail,
				        subProdOfferCartDataProvider = toolTipWidget.subProdOfferCartDataProvider,
				        checkedNumList = [];
			        dojo.forEach(subProdOfferNumBox, function(numBox) {
				                if (numBox.checked && !numBox.disabled) {
					                checkedNumList.push({
						                        serviceKind : numBox.getAttribute("serviceKind"),
						                        serviceKindIndex : numBox.getAttribute("serviceKindIndex"),
						                        serviceId : numBox.getAttribute("defaultNumber"),
						                        productId : numBox.getAttribute("productId"),
						                        uniqueId : numBox.getAttribute("uniqueId")
					                        });
				                }
			                });
			        // 订购可选包
			        dojo.forEach(checkedNumList, function(checkedNum) {
				                if (controller.checkInstance.doCheckByRateSpeed(subProdOfferDetail, checkedNum)) { return; }
				                subProdOfferCartDataProvider.showOneSubProdOffer(subProdOfferDetail, checkedNum);
			                })
			        orderaccept.custom.popup.close({
				                widget : toolTipDomNode
			                });
			        toolTipWidget.destroyRecursive();
			        var data = {
				        rowIndex : subProdOfferCartDataProvider.getSubGridBindingData().length - 1,
				        subProdOfferCartDataProvider : subProdOfferCartDataProvider
			        };
			        this.controller.route("/checkInstance/doCheckedSubProdOffer", data);
		        },
		        
		        /**
				 * 管理账号选择确定事件
				 */
		        onManageAccNumBtnClick : function(event) {
			        var controller = this.controller,
				        toolTipId = event.currentTarget.getAttribute("toolTipId"),
				        toolTipWidget = unieap.byId(toolTipId),
				        toolTipDomNode = dojo.byId(toolTipId),
				        manageAccNumBox = dojo.query(".manageAccNumBox", toolTipDomNode),
				        checkedNumList = [];
			        dojo.forEach(manageAccNumBox, function(numBox) {
				                if (numBox.checked) {
					                checkedNumList.push({
						                        serviceKind : numBox.getAttribute("serviceKind"),
						                        serviceKindIndex : numBox.getAttribute("serviceKindIndex"),
						                        serviceId : numBox.getAttribute("defaultNumber"),
						                        productId : numBox.getAttribute("productId"),
						                        uniqueId : numBox.getAttribute("uniqueId"),
						                        prodInstId : numBox.getAttribute("userId")
					                        });
				                }
			                });
			        if (checkedNumList.length > 0) {
				        var itemTp = BusCard.Template
				                .create("[<span name='accNbrResult' "
				                        + "targetUniqueId='#{uniqueId}' value='#{serviceId}' serviceId='#{serviceId}' prodInstId ='#{prodInstId}' serviceKind='#{serviceKind}' serviceKindIndex='#{serviceKindIndex}'>#{serviceId}</span>]");
				        // var _container_ =
				        // document.createElement("span");
				        // _container_.style.styleFloat =
				        // _container_.style.cssFloat =
				        // "right";
				        dojo.byId('manageNbrInfo').innerHTML = itemTp.apply(checkedNumList[0]);
				        // unieap.byId('prodOfferAcceptPane').titleNode.appendChild(_container_);
			        }
			        orderaccept.custom.popup.close({
				                widget : toolTipDomNode
			                });
			        toolTipWidget.destroyRecursive();
		        },
		        
		        /**
				 * 可选包上的销售品详情的点击事件
				 * 
				 * @method
				 */
		        onProdOfferDetailClick : function(event) {
			        var target = event.currentTarget,
				        widgetId = -1;
			        while (true) {
				        var widget = dijit.getEnclosingWidget(target);
				        if (widget.declaredClass === "unieap.layout.BorderContainer") {
					        break;
				        }
				        if (widgetId != widget.id) {
					        target = widget.domNode;
				        } else {
					        target = widget.domNode.parentNode;
				        }
				        widgetId = widget.id;
			        }
			        var provider = this.controller.multipleSubProdOfferHandler.subProdOfferOrderProviderMap[target.id],
				        controller = this.controller,
				        target = event.currentTarget,
				        rowIndex = target.getAttribute("rowIndex"),
				        rowData = dojo.filter(provider.getSubGridBindingData(), function(bindingData) {
					                return bindingData.rowIndex == rowIndex;
				                })[0],
				        prodOfferId = target.getAttribute("value"),
				        tooltipId = target.getAttribute("id") + "_dropdown",
				        tooltip = dojo.query("DIV[id='" + tooltipId + "']")[0],
				        detailBuilder = provider.prodOfferDetailBuilder,
				        detailWidgetList = detailBuilder.prodOfferDetailWidgetList,
				        prodOfferDetailWidget = detailWidgetList["" + rowIndex];
			        if (!prodOfferDetailWidget) {
				        detailBuilder.initProdOfferDetail(rowIndex);
				        prodOfferDetailWidget = detailWidgetList["" + rowIndex];
				        rowData.isOpen = true;
			        };
			        if (tooltip && tooltip.style.display != "none") {
				        orderaccept.custom.popup.close({
					                widget : prodOfferDetailWidget,
					                notHandleData : true
				                });
			        } else {
				        orderaccept.custom.popup.open({
					                widget : {
						                popup : prodOfferDetailWidget,
						                around : event.currentTarget,
						                onCancel : function() {
							                orderaccept.custom.popup.close({
								                        widget : prodOfferDetailWidget,
								                        notHandleData : true
							                        });
						                }
					                }
				                });
			        }
			        // dojo.byId("prodOfferAcceptPane").childNodes[2].childNodes[1].onscroll
			        // = function(){
			        // //获取原控件坐标
			        // var e = target;
			        // orderaccept.custom.popup.open({
			        // widget : {
			        // popup : prodOfferDetailWidget,
			        // around : target,
			        // onCancel : function() {
			        // orderaccept.custom.popup.close({
			        // widget : prodOfferDetailWidget
			        // });
			        // }
			        // }
			        // });
			        // var absTop = e.offsetTop+e.height;
			        // var absLeft = e.offsetLeft;
			        // var scrTop = e.scrollTop;
			        // var scrLeft = e.scrollLeft;
			        // while(e = e.offsetParent){
			        // absTop += e.offsetTop;
			        // absLeft += e.offsetLeft;
			        // scrTop += e.scrollTop;
			        // scrLeft += e.scrollLeft;
			        // }
			        // //将坐标设置给新建的控件，宽度为自适应宽度
			        // with (tooltip.style){
			        // position = "absolute";
			        // top = absTop-scrTop + "px";
			        // left = absLeft-scrLeft + "px";
			        // }
			        // };
		        },
		        onSubProdOfferCheckBoxClick : function(event) {
			        var behavior = this;
			        var domNode = event.currentTarget
			        var widgetId = -1;
			        // 可选包选择产生变化后，提示用户针对促销政策进行刷新
			        behavior.warningRefreshPromotion({
				                changeObj : "subProdOffer"
			                });
			        while (true) {
				        var widget = dijit.getEnclosingWidget(domNode);
				        if (widget.declaredClass === "unieap.layout.BorderContainer") {
					        break;
				        }
				        if (widgetId != widget.id) {
					        domNode = widget.domNode;
				        } else {
					        domNode = widget.domNode.parentNode;
				        }
				        widgetId = widget.id;
			        }
			        var subProdOfferCartDataProvider = this.controller.multipleSubProdOfferHandler.subProdOfferOrderProviderMap[domNode.id];
			        var target = event.currentTarget,
				        rowIndex = target.getAttribute("rowIndex"),
				        bindingData = subProdOfferCartDataProvider.getSubGridBindingData(),
				        currentBindData = dojo.filter(bindingData, function(data) {
					                return data.rowIndex == rowIndex;
				                })[0];
				    if (target.checked === false) {
				    	if (this.controller.checkInstance.checkIfPortSpeedReserve(currentBindData)) {
					        target.checked = true;
					        return;
				        }
				    }
			        // 增加升速销售品的检测
			        if (target.checked === true) {
				        if (this.controller.checkInstance.doCheckByRateSpeed(currentBindData.subProdOfferInfo,
				                currentBindData.showData.chooseNumberObj)) {
					        target.checked = false;
					        return;
				        }
			        }
			        if (target.checked === false) {
				        this.controller.route("/checkInstance/doUnCheckedSubProdOffer", {
					                rowIndex : rowIndex,
					                subProdOfferCartDataProvider : subProdOfferCartDataProvider
				                });
			        } else {
				        
				        this.controller.route("/checkInstance/doCheckedSubProdOffer", {
					                rowIndex : rowIndex,
					                subProdOfferCartDataProvider : subProdOfferCartDataProvider
				                });
			        }
			        subProdOfferCartDataProvider.dealRaiseXDSLSpeed(currentBindData.subProdOfferInfo,
			                currentBindData.showData.chooseNumberObj, target.checked, currentBindData);
		        },
		        
		        /**
				 * 删除可选包销售品视图
				 */
		        onSubProdOfferDelViewClick : function(event) {
			        var behavior = this;
			        var domNode = event.currentTarget
			        var widgetId = -1;
			        
			        while (true) {
				        var widget = dijit.getEnclosingWidget(domNode);
				        if (widget.declaredClass === "unieap.layout.BorderContainer") {
					        break;
				        }
				        if (widgetId != widget.id) {
					        domNode = widget.domNode;
				        } else {
					        domNode = widget.domNode.parentNode;
				        }
				        widgetId = widget.id;
			        }
			        var subProdOfferCartDataProvider = this.controller.multipleSubProdOfferHandler.subProdOfferOrderProviderMap[domNode.id];
			        var target = event.currentTarget,
				        rowIndex = target.getAttribute("rowIndex"),
				        bindingData = subProdOfferCartDataProvider.getSubGridBindingData(),
				        currentBindData = dojo.filter(bindingData, function(data) {
					                return data.rowIndex == rowIndex;
				                })[0];
			        // 有实例信息，则不处理
			        if (currentBindData.prodOfferInst != null) { return; }
			        // 必选的不允许删除
			        if (!!currentBindData.showData.selectAble) { return; }
			        // 可选包选择产生变化后，提示用户针对促销政策进行刷新
			        behavior.warningRefreshPromotion({
				                changeObj : "subProdOffer"
			                });
			        // 先设置成取消的
			        var subProdOfferOrderGrid = subProdOfferCartDataProvider.subProdOfferOrderGrid.domNode;
			        dojo.query(".subProdOfferDetail-" + rowIndex, subProdOfferOrderGrid)[0].childNodes[0].checked = false;
			        // 设置一个删除视图的标识
			        $ac$.set('currentOperDelView', true);
			        this.controller.route("/checkInstance/doUnCheckedSubProdOffer", {
				                rowIndex : rowIndex,
				                subProdOfferCartDataProvider : subProdOfferCartDataProvider
			                });
			        subProdOfferCartDataProvider.dealRaiseXDSLSpeed(currentBindData.subProdOfferInfo,
			                currentBindData.showData.chooseNumberObj, target.checked, currentBindData);
		        },
		        
		        /**
				 * 当接入类产品/可选包选择发生变化后提示用户重新刷新促销政策目录树和促销政策购物车
				 */
		        warningRefreshPromotion : function(changeInfo) {
		        	//判断促销政策的组件是否存在，不存在则不处理
		        	if(!dojo.byId("refresh-promotion-href")){
		        		return ;
		        	}
			        var warnInfo = this;
			        // var refreshWidget = null;
			        var warningMessage = null;
			        if (changeInfo && changeInfo.changeObj == "subProdOffer") {// 可选包选择发生变化
				        if (warnInfo.promotionRefreshWidget) {
					        warnInfo.promotionRefreshWidget.destroyRecursive();
				        }
				        warnInfo.promotionRefreshWidget = new orderaccept.custom.TooltipDialog({
					                id : "subProdChangeRefresh",
					                noCloseBtn : true
				                });
				        warnInfo.refreshWidget = warnInfo.promotionRefreshWidget;
				        warningMessage = "<span style='color:red'>\u53ef\u9009\u5305\u9009\u62e9\u53d1\u751f\u53d8\u5316\uff0c\u8bf7\u91cd\u65b0\u5237\u65b0\u4fc3\u9500\u653f\u7b56\u76ee\u5f55\u6811\u53ca\u8d2d\u7269\u8f66\u4fe1\u606f</span>";
			        } else {// 接入类产品选择发生变化
				        if (warnInfo.mainProductChangeRefreshWidget) {
					        warnInfo.mainProductChangeRefreshWidget.destroyRecursive();
				        }
				        warnInfo.mainProductChangeRefreshWidget = new orderaccept.custom.TooltipDialog({
					                id : "mainProductChangeRefresh",
					                noCloseBtn : true
				                });
				        warnInfo.refreshWidget = warnInfo.mainProductChangeRefreshWidget;
				        warningMessage = "<span style='color:red'>\u63a5\u5165\u7c7b\u4ea7\u54c1\u9009\u62e9\u53d1\u751f\u53d8\u5316\uff0c\u8bf7\u91cd\u65b0\u5237\u65b0\u4fc3\u9500\u653f\u7b56\u76ee\u5f55\u6811\u53ca\u8d2d\u7269\u8f66\u4fe1\u606f</span>";
			        }
			        dojo.place(warningMessage, warnInfo.refreshWidget.containerNode, "first");
			        var showTarget = dojo.byId("refresh-promotion-href");
			        orderaccept.custom.popup.open({
				                widget : {
					                popup : warnInfo.refreshWidget,
					                around : showTarget
				                }
			                });
			        // 设置提示信息展示自动消失时间
			        // window.setTimeout(function() {
			        // orderaccept.custom.popup.close({
			        // widget : refreshWidget,
			        // notHandleData : true
			        // });
			        // }, 2000);
			        // 设置全局变量
			        $ac$.set("refreshPromotionWidget", warnInfo.refreshWidget);
		        },
		        
		        onSubProdOfferNameMouseOver : function(event) {
			        var domNode = event.currentTarget
			        var widgetId = -1;
			        while (true) {
				        var widget = dijit.getEnclosingWidget(domNode);
				        if (widget.declaredClass === "unieap.layout.BorderContainer") {
					        break;
				        }
				        if (widgetId != widget.id) {
					        domNode = widget.domNode;
				        } else {
					        domNode = widget.domNode.parentNode;
				        }
				        widgetId = widget.id;
			        }
			        var subProdOfferCartDataProvider = this.controller.multipleSubProdOfferHandler.subProdOfferOrderProviderMap[domNode.id];
			        var target = event.currentTarget,
				        rowIndex = target.getAttribute("rowIndex"),
				        bindingData = subProdOfferCartDataProvider.getAllSubGridData(),
				        subProdOfferInfo = bindingData[rowIndex].subProdOfferInfo,
				        prodOfferInfoTipsWidget = unieap.byId("prodOfferInfoTips"),
				        prodOfferName = subProdOfferInfo.prodOfferName,
				        desc = subProdOfferInfo.prodOfferDesc,
				        effDate = subProdOfferInfo.effDate,
				        expDate = subProdOfferInfo.expDate;
				    if(!!subProdOfferInfo.prodOfferGroupVO
				    	&&!!subProdOfferInfo.prodOfferGroupVO.groupName
				    	&&subProdOfferInfo.prodOfferGroupVO.groupName!=""){
				    	prodOfferName += "【"+subProdOfferInfo.prodOfferGroupVO.groupName+"】" ;
				    }
			        dojo.query("[id='prodoffer-name']", prodOfferInfoTipsWidget.containerNode)[0].innerHTML = prodOfferName;
			        dojo.query("[id='prodoffer-desc']", prodOfferInfoTipsWidget.containerNode)[0].innerHTML = desc;
			        dojo.query("[id='prodoffer-effDate']", prodOfferInfoTipsWidget.containerNode)[0].innerHTML = effDate;
			        dojo.query("[id='prodoffer-expDate']", prodOfferInfoTipsWidget.containerNode)[0].innerHTML = expDate;
			        unieap.byId("prodOfferInfoTips").domNode.className = 'dijitTooltipDialog dijitTooltipABLeft dijitTooltipBelow';
			        orderaccept.custom.popup.open({
				                widget : {
					                popup : prodOfferInfoTipsWidget,
					                around : event.currentTarget
				                }
			                });
		        },
		        /**
				 * 可选包上的销售品详情的点击事件
				 * 
				 * @method
				 */
		        onProdOfferDetailBtnClick : function(event) {
			        var prodOfferDetailWidget = util.DomHelper.getParentWidget(event.currentTarget,
			                "orderaccept.custom.TooltipDialog");
			        orderaccept.custom.popup.close({
				                widget : prodOfferDetailWidget,
				                notHandleData : true
			                });
		        },
		        onBatchProdOfferDetailBtnClick : function(event) {
			        var prodOfferDetailWidget = util.DomHelper.getParentWidget(event.currentTarget,
			                "orderaccept.custom.TooltipDialog");
			        orderaccept.custom.popup.close({
				                widget : prodOfferDetailWidget,
				                notHandleData : true
			                });
		        },
		        // 亲情号码点击事件
		        onFamilyNumberClick : function(event) {
			        var target = event.currentTarget,
				        parentNode = target.parentNode
			        familyNum = (dojo.query("[id=familyNumber]", parentNode) || [])[0];
			        return util.DomHelper.getParentWidget(target, "orderaccept.custom.TooltipDialog").builder
			                .onFamilyNumberClick(familyNum);
		        },
		        // 亲情号码点击事件
		        onFamilyUnitClick : function(event) {
			        var target = event.currentTarget,
				        parentNode = target.parentNode
			        favourUnit = (dojo.query("[id=favourUnit]", parentNode) || [])[0];
			        return util.DomHelper.getParentWidget(target, "orderaccept.custom.TooltipDialog").builder
			                .onFavourUnitClick(favourUnit);
		        },
		        // 亲情号码复选框点击事件
		        onFamilyNumberChClick : function(event) {
			        var controller = this.controller,
				        target = event.currentTarget,
				        rowIndex = target.getAttribute("rowIndex"),
				        prodOfferDetailWidget = util.DomHelper.getParentWidget(event.currentTarget,
				                "orderaccept.custom.TooltipDialog"),
				        favourNumber = target.value,
				        favourBuilder = prodOfferDetailWidget.favourBuilder,
				        favourItemList = favourBuilder.favourItemList,
				        uncheckedFavourList = favourBuilder.uncheckedFavourList,
				        favourItem = dojo.filter(favourItemList, function(favourItem) {
					                return favourItem.getFavourNumber() == favourNumber;
				                })[0],
				        uncheckedFavourItem = uncheckedFavourList[favourNumber];
			        (favourItem || uncheckedFavourItem).handleFavourNumber();
		        },
		        refreshSubProdOfferCart : function(event) {
			        var target = event.currentTarget,
				        flag = false;
			        if (target.checked === false) {
				        flag = false;
			        } else {
				        flag = true;
			        }
			        while (true) {
				        if (target && (target.tagName || "").toUpperCase() == 'TR') {
					        
					        break;
				        }
				        target = target.parentNode;
			        }
			        var subProviderMap = this.controller.multipleSubProdOfferHandler.subProdOfferOrderProviderMap;
			        for (var p in subProviderMap) {
				        subProviderMap[p].refreshSubProdOfferCart(target, flag);
			        }
			        
			        this.warningRefreshPromotion({
				                changeObj : "mainProduct"
			                });
		        },
		        /**
				 * 选择担保客户信息
				 */
		        onAssureCustSelectClick : function(event) {
			        var target = event.currentTarget,
				        rowIndex = target.getAttribute("rowIndex"),
				        subRowIndex = target.getAttribute("subRowIndex"),
				        assureBuilder = util.DomHelper.getParentWidget(event.currentTarget,
				                "orderaccept.custom.TooltipDialog").prodOfferAssureBuilder;
			        assureBuilder.onAssureCustSelectClick(rowIndex, subRowIndex);
		        },
		        /**
				 * 选择担保帐户信息
				 */
		        onAssureAccountSelectClick : function(event) {
			        var target = event.currentTarget,
				        rowIndex = target.getAttribute("rowIndex"),
				        subRowIndex = target.getAttribute("subRowIndex"),
				        assureBuilder = util.DomHelper.getParentWidget(event.currentTarget,
				                "orderaccept.custom.TooltipDialog").prodOfferAssureBuilder;
			        assureBuilder.onAssureAccountSelectClick(rowIndex, subRowIndex);
		        },
		        /**
				 * 选择担保帐户信息
				 */
		        onAssureProductSelectClick : function(event) {
			        var target = event.currentTarget,
				        rowIndex = target.getAttribute("rowIndex"),
				        subRowIndex = target.getAttribute("subRowIndex"),
				        assureBuilder = util.DomHelper.getParentWidget(event.currentTarget,
				                "orderaccept.custom.TooltipDialog").prodOfferAssureBuilder;
			        assureBuilder.onAssureProductSelectClick(rowIndex, subRowIndex);
		        },
		        /**
				 * 销售品属性担保信息确认
				 */
		        onAssureCommitClick : function(event) {
			        var target = event.currentTarget,
				        rowIndex = target.getAttribute("rowIndex"),
				        subRowIndex = target.getAttribute("subRowIndex"),
				        assureBuilder = util.DomHelper.getParentWidget(event.currentTarget,
				                "orderaccept.custom.TooltipDialog").prodOfferAssureBuilder;
			        assureBuilder.onAssureCommitClick(rowIndex, subRowIndex);
		        },
		        /**
				 * 选择销售品担保信息
				 */
		        showAssureQueryView : function(event) {
			        var target = event.currentTarget,
				        rowIndex = target.getAttribute("rowIndex"),
				        subRowIndex = target.getAttribute("subRowIndex"),
				        assureMethodCD = target.getAttribute("assureMethodCD"),
				        assureBuilder = util.DomHelper.getParentWidget(event.currentTarget,
				                "orderaccept.custom.TooltipDialog").prodOfferAssureBuilder;
			        assureBuilder.showAssureQueryView(rowIndex, subRowIndex, assureMethodCD);
		        },
		        /**
				 * 担保信息查询
				 */
		        onAssureQueryClick : function(event) {
			        var target = event.currentTarget,
				        subRowIndex = target.getAttribute("subRowIndex"),
				        assureBuilder = util.DomHelper.getParentWidget(event.currentTarget,
				                "orderaccept.custom.TooltipDialog").prodOfferAssureBuilder;
			        assureBuilder.assureQuery(subRowIndex);
		        },
		        
		        /**
				 * 产品属性中选择产品
				 */
		        onSubProdSelectClick : function(event) {
			        var target = event.currentTarget,
				        id = target.getAttribute("id"),
				        tempArr = id.split("-"),
				        productId = tempArr[2],
				        rowIndex = tempArr[3],
				        productItemList = util.DomHelper.getParentWidget(event.currentTarget,
				                "orderaccept.custom.TooltipDialog").productItemList,
				        productItem = dojo.filter(productItemList, function(prodItem) {
					                return productId == prodItem.productInfo.productId;
				                })[0];
			        var productAttrCard = productItem.productAttrCard;
			        productItem.checkedStatus = target.checked;
			        if (!!productAttrCard) {
				        productAttrCard.domNode.style.display = target.checked ? "block" : "none";
			        }
		        },
		        /**
				 * 促销政策树上销售品点击事件
				 */
		        onPromotionTreeNodeClick : function(node) {
			        var data = node.getData(),
				        behavior = this,
				        id = node.getData().id,
				        leaf = node.getData().leaf,
				        isCatalog = node.getData().isCatalog
			        if (leaf) {
				        behavior.showSalesPromotion(id);
			        }
		        },
		        
		        /**
				 * 展示选中的促销政策信息
				 */
		        showSalesPromotion : function(id) {
			        // 获取促销政策详情信息
			        var salePromotionDetail = util.ProdOfferHelper.getSalesPromotionDetail(id);
			        // 获取已订购的促销政策列表
			        var checkedPromotionList = this.controller.getCheckedPromotionList();
			        // 获取已选择促销政策作用销售品的详细信息
			        var targetProdOfferDetailList = [];
			        var targetProdOfferList = dojo.filter(salePromotionDetail.promotionTargetObjectList || [],
			                function(oneTargetObj) {
				                return oneTargetObj.targetObjectType == 1;// 作用对象为销售品
			                });
			        dojo.forEach(targetProdOfferList || [], function(oneTargetObject) {
				                var targetProdOfferId = oneTargetObject.targetObjectId;
				                var targetProdofferDetail = util.ProdOfferHelper.getProdOfferDetail(targetProdOfferId);// 获取作用销售品详细信息
				                if (targetProdofferDetail) {
					                targetProdOfferDetailList.push(targetProdofferDetail);
				                }
			                });
			        var bindingData = this.controller.salesPromotionOrderGrid.ds.getRawData();
			        var checkData = {
				        currentPromotionId : id,
				        currentPromotionDetail : salePromotionDetail,
				        checkedPromotionList : checkedPromotionList,
				        bindingData : bindingData,
				        targetProdOfferDetailList : targetProdOfferDetailList,
				        salesPromotionOrderGrid : this.controller.salesPromotionOrderGrid
			        };
			        if (!this.controller.checkInstance.doCheckBeforeShowPromotionDetail(checkData)) {
				        // 展示所查询的促销政策详细信息
				        this.controller.showSalesPromotionDetail(salePromotionDetail);
			        }
		        },
		        
		        /**
				 * 促销收藏
				 */
		        onCollectPromotionClick : function(event) {
			        var prodOfferValue = event.currentTarget.getAttribute("value");
			        var context = this;
			        var collectTips = unieap.byId("collectTips");
			        if (prodOfferValue) {
				        // 销售品id~销售品名称
				        var valueArray = prodOfferValue.split("~");
				        var prodOfferId = valueArray[0];
				        var prodOfferName = valueArray[1];
				        var prodOfferType = valueArray[2];
				        var mainProdOfferId = valueArray[3];
				        var operFlag = this.controller.checkInstance.checkCollectPromotion(prodOfferId, prodOfferType);
				        if (operFlag) {
					        dojo.query("[id='tip-info']", collectTips.containerNode)[0].innerHTML = "促销已被收藏,不能重复收藏！";
					        orderaccept.custom.popup.open({
						                widget : {
							                popup : collectTips,
							                around : event.currentTarget
						                }
					                });
					        window.setTimeout(function() {
						                context.onCollectTipsClose();
					                }, 1500);
					        return;
				        }
				        var param = "&prodOfferId=" + prodOfferId + "&prodOfferName="
				                + BusCard.native2ascii(prodOfferName) + "&prodOfferType=" + prodOfferType
				                + "&mainProdOfferId=" + mainProdOfferId;
				        var result = util.ServiceFactory
				                .getService("url:prodOfferSaleAjaxAction.do?method=savePersonalCollectProdOffer"
				                        + param);
				        if (result) {
					        var saveFlag = result.split("~")[0];
					        var message = result.split("~")[1];
					        if (saveFlag == "success") {
						        dojo.query("[id='tip-info']", collectTips.containerNode)[0].innerHTML = "促销政策收藏成功！";
						        
					        } else {
						        dojo.query("[id='tip-info']", collectTips.containerNode)[0].innerHTML = "促销政策收藏失败,原因为:"
						                + message;
					        }
					        orderaccept.custom.popup.open({
						                widget : {
							                popup : collectTips,
							                around : event.currentTarget
						                }
					                });
					        window.setTimeout(function() {
						                context.onCollectTipsClose();
					                }, 1500);
				        }
			        }
		        },
		        
		        /**
				 * 取消促销收藏
				 */
		        onCancelCollectPromotionClick : function(event) {
			        var prodOfferValue = event.currentTarget.getAttribute("value"),
				        collectTips = unieap.byId("collectTips"),
				        context = this;
			        if (prodOfferValue) {
				        // 销售品id~销售品名称
				        var valueArray = prodOfferValue.split("~");
				        var prodOfferId = valueArray[0];
				        var prodOfferType = valueArray[1];
				        var mainProdOfferId = valueArray[2];
			        }
			        var operFlag = this.controller.checkInstance.checkCollectPromotion(prodOfferId, prodOfferType);
			        if (!operFlag) {
				        dojo.query("[id='tip-info']", collectTips.containerNode)[0].innerHTML = "未收藏,不能进行删除操作！";
				        orderaccept.custom.popup.open({
					                widget : {
						                popup : collectTips,
						                around : event.currentTarget
					                }
				                });
				        window.setTimeout(function() {
					                context.onCollectTipsClose();
				                }, 1500);
				        return;
			        }
			        var param = "&prodOfferId=" + prodOfferId;
			        var result = util.ServiceFactory
			                .getService("url:prodOfferSaleAjaxAction.do?method=deleteCollectProdOffer" + param);
			        if (result) {
				        if (parseInt(result) > 0) {
					        dojo.query("[id='tip-info']", collectTips.containerNode)[0].innerHTML = "已收藏销售品删除成功！";
					        orderaccept.custom.popup.open({
						                widget : {
							                popup : collectTips,
							                around : event.currentTarget
						                }
					                });
					        window.setTimeout(function() {
						                context.onCollectTipsClose();
					                }, 1500);
				        }
			        }
		        },
		        
		        /**
				 * 保存订单触发的动作
				 * 
				 * @method
				 */
		        onSaveOrder : function(event) {
			        var _behavior = this.controller;
			        event.preventDefault();
			        // for focus purpose ,expand all panes
			        this.controller.expandAllPanes();
			        this.controller.waitingBarInstance.showMe();
			        // add by liuzhongwei 黑莓业务流程大客户集团的检测
			        var checkBlackberry = dojo.global.$appContext$.get("checkBlackberry");
			        var ifBigGroup = true;
			        if (!!checkBlackberry && checkBlackberry == "99") {
				        
				        var param = {
					        custId : $ac$.requestParam.customerData.custId
				        };
				        var groupInfoVO = BusCard.$remote("groupInfoDAO").queryByCustId(param);
				        if (groupInfoVO != "null") {
					        var cityCode = dojo.global.$appContext$.get("requestParam").customerData.cityCode;
					        var groupId = groupInfoVO.groupId;
					        ifBigGroup = this.controller.route("/checkInstance/doCheckIfBigGroup", {
						                cityCode : cityCode,
						                groupId : groupId
					                });
				        }
			        }
			        if (!ifBigGroup) {
				        if ($("groupId") && $("groupId").value == "") {
					        messageBox.alert({
						        message : "\u60a8\u8ba2\u8d2d\u7684\u662f\u9ed1\u8393\u4e1a\u52a1\uff0c\u8bf7\u9009\u62e9\u4e00\u4e2a\u5927\u5ba2\u6237\u96c6\u56e2"
					        });
					        return false;
				        }
			        }
			        var _f = function() {
				        var orderData = this.controller.route("/dataBuilder/process");
				        if (!orderData) {
					        this.controller.waitingBarInstance.hideMe();
					        return false;
				        } else {
					        var handleOrderData = this.controller.route("/specDataBuilder/process", orderData, null);
					        var submitResult = BusCard.doPost(BusCard.path.contextPath
					                        + "/orderAcceptAction.do?method=doSaveProdOfferAcceptInfo",
					                handleOrderData, true, function(submitResult) {
						                _behavior.waitingBarInstance.hideMe();
						                if (submitResult && submitResult.flag == -1) {
							                // alert("\u4fdd\u5b58\u8ba2\u5355\u5931\u8d25:"
											// +
											// submitResult.message);
							                messageBox.alert({
								                        message : submitResult.message
							                        });
							                return false;
						                } else if (submitResult && submitResult.batchRegNo) {
							                dojo.global.$appContext$.set("_batchRegNo", submitResult.batchRegNo);
							                dojo.global.$appContext$.set("_productId", submitResult.productId);
							                dojo.global.$appContext$
							                        .set("_serviceOfferId", submitResult.serviceOfferId);
							                dojo.global.$appContext$.set("_serviceKind", submitResult.serviceKind);
							                _behavior.showBatchNewAccept();
							                // 暂时先注释掉，稍后放开
							                _behavior.resetShoppingCartCount();
						                } else {
							                // alert("\u8ba2\u5355\u4fdd\u5b58\u6210\u529f,\u8ba2\u5355\u7f16\u53f7\u4e3a:\n"
							                // +
							                // submitResult.message);
							                var custOrderId = submitResult.message;
							                dojo.global.$appContext$.set("_currentCustOrderId", custOrderId);
							                dojo.global.$appContext$.set("_hasSaveOrder", true);
							                _behavior.showOrderList(submitResult.message);
							                // 暂时先注释掉，稍后放开
							                _behavior.resetShoppingCartCount();
						                }
						                changeStep(4);
					                });
				        }
			        };
			        setTimeout(function(self) {
				                return function() {
					                return _f.apply(self, arguments);
				                };
			                }(this), 100);
			        
		        },
		        
		        _buildCompleteOrderParam : function() {
			        var custOrderId = dojo.global.$appContext$.get("_currentCustOrderId");
			        return {
				        custOrderId : custOrderId
			        };
		        },
		        onCompleteOrder : function(event) {
			        var _behavior = this;
			        var custOrderId = dojo.global.$appContext$.get("_currentCustOrderId");
			        prodOfferAcceptLoader.waitingBarInstance.showMe();
			        var resultJsonStr = BusCard.util.doPost(BusCard.path.contextPath
			                        + "/orderDetailAction.do?method=doCompleteOrder", this._buildCompleteOrderParam(),
			                true, function(resultJsonStr) {
				                var result = resultJsonStr;
				                if (result.flag < 0) {
					                // alert(result.message);
				                	prodOfferAcceptLoader.waitingBarInstance.hideMe();
					                messageBox.alert({
						                        busiCode : "08410099",
						                        infoList : [result.message]
					                        });
					                return false;
				                }
				                prodOfferAcceptLoader.waitingBarInstance.hideMe();
				                // alert("\u63d0\u4ea4\u6210\u529f\uff0c\u5ba2\u6237\u8ba2\u5355\u7f16\u53f7\u4e3a:"
				                // + result.message);
				                messageBox.alert({
					                busiCode : "08410102",
					                infoList : [result.message],
					                onComplete : function() {
						                // 更新订单暂存表中的数据
						                var custOrderparam = "&custOrderId=" + custOrderId;
						                var resultStr = util.ServiceFactory
						                        .getService("url:orderQueryAction.do?method=shoppingCartSubmit"
						                                + custOrderparam);
						                if (resultStr.flag < 0) {
							                alert(resultStr.message);
							                return false;
						                }
						                // 暂时先注释掉，稍后放开
						                _behavior.controller.resetShoppingCartCount();
						                if (_behavior.controller
						                        .route("/orderShowLoader/budgetComponent/computeShouldPayValue") == 0) {
							                _behavior.controller.setCustOrderId2CustRecognitionPage("");
							                if($ac$.get("orderChangeFlag") != 1){
							                	messageBox.alert({
								                        busiCode : "08410103",
								                        onComplete : function() {
									                        if (!!unieap.getDialog()) {
										                        unieap.getDialog().close();
									                        } else {
										                        window.close();
									                        }
								                        }
							                        });
							                }
							                dojo.query(".continueAcceptClass",
							                        _behavior.controller.functionNavigatorWidget.domNode)[0].disabled = true;
							                dojo.query(".commitOrderClass",
							                        _behavior.controller.functionNavigatorWidget.domNode)[0].disabled = true;
							                return false;
						                } else {
							                var checkFeeResult = util.ServiceFactory
							                        .getService("url:budgetComponentAction.do?method=checkAllFee&custOrderId="
							                                + custOrderId);
							                if (checkFeeResult.flag < 0) {
								                alert(checkFeeResult.message);
								                return false;
							                }
							                if (checkFeeResult.flag == 0) {
								                _behavior.controller.setCustOrderId2CustRecognitionPage("");
								                messageBox.alert({
									                busiCode : "08510183",
									                infoList : ["\u8d39\u7528\u5df2\u6e05\u5c06\u5173\u95ed\u5f53\u524d\u7a97\u53e3!"],
									                onComplete : function() {
										                if (!!unieap.getDialog()) {
											                unieap.getDialog().close();
										                } else {
											                window.close();
										                }
									                }
								                });
								                dojo.query(".continueAcceptClass",
								                        _behavior.controller.functionNavigatorWidget.domNode)[0].disabled = true;
								                dojo.query(".commitOrderClass",
								                        _behavior.controller.functionNavigatorWidget.domNode)[0].disabled = true;
								                return false;
							                }
						                }
						                dojo
						                        .query(".chargeClass",
						                                _behavior.controller.functionNavigatorWidget.domNode)[0].disabled = false;
						                dojo.query(".continueAcceptClass",
						                        _behavior.controller.functionNavigatorWidget.domNode)[0].disabled = true;
						                dojo.query(".commitOrderClass",
						                        _behavior.controller.functionNavigatorWidget.domNode)[0].disabled = true;
						                dojo.query(".toOrderDetailClass",
						                        _behavior.controller.functionNavigatorWidget.domNode)[0].disabled = true;
					                }
				                });
			                }, null, true);
			        
		        },
		        onCoutinueOrder : function(event) {
			        event.preventDefault();
			        var _hasSaveOrder = dojo.global.$appContext$.get("_hasSaveOrder");
			        if (!_hasSaveOrder) {
				        var f = confirm("\u8ba2\u5355\u5c1a\u672a\u6ca1\u6709\u4fdd\u5b58,\u662f\u5426\u9700\u8981\u5148\u4fdd\u5b58\u8ba2\u5355?");
				        if (f) {
					        return;
				        } else {
					        this.controller.destroy();
					        if (window.opener) {
						        if (!!unieap.getDialog()) {
							        unieap.getDialog().close();
						        } else {
							        window.close();
						        }
					        }
					        
				        }
			        } else {
				        var custOrderId = dojo.global.$appContext$.get("_currentCustOrderId");
				        this.controller.setCustOrderId2CustRecognitionPage(custOrderId + "");
				        if (!!unieap.getDialog()) {
					        unieap.getDialog().close();
				        } else {
					        window.close();
				        }
			        }
			        
		        },
		        
		        onPromotionDetailCheckClick : function(event) {
			        var target = event.currentTarget,
				        rowIndex = target.getAttribute("rowIndex"),
				        data = {
					        rowIndex : rowIndex
				        };
			        var bindingData = this.controller.salesPromotionOrderGrid.ds.getRawData();
			        var currentBindingData = dojo.filter(bindingData || [], function(oneBindingData) {
				                return oneBindingData.rowIndex == rowIndex;
			                })[0];
			        // 添加同一分组选择促销政策数量的限制
			        var flag = false;
			        if (target.checked) {
				        flag = this.controller.checkInstance.doCheckPromotionGroupCount(bindingData,
				                this.controller.salesPromotionOrderGrid, currentBindingData.showData.promotionInfo);
			        }
			        if (!flag) {
				        this.controller.changePromotionCheckedStatus(data);
				        // 升降速处理
				        this.controller.dealPromotionRaiseSpeedInfo(currentBindingData.showData.promotionInfo,
				                currentBindingData, target.checked);
			        } else {
				        target.checked = false;
			        }
			        
			        if(!target.checked){//取消选中的政策
			        	var promotionDetailBuilder = this.controller.promotionDetailBuilder;
			        	if(!!promotionDetailBuilder){
			        		var prodOfferDetailWidgetList = promotionDetailBuilder.prodOfferDetailWidgetList;
			        		var promotionDetailWidget = prodOfferDetailWidgetList[""+rowIndex];
			        		if(!!promotionDetailWidget){
			        			var resourceCardList = promotionDetailWidget.resRelaBuilder.resourceCardList;
			        			if(resourceCardList.length>0){
			        				var resourceCardObj = resourceCardList[0];
			        				if(!!resourceCardObj){
			        					var busCardInstance = resourceCardObj.busCardInstance;
			        					if(busCardInstance.$("deviceNo")){
			        						busCardInstance.$("deviceNo").value = "";
			        						busCardInstance.$("deviceNo").onblur();
			        					}
			        				}
			        			}
			        		}
			        	}
			        }
		        },
		        
		        onPromotionTargetNumChgClick : function(event) {
			        var target = event.currentTarget,
				        rowIndex = target.getAttribute("rowIndex");
			        var bindingData = this.controller.salesPromotionOrderGrid.ds.getRawData();
			        var currentBindingData = dojo.filter(bindingData || [], function(oneBindingData) {
				                return oneBindingData.rowIndex == rowIndex;
			                })[0];
			        this.controller.dealPromotionRaiseSpeedInfo(currentBindingData.showData.promotionInfo,
			                currentBindingData, target.checked);
		        },
		        
		        /**
				 * 费用修改
				 */
		        onFeeModifyClick : function(event) {
			        var widget = null;
			        var domNode = event.currentTarget;
			        while (true) {
				        var widget = dijit.getEnclosingWidget(domNode);
				        if (widget.declaredClass === "orderaccept.prodofferaccept.widget.budget.BudgetWidget") {
					        break;
				        }
				        domNode = widget.domNode;
			        }
			        dojo.query(".fee-confirm-class", widget.domNode)[0].disabled = false;
			        widget.unlock(widget.gridContainer);
			        
		        },
		        /**
				 * 费用确认
				 */
		        onFeeConfirmClick : function(event) {
			        var widget = null;
			        var domNode = event.currentTarget;
			        while (true) {
				        var widget = dijit.getEnclosingWidget(domNode);
				        if (widget.declaredClass === "orderaccept.prodofferaccept.widget.budget.BudgetWidget") {
					        break;
				        }
				        domNode = widget.domNode;
			        }
			        var budgetData = widget.getFeeConfirmData();
			        var resultJsonStr = BusCard.util.doPost(BusCard.path.contextPath
			                        + "/budgetComponentAction.do?method=doFeeConfirm", budgetData, false, null, null,
			                true);
			        var result = resultJsonStr;
			        if (result.flag < 0) {
				        // alert(result.message);
				        messageBox.alert({
					                busiCode : "08410099",
					                infoList : [result.message]
				                });
				        return false;
			        }
			        // 更新合计
			        /*
			        var totalAmount = 0;
			        for (var i = 0, j = budgetData.budgetParamList.length; i < j; i++) {
				        var actualAmount = budgetData.budgetParamList[i].actualAmount;
				        totalAmount += actualAmount;
			        }
			        dojo.query(".totalAmount-class", widget.domNode)[0].innerHTML = "合计："
			                + widget.fmoney(totalAmount, 2) + "元";
			                */
			        // 将提交订单按钮置亮
			        dojo.query(".commitOrderClass", this.controller.functionNavigatorWidget.domNode)[0].disabled = false;
			        var cmtBtns = dojo.query(".commitOrderClass", this.controller.functionNavigatorWidget.domNode);
			        if(!!cmtBtns && !!cmtBtns[3]){
			        	var batchCmtBtn = cmtBtns[3];
			        	batchCmtBtn.disabled = false;
			        }
			        // 点击之后置灰费用确认按钮
			        dojo.query(".fee-confirm-class", widget.domNode)[0].disabled = true;
			        // 点击之后置灰费用调整按钮
			        dojo.query(".fee-modify-class", widget.domNode)[0].disabled = true;
			        // 更新费用不可修改
			        widget.lock();
		        },
		        
		        /**
				 * 促销政策详细信息点击事件
				 */
		        onPromotionDetailClick : function(event) {
			        var controller = this.controller,
				        rowIndex = event.currentTarget.getAttribute("rowIndex"),
				        tooltipId = event.currentTarget.getAttribute("id") + "_dropdown",
				        tooltip = dojo.query("DIV[id='" + tooltipId + "']")[0],
				        promotionId = event.currentTarget.getAttribute("value");
			        var promotionDetailWidget = controller.promotionDetailBuilder.prodOfferDetailWidgetList[""
			                + rowIndex];
			        if (!promotionDetailWidget) {
				        controller.initPromotionDetail(rowIndex);
				        promotionDetailWidget = controller.promotionDetailBuilder.prodOfferDetailWidgetList[""
				                + rowIndex];
			        }
			        if (tooltip && tooltip.style.display != "none") {
				        orderaccept.custom.popup.close({
					                widget : promotionDetailWidget
				                });
			        } else {
				        orderaccept.custom.popup.open({
					                widget : {
						                popup : promotionDetailWidget,
						                around : event.currentTarget,
						                onCancel : function() {
							                orderaccept.custom.popup.close({
								                        widget : promotionDetailWidget
							                        });
						                }
					                }
				                });
			        }
		        },
		        
		        /**
				 * 促销政策详细信息页面确定按钮点击事件
				 */
		        onPromotionDetailBtnClick : function(event) {
			        var controller = this.controller,
				        rowIndex = event.currentTarget.getAttribute("rowIndex");
			        var promotionDetailBuilder = controller.promotionDetailBuilder,
				        promotionDetailWidget = promotionDetailBuilder.prodOfferDetailWidgetList["" + rowIndex];
			        orderaccept.custom.popup.close({
				                widget : promotionDetailWidget
			                });
		        },
		        
		        /**
				 * 跳转到客户识别页面
				 * 
				 * @method
				 */
		        OnJump2CustRecognitionPage : function(event) {
			        
			        event.preventDefault();
			        
			        if (window.parent && window.parent.$switchPane$) {
				        
				        window.parent.$switchPane$([true, false]);
			        }
		        },
		        /**
				 * 跳转到订单详情页面
				 * 
				 * @method
				 */
		        OnJump2OrderDetailPage : function(event) {
			        
			        event.preventDefault();
			        
			        if (window.parent && window.parent.$switchPane$) {
				        
				        window.parent.$switchPane$([false, true]);
			        }
			        
		        },
		        
		        onToMainProdOfferSelectPane : function() {
			        util.navigatorManager.to("mainProdOfferSelectPane")(function(id, node) {
				                dojo.byId("function-navigator-root").style.display = "none";
				                var widget = unieap.byId(id);
				                // if there is not
				                // mainProdOfferSelectPane , try find
				                // shoppingCartPane
				                if (!widget) {
					                unieap.byId("shoppingCartPane").domNode.style.display = 'block';
				                }
			                });
			        
		        },
		        /**
				 * 待重构 FIXME
				 * 
				 * @method
				 */
		        onToOrderDetailPage : function() {
			        var behavior = this;
			        var acceptGroupId = dojo.global.$acceptGroupId$;
			        var custOrderId = dojo.global.$appContext$.get("_custOrderId_");
			        var custOrderNewFacadeBO = BusCard.$remote("custOrderNewFacadeBO");
			        if (!!custOrderNewFacadeBO && !!custOrderNewFacadeBO.doDeleteUncommitedCustOrder) {
				        custOrderNewFacadeBO.doDeleteUncommitedCustOrder(custOrderId, acceptGroupId);
				        dojo.global.$acceptGroupId$ = null;
			        }
			        dojo.style(dojo.byId("prodoffer-accept-root"), {
				                display : 'block'
			                });
			        dojo.style(dojo.byId("order-show-root"), {
				                display : 'none'
			                });
			        behavior.controller.functionNavigatorWidget.switchGroup(0);
		        },
		        doMemberAcceptCountCheck : function() {

		        },
		        selectedMemberEquals : function(s1, s2) {
			        s1 = s1 || {}, s2 = s2 || {};
			        var keyList = ['action', 'productId', 'prodOfferId', 'prodInstId', 'prodOfferInstId'];
			        return dojo.every(keyList, function(key) {
				                return s1[key] == s2[key];
			                });
			        
		        },
		        
		        /**
				 * 断定选择已经发生变化
				 * 
				 * @param {Array} newSelectedMemberProdOfferList
				 *            重新选择的成员列表
				 * @param {Function} assertSucc 断定成功回调
				 * @param {Function} assertFail 断定失败回调
				 * @method
				 */
		        assertSeletedChanged : function(newSelectedMemberProdOfferList, assertSucc, assertFail) {
			        var oldSelectedMemberProdOfferList = $ac$.get("selectedMemberProdOfferList") || [],
				        newSelectedMemberProdOfferList = newSelectedMemberProdOfferList || [],
				        assertSucc = assertSucc || BusCard.util.emptyFunction,
				        assertFail = assertFail || BusCard.util.emptyFunction,
				        self = this;
			        !(dojo.every(oldSelectedMemberProdOfferList, function(v, index) {
				                return self.selectedMemberEquals(v, newSelectedMemberProdOfferList[index]);
			                }) && dojo.every(newSelectedMemberProdOfferList, function(v, index) {
				                return self.selectedMemberEquals(v, oldSelectedMemberProdOfferList[index]);
			                }) && newSelectedMemberProdOfferList.selectedBelongCode == oldSelectedMemberProdOfferList.selectedBelongCode)
			                ? assertSucc()
			                : assertFail();
			        
		        },
		        _getSelectedMemberInfoList : function(event) {
			        var widget = dijit.getEnclosingWidget(event.currentTarget),
				        trs = dojo.query(".member-product-tr", widget.domNode),
				        prodOfferId = dojo.query(".prodofferid-input", widget.domNode)[0].value,
				        selectedMemberProdOfferList = dojo.map(dojo.filter(trs, function(dom) {
					                        var checkboxElem = dojo.query(".member-product-checkbox", dom)[0];
					                        if (checkboxElem.checked) { return true; }
					                        
				                        }), function(dom) {
					                var selectedActionNode = dojo.query(".action-selected", dom)[0],
						                prodOfferNode = dojo.query(".memeber-prodoffer-select", dom)[0],
						                productNode = dojo.query(".product-select", dom)[0],
						                itemData = {
							                permitEnterComb : dojo.attr(dom, "permitEnterComb"),
							                prodInstId : dojo.attr(dom, "prodInstId"),
							                prodOfferInstId : dojo.attr(dom, "prodOfferInstId"),
							                prodOfferId : prodOfferNode.value,
							                productId : productNode.value
						                };
					                if (selectedActionNode) {
						                var prodOfferInstId = dojo.attr(dom, "prodOfferInstId"),
							                offerInstVO = $ac$.query("userHasProdOfferInfoList[?(@.prodOfferInstId=="
							                        + prodOfferInstId + ")]")[0];
						                itemData.offerInstVO = offerInstVO;
						                itemData.prodInstVO = offerInstVO.prodInstList[0];
						                if (dojo.hasClass(selectedActionNode, "member-offer-keep")) {
							                itemData.action = (itemData.prodOfferId == offerInstVO.prodOfferId)
							                        ? "nochange"
							                        : "change";
							                
						                } else if (dojo.hasClass(selectedActionNode, "member-offer-quit")) {
							                itemData.action = 'quit';
							                //退网时使销售品id和实例中的相等
							                if(itemData.offerInstVO){
							                	itemData.prodOfferId = itemData.offerInstVO.prodOfferId+"";
							                }
							                
						                } else if (dojo.hasClass(selectedActionNode, "member-offer-split")) {
							                itemData.action = 'split';
						                }
						                
					                } else {
						                itemData.action = 'new';
					                }
					                return itemData;
					                
				                });
			        return selectedMemberProdOfferList;
		        },
		        /**
		         * FIXME 此方法可以放置到check模块中
		         * 检测成员数据的完整性
		         * @param {Array} selectedMemberProdOfferList
		         */
		        checkMemberDataIntegrity:function(selectedMemberProdOfferList){
		        	var membInfo = (selectedMemberProdOfferList||[]).find(function(m){
		        		return m.action=='split' && !/^\d+$/.test(m.prodOfferId||"")
		        	});
		        	if(membInfo){
		        		MessageBox.alert({message:'拆分成员'+membInfo.prodInstVO.accNbr+"没有可供变更的销售品,请选择其他操作"});
		        		return false;
		        	}
		        	return true;
		        },
		        onMainProdOfferConfirm : function(event) {
			        var widget = dijit.getEnclosingWidget(event.currentTarget),
				        self = this,
				        prodOfferId = dojo.query(".prodofferid-input", widget.domNode)[0].value,
				        _sortMap = {
					        "new" : 0,
					        nochange : 1,
					        change : 2,
					        split : 3,
					        quit : 4
					        
				        },
				        selectedMemberProdOfferList = this._getSelectedMemberInfoList(event);
				    if(this.checkMemberDataIntegrity(selectedMemberProdOfferList)===false){
						return false;				    	
				    }
			        // 获取是不是群组销售品
			        var prodOfferId = $ac$.get("currentMainProdOfferInfoVO").prodOfferId;
			        var ifGrp = util.ProdOfferHelper.getProdOfferDetail(prodOfferId).ifGrp;
			        var ifCanOrder = true;
			        if (ifGrp == "1") {
				        // add by liuzhongwei
				        var requestParam = dojo.global.$appContext$.get("requestParam");
				        var cityCode = requestParam.customerData.cityCode;
				        var custId = requestParam.customerData.custId;
				        dojo.forEach(selectedMemberProdOfferList, function(prodInfoVO) {
					        var productId = prodInfoVO.productId;
					        // 检测一下是不是组群产品
					        var productInfo = BusCard.$remote('productToServiceDAO').queryById({
						                productId : productId
					                });
					        if (productInfo.productType == "13") {
						        // 检测产品实例表中是否有此数据						        
						        var prodInstList = BusCard.$remote('prodInstCommonBO').queryNotInValidProdInst({
//							                productId : productId,
							                cityCode : cityCode,
							                ownerCustId : custId,
							                prodFuncType : ConstantsPool.load("ProductFuncTypeConst").ProductFuncTypeConst.ACCESS
						                });
								//不能重复订购						                
						        if(dojo.some(prodInstList,function(prodInstVO){
						        	return prodInstVO.productId==productId;
						        }) ){
						        	messageBox.alert({
								        message : "\u96c6\u56e2\u5ba2\u6237\u4e0d\u5141\u8bb8\u91cd\u590d\u8ba2\u8d2d\u76f8\u540c\u7684\u96c6\u56e2\u4ea7\u54c1"
							        });
							        ifCanOrder = false;
						        }
						        //ivpn\svpn\wvpn只能订购一个
						        var vpnList = [ConstantsPool.load("ProductIdConst").ProductIdConst.PRODUCT_ID,
						        			   ConstantsPool.load("ProductIdConst").ProductIdConst.WVPN,
						        			   ConstantsPool.load("ProductIdConst").ProductIdConst.SVPN]
								if(ifCanOrder&&dojo.some(vpnList,function(str){return str==productId})
									&&dojo.some(prodInstList,function(prodInstVO){return dojo.some(vpnList,function(str){return str==prodInstVO.productId})})){
									messageBox.alert({
								        message : "语音类IVPN、SVPN、WVPN只能订购一个"
							        });
							        ifCanOrder = false;										
								}
								
						        var PROD_NEW = ConstantsPool.load("ServiceOfferIDConst").ServiceOfferIDConst.PROD_NEW;
						        if (ifCanOrder) {
							        prodInstList = BusCard.$remote('accessProdItemInfoDAO').selectByProperties({
//								                productId : productId,
								                cityCode : cityCode,
								                customerId : custId,
								                serviceOfferId : PROD_NEW
							                });
							        //不能重复订购						                
							        if(dojo.some(prodInstList,function(prodInstVO){
							        	return prodInstVO.productId==productId;
							        }) ){
							        	messageBox.alert({
									        message : "\u96c6\u56e2\u5ba2\u6237\u4e0d\u5141\u8bb8\u91cd\u590d\u8ba2\u8d2d\u76f8\u540c\u7684\u96c6\u56e2\u4ea7\u54c1"
								        });
								        ifCanOrder = false;
							        }
							        //ivpn\svpn\wvpn只能订购一个
							        var vpnList = [ConstantsPool.load("ProductIdConst").ProductIdConst.PRODUCT_ID,
							        			   ConstantsPool.load("ProductIdConst").ProductIdConst.WVPN,
							        			   ConstantsPool.load("ProductIdConst").ProductIdConst.SVPN]
									if(ifCanOrder&&dojo.some(vpnList,function(str){return str==productId})
										&&dojo.some(prodInstList,function(prodInstVO){return dojo.some(vpnList,function(str){return str==prodInstVO.productId})})){
										messageBox.alert({
									        message : "语音类IVPN、SVPN、WVPN只能订购一个"
								        });
								        ifCanOrder = false;										
									}        
						        }
								
						        
					        }
				        });
			        }
			        
			        if (!ifCanOrder) { return; }
			        
			        if(this.controller.route("/checkInstance/pilotageCheck", [{
				                        selectedMemberProdOfferList : selectedMemberProdOfferList
			                        }]) === false) {
				        return false;				        
			        }
			        
			        if (this.controller.route("/checkInstance/doCheckMemberProdOfferSelect", [{
				                        selectedMemberProdOfferList : selectedMemberProdOfferList,
				                        widget : widget
			                        }]) === false) {
				        return false;  
				        
			        } else {
				        // add by chuaizhw
				        // FUN-ORDER-综合订单受理-0018(集团建立子群)
				        // start
				        if (this.controller.route("/checkInstance/doCheckSubGroupProdOffer", [{}]) == false) { return false; }
				        // add by chuaizhw
				        // FUN-ORDER-综合订单受理-0018(集团建立子群)
				        // end
				        
				        // 排序
				        selectedMemberProdOfferList.sort(function(s1, s2) {
					                if (_sortMap[s1.action] > _sortMap[s2.action]) {
						                return 1;
					                } else if (_sortMap[s1.action] < _sortMap[s2.action]) {
						                return -1;
					                } else {
						                return 0;
					                }
				                });
				        selectedMemberProdOfferList.selectedBelongCode = this.controller.getBelongCode();
				        this.assertSeletedChanged(selectedMemberProdOfferList, function() {
					                $ac$.set("selectedMainProdOfferInfoVO", $ac$.get("currentMainProdOfferInfoVO"));
					                $ac$.set("prodOfferList", [$ac$.get("currentMainProdOfferInfoVO")]);
					                $ac$.set("selectedMemberProdOfferList", selectedMemberProdOfferList);
					                $ac$.set("subGroupProdInfo", $ac$.get("subGroupProdInfo"));
					                $ac$.set("processId", $ac$.get("currentProcessId") || $ac$.get("processId"));
					                self.controller.beginOrder(prodOfferId);
				                }, function() {
					                util.navigatorManager.to("prodOfferAcceptPane")(function() {
						                        dojo.byId("function-navigator-root").style.display = "block";
					                        });
					                
				                });
				        //针对协议销售品变协议销售品的检测
				        if (this.controller.route("/checkInstance/doCheckOfferStandardForChgNextStep", []) === false) {
					        return false;
				        }
			        }
			        
		        },
		        
		        onMainProdOfferCheck : function(event) {

		        },
		        /**
				 * 自主版添加成员套餐
				 * 
				 * @method
				 */
		        onAddMemeberProdOffer : function(evt) {
			        var delIconUrl = BusCard.path.contextPath + "/common/images/button/reduce_button.png";
			        var f = this.controller.route("/checkInstance/doMemeberProductCountCheck", [evt]);
			        if (f === false) { return false; }
			        var trNode = util.DomHelper.findParentNode(evt.currentTarget, function(node) {
				                return node.tagName.toUpperCase() == 'TR';
			                }),
				        selectedFuncNode = function() {
					        var operNode = dojo.query(".member-oper-div", trNode)[0];
					        if (operNode) {
						        var selectNodeList = dojo.query(":checked", operNode);
						        return selectNodeList[0];
					        }
					        
				        }(),
				        cloneNode = trNode.cloneNode(true);
			        dojo.place(cloneNode, trNode, "after");
			        dojo.attr(cloneNode, {
				                prodInstId : '',
				                prodOfferInstId : ''
			                });
			        dojo.attr(dojo.query(".member-product-checkbox", cloneNode)[0], {
				                disabled : false,
				                checked : true
			                });
			        var imgElem = dojo.query(".member-prodoffer-add-img", cloneNode)[0];
			        imgElem.src = delIconUrl;
			        dojo.connect(imgElem, "onclick", function(evt) {
				                var trNode = util.DomHelper.findParentNode(evt.currentTarget, function(node) {
					                        return node.tagName.toUpperCase() == 'TR';
				                        });
				                trNode.parentNode.removeChild(trNode);
				                
			                });
			        dojo.query(".member-status", cloneNode)[0].innerHTML = "订购";
			        var operElem = dojo.query(".member-oper-div", cloneNode),
				        prodOfferNode = dojo.query(".memeber-prodoffer-select", cloneNode)[0],
				        productNode = dojo.query(".product-select", cloneNode)[0];
			        if (operElem && operElem.length > 0) {
				        operElem[0].parentNode.removeChild(operElem[0]);
			        }
			        if (selectedFuncNode) {
				        selectedFuncNode.checked = true;
			        }
			        try {
				        var relatedOfferList = $ac$.query("prodOfferList[*].offerProdRelaList[?(@.productId=="
				                + productNode.value + ")]")[0].relatedOfferList;
				        if (relatedOfferList) {
					        BusCard.$rs(prodOfferNode, dojo.map(relatedOfferList, function(vo) {
						                        return {
							                        id : vo.prodOfferId,
							                        name : vo.prodOfferName
						                        }
					                        }));
					        
				        }
			        }
			        catch (e) {
				        if (window.console && window.console.warn) {
					        window.console.warn("are you ordering shared prodoffer?");
				        }
			        }
			        
			        return cloneNode;
			        
		        },
		        /**
				 * 点击缴费按钮
				 * 
				 * @method
				 */
		        onDoChargeClick : function(event) {
			        var behavior = this;
			        var custOrderId = dojo.global.$appContext$.get("_custOrderId_");
			        if (behavior.isGotoPreInvoicePage(custOrderId)) {// 判断是否要跳转到预打发票页面
				        if (opener && opener.parent.top) {
					        opener.parent.top.top_page.MenuBar.activeTopMenuById('System84', '842', '842AF',
					                "custOrderId=" + custOrderId);
					        if (!!unieap.getDialog()) {
						        unieap.getDialog().close();
					        } else {
						        window.close();
					        }
					        return;
				        }
				        if (parent.top) {
					        parent.top.top_page.MenuBar.activeTopMenuById('System84', '842', '842AF', "custOrderId="
					                        + custOrderId);
					        return;
				        }
			        } else {
				        if (opener && opener.parent.top) {
					        opener.parent.top.top_page.MenuBar.activeTopMenuById('System84', '842', '842AA',
					                "custOrderId=" + custOrderId);
					        if (!!unieap.getDialog()) {
						        unieap.getDialog().close();
					        } else {
						        window.close();
					        }
					        return;
				        }
				        if (parent.top) {
					        parent.top.top_page.MenuBar.activeTopMenuById('System84', '842', '842AA', "custOrderId="
					                        + custOrderId);
					        return;
				        }
			        }
		        },
		        onAccessProductChange : function(evt) {
			        var node = evt.currentTarget;
			        var productId = node.value;
			        var widget = dijit.getEnclosingWidget(node);
			        var relatedOfferList = BusCard.jsonPath(widget.prodOfferInfoVO,
			                "$.offerProdRelaList[?(@.productId==" + productId + ")]")[0].relatedOfferList;
			        BusCard.$rs(dojo.query(".memeber-prodoffer-select", widget.domNode)[0], dojo.map(relatedOfferList,
			                        function(vo) {
				                        
				                        return {
					                        id : vo.prodOfferId,
					                        name : vo.prodOfferName
				                        };
				                        
			                        }));
			        
		        },
		        
		        // 判断是否需要跳转到预打发票页面
		        isGotoPreInvoicePage : function(custOrderId) {
			        var flag = false;
			        var custOrderBasicVO = BusCard.$remote("custOrderBasicInfoDAO").queryNormalTB({
				                custOrderId : custOrderId
			                })[0];
			        var offerItemList = BusCard.$remote("offerItemInfoDAO").selectByProperties({
				                custOrderId : custOrderId
			                });
			        var offerItemFlag = dojo.every(offerItemList || [], function(oneOfferItemInfo) {
				                return oneOfferItemInfo.serviceOfferId != util.ACTION_CD_CONST.PRODUCT_INSTALL;
			                });
			        var param = "&ServiceKind=-1&apply_event=-1&infoId=217";
			        var result = util.ServiceFactory
			                .getService("url:businessAcceptAction.do?method=getCityBusinessParamValue" + param);
			        var acceptWay = ConstantsPool.load("AcceptWayCDConst").AcceptWayCDConst.TEN_THOUSAND_NUMBER;// 10000号受理
			        if (result && result == "1") {// 开关打开
				        // 受理方式为10000号受理且为新装操作
				        if (custOrderBasicVO && custOrderBasicVO.acceptWay == acceptWay && offerItemFlag) {
					        flag = true;
				        }
			        }
			        return flag;
		        },
		        /**
				 * 免提单打印
				 */
		        doPrint : function() {
			        // dojo.require("unieap.dialog.DialogUtil");
			        var custOrderId = dojo.global.$appContext$.get("_custOrderId_");
			        var pagePath = BusCard.path.contextPath
			                + "/printAction.do?method=doPrintInit&billKind=3&custOrderId=" + custOrderId;
			        // var dialog = DialogUtil.showDialog({
			        // url : pagePath,
			        // title : '免提单打印',
			        // height : '700',
			        // width : '1000',
			        // dialogData : {
			        // opener : window
			        // },
			        // isClose : true,
			        // iconCloseComplete : false
			        // });
			        window
			                .open(pagePath, "orderPrint",
			                        "height=700,width=1000,status=no,scrollbars=yes,toolbar=no,menubar=no,location=no,top=10,left=10");
		        }
	        });
        });