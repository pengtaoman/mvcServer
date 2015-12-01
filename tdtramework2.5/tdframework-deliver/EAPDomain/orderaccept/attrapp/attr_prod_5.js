BusCard.define('/orderaccept/attrapp/attr_prod_5.js',function(_buscard,cardParam){ 
	        var prodOfferAcceptPageDispatch=function(){
	dojo.require("orderaccept.prodofferaccept.util");
	var Me = this;
	Me.$("5").onblur = function(){		
		if(Me.$("5").value == ""){
			return;
		}
		var currentValue = Me.$("5").value;
		var flag = 1;
    	var serviceList = BusCard.$remote("prodInstCommFacadeBO").getProdInstByPropertiesExceptSubService({"accNbr":currentValue});
		if(!serviceList || serviceList.length <= 0 ){
			alert("\u53f7\u7801["+currentValue+"]\u975e\u6709\u6548\u53f7\u7801,\u8bf7\u91cd\u65b0\u8f93\u5165");
			flag = 0;
		}
		if(flag == 0){
			Me.$("5").value = "";
		}
	};
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
