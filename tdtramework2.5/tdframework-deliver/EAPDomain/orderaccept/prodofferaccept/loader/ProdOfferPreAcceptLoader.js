defineModule("orderaccept.prodofferaccept.loader.ProdOfferPreAcceptLoader", [
                "./ProdOfferNewLoader", "../util", "orderaccept.common.js.ConstantsPool"],
        function(ProdOfferNewLoader, util, ConstantsPool) {
	        dojo.declare("orderaccept.prodofferaccept.loader.ProdOfferPreAcceptLoader",
	                [ProdOfferNewLoader], {
		                custOrderHelper : null,
		                mainProdOfferItemVO : null,
		                _asynLoadSriptList : function() {
			                var _list = this.inherited(arguments);
			                var _a = "orderaccept.prodofferaccept.widget.mainprodoffer.RecoverableMainProdOfferWidget"
			                _list.push(_a);
			                return _list;
			                
		                },
		                _asynCallback : function() {
			                var loader = this;
			                this.inherited(arguments);
			                this.doPageSpecHanding();
			                this.asynLoadPreAcceptData(function() {
				                        loader.custOrderHelper = util.CustOrderVOHelper
				                                .getInstance(arguments[0]);
				                        return loader.beginRecoveryProcess.apply(loader, arguments);
			                        });
		                },
		                /**
						 * 根据预受理编号异步请求预受理订单信息
						 * 
						 * @method
						 */
		                asynLoadPreAcceptData : function(cb) {
			                var preRgstNo = $ac$.get("requestParam")["preRgstNo"],
				                sf = util.ServiceFactory,
				                preAcceptOrderInfoVO = sf
				                        .getService("spring:preAcceptOrderInfoDAO").queryById({
					                                preRgstNo : preRgstNo.toString()
					                                
				                                });
			                // async get custOrderVO data
			                sf.getService("spring:custOrderCommFacadeBO").queryAll(
			                        parseInt(preAcceptOrderInfoVO.custOrderId),
			                        function(custOrderVO) {
				                        $ac$.set("_custOrderVO_", custOrderVO);
				                        cb(custOrderVO);
			                        });
			                
		                },
		                /**
						 * 开始预受理订单的状态恢复过程
						 * 
						 * @method
						 */
		                beginRecoveryProcess : function(custOrderVO) {
			                this._initData(custOrderVO);
			                this.changeMainProdOffer(this.mainProdOfferItemVO.prodOfferId);
		                },
		                /**
						 * 初始化可选包购物车中数据
						 */
		                showSubProdOfferCart : function(subProdOfferCartDataProvider) {
			                subProdOfferCartDataProvider.showProdOfferFromOrderItem();
		                },
		                /**
						 * 初始化部分成员属性
						 * 
						 * @method
						 */
		                _initData : function(custOrderVO) {
			                // check if exist independence prodoffer
			                var independenceProdOfferList = this.custOrderHelper
			                        .getIndependenceItemList();
			                if (independenceProdOfferList && independenceProdOfferList.length > 0) {
				                // switch independence prodoffer
				                // handing
				                
			                } else {
				                this.mainProdOfferItemVO = this.custOrderHelper
				                        .getMainProdOfferItemList()[0];
				                
			                }
			                
		                },
		                /**
						 * @override
						 * @method
						 */
		                renderMainProdOfferTree : function() {

		                },
		                /**
						 * @override
						 * @method
						 */
		                renderProdOfferFavorite : function() {

		                },
		                /**
						 * 
						 */
		                doPageSpecHanding : function() {
			                unieap.byId("orderDetailContainer").getPaneByRegion("left").domNode.style.display = "none";
			                
		                },
		                /**
						 * @override
						 * @method
						 */
		                getBelongCode : function() {
			                return dojo.filter(dojo.map(this.custOrderHelper
			                                        .getAccessProdItemList(), function(item) {
				                                return item.belongCode;
			                                }), function(b) {
				                        return b != null;
			                        })[0];
			                
		                },
		                
		                /**
						 * @override
						 * @method
						 */
		                registerClass : function() {
			                this.inherited(arguments);
			                this.mainProdOfferWidgetClass = orderaccept.prodofferaccept.widget.mainprodoffer.RecoverableMainProdOfferWidget;
			                
		                },
		                addAllServiceCardWidgets : function() {
			                var trs = dojo.query(".main-product-basic",
			                        this.mainProdOfferWidget.domNode),
				                controller = this;
			                dojo.forEach(trs, function(node) {
				                var uniqueId = dojo.attr(node, "uniqueId"),
					                orderItemId = dojo.attr(node, "orderItemId"),
					                cb = null,
					                paramHandler = function(node, param) {
						                param.serviceOfferId = controller
						                        .getServiceOfferConfigVO(util.ACTION_CD_CONST.PRODUCT_INSTALL).serviceOfferId;
						                return param;
						                
					                };
				                if (orderItemId) {
					                cb = function() {
						                var orderItemVO = controller.custOrderHelper
						                        .filterOrderItemList(function(vo) {
							                                return vo.orderItemId == orderItemId;
						                                })[0];
						                this.busCardInstance.renderDefaultValue(orderItemVO);
						                controller.recoveryAccessProductServiceInfo(uniqueId,
						                        orderItemVO, this);
						                controller.recoveryAccessProductAttrInfo(uniqueId,
						                        orderItemVO, this);
						                
					                };
					                
				                }
				                controller.addServiceCardWidget(uniqueId, paramHandler, cb);
			                });
			                
		                },
		                
		                recoveryAccessProductServiceInfo : function(uniqueId, orderItemVO,
		                        prodServiceInfoCardWidget) {
			                var serviceCard = prodServiceInfoCardWidget.busCardInstance,
				                loader = this;
			                if (serviceCard) {
				                
				                // 处理局向:
				                // 这里处理的有一些问题,母局一般应该通过当前局向查出来,目前
				                // 认为母局和当前局向相同
				                serviceCard.renderDefaultValue({
					                        bureauId : orderItemVO.branchNo
				                        });
				                
				                // 处理标准地址:
				                loader.recoveryStandardAddr(serviceCard, orderItemVO);
				                // 处理uim卡号,服务号码对应的资源信息
				                loader.recoveryUimAndNumberRes(serviceCard, orderItemVO);
				                
			                }
			                
		                },
		                /**
						 * 恢复标准地址状态
						 * 
						 * @method
						 */
		                recoveryStandardAddr : function(serviceCard, orderItemVO) {
			                var addrDetail = orderItemVO.addrDetail,
				                addressId = orderItemVO.addrId,
				                addressIdElem = serviceCard.$("addrId");
			                if (addrDetail && serviceCard.$('addrDetail')) {
				                serviceCard.$('addrDetail').value = addrDetail;
			                }
			                if (addressId && /^(\d+)$/.test(addressId.toString())) {
				                try {
					                addressIdElem.value = "";
					                addressIdElem.rvalue = addressId;
					                var addressIdText = BusCard.$remote("mktGetAddressNameDAO")
					                        .getAddressNameById(orderItemVO.cityCode, addressId);
					                if (addressIdText) {
						                addressIdText = addressIdText.replace(/"/g, "");
					                }
					                if (addressIdText && addressIdText != "null") {
						                addressIdElem.value = addressIdText;
					                }
					                
				                }
				                catch (e) {

				                }
				                
			                }
			                
		                },
		                /**
						 * 恢复卡和号等资源状态
						 * 
						 * @method
						 */
		                recoveryUimAndNumberRes : function(serviceCard, orderItemVO) {
			                try {
				                var rpc = "spring:prodInstCommFacadeBO/getProdResInstRela",
					                numberMktType = ConstantsPool.load("ResourceConst").ResourceConst.RESOURCE_TYPE_NUMBER,
					                uimMktType = ConstantsPool.load("ResourceConst").ResourceConst.RESOURCE_TYPE_SMART_CARD,
					                loader = this;
				                loader.route(rpc, [{
					                        prodInstId : orderItemVO.prodInstId
				                        }, function(prodResInstRelaList) {
					                        dojo.forEach(prodResInstRelaList, function(
					                                prodResInstRelaVO) {
						                        var mktResInstId = prodResInstRelaVO.mktResInstId,
							                        mktResTypeCd = prodResInstRelaVO.mktResTypeCd;
						                        if (mktResTypeCd == numberMktType) {
							                        serviceCard.renderDefaultValue({
								                                resInstId : mktResInstId
								                                
							                                });
							                        
						                        } else if (mktResTypeCd == uimMktType) {
							                        serviceCard.renderDefaultValue({
								                                uimResInstId : mktResInstId
								                                
							                                });
							                        loader
							                                .route(
							                                        "spring:commResourceBO/queryResourceInfo",
							                                        [{
								                                        cityCode : orderItemVO.cityCode,
								                                        objectType : 1,
								                                        resourceType : 2,
								                                        objectID : mktResInstId,
								                                        queryContent : ['ICCID']
							                                        }, function(vo) {
								                                        var uimId = vo.resourceInfo.ICCID;
								                                        serviceCard
								                                                .renderDefaultValue(
								                                                        {
									                                                        uimId : uimId
									                                                        
								                                                        });
								                                        
							                                        }

							                                        ]);
							                        
						                        }
						                        
					                        });
					                        
				                        }

				                ])
			                }
			                catch (e) {

			                }
			                
		                },
		                /**
						 * 恢复接入类产品对应的属性信息
						 * 
						 * @method
						 */
		                recoveryAccessProductAttrInfo : function(uniqueId, orderItemVO,
		                        prodServiceInfoCardWidget) {
			                if (prodServiceInfoCardWidget.attrCardWidget) {
				                var attrCard = prodServiceInfoCardWidget.attrCardWidget.busCardInstance;
				                var attrValueObj = {};
				                var prodInstAttrList = orderItemVO.prodInstAttrList || [];
				                dojo.forEach(prodInstAttrList, function(vo) {
					                        attrValueObj[vo.attrId || vo.attrCd] = vo.attrValue;
					                        
				                        });
				                var productInfoVO = prodServiceInfoCardWidget.attrCardWidget.productInfoVO;
				                if(!!productInfoVO){
				             		dojo.forEach(productInfoVO.attrList,function(attrVO){
				             			if(!!attrValueObj[attrVO.attrCd]){
											var convertValue = attrValueObj[attrVO.attrCd];
											if(!!attrVO && !isNaN(convertValue)){
												if(attrVO.valueUnit == util.AttrUnitConst.unitConst 
														|| attrVO.valueUnit == util.AttrUnitConst.minuteConst){	
													attrValueObj[attrVO.attrCd] = parseFloat(attrValueObj[attrVO.attrCd]+"")/100;
												}
											}
				             			}
				             		});
				                }
				                attrCard.renderDefaultValue(attrValueObj);
				                
			                }
			                
		                }
		                
	                });
	        
        });