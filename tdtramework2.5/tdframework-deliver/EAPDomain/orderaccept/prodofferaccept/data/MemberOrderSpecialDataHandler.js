/**
 * 收集数据后续处理
 * 
 * @module
 */
defineModule("orderaccept.prodofferaccept.data.MemberOrderSpecialDataHandler", ["../util", "../../common/js/ConstantsPool"],
        function(util, ConstantsPool) {
	        
	        dojo.declare("orderaccept.prodofferaccept.data.MemberOrderSpecialDataHandler", [], {
				controller : null,
		        /**
				 * 数据处理方法集合,数组中的数据处理有先后顺序
				 */
		        dataHandleMethodMap : [],
		        constructor : function(controller) {
			        this.controller = controller;
			        this.beanBuildFactory = new util.BeanBuildFactoryProvider().getInstance();
		        },
				process : function(data) {
			        var handler = this;
			        var r;
			        ConstantsPool.load(["ActionCDConst"]);
			        this.preProcess();
			        try {
				        r = handler.handleData(data);
			        }
			        catch (e) {
				        BusCard.showErrorStack(e);
				        this.postProcess();
				        throw e;
			        }
			        
			        this.postProcess();
			        return r;
		        },
		        /**
				 * 清空处理数据的方法
				 */
		        postProcess : function() {
			        this.dataHandleMethodMap = [];
			        dojo.global.$appContext$.deleteProperty(this.controller.dataBuilder.USER_ID_KEY);
		        },
		        /**
				 * 循环调用处理数据的方法，处理销售品数据
				 */
		        handleData : function(data) {
			        var handler = this;
			        for (var p = 0; p < this.dataHandleMethodMap.length; p++) {
				        var func = this.dataHandleMethodMap[p];
				        if (dojo.isFunction(func)) {
					        dojo.hitch(handler, func, data)();
				        }
			        }
			        return data;
		        },
		        /**
				 * 根据不同的ACTIONCD装配不同的数据处理方法
				 */
		        preProcess : function() {
		        	var handler = this;
			        this.dataHandleMethodMap.push(handler.dealVirtualNumRes);
			        this.dataHandleMethodMap.push(handler.createShoppingCartData);		        },
		        dealVirtualNumRes : function(data){
		        	var prodResRelaMap = prodOfferAcceptLoader.prodResRelaMap;
		        	var dataBuilder = this;
		        	if(!!prodResRelaMap){
		        		for(var p in prodResRelaMap){
		        			var prodResRelaInfo = prodResRelaMap[p];
		        			dojo.forEach(data.orderAcceptInfoList || [], function(orderInfoVO) {
					                dojo.forEach(orderInfoVO.prodOfferAcceptInfoList || [], function(
					                                prodOfferAcceptInfo) {
						                        dojo.forEach(prodOfferAcceptInfo.serviceProdAcceptInfoList || [],
						                                function(serviceProdAcceptInfo) {
						                                	//网络传真
							                                var attrInfoList = BusCard.jsonPath(
							                                        serviceProdAcceptInfo.prodInstAttrList || [],
							                                        "$[?(@.attrCd=="+ p + ")]");
							                                if (attrInfoList.length > 0) {
								                                var attrValue = attrInfoList[0].attrValue;
								                                if (prodResRelaInfo.serviceId == attrValue) {
									                                var prodResInstRelaVO = {};
									                                dojo.mixin(prodResInstRelaVO, prodResRelaInfo);
									                                serviceProdAcceptInfo.prodResInstRelaList = [dataBuilder
									                                        .buildProdResInstRelaVO(prodResInstRelaVO)];
								                                }
							                                }
						                                });
					                        });
				                });
		        		}
		        	}
		        },
		        buildProdResInstRelaVO : function(prodResInstRelaVO) {
			        return this.beanBuildFactory.getProdResInstRelaVO(prodResInstRelaVO);
		        },
		        /**
				 * 创建购物车数据
				 */
		        createShoppingCartData : function(data) {
			        var dataBuilder = this;
			        var shoppingCartAcceptVO = {};
			        // 拼操作相关信息串
			        dojo.mixin(shoppingCartAcceptVO, {
				                cityCode : dojo.global.$appContext$.get("requestParam").customerData.cityCode,
				                custId : dojo.global.$appContext$.get("requestParam").customerData.custId,
				                acceptDesc :"成员订购集团产品",
				                orderData : ""
			                });
			        data.shoppingCartAcceptVO = dataBuilder.buildShoppingCartAcceptVO(shoppingCartAcceptVO);
		        },
		        /**
				 * 创建购物车数据
				 */
		        buildShoppingCartAcceptVO : function(shoppingCartAcceptVO) {
			        return this.beanBuildFactory.getShoppingCartAcceptVO(shoppingCartAcceptVO);
		        }
	        });
	        
        });