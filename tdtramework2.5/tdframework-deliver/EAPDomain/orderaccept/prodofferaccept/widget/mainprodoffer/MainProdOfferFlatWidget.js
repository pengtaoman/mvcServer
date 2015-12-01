defineModule("orderaccept.prodofferaccept.widget.mainprodoffer.MainProdOfferFlatWidget", ["./MainProdOfferWidget",
                "orderaccept.prodofferaccept.util"], function(MainProdOfferWidget, util) {
	        dojo.declare("orderaccept.prodofferaccept.widget.mainprodoffer.MainProdOfferFlatWidget",
	                [MainProdOfferWidget], {
		                actionNameMap : util.actionNameMap,
		                
		                memberTemplate : BusCard.Template
		                        .create("<select class='member-main-prodoffer' style='width:98%'>"
		                                + "<tp:for ds='membProdOfferList'><option value='${prodOfferId}'>${prodOfferName}</option></tp:for></select>"),
		                /**
						 * 视图展现时平铺角色中的每一个产品
						 * 
						 * @method
						 */
		                buildProductViewInitData : function(mainProdOfferInfoVO, config) {
			                var widget = this,
				                protoConcat = Array.prototype.concat,
				                key = this.key = config.key;
			                return this.buildMemberProdOfferInitData(mainProdOfferInfoVO, config)
			                        || this.buildSharedProductInitData(mainProdOfferInfoVO, config);
			                
		                },
		                buildSharedProductInitData : function(mainProdOfferInfoVO, config) {
			                var selectedMemberProdOfferList = $ac$.get("selectedMemberProdOfferList"),
				                widget = this;
			                if (mainProdOfferInfoVO.bindType != 2) { return dojo.map(selectedMemberProdOfferList,
			                        function(selectedProdInfo) {
				                        var productId = selectedProdInfo.productId,
					                        offerProdRela = BusCard.jsonPath(mainProdOfferInfoVO,
					                                "$.offerProdRelaList[?(@.productId==" + productId + ")]")[0],
					                        viewData = widget._buildEachProductViewData(mainProdOfferInfoVO,
					                                offerProdRela, offerProdRela.roleInfoVO);
				                        // reverse setter
				                        selectedProdInfo.uniqueId = viewData.uniqueId;
				                        return viewData;
				                        
			                        });

			                }
			                
		                },
		                /**
						 * 如果是自主版套餐,根据事先选择的成员套餐进行展现
						 * 
						 * @method
						 */
		                buildMemberProdOfferInitData : function(mainProdOfferInfoVO, config) {
			                
			                if (mainProdOfferInfoVO.bindType != 2) { return false; }
			                var selectedMemberProdOfferList = $ac$.get("selectedMemberProdOfferList"),
				                self = this;
			                if (selectedMemberProdOfferList == null) {
				                return false;
			                } else {
				                var productViewList = dojo.map(selectedMemberProdOfferList, function(
				                        selectedMemberProdOffer) {
					                var prodOfferId = selectedMemberProdOffer.prodOfferId,
						                productId = selectedMemberProdOffer.productId,
						                prodRela = dojo.filter(mainProdOfferInfoVO.offerProdRelaList,
						                        function(prodRela) {
							                        return prodRela.productInfoVO.productId == productId;
						                        })[0],
						                memberProdOfferInfoVO = null,
						                resetMemeberProdOfferInfo = function() {
							                memberProdOfferInfoVO = util.ProdOfferHelper.loadAndSetProdOffer(
							                        selectedMemberProdOffer.prodOfferId, {
								                        interfaceType : 4
							                        });
							                prodRela = dojo.filter(memberProdOfferInfoVO.offerProdRelaList, function(
							                                rela) {
								                        return rela.productInfoVO.productId == productId;
							                        })[0];
							                
						                };
					                
					                // 如果是必须拆分的成员
					                if (!selectedMemberProdOffer.permitEnterComb
					                        && (selectedMemberProdOffer.prodInstId || selectedMemberProdOffer.prodOfferInstId)) {
						                resetMemeberProdOfferInfo();
					                }
					                // 如果是当前选择的自主版套餐内的成员
					                memberProdOfferInfoVO = memberProdOfferInfoVO
					                        || dojo.filter(prodRela.relatedOfferList, function(member) {
						                                return member.prodOfferId == prodOfferId;
					                                })[0];
					                // 如果上述两步仍然没有查询出成员套餐信息,那么此套餐肯定是拆分并且重新选择了新套餐
					                if (!memberProdOfferInfoVO) {
						                resetMemeberProdOfferInfo();
					                }
					                var productView = self._buildEachProductViewData(mainProdOfferInfoVO, prodRela,
					                        prodRela.roleInfoVO);
					                productView.memberProdOfferView = self
					                        ._buildMemberMainProdOfferView(memberProdOfferInfoVO);
					                // reverse setter
					                selectedMemberProdOffer.uniqueId = productView.uniqueId;
					                return productView;
					                
				                });
				                this._updateMemeberMainProdOfferStatus(productViewList);
				                return productViewList;
				                
			                }
			                
		                },
		                
		                _updateMemeberMainProdOfferStatus : function(productViewList) {
			                dojo.forEach(productViewList, function(productView) {
				                        productView.prodOperClass = "mainprodoffer-hidden";
				                        productView.checkedOption = "CHECKED";
				                        productView.disabledOption = "DISABLED";
				                        
			                        });
			                
		                },
		                
		                _buildMemberMainProdOfferView : function(memberProdOfferVO) {
			                return this.memberTemplate.apply({
				                        membProdOfferList : [{
					                                prodOfferName : memberProdOfferVO.prodOfferName,
					                                prodOfferId : memberProdOfferVO.prodOfferId
				                                }]
			                        });
			                
		                },
		                _buildEachProductViewData : function(mainProdOfferInfoVO, prodRela, roleInfoVO) {
			                this.productServiceKindMap = this.productServiceKindMap || {};
			                var productInfoVO = prodRela.productInfoVO,
				                productServiceKindMap = this.productServiceKindMap,
				                productOptionTp = BusCard.Template
				                        .create("<option isDefault = '#{isDefault}' value ='#{productId}'>#{productName}</option>"),
				                getEachOption = function(prodRela) {
					                return productOptionTp.apply({
						                        isDefault : prodRela.isDefault,
						                        productName : prodRela.productInfoVO.productName,
						                        productId : prodRela.productInfoVO.productId
					                        });
				                },
				                optionList = getEachOption(prodRela);
			                if (!productServiceKindMap[prodRela.productId]
			                        && prodRela.productInfoVO.prodFuncType == util.ProductFuncTypeConst.ACCESS) {
				                productServiceKindMap[prodRela.productId] = {
					                serviceKind : productInfoVO.netType
				                };
			                }
			                var _product2ServiceKind = productServiceKindMap[prodRela.productId.toString()];
			                var serviceKindIndex = _product2ServiceKind ? util.ServiceKindCounter
			                        .get(_product2ServiceKind.serviceKind) : "-1";
			                var defaultNumber = !!_product2ServiceKind
			                        ? util.ServiceKindPrefixMap[_product2ServiceKind.serviceKind] + "号码"
			                                + serviceKindIndex
			                        : '';
			                var serviceKind = !!_product2ServiceKind ? _product2ServiceKind.serviceKind : '-1';
			                return dojo.mixin({
				                        uniqueId : util.CommUtils.generateUniqueId(),
				                        roleName : roleInfoVO ? roleInfoVO.roleName : '无角色',
				                        viewId : this.key + "-product-" + productInfoVO.productId,
				                        optionList : optionList,
				                        prodRela : prodRela,
				                        checkedOption : "CHECKED" || (prodRela.ifDefault == 1 ? "CHECKED" : ""),
				                        disabledOption : "DISABLED"
				                                || ((!roleInfoVO && productInfoVO.minCount) > 0 ? "DISABLED" : ""),
				                        webPath : BusCard.path.contextPath,
				                        data : {},
				                        newCheckedOption : "CHECKED",
				                        prodOfferId : mainProdOfferInfoVO.prodOfferId,
				                        productId : productInfoVO.productId,
				                        maxCount : productInfoVO.maxCount,
				                        minCount : productInfoVO.minCount,
				                        prodOperClass : "mainprodoffer-hidden"
				                                || (productInfoVO.maxCount > 1 ? "" : "mainprodoffer-hidden"),
				                        prodCancelClass : "mainprodoffer-hidden",
				                        serviceKindIndex : serviceKindIndex,
				                        serviceKind : serviceKind,
				                        serviceId : defaultNumber,
				                        actionName : '\u8ba2\u8d2d'
				                        
			                        }, roleInfoVO);
			                
		                }
		                
	                });
	        
        });