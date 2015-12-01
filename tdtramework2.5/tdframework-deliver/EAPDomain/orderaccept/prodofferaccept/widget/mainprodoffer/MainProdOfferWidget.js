defineModule("orderaccept.prodofferaccept.widget.mainprodoffer.MainProdOfferWidget", ["orderaccept.custom._BaseWidget",
                "orderaccept.custom._BusCardTemplated", "dijit._Container", "orderaccept.prodofferaccept.util"],
        function(_Widget, _Templated, _Container, util) {
	        /**
			 * 创建主销售品订购时对应的widget
			 * 
			 * @class
			 * @requires ["dijit._Widget",
			 *           "orderaccept.custom._BusCardTemplated",
			 *           "orderaccept.prodofferaccept.util"]
			 * @module orderaccept.prodofferaccept.widget.mainprodoffer.MainProdOfferWidget
			 * @runtimeDependences $appContext$.prodOfferList
			 */
	        dojo.declare("orderaccept.prodofferaccept.widget.mainprodoffer.MainProdOfferWidget", [_Widget, _Templated,
	                        _Container], {
		                templatePath : dojo.moduleUrl("orderaccept.prodofferaccept.widget.mainprodoffer",
		                        "template/mainProdOfferTpl.html"),
		                postMixInProperties : function() { 
			                this.viewInitData = this.buildViewInitData();
			                loadCssModule("orderaccept.prodofferaccept.widget.mainprodoffer.resources.mainProdOffer");
		                },
		                /**
						 * 构建视图展现初始化数据,这个方法需要注意的是入口初始化数据从当前应用上下文中取得到prodOfferList数据,
						 * 视图主体数据尽量从$appContext$应用上下文中取
						 * 
						 * @method
						 */
		                buildViewInitData : function() {
			                var Me = this,
				                key = 'key',
				                prodOfferList = dojo.global.$appContext$.prodOfferList,
				                mainProdOfferInfoVO = $ac$.get("selectedMainProdOfferInfoVO")
				                        || util.ProdOfferHelper.getMainProdOffer(prodOfferList)[0],
				                requestParam = dojo.global.$appContext$.requestParam,
				                viewId = key + "-" + mainProdOfferInfoVO.parentProdOfferId
				                        + mainProdOfferInfoVO.prodOfferId,
				                actionName = "\u8ba2\u8d2d",
				                productStartDateHtml = util.ProdOfferHelper.toProductStartDateView(mainProdOfferInfoVO,
				                        {
					                        key : 'key'
				                        }),
				                productEndDateHtml = util.ProdOfferHelper.toProductEndDateView(mainProdOfferInfoVO, {
					                        key : 'key'
				                        }),
				                prodOfferDetailFlag = util.ProdOfferHelper.IfShowMainOfferDetail(mainProdOfferInfoVO)
				                        ? '1'
				                        : '0',
				                productDateBuilder = util.ProdOfferHelper.getProductDateBuilder(mainProdOfferInfoVO),
				                startDate = dojo.global.$appContext$.requestParam.today,
				                endDate = !!util.ProdOfferHelper.ifShowEndTime(mainProdOfferInfoVO)
				                        ? productDateBuilder.getEndDate()
				                        : '';
				                productStartDateHtml.style.hiddenStyleOption = " hiddenStyle";
				                var detailNotNull = false;var mainProdOfferInstVO = dojo.global.$appContext$.get("mainProdOfferInstVO");
				                detailNotNull = util.AttrUtil.checkIfNotNull(mainProdOfferInfoVO.attrList); 
				                if(!detailNotNull){
					                detailNotNull = dojo.some(mainProdOfferInfoVO.offerProdRelaList,function(prodRela){
				                						 if(prodRela.productInfoVO.prodFuncType == 
				                						 		ConstantsPool.load("ProductFuncTypeConst").ProductFuncTypeConst.ACCESS){
				                						 	return false;		
		                						 		 }
		                						 		 return util.AttrUtil.checkIfNotNull(prodRela.productInfoVO.attrList);
									                 });
			                 	var mainProdOfferInstVO = dojo.global.$appContext$.get("mainProdOfferInstVO");
			                	detailNotNull = !!mainProdOfferInstVO?false:detailNotNull;
				                }
			                tpContext = {
				                "prodOfferDetailFlag" : prodOfferDetailFlag,
				                "detailNotNull" : detailNotNull?"":"hidden-elem",
						        "finishImg" : !detailNotNull ? "" : "hidden-elem",
				                "productStartDateView" : productStartDateHtml,
				                "productEndDateView" : productEndDateHtml,
				                "viewId" : viewId,
				                "startDate" : startDate,
				                "endDate" : endDate,
				                "actionName" : actionName,
				                "displayStartEndTime" : "",
				                "prodOfferInfoVO" : mainProdOfferInfoVO
			                };
			                return {
				                prodOfferViewData : tpContext,
				                prodViewData : this.buildProductViewInitData(mainProdOfferInfoVO, {
					                        key : key
				                        })
				                
			                }
		                },
		                /**
						 * 根据主销售品构建主产品展现初始化数据
						 * 
						 * @method
						 */
		                buildProductViewInitData : function(mainProdOfferInfoVO, config) {

		                },
		                /**
						 * 新增加一个产品实例视图,这个方法已经过期,因为成员产品选择已经前移到购物车处处理了
						 * 
						 * @deprecated
						 * @method
						 */
		                insertMainProductRow : function(currentUniqueId, cb) {
			                var _widgetInstance = this,
				                serviceInfoTrElem = null,
				                currentRow = dojo.query("[uniqueId=" + currentUniqueId + "]", _widgetInstance.domNode)[0],
				                row = currentRow;
			                while (true) {
				                serviceInfoTrElem = row.nextSibling;
				                if (serviceInfoTrElem && (serviceInfoTrElem.tagName || "").toUpperCase() == 'TR') {
					                break;
				                }
				                row = serviceInfoTrElem;
			                }
			                var loopIndex = 0,
				                selectedNode = -1,
				                viewId = currentRow.getAttribute("viewId"),
				                inputCssSelector = "[name=serviceOper-" + viewId + "-" + currentUniqueId + "]",
				                radioList = dojo.query(inputCssSelector, currentRow),
				                productId = dojo.query("[name=mainProdSel-" + viewId + "]", currentRow)[0].value,
				                productBasicRow = null,
				                fragment = document.createDocumentFragment(),
				                newRadioList = null,
				                _product2ServiceKind = this.productServiceKindMap[productId],
				                serviceKindIndex = _product2ServiceKind ? util.ServiceKindCounter
				                        .get(_product2ServiceKind.serviceKind) : "-1",
				                defaultNumber = !!_product2ServiceKind
				                        ? util.ServiceKindPrefixMap[_product2ServiceKind.serviceKind] + "号码"
				                                + serviceKindIndex
				                        : '',
				                serviceKind = !!_product2ServiceKind ? _product2ServiceKind.serviceKind : '-1',
				                newUniqueId = util.CommUtils.generateUniqueId();
			                dojo.forEach(radioList, function(node) {
				                        if (node.checked) {
					                        selectedNode = loopIndex;
				                        }
				                        loopIndex++;
				                        
			                        });
			                
			                productBasicRow = currentRow.cloneNode(true);
			                dojo.attr(productBasicRow, {
				                        userId : "",
				                        prodInstId : "",
				                        serviceId : ""
			                        });
			                dojo.attr(productBasicRow, "serviceKind", serviceKind + "");
			                dojo.attr(productBasicRow, "serviceKindIndex", serviceKindIndex);
			                dojo.attr(productBasicRow, "uniqueId", newUniqueId);
			                dojo.attr(dojo.query("[name=mainProdSel-" + viewId + "]", productBasicRow)[0], "disabled",
			                        false);
			                dojo.attr(dojo.query("[name=serviceId]", productBasicRow)[0], "value", defaultNumber);
			                fragment.appendChild(productBasicRow);
			                (function() {
				                var _serviceTr = serviceInfoTrElem.cloneNode(false),
					                _td = dojo.query("TD", serviceInfoTrElem)[0].cloneNode(false),
					                _serviceInfo = dojo.query(".mainProdServiceInfo-" + viewId, serviceInfoTrElem)[0]
					                        .cloneNode(false),
					                _attrInfo = dojo.query(".mainProdAttrInfo-" + viewId, serviceInfoTrElem)[0]
					                        .cloneNode(false);
				                _td.appendChild(_serviceInfo);
				                _td.appendChild(_attrInfo);
				                _serviceTr.appendChild(_td);
				                fragment.appendChild(_serviceTr);
				                dojo.place(fragment, serviceInfoTrElem, "after");
				                newRadioList = dojo.query(inputCssSelector, productBasicRow);
				                // fixed same name bug
				                dojo.forEach(newRadioList, function(node) {
					                        dojo.attr(node, "name", "serviceOper-" + viewId + "-" + newUniqueId);
					                        dojo.attr(node, "disabled", false);
					                        
				                        });
				                if (selectedNode != -1) {
					                radioList[selectedNode].checked = true;
					                
				                }
				                // default select prodoffer new accept
				                newRadioList[1].checked = true;
				                _widgetInstance.enableEvtMsgPropagation(productBasicRow);
				                _widgetInstance.enableEvtMsgPropagation(_serviceTr);
				                dojo.style(dojo.query(".addProItem-" + viewId, productBasicRow)[0], {
					                        display : 'none'
				                        });
				                dojo.style(dojo.query(".delProItem-" + viewId, productBasicRow)[0], {
					                        display : ''
				                        });
				                (cb || function() {}).apply(_widgetInstance, [dojo.attr(productBasicRow, "uniqueId"),
				                                productBasicRow, _serviceInfo]);
				                
			                }());
			                
		                },
		                /**
						 * 删除页面上的产品实例视图,这个方法已经过期,因为成员产品选择已经前移到购物车处处理了
						 * 
						 * @deprecated
						 * @method
						 */
		                removeMainProductRow : function(uniqueId, cb) {
			                var serviceTr = null,
				                _widgetInstance = this,
				                tr = dojo.query("[uniqueId=" + uniqueId + "]", _widgetInstance.domNode)[0];
			                while (true) {
				                serviceTr = tr.nextSibling;
				                if (serviceTr && (serviceTr.tagName || "").toUpperCase() == 'TR') {
					                break;
					                
				                }
				                serviceTr = serviceTr.nextSibling;
			                }
			                dojo.destroy(tr);
			                dojo.destroy(serviceTr);
			                (cb || function() {}).apply(_widgetInstance, [uniqueId]);
			                
		                },
		                /**
						 * 级联获取主销售品数据
						 * 
						 * @method
						 */
		                getPageData : function() {
			                var prodOfferList = dojo.global.$appContext$.get("prodOfferList"),
				                prodOfferInfoVO = util.ProdOfferHelper.getMainProdOffer(prodOfferList)[0],
				                requestParam = dojo.global.$appContext$.get("requestParam"),
				                pageInfoData = {},
				                productBasicTrList = dojo.query("tr[uniqueId]",this.domNode),
				                productInfoList = [],
				                exceptionFlag = false,
				                prodOfferInfo = this.getPageStartEndDate(),
				                attrKeyList = ["uniqueId", "viewId", "prodOfferId", "roleCD", "roleNumMax",
				                        "roleNumMin", "parentRoleCD", "productId", "roleName", "serviceKindIndex",
				                        "serviceKind", "userId", "prodInstId"];
			                BusCard.each(productBasicTrList, function(node) {
				                        var basicInfo = {};
				                        // get main product node attr
				                        dojo.forEach(dojo._toArray(node.attributes), function(attr) {
					                                basicInfo[attr.name] = attr.nodeValue;
				                                });
				                        
				                        // fix attrName case problem
				                        dojo.forEach(attrKeyList, function(attrName) {
					                                var value = basicInfo[attrName.toLowerCase()];
					                                if (value != null && attrName != attrName.toLowerCase()) {
						                                try {
							                                delete basicInfo[attrName.toLowerCase()];
							                                basicInfo[attrName] = value;
						                                }
						                                catch (e) {

						                                }
						                                
					                                }
					                                
				                                });
				                        var result = {},
					                        viewId = basicInfo.viewId,
					                        uniqueId = basicInfo.uniqueId,
					                        serviceCardId = "serviceCardWidget_" + uniqueId,					                        
					                        serviceCardWidget = unieap.byId(serviceCardId),
					                        serviceProductWidget = serviceCardWidget.serviceProductWidget,
					                        productChecked = dojo.query("." + viewId, node)[0].checked,
					                        productId = dojo.query("SELECT", node)[0].value,
					                        serviceInfo = productChecked
					                                ? serviceCardWidget.getPageData()
					                                : serviceCardWidget.getPageData(null, null, true),
					                        serviceProductInfo = !!serviceProductWidget
					                        		?serviceProductWidget.getPageData()
					                        		:null;
				                        if (serviceInfo == false) {
					                        exceptionFlag = true;
					                        return false;
				                        }
				                        if (serviceProductInfo === false) {
					                        exceptionFlag = true;
					                        return false;
				                        }
				                        dojo.mixin(basicInfo, {
					                                productChecked : productChecked,
					                                productId : productId
				                                });
				                        dojo.mixin(result, serviceInfo);
				                        dojo.mixin(result, {
					                                'serviceProductInfo' : serviceProductInfo
				                                });				                        
				                        dojo.mixin(result, {
					                                prodBasicInfo : basicInfo
				                                });
				                        
				                        productInfoList.push(result);
				                        
			                        });
			                if (exceptionFlag) {
				                return false;
			                } else {
				                return {
					                prodOfferPageInfo : prodOfferInfo,
					                productInfoList : productInfoList
				                };
				                
			                }
			                
		                },
		                getPageStartEndDate : function() {
			                var mainProdOfferNode = dojo.query(".current-accept-class", this.domNode)[0],
				                delayUnitParentNode = dojo.query(".productStartDateStyle", mainProdOfferNode)[0],
				                delayUnitNode = dojo.query(".delayUnit-class", mainProdOfferNode)[0],
				                effectParentNode = dojo.query(".productEndDateStyle", mainProdOfferNode)[0],
				                effectCycleParentNode = dojo.query(".offerEndDateCycleStyle", mainProdOfferNode)[0],
				                effectNode = dojo.query(".effect-class", mainProdOfferNode)[0],
				                effectTypeNode = dojo.query(".effectType-class", mainProdOfferNode)[0],
				                cyclePeriodNode = dojo.query(".cycle-effect-class", mainProdOfferNode)[0],
				                startDate = dojo.trim(dojo.query(".startDate-class", mainProdOfferNode)[0].innerHTML),
				                endDate = dojo.trim(dojo.query(".endDate-class", mainProdOfferNode)[0].innerHTML),
				                result = {};
			                if (startDate) {
				                result.startDate = startDate;
			                }
			                if (endDate) {
				                result.endDate = endDate;
			                }
			                if (delayUnitParentNode && delayUnitParentNode.style.display != "none") {
				                if (delayUnitNode) {
					                result.delayUnit = delayUnitNode.value;
				                }
			                }
			                if (effectParentNode && effectParentNode.style.display != 'none') {
				                
				                if (effectNode) {
					                result.validPeriod = effectNode.value;
				                }
				                if (effectTypeNode) {
					                result.validType = effectTypeNode.value;
					                
				                }
				                
			                } else if (effectCycleParentNode && effectCycleParentNode.style.display != 'none') {
				                var cycleResult = cyclePeriodNode.value.split("~");;
				                result.validPeriod = cycleResult[0];
				                result.validType = cycleResult[1];
			                }
			                dojo.mixin(result, {
				                        prodOfferId : dojo.attr(mainProdOfferNode, "prodOfferId")
			                        });
			                
			                return result;
		                }
		                
	                });
	        
        });