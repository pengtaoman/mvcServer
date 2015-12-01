BusCard.define('/orderaccept/attrapp/attr_prod_300125.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	
	/**
	 * 改单时才做次处理，新装不做该处理
	 */
	(function(){
		if($ac$.get("orderChangeFlag")== 1){
			Me.$('300125').setAttribute('isnull',0);
			var temp =Me.$('300125').parentNode.previousSibling.innerHTML;
			Me.$('300125').parentNode.previousSibling.innerHTML = "<span class='formRequested'>*</span>"+temp;
		}
	})();
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
