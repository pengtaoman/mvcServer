defineModule("orderaccept.prodofferaccept.builder.date.DateBuilderFactory", ["../../util"], function(util) {
	        var ns = "orderaccept.prodofferaccept.builder.date.";
	        
	        /**
			 * 单套餐和共享组合套餐新装时间处理类
			 * 
			 * @class
			 */
	        dojo.declare(ns + "sharedProdOfferInstallDateBuilder", [], {
		                
		                custOrderAcceptInfoVO : null,
		                constructor : function(custOrderAcceptInfoVO) {
			                this.custOrderAcceptInfoVO = custOrderAcceptInfoVO;
			                
		                },
		                build : function() {
		                	computationProdOfferEffDate(this.custOrderAcceptInfoVO);
		                }
	                });
	        
	        /**
			 * 自主版新装时间处理类
			 * 
			 * @class
			 */
	        
	        dojo.declare(ns + "independenceProdOfferInstallDateBuilder", [], {
		                
		                custOrderAcceptInfoVO : null,
		                constructor : function(custOrderAcceptInfoVO) {
			                this.custOrderAcceptInfoVO = custOrderAcceptInfoVO;
			                
		                },
		                build : function() {
							computationProdOfferEffDate(this.custOrderAcceptInfoVO);
		                }
		                
	                });
	        
	        /**
			 * 单套餐可选包变更时间处理类
			 * 
			 * @class
			 */
	        dojo.declare(ns + "subProdOfferChangeDateBuilder", [], {
		                custOrderAcceptInfoVO : null,
		                constructor : function(custOrderAcceptInfoVO) {
			                this.custOrderAcceptInfoVO = custOrderAcceptInfoVO;
			                
		                },
		                build : function() {
							//变更可选包暂时不做任何处理
							computationProdOfferEffDate(this.custOrderAcceptInfoVO);
		                }
		                
	                });
	        /**
			 * 共享版组合可选包变更时间处理类
			 * 
			 * @class
			 */
	        dojo.declare(ns + "sharedMemberChangeDateBuilder", [], {
		                custOrderAcceptInfoVO : null,
		                constructor : function(custOrderAcceptInfoVO) {
			                this.custOrderAcceptInfoVO = custOrderAcceptInfoVO;
			                
		                },
		                build : function() {
							computationProdOfferEffDate(this.custOrderAcceptInfoVO);
		                }
		                
	                });
	        /**
			 * 自助版成员变更时间处理类
			 * 
			 * @class
			 */
	        
	        dojo.declare(ns + "independenceMemberChangeDateBuilder", [], {
	        	custOrderAcceptInfoVO : null,
                constructor : function(custOrderAcceptInfoVO) {
	                this.custOrderAcceptInfoVO = custOrderAcceptInfoVO;
	                
                },
                build : function() {
					computationProdOfferEffDate(this.custOrderAcceptInfoVO);
                }
	        });
	        /**
			 * 单->单时间处理类
			 * 
			 * @class
			 */
	        dojo.declare(ns + "single2singleDateBuilder", [], {
		                custOrderAcceptInfoVO : null,
		                constructor : function(custOrderAcceptInfoVO) {
			                this.custOrderAcceptInfoVO = custOrderAcceptInfoVO;
			                
		                },
		                build : function() {
							computationProdOfferEffDate(this.custOrderAcceptInfoVO);
		                }
		                
	                });
	        /**
			 * 单->共享组合时间处理类
			 * 
			 * @class
			 */
	        dojo.declare(ns + "single2combDateBuilder", [], {
		                custOrderAcceptInfoVO : null,
		                constructor : function(custOrderAcceptInfoVO) {
			                this.custOrderAcceptInfoVO = custOrderAcceptInfoVO;
			                
		                },
		                build : function() {
							computationProdOfferEffDate(this.custOrderAcceptInfoVO);
		                }
	                });
	        /**
			 * 单->共享组合时间处理类
			 * 
			 * @class
			 */
	        dojo.declare(ns + "single2independenceDateBuilder", [], {
		                custOrderAcceptInfoVO : null,
		                constructor : function(custOrderAcceptInfoVO) {
			                this.custOrderAcceptInfoVO = custOrderAcceptInfoVO;
			                
		                },
		                build : function() {
							computationProdOfferEffDate(this.custOrderAcceptInfoVO);
		                }
		                
	                });
	        
	        /**
			 * 自主->自主时间处理类
			 * 
			 * @class
			 */
	        dojo.declare(ns + "independence2independenceDateBuilder", [], {
	        			custOrderAcceptInfoVO : null,
		                constructor : function(custOrderAcceptInfoVO) {
			                this.custOrderAcceptInfoVO = custOrderAcceptInfoVO;
			                
		                },
		                build : function() {
							computationProdOfferEffDate(this.custOrderAcceptInfoVO);
		                }
	        });
	        
	        /**
			 * 根据当前上下文环境构建合适的时间处理类
			 * 
			 * @static
			 */
	        orderaccept.prodofferaccept.builder.date.DateBuilderFactory.getInstance = function(custOrderAcceptInfoVO) {
		        var processId = $ac$.get("processId");
		        return new orderaccept.prodofferaccept.builder.date[processId + "DateBuilder"](custOrderAcceptInfoVO);
		        
	        };
	        /**
	         * 计算开始时间处理
	         */
	        var computationProdOfferEffDate = function(custOrderAcceptInfoVO){
	        	var tempEffDate = [];
				dojo.forEach(custOrderAcceptInfoVO.orderAcceptInfoList||[], function(orderAcceptInfoVO){
					dojo.forEach(orderAcceptInfoVO.prodOfferAcceptInfoList||[], function(prodOfferAcceptInfoVO){
						//循环出主销售品
						if(prodOfferAcceptInfoVO.prodOfferType == 1){
							var accessProdAcceptInfoList = prodOfferAcceptInfoVO.accessProdAcceptInfoList;
							//当含有多个接入类时，取最大的时间
							var effDateArray=[];
							dojo.forEach(accessProdAcceptInfoList||[], function(accessProdAcceptInfo){
								var effDate = computationEffDateByOperKind(prodOfferAcceptInfoVO,accessProdAcceptInfo);
								if(effDate!=null){
									tempEffDate.push(effDate);
									effDateArray.push(effDate);
								}
								//设置接入类产品属性的时间
								dojo.forEach(accessProdAcceptInfo.prodInstAttrList||[], function(prodInstAttrTempVO){
									if(accessProdAcceptInfo.operKind == util.OperKindConst.chgOperKind){
										//变更立即生效
										if(prodInstAttrTempVO.operKind == util.OperKindConst.chgOperKind){
											prodInstAttrTempVO.effDate = dojo.global.$appContext$.requestParam.today;
										}
									}
								});
							});
							if(effDateArray.length>0){
								//退订设置其失效时间
								if(prodOfferAcceptInfoVO.operKind == util.OperKindConst.delOperKind){
									prodOfferAcceptInfoVO.expDate = util.DateHelper.formatDate(effDateArray.max());
								}else{
									prodOfferAcceptInfoVO.effDate = util.DateHelper.formatDate(effDateArray.max());
								}
								if(prodOfferAcceptInfoVO.operKind != util.OperKindConst.delOperKind){
									//设置销售品属性的时间
									dojo.forEach(prodOfferAcceptInfoVO.offerInstAttrList||[], function(offerInstAttrTempVO){
										offerInstAttrTempVO.effDate = util.DateHelper.formatDate(effDateArray.max());
									})
								}
								//设置销售品下的产品的生效时间(接入类)
								dojo.forEach(prodOfferAcceptInfoVO.accessProdAcceptInfoList||[], function(accessProdAcceptInfoVO){
									if(accessProdAcceptInfoVO.operKind == util.OperKindConst.delOperKind){
										accessProdAcceptInfoVO.expDate = util.DateHelper.formatDate(effDateArray.max());
									}else if(accessProdAcceptInfoVO.operKind == util.OperKindConst.chgOperKind){
										//不做处理
									}else if(accessProdAcceptInfoVO.operKind == util.OperKindConst.addOperKind){
										accessProdAcceptInfoVO.effDate = util.DateHelper.formatDate(effDateArray.max());
									}
									dojo.forEach(accessProdAcceptInfoVO.prodInstAttrList||[], function(prodInstAttrTempVO){
										if(accessProdAcceptInfoVO.operKind == util.OperKindConst.delOperKind){
											prodInstAttrTempVO.expDate = util.DateHelper.formatDate(effDateArray.max());
										}else if(accessProdAcceptInfoVO.operKind == util.OperKindConst.chgOperKind){
											//变更立即生效
											if(prodInstAttrTempVO.operKind == util.OperKindConst.chgOperKind){
												prodInstAttrTempVO.effDate = dojo.global.$appContext$.requestParam.today;
											}
										}else if(accessProdAcceptInfoVO.operKind == util.OperKindConst.addOperKind){
											prodInstAttrTempVO.effDate = util.DateHelper.formatDate(effDateArray.max());
										}
									});
								})
								//设置销售品下的产品的生效时间(功能类)
								dojo.forEach(prodOfferAcceptInfoVO.serviceProdAcceptInfoList||[], function(serviceProdAcceptInfoVO){
									doComputationServiceProdOfMain(prodOfferAcceptInfoVO,serviceProdAcceptInfoVO);
									dojo.forEach(serviceProdAcceptInfoVO.prodInstAttrList||[], function(prodInstAttrTempVO){
										if(serviceProdAcceptInfoVO.operKind == util.OperKindConst.delOperKind){
											prodInstAttrTempVO.expDate = serviceProdAcceptInfoVO.expDate;
										}else if(serviceProdAcceptInfoVO.operKind == util.OperKindConst.chgOperKind){
											//不做处理
											if(prodInstAttrTempVO.operKind == util.OperKindConst.chgOperKind){
												prodInstAttrTempVO.effDate = dojo.global.$appContext$.requestParam.today;
											}
										}else if(serviceProdAcceptInfoVO.operKind == util.OperKindConst.addOperKind){
											prodInstAttrTempVO.effDate = serviceProdAcceptInfoVO.effDate;
										}
										
									});
								})
							}
						}
					});
					//针对组合销售品，进行处理(组合销售品没有接入类)
					dojo.forEach(orderAcceptInfoVO.prodOfferAcceptInfoList||[], function(prodOfferAcceptInfoVO){
						if(prodOfferAcceptInfoVO.prodOfferType == 1&&prodOfferAcceptInfoVO.accessProdAcceptInfoList&&prodOfferAcceptInfoVO.accessProdAcceptInfoList.length ==0 && prodOfferAcceptInfoVO.operKind ==1){
							//if(tempEffDate.length > 0){
								//判断成员是否有变更的
								if(util.ProdOfferHelper.getIfMemberChg()){
									prodOfferAcceptInfoVO.effDate = util.DateHelper.formatDate(util.DateHelper.getFirstDayAfterPeriod());
								}
								//取出现有主销售品的生效时间，比较大小
								tempEffDate.push(util.DateHelper.getDateFromString(prodOfferAcceptInfoVO.effDate));
								prodOfferAcceptInfoVO.effDate = util.DateHelper.formatDate(tempEffDate.max());
								//设置销售品属性的时间
								dojo.forEach(prodOfferAcceptInfoVO.offerInstAttrList||[], function(offerInstAttrTempVO){
									offerInstAttrTempVO.effDate = prodOfferAcceptInfoVO.effDate;
								});
								//设置销售品下的产品的生效时间(接入类)
								dojo.forEach(prodOfferAcceptInfoVO.accessProdAcceptInfoList||[], function(accessProdAcceptInfoVO){
									accessProdAcceptInfoVO.effDate = prodOfferAcceptInfoVO.effDate;
									dojo.forEach(accessProdAcceptInfoVO.prodInstAttrList||[], function(prodInstAttrTempVO){
										prodInstAttrTempVO.effDate = accessProdAcceptInfoVO.effDate;
									});
								});
								//设置销售品下的产品的生效时间(功能类)
								dojo.forEach(prodOfferAcceptInfoVO.serviceProdAcceptInfoList||[], function(serviceProdAcceptInfoVO){
									doComputationServiceProdOfMain(prodOfferAcceptInfoVO,serviceProdAcceptInfoVO);
									dojo.forEach(serviceProdAcceptInfoVO.prodInstAttrList||[], function(prodInstAttrTempVO){
										prodInstAttrTempVO.effDate = serviceProdAcceptInfoVO.effDate;
									});
								});
							//}
						}
						if(prodOfferAcceptInfoVO.prodOfferType == 1&&prodOfferAcceptInfoVO.accessProdAcceptInfoList&&prodOfferAcceptInfoVO.accessProdAcceptInfoList.length ==0 && prodOfferAcceptInfoVO.operKind ==3){
							//判断是否做的是全退网操作，如果是全退网，则立即生效
							if(util.ProdOfferHelper.getIfAllQuit()){
								prodOfferAcceptInfoVO.expDate = dojo.global.$appContext$.requestParam.today;
							}else{
								prodOfferAcceptInfoVO.expDate = util.DateHelper.formatDate(util.DateHelper.getFirstDayAfterPeriod());
							}
						}
					});
				});
				//针对协议销售品的生效时间以及失效时间特殊处理
				computationOfferStandardOfferDate(custOrderAcceptInfoVO);
	        };
	        /**
	         * 处理基础包下的功能产品的时间
	         */
	        var doComputationServiceProdOfMain = function(prodOfferAcceptInfoVO,serviceProdAcceptInfoVO){
	        	//销售是变更
	        	if(prodOfferAcceptInfoVO.operKind == 2){
	        		if(serviceProdAcceptInfoVO.operKind ==1){
	        			serviceProdAcceptInfoVO.effDate = dojo.global.$appContext$.requestParam.today;
	        			serviceProdAcceptInfoVO.expDate = "2037-01-01 00:00:00";
	        		}else if(serviceProdAcceptInfoVO.operKind ==3){
	        			serviceProdAcceptInfoVO.expDate = dojo.global.$appContext$.requestParam.today;
	        			serviceProdAcceptInfoVO.effDate = serviceProdAcceptInfoVO.beginRentTime;
	        		}else if(serviceProdAcceptInfoVO.operKind ==2){
	        			serviceProdAcceptInfoVO.effDate = serviceProdAcceptInfoVO.beginRentTime;
	        			serviceProdAcceptInfoVO.expDate = serviceProdAcceptInfoVO.stopRentTime;
	        		}
	        	}else if(prodOfferAcceptInfoVO.operKind == 1){
	        		if(serviceProdAcceptInfoVO.operKind ==2){
	        			serviceProdAcceptInfoVO.effDate = serviceProdAcceptInfoVO.beginRentTime;
	        			serviceProdAcceptInfoVO.expDate = serviceProdAcceptInfoVO.stopRentTime;
	        		}else{
	        			serviceProdAcceptInfoVO.effDate = prodOfferAcceptInfoVO.effDate;
	        			serviceProdAcceptInfoVO.expDate = prodOfferAcceptInfoVO.expDate;
	        		}
	        	}
	        };
	         /**
             * 根据接入类产品的动作类型和销售品的动作类型来计算销售品的生效时间
             */
	        var computationEffDateByOperKind = function(prodOfferAcceptInfoVO,accessProdAcceptInfo){
	        	var effDate = null;
            	//获取系统时间
				var SYSDATE = dojo.global.$appContext$.requestParam.today;
				//产品为新增加的，销售品是新增加或者变更
            	if(accessProdAcceptInfo.operKind == util.OperKindConst.addOperKind){
            		//销售品为新增加的
					if(prodOfferAcceptInfoVO.operKind == util.OperKindConst.addOperKind){
						effDate = util.DateHelper.getDateFromString(SYSDATE);
					//销售品为变更的
					}else if(prodOfferAcceptInfoVO.operKind == util.OperKindConst.chgOperKind){
						effDate = util.DateHelper.getDateFromString(SYSDATE);
					}
				//产品为退订				
				}else if(accessProdAcceptInfo.operKind == util.OperKindConst.delOperKind){
					//销售品为退订
					if(prodOfferAcceptInfoVO.operKind == util.OperKindConst.delOperKind){
						effDate = util.DateHelper.getDateFromString(SYSDATE);
					}
				//对于变更		
				}else if(accessProdAcceptInfo.operKind == util.OperKindConst.chgOperKind){
					//销售品是新增加的
					if(prodOfferAcceptInfoVO.operKind == util.OperKindConst.addOperKind){
						effDate = util.DateHelper.getFirstDayAfterPeriod();
					//销售品时变更的
					}else if(prodOfferAcceptInfoVO.operKind == util.OperKindConst.chgOperKind){
						//暂时不做处理
					//	销售品是退订的
					}else if(prodOfferAcceptInfoVO.operKind == util.OperKindConst.delOperKind){
						effDate = util.DateHelper.getFirstDayAfterPeriod();
					}		
				}
				return effDate;
	        };
	        
	        /**
	         * 计算销售品的生效时间
	         * 注：该方法是有协议销售品变更主套餐时才会调用
	         */
	        var computationOfferStandardOfferDate = function(custOrderAcceptInfoVO){
	        	//1.判断是否有协议销售品(找出是变更主销售品的协议销售品)
	        	var selectedMemberProdOfferList = $ac$.get('selectedMemberProdOfferList');
	        	var agreementMemberList = dojo.filter(selectedMemberProdOfferList||[],function(selectedMemberProdOfferInfo){
	        		return (!!selectedMemberProdOfferInfo.offerInstVO)&&(selectedMemberProdOfferInfo.offerInstVO.prodOfferId!=selectedMemberProdOfferInfo.prodOfferId)
	        				&&(!!selectedMemberProdOfferInfo.offerInstVO.offerStandardInstList&&selectedMemberProdOfferInfo.offerInstVO.offerStandardInstList.length>0)
	        				&&(selectedMemberProdOfferInfo.action!='quit');
	        	});
	        	//2.找到协议销售品对应的成员销售品，计算其生效时间
	        	var orderAcceptInfoList = custOrderAcceptInfoVO.orderAcceptInfoList;
	        	var prodOfferAcceptInfoList = orderAcceptInfoList[0].prodOfferAcceptInfoList;
	        	dojo.forEach(agreementMemberList||[],function(agreementMemberInfo){
	        		//获取页面的唯一的成员销售品标识
	        		var uniqueId = agreementMemberInfo.uniqueId;
	        		//新的协议销售品信息
	        		var newOfferStandardInfo = BusCard.find(prodOfferAcceptInfoList||[],function(prodOfferAcceptInfo){
	        			return prodOfferAcceptInfo.uniqueId == uniqueId;
	        		});
	        		if(!!newOfferStandardInfo){
	        			if($ac$.get("offerStandardStartDate_"+agreementMemberInfo.offerInstVO.prodOfferInstId)){
	        				//设置新的协议销售品的开始时间
	        				var agreementDateObj = $ac$.get("offerStandardStartDate_"+agreementMemberInfo.offerInstVO.prodOfferInstId);
	        				newOfferStandardInfo.effDate = agreementDateObj.beginDate;
	        				//设置新的销售品的属性开始时间
	        				dojo.forEach(newOfferStandardInfo.offerInstAttrList||[], function(offerInstAttrTempVO){
								offerInstAttrTempVO.effDate = agreementDateObj.beginDate;
							});
	        				//设置旧的销售品的结束时间
	        				var oldOfferStandardInfo = BusCard.find(prodOfferAcceptInfoList||[],function(prodOfferAcceptInfo){
			        			return prodOfferAcceptInfo.prodOfferInstId == agreementMemberInfo.offerInstVO.prodOfferInstId;
			        		});
			        		(!!oldOfferStandardInfo)?(oldOfferStandardInfo.expDate = agreementDateObj.oldOfferEndDate):null;
	        			}
	        		}
	        	});
	        };
	        
        });