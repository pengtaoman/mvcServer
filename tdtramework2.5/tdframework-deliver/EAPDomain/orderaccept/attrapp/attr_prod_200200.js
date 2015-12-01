BusCard.define('/orderaccept/attrapp/attr_prod_200200.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch=function(){
	dojo.require("orderaccept.prodofferaccept.util");
	//集团用户商务总机号码的验证
	var Me = this;
	Me.$("200200").onblur=function(){
		if(Me.$("200200").value!=""){
			var param = {custId:$ac$.requestParam.customerData.custId};		
			var groupInfoVO = BusCard.$remote("groupInfoDAO").queryByCustId(param);
				if(groupInfoVO!="null"){
				    var groupId=groupInfoVO.groupId;
				    var count=BusCard.$remote("groupUserInfoDAO").count({groupId:groupId,serviceId:Me.$("200200").value,ifValid:"1"});
				    if(!!count){
				    	if(count<=0){
				    		alert("\u6b64\u53f7\u7801\u4e0d\u662f\u96c6\u56e2\u7528\u6237");
				   		 	Me.$("200200").value="";
				    	}
				    }else{
				   		 alert("\u6b64\u53f7\u7801\u4e0d\u662f\u96c6\u56e2\u7528\u6237");
				   		 Me.$("200200").value="";
				    }
				}else{
					alert("\u6b64\u53f7\u7801\u4e0d\u662f\u96c6\u56e2\u7528\u6237");
					Me.$("200200").value="";
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
