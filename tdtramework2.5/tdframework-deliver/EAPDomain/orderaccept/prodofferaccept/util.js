defineModule("orderaccept.prodofferaccept.util", ["orderaccept.prodofferaccept.ProductDateBuilder", "unieap.tree.Tree",
                "orderaccept.common.js.ConstantsPool", "orderaccept.common.dialog.MessageBox"], function(builder,
                unieapTree, ConstantsPool, messageBox) {
	        /**
			 * 
			 * 这个是页面级别的actionCd ,和产品规格层面的actionCd没有关系
			 * ,是BB_VAR_SERVICE_OFFER_CONFIG_T中 var_value值
			 * 
			 * @field
			 * 
			 */
	        var ActionCDConst = {
		        /**
				 * 客户新建
				 */
		        CUSTOMER_NEW : "101",
		        /**
				 * 客户修改
				 */
		        CUSTOMER_MODIFY : "102",
		        /**
				 * 客户注销
				 */
		        CUSTOMER_CANCEL : "103",
		        /**
				 * 客户稽核
				 */
		        CUSTOMER_AUDIT : "104",
		        /**
				 * 账户新建
				 */
		        ACCOUNT_NEW : "201",
		        /**
				 * 帐户修改
				 */
		        ACCOUNT_MODIFY : "202",
		        /**
				 * 账户注销
				 */
		        ACCOUNT_CANCEL : "203",
		        /**
				 * 客户帐户关系变更
				 */
		        CUSTOMER_ACCOUNT_RELATION_CHANGE : "204",
		        /**
				 * 订购
				 */
		        OFFER_ORDER : "4001",
		        /**
				 * 退订
				 */
		        OFFER_CANCEL : "4002",
		        /**
				 * 变更
				 */
		        OFFER_MODIFY : "4003",
		        /**
				 * 续订
				 */
		        OFFER_CONTINUE : "4004",
		        /**
				 * 销售品新装
				 */
		        PRODUCT_INSTALL : "301",
		        /**
				 * 销售品变更
				 */
		        PRODUCT_CHANGE : "302",
		        /**
				 * 变更主销售品
				 */
		        PRODUCT_CHANGE_MAIN : "303",
		        /**
				 * 销售品续订
				 */
		        PRODUCT_CONTINUE_ORDER : "304",
		        
		        /**
				 * 产品退网
				 */
		        PRODUCT_QUIT : "3",
		        
		        /**
				 * 成员销售品变更
				 */
		        MEMBER_OFFER_CHANGE : '309',
		        
		        /**
				 * 没有变化
				 */
		        NONE_CHANGE : "0",
		        
		        /**
				 * 预受理
				 */
		        PRE_ACCEPT : "305",
		        /**
				 * 销售品退订动作
				 */
		        PRODOFFER_CANCEL_ACTION : "306",
		        /**
				 * 协议转订单动作，走销售品新装的流程
				 */
		        PROTOCOL_ACCEPT : "307",
		        /**
				 * 购物车订购
				 */
		        SHOPPING_CART_ACCEPT : "308",
		        
		        /**
				 * 加装
				 */
		        PROD_ADD : "333",
		        /**
				 * 拆分
				 */
		        PROD_SPLIT : "334",
		        /**
				 * 互换
				 */
		        PROD_INTERCHANGE : "335",
		        /**
				 * 预登录返单
				 */
		        PRE_ORDER_BACK : "320",
		        /**
				 * 促销政策变更
				 */
		        PROMOTION_CHANGE : "1000",
		        /**
				 * @deprecated 换受理
				 */
		        CHANGE_ACCEPT : "93",
		        /**
				 * 换受理
				 */
		        PRODUCT_CHANGE_ACCEPT : "93",
		        
		        /**
				 * 成员订购集团产品
				 */
		        MEMBER_ORDER_GROUP_PRODUCT : "5000",
		        
		        ORDER_CHANGE_ACCEPT : "100"
	        },
		        orderTypeObj = {
			        "CUSTOMER" : "1000",
			        "ACCOUNT" : "1100",
			        "PRODUCT" : "1300",
			        "OFFER" : "1200"
		        },
		        PRODUCTTYPE = {
			        ACCESS_PROD_TYPE : "101"
		        },
		        resRelaConst = {
			        "DEFAULT_PRODUCT" : "-10000",
			        "PRODUCT_RES_RELA" : "1",
			        "PROD_OFFER_RES_RELA" : "0",
			        "SUBSIDY_ACCEPT" : "27",
			        "SUBSIDY_ATTR_CD" : "840",
			        "RENT_ACCEPT" : "20",
			        "RENT_ATTR_CD" : "851",
			        "GIFT_ACCEPT" : "36",
			        "INTERNET_CAT" : "42",
			        "OTHER_RENT_ACCEPT" : "21"
		        },
		        PRODOFFERTYPE = {
			        /**
					 * 关联关系(目前新的销售品产品关系里没有关联)
					 */
			        REL_TYPE : "3",
			        /**
					 * 互斥关系
					 */
			        EX_TYPE : "200000",
			        /**
					 * 依赖关系
					 */
			        DEPEND_TYPE : "100000",
			        
			        /**
					 * 主从关系
					 */
			        SUBORDINATE_TYPE : "100600",
			        /**
					 * 包含关系
					 */
			        CONTAIN_TYPE : "17",
			        /**
					 * 主销售品
					 */
			        MAIN_OFFER_TYPE : "1",
			        /**
					 * 该标识无用
					 */
			        MAIN_MEMBER_PRODUCT_FLAG : "1",
			        /**
					 * 订购销售品
					 */
			        OFFER_ORDER : "1",
			        /**
					 * 取消销售品
					 */
			        OFFER_CANCEL : "3",
			        /**
					 * 修改销售品
					 */
			        OFFER_CHANGE : "2",
			        /**
					 * 销售品续订
					 */
			        OFFER_PARAM_CHANGE : "4",
			        /**
					 * 接入类产品和功能类产品关系
					 */
			        PRODUCT_RELA : "5",
			        /**
					 * 组合产品-成员间关联关系
					 */
			        PRODUCT_COMB_MEMBER : "6",
			        /**
					 * 组合销售品-产品间的成员构成关系，这种关系不写销售品和产品订单项关系
					 */
			        OFFER_COMB_MEMBER : "3",
			        /**
					 * 销售品-产品关联关系
					 */
			        OFFER_PRODUCT : "4",
			        /**
					 * 销售品-销售品推荐关系
					 */
			        RECOMMEND_TYPE : "14"
		        },
		        /**
		         * 包周期类型
		         */
		        StandardTypeConst = {
		        	/**
		        	 * 包年
		        	 */
		        	yearType : 1,
		        	/**
		        	 * 半年
		        	 */
		        	halfYearType : 2,
		        	/**
		        	 * 季度
		        	 */
		        	quarterType : 3
		        },
		        ServiceKindPrefixMap = {
			        '0' : '不区分业务',
			        '1' : '客户信息',
			        '2' : '帐户信息',
			        '3' : '业务共性信息',
			        '8' : '移动电话',
			        '10' : 'PSTN业务',
			        '11' : '普通宽带产品',
			        '12' : '集团业务',
			        '13' : '超级无绳',
			        '14' : 'NGN业务',
			        '15' : 'CDMA1X业务',
			        '16' : 'WLAN业务',
			        '20' : '虚拟用户',
			        '21' : '数据固定业务',
			        '22' : '售机售卡',
			        '23' : '双模业务',
			        '24' : 'CDMA号码资源产品',
			        '33' : '捆绑优惠组合',
			        '51' : 'SCDMA业务',
			        '52' : '190业务',
			        '53' : '17969业务',
			        '54' : '专线业务',
			        '55' : '宽带LAN业务',
			        '56' : '4008业务',
			        '57' : '800业务',
			        '58' : '商务领航业务',
			        '59' : '号码百事通业务',
			        '60' : '超级一号通业务',
			        '61' : 'E视星空业务',
			        '62' : '窄带数据业务',
			        '63' : '网元出租业务',
			        '64' : '11800业务',
			        '65' : 'IDC业务',
			        '66' : '语音增值业务',
			        '67' : '互联网增值业务',
			        '68' : '行业应用业务',
			        '69' : '小灵通',
			        '70' : 'M2M业务',
			        '98' : '行业短信',
			        '99' : '其他应用业务',
			        '820' : 'CDMA短信',
			        '913' : 'GPRS业务'
		        },
		        actionNameMap = {
			        "split" : '\u6210\u5458\u62c6\u5206',
			        "new" : '\u6210\u5458\u8ba2\u8d2d',
			        "quit" : '\u6210\u5458\u9000\u7f51',
			        "change" : "\u6210\u5458\u53d8\u66f4",
			        "nochange" : '\u6210\u5458\u53d8\u66f4'
		        },
		        ServiceKindCounter = function() {
			        var map = {};
			        var get = function(serviceKind) {
				        if (map[serviceKind] == null) {
					        map[serviceKind] = 0;
				        }
				        map[serviceKind] = map[serviceKind] + 1;
				        return map[serviceKind];
			        };
			        
			        return {
				        get : get
			        };
		        }(),
		        ProdOfferOrderCounter = function() {
			        var map = {};
			        var get = function(prodOfferId) {
				        if (map[prodOfferId] == null) {
					        map[prodOfferId] = 0;
				        }
				        map[prodOfferId] = map[prodOfferId] + 1;
				        return map[prodOfferId];
			        };
			        var reset = function() {
				        map = {};
			        };
			        return {
				        get : get,
				        reset : reset
			        };
		        }(),
		        T2ProdOfferConst = {
			        T2_PRDOFFER_TYPE : "9",
			        VOICE_CARD : "100110",
			        VOICE_CARD_SUB_PRODOFFER : "300614"
		        },
		        /**
				 * 漫游产品Id 国际漫游产品Id：18：国际漫游(CDMA业务)；60：双模国际漫游(CDMA业务)；
				 * 国内漫游产品Id：18：国际漫游(CDMA业务)；59：双模国内漫游(CDMA业务)；
				 */
		        RoamProdConst = {
			        InterRoamProdConst : ['486', '8'],
			        InlandRoamProdConst : ['7']
		        },
		        /*
				 * 销售品产品动作
				 */
		        OperKindConst = {
			        /**
					 * 增加
					 */
			        addOperKind : 1,
			        /**
					 * 删除
					 */
			        delOperKind : 3,
			        /**
					 * 变更
					 */
			        chgOperKind : 2,
			        /**
					 * 不变
					 */
			        noChgOperKind : 0
		        },
		        /**
				 * 需要特殊处理的属性id常量 对应于select * from BB_ATTR_use_CONFIG_T
				 * where USE_TYPE =3中的属性数据
				 */
		        SpecAttrCdConst = {
			        /**
					 * 端口速率
					 */
			        portSpeedAttrCd : 100081,
			        /**
					 * 业务号码-一机双号使用
					 */
			        serviceIdAttrCd : 34,
			        /**
					 * 用户类型
					 */
			        userTypeAttrCd : 300000,
			        /**
					 * 周价
					 */
			        cyclePriceAttrCd : 300003,
			        /**
			         * 周价的生效时间
			         */
			        cyclePriceDateAttrCd : 300075,
			        /**
					 * 一卡双号的属性
					 */
			        oneCard2NumAttrCd : 54,
			        /**
			         * 接入方式
			         */
			        accessTypeAttrCd : 100704,
			        /**
			         * 项目
			         */
			        itemAttrCd : 100401,
			        /**
			         * 结算入网方式
			         */
			        balanceInetMethodAttrCd : 100400,
			        
			        /**
			         * 速率生效时间
			         */
			        rateEffectDate : 100538
			        
		        },
		        
		        /**
		         * 速率属性id集合
		         */
		        SpeedAttrArray = ['100340','100339','100081','100523','100524','100876'],
		        
		        /**
				 * 协议销售品的属性id
				 */
		        OfferStandardAttrId = {
			        /**
					 * 时长
					 */
			        timeAttrId : "300012",
			        /**
					 * 包周期单位
					 */
			        cycleUnit : "300010"
		        },
		        /**
				 * 受理检测的次数(经商量，只检测三次)
				 */
		        AcceptCheckCount = {
			        checkCount : 3
		        },
		        /**
				 * 主副卡角色
				 */
		        MainAuxiliaryCardRoleCDS = {
			        MainCardRoleCd : 50002,
			        AuxiliaryCardRoleCd : 50003
		        },
		        /**
				 * 属性单位
				 */
		        AttrUnitConst = {
			        /**
					 * 元
					 */
			        unitConst : "D8",
			        /**
					 * 分
					 */
			        minuteConst : "D12"
		        },
		        ProdOfferHelper = {
			        getProductTupleList : function(prodOfferInfoVO) {
				        var protoConcat = Array.prototype.concat;
				        if (!prodOfferInfoVO) {
					        return;
				        } else {
					        var noRoleList = dojo.map(prodOfferInfoVO.offerProdRelaList || [], function(prodRela) {
						                var roleInfoVO = prodRela.roleInfoVO,
							                cloneRoleInfoVO = null;
						                if (roleInfoVO) {
							                cloneRoleInfoVO = dojo.clone(roleInfoVO);
						                }
						                return {
							                roleInfoVO : cloneRoleInfoVO,
							                offerProdRelaVO : dojo.clone(prodRela)
						                };
					                });
					        return noRoleList;
					        
				        }
				        
			        },
			        getProductDateBuilder : function(prodOfferInfoVO, pageInfo) {
				        
				        var SYSDATE = dojo.global.$appContext$.requestParam.today,
					        pageInfo = pageInfo || {};
				        return new builder.NewMainProductDateBuilder({
					                "changeKind" : pageInfo.changeKind || 1,
					                "delayUnit" : pageInfo.delayUnit == 0 ? 0 : prodOfferInfoVO.delayUnit,
					                "delayTime" : pageInfo.delayTime == 0 ? 0 : prodOfferInfoVO.delayTime,
					                "validType" : pageInfo.validType || prodOfferInfoVO.effectType,
					                "validPeriod" : pageInfo.validPeriod || prodOfferInfoVO.maxEffect,
					                "today" : SYSDATE,
					                "beginDate" : pageInfo.beginDate,
					                "endDate" : pageInfo.endDate,
					                "delayUnorderUnit" : pageInfo.delayUnorderUnit,
					                "delayUnorderTime" : pageInfo.delayUnorderTime,
					                "ifChangeMainFlag" : pageInfo.ifChangeMainFlag
					                
				                });
				        
			        },
			        /**
					 * 
					 */
			        getOfferDelayEndDateBuilder : function(prodOfferInfoVO) {
				        
				        var SYSDATE = dojo.global.$appContext$.requestParam.today;
				        return new builder.NewMainProductDateBuilder({
					                "changeKind" : 3,
					                "today" : SYSDATE,
					                "delayUnorderUnit" : prodOfferInfoVO.delayUnorderUnit,
					                "delayUnorderTime" : prodOfferInfoVO.delayUnorderTime
				                });
				        
			        },
			        /**
					 * 获取销售品下所有的产品信息
					 */
			        doGetAllProduct : function(prodOfferInfoVO) {
				        // 产品集合
				        var productList = [];
				        // 将无角色产品信息集合添加到产品集合productList当中，集合中存储的为封装后的成员对象
				        Array.prototype.push.apply(productList, BusCard.map(prodOfferInfoVO.offerProdRelaList || [],
				                        function(offerProdRela) {
					                        return offerProdRela;
				                        }));
				        return productList;
			        },
			        /**
					 * 获取关联的接入类产品信息集合 accessProductId 接入类产品id
					 * relaServiceProdList 使用于对应接入类的功能产品
					 */
			        doGetRelaAccessProductIdList : function(prodOfferInfoVO) {
				        var _helper = this,
					        relaAccessProdIdList = [],
					        allProductList = _helper.doGetAllProduct(prodOfferInfoVO),
					        serviceProductList = dojo.filter(allProductList, function(productInfo) {
						                return productInfo.productInfoVO.prodFuncType != "101";
					                }),
					        accessProductList = dojo.filter(allProductList, function(productInfo) {
						                return productInfo.productInfoVO.prodFuncType == "101";
					                }),
					        // 获取主套餐下的产品集合
					        productList = _helper.getCurrentPageAccessProdIds(),
					        relaResultList = BusCard.findAll(productList, function(productInfo) {
						                // 如果不是接入类 不处理
						                if (!_helper.checkIsMainMemberProd(productInfo)) { return; }
						                // 因为现在没有关联关系了，所以只能靠依赖关系来判断
						                return BusCard.exist(serviceProductList || [], function(serviceProductVO) {
							                        var productInfoVO = serviceProductVO.productInfoVO,
								                        prodRelaList = productInfoVO.prodRelaList || [];
							                        return BusCard.exist(prodRelaList, function(prodRela) {
								                                return (prodRela.relaType == PRODOFFERTYPE.SUBORDINATE_TYPE)
								                                        && (prodRela.prodA == productInfo.productId);
							                                });
							                        
						                        });
					                });
				        relaAccessProdIdList = relaAccessProdIdList.concat(dojo.map(relaResultList, function(
				                        productInfo) {
					                return productInfo.productId;
				                }));
				        relaAccessProdIdList = relaAccessProdIdList.concat(dojo.map(accessProductList, function(
				                        productInfo) {
					                return productInfo.productId;
				                }));
				        return relaAccessProdIdList;
			        },
			        
			        /**
			         * 获取页面上的接入类产品信息
			         */
			        getCurrentPageAccessProdIds : function(){
			        	var currentPageAccessProdIdsObj = [];
			        	var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
			        	dojo.forEach(selectedMemberProdOfferList||[],function(selectedMemberProdVO){
			        		if(selectedMemberProdVO.action != "quit"){
			        			currentPageAccessProdIdsObj.push(selectedMemberProdVO);
			        		}
			        	});
			        	return currentPageAccessProdIdsObj;
			        },
			        
			        getMainProdOffer : function(prodOfferList) {
				        var independenceProdOfferList = dojo.filter(prodOfferList, function(value) {
					                return value.bindType == 2;
				                });
				        if (independenceProdOfferList && independenceProdOfferList.length) {
					        return independenceProdOfferList;
				        } else {
					        return dojo.filter(prodOfferList, function(value) {
						                return value.prodOfferType == 1;
					                });
				        }
				        
			        },
			        /**
					 * 获取可选包销售品集合
					 */
			        getSubProdOfferList : function(prodOfferList) {
				        return dojo.filter(prodOfferList, function(value) {
					                return value.prodOfferType != 1;
				                });
			        },
			        
			        /**
					 * 生成可选包销售品展示数据
					 */
			        createProdOfferRowData : function(subProdOfferInfo) {
				        var Me = this,
					        prodOfferStyle = "",
					        SYSDATE = dojo.global.$appContext$.requestParam.today,
					        productStartDateHtml = this.toProductStartDateView(subProdOfferInfo, {
						                key : 'key'
					                }),
					        productEndDateHtml = this.toProductEndDateView(subProdOfferInfo, {
						                key : 'key'
					                }),
					        prodOfferEndDateView = this.prodOfferEndDateView(subProdOfferInfo, {
						                key : 'key'
					                }),
					        prodOfferDetailFlag = this.IfShowProdOffer(subProdOfferInfo) ? '1' : '0',
					        productDateBuilder = this.getProductDateBuilder(subProdOfferInfo),
					        startDate = !!this.ifShowStartTime(subProdOfferInfo)
					                ? productDateBuilder.getBeginDate()
					                : '',
					        endDate = !!this.ifShowEndTime(subProdOfferInfo) ? productDateBuilder.getEndDate() : '',
					        delayEndDate = "";
//				        if (startDate != ''
//				                && builder.getDateFromString(startDate, false) > builder.getDateFromString(SYSDATE,
//				                        false)) {
//					        prodOfferStyle = "prod-offer-reserve";
//				        } else {
//					        prodOfferStyle = "prod-offer-add";
//				        }
					    prodOfferStyle = "prod-offer-add";
				        var detailNotNull = false;
				        detailNotNull = AttrUtil.checkIfNotNull(subProdOfferInfo.attrList);
				        if (!detailNotNull) {
					        detailNotNull = dojo.some(subProdOfferInfo.offerProdRelaList, function(prodRela) {
						        if (prodRela.productInfoVO.prodFuncType == ConstantsPool.load("ProductFuncTypeConst").ProductFuncTypeConst.ACCESS) { return false; }
						        return AttrUtil.checkIfNotNull(prodRela.productInfoVO.attrList);
					        });
					        if(!detailNotNull){
					        	detailNotNull = AttrUtil.checkIfFavour(subProdOfferInfo);
					        }
				        }
				        return {
					        showData : {
						        viewId : 'key' + "-" + subProdOfferInfo.parentProdOfferId
						                + subProdOfferInfo.prodOfferId,
						        prodOfferName : subProdOfferInfo.prodOfferName,
						        startDate : startDate,
						        endDate : endDate,
						        delayEndDate : delayEndDate,
						        orderStatus : "\u8ba2\u8d2d",
						        prodOfferDetailFlag : prodOfferDetailFlag,
						        detailNotNull : detailNotNull ? "" : "hidden-elem",
						        finishImg : !detailNotNull ? "" : "hidden-elem",
						        subProdOfferInfo : subProdOfferInfo,
						        checkedOption : checked = 'checked',
						        disabledOption : "",
						        disabledDelViewOption : "",
						        prodOfferStyle : prodOfferStyle,
						        dateStyle : {
							        "delayEndDateView" : "display:none"
						        },
						        productStartDateHtml : productStartDateHtml,
						        productEndDateHtml : productEndDateHtml,
						        prodOfferEndDateView : prodOfferEndDateView
					        },
					        subProdOfferInfo : subProdOfferInfo,
					        prodOfferInst : null
				        };
			        },
			        /**
					 * 变更生成保留的可选包购物车数据
					 */
			        createKeepProdOfferRowDataForChg : function(subProdOfferInst, uniqueId) {
				        var Me = this,
					        subProdOfferInfo = dojo.filter(dojo.global.$appContext$.get("userHasProdOfferMetaInfoList"
					                        + uniqueId || ""), function(prodOfferInfoVO) {
						                return prodOfferInfoVO.prodOfferId == subProdOfferInst.prodOfferId;
					                })[0],
					        productStartDateHtml = this.toProductStartDateView(subProdOfferInfo, {
						                key : 'key'
					                }),
					        productEndDateHtml = this.toProductEndDateView(subProdOfferInfo, {
						                key : 'key'
					                }),
					        prodOfferEndDateView = this.prodOfferEndDateView(subProdOfferInfo, {
						                key : 'key'
					                }),
					        prodOfferDetailFlag = this.IfShowProdOffer(subProdOfferInfo) ? '1' : '0',
					        startDate = builder.getStringTimeFromDate(builder
					                .getDateFromString(subProdOfferInst.effDate)),
					        endDate = builder
					                .getStringTimeFromDate(builder.getDateFromString(subProdOfferInst.expDate)),
					        delayEndDate = !!this.ifShowDelayEndTime(subProdOfferInfo) ? this
					                .getOfferDelayEndDateBuilder(subProdOfferInfo).getEndDate() : '';
				        var detailNotNull = false;
				        //变更信息，存在实例，肯定已填写过详情
				        /*detailNotNull = AttrUtil.checkIfNotNull(subProdOfferInfo.attrList);
				        if (!detailNotNull) {
					        detailNotNull = dojo.some(subProdOfferInfo.offerProdRelaList, function(prodRela) {
						        if (prodRela.productInfoVO.prodFuncType == ConstantsPool.load("ProductFuncTypeConst").ProductFuncTypeConst.ACCESS) { return false; }
						        return AttrUtil.checkIfNotNull(prodRela.productInfoVO.attrList);
					        });
					        if(!detailNotNull){
					        	detailNotNull = AttrUtil.checkIfFavour(subProdOfferInfo);
					        }
				        }*/
				        var prodOfferStyle = "prod-offer-change";
				        if(this.getIfReserveSubProdOffer(subProdOfferInst)){
				        	prodOfferStyle = "prod-offer-reserve";
				        }
				        return {
					        showData : {
						        viewId : 'key' + "-" + subProdOfferInfo.parentProdOfferId
						                + subProdOfferInfo.prodOfferId,
						        prodOfferName : subProdOfferInfo.prodOfferName,
						        startDate : startDate,
						        endDate : endDate,
						        delayEndDate : delayEndDate,
						        orderStatus : "用户已有",
						        prodOfferDetailFlag : prodOfferDetailFlag,
						        detailNotNull : "hidden-elem",
						        finishImg : "",
						        subProdOfferInfo : subProdOfferInfo,
						        checkedOption : checked = 'checked',
						        disabledOption : "",
						        disabledDelViewOption : "disabled='disabled'",
						        dateStyle : {
							        "startDateView" : "display:none",
							        "endDateView" : "display:none",
							        "delayEndDateView" : "display:none"
						        },
						        prodOfferStyle : prodOfferStyle,
						        productStartDateHtml : productStartDateHtml,
						        productEndDateHtml : productEndDateHtml,
						        prodOfferEndDateView : prodOfferEndDateView
					        },
					        subProdOfferInfo : subProdOfferInfo,
					        prodOfferInst : subProdOfferInst
				        };
			        },
			        /**
					 * 变更生成取消的可选包购物车数据
					 */
			        createCancelProdOfferRowDataForChg : function(subProdOfferInst, uniqueId) {
				        var Me = this,
					        subProdOfferInfo = dojo.filter(dojo.global.$appContext$.get("userHasProdOfferMetaInfoList"
					                        + uniqueId || ""), function(prodOfferInfoVO) {
						                return prodOfferInfoVO.prodOfferId == subProdOfferInst.prodOfferId;
					                })[0],
					        productStartDateHtml = this.toProductStartDateView(subProdOfferInfo, {
						                key : 'key'
					                }),
					        productEndDateHtml = this.toProductEndDateView(subProdOfferInfo, {
						                key : 'key'
					                }),
					        prodOfferEndDateView = this.prodOfferEndDateView(subProdOfferInfo, {
						                key : 'key'
					                }),
					        prodOfferDetailFlag = this.IfShowProdOffer(subProdOfferInfo) ? '1' : '0',
					        startDate = builder.getStringTimeFromDate(builder
					                .getDateFromString(subProdOfferInst.effDate)),
					        endDate = "",
					        delayEndDate = !!this.ifShowDelayEndTime(subProdOfferInfo) ? this
					                .getOfferDelayEndDateBuilder(subProdOfferInfo).getEndDate() : '';
				        var detailNotNull = false;
				        //退订信息，存在实例，肯定已填写过详情
				       /* detailNotNull = AttrUtil.checkIfNotNull(subProdOfferInfo.attrList);
				        if (!detailNotNull) {
					        detailNotNull = dojo.some(subProdOfferInfo.offerProdRelaList, function(prodRela) {
						        if (prodRela.productInfoVO.prodFuncType == ConstantsPool.load("ProductFuncTypeConst").ProductFuncTypeConst.ACCESS) { return false; }
						        return AttrUtil.checkIfNotNull(prodRela.productInfoVO.attrList);
					        });
					        if(!detailNotNull){
					        	detailNotNull = AttrUtil.checkIfFavour(subProdOfferInfo);
					        }
				        }*/
				        return {
					        showData : {
						        viewId : 'key' + "-" + subProdOfferInfo.parentProdOfferId
						                + subProdOfferInfo.prodOfferId,
						        prodOfferName : subProdOfferInfo.prodOfferName,
						        startDate : startDate,
						        endDate : endDate,
						        delayEndDate : delayEndDate,
						        orderStatus : "已退订",
						        prodOfferDetailFlag : prodOfferDetailFlag,
						        detailNotNull : "hidden-elem",
						        finishImg : "",
						        subProdOfferInfo : subProdOfferInfo,
						        checkedOption : "",
						        disabledOption : "disabled='disabled'",
						        disabledDelViewOption : "disabled='disabled'",
						        dateStyle : {
							        "startDateView" : "display:none",
							        "endDateView" : "display:none",
							        "delayEndDateView" : ""
						        },
						        prodOfferStyle : "prod-offer-del",
						        productStartDateHtml : productStartDateHtml,
						        productEndDateHtml : productEndDateHtml,
						        prodOfferEndDateView : prodOfferEndDateView
					        },
					        subProdOfferInfo : subProdOfferInfo,
					        prodOfferInst : subProdOfferInst
				        };
			        },
			        
			        /**
					 * 根据订单项信息还原可选包区域的视图
					 */
			        createProdOfferRowDataByOrderItem : function(offerItemData, prodItemList) {
				        var Me = this;
				        var subProdOfferInfo = null;
				        var subProdOfferInfoList = dojo.filter(dojo.global.$appContext$.prodOfferList, function(
				                        prodOfferInfoVO) {
					                return prodOfferInfoVO.prodOfferId == offerItemData.prodOfferId;
				                });
				        if (subProdOfferInfoList.length > 0) {
					        subProdOfferInfo = subProdOfferInfoList[0];
				        } else {
					        subProdOfferInfo = this.getProdOfferDetail(offerItemData.prodOfferId);
				        }
				        var productStartDateHtml = this.toProductStartDateView(subProdOfferInfo, {
					                key : 'key'
				                }),
					        productEndDateHtml = this.toProductEndDateView(subProdOfferInfo, {
						                key : 'key'
					                }),
					        prodOfferDetailFlag = this.IfShowProdOffer(subProdOfferInfo) ? '1' : '0',
					        startDate = builder.getStringTimeFromDate(builder.getDateFromString(offerItemData.effDate)),
					        endDate = builder.getStringTimeFromDate(builder.getDateFromString(offerItemData.expDate));
				        var detailNotNull = false;
				        detailNotNull = AttrUtil.checkIfNotNull(subProdOfferInfo.attrList);
				        if (!detailNotNull) {
					        detailNotNull = dojo.some(subProdOfferInfo.offerProdRelaList, function(prodRela) {
						        if (prodRela.productInfoVO.prodFuncType == ConstantsPool.load("ProductFuncTypeConst").ProductFuncTypeConst.ACCESS) { return false; }
						        return AttrUtil.checkIfNotNull(prodRela.productInfoVO.attrList);
					        });
					        if(!detailNotNull){
					        	detailNotNull = AttrUtil.checkIfFavour(subProdOfferInfo);
					        }
				        }
				        return {
					        showData : {
						        viewId : 'key' + "-" + subProdOfferInfo.parentProdOfferId
						                + subProdOfferInfo.prodOfferId,
						        prodOfferName : subProdOfferInfo.prodOfferName,
						        startDate : startDate,
						        endDate : endDate,
						        orderStatus : "订购",
						        prodOfferDetailFlag : prodOfferDetailFlag,
						        detailNotNull : detailNotNull ? "" : "hidden-elem",
						        finishImg : !detailNotNull ? "" : "hidden-elem",
						        subProdOfferInfo : subProdOfferInfo,
						        checkedOption : checked = 'checked',
						        disabledOption : "",
						        dateStyle : {
							        "startDateView" : "display:none",
							        "endDateView" : "display:none"
						        },
						        prodOfferStyle : "prod-offer-add",
						        productStartDateHtml : productStartDateHtml,
						        productEndDateHtml : productEndDateHtml
					        },
					        subProdOfferInfo : subProdOfferInfo,
					        prodOfferInst : null,
					        offerItemData : offerItemData,
					        prodItemList : prodItemList
				        };
			        },
			        /**
					 * 获取关联的产品id集合
					 */
			        getRelaAccessProductIdList : function(prodOfferInfoVO, selectedProductIdList) {
				        var Me = this;
				        var offerProdRelaList = null;
				        // Me.prodOfferInfoVO.roleInfoList---销售品下有角色的产品集合
				        
				        // Me.getProductList(true)---获取当前销售品下的产品集合
				        // Me.selectedProductIdList---销售品下产品默认选中的产品id集合
				        if (dojo.some(prodOfferInfoVO.offerProdRelaList, function(offerProdRelaVO) {
					                return !!offerProdRelaVO.roleInfoVO;
				                })) {
					        offerProdRelaList = BusCard.findAll(Me.getProductList(true), function(rela) {
						                return BusCard.exist(selectedProductIdList, function(selectedProdId) {
							                        return selectedProdId == rela.productId;
						                        });
					                });
				        } else {
					        // 无角色信息时，找产品关联的
					        offerProdRelaList = BusCard.findAll(prodOfferInfoVO.offerProdRelaList || [], function(
					                        offerProdRela) {
						                return offerProdRela.relaType == PRODOFFERTYPE.REL_TYPE;
					                });
					        
				        }
				        // 获取主销售品集合中的产品集合
				        var productList = this.getProductListFromMainProdOfferList(this
				                .getMainProdOffer(dojo.global.$appContext$.get("prodOfferList")));
				        var relaResultList = BusCard.findAll(productList, function(productInfo) {
					                
					                // 如果不是接入类 不处理
					                if (!Me.checkIsMainMemberProd(productInfo)) { return; }
					                // //如果产品没有选中,并且
					                // var quitLink =
					                // $("prodCancel-"+accessProductViewItem.viewId);
					                // //如果退网 不处理
					                // if(quitLink.checked){
					                // return ;
					                // }else{
					                // //如果产品没有选择并且接入非变更 不处理
					                // if(!accessProductViewItem.isChecked()&&!(accessProductViewItem
					                // instanceof
					                // ProductChangeViewItem)){
					                // return;
					                // }
					                // }
					                // if((!accessProductViewItem.isChecked())&&
					                // !(accessProductViewItem
					                // instanceof
					                // ProductChangeViewItem)&&
					                // !$("prodCancel-"+accessProductViewItem.viewId).checked)
					                // return;
					                // var accessProductInfoVO =
					                // accessProductViewItem.getProductInfoVO();
					                var prodRelaList = productInfo.prodRelaList || [];
					                // 判断接入类和当前销售品下产品是否有关联关系,
					                return BusCard.exist(prodRelaList, function(prodRelaVO) {
						                        return (PRODOFFERTYPE.REL_TYPE == prodRelaVO.relaType)
						                                && (BusCard.exist(offerProdRelaList, function(offerProdRelaVO) {
							                                        // 只要可选包下有产品在关联中
							                                        return offerProdRelaVO.productId == prodRelaVO.prodB
							                                                || offerProdRelaVO.productId == prodRelaVO.prodA;
							                                        
						                                        }));
					                        })
					                        ||
					                        // 判断是否存在依赖关系
					                        BusCard.exist(offerProdRelaList || [], function(offerProdRela) {
						                                var subProductInfoVO = offerProdRela.productInfoVO;
						                                var prodRelaList = subProductInfoVO.prodRelaList || [];
						                                return BusCard.exist(prodRelaList, function(prodRela) {
							                                        return (prodRela.relaType == PRODOFFERTYPE.DEPEND_TYPE)
							                                                && (prodRela.prodB == productInfo.productId);
						                                        });
					                                });
					                
				                });
				        return dojo.map(relaResultList, function(productInfo) {
					                return productInfo.productId;
				                });
			        },
			        /**
					 * 检测是否是接入类产品
					 */
			        checkIsMainMemberProd : function(productInfo) {
				        if (productInfo.productInfoVO) {
					        if (productInfo.productInfoVO.prodFuncType == orderaccept.prodofferaccept.util.ProductFuncTypeConst.ACCESS
					                || productInfo.productInfoVO.prodBundleType != orderaccept.prodofferaccept.util.ProductTypeConst.ATOM) { return true; }
				        } else {
					        // 数据转换后prodBundleType 变成prodType了
					        // 这里取不为空的即可
					        var prodType = productInfo.prodBundleType || productInfo.prodType;
					        if (productInfo.prodFuncType == orderaccept.prodofferaccept.util.ProductFuncTypeConst.ACCESS
					                || prodType != orderaccept.prodofferaccept.util.ProductTypeConst.ATOM) { return true; }
				        }
				        return false;
			        },
			        /**
					 * 获取主销售品集合下的产品集合
					 */
			        getProductListFromMainProdOfferList : function(mainProdOfferList) {
				        var Me = this;
				        var productList = [];
				        dojo.forEach(mainProdOfferList || [], function(mainProdOfferInfo) {
					                Array.prototype.push
					                        .apply(productList, Me.getProductList(false, mainProdOfferInfo));
				                });
				        return productList;
			        },
			        /**
					 * 从销售品集合中中找寻产品信息
					 * 
					 * @param {Object|Array} prodOfferList
					 */
			        getProductById : function(prodOfferList, productId) {
				        var list = prodOfferList,
					        result = null;
				        if (!dojo.isArrayLike(prodOfferList)) {
					        list = [prodOfferList];
				        }
				        
				        BusCard.each(list, function(prodOfferInfoVO) {
					                var offerProdRelaList = prodOfferInfoVO.offerProdRelaList || [];
					                BusCard.each(offerProdRelaList, function(offerProdRela) {
						                        if (offerProdRela.productId == productId) {
							                        result = offerProdRela.productInfoVO;
							                        return false;
						                        }
					                        });
					                if (result) { return false; }
				                });
				        return result;
				        
			        },
			        /**
					 * 展示信息是否显示的判定方法
					 */
			        IfShowProdOffer : function(prodOfferInfoVO) {
				        return this.ifHasOfferAttr(prodOfferInfoVO) || this.ifHasProdRoleAndAttr(prodOfferInfoVO)
				                || this.ifHasRelaNum(prodOfferInfoVO) || this.ifHasAssureInfo(prodOfferInfoVO);
			        },
			        ifHasAssureInfo : function(prodOfferInfoVO) {
				        if (prodOfferInfoVO.prodOfferAssureDemandVO
				                && prodOfferInfoVO.prodOfferAssureDemandVO.length > 0) { return true; }
				        return false;
			        },
			        // 是否有销售品属性
			        ifHasOfferAttr : function(prodOfferInfoVO) {
				        if (prodOfferInfoVO.attrList && prodOfferInfoVO.attrList.length > 0) {
					        for (var p in prodOfferInfoVO.attrList) {
						        var attrInfo = prodOfferInfoVO.attrList[p];
						        if (attrInfo && attrInfo.ifDisplay && attrInfo.ifDisplay == '1') { return true; }
					        }
					        // return true;
				        }
				        return false;
			        },
			        // 是否含有产品角色和产品属性
			        ifHasProdRoleAndAttr : function(prodOfferInfoVO) {
				        if (prodOfferInfoVO.offerProdRelaList && prodOfferInfoVO.offerProdRelaList.length == 1) {// 单产品
					        var productInfo = prodOfferInfoVO.offerProdRelaList[0];
					        if (productInfo.productInfoVO) {
						        if (productInfo.productInfoVO.prodFuncType == '101') return false;
						        
						        if (productInfo.productInfoVO.attrList && productInfo.productInfoVO.attrList.length > 0) {
							        var attrList = productInfo.productInfoVO.attrList;
							        for (var p in attrList) {
								        var attrInfo = attrList[p];
								        if (attrInfo && attrInfo.ifDisplay && attrInfo.ifDisplay == '1') { return true; }
							        }
						        }
					        }
				        } else if (prodOfferInfoVO.offerProdRelaList && prodOfferInfoVO.offerProdRelaList.length > 1
				                && prodOfferInfoVO.offerProdRelaList[0].productInfoVO.prodFuncType != 101) {// 多产品需要显示
					        return true;
				        }
				        return false;
				        
			        },
			        // 是否含有亲情信息
			        ifHasRelaNum : function(prodOfferInfoVO) {
				        if (prodOfferInfoVO.usageTypeList && prodOfferInfoVO.usageTypeList.length > 0) {// 亲情属性的判断
					        var usageTypeList = prodOfferInfoVO.usageTypeList;
					        for (var i = 0, len = usageTypeList.length; i < len; i++) {
						        // 自惠，互惠，OCS亲情
						        if (usageTypeList[i] == "1" || usageTypeList[i] == "2" || usageTypeList[i] == "126") { return true; }
					        }
				        }
				        return false;
			        },
			        // 是否含有营销资源信息
			        ifHasResRela : function(prodOfferInfoVO) {
				        if (prodOfferInfoVO.resRelaList && prodOfferInfoVO.resRelaList.length > 0) {// 营销资源信息的判断
					        return true;
				        }
				        return false;
			        },
			        ifHasAgreement : function(prodOfferInfoVO) {
				        return !!(prodOfferInfoVO && prodOfferInfoVO.offerAgreementVO && prodOfferInfoVO.offerAgreementVO.length > 0);
			        },
			        /**
					 * 生成退订销售品的结束时间视图
					 */
			        prodOfferEndDateView : function(prodOfferInfoVO, config) {
				        // 页面控件id标识
				        // var viewId = config.key + "-" +
				        // prodOfferInfoVO.parentProdOfferId +
				        // prodOfferInfoVO.prodOfferId;
				        // var delayUnitViewInstance = "<select
				        // class='endDateDelayUnit-class'
				        // id='endDateDelayUnit-"
				        // + viewId + "' style='height:20px;'>";
				        // delayUnitViewInstance += "<option
				        // value='0'>立即生效</option>";
				        // delayUnitViewInstance += "<option value='1'
				        // selected='selected'>下月一号生效</option>";
				        // delayUnitViewInstance += "</select>";
				        // 页面控件id标识
				        var viewId = config.key + "-" + prodOfferInfoVO.parentProdOfferId + prodOfferInfoVO.prodOfferId;
				        var hiddenStyleOption = '';
				        // delayUnit 延迟生效单位 0立即 1年 2帐期 3月 4天 5小时
				        var delayUnitValue = prodOfferInfoVO.delayUnorderUnit ? prodOfferInfoVO.delayUnorderUnit : '0';
				        if (prodOfferInfoVO.permitUnorderTime == 0) {
					        hiddenStyleOption = " hiddenStyle";
				        }
				        var unit = prodOfferInfoVO.delayUnorderUnit;
				        var time = prodOfferInfoVO.delayUnorderTime;
				        var delayUnitViewInstance = "<select class='endDateDelayUnit-class' id='endDateDelayUnit-"
				                + viewId + "' style='height:20px;'>";
				        // permitInstantly 允许输入生效时间 ：0不允许，1允许
				        if (0 == delayUnitValue || prodOfferInfoVO.permitUnorderTime == 1) {
					        delayUnitViewInstance += "<option value='0' selected='selected'>立即生效</option>";
				        }
				        if (1 == delayUnitValue) {
					        delayUnitViewInstance += "<option value='1'>" + time + "年后生效</option>";
				        }
				        if (2 == delayUnitValue) {
					        delayUnitViewInstance += "<option value='2'>" + time + "账期后生效</option>";
				        }
				        if (3 == delayUnitValue) {
					        delayUnitViewInstance += "<option value='3'>" + time + "月后生效</option>";
				        }
				        if (4 == delayUnitValue) {
					        delayUnitViewInstance += "<option value='4'>" + time + "天后生效</option>";
				        }
				        if (5 == delayUnitValue) {
					        delayUnitViewInstance += "<option value='5'>" + time + "小时后生效</option>";
				        }
				        delayUnitViewInstance += "</select>";
				        
				        var tpContext = {
					        data : {
						        "prodOfferInfoVO" : prodOfferInfoVO,
						        "delayUnitViewInstance" : delayUnitViewInstance,
						        "time" : time
					        },
					        style : {
						        "hiddenStyleOption" : hiddenStyleOption
					        },
					        viewId : viewId
				        };
				        return tpContext;
			        },
			        toProductStartDateView : function(prodOfferInfoVO, config) {
				        // 页面控件id标识
				        var viewId = config.key + "-" + prodOfferInfoVO.parentProdOfferId + prodOfferInfoVO.prodOfferId;
				        var hiddenStyleOption = '';
				        // delayUnit 延迟生效单位 0立即 1年 2帐期 3月 4天 5小时
				        var delayUnitValue = prodOfferInfoVO.delayUnit ? prodOfferInfoVO.delayUnit : '0';
				        // delayTime 延迟生效时长
				        // var timeSelectable =
				        // (prodOfferInfoVO.delayTime == 0 || 0 ==
				        // delayUnitValue);
				        // if (timeSelectable) hiddenStyleOption = "
				        // hiddenStyle";
				        if (prodOfferInfoVO.permitInstantly == 0) {
					        hiddenStyleOption = " hiddenStyle";
				        }
				        var unit = prodOfferInfoVO.delayUnit;
				        var time = prodOfferInfoVO.delayTime;
				        var delayUnitViewInstance = "<select class='delayUnit-class' id='delayUnit-" + viewId
				                + "' style='height:20px;'>";
				        // permitInstantly 允许输入生效时间 ：0不允许，1允许
				        if (0 == delayUnitValue || prodOfferInfoVO.permitInstantly == 1) {
					        delayUnitViewInstance += "<option value='0' selected='selected'>立即生效</option>";
				        }
				        if (1 == delayUnitValue) {
					        delayUnitViewInstance += "<option value='1'>" + time + "年后生效</option>";
				        }
				        if (2 == delayUnitValue) {
					        delayUnitViewInstance += "<option value='2'>" + time + "账期后生效</option>";
				        }
				        if (3 == delayUnitValue) {
					        delayUnitViewInstance += "<option value='3'>" + time + "月后生效</option>";
				        }
				        if (4 == delayUnitValue) {
					        delayUnitViewInstance += "<option value='4'>" + time + "天后生效</option>";
				        }
				        if (5 == delayUnitValue) {
					        delayUnitViewInstance += "<option value='5'>" + time + "小时后生效</option>";
				        }
				        delayUnitViewInstance += "</select>";
				        
				        var tpContext = {
					        data : {
						        "prodOfferInfoVO" : prodOfferInfoVO,
						        "delayUnitViewInstance" : delayUnitViewInstance,
						        "time" : time
					        },
					        style : {
						        "hiddenStyleOption" : hiddenStyleOption
					        },
					        viewId : viewId
				        };
				        return tpContext;
				        
			        },
			        toProductEndDateView : function(prodOfferInfoVO, config) {
				        var viewId = config.key + "-" + prodOfferInfoVO.parentProdOfferId + prodOfferInfoVO.prodOfferId;
				        var validPeriodOption = "";
				        var validTypeOption = "";
				        var hiddenStyleOption = " hiddenStyle";
				        var cycleStyleOption = " hiddenStyle";
				        
				        var ifCycleOffer = prodOfferInfoVO.ifCycleOffer;
				        var cycleEffectList = prodOfferInfoVO.cycleEffectList;
				        var prodOfferTaste = prodOfferInfoVO.prodOfferTaste;
				        // 判断是否是包周期销售品
				        var cycleOption = "";
				        if(!!prodOfferTaste){			        	
					        hiddenStyleOption = "";
					        cycleStyleOption = " hiddenStyle";
					        // effectType --- 有效期类型
					        var effectType = prodOfferTaste.effectType ? prodOfferTaste.effectType : 0;
					        // maxEffect 最长有效期
					        if (prodOfferTaste.maxEffectNmr == 0) {
						        hiddenStyleOption = " hiddenStyle";
						        cycleStyleOption = " hiddenStyle";
						        validPeriodOption = "<option value='" + prodOfferTaste.maxEffectNmr
						                + "' selected='selected' >";
						        validPeriodOption += prodOfferTaste.maxEffectNmr;
						        validPeriodOption += "</option>";
					        } else {
						        // defaultTimePeriod
						        // 销售品默认有效期，单位为月，表示客户申请该销售品后的默认生效的时间跨度，如一年、半年、2年等
						        var defaultTimePeriod = prodOfferTaste.defaultEffectNmr;
						        defaultTimePeriod = (defaultTimePeriod ? defaultTimePeriod : 0);
						        // minEffect 最短有效期 maxEffect 最长有效期
						        var minEffectMonths = prodOfferTaste.minEffectNmr;
						        var maxEffectMonths = prodOfferTaste.maxEffectNmr;
						        for (var mIndex = minEffectMonths, len = maxEffectMonths; mIndex <= len; mIndex++) {
							        validPeriodOption += "<option value='" + mIndex + "'";
							        if (mIndex == defaultTimePeriod) {
								        validPeriodOption += " selected='selected'";
							        }
							        validPeriodOption += ">";
							        validPeriodOption += mIndex;
							        validPeriodOption += "</option>";
						        }
					        }
					        switch (effectType / 1) {
						        case 4 :
							        validTypeOption += "<option value='4' selected='selected'>";
							        validTypeOption += "月</option>";
							        break;
						        case 6 :
							        validTypeOption += "<option value='6' selected='selected'>";
							        validTypeOption += "天</option>";
							        break;
						        case 1 :
							        validTypeOption += "<option value='1' selected='selected'>";
							        validTypeOption += "年</option>";
							        break;
						        case 3 :
							        validTypeOption += "<option value='3' selected='selected'>";
							        validTypeOption += "账期</option>";
							        break;
						        default :
							        validTypeOption += "<option value='4' selected='selected'>";
							        validTypeOption += "月</option>";
							        break;
					        }
				        
				        }else if (ifCycleOffer == 1 && cycleEffectList.length > 0) {
					        hiddenStyleOption = " hiddenStyle";
					        cycleStyleOption = "";
					        dojo.forEach(cycleEffectList, function(offerCycleEffect) {
						                var effectType = offerCycleEffect.effectType;
						                var effectValue = offerCycleEffect.effectValue;
						                var isDefaultValue = offerCycleEffect.isDefaultValue;
						                switch (effectType / 1) {
							                case 4 :
								                cycleOption += "<option value='" + effectValue + "~4' ";
								                if (effectValue == isDefaultValue) {
									                cycleOption += " selected='selected'";
								                }
								                cycleOption += " >"
								                cycleOption += effectValue + "月</option>";
								                break;
							                case 6 :
								                cycleOption += "<option value='" + effectValue + "~6' ";
								                if (effectValue == isDefaultValue) {
									                cycleOption += " selected='selected'";
								                }
								                cycleOption += " >"
								                cycleOption += effectValue + "天</option>";
								                break;
							                case 1 :
								                cycleOption += "<option value='" + effectValue + "~1' ";
								                if (effectValue == isDefaultValue) {
									                cycleOption += " selected='selected'";
								                }
								                cycleOption += " >"
								                cycleOption += effectValue + "年</option>";
								                break;
							                case 3 :
								                cycleOption += "<option value='" + effectValue + "~3' ";
								                if (effectValue == isDefaultValue) {
									                cycleOption += " selected='selected'";
								                }
								                cycleOption += " >"
								                cycleOption += effectValue + "账期</option>";
								                break;
							                case 7 :
								                cycleOption += "<option value='" + effectValue + "~7' ";
								                if (effectValue == isDefaultValue) {
									                cycleOption += " selected='selected'";
								                }
								                cycleOption += " >"
								                cycleOption += effectValue + "小时</option>";
								                break;
							                case 0 :
								                cycleOption += "<option value='" + effectValue + "~0' ";
								                if (effectValue == isDefaultValue) {
									                cycleOption += " selected='selected'";
								                }
								                cycleOption += " >"
								                cycleOption += "长期</option>";
								                break;
							                default :
								                cycleOption += "<option value='" + effectValue + "~4' ";
								                if (effectValue == isDefaultValue) {
									                cycleOption += " selected='selected'";
								                }
								                cycleOption += " >"
								                cycleOption += effectValue + "月</option>";
								                break;
						                }
					                });
				        } else {
					        hiddenStyleOption = "";
					        cycleStyleOption = " hiddenStyle";
					        // effectType --- 有效期类型
					        var effectType = prodOfferInfoVO.effectType ? prodOfferInfoVO.effectType : 0;
					        // maxEffect 最长有效期
					        if (prodOfferInfoVO.maxEffect == 0) {
						        hiddenStyleOption = " hiddenStyle";
						        cycleStyleOption = " hiddenStyle";
						        validPeriodOption = "<option value='" + prodOfferInfoVO.maxEffect
						                + "' selected='selected' >";
						        validPeriodOption += prodOfferInfoVO.maxEffect;
						        validPeriodOption += "</option>";
					        } else {
						        // defaultTimePeriod
						        // 销售品默认有效期，单位为月，表示客户申请该销售品后的默认生效的时间跨度，如一年、半年、2年等
						        var defaultTimePeriod = prodOfferInfoVO.defaultTimePeriod;
						        defaultTimePeriod = (defaultTimePeriod ? defaultTimePeriod : 0);
						        // minEffect 最短有效期 maxEffect 最长有效期
						        var minEffectMonths = prodOfferInfoVO.minEffect;
						        var maxEffectMonths = prodOfferInfoVO.maxEffect;
						        for (var mIndex = minEffectMonths, len = maxEffectMonths; mIndex <= len; mIndex++) {
							        validPeriodOption += "<option value='" + mIndex + "'";
							        if (mIndex == defaultTimePeriod) {
								        validPeriodOption += " selected='selected'";
							        }
							        validPeriodOption += ">";
							        validPeriodOption += mIndex;
							        validPeriodOption += "</option>";
						        }
					        }
					        switch (effectType / 1) {
						        case 4 :
							        validTypeOption += "<option value='4' selected='selected'>";
							        validTypeOption += "月</option>";
							        break;
						        case 6 :
							        validTypeOption += "<option value='6' selected='selected'>";
							        validTypeOption += "天</option>";
							        break;
						        case 1 :
							        validTypeOption += "<option value='1' selected='selected'>";
							        validTypeOption += "年</option>";
							        break;
						        case 3 :
							        validTypeOption += "<option value='3' selected='selected'>";
							        validTypeOption += "账期</option>";
							        break;
						        default :
							        validTypeOption += "<option value='4' selected='selected'>";
							        validTypeOption += "月</option>";
							        break;
					        }
				        }
				        var data = {
					        validTypeOption : validTypeOption,
					        validPeriodOption : validPeriodOption,
					        hiddenStyleOption : hiddenStyleOption,
					        cycleOption : cycleOption
				        };
				        var tpContext = {
					        data : data,
					        style : {
						        "hiddenStyleOption" : hiddenStyleOption,
						        "cycleStyleOption" : cycleStyleOption
					        },
					        viewId : viewId
				        };
				        return tpContext;
			        },
			        ifShowStartTime : function(prodOfferInfoVO) {
				        // var delayUnitValue =
				        // prodOfferInfoVO.delayUnit
				        // ? prodOfferInfoVO.delayUnit
				        // : '0';
				        // var timeSelectable =
				        // (prodOfferInfoVO.delayTime == 0 || 0 ==
				        // delayUnitValue);
				        // if (timeSelectable) { return true; }
				        // return false;
				        // 现在程序需要根据permitInstantly来决定是否允许输入开始时间和结束时间 0
				        // 不允许 1允许
				        if (prodOfferInfoVO.permitInstantly == 1) { return false; }
				        return true;
			        },
			        /**
					 * 判断是否需要展示结束时间
					 */
			        ifShowEndTime : function(prodOfferInfoVO) {
				        if (prodOfferInfoVO.maxEffect == 0
				                && (prodOfferInfoVO.ifCycleOffer == 0 || prodOfferInfoVO.cycleEffectList.length == 0)) { return true; }
				        return false;
			        },
			        /**
					 * 判断是否会生成可选择的时间控件
					 */
			        ifShowDelayEndTime : function(prodOfferInfoVO) {
				        if (prodOfferInfoVO.permitUnorderTime == 1) { return false; }
				        return true;
			        },
			        IfShowMainOfferDetail : function(prodOfferInfoVO) {
				        return this.ifHasOfferAttr(prodOfferInfoVO) || this.ifHasRelaNum(prodOfferInfoVO)
				                || this.ifHasResRela(prodOfferInfoVO) || this.ifHasAgreement(prodOfferInfoVO);
				        
			        },
			        /**
					 * 根据销售品id获取销售品的详细信息
					 */
			        getProdOfferDetail : function(id, config) {
				        var config = config || {},
					        interfaceType = config.interfaceType || 5,
					        belongCode = function() {
						        try {
							        return prodOfferAcceptLoader.getBelongCode()
						        }
						        catch (e) {}
					        }(),
					        vParameter = "&prodOfferId=" + id + "&interfaceType=" + interfaceType + "&belongCode="
					                + (belongCode || ""),
					        callback = function() {
						        return ServiceFactory.getService("url:orderDetailAction.do?method=getProdOfferDetail"
						                + vParameter);
						        
					        };
				        return $ac$.cache("prodOfferId-" + id, dojo.mixin({
					                        callback : callback
				                        }, config));
				        
			        },
			        /**
					 * 获取页面初始化时产品选择情况
					 * 
					 * @method
					 */
			        getInitSelectedProductIdList : function(prodOfferInfoVO, prodOfferInstObj) {
				        var Me = this;
				        var selectedProductIdList = [];
				        if (prodOfferInstObj) {
					        Array.prototype.push.apply(selectedProductIdList, BusCard.map(prodOfferInstObj.prodInstList
					                                || [], function(relaProdInfoVO) {
						                        return relaProdInfoVO.prodId;
					                        }));
					        return {
						        selectedProductIdList : selectedProductIdList,
						        productRelaInfoList : prodOfferInstObj.prodInstList || []
					        };
				        }
				        // 循环出销售品中有角色的产品集合和无角色的产品集合默认选中的产品
				        var productRelaInfoList = BusCard.findAll(Me.getProductList(true, prodOfferInfoVO), function(
				                        rela) {
					                return rela.ifDefault == 1;
				                });
				        // 将默认选中的产品id放置在Me.selectedProductIdList中
				        Array.prototype.push.apply(selectedProductIdList, BusCard.map(productRelaInfoList || [],
				                        function(rela) {
					                        return rela.productId;
				                        }));
				        return {
					        selectedProductIdList : selectedProductIdList,
					        productRelaInfoList : productRelaInfoList
				        };
			        },
			        /**
					 * 获取产品信息，包含有角色信息与无角色信息
					 * 
					 * @param
					 * ifWrapper：ture:返回封装后的产品对象，对象中包含成员对象；false:只返回产品成员对象
					 * @return productInfo
					 *         其中包含两个集合：无角色产品信息集合，有角色产品信息集合
					 */
			        getProductList : function(ifWrapper, prodOfferInfoVO) {
				        // 产品集合
				        var productList = [];
				        // 参数：是否返回封装的成员对象
				        if (ifWrapper) {
					        // 将无角色产品信息集合添加到产品集合productList当中，集合中存储的为封装后的成员对象
					        Array.prototype.push.apply(productList, BusCard.map(
					                        prodOfferInfoVO.offerProdRelaList || [], function(offerProdRela) {
						                        return offerProdRela;
					                        }));
					        return productList;
				        }
				        // 将无角色产品信息集合添加到产品集合productList当中，集合中存储的为产品成员对象
				        Array.prototype.push.apply(productList, BusCard.map(prodOfferInfoVO.offerProdRelaList || [],
				                        function(offerProdRela) {
					                        return offerProdRela.productInfoVO;
				                        }));
				        return productList;
			        },
			        /**
					 * 获取关联的销售品
					 */
			        getProdOfferRelaList : function(prodOfferInfoVO) {
				        var prodOfferRelaList = [];
				        if (prodOfferInfoVO.prodOfferRelaList != null && prodOfferInfoVO.prodOfferRelaList.length > 0) {
					        prodOfferRelaList = prodOfferInfoVO.prodOfferRelaList;
				        }
				        return prodOfferRelaList;
			        },
			        
			        /**
					 * 获取接入类产品id
					 */
			        getSelectProductIdList : function(domObj) {
				        var trs = dojo.query(".main-product-basic", domObj);
				        var prodBasicList = dojo.filter(trs, function(prodBasicTr) {
					                return dojo.query(".main-product-check", prodBasicTr)[0].checked;
				                });
				        var tempArray = dojo.map(prodBasicList, function(prodBasicTr) {
					                return dojo.attr(prodBasicTr, "productId")
					                        || dojo.query("SELECT", prodBasicTr)[0].value;
				                });
				        return tempArray || [];
			        },
			        
			        /**
					 * 获取促销政策详细信息
					 */
			        getSalesPromotionDetail : function(promotionId) {
				        var param = "&promotionId=" + promotionId;
				        var resultData = ServiceFactory
				                .getService("url:orderDetailAction.do?method=getSalesPromotionDetail" + param);
				        return resultData;
			        },
			        
			        /**
					 * 获取促销政策明细项对应的属性规格数据
					 */
			        getPromotionItemsAttr : function(promotionId) {
				        var param = "&promotionId=" + promotionId;
				        var resultData = ServiceFactory
				                .getService("url:orderDetailAction.do?method=getPromotionItemsAttr" + param);
				        return resultData;
			        },
			        
			        /**
					 * 创建促销政策展示信息
					 */
			        createSalesPromotionRowData : function(salesPromotionDetailInfo) {
				        var promotionStartDate = this.toProductStartDateView(salesPromotionDetailInfo.proodOfferInfo, {
					                key : 'key'
				                }),
					        promotionEndDate = this.toProductEndDateView(salesPromotionDetailInfo.proodOfferInfo, {
						                key : 'key'
					                }),
					        productDateBuilder = this.getProductDateBuilder(salesPromotionDetailInfo.proodOfferInfo),
					        startDate = !!this.ifShowStartTime(salesPromotionDetailInfo.proodOfferInfo)
					                ? productDateBuilder.getBeginDate()
					                : '',
					        endDate = !!this.ifShowEndTime(salesPromotionDetailInfo.proodOfferInfo)
					                ? productDateBuilder.getEndDate()
					                : '',
					        // statusObj =
					        // salesPromotionDetailInfo.promotionTargetObjectList[0].targetObjectType;
					        statusObj = this.getPromotionTargetType(salesPromotionDetailInfo.promotionTargetObjectList);
				        return {
					        showData : {
						        viewId : "key" + "-" + salesPromotionDetailInfo.proodOfferInfo.parentProdOfferId
						                + salesPromotionDetailInfo.proodOfferInfo.prodOfferId,
						        promotionName : salesPromotionDetailInfo.promotionName,
						        promotionInfo : salesPromotionDetailInfo,
						        startDate : startDate,
						        endDate : endDate,
						        promotionStartDate : promotionStartDate,
						        promotionEndDate : promotionEndDate,
						        disabledOption : "",
						        dateStyle : "",
						        checkedOption : checked = 'checked',
						        promotionStatus : '\u8ba2\u8d2d',
						        statusObj : statusObj ? 2 : 1,
						        promotionStyle : "promotion-new"
					        }
				        };
			        },
			        
			        /**
					 * 创建促销政策展示信息(老用户受理)
					 * 
					 * @param promotionInfo (规格数据)
					 * @param promotionInstInfo (实例数据)
					 */
			        createSalesPromotionRowDataForChg : function(salesPromotionDetailInfo, promotionInstInfo) {
				        var promotionStartDate = this.toProductStartDateView(salesPromotionDetailInfo.proodOfferInfo, {
					                key : 'key'
				                }),
					        promotionEndDate = this.toProductEndDateView(salesPromotionDetailInfo.proodOfferInfo, {
						                key : 'key'
					                }),
					        productDateBuilder = this.getProductDateBuilder(salesPromotionDetailInfo.proodOfferInfo),
					        startDate = !!this.ifShowStartTime(salesPromotionDetailInfo.proodOfferInfo)
					                ? productDateBuilder.getBeginDate()
					                : '',
					        endDate = !!this.ifShowEndTime(salesPromotionDetailInfo.proodOfferInfo)
					                ? productDateBuilder.getEndDate()
					                : '',
					        // statusObj =
					        // salesPromotionDetailInfo.promotionTargetObjectList[0].targetObjectType;
					        statusObj = this.getPromotionTargetType(salesPromotionDetailInfo.promotionTargetObjectList);
				        return {
					        showData : {
						        viewId : "key" + "-" + salesPromotionDetailInfo.proodOfferInfo.parentProdOfferId
						                + salesPromotionDetailInfo.proodOfferInfo.prodOfferId,
						        promotionName : salesPromotionDetailInfo.promotionName,
						        promotionInfo : salesPromotionDetailInfo,
						        startDate : promotionInstInfo.effDate ? promotionInstInfo.effDate : startDate,
						        endDate : promotionInstInfo.expDate ? promotionInstInfo.expDate : "",
						        promotionStartDate : promotionStartDate,
						        promotionEndDate : promotionEndDate,
						        disabledOption : "",
						        dateStyle : "",
						        checkedOption : checked = 'checked',
						        promotionStatus : "\u7528\u6237\u5df2\u6709",
						        statusObj : promotionInstInfo.targetObjectType
						                ? promotionInstInfo.targetObjectType
						                : (statusObj ? 2 : 1),
						        promotionStyle : "promotion-change",
						        promotionInstInfo : promotionInstInfo
					        }
				        };
			        },
			        
			        getPromotionTargetType : function(promotionTargetObjectList) {
				        return dojo.some(promotionTargetObjectList || [], function(promotionTargetObj) {
					                return promotionTargetObj.targetObjectType == 2;
				                });
			        },
			        
			        /**
					 * 根据产品id获取产品信息
					 */
			        getProductInfoByProdId : function(prodOfferInfoVO, productId) {
				        // 从无角色的产品信息集合中查找
				        if (prodOfferInfoVO.offerProdRelaList && prodOfferInfoVO.offerProdRelaList.length > 0) {
					        for (var i = 0, len = prodOfferInfoVO.offerProdRelaList.length; i < len; i++) {
						        var productInfo = prodOfferInfoVO.offerProdRelaList[i];
						        if (productInfo.productId == productId) { return productInfo; }
					        }
				        }
				        return null;
			        },
			        /**
					 * 获取可选包的升速数据对象
					 */
			        getRaiseSpeedObj : function(prodOfferInfoVO) {
				        for (var p = 0; p < prodOfferInfoVO.attrList.length; p++) {
					        var attrVO = prodOfferInfoVO.attrList[p];
					        var attrRelaList = BusCard.jsonPath(attrVO.attrRelaList || [], "$[?(@.attrRelaType==7)]");
					        if (attrRelaList.length > 0) {
						        // 经与产品组协商，该升速属性的类型是枚举类型，同时只配置一个
						        // 1.获取属性默认值
						        var attrValueList = attrVO.attrValueList;
						        if (attrValueList.length > 0) {
							        var attrValue = attrValueList[0].attrValue;
						        }
						        // 2.获取影响的属性值
						        var relatedAttrCD = attrRelaList[0].relatedAttrCD;
						        return {
							        attrValue : attrValue,
							        relatedAttrCD : relatedAttrCD
						        };
					        }
				        }
				        return null;
			        },
			        
			        /**
					 * 获取促销政策升速数据对象
					 * 
					 * @param salesPromotionInfoVO
					 */
			        getPromotionRaiseSpeedObj : function(salesPromotionInfoVO) {
				        var promotionItemList = salesPromotionInfoVO.salesPromotionItemList;
				        for (var i = 0; i < promotionItemList.length; i++) {
					        var attrVO = promotionItemList[i].attrSpec;
					        var attrRelaList = BusCard.jsonPath(attrVO.attrRelaList || [], "$[?(@.attrRelaType==7)]");
					        if (attrRelaList.length > 0) {
						        var attrValue = "";
						        var attrValueList = attrVO.attrValueList;
						        if (promotionItemList[i].attrValue) {
							        attrValue = promotionItemList[i].attrValue;
						        } else if (attrValueList && attrValueList.length > 0) {
							        // 经与产品组协商，该升速属性的类型是枚举类型，同时只配置一个
							        // 1.获取属性默认值
							        attrValue = attrValueList[0].attrValue;
						        }
						        // 2.获取影响的属性值
						        var relatedAttrCD = attrRelaList[0].relatedAttrCD;
						        return {
							        attrValue : attrValue,
							        relatedAttrCD : relatedAttrCD
						        };
					        }
				        }
				        return null;
			        },
			        
			        /**
					 * 根据产品获得销售品对象及产品对象
					 */
			        getRelaProdOfferObj : function(relaProdId, subProdOfferGridData) {
				        var relaProdOfferList = new Array();
				        BusCard.each(subProdOfferGridData, function(data) {
					        var offerProdRelaList = [];
					        if (data.subProdOfferInfo && data.subProdOfferInfo.offerProdRelaList
					                && data.subProdOfferInfo.offerProdRelaList.length > 0) {
						        offerProdRelaList = data.subProdOfferInfo.offerProdRelaList;
					        } else {
						        return;
					        }
					        BusCard.each(offerProdRelaList, function(offerProdRelaVO) {
						        if (offerProdRelaVO.productInfoVO
						                && offerProdRelaVO.productInfoVO.prodFuncType != orderaccept.prodofferaccept.util.PRODUCTTYPE.ACCESS_PROD_TYPE
						                && offerProdRelaVO.productInfoVO.productId == relaProdId) {
							        var relaProdOfferObj = {};
							        relaProdOfferObj.subProdOfferCartData = data;
							        relaProdOfferObj.prodOfferInfoVO = data.subProdOfferInfo;
							        relaProdOfferObj.productInfoVO = offerProdRelaVO.productInfoVO;
							        relaProdOfferList.push(relaProdOfferObj);
						        } else {
							        return;
						        }
					        });
				        });
				        if (relaProdOfferList.length > 0) { return relaProdOfferList; }
				        return null;
			        },
			        
			        /**
					 * 判断销售品是否为T2组合销售品
					 */
			        isT2ProdOffer : function(mainProdOfferId, menAccessProductId, serviceOfferId) {
				        var requestParam = dojo.global.$appContext$.get("requestParam");
				        var param = "&mainProdOfferId=" + mainProdOfferId + "&memAccessProductId=" + menAccessProductId
				                + "&cityCode=" + requestParam.customerData.cityCode + "&serviceOfferId="
				                + serviceOfferId;
				        var resultData = ServiceFactory
				                .getService("url:prodOfferSaleAjaxAction.do?method=doCheckT2ProdOffer" + param);
				        return resultData;
			        },
			        
			        /**
					 * 获取T2成员销售品的可选包信息
					 * 
					 * @param memProdOfferId T2成员销售品ID
					 */
			        getT2MemProdOfferList : function(memProdOfferId) {
				        // var param = "&prodOfferId="+memProdOfferId;
				        // var subProdOfferList =
				        // ServiceFactory.getService("url:orderDetailAction.do?method=doGetT2MemProdOfferList"
				        // + param);
				        // return subProdOfferList;
			        },
			        
			        /**
					 * 判断销售品是否为宽带标准化套餐(ppm未提供接口)
					 */
			        isStandardProdOffer : function(prodofferId) {
				        return false;
			        },
			        loadAndSetProdOffer : function(prodOfferId, param) {
				        param = param || {};
				        var interfaceType = param.interfaceType || 5;
				        var belongCode = function() {
					        try {
						        return prodOfferAcceptLoader.getBelongCode()
					        }
					        catch (e) {}
				        }();
				        return $ac$.cache("prodOfferId-" + prodOfferId, dojo.mixin({
					                callback : function() {
						                return ServiceFactory
						                        .getService("url:orderDetailAction.do?method=getProdOfferDetail&prodOfferId="
						                                + prodOfferId
						                                + "&interfaceType="
						                                + interfaceType
						                                + "&belongCode=" + (belongCode || ""))
					                }
					                
				                }, param));
				        
			        },
			        
			        /**
					 * 获取管理账号相关信息(从临时表中获取)
					 */
			        getManageAccNbrTemp : function(custOrderId) {
				        if (custOrderId == null || custOrderId == "" || custOrderId == undefined) { return null; }
				        var cAccnbrRelVO = BusCard.$remote("acctNbrTempDAO").queryOne({
					                custId : dojo.global.$appContext$.get("requestParam").customerData.custId,
					                custOrderId : custOrderId,
					                operKind : 1,
					                accNbrType : 2
				                });
				        if (cAccnbrRelVO == null || cAccnbrRelVO == "null") { return null; }
				        return {
					        serviceId : cAccnbrRelVO.accNbr,
					        prodInstId : cAccnbrRelVO.relaProdInstId
				        };
			        },
			        /**
					 * 获取页面上的所有接入类产品信息
					 */
			        getAllAccessProductIds : function() {
				        var trs = dojo.query(".main-product-basic", prodOfferAcceptLoader.mainProdOfferWidget.domNode);
				        return dojo.map(trs || [], function(prodBasicTr) {
					                return dojo.attr(prodBasicTr, "productId")
					                        || dojo.query("SELECT", prodBasicTr)[0].value;
				                });
			        },
			        /**
					 * 检测当前的主销售品或者成员销售品是否有预约生效的主销售品变更
					 */
			        doCheckMainProdOfferReserve : function(_provider) {
				        var reserveFlag = false;
				        if (_provider.contentPane) {
					        var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
					        var targetSelectMember = dojo.filter(selectedMemberProdOfferList || [], function(
					                        selectedMemberProdOffer) {
						                return selectedMemberProdOffer.uniqueId == _provider.uniqueId;
					                });
					        if (!!targetSelectMember[0]) {
						        // /实例存在才进行往下走
						        if (!!targetSelectMember[0].offerInstVO) {
							        if (targetSelectMember[0].offerInstVO.prodOfferId == targetSelectMember[0].prodOfferId) {
								        // 从此处取主销售品实例数据
								        var mainProdOfferInstId = _provider.contentPane.offerInstVO.prodOfferInstId;
								        var mainProdOfferVO = _provider.contentPane.prodOfferInfoVO;
								        var param = "prodOfferInstId=" + mainProdOfferInstId
								                + "&method=doCheckIfReserve";
								        var resultData = ServiceFactory.getService("url:orderDetailAction.do?" + param);
								        // 有预约
								        if (resultData == "1") {
									        reserveFlag = true;
								        }
							        }
						        }
					        }
					        // 非自主版变更
				        } else {
					        // 说明是变更可选包
					        if (!!$ac$.mainProdOfferInstVO) {
						        if ($ac$.selectedMainProdOfferInfoVO.prodOfferId == $ac$.mainProdOfferInstVO.prodOfferId) {
							        var prodOfferInstId = $ac$.mainProdOfferInstVO.prodOfferInstId;
							        // 调用预约查询接口，查询预约的接口
							        var param = "prodOfferInstId=" + prodOfferInstId + "&method=doCheckIfReserve";
							        var resultData = ServiceFactory.getService("url:orderDetailAction.do?" + param);
							        // 有预约
							        if (resultData == "1") {
								        reserveFlag = true;
							        }
						        }
					        }
				        }
				        return reserveFlag;
			        },
			        /**
			         * 获取所有的产品id
			         */
			        getAllAccessProdIds : function(uniqueId){
			        	var mainProdOfferInfo = $ac$.selectedMainProdOfferInfoVO;
			        	var prodIdsList = [];
			        	if(mainProdOfferInfo.bindType == 2){
			        		prodIdsList = dojo.filter(selectedMemberProdOfferList || [], function(
					                        selectedMemberProdOffer) {
						                if(selectedMemberProdOffer.uniqueId == uniqueId){
						                	return true;
						                }else{
						                	return false;
						                }
					                });
					        prodIdsList = dojo.map(prodIdsList||[],function(prodIdInfo){
					        	return prodIdInfo.productId;
					        });
			        	}else{
			        		prodIdsList = dojo.map(selectedMemberProdOfferList || [], function(
					                        selectedMemberProdOffer) {
						                return selectedMemberProdOffer.productId;
					                });
			        	}
			        	return prodIdsList;
			        },
			        /**
			         * 判断成员是否有变更的
			         */
			        getIfMemberChg : function(){
			        	var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
			        	return dojo.some(selectedMemberProdOfferList||[],function(selectedMemberProdOffer){
			        		return selectedMemberProdOffer.action != "new";
			        	});
			        },
			        /**
			         * 判断是否是全退网操作
			         */
			        getIfAllQuit : function(){
			        	var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
			        	return dojo.every(selectedMemberProdOfferList||[],function(selectedMemberProdOffer){
			        		return selectedMemberProdOffer.action == "quit";
			        	});
			        },
			        /**
					 * 判断当前受理是否是变更主销售品
					 */
			        getIfChangeMainFlag : function(_prodvider) {
				        var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
				        if (_prodvider.contentPane) {
					        var targetSelectMember = dojo.filter(selectedMemberProdOfferList || [], function(
					                        selectedMemberProdOffer) {
						                return selectedMemberProdOffer.uniqueId == _prodvider.uniqueId;
					                });
					        if (targetSelectMember.length > 0) {
						        if (!!(targetSelectMember[0].offerInstVO)) {
							        // 说明是主销售品变更
							        if (targetSelectMember[0].offerInstVO.prodOfferId != targetSelectMember[0].prodOfferId) { return 1; }
						        }
					        }
				        } else {
					        // 非自主版，直接取第一个
					        var selectMember = selectedMemberProdOfferList[0];
					        if (!!(selectMember.offerInstVO)) {
						        // 说明是主销售品变更
						        if (selectMember.offerInstVO.prodOfferId != selectMember.prodOfferId) { return 1; }
					        }
				        }
				        return null;
			        },
			        
			        judgeIfChgSubForBundle :function(uniqueId){
						if($ac$.selectedMemberProdOfferList){
							var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
					        var targetSelectMember = dojo.filter(selectedMemberProdOfferList || [], function(
					                selectedMemberProdOffer) {
					            return selectedMemberProdOffer.uniqueId == uniqueId;
					        });
					        if (!!targetSelectMember[0]) {
						        if (!!targetSelectMember[0].offerInstVO) {
							        if (targetSelectMember[0].offerInstVO.prodOfferId == targetSelectMember[0].prodOfferId) {
								        return true;
							        }
						        }
					        }
				        }
				        return false;
					},
					
					judgeIfChgSubForSimple : function(){
						if (!!$ac$.mainProdOfferInstVO) {
					        if ($ac$.selectedMainProdOfferInfoVO.prodOfferId == $ac$.mainProdOfferInstVO.prodOfferId) {
						        return true;
					        }
				        }
						return false;
					},
					
					getIfChgSub : function(attrObj){
						var selectedMainProdOfferInfoVO = $ac$.selectedMainProdOfferInfoVO;
						if(selectedMainProdOfferInfoVO.bindType == 2){
							var parentWidgetObj =orderaccept.prodofferaccept.util.DomHelper.
												getParentWidget(attrObj,"orderaccept.custom.TooltipDialog");
							var uniqueId = parentWidgetObj.rowData.showData.chooseNumberObj.uniqueId;
							return this.judgeIfChgSubForBundle(uniqueId);
						}else{
							return this.judgeIfChgSubForSimple();
						}
					},
			        
			        
			        /**
			         * 判断是否是预约生效的可选包
			         */
			        getIfReserveSubProdOffer : function(prodOfferInst){
			        	if(!!prodOfferInst){
							//取实例时间
							var effDate = prodOfferInst.effDate;
							var expDate = prodOfferInst.expDate;
							var invalidDate = "2037-01-01 00:00:00";
							var sysDate = $ac$.requestParam.today;
							//判断是预约生效的还是预约取消的(判断规则:有效，生效时间大于当前时间或者失效时间小于2037年)
							if(DateHelper.compareDateValue(DateHelper.format(effDate),sysDate)||(DateHelper.compareDateValue(invalidDate,DateHelper.format(expDate))&&!!prodOfferInst.oldExpDate)){
								return true;
							}
						}
						return false;
			        },
			        
			        /**
			         * 根据页面值，获取页面的开始时间
			         */
			        getProdOfferStartDateStr : function(offerViewObj,pageViewHtml){
			        	if(!pageViewHtml || pageViewHtml.length ==0){
			        		return offerViewObj.startDate;
			        	}else{
			        		return pageViewHtml[0].innerText;
			        	}
			        },
			        
			        /**
			         * 根据页面值，获取页面的结束时间
			         */
			        getProdOfferEndDateStr : function(offerViewObj,pageViewHtml){
			        	if(!pageViewHtml || pageViewHtml.length ==0){
			        		return offerViewObj.endDate;
			        	}else{
			        		return pageViewHtml[0].innerText;
			        	}
			        },
			         /**
			         * 获取成员销售品id集合,以供产品获取数据用
			         */
			        getOldMemberProdOfferIds : function(){
			        	var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
			        	var targetMemberProdOfferList =  dojo.filter(selectedMemberProdOfferList||[],function(selectedMemberProdOfferInfo){
			        		return !!selectedMemberProdOfferInfo.offerInstVO;
			        	});
			        	return dojo.toJson(dojo.map(targetMemberProdOfferList||[],function(info){
			        		return info.offerInstVO.prodOfferId+"";
			        	}));
			        },
			        
			        /**
			         * 获取新的成员销售品id集合
			         */
			        getNewMemberProdOfferIds : function(){
			        	var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
			        	var targetMemberProdOfferList =  dojo.filter(selectedMemberProdOfferList||[],function(selectedMemberProdOfferInfo){
			        		return selectedMemberProdOfferInfo.action!="quit"&&selectedMemberProdOfferInfo.action!="split";
			        	});
			        	return dojo.toJson(dojo.map(targetMemberProdOfferList||[],function(info){
			        		return info.prodOfferId+"";
			        	}));
			        },
			        
			        
			        /**
			         * 获取协议销售品的开始时间以及旧的销售品的结束时间
			         * 注：新销售品的开始时间和旧的销售品的结束时间可能不是一个
			         * 
			         * 规则
			         * 1.如果是协议到期当月受理，则按照协议到期时间生效
			         * 2.如果是协议到期月份之前受理，下月一号生效
			         */
			        getAgreementOfferDateObj : function(prodOfferEndDate){
			        	//获取当前日期
			        	var SYSDATE = dojo.global.$appContext$.requestParam.today;
						var dateArr = SYSDATE.split(" ");
						var dateYMD = dateArr[0].split("-");
						var year = parseInt(dateYMD[0], 10);
						var month = parseInt(dateYMD[1], 10)-1;
						
						var dateTargetYMD = prodOfferEndDate.split("-");
						var yearTarget = parseInt(dateTargetYMD[0], 10);
						var monthTarget = parseInt(dateTargetYMD[1], 10) - 1;
						//先比较当前的年份
						if(year == yearTarget){
							if(month == monthTarget){
								return {
									beginDate : prodOfferEndDate,
									oldOfferEndDate : prodOfferEndDate
								};
							}else if(month<monthTarget){
								return {
									beginDate : DateHelper.formatDate(DateHelper.getFirstDayAfterPeriod()),
									oldOfferEndDate : prodOfferEndDate
								};
							}else if(month>monthTarget){
								return {
									beginDate : DateHelper.formatDate(DateHelper.getFirstDayAfterPeriod()),
									oldOfferEndDate : prodOfferEndDate
								};
							}
						}
						else if(year>yearTarget){
							return {
								beginDate : DateHelper.formatDate(DateHelper.getFirstDayAfterPeriod()),
								oldOfferEndDate : prodOfferEndDate
							};
						}else if(year<yearTarget){
							return {
								beginDate : DateHelper.formatDate(DateHelper.getFirstDayAfterPeriod()),
								oldOfferEndDate : DateHelper.formatDate(DateHelper.getFirstDayAfterPeriod())
							};
						}
			        },
			        
			        /**
			         * 获取协议销售品的协议费用
			         */
			        getOfferStandardFee : function(prodOfferInfo){
			        	var offerAgreementVOList = prodOfferInfo.offerAgreementVO;
		        		if (offerAgreementVOList != null && offerAgreementVOList.length > 0) {
			                var offerAgreementVO = offerAgreementVOList[0];
			                var feeAttrInfo = BusCard.find(offerAgreementVO.itemList||[],function(item){
			                	return item.attrId == '300008';
			                })
			                return feeAttrInfo.attrValue;
		                }
		                return null;
			        },
			        
			        /**
			         * 是否是协议销售品
			         * 第二个参数传的1，则看规格层面的数据
			         * 第二个参数传的2，则看实例层面的数据
			         * 第三个参数传的3，则用销售品id进行查询
			         */
			        ifAgreementpRrodOffer : function(prodOfferInfoVO,flag){
			        	if((!flag)||flag ==1){
			        		var offerAgreementVOList = prodOfferInfoVO.offerAgreementVO;
			        		if (offerAgreementVOList != null && offerAgreementVOList.length > 0) {
				                for (var p = 0; p < offerAgreementVOList.length; p++) {
					                var offerAgreementVO = offerAgreementVOList[p];
					                // 和产品接口约定，如果协议模板id为2，则为协议销售品
					                if (offerAgreementVO.templetId == '2' || offerAgreementVO.templetId == 2) { return true; }
				                }
			                }
			                return false;
			        	}else if(flag == 2){
			        		var offerStandardInstList = prodOfferInfoVO.offerStandardInstList;
			                if (!offerStandardInstList || offerStandardInstList.length == 0) { return false; }
			                return true;
			        	}else if(flag == 3){
			        		var currentMainProdOffer = this.getProdOfferDetail(arguments[0]);
			        		var offerAgreementVOList = currentMainProdOffer.offerAgreementVO;
			        		if (offerAgreementVOList != null && offerAgreementVOList.length > 0) {
				                for (var p = 0; p < offerAgreementVOList.length; p++) {
					                var offerAgreementVO = offerAgreementVOList[p];
					                // 和产品接口约定，如果协议模板id为2，则为协议销售品
					                if (offerAgreementVO.templetId == '2' || offerAgreementVO.templetId == 2) { return true; }
				                }
			                }
			                return false;
			        	}
			        },
			        
			        /**
			         * 根据缓存到前台的参数对象，判断用户类型，承载方式，速率是否满足条件
			         * 只有当页面上的用户类型，承载方式，速率都存在时才调用
			         */
			        judgeByWideAttrParamValue : function(userTypeDom,loadModeDom,wideAttrDom){
			        	if(userTypeDom&&loadModeDom&&wideAttrDom){
			        		var wideAttrParamValue = orderaccept.prodofferaccept.util['wideAttrParamValue'];
			        		//没有数据则不检测
			        		if(wideAttrParamValue&&wideAttrParamValue.length == 0){
			        			return true;
			        		}
				        	return dojo.some(wideAttrParamValue||[],function(info){
				        		return info.userType == userTypeDom.value&&info.loadMode == loadModeDom.value&&info.wideAttr == wideAttrDom.value;
				        	});
			        	}
			        	return true;
			        },
			        
			        
			        /**
					 * 获取管理账号相关信息
					 */
			        getManageAccNbrInfo : function() {
				        var manageAccNbrInfo = null;
				        var cAccnbrRelVO = BusCard.$remote("custAccnbrRelBO").getCustAccRelVO({
					                custId : dojo.global.$appContext$.get("requestParam").customerData.custId,
					                statusCd : ConstantsPool.load("ServingStatusConst").ServingStatusConst.ON_USING
				                });
				        if (cAccnbrRelVO == null || cAccnbrRelVO == "null") {
					        manageAccNbrInfo = null;
				        }
				        // 先查询实例表，看看是否存在于实例表中
				        if(cAccnbrRelVO != null && cAccnbrRelVO != "null"){
				        	//增加判断，如果不为空，才进行处理
				        	if(cAccnbrRelVO.prodInstAccNbrId!=""&&cAccnbrRelVO.prodInstAccNbrId!=null){
					        	//取号码表中取实例数据
					        	var prodInstAccNbrList = BusCard.$remote("prodInstCommFacadeBO").queryProdInstAccNbrInfo({
							                prodInstAccNbrId : cAccnbrRelVO.prodInstAccNbrId
						                });
						        if(prodInstAccNbrList&&prodInstAccNbrList.length >0){
							        // 实例号码
							        var instInfoList = BusCard.$remote("serviceRelationDAO").query({
								                userId : prodInstAccNbrList[0].prodInstId,
								                ifValid : 1
							                });
							        if (instInfoList.length == 0) {
								        var tempInfoList = BusCard.$remote("accessProdItemInfoDAO").selectByProperties({
									                userId : prodInstAccNbrList[0].prodInstId,
									                ifValid : 1
								                });
								        if (tempInfoList.length == 0) {
									        manageAccNbrInfo = null;
								        } else {
									        manageAccNbrInfo = tempInfoList[0];
								        }
							        } else {
								        manageAccNbrInfo = instInfoList[0];
							        }
						        }
				        	}
				        }
				        // 查询临时表
				        if (manageAccNbrInfo == null) {
					        var cAccnbrRelVO = BusCard.$remote("acctNbrTempDAO").queryOne({
						                custId : dojo.global.$appContext$.get("requestParam").customerData.custId,
						                operKind : 1,
						                accNbrType : 2
					                });
					        if (cAccnbrRelVO == null || cAccnbrRelVO == "null") {
						        manageAccNbrInfo == null;
					        } else {
						        manageAccNbrInfo = {
							        serviceId : cAccnbrRelVO.accNbr,
							        prodInstId : cAccnbrRelVO.relaProdInstId
						        };
					        }
				        }
				        return manageAccNbrInfo;
			        }
			        
		        },
		        /**
				 * 销售品实例处理类，计算保留的，删除的销售皮品和产品信息
				 */
		        ProdOfferInstProvider = {
			        /**
					 * 变更可选包数据获取 userHasProdOfferInfoList --
					 * 用户已有的销售品实例信息 prodOfferList -- PPM规格数据信息
					 * keepProdOfferInstList -- 保留的销售品信息
					 * keepProdInstList -- 保留的产品数据信息
					 * cancelProdInstList -- 退订的产品信息
					 * cancelProdOfferInstList -- 退订的销售品信息
					 */
			        getProdOfferDataForChg : function(uniqueId) {
				        var uniqueId = uniqueId || "";
				        var userHasProdOfferInfoList = dojo.global.$appContext$.get("userHasProdOfferInfoList"
				                + uniqueId),
					        prodOfferList = dojo.global.$appContext$.get("prodOfferList" + uniqueId),
					        mainProdOfferInfoVO = ProdOfferHelper.getMainProdOffer(prodOfferList)[0],
					        keepProdOfferInstList = [],
					        cancelProdOfferInstList = [],
					        keepProdInstList = [],
					        cancelProdInstList = [],
					        // 获取订购的主销售品实例信息
					        userHasProdOfferInst = dojo.filter(userHasProdOfferInfoList,
					                function(userHasProdOfferInfo) {
						                return userHasProdOfferInfo.prodOfferId == mainProdOfferInfoVO.prodOfferId;
					                })[0],
					        // 用户订购过的产品实例信息
					        keepProdInstList = userHasProdOfferInst.prodInstList;
					    var resultData = this.getCancelFavorableSubOffer(userHasProdOfferInfoList,[],uniqueId);
				        var keepProdOfferInstList = resultData.keepProdOfferInstList;
				        var cancelProdOfferInstList = resultData.cancelProdOfferInstList;
				        dojo.global.$appContext$.set("mainProdOfferInstVO" + uniqueId, userHasProdOfferInst);
				        dojo.global.$appContext$.set("keepMainProdInstList" + uniqueId, keepProdInstList);
				        dojo.global.$appContext$.set("cancelMainProdInstList" + uniqueId, null);
				        dojo.global.$appContext$.set("keepProdOfferInstList" + uniqueId, keepProdOfferInstList);
				        dojo.global.$appContext$.set("cancelProdOfferInstList" + uniqueId, cancelProdOfferInstList);
				        dojo.global.$appContext$.set("leftProdOfferList" + uniqueId, []);
			        },
			        /**
					 * 变更主销售品数据获取 userHasProdOfferInfoList --
					 * 用户已有的销售品实例信息 prodOfferList -- 新订购的销售品全量信息
					 * userHasMetaProdOfferList --
					 * 用户已经有的销售品实例数据对应的PPM规格数据信息 keepProdOfferInstList --
					 * 保留的销售品信息 keepProdInstList -- 保留的产品数据信息
					 * cancelProdInstList -- 退订的产品信息
					 * cancelProdOfferInstList -- 退订的销售品信息
					 * 
					 * @param memberAcceptData 产品成员变更信息
					 */
			        getProdOfferDataForChgMain : function(uniqueId, memberAcceptData) {
				        var uniqueId = uniqueId || "";
				        // 变更主销售品的情况（注：此时prodOfferList为新主销售品以及其关联的所有可选包的集合，userHasProdOfferInfoList为用户已有的销售品实例信息）
				        var userHasProdOfferInfoList = dojo.global.$appContext$.get("userHasProdOfferInfoList"
				                + uniqueId);
				        var prodOfferList = dojo.global.$appContext$.get("prodOfferList" + uniqueId);
				        var userHasMetaProdOfferList = dojo.global.$appContext$.get("userHasProdOfferMetaInfoList"
				                + uniqueId);
				        var keepProdInstList = [];
				        var cancelProdInstList = [];
				        var leftProdOfferList = [];
				        // 获取用户已有的主销售品信息(PPM规格数据)
				        var oldMainProdOfferInfo = ProdOfferHelper.getMainProdOffer(userHasMetaProdOfferList)[0];
				        var newMainProdOfferInfo = ProdOfferHelper.getMainProdOffer(prodOfferList)[0];
				        // 获取主销售品实例数据信息
				        var useHasMainProdOfferInst = (memberAcceptData && memberAcceptData.offerInstVO)
				                || dojo.filter(userHasProdOfferInfoList, function(userHasProdOfferInfo) {
					                        return userHasProdOfferInfo.prodOfferId == oldMainProdOfferInfo.prodOfferId;
				                        })[0];
				        // 用户原有主销售品下的产品实例信息
				        var prodInstList = useHasMainProdOfferInst.prodInstList;
				        var param = {
				        	newMainProdOfferInfo : newMainProdOfferInfo,
					        prodOfferList : prodOfferList,
					        userHasProdOfferInfoList : userHasProdOfferInfoList,
					        userHasProdOfferMetaInfoList : userHasMetaProdOfferList
				        };
				        var keepOrCancelProdOfferData = this.getKeepOrCancelProdOfferDataByPPM(param);
				        var keepProdOfferInstList = keepOrCancelProdOfferData.keepProdOfferInstList;
				        var cancelProdOfferInstList = keepOrCancelProdOfferData.cancelProdOfferInstList;
				        // 过滤出要保留的产品实例和要退订的产品实例信息
				        dojo.forEach(prodInstList, function(prodInstInfo) {
					                // 无角色的产品信息集合
					                var f = dojo.some(newMainProdOfferInfo.offerProdRelaList || [], function(r) {
						                        return r.productInfoVO.productId == prodInstInfo.productId;
					                        });
					                f ? keepProdInstList.push(prodInstInfo) : cancelProdInstList.push(prodInstInfo);
					                
				                });
				        // 变更主销售品 新销售品下的默认选中的可选包除去保留的销售品
				        leftProdOfferList = dojo.filter(prodOfferList || [], function(_prodOffer) {
					                return _prodOffer.prodOfferType != 1
					                        && !(dojo.some(keepProdOfferInstList || [], function(keepProdOfferInst) {
						                                return keepProdOfferInst.prodOfferId == _prodOffer.prodOfferId;
					                                }));
				                });
				        var resultData = this.getCancelFavorableSubOffer(keepProdOfferInstList,cancelProdOfferInstList,uniqueId);
				        keepProdOfferInstList = resultData.keepProdOfferInstList;
				        cancelProdOfferInstList = resultData.cancelProdOfferInstList;
				        // mainProdOfferInstVO -- 旧的销售品实例信息
				        dojo.global.$appContext$.set("mainProdOfferInstVO" + uniqueId, useHasMainProdOfferInst);
				        // 新的主销售品信息和默认选中的销售品信息集合
				        dojo.global.$appContext$.set("prodOfferList" + uniqueId, prodOfferList);
				        // 变更主销售品后，保留的主产品信息
				        dojo.global.$appContext$.set("keepMainProdInstList" + uniqueId, keepProdInstList);
				        // 变更主销售品后，删除的主产品信息
				        dojo.global.$appContext$.set("cancelMainProdInstList" + uniqueId, cancelProdInstList);
				        // 变更主销售品后，保留的销售品信息
				        dojo.global.$appContext$.set("keepProdOfferInstList" + uniqueId, keepProdOfferInstList);
				        // 变更主销售品后，删除的销售品信息
				        dojo.global.$appContext$.set("cancelProdOfferInstList" + uniqueId, cancelProdOfferInstList);
				        // 变更主销售品 新销售品下的默认选中的可选包除去保留的销售品
				        dojo.global.$appContext$.set("leftProdOfferList" + uniqueId, leftProdOfferList);
			        },
			        /**
					 * 调用PPM接口检测保留和退订的可选包
					 */
			        getKeepOrCancelProdOfferDataByPPM : function(param) {
				        var keepProdOfferInstList = [];
				        var cancelProdOfferInstList = [];
				        // 可选包购物车中新增加的数据
				        var addProdOfferCartData = param.addProdOfferCartData;
				        // 页面默认选中的销售品集合
				        var prodOfferList = param.prodOfferList;
				        // 用户已经有的销售品实例数据
				        var userHasProdOfferInfoList = param.userHasProdOfferInfoList;
				        // 用户已经有的销售品实例数据对应的PPM规格数据
				        var userHasProdOfferMetaInfoList = param.userHasProdOfferMetaInfoList;
				        // 新的主销售品信息
				        var newMainProdOfferInfo = param.newMainProdOfferInfo;
				        var oldMainProdOfferInfo = ProdOfferHelper.getMainProdOffer(userHasProdOfferMetaInfoList)[0];
				        var prodOfferIdList = dojo.map(userHasProdOfferInfoList || [], function(userHasProdOfferInfo) {
					                return userHasProdOfferInfo.prodOfferId;
				                });
				        prodOfferIdList = dojo.filter(prodOfferIdList || [], function(prodOfferId) {
					                return prodOfferId != oldMainProdOfferInfo.prodOfferId;
				                });
				        var belongCode = function() {
					        try {
						        return prodOfferAcceptLoader.getBelongCode()
					        }
					        catch (e) {}
				        }();
				        var keepProdOfferIdList = ServiceFactory.getService(
				                "url:orderDetailAction.do?method=checkAutoSelectedSubOfferForChg", null, {
					                method : 'post',
					                content : {
						                commonRegionId : belongCode || "-1",
						                prodOfferId : newMainProdOfferInfo.prodOfferId,
						                offerList : prodOfferIdList
					                }
				                });
				        dojo.forEach(userHasProdOfferInfoList || [], function(userHasProdOfferInfo) {
					                var _flag_ = dojo.some(keepProdOfferIdList || [], function(prodOfferId) {
						                        return prodOfferId == userHasProdOfferInfo.prodOfferId;
					                        });
					                if (_flag_) {
						                keepProdOfferInstList.push(userHasProdOfferInfo);
					                } else {
						                cancelProdOfferInstList.push(userHasProdOfferInfo);
					                }
				                });
				        return {
					        keepProdOfferInstList : keepProdOfferInstList,
					        cancelProdOfferInstList : cancelProdOfferInstList
				        };
			        },
			        
			        
			        /**
			         * 获取取消的宽带优惠包集合
			         * 1.单套餐的不处理
			         * 2.没有拆分，没有退订的不处理
			         */
			        getCancelFavorableSubOffer : function(keepProdOfferInstList,cancelProdOfferInstList,uniqueId){
			        	if((!$ac$.selectedMainProdOfferInfoVO)||$ac$.selectedMainProdOfferInfoVO.bindType != 2){
			        		return {
			        			keepProdOfferInstList : keepProdOfferInstList,
			        			cancelProdOfferInstList : cancelProdOfferInstList
			        		};
			        	}
			        	if(dojo.some($ac$.selectedMemberProdOfferList||[],function(info){
			        		return info.action=='split'||info.action=='quit';
			        	})){
			        		var oldMemOfferList = ProdOfferHelper.getOldMemberProdOfferIds();
			        		var newMemOfferList = ProdOfferHelper.getNewMemberProdOfferIds();
			        		//根据uniqueId判断是否是拆分,拆分则传空
			        		var targetSelectMem = dojo.filter($ac$.selectedMemberProdOfferList||[],function(_data){
								return _data.uniqueId == uniqueId;
							});
			        		if((!!targetSelectMem)&&targetSelectMem.length>0){
			        			if(targetSelectMem[0].action=='split'||targetSelectMem[0].action=='quit'){
			        				newMemOfferList = dojo.toJson([]);
			        			}
			        		}
			        		var vParameter = "&oldMemOfferList="+oldMemOfferList+"&newMemOfferList="+newMemOfferList;
			        		var data = ServiceFactory.getService("url:orderDetailAction.do?method=getKeepSubProdOffers"
						                + vParameter)
			        		
			        		//根据产品接口返回值进行比较
			        		var allFavorableOfferIds = data.allFavorableOfferIds;
			        		var chgFavorableOfferIds = data.chgFavorableOfferIds;
			        		
			        		//过滤出用户已有的可选包中的优惠可选包
			        		var existFavorableOffer = [];
			        		var notExistFavorableOffer = [];
			        		dojo.forEach(keepProdOfferInstList||[],function(inst){
			        			if(dojo.some(allFavorableOfferIds||[],function(prodOfferId){
			        				return prodOfferId == inst.prodOfferId;
			        			})){
			        				existFavorableOffer.push(inst);
			        			}else{
			        				notExistFavorableOffer.push(inst);
			        			}
			        		});
			        		
			        		//过滤出需要退订的用户已有的优惠可选包
			        		dojo.forEach(existFavorableOffer||[],function(inst){
			        			if(dojo.some(chgFavorableOfferIds||[],function(prodOfferId){
			        				return prodOfferId == inst.prodOfferId;
			        			})){
			        				notExistFavorableOffer.push(inst);
			        			}else{
									cancelProdOfferInstList.push(inst);
			        			}
			        		});
			        		keepProdOfferInstList = notExistFavorableOffer;
			        		return {
			        			keepProdOfferInstList : keepProdOfferInstList,
			        			cancelProdOfferInstList : cancelProdOfferInstList
			        		};
			        	}
			        	return {
			        			keepProdOfferInstList : keepProdOfferInstList,
			        			cancelProdOfferInstList : cancelProdOfferInstList
			        		   };
			        },
			        
			        
			        /**
					 * 获取保留的或者是删除的销售品数据
					 */
			        getKeepOrCancelProdOfferData : function(param) {
				        var keepProdOfferInstList = [];
				        var tempProdOfferInstList = [];
				        var cancelProdOfferInstList = [];
				        // 可选包购物车中新增加的数据
				        var addProdOfferCartData = param.addProdOfferCartData;
				        // 页面默认选中的销售品集合
				        var prodOfferList = param.prodOfferList;
				        // 用户已经有的销售品实例数据
				        var userHasProdOfferInfoList = param.userHasProdOfferInfoList;
				        // 用户已经有的销售品实例数据对应的PPM规格数据
				        var userHasProdOfferMetaInfoList = param.userHasProdOfferMetaInfoList;
				        if (addProdOfferCartData) {
					        dojo.forEach(userHasProdOfferInfoList, function(userHasProdOfferInfo) {
						        var flag = dojo.some(addProdOfferCartData, function(data) {
							                return userHasProdOfferInfo.prodOfferId == data.subProdOfferInfo.prodOfferId;
						                });
						        if (flag) {
							        keepProdOfferInstList.push(userHasProdOfferInfo);
						        } else {
							        tempProdOfferInstList.push(userHasProdOfferInfo);
						        }
					        });
				        } else {
					        dojo.forEach(userHasProdOfferInfoList, function(userHasProdOfferInfo) {
						                var flag = dojo.some(prodOfferList, function(prodOfferInfo) {
							                        return prodOfferInfo.prodOfferId == userHasProdOfferInfo.prodOfferId;
						                        });
						                if (flag) {
							                keepProdOfferInstList.push(userHasProdOfferInfo);
						                } else {
							                tempProdOfferInstList.push(userHasProdOfferInfo);
						                }
					                });
				        }
				        // 新的主销售品信息
				        var newMainProdOfferInfo = ProdOfferHelper
				                .getMainProdOffer(dojo.global.$appContext$.prodOfferList)[0];
				        dojo.forEach(tempProdOfferInstList, function(tempProdOfferInstVO) {
					        var userHasPPMProdOffer = dojo.filter(userHasProdOfferMetaInfoList || [], function(
					                        userHasMetaProdOfferVO) {
						                return userHasMetaProdOfferVO.prodOfferId == tempProdOfferInstVO.prodOfferId;
					                })[0];
					        // 这里有可能查询出来是空
					        if (!userHasPPMProdOffer) { return; }
					        // 如果是普通的附属销售品,判断和新的主销售品是否存在依赖关系，存在则将其放置到保存的销售品集合中
					        if (userHasPPMProdOffer.prodOfferType == 3) {
						        var flag = dojo.some(newMainProdOfferInfo.prodOfferRelaList || [], function(
						                        prodOfferRelaVO) {
							                return prodOfferRelaVO.relationTypeCD == PRODOFFERTYPE.DEPEND_TYPE
							                        && prodOfferRelaVO.offerZId == tempProdOfferInstVO.prodOfferId;
						                });
						        if (flag) {
							        keepProdOfferInstList.push(tempProdOfferInstVO);
						        } else {
							        cancelProdOfferInstList.push(tempProdOfferInstVO);
						        }
						        // 如果是公共附属销售品,判断和新的主销售品是否互斥，不互斥则将其放置到保留的销售品集合中
					        } else if (userHasPPMProdOffer.prodOfferType == 2) {
						        var flag = dojo.some(newMainProdOfferInfo.prodOfferRelaList || [], function(
						                prodOfferRelaVO) {
							        return (prodOfferRelaVO.relationTypeCD == PRODOFFERTYPE.EX_TYPE && prodOfferRelaVO.offerZId == tempProdOfferInstVO.prodOfferId)
							                || (prodOfferRelaVO.relationTypeCD == PRODOFFERTYPE.EX_TYPE && prodOfferRelaVO.offerAId == tempProdOfferInstVO.prodOfferId);
						        });
						        if (!flag) {
							        keepProdOfferInstList.push(tempProdOfferInstVO);
						        } else {
							        cancelProdOfferInstList.push(tempProdOfferInstVO);
						        }
					        }
				        });
				        return {
					        keepProdOfferInstList : keepProdOfferInstList,
					        cancelProdOfferInstList : cancelProdOfferInstList
				        };
			        },
			        
			        /**
					 * 通过产品实例id获取产品属性
					 */
			        getKeepProdAttrInst : function(userId) {
				        var keepProdInstList = dojo.global.$appContext$.keepProdInstList;
				        prodInstInfo = dojo.filter(keepProdInstList, function(keepProdInstInfo) {
					                return keepProdInstInfo.prodInstId = userId;
				                })[0];
				        return (!!prodInstInfo ? prodInstInfo : {}).prodInstAttrList;
			        },
			        
			        /**
					 * 通过产品实例id获取产品属性
					 */
			        getKeepProdAttrInst : function(serviceId, productId) {
				        var keepProdInstList = dojo.global.$appContext$.keepProdInstList;
				        prodInstInfo = dojo.filter(keepProdInstList, function(keepProdInstInfo) {
					                return keepProdInstInfo.serviceId = serviceId
					                        && keepProdInstInfo.productId == productId;
				                })[0];
				        return (!!prodInstInfo ? prodInstInfo : {}).prodInstAttrList;
			        },
			        _getAllProdOfferList : function() {
				        var allList = [],
					        protoPush = Array.prototype.push;
				        
				        dojo.forEach(dojo.query("TR[uniqueId]"), function(dom) {
					                var uniqueId = dojo.attr(dom, "uniqueId");
					                protoPush.apply(allList, $ac$.get("prodOfferList" + uniqueId) || []);
				                });
				        // 1:当前正在受理的销售品
				        protoPush.apply(allList, $ac$.get("prodOfferList") || []);
				        // 2:可选包变更或主销售品变更初始化时老用户的销售品规格层面上数据
				        protoPush.apply(allList, $ac$.get("userHasProdOfferMetaInfoList") || []);
				        // 3:选择已有号码带出来的对应的老用户的销售品规格层面数据
				        var _prodOfferInstMap = $ac$.get("_prodOfferInstMap") || {};
				        for (var prodOfferInstId in _prodOfferInstMap) {
					        prodOfferData = _prodOfferInstMap[prodOfferInstId];
					        if (prodOfferData) {
						        protoPush.apply(allList, prodOfferData.userHasProdOfferMetaInfoList || []);
					        }
				        }
				        return allList;
				        
			        },
			        _getAllOfferInstList : function() {
				        var allList = [],
					        protoPush = Array.prototype.push;
				        // 1:变更时初始化老用户销售品实例信息
				        $ac$.get("userHasProdOfferInfoList")
				        protoPush.apply(allList, $ac$.get("userHasProdOfferInfoList") || []);
				        // 2:选择已有号码带出来的对应的老用户的销售品规格层面数据
				        var _prodOfferInstMap = $ac$.get("_prodOfferInstMap") || {};
				        for (var prodOfferInstId in _prodOfferInstMap) {
					        prodOfferData = _prodOfferInstMap[prodOfferInstId];
					        if (prodOfferData) {
						        protoPush.apply(allList, prodOfferData.userHasProdOfferInfoList || []);
					        }
				        }
				        return allList;
				        
			        },
			        /**
					 * 针对销售品下的产品进行特殊处理
					 */
			        dealProdInstList : function() {

			        },
			        /**
					 * 查询规格层面上的销售品信息
					 * 
					 * @method
					 */
			        queryProdOfferInfoVO : function(prodOfferId) {
				        
				        var queryResult = BusCard.jsonPath(this._getAllProdOfferList(), "$[?(@.prodOfferId=="
				                        + prodOfferId + ")]");
				        if (queryResult) { return queryResult[0]; }
				        
			        },
			        /**
					 * 查询规格层面销售品产品关联信息
					 * 
					 * @method
					 */
			        queryOfferProdRelaVO : function(productId) {
				        var queryResult = BusCard.jsonPath(this._getAllProdOfferList(),
				                "$[*].offerProdRelaList[?(@.productId==" + productId + ")]");
				        if (queryResult) { return queryResult[0]; }
				        
			        },
			        /**
					 * 查询实例成名产品信息,目前与java 端relaProdInfoVO对应
					 * 
					 * @method
					 */
			        queryRelaProdInfoVO : function(prodInstId) {
				        var queryResult = BusCard.jsonPath(this._getAllOfferInstList(),
				                "$[*].prodInstList[?(@.prodInstId==" + prodInstId + ")]");
				        if (!queryResult) {
					        queryResult = BusCard.jsonPath(this._getAllOfferInstList(),
					                "$[*].prodInstList[*].prodInstList[?(@.prodInstId==" + prodInstId + ")]");
				        }
				        return queryResult[0]
			        },
			        /**
					 * 查询销售品实例信息,目前与java端ProdOfferAcceptInfoVO对应
					 * 
					 * @method
					 */
			        queryProdOfferAcceptInfoVO : function(prodOfferInstId) {
				        var queryResult = BusCard.jsonPath(this._getAllOfferInstList(), "$[?(@.prodOfferInstId=="
				                        + prodOfferInstId + ")]");
				        if (queryResult) { return queryResult[0] };
				        
			        },
			        /**
					 * 查询成员套餐以及成员套餐相关的可选包(包括实例数据和规格数据)
					 */
			        queryMemberProdOfferAndSub : function(prodOfferInstId, uniqueId) {
				        var userHasProdOfferList = [];
				        var memberProdOfferInstVO = dojo.filter($ac$.get("userHasProdOfferInfoList") || [], function(
				                        offerInstVO) {
					                return offerInstVO.prodOfferInstId == prodOfferInstId;
				                })[0];
				        
				        var offerInstRelaList = memberProdOfferInstVO.offerInstRelaList;
				        dojo.forEach(offerInstRelaList || [], function(offerInstRelaVO) {
					        if (offerInstRelaVO.relaProdOfferInstId == memberProdOfferInstVO.prodOfferInstId) {
						        userHasProdOfferList = userHasProdOfferList.concat(dojo.filter($ac$
						                        .get("userHasProdOfferInfoList")
						                        || [], function(offerInstVO) {
							                return offerInstVO.prodOfferInstId == offerInstRelaVO.relatedProdOfferInstId;
						                }));
					        }
				        });
				        userHasProdOfferList = userHasProdOfferList.concat([memberProdOfferInstVO]);
				        dojo.global.$appContext$.set("userHasProdOfferInfoList" + uniqueId, userHasProdOfferList);
			        },
			        /**
					 * 获取宽带标准化套餐的开始时间
					 */
			        getOfferStandardStartDate : function() {
				        if ($ac$.currentProcessId == "single2single") {
					        // 主销售品实例信息
					        var mainProdOfferInstVO = $ac$.mainProdOfferInstVO;
					        // 协议信息
					        var offerStandardInstList = mainProdOfferInstVO.offerStandardInstList;
					        // 促销政策信息
					        var salesPromotionInstList = mainProdOfferInstVO.salesPromotionInstList;
					        // 结束时间
					        var endDate = null;
					        // 根据实例层面的数据进行判断，判断旧的主销售品实例是否是标准化套餐
					        if (offerStandardInstList && offerStandardInstList.length > 0) {
						        // 获取协议信息集合中失效时间为最大的时间
						        if (salesPromotionInstList && salesPromotionInstList.length > 0) {
							        var endDateList = dojo.map(salesPromotionInstList,
							                function(salesPromotionInstInfo) {
								                return salesPromotionInstInfo.expDate;
							                });
							        endDate = endDateList.max();
						        } else {
							        var endDateList = dojo.map(offerStandardInstList, function(offerStandardInstInfo) {
								                return offerStandardInstInfo.expDate;
							                });
							        endDate = endDateList.max();
						        }
					        }
					        if (endDate != null) {
						        // 将计算完的销售品的开始时间放置到全局中
						        $ac$.set("offerStandardStartDate_" + mainProdOfferInstVO.prodOfferInstId, {
							                beginDate : DateHelper.format(endDate, false),
							                timeString : builder.getDateFromString(DateHelper.format(endDate, false))
						                });
					        }
				        }
			        },
			        
			        /**
			         * 变更时获取新旧协议销售品的开始时间和结束时间
			         * 
			         * @param memberProdOfferInstVO 旧的销售品实例id
			         */
			        getBeginAndEndDateForAgreeMentLN : function(memberProdOfferInstVO){
			        	// 协议信息
				        var offerStandardInstList = memberProdOfferInstVO.offerStandardInstList;
				        // 结束时间
				        var endDate = null;
				        if (offerStandardInstList && offerStandardInstList.length > 0) {
				        	 var endDateList = dojo.map(offerStandardInstList, function(offerStandardInstInfo) {
						                return offerStandardInstInfo.expDate;
					                });
					        endDate = endDateList.max();
					        // 将计算完的销售品的开始时间放置到全局中
					        $ac$.set("offerStandardStartDate_" + memberProdOfferInstVO.prodOfferInstId,
					        	ProdOfferHelper.getAgreementOfferDateObj(endDate));
				        }
				         
			        },
			        
			        
			        /**
					 * 选择已有号码，已有号码为宽带标准化套餐
					 */
			        getOfferStandardStartDateForOldNum : function(mainProdOfferInstVO) {
				        // 协议信息
				        var offerStandardInstList = mainProdOfferInstVO.offerStandardInstList;
				        // 促销政策信息
				        var salesPromotionInstList = mainProdOfferInstVO.salesPromotionInstList;
				        // 结束时间
				        var endDate = null;
				        // 根据实例层面的数据进行判断，判断旧的主销售品实例是否是标准化套餐
				        if (offerStandardInstList && offerStandardInstList.length > 0) {
					        // 获取协议信息集合中失效时间为最大的时间
					        if (salesPromotionInstList && salesPromotionInstList.length > 0) {
						        var endDateList = dojo.map(salesPromotionInstList, function(salesPromotionInstInfo) {
							                return salesPromotionInstInfo.expDate;
						                });
						        endDate = endDateList.max();
					        } else {
						        var endDateList = dojo.map(offerStandardInstList, function(offerStandardInstInfo) {
							                return offerStandardInstInfo.expDate;
						                });
						        endDate = endDateList.max();
					        }
				        }
				        if (endDate != null) {
					        // 将计算完的销售品的开始时间放置到全局中
					        $ac$.set("offerStandardStartDate_" + mainProdOfferInstVO.prodOfferInstId, {
						                beginDate : DateHelper.format(endDate, false),
						                timeString : builder.getDateFromString(DateHelper.format(endDate, false))
					                });
				        }
			        }
			        
		        },
		        /**
				 * 改单处理
				 */
		        OrderChangeProdvider = {
			        /**
					 * 改单-变更可选包
					 */
			        getProdOfferDataForChg : function(uniqueId) {

			        },
			        /**
					 * 改单-变更主销售品
					 */
			        getProdOfferDataForChgMain : function(uniqueId) {

			        }
		        },
		        /**
				 * 订单项处理类（供预受理和改单使用）
				 */
		        OrderItemHandler = {
			        /**
					 * 获取接入类产品订单项
					 */
			        getAcessProdItem : function() {

			        },
			        /**
					 * 获取销售品订单项下的订单项关系集合
					 */
			        getProdItemRelationList : function(orderRelType, offerItem) {
				        return BusCard.jsonPath(currentProdOfferOrderItem.itemRelationInfoList || [],
				                "$[?(@.orderRelType==" + orderRelType + "&&@.aorderItemId==" + offerItem.orderItemId
				                        + ")]");
			        },
			        
			        getSubProdOfferOrderItem : function() {

			        }
			        
		        },
		        /**
				 * 按照业务封装一些unieap和dojo的控件,以便于方便调用
				 * 
				 * @static
				 */
		        WidgetProvider = {
			        /**
					 * 获取主销售品树
					 * 
					 * @method
					 */
			        getMainProdOfferTree : function(config, srcNodeRef, targetNodeId) {
				        var url = config.url,
					        queryParam = config.queryParam || {},
					        id = config.id || "mainProdOfferTree",
					        targetNodeId = targetNodeId || "mainProdOfferTree",
					        builderParams = config.builderParams || (function(params, item) {
						        params = params ? params : {};
						        params.catalogId = this.widget.getBinding().getId(item);
						        params.isCatalog = item.data.isCatalog;
						        params.label = item.data["label"];
						        params.dojoType = "1";
						        return params;
					        }),
					        binding = {
						        bindingClass : 'unieap.tree.JsonTreeBinding',
						        'leaf' : 'leaf',
						        'label' : 'text',
						        'id' : 'id'
					        },
					        loader = {
						        'url' : url,
						        parameters : queryParam,
						        'buliderParams' : builderParams
					        },
					        _treeConfig = {
						        binding : binding,
						        loader : loader,
						        "treeLoaderClass" : 'orderaccept.custom.JsonTreeLoader',
						        id : id
					        };
				        dojo.mixin(_treeConfig, config.listeners || {
					                onClick : function() {
						                return dojo.publish("/" + targetNodeId + "/click", arguments);
					                },
					                onDblClick : function() {
						                return dojo.publish("/" + targetNodeId + "/dblclick", arguments);
					                },
					                onContextMenu : function() {
						                return dojo.publish("/" + targetNodeId + "/contextmenu", arguments);
						                
					                },
					                onMouseOver : function() {
						                
						                return dojo.publish("/" + targetNodeId + "/mouseover", arguments);
					                },
					                onMouseOut : function() {
						                
						                return dojo.publish("/" + targetNodeId + "/mouseout", arguments);
					                }
					                
				                });
				        
				        return new unieapTree(_treeConfig, srcNodeRef);
				        
			        },
			        /**
					 * 获取主销售品树,目前是把请求分发给获取主销售品的程序
					 * 
					 * @method
					 */
			        getSubProdOfferTree : function(param, srcNodeRef) {
				        return this.getMainProdOfferTree(param, srcNodeRef, "subProdOfferTree");
			        },
			        /**
					 * 获取促销政策树,目前是把请求分发给获取主销售品的程序
					 * 
					 * @method
					 */
			        getPromotionTree : function(param, srcNodeRef) {
				        return this.getMainProdOfferTree(param, srcNodeRef, "promotionTree");
				        
			        },
			        /**
					 * 获取普通树,目前是把请求分发给获取主销售品的程序
					 * 
					 * @method
					 */
			        getTree : function(param, srcNodeRef) {
				        
				        return this.getMainProdOfferTree(param, srcNodeRef);
			        }
			        
		        },
		        
		        ServiceFactory = function() {
			        var loadClass = function() {
				        return BusCard.$load(arguments[0]);
			        };
			        var loadByBeanId = function() {
				        return BusCard.$remote(arguments[0]);
			        };
			        var loadByUrl = function(url, cb, param) {
				        
				        var realPath = url.replace(/^url\:/i, ""),
					        contextPath = BusCard.path.contextPath;
				        if (realPath.indexOf(contextPath) != 0) {
					        if (realPath.indexOf("/") != 0) {
						        realPath = contextPath + "/" + realPath;
					        } else {
						        realPath = contextPath + realPath;
					        }
				        }
				        if (!param) {
					        if (!cb) {
						        var text = dojo._getText(BusCard.util.bustCache(realPath));
						        try {
							        return BusCard.parse(text);
						        }
						        catch (e) {
							        return text;
						        }
						        
					        } else {
						        BusCard.doGet(realPath, content, true, cb);
						        
					        }
					        
				        } else {
					        var method = param.method || "get";
					        var content = param.content || {};
					        if (method.toUpperCase() == 'GET') {
						        method = "doGet";
					        } else {
						        method = "doPost";
					        }
					        
					        if (!cb) {
						        var text = BusCard[method](realPath, content);
						        try {
							        return text;
						        }
						        catch (e) {
							        return text;
						        }
						        
					        } else {
						        BusCard[method](realPath, content, true, cb);
						        
					        }
					        
				        }
				        
			        };
			        var getService = function() {
				        var url = arguments[0] || "";
				        var urlFlag = /^url\:/i.test(url),
					        springFlag = /^spring\:/i.test(url),
					        classNameFlag = /^class\:/i.test(url);
				        if (classNameFlag) {
					        var className = url.replace(/^class\:/i, "");
					        return loadClass(className);
				        } else if (urlFlag) {
					        return loadByUrl(url, arguments[1], arguments[2]);
				        } else if (springFlag) {
					        var beanId = url.replace(/^spring\:/i, "");
					        return loadByBeanId(beanId);
				        }
			        };
			        
			        return {
				        getService : getService
			        };
			        
		        }(),
		        /**
				 * 获取表格数据的相关处理类
				 * 
				 * @static
				 */
		        SubProdOfferGridHelper = {
			        
			        /**
					 * 获取可选包购物车中所有的销售品集合
					 */
			        getSubProdOfferCartList : function(bindingData) {
				        return dojo.map(bindingData, function(oneRowData) {
					                return oneRowData.subProdOfferInfo;
				                });
			        },
			        /**
					 * 获取购物车中选中的销售品集合
					 */
			        getCheckedSubProdOfferCartList : function(bindingData) {

			        },
			        /**
					 * 获取购物车中未选中的销售品集合
					 */
			        getUncheckedSubProdOfferCartList : function(bindingData) {

			        }
		        },
		        ATTRCONSTVALUE = {
			        // 属性取值类型,L1=数字,L2=字符,L4=密码,L5=随机密码
			        "NUMBER_VALUE_CODE" : "L1",
			        "TEXT_VALUE_CODE" : "L2",
			        "PASSWORD_VALUE_CODE" : "L4",
			        "RONDAM_PASSWORD_VALUE_CODE" : "L5",
			        // 属性值展现方式
			        "TEXT_SHOW_TYPE" : "text",
			        "SELECT_SHOW_TYPE" : "select",
			        "CHECKBOX_SHOW_TYPE" : "checkbox",
			        "RADIOBOX_SHOW_TYPE" : "radiobox",
			        "DATE_SHOW_TYPE" : "date",
			        "TEXTAREA_SHOW_TYPE" : "textarea",
			        "PASSWORD_SHOW_TYPE" : "pwd",
			        "ID_INDEX" : 0
		        },
		        /**
				 * 处理属性信息的工具类
				 * 
				 * @static
				 */
		        AttrUtil = {
		        	getRandomPassword : function(){
		        		var selectChar=new Array(0,1,2,3,4,5,6,7,8,9);
						var password = "";
						for(var i = 0; i < 6;i++){
						    password +=""+selectChar[Math.floor(Math.random()*10)];
						}
						return password;
		        	},

		        	accMul : function(arg1,arg2){
		        		var m=0,s1=arg1.toString(),s2=arg2.toString();
					    try{m+=s1.split(".")[1].length}catch(e){}
					    try{m+=s2.split(".")[1].length}catch(e){}
					    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
		        	},
		        	
		        	nas_email_check_sirp : function(field_name,form_field,alert_flag){
		        		var err_message=field_name+'必须是有效的邮件地址！';
						if(alert_flag == null || alert_flag == ''){
							alert_flag = 1;
						}
						var mail_patten=/^[_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.){1,4}[a-z]{2,3}$/i; 
						var emailvalue=form_field.value;
						var matchArray = emailvalue.match(mail_patten);
						var check_result = new Array();
						
						if (emailvalue.length!=0&&matchArray==null)
						{
							if(alert_flag == 1){
								
								if(typeof(window.orderaccept)!= 'undefined'){
							  		orderaccept.common.dialog.MessageBox.alert({busiCode:"08510164",infoList:[err_message]});
							    }else{
							    	alert(err_message);	
							    }
								form_field.focus();
							}
							return false; 	
						}
						return true;
		        	},
		        	
		        	checkMinMaxValue : function(obj,attrVO){
		        		var target = obj;
						if (target.value == "") {
							return;
						}
						var err_message = "输入的值应该在【" + attrVO.valueFrom + "】和【"
										+ attrVO.valueTo + "】之间，请核查！";
						if (attrVO.valueFrom != "" && attrVO.valueFrom != null) {
							if (target.value * 1 < attrVO.valueFrom * 1) {
								if(typeof(window.orderaccept)!= 'undefined'){
							  		orderaccept.common.dialog.MessageBox.alert({busiCode:"08510164",infoList:[err_message]});
							    }else{
							    	alert(err_message);	
							    }
								target.value = "";
								target.focus();
								return false;
							}
						}
						if (attrVO.valueTo != "" && attrVO.valueTo != null) {
							if (target.value * 1 > attrVO.valueTo * 1) {
								if(typeof(window.orderaccept)!= 'undefined'){
							  		orderaccept.common.dialog.MessageBox.alert({busiCode:"08510164",infoList:[err_message]});
							    }else{
							    	alert(err_message);	
							    }
								target.value = "";
								target.focus();
								return false;
							}
						}
		        	},
		        	
		        	checkFloat : function(objValue){
		        		var patrn = /^(-?\d+)(\.\d+)?$/;
						if (!patrn.exec(objValue)) {
							return false;
						}
						return true;
		        	},
		        	
		        	checkNumberValue : function(obj,attrVO){
		        		var target = obj;
						if (target.value == "") {
							return;
						}
						if (this.checkFloat(obj.value) === false) {
							orderaccept.common.dialog.MessageBox.alert({busiCode:"08510164",infoList:["必须输入数字，请核查!"]});
							target.value = "";
							target.focus();
							return false;
						}
						if (this.checkMinMaxValue(obj,attrVO) === false) {
							return false;
						}
		        	},
		        	
			        checkIfNotNull : function(attrList) {
				        if (!attrList) { return false; }
				        var detailNotNull = dojo.some(attrList, function(attrVO) {
					                return attrVO.nullable === false && attrVO.ifDisplay == "1" && !attrVO.defaultValue;
				                });
				        return detailNotNull;
			        },
			        checkIfFavour : function(prodOfferInfo){
		        		var favourType = false;
			        	var FavourKindConst = ConstantsPool.load("FavourKindConst").FavourKindConst;
						if(prodOfferInfo.usageTypeList && prodOfferInfo.usageTypeList.length > 0){//亲情属性的判断
							var usageTypeList = prodOfferInfo.usageTypeList;
							dojo.forEach(usageTypeList, function(usageType){
								if(usageType == "1"){
									favourType = FavourKindConst.SELF_FAVOUR;
									return true;
								}
								if(usageType == "2"){
									favourType = FavourKindConst.COMMON_FAVOUR;
									return true;
								}
								if(usageType == "126"){
									favourType = FavourKindConst.OCS_FAVOUR;
									return true;
								}
							});
						}
						return favourType;
			        },
			        checkedIfNeedShow : function(attrList, prodType) {
				        if (attrList != null && attrList.length > 0) {
					        // if (ProdOfferRuleClient) {
					        // if (!ProdOfferRuleClient({
					        // "ruleEventId" : 50,
					        // "cityCode" : ""
					        // })) { return false; }
					        // }
					        for (var i = 0, len = attrList.length; i < len; i++) {
						        var attrVO = attrList[i];
						        // 不允许为空
						        if (attrVO.nullable == false || attrVO.nullable == "false") {
							        // 产品属性判断
							        if (prodType && prodType == "product") {
								        // 文本框
								        if (attrVO.valueShowType == ATTRCONSTVALUE.TEXT_SHOW_TYPE) {
									        if (attrVO.defaultValue == "") { return true; }
									        // 下拉框
								        } else if (attrVO.valueShowType == ATTRCONSTVALUE.SELECT_SHOW_TYPE) {
									        if (this.ifDefaultValueInValueList(attrVO)) {
										        if (changeValue.isChange == '0') {
											        return false;
										        } else {
											        return true;
										        }
									        } else {
										        // 判断下拉框是否产生变化
										        if (changeValue.ifChanged == "0") {
											        if (changeValue.isChange == '0') {
												        return false;
											        } else {
												        return true;
											        }
										        }
										        return true;
									        }
								        }
							        } else {
								        // 下拉框除外
								        if (attrVO.valueShowType == ATTRCONSTVALUE.SELECT_SHOW_TYPE) {
									        if (!this.ifDefaultValueInValueList(attrVO)) {
									        	return true;
									        }
								        }else if(attrVO.defaultValue == ""){
									        // 没有配置默认值
									         return true;
								        }
							        }
						        }
					        }
				        }
				        return false;
			        },
			        getDefaultValueList : function(attrList) {
				        var data = "";
				        if (attrList != null && attrList.length > 0) {
					        for (var i = 0, len = attrList.length; i < len; i++) {
						        var attrVO = attrList[i];
						        var keepFlag = _keepAttr_(attrVO.attrCd);
						        // 取配置了默认值的属性信息
						        if (keepFlag || attrVO.defaultValue != "") {
							        var attrData = {
								        "attrCd" : attrVO.attrCd,
								        "attrValue" : attrVO.defaultValue,
								        "operKind" : 1,
								        // "attrValueId" :
								        // AttrUtil.getDefaultValueId(attrVO,
								        // attrVO.defaultValue),
								        "attrInstId" : -1,
								        "attrName" : attrVO.attrName,
								        "valueExpressions" : (attrVO.attrValueExpressionsVO && attrVO.attrValueExpressionsVO.valueExpressions)
								                ? attrVO.attrValueExpressionsVO.valueExpressions
								                : ""
							        }
							        data += "<attrInfoVO>";
							        data += new LeafList(attrData).toString();
							        data += "</attrInfoVO>";
						        }
						        if (this.checkIfHasUpSpeed(attrVO)) {
							        var attrData = {
								        "attrCd" : attrVO.attrCd,
								        "attrValue" : "",
								        "operKind" : 1,
								        // "attrValueId" :
								        // AttrUtil.getDefaultValueId(attrVO,
								        // attrVO.defaultValue),
								        "attrInstId" : -1,
								        "attrName" : attrVO.attrName,
								        "valueExpressions" : (attrVO.attrValueExpressionsVO && attrVO.attrValueExpressionsVO.valueExpressions)
								                ? attrVO.attrValueExpressionsVO.valueExpressions
								                : ""
							        }
							        data += "<attrInfoVO>";
							        data += new LeafList(attrData).toString();
							        data += "</attrInfoVO>";
						        }
					        }
				        }
				        return data;
			        },
			        
			        /**
			         * 获取促销政策明细项规格数据
			         */
			        getPromotionItemValue : function(salesPromotionItemList){
			        	var data = {};
			        	dojo.forEach(salesPromotionItemList||[],function(oneItem){
			        		var attrVO = oneItem.attrSpec;//属性规格
			        		if(attrVO.isFeeAttr == 1){//费用相关属性
								if(attrVO.valueUnit == "D12"){//分为单位
									data[attrVO.attrCd] = oneItem.attrValue?oneItem.attrValue:"";
								}else if(attrVO.valueUnit == "D8"){//元为单位
									data[attrVO.attrCd] = oneItem.attrValue?oneItem.attrValue*100:"";
								}
			        		}else{//非费用属性
			        			data[attrVO.attrCd] = oneItem.attrValue?oneItem.attrValue:"";
			        		}
			        	});
			        	return data;
			        },
			        
			        /**
					 * 获取属性提交的默认值
					 */
			        getAttrDefaultValueList : function(attrList) {
				        var data = {};
				        if (!!attrList) {
					        for(var key in attrList){
					        	if(!attrList.hasOwnProperty(key)){
					        		continue;
					        	}
						        var attrVO = attrList[key];
						        if (attrVO.defaultValue != "") {
							        var attrData = {
								        "attrCd" : attrVO.attrCd,
								        "attrValue" : attrVO.defaultValue,
								        "operKind" : 1,
								        // "attrValueId" :
								        // AttrUtil.getDefaultValueId(attrVO,
								        // attrVO.defaultValue),
								        "attrInstId" : -1,
								        "attrName" : attrVO.attrName,
								        "valueExpressions" : (attrVO.attrValueExpressionsVO && attrVO.attrValueExpressionsVO.valueExpressions)
								                ? attrVO.attrValueExpressionsVO.valueExpressions
								                : ""
							        }
							        var convertValue = attrVO.defaultValue;
							        if(!!convertValue && !isNaN(convertValue)){							        	
										if(attrVO.valueUnit == AttrUnitConst.minuteConst){
											convertValue = parseFloat(convertValue+"")/100;
										}
							        }
							        // data[attrVO.attrCd] = attrData;
							        data[attrVO.attrCd] = attrVO.attrValue ? attrVO.attrValue : convertValue;
						        }else if (attrVO.nullable==false&&!attrVO.defaultValue){
						        	return {};
						        }
					        }
				        }
				        return data;
			        },
			        
			        
			        checkIfHasUpSpeed : function(attrVO) {
				        var attrRelaList = attrVO.attrRelaList;
				        if (attrRelaList) {
					        for (var i = 0; i < attrRelaList.length; i++) {
						        var attrRelaVO = attrRelaList[i];
						        // 代表是对于属性进行升速操作--稍后换成常量
						        if (attrRelaVO.attrRelaType == 7) { return true; }
					        }
				        }
				        return false;
			        },
			        // getDefaultValueId : function(attrVO, value) {
			        // if (attrVO.valueFetchType ==
			        // ATTRCONSTVALUE.ENUM_FATCH_TYPE
			        // || attrVO.valueFetchType ==
			        // ATTRCONSTVALUE.PARAM_FATCH_TYPE) {
			        // for (var i = 0, len =
			        // attrVO.attrValueList.length; i < len; i++) {
			        // var attrValue = attrVO.attrValueList[i];
			        // if (attrValue.attrValue == value) { return
			        // attrValue.attrValueId; }
			        // }
			        // }
			        // return -1;
			        // },
			        /**
					 * 判断可选值中是否包括默认值
					 */
			        ifDefaultValueInValueList : function(attrVO) {
				        if (!attrVO) { return false; }
				        var defaultValue = attrVO.defaultValue;
				        var valueList = attrVO.attrValueList;
				        if (valueList && valueList.length > 0) {
					        for (var p in valueList) {
						        var value = valueList[p];
						        if (value && defaultValue == value) { return true; }
					        }
				        }
				        return false;
			        }
		        },
		        _index_ = 1,
		        CommUtils = {
			        generateUniqueId : function() {
				        return _index_++;
			        }
		        },
		        protoToString = Object.prototype.toString,
		        converter = {
			        getValueIngnoreCase : function(key, object) {
				        for (var index in object) {
					        if (index.toLowerCase() == key.toLowerCase()) { return object[index]; }
				        }
			        },
			        toJavaString : function(value) {
				        return this.convertValue("java.lang.String", value);
			        },
			        toJavaInt : function(value) {
				        return this.convertValue("int", value);
				        
			        },
			        toJavaLong : function(value) {
				        return this.convertValue("long", value);
			        },
			        toJavaChar : function(value) {
				        return this.convertValue("char", value);
			        },
			        toJavaBoolean : function(value) {
				        return this.convertValue("boolean", value);
			        },
			        toJavaMap : function(value) {
				        
				        return this.convertValue("java.util.Map", value);
			        },
			        toJavaList : function(value) {
				        return this.convertValue("java.util.List", value);
				        
			        },
			        toJavaDate : function(value) {
				        return this.convertValue("java.util.Date", value);
			        },
			        convertValue : function(targetType, value) {
				        var type = protoToString.apply(value);
				        if (value === null || value === undefined) { return value; }
				        switch (targetType) {
					        case "java.lang.String" :
						        if (dojo.isString(value)) {
							        return value;
						        } else if (/Number/i.test(type) || /Boolean/i.test(type)) {
							        return value.toString();
						        } else if (/Object/.test(type) || /Array/.test(type)) { return dojo.toJson(value); }
						        break;
					        case "java.lang.Integer" :
					        case "int" :
					        case "java.lang.Long" :
					        case "long" :
						        if (/Number/i.test(type)) {
							        return value;
						        } else if (value) {
							        try {
								        return parseInt(value);
							        }
							        catch (e) {

							        }
						        }
						        break;
					        case "java.math.BigDecimal" :
					        case "java.lang.Double" :
					        case "double" :
					        case "java.lang.Float" :
					        case "float" :
						        if (/Number/i.test(type)) {
							        return value;
						        } else if (value) {
							        try {
								        return parseFloat(value);
							        }
							        catch (e) {

							        }
						        }
						        break;
					        case "java.lang.Boolean" :
					        case "boolean" :
						        return !!value;
						        break;
					        case "char" :
					        case "java.lang.Character" :
						        if (/String/i.test(type)) { return value.substring(0, 1); }
						        break;
					        case "java.util.Date" :
					        case "java.sql.Date" :
						        if (/String/i.test(type)) {
							        return value;
							        
						        } else if (/Number/i.test(type)) {
							        
							        var date = new Date(value),
								        fullYear = date.getFullYear(),
								        month = date.getMonth() + 1;
							        date = date.getDate();
							        return fullYear.toString() + month.toString() + date.toString();
							        
						        }
						        break;
					        case "java.util.Map" :
						        if (/Object/.test(type)) { return value; }
					        case "java.util.List" :
						        if (/Array/i.test(type)) {

						        return value; }
				        }
				        
			        }
			        
		        };
	        dojo.declare("orderaccept.prodofferaccept.util.BeanBuildFactoryProvider", [], {
		        /**
				 * generate prodoffer bean build factory
				 * 
				 * @deprecated
				 * @method
				 */
		        getPOBBFInstance : function() {
			        var instance = {},
				        // need refactoring later
				        voNameList = [],
				        dataTemplate = ServiceFactory
				                .getService("class:com.neusoft.crm.ordermgr.business.common.util.BeanMap")
				                .getProdOfferOrderTypeMap();
			        dojo.mixin(instance, converter);
			        for (var index in dataTemplate) {
				        var parts = /^com\.(?:.*?)\.(\w+)$/.exec(index);
				        if (parts) {
					        voNameList.push({
						                simpleName : parts[1],
						                name : parts[0]
					                });
				        }
				        
			        }
			        instance.metaData = dataTemplate;
			        dojo.forEach(voNameList, function(h) {
				                instance["get" + h.simpleName] = function(rawData) {
					                var cloneObj = dojo.clone(dataTemplate[h.name]);
					                for (var index in cloneObj) {
						                var convertedValue = this.convertValue(cloneObj[index], this
						                                .getValueIngnoreCase(index, rawData));
						                if (convertedValue != null
						                        && !(typeof convertedValue == 'number' && isNaN(convertedValue))) {
							                cloneObj[index] = convertedValue;
						                } else {
							                try {
								                delete cloneObj[index];
							                }
							                catch (e) {

							                }
						                }
						                
					                }
					                return cloneObj;
				                };
				                
			                });
			        return instance;
		        },
		        /**
				 * 
				 * @method
				 */
		        getInstance : function() {
			        var instance = {},
				        // need refactoring later
				        voNameList = [],
				        dataTemplate = ServiceFactory
				                .getService("class:com.neusoft.crm.ordermgr.common.custorderacceptinfo.util.TypeInspector")
				                .inspectType("com.neusoft.crm.ordermgr.common.custorderacceptinfo.data.CustOrderAcceptInfoVO");
			        dojo.mixin(instance, converter);
			        for (var index in dataTemplate) {
				        var parts = /^com\.(?:.*?)\.(\w+)$/.exec(index);
				        if (parts) {
					        voNameList.push({
						                simpleName : parts[1],
						                name : parts[0]
					                });
				        }
				        
			        }
			        instance.metaData = dataTemplate;
			        dojo.forEach(voNameList, function(h) {
				                instance["get" + h.simpleName] = function(rawData) {
					                var cloneObj = dojo.clone(dataTemplate[h.name]);
					                for (var index in cloneObj) {
						                var convertedValue = this.convertValue(cloneObj[index], this
						                                .getValueIngnoreCase(index, rawData));
						                if (convertedValue != null
						                        && !(typeof convertedValue == 'number' && isNaN(convertedValue))) {
							                cloneObj[index] = convertedValue;
						                } else {
							                try {
								                delete cloneObj[index];
							                }
							                catch (e) {

							                }
						                }
						                
					                }
					                return cloneObj;
				                };
				                
			                });
			        return instance;
		        }
		        
	        });
	        
	        /**
			 * 初始化常量类 对应的java常量类 ProductTypeConst ----产品类型
			 * ProductFuncTypeConst ----产品类型
			 */
	        (function() {
		        var constValueStr = ServiceFactory
		                .getService("url:prodOfferSaleAjaxAction.do?method=getAllConstValues");
		        for (var p in constValueStr) {
			        orderaccept.prodofferaccept.util[p] = constValueStr[p];
		        }
		        var wideAttrParamValue = ServiceFactory.getService("url:prodOfferSaleAjaxAction.do?method=getUserTypeAndSpeedRelation");
		        orderaccept.prodofferaccept.util['wideAttrParamValue'] = wideAttrParamValue;
	        })();
	        
	        /**
			 * 将页面卡片赋值到页面 初始化实例属性信息
			 */
	        var setAttrInst = function(attrInstList, busCardInstance) {
		        if (attrInstList) {
			        for (var p in attrInstList) {
				        var attrInfoVO = attrInstList[p];
				        if (attrInfoVO.attrCd) {
					        if (attrInfoVO.attrValue == undefined || attrInfoVO.attrValue == "undefined") {
						        if (busCardInstance.$(attrInfoVO.attrCd)
						                && busCardInstance.$(attrInfoVO.attrCd) != null) {
							        busCardInstance.$(attrInfoVO.attrCd).value = "";
						        }
					        } else {
						        if (busCardInstance.$(attrInfoVO.attrCd)
						                && busCardInstance.$(attrInfoVO.attrCd) != null) {
							        busCardInstance.$(attrInfoVO.attrCd).value = attrInfoVO.attrValue;
						        }
					        }
				        }
			        }
		        }
	        };
	        /**
	         * 初始化实例属性值，上面那个方法不对
	         */
	        var initProdAttrInst = function(attrInstList, busCardInstance){
	        	  attrObj = {};
	              dojo.forEach(attrInstList, function(attrVO) {
		                        attrObj[attrVO.attrCd] = validateValue(attrVO.attrValue)?attrVO.attrValue:"";
	                        });	             
	              busCardInstance.renderDefaultValue(attrObj);  
	        };
	        /**
			 * 验证属性值是否合法
			 * 
			 * @method
			 */
            var validateValue = function(value) {
                return value && value != 'undefined' && value != 'null';
                
            };
	        var DomHelper = {
		        findParentNode : function(node, cb) {
			        var parentNode = node.parentNode;
			        while (parentNode && parentNode != parentNode.parentNode) {
				        if (cb(parentNode)) {
					        return parentNode;
				        } else {
					        parentNode = parentNode.parentNode;
				        }
				        
			        }
			        
		        },
		        /**
				 * 获取元素的left值
				 */
		        getLeft : function(element) {
			        var oLeft = dojo.position(element, true).x;
			        return oLeft;
		        },
		        /**
				 * 获取元素的top值
				 */
		        getTop : function(element) {
			        var oTop = dojo.position(element, true).y;
			        return oTop;
		        },
		        /**
				 * 获取元素宽度
				 */
		        getWidth : function(element) {
			        return element.offsetWidth;
		        },
		        /**
				 * 获取元素宽度
				 */
		        getHeight : function(element) {
			        return element.offsetHeight;
		        },
		        getParentWidget : function(domNode, widgetName) {
			        var target = domNode,
				        widgetId = -1,
				        widget = null;
			        while (true) {
				        var widget = dijit.getEnclosingWidget(target);
				        if (!widget) { return null; }
				        if (widget.declaredClass === widgetName) {
					        break;
				        }
				        if (widgetId != widget.id) {
					        target = widget.domNode;
				        } else {
					        target = widget.domNode.parentNode;
				        }
				        widgetId = widget.id;
			        }
			        return widget;
		        },
		        enableTitle : function(selectNode) {
			        if (selectNode && selectNode.tagName && selectNode.tagName.toUpperCase() == 'SELECT') {
				        var optionList = selectNode.options || [];
				        dojo.forEach(optionList, function(optionNode) {
					                optionNode.title = optionNode.text;
				                });
				        
			        }
			        
		        }
		        
	        };
	        var CustOrderVOHelper = function() {
		        var _clazz = dojo.declare("", [], {
			        custOrderVO : null,
			        constructor : function(custOrderVO) {
				        this.custOrderVO = custOrderVO;
			        },
			        bind : function(custOrderVO) {
				        this.custOrderVO = custOrderVO;
			        },
			        getItemRelationList : function() {
				        var _r = [],
					        protoPush = Array.prototype.push;
				        dojo.forEach(this.custOrderVO.serviceProdItemInfoList || [], function(item) {
					                var itemRelationList = item.itemRelationInfoList || [];
					                protoPush.apply(_r, itemRelationList);
					                
				                });
				        dojo.forEach(this.custOrderVO.prodItemInfoList || [], function(item) {
					                var itemRelationList = item.itemRelationInfoList || [];
					                protoPush.apply(_r, itemRelationList);
					                
				                });
				        dojo.forEach(this.custOrderVO.accessProdItemInfoList || [], function(item) {
					                var itemRelationList = item.itemRelationInfoList || [];
					                protoPush.apply(_r, itemRelationList);
					                
				                });
				        dojo.forEach(this.custOrderVO.offerItemInfoList || [], function(item) {
					                var itemRelationList = item.itemRelationInfoList || [];
					                protoPush.apply(_r, itemRelationList);
					                
				                });
				        return _r;
				        
			        },
			        custOrder2pageSnapshot : function() {
				        var independenceOfferItemList = this.getIndependenceItemList();
				        var helper = this;
				        var mainOfferItemList = this.getMainProdOfferItemList();
				        var accessProdItemList = this.getAccessProdItemList();
				        var offerCombMemberRelaType = ConstantsPool.load("ItemRelationTypeConst").ItemRelationTypeConst.OFFER_COMB_MEMBER;
				        var offerProdRelaType = ConstantsPool.load("ItemRelationTypeConst").ItemRelationTypeConst.OFFER_PRODUCT;
				        var selectedMemberProdOfferList = [];
				        var mainOfferItemVO = null;
				        var processId = "sharedProdOfferInstall";
				        if (independenceOfferItemList.length > 0) {
					        processId = "independenceProdOfferInstall";
					        var independenceOfferItemVO = mainOfferItemVO = independenceOfferItemList[0];
					        var relationList = independenceOfferItemVO.itemRelationInfoList || [];
					        var combMembRelaList = BusCard.jsonPath(relationList, "$[?(@.orderRelType=='"
					                        + offerCombMemberRelaType + "')]")
					                || [];
					    dojo.forEach(combMembRelaList, function(rela) {
			                var memberProdOfferItem = helper.filterOrderItemList(function(item) {
				                        return item.orderItemId == rela.zorderItemId;
			                        })[0];
			                        
			                var itemRelaList = dojo.filter(memberProdOfferItem.itemRelationInfoList
			                                || [], function(item1) {
				                        return item1.orderRelType == offerProdRelaType;
			                        });
			                if(itemRelaList.length==0){
			                	return ;
			                }
			                var accessProdItemId = itemRelaList[0].zorderItemId;
			                
			                var accessProdItemVO = helper.filterOrderItemList(function(i) {
				                        return i.orderItemId == accessProdItemId&&i.prodFuncType=='101';
			                        })[0];
			                        
			                if(!accessProdItemVO){
			                	return ;
			                }
			                        
			                selectedMemberProdOfferList.push({
				                productId : accessProdItemVO.productId,
				                prodOfferId : memberProdOfferItem.prodOfferId,
				                offerItemVO : memberProdOfferItem,
				                prodItemVO : accessProdItemVO,
				                action : 'new'
			                });
		                });
					        
				        } else {
					        mainOfferItemVO = mainOfferItemList[0];
					        selectedMemberProdOfferList = dojo.map(accessProdItemList, function(prodItemVO) {
						                return {
							                productId : prodItemVO.productId,
							                prodOfferId : mainOfferItemList[0].prodOfferId,
							                prodItemVO : prodItemVO,
							                offerItemVO : mainOfferItemList[0],
							                action : 'new'
							                
						                }
						                
					                })
					        
				        }
				        return {
					        processId : processId,
					        mainOfferItemVO : mainOfferItemVO,
					        selectedMemberProdOfferList : selectedMemberProdOfferList
				        };
			        },
			        getIndependenceItemList : function() {
				        return BusCard.jsonPath(this.custOrderVO, "$.offerItemInfoList[?(@.bundleType==2)]") || [];
				        
			        },
			        getAccessProdItemList : function() {
				        return this.custOrderVO.accessProdItemInfoList
				                || BusCard.jsonPath(this.custOrderVO, "$.prodItemInfoList[?(@.serviceId!=null)]") || [];
				        
			        },
			        getServiceProdItemList : function() {
				        return this.custOrderVO.serviceProdItemInfoList
				                || BusCard.jsonPath(this.custOrderVO, "$.prodItemInfoList[?(@.serviceId==null)]") || [];
				        
			        },
			        filterOrderItemList : function(cb) {
				        var accessProdItemInfoList = this.custOrderVO.accessProdItemInfoList || [],
					        serviceProdItemInfoList = this.custOrderVO.serviceProdItemInfoList || [],
					        prodItemInfoList = this.custOrderVO.prodItemInfoList || [],
					        offerItemList = this.custOrderVO.offerItemInfoList || [];
				        return dojo.filter([].concat(accessProdItemInfoList, prodItemInfoList, serviceProdItemInfoList,
				                        offerItemList), cb);
				        
			        },
			        getMainProdOfferItemList : function() {
				        var accessProdItemList = this.getAccessProdItemList(),
					        helper = this,
					        _r = [],
					        protoPush = Array.prototype.push,
					        itemRelationList = this.getItemRelationList(),
					        offerProdRelType = ConstantsPool.load("ItemRelationTypeConst").ItemRelationTypeConst.OFFER_PRODUCT;
				        
				        dojo.forEach(accessProdItemList, function(accessProdItem) {
					                var orderItemId = accessProdItem.orderItemId;
					                protoPush.apply(_r, dojo.map(dojo.filter(itemRelationList, function(rela) {
						                                        return rela.zorderItemId == orderItemId
						                                                && rela.orderRelType == offerProdRelType;
						                                        
					                                        }), function(rela) {
						                                return BusCard.jsonPath(helper.custOrderVO.offerItemInfoList,
						                                        "$[?(@.orderItemId==" + rela.aorderItemId + ")]")[0];
					                                }));
					                
				                });
				        
				        return _r;
				        
			        },
			        /**
					 * 根据上级销售品订单项查询所有管理的可选包
					 * 
					 * @param {String|Number} orderItemId
					 * @method
					 */
			        getSubProdOfferItemList : function(orderItemId) {
				        var _helper = this;
				        var offerRelaType = ConstantsPool.load("ItemRelationTypeConst").ItemRelationTypeConst.OFFER_RELA;
				        var upOrderItem = this.filterOrderItemList(function(item) {
					                return item.orderItemId == orderItemId;
				                })[0];
				        var defaultResult = [];
				        if (upOrderItem) {
					        var itemRelationInfoList = upOrderItem.itemRelationInfoList || [];
					        defaultResult = dojo.map(dojo.filter(itemRelationInfoList, function(rela) {
						                        return rela.orderRelType == offerRelaType;
						                        
					                        }), function(targetRela) {
						                return _helper.filterOrderItemList(function(targetItem) {
							                        return targetItem.orderItemId == targetRela.zorderItemId;
						                        })[0];
						                
					                })
					        
				        }
				        return defaultResult;
			        },
			        /**
					 * 通过销售品订单项获取该销售品适用的产品订单项
					 */
			        getAcessProdItem : function(currentProdOfferOrderItem) {
				        
				        var offerProdRelType = ConstantsPool.load("ItemRelationTypeConst").ItemRelationTypeConst.OFFER_PRODUCT;
				        var productRelaType = ConstantsPool.load("ItemRelationTypeConst").ItemRelationTypeConst.PRODUCT_RELA;
				        var OPTIONAL_PACKAGE_ACCESS_PRODUCT = ConstantsPool.load("ItemRelationTypeConst").ItemRelationTypeConst.OPTIONAL_PACKAGE_ACCESS_PRODUCT;
				        
				        // 找出所有的产品订单项挂的订单项关系
				        var itemRelationInfoList = this.getItemRelationList();
				        
				        // 找出和当前销售品关系销售品产品关系的集合
				        var currentItemRelationList = BusCard.jsonPath(currentProdOfferOrderItem.itemRelationInfoList
				                        || [], "$[?(@.orderRelType==" + offerProdRelType + "&&@.aorderItemId=="
				                        + currentProdOfferOrderItem.orderItemId + ")]")
				                || [];
				        var usedByRelationList = BusCard.jsonPath(currentProdOfferOrderItem.itemRelationInfoList || [],
				                "$[?(@.orderRelType==" + OPTIONAL_PACKAGE_ACCESS_PRODUCT + "&&@.aorderItemId=="
				                        + currentProdOfferOrderItem.orderItemId + ")]")
				                || [];
				        if (currentItemRelationList.length > 0) {
					        var itemRelationInfo = BusCard.jsonPath(itemRelationInfoList || [], "$[?(@.orderRelType=="
					                        + productRelaType + "&&@.zorderItemId=="
					                        + currentItemRelationList[0].zorderItemId + ")]")[0];
					        return (itemRelationInfo && BusCard.jsonPath(this.getAccessProdItemList() || [],
					                "$[?(@.orderItemId==" + itemRelationInfo.aorderItemId + ")]")[0]);
				        } else if (usedByRelationList.length > 0) {
					        return (BusCard.jsonPath(this.getAccessProdItemList() || [], "$[?(@.orderItemId=="
					                        + usedByRelationList[0].zorderItemId + ")]")[0]);
					        
				        } else {
					        return null;
				        }
			        },
			        /**
					 * 获取销售品订单项对应的产品订单项信息
					 */
			        getServiceProdItemListForOfferItem : function(currentProdOfferOrderItem) {
				        var _helper = this;
				        var offerProdRelType = ConstantsPool.load("ItemRelationTypeConst").ItemRelationTypeConst.OFFER_PRODUCT;
				        var currentItemRelationList = BusCard.jsonPath(currentProdOfferOrderItem.itemRelationInfoList
				                        || [], "$[?(@.orderRelType==" + offerProdRelType + "&&@.aorderItemId=="
				                        + currentProdOfferOrderItem.orderItemId + ")]");
				        return dojo.filter(_helper.getServiceProdItemList() || [], function(item) {
					                return dojo.some(currentItemRelationList, function(itemRela) {
						                        return item.orderItemId == itemRela.zorderItemId
						                                && itemRela.orderRelType == offerProdRelType;
					                        });
				                });
			        }
			        
		        });
		        return {
			        getInstance : function(custOrderVO) {
				        return new _clazz(custOrderVO);
			        }
			        
		        }
		        
	        }();
	        /**
			 * 等待条
			 */
	        var WaitingBar = function() {
		        var _clazz = dojo.declare("", [], {
			        WaitingBarObj : null,
			        default_msg : "系统运行中,请稍候...",
			        msg : null,
			        className_waitingBarBox : "waitingBarNewBox",
			        className_waitingBar : "waitingBarNew",
			        className_waitingBarTD : "waitingBarNewTD",
			        isWaiting : false,
			        constructor : function() {

			        },
			        isValid : function(obj) {
				        if (obj == null || typeof obj == "undefined") {
					        return false;
				        } else {
					        return true;
				        }
			        },
			        initMe : function() {
				        var _bar = this;
				        var temp_obj = $("divWaitingBar");
				        
				        if (this.isValid(temp_obj)) { return; }
				        
				        this.msg = this.default_msg;
				        
				        this.WaitingBarObj = document.createElement("div");
				        this.WaitingBarObj.id = "divWaitingBar";
				        this.WaitingBarObj.style.display = "none";
				        this.WaitingBarObj.className = this.className_waitingBarBox;
				        BusCard.addEventListener(_bar.WaitingBarObj, 'blur', function() {
					                _bar.alwaysFocus();
				                });
				        
				        var htmlStr = "";
				        htmlStr += "<table onselectstart=\"return false;\"  cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\" valign=\"middle\" height=\"100%\"><tr><td align=\"center\" valign=\"middle\" >";
				        htmlStr += "<table class=\"" + this.className_waitingBar + "\" >";
				        htmlStr += "<tr><td align=\"center\" id=\"divWaitingBar_Content\" class=\""
				                + this.className_waitingBarTD + "\"><b>&#160;&#160;&#160;&#160;";
				        htmlStr += "<span id=\"waitingBarMsg\"></span></b></td></tr>";
				        htmlStr += "</table>";
				        htmlStr += "</td></tr></table>";
				        htmlStr += "<iframe border=\"0\" frameborder=\"0\" style=\"position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:-1;border:0px solid #ffffff\" ></iframe>";
				        
				        this.WaitingBarObj.innerHTML = htmlStr;
				        
				        document.body.appendChild(this.WaitingBarObj);
				        BusCard.addEventListener(document.body, 'click', function() {
					                _bar.waiting();
				                });
			        },
			        toggleWaitingLayer : function(flag) {
				        var html = "<iframe  id='waitingLayer'  border=\"0\" frameborder=\"0\" style=\"filter:Alpha(opacity=75);opacity:0.5;position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:10;background-color:silver;border:0px solid #ffffff\" ></iframe>";
				        if (!dojo.byId('waitingLayer')) {
					        dojo.place(html, document.body, "last");
				        }
				        dojo.byId('waitingLayer').style.height = Math.max(document.body.offsetHeight,
				                document.body.scrollHeight)
				                + "px";
				        if (flag) {
					        dojo.byId('waitingLayer').style.display = "block";
					        
				        } else {
					        dojo.byId('waitingLayer').style.display = "none";
				        }
				        
			        },
			        alwaysFocus : function() {
				        var _bar = this;
				        if (_bar.WaitingBarObj.style.display != "none") {
					        _bar.WaitingBarObj.focus();
				        }
			        },
			        showMe : function(flag) {
				        try {
					        var Yoffset = -10;
					        if (!this.isValid(flag) || flag) {
						        $("waitingBarMsg").innerHTML = this.msg
						        this.WaitingBarObj.style.display = "block";
						        // var t = document.body.scrollTop
						        // + (document.body.clientHeight -
						        // this.WaitingBarObj.offsetHeight)
						        // / 2 + Yoffset;
						        // t = t < 1 ? 1 : t;
						        // this.WaitingBarObj.style.top =
						        // parseInt(t) + "px";
						        // this.WaitingBarObj.style.height =
						        // document.body.clientHeight + "px";
						        // this.WaitingBarObj.style.top =
						        // "0px";
						        this.WaitingBarObj.focus();
						        this.toggleWaitingLayer(true);
						        this.isWaiting = true;
					        } else {
						        this.WaitingBarObj.style.display = "none";
						        this.WaitingBarObj.blur();
						        this.isWaiting = false;
						        this.toggleWaitingLayer(false);
					        }
					        
				        }
				        catch (e) {}
			        },
			        hideMe : function() {
				        this.showMe(false);
			        },
			        waiting : function() {
				        var _bar = this;
				        if (_bar.isWaiting) {
					        event.cancelBubble = true;
					        event.returnValue = false;
					        return false;
				        }
			        }
			        
		        });
		        return {
			        getInstance : function() {
				        return new _clazz();
			        }
		        }
		        
	        }();
	        var bindTypeMap = {
		        0 : 'single',
		        1 : 'comb',
		        2 : 'independence'
	        };
	        /**
			 * 销售品变更分析类
			 * 
			 * @class
			 */
	        var MainProdOfferChangeHelper = dojo.declare("", [], {
		                bindTypeMap : bindTypeMap,
		                notSupportPrompt : "\u6682\u4e0d\u652f\u6301\u6b64\u7c7b\u53d8\u66f4,",
		                prodOfferId : null,
		                prodOfferInstId : null,
		                offerInstVO : null,
		                oldProdOfferInfoVO : null,
		                newProdOfferInfoVO : null,
		                cb : null,
		                processId : null,
		                constructor : function(param) {
			                this.prodOfferId = param.prodOfferId;
			                this.cb = param.callback;
		                },
		                dispatch : function() {
			                var self = this;
			                this.prodOfferInstId = $ac$.get("requestParam").prodOfferInstId;
			                var userHasProdOfferInfoList = $ac$.get("userHasProdOfferInfoList");
			                this.offerInstVO = BusCard.jsonPath(userHasProdOfferInfoList, "$[?(@.prodOfferInstId=="
			                                + this.prodOfferInstId + ")]")[0];
			                this.oldProdOfferInfoVO = $ac$.cache("prodOfferId-" + this.offerInstVO.prodOfferId, {
				                        permitFromCache : true,
				                        permitCache : true,
				                        callback : function() {
					                        return ServiceFactory.getService("spring:innerInterfaceBO")
					                                .getProdOfferInfo({
						                                        prodOfferId : self.offerInstVO.prodOfferId,
						                                        interfaceType : 1
					                                        })
				                        }
				                        
			                        })

			                ;
			                
			                this.newProdOfferInfoVO = ServiceFactory.getService("spring:prodOfferSaleDataBO")
			                        .getProdOfferInfo({
				                                prodOfferId : this.prodOfferId,
				                                interfaceType : 1
			                                });
			                this.currentProcessId = this.bindTypeMap[this.oldProdOfferInfoVO.bindType] + "2"
			                        + this.bindTypeMap[this.newProdOfferInfoVO.bindType];
			                var paymentPrompt = doPaymentChgCheck(this.newProdOfferInfoVO, this.oldProdOfferInfoVO,
			                        this.offerInstVO);
			                if (paymentPrompt.code < 0) {
				                // alert(paymentPrompt.message);
				                messageBox.alert({
					                        busiCode : "08410161",
					                        infoList : [paymentPrompt.message]
				                        });
				                return false;
			                }
			                if ((this.prodOfferId == this.oldProdOfferInfoVO.prodOfferId) && this.needCheckSameOffer()) {
				                // alert("\u9500\u552e\u54c1[" +
				                // this.newProdOfferInfoVO.prodOfferName
				                // +
				                // "]\u4e0d\u80fd\u53d8\u66f4\u4e3a\u81ea\u5df1,\u8bf7\u786e\u8ba4");
				                messageBox.alert({
					                        busiCode : "08410162",
					                        infoList : [this.newProdOfferInfoVO.prodOfferName]
				                        });
				                return false;
				                
			                } else {
				                $ac$.set("currentProcessId", this.currentProcessId);
				                this[this.currentProcessId]();
			                }
			                
			                // 
		                },
		                needCheckSameOffer : function() {
			                return true;
		                },
		                asyncRequestData : function(cb) {
			                var helper = this;
			                var prodOfferInfoVO = ProdOfferHelper.loadAndSetProdOffer(helper.prodOfferId, {
				                        interfaceType : 4,
				                        permitCache : true
			                        });
			                $ac$.set("currentMainProdOfferInfoVO", prodOfferInfoVO);
			                $ac$.set("prodOfferList", [prodOfferInfoVO]);
			                cb(prodOfferInfoVO);
			                
			                // ServiceFactory.getService("spring:innerInterfaceBO").getProdOfferInfo({
			                // prodOfferId : helper.prodOfferId,
			                // interfaceType : 4
			                // }, function(prodOfferInfoVO) {
			                // $ac$.set("currentMainProdOfferInfoVO",
							// prodOfferInfoVO);
			                // $ac$.set("prodOfferList",
							// [prodOfferInfoVO]);
			                // cb(prodOfferInfoVO);
			                
			                // });
			                
		                },
		                prompt : function() {
			                var o = this.oldProdOfferInfoVO.bindType;
			                var n = this.newProdOfferInfoVO.bindType;
			                // alert(this.notSupportPrompt +
			                // "bindType[" + o + "->" + n + "]");
			                messageBox.alert({
				                        busiCode : "08410163",
				                        infoList : [this.notSupportPrompt, o, n]
			                        });
			                return false;
		                },
		                single2single : function() {
			                var helper = this;
			                this.asyncRequestData(function(currentMainProdOfferInfoVO) {
				                        helper.cb(helper.currentProcessId, currentMainProdOfferInfoVO);
			                        });
			                
		                },
		                single2comb : function() {
			                var helper = this;
			                this.asyncRequestData(function(currentMainProdOfferInfoVO) {
				                        helper.cb(helper.currentProcessId, currentMainProdOfferInfoVO);
			                        });
			                
		                },
		                single2independence : function() {
			                var helper = this;
			                this.asyncRequestData(function(currentMainProdOfferInfoVO) {
				                        helper.cb(helper.currentProcessId, currentMainProdOfferInfoVO);
			                        });;
		                },
		                comb2single : function() {
			                var helper = this;
			                return helper.prompt();
			                this.asyncRequestData(function(currentMainProdOfferInfoVO) {
				                        helper.cb(helper.currentProcessId, currentMainProdOfferInfoVO);
			                        });
			                
		                },
		                comb2comb : function() {
			                var helper = this;
			                return helper.prompt();
			                this.asyncRequestData(function(currentMainProdOfferInfoVO) {
				                        helper.cb(helper.currentProcessId, currentMainProdOfferInfoVO);
			                        });
			                
		                },
		                comb2independence : function() {
			                var helper = this;
			                return helper.prompt();
			                this.asyncRequestData(function(currentMainProdOfferInfoVO) {
				                        helper.cb(helper.currentProcessId, currentMainProdOfferInfoVO);
			                        });
			                
		                },
		                independence2single : function() {
			                var helper = this;
			                return helper.prompt();
			                this.asyncRequestData(function(currentMainProdOfferInfoVO) {
				                        helper.cb(helper.currentProcessId, currentMainProdOfferInfoVO);
			                        });
		                },
		                independence2comb : function() {
			                var helper = this;
			                return helper.prompt();
			                this.asyncRequestData(function(currentMainProdOfferInfoVO) {
				                        helper.cb(helper.currentProcessId, currentMainProdOfferInfoVO);
			                        });
			                
		                },
		                independence2independence : function() {
			                var helper = this;
			                this.asyncRequestData(function(currentMainProdOfferInfoVO) {
				                        helper.cb(helper.currentProcessId, currentMainProdOfferInfoVO);
			                        });
			                
		                }
		                
	                });
	        // provider factory method
	        MainProdOfferChangeHelper.getInstance = function() {
		        return new this(arguments[0]);
	        };
	        /**
			 * 预后互转的检测
			 */
	        var doPaymentChgCheck = function(newProdOfferInfoVO, oldProdOfferInfoVO, offerInstVO) {
		        var resultData = "";
		        var util = orderaccept.prodofferaccept.util;
		        var requestParam = dojo.global.$appContext$.get("requestParam");
		        var offerInfoVO = newProdOfferInfoVO;
		        var oldOfferVO = oldProdOfferInfoVO;
		        var PaymentModeConst = ConstantsPool.load("PaymentModeConst").PaymentModeConst;
		        if (!!oldOfferVO) {
			        if (("" + oldOfferVO.feeType).substring(0, 2) != ("" + offerInfoVO.feeType).substring(0, 2)) {
				        var param = "prodOfferInstId="+offerInstVO.prodOfferInstId;
				        resultData = ServiceFactory
				                .getService("url:prodOfferSaleAjaxAction.do?method=doPaymentChgCheck&" + param);
			        }
		        }
		        return resultData;
		        
	        };
	        var IndependenceMemberChangeDataManager = dojo.declare("", [], {

	        });
	        // 构建与具体场景绑定的数据管理类
	        var managers = {
		        independenceMemberChange : {

		        }
		        
	        };
	        $ac$.set("DataManager", {
		                getInstance : function() {
			                return managers[$ac$.get("processId")];
		                }
	                });
	        
	        var DateHelper = function() {
		        var append = function(s) {
			        return s.length == 1 ? "0" + s : s;
		        };
		        var format = function(date, simple) {
			        var type = Object.prototype.toString.apply(date);
			        if (/Number/i.test(type)) {
				        date = new Date(date);
				        
			        } else if (/String/i.test(type) && /^\d+$/.test(date)) {
				        date = new Date(parseInt(date))
			        } else if (/Date/i.test(type)) {
				        
				        date = date;
			        }
			        
			        if (date instanceof Date) {
				        var y = "" + date.getFullYear(),
					        M = "" + (date.getMonth() + 1),
					        d = "" + (date.getDate()),
					        h = "" + (date.getHours()),
					        m = "" + (date.getMinutes()),
					        s = "" + (date.getSeconds()),
					        firstPart = y + "-" + append(M) + "-" + append(d),
					        lastPart = " " + append(h) + ":" + append(m) + ":" + append(s);
				        return simple ? firstPart : (firstPart + lastPart);
				        
			        } else {
				        return date;
				        
			        }
			        
		        };
		        
		        return {
			        format : format,
			        formatDate : function(date) {
				        var iMonth = date.getMonth() + 1;
				        var sMonth = new String(iMonth);
				        if (sMonth.length == 1) {
					        sMonth = "0" + sMonth;
				        }
				        var iDate = date.getDate();
				        var sDate = new String(iDate);
				        if (sDate.length == 1) {
					        sDate = "0" + sDate;
				        }
				        var iHour = date.getHours();
				        var sHour = new String(iHour);
				        if (sHour.length == 1) {
					        sHour = "0" + sHour;
				        }
				        var iMin = date.getMinutes();
				        var sMin = new String(iMin);
				        if (sMin.length == 1) {
					        sMin = "0" + sMin;
				        }
				        var iSec = date.getSeconds();
				        var sSec = new String(iSec);
				        if (sSec.length == 1) {
					        sSec = "0" + sSec;
				        }
				        return date.getFullYear() + '-' + sMonth + '-' + sDate + ' ' + sHour + ':' + sMin + ':' + sSec;
			        },
			        getDateFromString : function(dateString, flag) {
				        if (!dateString) { return null; }
				        var oDate;
				        if (typeof dateString == 'number') {
					        oDate = new Date(dateString);
				        } else {
					        var dateArr = dateString.split(" ");
					        var dateYMD = dateArr[0].split("-");
					        var year = parseInt(dateYMD[0], 10);
					        var month = parseInt(dateYMD[1], 10) - 1;
					        var date = parseInt(dateYMD[2], 10);
					        var hour = "";
					        var min = "";
					        var sec = "";
					        if (dateArr[1] != null && dateArr[1] != undefined) {
						        var dateHMS = dateArr[1].split(":");
						        hour = parseInt(dateHMS[0], 10);
						        min = parseInt(dateHMS[1], 10);
						        sec = parseInt(dateHMS[2], 10);
					        }
					        if (flag && flag == 1) {// 预约销售品，开始时间只保留年月日
						        oDate = new Date(year, month, date);
					        } else {
						        oDate = new Date(year, month, date, hour, min, sec);
					        }
				        }
				        return oDate;
			        },
			        getFirstDayAfterPeriod : function() {
				        var today = dojo.global.$appContext$.requestParam.today;
				        // 获取当前系统时间
				        var todayDateType = this.getDateFromString(today, 1);
				        todayDateType.setDate(1);
				        return this.getDateFromString(this.format(todayDateType["setMonth"](todayDateType["getMonth"]()
				                + parseInt(1, 10))));
			        },
			        getStringFirstDayOFNextMonth : function() {
				        var today = dojo.global.$appContext$.requestParam.today;
				        // 获取当前系统时间
				        var todayDateType = this.getDateFromString(today, 1);
				        todayDateType.setDate(1);
				        return this.format(todayDateType["setMonth"](todayDateType["getMonth"]() + parseInt(1, 10)));
			        },
			        getPreTimeOfTargetTime : function(targetTime, preDays) {
				        var targetTimeDate = this.getDateFromString(targetTime);
//				        var timeString = Date.UTC(targetTimeDate.getFullYear(), targetTimeDate.getMonth(),
//				                targetTimeDate.getDate(), targetTimeDate.getHours(), targetTimeDate.getMinutes(),
//				                targetTimeDate.getSeconds());
				        var timeString = targetTimeDate.getTime();
				        var preString = parseInt(preDays, 10) * 1000 * 3600 * 24;
				        return this.format(timeString - preString);
			        },
			        compareDateValue : function(firstDate, secondDate) {
				        // 该方法用来比较两个时间值的大小，返回true，则传入的第一个时间大，返回false，则第二个时间大
				        if (this.getDateFromString(firstDate, true) > this.getDateFromString(secondDate, true)) { return true; }
				        return false;
			        },
			        /**
			         * 计算宽带标准化的时间
			         */
			        computationOfferStandardTime : function(beginDate,type,value){
			        	var endDate = null;
			        	beginDate = this.getDateFromString(beginDate);
			        	var currentTimeString = this.format(beginDate);
			        	if(type == StandardTypeConst.yearType){
			        		endDate = beginDate.setYear(beginDate.getFullYear()+parseInt(value,10));
			        	}else if(type == StandardTypeConst.halfYearType){
			        		endDate = beginDate.setMonth(beginDate.getMonth()+parseInt(value*6,10));
			        	}else if(type == StandardTypeConst.quarterType){
			        		endDate = beginDate.setMonth(beginDate.getMonth()+parseInt(value*3,10));
			        	}else{
			        		throw new error("系统不支持当前的协议期类型");
			        	}
			        	return {
			        		currentTimeString : currentTimeString,
			        		timeString : this.format(endDate)
			        	}
			        }
		        }
		        
	        }();
	        
	        var NavigatorManager = dojo.declare("", [], {
		                pages : ["mainProdOfferSelectPane", "prodOfferAcceptPane"],
		                currentPageId : null,
		                enableFlag : true,
		                
		                disable : function() {
			                this.enableFlag = false;
		                },
		                enable : function() {
			                this.enableFlag = true;
		                },
		                to : function(pageId) {
			                var self = this;
			                if (!this.enableFlag) { return BusCard.util.emptyFunction; }
			                dojo.forEach(this.pages, function(currentPageId) {
				                        var node = dojo.byId(currentPageId);
				                        if (node && node.style.display != 'none') {
					                        node.style.display = "none";
				                        }
				                        
			                        });
			                var selectedNode = dojo.byId(pageId);
			                this.currentPageId = pageId;
			                if (selectedNode) {
				                selectedNode.style.display = "block";
			                }
			                return function(cb) {
				                if (self.currentPageId == "mainProdOfferSelectPane") {
					                dojo.byId("scrollController").style.display = "none";
					                changeStep(2);
				                } else if (self.currentPageId == "prodOfferAcceptPane") {
					                dojo.byId("scrollController").style.display = "block";
					                changeStep(3);
				                }
				                return cb.apply(this, [self.currentPageId, selectedNode]);
			                };
		                }
		                
	                });
	        var WidgetHelper = function() {
		        var createDialog = function() {
			        dojo.require("unieap.dialog.Dialog");
			        var _postCreate_ex_old = unieap.dialog.Dialog.prototype._postCreate_ex;
			        unieap.dialog.Dialog.prototype._postCreate_ex = function() {
				        var result = _postCreate_ex_old.apply(this, arguments);
				        this.topContentNode.style.width = '98%';
				        this.topContentNode.style.styleFloat = this.topContentNode.style.cssFloat = "right";
				        return result;
			        };
			        return new unieap.dialog.Dialog(arguments[0], arguments[1], arguments[2], arguments[3],
			                arguments[4], arguments[5]);
			        
		        };
		        return {
			        createDialog : createDialog
		        };
		        
	        }();
	        // export to global
	        orderaccept.prodofferaccept.util.ACTION_CD_CONST = ActionCDConst;
	        orderaccept.prodofferaccept.util.ProdOfferHelper = ProdOfferHelper;
	        orderaccept.prodofferaccept.util.DateHelper = DateHelper;
	        orderaccept.prodofferaccept.util.WidgetProvider = WidgetProvider;
	        orderaccept.prodofferaccept.util.ServiceFactory = ServiceFactory;
	        orderaccept.prodofferaccept.util.CommUtils = CommUtils;
	        orderaccept.prodofferaccept.util.ProdOfferInstProvider = ProdOfferInstProvider;
	        orderaccept.prodofferaccept.util.RES_RELA_CONST = resRelaConst;
	        orderaccept.prodofferaccept.util.ServiceKindPrefixMap = ServiceKindPrefixMap;
	        orderaccept.prodofferaccept.util.ServiceKindCounter = ServiceKindCounter;
	        orderaccept.prodofferaccept.util.ProdOfferOrderCounter = ProdOfferOrderCounter;
	        orderaccept.prodofferaccept.util.PRODOFFERTYPE = PRODOFFERTYPE;
	        orderaccept.prodofferaccept.util.orderTypeObj = orderTypeObj;
	        orderaccept.prodofferaccept.util.AttrUtil = AttrUtil;
	        orderaccept.prodofferaccept.util.PRODUCTTYPE = PRODUCTTYPE;
	        orderaccept.prodofferaccept.util.SetAttrInst = setAttrInst;
	        orderaccept.prodofferaccept.util.initProdAttrInst = initProdAttrInst;
	        orderaccept.prodofferaccept.util.DomHelper = DomHelper;
	        orderaccept.prodofferaccept.util.OrderChangeProdvider = OrderChangeProdvider;
	        orderaccept.prodofferaccept.util.CustOrderVOHelper = CustOrderVOHelper;
	        orderaccept.prodofferaccept.util.T2ProdOfferConst = T2ProdOfferConst;
	        orderaccept.prodofferaccept.util.RoamProdConst = RoamProdConst;
	        orderaccept.prodofferaccept.util.MainProdOfferChangeHelper = MainProdOfferChangeHelper;
	        orderaccept.prodofferaccept.util.bindTypeMap = bindTypeMap;
	        orderaccept.prodofferaccept.util.DateHelper = DateHelper;
	        orderaccept.prodofferaccept.util.actionNameMap = actionNameMap;
	        orderaccept.prodofferaccept.util.OperKindConst = OperKindConst;
	        orderaccept.prodofferaccept.util.SpecAttrCdConst = SpecAttrCdConst;
	        orderaccept.prodofferaccept.util.OfferStandardAttrId = OfferStandardAttrId;
	        orderaccept.prodofferaccept.util.WaitingBar = WaitingBar;
	        orderaccept.prodofferaccept.util.AcceptCheckCount = AcceptCheckCount;
	        orderaccept.prodofferaccept.util.MainAuxiliaryCardRoleCDS = MainAuxiliaryCardRoleCDS;
	        orderaccept.prodofferaccept.util.navigatorManager = new NavigatorManager();
	        orderaccept.prodofferaccept.util.WidgetHelper = WidgetHelper;
	        orderaccept.prodofferaccept.util.AttrUnitConst = AttrUnitConst;
	        orderaccept.prodofferaccept.util.SpeedAttrArray = SpeedAttrArray;
	        
        });