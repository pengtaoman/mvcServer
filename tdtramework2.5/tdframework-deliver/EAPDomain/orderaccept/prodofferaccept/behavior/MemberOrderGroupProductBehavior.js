defineModule("orderaccept.prodofferaccept.behavior.MemberOrderGroupProductBehavior", [
                "./ProdOfferNewBehavior", "../util","orderaccept.common.dialog.MessageBox"],
                function(ProdOfferNewBehavior, util,MessageBox) {
	        dojo.declare("orderaccept.prodofferaccept.behavior.MemberOrderGroupProductBehavior",
	                [ProdOfferNewBehavior], {
	                	postscript : function() {
			                this.subscribe();
		                },
		                subscribe : function() {
			                var behavior = this;
			                this.inherited(arguments);
			      			// 集团下拉框更换事件
			        		this.handleRegistry.push(dojo.subscribe("/groupId/change", function() {
				                return behavior.onGroupIdChange();
			                }));
			                // 选取集团销售品实例
			        		this.handleRegistry.push(dojo.subscribe("/groupOfferInstItem/dblclick", function(event) {
				                return behavior.onGroupOfferInstClick(event);
			                }));
			                // 选取子群信息
			        		this.handleRegistry.push(dojo.subscribe("/subGroup/click", function(event) {
				                return behavior.onSubGroupClick(event);
			                }));
			                // 企业名称模糊查询
			        		this.handleRegistry.push(dojo.subscribe("/groupNameSearch/keyup", function(event) {
				                return behavior.onGroupNameKeyup(event);
			                }));
			                 // 企业名称模糊查询
			        		this.handleRegistry.push(dojo.subscribe("/clickGroupNameSearch/click", function(event) {
				                return behavior.onGroupNameClick(event);
			                }));
			                
		                },
		                onGroupNameClick : function(){
		                	var controller = this.controller,
		                	    target = dojo.byId("groupName");
		                	if(!BusCard.trim(target.value)){
		                		MessageBox.alert({
												message:"请输入企业名称"
											});
								return false;
		                	}
		                	var groupNameList = BusCard.$remote("serviceParamBO").getGroupName(target.value);
		                	controller.renderGroupName(groupNameList);
		                },
		                onGroupNameKeyup : function(event){
		                	if(event.keyCode == 13){
		                		this.onGroupNameClick();
		                	}
		                },
		                onSubGroupClick : function(event) {
					        var hrefNode = event.currentTarget,
						        tRNode = hrefNode.parentNode.parentNode.parentNode.parentNode,
						        serviceNode = function() {
							        var serviceTr = tRNode;
							        while (true) {
								        serviceTr = serviceTr.nextSibling;
								        if (serviceTr && (serviceTr.tagName || "").toUpperCase() == 'TR') {
									        break;
								        }
							        }							        
						      	    return dojo.query(".subGroupInfo", serviceTr)[0];							        
						        }();
						        if(dojo.attr(serviceNode.parentNode.parentNode,"class")!=""||
						        		hrefNode.checked==false){
						        	dojo.toggleClass(serviceNode.parentNode.parentNode, "hidden-elem");
						        }

						    //判断如果选择退出按钮 则将子群置灰
						    if(dojo.query('#quitSubGroup',tRNode)[0].checked){
						    	dojo.query("#prodInstId",this.controller.subGroupWidgetInstance.domNode)[0].disabled = true;
						    }else{
						    	dojo.query("#prodInstId",this.controller.subGroupWidgetInstance.domNode)[0].disabled = false;
						    }
				        },
		                onGroupIdChange : function() {
					        var controller = this.controller;
					        //刷新集团产品实例
					        if( dojo.global.$appContext$.get("_groupProdOfferInstList")){
					        	dojo.global.$appContext$.deleteProperty("_groupProdOfferInstList");					        	
					        }
					        controller.renderGroupOfferInstList();
					        //重复选择的时候销毁之前的信息
				        	controller.changeGroupOffer();
				        },
				        onGroupOfferInstClick : function(event){
				        	var controller = this.controller,
				        		node = event.currentTarget,
				        		productId = controller.requestParam.productId,
				        		userId = controller.requestParam.prodInstId;
				        	//获取销售品下的接入类产品实例信息	
				        	var groupProdInstInfo = util.ServiceFactory.getService("url:orderDetailAction.do?" +
				        			"method=getGroupProdInst&prodOfferInstId="+dojo.attr(node,"prodOfferInstId"));
				        	$ac$.set("groupProdInstInfo",groupProdInstInfo);
				        	var param = "method=getProductInfo&productId=" + productId+ "&userId=" + userId,
				        	    productInfo = util.ServiceFactory.getService("url:orderDetailAction.do?" + param);
				        	//成员接入类实例
				        	$ac$.set("_memberProdInstInfo", productInfo);
				        	if (this.controller.route("/checkInstance/businessAcceptCheck", [groupProdInstInfo.productId]) === false) {
						        return false;
					        }
					        if (this.controller.route("/checkInstance/groupProductOrderCheck",[dojo.query("a",node)[0].innerHTML,productInfo.productInfoVO.productName]) === false) {
						        return false;
					        }
    
				        	var parameter = "method=getOrderSubGroupId&prodInstId=" +controller.requestParam.prodInstId+"&groupProdOfferInstId="+dojo.attr(node,"prodOfferInstId");
					        var resultStr = util.ServiceFactory.getService("url:orderDetailAction.do?" + parameter)
				        	//成员已加入的子群信息
				        	$ac$.set("_alreadyMemberProdInst", resultStr);
				        	
				        	
				        	//集团销售品实例id和规格id
				        	dojo.mixin(controller.requestParam,{"groupProdOfferInstId":dojo.attr(node,"prodOfferInstId")});
				        	dojo.mixin(controller.requestParam,{"groupProdOfferId":dojo.attr(node,"prodOfferId")});
				        	//取成员订购的所有销售品实例和规格数据
				        	BusCard.doGet(BusCard.path.contextPath + "/orderDetailAction.do", {
				                method : "doGetProdOfferListForChgMainProvider",
				                prodOfferInstId : controller.requestParam.prodOfferInstId
			                }, true, function(prodOfferData) {
				                dojo.global.$appContext$.set("userHasProdOfferInfoList",
				                        prodOfferData.userHasProdOfferInfoList);
				                dojo.global.$appContext$.set("userHasProdOfferMetaInfoList",
				                        prodOfferData.userHasProdOfferMetaInfoList || []);
				                //渲染成员主销售品试图
				        		controller.renderMemberProdInst();
			                });
//			                var groupInfo = controller.route("spring:groupInfoBO/getGroupInfoByCustId",
//			                	[{custId: dojo.byId("common-groupId").value}]);
//			                $ac$.set("groupInfo", groupInfo);	
				        },
				      /**
						 * 可选包树点击事件
						 * 
						 * @method
						 */
				        onSubProdOfferTreeNodeClick : function(node) {
					        var data = node.getData(),
						        behavior = this,
						        id = node.getData().id,
						        leaf = node.getData().leaf,
						        isCatalog = node.getData().isCatalog
					        if (leaf) {
						        behavior.showSubProdOffer(id, node);
						        
					        }
				        },
				        onSubProdOfferCheckBoxClick : function(event){
				        	var behavior = this,
				        		target = event.currentTarget,
				        		subProdOfferOrderGrid = behavior.controller.subProdOfferOrderGrid;
				        	//如果取消的是个人IVPN销售品，则取消所有可选包	
				        	if(target.value == behavior.controller.requestParam.memberGroupOfferInfo.prodOfferId
				        			&&target.checked == false){
				        		dojo.forEach(subProdOfferOrderGrid.getData(),function(data){
				        			var node = dojo.query(".subProdOfferDetail-" + data.rowIndex,
										                        subProdOfferOrderGrid.domNode)[0].childNodes[0];
				        			if(node.checked==true){
				        				node.click();
				        			}
				        		})
				        		
				        	}else if (target.value != behavior.controller.requestParam.memberGroupOfferInfo.prodOfferId
				        			&&target.checked == true){
				        		if (dojo.query("[id=key-"
				        					+ behavior.controller.requestParam.memberGroupOfferInfo.prodOfferId
											+ "]",subProdOfferOrderGrid.domNode)[0].checked == false){
				        			/**MessageBox.alert(
				        				{title:"提示信息",
				        				 message:"请先选择个人群组销售品：【"+
				        					behavior.controller.requestParam.memberGroupOfferInfo.prodOfferName+"】"})*/
				        			var prodOfferName=behavior.controller.requestParam.memberGroupOfferInfo.prodOfferName;	
		        					MessageBox.alert({
												busiCode : "08410093",
												infoList : [ prodOfferName ]
											});
				        			event.preventDefault();
				        			return false;
				        		}
				        	}
				        	this.inherited(arguments);
				        },
				        warningRefreshPromotion : function(){
				        	
				        },
				        onSaveOrder : function(event){
				        	if($ac$.get("submitFlag")!=1){//没有个人集团销售品
				        		return false;
				        	}
				        	this.inherited(arguments);
				        }
				        


	                });
	        
        });