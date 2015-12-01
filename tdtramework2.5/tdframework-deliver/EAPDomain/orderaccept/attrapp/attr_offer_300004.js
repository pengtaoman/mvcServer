BusCard.define('/orderaccept/attrapp/attr_offer_300004.js',function(_buscard,cardParam){ 
	        var prodOfferAcceptPageDispatch=function(){
	//根据设备型号，刷出相关的售价js
	/*dojo.require("orderaccept.prodofferaccept.util");
	var Me = this;
	Me.getPrice=function(){
		var currentValue = Me.$("300004").value;	
		var priceObj = Me.$("300005");
		if(!priceObj){
			var tooltip = orderaccept.prodofferaccept.util.DomHelper.
								getParentWidget(Me.$("300004"),"orderaccept.custom.TooltipDialog");
			if(!!tooltip && !!tooltip.prodOfferAttrCard){
				priceObj = tooltip.prodOfferAttrCard.getCard().$("300005");
			}
		}
		if(!!priceObj){
	    	var suggestPrice = orderaccept.prodofferaccept.util.ServiceFactory
							        .getService("url:orderDetailAction.do?method=getCost&equipmentType="
							                + currentValue);
        	if(!isNaN(parseFloat(suggestPrice+""))){
				priceObj.value = parseFloat(suggestPrice+"")/100;
			}
		}
	};
	Me.getPrice();
	Me.$("300004").onchange = function(){
		Me.getPrice();
	};*/
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
	           var Me=this;
	             var widget = dijit.getEnclosingWidget(Me.dom);
	             var prodInstVO=widget.prodInstVO;
	             var prodInstAttrList = prodInstVO.prodInstAttrList;
	        	 var instVO = prodInstAttrList.find(function(inst) {
	                  return inst.attrId == 300004;
                  });
                 if(instVO){
                 Me.$('300004').value=instVO.attrValue;
                 }
	           
	           
	           
	           /* var Me=this;
	            Me.getPrice=function(){
		            var currentValue = Me.$("300004").value;	
			        var priceObj = Me.$("300005");
			        if(!!priceObj){
		    	      var suggestPrice = orderaccept.prodofferaccept.util.ServiceFactory
								        .getService("url:orderDetailAction.do?method=getCost&equipmentType="
								                + currentValue);
	        	      if(!isNaN(parseFloat(suggestPrice+""))){
					   priceObj.value = parseFloat(suggestPrice+"")/100;
				      }
			        }
	           };
	           Me.getPrice();
	           Me.$("300004").onchange = function(){
	         	Me.getPrice();
	           };*/
	           
	        
	        };
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {};
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
