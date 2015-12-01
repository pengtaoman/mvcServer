defineModule("orderaccept.prodofferaccept.widget.mainprodoffer.MultipleMainProdOfferWidget", [
                "./MainProdOfferWidget", "orderaccept.prodofferaccept.util"], function(
                MainProdOfferWidget, util) {
	        dojo.declare(
	                "orderaccept.prodofferaccept.widget.mainprodoffer.MultipleMainProdOfferWidget",
	                [MainProdOfferWidget], {
	                	
		                templatePath : dojo.moduleUrl(
		                        "orderaccept.prodofferaccept.widget.mainprodoffer",
		                        "template/mainProdOfferTpl.html"),
		                delayCreateBeforeBindModel : true,
	                	
		                postMixInProperties : function() {
			                this.modelData = this.getModel(),
			                this.uniqueId = this.modelData.uniqueId
			                this.prodOfferInfoVO = this.modelData.mainProdOfferInfoVO;
			                this.prodOfferInstVO = this.modelData.prodOfferInstVO;
			                this.contentPane = this.modelData.contentPane;
		                	this.inherited(arguments);
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
				                mainProdOfferInfoVO = this.prodOfferInfoVO,
				                prodOfferInstVO = this.prodOfferInstVO,
				                requestParam = dojo.global.$appContext$.requestParam,
				                viewId = key + "-" + mainProdOfferInfoVO.parentProdOfferId
				                        + mainProdOfferInfoVO.prodOfferId,
				                actionName = !!prodOfferInstVO? "\u4fdd\u7559" : "\u8ba2\u8d2d",
				                productStartDateHtml = util.ProdOfferHelper.toProductStartDateView(
				                        mainProdOfferInfoVO, {
					                        key : 'key'
				                        }),
				                productEndDateHtml = util.ProdOfferHelper.toProductEndDateView(
				                        mainProdOfferInfoVO, {
					                        key : 'key'
				                        }),
				                prodOfferDetailFlag = util.ProdOfferHelper
				                        .IfShowMainOfferDetail(mainProdOfferInfoVO) ? '1' : '0',
				                productDateBuilder = util.ProdOfferHelper
				                        .getProductDateBuilder(mainProdOfferInfoVO),
				                startDate = !!util.ProdOfferHelper
				                        .ifShowStartTime(mainProdOfferInfoVO) ? productDateBuilder
				                        .getBeginDate() : '',
				                endDate = !!util.ProdOfferHelper.ifShowEndTime(mainProdOfferInfoVO)
				                        ? productDateBuilder.getEndDate()
				                        : '';
				           	if(prodOfferInstVO){
				           		productStartDateHtml.style.hiddenStyleOption=" hidden-elem";
				           		productEndDateHtml.style.hiddenStyleOption = " hidden-elem";
				           		productEndDateHtml.style.cycleStyleOption = " hidden-elem";
				           	}
				           	//拆分
			           		if(this.contentPane.action == "split"){
			           			startDate = util.DateHelper.getStringFirstDayOFNextMonth();
			           			productStartDateHtml.style.hiddenStyleOption = " hiddenStyle";
			           		}else if(this.contentPane.action == "new"){
			           			//开始时间特殊处理
				           		startDate = dojo.global.$appContext$.requestParam.today;
				           		productStartDateHtml.style.hiddenStyleOption = " hiddenStyle";
			           		}else if(this.contentPane.action == "change"&&this.contentPane.offerInstVO.prodOfferId!=this.contentPane.prodOfferId){
				           		startDate = util.DateHelper.getStringFirstDayOFNextMonth();
			           			productStartDateHtml.style.hiddenStyleOption = " hiddenStyle";
			           		}
			                var detailNotNull = false;
			                detailNotNull = util.AttrUtil.checkIfNotNull(mainProdOfferInfoVO.attrList); 
			                if(!detailNotNull){
				                detailNotNull = dojo.some(mainProdOfferInfoVO.offerProdRelaList,function(prodRela){
			                						 if(prodRela.productInfoVO.prodFuncType == 
			                						 		ConstantsPool.load("ProductFuncTypeConst").ProductFuncTypeConst.ACCESS){
			                						 	return false;		
	                						 		 }
	                						 		 return util.AttrUtil.checkIfNotNull(prodRela.productInfoVO.attrList);
								                 });
			                }
			                detailNotNull = !!prodOfferInstVO?false:detailNotNull;
			                tpContext = {
				                "prodOfferDetailFlag" : prodOfferDetailFlag,
				                "detailNotNull" : detailNotNull?"":"hidden-elem",
						        "finishImg" : !detailNotNull ? "" : "hidden-elem",
				                "productStartDateView" : productStartDateHtml,
				                "productEndDateView" : productEndDateHtml,
				                "viewId" : viewId,
				                "startDate" : util.DateHelper.format(!!prodOfferInstVO?prodOfferInstVO.effDate : startDate),
				                "endDate" : util.DateHelper.format(!!prodOfferInstVO?prodOfferInstVO.expDate : endDate),
				                "actionName" : actionName,
				                "displayStartEndTime" : "",
				                "prodOfferInfoVO" : mainProdOfferInfoVO,
				                "ifMultipleMainProd" : true,
				                "multipleUniqueId" : "-"+Me.uniqueId
			                };
			                return {
				                prodOfferViewData : tpContext,
				                prodViewData :null
				                
			                }
		                },
		                /**
						 * 级联获取主销售品数据
						 * 
						 * @method
						 */
		                getPageData : function() {
			                var prodOfferInfoVO = this.prodOfferInfoVO,
				                prodOfferInstVO = this.prodOfferInstVO,
				                mainProdOfferDetailWidget = this.mainProdOfferDetailWidget
				                requestParam = dojo.global.$appContext$.get("requestParam"),
				                pageInfoData = {},
				                detailPageData = {},
				                offerAttrPageDataList = {},
				                relaBusPageInfoList = {},
				                productBasicTrList = dojo.query("[uniqueId="+this.uniqueId+"]"),
				                exceptionFlag = false,
				                prodOfferInfo = this.getPageStartEndDate(),
				                attrKeyList = ["uniqueId", "viewId", "prodOfferId", "roleCD",
				                        "roleNumMax", "roleNumMin", "parentRoleCD", "productId",
				                        "roleName", "serviceKindIndex", "serviceKind", "userId",
				                        "prodInstId"];
			                if(!!mainProdOfferDetailWidget){
				                detailPageData = mainProdOfferDetailWidget.handlePageData()
				                if(detailPageData === false){
				                	exceptionFlag = true;
				                }else{
				                	offerAttrPageDataList = detailPageData.offerAttrPageInfoList;
				                	relaBusPageInfoList = detailPageData.relaBusPageInfoList;
				                }
			                }
			                if (exceptionFlag) {
				                return false;
			                } else {
				                return {
					                "prodOfferPageInfo" : prodOfferInfo,
					                "offerAttrPageInfoList" : offerAttrPageDataList,
					                "relaBusPageInfoList" : relaBusPageInfoList,
					                "prodOfferInfoVO" : prodOfferInfoVO,							
					                "prodOfferInst" : prodOfferInstVO,
					                "uniqueId" : this.uniqueId
				                };
				                
			                }
		                }
	                });
	        
        });