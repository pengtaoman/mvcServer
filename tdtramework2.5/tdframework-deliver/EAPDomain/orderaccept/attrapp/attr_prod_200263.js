BusCard.define('/orderaccept/attrapp/attr_prod_200263',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	        	var Me=this;
	        	Me.$("200263").onblur = function(){
	        		if(Me.$("200263").value!=""&&!/^(\d|[a-zA-Z]|\.|-|_)*$/.test(Me.$("200263").value)){
	        			orderaccept.common.dialog.MessageBox.alert({
	        				message:"该账号含有非法字符(账号组成只允许数字、英文字母、点号[.]、中横杠[-]、下横杠[_]组合而成)，请重新输入"
	        			});
	        			Me.$("200263").value = "";
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
