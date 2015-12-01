defineModule("orderaccept.prodofferaccept.behavior.MainProdOfferChgBehavior", ["./ProdOfferNewBehavior", "../util"],
        function(ProdOfferNewBehavior, util) {
	        dojo.declare("orderaccept.prodofferaccept.behavior.MainProdOfferChgBehavior", [ProdOfferNewBehavior], {
		                postscript : function() {
			                this.subscribe();
		                },
		                subscribe : function() {
			                var behavior = this;
			                
			                this.inherited(arguments);
			                // 点击保持触发的动作
			                this.handleRegistry.push(dojo.subscribe("/member-offer-keep/click", function() {
				                        behavior.onMemberProdOfferKeep(arguments[0]);
				                        
			                        }));
			                // 点击拆分触发的动作
			                this.handleRegistry.push(dojo.subscribe("/member-offer-split/click", function() {
				                        behavior.onMemberProdOfferSplit(arguments[0]);
				                        
			                        }));
			                // 点击退网触发的动作
			                this.handleRegistry.push(dojo.subscribe("/member-offer-quit/click", function() {
				                        behavior.onMemberProdOfferQuit(arguments[0]);
				                        
			                        }));
		                },
		                _clickAction : function(evt) {
			                var target = evt.currentTarget;
			                var trNode = util.DomHelper.findParentNode(target, function(p) {
				                        return p.tagName.toUpperCase() == 'TD';
			                        });
			                dojo.forEach(dojo.query(".action-link", trNode), function(node) {
				                        dojo.removeClass(node, "action-selected");
				                        
			                        });
			                dojo.addClass(target, "action-selected");
			                
		                },
		                onMemberProdOfferKeep : function(evt) {
			                this._clickAction(evt);
			                var productTrNode = util.DomHelper.findParentNode(evt.currentTarget, function(node) {
				                        return node.tagName.toUpperCase() == 'TR';
			                        }),
				                userHasProdOfferInfoList = $ac$.get("userHasProdOfferInfoList"),
				                prodOfferInstId = dojo.attr(productTrNode, "prodOfferInstId"),
				                productId = dojo.attr(productTrNode, "productId"),
				                offerInstVO = BusCard.jsonPath(userHasProdOfferInfoList, "$[?(@.prodOfferInstId=="
				                                + prodOfferInstId + ")]")[0],
				                offerProdRela = BusCard.jsonPath($ac$.get("currentMainProdOfferInfoVO"),
				                        "offerProdRelaList[?(@.productId==" + productId + ")]")[0],
				                memberProdOfferNode = dojo.query(".memeber-prodoffer-select", productTrNode)[0];
			                BusCard.$rs(memberProdOfferNode, dojo.map(offerProdRela.relatedOfferList, function(v) {
				                                return {
					                                id : v.prodOfferId,
					                                name : v.prodOfferName
				                                }
				                                
			                                }));
			                dojo.some(offerProdRela.relatedOfferList, function(r) {
				                        return r.prodOfferId == offerInstVO.prodOfferId;
			                        }) ? (memberProdOfferNode.value = offerInstVO.prodOfferId) : null;
			                
		                },
		                onMemberProdOfferSplit : function(evt) {
			                this._clickAction(evt);
			                // FIXME
			                // 这里可以优化:如果此成员必须拆分的话,就不用再调接口取单套餐了,因为初始化时单套餐已经取出
			                // 而且不需要再变更成员套餐列表
			                var productTrNode = util.DomHelper.findParentNode(evt.currentTarget, function(node) {
				                        return node.tagName.toUpperCase() == 'TR';
			                        }),
				                userHasProdOfferInfoList = $ac$.get("userHasProdOfferInfoList"),
				                prodOfferInstId = dojo.attr(productTrNode, "prodOfferInstId"),
				                productId = dojo.attr(productTrNode, "productId"),
				                offerInstVO = BusCard.jsonPath(userHasProdOfferInfoList, "$[?(@.prodOfferInstId=="
				                                + prodOfferInstId + ")]")[0],
				                offerProdRela = BusCard.jsonPath($ac$.get("currentMainProdOfferInfoVO"),
				                        "offerProdRelaList[?(@.productId==" + productId + ")]")[0],
				                memberProdOfferNode = dojo.query(".memeber-prodoffer-select", productTrNode)[0],
				                // FIXME 这里可以缓存
				                singleProdOfferList = prodOfferAcceptLoader
				                        .route("url:orderDetailAction.do?method=doGetProdOfferByAccProductId&productId="
				                                + productId+"&prodOfferId="+offerInstVO.prodOfferId);
			                singleProdOfferList.sort(function(param1,param2){
				        		return (param1.prodOfferName).localeCompare(param2.prodOfferName);
				        	});
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
		                onMemberProdOfferQuit : function(evt) {
			                this._clickAction(evt);
		                }
		                
	                });
	        
        });