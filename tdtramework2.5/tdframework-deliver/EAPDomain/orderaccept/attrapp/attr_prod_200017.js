BusCard.define('/orderaccept/attrapp/attr_prod_200017.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch=function(){
	//取集团军网属性，用户和集团保持一致。
	var Me = this;
	var groupKind = !!$ac$.get("groupInfo")?$ac$.get("groupInfo").groupKind:"";
	if(groupKind&&groupKind=="D"){
		Me.$("200017").checked=true;	
	}else{
		Me.$("200017").checked=false;
	}
	Me.$("200017").disabled = true;
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
