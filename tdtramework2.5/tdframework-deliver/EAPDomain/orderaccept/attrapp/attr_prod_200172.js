BusCard.define('/orderaccept/attrapp/attr_prod_200172.js',function(_buscard,cardParam){ 
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	Me.$("200172").onblur = function(){
		if(Me.$("200172").value!=""){
			if(!/^[1-9]\d*$/i.test(Me.$("200172").value)){
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410232"});
				Me.$("200172").value="";
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
