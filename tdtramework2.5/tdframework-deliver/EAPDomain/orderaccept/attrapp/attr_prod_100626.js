/**
 * 接应标识”两端接入类产品一个选择"发起端",一个选择"接应端"不能相同 ddn产品接应标识属性处理
 */
BusCard.define('/orderaccept/attrapp/attr_prod_100626.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch = function() {
		        // 只处理DDN产品
		        try {
			        var widget = dijit.getEnclosingWidget(this.dom),
				        productInfoVO = widget.productInfoVO;
			        if (productInfoVO.netType != 54) { return false; }
		        }
		        catch (e) {}
		        var card = this,
			        attrCd = "100626",
			        targetNode = card.$(attrCd),
			        getAttrVO = function(attrCd) {
				        return dojo.filter(productInfoVO.attrList, function(attrVO) {
					                return attrVO.attrCd == attrCd;
				                })[0];
			        },
			        getProdInstVO = function() {
				        var userId;
				       if(card.getParent()){
				         userId = card.getParent().getCardRelationInfo().userId;
				       }else{
				         userId=$('userId').value;
				       }
				       
				        if (userId && userId != 0) {
					        var list = BusCard.jsonPath($ac$.get("mainProdOfferInstVO"),
					                "$.prodInstList[?(@.prodInstId==" + userId + ")]");
					        return list && list[0];
				        }
			        };
		        if (targetNode) {
			        var valueList = dojo.map(dojo._toArray(targetNode.options), function(op) {
				                return op.value;
			                });
			        targetNode.onchange = function() {
				        var self = this,
					        otherValue = dojo.filter(valueList, function(value) {
						                return value != self.value;
					                })[0],
					        allNodes = dojo.query("select[id=" + attrCd + "]");
				        dojo.forEach(dojo.filter(allNodes, function(item) {
					                        return item !== self;
				                        }), function(currentItem) {
					                currentItem.value = otherValue;
				                });
			        };
			        BusCard.dispatchEvent(targetNode, "change");
		        }
		        // 变更时特殊处理
		        !function() {
			        try {
				        var prodInstVO = getProdInstVO(),
					        getProdInstAttrVO = function(cd) {
						        if (prodInstVO) { return BusCard.jsonPath(prodInstVO.prodInstAttrList || [],
						                "$[?(@.attrCd==" + cd + ")]")[0]; }
					        };
				        var targetAttrInstVO = getProdInstAttrVO(attrCd);
				        targetAttrInstVO && (targetNode.value = targetAttrInstVO.attrValue)
				                && BusCard.dispatchEvent(targetNode, "change");
				        
			        }
			        catch (e) {
				        BusCard.showErrorStack(e);
			        }
			        
		        }();
		        
		        // 改单时特殊处理
		        !function() {
			        if (window.$ac$ && window.$ac$.get("orderChangeFlag")) {
				        var controller = window.prodOfferAcceptLoader;
				        // 目前断定存在接入类产品的服务信息
				        var orderItemId = card.getParent().getCardRelationInfo().orderItemId;
				        var prodInstAttrList = controller.custOrderVOHelper.filterOrderItemList(function(item) {
					                return item.orderItemId == orderItemId;
				                })[0].prodInstAttrList || [];
				        var handle = function(attrCd) {
					        var specVO = getAttrVO(attrCd);
					        var instAttrVO = prodInstAttrList.find(function(i) {
						                return i.attrId == specVO.attrId
					                });
					        var node = card.$(attrCd + "");
					        instAttrVO && node && (node.value = instAttrVO.attrValue)
					                && BusCard.dispatchEvent(node, "change");
				        };
				        handle("100626");
			        }
			        
		        }();
		        
	        };
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	        /**
			 * 综合查询页面处理分支
			 * 
			 * @method
			 */
	        var allInfoQueryPageDispatch = function() {};
	        /**
			 * 二次业务处理分支
			 * 
			 * @method
			 */
	        var secondBusinessPageDispatch = function() {
		        var Me = this;
		        prodOfferAcceptPageDispatch.apply(this, arguments);
	        };
	        /**
			 * 批量页面处理分支
			 * 
			 * @method
			 */
	        var batchPageDispatch = function() {};
	        
	        // 调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
        });
