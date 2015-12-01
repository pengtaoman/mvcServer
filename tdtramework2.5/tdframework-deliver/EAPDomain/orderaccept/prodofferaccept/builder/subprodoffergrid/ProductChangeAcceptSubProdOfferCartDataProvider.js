defineModule("orderaccept.prodofferaccept.builder.subprodoffergrid.ProductChangeAcceptSubProdOfferCartDataProvider", ["./SubProdOfferCartDataProvider"
                ,"../../util"], function(SubProdOfferCartDataProvider,util) {
	        /**
			 * 定义可选包购物车数据处理的类
			 * 
			 * @class
			 * @extends
			 */
	        dojo.declare("orderaccept.prodofferaccept.builder.subprodoffergrid.ProductChangeAcceptSubProdOfferCartDataProvider", [SubProdOfferCartDataProvider], {

		        getSubProdOfferEndDate:function(){
		        	return  dojo.global.$appContext$.requestParam.today;
		        },
		        getSubProdOfferStartDate:function(){
		        	return  dojo.global.$appContext$.requestParam.today;
		        }
        });
	});