/**
 * 此模块放置所有模型数据构建处理逻辑
 * 
 * @module
 */
defineModule("orderaccept.prodofferaccept.data.MainProdOfferChgDataBuilder", [
                "../ProductDateBuilder", "../util", "../../common/js/ConstantsPool",
                "./ProdOfferNewDataBuilder"], function(ProductDateBuilder, util, ConstantsPool,
                ProdOfferNewDataBuilder) {
	        
	        /**
			 * 主销售品变更数据构建类定义
			 * 
			 * @class
			 */
	        dojo.declare("orderaccept.prodofferaccept.data.MainProdOfferChgDataBuilder",
	                [ProdOfferNewDataBuilder], {
						/**
				         * 计算退订协议的时间
				         */
				        doComputationOfferStandardBusInfo : function(prodOfferInstId,prodOfferAcceptInfoVO){
				        	var offerStandardBusTempVOList = null;
				        	//当是标准变组合时
				        	if($ac$.currentProcessId == "single2comb"){
				        		var prodOfferInstInfo = util.ProdOfferInstProvider.queryProdOfferAcceptInfoVO(prodOfferInstId);
				        		var offerStandardInstList = mainProdOfferInstVO.offerStandardInstList;
				        		//有协议信息
				        		if(offerStandardInstList&&offerStandardInstList.length>0){
				        			offerStandardBusTempVOList = dojo.map(offerStandardInstList, function(offerStandardInstInfo){
				        				var _standerdBusTempVO = dojo.clone(offerStandardInstInfo);
				        				dojo.mixin(_standerdBusTempVO,{
				        					expDate : dojo.global.$appContext$.requestParam.today
				        				});
				        			});
				        			dojo.mixin(prodOfferAcceptInfoVO,{
				        				expDate : dojo.global.$appContext$.requestParam.today
				        			});
				        			
				        		}
				        	}
				        	return offerStandardBusTempVOList;
				        }
	                });
	        
        });