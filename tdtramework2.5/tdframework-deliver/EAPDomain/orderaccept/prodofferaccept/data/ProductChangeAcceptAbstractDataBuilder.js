/**
 * 此模块放置所有模型数据构建处理逻辑
 * 
 * @module
 */
defineModule( "orderaccept.prodofferaccept.data.ProductChangeAcceptAbstractDataBuilder",["../util","../../common/js/ConstantsPool"],
		function(util,ConstantsPool) {
			dojo.declare("orderaccept.prodofferaccept.data.ProductChangeAcceptAbstractDataBuilder",[], {
				doAccessProdAttrInfoListComputation:function(productInfoVO, prodPageInfoData, extendedData){
					
			        var requestParam = dojo.global.$appContext$.get("requestParam");
			      //如果产品没有变化，属性不需要重新生成
			        if(requestParam.sameProductId&&requestParam.sameProductId==1){
				       return this.inherited(arguments);
			        }else{
			        	var builder = this,
				        prodInstId = prodPageInfoData.prodBasicInfo.prodInstId;
				        var attrList = productInfoVO.attrList || [],
					    attrInfoVOList = [],
					        extendedData = extendedData || {},
					        // 根据属性cd获取规格层面上的AttrVO
					        getAttrVO = function(attrCd) {
						        return BusCard.find(attrList, function(attrVO) {
							                return attrVO.attrCd == attrCd;
						                })
					        };
				        if (prodPageInfoData.prodAttrInfo || prodPageInfoData.prodOfferAttrInfo) {
					        for (var attrCd in prodPageInfoData.prodAttrInfo) {
						        var value = prodPageInfoData.prodAttrInfo[attrCd];
						        var attrVO = getAttrVO(attrCd);
						        if (attrVO && value) {
						        	var _attrVO=this.buildAttrInstItemVO(dojo.mixin(this.getAttrInfoVOTemplate(
					                        1, attrVO.attrId, attrCd, value, attrVO.ifInstantiation,attrVO.pricingParamAttr,attrVO.unique),
					                extendedData));
						        	_attrVO.isTemp=attrVO.isTemp;
					                _attrVO.effDate = requestParam.today;
							        attrInfoVOList.push(_attrVO);
	
						        }
						        
					        }
				        }
				        var relaProdInfoVO = util.ProdOfferInstProvider.queryRelaProdInfoVO(prodInstId),
				        instAttrList = relaProdInfoVO.prodInstAttrList || [];
	
				        // 将旧有属性设置为删除
				        dojo.forEach(instAttrList, function(attrVO) {
						                var cloneAttrVO = dojo.clone(attrVO);
						                cloneAttrVO.oldAttrValue = attrVO.attrValue;
						                cloneAttrVO.createDate=null;
						                cloneAttrVO.operKind = 3;
						                cloneAttrVO.isTemp=1;
						                cloneAttrVO.expDate = requestParam.today;
						                cloneAttrVO =builder.buildAttrInstItemVO(cloneAttrVO);
						                cloneAttrVO.oldEffDate=attrVO.effDate;
						                attrInfoVOList.push(cloneAttrVO);
					                
				                });
				        return attrInfoVOList;
			        }
				}, 
				/*检测换业务是否需要变更标准地址*/
				doCheckAddr :function(custOrderAcceptInfoVO){
	                var newAccessMethod=null;
	                var oldAccessMethod=null;

	                var newProdInst=null;
	                var oldProdInst=null;
					dojo.forEach(custOrderAcceptInfoVO.orderAcceptInfoList|| [],
						function(orderAcceptInfoVO) {
							dojo.forEach(orderAcceptInfoVO.prodOfferAcceptInfoList|| [],
								function(prodOfferAcceptInfoVO) {
									dojo.forEach(prodOfferAcceptInfoVO.accessProdAcceptInfoList||[], function(accessProdAcceptInfoVO){
										newProdInst=accessProdAcceptInfoVO;
										dojo.forEach(accessProdAcceptInfoVO.prodInstAttrList||[], function(prodInstAttrTempVO){
											//100704属性废弃
											//if(prodInstAttrTempVO.operKind!=3&& prodInstAttrTempVO.attrCd==100704){
												//newAccessMethod=prodInstAttrTempVO.attrValue;
											//}
										});										
									})
								});
						}
					);
					var   accessProdInstList = BusCard.jsonPath(dojo.global.$appContext$.get("userHasProdOfferInfoList")
	                        || [], "$[*].prodInstList[?(@.serviceRelationVO!=null)]");
				
								dojo.forEach(accessProdInstList|| [],
									function(accessProdInstVO) {
									oldProdInst=accessProdInstVO;
											dojo.forEach(accessProdInstVO.prodInstAttrList||[], function(prodInstAttrTempVO){
												//100704属性废弃
												//if( prodInstAttrTempVO.attrId==100704){
													//oldAccessMethod=prodInstAttrTempVO.attrValue;
												//}
											});		
									});
					if((newAccessMethod!=oldAccessMethod)&&(newAccessMethod==1&&oldAccessMethod==10)){
						if((oldProdInst.addressId==newProdInst.addrId)&&(oldProdInst.addressDesc==newProdInst.addrDetail)){
							if(confirm("从[ADSL]接入方式修改到[FTTH]接入方式请确认标准地址是否支持新接入方式，是否确认提交?")){
								return true;
							}else{
								return false;
							}
						}
					}
					return true;
	                
				},
				generateOrder : function() {
					var custOrderAcceptInfoVO=this.inherited(arguments);
					if(!this.doCheckAddr(custOrderAcceptInfoVO)){
						return false;
					}
			        var requestParam = dojo.global.$appContext$.get("requestParam");
	                var today = requestParam.today;
	                
	                
	                var parentProdOfferInst=null;
	                if(requestParam.parentProdOfferInst){
	                	 parentProdOfferInst=requestParam.parentProdOfferInst;
	                }
					dojo.forEach(custOrderAcceptInfoVO.orderAcceptInfoList||[], function(orderAcceptInfoVO){
						dojo.forEach(orderAcceptInfoVO.prodOfferAcceptInfoList||[], function(prodOfferAcceptInfoVO){
							if(prodOfferAcceptInfoVO.accessProdAcceptInfoList){
								if(prodOfferAcceptInfoVO.prodOfferType==1&&prodOfferAcceptInfoVO.operKind==1&&parentProdOfferInst&&parentProdOfferInst.prodOfferInstId){
									prodOfferAcceptInfoVO.parentProdOfferInstId=parentProdOfferInst.prodOfferInstId;
								}
								
								//设置销售品下的属性的生失效时间
								dojo.forEach(prodOfferAcceptInfoVO.offerInstAttrList||[], function(offerInstAttrVO){
										if(offerInstAttrVO.operKind==1){
											offerInstAttrVO.effDate = today;
										}else if(offerInstAttrVO.operKind==3){
											offerInstAttrVO.expDate = today;
										}
								});
								
								
								dojo.forEach(prodOfferAcceptInfoVO.accessProdAcceptInfoList||[], function(accessProdAcceptInfoVO){
									if(accessProdAcceptInfoVO){
										//统一标准地址属性
										if(accessProdAcceptInfoVO.addrId!=accessProdAcceptInfoVO.addressId){
											accessProdAcceptInfoVO.addressId=accessProdAcceptInfoVO.addrId;
										}
										accessProdAcceptInfoVO.accNbr=accessProdAcceptInfoVO.serviceId;
										//设置销售品下的产品的生失效时间(接入类)
										accessProdAcceptInfoVO.effDate = today;
										dojo.forEach(accessProdAcceptInfoVO.prodInstAttrList||[], function(prodInstAttrTempVO){
											if(prodInstAttrTempVO.operKind!=3){
												prodInstAttrTempVO.effDate = today;
											}else{
												prodInstAttrTempVO.expDate = today;
												if(prodInstAttrTempVO.oldEffDate){
													prodInstAttrTempVO.effDate=prodInstAttrTempVO.oldEffDate;
												}
											}
										});
									}
								});
								
							}
							//设置销售品生失效时间
							if(prodOfferAcceptInfoVO.operKind==1){
								prodOfferAcceptInfoVO.effDate=today;
							}else if(prodOfferAcceptInfoVO.operKind==3){
								prodOfferAcceptInfoVO.expDate=today;
							}
							//设置销售品下标准协议的开始时间与销售品相同
							dojo.forEach(prodOfferAcceptInfoVO.offerStandardBusTempVOList||[], function(offerStandardBusTempVO){
									if(offerStandardBusTempVO){
										offerStandardBusTempVO.effDate = prodOfferAcceptInfoVO.effDate;
									}
							});
								//设置销售品下的产品的生失效时间(功能类)
								dojo.forEach(prodOfferAcceptInfoVO.serviceProdAcceptInfoList||[], function(prodAcceptInfoVO){
									if(prodAcceptInfoVO.operKind==1){
										prodAcceptInfoVO.effDate=today;
									}else if(prodAcceptInfoVO.operKind==3){
										prodAcceptInfoVO.expDate=today;
									}
									prodAcceptInfoVO.effDate = today;
									dojo.forEach(prodAcceptInfoVO.prodInstAttrList||[], function(prodInstAttrTempVO){
										if(prodInstAttrTempVO.operKind!=3){
											prodInstAttrTempVO.effDate = today;
										}else{
											prodInstAttrTempVO.expDate = today;
											if(prodInstAttrTempVO.oldEffDate){
												prodInstAttrTempVO.effDate=prodInstAttrTempVO.oldEffDate;
											}
										}
									});
								});
								
						});
						if(parentProdOfferInst&&orderAcceptInfoVO.prodOfferAcceptInfoList){
							var initInfo= { operKind : 2,prodOfferType:1,ActionCD : ConstantsPool.ActionCDConst.PRODUCT_CHANGE};						
							if(parentProdOfferInst&&parentProdOfferInst.prodOfferType){
								initInfo.offerKind=parentProdOfferInst.prodOfferType;
							}
							var parentProdOfferItemVO=dojo.mixin(parentProdOfferInst,initInfo);
							orderAcceptInfoVO.prodOfferAcceptInfoList.push(parentProdOfferItemVO);
						}
					});
					//unieap.debug(custOrderAcceptInfoVO);
					return custOrderAcceptInfoVO;
		        }
			}
			);
		}
);