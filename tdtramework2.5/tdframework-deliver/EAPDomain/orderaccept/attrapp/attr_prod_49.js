BusCard.define('/orderaccept/attrapp/attr_prod_49.js',function(_buscard,cardParam){ 
    var prodOfferAcceptPageDispatch=function(){
		var Me = this;
		//用户名称
		var uniqueId = "";
 		var serviceCardWidgetMap =  prodOfferAcceptLoader.serviceCardWidgetMap;
	    var serviceCardWidget = null;
		if($ac$.selectedMainProdOfferInfoVO.bindType == 2){
			var multipleMainProdOfferWidget =orderaccept.prodofferaccept.util.DomHelper.
								getParentWidget(Me.$("49"),"unieap.layout.ContentPane");
				uniqueId = multipleMainProdOfferWidget.uniqueId;			
		}else{
			var mainProdOfferWidget = prodOfferAcceptLoader.mainProdOfferWidget;
			if(!!mainProdOfferWidget){
				var prodBasicTRs = dojo.query(".main-product-basic",mainProdOfferWidget.domNode);
				if((!prodBasicTRs)||prodBasicTRs.length ==0){
					return;
				}
				//直接取第一个
				uniqueId = dojo.attr(prodBasicTRs[0],"uniqueId");
			}
		}
    	for(var p in serviceCardWidgetMap){
    		if (!serviceCardWidgetMap.hasOwnProperty(p)) {
		        continue;
	        }
    		if(p == ("serviceCardWidget_"+uniqueId)){
				serviceCardWidget = serviceCardWidgetMap[p];
				break;
    		}
		}
		if(!serviceCardWidget){
			return;
		}
		if(!!serviceCardWidget.busCardInstance.$("serviceId")){			
			Me.$("49").value = serviceCardWidget.busCardInstance.$("serviceId").value;
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
