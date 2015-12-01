BusCard.define('/orderaccept/attrapp/attr_prod_100543.js',function(_buscard,cardParam){
	        /*到期提醒号码处理JS*/
	        var prodOfferAcceptPageDispatch=function(){
	        	Me.$("100543").onblur = function(){
	        		 if(!Me.$("100543").value){
	        		 	return false;
	        		 }
           	 		 var list = BusCard.$remote("prodInstCommFacadeBO").getServiceRelationByServiceId({
	            					"serviceId":Me.$("100543").value,
	            					"ifValid":"1"			            					
           	 					 });
           	 		if(!list || list.length == 0){           	 		
						orderaccept.common.dialog.MessageBox.alert({
							message:"到期提醒号码需为在网有效号码！"
						});
						Me.$("100543").value="";
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
	        var secondBusinessPageDispatch = function() {
	         return prodOfferAcceptPageDispatch.apply(this,arguments);
	        
	        };
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {};
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
