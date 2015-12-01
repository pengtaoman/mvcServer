BusCard.define('/orderaccept/attrapp/attr_prod_300109.js',function(_buscard,cardParam){ 
	        var prodOfferAcceptPageDispatch=function(){
	        	var Me =this;
	        	Me.$("300109").onblur = function(){
	        		var currentValue = Me.$("300109").value;
	        		if(!/^\d+$/.test(currentValue)){
	        			orderaccept.common.dialog.MessageBox.alert({
	        				message:"工作区面积必须为大于等于0的整数"
	        			});
	        			Me.$("300109").value = "";
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
