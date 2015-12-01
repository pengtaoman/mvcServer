BusCard.define('/orderaccept/attrapp/attr_prod_100544.js',function(_buscard,cardParam){
	        /*到期提醒处理JS*/
	        var prodOfferAcceptPageDispatch=function(){
	        
    			var Me = this;
	            var widget = dijit.getEnclosingWidget(Me.dom);
	            var prodInstVO=widget.prodInstVO;
	            var prodInstAttrList = null;
	            var instVO = null;
	            if(!!prodInstVO){
		            prodInstAttrList = prodInstVO.prodInstAttrList;
		        	instVO = prodInstAttrList.find(function(inst) {
		                 return inst.attrId == '100544';
		              });
	            }
				Me.$("100544").checked = true;
                if(!!instVO && instVO.attrValue == "0"){
					Me.$("100544").checked = false;
                }
	        	Me.$("100544").onclick = function(){
	        		if(Me.$("100544").checked == true){
	        			Me.$("100544").value = "1";
	        			Me.$("100543").setAttribute('isnull',0);
	        		}else{
	        			Me.$("100544").value = "0";
	        			Me.$("100543").setAttribute('isnull',1);
	        		}
	        	}
				Me.$("100544").onclick();};
	        
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
