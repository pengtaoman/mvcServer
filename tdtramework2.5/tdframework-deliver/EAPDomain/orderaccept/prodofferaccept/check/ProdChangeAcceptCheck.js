/**
 * 此模块放置所有业务检测处理逻辑
 * 
 * @module
 */
defineModule("orderaccept.prodofferaccept.check.ProdChangeAcceptCheck", ["./ProdOfferNewCheck",
                "../util","orderaccept.common.js.ConstantsPool","orderaccept.common.dialog.MessageBox"], function(ProdOfferNewCheck, util,ConstantsPool, messageBox) {
    dojo.declare("orderaccept.prodofferaccept.check.ProdChangeAcceptCheck",
        [ProdOfferNewCheck], {
        	controller : null,
			constructor : function(controller) {
				this.controller = controller;
			},
			/**
			 * 1、对于单一销售品，校验销售品类型、关联的产品集合(包括长度及产品net_type)以及规则表配置
			 * 2、对于组合销售品，校验销售品类型、关联的产品集合(包括长度及产品net_type)以及规则表配置,产品集合需要完全匹配，暂时不考虑角色，后续补充
			 */
			checkOfferChangeRule : function(oldProdOfferInfoVO,newProdOfferInfoVO){
				//销售品类型
				if(oldProdOfferInfoVO.bindType!=newProdOfferInfoVO.bindType){
					//alert("不同类型的销售品不可以进行换受理操作！")
					messageBox.alert({
						busiCode : "08410121"
					});
				}
				//关联的接入类产品集合,过滤接入类，比较配置
				var prodError = "产品配置不满足换受理条件！"
					oldRelaProdInfoList = dojo.filter(oldProdOfferInfoVO.offerProdRelaList,function(offerProdRelaVO){
						return offerProdRelaVO.productInfoVO.prodFuncType == 
							ConstantsPool.load("ProductFuncTypeConst").ProductFuncTypeConst.ACCESS;
				}),
					newRelaProdInfoList = dojo.filter(newProdOfferInfoVO.offerProdRelaList,function(offerProdRelaVO){
						return offerProdRelaVO.productInfoVO.prodFuncType == 
							ConstantsPool.load("ProductFuncTypeConst").ProductFuncTypeConst.ACCESS;
				});
				BusCard.each(oldRelaProdInfoList,function(oldProdInfo){
					
				});
				
			}
        });
	        
	});