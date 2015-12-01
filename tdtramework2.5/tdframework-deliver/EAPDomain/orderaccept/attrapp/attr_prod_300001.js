BusCard.define('/orderaccept/attrapp/attr_prod_300001.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch=function(){
	        var attrCard = this;
	        dojo.subscribe("/buscard/uimId/blur", function(evt) {
		                // uimid dom
		                // for compatibility
		                var executeRequest = _buscard.executeRequest;
		                var dom = evt.currentTarget;
		                var serviceBusCardWidget = dijit.getEnclosingWidget(dom);
		                var currentAttrCard = serviceBusCardWidget.attrCardWidget.busCardInstance;
		                var serviceCardParam = serviceBusCardWidget.busCardInstance.getCardRelationInfo();
		                if (currentAttrCard === attrCard) {
			                // add by liuzhongwei 2120422 给是否是双模卡赋值
			                // start
			                if (dom.value) {
				                var queryInfoObj = {
					                "IF_GC_CARD" : "0"
				                };
				                var queryJsonInfo = _buscard.util.toJson(queryInfoObj);
				                var param = "mktResType=2&mktResId=" + dom.value + "&productId="
				                        + serviceCardParam.productId + "&serviceOfferId="
				                        + serviceCardParam.serviceOfferId + "&queryJsonInfo=" + queryJsonInfo;
				                var resultJsonStr = executeRequest('prodOfferSaleAjaxAction', 'getQueryResourceInfo',
				                        param);
				                var jsonResultObj = (typeof resultJsonStr == 'string')
				                        ? eval("(" + resultJsonStr + ")")
				                        : resultJsonStr;
				                if (jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1") {
					                attrCard.$('300001').value = jsonResultObj.allId.IF_GC_CARD;
				                } else {
					                attrCard.$('300001').value = "";
				                }
			                }
			                // add by liuzhongwei 2120422 给是否是双模卡赋值
			                // end
		                }
	                });
	        };
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	        /**
	         * 综合查询页面处理分支
	         * @method
	         */
	        var allInfoQueryPageDispatch = function() {
	        	var attrCard = this;
	        	var prodInstVO = cardParam.prodInstVO;
	        	var prodInstAttrList = prodInstVO.prodInstAttrList;
	        	var instVO = prodInstAttrList.find(function(inst) {
	                return inst.attrId == 300001;
                });
        		if(instVO.attrValue==1){
        			instVO.attrValue ='是';
        		}else{
        			instVO.attrValue = '否';
        		}
	        };
	        /**
	         * 二次业务处理分支
	         * @method
	         */
	        var secondBusinessPageDispatch = function() {};
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {};
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
        });
