/**
 * 此模块放置所有模型数据构建处理逻辑
 * 
 * @module
 */
defineModule("orderaccept.prodofferaccept.data.ProdOfferNewDataBuilder", ["../ProductDateBuilder", "../util",
                "../../common/js/ConstantsPool", "orderaccept.prodofferaccept.builder.date.DateBuilderFactory"],
        function(ProductDateBuilder, util, ConstantsPool, dateFactory) {
	        
	        /**
			 * 销售品订购整体数据构建器,构建数据有以下约定: 1:
			 * 当前正在受理的主销售品包含默认选中的销售品包括在$appContext$的prodOfferList中
			 * 
			 * 2:
			 * 退订的所有主销售品以及包含的默认选择的销售品存$appContext$的prodOfferMap中,prodOfferMap的
			 * 结构为mainProdOfferId->prodOfferList
			 * 
			 * 3:
			 * 所有实例信息存放在$appContext$的prodOfferInstMap中,prodOfferInstMap的结构
			 * 结构为 mainProdOfferId->prodOfferInstList
			 * 
			 * 4: 其他销售品信息 commProdOfferList
			 * 
			 * @class
			 */
	        dojo.declare("orderaccept.prodofferaccept.data.ProdOfferNewDataBuilder", [], {
		        controller : null,
		        MAIN_PROD_OFFER_PAGE_DATA : 'mainProdOfferPageData',
		        SUB_PROD_OFFER_PAGE_DATA_LIST : 'subProdOfferPageDataList',
		        USER_ID_MAP : "userIdMap",
		        processId : null,
		        MAIN_KEY : null,
		        SUB_KEY : null,
		        USER_ID_KEY : null,
		        beanBuildFactory : null,
		        constructor : function(controller) {
			        this.controller = controller;
			        this.beanBuildFactory = new util.BeanBuildFactoryProvider().getInstance();
		        },
		        /**
				 * 开始客户订单提交数据计算,主要分为
				 * preProcess->generateOrder->postProcess 三个阶段,
				 * 中获取订单提交数据的入口方法
				 * 
				 * @method
				 */
		        process : function() {
			        var r;
			        ConstantsPool.load(["ActionCDConst"]);
			        ConstantsPool.load(["AccessLevelConst"]);
			        this.preProcess();
			        try {
				        r = this.generateOrder();
				        if(this.inspectServiceIdWithBlankChar(r)===true){
				        	r = false;
				        }
			        }
			        catch (e) {
				        BusCard.showErrorStack(e);
				        this.postProcess();
				        this.controller.waitingBarInstance.hideMe();
				        throw e;
			        }
			        
			        this.postProcess();
			        return r;
			        
		        },
		        /**
				 * 检测服务号码是否带有空格
				 */
		        inspectServiceIdWithBlankChar : function(orderData) {
			        if (!orderData) {
				        return false;
			        } else {
				        var accessProdAcceptInfoList = BusCard.jsonPath(orderData,
				                "$.orderAcceptInfoList[*].prodOfferAcceptInfoList[*].accessProdAcceptInfoList[*]")
				                || [];
				        var memberAccessProdAcceptInfoList = BusCard.jsonPath(accessProdAcceptInfoList,
				                "$[*].accessProdAcceptInfoList[*]")
				                || [];
				        var target = [].concat(accessProdAcceptInfoList).concat(memberAccessProdAcceptInfoList).find(
				                function(prodAcceptInfo) {
					                var serviceId = prodAcceptInfo.serviceId;
					                //只处理新装的产品
					                if (serviceId&&prodAcceptInfo.operKind==1) {
						                var str = serviceId.toString();
						                if (str.replace(/\s+/g, "").length != str.length) {
							                dojo.require("orderaccept.common.dialog.MessageBox");
							                orderaccept.common.dialog.MessageBox.alert({
								                        message : '\u53f7\u7801[' + serviceId
								                                + "]\u5b58\u5728\u7a7a\u683c,\u8bf7\u6838\u67e5"
							                        });
							                return true;
						                }
					                }
				                });
				        if (target) { return true; }
			        }
			        return false;
			        
		        },
		        /**
				 * 生成客户订单数据,主包包括以下计算过程: 1: 订单基本信息
				 * buildOrderCommonInfoVOBean 2: 主销售品信息
				 * doMainProdOfferInfoComputation 3: 可选包信息
				 * doSubProdOfferInfoComputation 4: 促销政策信息
				 * doSalesPromotionInfoComputation 5: 支付关系信息
				 * doAccountInfoComputation
				 * 如果其中一个计算环节出现错误(计算方法返回值为false),那么整个 生成订单的流程就立刻中断
				 * 
				 * @method
				 */
		        generateOrder : function() {
			        var custOrderAcceptInfoVO = {},
				        protoPush = Array.prototype.push,		       
				        // 销售品信息,与java端OrderInfoVO/prodOfferAcceptInfoList对应
				        prodOfferAcceptInfoList = [],
				        // 订单信息,与java端PageInfoVO/orderInfoList对应
				        orderAcceptInfoList = [],
				        // 主销售品订单提交数据计算中间结果
				        mainProdOfferCPResult = null,
				        // 可选包订单提交数据计算中间结果
				        subProdOfferCPresult = null,
				        // 支付关系订单提交数据计算中间结果
				        accountInfoCPResult = null,
				        // 促销政策订单提交数据计算中间结果
				        salesPromotionCPresult = null,
				        
				        // 退订的主套餐信息
				        quitMainProdOfferInfoCPResult = [],
				        
				        // 如果是连续受理,取在父页面保存下来的custOrderId
				        custOrderId = this.controller.getCustOrderId(),
			        	 // 订单基本信息,
				        // 与java端PageInfoVO/orderCommonInfoVO路径对应
				        custOrderBasicAcceptInfoVO = this.buildCustOrderBasicAcceptInfoVO();
				    if(!custOrderBasicAcceptInfoVO){
				    	return false;
				    }
			        // 提交数据前检测计费方式
			        if (this.controller.route("/checkInstance/doCheckPayModeMethod")) { return false; }
			        // 如果主销售品,可选包,促销政策,支付关系计算中有错误,那么中断整体订单提交过程的计算
			        if (!((mainProdOfferCPResult = this.doMainProdOfferInfoComputation()) !== false
			                && (subProdOfferCPresult = this.doSubProdOfferInfoComputation(mainProdOfferCPResult)) !== false
			                && (accountInfoCPResult = this.doAccountInfoComputation()) !== false
			                && (salesPromotionCPresult = this.doSalesPromotionInfoComputation()) !== false && (quitMainProdOfferInfoCPResult = this
			                .doQuitMainProdOfferInfoComputation(mainProdOfferCPResult,subProdOfferCPresult)) !== false)) { return false; }
			        
	                //预约取消升速可选包，不允许对速率进行变更
			        var subProdOfferCartPageData = dojo.global.$appContext$.get(this.SUB_KEY);
			        if (!this.controller.route("/checkInstance/checkIfReserveCancelSpeedOffer", [
			                        mainProdOfferCPResult, subProdOfferCPresult, subProdOfferCartPageData])){ return false; }
			                
			        // 执行主销售品下功能类产品与可选包下功能类产品关系检测
			        if (this.doProdRelationCheck(mainProdOfferCPResult.prodOfferAcceptInfoVO, dojo.global.$appContext$
			                        .get(this.MAIN_KEY), dojo.global.$appContext$.get(this.SUB_KEY)) === false) { return false; }
			        // 提交数据前检测密码
			        if (!this.controller.route("/checkInstance/doCheckPasswordMethod")) { return false; }
			        
			        // 调用PPM接口，检测当前订购的销售品产品是否满足
			        if (!this.controller.route("/checkInstance/checkOrderedOfferProdRelationByPPM", [
			                        mainProdOfferCPResult, subProdOfferCPresult])) { return false; }
			        
			        // 把主销售品计算的中间结果中的主销售品信息放到当前局部变量prodOfferAcceptInfoList中
			        prodOfferAcceptInfoList.push(mainProdOfferCPResult.prodOfferAcceptInfoVO);
			        
			        // 把可选包计算的中间结果中的可选包信息放到当前局部变量prodOfferAcceptInfoList中
			        protoPush.apply(prodOfferAcceptInfoList, subProdOfferCPresult.prodOfferAcceptInfoList || []);
			        
			        // 构建退订的所有主销售品信息
			        protoPush.apply(prodOfferAcceptInfoList, quitMainProdOfferInfoCPResult);
			        
			        // 生成本次受理的受理编号
			        var acceptGroupId = "" + this.getAcceptGroupId();
			        
			        // 通过可选包,促销包,服务信息和支付关系构建一份订单信息(对应java端OrderInfoVO)
			        orderAcceptInfoList.push(dojo.mixin({
				                acceptGroupId : acceptGroupId,
				                prodOfferAcceptInfoList : prodOfferAcceptInfoList,
				                salesPromotionAcceptInfoList : salesPromotionCPresult.promotionAcceptInfoList || []
			                }, accountInfoCPResult));
			        
			        var customerAcceptInfoVO = this.buildCustomerAcceptInfoVO();
			        // 计算管理账号信息
			        this.doComputationManageNbrInfo(custOrderBasicAcceptInfoVO);
			        
			        // 通过以上计算结果生成一份没有计算关系和检测的pageInfoVO
			        dojo.mixin(custOrderAcceptInfoVO, {
				                customerAcceptInfoVO : customerAcceptInfoVO,
				                custOrderBasicAcceptInfoVO : custOrderBasicAcceptInfoVO,
				                orderAcceptInfoList : orderAcceptInfoList
			                });
			        // 执行全局检测
			        if (this.doGlobalBusAndRuleCheck(custOrderAcceptInfoVO) == false) {

			        return false; };
			        
			        // 计算销售品-产品关系
			        this.doOffer2ProdRelComputation(custOrderAcceptInfoVO);
			        
			        // 计算销售品-销售品直接的关系
			        this.doOffer2OfferRelComputation(custOrderAcceptInfoVO);
			        
			        // 计算产品-产品直接关系
			        this.doProd2ProdRelComputation(custOrderAcceptInfoVO);
			        
			        // 为所有的产品订单信息的AccProdInstId赋值
			        this.setAccProdInstIdForAll(custOrderAcceptInfoVO);
			        
			        // 调用时间处理逻辑处理时间
			        var dateHandler = dateFactory.getInstance(custOrderAcceptInfoVO);
			        dateHandler.build();
			        this.doCombMembProductRelComputation(custOrderAcceptInfoVO);
			        
			        custOrderAcceptInfoVO.preRgstNo = !!$ac$.get("requestParam")
			                && !!$ac$.get("requestParam").preRgstNo ? $ac$.get("requestParam").preRgstNo : "";
			        return custOrderAcceptInfoVO;
			        
		        },
		        /**
				 * 重新计算组合产品受理时组合产品和成员产品的关系,把成员产品放置到组合产品下,
				 * 暂时只考虑新装和销售品变更场景
				 * 
				 * @method
				 */
		        doCombMembProductRelComputation : function(custOrderAcceptInfoVO) {
			        var selectedMainProdOfferInfoVO = $ac$.get("selectedMainProdOfferInfoVO");
			        if (selectedMainProdOfferInfoVO) {
				        var mainProdOfferId = selectedMainProdOfferInfoVO.prodOfferId;
				        var acceptProdOfferInfoList = BusCard.jsonPath(custOrderAcceptInfoVO || {},
				                "$.orderAcceptInfoList[*].prodOfferAcceptInfoList[?(@.prodOfferId==" + mainProdOfferId
				                        + ")]");
				        if (acceptProdOfferInfoList && acceptProdOfferInfoList.length > 0) {
					        var acceptProdOfferInfoVO = acceptProdOfferInfoList[0];
					        var accessProdAcceptInfoList = acceptProdOfferInfoVO.accessProdAcceptInfoList || [];
					        var combAcceptIndex = -1;
					        var specCombProdBundleType = ConstantsPool.load("ProductTypeConst").ProductTypeConst.COMPOSE;
					        BusCard.each(accessProdAcceptInfoList, function(index, accessProdAcceptInfoVO) {
						                var targetType = accessProdAcceptInfoVO.prodTypeCd
						                        || accessProdAcceptInfoVO.prodType;
						                if (targetType == specCombProdBundleType) {
							                combAcceptIndex = index;
							                return false;
						                }
						                
					                }, true);
					        if (combAcceptIndex != -1) {
						        var combAcceptProductInfoVO = accessProdAcceptInfoList.splice(combAcceptIndex, 1)[0];
						        combAcceptProductInfoVO.accessProdAcceptInfoList = accessProdAcceptInfoList;
						        acceptProdOfferInfoVO.accessProdAcceptInfoList = [combAcceptProductInfoVO];
					        }
				        }
				        
			        }
			        
		        },
		        
		        /**
				 * 计算管理账号信息
				 */
		        doComputationManageNbrInfo : function(custOrderBasicAcceptInfoVO) {
			        // var acctNbrTempList =
			        // this.doAccNbrInfoComputation(this.controller
			        // .route("/manageInfoCardWidget/getPageData"),
			        // 2);
			        // customerAcceptInfoVO.acctNbrTempList =
			        // acctNbrTempList;
			        var acctNbrTempList = [];
			        var dataBuilder = this;
			        var manageNbrInfoDom = dojo.query('#manageNbrInfo')[0];
			        if (manageNbrInfoDom.children.length > 0) {
				        if (dojo.attr(dojo.query('#manageNbrInfo')[0].children[0], 'ifCreateAcc') == 1) { return; }
				        // 账号号码
				        var accNbr = "";
				        var uniqueId = dojo.attr(dojo.query('#manageNbrInfo')[0].children[0], 'targetUniqueId');
				        var relaProdInstId = "";
				        if (dojo.attr(dojo.query('#manageNbrInfo')[0].children[0], 'prodInstId') == ""
				                || dojo.attr(dojo.query('#manageNbrInfo')[0].children[0], 'prodInstId') == "undefined") {
					        relaProdInstId = dataBuilder.getVirtualUserId(uniqueId);
					        if (prodOfferAcceptLoader.serviceCardWidgetMap['serviceCardWidget_' + uniqueId].busCardInstance
					                .$('serviceId')) {
						        accNbr = prodOfferAcceptLoader.serviceCardWidgetMap['serviceCardWidget_' + uniqueId].busCardInstance
						                .$('serviceId').value;
					        }
				        } else {
					        relaProdInstId = dojo.attr(dojo.query('#manageNbrInfo')[0].children[0], 'prodInstId');
					        accNbr = dojo.attr(dojo.query('#manageNbrInfo')[0].children[0], 'serviceId')
				        }
				        acctNbrTempList.push({
					                relaProdInstId : relaProdInstId,
					                accNbr : accNbr,
					                accNbrType : 2,
					                operKind : 1
				                });
				        custOrderBasicAcceptInfoVO.acctNbrTempList = acctNbrTempList;
			        }
		        },
		        
		        setAccProdInstIdForAll : function(custOrderAcceptInfoVO) {
			        var serviceProdAcceptInfoList = BusCard.jsonPath(custOrderAcceptInfoVO,
			                "$.orderAcceptInfoList[*].prodOfferAcceptInfoList[*].serviceProdAcceptInfoList[*]"),
				        accessProdAcceptInfoList = BusCard.jsonPath(custOrderAcceptInfoVO,
				                "$.orderAcceptInfoList[*].prodOfferAcceptInfoList[*].accessProdAcceptInfoList[*]");
			        
			        dojo.forEach([].concat(serviceProdAcceptInfoList || []).concat(accessProdAcceptInfoList || []),
			                function(vo) {
				                if (vo.userId) {
					                vo.accProdInstId = vo.userId
				                }
				                
			                });
			        
		        },
		        
		        doOffer2ProdRelComputation : function(custOrderAcceptInfoVO) {

		        },
		        doProd2ProdRelComputation : function(custOrderAcceptInfoVO) {

		        },
		        doOffer2OfferRelComputation : function(custOrderAcceptInfoVO) {

		        },
		        /**
				 * 获取数据时执行页面级最后的全局检测,这块逻辑需要调用 check模块的相应的方法来完成,
				 * 
				 * @method
				 */
		        doGlobalBusAndRuleCheck : function(custOrderAcceptInfoVO) {
			        // 国际漫游的检测
			        //var _roamCheck_ = this.controller.route("/checkInstance/doChekIfCanOrderRoamProd",
			                //[custOrderAcceptInfoVO]);
			        //if (_roamCheck_ === false) { return false; }
			        var f = this.controller.route("/checkInstance/doCheckPayRelationValidNew", [custOrderAcceptInfoVO]);
			        if (f === false) { return false; }
			        if (this.controller.checkInstance.doGlobalBusAndRuleCheck) {
				        var checkMethod = this.controller.checkInstance.doGlobalBusAndRuleCheck;
				        return checkMethod.apply(this.controller.checkInstance, arguments);
			        }
		        },
		        
		        /**
				 * 执行产品关系检测
				 * 
				 * @method
				 */
		        doProdRelationCheck : function(prodOfferAcceptInfoVO, mainProdOfferPageData, subProdOfferData) {
			        // 获取主销售品下产品集合
			        var productInfoList = mainProdOfferPageData.productInfoList;
			        var mainServiceProdList = [];
			        var subServiceProdList = {};
			        var _allSubRegionServiceProdMap_ = {};
			        var _mainserviceprodList_ = [];
			        // 获取可选包区域的数据
			        
			        if (prodOfferAcceptInfoVO.bindType != 2) {// 非自主版
				        dojo.forEach(productInfoList, function(productInfo) {
					        if (!(!!productInfo.serviceProductInfo && productInfo.serviceProductInfo.length > 0)) { return; }
					        Array.prototype.push.call(mainServiceProdList, {
						                "serviceid" : productInfo.prodBasicInfo.serviceid,
						                "serviceProductInfo" : productInfo.serviceProductInfo
					                });
					        _mainserviceprodList_ = _mainserviceprodList_.concat(productInfo.serviceProductInfo);
				        });
			        } else {// 自主版
				        dojo.forEach(productInfoList, function(productInfo) {
					        if (!(!!productInfo.serviceProductInfo && productInfo.serviceProductInfo.length > 0)) { return; }
					        Array.prototype.push.call(mainServiceProdList, {
						                "serviceid" : productInfo.prodBasicInfo.serviceid,
						                "serviceProductInfo" : productInfo.serviceProductInfo
					                });
					        _mainserviceprodList_ = _mainserviceprodList_.concat(productInfo.serviceProductInfo);
				        });
			        }
			        
			        for (var key in subProdOfferData) {
				        if (!subProdOfferData.hasOwnProperty(key)) {
					        continue;
				        }
				        var subProdOfferPageData = subProdOfferData[key].subProdOfferPageData;
				        for (var key1 in subProdOfferPageData) {
					        if (!subProdOfferPageData.hasOwnProperty(key1)) {
						        continue;
					        }
					        var relaProdPageInfoList = subProdOfferPageData[key1].relaProdPageInfoList;
					        var tempList = subServiceProdList[subProdOfferPageData[key1].showData.chooseNumberObj.uniqueId];
					        if (!tempList) {
						        subServiceProdList[subProdOfferPageData[key1].showData.chooseNumberObj.uniqueId] = {};
						        tempList = subServiceProdList[subProdOfferPageData[key1].showData.chooseNumberObj.uniqueId];
					        }
					        for (var key2 in relaProdPageInfoList) {
						        if (!relaProdPageInfoList.hasOwnProperty(key2)) {
							        continue;
						        }
						        // 方便后面检测销售品下的产品(此处只取选中的销售品，并且使用号码不能为空的)
						        if (subProdOfferPageData[key1].showData.chooseNumberObj != null
						                && subProdOfferPageData[key1].prodOfferPageInfo.checkBoxValue) {
							        // 属性不存在不处理,不选中的不处理
							        var relaProdPageInfo = relaProdPageInfoList[key2];
							        if (relaProdPageInfo.prodBasicInfo.checkedStatus
							                && (!!relaProdPageInfo.prodAttrInfo)) {
								        if (_allSubRegionServiceProdMap_[subProdOfferPageData[key1].showData.chooseNumberObj.uniqueId]) {
									        _allSubRegionServiceProdMap_[subProdOfferPageData[key1].showData.chooseNumberObj.uniqueId]
									                .push(relaProdPageInfo);
								        } else {
									        _allSubRegionServiceProdMap_[subProdOfferPageData[key1].showData.chooseNumberObj.uniqueId] = [];
									        _allSubRegionServiceProdMap_[subProdOfferPageData[key1].showData.chooseNumberObj.uniqueId]
									                .push(relaProdPageInfo);
								        }
							        }
						        }
						        if (subProdOfferPageData[key1].prodOfferPageInfo.checkBoxValue
						                && relaProdPageInfoList[key2].prodBasicInfo.checkedStatus == true) {
							        if (relaProdPageInfoList[key2].productInfo.productInfoVO.prodFuncType != ConstantsPool
							                .load("ProductFuncTypeConst").ProductFuncTypeConst.ACCESS) {
								        var tempInfo = {
									        "productInfo" : relaProdPageInfoList[key2].productInfo,
									        "prodOfferName" : subProdOfferPageData[key1].showData.prodOfferName,
									        "serviceId" : subProdOfferPageData[key1].showData.chooseNumberObj.serviceId
								        }
								        tempList[relaProdPageInfoList[key2].prodBasicInfo.productId] = tempInfo;
							        }
						        }
						        
					        }
				        }
			        }
			        for (var key in mainServiceProdList) {
				        if (!mainServiceProdList.hasOwnProperty(key)) {
					        continue;
				        }
				        var serviceId = mainServiceProdList[key].serviceid;
				        var serviceProdInfolist = mainServiceProdList[key].serviceProductInfo;
				        for (var key1 in serviceProdInfolist) {
					        if (!serviceProdInfolist.hasOwnProperty(key1)) {
						        continue;
					        }
					        var serviceProdInfo = serviceProdInfolist[key1];
					        if (!subServiceProdList[serviceProdInfo.uniqueId]) {
						        subServiceProdList[serviceProdInfo.uniqueId] = {};
					        }
					        if (serviceProdInfo.prodBasicInfo.checkedStatus == true) {
						        subServiceProdList[serviceProdInfo.uniqueId][serviceProdInfo.prodBasicInfo.productId] = {
							        "serviceId" : serviceId,
							        "productInfo" : serviceProdInfo
						        };
					        }
				        }
			        }
			        for (var key in subServiceProdList) {
				        if (!subServiceProdList.hasOwnProperty(key)) {
					        continue;
				        }
				        var serviceProdList = subServiceProdList[key];
				        for (var key1 in serviceProdList) {
					        var serviceProd = serviceProdList[key1]
					        var checkResult = this.controller.route("/checkInstance/doCheckProdRelation", [serviceProd,
					                        serviceProdList]);
					        if (checkResult.flag == 0) { return false; }
				        }
			        }
			        // 检测同产品的产品属性是否一致
			        if (!this.controller.route("/checkInstance/doCheckSameProdOfAttr", [_mainserviceprodList_,
			                        _allSubRegionServiceProdMap_])) { return false; }
			        
		        },
		        /**
				 * 订单提交预处理,主要包括生成本次受理的流水号以及其他一些key
				 * 
				 * @method
				 */
		        preProcess : function() {
			        this.processId = util.CommUtils.generateUniqueId();
			        this.MAIN_KEY = this.MAIN_PROD_OFFER_PAGE_DATA + "_" + this.processId;
			        this.SUB_KEY = this.SUB_PROD_OFFER_PAGE_DATA_LIST + "_" + this.processId;
			        this.USER_ID_KEY = this.USER_ID_MAP + "_" + this.processId;
			        return this;
		        },
		        /**
				 * 从全局上下文中删除本次受理绑定的中间计算结果
				 * 
				 * @method
				 */
		        postProcess : function() {
			        dojo.global.$appContext$.deleteProperty(this.MAIN_KEY);
			        dojo.global.$appContext$.deleteProperty(this.SUB_KEY);
			        // dojo.global.$appContext$.deleteProperty(this.USER_ID_KEY);
		        },
		        /**
				 * 加载主销售品页面数据到当前的builder中
				 * 
				 * @method
				 */
		        loadMainProdOfferPageData : function(onlyForPageData) {
			        var mainProdOfferPageData = this.controller.route("/mainProdOfferWidget/getPageData");
			        if (!mainProdOfferPageData) { return false; }
			        if (onlyForPageData) {
				        return mainProdOfferPageData;
			        } else {
				        return dojo.global.$appContext$.set(this.MAIN_KEY, mainProdOfferPageData);
			        }
			        
		        },
		        /**
				 * 加载可选包数据到当前的builder中
				 * 
				 * @method
				 */
		        loadSubProdOfferPageData : function(onlyForPageData) {
			        var subProdOfferPageData = this.controller
			                .route("/multipleSubProdOfferHandler/getSubProdOfferPageData");
			        if (!subProdOfferPageData) { return false; }
			        if (onlyForPageData) {
				        return subProdOfferPageData;
			        } else {
				        return dojo.global.$appContext$.set(this.SUB_KEY, subProdOfferPageData);
			        }
			        
		        },
		        /**
				 * 获取页面填写的一些基本信息,比如belongCode
				 * 
				 * @method
				 */
		        getCommInfo : function() {
			        var controller = this.controller;
			        return {
				        belongCode : controller.getBelongCode()
			        };
			        
		        },
		        /**
				 * 获取本次受理相关的客户信息
				 * 
				 * @method
				 */
		        getCustomerData : function() {
			        return dojo.global.$appContext$.get("requestParam").customerData || {};
			        
		        },
		        /**
				 * 调用java端方法生成本次受理编号
				 * 
				 * @method
				 */
		        getAcceptGroupId : function() {
			        if (!dojo.global.$acceptGroupId$) {
				        var idGeneratorStub = BusCard
				                .$load("com.neusoft.crm.ordermgr.common.idgenerator.bo.IdGeneratorBOStaticFacade");
				        dojo.global.$acceptGroupId$ = idGeneratorStub.generateSequenceLong("acceptGroupId").replace(
				                /"/g, "");
			        }
			        return dojo.global.$acceptGroupId$;
		        },
		        
		        /**
				 * 构建服务器端的订单基本信息
				 * 
				 * @method
				 */
		        buildCustOrderBasicAcceptInfoVO : function() {
			        var orderCommonInfoVO = {};
			        dojo.mixin(orderCommonInfoVO, BusCard.$session);
			        orderCommonInfoVO.custOrderId = this.controller.getCustOrderId();
			        dojo.mixin(orderCommonInfoVO, $ac$.get("requestParam"));
			        dojo.mixin(orderCommonInfoVO, this.getCommInfo());
			        dojo.mixin(orderCommonInfoVO, this.getCustomerData());
			        var viaInfoData = this.controller.route("/viaInfoCardWidget/getPageData");
			        var orderInfoData = this.controller.route("/orderInfoCardWidget/getPageData");
			        if(!viaInfoData||!orderInfoData){
			        	return false;
			        }
			        dojo.mixin(orderCommonInfoVO, viaInfoData)
			        dojo.mixin(orderCommonInfoVO, orderInfoData);
			        return this.beanBuildFactory.getCustOrderBasicAcceptInfoVO(orderCommonInfoVO);
			        
		        },
		        
		        /**
				 * 构建销售品信息
				 * 
				 * @method
				 */
		        buildProdOfferAcceptInfoVO : function(prodOfferInfo) {
			        return this.beanBuildFactory.getProdOfferAcceptInfoVO(prodOfferInfo);
		        },
		        
		        /**
				 * 构建属性信息
				 * 
				 * @method
				 */
		        buildAttrInstItemVO : function(attrInfo) {
			        return this.beanBuildFactory.getProdInstAttrTempVO(attrInfo);
			        
		        },
		        
		        /**
				 * 构建销售品属性信息
				 * 
				 * @method
				 */
		        buildOfferAttrInstItemVO : function(attrInfo) {
			        return this.beanBuildFactory.getOfferInstAttrTempVO(attrInfo);
			        
		        },
		        
		        /**
				 * 构建接入产品信息
				 * 
				 * @method
				 */
		        buildAccessProdAcceptInfoVO : function(prodAcceptInfo) {
			        return this.beanBuildFactory.getAccessProdAcceptInfoVO(prodAcceptInfo);
			        
		        },
		        /**
				 * 构建功能类产品信息
				 * 
				 * @method
				 */
		        buildServiceProdAcceptInfoVO : function(prodAcceptInfo) {
			        
			        return this.beanBuildFactory.getServiceProdAcceptInfoVO(prodAcceptInfo);
			        
		        },
		        
		        /**
				 * 构建受理的
				 * 
				 * @method
				 */
		        buildCustomerAcceptInfoVO : function() {
			        var customerData = this.getCustomerData();
			        return this.beanBuildFactory.getCustomerAcceptInfoVO({
				                customerId : customerData.custId,
				                firstName : customerData.custName,
				                linkPhone : customerData.linkPhone
				                
			                });
		        },
		        /**
				 * 构建服务器端对应的亲情信息
				 * 
				 * @method
				 */
		        buildRelaBusVO : function(relaBusVO) {
			        
			        return this.beanBuildFactory.getRelaBusVO(relaBusVO);
			        
		        },
		        /**
				 * 构建服务器端对应的亲情信息
				 * 
				 * @method
				 */
		        buildOcsSubseridBusTempVO : function(ocsSubseridBusTempVO) {
			        
			        return this.beanBuildFactory.getOcsSubseridBusTempVO(ocsSubseridBusTempVO);
			        
		        },
		        
		        /**
				 * 构建担保信息
				 * 
				 * @method
				 */
		        buildProdOfferInstAssureVO : function(assuretInfo) {
			        return this.beanBuildFactory.getProdOfferInstAssureVO(assuretInfo);
			        
		        },
		        
		        buildAccountAcceptInfoVO : function(accountInfo) {
			        
			        return this.beanBuildFactory.getAccountAcceptInfoVO(accountInfo);
		        },
		        
		        /**
				 * 构建支付关系对象
				 * 
				 * @method
				 */
		        buildProdInstAcctTempVO : function(prodInstAcctInfo) {
			        return this.beanBuildFactory.getProdInstAcctTempVO(prodInstAcctInfo);
			        
		        },
		        
		        /**
				 * 构建账号信息
				 * 
				 * @method
				 */
		        buildAccNbrInfoVO : function(acctNbrInfo) {
			        return this.beanBuildFactory.getAcctNbrTempVO(acctNbrInfo);
			        
		        },
		        
		        /**
				 * 构建销售品体验对象
				 * 
				 * @method
				 */
		        buildUserTasteTempVO : function(userTasteTempInfo) {
			        return this.beanBuildFactory.getUserTasteTempVO(userTasteTempInfo);
			        
		        },
		        
		        /**
				 * 构建一站式信息
				 * 
				 * @method
				 */
		        buildOneStopCustInfoMgrVO : function(oneStopCustInfoMgrVO) {
			        return this.beanBuildFactory.getOneStopCustInfoMgrVO(oneStopCustInfoMgrVO);
			        
		        },
		        
		        /**
				 * 构建服务器端对应的SalesPromotionAcceptInfoVO
				 */
		        buildSalesPromotionAcceptInfo : function(promotionInfoVO) {
			        return this.beanBuildFactory.getSalesPromotionAcceptInfoVO(promotionInfoVO);
		        },
		        
		        /**
				 * 构建服务器端对应的PromotionInfoVO
				 * 
				 * @method
				 */
		        buildPromotionInfoVOBean : function(promotionInfoVO) {
			        // return
			        // this.controller.route("/beanBuildFactory/getSalesPromotionVO",
			        // promotionInfoVO);
			        return this.beanBuildFactory.getSalesPromotionVO(promotionInfoVO);
		        },
		        
		        /**
				 * 构建服务器端对应的SalesPromotioItemVO
				 * 
				 * @method
				 */
		        buildPromotionItemVOBean : function(salesPromotioItemVO) {
			        // return
			        // this.controller.route("/beanBuildFactory/getSalesPromotionItemVO",
			        // salesPromotioItemVO);
			        return this.beanBuildFactory.getSalesPromotionItemVO(salesPromotioItemVO);
		        },
		        
		        /**
				 * 构建促销政策营销资源对应的PromotionResRelaInfoVO
				 */
		        buildPromotionResRelaInfoVOBean : function(promotionResRelaInfoVO) {
			        // return
			        // this.controller.route("/beanBuildFactory/getPromotionResRelaInfoVO",
			        // promotionResRelaInfoVO);
			        return this.beanBuildFactory.getPromotionResRelaInfoVO(promotionResRelaInfoVO);
		        },
		        
		        /**
				 * 构建销售品营销资源实例关系OfferResInstRelaVO
				 */
		        buildOfferResInstRelaVO : function(offerResInstRelaDataVO) {
			        return this.beanBuildFactory.getOfferResInstRelaVO(offerResInstRelaDataVO);
		        },
		        
		        /**
				 * 构建补贴卷/礼券临时表vo
				 */
		        buildRentSubsidyTempVO : function(rentSubsidyTempDataVO) {
			        return this.beanBuildFactory.getRentSubsidyTempVO(rentSubsidyTempDataVO);
		        },
		        
		        /**
				 * 构建租机临时表vo
				 */
		        buildDeviceRentBusTempVO : function(deviceRentBusTempDataVO) {
			        return this.beanBuildFactory.getDeviceRentBusTempVO(deviceRentBusTempDataVO);
		        },
		        
		        /**
				 * 计算本次受理销售品变化的一些信息,比如operKind,目前都是写死的值,以后从常量接口中取值
				 * 
				 * @param {Object} param.prodOfferInfoVO
				 * @param {Object} param.offerInstVO
				 * @param {Object} param.prodOfferPageData
				 * @method
				 */
		        doProdOfferAcceptInfoComputation : function(param) {
			        var offerInstVO = param.offerInstVO,
				        prodOfferInfoVO = param.prodOfferInfoVO,
				        prodOfferPageData = param.prodOfferPageData;
			        // 有实例数据
			        if (offerInstVO != null) {
				        // 选中状态
				        if (prodOfferPageData.checkBoxValue) {
					        return dojo.mixin(this._cloneBasicProperty(offerInstVO), {
						                operKind : 2,
						                ActionCD : ConstantsPool.ActionCDConst.PRODUCT_CHANGE
					                });
				        } else {
					        return dojo.mixin(this._cloneBasicProperty(offerInstVO), {
						                operKind : 3,
						                ActionCD : ConstantsPool.ActionCDConst.PRODUCT_CANCEL
					                });
				        }
			        } else {
				        return {
					        operKind : 1,
					        ActionCD : ConstantsPool.ActionCDConst.PRODUCT_INSTALL
				        };
			        }
		        },
		        /**
				 * 计算主销售品受理时变化信息以及其他必要信息
				 * 
				 * @method
				 */
		        doMainProdOfferAcceptInfoComputation : function(param) {
			        
			        return {
				        operKind : 1,
				        ActionCD : ConstantsPool.ActionCDConst.PRODUCT_INSTALL
			        };
			        
		        },
		        /**
				 * 断定为可选包变更而非主套餐变更变更
				 * 
				 * @method
				 */
		        assertSubProdOfferChange : function(offerInstVO, prodOfferInfoVO) {
			        return offerInstVO && prodOfferInfoVO && (offerInstVO.prodOfferId == prodOfferInfoVO.prodOfferId);
		        },
		        
		        /**
				 * 计算主销售品对应的属性信息
				 * 
				 * @param {Object} param.prodOfferInfoVO 主销售品规格数据
				 * @param {extendedData} 属性信息需要继承的属性,比如生效失效时间等
				 * @method
				 */
		        doMainProdOfferAttrInfoComputation : function(param, extendedData) {
			        var builder = this;
			        var detailWidget = this.controller.mainProdOfferDetailWidget;
			        var prodOfferInfoVO = param.prodOfferInfoVO;
			        var offerInstVO = param.offerInstVO;
			        var attrList = prodOfferInfoVO.attrList;
			        var mainDetailNode = dojo.query(".main-prodoffer-detail",
			                this.controller.mainProdOfferWidget.domNode);
			        if (mainDetailNode.length > 0) {
				        if (detailWidget.handlePageData() === false) { return false; }
				        // else{
				        // if
				        // (util.AttrUtil.checkedIfNeedShow(attrList))
				        // { return false; }
				        // }
				        var detailData = !!detailWidget ? detailWidget.mainProdOfferDetailData : null;
				        var prodOfferAttrInfo = !!detailData && !!detailData.offerAttrPageInfoList
				                ? detailData.offerAttrPageInfoList
				                : [];
				        // 如果是老用户
				        if (offerInstVO != null && this.assertSubProdOfferChange(offerInstVO, prodOfferInfoVO)) {
					        var prodOfferInst = offerInstVO,
						        instAttrList = prodOfferInst.offerInstAttrList || [],
						        specAttrList = prodOfferInfoVO.attrList || [],
						        requestParam = dojo.global.$appContext$.get("requestParam"),
						        resultList = [];
					        // TODO 暂时不考虑老的valueId计算
					        // 处理变更的属性
					        dojo.forEach(instAttrList, function(attrVO) {
						                var _pageValue = prodOfferAttrInfo[attrVO.attrCd];
						                //周价需要转换
						                //if(attrVO.attrCd == util.SpecAttrCdConst.cyclePriceAttrCd){
						                //	_pageValue = _pageValue*100;
						                //}
						                if (_pageValue != null) {
							                // 获取规格层面的数据
							                var specAttrVO = BusCard.find(specAttrList, function(attr) {
								                        return attr.attrId == attrVO.attrId;
							                        });
						                    //此处改为适用所有属性
						                    _pageValue = builder.convertFeeAttr(specAttrVO,_pageValue);
						                	if (_pageValue == null || _pageValue == attrVO.attrValue) {
						                		return;
						                	}
							                var cloneAttrVO = dojo.clone(attrVO);
							                cloneAttrVO.oldAttrValue = attrVO.attrValue;
							                cloneAttrVO.attrValue = _pageValue;
							                cloneAttrVO.operKind = 2;
							                cloneAttrVO.ifInstantiation = specAttrVO.ifInstantiation;
							                cloneAttrVO.isTemp = specAttrVO.isTemp;
							                // 周价变更即为下月生效
							                if (attrVO.attrCd == util.SpecAttrCdConst.cyclePriceAttrCd) {
								                cloneAttrVO.effDate = util.DateHelper.format(util.DateHelper
								                        .getFirstDayAfterPeriod());
							                }
							                resultList.push(builder.buildOfferAttrInstItemVO(cloneAttrVO));
						                }
						                
					                });
					        // 处理新增的是属性
					        BusCard.each(prodOfferAttrInfo, function(attrCd, attrValue) {
						                var flag = BusCard.find(instAttrList, function(attrVO) {
							                        return attrVO.attrCd == attrCd;
							                        
						                        });
						                if (!flag) {
							                var specAttrVO = BusCard.find(specAttrList, function(attrVO) {
								                        return attrVO.attrCd == attrCd;
								                        
							                        });
							                if (specAttrVO) {
					                            //费用属性处理
					                            attrValue = builder.convertFeeAttr(specAttrVO,attrValue);
								                var _attrVO = builder.getAttrInfoVOTemplate(1, specAttrVO.attrId,
								                        attrCd, attrValue, specAttrVO.ifInstantiation,
								                        specAttrVO.pricingParamAttr, specAttrVO.unique, specAttrVO.isTemp);
								                // TODO
								                // 对应变更时新增加的属性默认立即生效
								                _attrVO.effDate = requestParam.today;
								                _attrVO.expDate = prodOfferInst.expDate;
								                _attrVO.isTemp = specAttrVO.isTemp;
								                resultList.push(builder.buildOfferAttrInstItemVO(_attrVO));
								                
							                }
							                
						                }
						                
					                }, true)
					        return resultList;
				        } else {
					        var attrList = prodOfferInfoVO.attrList || [],
						        attrInfoVOList = [],
						        extendedData = extendedData || {},
						        // 根据属性cd获取规格层面上的AttrVO
						        getAttrVO = function(attrCd) {
							        return BusCard.find(attrList, function(attrVO) {
								                return attrVO.attrCd == attrCd;
							                })
						        };
					        if (prodOfferAttrInfo) {
						        for (var attrCd in prodOfferAttrInfo) {
							        var value = prodOfferAttrInfo[attrCd];
							        var attrVO = getAttrVO(attrCd);
							        //周价特殊处理
					                //此处改为适用所有属性
					                value = builder.convertFeeAttr(attrVO,value);
							        //if (attrCd == util.SpecAttrCdConst.cyclePriceAttrCd) {
							        //	value = value*100;
							        //}
							        if (attrVO && (value||value==0)) {
								        attrInfoVOList.push(this.buildOfferAttrInstItemVO(dojo.mixin(this
								                        .getAttrInfoVOTemplate(1, attrVO.attrId, attrCd, value,
								                                attrVO.ifInstantiation, attrVO.pricingParamAttr,
								                                attrVO.unique,attrVO.isTemp), extendedData)));
							        }
							        
						        }
						        
					        }
					        return attrInfoVOList;
				        }
				        
			        } else if (mainDetailNode.length == 0) {
				        if (attrList && attrList.length > 0) { return dojo.map(attrList, function(attrVO) {
					                attrVO.defaultValue = builder.convertFeeAttr(attrVO,attrVO.defaultValue);
					                return builder.buildOfferAttrInstItemVO(builder.getAttrInfoVOTemplate(1,
					                                attrVO.attrId, attrVO.attrCd, attrVO.defaultValue,
					                                attrVO.ifInstantiation, attrVO.pricingParamAttr, attrVO.unique, attrVO.isTemp),
					                        extendedData);
					                
				                }); }
				        
			        }
			        
		        },
		        /**
				 * 计算主销售品对应的担保信息
				 * 
				 * @param {Object} param.prodOfferInfoVO 主销售品规格数据
				 * @param {extendedData} 属性信息需要继承的属性,比如生效失效时间等
				 * @method
				 */
		        doMainProdOfferAssureInfoComputation : function(param, extendedData) {
			        var builder = this;
			        var detailWidget = this.controller.mainProdOfferDetailWidget;
			        var prodOfferInfoVO = param.prodOfferInfoVO;
			        var offerInstVO = param.offerInstVO;
			        var attrList = prodOfferInfoVO.attrList;
			        var mainDetailNode = dojo.query(".main-prodoffer-detail",
			                this.controller.mainProdOfferWidget.domNode);
			        var prodOfferAssureInfo = null;
			        if (mainDetailNode.length > 0) {
				        if (util.AttrUtil.checkedIfNeedShow(attrList)) { return false; }
				        var detailData = !!detailWidget ? detailWidget.mainProdOfferDetailData : null;
				        prodOfferAssureInfo = !!detailData ? detailData.prodOfferAssurePageInfoList : [];
			        }
			        return prodOfferAssureInfo;
		        },
		        
		        /**
		         * 构建成员销售品标准化套餐对应的协议信息
		         */
		        doMemOfferStandardComputation : function(param, extendedData){
		        	var memProdOfferDetailWidget = param.prodOfferPageData.mainProdOfferDetailWidget;
		        	if (memProdOfferDetailWidget && memProdOfferDetailWidget.agreementAttrCardWidget) {
				        var _widget = memProdOfferDetailWidget.agreementAttrCardWidget,
					        prodOfferInfoVO = _widget.getModel().prodOfferInfoVO,
					        offerAgreementVO = prodOfferInfoVO.offerAgreementVO[0];
				        if (offerAgreementVO.templetId == '2') {
					        return this.beanBuildFactory.getOfferStandardBusTempVO(_widget.busCardInstance.getData(
					                function(data) {
						                var feeValue = !isNaN(data['300008']*100)?data['300008']*100:"",
							                needCharge = data['300009'];
						                data.feeValue = feeValue;
						                data.ifBudget = needCharge||"0";
						                return data;
						                
					                }));
				        } else {
					        return null;
				        }
				        
			        }
		        },
		        
		        /**
				 * 
				 * 构建标准化套餐对应的协议信息
				 * 
				 * @method
				 */
		        doOfferStandardComputation : function(param, extendedData) {
			        var mainProdOfferDetailWidget = this.controller.mainProdOfferDetailWidget;
			        if (mainProdOfferDetailWidget && mainProdOfferDetailWidget.agreementAttrCardWidget) {
				        var _widget = mainProdOfferDetailWidget.agreementAttrCardWidget,
					        prodOfferInfoVO = _widget.getModel().prodOfferInfoVO,
					        offerAgreementVO = prodOfferInfoVO.offerAgreementVO[0];
				        // FIXME 标准化套餐协议模板id目前写死了 以后可以需要采取配置的方式处理一下
				        if (offerAgreementVO.templetId == '2') {
					        return this.beanBuildFactory.getOfferStandardBusTempVO(_widget.busCardInstance.getData(
					                function(data) {
						                // FIXME 包年费用
						                var feeValue = !isNaN(data['300008']*100)?data['300008']*100:"",
							                // FIXME 是否需要缴费
							                needCharge = data['300009'];
						                data.feeValue = feeValue;
						                data.ifBudget = needCharge||"0";
						                return data;
						                
					                }));
				        } else {
					        return null;
				        }
				        
			        }
			        
		        },
		        /**
				 * 计算本次受理产品变化的一些信息,比如operKind,目前都是写死的值,以后从常量接口中取值
				 * 
				 * @param {Object} param.productInfoVO
				 * @param {Object} param.prodInstVO
				 * @param {Object} param.prodPageData
				 * 
				 * 
				 * @method
				 */
		        doProductAcceptInfoComputation : function(param) {
			        return {
				        operKind : 1,
				        ActionCD : ConstantsPool.ActionCDConst.PRODUCT_INSTALL
			        };
		        },
		        /**
				 * 复制基本属性
				 * 
				 * @method
				 */
		        _cloneBasicProperty : function(value) {
			        if (!dojo.isObject(value)) {
				        return value;
			        } else {
				        if (BusCard.isObject(value)) {
					        var _obj = {};
					        BusCard.each(value, function(index, _propValue) {
						                var toString = Object.prototype.toString,
							                type = toString.call(_propValue);
						                if (/String/i.test(type) || /Number/i.test(type) || /Boolean/i.test(type)) {
							                _obj[index] = _propValue;
						                }
						                
					                }, true);
					        return _obj;
					        
				        } else {
					        return {};
				        }
			        }
			        
		        },
		        /**
				 * 计算接入类产品变化以及其他的一些受理信息
				 * 
				 * @method
				 */
		        doAccessProductAcceptInfoComputation : function(param) {
			        var prodPageData = param.prodPageData,
				        userId = prodPageData.prodBasicInfo.userId,
				        prodInstId = prodPageData.prodBasicInfo.prodInstId;
			        // 如果是老的接入类,取老的实例信息和变更信息作为订单提交数据的一部分
			        if (userId && parseInt(userId + "") > 0) {
				        var relaProdInfoVO = util.ProdOfferInstProvider.queryRelaProdInfoVO(userId),
					        result = dojo.mixin(this._cloneBasicProperty(relaProdInfoVO), {
						                operKind : 2,
						                ActionCD : ConstantsPool.ActionCDConst.PRODUCT_CHANGE
					                });
				        var quitServiceOfferId = this.controller
				                .getServiceOfferConfigVO(util.ACTION_CD_CONST.PRODOFFER_CANCEL_ACTION).serviceOfferId;
				        try {
					        if (quitServiceOfferId == prodPageData.serviceInfo.serviceOfferId) {
						        dojo.mixin(result, {
							                operKind : 3,
							                ActionCD : ConstantsPool.ActionCDConst.PRODUCT_QUIT
						                });
					        }
					        
				        }
				        catch (e) {

				        }
				        
				        return result;
				        
			        } else {
				        return {
					        operKind : 1,
					        ActionCD : ConstantsPool.ActionCDConst.PRODUCT_INSTALL
				        };
				        
			        }
			        
		        },
		        
		        /**
				 * 构建主销售品相关信息,主要包括主销售品下的销售品基本信息(对应java端ProdOfferAcceptInfoVO),
				 * 接入类产品信息(对应java端RelaProdInfoVO),
				 * 接入类产品对应的服务信息(对应java端SerPageVO)
				 * 
				 * @method
				 */
		        doMainProdOfferInfoComputation : function() {
			        // 加载页面数据到当前的计算流程中,仅仅搜集页面数据
			        this.loadMainProdOfferPageData();
			        var mainProdOfferPageData = dojo.global.$appContext$.get(this.MAIN_KEY);
			        // 如果在收集页面数据过程中报错,直接返回false
			        if (!mainProdOfferPageData) { return false; }
			        // 获取当前受理的主销售品信息(产品配置层面的)
			        var prodOfferInfoVO = util.ProdOfferHelper.getMainProdOffer(dojo.global.$appContext$
			                .get("prodOfferList"))[0],
				        mainOfferInstVO = dojo.global.$appContext$.get("mainProdOfferInstVO"),
				        prodOfferAcceptInfoVO = null,
				        // 复制一份规格层面的销售品信息作为订单提交数据的模板
				        clonedProdOfferInfoVO = this._cloneBasicProperty(prodOfferInfoVO),
				        // 取订单受理请求参数
				        requestParam = dojo.global.$appContext$.get("requestParam"),
				        // 获取页面填写的公共信息 比如belongCode
				        commInfo = this.getCommInfo(),
				        // 获取销售品失效失效时间
				        dateResult = this.doProdOfferDateComputation(mainProdOfferPageData, clonedProdOfferInfoVO),
				        extendedData = {},
				        selectedProductList = null,
				        accessProdAcceptInfoList = null,
				        serviceProdAcceptInfoList = null,
				        builder = this;
			        // 把一些公共信息放置到extendedData中供产品以及属性继承
			        dojo.mixin(extendedData, commInfo);
			        dojo.mixin(extendedData, dateResult);
			        
			        // 把客户信息放入到主销售品提交数据模板中
			        dojo.mixin(clonedProdOfferInfoVO, requestParam);
			        dojo.mixin(clonedProdOfferInfoVO, requestParam.customerData);
			        
			        // 把页面上的一些公共信息放入到主销售品的提交数据模板中
			        dojo.mixin(clonedProdOfferInfoVO, commInfo);
			        
			        // 把页面上展现内容放入到当前提交数据中
			        dojo.mixin(clonedProdOfferInfoVO, mainProdOfferPageData.prodOfferPageInfo);
			        
			        // 把页面受理的生效失效时间放入到主销售品提交数据模板中
			        dojo.mixin(clonedProdOfferInfoVO, dateResult),

			        dojo.mixin(clonedProdOfferInfoVO, {
				                "prodOfferInstId" : -util.CommUtils.generateUniqueId()
			                });
			        // 把销售品变更信息放入到主销售品提交数据模板中
			        dojo.mixin(clonedProdOfferInfoVO, this.doMainProdOfferAcceptInfoComputation({
				                        prodOfferInfoVO : prodOfferInfoVO,
				                        offerInstVO : null,
				                        prodOfferPageData : mainProdOfferPageData
			                        }));
			        
			        // 纠正数据规格层面和实例层面名称不一致的属性
			        dojo.mixin(clonedProdOfferInfoVO, {
				                "prodOfferType" : prodOfferInfoVO.prodOfferType,
				                "offerKind" : prodOfferInfoVO.offerKind,
				                "billMode" : prodOfferInfoVO.feeType,
				                "ifAdded" : prodOfferInfoVO.ifAdded,
				                "offerNbr" : prodOfferInfoVO.offerNbr
			                });
			        // 从主销售品数据模板构建一份与服务器端对应bean完全映射的js对象
			        prodOfferAcceptInfoVO = this.buildProdOfferAcceptInfoVO(clonedProdOfferInfoVO);
			        
			        // ================处理主销售品下详情信息 /begin
			        // 构建主销售品的属性信息并附加到prodOfferAcceptInfoVO上
			        var offerAttrInfoList = builder.doMainProdOfferAttrInfoComputation({
				                prodOfferInfoVO : prodOfferInfoVO,
				                offerInstVO : !!mainOfferInstVO ? mainOfferInstVO : null,
				                prodOfferPageData : mainProdOfferPageData
			                }, extendedData);
			        if (offerAttrInfoList === false) { return false; }
			        dojo.mixin(prodOfferAcceptInfoVO, {
				                offerInstAttrList : offerAttrInfoList
			                });
			        // 构建销售品下的亲情信息集合
			        var relaFavourData = this.doRelaBusTempListComputation(mainProdOfferPageData);
			        var relaBusInfoList = relaFavourData.relaBusInfoList;
			        var ocsRelaList = relaFavourData.ocsRelaList;
			        prodOfferAcceptInfoVO.relaBusInfoList = relaBusInfoList || [];
			        prodOfferAcceptInfoVO.ocsRelaList = ocsRelaList || [];
			        // 构建主销售品的担保信息并附加到prodOfferAcceptInfoVO上
			        var prodOfferAssureInfo = builder.doMainProdOfferAssureInfoComputation({
				                prodOfferInfoVO : prodOfferInfoVO,
				                offerInstVO : !!mainOfferInstVO ? mainOfferInstVO : null,
				                prodOfferPageData : mainProdOfferPageData
			                }, extendedData);
			        if (!!prodOfferAssureInfo) {
				        if (!prodOfferAcceptInfoVO.prodOfferInstAssureList
				                || prodOfferAcceptInfoVO.prodOfferInstAssureList.length <= 0) {
					        prodOfferAcceptInfoVO.prodOfferInstAssureList = [];
				        }
				        dojo.mixin(prodOfferAcceptInfoVO, {
					                prodOfferInstAssureList : prodOfferAcceptInfoVO.prodOfferInstAssureList
					                        .push(prodOfferAssureInfo)
				                });
			        }
			        
			        // 非自主版处理担保信息，自主版处理在doMultipleMainProdOfferComputation中
			        if (prodOfferAcceptInfoVO.bindType != 2) {
				        prodOfferAcceptInfoVO.prodOfferInstAssureList = prodOfferAcceptInfoVO.prodOfferInstAssureList
				                || [];
				        dojo.forEach(mainProdOfferPageData.productInfoList || [], function(prodPageInfoData) {
					                if (!!prodPageInfoData.assureInfo && !!prodPageInfoData.assureInfo.securityMethodCd
					                        && prodPageInfoData.assureInfo.securityMethodCd != "") {
						                // 担保值记录到表里为分
						                var securityFee = prodPageInfoData.assureInfo.securityFee;
						                if (!!securityFee && !isNaN(parseFloat(securityFee))) {
							                prodPageInfoData.assureInfo.securityFee = parseFloat(securityFee) * 100;
						                }
						                prodPageInfoData.assureInfo.assureAttrList = [];
						                // 50030 担保证件类型
						                prodPageInfoData.assureInfo.assureAttrList.push({
							                        "attrId" : 50030,
							                        "attrValue" : !!prodPageInfoData.assureInfo.identityKind?prodPageInfoData.assureInfo.identityKind:""
						                        });
						                // 50031 担保证件号码
						                prodPageInfoData.assureInfo.assureAttrList.push({
							                        "attrId" : 50031,
							                        "attrValue" : !!prodPageInfoData.assureInfo.identityCode?prodPageInfoData.assureInfo.identityCode:""
						                        });
						                // 50032 担保联系电话
						                prodPageInfoData.assureInfo.assureAttrList.push({
							                        "attrId" : 50032,
							                        "attrValue" : !!prodPageInfoData.assureInfo.contactPhone?prodPageInfoData.assureInfo.contactPhone:""
						                        });
						                // 50033 担保联系地址
						                prodPageInfoData.assureInfo.assureAttrList.push({
							                        "attrId" : 50033,
							                        "attrValue" : !!prodPageInfoData.assureInfo.contactAddress?prodPageInfoData.assureInfo.contactAddress:""
						                        });
						                prodOfferAcceptInfoVO.prodOfferInstAssureList.push(builder
						                        .buildProdOfferInstAssureVO(prodPageInfoData.assureInfo));
					                }
				                });
			        }
			        // ================处理主销售品下详情信息 /end
			        
			        // ================处理主销售品下产品信息 /begin
			        
			        // 过滤出所有主销售品下选择的产品信息
			        selectedProductList = BusCard.findAll(mainProdOfferPageData.productInfoList || [], function(
			                        prodPageInfoData) {
				                return prodPageInfoData.prodBasicInfo.productChecked == true;
			                });
			        // 构建服务器端对应的产品提交信息集合(与java端ProdOfferAcceptInfoVO/relaProdInfoList对应)
			        accessProdAcceptInfoList = dojo.map(selectedProductList, function(prodPageInfoData) {
				                return builder.doAccessProductInfoComputation(prodOfferInfoVO, prodPageInfoData,
				                        extendedData);
			                });
			        // 构建基础包下的产品信息
			        serviceProdAcceptInfoList = this.doBuildServiceProdInfoComputation(selectedProductList,
			                prodOfferInfoVO, extendedData);
			        
			        // 把接入类产品提交信息附加到销售品提交信息VO上
			        prodOfferAcceptInfoVO.accessProdAcceptInfoList = accessProdAcceptInfoList;
			        // 把功能s类产品提交信息附加到销售品提交信息VO上
			        prodOfferAcceptInfoVO.serviceProdAcceptInfoList = serviceProdAcceptInfoList;
			        
			        // 处理标准化套餐协议信息
			        var _standerdBusTempVO = this.doOfferStandardComputation({
				                prodOfferInfoVO : prodOfferInfoVO,
				                offerInstVO : null,
				                prodOfferPageData : mainProdOfferPageData
			                }, extendedData);
			        prodOfferAcceptInfoVO.offerStandardBusTempVOList = _standerdBusTempVO ? [_standerdBusTempVO] : null;
			        
			        // ================处理主销售品下产品信息 /end
			        return {
				        prodOfferAcceptInfoVO : prodOfferAcceptInfoVO
			        };
			        
		        },
		        
		        /**
				 * 构建基础包下的功能类产品
				 */
		        doBuildServiceProdInfoComputation : function(selectedProductList, prodOfferInfoVO, extendedData) {
			        var serviceProdAcceptInfoList = [];
			        var dataBuilder = this;
			        dojo.forEach(selectedProductList || [], function(prodPageInfoData) {
				                dojo.forEach(prodPageInfoData.serviceProductInfo || [], function(oneServiceProduct) {
					                        serviceProdAcceptInfoList = serviceProdAcceptInfoList.concat(dataBuilder
					                                .doBuildOneProductInfo(oneServiceProduct, prodOfferInfoVO,
					                                        extendedData));
				                        });
			                });
			        return serviceProdAcceptInfoList;
		        },
		        /**
				 * 构建单一的功能类产品信息集合
				 */
		        doBuildOneProductInfo : function(relaProdPageInfo, prodOfferInfoVO, extendedData) {
			        
			        var dataBuilder = this,
				        productId = relaProdPageInfo.prodBasicInfo.productId,
				        prodInstVO = !!relaProdPageInfo.prodBasicInfo.prodInstInfo
				                ? relaProdPageInfo.prodBasicInfo.prodInstInfo
				                : null,
				        extendedData = extendedData || {},
				        prodAttrInfoList = null;
			        var virtualUserId = dataBuilder.getVirtualUserId(relaProdPageInfo.uniqueId),
				        userIdInfo = {
					        userId : virtualUserId,
					        accProdInstId : virtualUserId,
					        prodInstId : prodInstVO != null ? prodInstVO.prodInstId : -1
				        },
				        offerProdRelaVO = BusCard.find($ac$.get("serviceProdList-" + relaProdPageInfo.uniqueId),
				                function(offerProdRelaVO) {
					                return offerProdRelaVO.productId == productId;
					                
				                }),
				        clonedProductInfoVO = this._cloneBasicProperty(offerProdRelaVO.productInfoVO);
			        
			        dojo.mixin(clonedProductInfoVO, offerProdRelaVO);
			        dojo.mixin(clonedProductInfoVO, extendedData);
			        
			        dojo.mixin(clonedProductInfoVO, dataBuilder.doSerProductAcceptInfoComputation({
				                        productInfoVO : offerProdRelaVO.productInfoVO,
				                        prodInstVO : prodInstVO,
				                        prodPageData : relaProdPageInfo
				                        
			                        }));
			        dojo.mixin(clonedProductInfoVO, userIdInfo);
			        /*
					 * ===================spec property set
					 * /begin===================
					 */
			        clonedProductInfoVO.prodId = productId;
			        clonedProductInfoVO.prodOfferId = prodOfferInfoVO.prodOfferId;
			        clonedProductInfoVO.prodType = offerProdRelaVO.productInfoVO.prodBundleType;
			        clonedProductInfoVO.prodTypeCd = offerProdRelaVO.productInfoVO.prodBundleType;
			        clonedProductInfoVO.prodName = offerProdRelaVO.productInfoVO.productName;
			        if (util.PRODUCTTYPE.ACCESS_PROD_TYPE == offerProdRelaVO.productInfoVO.prodFuncType) {
				        clonedProductInfoVO.ifNeedCreateProdInst = 0;
			        } else {
				        clonedProductInfoVO.ifNeedCreateProdInst = 1;
			        }
			        if (offerProdRelaVO.productInfoVO.prodCompDetailList
			                && offerProdRelaVO.productInfoVO.prodCompDetailList.length > 0) {
				        clonedProductInfoVO.relaType = util.PRODOFFERTYPE.OFFER_COMB_MEMBER;
			        } else {
				        clonedProductInfoVO.relaType = util.PRODOFFERTYPE.OFFER_PRODUCT;
			        }
			        // 访问级别默认为服务级别
			        if (!clonedProductInfoVO.accessLevel) {
				        clonedProductInfoVO.accessLevel = ConstantsPool.AccessLevelConst.SERVICE_LEVEL;
			        }
			        /*
					 * ===================spec property set
					 * /end===================
					 */
			        //选中状态，并且有实例信息
			        if(relaProdPageInfo.prodBasicInfo.checkedStatus&&(!!relaProdPageInfo.prodBasicInfo.prodInstInfo)){
			        	clonedProductInfoVO.operKind = 2;
			        	clonedProductInfoVO.effDate = relaProdPageInfo.prodBasicInfo.prodInstInfo.beginRentTime;
			        	clonedProductInfoVO.expDate = relaProdPageInfo.prodBasicInfo.prodInstInfo.stopRentTime;
			        	clonedProductInfoVO.beginRentTime = relaProdPageInfo.prodBasicInfo.prodInstInfo.beginRentTime;
			        	clonedProductInfoVO.stopRentTime = relaProdPageInfo.prodBasicInfo.prodInstInfo.stopRentTime;
			        }else if((!(relaProdPageInfo.prodBasicInfo.checkedStatus))&&(!!relaProdPageInfo.prodBasicInfo.prodInstInfo)){
			        	clonedProductInfoVO.operKind = 3;
			        	clonedProductInfoVO.effDate = relaProdPageInfo.prodBasicInfo.prodInstInfo.beginRentTime;
			        	clonedProductInfoVO.expDate = dojo.global.$appContext$.requestParam.today;
			        	clonedProductInfoVO.beginRentTime = relaProdPageInfo.prodBasicInfo.prodInstInfo.beginRentTime;
			        	clonedProductInfoVO.stopRentTime = relaProdPageInfo.prodBasicInfo.prodInstInfo.stopRentTime;
			        }else if(relaProdPageInfo.prodBasicInfo.checkedStatus&&(!relaProdPageInfo.prodBasicInfo.prodInstInfo)){
			        	clonedProductInfoVO.operKind = 1;
			        	clonedProductInfoVO.effDate = dojo.global.$appContext$.requestParam.today;
			        	clonedProductInfoVO.expDate = "2037-01-01 00:00:00";
			        }
			        prodAttrInfoList = dataBuilder.doSerProdAttrListComputation(offerProdRelaVO.productInfoVO,
			                relaProdPageInfo, extendedData);
			        
			        clonedProductInfoVO.prodInstAttrList = prodAttrInfoList;
			        
			        return clonedProductInfoVO;
			        
		        },
		        /**
				 * 构建可能退订的主销售品信息
				 * 
				 * @method
				 */
		        doQuitMainProdOfferInfoComputation : function(mainProdOfferCPResult,subProdOfferCPresult) {
			        var quitViewList = dojo.query(".mainprodoffer-class-quit",
			                this.controller.mainProdOfferWidget.domNode),
				        builder = this,
				        prodOfferQuitServiceOfferId = this.controller
				                .getServiceOfferConfigVO(util.ACTION_CD_CONST.OFFER_CANCEL).serviceOfferId,
				        productQuitServiceOfferId = this.controller
				                .getServiceOfferConfigVO(util.ACTION_CD_CONST.PRODUCT_QUIT).serviceOfferId,
				        provider = util.ProdOfferInstProvider,
				        prodOfferAcceptInfoList = dojo.map(quitViewList, function(dom) {
					                var prodOfferInstId = dojo.attr(dom, "prodOfferInstId"),
						                expDate = dojo.trim(dojo.query(".endDate-class", dom)[0].innerHTML),
						                prodOfferAcceptInfoVO = provider.queryProdOfferAcceptInfoVO(prodOfferInstId),
						                clonedProdOfferAcceptInfoVO = dojo.clone(prodOfferAcceptInfoVO);
					                clonedProdOfferAcceptInfoVO.relaProdInfoList = null;
					                clonedProdOfferAcceptInfoVO.offerAttrInfoList = null;
					                clonedProdOfferAcceptInfoVO.relaBusInfoList = null;
					                clonedProdOfferAcceptInfoVO.resRelaInfoList = null;
					                clonedProdOfferAcceptInfoVO.offerInstAttrList = null;
					                clonedProdOfferAcceptInfoVO.prodOfferAcceptList = null;
					                dojo.mixin(clonedProdOfferAcceptInfoVO, {
						                        operKind : 3,
						                        serviceOfferId : prodOfferQuitServiceOfferId,
						                        expDate : expDate,
						                        prodOfferType : dojo.attr(dom, "prodOfferType"),
						                        offerKind : dojo.attr(dom, 'offerKind')
					                        });
					                clonedProdOfferAcceptInfoVO.serviceProdAcceptInfoList =builder.createQuitServiceProdList(mainProdOfferCPResult,subProdOfferCPresult,prodOfferInstId);
					                // 处理标准化套餐协议信息
					                prodOfferAcceptInfoVO.offerStandardBusTempVOList = builder
					                        .doComputationOfferStandardBusInfo(prodOfferInstId,
					                                clonedProdOfferAcceptInfoVO);
					                return builder.buildProdOfferAcceptInfoVO(clonedProdOfferAcceptInfoVO);
					                
				                })
				                || [];
			        
			        // 把退网的接入类产品和退订的主套餐放在一组
			        
			        var accessProdAcceptInfoList = mainProdOfferCPResult.prodOfferAcceptInfoVO.accessProdAcceptInfoList
			                || [];
			        dojo.forEach(prodOfferAcceptInfoList, function(prodOfferAcceptInfoVO) {
				                prodOfferAcceptInfoVO.accessProdAcceptInfoList = [];
				                // 订单对应的销售品实例信息
				                var offerInstVO = provider
				                        .queryProdOfferAcceptInfoVO(prodOfferAcceptInfoVO.prodOfferInstId),
					                // 所有退订的产品信息
					                quitAccessProdAcceptInfoList = BusCard.jsonPath(accessProdAcceptInfoList,
					                        "$[?(@.serviceOfferId==" + productQuitServiceOfferId + ")]")
					                        || [];
				                // 过滤出所有关联的退订的产品
				                dojo.forEach(quitAccessProdAcceptInfoList, function(accessProdAcceptInfo) {
					                        var prodInstId = accessProdAcceptInfo.prodInstId,
						                        isContained = dojo.some(offerInstVO.prodInstList || [], function(
						                                        prodInstVO) {
							                                return prodInstVO.prodInstId == prodInstId;
						                                });
					                        if (isContained) {
						                        prodOfferAcceptInfoVO.accessProdAcceptInfoList
						                                .push(accessProdAcceptInfo);
					                        }
					                        
				                        });
				                
			                });
			        
			        var filteredQuitAccessProdAcceptList = BusCard.jsonPath(prodOfferAcceptInfoList,
			                "$[*].accessProdAcceptInfoList[*]")
			                || [],
				        _list = dojo.filter(accessProdAcceptInfoList, function(v1) {
					                return !dojo.some(filteredQuitAccessProdAcceptList, function(v2) {
						                        return v1 === v2;
					                        });
					                
				                });
			        
			        accessProdAcceptInfoList.length = 0;
			        
			        Array.prototype.push.apply(accessProdAcceptInfoList, _list || []);
			        
			        return prodOfferAcceptInfoList;
			        
		        },
		        
		        /**
		         * 创建退订的功能产品集合
		         */
		        createQuitServiceProdList : function(mainProdOfferCPResult,subProdOfferCPresult,prodOfferInstId){
		        	var dataBuilder = this;
		        	var getServiceProdList = function(prodOfferInfo,prodInstList){
		        		var _serviceProdAcceptInfoList = [];
		        		//过滤出肯定退订的功能产品(旧的主销售品下有，新的主销售品下没有的功能产品)
		        		_serviceProdAcceptInfoList = _serviceProdAcceptInfoList.concat(dojo.filter(prodInstList||[],function(prodInstVO){
		        			return !dojo.some(prodOfferInfo.serviceProdAcceptInfoList||[],function(serviceProdAcceptInfo){
		        				return serviceProdAcceptInfo.productId == prodInstVO.productId;
		        			});
		        		}));
		        		//过滤出已经退订
		        		var delServiceProdList = [];
		        		var keepServiceProdList = [];
		        		dojo.forEach(prodOfferInfo.serviceProdAcceptInfoList||[],function(serviceProdAcceptInfo){
		        			if(serviceProdAcceptInfo.operKind == 3){
		        				delServiceProdList.push(BusCard.find(prodInstList||[],function(prodInstVO){
		        					return serviceProdAcceptInfo.prodInstId == prodInstVO.prodInstId;
		        				}));
		        			}else{
		        				keepServiceProdList.push(serviceProdAcceptInfo);
		        			}
		        		});
		        		//重新设置功能类产品信息
		        		prodOfferInfo.serviceProdAcceptInfoList = keepServiceProdList;
		        		_serviceProdAcceptInfoList = _serviceProdAcceptInfoList.concat(delServiceProdList);
		        		return dojo.map(_serviceProdAcceptInfoList||[],function(_serviceProdAcceptInfo){
		        			//拷贝一份实例数据
		        			var cloneProdInfoVO = dataBuilder._cloneBasicProperty(_serviceProdAcceptInfo);
		        			//拼成退订
		        			cloneProdInfoVO.operKind = 3;
		        			//拼产品的生效时间
		        			cloneProdInfoVO.effDate = _serviceProdAcceptInfo.beginRentTime;
		        			//销售品失效
		        			cloneProdInfoVO.expDate = util.DateHelper.formatDate(util.DateHelper.getFirstDayAfterPeriod());
		        			//退订的属性
		        			return dataBuilder.buildServiceProdAcceptInfoVO(cloneProdInfoVO);
		        		});
		        	};
		        	//获取可选包
		        	var prodOfferAcceptInfoList = subProdOfferCPresult.prodOfferAcceptInfoList || [];
		        	//当前正在受理的销售品
		        	var mainProdOfferVO = $ac$.selectedMainProdOfferInfoVO;
		        	var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
	        		var targetSelectMem = dojo.filter(selectedMemberProdOfferList||[],function(_data){
						return _data.offerInstVO&&_data.offerInstVO.prodOfferInstId == prodOfferInstId;
					});
		        	//区分自主版还是但套餐
				    if(mainProdOfferVO.bindType == 2){
						if(targetSelectMem.length>0&&targetSelectMem[0].prodInstVO){
							var prodInstList = targetSelectMem[0].prodInstVO.prodInstList||[];
							//针对退网的，said by xupeng 竣工处理退订的功能产品实例 2012-9-15
							var userId = targetSelectMem[0].prodInstVO.prodInstId;
							//找出含有这个接入类的成员销售品
							var prodOfferInfo = BusCard.find(prodOfferAcceptInfoList||[],function(prodOfferAcceptInfo){
								return prodOfferAcceptInfo.prodOfferType == 1 && dojo.some(prodOfferAcceptInfo.accessProdAcceptInfoList||[],function(accessProdAcceptInfo){
									return accessProdAcceptInfo.userId == userId;
								});
							});
							if(!prodOfferInfo){
								return [];
							}
							//获取销售品下的功能产品
							return getServiceProdList(prodOfferInfo,prodInstList);
						}
				    }else{
						if(targetSelectMem.length>0&&targetSelectMem[0].prodInstVO){
							var prodInstList = targetSelectMem[0].prodInstVO.prodInstList||[];
				    		return getServiceProdList(mainProdOfferCPResult.prodOfferAcceptInfoVO,prodInstList);
						}
				    }
				    return [];
		        },
		        
		        /**
				 * 计算退订协议的时间
				 */
		        doComputationOfferStandardBusInfo : function(prodOfferInstId, prodOfferAcceptInfoVO) {
			        return null;
		        },
		        /**
				 * 根据serviceKind和serviceKindIndex页面信息,或者uniqueId页面信息,
				 * 获取唯一的userId信息;如果是老用户,userId就是老用户实际的userId;
				 * 如果是新用户,userId是虚拟出来的,负数表示; 这个方法在所有业务受理流程中都应保持相同
				 * 
				 * @method
				 */
		        getVirtualUserId : function() {
			        try {
				        if (typeof arguments[0] == 'object') {
					        var basicInfo = arguments[0].prodBasicInfo;
					        return arguments.callee.apply(this, [basicInfo.uniqueId])
					                || arguments.callee
					                        .apply(this, [basicInfo.serviceKind, basicInfo.serviceKindIndex]);
					        
				        }
				        if (arguments.length == 1) {
					        return dojo.global.$appContext$.get(this.USER_ID_KEY)["userId@uniqueId_" + arguments[0]];
				        } else if (arguments.length == 2) { return dojo.global.$appContext$.get(this.USER_ID_KEY)["userId@"
				                + arguments[0] + "_" + arguments[1]]; }
			        }
			        catch (e) {
				        return null;
			        }
		        },
		        /**
				 * 变更时针对老的用户需要取实际的userId,新增的生成虚拟userId,
				 * 为了区分和正式的userId,虚拟userId,使用负数表示;
				 * 并把相应的userId和serviceKind,serviceKindIndex以及uniqueId等
				 * 页面收集到的属性关联起来供外部使用; 新装也可能有老用户
				 * 
				 * @method
				 */
		        generateVirtualUserId : function(prodPageInfoData) {
			        var id = prodPageInfoData.prodBasicInfo.userId || -util.CommUtils.generateUniqueId(),
				        map = dojo.global.$appContext$.get(this.USER_ID_KEY) || {},
				        serviceKind = prodPageInfoData.prodBasicInfo.serviceKind,
				        serviceKindIndex = prodPageInfoData.prodBasicInfo.serviceKindIndex;
			        if (serviceKind && serviceKindIndex != null) {
				        map["userId@" + serviceKind + "_" + serviceKindIndex] = id;
			        } else {
				        var productId = prodPageInfoData.prodBasicInfo.productId;
				        if (typeof console != 'undefined') {
					        console
					                .warn("serviceKind or serviceKindIndex can't found when set virtual userId for product:"
					                        + productId);
				        }
				        
			        }
			        map["userId@uniqueId_" + prodPageInfoData.prodBasicInfo.uniqueId] = id;
			        dojo.global.$appContext$.set(this.USER_ID_KEY, map);
			        return id;
			        
		        },
		        
		        /**
				 * 计算订购的主销售品生效生效时间, 如果销售品是变更或者退订,需要重写此方法
				 * 
				 * @method
				 */
		        doProdOfferDateComputation : function(prodOfferPageData, prodOfferInfoVO, changKind) {
			        var prodOfferPageInfo = prodOfferPageData.prodOfferPageInfo,
				        productDateBuilder = util.ProdOfferHelper.getProductDateBuilder(prodOfferInfoVO, {
					                "changeKind" : changKind || 1,
					                "delayUnit" : prodOfferPageInfo.delayUnit||0,
					                "delayTime" : prodOfferPageInfo.delayTime||0,
					                "validType" : prodOfferPageInfo.validType,
					                "validPeriod" : prodOfferPageInfo.validPeriod,
					                "beginDate" : prodOfferPageInfo.beginDate,
					                "endDate" : prodOfferPageInfo.endDate,
					                "delayUnorderUnit" : prodOfferPageInfo.delayUnorderUnit,
					                "delayUnorderTime" : prodOfferPageInfo.delayUnorderTime,
					                "ifChangeMainFlag" : prodOfferPageInfo.ifChangeMainFlag
				                });
			        return {
				        effDate : productDateBuilder.getBeginDate(),
				        expDate : productDateBuilder.getEndDate()
			        };
			        
		        },
		        /**
				 * 当为拆分时,需要取出拆分的成员销售品信息; 当退网时,需要取出退网的对应的销售品信息
				 * 
				 * @method
				 */
		        _doGetMemberProdOfferInfoVO : function(prodPageInfoData) {
			        var uniqueId = prodPageInfoData.prodBasicInfo.uniqueId,
				        serviceOfferId = prodPageInfoData.serviceInfo.serviceOfferId,
				        quitServiceOfferId = this.controller
				                .getServiceOfferConfigVO(util.ACTION_CD_CONST.PRODOFFER_CANCEL_ACTION).serviceOfferId;
			        if ($ac$.get("prodOfferList" + uniqueId)) {
				        return util.ProdOfferHelper.getMainProdOffer($ac$.get("prodOfferList" + uniqueId))[0];
				        
			        } else if (serviceOfferId == quitServiceOfferId) {
				        var prodOfferInfoVO = util.ProdOfferHelper.getProdOfferDetail(this
				                        ._doGetMemberProdOfferId(prodPageInfoData), {
					                permitCache : true,
					                permitFromCache : true,
					                interfaceType : 3,
					                assertCacheResult : function(p) {
						                return p && p.offerProdRelaList && p.offerProdRelaList.length > 0;
						                
					                }
				                });
				        
				        return prodOfferInfoVO;
				        
			        }
			        
		        },
		        /**
				 * 获取成员销售品id
				 * 
				 * @method
				 */
		        _doGetMemberProdOfferId : function(prodPageInfoData) {
			        var uniqueId = prodPageInfoData.prodBasicInfo.uniqueId;
			        var selectedMemberInfo = BusCard.jsonPath($ac$.get("selectedMemberProdOfferList"),
			                "$[?(@.action=='quit'&& @.uniqueId==" + uniqueId + ")]");
			        if (selectedMemberInfo) { return selectedMemberInfo[0].offerInstVO.prodOfferId; }
			        
		        },
		        /**
				 * 处理接入类产品的计算过程,生成和服务端(ProdOfferAcceptInfoVO/relaProdInfoList)对应的
				 * 前端js表示
				 * 
				 * @method
				 */
		        doAccessProductInfoComputation : function(prodOfferInfoVO, prodPageInfoData, extendedData) {
			        var productId = prodPageInfoData.prodBasicInfo.productId,
				        extendedData = extendedData || {},
				        prodAttrInfoList = null,
				        tempOneStopCustInfo = null,
				        relaProdInfoVO = null,
				        // 获取对应的userId信息
				        virtualUserId = !!this.getVirtualUserId(prodPageInfoData) ? this
				                .getVirtualUserId(prodPageInfoData) : this.generateVirtualUserId(prodPageInfoData),
				        userIdInfo = {
					        userId : virtualUserId,
					        prodInstId : virtualUserId
				        };
			        prodOfferInfoVO = this._doGetMemberProdOfferInfoVO(prodPageInfoData) || prodOfferInfoVO;
			        // 获取销售品产品关联VO(产品规格层面的)
			        var offerProdRelaVO = BusCard.find(util.ProdOfferHelper.getProductList(true, prodOfferInfoVO),
			                function(offerProdRelaVO) {
				                return offerProdRelaVO.productId == productId;
				                
			                }),
				        // 复制一份规格层面的产品信息作为产品提交数据构建的模板
				        clonedProductInfoVO = this._cloneBasicProperty(offerProdRelaVO.productInfoVO);
			        dojo.mixin(clonedProductInfoVO, this._cloneBasicProperty(offerProdRelaVO));
			        // 把从销售品继承来失效失效时间以及页面公共信息(比如belongCode)附加到产品提交数据模板中
			        dojo.mixin(clonedProductInfoVO, extendedData);
			        
			        // ==================产品规格层面和实例层面不一致属性处理 /begin
			        clonedProductInfoVO.prodId = productId;
			        clonedProductInfoVO.prodOfferId = this._doGetMemberProdOfferId(prodPageInfoData)
			                || prodOfferInfoVO.prodOfferId;
			        clonedProductInfoVO.prodType = offerProdRelaVO.productInfoVO.prodBundleType;
			        clonedProductInfoVO.prodTypeCd = offerProdRelaVO.productInfoVO.prodBundleType;
			        clonedProductInfoVO.prodName = offerProdRelaVO.productInfoVO.productName;
			        if (offerProdRelaVO.productInfoVO.prodCompDetailList
			                && offerProdRelaVO.productInfoVO.prodCompDetailList.length > 0) {
				        clonedProductInfoVO.relaType = util.PRODOFFERTYPE.OFFER_COMB_MEMBER;
			        } else {
				        clonedProductInfoVO.relaType = util.PRODOFFERTYPE.OFFER_PRODUCT;
			        }
			        // 访问级别默认为服务级别
			        if (!clonedProductInfoVO.accessLevel) {
				        clonedProductInfoVO.accessLevel = ConstantsPool.AccessLevelConst.SERVICE_LEVEL;
			        }
			        // ==================产品规格层面和实例层面不一致属性处理 /end
			        tempOneStopCustInfo = this.doComputationOneStopCustInfo(prodPageInfoData);
			        // 构建产品下的属性信息集合,与java端RelaProdInfoVO/prodAttrInfoList对应
			        prodInstAttrList = this.doAccessProdAttrInfoListComputation(offerProdRelaVO.productInfoVO,
			                prodPageInfoData, extendedData);
			        // 把产品变化信息附加到产品提交数据模板中
			        dojo.mixin(clonedProductInfoVO, this.doAccessProductAcceptInfoComputation({
				                        productInfoVO : offerProdRelaVO.productInfoVO,
				                        prodInstVO : null,
				                        prodPageData : prodPageInfoData
				                        
			                        }));
			        // 由于服务信息可修改，将修改后的服务信息覆盖实例信息
			        // 把服务信息附加到提交模板中
			        dojo.mixin(clonedProductInfoVO, prodPageInfoData.serviceInfo);
			        // 把userId信息附件到产品提交数据模板中
			        dojo.mixin(clonedProductInfoVO, userIdInfo);
			        // 混入业务类型
			        dojo.mixin(clonedProductInfoVO, {
				                serviceKind : offerProdRelaVO.productInfoVO.netType
			                });
			        // 构建账号信息
			        var acctNbrTempList = this.doAccNbrInfoComputation(prodPageInfoData.serviceInfo);
			        // 从产品提交数据模板中构建一份和java端RelaProdInfoVO对应的前端js表示
			        relaProdInfoVO = this.buildAccessProdAcceptInfoVO(clonedProductInfoVO);
			        // 把产品属性信息附件到构建出来的relaProdInfoVO上
			        relaProdInfoVO.prodInstAttrList = prodInstAttrList;
			        relaProdInfoVO.acctNbrTempList = acctNbrTempList;
			        // 拼上一站式服务信息
			        relaProdInfoVO.oneStopCustInfoMgrVO = tempOneStopCustInfo;
			        return relaProdInfoVO;
			        
		        },
		        /**
				 * 计算接入类产品属性信息
				 */
		        doAccessProdAttrInfoListComputation : function(productInfoVO, prodPageInfoData, extendedData) {
			        return this.doProdAttrInfoListComputation(productInfoVO, prodPageInfoData, extendedData);
		        },
		        /**
				 * 计算一站式服务信息
				 */
		        doComputationOneStopCustInfo : function(data) {
			        var serviceInfo = data.serviceInfo;
			        if (serviceInfo.oneStop != "" && serviceInfo.oneStop != null) {
				        var tempOneStopInfo = {};
				        dojo.mixin(tempOneStopInfo, serviceInfo.oneStop);
				        return this.buildOneStopCustInfoMgrVO(tempOneStopInfo);
			        } else {
				        return null;
			        }
		        },
		        
		        /**
				 * 构建账号信息
				 */
		        doAccNbrInfoComputation : function(serviceInfo, ifManageAcct) {
			        if (!serviceInfo) { return null; }
			        var dataBuilder = this;
			        // 账号信息
			        var accNbrInfoList = serviceInfo.accountNbrChoose || [];
			        return dojo.map(accNbrInfoList, function(accNbrInfo) {
				        var relaProdInstId = "";
				        var accNbr = "";
				        if (accNbrInfo.sourceFlag != 3) {
					        relaProdInstId = accNbrInfo.prodInstId;
					        accNbr = accNbrInfo.serviceId;
				        } else {
					        var serviceKind = accNbrInfo.serviceKind;
					        var serviceKindIndex = accNbrInfo.serviceKindIndex;
					        // 获取当前受理的号码
					        var prodPageInfoData = {prodBasicInfo:{serviceKind:serviceKind,
					        						serviceKindIndex : serviceKindIndex,
					        						uniqueId : accNbrInfo.uniqueId}};
					        relaProdInstId = !!dataBuilder.getVirtualUserId(prodPageInfoData) ? dataBuilder
				                .getVirtualUserId(prodPageInfoData) : dataBuilder.generateVirtualUserId(prodPageInfoData);
					        //dataBuilder.getVirtualUserId(serviceKind, serviceKindIndex);
					        if(!relaProdInstId){
					        	relaProdInstId = accNbrInfo.prodInstId;
					        }
					        // 获取当前受理的号码
					        var uniqueId = accNbrInfo.uniqueId;
					        if (prodOfferAcceptLoader.serviceCardWidgetMap['serviceCardWidget_' + uniqueId].busCardInstance
					                .$('serviceId')) {
						        accNbr = prodOfferAcceptLoader.serviceCardWidgetMap['serviceCardWidget_' + uniqueId].busCardInstance
						                .$('serviceId').value;
					        }
				        }
				        return dataBuilder.buildAccNbrInfoVO({
					                relaProdInstId : relaProdInstId,
					                accNbr : accNbr,
					                accNbrType : !!ifManageAcct ? ifManageAcct : 1,
					                operKind : 1
				                });
			        });
		        },
		        /**
				 * 处理服务信息的计算过程,与java端SerPageVO对应
				 * 
				 * @method
				 */
		        doServiceInfoComputation : function(prodOfferInfoVO, prodPageInfoData, extendedData) {
			        var serPageVO = {},
				        // 获取对应接入类产品的userId
				        userIdInfo = this.getVirtualUserId(prodPageInfoData)
				                ? this.getVirtualUserId(prodPageInfoData)
				                : this.generateVirtualUserId(prodPageInfoData),
				        // 获取页面提交的服务信息
				        pageServiceInfo = prodPageInfoData.serviceInfo,
				        // 获取销售品产品关联信息(产品规格层面上的)
				        offerProdRelaVO = BusCard.find(util.ProdOfferHelper.getProductList(true, prodOfferInfoVO),
				                function(offerProdRelaVO) {
					                return offerProdRelaVO.productId == prodPageInfoData.prodBasicInfo.productId;
					                
				                }),
				        serFixedVO = {};
			        // 把从销售品继承来的信息(生效失效时间等)以及页面公共信息(如belongCode)等附加到服务信息提交数据模板中
			        dojo.mixin(serFixedVO, extendedData);
			        // TODO
			        // 把当前受理销售品id附加到服务信息提交数据模板中,当受理自主版销售品时,这个逻辑需要改动
			        dojo.mixin(serFixedVO, {
				                prodOfferId : prodOfferInfoVO.prodOfferId
			                });
			        // 把产品变更信息附加到服务信息提交数据模板中
			        dojo.mixin(serFixedVO, this.doAccessProductAcceptInfoComputation({
				                        productInfoVO : offerProdRelaVO.productInfoVO,
				                        prodInstVO : null,
				                        prodPageData : prodPageInfoData
				                        
			                        }));
			        // 把页面填写的服务信息附加到服务信息提交数据模板中
			        dojo.mixin(serFixedVO, pageServiceInfo || {});
			        
			        // 把userId信息附加到服务信息提交数据模板中
			        dojo.mixin(serFixedVO, {
				                userId : userIdInfo
			                });
			        dojo.mixin(serFixedVO, {
				                serviceKind : offerProdRelaVO.productInfoVO.netType
			                });
			        // 构建与服务器端SerFixedVO对应的前端js表示
			        serPageVO.serFixedVO = this.buildSerFixedVO(serFixedVO);
			        return serPageVO;
			        
		        },
		        getAttrInfoVOTemplate : function(operKind, attrId, attrCd, attrValue, ifInstantiation,
		                pricingParamAttr, unique, isTemp) {
			        return {
				        attrId : attrId,
				        operKind : operKind,
				        attrCd : attrCd,
				        attrValue : attrValue,
				        ifInstantiation : ifInstantiation,
				        pricingParamAttr : pricingParamAttr,
				        unique : unique,
				        isTemp : isTemp
			        }
			        
		        },
		        /**
				 * 处理产品属性的处理过程,生成与java端RelaProdInfoVO/prodAttrInfoList对应的
				 * 集合,如果是变更流程,需要重写此方法
				 * 
				 * @method
				 */
		        doProdAttrInfoListComputation : function(productInfoVO, prodPageInfoData, extendedData) {
			        var builder = this,
				        prodInstId = prodPageInfoData.prodBasicInfo.prodInstId;
			        // 如果是老用户
			        if (prodInstId) {
				        var relaProdInfoVO = util.ProdOfferInstProvider.queryRelaProdInfoVO(prodInstId),
					        instAttrList = relaProdInfoVO.prodInstAttrList || [],
					        prodAttrInfo = prodPageInfoData.prodAttrInfo || {},
					        specAttrList = productInfoVO.attrList || [],
					        requestParam = dojo.global.$appContext$.get("requestParam"),
					        resultList = [];
				        // TODO 暂时不考虑老的valueId计算
				        // 处理变更的属性
				        dojo.forEach(instAttrList, function(attrVO) {
				        			//变更阶段，过滤掉以下两个属性(项目和结算入网方式)，不对其进行处理
				        			if(attrVO.attrCd==util.SpecAttrCdConst.itemAttrCd||attrVO.attrCd ==util.SpecAttrCdConst.balanceInetMethodAttrCd){
				        				return false;
				        			}
					                var _pageValue = prodAttrInfo[attrVO.attrCd];
					                if (_pageValue != null) {
						                var specAttrVO = BusCard.find(specAttrList, function(attr) {
							                        return attr.attrId == attrVO.attrId;
						                        });
						                        
					                    //费用属性处理
					                    _pageValue = builder.convertFeeAttr(specAttrVO,_pageValue);
					                    if (_pageValue == null || _pageValue == attrVO.attrValue) {
					                    	return;
					                    }
						                var cloneAttrVO = dojo.clone(attrVO);
						                cloneAttrVO.oldAttrValue = attrVO.attrValue;
						                cloneAttrVO.attrValue = _pageValue;
						                cloneAttrVO.operKind = 2;
						                cloneAttrVO.ifInstantiation = specAttrVO.ifInstantiation;
						                cloneAttrVO.isTemp = specAttrVO.isTemp;
						                resultList.push(builder.buildAttrInstItemVO(cloneAttrVO));
					                }
					                
				                });
				        // 处理新增的是属性
				        BusCard.each(prodAttrInfo, function(attrCd, attrValue) {
				        			//变更阶段，过滤掉以下两个属性(项目和结算入网方式)，不对其进行处理
				        			if(attrCd==util.SpecAttrCdConst.itemAttrCd||attrCd ==util.SpecAttrCdConst.balanceInetMethodAttrCd){
				        				return ;
				        			}
					                var flag = BusCard.find(instAttrList, function(attrVO) {
						                        return attrVO.attrCd == attrCd;
						                        
					                        });
					                if (!flag) {
						                var specAttrVO = BusCard.find(specAttrList, function(attrVO) {
							                        return attrVO.attrCd == attrCd;
							                        
						                        });
						                if (specAttrVO) {
					                        //费用属性处理
					                        attrValue = builder.convertFeeAttr(specAttrVO,attrValue);
							                var _attrVO = builder.getAttrInfoVOTemplate(1, specAttrVO.attrId, attrCd,
							                        attrValue, specAttrVO.ifInstantiation, specAttrVO.pricingParamAttr,
							                        specAttrVO.unique,specAttrVO.isTemp);
							                // TODO
							                // 对应变更时新增加的属性默认立即生效
							                _attrVO.effDate = requestParam.today;
							                _attrVO.expDate = relaProdInfoVO.expDate;
							                _attrVO.isTemp = specAttrVO.isTemp;
							                resultList.push(builder.buildAttrInstItemVO(_attrVO));
							                
						                }
						                
					                }
					                
				                }, true)
				        return resultList;
				        
			        } else {// 新装产品属性处理
			        
				        var attrList = productInfoVO.attrList || [],
					        attrInfoVOList = [],
					        extendedData = extendedData || {},
					        // 根据属性cd获取规格层面上的AttrVO
					        getAttrVO = function(attrCd) {
						        return BusCard.find(attrList, function(attrVO) {
							                return attrVO.attrCd == attrCd;
						                })
					        };
				        if (prodPageInfoData.prodAttrInfo || prodPageInfoData.prodOfferAttrInfo) {
					        for (var attrCd in prodPageInfoData.prodAttrInfo) {
						        var value = prodPageInfoData.prodAttrInfo[attrCd];
						        var attrVO = getAttrVO(attrCd);
						        if (attrVO && value) {
			                        //费用属性处理
			                        value = builder.convertFeeAttr(attrVO,value);
							        attrInfoVOList.push(this.buildAttrInstItemVO(dojo.mixin(this.getAttrInfoVOTemplate(
							                        1, attrVO.attrId, attrCd, value, attrVO.ifInstantiation,
							                        attrVO.pricingParamAttr, attrVO.unique,attrVO.isTemp), extendedData)));
						        }
						        
					        }
					        
				        }
				        return attrInfoVOList;
				        
			        }
			        
		        },
		        /**
				 * 收集销售品属性的方法
				 */
		        doProdOfferAttrInfoListComputation : function(prodOfferInfoVO, prodPageInfoData, extendedData) {
			        var builder = this;
			        // 如果是老用户
			        if (prodPageInfoData.prodOfferInst != null
			                && this.assertSubProdOfferChange(prodPageInfoData.prodOfferInst, prodOfferInfoVO)) {
				        var prodOfferInst = prodPageInfoData.prodOfferInst,
					        instAttrList = prodOfferInst.offerInstAttrList || [],
					        prodOfferAttrInfo = prodPageInfoData.offerAttrPageInfoList || {},
					        specAttrList = prodOfferInfoVO.attrList || [],
					        requestParam = dojo.global.$appContext$.get("requestParam"),
					        resultList = [];
				        // TODO 暂时不考虑老的valueId计算
				        // 处理变更的属性
				        dojo.forEach(instAttrList, function(attrVO) {
					                var _pageValue = prodOfferAttrInfo[attrVO.attrCd],
						                _valueValueString = _pageValue;
					                // 如果是数组,进行序列化操作,针对属性多值的问题
					                if (dojo.isArray(_valueValueString)) {
						                _valueValueString = dojo.toJson(_valueValueString);
					                }
					                //if(attrVO.attrCd == util.SpecAttrCdConst.cyclePriceAttrCd){
					                //	 //将周价的值转换分为单位
						            //    _valueValueString = _pageValue*100;
						            //    _pageValue = _pageValue*100;
					                //}
					                if (_pageValue != null) {
						                var specAttrVO = BusCard.find(specAttrList, function(attr) {
							                        return attr.attrId == attrVO.attrId;
						                        });
					                    //此处改为适用所有属性
					                    _valueValueString = builder.convertFeeAttr(specAttrVO,_pageValue);
					                    _pageValue = builder.convertFeeAttr(specAttrVO,_pageValue);
						                
					                	if (_pageValue == null || _valueValueString == attrVO.attrValue) {
					                		return;
					               		}
						                var cloneAttrVO = dojo.clone(attrVO);
						                if (_pageValue instanceof Array) {
							                cloneAttrVO.oldAttrValue = dojo.fromJson(attrVO.attrValue);
						                } else {
							                cloneAttrVO.oldAttrValue = attrVO.attrValue;
						                }
						                cloneAttrVO.attrValue = _pageValue;
						                cloneAttrVO.operKind = 2;
						                cloneAttrVO.ifInstantiation = specAttrVO.ifInstantiation;
						                cloneAttrVO.pricingParamAttr = specAttrVO.pricingParamAttr;
						                cloneAttrVO.unique = specAttrVO.unique;
						                cloneAttrVO.isTemp = specAttrVO.isTemp;
						                // 周价变更即为下月生效
						                if (attrVO.attrCd == util.SpecAttrCdConst.cyclePriceAttrCd) {
							                cloneAttrVO.effDate = util.DateHelper.format(util.DateHelper
							                        .getFirstDayAfterPeriod());
							               
						                }
						                resultList.push(builder.buildOfferAttrInstItemVO(cloneAttrVO));
					                }
					                
				                });
				        // 处理新增的是属性
				        BusCard.each(prodOfferAttrInfo, function(attrCd, attrValue) {
					                var flag = BusCard.find(instAttrList, function(attrVO) {
						                        return attrVO.attrCd == attrCd;
						                        
					                        });
					                if (!flag) {
						                var specAttrVO = BusCard.find(specAttrList, function(attrVO) {
							                        return attrVO.attrCd == attrCd;
							                        
						                        });
						                if (specAttrVO) {
						                	attrValue = builder.convertFeeAttr(specAttrVO,attrValue);
							                var _attrVO = builder.getAttrInfoVOTemplate(1, specAttrVO.attrId, attrCd,
							                        attrValue, specAttrVO.ifInstantiation, specAttrVO.pricingParamAttr,
							                        specAttrVO.unique,specAttrVO.isTemp);
							                // TODO
							                // 对应变更时新增加的属性默认立即生效
							                _attrVO.effDate = requestParam.today;
							                _attrVO.expDate = prodOfferInst.expDate;
							                _attrVO.isTemp = specAttrVO.isTemp;
							                resultList.push(builder.buildOfferAttrInstItemVO(_attrVO));
							                
						                }
						                
					                }
					                
				                }, true)
				        return resultList;
			        } else {
				        var attrList = prodOfferInfoVO.attrList || [],
					        attrInfoVOList = [],
					        extendedData = extendedData || {},
					        // 根据属性cd获取规格层面上的AttrVO
					        getAttrVO = function(attrCd) {
						        return BusCard.find(attrList, function(attrVO) {
							                return attrVO.attrCd == attrCd;
						                })
					        };
				        if (prodPageInfoData.offerAttrPageInfoList) {
					        for (var attrCd in prodPageInfoData.offerAttrPageInfoList) {
						        var value = prodPageInfoData.offerAttrPageInfoList[attrCd];
						        var attrVO = getAttrVO(attrCd);
				                //此处改为适用所有属性
				                value = builder.convertFeeAttr(attrVO,value);
						        //周价特殊处理
						        //if (attrCd == util.SpecAttrCdConst.cyclePriceAttrCd) {
						        //	value = value*100;
						        //}
						        if (attrVO && value) {
							        attrInfoVOList.push(this.buildOfferAttrInstItemVO(dojo.mixin(this
							                        .getAttrInfoVOTemplate(1, attrVO.attrId, attrCd, value,
							                                attrVO.ifInstantiation, attrVO.pricingParamAttr,
							                                attrVO.unique,attrVO.isTemp), extendedData)));
						        }
						        
					        }
					        
				        }
				        return attrInfoVOList;
				        
			        }
			        
		        },
		        /**
				 * 计算可选包tab页中的主销售品变化
				 * 
				 * @method
				 */
		        doMultiPleProdOfferOperKindComputation : function(param) {
			        var offerInstVO = param.offerInstVO;
			        
			        if (!!offerInstVO) {
				        return dojo.mixin(this._cloneBasicProperty(offerInstVO), {
					                operKind : 2,
					                ActionCD : ConstantsPool.ActionCDConst.PRODUCT_CHANGE
				                });
			        } else {
				        return {
					        operKind : 1,
					        ActionCD : ConstantsPool.ActionCDConst.PRODUCT_INSTALL
				        };
			        }
		        },
		        
		        /**
				 * 处理父销售品实例id，供挂关系用
				 */
		        dealMemParentInstId : function(action, mainProdOfferAcceptInfoVO, mainProdOfferPageData) {
			        // 如果是拆分
			        if (action == "split") {
				        if (!!mainProdOfferPageData.prodOfferInst) {
					        return {
						        "parentProdOfferInstId" : mainProdOfferAcceptInfoVO.prodOfferInstId,
						        "splitFlag" : 1
					        };
				        } else {
					        return {
						        "parentProdOfferInstId" : ""
					        };
				        }
			        } else {
				        return {
					        "parentProdOfferInstId" : mainProdOfferAcceptInfoVO.prodOfferInstId
				        };
			        }
		        },
		        /**
				 * 计算可选包中每一个tab页中的主销售品信息(e9自主版使用)
				 */
		        doMultipleMainProdOfferComputation : function(mainProdOfferPageData, mainProdOfferAcceptInfoVO) {
			        var prodOfferInfoVO = mainProdOfferPageData.prodOfferInfoVO,
				        dataBuilder = this,
				        currentContentPane = mainProdOfferPageData.currentContentPane,
				        action = currentContentPane.action,
				        prodOfferAcceptInfoVO = null,
				        clonedProdOfferInfoVO = this._cloneBasicProperty(prodOfferInfoVO),
				        requestParam = dojo.global.$appContext$.get("requestParam"),
				        commInfo = dataBuilder.getCommInfo(),
				        dateResult = dataBuilder.doProdOfferDateComputation(mainProdOfferPageData,
				                clonedProdOfferInfoVO, !!mainProdOfferPageData.prodOfferInst
				                        && !!mainProdOfferPageData.prodOfferInst.prodOfferInstId ? 2 : 1),
				        extendedData = {};
			        dojo.mixin(extendedData, commInfo);
			        dojo.mixin(extendedData, dateResult);
			        dojo.mixin(clonedProdOfferInfoVO, dateResult);
			        dojo.mixin(clonedProdOfferInfoVO, dataBuilder.doMultiPleProdOfferOperKindComputation({
				                        prodOfferInfoVO : prodOfferInfoVO,
				                        offerInstVO : !!mainProdOfferPageData.prodOfferInst
				                                ? mainProdOfferPageData.prodOfferInst
				                                : null,
				                        prodOfferPageData : mainProdOfferPageData.prodOfferPageInfo
			                        }));
			        
			        dojo.mixin(clonedProdOfferInfoVO, requestParam.customerData);
			        dojo.mixin(clonedProdOfferInfoVO, commInfo);
			        dojo.mixin(clonedProdOfferInfoVO, {
			        			"ifAdded" : prodOfferInfoVO.ifAdded,
			        			"offerNbr" : prodOfferInfoVO.offerNbr,
				                "billMode" : prodOfferInfoVO.feeType,
				                "prodOfferInstId" : !!mainProdOfferPageData.prodOfferInst
				                        ? mainProdOfferPageData.prodOfferInst.prodOfferInstId
				                        : -util.CommUtils.generateUniqueId()
			                });
			        // 处理父销售品实例id，供挂关系用
			        dojo.mixin(clonedProdOfferInfoVO, dataBuilder.dealMemParentInstId(action,
			                        mainProdOfferAcceptInfoVO, mainProdOfferPageData));
			        dojo.mixin(clonedProdOfferInfoVO, {
				                "prodOfferType" : prodOfferInfoVO.prodOfferType
			                });
			        //检测用
			        dojo.mixin(clonedProdOfferInfoVO, {
				                "uniqueId" : currentContentPane.uniqueId
			                });
			        // 1.e9自主版下成员销售品当前主销售品信息
			        prodOfferAcceptInfoVO = dataBuilder.buildProdOfferAcceptInfoVO(clonedProdOfferInfoVO);
			        // 2.e9自主版下的成员销售品下的产品信息
			        prodOfferAcceptInfoVO.accessProdAcceptInfoList = this.doMultipleAccessProdComputation(
			                mainProdOfferPageData, mainProdOfferAcceptInfoVO);
			        prodOfferAcceptInfoVO.serviceProdAcceptInfoList = this.doMultipleServiceProdComputation(
			                mainProdOfferPageData, mainProdOfferAcceptInfoVO);
			        // 3.成员销售品属性信息
			        prodOfferAcceptInfoVO.offerInstAttrList = this.doProdOfferAttrInfoListComputation(prodOfferInfoVO,
			                mainProdOfferPageData, extendedData);
			        // 4.成员销售品下的亲情信息
			        var relaFavourData = dataBuilder.doRelaBusTempListComputation(mainProdOfferPageData)
			        var relaBusInfoList = relaFavourData.relaBusInfoList;
			        var ocsRelaList = relaFavourData.ocsRelaList;
			        prodOfferAcceptInfoVO.relaBusInfoList = relaBusInfoList || [];
			        prodOfferAcceptInfoVO.ocsRelaList = ocsRelaList || [];
			        // 5.成员销售品下的营销资源信息
			        // prodOfferAcceptInfoVO.resRelaInfoList =
			        // resRelaInfoList || [];
			        // 6.成员销售品下的担保信息
			        // 构建主销售品的担保信息并附加到prodOfferAcceptInfoVO上
			        var prodOfferAssureInfo = dataBuilder.doMainProdOfferAssureInfoComputation({
				                prodOfferInfoVO : prodOfferInfoVO,
				                offerInstVO : null,
				                prodOfferPageData : mainProdOfferPageData
			                }, extendedData);
			        if (!!prodOfferAssureInfo) {
				        if (!prodOfferAcceptInfoVO.prodOfferInstAssureList
				                || prodOfferAcceptInfoVO.prodOfferInstAssureList.length <= 0) {
					        prodOfferAcceptInfoVO.prodOfferInstAssureList = [];
				        }
				        dojo.mixin(prodOfferAcceptInfoVO, {
					                prodOfferInstAssureList : prodOfferAcceptInfoVO.prodOfferInstAssureList
					                        .push(prodOfferAssureInfo)
				                });
			        }
			        prodOfferAcceptInfoVO.prodOfferInstAssureList = prodOfferAcceptInfoVO.prodOfferInstAssureList || [];
                    var mainOfferPageData = dojo.global.$appContext$.get(this.MAIN_KEY);                    
                    // 过滤出所有主销售品下选择的产品信息
                    if(!!mainOfferPageData){
	                    var selectedProductList = BusCard.findAll(mainOfferPageData.productInfoList || [], function(
	                                    prodPageInfoData) {
	                                return prodPageInfoData.prodBasicInfo.productChecked == true;
	                            });
	                    var selectedOfferPageData = dojo.filter(selectedProductList,function(prodInfo){
	                        if(!!prodInfo && !!prodInfo.prodBasicInfo){
	                            return prodInfo.prodBasicInfo.uniqueId == prodOfferAcceptInfoVO.uniqueId;
	                        }
	                    })[0];
	                    if(!!selectedOfferPageData){
			                if (!!selectedOfferPageData.assureInfo && !!selectedOfferPageData.assureInfo.securityMethodCd
			                        && selectedOfferPageData.assureInfo.securityMethodCd != "") {
				                // 担保值记录到表里为分
				                var securityFee = selectedOfferPageData.assureInfo.securityFee;
				                if (!!securityFee && !isNaN(parseFloat(securityFee))) {
					                selectedOfferPageData.assureInfo.securityFee = parseFloat(securityFee) * 100;
				                }
				                selectedOfferPageData.assureInfo.assureAttrList = [];
				                // 50030 担保证件类型
				                selectedOfferPageData.assureInfo.assureAttrList.push({
					                        "attrId" : 50030,
					                        "attrValue" : !!selectedOfferPageData.assureInfo.identityKind?selectedOfferPageData.assureInfo.identityKind:""
				                        });
				                // 50031 担保证件号码
				                selectedOfferPageData.assureInfo.assureAttrList.push({
					                        "attrId" : 50031,
					                        "attrValue" : !!selectedOfferPageData.assureInfo.identityCode?selectedOfferPageData.assureInfo.identityCode:""
				                        });
				                // 50032 担保联系电话
				                selectedOfferPageData.assureInfo.assureAttrList.push({
					                        "attrId" : 50032,
					                        "attrValue" : !!selectedOfferPageData.assureInfo.contactPhone?selectedOfferPageData.assureInfo.contactPhone:""
				                        });
				                // 50033 担保联系地址
				                selectedOfferPageData.assureInfo.assureAttrList.push({
					                        "attrId" : 50033,
					                        "attrValue" : !!selectedOfferPageData.assureInfo.contactAddress?selectedOfferPageData.assureInfo.contactAddress:""
				                        });
				                prodOfferAcceptInfoVO.prodOfferInstAssureList.push(this
				                        .buildProdOfferInstAssureVO(selectedOfferPageData.assureInfo));
			                }
		                }
                    }
			        //7.设置成员销售品的协议信息
			         var _standerdBusTempVO = this.doMemOfferStandardComputation({
				                prodOfferInfoVO : prodOfferInfoVO,
				                offerInstVO : null,
				                prodOfferPageData : mainProdOfferPageData
			                }, extendedData);
			        prodOfferAcceptInfoVO.offerStandardBusTempVOList = _standerdBusTempVO ? [_standerdBusTempVO] : null;
			        return prodOfferAcceptInfoVO;
		        },
		        
		        /**
				 * 根据UniqueId将每一个接入类从e9自主版的主销售品数据中剥离出来
				 */
		        doMultipleAccessProdComputation : function(mainProdOfferPageData, mainProdOfferAcceptInfoVO) {
			        var dataBuilder = this;
			        var uniqueId = mainProdOfferPageData.uniqueId;
			        var relaProdInfoList = [];
			        // var relaProdInfoList =
			        // dojo.filter(mainProdOfferAcceptInfoVO.accessProdAcceptInfoList
			        // ||
			        // [],
			        // function(relaProdInfoVO) {
			        // return relaProdInfoVO.userId ==
			        // dataBuilder.getVirtualUserId(uniqueId);
			        // });
			        if (mainProdOfferAcceptInfoVO.accessProdAcceptInfoList != null
			                && mainProdOfferAcceptInfoVO.accessProdAcceptInfoList.length > 0) {
				        for (var p = 0; p < mainProdOfferAcceptInfoVO.accessProdAcceptInfoList.length; p++) {
					        var relaProdInfoVO = mainProdOfferAcceptInfoVO.accessProdAcceptInfoList[p];
					        if (relaProdInfoVO.userId == dataBuilder.getVirtualUserId(uniqueId)) {
						        relaProdInfoList = [relaProdInfoVO];
						        mainProdOfferAcceptInfoVO.accessProdAcceptInfoList.splice(p, 1);
						        break;
					        }
				        }
			        }
			        return relaProdInfoList;
		        },
		        
		        /**
				 * 根据UniqueId将每一个功能类从e9自主版的主销售品数据中剥离出来
				 */
		        doMultipleServiceProdComputation : function(mainProdOfferPageData, mainProdOfferAcceptInfoVO) {
			        var dataBuilder = this;
			        var uniqueId = mainProdOfferPageData.uniqueId;
			        var serviceProdListInCurrentMain = [];
			        var serviceProdListNotInCurrentMain = [];
			        // var relaProdInfoList =
			        // dojo.filter(mainProdOfferAcceptInfoVO.accessProdAcceptInfoList
			        // ||
			        // [],
			        // function(relaProdInfoVO) {
			        // return relaProdInfoVO.userId ==
			        // dataBuilder.getVirtualUserId(uniqueId);
			        // });
			        if (mainProdOfferAcceptInfoVO.serviceProdAcceptInfoList != null
			                && mainProdOfferAcceptInfoVO.serviceProdAcceptInfoList.length > 0) {
//				        for (var p = 0; p < mainProdOfferAcceptInfoVO.serviceProdAcceptInfoList.length; p++) {
//					        var relaProdInfoVO = mainProdOfferAcceptInfoVO.serviceProdAcceptInfoList[p];
//					        if (relaProdInfoVO.userId == dataBuilder.getVirtualUserId(uniqueId)) {
//						        relaProdInfoList.push(relaProdInfoVO);
////						        mainProdOfferAcceptInfoVO.serviceProdAcceptInfoList.splice(p, 1);
////						        //break;
//					        }
//				        }
				        dojo.forEach(mainProdOfferAcceptInfoVO.serviceProdAcceptInfoList||[],function(_temp){
				        	if(_temp.userId == dataBuilder.getVirtualUserId(uniqueId)){
				        		serviceProdListInCurrentMain.push(_temp);
				        	}else{
				        		serviceProdListNotInCurrentMain.push(_temp);
				        	}
				        });
						mainProdOfferAcceptInfoVO.serviceProdAcceptInfoList = serviceProdListNotInCurrentMain;
			        }
			        
			        
			        return serviceProdListInCurrentMain;
		        },
		        /**
				 * 为销售品设置虚拟父销售品实例id，供挂关系使用
				 */
		        doSetParentProdOfferInst : function(subProdOfferPageData, prodOfferAcceptInfoVO) {
			        dojo.forEach(subProdOfferPageData, function(data) {
				                data.parentProdOfferInstId = prodOfferAcceptInfoVO.prodOfferInstId;
			                });
		        },
		        /**
				 * 临时处理，稍后改掉
				 */
		        doSetAccessProdForMain : function(subProdOfferCartPageData, mainProdOfferCPResult) {
			        // 如果是e9自主版，则清空产品信息
			        if (mainProdOfferCPResult.prodOfferAcceptInfoVO.bindType == 2) {
				        mainProdOfferCPResult.prodOfferAcceptInfoVO.accessProdAcceptInfoList = [];
			        }
		        },
		        /**
				 * 计算可选包部分销售品信息
				 */
		        doMultipleSubProdOfferComputation : function(subProdOfferCartPageData, mainProdOfferAcceptInfoVO) {
			        var dataBuilder = this;
			        var prodOfferAcceptInfoList = [];
			        // 可选包区域中可选包销售品数据
			        var subProdOfferPageData = subProdOfferCartPageData.subProdOfferPageData;
			        // 1.计算可选包购物车中的的主销售品信息
			        if (!!subProdOfferCartPageData.mainProdOfferPageData) {
				        // 可选包tab页中的数据
				        var mainProdOfferPageData = subProdOfferCartPageData.mainProdOfferPageData;
				        // 将tab页中的主销售品数据进行处理，生成销售品受理数据
				        var prodOfferAcceptInfoVO = dataBuilder.doMultipleMainProdOfferComputation(
				                mainProdOfferPageData, mainProdOfferAcceptInfoVO);
				        prodOfferAcceptInfoList.push(prodOfferAcceptInfoVO);
				        // 添加e9自主版销售品父类销售品虚拟实例id
				        dataBuilder.doSetParentProdOfferInst(subProdOfferPageData, prodOfferAcceptInfoVO);
			        } else {
				        // 添加非e9自主版的销售品父类销售品虚拟实例id
				        dataBuilder.doSetParentProdOfferInst(subProdOfferPageData, mainProdOfferAcceptInfoVO);
			        }
			        // 2.计算退订的可选包销售品(新装返回空数组)
			        var deleteProdOfferAcceptInfoList = dataBuilder.doComputationDeleteProdOffer(subProdOfferPageData);
			        // 3.计算新增加的可选包销售品
			        var addProdOfferAcceptInfoList = dataBuilder.doComputationAddProdOffer(subProdOfferPageData);
			        // 4.计算变更的可选包销售品(新装返回空数组)
			        var chgProdOfferAcceptInfoList = dataBuilder.doComputationChgProdOffer(subProdOfferPageData);
			        prodOfferAcceptInfoList = prodOfferAcceptInfoList.concat(deleteProdOfferAcceptInfoList,
			                addProdOfferAcceptInfoList, chgProdOfferAcceptInfoList);
			        return prodOfferAcceptInfoList;
		        },
		        /**
				 * 处理可选包的过程
				 * 
				 * @method
				 */
		        doSubProdOfferInfoComputation : function(mainProdOfferCPResult) {
			        var dataBuilder = this;
			        var prodOfferAcceptInfoList = [];
			        this.loadSubProdOfferPageData();
			        // 1.获取可选包区域的数据
			        var subProdOfferCartPageData = dojo.global.$appContext$.get(this.SUB_KEY);
			        if (!subProdOfferCartPageData) { return false; }
			        // 2.将基础包区域的销售品数据信息克隆一份，供挂关系使用
			        // var mainProdOfferAcceptVO =
			        // dojo.clone(mainProdOfferCPResult.prodOfferAcceptInfoVO);
			        // 3.融合e9自主版和非e9自主版的计算逻辑
			        dojo.forEach(subProdOfferCartPageData, function(data) {
				                prodOfferAcceptInfoList = prodOfferAcceptInfoList.concat(dataBuilder
				                        .doMultipleSubProdOfferComputation(data,
				                                mainProdOfferCPResult.prodOfferAcceptInfoVO));
			                });
			        // 4.如果是e9自主版，则将其中的接入类产品信息置空
			        // dataBuilder.doSetAccessProdForMain(subProdOfferCartPageData,
			        // mainProdOfferCPResult);
			        return {
				        prodOfferAcceptInfoList : prodOfferAcceptInfoList
			        };
			        
		        },
		        /**
				 * 创建一份构建销售品信息的方法
				 */
		        createProdOfferAcceptInfoList : function(prodOfferCartPageData, operKind) {
			        var dataBuilder = this;
			        return dojo.map(prodOfferCartPageData || [], function(oneSubProdOfferPageData) {
				                var prodOfferInfoVO = oneSubProdOfferPageData.subProdOfferInfo,
					                prodOfferAcceptInfoVO = null,
					                clonedProdOfferInfoVO = dataBuilder._cloneBasicProperty(prodOfferInfoVO),
					                requestParam = dojo.global.$appContext$.get("requestParam"),
					                commInfo = dataBuilder.getCommInfo(),
					                dateResult = dataBuilder.doProdOfferDateComputation(oneSubProdOfferPageData,
					                        clonedProdOfferInfoVO, operKind),
					                extendedData = {};
				                dojo.mixin(extendedData, commInfo);
				                dojo.mixin(extendedData, dateResult);
				                // dojo.mixin(clonedProdOfferInfoVO,
				                // requestParam);
				                dojo.mixin(clonedProdOfferInfoVO, dataBuilder.doProdOfferAcceptInfoComputation({
					                                prodOfferInfoVO : prodOfferInfoVO,
					                                offerInstVO : oneSubProdOfferPageData.prodOfferInst != null
					                                        ? oneSubProdOfferPageData.prodOfferInst
					                                        : null,
					                                prodOfferPageData : oneSubProdOfferPageData.prodOfferPageInfo
				                                }));
				                dojo.mixin(clonedProdOfferInfoVO, dateResult);
				                dojo.mixin(clonedProdOfferInfoVO, requestParam.customerData);
				                dojo.mixin(clonedProdOfferInfoVO, commInfo);
				                dojo.mixin(clonedProdOfferInfoVO, {
					                        "billMode" : prodOfferInfoVO.feeType,
					                        "ifAdded" : prodOfferInfoVO.ifAdded,
					                        "offerNbr" : prodOfferInfoVO.offerNbr
				                        });
				                dojo.mixin(clonedProdOfferInfoVO, {
					                        "rateFlag" : oneSubProdOfferPageData.rateFlag
				                        });
				                // 公共附属销售品不挂这层关系
				                // if (prodOfferInfoVO.prodOfferType
				                // != 2) {
				                // 添加虚拟的销售品实例id，供挂关系用
				                dojo.mixin(clonedProdOfferInfoVO, {
					                        "parentProdOfferInstId" : oneSubProdOfferPageData.parentProdOfferInstId
					                                || ""
				                        });
				                // }
				                dojo.mixin(clonedProdOfferInfoVO, {
					                        "prodOfferType" : prodOfferInfoVO.prodOfferType,
					                        "custTaste" : dataBuilder
					                                .getIfCustTasteFlag(oneSubProdOfferPageData.subProdOfferInfo)
				                        });
				                prodOfferAcceptInfoVO = dataBuilder.buildProdOfferAcceptInfoVO(clonedProdOfferInfoVO);
				                // 计算当前销售品对应销售品详情页面上的数据，顺次添加到当前的销售品中
				                // 1.处理销售品下的产品信息
				                var relaProdInfoList = dataBuilder.doServiceProductInfoComputation(
				                        oneSubProdOfferPageData, extendedData);
				                // 2.处理销售品下的属性信息集合
				                var offerAttrInfoList = dataBuilder
				                        .doProdOfferAttrInfoListComputation(oneSubProdOfferPageData.subProdOfferInfo,
				                                oneSubProdOfferPageData, extendedData);
				                // 3. 处理销售品下的亲情信息集合
				                var relaFavourData = dataBuilder.doRelaBusTempListComputation(oneSubProdOfferPageData)
				                var relaBusInfoList = relaFavourData.relaBusInfoList;
				                var ocsRelaList = relaFavourData.ocsRelaList;
				                prodOfferAcceptInfoVO.relaBusInfoList = relaBusInfoList || [];
				                prodOfferAcceptInfoVO.ocsRelaList = ocsRelaList || [];
				                // 4. 处理销售品下的营销资源信息集合
				                // var resRelaInfoList = dataBuilder
				                // .doResRelaInfoListComputation(oneSubProdOfferPageData)
				                // 5. 处理销售品下的担保信息集合
				                var prodOfferInstAssureList = dataBuilder
				                        .doProdOfferAssureInfoListComputation(oneSubProdOfferPageData);
				                // 6. 处理体验销售品
				                var userTasteTempVO = dataBuilder
				                        .getCustTasteObj(prodOfferInfoVO, dateResult, operKind);
				                if (relaProdInfoList != null && relaProdInfoList.length > 0) {
					                // 如果是接入类
					                if ("101" == relaProdInfoList[0].prodFuncType) {
						                prodOfferAcceptInfoVO.accessProdAcceptInfoList = relaProdInfoList || [];
					                } else {
						                prodOfferAcceptInfoVO.serviceProdAcceptInfoList = relaProdInfoList || [];
					                }
				                }
				                prodOfferAcceptInfoVO.offerInstAttrList = offerAttrInfoList || [];
				                // prodOfferAcceptInfoVO.resRelaInfoList
				                // =
				                // resRelaInfoList || [];
				                prodOfferAcceptInfoVO.prodOfferInstAssureList = prodOfferInstAssureList || [];
				                if (userTasteTempVO != null) {
					                prodOfferAcceptInfoVO.userTasteTempVO = userTasteTempVO;
				                }
				                // add by lishm 退订销售品，将销售品和产品属性都退订
				                if (operKind == 3) {
					                if (prodOfferAcceptInfoVO.serviceProdAcceptInfoList) {
						                dojo.forEach(prodOfferAcceptInfoVO.serviceProdAcceptInfoList, function(
						                                serviceProdInfo) {
							                        serviceProdInfo.operKind = 3;
							                        if (serviceProdInfo.prodInstAttrList) {
								                        dojo.forEach(serviceProdInfo.prodInstAttrList, function(
								                                        prodInstAttrInfo) {
									                                prodInstAttrInfo.operKind = 3;
								                                })
							                        }
						                        })
						                
					                }
					                if (prodOfferAcceptInfoVO.offerInstAttrList) {
						                dojo.forEach(prodOfferAcceptInfoVO.offerInstAttrList, function(
						                                offerInstAttrInfo) {
							                        offerInstAttrInfo.operKind = 3;
						                        })
					                }
					                if (prodOfferAcceptInfoVO.accessProdAcceptInfoList) {
						                dojo.forEach(prodOfferAcceptInfoVO.accessProdAcceptInfoList, function(
						                                accessProdInfo) {
							                        accessProdInfo.operKind = 3;
							                        if (accessProdInfo.prodInstAttrList) {
								                        dojo.forEach(accessProdInfo.prodInstAttrList, function(
								                                        prodInstAttrInfo) {
									                                prodInstAttrInfo.operKind = 3;
								                                })
							                        }
						                        })
						                
					                }
					                
									//非OCS亲情优惠信息
									if (!!prodOfferAcceptInfoVO.relaBusInfoList) {
						                dojo.forEach(prodOfferAcceptInfoVO.relaBusInfoList, function(
						                                relaBusInfo,index) {
											if(relaBusInfo.operKind == 1){
												delete prodOfferAcceptInfoVO.relaBusInfoList[index];
											}else{
									        	relaBusInfo.operKind = 3;
											}
										});
									}
									//OCS亲情优惠信息
									if (!!prodOfferAcceptInfoVO.ocsRelaList) {
						                dojo.forEach(prodOfferAcceptInfoVO.ocsRelaList, function(
						                                relaBusInfo,index) {
											if(relaBusInfo.operKind == 1){
												delete prodOfferAcceptInfoVO.ocsRelaList[index];
											}else{
									        	relaBusInfo.operKind = 3;
											}
										});				                
									}
				                }
				                return prodOfferAcceptInfoVO;
			                });
		        },
		        /**
				 * 
				 * 返回体验销售品对象
				 */
		        getCustTasteObj : function(prodOfferInfoVO, dateResult, operKind) {
			        var userTasteTempVO = null;
			        var usageTypeList = prodOfferInfoVO.usageTypeList;
			        var _flag_ = dojo.some(prodOfferInfoVO.usageTypeList || [], function(usageType) {
				                return usageType == 12 || usageType == "12";
			                })
			        // 如果适用是体验并且有体验的销售品对象时，才拼销售品体验
			        if (_flag_ && prodOfferInfoVO.prodOfferTaste && prodOfferInfoVO.prodOfferTaste != null) {
				        var prodOfferTaste = prodOfferInfoVO.prodOfferTaste;
				        // /提前几天短信提醒
				        var preDaysCount = prodOfferTaste.messageDate;
				        userTasteTempVO = {};
				        dojo.mixin(userTasteTempVO, {
					                "tasteProdOfferId" : prodOfferInfoVO.prodOfferId,
					                "prodOfferId" : prodOfferTaste.formalProdOfferId,
					                "beginDate" : dateResult.effDate,
					                "endDate" : dateResult.expDate,
					                "smsDate" : util.DateHelper
					                        .getPreTimeOfTargetTime(dateResult.expDate, preDaysCount),
					                "ifSms" : prodOfferTaste.ifMessage,
					                "changeKind" : operKind
				                });
				        return this.buildUserTasteTempVO(userTasteTempVO);
			        }
			        return userTasteTempVO;
			        
		        },
		        /**
				 * 获取体验标示
				 */
		        getIfCustTasteFlag : function(prodOfferInfoVO) {
			        var usageTypeList = prodOfferInfoVO.usageTypeList;
			        var _flag_ = dojo.some(prodOfferInfoVO.usageTypeList || [], function(usageType) {
				                return usageType == 12 || usageType == "12";
			                })
			        if (_flag_) {
				        return 1;
			        } else {
				        return 0;
			        }
		        },
		        /**
				 * 计算可选包的销售品属性
				 */
		        doSubProdOfferAttrInfoListComputation : function(prodOfferInfoVO, prodPageInfoData, extendedData) {
			        var dataBuilder = this;
			        return dataBuilder.doProdOfferAttrInfoListComputation(prodOfferInfoVO, prodPageInfoData,
			                extendedData);
		        },
		        /**
				 * 计算新增加的可选包销售品
				 */
		        doComputationAddProdOffer : function(subProdOfferPageData) {
			        var dataBuilder = this,
				        addProdOfferCartPageData = dojo.filter(subProdOfferPageData || [], function(data) {
					                return data.prodOfferPageInfo.checkBoxValue && data.prodOfferInst == null;
				                });
			        return dataBuilder.createProdOfferAcceptInfoList(addProdOfferCartPageData, 1);
		        },
		        /**
				 * 计算退订的销售品(新装没有退订的销售品)
				 */
		        doComputationDeleteProdOffer : function(subProdOfferPageData) {
			        var dataBuilder = this,
				        deleteProdOfferCartPageData = dojo.filter(subProdOfferPageData, function(data) {
					                return !data.prodOfferPageInfo.checkBoxValue && data.prodOfferInst != null;
				                }),
				        prodOfferAcceptInfoList = dataBuilder.createProdOfferAcceptInfoList(
				                deleteProdOfferCartPageData, 3);
			        return prodOfferAcceptInfoList;
		        },
		        /**
				 * 计算变更的销售品(新装没有变更的销售品)
				 */
		        doComputationChgProdOffer : function(subProdOfferPageData) {
			        var dataBuilder = this,
				        chgProdOfferCartPageData = dojo.filter(subProdOfferPageData || [], function(data) {
					                return data.prodOfferPageInfo.checkBoxValue && data.prodOfferInst != null;
				                }),
				        prodOfferAcceptInfoList = dataBuilder
				                .createProdOfferAcceptInfoList(chgProdOfferCartPageData, 2);
			        return prodOfferAcceptInfoList;
		        },
		        /**
				 * 构建功能类产品提交数据
				 */
		        doServiceProductInfoComputation : function(oneSubProdOfferPageData, extendedData) {
			        var dataBuilder = this,
				        relaProdInfoList = [];
			        // 如果没有serviceKind和serviceKindIndex，则说明该销售品下没有产品，返回空的产品数组
			        if (oneSubProdOfferPageData.prodOfferPageInfo.serviceKind == null
			                || oneSubProdOfferPageData.prodOfferPageInfo.serviceKindIndex == null) { return relaProdInfoList; }
			        // 1.计算新增加的产品信息
			        var addRelaProdInfoList = dataBuilder.doAddServiceProductComputation(oneSubProdOfferPageData,
			                extendedData);
			        // 2.计算变更的产品信息
			        var chgRelaProdInfoList = dataBuilder.doChgServiceProductComputation(oneSubProdOfferPageData,
			                extendedData);
			        // 3.计算删除的产品信息
			        var delRelaProdInfoList = dataBuilder.doDelServiceProductComputation(oneSubProdOfferPageData,
			                extendedData);
			        return [].concat(addRelaProdInfoList, chgRelaProdInfoList, delRelaProdInfoList);
		        },
		        /**
				 * 计算删除的功能产品
				 */
		        doDelServiceProductComputation : function(oneSubProdOfferPageData, extendedData) {
			        var dataBuilder = this,
				        delServiceProdData = dojo.filter(oneSubProdOfferPageData.relaProdPageInfoList || [], function(
				                data) {
					        return (!data.prodBasicInfo.checkedStatus && data.prodBasicInfo.prodInstInfo != null)
					                || (oneSubProdOfferPageData.prodOfferPageInfo.checkBoxValue == false && data.prodBasicInfo.prodInstInfo != null);
				        });
//			        // 销售品是退订,产品也是退订
//			        if (oneSubProdOfferPageData.prodOfferPageInfo.checkBoxValue == false) {
//				        dojo.forEach(delServiceProdData, function(serviceProdData) {
//					                serviceProdData.prodBasicInfo.checkedStatus = false;
//				                });
//			        }
//			        return dataBuilder.createProdAcceptInfoList(delServiceProdData, oneSubProdOfferPageData,
//			                extendedData);
			                
			        // 销售品是退订,产品也是退订,更改状态
			        if (oneSubProdOfferPageData.prodOfferPageInfo.checkBoxValue == false) {
				        dojo.forEach(delServiceProdData||[], function(serviceProdData) {
					                serviceProdData.prodBasicInfo.backUpCheckedStatus = serviceProdData.prodBasicInfo.checkedStatus;
					                serviceProdData.prodBasicInfo.checkedStatus = false;
				                });
			        }
			        //构建数据
			        var delCpSubProdOfferList = dataBuilder.createProdAcceptInfoList(delServiceProdData, oneSubProdOfferPageData,
			                extendedData);
			        //还原状态
			        if (oneSubProdOfferPageData.prodOfferPageInfo.checkBoxValue == false) {
				        dojo.forEach(delServiceProdData||[], function(serviceProdData) {
						                serviceProdData.prodBasicInfo.checkedStatus = serviceProdData.prodBasicInfo.backUpCheckedStatus;
					                });
			        }
			        return delCpSubProdOfferList;        
		        },
		        /**
				 * 计算变更的功能产品
				 */
		        doChgServiceProductComputation : function(oneSubProdOfferPageData, extendedData) {
		        	//增加判断，如果有实例数据，并且销售品是退订，则直接返回
		        	if (oneSubProdOfferPageData.prodOfferPageInfo.checkBoxValue == false&&oneSubProdOfferPageData.prodOfferInst!=null){
		        		return [];
		        	}
			        var dataBuilder = this,
				        chgServiceProdData = dojo.filter(oneSubProdOfferPageData.relaProdPageInfoList || [], function(
				                        data) {
					                return data.prodBasicInfo.checkedStatus && data.prodBasicInfo.prodInstInfo != null
					                        && oneSubProdOfferPageData.prodOfferPageInfo.checkBoxValue;
				                });
			        return dataBuilder.createProdAcceptInfoList(chgServiceProdData, oneSubProdOfferPageData,
			                extendedData);
		        },
		        /**
				 * 计算新增加的功能产品
				 */
		        doAddServiceProductComputation : function(oneSubProdOfferPageData, extendedData) {
		        	//增加判断，如果有实例数据，并且销售品是退订，则直接返回
		        	if (oneSubProdOfferPageData.prodOfferPageInfo.checkBoxValue == false&&oneSubProdOfferPageData.prodOfferInst!=null){
		        		return [];
		        	}
			        var dataBuilder = this,
				        addServiceProdData = dojo.filter(oneSubProdOfferPageData.relaProdPageInfoList || [], function(
				                        data) {
					                return data.prodBasicInfo.checkedStatus && data.prodBasicInfo.prodInstInfo == null;
				                });
			        return dataBuilder.createProdAcceptInfoList(addServiceProdData, oneSubProdOfferPageData,
			                extendedData);
		        },
		        /**
				 * 判断产品的操作类型F
				 */
		        doSerProductAcceptInfoComputation : function(param) {
			        var prodInstVO = param.prodInstVO,
				        prodPageData = param.prodPageData,
				        productInfoVO = param.productInfoVO;
			        // 有实例数据
			        if (prodInstVO != null) {
				        // 选中状态,则根据属性信息是否变化来判断operkind
				        if (prodPageData.prodBasicInfo.checkedStatus) {
					        return dojo.mixin(this._cloneBasicProperty(prodInstVO), {
						                operKind : 2,
						                ActionCD : ConstantsPool.ActionCDConst.PRODUCT_CHANGE
					                });
					        // 未选中 则退订
				        } else if (!prodPageData.prodBasicInfo.checkedStatus) { return dojo.mixin(this
				                        ._cloneBasicProperty(prodInstVO), {
					                operKind : 3,
					                ActionCD : ConstantsPool.ActionCDConst.PRODUCT_CANCEL
				                }); }
			        } else {
				        return {
					        operKind : 1,
					        ActionCD : ConstantsPool.ActionCDConst.PRODUCT_INSTALL
				        };
			        }
		        },
		        /**
				 * 构建产品信息的基础
				 */
		        createProdAcceptInfoList : function(serviceProdData, oneSubProdOfferPageData, extendedData) {
			        var dataBuilder = this;
			        return dojo.map(serviceProdData, function(relaProdPageInfo) {
				                var productId = relaProdPageInfo.prodBasicInfo.productId,
					                prodInstVO = !!relaProdPageInfo.prodBasicInfo.prodInstInfo
					                        ? relaProdPageInfo.prodBasicInfo.prodInstInfo
					                        : null,
					                extendedTempData = extendedData || {},
					                prodAttrInfoList = null,
					                relaProdInfoVO = null;
				                var virtualUserId = dataBuilder.getVirtualUserId(
				                        oneSubProdOfferPageData.prodOfferPageInfo.serviceKind,
				                        oneSubProdOfferPageData.prodOfferPageInfo.serviceKindIndex),
					                userIdInfo = {
						                userId : virtualUserId,
						                accProdInstId : virtualUserId,
						                prodInstId : prodInstVO != null ? prodInstVO.prodInstId : -1
					                },
					                offerProdRelaVO = BusCard.find(util.ProdOfferHelper.getProductList(true,
					                                oneSubProdOfferPageData.subProdOfferInfo),
					                        function(offerProdRelaVO) {
						                        return offerProdRelaVO.productId == productId;
						                        
					                        }),
					                clonedProductInfoVO = dataBuilder
					                        ._cloneBasicProperty(offerProdRelaVO.productInfoVO);
				                
				                dojo.mixin(clonedProductInfoVO, offerProdRelaVO);
				                dojo.mixin(clonedProductInfoVO, extendedTempData);
				                
				                dojo.mixin(clonedProductInfoVO, dataBuilder.doSerProductAcceptInfoComputation({
					                                productInfoVO : offerProdRelaVO.productInfoVO,
					                                prodInstVO : prodInstVO,
					                                prodPageData : relaProdPageInfo
					                                
				                                }));
				                dojo.mixin(clonedProductInfoVO, userIdInfo);
				                /*
								 * ===================spec property
								 * set /begin===================
								 */
				                clonedProductInfoVO.prodId = productId;
				                clonedProductInfoVO.prodOfferId = oneSubProdOfferPageData.subProdOfferInfo.prodOfferId;
				                clonedProductInfoVO.prodType = offerProdRelaVO.productInfoVO.prodBundleType;
				                clonedProductInfoVO.prodTypeCd = offerProdRelaVO.productInfoVO.prodBundleType;
				                clonedProductInfoVO.prodName = offerProdRelaVO.productInfoVO.productName;
				                if (util.PRODUCTTYPE.ACCESS_PROD_TYPE == offerProdRelaVO.productInfoVO.prodFuncType) {
					                clonedProductInfoVO.ifNeedCreateProdInst = 0;
				                } else {
					                clonedProductInfoVO.ifNeedCreateProdInst = 1;
				                }
				                if (offerProdRelaVO.productInfoVO.prodCompDetailList
				                        && offerProdRelaVO.productInfoVO.prodCompDetailList.length > 0) {
					                clonedProductInfoVO.relaType = util.PRODOFFERTYPE.OFFER_COMB_MEMBER;
				                } else {
					                clonedProductInfoVO.relaType = util.PRODOFFERTYPE.OFFER_PRODUCT;
				                }
				                // 访问级别默认为服务级别
				                if (!clonedProductInfoVO.accessLevel) {
					                clonedProductInfoVO.accessLevel = ConstantsPool.AccessLevelConst.SERVICE_LEVEL;
				                }
				                // 针对于产品的操作，进行生效时间的判断
				                dataBuilder.dealProductDate(clonedProductInfoVO, oneSubProdOfferPageData,
				                        relaProdPageInfo);
				                /*
								 * ===================spec property
								 * set /end===================
								 */
				                prodAttrInfoList = dataBuilder.doSerProdAttrListComputation(
				                        offerProdRelaVO.productInfoVO, relaProdPageInfo, extendedTempData);
				                
				                if ("101" == offerProdRelaVO.productInfoVO.prodFuncType) {
					                relaProdInfoVO = dataBuilder.buildAccessProdAcceptInfoVO(clonedProductInfoVO);
				                } else {
					                relaProdInfoVO = dataBuilder.buildServiceProdAcceptInfoVO(clonedProductInfoVO);
				                }
				                relaProdInfoVO.prodInstAttrList = prodAttrInfoList;
				                
				                return relaProdInfoVO;
			                });
			        
		        },
		        /**
				 * 针对可选包下的功能产品 主销售品下的功能产品传prodOfferCheckStatus
				 */
		        dealProductDate : function(clonedProductInfoVO, oneSubProdOfferPageData, relaProdPageInfo) {
			        // 如果销售品没有实例信息，直接返回，不进行处理
			        if (oneSubProdOfferPageData.prodOfferInst == null) {
				        return;
			        } else if (oneSubProdOfferPageData.prodOfferInst != null) {
				        // 如果有实例并且选中
				        if (oneSubProdOfferPageData.prodOfferPageInfo.checkBoxValue) {
					        // 选中并且没有实例，说明是新订购的产品,立即生效
					        if (relaProdPageInfo.prodBasicInfo.checkedStatus
					                && relaProdPageInfo.prodBasicInfo.prodInstInfo == null) {
						        clonedProductInfoVO.effDate = dojo.global.$appContext$.requestParam.today;
						        // 没有选中，并且有实例信息，说明是退订,立即失效
					        } else if (!(relaProdPageInfo.prodBasicInfo.checkedStatus)
					                && relaProdPageInfo.prodBasicInfo.prodInstInfo != null) {
						        clonedProductInfoVO.expDate = dojo.global.$appContext$.requestParam.today;
					        }
					        // 有实例没有选中，取消可选包,不处理
				        } else if (!(oneSubProdOfferPageData.prodOfferPageInfo.checkBoxValue)) { return; }
			        }
		        },
		        /**
				 * 计算功能产品的属性
				 */
		        doSerProdAttrListComputation : function(productInfoVO, prodPageInfoData, extendedData) {
			        var dataBuilder = this;
			        return dataBuilder.doProdAttrInfoListComputation(productInfoVO, prodPageInfoData, extendedData);
		        },
		        /**
				 * 处理账户信息
				 * 
				 * @method
				 */
		        doAccountInfoComputation : function() {
			        var newServiceInfoList = this.controller.route("/self/getNewServiceInfoList");
			        if (!newServiceInfoList || newServiceInfoList.length == 0) { return {}; }
			        var accoutInfoPageData = this.controller.route("/payRelationWidgetInstance/getData"),
				        customerData = this.getCustomerData(),
				        commInfo = this.getCommInfo(),
				        builder = this,
				        extendedData = {};
			        dojo.mixin(extendedData, customerData);
			        dojo.mixin(extendedData, commInfo);
			        
			        if (accoutInfoPageData == false) {
				        return false;
			        } else {
				        var accountInfoList = accoutInfoPageData.accountInfo,
					        payRelationInfoList = accoutInfoPageData.payRelationInfo;
				        return {
					        accountAcceptInfoList : dojo.map(accountInfoList || [], function(accountViewVO) {
						                var clonedAccountInfo = dojo.clone(accountViewVO);
						                dojo.mixin(clonedAccountInfo, extendedData);
						                return builder.buildAccountAcceptInfoVO(clonedAccountInfo);
						                
					                }),
					        accountRelaList : dojo.map(payRelationInfoList || [], function(prodInstAcctTempVO) {
						                var clonedProdInstAcctTempVO = dojo.clone(prodInstAcctTempVO);
						                dojo.mixin(clonedProdInstAcctTempVO, extendedData);
						                return builder.buildProdInstAcctTempVO(clonedProdInstAcctTempVO);
						                
					                })
				        };
				        
			        }
			        
		        },
		        /**
				 * 处理销售品下的亲情信息
				 * 
				 * @method
				 */
		        doRelaBusTempListComputation : function(data) {
			        var dataBuilder = this,
				        relaBusInfoList = [],
				        relaBusTempVO = null,
				        ocsRelaList = [],
				        ocsSubseridBusTempVO = null;
			        list = data.relaBusPageInfoList;
			        
			        dojo.forEach(list, function(relaBusData) {
				                var FavourKindConst = ConstantsPool.load("FavourKindConst").FavourKindConst;
				                if (relaBusData.favourKind == FavourKindConst.OCS_FAVOUR) {
					                ocsSubseridBusTempVO = dataBuilder.buildOcsSubseridBusTempVO(relaBusData);
					                ocsRelaList.push(ocsSubseridBusTempVO);
				                } else {
					                relaBusTempVO = dataBuilder.buildRelaBusVO(relaBusData);
					                relaBusInfoList.push(relaBusTempVO);
				                }
				                
			                });
			        return {
				        "ocsRelaList" : ocsRelaList,
				        "relaBusInfoList" : relaBusInfoList
			        };
		        },
		        /**
				 * 处理销售品下的营销资源信息
				 * 
				 * @method
				 */
		        doResRelaInfoListComputation : function(data) {
			        var dataBuilder = this,
				        resRelaInfoList = [],
				        resRelaInfoVO = null,
				        list = data.resRelaPageInfoList;
			        
			        dojo.forEach(list, function(relaBusData) {
				                resRelaInfoVO = dataBuilder.buildResRelaInfoVOBean(relaBusData);
				                resRelaInfoList.push(resRelaInfoVO);
				                
			                });
			        return resRelaInfoList;
		        },
		        /**
				 * 处理销售品下的担保信息
				 * 
				 * @method
				 */
		        doProdOfferAssureInfoListComputation : function(data) {
			        var dataBuilder = this;
			        var assureData = data.prodOfferAssurePageInfoList;
			        var prodOfferAssureInfoList = [];
			        var offerAssureVO = {};
			        if (!!assureData) {
				        prodOfferAssureInfoList.push(dataBuilder.buildProdOfferInstAssureVO(assureData));
			        }
			        return prodOfferAssureInfoList;
		        },
		        
		        /**
				 * 促销政策提交数据处理
				 */
		        doSalesPromotionInfoComputation : function() {
			        var dataBuilder = this,
				        salesPromotionInfoPageData = this.controller.getSubProdOfferPageData();
			        if (!salesPromotionInfoPageData) { return false; }
			        var promotionAcceptInfoList = dojo.map(salesPromotionInfoPageData || [],
			                function(onePromotionInfo) {
				                var promotionInfoVO = onePromotionInfo.showData.promotionInfo;
				                var promotionPageInfoVO = onePromotionInfo.promotionPageInfo;
				                // var salesPromotionInfoVO = null;
				                var salesPromotionAcceptInfoVO = null;
				                var clonePromotionInfoVO = dojo.clone(promotionInfoVO);
				                var requestParam = dojo.global.$appContext$.get("requestParam");
				                var commInfo = dataBuilder.getCommInfo();
				                var productDateBuilder = util.ProdOfferHelper.getProductDateBuilder(promotionInfoVO, {
					                        "changeKind" : 1,
					                        "delayUnit" : promotionPageInfoVO.delayUnit,
					                        "delayTime" : promotionPageInfoVO.delayTime,
					                        "validType" : promotionPageInfoVO.validType,
					                        "validPeriod" : promotionPageInfoVO.validPeriod,
					                        "beginDate" : promotionPageInfoVO.startDate,
					                        "endDate" : promotionPageInfoVO.endDate
				                        });
				                var dateResult = {
					                effDate : promotionPageInfoVO.startDate,
					                expDate : promotionPageInfoVO.endDate
				                };
				                var extendedData = {};
				                dojo.mixin(extendedData, commInfo);
				                dojo.mixin(extendedData, dateResult);
				                dojo.mixin(clonePromotionInfoVO, dateResult);
				                dojo.mixin(clonePromotionInfoVO, {
					                        serviceId : dataBuilder.getCheckServiceId(promotionPageInfoVO)
				                        });
				                dojo.mixin(clonePromotionInfoVO, dataBuilder.doProdOfferAcceptInfoComputation({
					                                prodOfferInfoVO : promotionInfoVO,
					                                offerInstVO : null,
					                                prodOfferPageData : promotionPageInfoVO
				                                }));
				                dojo.mixin(clonePromotionInfoVO, requestParam);
				                dojo.mixin(clonePromotionInfoVO, requestParam.customerData);
				                dojo.mixin(clonePromotionInfoVO, commInfo);
				                dojo.mixin(clonePromotionInfoVO, {
					                        targetProductId : promotionPageInfoVO.productId
				                        });
				                dojo.mixin(clonePromotionInfoVO, {
					                        serviceKind : promotionPageInfoVO.serviceKind
				                        });
				                dojo.mixin(clonePromotionInfoVO, {
					                        targetprodOfferId : promotionPageInfoVO.prodOfferId
				                        });
				                dojo.mixin(clonePromotionInfoVO, {
					                        remark : promotionInfoVO.remark
				                        });
				                dojo.mixin(clonePromotionInfoVO, {
					                        targetObjectType : onePromotionInfo.showData.statusObj
				                        });
				                dojo.mixin(clonePromotionInfoVO, {
					                        rateFlag : onePromotionInfo.rateFlag
				                        });
				                dojo.mixin(clonePromotionInfoVO, {
					                        ifOcs : promotionInfoVO.ifCos
				                        });
				                dojo.mixin(clonePromotionInfoVO, {
					                        expDate : promotionPageInfoVO.endDate
				                        });
				                // salesPromotionInfoVO =
				                // dataBuilder.buildPromotionInfoVOBean(clonePromotionInfoVO);
				                salesPromotionAcceptInfoVO = dataBuilder
				                        .buildSalesPromotionAcceptInfo(clonePromotionInfoVO);
				                // 处理促销政策明细项信息
				                var promotionItemList = dataBuilder.doSalesPromotionItemsComputation(onePromotionInfo,
				                        extendedData);
				                var promotionResRelaInfo = dataBuilder.doPromotionResRelaComputation(onePromotionInfo);
				                // salesPromotionInfoVO.promotionItemList
				                // = promotionItemList || [];
				                // salesPromotionInfoVO.resRelaList =
				                // promotionResRelaInfoList || [];
				                // 促销政策明细项信息
				                salesPromotionAcceptInfoVO.promotionItemList = promotionItemList || [];
				                // 租机信息
				                salesPromotionAcceptInfoVO.deviceRentBusTempList = promotionResRelaInfo.deviceRentBusTempList;
				                // 礼券/补贴卷信息
				                salesPromotionAcceptInfoVO.rentSubsidyTempList = promotionResRelaInfo.rentSubsidyTempList;
				                // 销售品营销资源实例关系
				                salesPromotionAcceptInfoVO.offerResInstRelaList = promotionResRelaInfo.offerResInstRelaList;
				                // 促销政策担保信息处理
				                var promotionAssurePageInfoList = dataBuilder
				                        .doPromotionAssurePageInfoCoputation(onePromotionInfo);
				                // if(!!promotionAssurePageInfo){
				                // if(!salesPromotionAcceptInfoVO.prodOfferInstAssureList
				                // ||
				                // salesPromotionAcceptInfoVO.prodOfferInstAssureList.length<=0){
				                // salesPromotionAcceptInfoVO.prodOfferInstAssureList
				                // = [];
				                // }
				                // //
				                // dojo.mixin(salesPromotionAcceptInfoVO,{
				                // // prodOfferInstAssureList :
				                // salesPromotionAcceptInfoVO.prodOfferInstAssureList.push(promotionAssurePageInfo)
				                // // });
				                // salesPromotionAcceptInfoVO.prodOfferInstAssureList.push(promotionAssurePageInfo);
				                // }
				                salesPromotionAcceptInfoVO.prodOfferInstAssureList = promotionAssurePageInfoList || [];
				                salesPromotionAcceptInfoVO.promotionStatusCd = onePromotionInfo.promotionStatusCd;
				                //判断促销政策类型，如果是分月转兑且带有补贴卷营销资源则做标示
				                var promotionType = promotionInfoVO.promotionType;
				                if(promotionType == 5){//类型为分月转兑
				                	//分月转兑政策挂的营销资源
				                	var resRelaList = promotionInfoVO.proodOfferInfo.resRelaList;
				                	//判断营销资源中是否存在补贴卷
				                	var ifHasSubsidy = dojo.some(resRelaList||[],function(oneResRela){
				                		return oneResRela.mktResCd == 27;
				                	});
				                	if(ifHasSubsidy){//带有补贴卷营销资源
				                		salesPromotionAcceptInfoVO.ifHasSubsidy = "1";
				                	}
				                }
				                return salesPromotionAcceptInfoVO;
			                });
			        
			        return {
				        promotionAcceptInfoList : promotionAcceptInfoList || []
			        };
		        },
		        
		        /**
				 * 构建促销政策明细项属性
				 */
		        doSalesPromotionItemsComputation : function(onePromotionInfo, extendedData) {
			        var dataBuilder = this,
				        promotionItemList = [];
			        // 先去用户填写的数据
			        if (!!onePromotionInfo.promotionItemsPageInfoList) {
				        promotionItemList = dataBuilder.doPromotionItemsInfoComputation(onePromotionInfo, {
					                promotionPageInfo : onePromotionInfo.promotionItemsPageInfoList,
					                dataType : "userData"
				                }, extendedData);
			        } else {
				        var salesPromotionItemList = onePromotionInfo.showData.promotionInfo.salesPromotionItemList;
//				        var attrList = dojo.map(salesPromotionItemList || [], function(onePromotionItem) {
//					                return onePromotionItem.attrSpec;
//				                });
				        promotionItemList = dataBuilder.doPromotionItemsInfoComputation(onePromotionInfo, {
					                promotionPageInfo : util.AttrUtil.getPromotionItemValue(salesPromotionItemList),
					                dataType : "standardData"
				                }, extendedData);
			        }
			        return promotionItemList;
		        },
		        
		        doPromotionItemsInfoComputation : function(onePromotionInfo, promotionPageInfo, extendedData) {
		        	var builder = this;
			        var promotionInfo = onePromotionInfo.showData.promotionInfo;
			        var attrList = dojo.map(promotionInfo.salesPromotionItemList || [], function(promotionItemVO) {
				                return promotionItemVO.attrSpec;
			                });
			        var promotionItemVOList = [];
			        var extendedData = extendedData || {};
			        var getAttrVO = function(attrCd) {
				        return BusCard.find(attrList, function(attrVO) {
					                return attrVO.attrCd == attrCd;
				                })
			        };
			        if (promotionPageInfo.promotionPageInfo) {
				        for (var attrCd in promotionPageInfo.promotionPageInfo) {
					        var value = promotionPageInfo.promotionPageInfo[attrCd];
					        var dataType = promotionPageInfo.dataType;//数据来源类型
					        var attrVO = getAttrVO(attrCd);
				        	if(attrVO.isFeeAttr == 1){//费用属性
				        		if(dataType == "userData"){//用户填写数据，将页面元单位数据转换为分为单位
						        	if(value != 0){//attrVO.valueUnit == "D12" && value != 0){//以分为单位
						        		//value = value?value*100:0;//元转分
						        		value = builder.moneyConvert(value,2);
						        	}
				        		}
					        }
					        if (attrVO && value) {
						        var attrInfoVO = this.buildAttrInstItemVO(dojo.mixin(this.getAttrInfoVOTemplate(1,
						                        attrVO.attrId, attrCd, value), extendedData));
						        var itemVO = dojo.filter(promotionInfo.salesPromotionItemList||[],function(oneItem){
						        	return attrCd == oneItem.attrSpec.attrCd;
						        })[0];
						        var promotionItemVO = this
						                .buildPromotionItemVOBean(itemVO);
						        promotionItemVO.attrSpec = attrInfoVO;
//						        var promotionList = dojo.filter(promotionInfo.salesPromotionItemList || [], function(
//						                        onePromotionItem) {
//							                return onePromotionItem.attrSpec.attrCd == attrCd;
//						                });
//						        promotionItemVO.itemId = promotionList[0].itemId;
//						        promotionItemVO.itemKind = promotionList[0].itemKind;
						        promotionItemVOList.push(promotionItemVO);
					        }
				        }
			        }
			        return promotionItemVOList;
		        },
		        
		        moneyConvert : function(value,index){
		        	value = value.toString();
					var exp = /^\s*(\d+)\.(\d+)\s*$/g; 
					var matchResult = exp.exec(value); 
					if(matchResult){
				 	  var lastPart = matchResult[2];
				 	  if(lastPart.length<index){
				 	 	 var appendCount = index - lastPart.length;
				 	 	 while(appendCount--){
							lastPart = lastPart + "0"; 	 		
				 	 	 }
				 	  }    
				 	  return parseInt(matchResult[1] + lastPart.substring(0,index));  
					}else{
					 	var returnValue = parseInt(value);
					 	while(index--){
					 		returnValue  = returnValue*10;
					 	}
						return returnValue
					 }
		        },
		        
		        getCheckServiceId : function(promotionPageInfoVO) {
			        var mainProdOfferPageData = dojo.global.$appContext$.get(this.MAIN_KEY);
			        var productInfoList = mainProdOfferPageData.productInfoList;
			        var filtedProductInfoList = dojo.filter(productInfoList || [], function(oneProductInfo) {
				                var prodBasicInfo = oneProductInfo.prodBasicInfo;
				                return prodBasicInfo.serviceKindIndex == promotionPageInfoVO.serviceKindIndex
				                        && prodBasicInfo.productId == promotionPageInfoVO.productId;
			                });
			        
			        var serviceId = "";
			        if (filtedProductInfoList && filtedProductInfoList.length > 0) {
				        serviceId = filtedProductInfoList[0].serviceInfo.serviceId;
			        }
			        return serviceId;
		        },
		        
		        /**
				 * 获取促销政策营销资源数据
				 */
		        doPromotionResRelaComputation : function(onePromotionInfo) {
			        var dataBuilder = this,
				        rentSubsidyTempList = [],
				        deviceRentBusTempList = [],
				        // resRelaVO = null,
				        offerResInstRelaVO = null,
				        // 销售品营销资源实例关系vo
				        rentSubsidyTempVO = null,
				        // 礼券/补贴卷临时表vo
				        deviceRentBusTempVO = null,
				        // 租机临时表vo
				        offerResInstRelaDataVO = {},
				        rentSubsidyTempDataVO = {},
				        deviceRentBusTempDataVO = {},
				        offerResInstRelaList = [],
				        promotionResRelaList = onePromotionInfo.resRelaPageDataList;
			        dojo.forEach(promotionResRelaList || [], function(oneResRelaInfo) {
				        // resRelaVO = dataBuilder
				        // .buildPromotionResRelaInfoVOBean(oneResRelaInfo);
				        if (oneResRelaInfo.mktResCd && oneResRelaInfo.mktResCd == util.RES_RELA_CONST.SUBSIDY_ACCEPT) {// 营销资源类型为补贴卷
					        // rentSubsidyTempDataVO.listNo =
					        // oneResRelaInfo.giftNo
					        // && typeof(oneResRelaInfo.giftNo) !=
					        // "undefined"
					        // ? oneResRelaInfo.giftNo
					        // : oneResRelaInfo.subsidyNo;
					        rentSubsidyTempDataVO.buildDate = oneResRelaInfo.advancedEffDate;
					        rentSubsidyTempDataVO.beginDate = oneResRelaInfo.advancedEffDate;
					        var startDate = util.DateHelper.getDateFromString(oneResRelaInfo.advancedEffDate);
					        var advancedDays = oneResRelaInfo.advancedDays
					                && typeof(oneResRelaInfo.advancedDays) != "undefined"
					                ? parseInt(oneResRelaInfo.advancedDays)
					                : 0;
					        // startDate.setDay(startDate.getDay() +
					        // advancedDays);
					        startDate.setMonth(startDate.getMonth() + advancedDays);
					        var endDate = util.DateHelper.formatDate(startDate);
					        rentSubsidyTempDataVO.endDate = endDate;
					        rentSubsidyTempDataVO.subsidyFee = oneResRelaInfo.subFee
					                && typeof(oneResRelaInfo.subFee) != "undefined" ? oneResRelaInfo.subFee : 0;
					        rentSubsidyTempVO = dataBuilder.buildRentSubsidyTempVO(rentSubsidyTempDataVO);
					        rentSubsidyTempList.push(rentSubsidyTempVO);
				        } else if (oneResRelaInfo.mktResCd
				                && oneResRelaInfo.mktResCd == util.RES_RELA_CONST.GIFT_ACCEPT) {// 营销资源类型为话费礼券
					        // 构建礼券信息
					        rentSubsidyTempDataVO.buildDate = oneResRelaInfo.advancedEffDate;
					        rentSubsidyTempDataVO.beginDate = oneResRelaInfo.advancedEffDate;
					        var startDate = util.DateHelper.getDateFromString(oneResRelaInfo.advancedEffDate);
					        var advancedDays = oneResRelaInfo.advancedDays
					                && typeof(oneResRelaInfo.advancedDays) != "undefined"
					                ? parseInt(oneResRelaInfo.advancedDays)
					                : 0;
					        startDate.setMonth(startDate.getMonth() + advancedDays);
					        var endDate = util.DateHelper.formatDate(startDate);
					        rentSubsidyTempDataVO.endDate = endDate;
					        rentSubsidyTempDataVO.subsidyFee = oneResRelaInfo.advancedPayment
					                && typeof(oneResRelaInfo.advancedPayment) != "undefined"
					                ? oneResRelaInfo.advancedPayment
					                : 0;
					        rentSubsidyTempVO = dataBuilder.buildRentSubsidyTempVO(rentSubsidyTempDataVO);
					        rentSubsidyTempList.push(rentSubsidyTempVO);
					        // 构建销售品实例与营销资源关系(礼券)
					        offerResInstRelaDataVO = dataBuilder.buildOfferResInstRela(oneResRelaInfo, "gift");
					        offerResInstRelaVO = dataBuilder.buildOfferResInstRelaVO(offerResInstRelaDataVO);
					        offerResInstRelaList.push(offerResInstRelaVO);
					        // 构建礼券租机信息
					        deviceRentBusTempDataVO = dataBuilder.buildDeviceRentInfo(oneResRelaInfo);
					        deviceRentBusTempVO = dataBuilder.buildDeviceRentBusTempVO(deviceRentBusTempDataVO);
					        deviceRentBusTempList.push(deviceRentBusTempVO);
					        // 构建销售品实例与营销资源关系(租机)
					        offerResInstRelaDataVO = dataBuilder.buildOfferResInstRela(oneResRelaInfo, "giftrent");
					        offerResInstRelaVO = dataBuilder.buildOfferResInstRelaVO(offerResInstRelaDataVO);
					        offerResInstRelaList.push(offerResInstRelaVO);
					        
				        } else if (oneResRelaInfo.mktResCd
				                && (oneResRelaInfo.mktResCd == util.RES_RELA_CONST.RENT_ACCEPT || oneResRelaInfo.mktResCd == util.RES_RELA_CONST.OTHER_RENT_ACCEPT)) {// 营销资源类型为租机
					        // 构建租机信息
					        deviceRentBusTempDataVO = dataBuilder.buildDeviceRentInfo(oneResRelaInfo);
					        deviceRentBusTempVO = dataBuilder.buildDeviceRentBusTempVO(deviceRentBusTempDataVO);
					        deviceRentBusTempList.push(deviceRentBusTempVO);
					        // 构建销售品实例与营销资源关系
					        offerResInstRelaDataVO = dataBuilder.buildOfferResInstRela(oneResRelaInfo, "rent");
					        offerResInstRelaVO = dataBuilder.buildOfferResInstRelaVO(offerResInstRelaDataVO);
					        offerResInstRelaList.push(offerResInstRelaVO);
				        }
			        });
			        return {
				        offerResInstRelaList : offerResInstRelaList,
				        rentSubsidyTempList : rentSubsidyTempList,
				        deviceRentBusTempList : deviceRentBusTempList
			        };
		        },
		        
		        /**
				 * 构建租机信息
				 */
		        buildDeviceRentInfo : function(oneResRelaInfo) {
			        var deviceRentBusTempDataVO = {};
			        deviceRentBusTempDataVO.mobileAgent = oneResRelaInfo.mobileAgent;
			        deviceRentBusTempDataVO.manufacturer = oneResRelaInfo.moblieSourse;
			        deviceRentBusTempDataVO.deviceType = oneResRelaInfo.resourceKind;
			        deviceRentBusTempDataVO.deviceNo = oneResRelaInfo.deviceNo;
			        deviceRentBusTempDataVO.realPrice = oneResRelaInfo.realFee;
			        deviceRentBusTempDataVO.costPrice = oneResRelaInfo.costFee;
			        deviceRentBusTempDataVO.retailPrice = oneResRelaInfo.shouldFee;
			        deviceRentBusTempDataVO.rentKind = oneResRelaInfo.rentType;
			        deviceRentBusTempDataVO.devColor = oneResRelaInfo.resourceColour;
			        deviceRentBusTempDataVO.note = oneResRelaInfo.note;
			        //辽宁电信新增客户群
			        deviceRentBusTempDataVO.customerGroup = oneResRelaInfo.customerGroup;
			        //设备类型
			        deviceRentBusTempDataVO.userSource = oneResRelaInfo.mobileType;
					//应收价
			        deviceRentBusTempDataVO.confirmPrice = oneResRelaInfo.suggestFee;
			        return deviceRentBusTempDataVO;
		        },
		        
		        /**
				 * 构建销售品实例与营销资源关系
				 */
		        buildOfferResInstRela : function(oneResRelaInfo, resKind) {
			        var offerResInstRelaDataVO = {};
			        offerResInstRelaDataVO.mktResTypeCd = oneResRelaInfo.mktResTypeCd;
			        if (resKind == "rent") {// 营销资源类型为租机
				        offerResInstRelaDataVO.mktResCd = oneResRelaInfo.mktResCd;
				        offerResInstRelaDataVO.mktResInstId = oneResRelaInfo.mktResInstId;
				        offerResInstRelaDataVO.modifyContentStr = oneResRelaInfo.modifyContent;
			        } else if (resKind == "giftrent") {// 特殊处理礼券中的租机信息
				        offerResInstRelaDataVO.mktResCd = util.RES_RELA_CONST.RENT_ACCEPT;
				        offerResInstRelaDataVO.mktResInstId = oneResRelaInfo.mktResInstId;
				        offerResInstRelaDataVO.modifyContentStr = oneResRelaInfo.modifyContent;
			        } else {// 营销资源类型为礼券
				        offerResInstRelaDataVO.mktResCd = oneResRelaInfo.mktResCd;
				        offerResInstRelaDataVO.mktResInstId = oneResRelaInfo.mktGiftResInstId;
				        offerResInstRelaDataVO.modifyContentStr = oneResRelaInfo.modifyGiftContent;
			        }
			        return offerResInstRelaDataVO;
		        },
		        
		        /**
				 * 促销政策担保信息处理
				 */
		        doPromotionAssurePageInfoCoputation : function(onePromotionInfo) {
			        var dataBuilder = this;
			        var promotionAssureInfoList = [];
			        var promotionAssureInfo = onePromotionInfo.promotionAssurePageInfoList;
			        if (promotionAssureInfo) {
				        var assureInfoVO = dataBuilder.buildProdOfferInstAssureVO(promotionAssureInfo);
				        promotionAssureInfoList.push(assureInfoVO);
			        }
			        return promotionAssureInfoList;
		        },
		        /**
				 * 费用属性提交数据处理
				 */
				convertFeeAttr : function(attrVO,attrValue){	
					var convertValue = attrValue;
					if(!!attrVO && !!attrValue && !isNaN(attrValue)){
						if(attrVO.valueUnit == util.AttrUnitConst.unitConst 
								|| attrVO.valueUnit == util.AttrUnitConst.minuteConst){
							//convertValue = parseFloat(attrValue+"")*100+"";
							//修复浮点数相乘的bug
							convertValue = util.AttrUtil.accMul(parseFloat(attrValue+""),100)+""; 
						}
					}
					return convertValue;
				}
	        });
        });