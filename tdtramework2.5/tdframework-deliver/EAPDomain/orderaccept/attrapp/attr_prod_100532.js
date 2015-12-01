BusCard.define('/orderaccept/attrapp/attr_prod_100532.js',function(_buscard,cardParam){
	        /*预约安装提醒号码JS*/
	        var prodOfferAcceptPageDispatch=function(){
	        	
    			var Me = this;
	            var widget = dijit.getEnclosingWidget(Me.dom);
	            var prodInstVO=widget.prodInstVO;
	            var prodInstAttrList = null;
	            var instVO = null;
	            if(!!prodInstVO){
		            prodInstAttrList = prodInstVO.prodInstAttrList;
		        	instVO = prodInstAttrList.find(function(inst) {
		                 return inst.attrId == '100532';
		              });
	            }
	            if(!instVO){
					Me.$("100532").value = $ac$.requestParam.linkPhone;
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
