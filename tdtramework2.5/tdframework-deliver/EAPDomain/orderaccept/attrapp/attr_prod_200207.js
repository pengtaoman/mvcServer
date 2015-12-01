BusCard.define('/orderaccept/attrapp/attr_prod_200207.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	var	param = $ac$.requestParam.groupProdOfferInstId;
	var prodInstVOList = BusCard.$remote("prodInstCommFacadeBO").getProdInstByOfferInstId(param);
	var groupProdInstVO = dojo.filter(prodInstVOList,function(prodInstInfo){
		                			return prodInstInfo.prodTypeCd == '13';//13 群组 70 子群
		                		})[0];
	Me.$("200207").value = !!groupProdInstVO?groupProdInstVO.accNbr:"";
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
