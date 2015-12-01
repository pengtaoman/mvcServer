/**
 * 此模块放置所有模型数据构建处理逻辑
 * 
 * @module
 */
defineModule("orderaccept.prodofferaccept.data.ProdOfferChgDataBuilder", ["../ProductDateBuilder", "../util",
                "../../common/js/ConstantsPool", "./ProdOfferNewDataBuilder"], function(ProductDateBuilder, util,
                ConstantsPool, ProdOfferNewDataBuilder) {
	        
	        /**
			 * 变更可选包处理类
			 */
	        dojo.declare("orderaccept.prodofferaccept.data.ProdOfferChgDataBuilder", [ProdOfferNewDataBuilder], {
		        
		        /**
				 * 可选包变更不用填写页面公共信息
				 * 
				 * @override
				 * @method
				 */
		        getCommInfo : function() {
			        return {};
		        },
		        
		        /**
				 * 计算本次受理销售品变化的一些信息,比如operKind,如果是老 用户信息,需要计算出变更和退订的信息
				 * 
				 * @param {Object} param.prodOfferInfoVO
				 * @param {Object} param.offerInstVO
				 * @param {Object} param.prodOfferPageData
				 * @override
				 * @method
				 */
		        doMainProdOfferAcceptInfoComputation : function(param) {
			        var mainProdOfferInstVO = dojo.global.$appContext$.get("mainProdOfferInstVO"),
				        prodOfferPageData = param.prodOfferPageData,
				        isAllSplited = $ac$.get("selectedMemberProdOfferList")
				                && $ac$.get("selectedMemberProdOfferList").isAllSplited;
			        
			        // 如果是主销售品,目前直接返回变更类型和原有的基本销售品实例信息,
			        // 服务端需要进一步计算是否是变更还是不变
			        if (mainProdOfferInstVO.prodOfferInstId == prodOfferPageData.prodOfferPageInfo.prodOfferInstId) { return dojo
			                .mixin(this._cloneBasicProperty(mainProdOfferInstVO), {
				                        operKind : isAllSplited ? 3 : 2,
				                        ActionCD : ConstantsPool.ActionCDConst.PRODUCT_CHANGE
			                        });

			        }
			        
		        },
		        /**
				 * 生成对应的userId,如果是老用户,直接返回老用户的userId
				 * 
				 * @override
				 * @method
				 */
		        generateVirtualUserId : function(prodPageInfoData) {
			        var id = prodPageInfoData.prodBasicInfo.userId
			                ? prodPageInfoData.prodBasicInfo.userId
			                : -util.CommUtils.generateUniqueId(),
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
				 * 在销售品实例信息中根据prodInstId查询对应的产品实例信息
				 * 
				 * @method
				 */
		        _queryRelaProdInfoVO : function(prodOfferAcceptInfoVO, prodInstId) {
			        if (arguments.length == 2) {
				        var queryResult = BusCard.jsonPath(prodOfferAcceptInfoVO, "$.prodInstList[?(@.prodInstId=="
				                        + prodInstId + "]");
				        if (queryResult) {
					        return queryResult[0];
				        } else {
					        return null;
				        }
				        
			        } else if (arguments.length == 1) {
				        var prodInstId = arguments[0],
					        queryResult = BusCard.jsonPath(dojo.global.$appContext$.get("userHasProdOfferInfoList"),
					                "$[*].prodInstList[?(@.prodInstId==" + prodInstId + ")]"

					        );
				        if (queryResult) { return queryResult[0]; }
				        
			        }
			        
		        },
		        /**
				 * 计算本次受理产品变化的一些信息,比如operKind,目前都是写死的值,以后从常量接口中取值
				 * 
				 * @param {Object} param.productInfoVO
				 * @param {Object} param.prodInstVO
				 * @param {Object} param.prodPageData
				 * 
				 * @override
				 * @method
				 */
		        doAccessProductAcceptInfoComputation : function(param) {
			        return this.inherited(arguments);
		        },
		        /**
				 * @override
				 * @method
				 */
		        doProdAttrInfoListComputation : function(productInfoVO, prodPageInfoData, extendedData) {
			        return this.inherited(arguments);
			        
		        },
		        /**
				 * 计算退订协议的时间
				 */
		        doComputationOfferStandardBusInfo : function(prodOfferInstId, prodOfferAcceptInfoVO) {
			        return null;
		        }
		        
	        });
	        
        });