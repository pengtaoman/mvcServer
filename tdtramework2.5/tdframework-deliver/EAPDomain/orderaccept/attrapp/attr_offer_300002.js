BusCard.define('/orderaccept/attrapp/attr_offer_300002.js',function(_buscard,cardParam){ 
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	Me.$("300002").onblur = function(){
		var discountRate=Me.$("300002").value;
		if(discountRate!=""){
			//判断折扣率为正整数
			if(!/^\+?[1-9][0-9]*$/i.test(discountRate)){
				Me.$("300002").value="";
				alert("折扣率必须为正整数");
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
