BusCard.define('/orderaccept/attrapp/attr_prod_200212.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch=function(){
	dojo.require("orderaccept.prodofferaccept.util");
	var Me = this;
	if($ac$.requestParam.customerData.groupFlag==2){//集团客户	
		var param = {custId:$ac$.requestParam.customerData.custId};		
	}else{//个人客户
		var param = {custId:dojo.byId("common-groupId").value};
	}
	var groupInfoVO = BusCard.$remote("groupInfoDAO").queryByCustId(param);
	Me.$("200212").value = !!groupInfoVO?groupInfoVO.groupId:"";
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
