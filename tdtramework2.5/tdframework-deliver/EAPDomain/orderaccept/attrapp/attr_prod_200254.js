BusCard.define('/orderaccept/attrapp/attr_prod_200254.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch=function(){
				var Me = this;
				if(!!$ac$.get("groupProdInstInfo")){
					var groupProdInstVO = $ac$.get("groupProdInstInfo");
					var prodInstAttrVO = BusCard.$remote("prodInstCommFacadeBO")
							.getProdInstAttrByInstIdAndAttrCd(
									groupProdInstVO.prodInstId,
									groupProdInstVO.cityCode, "200254");
					if(!!prodInstAttrVO){
						Me.$("200254").value = prodInstAttrVO.attrValue;
					}
				}
	        };
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	        /**
	         * 综合查询页面处理分支
	         * @method
	         */
	        var allInfoQueryPageDispatch = function() {};
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
