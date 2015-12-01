BusCard.define('/orderaccept/attrapp/attr_prod_300130.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	var cityMap = {
		'187' : 1101,
		'180' : 1102,
		'189' : 1103,
		'186' : 1104,
		'720' : 1105,
		'183' : 1106,
		'182' : 1107,
		'188' : 1108,
		'181' : 1109,
		'185' : 1110,
		'184' : 1111
	};
	
			(function(){
				Me.$('300130').value=cityMap[BusCard.$session.cityCode];
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
