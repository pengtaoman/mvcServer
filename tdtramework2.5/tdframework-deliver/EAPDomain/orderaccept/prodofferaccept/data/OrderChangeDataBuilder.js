defineModule("orderaccept.prodofferaccept.data.OrderChangeDataBuilder", ["../util", "../../common/js/ConstantsPool",
                "./ProdOfferNewDataBuilder"], function(util, ConstantsPool, ProdOfferNewDataBuilder) {
	        dojo.declare("orderaccept.prodofferaccept.data.OrderChangeDataBuilder", [ProdOfferNewDataBuilder], {
		                generateOrder : function() {
			                this.loadMainProdOfferPageData();
			                var mainProdOfferPageData = $ac$.get(this.MAIN_KEY);
			                var builder = this;
			                var accoutInfoPageData = this.controller.route("/payRelationWidgetInstance/getData");
			                if (!mainProdOfferPageData || accoutInfoPageData === false) {
				                return false;
			                } else {
				                // 构建变更的主产品信息
				                var accessProdItemInfoList = dojo.map(mainProdOfferPageData.productInfoList, function(
				                                pageData) {
					                        var prodBasicInfo = pageData.prodBasicInfo;
					                        var serviceInfo = pageData.serviceInfo;
					                        var prodAttrInfo = pageData.prodAttrInfo;
					                        var assureInfo = pageData.assureInfo;
					                        return builder.generateAlteredAccessProdItemVO(prodBasicInfo, serviceInfo,
					                                prodAttrInfo, assureInfo);
					                        
				                        });
				                // 分解变更的账务定制关系到各个接入产品订单项目
				                this.extractAccountRela2AccessProdItemVO(accessProdItemInfoList, accoutInfoPageData);
				                var clonedCustOrderVO = this.copyNochangeProperties($ac$.get('custOrderVO'));
				                clonedCustOrderVO.accessProdItemInfoList = accessProdItemInfoList;
				                clonedCustOrderVO.custOrderBasicInfo.changeOrderReason =  this.controller.getChangeOrderReason();
				                return clonedCustOrderVO;
			                }
			                
		                },
		                copyNochangeProperties : function(custOrderVO) {
			                var simpleCopyObj = {};
			                for (var index in custOrderVO) {
				                if (index != 'accessProdItemInfoList') {
					                simpleCopyObj[index] = custOrderVO[index];
				                }
				                
			                }
			                return simpleCopyObj;
			                
		                },
		                /**
						 * 根据页面更改内容生成变更的订单项
						 * 
						 * @param {Object} prodBasicInfo 产品基本信息
						 * @param {Object} serviceInfo 页面服务信息
						 * @param {Object} prodAttrInfo 页面产品属性信息
						 * @param {Object} assureInfo 页面担保信息
						 * @method
						 */
		                generateAlteredAccessProdItemVO : function(prodBasicInfo, serviceInfo, prodAttrInfo, assureInfo) {
			                var uniqueId = prodBasicInfo.uniqueId;
			                var selectedMemberInfo = BusCard.jsonPath($ac$.get("selectedMemberProdOfferList"),
			                        "$[?(@.uniqueId==" + uniqueId + ")]")[0];
			                var prodItemVO = selectedMemberInfo.prodItemVO;
			                var clonedProdItemVO = dojo.clone(prodItemVO);
			                this.compareAndSetChangedServiceInfo(clonedProdItemVO, serviceInfo);
			                this.compareAndSetChangedAttrValue(clonedProdItemVO, prodAttrInfo);
			                return clonedProdItemVO;
		                },
		                /**
						 * @param {Object} accessProdItemVO
						 *            原有的接入类产品订单项
						 * @param {Object} serviceInfo 服务信息
						 * @method
						 */
		                compareAndSetChangedServiceInfo : function(accessProdItemVO, serviceInfo) {
			                var formatedServiceInfo = this.buildAccessProdAcceptInfoVO(serviceInfo || {});
			                for (var pname in formatedServiceInfo) {
				                var pvalue = formatedServiceInfo[pname];
				                // 保证页面值不为空
				                if (pvalue != null) {
					                accessProdItemVO[pname] = pvalue;
				                }
				                
			                }
			                // 服务号码变更的同时更新accNbr
			                accessProdItemVO.accNbr = accessProdItemVO.serviceId;
		                },
		                getAttrSpecAttrVO : function(attrCd) {
			                var offerProdRelaList = $ac$.get("selectedMainProdOfferInfoVO").offerProdRelaList;
			                var attrList = Array.prototype.concat.apply([], dojo.map(offerProdRelaList, function(rela) {
				                                return rela.productInfoVO.attrList || [];
			                                }));
			                return dojo.filter(attrList, function(attrVO) {
				                        return attrVO.attrCd == attrCd;
			                        })[0];
			                
		                },
		                /**
						 * @param {Object} accessProdItemVO
						 *            原有的接入类产品订单项
						 * @param {Object} serviceInfo 产品属性信息
						 * @method
						 */
		                compareAndSetChangedAttrValue : function(accessProdItemVO, prodAttrInfo) {
			                var prodInstAttrList = accessProdItemVO.prodInstAttrList || [];
			                var builder = this;
			                var prodAttrInfo = prodAttrInfo || {};
			                for (var attrCd in prodAttrInfo) {
				                var attrVO = this.getAttrSpecAttrVO(attrCd);
				                var attrValue = prodAttrInfo[attrCd];
				                var attrId = attrVO.attrId;
				                var prodInstAttrTempVO = dojo.filter(prodInstAttrList, function(instVO) {
					                        return instVO.attrId == attrId;
				                        })[0];
				                if (prodInstAttrTempVO) {
					                var oldValue = prodInstAttrTempVO.attrValue;
					                prodInstAttrTempVO.oldAttrValue = oldValue;
					                // 不反映提交值为null的页面值
					                prodInstAttrTempVO.attrValue = (attrValue == null ? oldValue : attrValue);
				                } else if (attrValue) {
					                prodInstAttrList.push(builder.buildAttrInstItemVO({
						                        operKind : 1,
						                        attrId : attrId,
						                        attrCd : attrCd,
						                        ifInstantiation : attrVO.ifInstantiation,
						                        unique : attrVO.unique ? '1' : '0',
						                        attrValue : attrValue,
						                        serviceOfferId : accessProdItemVO.serviceOfferId,
						                        orderItemId : accessProdItemVO.orderItemId,
						                        custOrderId : accessProdItemVO.custOrderId,
						                        prodInstId : accessProdItemVO.prodInstId,
						                        productId : accessProdItemVO.productId,
						                        effDate : accessProdItemVO.effDate||accessProdItemVO.beginRentTime,
						                        expDate : accessProdItemVO.expDate||accessProdItemVO.stopRentTime,
						                        orderItemCd : accessProdItemVO.orderItemCd
						                        
					                        }));
					                
				                }
				                
			                }
			                accessProdItemVO.prodInstAttrList = prodInstAttrList;
		                },
		                /**
						 * 拆分账务定制关系 FIXME 待实现
						 * 
						 * @param {Array} accessProdItemInfoList
						 *            接入类产品订单项集合
						 * @param {Array} accoutInfoPageData 更改后的支付关系
						 * @method
						 */
		                extractAccountRela2AccessProdItemVO : function(accessProdItemInfoList, accoutInfoPageData) {
		               
		                }
		                
	                });
	        
        });