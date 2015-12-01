BusCard.define('/orderaccept/attrapp/attr_prod_200203.js',function(_buscard,cardParam){ 
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	var rentTypeChg = function(){
		var rentType = Me.$("200203").value;
		if(rentType == "1"){
			if(dojo.getObject("prodOfferAcceptLoader.mainProdOfferDetailWidget.prodOfferAttrCard.busCardInstance")!=null){
				var pricObj= prodOfferAcceptLoader.mainProdOfferDetailWidget.prodOfferAttrCard.busCardInstance.$("300003");
				if(pricObj!=null){
					pricObj.value = "";
				}
			}			
		}else if(rentType == "2"){
			Me.$("200129").onblur();
		}
	};
	Me.$("200203").onchange = rentTypeChg;
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
