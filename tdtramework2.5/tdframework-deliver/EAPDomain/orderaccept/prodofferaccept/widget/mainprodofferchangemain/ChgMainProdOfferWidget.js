defineModule("orderaccept.prodofferaccept.widget.mainprodofferchangemain.ChgMainProdOfferWidget", [
                "../mainprodoffer/MainProdOfferFlatWidget", "../../util"], function(MainProdOfferFlatWidget, util) {
	        var mm = "orderaccept.prodofferaccept.widget.mainprodofferchangemain.ChgMainProdOfferWidget";
	        /**
			 * 定义主销售品变更控件类ChgMainProdOfferWidget
			 * 
			 * @method
			 */
	        dojo.declare(mm, [MainProdOfferFlatWidget], {
		        
		        templatePath : dojo.moduleUrl("orderaccept.prodofferaccept.widget.mainprodoffer",
		                "template/mainProdOfferTpl.html"),
		        /**
				 * 主销售变更时,需要把退订的销售品和退订产品一起计算出来
				 * 
				 * @method
				 */
		        buildViewInitData : function() {
			        var data = this.inherited(arguments);
			        //销售品的开始时间的特殊处理
			        this.dealNewMainProdOfferBEGTIME(data);
			        // 变更主销售品时，针对协议销售品，则进行特殊处理
			        this.dealOfferStandardTime(data);
			        quitInfo = this.buildQuitProdOfferViewInitData();
			        // attach prodoffer quit infomation
			        data.quitProdOfferInfoList = quitInfo ? (dojo.isArrayLike(quitInfo) ? quitInfo : [quitInfo]) : [];
			        return data;
		        },
		        buildProductViewInitData : function(mainProdOfferInfoVO, config) {
			        var productViewInitData = this.inherited(arguments),
				        widget = this,
				        selectedMemberProdOfferList = $ac$.get("selectedMemberProdOfferList");
			        dojo.forEach(productViewInitData, function(viewData) {
				                var uniqueId = viewData.uniqueId,
					                acceptData = BusCard.jsonPath(selectedMemberProdOfferList, "$[?(@.uniqueId=="
					                                + uniqueId + ")]")[0];
				                viewData.action = acceptData.action;
				                if (acceptData && acceptData.prodInstId) {
					                viewData.userId = acceptData.prodInstId;
					                viewData.serviceId = acceptData.prodInstVO.accNbr;
					                viewData.prodInstId = acceptData.prodInstId;
					                viewData.actionName = widget.actionNameMap[acceptData.action];
				                } else {
					                viewData.actionName = widget.actionNameMap["new"];
				                }
				                
			                });
			        return productViewInitData;
			        
		        },
		        isNeedQuitOldMainProdOffer : function() {
			        var mainProdOfferInstVO = $ac$.get("mainProdOfferInstVO");
			        return dojo.filter($ac$.get("selectedMemberProdOfferList"), function(s) {
				                return s.prodOfferId == mainProdOfferInstVO.prodOfferId;
			                }).length == 0;
		        },
		        /**
				 * 单->单 退订的套餐处理
				 * 
				 * @method
				 */
		        single2singleMPOQuitPostHandling : function() {
			        return this._commMPOQuitPostHandling();
		        },
		        /**
				 * 单->共享版套餐 退订的套餐处理
				 * 
				 * @method
				 */
		        single2combMPOQuitPostHandling : function() {
			        return this._commMPOQuitPostHandling();
		        },
		        /**
				 * 单->自主版套餐 退订的套餐处理
				 * 
				 * @method
				 */
		        single2independenceMPOQuitPostHandling : function() {
			        return this._commMPOQuitPostHandling();
		        },
		        /**
				 * 自主->自主 退订的套餐处理
				 * 
				 * @method
				 */
		        independence2independenceMPOQuitPostHandling : function() {
			        var quitOldIndependenceList = this._commMPOQuitPostHandling(),
				        selectedMemberProdOfferList = $ac$.get("selectedMemberProdOfferList"),
				        // 退订的产品
				        quitMemberInfo = dojo.filter(selectedMemberProdOfferList, function(vo) {
					                return vo.action == "quit";
				                }),
				        changeMemberInfo = dojo.filter(selectedMemberProdOfferList, function(vo) {
					                return vo.action == 'change'
					                        || (vo.action == 'split' && vo.offerInstVO.prodOfferId != vo.prodOfferId);
					                
				                }),
				        
				        widget = this;
			        var _tempList = dojo.map([].concat(changeMemberInfo).concat(quitMemberInfo), function(v) {
				                return widget._buildMemberQuitInfo(v.offerInstVO);
			                });
			        return [].concat(quitOldIndependenceList).concat(_tempList);
			        
		        },
		        _buildMemberQuitInfo : function(mainProdOfferInstVO) {
			        var Me = this,
				        prodOfferInfoVO = util.ProdOfferHelper.loadAndSetProdOffer(mainProdOfferInstVO.prodOfferId, {
					                interfaceType : 1,
					                permitCache : false
				                }),
				        key = this.key,
				        viewId = key + "-" + prodOfferInfoVO.parentProdOfferId + prodOfferInfoVO.prodOfferId,
				        actionName = "\u9000\u8ba2",
				        productDateBuilder = util.ProdOfferHelper.getProductDateBuilder(prodOfferInfoVO, {
					                beginDate : mainProdOfferInstVO.effDate,
					                endDate : mainProdOfferInstVO.expDate,
					                changeKind : 3
				                }),
				        startDate = util.DateHelper.format(mainProdOfferInstVO.effDate),
				        endDate=this.getQuitMainOfferEffDate(mainProdOfferInstVO,productDateBuilder);
			        tpContext = {
				        "prodOfferInstId" : mainProdOfferInstVO.prodOfferInstId,
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
				        prodViewData : []
			        };
			        
		        },
		        /**
		         * 获取
		         * */
		        getQuitMainOfferEffDate : function(mainProdOfferInstVO,productDateBuilder){
			        var endDate = util.DateHelper.format(productDateBuilder.getEndDate());
			        //特殊处理 退订的销售品的结束时间
			        endDate = util.DateHelper.getStringFirstDayOFNextMonth();
			        //宽带标准化套餐重新设置值
			        if ($ac$.get("offerStandardStartDate_"+mainProdOfferInstVO.prodOfferInstId)){
			        	endDate = $ac$.get("offerStandardStartDate_"+mainProdOfferInstVO.prodOfferInstId).oldOfferEndDate;
			        }else{
			        	//传入销售品实例
						util.ProdOfferInstProvider.getBeginAndEndDateForAgreeMentLN(mainProdOfferInstVO);
						if ($ac$.get("offerStandardStartDate_"+mainProdOfferInstVO.prodOfferInstId)){
							endDate = $ac$.get("offerStandardStartDate_"+mainProdOfferInstVO.prodOfferInstId).oldOfferEndDate;
						}
			        }
			        return endDate;
		        },
		        _commMPOQuitPostHandling : function() {
			        var mainProdOfferInstVO = $ac$.get("mainProdOfferInstVO");
			        if (!this.isNeedQuitOldMainProdOffer()) { return; }
			        if (mainProdOfferInstVO) { return this._buildMemberQuitInfo(mainProdOfferInstVO); }
			        
		        },
		        /**
				 * 构建退订的主销售信息
				 * 
				 * @method
				 */
		        buildQuitProdOfferViewInitData : function() {
			        return this[$ac$.get("processId") + "MPOQuitPostHandling"].apply(this, arguments);
		        },
		        buildQuitProductViewInitData : function(prodOfferInfoVO, prodOfferInstVO, config) {
			        var cancelMainProdInstList = $ac$.get("cancelMainProdInstList") || [],
				        widget = this;
			        return dojo.map(cancelMainProdInstList, function(instVO) {
				                var offerProdRela = BusCard.jsonPath(prodOfferInfoVO,
				                        "$.offerProdRelaList[?(@.productId==" + instVO.prodId + ")]")[0];
				                _data = widget._buildEachProductViewData(prodOfferInfoVO, offerProdRela,
				                        offerProdRela.roleInfoVO);
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
					                operDomList = dojo.query("[name=serviceOper-" + viewId + "-" + uniqueId + "]", dom);
				                oldOperDom.checked = true;
				                dojo.forEach(operDomList, function(operDom) {
					                        operDom.disabled = true;
				                        });
				                
			                });
			        
		        },
		        dealOfferStandardTime : function(data) {
			        if ($ac$.currentProcessId == "single2single") {
			        	var mainProdOfferInstVO = $ac$.mainProdOfferInstVO;
			        	var targetDate = util.DateHelper.getStringFirstDayOFNextMonth();
			        	$ac$.set("offerStandardStartDate_"+mainProdOfferInstVO.prodOfferInstId,{
			        				beginDate : targetDate,
			        				oldOfferEndDate : targetDate
			        			});
				        util.ProdOfferInstProvider.getBeginAndEndDateForAgreeMentLN($ac$.get("mainProdOfferInstVO"));
				        if ($ac$.get("offerStandardStartDate_"+mainProdOfferInstVO.prodOfferInstId)) {
					        if (data.prodOfferViewData.productStartDateView) {
						        data.prodOfferViewData.productStartDateView.style.hiddenStyleOption = " hiddenStyle"
					        }
					        dojo.mixin(data.prodOfferViewData, {
						                startDate : this.getDealOfferStandardTimeStartDate(mainProdOfferInstVO)
					                });
				        }
			        }
			        
		        },
		        getDealOfferStandardTimeStartDate :function(mainProdOfferInstVO){
		        	return $ac$.get("offerStandardStartDate_"+mainProdOfferInstVO.prodOfferInstId).beginDate;
		        },
		        /**
		         * 变更主销售品的开始时间的特殊处理
		         */
		        dealNewMainProdOfferBEGTIME : function(data){
		        	if (data.prodOfferViewData.productStartDateView) {
				        data.prodOfferViewData.productStartDateView.style.hiddenStyleOption = " hiddenStyle"
			        }
			        dojo.mixin(data.prodOfferViewData, {
				                startDate : util.DateHelper.getStringFirstDayOFNextMonth()
			                });
		        },
		        /**
		         * 重写收集数据的方法
		         */
		        getPageData : function(){
		        	var data  = this.inherited(arguments);
		        	if(!data){
		        		return false;
		        	}
		        	//拼上变更主销售品的标识
		        	data.prodOfferPageInfo.ifChangeMainFlag = 1;
		        	data.prodOfferPageInfo.beginDate = data.prodOfferPageInfo.startDate;
		        	return data;
		        },
		        
		        getDealNewMainProdOfferBEGTIMEStartDate :function(){
		        	return util.DateHelper.getStringFirstDayOFNextMonth();
		        }
	        });
	        
        });