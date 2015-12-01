defineModule("orderaccept.prodofferaccept.loader.ProductChangeAcceptMultipleSubProdOfferHandler", ["./MultipleSubProdOfferHandler","orderaccept.prodofferaccept.builder.subprodoffergrid.ProductChangeAcceptSubProdOfferCartDataProvider"]
			, function(MultipleSubProdOfferHandler,ProductChangeAcceptSubProdOfferCartDataProvider) {
	        dojo.declare("orderaccept.prodofferaccept.loader.ProductChangeAcceptMultipleSubProdOfferHandler", [MultipleSubProdOfferHandler], {

		        getSubProdOfferCartDataProvider : function(controller,uniqueId,contentPane){
		        	return new ProductChangeAcceptSubProdOfferCartDataProvider(controller,uniqueId,contentPane);
		        }	        
	        });
	        
        });
