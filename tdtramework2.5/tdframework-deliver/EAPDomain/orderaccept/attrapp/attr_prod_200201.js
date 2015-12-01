BusCard.define('/orderaccept/attrapp/attr_prod_200201.js',function(_buscard,cardParam){ 
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	Me.$("200201").onblur = function(){
		var maxUser=Me.$("200201").value;
		if(Me.$("200201").value!=""){
			if(!/^\d+$/i.test(Me.$("200201").value)){
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410217"});
				Me.$("200201").value="";
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
