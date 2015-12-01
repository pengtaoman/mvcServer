BusCard.define('/orderaccept/attrapp/attr_prod_200112.js',function(_buscard,cardParam){ 
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
//	var list = BusCard.$remote("customerParamBO").getMainIdentityKind().list;
//	BusCard.$rs(Me.$("200112"),list);
	Me.$("200175").onblur = function(){
		var index = Me.$("200112").selectedIndex;
		var alertName = Me.$("200112").options[index].text;
		checkid_iden_new(alertName,Me.$("200112"),Me.$("200175"));
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
