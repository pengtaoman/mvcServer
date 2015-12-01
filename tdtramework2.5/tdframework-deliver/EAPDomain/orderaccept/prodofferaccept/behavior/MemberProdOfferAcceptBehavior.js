defineModule("orderaccept.prodofferaccept.behavior.MemberProdOfferAcceptBehavior",
        ["../util", "./ProdOfferChgBehavior"], function(util, ProdOfferChgBehavior) {
	        
	        dojo.declare("orderaccept.prodofferaccept.behavior.MemberProdOfferAcceptBehavior", [ProdOfferChgBehavior],
	                {
		                postscript : function() {
			                this.subscribe();
		                },
		                subscribe : function() {
			                var behavior = this;
			                this.inherited(arguments);
			                // 点击保持触发的动作
			                this.handleRegistry.push(dojo.subscribe("/member-offer-keep/click", function() {
				                        behavior.onMemberProdOfferKeep(arguments[0]);
				                        
			                        }));
			                // 点击拆分触发的动作
			                this.handleRegistry.push(dojo.subscribe("/member-offer-split/click", function() {
				                        behavior.onMemberProdOfferSplit(arguments[0]);
				                        
			                        }));
			                // 点击退网触发的动作
			                this.handleRegistry.push(dojo.subscribe("/member-offer-quit/click", function() {
				                        behavior.onMemberProdOfferQuit(arguments[0]);
				                        
			                        }));
		                },
		                _clickAction : function(evt) {
			                var target = evt.currentTarget;
			                var trNode = util.DomHelper.findParentNode(target, function(p) {
				                        return p.tagName.toUpperCase() == 'TD';
			                        });
			                dojo.forEach(dojo.query(".action-link", trNode), function(node) {
				                        dojo.removeClass(node, "action-selected");
				                        
			                        });
			                dojo.addClass(target, "action-selected");
			                
		                },
		                onMemberProdOfferKeep : function(evt) {
			                this._clickAction(evt);
			                var productTrNode = util.DomHelper.findParentNode(evt.currentTarget, function(node) {
				                        return node.tagName.toUpperCase() == 'TR';
			                        }),
				                userHasProdOfferInfoList = $ac$.get("userHasProdOfferInfoList"),
				                prodOfferInstId = dojo.attr(productTrNode, "prodOfferInstId"),
				                productId = dojo.attr(productTrNode, "productId"),
				                offerInstVO = BusCard.jsonPath(userHasProdOfferInfoList, "$[?(@.prodOfferInstId=="
				                                + prodOfferInstId + ")]")[0],
				                offerProdRela = BusCard.jsonPath($ac$.get("currentMainProdOfferInfoVO"),
				                        "offerProdRelaList[?(@.productId==" + productId + ")]")[0],
				                memberProdOfferNode = dojo.query(".memeber-prodoffer-select", productTrNode)[0];
			                BusCard.$rs(memberProdOfferNode, dojo.map(offerProdRela.relatedOfferList, function(v) {
				                                return {
					                                id : v.prodOfferId,
					                                name : v.prodOfferName
				                                }
				                                
			                                }));
			                memberProdOfferNode.value = offerInstVO.prodOfferId;
			                
		                },
		                onMemberProdOfferSplit : function(evt) {
			                this._clickAction(evt);
			                // FIXME
			                // 这里可以优化:如果此成员必须拆分的话,就不用再调接口取单套餐了,因为初始化时单套餐已经取出
			                // 而且不需要再变更成员套餐列表
			                var productTrNode = util.DomHelper.findParentNode(evt.currentTarget, function(node) {
				                        return node.tagName.toUpperCase() == 'TR';
			                        }),
				                userHasProdOfferInfoList = $ac$.get("userHasProdOfferInfoList"),
				                prodOfferInstId = dojo.attr(productTrNode, "prodOfferInstId"),
				                productId = dojo.attr(productTrNode, "productId"),
				                offerInstVO = BusCard.jsonPath(userHasProdOfferInfoList, "$[?(@.prodOfferInstId=="
				                                + prodOfferInstId + ")]")[0],
				                offerProdRela = BusCard.jsonPath($ac$.get("currentMainProdOfferInfoVO"),
				                        "offerProdRelaList[?(@.productId==" + productId + ")]")[0],
				                memberProdOfferNode = dojo.query(".memeber-prodoffer-select", productTrNode)[0],
				                // FIXME 这里可以缓存
				                singleProdOfferList = prodOfferAcceptLoader
				                        .route("url:orderDetailAction.do?method=doGetProdOfferByAccProductId&productId="
				                                + productId + "&prodOfferId=" + offerInstVO.prodOfferId);
			                // +
			                // "&feeType="+offerInstVO.prodInstList[0].paymentModeCd);
			                // 主副卡需要过滤掉原来的销售品
			                if (this.controller.checkInstance.doCheckIfMainAuxiliaryCard()) {
				                singleProdOfferList = this.filterCurrentProdOfferId(offerInstVO, singleProdOfferList);
			                }
			                singleProdOfferList.sort(function(param1,param2){
				        		return (param1.prodOfferName).localeCompare(param2.prodOfferName);
				        	});
			                BusCard.$rs(memberProdOfferNode, dojo.map(singleProdOfferList, function(p) {
				                                return {
					                                id : p.prodOfferId,
					                                name : p.prodOfferName
					                                
				                                };
			                                }));
			                var isContained = dojo.some(singleProdOfferList, function(v) {
				                        return v.prodOfferId == offerInstVO.prodOfferId;
			                        });
			                if (isContained) {
				                memberProdOfferNode.value = offerInstVO.prodOfferId;
			                }
			                
		                },
		                /**
						 * 过滤掉当前的销售品id
						 */
		                filterCurrentProdOfferId : function(offerInstVO, singleProdOfferList) {
			                return dojo.filter(singleProdOfferList, function(singleProdOffer) {
				                        return singleProdOffer.prodOfferId != offerInstVO.prodOfferId;
			                        });
		                },
		                onMemberProdOfferQuit : function(evt) {
			                this._clickAction(evt);
		                },
		                
		                /**
						 * 主套餐受理页面点击变更按钮时触发的动作
						 * 
						 * @method
						 */
		                onMainProdOfferConfirm : function(event) {
			                var selectedMemberProdOfferList = this._getSelectedMemberInfoList(event);
			                if(this.checkMemberDataIntegrity(selectedMemberProdOfferList)===false){
								return false;				    	
				    		}
				            var checkResult = this.doCheckValidation(selectedMemberProdOfferList),
				                self = this;
			                if (checkResult && checkResult.isAllSplited && checkResult.flag) {
				                selectedMemberProdOfferList.isAllSplited = true;
			                } else if (checkResult && checkResult.isAllSplited) {
				                return false;
			                } else if (!checkResult) { return false }
			                
			                this.assertSeletedChanged(selectedMemberProdOfferList, function() {
				                        $ac$.set("selectedMemberProdOfferList", selectedMemberProdOfferList);
				                        self.controller.beginOrder();
			                        }, function() {
				                        util.navigatorManager.to("prodOfferAcceptPane")(function() {
					                                dojo.byId("function-navigator-root").style.display = "block";
					                                unieap.byId("shoppingCartPane").domNode.style.display = 'none';
				                                });
				                        
			                        });
			                
		                },
		                /**
						 * 检测的成员选择状态是否允许受理
						 * 
						 * @method
						 */
		                doCheckValidation : function(selectedMemberProdOfferList) {
			                // 判断是否需要全拆
			                var isAllSplited = dojo.every(selectedMemberProdOfferList, function(smp) {
				                        return smp.action != 'new' && smp.action != 'change'
				                                && smp.action != 'nochange';
			                        });
			                if (isAllSplited) {
				                // 先进订单模块的业务检测
				                var flag = this.controller.checkInstance.doOrderBusCheck({
					                         selectedMemberProdOfferList : selectedMemberProdOfferList
				                        });
				                if (flag === false) { return flag; }
				                // 增加其他检查
				                var flag = this.controller.checkInstance
				                        .memberProdOfferChangeValidate(selectedMemberProdOfferList);
				                if (flag === false) { return flag; }
				                var confirmResult = confirm("成员套餐全部拆分或退网,主套餐["
				                        + $ac$.get("currentMainProdOfferInfoVO").prodOfferName + "]将被退订,\n是否继续?");
				                return {
					                isAllSplited : true,
					                flag : !!confirmResult
				                }
			                } else {
				                return this.controller.checkInstance.doCheckMemberProdOfferSelect({
					                        selectedMemberProdOfferList : selectedMemberProdOfferList
				                        });
				                
			                }
			                
		                }
		                
	                });
	        
        });