BusCard.define('/buscardapp/rela/js/card_110_56710.js',function(_buscard,cardParam){
 var ConstantsPool = dojo.require("orderaccept.common.js.ConstantsPool");
 var ProductIdConst = ConstantsPool.load("ProductIdConst").ProductIdConst;	 
var Me = this;
var a = arguments[0];
var b = arguments[1];
	if(b.productId==ProductIdConst.PRODUCT_ID){
	this.$('label_stopType').innerHTML='<span class="buscard-label">\u53bb\u6fc0\u6d3b\u7c7b\u578b<span class="formRequested">*</span></span>'
	}	
});
