defineModule("orderaccept.prodofferaccept.widget.memberprodoffer.MemberProdOfferPickWidget", [
                "orderaccept.custom._BaseWidget", "orderaccept.custom._BusCardTemplated",
                "orderaccept.prodofferaccept.util", "orderaccept.common.js.ConstantsPool"], function(_Widget,
                _Templated, util, ConstantsPool) {
	        /**
			 * 此类为成员套餐受理的页面,考虑到不是太复杂,因此包括所有场景的处理
			 * 
			 * @class
			 */
	        dojo.declare("orderaccept.prodofferaccept.widget.memberprodoffer.MemberProdOfferPickWidget", [_Widget,
	                        _Templated], {
		                templatePath : dojo.moduleUrl("orderaccept.prodofferaccept",
		                        "widget/memberprodoffer/template/memberProdOfferTpl.html"),
		                
		                acceptProdOfferInfoVO : null,
		                prodOfferInfoVO : null,
		                constructor : function() {

		                },
		                postMixInProperties : function() {
			                loadCssModule("orderaccept.prodofferaccept.widget.memberprodoffer.resources.css.member-prodoffer");
			                this.prodOfferInfoVO = $ac$.get("independenceProdOfferInfoVO");
			                $ac$.set("independenceProdOfferInfoVO", null);
			                this.acceptProdOfferInfoVO = this.buildViewInitData();
		                },
		                postCreate : function() {
			                this.inherited(arguments);
			                var nodes = dojo.query(".memeber-prodoffer-select", this.domNode);
			                dojo.forEach(nodes, function(node) {
				                        var attrValue = dojo.attr(node, "prodOfferInstId");
				                        if (attrValue) {
					                        var trNode = util.DomHelper.findParentNode(node, function(node) {
						                                return node.tagName.toUpperCase() == 'TR';
					                                }),
						                        offerInstVO = ($ac$
						                                .query("$.userHasProdOfferInfoList[?(@.prodOfferInstId=="
						                                        + attrValue + ")]"))[0],
						                        checkNode = dojo.query(".member-product-checkbox", trNode)[0];
					                        dojo.attr(checkNode, {
						                                disabled : true,
						                                checked : true
					                                })
					                        // checkNode.disabled =
					                        // true;
					                        // checkNode.checked =
					                        // true;
					                        var options = node.options,
						                        len = options.length;
					                        for (var index = 0; index < len; index++) {
						                        if (options[index].value == offerInstVO.prodOfferId) {
							                        node.value = offerInstVO.prodOfferId;
							                        break;
						                        }
					                        }
					                        
				                        }
			                        });
			                this.updateOperStatus();
		                },
		                updateOperStatus : function() {
			                var nodes = dojo.query(".member-product-tr", this.domNode);
			                dojo.forEach(nodes, function(node) {
				                        var enterComb = dojo.attr(node, "enterComb");
				                        if (enterComb) {
					                        var keepNode = dojo.query(".member-offer-keep", node)[0];
					                        keepNode.innerHTML = "变组合";
				                        }
				                        
			                        });
			                
		                },
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
					                return this.onProductChange();
					                break;
				                case ACTION_CD_CONST.MEMBER_OFFER_CHANGE :
					                return this.onProductChange();
					                break;
				                
			                }
			                
		                },
		                
		                onProductInstall : function() {
			                return dojo.clone(this.prodOfferInfoVO);
		                },
		                onProductChangeMain : function() {
			                return this[$ac$.get('processId')]();
		                },
		                single2independence : function() {
			                var clonedProdOfferInfoVO = this.constructClonedProdOfferInfoVO(this.prodOfferInfoVO),
				                widget = this,
				                prodOfferInstId = $ac$.get("requestParam").prodOfferInstId,
				                offerInstVO = $ac$.query("$.userHasProdOfferInfoList[?(@.prodOfferInstId=="
				                        + prodOfferInstId + ")]")[0],
				                oldProdOfferInfoVO = $ac$.query("$.userHasProdOfferMetaInfoList[?(@.prodOfferId=="
				                        + offerInstVO.prodOfferId + ")]")[0],
				                accessProductIdList = BusCard.jsonPath(offerInstVO,
				                        "$.prodInstList[?(@.serviceRelationVO!=null)].productId"),
				                notOrderOfferRelaList = this.filterNotOrderedOfferProdRelaList(accessProductIdList),
				                orderedOfferRelaList = this.filterOrderdOfferRelaList(accessProductIdList);
			                dojo.forEach(orderedOfferRelaList, function(offerRela) {
				                        var productId = offerRela.productInfoVO.productId;
				                        offerRela.offerInstVO = offerInstVO;
				                        offerRela.ifDefault = 1;
				                        offerRela.enterComb = "1";
				                        offerRela.prodOfferInstId = offerInstVO.prodOfferInstId;
				                        offerRela.memberStatus = widget.buildMemberStatus(offerInstVO,
				                                oldProdOfferInfoVO);
				                        
			                        });
			                clonedProdOfferInfoVO.offerProdRelaList = [].concat(orderedOfferRelaList)
			                        .concat(notOrderOfferRelaList);
			                return clonedProdOfferInfoVO;
			                
		                },
		                constructClonedProdOfferInfoVO : function(prodOfferInfoVO) {
			                var obj = {};
			                for (var index in prodOfferInfoVO) {
				                if (!(dojo.isArray(prodOfferInfoVO[index]) || dojo.isObject(prodOfferInfoVO[index]))) {
					                obj[index] = prodOfferInfoVO[index];
				                }
			                }
			                return obj;
		                },
		                
		                buildMemberStatus : function(offerInstVO, offerProdRela) {
			                var memeberProdOfferInfoVO = BusCard.jsonPath(offerProdRela,
			                        "$.relatedOfferList[?(@.prodOfferId==" + offerInstVO.prodOfferId + ")]")[0];
			                var text = "";
			                if (memeberProdOfferInfoVO) {
				                text = "已有/" + memeberProdOfferInfoVO.prodOfferName + "/"
				                        + offerInstVO.prodInstList[0].accNbr;
			                } else {
				                text = "已有/" + offerProdRela.prodOfferName + "/" + offerInstVO.prodInstList[0].accNbr;
			                }
			                
			                return text;
			                
		                },
		                filterNotOrderedOfferProdRelaList : function(productIdList) {
			                var widget = this;
			                return dojo.filter(widget.prodOfferInfoVO.offerProdRelaList, function(offerRela) {
				                        return dojo.every(productIdList, function(productId) {
					                                return productId != offerRela.productInfoVO.productId;
				                                });
			                        });
			                
		                },
		                filterOrderdOfferRelaList : function(productIdList) {
			                var widget = this;
			                return dojo.clone(dojo.filter(widget.prodOfferInfoVO.offerProdRelaList,
			                        function(offerRela) {
				                        return dojo.some(productIdList, function(productId) {
					                                return productId == offerRela.productInfoVO.productId;
				                                });
			                        }));
			                
		                },
		                /**
						 * TODO 考虑到系统安全性,这里面的使用大量clone方法,因此存在效率问题
						 * 
						 * @method
						 */
		                onProductChange : function() {
			                var clonedProdOfferInfoVO = this.constructClonedProdOfferInfoVO(this.prodOfferInfoVO);
			                var widget = this,
				                offerInstList = $ac$.get("userHasProdOfferInfoList"),
				                prodOfferList = $ac$.get("prodOfferList"),
				                requestParam = $ac$.get("requestParam"),
				                prodOfferInstId = requestParam.prodOfferInstId,
				                relationType = ConstantsPool.load("ItemRelationTypeConst").ItemRelationTypeConst.OFFER_COMB_MEMBER,
				                instVO = $ac$.query("$.userHasProdOfferInfoList[?(@.prodOfferInstId==" + prodOfferInstId + ")]")[0],
				                memberOfferInstIdList = BusCard.jsonPath(instVO,
				                        "$.offerInstRelaList[?(@.relationTypeCd==" + relationType
				                                + ")].relatedProdOfferInstId"),
				                jsonQuery = "$.userHasProdOfferInfoList[?(" + dojo.map(memberOfferInstIdList, function(id) {
					                        return " @.prodOfferInstId==" + id + "||";
					                        
				                        }).join("") + "false" + ")]",
				                memberOfferInstList = $ac$.query(jsonQuery),
				                // 根据productId查找销售品-产品关联VO
				                findOfferProdRela = function(productId) {
					                return dojo.filter(widget.prodOfferInfoVO.offerProdRelaList, function(rela) {
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
				                orderedOfferProdRelaList = dojo.map(memberOfferInstList, function(memberOfferInst) {
					                        var prodInstVO = memberOfferInst.prodInstList[0],
						                        vo = dojo.clone(findOfferProdRela(prodInstVO.productId));
					                        vo.offerInstVO = memberOfferInst;
					                        vo.prodOfferInstId = memberOfferInst.prodOfferInstId;
					                        vo.memberStatus = widget.buildMemberStatus(memberOfferInst, vo);
					                        vo.ifDefault = 1;
					                        return vo;
					                        
				                        }),
				                notOrderedOfferProdRelaList = dojo.filter(widget.prodOfferInfoVO.offerProdRelaList,
				                        function(offerRela) {
					                        return !findOfferInst(offerRela.productId);
				                        }),
				                computedOfferProdRelaList = [].concat(orderedOfferProdRelaList,
				                        notOrderedOfferProdRelaList);
			                clonedProdOfferInfoVO.offerProdRelaList = computedOfferProdRelaList;
			                return clonedProdOfferInfoVO;
			                
		                }
		                
	                });
	        
        });
