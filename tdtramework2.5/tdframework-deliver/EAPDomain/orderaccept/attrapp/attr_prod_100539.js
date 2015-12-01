BusCard.define('/orderaccept/attrapp/attr_prod_100539.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	        	var Me = this;
	        	(function(){
					var parentDom = dijit.getEnclosingWidget(Me.getParent().dom);
					var model = parentDom.getModel();
			    	var serviceCardWidgetMap =  prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_" + model.cardParam.uniqueId];
					if($ac$.get("orderChangeFlag")== 1){
						//不做处理
					}else{
						//如果不为新装或者换受理,则不提交数据 
						if(serviceCardWidgetMap.cardParam.serviceOfferId!=ConstantsPool.load("ServiceOfferIDConst").ServiceOfferIDConst.PROD_NEW
						&&serviceCardWidgetMap.cardParam.serviceOfferId!=ConstantsPool.load("ServiceOfferIDConst").ServiceOfferIDConst.PRODUCT_CHANGE_ACCEPT){
							Me.$("100539").setAttribute('isnull',1);
      						Me.$("100539").removeAttribute('controlFieldName');
						}
					}
				})();
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
	        };
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {};
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
