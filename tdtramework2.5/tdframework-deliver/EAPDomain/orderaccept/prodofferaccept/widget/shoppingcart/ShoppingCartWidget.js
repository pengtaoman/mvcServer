defineModule("orderaccept.prodofferaccept.widget.shoppingcart.ShoppingCartWidget", ["orderaccept.custom._BaseWidget",
                "orderaccept.custom._BusCardTemplated", "orderaccept.prodofferaccept.util",
                "orderaccept.common.js.ConstantsPool"], function(_Widget, _Templated, util, ConstantsPool) {
	        /**
			 * 此类为成员套餐受理的页面,考虑到不是太复杂,因此包括所有场景的处理,主要包括
			 * 套餐订购,套餐成员变更,主套餐变更等场景. 此类完成成员套餐及其成员产品或成员套餐选择的功能,
			 * 当选择完成后,可以通过调用主控制器(各种Loader)的beginOrder开始订单详情的录入
			 * 
			 * @class
			 */
	        dojo.declare("orderaccept.prodofferaccept.widget.shoppingcart.ShoppingCartWidget", [_Widget, _Templated], {
		        templatePath : dojo.moduleUrl("orderaccept.prodofferaccept",
		                "widget/shoppingcart/template/shoppingCartTpl.html"),
		        
		        acceptProdOfferInfoVO : null,
		        prodOfferInfoVO : null,
		        globalConfig : {},
		        postMixInProperties : function() {
			        loadCssModule("orderaccept.prodofferaccept.widget.shoppingcart.resources.css.shoppingcart");
			        prodOfferAcceptLoader
			                .updateCurrentProdOfferName($ac$.get("currentMainProdOfferInfoVO").prodOfferName);
			        this._deleteInitPage();
			        this.acceptProdOfferInfoVO = this.buildViewInitData();
			        this._appendFunctionRadioName(this.acceptProdOfferInfoVO);
		        },
		        _appendFunctionRadioName : function(acceptProdOfferInfoVO) {
			        dojo.forEach(acceptProdOfferInfoVO.groupedOfferProdRelaList || [], function(group) {
				                var name = "functionRadio_" + util.CommUtils.generateUniqueId();
				                group.functionRadioName = name;
				                
			                });
		        },
		        _deleteInitPage : function() {
			        var node = dojo.byId("shoppingCartInitPage");
			        if (node) {
				        node.parentNode.removeChild(node);
			        }
		        },
		        postCreate : function() {
			        this.inherited(arguments);
			        var nodes = dojo.query(".member-product-tr", this.domNode);
			        this.selectDefaultProdOffer(nodes);
			        dojo.forEach(nodes, function(node) {
				                var attrValue = dojo.attr(node, "prodOfferInstId");
				                if (attrValue) {
					                var offerInstVO = ($ac$.query("$.userHasProdOfferInfoList[?(@.prodOfferInstId=="
					                        + attrValue + ")]"))[0],
						                checkNode = dojo.query(".member-product-checkbox", node)[0],
						                memberProdOfferNode = dojo.query(".memeber-prodoffer-select", node)[0];
					                dojo.attr(checkNode, {
						                        disabled : true,
						                        checked : true
					                        });
					                memberProdOfferNode.value = offerInstVO.prodOfferId;
					                
				                }
			                });
			        var handleName = ($ac$.get("currentProcessId") || $ac$.get("processId") || "") + "PostHandling";
			        if (this[handleName]) {
				        this[handleName]();
			        }
			        this.enableTitle();
		        },
		        
		        /**
		         * 选中默认选中的成员销售品
		         */
		        selectDefaultProdOffer : function(nodes){
		        	dojo.forEach(nodes, function(node) {
		        		var memberProdOfferNode = dojo.query(".memeber-prodoffer-select", node)[0];
		        		var productId = dojo.attr(node, "productId");
		        		
		        		var prodOfferInfoVO = $ac$.get("currentMainProdOfferInfoVO");
				        var offerProdRelaList = prodOfferInfoVO.offerProdRelaList;
				        var offerRelaProd = dojo.filter(offerProdRelaList||[], function(vo) {
							return vo.productInfoVO.productId == productId;
				        })[0];
		        		var relatedOfferList = offerRelaProd.relatedOfferList;
		        		var defaultRelatOfferInfo = dojo.filter(relatedOfferList||[],function(info){
		        			return info.selectDefault == 1||info.selectDefault == '1';
		        		})[0];
				        if(!!defaultRelatOfferInfo){
				        	memberProdOfferNode.value = defaultRelatOfferInfo.prodOfferId;
				        }
		        	
	                });
		        },
		        
		        /**
				 * 增加title属性功能
				 * 
				 * @method
				 */
		        enableTitle : function() {
			        var prodOfferNodeList = dojo.query(".memeber-prodoffer-select", this.domNode) || [];
			        var productNodeList = dojo.query(".product-select", this.domNode) || [];
			        dojo.forEach([].concat(prodOfferNodeList).concat(productNodeList), function(selectNode) {
				                util.DomHelper.enableTitle(selectNode);
				                
			                });
			        
		        },
		        /**
				 * 自助版套餐成员变更页面展现后续处理
				 * 
				 * @method
				 */
		        independenceMemberChangePostHandling : function() {

		        },
		        /**
				 * 自助版套餐变更页面展现后续处理
				 * 
				 * @method
				 */
		        independence2independencePostHandling : function() {
			        var nodes = dojo.query(".member-product-tr", this.domNode),
				        widget = this;
			        dojo.forEach(nodes, function(node) {
				                var permitEnterComb = dojo.attr(node, "permitEnterComb");
				                var prodInstId = dojo.attr(node, "prodInstId");
				                var prodOfferInstId = dojo.attr(node, "prodOfferInstId");
				                var keepNode = dojo.query(".member-offer-keep", node)[0];
				                var keepTextNode = dojo.query(".member_keep_text", node)[0];
				                var splitNode = dojo.query(".member-offer-split", node)[0];
				                if (!permitEnterComb && (prodInstId || prodOfferInstId)) {
					                keepNode.parentNode.removeChild(keepNode);
					                keepTextNode.parentNode.removeChild(keepTextNode);
					                dojo.addClass(splitNode, "action-selected");
					                splitNode.checked = true;
					                // splitNode.parentNode.removeChild(splitNode.previousSibling);
					                widget._initSplitMemberProdOfferList(node);
					                
				                }
			                });
			        
		        },
		        
		        /**
				 * 初始化拆分成员列表
				 * 
				 * @method
				 */
		        _initSplitMemberProdOfferList : function(productTrNode) {
			        var userHasProdOfferInfoList = $ac$.get("userHasProdOfferInfoList"),
				        prodOfferInstId = dojo.attr(productTrNode, "prodOfferInstId"),
				        productId = dojo.attr(productTrNode, "productId"),
				        prodInstId = dojo.attr(productTrNode, "prodInstId"),
				        offerInstVO = BusCard.jsonPath(userHasProdOfferInfoList, "$[?(@.prodOfferInstId=="
				                        + prodOfferInstId + ")]")[0],
				        offerProdRela = BusCard.jsonPath($ac$.get("currentMainProdOfferInfoVO"),
				                "offerProdRelaList[?(@.productId==" + productId + ")]")[0],
				        memberProdOfferNode = dojo.query(".memeber-prodoffer-select", productTrNode)[0],
				        prodOfferId = offerInstVO.prodOfferId,
				        prodInstVO = dojo.filter(offerInstVO.prodInstList, function(vo) {
					                return vo.prodInstId == prodInstId;
				                })[0];
			        // FIXME 这里可以缓存
			        var extractParam = "&prodOfferId=" + prodOfferId ;
			        // "&feeType=" + prodInstVO.paymentModeCd;
			        var singleProdOfferList = prodOfferAcceptLoader
			                .route("url:orderDetailAction.do?method=doGetProdOfferByAccProductId&productId="
			                        + productId + extractParam);
			        BusCard.$rs(memberProdOfferNode, dojo.map(singleProdOfferList, function(p) {
				                        return {
					                        id : p.prodOfferId,
					                        name : p.prodOfferName
					                        
				                        };
			                        }));
			        var isContained = dojo.some(singleProdOfferList, function(v) {
				                return v.prodOfferId == offerInstVO.prodOfferId;
			                });
			        if (isContained) {
				        memberProdOfferNode.value = offerInstVO.prodOfferId;
			        }
			        
		        },
		        /**
				 * 分场景构建视图展现所需的数据
				 * 
				 * @method
				 */
		        buildViewInitData : function() {
			        var actionCD = $ac$.get("requestParam").actionCD,
				        ACTION_CD_CONST = util.ACTION_CD_CONST;
			        switch (actionCD) {
				        case ACTION_CD_CONST.PRODUCT_INSTALL :
					        return this.onProductInstall();
					        break;
				        case ACTION_CD_CONST.PRODUCT_CHANGE_MAIN :
					        return this.onProductChangeMain();
					        break;
				        case ACTION_CD_CONST.PRODUCT_CHANGE :
					        return this.onSubProdOfferChange();
					        break;
				        case ACTION_CD_CONST.MEMBER_OFFER_CHANGE :
					        return this.onMemberChange();
					        break;
				        case ACTION_CD_CONST.PRODUCT_CHANGE_ACCEPT :
					        return this.onProductChangeMain();
					        break;
			        }
			        
		        },
		        /**
				 * 销售品订购流程处理
				 * 
				 * @method
				 */
		        onProductInstall : function() {
			        this.globalConfig.buttonName = "下一步";
			        var prodOfferInfoVO = $ac$.get("currentMainProdOfferInfoVO");
			        if (prodOfferInfoVO.bindType == 2) {
				        return this.onIndependenceProdOfferInstall();
			        } else {
				        return this.onSharedProdOfferInstall();
			        }
		        },
		        /**
				 * 当为组合产品时,抽出相应的成员产品 如DDN
				 * 
				 * @method
				 */
		        reComputeOfferProdRelaList : function(prodOfferInfoVO) {
			        var offerProdRelaList = prodOfferInfoVO.offerProdRelaList,
				        protoConcat = Array.prototype.concat;
			        return protoConcat.apply([], dojo.map(offerProdRelaList, function(offerProdRelaVO) {
				                        var productInfoVO = offerProdRelaVO.productInfoVO,
					                        prodCompDetailList = productInfoVO.prodCompDetailList || [],
					                        list = [];
				                        list.push(offerProdRelaVO);
				                        dojo.forEach(prodCompDetailList, function(prodCompDetailVO) {
					                                prodCompDetailVO.combProductId = offerProdRelaVO.productId;
					                                if (false && prodCompDetailVO.maxCount == prodCompDetailVO.minCount) {
						                                var constructedOfferProdRela = {
							                                productId : prodCompDetailVO.productId,
							                                minCount : 1,
							                                maxCount : 1,
							                                ifDefault : 1,
							                                combProductId : offerProdRelaVO.productId,
							                                productInfoVO : prodCompDetailVO
						                                };
						                                for (var index = 0; index < prodCompDetailVO.minCount; index++) {
							                                list.push(constructedOfferProdRela);
						                                }
						                                
					                                } else {
						                                var constructedOfferProdRela = {
							                                productId : prodCompDetailVO.productId,
							                                minCount : prodCompDetailVO.minCount,
							                                maxCount : prodCompDetailVO.maxCount,
							                                // 和ppm协商
							                                // 成员产品都默认选中
							                                ifDefault : "1",
							                                combProductId : offerProdRelaVO.productId,
							                                productInfoVO : prodCompDetailVO
						                                };
						                                list.push(constructedOfferProdRela);
						                                
					                                }
					                                
				                                });
				                        
				                        return list;
				                        
			                        }));
			        
		        },
		        /**
				 * 获取已订购的主销售品规格层面数据时,由于组合-成员套餐可能失效,
				 * 需要额外处理产品接口没有返回的失效的已经订购的成员销售品信息,
				 * 以后需要把已订购信息全部传递给PPM,由PPM统一处理,目前暂时处理一下
				 * 
				 * @method
				 */
		        reConstructOldProdOfferInfoVO : function(prodOfferInfoVO, memberInstList) {
			        var accessType = ConstantsPool.load(["ProductFuncTypeConst"]).ProductFuncTypeConst.ACCESS;
			        if (prodOfferInfoVO && memberInstList && memberInstList.length) {
				        var offerProdRelaList = prodOfferInfoVO.offerProdRelaList || [];
				        dojo.forEach(memberInstList, function(memberOfferInstVO) {
					                var memberProdOfferId = memberOfferInstVO.prodOfferId;
					                var prodInstList = memberOfferInstVO.prodInstList || [];
					                var accessProdInstVO = dojo.filter(prodInstList, function(prodInst) {
						                        return prodInst.prodFuncType == accessType;
						                        
					                        })[0];
					                if (accessProdInstVO) {
						                // 获取规格层面的销售品产品关联对象
						                var specOfferProdRela = dojo.filter(offerProdRelaList, function(offerProdRela) {
							                        return offerProdRela.productId == accessProdInstVO.productId;
							                        
						                        })[0];
						                if (specOfferProdRela) {
							                specOfferProdRela.relatedOfferList = specOfferProdRela.relatedOfferList
							                        || [];
							                var hf = dojo.some(specOfferProdRela.relatedOfferList, function(ro) {
								                        return ro.prodOfferId == memberOfferInstVO.prodOfferId;
							                        });
							                // 如果成员实例销售品在PPM接口返回的数据不存在
							                if (!hf) {
								                specOfferProdRela.relatedOfferList.push(util.ProdOfferHelper
								                        .loadAndSetProdOffer(memberOfferInstVO.prodOfferId, {
									                                interfaceType : 1,
									                                permitCache : true,
									                                permitFromCache : true
									                                
								                                }));
								                
							                }
							                
						                }
						                
					                }
					                
				                });
				        
			        }
			        
		        },
		        /**
				 * 重新组织选择的主销售品信息
				 * 
				 * @method
				 */
		        reConstructNewProdOfferInfoVO : function(prodOfferInfoVO) {
			        if (prodOfferInfoVO) {
				        var offerProdRelaList = prodOfferInfoVO.offerProdRelaList || [];
				        if (prodOfferInfoVO.bindType == 2) {
					        var idList = [];
					        dojo.forEach(offerProdRelaList, function(offerProdRela, index) {
						                var relatedOfferList = offerProdRela.relatedOfferList || [];
						                if (!relatedOfferList.length) {
							                idList.push(index);
						                }
						                
					                });
					        idList.sort(function(index1, index2) {
						                return index1 > index2 ? -1 : (index1 < index2 ? 1 : 0);
						                
					                });
					        
					        dojo.forEach(idList, function(ti) {
						                offerProdRelaList.splice(ti, 1);
					                });
					        
				        }
				        
			        }
			        
		        },
		        /**
				 * 如果是组合产品受理,重组产品接口返回的数据，如DDN
				 * 
				 * @method
				 */
		        reConstructInstStructure : function(offerInstVO) {
			        var prodInstList = offerInstVO.prodInstList || [],
				        combBundleType = ConstantsPool.load("ProductTypeConst").ProductTypeConst.COMPOSE,
				        combProdInstList = BusCard.jsonPath(prodInstList, "$[?(@.prodTypeCd==" + combBundleType + ")]"),
				        accessType = ConstantsPool.load(["ProductFuncTypeConst"]).ProductFuncTypeConst.ACCESS,
				        targetMemberProdInstList = [],
				        protoPush = Array.prototype.push;
			        if (combProdInstList && combProdInstList.length) {
				        dojo.forEach(combProdInstList, function(combProdInstVO) {
					                var memberProdInstList = BusCard.jsonPath(combProdInstVO,
					                        "$.prodInstList[?(@.prodFuncType==" + accessType + ")]")
					                        || [];
					                var subProdInstList = dojo.filter(combProdInstVO.prodInstList || [], function(
					                                prodInstItem) {
						                        return !dojo.some(memberProdInstList, function(member) {
							                                return member === prodInstItem;
						                                }) || [];
						                        
					                        });
					                // 组合产品下的prodInstList只保留功能类产品信息
					                combProdInstVO.prodInstList = subProdInstList;
					                // 放入组合产品
					                protoPush.apply(targetMemberProdInstList, [combProdInstVO]);
					                // 放入组合下成员产品
					                protoPush.apply(targetMemberProdInstList, memberProdInstList);
					                
				                });
				        
				        offerInstVO.prodInstList = targetMemberProdInstList;
				        
			        }
			        
		        },
		        /**
				 * 共享版套餐订购流程处理
				 * 
				 * @method
				 */
		        onSharedProdOfferInstall : function() {
			        $ac$.set("currentProcessId", "sharedProdOfferInstall");
			        var prodOfferInfoVO = $ac$.get("currentMainProdOfferInfoVO");
			        prodOfferInfoVO.offerProdRelaList = this.reComputeOfferProdRelaList(prodOfferInfoVO);
			        var offerProdRelaList = prodOfferInfoVO.offerProdRelaList;
			        var clonedProdOfferInfoVO = this.constructClonedProdOfferInfoVO(prodOfferInfoVO);
			        var groupedOfferProdRelaList = [];
			        var groupMap = {};
			        /*
					 * //根据netType分组 dojo.forEach(offerProdRelaList,
					 * function(vo) { var netType =
					 * vo.productInfoVO.netType; if
					 * (!groupMap[netType]) { groupMap[netType] = []; }
					 * groupMap[netType].push(vo); });
					 */

			        // 不分组 每个产品id是一组
			        dojo.forEach(offerProdRelaList, function(vo) {
				                var productId = vo.productInfoVO.productId;
				                if (!groupMap[productId]) {
					                groupMap[productId] = [];
				                }
				                groupMap[productId].push(vo);
			                });
			        
			        for (var index in groupMap) {
				        if (groupMap.hasOwnProperty(index)) {
					        var offerProdRela = groupMap[index][0];
					        // 相同产品id的复制多份
					        var len = groupMap[index].length;
					        while (len--) {
						        groupedOfferProdRelaList.push({
							                DISABLED : (false && offerProdRela.minCount >= 1) ? 'DISABLED' : '',
							                CHECKED : offerProdRela.ifDefault == 1 ? 'CHECKED' : '',
							                relatedOfferList : [clonedProdOfferInfoVO],
							                productId : index,
							                maxCount : offerProdRela.maxCount,
							                minCount : offerProdRela.minCount,
							                productName : offerProdRela.productInfoVO.productName,
							                ifSingle : clonedProdOfferInfoVO.bindType == 0,
							                offerProdRelaList : groupMap[index],
							                permitAdd : offerProdRela.maxCount > 1 ? true : false
						                });
						        
					        }
					        
				        }
				        
			        }
			        clonedProdOfferInfoVO.groupedOfferProdRelaList = groupedOfferProdRelaList;
			        return clonedProdOfferInfoVO;
			        
		        },
		        /**
				 * 自助版套餐订购流程
				 * 
				 * @method
				 */
		        onIndependenceProdOfferInstall : function() {
			        var widget = this;
			        $ac$.set("currentProcessId", "independenceProdOfferInstall");
			        var prodOfferInfoVO = $ac$.get("currentMainProdOfferInfoVO");
			        this.reConstructNewProdOfferInfoVO(prodOfferInfoVO);
			        var offerProdRelaList = prodOfferInfoVO.offerProdRelaList;
			        var clonedProdOfferInfoVO = this.constructClonedProdOfferInfoVO(prodOfferInfoVO);
			        var groupedOfferProdRelaList = [];
			        var groupMap = {};
			        /*
					 * //根据netType分组 dojo.forEach(offerProdRelaList,
					 * dojo.forEach(offerProdRelaList, function(vo) {
					 * var netType = vo.productInfoVO.netType; if
					 * (!groupMap[netType]) { groupMap[netType] = []; }
					 * groupMap[netType].push(vo); });
					 */
			        dojo.forEach(offerProdRelaList, function(vo) {
				                var productId = vo.productInfoVO.productId;
				                if (!groupMap[productId]) {
					                groupMap[productId] = [];
				                }
				                groupMap[productId].push(vo);
			                });
			        for (var index in groupMap) {
				        if (groupMap.hasOwnProperty(index)) {
					        var offerProdRela = groupMap[index][0];
					        groupedOfferProdRelaList.push({
						                relatedOfferList : widget.sortByProdOfferName(offerProdRela.relatedOfferList || []),
						                productId : index,
						                maxCount : offerProdRela.maxCount,
						                productName : offerProdRela.productInfoVO.productName,
						                minCount : offerProdRela.minCount,
						                CHECKED : offerProdRela.ifDefault == 1 ? "CHECKED" : "",
						                permitAdd : offerProdRela.maxCount > 1 ? true : false,
						                offerProdRelaList : groupMap[index]
					                });
				        }
				        
			        }
			        clonedProdOfferInfoVO.groupedOfferProdRelaList = groupedOfferProdRelaList;
			        return clonedProdOfferInfoVO;
			        
		        },
		        
		        /**
				 * 单套餐可选包变更流程处理
				 * 
				 * @method
				 */
		        onSubProdOfferChange : function() {
			        var acceptProdOfferInfoVO = this.onSharedMemberChange();
			        $ac$.set("currentProcessId", "subProdOfferChange");
			        $ac$.set("processId", "subProdOfferChange");
			        this.globalConfig.buttonName = "下一步";
			        this.globalConfig.promptText = ",点击下一步按钮可以进行产品或可选包变更"
			        return acceptProdOfferInfoVO;
		        },
		        
		        /**
				 * 组合业务成员变更,包括自助版和共享版 TODO
				 * 考虑到系统安全性,这里面的使用大量clone方法,因此存在效率问题
				 * 
				 * @method
				 */
		        onMemberChange : function() {
			        var prodOfferInfoVO = $ac$.get("currentMainProdOfferInfoVO");
			        if (prodOfferInfoVO.bindType == 1) {
				        return this.onSharedMemberChange();
			        } else {
				        return this.onIndependenceMemberChange();
			        }
		        },
		        findOfferProdRelaVO : function(prodOfferInfoVO, productId) {
			        var offerProdRelaList = prodOfferInfoVO.offerProdRelaList || [];
			        return BusCard.find(offerProdRelaList, function(vo) {
				                return vo.productId == productId;
				                
			                });
			        
		        },
		        onSharedMemberChange : function() {
			        $ac$.set("currentProcessId", "sharedMemberChange");
			        $ac$.set("processId", "sharedMemberChange");
			        this.globalConfig.buttonName = "下一步";
			        this.globalConfig.promptText = ",点击下一步按钮可以进行产品或可选包变更";
			        var currentMainProdOfferInfoVO = $ac$.get("currentMainProdOfferInfoVO"),
				        mainProdOfferInstVO = $ac$.get("mainProdOfferInstVO");
			        // 把组合产品和成员产品提到同一级上,方便统一处理
			        currentMainProdOfferInfoVO.offerProdRelaList = this
			                .reComputeOfferProdRelaList(currentMainProdOfferInfoVO);
			        // 重新组织产品实例接口返回的数据,把组合产品实例和成员产品实例放到同一级上
			        this.reConstructInstStructure(mainProdOfferInstVO);
			        var self = this,
				        clonedProdOfferInfoVO = this.constructClonedProdOfferInfoVO(currentMainProdOfferInfoVO),
				        accessType = ConstantsPool.load(["ProductFuncTypeConst"]).ProductFuncTypeConst.ACCESS,
				        productIdList = BusCard.jsonPath(mainProdOfferInstVO, "$.prodInstList[?(@.prodFuncType=="
				                        + accessType + ")].productId"),
				        notOrderedOfferProdRelaList = this.filterNotOrderedOfferProdRelaList(productIdList,
				                currentMainProdOfferInfoVO),
				        notOrderedGroupedProdRelaList = dojo.map(notOrderedOfferProdRelaList, function(vo) {
					                return {
						                relatedOfferList : [clonedProdOfferInfoVO],
						                offerProdRelaList : [vo],
						                productId : vo.productId
					                }
					                
				                }),
				        prodInstList = mainProdOfferInstVO.prodInstList || [],
				        orderedGroupedProdRelaList = dojo.map(prodInstList, function(prodInstVO) {
					                var _r = self.findOfferProdRelaVO(currentMainProdOfferInfoVO, prodInstVO.productId);
					                return {
						                relatedOfferList : [clonedProdOfferInfoVO],
						                offerProdRelaList : [_r],
						                prodInstId : prodInstVO.prodInstId,
						                productId : prodInstVO.productId,
						                prodOfferInstId : mainProdOfferInstVO.prodOfferInstId,
						                offerInstVO : mainProdOfferInstVO,
						                ifDefault : 1,
						                maxCount : _r.maxCount,
						                minCount : _r.minCount,
						                productName : _r.productInfoVO.productName,
						                CHECKED : "CHECKED",
						                DISABLED : "DISABLED",
						                // FIXME 暂时不打算支持退网拆分操作
						                permitSplit : false,
						                permitAdd : _r.maxCount > 1,
						                memberStatus : self.buildMemberStatus(currentMainProdOfferInfoVO, prodInstVO)
						                
					                }
					                
				                });
			        clonedProdOfferInfoVO.groupedOfferProdRelaList = [].concat(orderedGroupedProdRelaList)
			                .concat(notOrderedGroupedProdRelaList);
			        return clonedProdOfferInfoVO;
			        
			        // throw new Error("暂不支持");
			        
		        },
		        /**
				 * 获取已订购的成员销售品集合
				 * 
				 * @method
				 */
		        _getMemberProdOfferInstList : function() {
			        var requestParam = $ac$.get("requestParam"),
				        prodOfferInstId = requestParam.prodOfferInstId,
				        relationType = ConstantsPool.load("OfferInstRelaTypeConst").OfferInstRelaTypeConst.OFFER_COMB_MEMBER,
				        instVO = $ac$
				                .query("$.userHasProdOfferInfoList[?(@.prodOfferInstId==" + prodOfferInstId + ")]")[0],
				        memberOfferInstIdList = BusCard.jsonPath(instVO, "$.offerInstRelaList[?(@.relationTypeCd=="
				                        + relationType + ")].relatedProdOfferInstId"),
				        jsonQuery = "$.userHasProdOfferInfoList[?(" + dojo.map(memberOfferInstIdList, function(id) {
					                return " @.prodOfferInstId==" + id + "||";
					                
				                }).join("") + "false" + ")]",
				        memberOfferInstList = $ac$.query(jsonQuery);
			        return memberOfferInstList;
			        
		        },
		        /**
				 * 获取已订购的接入类产品实例集合
				 * 
				 * @method
				 */
		        _getOrderedAccessProdInstList : function(memberOfferInstList) {
			        var accessType = ConstantsPool.load(["ProductFuncTypeConst"]).ProductFuncTypeConst.ACCESS,
				        prodInstList = BusCard.jsonPath(memberOfferInstList, "$[*].prodInstList[?(@.prodFuncType=="
				                        + accessType + ")]");
			        return prodInstList;
			        
		        },
		        
		        onIndependenceMemberChange : function() {
			        $ac$.set("currentProcessId", "independenceMemberChange");
			        $ac$.set("processId", "independenceMemberChange");
			        this.globalConfig.buttonName = "下一步";
			        this.globalConfig.promptText = ",在下列表格中可以进行成员变更受理";
			        var currentMainProdOfferInfoVO = $ac$.get("currentMainProdOfferInfoVO");
			        
			        var clonedProdOfferInfoVO = this.constructClonedProdOfferInfoVO(currentMainProdOfferInfoVO),
				        widget = this,
				        offerInstList = $ac$.get("userHasProdOfferInfoList"),
				        memberOfferInstList = this._getMemberProdOfferInstList();
			        this.reConstructOldProdOfferInfoVO(currentMainProdOfferInfoVO, memberOfferInstList);
			        this.reConstructNewProdOfferInfoVO(currentMainProdOfferInfoVO);
			        // 根据productId查找销售品-产品关联VO
			        var findOfferProdRela = function(productId) {
				        return dojo.filter(currentMainProdOfferInfoVO.offerProdRelaList, function(rela) {
					                return rela.productId == productId;
				                })[0];
			        },
				        // 根据productId查找成员实例
				        findOfferInst = function(productId) {
					        return dojo.filter(memberOfferInstList, function(offerInst) {
						                return offerInst.prodInstList[0].productId == productId;
					                })
					        
				        },
				        // 获取已订购的
				        orderedGroupedOfferProdRelaList = dojo.map(memberOfferInstList, function(memberOfferInst) {
					                var r = {},
						                prodInstVO = memberOfferInst.prodInstList[0],
						                vo = findOfferProdRela(prodInstVO.productId);
					                r.offerProdRelaList = [vo];
					                r.prodInstId = prodInstVO.prodInstId;
					                r.prodInstVO = prodInstVO;
					                r.productId = vo.productInfoVO.productId;
					                r.offerInstVO = memberOfferInst;
					                r.prodOfferInstId = memberOfferInst.prodOfferInstId;
					                r.memberStatus = widget.buildMemberStatus(memberOfferInst, vo);
					                r.ifDefault = 1;
					                r.productName = vo.productInfoVO.productName;
					                r.CHECKED = "CHECKED";
					                r.DISABLED = "DISABLED";
					                r.relatedOfferList = widget.sortByProdOfferName(vo.relatedOfferList||[]);
					                // FIXME 暂时不打算支持退网拆分操作
					                r.permitSplit = true;
					                r.permitAdd = vo.maxCount > 1;
					                r.maxCount = vo.maxCount;
					                r.minCount = vo.minCount;
					                return r;
					                
				                }),
				        notOrderedGroupedOfferProdRelaList = dojo.map(dojo.filter(
				                        currentMainProdOfferInfoVO.offerProdRelaList, function(offerRela) {
					                        var offerInstWithSameProdList= findOfferInst(offerRela.productId);
					                        return !offerInstWithSameProdList||offerInstWithSameProdList.length==0;
				                        }), function(v) {
					                return {
						                offerProdRelaList : [v],
						                maxCount : v.maxCount,
						                minCount : v.minCount,
						                productName : v.productInfoVO.productName,
						                productId : v.productInfoVO.productId,
						                ifDefault : 0,
						                permitAdd : v.maxCount > 1,
						                relatedOfferList : widget.sortByProdOfferName(v.relatedOfferList||[])
					                }
					                
				                }),
				        computedOfferProdRelaList = [].concat(orderedGroupedOfferProdRelaList,
				                notOrderedGroupedOfferProdRelaList);
			        clonedProdOfferInfoVO.groupedOfferProdRelaList = computedOfferProdRelaList;
			        return clonedProdOfferInfoVO;
			        
			        throw new Error("暂不支持");
			        
		        },
		        /**
				 * 主套餐变更流程处理
				 * 
				 * @method
				 */
		        onProductChangeMain : function() {
			        return this[$ac$.get("currentProcessId")]();
		        },
		        /**
				 * 单->单
				 * 
				 * @method
				 */
		        single2single : function() {
			        return this.single2comb.apply(this, arguments);
		        },
		        getTargetProductId : function(prodInstVO) {
			        var productId = prodInstVO.productId;
			        var actionCD = $ac$.get("requestParam").actionCD,
				        ACTION_CD_CONST = util.ACTION_CD_CONST;
			        switch (actionCD) {
				        case ACTION_CD_CONST.PRODUCT_CHANGE_ACCEPT : {
					        var productIdSelect = dojo.byId("changeParamList");
					        if (productIdSelect && productIdSelect.value) {
						        productId = productIdSelect.value;
					        }
				        }
					        break;
				        default :
					        productId = prodInstVO.productId;
					        break;
			        }
			        return productId;
			        
		        },
		        /**
				 * 单->共享版组合
				 * 
				 * @method
				 */
		        single2comb : function() {
			        this.globalConfig.buttonName = "下一步";
			        this.globalConfig.promptText = ",点击下一步进行主套餐变更操作";
			        var currentMainProdOfferInfoVO = $ac$.get("currentMainProdOfferInfoVO"),
				        widget = this,
				        mainProdOfferInstVO = $ac$.get("mainProdOfferInstVO"),
				        oldProdOfferInfoVO = util.ProdOfferHelper.loadAndSetProdOffer(mainProdOfferInstVO.prodOfferId,
				                {
					                interfaceType : 1
				                }),
				        prodInstVO = mainProdOfferInstVO.prodInstList[0],
				        // productId = prodInstVO.productId,
				        prodInstId = prodInstVO.prodInstId,
				        offerProdRelaVO = BusCard.jsonPath(currentMainProdOfferInfoVO,
				                "$.offerProdRelaList[?(@.productId==" + this.getTargetProductId(prodInstVO) + ")]")[0],
				        clonedProdOfferInfoVO = this.constructClonedProdOfferInfoVO(currentMainProdOfferInfoVO),
				        groupedOfferProdRelaList = dojo.map(currentMainProdOfferInfoVO.offerProdRelaList,
				                function(rela) {
					                var productInfoVO = rela.productInfoVO;
					                var result = {
						                maxCount : rela.maxCount,
						                minCount : rela.minCount,
						                productName : productInfoVO.productName,
						                productId : productInfoVO.productId,
						                ifDefault : 1,
						                permitAdd : rela.maxCount > 0,
						                CHECKED : rela.ifDefault == 1 ? "CHECKED" : "",
						                DISABLED : (false && rela.minCount > 0) ? "DISABLED" : "",
						                relatedOfferList : [clonedProdOfferInfoVO],
						                offerProdRelaList : [rela]
						                
					                };
					                if (offerProdRelaVO.productId == rela.productId) {
						                dojo.mixin(result, {
							                        CHECKED : 'CHECKED',
							                        DISABLED : 'DISABLED',
							                        prodOfferInstId : mainProdOfferInstVO.prodOfferInstId,
							                        prodInstId : prodInstId,
							                        prodInstVO : prodInstVO,
							                        offerInstVO : mainProdOfferInstVO,
							                        memberStatus : widget.buildMemberStatus(oldProdOfferInfoVO,
							                                prodInstVO)
							                        
						                        });
						                
					                }
					                return result;
				                });
			        clonedProdOfferInfoVO.groupedOfferProdRelaList = groupedOfferProdRelaList;
			        return clonedProdOfferInfoVO;
			        
		        },
		        /**
				 * 单->自主版套餐
				 * 
				 * @method
				 */
		        single2independence : function() {
			        this.globalConfig.buttonName = "下一步";
			        this.globalConfig.promptText = ",点击下一步进行主套餐变更操作";
			        this.reConstructNewProdOfferInfoVO($ac$.get("currentMainProdOfferInfoVO"));
			        var currentMainProdOfferInfoVO = $ac$.get("currentMainProdOfferInfoVO"),
				        widget = this,
				        mainProdOfferInstVO = $ac$.get("mainProdOfferInstVO"),
				        oldProdOfferInfoVO = util.ProdOfferHelper.loadAndSetProdOffer(mainProdOfferInstVO.prodOfferId,
				                {
					                interfaceType : 1
				                }),
				        prodInstVO = mainProdOfferInstVO.prodInstList[0],
				        productId = prodInstVO.productId,
				        prodInstId = prodInstVO.prodInstId,
				        offerProdRelaVO = BusCard.jsonPath(currentMainProdOfferInfoVO,
				                "$.offerProdRelaList[?(@.productId==" + productId + ")]")[0],
				        clonedProdOfferInfoVO = this.constructClonedProdOfferInfoVO(currentMainProdOfferInfoVO),
				        groupedOfferProdRelaList = dojo.map(currentMainProdOfferInfoVO.offerProdRelaList,
				                function(rela) {
					                var productInfoVO = rela.productInfoVO;
					                var result = {
						                maxCount : rela.maxCount,
						                minCount : rela.minCount,
						                productName : productInfoVO.productName,
						                productId : productInfoVO.productId,
						                ifDefault : 1,
						                permitAdd : rela.maxCount > 0,
						                CHECKED : rela.ifDefault == 1 ? "CHECKED" : "",
						                DISABLED : (false && rela.minCount > 0) ? "DISABLED" : "",
						                relatedOfferList : widget.sortByProdOfferName(rela.relatedOfferList || []),
						                offerProdRelaList : [rela]
						                
					                };
					                if (offerProdRelaVO.productId == rela.productId) {
						                dojo.mixin(result, {
							                        CHECKED : 'CHECKED',
							                        DISABLED : 'DISABLED',
							                        permitEnterComb : "1",
							                        prodOfferInstId : mainProdOfferInstVO.prodOfferInstId,
							                        prodInstId : prodInstId,
							                        prodInstVO : prodInstVO,
							                        offerInstVO : mainProdOfferInstVO,
							                        memberStatus : widget.buildMemberStatus(oldProdOfferInfoVO,
							                                prodInstVO)
							                        
						                        });
						                
					                }
					                return result;
				                });
			        clonedProdOfferInfoVO.groupedOfferProdRelaList = groupedOfferProdRelaList;
			        return clonedProdOfferInfoVO;
			        
		        },
		        /**
				 * 自主->自主
				 * 
				 * @method
				 */
		        independence2independence : function() {
			        this.globalConfig.buttonName = "下一步";
			        this.globalConfig.promptText = ",点击下一步进行主套餐变更操作";
			        this.reConstructNewProdOfferInfoVO($ac$.get("currentMainProdOfferInfoVO"));
			        var currentMainProdOfferInfoVO = $ac$.get("currentMainProdOfferInfoVO"),
				        widget = this,
				        mainProdOfferInstVO = $ac$.get("mainProdOfferInstVO"),
				        oldProdOfferInfoVO = util.ProdOfferHelper.loadAndSetProdOffer(mainProdOfferInstVO.prodOfferId,
				                {
					                interfaceType : 4,
					                permitCache : true
					                
				                }),
				        memberProdOfferInstList = widget._getMemberProdOfferInstList();
			        this.reConstructOldProdOfferInfoVO(oldProdOfferInfoVO, memberProdOfferInstList);
			        var prodInstList = widget._getOrderedAccessProdInstList(memberProdOfferInstList),
				        clonedProdOfferInfoVO = this.constructClonedProdOfferInfoVO(currentMainProdOfferInfoVO),
				        productIdList = BusCard.jsonPath(prodInstList, "$[*].productId"),
				        // 第一步 计算没有订购的产品
				        notOrderedOfferProdRelaList = widget.filterNotOrderedOfferProdRelaList(productIdList,
				                currentMainProdOfferInfoVO),
				        // 第二步 计算已经订购的产品
				        orderdOfferProdRelaList = widget.filterOrderdOfferRelaList(productIdList,
				                currentMainProdOfferInfoVO),
				        // 第三步 计算必须拆分或者退订的产品
				        shouldSplitOrQuitOfferProdRelaList = widget.filterShouldSplitOrQuitOfferRelaList(productIdList,
				                currentMainProdOfferInfoVO, oldProdOfferInfoVO),
				        
				        groupedOfferProdRelaList = [],
				        
				        pushProto = Array.prototype.push;
			        
			        // 新订购
			        pushProto.apply(groupedOfferProdRelaList, dojo.map(notOrderedOfferProdRelaList, function(rela) {
				                        var productInfoVO = rela.productInfoVO,
					                        result = {
						                        maxCount : rela.maxCount,
						                        minCount : rela.minCount,
						                        productName : productInfoVO.productName,
						                        productId : productInfoVO.productId,
						                        ifDefault : 1,
						                        permitAdd : rela.maxCount > 0,
						                        CHECKED : rela.ifDefault == 1 ? "CHECKED" : "",
						                        DISABLED : (false && rela.minCount > 0) ? "DISABLED" : "",
						                        relatedOfferList : widget.sortByProdOfferName(rela.relatedOfferList || []),
						                        offerProdRelaList : [rela]
						                        
					                        }
				                        
				                        return result;
				                        
			                        }));
			        // 处理原有老信息
			        pushProto.apply(groupedOfferProdRelaList, dojo.map(memberProdOfferInstList, function(
			                                memberOfferInstVO) {
				                        var prodInstVO = widget._getOrderedAccessProdInstList([memberOfferInstVO])[0];
				                        var shouldSplitOrQuit = false;
				                        var productId = prodInstVO.productId;
				                        var rela = dojo.filter(orderdOfferProdRelaList, function(v) {
					                                return v.productInfoVO.productId == productId;
					                                
				                                })[0];
				                        var oldRelaInfo = BusCard.jsonPath(oldProdOfferInfoVO,
				                                "$.offerProdRelaList[?(@.productId==" + productId + ")]")[0];
				                        if (!rela) {
					                        shouldSplitOrQuit = true;
					                        rela = dojo.filter(shouldSplitOrQuitOfferProdRelaList, function(v) {
						                                return v.productInfoVO.productId == productId;
					                                })[0];
					                        
				                        }
				                        var productInfoVO = rela.productInfoVO;
				                        var result = {
					                        maxCount : rela.maxCount,
					                        minCount : rela.minCount,
					                        productName : productInfoVO.productName,
					                        productId : productInfoVO.productId,
					                        ifDefault : 1,
					                        permitAdd : shouldSplitOrQuit ? false : rela.maxCount > 0,
					                        CHECKED : rela.ifDefault == 1 ? "CHECKED" : "",
					                        DISABLED : (false && rela.minCount > 0) ? "DISABLED" : "",
					                        relatedOfferList : widget.sortByProdOfferName(rela.relatedOfferList || []),
					                        offerProdRelaList : [rela],
					                        CHECKED : 'CHECKED',
					                        DISABLED : 'DISABLED',
					                        permitSplit : true,
					                        permitEnterComb : shouldSplitOrQuit ? "" : "1",
					                        prodOfferInstId : memberOfferInstVO.prodOfferInstId,
					                        prodInstId : prodInstVO.prodInstId,
					                        offerInstVO : memberOfferInstVO,
					                        prodInstVO : prodInstVO,
					                        // FIXME rela may not
					                        // contain old
					                        // memeberprodoffer info
					                        memberStatus : widget.buildMemberStatus(memberOfferInstVO, oldRelaInfo)
					                        
				                        };
				                        return result;
				                        
			                        }));
			        
			        clonedProdOfferInfoVO.groupedOfferProdRelaList = groupedOfferProdRelaList;
			        return clonedProdOfferInfoVO;
			        
		        },
		        /**
				 * 共享版->共享版套餐变更处理流程,暂未实现
				 * 
				 * @method
				 */
		        comb2comb : function() {

		        },
		        /**
				 * 构建一个当前受理销售品的基本信息
				 * 
				 * @method
				 */
		        constructClonedProdOfferInfoVO : function(prodOfferInfoVO) {
			        var obj = {};
			        for (var index in prodOfferInfoVO) {
				        if (!(dojo.isArray(prodOfferInfoVO[index]) || dojo.isObject(prodOfferInfoVO[index]))) {
					        obj[index] = prodOfferInfoVO[index];
				        }
			        }
			        return obj;
		        },
		        
		        buildMemberStatus : function(memberOfferInstVO, offerProdRela) {
			        var memeberProdOfferInfoVO = BusCard.jsonPath(offerProdRela, "$.relatedOfferList[?(@.prodOfferId=="
			                        + memberOfferInstVO.prodOfferId + ")]")[0];
			        var text = "";
			        // 自主版成员套餐信息展现
			        if (memeberProdOfferInfoVO) {
				        text = "已有/" + memeberProdOfferInfoVO.prodOfferName + "/"
				                + memberOfferInstVO.prodInstList[0].accNbr;
			        } else {
				        // 共享版套餐展现
				        text = "已有/" + arguments[0].prodOfferName + "/" + arguments[1].accNbr;
			        }
			        
			        return text;
			        
		        },
		        /**
				 * 根据已订购的产品ID集合过滤出尚未订购的销售品-产品关系集合
				 * 
				 * @method
				 */
		        filterNotOrderedOfferProdRelaList : function(productIdList, prodOfferInfoVO) {
			        var widget = this;
			        return dojo.filter(prodOfferInfoVO.offerProdRelaList, function(offerRela) {
				                return dojo.every(productIdList, function(productId) {
					                        return productId != offerRela.productInfoVO.productId;
				                        });
			                });
			        
		        },
		        /**
				 * 根据已订购的产品ID集合过滤出尚订购的销售品-产品关系集合
				 * 
				 * @method
				 */
		        filterOrderdOfferRelaList : function(productIdList, prodOfferInfoVO) {
			        var widget = this;
			        return dojo.filter(prodOfferInfoVO.offerProdRelaList, function(offerRela) {
				                return dojo.some(productIdList, function(productId) {
					                        return productId == offerRela.productInfoVO.productId;
				                        });
			                });
			        
		        },
		        /**
				 * 根据已订购的产品ID集合过滤出在当前销售品下必须拆分或者退网的销售品-产品关系集合
				 * 
				 * @method
				 */
		        filterShouldSplitOrQuitOfferRelaList : function(productIdList, prodOfferInfoVO, oldProdOfferInfoVO) {
			        var widget = this;
			        return dojo.filter(oldProdOfferInfoVO.offerProdRelaList, function(oldOfferProdRela) {
				                var productId = oldOfferProdRela.productInfoVO.productId;
				                var existInst = dojo.some(productIdList, function(id) {
					                        return productId == id;
				                        });
				                if (existInst) { return dojo.every(prodOfferInfoVO.offerProdRelaList, function(rela) {
					                        return rela.productInfoVO.productId != productId;
				                        }); }
				                
			                })
			        
		        },
		        
		        /**
		         * 根据用户名称排序
		         */
		        sortByProdOfferName : function(relatedOfferList){
		        	relatedOfferList.sort(function(param1,param2){
		        		return (param1.prodOfferName).localeCompare(param2.prodOfferName);
		        	});
		        	return relatedOfferList;
		        }
		        
	        });
	        
        });
