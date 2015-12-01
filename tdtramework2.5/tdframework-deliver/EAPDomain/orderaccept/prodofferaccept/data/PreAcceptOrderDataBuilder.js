/**
 * 此模块放置所有模型数据构建处理逻辑
 * 
 * @module
 */
defineModule("orderaccept.prodofferaccept.data.PreAcceptOrderDataBuilder", [
                "../ProductDateBuilder", "../util", "../../common/js/ConstantsPool",
                "./ProdOfferNewDataBuilder"], function(ProductDateBuilder, util, ConstantsPool,
                ProdOfferNewDataBuilder) {
	        
	        /**
			 * 主销售品变更数据构建类定义
			 * 
			 * @class
			 */
	        dojo.declare("orderaccept.prodofferaccept.data.PreAcceptOrderDataBuilder",
	                [ProdOfferNewDataBuilder], {

	                });
	        
        });