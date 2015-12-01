BusCard.define('/orderaccept/attrapp/attr_prod_100063.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	Me.$("100063").onblur = function(){
	   if(Me.$("100063").value!=""){
	   		if(isNaN(Me.$("100063").value)){
	   			alert("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u6570\u5b57");
	   			Me.$("100063").value="";
	   			return;
	   		}else{
	   			if(Me.$("100156").value!=""){
	   				if(dojo.getObject("prodOfferAcceptLoader.mainProdOfferDetailWidget.prodOfferAttrCard.busCardInstance")!=null){
						var pricObj= prodOfferAcceptLoader.mainProdOfferDetailWidget.prodOfferAttrCard.busCardInstance.$("300003");
						pricObj.value = parseFloat(Me.$("100063").value)*parseFloat(Me.$("100156").value);
						pricObj.readOnly=true;
					}
	   			}
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
