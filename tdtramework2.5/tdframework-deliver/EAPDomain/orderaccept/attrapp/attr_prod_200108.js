BusCard.define('/orderaccept/attrapp/attr_prod_200108.js', function(_buscard,
		cardParam) {
	var prodOfferAcceptPageDispatch = function() {
		var Me = this;
    	var ConstantsPool = dojo.require("orderaccept.common.js.ConstantsPool");
		var ProductIdConst = ConstantsPool.load("ProductIdConst").ProductIdConst;
		
		// VPDN个人用户密码变更不能修改
		if(!!$ac$.groupProdInstInfo
			&&$ac$.groupProdInstInfo.productId==ProductIdConst.VPDN
			&&Me.$("200108").value!=""){
			Me.$("200108").readOnly=true;
		}

	};
	var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	/**
	 * 综合查询页面处理分支
	 * 
	 * @method
	 */
	var allInfoQueryPageDispatch = function() {
	};
	/**
	 * 二次业务处理分支
	 * 
	 * @method
	 */
	var secondBusinessPageDispatch = function() {
	};
	/**
	 * 批量页面处理分支
	 * 
	 * @method
	 */
	var batchPageDispatch = function() {
	};

	// 调用具体分支处理逻辑
	return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
