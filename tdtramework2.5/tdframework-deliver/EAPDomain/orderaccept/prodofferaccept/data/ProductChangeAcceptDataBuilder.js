/**
 * 此模块放置所有模型数据构建处理逻辑
 * 
 * @module
 */
defineModule( "orderaccept.prodofferaccept.data.ProductChangeAcceptDataBuilder",["./ProdOfferChgDataBuilder","./ProductChangeAcceptAbstractDataBuilder"],
		function(ProdOfferChgDataBuilder,ProductChangeAcceptAbstractDataBuilder) {
			dojo.declare("orderaccept.prodofferaccept.data.ProductChangeAcceptDataBuilder",[ProdOfferChgDataBuilder,ProductChangeAcceptAbstractDataBuilder], {
			});
		}
);