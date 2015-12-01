/**
 * 承载接入方式属性处理
 * 
 * @class
 * @extends
 */
BusCard.define('/orderaccept/attrapp/attr_prod_100370.js',function(_buscard,cardParam){ 
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	var util = dojo.require("orderaccept.prodofferaccept.util");
	var prodOfferAcceptLoader = dojo.getObject("prodOfferAcceptLoader");
	var mainProdOfferWidget = dojo.getObject("prodOfferAcceptLoader.mainProdOfferWidget");
	Me.$("100370").hasExtend = false;
	if(!!mainProdOfferWidget){
		var prodBasicTRs = dojo.query(".main-product-basic",mainProdOfferWidget.domNode);
		dojo.some(prodBasicTRs,function(prodBasicTR){
			if(!!dojo.attr(prodBasicTR,"userId") && dojo.attr(prodBasicTR,"userId").value != ""){
				var serviceCard = prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_"
											+dojo.attr(prodBasicTR,"uniqueId")];
				if(!!serviceCard && !!serviceCard.attrCardWidget){
					var attrCard = serviceCard.attrCardWidget.busCardInstance;
					if(!!attrCard.$("100370")){
						Me.$("100370").hasExtend = true;
						Me.$("100370").value = attrCard.$("100370").value;
						return true;
					}
				}
			}
			return false;
		})
		if(Me.$("100370").hasExtend == false){
			var innetMethods = dojo.query("[id=100370]",mainProdOfferWidget.domNode);
			dojo.some(innetMethods,function(innetMethod){	
				if(!!innetMethod.hasExtend){
					Me.$("100370").hasExtend = true;
					return true;
				}
				return false;
			});
		}
	}
	dojo.subscribe("/buscard/100370/change",function(event){		
		if(!Me.$("100370").hasExtend){
	    	var prodBasicTR = function() {
		        var serviceTr = event.currentTarget;
		        while (true) {
			        serviceTr = serviceTr.parentNode;
			        if (serviceTr && (serviceTr.tagName || "").toUpperCase() == 'TR') {
				        break;
			        }
		        }		        
		        while (true) {
			        serviceTr = serviceTr.previousSibling;
			        if (serviceTr && (serviceTr.tagName || "").toUpperCase() == 'TR') {
				        break;
			        }
		        }
		       return serviceTr;		        
	        }();
	        if(!dojo.attr(prodBasicTR,"userId") || dojo.attr(prodBasicTR,"userId").value == ""){
				var innetMethodVal = event.currentTarget.value;
				Me.$("100370").hasExtend = true;
				Me.$("100370").value = innetMethodVal;	
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
