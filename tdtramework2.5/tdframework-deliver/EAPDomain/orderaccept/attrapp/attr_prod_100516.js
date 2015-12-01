BusCard.define('/orderaccept/attrapp/attr_prod_100516.js', function(_buscard,
		cardParam) {
	
	var prodOfferAcceptPageDispatch = function() {
		var Me = this;
		
		(function(){
			var parentDom = dijit.getEnclosingWidget(Me.getParent().dom);
			var model = parentDom.getModel();
			var unshiftNullSelectOption = function(list) {
				return [ {
					name : '\u9ed8\u8ba4\u7f3a\u7701\u9009\u9879',
					id : '',
					ids : ''
				} ].concat(list || []);
			};
	    	var serviceCardWidgetMap =  prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_" + model.cardParam.uniqueId];
			if($ac$.get("orderChangeFlag")== 1){
				var selectedMemb = dojo.filter($ac$.get("selectedMemberProdOfferList")||[], function(memb) {
                    return memb.uniqueId == model.cardParam.uniqueId;
                })[0];
                if(!!selectedMemb){
                	//获取产品订单项
                	var prodItemVO = selectedMemb.prodItemVO;
                	var prodInstAttrList = prodItemVO.prodInstAttrList;
                	var targetAttrVO = BusCard.find(prodInstAttrList||[],function(info){
                		return info.attrId == 100516;
                	}); 
                	if(!!targetAttrVO){
                		if(Me.$('100516')){
                			Me.$('100516').value = targetAttrVO.attrValue;
                		}
                	}else{
                		BusCard.$rs(Me.$('100516'),unshiftNullSelectOption([]));
                	}
                }
			}else{
				var selectedMemb = dojo.filter($ac$.get("selectedMemberProdOfferList")||[], function(memb) {
	                return memb.uniqueId == model.cardParam.uniqueId;
	            })[0];
	            if(!!selectedMemb){
	            	var prodInstVO = selectedMemb.prodInstVO;
	            	if(!!prodInstVO){
	            		var prodInstAttrList = prodInstVO.prodInstAttrList;
	                	var targetAttrVO = BusCard.find(prodInstAttrList||[],function(info){
	                		return info.attrId == 100516;
	                	}); 
	                	if(!!targetAttrVO){
	                		if(Me.$('100516')){
	                			Me.$('100516').value = targetAttrVO.attrValue;
	                		}
	                	}else{
	                		BusCard.$rs(Me.$('100516'),unshiftNullSelectOption([]));
	                	}
	            	}
	            }
			}
		})();
		
		
        
	};
	
	
	var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	/**
	 * 综合查询页面处理分支
	 * @method
	 */
	var allInfoQueryPageDispatch = function() {
		
	};
	/**
	 * 二次业务处理分支
	 * @method
	 */
	var secondBusinessPageDispatch = function() {
	    
	};
	/**
	 * 批量页面处理分支
	 * @method
	 */
	var batchPageDispatch = function() {
	};

	//调用具体分支处理逻辑
	return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
