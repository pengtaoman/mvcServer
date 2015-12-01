BusCard.define('/orderaccept/attrapp/attr_prod_200091.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch=function(){
				 var Me = this;
				 Me.managerCheck=function(evt){
				 	 var dom = evt.currentTarget;
				 	 if(!!dom){
					 	 var serviceBusCardWidget = dijit.getEnclosingWidget(dom);
					     var serviceCardParam = serviceBusCardWidget.busCardInstance.getCardRelationInfo();
					     var productId=serviceCardParam.productId;
					     var managerNumber=Me.$("200091").value; 
					     if(productId=="960"){
					     	Me.$("200091").value="admin"+dom.value;
					     	Me.$("200091").disabled=true;
					     }
				 	 }
				 };
				 Me.$("200091").onblur=function(){
				    if( Me.$("200091").value!=""){
				       var managerNumber=Me.$("200091").value;
				    	var productInfoVO=orderaccept.prodofferaccept.util.DomHelper.getParentWidget(Me.$("200091"),"orderaccept.prodofferaccept.widget.attrcard.ProductAttrCardWidget").productInfoVO;
					    var productId= productInfoVO.productId;
					     if(productId=="903"){
				     		if(!/^admin@\w*$/i.test(managerNumber)){
				     			if(!/^ADMIN@\w*$/i.test(managerNumber)){
				     				 alert("\u8d85\u7ea7\u7ba1\u7406\u5458\u8d26\u53f7\u683c\u5f0f\u5982\u4e0b\uff1a\u0061\u0064\u006d\u0069\u006e\u0040\u002b\u4efb\u610f\u5b57\u7b26");
									Me.$("200091").value="";
				     			}
							}
					     } 
				    }
				 };
				dojo.subscribe("/buscard/serviceId/blur", function(evt) {
				    if($("serviceId").value!=""){
				    	Me.managerCheck(evt);
				    }
				 });
				 BusCard.addEventListener($("link_serviceId"), 'click', function() {
					   if($("serviceId").value!=""){
					   			if(!!$("link_serviceId")){
							 	 var serviceBusCardWidget = dijit.getEnclosingWidget($("link_serviceId"));
							     var serviceCardParam = serviceBusCardWidget.busCardInstance.getCardRelationInfo();
							     var productId=serviceCardParam.productId;
							     if(productId=="960"){
							     	Me.$("200091").value="admin"+$("serviceId").value;
							     	Me.$("200091").disabled=true;
							     }
				 	 		}
					   }
				  });
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
