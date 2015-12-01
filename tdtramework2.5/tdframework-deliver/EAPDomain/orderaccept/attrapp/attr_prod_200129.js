BusCard.define('/orderaccept/attrapp/attr_prod_200129.js',function(_buscard,cardParam){ 
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	var monthlyRentChg = function(){
		if(dojo.getObject("prodOfferAcceptLoader.mainProdOfferDetailWidget.prodOfferAttrCard.busCardInstance")!=null){
			var pricObj= prodOfferAcceptLoader.mainProdOfferDetailWidget.prodOfferAttrCard.busCardInstance.$("300003");
			if(pricObj!=null && Me.$("200203").value == 2){
				pricObj.value = Me.$("200129").value;
			}
		}
	};
	Me.$("200129").onblur = monthlyRentChg;
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
