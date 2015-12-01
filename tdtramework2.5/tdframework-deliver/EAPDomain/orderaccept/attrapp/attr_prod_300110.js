BusCard.define('/orderaccept/attrapp/attr_prod_300110.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	
	Me.dealRelAttr300112 = function(){
		if(Me.$("300112")){
			if(Me.$("300110").value == 1 || Me.$("300110").value == '1' ){
				Me.$("300112").value="";
				Me.$("300112").style.display = "";
				Me.$("300112").parentNode.style.display = "";
				Me.$("300112").parentNode.previousSibling.style.display = "";
			}else{
				Me.$("300112").value="";
				Me.$("300112").style.display = "none";
				Me.$("300112").parentNode.style.display = "none";
				Me.$("300112").parentNode.previousSibling.style.display = "none";
			}
		}
	};
	
	Me.$("300110").onchange = function(){
		Me.dealRelAttr300112();
	};
	
	Me.dealRelAttr300112();
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
