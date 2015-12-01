BusCard.define('/orderaccept/attrapp/attr_prod_1.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	if(!!Me.$("1")){//再次输入认证密码
		Me.$("1").onblur = function(){
		   if(Me.$("1").value!=""){
				if(Me.$("191") && Me.$("191").value != "" && Me.$("191").value!= Me.$("1").value){
					alert("\u3010\u518d\u6b21\u8f93\u5165\u8ba4\u8bc1\u5bc6\u7801\u3011\u4e0e\u3010\u8ba4\u8bc1\u5bc6\u7801\u3011\u4e0d\u4e00\u81f4,\u8bf7\u91cd\u65b0\u8f93\u5165");
					Me.$("1").value = "";
				}
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
