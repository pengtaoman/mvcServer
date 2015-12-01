/**
 * 此模块放置所有模型数据构建处理逻辑
 * 
 * @module
 */
defineModule("orderaccept.prodofferaccept.data.MemberOrderGroupProductDataBuilder", ["../ProductDateBuilder",
                "../util", "../../common/js/ConstantsPool", "./ProdOfferNewDataBuilder"], function(
                ProductDateBuilder, util, ConstantsPool, ProdOfferNewDataBuilder) {
	        
	        /**
			 * 成员订购集团产品处理类
			 */
	        dojo.declare("orderaccept.prodofferaccept.data.MemberOrderGroupProductDataBuilder",
	                [ProdOfferNewDataBuilder], {
		                /**
						 * 生成客户订单数据,主包包括以下计算过程: 1: 订单基本信息
						 * buildOrderCommonInfoVOBean 2: 主销售品信息(成员主产品变更)
						 * doGroupProductInfoComputation 3:集团产品信息
						 * doSubGroupProductInfoComputation 4:子群信息
						 * doMainProdOfferInfoComputation 5: 可选包信息
						 * doAccountInfoComputation
						 * 如果其中一个计算环节出现错误(计算方法返回值为false),那么整个 生成订单的流程就立刻中断
						 * @method
						 */
				        generateOrder : function() {
				        	ConstantsPool.load(["ItemRelationTypeConst"]);
				        	this.groupItemRelationInfoList = [];
				        	this.memberGroupOperKind = null;
				        	this.groupNetType = null;
					        var custOrderAcceptInfoVO = {},
						        protoPush = Array.prototype.push,
						        // 订单基本信息,
						        // 与java端PageInfoVO/orderCommonInfoVO路径对应
						        custOrderBasicAcceptInfoVO = this.buildCustOrderBasicAcceptInfoVO(),
						        // 接入类信息,与java端OrderInfoVO/AccessProdAcceptInfoVO对应
						        accessProdAcceptInfoList = [],
						        // 销售品信息,与java端OrderInfoVO/prodOfferAcceptInfoList对应
						        prodOfferAcceptInfoList = [],
						        // 订单信息,与java端PageInfoVO/orderInfoList对应
						        orderAcceptInfoList = [],
						        // 成员主产品订单提交数据计算中间结果
						        memberProductCPResult = null,
						        //群组产品数据计算
						        groupProductCPResult = null,
						        //子群产品数据计算
						        subGroupProductCPResult = null,
						        // 可选包订单提交数据计算中间结果
						        subProdOfferCPresult = null,
						        // 如果是连续受理,取在父页面保存下来的custOrderId
						        custOrderId = this.controller.getCustOrderId();
					        if(!custOrderBasicAcceptInfoVO){
						    	return false;
						    }
						    //取集团netType，区分集团和行业应用
						    var groupProductInfo = BusCard.$remote("innerInterfaceBO").getProductInfo({
						    	interfaceType : 1,
						    	productId : $ac$.get("groupProdInstInfo").productId
						    });
						    this.groupNetType = !!groupProductInfo.netType?groupProductInfo.netType:null;
						    if(!this.groupNetType){
						    	return false;
						    }
						    //订购的时候判断集团用户最大数量
						    if ($ac$.get("userHasGroupOfferInfoList").length==0
						    		&&this.controller.route("/checkInstance/maxIvpnUserCheck",[$ac$.get("groupProdInstInfo")]) === false) {
						        return false;
					        }
					        // 如果成员产品、群组产品、子群、可选包,等计算中有错误,那么中断整体订单提交过程的计算
					        if (!((memberProductCPResult = this.doMemberProductInfoComputation()) !== false 
					        	&& (subProdOfferCPresult = this.doSubProdOfferInfoComputation(memberProductCPResult)) !== false
					        	&& (groupProductCPResult = this.doGroupProductInfoComputation())!==false
					        	&& (subGroupProductCPResult = this.doSubGroupProductInfoComputation(this.groupItemRelationInfoList))!== false)) {
										return false;
									}
					        
					        // 把成员接入类信息放在当前局部变量中
					        accessProdAcceptInfoList.push(memberProductCPResult);
					        if(groupProductCPResult!=null){
					       		dojo.mixin(groupProductCPResult,{itemRelationInfoList:this.groupItemRelationInfoList});
					        	accessProdAcceptInfoList.push(groupProductCPResult);
					        }	
//					        if(subGroupProductCPResult!=null){
//					        	dojo.mixin(subGroupProductCPResult,{itemRelationInfoList:this.groupItemRelationInfoList});
//					        	accessProdAcceptInfoList.push(subGroupProductCPResult);
//					        }
					        //子群
					        protoPush.apply(accessProdAcceptInfoList, subGroupProductCPResult || []);
					        // 把可选包计算的中间结果中的可选包信息放到当前局部变量prodOfferAcceptInfoList中
					        protoPush.apply(prodOfferAcceptInfoList, subProdOfferCPresult.prodOfferAcceptInfoList || []);					        
					        
					        // 生成本次受理的受理编号
					        var acceptGroupId = "" + this.getAcceptGroupId();
					        
					        // 通过可选包,促销包,服务信息和支付关系构建一份订单信息(对应java端OrderInfoVO)
					        orderAcceptInfoList.push({
						                acceptGroupId : acceptGroupId,
						                prodOfferAcceptInfoList : prodOfferAcceptInfoList,
						                accessProdAcceptInfoList : accessProdAcceptInfoList
					                });
					        var customerAcceptInfoVO = this.buildCustomerAcceptInfoVO();
					        
					        // 通过以上计算结果生成一份没有计算关系和检测的pageInfoVO
					        dojo.mixin(custOrderAcceptInfoVO, {
						                customerAcceptInfoVO : customerAcceptInfoVO,
						                custOrderBasicAcceptInfoVO : custOrderBasicAcceptInfoVO,
						                orderAcceptInfoList : orderAcceptInfoList
					                });
					        // 执行全局检测
					        if (this.doGlobalBusAndRuleCheck(custOrderAcceptInfoVO) == false) {
		
					        return false; };
					        
					        // 为所有的产品订单信息的AccProdInstId赋值
					        this.setAccProdInstIdForAll(custOrderAcceptInfoVO);
					        
					        return custOrderAcceptInfoVO; 
					        
				        },
		                /**
						 * 成员订购集团产品填写页面公共信息
						 * 
						 * @override
						 * @method
						 */
		                getCommInfo : function() {
			                return {};
		                },
		                /**
		                 * 成员订购集团产品，成员主销售品不变，生成接入类变更信息，包括和集团主销售品和子群的群子关系等
		                 */
		                doMemberProductInfoComputation : function(){
		                	var memberProdInstInfo = $ac$.get("_memberProdInstInfo"),
		                		productInfoVO = memberProdInstInfo.productInfoVO,
		                		prodInstVO = memberProdInstInfo.prodInstVO,
			                	// 复制一份规格层面的产品信息作为产品提交数据构建的模板
					        	clonedProductInfoVO = dojo.clone(productInfoVO);
					        dojo.mixin(clonedProductInfoVO,prodInstVO);	
					        // 混入业务类型
					        dojo.mixin(clonedProductInfoVO, {
						                serviceKind : productInfoVO.netType,
						                operKind : 2,
						                ActionCD : ConstantsPool.ActionCDConst.PRODUCT_CHANGE,
						                orderItemId : -util.CommUtils.generateUniqueId(),
						                flowFlag : 1
					                });
					        // 属性不变
							BusCard.each(clonedProductInfoVO.prodInstAttrList,function(prodInstAttrInfo){
								prodInstAttrInfo.operKind = 0;
							});			                
					        // 从产品提交数据模板中构建一份和java端RelaProdInfoVO对应的前端js表示
					        accessProdAcceptInfoVO = this.buildAccessProdAcceptInfoVO(clonedProductInfoVO);
					        
					        return accessProdAcceptInfoVO;
		                },
		                /**
		                 * 计算群组产品数据
		                 */
		                doGroupProductInfoComputation : function(){
		                	if(this.memberGroupOperKind == 2||this.memberGroupOperKind == 3) return null;
		                	var groupProdOfferInstId = this.controller.requestParam.groupProdOfferInstId,
		                		param = "method=getGroupProdInst&groupProdOfferInstId="+groupProdOfferInstId,
		                		groupProdInstList = util.ServiceFactory.getService(
		                			"url:shoppingCartAction.do?" + param),
		                		groupProdInstInfo = dojo.filter(groupProdInstList,function(prodInstInfo){
		                			return prodInstInfo.prodTypeCd == '13';//13 群组 14 子群
		                		})[0],
		                		clonedGroupProdInstVO = dojo.clone(groupProdInstInfo);
		                	dojo.mixin(clonedGroupProdInstVO, {
		                				customerId : $ac$.groupInfo.custId,
						                serviceKind : this.groupNetType,
						                operKind : 2,
						                ActionCD : ConstantsPool.ActionCDConst.PRODUCT_CHANGE,
						                orderItemId : -util.CommUtils.generateUniqueId(),
						                flowFlag : 0
					                });
					        // 属性不变
							BusCard.each(clonedGroupProdInstVO.prodInstAttrList||[],function(prodInstAttrInfo){
								prodInstAttrInfo.operKind = 0;
							});	        
					        return this.buildAccessProdAcceptInfoVO(clonedGroupProdInstVO);
		                },
		                /**
		                 * 计算子群产品数据
		                 */
		                doSubGroupProductInfoComputation : function(groupItemRelationInfoList){
		                	var accessProdAcceptInfoList = [];
		                	if(this.memberGroupOperKind == 3) return null;
		                	if(this.controller.subGroupWidgetInstance
		                			&&(dojo.byId("addSubGroup").checked==true||dojo.byId("changeSubGroup").checked==true)){
		                		var subGroupInfo = this.controller.subGroupWidgetInstance.getPageData();
 								if(subGroupInfo.prodInstId==-1) return null;
 								if(dojo.byId("changeSubGroup").checked==true
 									&&subGroupInfo.prodInstId==$ac$.get("_alreadyMemberProdInst").prodInstId){
 										return null;
 									}		
		                		var	param = "method=getProductInstDetail&prodInstId="+subGroupInfo.prodInstId,
		                			subProdInstInfo = util.ServiceFactory.getService(
		                				"url:orderDetailAction.do?"+param);
		                			clonedSubGroupProdInstVO = dojo.clone(subProdInstInfo);
		                		dojo.mixin(clonedSubGroupProdInstVO, {
		                				customerId : $ac$.groupInfo.custId,
						                serviceKind : this.groupNetType,
						                operKind : 2,
						                ActionCD : ConstantsPool.ActionCDConst.PRODUCT_CHANGE,
						                orderItemId : -util.CommUtils.generateUniqueId(),
						                flowFlag : 0
					                });	
					            // 属性不变
								BusCard.each(clonedSubGroupProdInstVO.prodInstAttrList,function(prodInstAttrInfo){
									prodInstAttrInfo.operKind = 0;
								});	    
 								//加入和变更的时候新子群实例挂子群关系，变更和退出的旧子群实例挂关系删除
								//代码后续补充
					            accessProdAcceptInfoList.push(dojo.mixin(
					            	this.buildAccessProdAcceptInfoVO(clonedSubGroupProdInstVO),
					            	{itemRelationInfoList:this.groupItemRelationInfoList}));
					            
		                	}
		                	if(this.controller.subGroupWidgetInstance
		                			&&(dojo.byId("quitSubGroup").checked==true||dojo.byId("changeSubGroup").checked==true)){
		                		var clonedSubGroupProdInstVO = dojo.clone($ac$.get("_alreadyMemberProdInst"))
		                		dojo.mixin(clonedSubGroupProdInstVO, {
						                serviceKind : this.groupNetType,
						                operKind : 2,
						                ActionCD : ConstantsPool.ActionCDConst.PRODUCT_CHANGE,
						                orderItemId : -util.CommUtils.generateUniqueId(),
						                flowFlag : 0
					                });	
					            var newItemRelationInfoList  = dojo.map(dojo.clone(this.groupItemRelationInfoList),function(itemInfo){
					            	 itemInfo.orderRelType = ConstantsPool.ItemRelationTypeConst.PROD_PROD_RELATION_DELETE;
					            	 return itemInfo;
					            });
					            accessProdAcceptInfoList.push(dojo.mixin(
					            	this.buildAccessProdAcceptInfoVO(clonedSubGroupProdInstVO),
					            	{itemRelationInfoList:newItemRelationInfoList}));
		                	}
		                	return accessProdAcceptInfoList;
		                },
		                
		                /**
		                 * 计算可选包数据，不涉及主销售品及关系
		                 */
		                doSubProdOfferInfoComputation : function(){
		                	var dataBuilder = this;
					        var prodOfferAcceptInfoList = [];
					        this.loadSubProdOfferPageData();
					        // 1.获取可选包区域的数据
			    		    var subProdOfferCartPageData = dojo.global.$appContext$.get(this.SUB_KEY);
			    		    if (!subProdOfferCartPageData) { return false; }
			    		    // 2.计算销售品数据
					        dojo.forEach(subProdOfferCartPageData, function(data) {
						                prodOfferAcceptInfoList = prodOfferAcceptInfoList.concat(dataBuilder
						                        .doMultipleSubProdOfferComputation(data));
					                });
							return {
						        prodOfferAcceptInfoList : prodOfferAcceptInfoList
					        };	
		                },
		                /**
						 * 计算可选包部分销售品信息
						 */
		                doMultipleSubProdOfferComputation : function(subProdOfferCartPageData){
		                	var dataBuilder = this;
					        var prodOfferAcceptInfoList = [];
					        // 可选包区域中可选包销售品数据
					        var subProdOfferPageData = subProdOfferCartPageData.subProdOfferPageData;
					        // 1.计算新增加的可选包销售品
			     			var addProdOfferAcceptInfoList = dataBuilder.doComputationAddProdOffer(subProdOfferPageData); 
					        // 2.计算退订的可选包销售品
					        var deleteProdOfferAcceptInfoList = dataBuilder.doComputationDeleteProdOffer(subProdOfferPageData);
					        // 3.计算变更的可选包销售品
					        var chgProdOfferAcceptInfoList = dataBuilder.doComputationChgProdOffer(subProdOfferPageData);
					        prodOfferAcceptInfoList = prodOfferAcceptInfoList.concat(addProdOfferAcceptInfoList,deleteProdOfferAcceptInfoList,chgProdOfferAcceptInfoList);
					        //找出可选包中个人集团销售品，和群组、子群挂关系用  memberGroupOperKind
					        BusCard.each(prodOfferAcceptInfoList,function(prodOfferAcceptInfo){
					        	//群组个人销售品
					        	if (prodOfferAcceptInfo.prodOfferId == dataBuilder.controller.requestParam.memberGroupOfferInfo.prodOfferId) {
										dataBuilder.memberGroupOperKind = prodOfferAcceptInfo.operKind;//判断个人集团销售品订购情况
										if(prodOfferAcceptInfo.operKind == 1||prodOfferAcceptInfo.operKind==2){
											dojo.mixin(prodOfferAcceptInfo.serviceProdAcceptInfoList[0],{orderItemId:-util.CommUtils.generateUniqueId()});
											var itemRel = {
										        	zorderItemId : prodOfferAcceptInfo.serviceProdAcceptInfoList[0].orderItemId,
										        	orderRelType : dataBuilder.groupNetType==12
										        				   ?ConstantsPool.ItemRelationTypeConst.GROUP_CHILD_RELA
										        				   :ConstantsPool.ItemRelationTypeConst.INDUSTRY_APP_PERSONAL_PROD_RELA
										        };
										    dataBuilder.groupItemRelationInfoList.push(dataBuilder.buildItemRelationVO(itemRel)) 
										}
										 
									}
					        })	
					        return prodOfferAcceptInfoList;
		                },
		                /**
		                 * 获取userId
		                 */
		                getVirtualUserId : function(){
		                	return this.controller.requestParam.prodInstId;
		                },
		                /**
						 * 构建订单项关系对象
						 * 
						 * @method
						 */
				        buildItemRelationVO : function(itemRelationVO) {
					        return this.beanBuildFactory.getItemRelationVO(itemRelationVO);					        
				        }
				        
	                });
	        
        });