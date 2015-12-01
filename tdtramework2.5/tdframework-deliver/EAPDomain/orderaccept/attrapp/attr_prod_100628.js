/**
 * 
 * 将"收费地"的属性配置BB_ATTR_USE_CONFIG_T表中，当此属性所选的值为"第三方收费"时，页面才展现"收款省份"
 * "收款单位"属性，否则不展现。
 * 
 * 
 * "结算省份", "收款省份"：SELECT DISP_VIEW,USED_VIEW FROM BS_PARAM_VALUE_T
 * WHERE TABLE_NAME =UPPER('BB_ONESTOP_USER_T') AND
 * COLUMN_NAME=UPPER('BALANCE_SIDE') AND (IF_VALID=1 OR USED_VIEW=1)
 * ORDER BY DISP_ORDER "结算城市","收款单位"：select city_code,city_name from
 * bs_indb_city_code_t where prov_id=? order by city_code。
 * 
 * ddn产品收费地属性处理
 */
BusCard.define('/orderaccept/attrapp/attr_prod_100628.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch = function() {
		        // 只处理DDN产品
		        var widget = dijit.getEnclosingWidget(this.dom),
			        productInfoVO = widget.productInfoVO,
			        unshiftNullSelectOption = function(list) {
				        return [{
					                name : '\u8bf7\u9009\u62e9',
					                id : '',
					                ids : ''
				                }].concat(list || []);
			        };
		        try {
			        if (productInfoVO.netType != 54) { return false; }
		        }
		        catch (e) {}
		        var card = this,
			        attrCd = "100628",
			        targetNode = card.$(attrCd),
			        hiddenAttrCdList = ["100634",// 收款省份
			                "100633"// 收款单位
			        ],
			        getAttrVO = function(attrCd) {
				        return dojo.filter(productInfoVO.attrList, function(attrVO) {
					                return attrVO.attrCd == attrCd;
				                })[0];
			        },
			        getProdInstVO = function() {
				        var userId = card.getParent().getCardRelationInfo().userId;
				        if (userId && userId != 0) {
					        var list = BusCard.jsonPath($ac$.get("mainProdOfferInstVO"),
					                "$.prodInstList[?(@.prodInstId==" + userId + ")]");
					        return list && list[0];
				        }
			        };
		        targetNode && function() {
			        var resetInitValue = function() {
				        dojo.forEach(hiddenAttrCdList, function(attrCd) {
					                card.$(attrCd) && (card.$(attrCd).value = "");
					                
				                });
				        var _cityCodeElem = card.$("100633");
				        BusCard.$rs(_cityCodeElem, unshiftNullSelectOption([]), true);
			        };
			        
			        targetNode.onchange = function() {
				        var node = this,
					        value = this.value;
				        // 第三方收费
				        if (value == '3') {
					        dojo.forEach(hiddenAttrCdList, function(attrCd) {
						                card.display(attrCd);
					                });
				        } else {
					        dojo.forEach(hiddenAttrCdList, function(attrCd) {
						                card.hidden(attrCd);
						                resetInitValue();
					                });
				        }
			        };
		        }();
		        BusCard.dispatchEvent(targetNode, "change");
		        // 处理
		        // 结算省份[100629],结算城市[100630],收款省份[100634],收款单位[100633]
		        var provinceNode = card.$("100634");
		        var cityCodeNode = card.$("100633");
		        provinceNode && function() {
			        if (!BusCard.cache.provinceParamCollection) {
				        BusCard.cache.provinceParamCollection = BusCard.$remote("serviceParamDAO").getParamValue(
				                "BB_ONESTOP_USER_T", "BALANCE_SIDE");
			        }
			        BusCard
			                .$rs(provinceNode, unshiftNullSelectOption(BusCard.cache.provinceParamCollection.list),
			                        true);
			        // render default value
			        var specAttrVO = getAttrVO("100634");
			        if (specAttrVO && specAttrVO.defaultValue != null) {
				        provinceNode.value = specAttrVO.defaultValue;
			        }
			        provinceNode.onchange = function() {
				        var value = this.value;
				        if (cityCodeNode && value) {
					        var cityCodeList = BusCard.$remote("customerParamDAO").getIndbCity(value).list;
					        BusCard.$rs(cityCodeNode, unshiftNullSelectOption(cityCodeList), true);
				        } else if (cityCodeNode) {
					        BusCard.$rs(cityCodeNode, unshiftNullSelectOption([]), true);
				        }
			        };
			        BusCard.dispatchEvent(provinceNode, "change");
			        // render default value
			        var specCityAttrVO = getAttrVO("100633");
			        if (specCityAttrVO && specCityAttrVO.defaultValue != null) {
				        cityCodeNode.value = specCityAttrVO.defaultValue;
			        }
		        }();
		        // 变更时特殊处理
		        !function() {
			        try {
				        var prodInstVO = getProdInstVO(),
					        getProdInstAttrVO = function(cd) {
						        if (prodInstVO) { return BusCard.jsonPath(prodInstVO.prodInstAttrList || [],
						                "$[?(@.attrCd==" + cd + ")]")[0]; }
					        };
				        var targetAttrInstVO = getProdInstAttrVO(attrCd),
					        provinceAttrInstVO = getProdInstAttrVO("100634"),
					        cityCodeAttrInstVO = getProdInstAttrVO("100633");
				        if (targetAttrInstVO && targetNode) {
					        targetNode.value = targetAttrInstVO.attrValue;
					        BusCard.dispatchEvent(targetNode, "change");
				        }
				        if (provinceAttrInstVO && provinceNode) {
					        provinceNode.value = provinceAttrInstVO.attrValue;
					        BusCard.dispatchEvent(provinceNode, "change");
					        if (cityCodeNode && cityCodeAttrInstVO) {
						        cityCodeNode.value = cityCodeAttrInstVO.attrValue;
					        }
				        }
			        }
			        catch (e) {
				        BusCard.showErrorStack(e);
			        }
			        
		        }();
		        
		        // 改单时特殊处理
		        !function() {
			        if (window.$ac$ && window.$ac$.get("orderChangeFlag")) {
				        var controller = window.prodOfferAcceptLoader;
				        //目前断定存在接入类产品的服务信息
				        var orderItemId = card.getParent().getCardRelationInfo().orderItemId;
				        var prodInstAttrList = controller.custOrderVOHelper.filterOrderItemList(function(item) {
					                return item.orderItemId == orderItemId;
				                })[0].prodInstAttrList || [];
				        var handle = function(attrCd) {
					        var specVO = getAttrVO(attrCd);
					        var instAttrVO = prodInstAttrList.find(function(i) {
						                return i.attrId == specVO.attrId
					                });
					        var node = card.$(attrCd + "");
					        instAttrVO && node && (node.value = instAttrVO.attrValue)
					                && BusCard.dispatchEvent(node, "change");
				        };
				        handle("100628");
				        handle("100634");
				        handle("100633");
			        }
			        
		        }();
	        };
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	        /**
			 * 综合查询页面处理分支
			 * 
			 * @method
			 */
	        var allInfoQueryPageDispatch = function() {};
	        /**
			 * 二次业务处理分支
			 * 
			 * @method
			 */
	        var secondBusinessPageDispatch = function() {
		        // 只处理DDN产品
		        var widget = dijit.getEnclosingWidget(this.dom),
			        productInfoVO = widget.productInfoVO,
			        unshiftNullSelectOption = function(list) {
				        return [{
					                name : '\u8bf7\u9009\u62e9',
					                id : '',
					                ids : ''
				                }].concat(list || []);
			        };
		        try {
			        if (productInfoVO.netType != 54) { return false; }
		        }
		        catch (e) {}
		        var card = this,
			        attrCd = "100628",
			        targetNode = card.$(attrCd),
			        hiddenAttrCdList = ["100634",// 收款省份
			                "100633"// 收款单位
			        ],
			        getAttrVO = function(attrCd) {
				        return dojo.filter(productInfoVO.attrList, function(attrVO) {
					                return attrVO.attrCd == attrCd;
				                })[0];
			        },
			        getProdInstVO = function() {
				        return widget.prodInstVO;
			        };
		        targetNode && function() {
			        var resetInitValue = function() {
				        dojo.forEach(hiddenAttrCdList, function(attrCd) {
					                card.$(attrCd) && (card.$(attrCd).value = "");
					                
				                });
				        var _cityCodeElem = card.$("100633");
				        BusCard.$rs(_cityCodeElem, unshiftNullSelectOption([]), true);
			        };
			        
			        targetNode.onchange = function() {
				        var node = this,
					        value = this.value;
				        // 第三方收费
				        if (value == '3') {
					        dojo.forEach(hiddenAttrCdList, function(attrCd) {
						                card.display(attrCd);
					                });
				        } else {
					        dojo.forEach(hiddenAttrCdList, function(attrCd) {
						                card.hidden(attrCd);
						                resetInitValue();
					                });
				        }
			        };
		        }();
		        targetNode.onchange();
		        // 处理
		        // 结算省份[100629],结算城市[100630],收款省份[100634],收款单位[100633]
		        var provinceNode = card.$("100634");
		        var cityCodeNode = card.$("100633");
		        provinceNode && function() {
			        if (!BusCard.cache.provinceParamCollection) {
				        BusCard.cache.provinceParamCollection = BusCard.$remote("serviceParamDAO").getParamValue(
				                "BB_ONESTOP_USER_T", "BALANCE_SIDE");
			        }
			        BusCard
			                .$rs(provinceNode, unshiftNullSelectOption(BusCard.cache.provinceParamCollection.list),
			                        true);
			        // render default value
			        var specAttrVO = getAttrVO("100634");
			        if (specAttrVO && specAttrVO.defaultValue != null) {
				        provinceNode.value = specAttrVO.defaultValue;
			        }
			        provinceNode.onchange = function() {
				        var value = this.value;
				        if (cityCodeNode && value) {
					        var cityCodeList = BusCard.$remote("customerParamDAO").getIndbCity(value).list;
					        BusCard.$rs(cityCodeNode, unshiftNullSelectOption(cityCodeList), true);
				        } else if (cityCodeNode) {
					        BusCard.$rs(cityCodeNode, unshiftNullSelectOption([]), true);
				        }
			        };
			        provinceNode.onchange();
			        // render default value
			        var specCityAttrVO = getAttrVO("100633");
			        if (specCityAttrVO && specCityAttrVO.defaultValue != null) {
				        cityCodeNode.value = specCityAttrVO.defaultValue;
			        }
		        }();
		        // 变更时特殊处理
		        try {
			        var prodInstVO = getProdInstVO(),
				        getProdInstAttrVO = function(cd) {
					        if (prodInstVO) {
						        var prodInstAttrList = prodInstVO.prodInstAttrList;
						        var instVO = prodInstAttrList.find(function(inst) {
							                return inst.attrId == cd;
						                });
						        return instVO;
					        }
				        };
			        var targetAttrInstVO = getProdInstAttrVO(attrCd),
				        provinceAttrInstVO = getProdInstAttrVO("100634"),
				        cityCodeAttrInstVO = getProdInstAttrVO("100633");
			        if (targetAttrInstVO && targetNode) {
				        targetNode.value = targetAttrInstVO.attrValue;
				        targetNode.onchange();
			        }
			        if (provinceAttrInstVO && provinceNode) {
				        provinceNode.value = provinceAttrInstVO.attrValue;
				        provinceNode.onchange();
				        if (cityCodeNode && cityCodeAttrInstVO) {
					        cityCodeNode.value = cityCodeAttrInstVO.attrValue;
				        }
			        }
		        }
		        catch (e) {
			        BusCard.showErrorStack(e);
		        }
		        
	        };
	        /**
			 * 批量页面处理分支
			 * 
			 * @method
			 */
	        var batchPageDispatch = function() {};
	        
	        // 调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
        });
