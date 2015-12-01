BusCard.define('/orderaccept/attrapp/attr_prod_300058.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;  
	Me.$("300058").onblur=function(){
		if(!/^0?1[358]\d{9}$/i.test(Me.$("300058").value)){
		   if(!/^(0[1-9]{2,3})?[1-9]\d{6,7}$/i.test(Me.$("300058").value)){
		   		alert("\u56fa\u8bdd\u6216\u8005\u624b\u673a\u53f7\uff0c\u5982\u679c\u662f\u56fa\u8bdd\u5fc5\u987b\u5e26\u533a\u53f7");
		   		Me.$("300058").value="";
		   }
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
