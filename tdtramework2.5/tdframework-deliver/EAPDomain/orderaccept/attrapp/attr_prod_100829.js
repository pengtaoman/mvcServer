BusCard.define('/orderaccept/attrapp/attr_prod_100829.js', function(_buscard,
		cardParam) {
	
	var prodOfferAcceptPageDispatch = function() {	
		var Me = this;
        var prodChgClass = "orderaccept.prodofferaccept.loader.ProductChangeAcceptLoader";
        var prodOfferAcceptLoader = dojo.getObject("prodOfferAcceptLoader");
		if(!!prodOfferAcceptLoader && prodOfferAcceptLoader.declaredClass == prodChgClass){
			var serviceRelation = !!Me.getParent() ?Me.getParent().getCardRelationInfo():null;
			if(!!serviceRelation && !!serviceRelation.serviceId){	
				var serviceId = serviceRelation.serviceId;
				var length = serviceId.length;
				Me.$("100829").value = serviceId.substring(length-7,length);
			}
		}	
        
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
