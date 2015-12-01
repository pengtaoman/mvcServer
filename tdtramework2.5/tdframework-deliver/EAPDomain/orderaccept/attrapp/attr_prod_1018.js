BusCard.define('/orderaccept/attrapp/attr_prod_1018.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch=function(){
	        	var Me=this;
	        	if(!!Me.$("1019")){
	        		if(Me.$("1018").value==2){
	        			Me.$("1019").setAttribute("isnull","0")
						dojo.place("<span class=\"formRequested\">*</span>",Me.$("label_1019"),"first");
	        		}
	        	}
	        	Me.$("1018").onchange = function(){
	        		if(!!Me.$("1019")){
	        			if(Me.$("1018").value==2){
		        			Me.$("1019").setAttribute("isnull","0")
							dojo.place("<span class=\"formRequested\">*</span>",Me.$("label_1019"),"first");
		        		}else{
		        			Me.$("1019").setAttribute("isnull","1")
							Me.$("label_1019").innerText="定制版客户服务器URL：";
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
