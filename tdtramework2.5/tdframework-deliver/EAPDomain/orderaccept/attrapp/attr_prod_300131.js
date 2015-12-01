BusCard.define('/orderaccept/attrapp/attr_prod_300131.js',function(_buscard,cardParam){ 
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	Me.$("300131").onblur = function(){
		var currentValue = Me.$("300131").value;
		if(currentValue==""){
			return;
		}
		if(!/^\d+$/.test(currentValue)){
			orderaccept.common.dialog.MessageBox.alert({
				message:"请输入整数数字!"
			});
			Me.$("300131").value="";
			return false;
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
