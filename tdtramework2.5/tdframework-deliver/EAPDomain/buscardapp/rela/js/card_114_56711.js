BusCard.define('/buscardapp/rela/js/card_114_56711.js',function(_buscard,cardParam){
 var ConstantsPool = dojo.require("orderaccept.common.js.ConstantsPool");
 var ProductIdConst = ConstantsPool.load("ProductIdConst").ProductIdConst;	 
var Me = this;
var a = arguments[0];
var b = arguments[1];
	if(b.productId==ProductIdConst.PRODUCT_ID){
	 if(Me.$('label_stopType')){
	    Me.$('label_stopType').innerHTML='<span class="buscard-label">\u6fc0\u6d3b<span class="formRequested">*</span></span>'
	  }
	 if(Me.$('label_openType')){
	    Me.$('label_openType').innerHTML='<span class="buscard-label">\u6fc0\u6d3b<span class="formRequested">*</span></span>'
	  }
	}	
});
