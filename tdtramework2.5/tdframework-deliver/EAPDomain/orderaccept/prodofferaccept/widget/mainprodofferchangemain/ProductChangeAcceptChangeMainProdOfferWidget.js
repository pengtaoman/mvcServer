defineModule("orderaccept.prodofferaccept.widget.mainprodofferchangemain.ProductChangeAcceptChangeMainProdOfferWidget", [
                "./ChgMainProdOfferWidget", "../../util"], function(ChgMainProdOfferWidget, util) {
	        var mm = "orderaccept.prodofferaccept.widget.mainprodofferchangemain.ProductChangeAcceptChangeMainProdOfferWidget";
	     
	        dojo.declare(mm, [ChgMainProdOfferWidget], {

		        /**
		         * 变更主销售品的开始时间的特殊处理
		         */
	        	getDealNewMainProdOfferBEGTIMEStartDate : function(){
		        	return dojo.global.$appContext$.requestParam.today;
		        },
	        	getQuitMainOfferEffDate :function(){
	        		return dojo.global.$appContext$.requestParam.today;
	        	},
	        	getDealOfferStandardTimeStartDate :function(){
	        		return dojo.global.$appContext$.requestParam.today;
	        	}
	        });
	        
        });