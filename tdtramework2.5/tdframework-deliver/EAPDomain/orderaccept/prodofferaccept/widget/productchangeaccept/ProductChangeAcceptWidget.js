defineModule("orderaccept.prodofferaccept.widget.productchangeaccept.ProductChangeAcceptWidget", [
                "../mainprodoffer/MainProdOfferFlatWidget", "../../util"], function(
                MainProdOfferFlatWidget, util) {
	        var mm = "orderaccept.prodofferaccept.widget.productchangeaccept.ProductChangeAcceptWidget";
	        /**
			 * 定义主销售品变更控件类ProdChangeAcceptWidget
			 * 
			 * @method
			 */
	        dojo.declare(mm, [MainProdOfferFlatWidget], {
		        
		        delayCreateBeforeBindModel : true,
		        templatePath : dojo.moduleUrl(
		                "orderaccept.prodofferaccept.widget.productchangeaccept",
		                "template/productChangeAcceptTpl.html"),
                postMixInProperties : function() {     
                	var widget = this;
                    widget.prodOfferInstId = $ac$.get("requestParam").prodOfferInstId,
			        widget.mainProdOfferInstVO = $ac$
		                .query("$.userHasProdOfferInfoList[?(@.prodOfferInstId=="
		                        + widget.prodOfferInstId + ")]")[0],
		        	widget.prodOfferInfoVO = $ac$
		                .query("$.userHasProdOfferMetaInfoList[?(@.prodOfferId=="
		                        + widget.mainProdOfferInstVO.prodOfferId + ")]")[0],
	                widget.inherited(arguments);
	                
                },
		        /**
				 * 主销售变更时,需要把退订的销售品和退订产品一起计算出来
				 * 
				 * @method
				 */
		        buildViewInitData : function() {
			        var widget = this,
			        	Me = this;
	                this.modelData = this.getModel();
	                this.notChgMain = this.modelData.notChgMain;
	                this.roleList = [];
		        	var key = 'key',
		                prodOfferList = dojo.global.$appContext$.prodOfferList,
		                mainProdOfferInfoVO = util.ProdOfferHelper
		                        .getMainProdOffer(prodOfferList)[0],
		                requestParam = dojo.global.$appContext$.requestParam,
		                viewId = key + "-" + mainProdOfferInfoVO.parentProdOfferId
		                        + mainProdOfferInfoVO.prodOfferId,
		                actionName = !!this.notChgMain?"\u53d8\u66f4":"\u8ba2\u8d2d",
		                prodOfferDetailFlag = util.ProdOfferHelper
		                        .IfShowMainOfferDetail(mainProdOfferInfoVO) ? '1' : '0',
		                productStartDateHtml = util.ProdOfferHelper.toProductStartDateView(
		                        mainProdOfferInfoVO, {
			                        key : 'key'
		                        }),
		                productEndDateHtml = util.ProdOfferHelper.toProductEndDateView(
		                        mainProdOfferInfoVO, {
			                        key : 'key'
		                        }),
		                productDateBuilder = util.ProdOfferHelper.getProductDateBuilder(
			                widget.prodOfferInfoVO, {
				                beginDate : widget.mainProdOfferInstVO.effDate,
				                endDate : widget.mainProdOfferInstVO.expDate,
				                changeKind : 2
			                }),
		                startDate = widget.mainProdOfferInstVO.effDate,
		                endDate = productDateBuilder.getEndDate();
		                
                    productStartDateHtml.style.hiddenStyleOption = " hiddenStyle";
                    productEndDateHtml.style.hiddenStyleOption = " hiddenStyle";     
                    productEndDateHtml.style.cycleStyleOption = " hiddenStyle";                
	                var tpContext = {
			                "prodOfferDetailFlag" : prodOfferDetailFlag,
			                "productStartDateView" : productStartDateHtml,
			                "productEndDateView" : productEndDateHtml,
			                "viewId" : viewId,
			                "startDate" : startDate,
			                "endDate" : endDate,
			                "actionName" : actionName,
			                "displayStartEndTime" : "",
			                "prodOfferInfoVO" : mainProdOfferInfoVO
		                },
		                data ={
				                prodOfferViewData : tpContext,
				                prodViewData : this.buildProductViewInitData(mainProdOfferInfoVO, {key:key})			                
		               		 };
			        if(!this.notChgMain){
			        	quitInfo = this.buildQuitProdOfferViewInitData();
				        // attach prodoffer quit infomation
				        data.quitProdOfferInfoList = quitInfo ? [quitInfo] : [];
			        }
			        return data;
		        },
		        buildProductViewInitData : function(mainProdOfferInfoVO, config) {
	                var widget = this,
		                protoConcat = Array.prototype.concat,
		                key = this.key = config.key,		
				        relaProdInfoList = widget.mainProdOfferInstVO.prodInstList,
		                roleInfo = dojo.forEach(mainProdOfferInfoVO.offerProdRelaList || [], function(
			                                prodRela) {
				                        if(!!prodRela.roleInfoVO){
				                    		if(!widget.roleList[prodRela.roleInfoVO.roleCD]){
				                    			widget.roleList[prodRela.roleInfoVO.roleCD] = [];	
				                    		}
				                    		widget.roleList[prodRela.roleInfoVO.roleCD].push(prodRela);
				                        }
			                        }),
			            offerProdRelaList = !!widget.notChgMain?
			            					dojo.filter(mainProdOfferInfoVO.offerProdRelaList,function(prodInfo){
								            	return !!dojo.filter(relaProdInfoList,function(prod){			            		
										            		return prodInfo.productInfoVO.productId == prod.prodId;
										            	})[0];
								            }):
								            mainProdOfferInfoVO.offerProdRelaList,
		                productViewInitData = dojo.map(
		                        offerProdRelaList || [], function(
		                                prodRela) {
			                        return widget._buildEachProductViewData(
			                                mainProdOfferInfoVO, prodRela,
			                                prodRela.roleInfoVO);
		                        }),	                
	                	productViewInitData = [].concat(this.buildMemberProdOfferInitData(
				                                mainProdOfferInfoVO, config)
				                                || productViewInitData),
				        keepMainProdInstList = dojo.global.$appContext$.get("keepMainProdInstList")
				                || [],
				        getIndex = function(arr, item) {
					        var defaultIndex = -1,
						        arr = arr || [],
						        len = arr.length;
					        for (var index = 0; index < len; index++) {
						        if (arr[index] === item) { return index; }
					        }
					        return defaultIndex;
					        
				        };
			        // TODO 没有进行产品数量匹配检测 待改进
			        dojo.forEach(keepMainProdInstList, function(instVO) {
				                // 查找匹配的在新的销售品下的产品视图初始化数据
				                var mpvd = BusCard.find(productViewInitData, function(data) {
					                        return data.productId == instVO.prodId;
					                        
				                        });
				                // 如果已经被匹配过
				                if (mpvd.prodInstId && mpvd.serviceId) {
					                var cvd = dojo.clone(mpvd),
						                defaultIndex = getIndex(productViewInitData, mpvd);
					                dojo.mixin(cvd, instVO);
					                cvd.uniqueId = util.CommUtils.generateUniqueId();
					                cvd.prodOperClass = "mainprodoffer-hidden";
					                cvd.checkedOption = "CHECKED";
					                cvd.disabledOption = "DISABLED";
					                productViewInitData.splice(defaultIndex + 1, 0, cvd);
					                
				                } else {
					                dojo.mixin(mpvd, instVO);
					                mpvd.checkedOption = "CHECKED";
					                mpvd.disabledOption = "DISABLED";
					                
				                }
				                
			                });
			        
			        return productViewInitData;
			        
		        },
		        /**
				 * 构建退订的主销售信息
				 * 
				 * @method
				 */
		        buildQuitProdOfferViewInitData : function() {
		        	var widget = this;
			        if (widget.mainProdOfferInstVO) {
				        var mainProdOfferInstVO = widget.mainProdOfferInstVO,
				        	prodOfferInfoVO = widget.prodOfferInfoVO,
					        Me = this,
					        key = this.key,
					        viewId = key + "-" + prodOfferInfoVO.parentProdOfferId
					                + prodOfferInfoVO.prodOfferId,
					        actionName = "\u9000\u8ba2",
					        productDateBuilder = util.ProdOfferHelper.getProductDateBuilder(
					                prodOfferInfoVO, {
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
					        "prodOfferInfoVO" : prodOfferInfoVO
				        };
				        return {
					        prodOfferViewData : tpContext,
					        // 经过讨论,主产品变更不处理退订的产品,检测部分需要
					        // 检测,变更后的销售品产品上要和老的销售品完全匹配
					        prodViewData : []
					                || this.buildQuitProductViewInitData(prodOfferInfoVO,
					                        mainProdOfferInstVO, {
						                        key : key
					                        })
					        
				        }
				        
			        }
			        
		        },
		        buildQuitProductViewInitData : function(prodOfferInfoVO, prodOfferInstVO, config) {
			        var cancelMainProdInstList = $ac$.get("cancelMainProdInstList") || [],
				        widget = this;
			        return dojo.map(cancelMainProdInstList, function(instVO) {
				                var offerProdRela = BusCard.jsonPath(prodOfferInfoVO,
				                        "$.offerProdRelaList[?(@.productId==" + instVO.prodId
				                                + ")]")[0];
				                _data = widget._buildEachProductViewData(prodOfferInfoVO,
				                        offerProdRela, offerProdRela.roleInfoVO);
				                return dojo.mixin(_data, {
					                        userId : instVO.prodInstId,
					                        prodInstId : instVO.prodInstId,
					                        serviceId : instVO.serviceId,
					                        defaultNumber : instVO.serviceId,
					                        disabledOption : "DISABLED"
					                        
				                        });
				                
			                });
			        
		        },
		        postCreate : function() {
			        this.inherited(arguments);
			        var productDomList = dojo.query(".main-product-basic", this.domNode);
			        dojo.forEach(dojo._toArray(productDomList), function(dom) {
				        if (!(dojo.attr(dom, "prodInstId") && dojo.attr(dom, "serviceId"))) { return; }
				        var viewId = dojo.attr(dom, "viewId"),
				        	uniqueId = dojo.attr(dom, "uniqueId"),
					        oldOperDom = dojo.query(".serviceOperOld-" + viewId, dom)[0],
					        operDomList = dojo.query("[name=serviceOper-" + viewId +"-"+uniqueId+ "]", dom);
				        oldOperDom.checked = true;
				        dojo.forEach(operDomList, function(operDom) {
					                operDom.disabled = true;
				                });
				        
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
                _buildEachProductViewData : function(mainProdOfferInfoVO, prodRela,
                        roleInfoVO) {
	                this.productServiceKindMap = this.productServiceKindMap || {};
	                var productInfoVO = prodRela.productInfoVO,
		                productServiceKindMap = this.productServiceKindMap,
		                productOptionTp = BusCard.Template
		                        .create("<option isDefault = '#{isDefault}' value ='#{productId}'>#{productName}</option>"),
		                getEachOption = function(prodRela) {
			                return productOptionTp.apply({
				                        isDefault :	prodRela.ifHasInst!=null && typeof(prodRela.ifHasInst) != "undefined"  ?
			                        					prodRela.ifHasInst:prodRela.isDefault,
				                        productName : prodRela.productInfoVO.productName,
				                        productId : prodRela.productInfoVO.productId
			                        });
		                };
	                var optionList = "";
	                if(!!roleInfoVO){
	                	dojo.forEach(this.roleList[roleInfoVO.roleCD],function(prodInfo){
	                		prodRela.ifHasInst = (prodRela == prodInfo?true:false);
                			optionList+=getEachOption(prodInfo);
	                	});
	                }else{
	                	optionList = getEachOption(prodRela);
	                }
	                if (!productServiceKindMap[prodRela.productId]
	                        && prodRela.productInfoVO.prodFuncType == util.ProductFuncTypeConst.ACCESS) {
		                productServiceKindMap[prodRela.productId] = {
			                serviceKind : productInfoVO.netType
		                };
	                }
	                var _product2ServiceKind = productServiceKindMap[prodRela.productId
	                        .toString()];
	                var serviceKindIndex = _product2ServiceKind ? util.ServiceKindCounter
	                        .get(_product2ServiceKind.serviceKind) : "-1";
	                var defaultNumber = !!_product2ServiceKind
	                        ? util.ServiceKindPrefixMap[_product2ServiceKind.serviceKind]
	                                + "号码" + serviceKindIndex
	                        : '';
	                var serviceKind = !!_product2ServiceKind
	                        ? _product2ServiceKind.serviceKind
	                        : '-1';
	                return dojo.mixin({
		                        uniqueId : util.CommUtils.generateUniqueId(),
		                        roleName : roleInfoVO ? roleInfoVO.roleName : '无角色',
		                        viewId : this.key + "-product-" + productInfoVO.productId,
		                        optionList : optionList,
		                        prodRela : prodRela,
		                        checkedOption : prodRela.ifDefault == 1 ? "CHECKED" : "",
		                        disabledOption : (!roleInfoVO && productInfoVO.minCount) > 0
		                                ? "DISABLED"
		                                : "",
		                        webPath : BusCard.path.contextPath,
		                        data : {},
		                        newCheckedOption : "CHECKED",
		                        prodOfferId : mainProdOfferInfoVO.prodOfferId,
		                        productId : productInfoVO.productId,
		                        maxCount : productInfoVO.maxCount,
		                        minCount : productInfoVO.minCount,
		                        prodOperClass : productInfoVO.maxCount > 1
		                                ? ""
		                                : "mainprodoffer-hidden",
		                        prodCancelClass : "mainprodoffer-hidden",
		                        serviceKindIndex : serviceKindIndex,
		                        serviceKind : serviceKind,
		                        serviceId : defaultNumber
		                        
	                        }, roleInfoVO);
	                
                }
	        });
	        
        });