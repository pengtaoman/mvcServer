defineModule("orderaccept.prodofferaccept.widget.mainprodofferchange.MemberProdOfferChangeWidget", [
                "orderaccept.custom._BaseWidget", "orderaccept.custom._BusCardTemplated", "dijit._Container",
                "orderaccept.prodofferaccept.util", "../mainprodoffer/MainProdOfferFlatWidget"], function(_Widget,
                _Templated, _Container, util, MainProdOfferFlatWidget) {
	        
	        /**
			 * 创建变更可选包时对应的widget
			 * 
			 * @class
			 * @requires ["dijit._Widget",
			 *           "orderaccept.custom._BusCardTemplated",
			 *           "orderaccept.prodofferaccept.util"]
			 * @module orderaccept.prodofferaccept.widget.mainprodofferchange.MainProdOfferChangeWidget
			 * @runtimeDependences $appContext$.userHasProdOfferInfoList
			 */
	        dojo.declare("orderaccept.prodofferaccept.widget.mainprodofferchange.MemberProdOfferChangeWidget",
	                [MainProdOfferFlatWidget], {
		                templatePath :  dojo.moduleUrl("orderaccept.prodofferaccept.widget.mainprodoffer",
		                        "template/mainProdOfferTpl.html"),
		                /**
						 * 构建视图展现初始化数据,这个方法需要注意的是入口初始化数据从当前应用上下文中取得到userHasProdOfferInfoList数据,
						 * 视图主体数据尽量从$appContext$应用上下文中取
						 * 
						 * @method
						 */
		                buildViewInitData : function() {
			                var initData = this.inherited(arguments),
				                isAllSplited = !!$ac$.get("selectedMemberProdOfferList").isAllSplited,
				                mainProdOfferInstVO = dojo.global.$appContext$.get("mainProdOfferInstVO"),
				                productDateBuilder = util.ProdOfferHelper.getProductDateBuilder($ac$
				                                .get("currentMainProdOfferInfoVO"), {
					                        beginDate : mainProdOfferInstVO.effDate,
					                        endDate : mainProdOfferInstVO.expDate,
					                        changeKind : 3
				                        });
			                
			                dojo.mixin(initData.prodOfferViewData, {
				                        startDate : mainProdOfferInstVO.effDate,
				                        endDate : isAllSplited
				                                ? productDateBuilder.getEndDate()
				                                : mainProdOfferInstVO.expDate,
				                        prodOfferInstId : mainProdOfferInstVO.prodOfferInstId
			                        });
			                initData.prodOfferViewData.actionName = isAllSplited ? "\u9000\u8ba2" : "\u53d8\u66f4";
			                initData.prodOfferViewData.displayStartEndTime = "hidden-elem";
			                return {
				                prodOfferViewData : initData.prodOfferViewData,
				                prodViewData : this.buildProductViewInitData(
				                        initData.prodOfferViewData.prodOfferInfoVO, {
					                        key : 'key'
				                        }),
				                quitProdOfferInfoList : this.buildQuitProdOfferViewInitData()
				                
			                }
		                },
		                _buildEachQuitMainProdOfferView : function(mainProdOfferInstVO, prodOfferInfoVO) {
			                if (mainProdOfferInstVO) {
				                var Me = this,
					                key = this.key,
					                viewId = key + "-" + prodOfferInfoVO.parentProdOfferId
					                        + prodOfferInfoVO.prodOfferId,
					                actionName = "\u9000\u8ba2",
					                productDateBuilder = util.ProdOfferHelper.getProductDateBuilder(prodOfferInfoVO, {
						                        beginDate : mainProdOfferInstVO.effDate,
						                        endDate : mainProdOfferInstVO.expDate,
						                        changeKind : 3
					                        }),
					                startDate = mainProdOfferInstVO.effDate,
					                endDate = productDateBuilder.getEndDate();
				                tpContext = {
					                "prodOfferDetailFlag" : '0',
					                "viewId" : viewId,
					                "startDate" : startDate,
					                "endDate" : endDate,
					                "actionName" : actionName,
					                "displayStartEndTime" : "",
					                "prodOfferInfoVO" : prodOfferInfoVO,
					                "prodOfferInstId":mainProdOfferInstVO.prodOfferInstId
				                };
				                return {
					                prodOfferViewData : tpContext
				                }
				                
			                }
			                
		                },
		                /**
						 * 此方法的代码基本和ChgMainProdOfferWidget的buildQuitProdOfferViewInitData相同,
						 * 都是构建需要退订的主销售品订单项视图
						 * 
						 * @method
						 */
		                buildQuitProdOfferViewInitData : function() {
			                
			                var needQuitList = dojo
			                        .filter(
			                                $ac$
			                                        .query("$.selectedMemberProdOfferList[?(@.action=='split'||@.action=='quit'||@.action=='change')]"),
			                                function(v) {
				                                return v.action == 'quit'
				                                        || (v.offerInstVO.prodOfferId != v.prodOfferId);
			                                }),
				                widget = this;
			                
			                if (needQuitList) {
				                return dojo.map(needQuitList, function(vo) {
					                        return widget._buildEachQuitMainProdOfferView(vo.offerInstVO,
					                                $ac$.query("$.prodOfferList[*].offerProdRelaList[?(@.productId=="
					                                        + vo.productId + ")].relatedOfferList[?(@.prodOfferId=="
					                                        + vo.offerInstVO.prodOfferId + ")]")[0]);
					                        
				                        });
				                
			                } else {
				                
				                return [];
			                }
			                
		                },
		                
		                /**
						 * 根据主销售品构建主产品展现初始化数据
						 * 
						 * @method
						 */
		                buildMemberProdOfferInitData : function(mainProdOfferInfoVO, config) {
			                var selectedMemberProdOfferList = $ac$.get("selectedMemberProdOfferList"),
				                self = this;
			                if (selectedMemberProdOfferList == null) {
				                return false;
			                } else {
				                var productViewList = dojo.map(selectedMemberProdOfferList, function(
				                                selectedMemberProdOffer) {
					                        var prodOfferId = selectedMemberProdOffer.prodOfferId,
						                        productId = selectedMemberProdOffer.productId,
						                        action = selectedMemberProdOffer.action || "new",
						                        offerInstVO = selectedMemberProdOffer.offerInstVO,
						                        actionName = self.actionNameMap[action];
					                        switch (action) {
						                        case "new" :
						                        case "nochange" :
						                        case "change" :
							                        var prodRela = dojo.filter(mainProdOfferInfoVO.offerProdRelaList,
							                                function(prodRela) {
								                                return prodRela.productInfoVO.productId == productId;
							                                })[0],
								                        memberProdOfferInfoVO = dojo.filter(prodRela.relatedOfferList,
								                                function(member) {
									                                return member.prodOfferId == prodOfferId;
								                                })[0],
								                        productView = self._buildEachProductViewData(
								                                memberProdOfferInfoVO, prodRela, prodRela.roleInfoVO);
							                        productView.memberProdOfferView = self
							                                ._buildMemberMainProdOfferView(memberProdOfferInfoVO);
							                        break;
						                        case "split" :
							                        // 获取拆分成员重新选择的新的销售品信息
							                        var prodOfferInfoVO = util.ProdOfferHelper.getProdOfferDetail(
							                                prodOfferId, {
								                                interfaceType : 4,
								                                permitCache : true,
								                                permitFromCache : true
							                                }),
								                        prodRela = dojo.filter(prodOfferInfoVO.offerProdRelaList,
								                                function(prodRela) {
									                                return prodRela.productInfoVO.productId == productId;
								                                })[0],
								                        productView = self._buildEachProductViewData(prodOfferInfoVO,
								                                prodRela, prodRela.roleInfoVO);
							                        productView.memberProdOfferView = self
							                                ._buildMemberMainProdOfferView(prodOfferInfoVO);
							                        break;
						                        case "quit" :
							                        var prodRela = dojo.filter(mainProdOfferInfoVO.offerProdRelaList,
							                                function(prodRela) {
								                                return prodRela.productInfoVO.productId == productId;
							                                })[0],
								                        memberProdOfferInfoVO = dojo.filter(prodRela.relatedOfferList,
								                                function(member) {
									                                return member.prodOfferId == offerInstVO.prodOfferId;
								                                })[0],
								                        productView = self._buildEachProductViewData(
								                                memberProdOfferInfoVO, prodRela, prodRela.roleInfoVO);
							                        productView.memberProdOfferView = self
							                                ._buildMemberMainProdOfferView(memberProdOfferInfoVO);
							                        break;
						                        
					                        }
					                        productView.actionName = actionName;
					                        productView.action = action;
					                        if (action != 'new') {
						                        var prodInst = offerInstVO.prodInstList[0];
						                        productView.serviceId = prodInst.accNbr;
						                        productView.userId = prodInst.prodInstId;
						                        productView.prodInstId = prodInst.prodInstId;
						                        productView.prodOfferInstId = offerInstVO.prodOfferInstId;
					                        }
					                        // reverse setter
					                        selectedMemberProdOffer.uniqueId = productView.uniqueId;
					                        return productView;
					                        
				                        });
				                this._updateMemeberMainProdOfferStatus(productViewList);
				                return productViewList;
				                
			                }
			                
		                },
		                postCreate : function() {
			                this.inherited(arguments);
			                var productDomList = dojo.query(".main-product-basic", this.domNode);
			                dojo.forEach(dojo._toArray(productDomList), function(dom) {
				                var viewId = dojo.attr(dom, "viewId"),
					                prodInstId = dojo.attr(dom, "prodInstId"),
					                uniqueId = dojo.attr(dom, "uniqueId"),
					                oldOperDom = dojo.query(".serviceOperOld-" + viewId, dom)[0],
					                newOperDom = dojo.query(".serviceOperNew-" + viewId, dom)[0],
					                operDomList = dojo.query("[name=serviceOper-" + viewId + "-" + uniqueId + "]", dom);
				                if (prodInstId) {
					                oldOperDom.checked = true;
					                dojo.forEach(operDomList, function(operDom) {
						                        operDom.disabled = true;
					                        });
				                } else {
					                newOperDom.checked = true;
				                }
				                
			                });
			                
		                },
		                getPageData : function() {
			                var _pageData = this.inherited(arguments);
			                if (_pageData === false) {
				                return false;
			                } else {
				                var prodOfferInstId = dojo.query(".mainprodoffer-class", this.domNode)[0]
				                        .getAttribute("prodOfferInstId");
				                _pageData.prodOfferPageInfo.prodOfferInstId = prodOfferInstId;
				                return _pageData;
			                }
			                
		                }
		                
	                });
	        
        });