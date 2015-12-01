defineModule("orderaccept.prodofferaccept.widget.mainprodofferchange.MainProdOfferChangeWidget", [
                "orderaccept.custom._BaseWidget", "orderaccept.custom._BusCardTemplated", "dijit._Container",
                "orderaccept.prodofferaccept.util",
                "orderaccept.prodofferaccept.widget.mainprodoffer.MainProdOfferFlatWidget"], function(_Widget,
                _Templated, _Container, util, MainProdOfferWidget) {
	        
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
	        dojo.declare("orderaccept.prodofferaccept.widget.mainprodofferchange.MainProdOfferChangeWidget",
	                [MainProdOfferWidget], {
		                
		                /**
						 * 构建视图展现初始化数据,这个方法需要注意的是入口初始化数据从当前应用上下文中取得到userHasProdOfferInfoList数据,
						 * 视图主体数据尽量从$appContext$应用上下文中取
						 * 
						 * @method
						 */
		                buildViewInitData : function() {
			                var initData = this.inherited(arguments);
			                var mainProdOfferInstVO = dojo.global.$appContext$.get("mainProdOfferInstVO");
			                dojo.mixin(initData.prodOfferViewData, {
				                        startDate : mainProdOfferInstVO.effDate,
				                        endDate : mainProdOfferInstVO.expDate,
				                        prodOfferInstId : mainProdOfferInstVO.prodOfferInstId
			                        });
			                initData.prodOfferViewData.actionName = "\u53d8\u66f4";
			                initData.prodOfferViewData.displayStartEndTime = "hidden-elem";
			                return {
				                prodOfferViewData : initData.prodOfferViewData,
				                prodViewData : this.buildProductViewInitData(
				                        initData.prodOfferViewData.prodOfferInfoVO, {
					                        key : 'key'
				                        })
				                
			                }
		                },
		                
		                /**
						 * 根据主销售品构建主产品展现初始化数据
						 * 
						 * @method
						 */
		                buildProductViewInitData : function(mainProdOfferInfoVO, config) {
			                var widget = this,
				                mainProdOfferInstVO = dojo.global.$appContext$.get("mainProdOfferInstVO"),
				                selectedMemberProdOfferList = $ac$.get("selectedMemberProdOfferList"),
				                relaProdInfoList = mainProdOfferInstVO.prodInstList,
				                productTupleList = util.ProdOfferHelper.getProductTupleList(mainProdOfferInfoVO),
				                findProductTuple = function(productId) {
					                return dojo.filter(productTupleList, function(tuple) {
						                        return tuple.offerProdRelaVO.productId == productId;
					                        })[0];
				                },
				                findProdInstVO = function(prodInstId) {
					                return dojo.filter(relaProdInfoList, function(v) {
						                        return v.prodInstId == prodInstId;
					                        })[0];
					                
				                };
			                
			                return dojo.map(selectedMemberProdOfferList || [], function(selectedProdInfo) {
				                        var productTuple = findProductTuple(selectedProdInfo.productId),
					                        prodViewData = widget._buildEachProductViewData(mainProdOfferInfoVO,
					                                productTuple.offerProdRelaVO, productTuple.roleInfoVO),
					                        prodInstVO = findProdInstVO(selectedProdInfo.prodInstId);
				                        // reverse setter
				                        selectedProdInfo.uniqueId = prodViewData.uniqueId;
				                        if(prodInstVO&&!prodViewData.actionName){
				                        	prodViewData.actionName = "\u53d8\u66f4";
				                        }
				                        return dojo.mixin(prodViewData, {
					                                userId : selectedProdInfo.prodInstId,
					                                prodInstId : selectedProdInfo.prodInstId,
					                                serviceId : prodInstVO ? prodInstVO.accNbr : prodViewData.serviceId,
					                                // can't quit old
					                                // user
					                                checkedOption : "CHECKED",
					                                disabledOption : "DISABLED"
				                                });
				                          
			                        });
			                
		                },
		                postCreate : function() {
			                this.inherited(arguments);
			                var productDomList = dojo.query(".main-product-basic", this.domNode);
			                dojo.forEach(dojo._toArray(productDomList), function(dom) {
				                var viewId = dojo.attr(dom, "viewId"),
					                userId = dojo.attr(dom, "userId"),
					                uniqueId = dojo.attr(dom, "uniqueId"),
					                oldOperDom = dojo.query(".serviceOperOld-" + viewId, dom)[0],
					                newOperDom = dojo.query(".serviceOperNew-" + viewId, dom)[0],
					                operDomList = dojo.query("[name=serviceOper-" + viewId + "-" + uniqueId + "]", dom);
				                // 老用户
				                if (userId) {
					                oldOperDom.checked = true;
					                dojo.forEach(operDomList, function(operDom) {
						                        operDom.disabled = true;
					                        });
				                } else {
					                // 新用户
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