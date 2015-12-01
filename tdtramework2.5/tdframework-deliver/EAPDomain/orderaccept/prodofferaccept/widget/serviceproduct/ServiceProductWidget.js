defineModule("orderaccept.prodofferaccept.widget.serviceproduct.ServiceProductWidget", ["orderaccept.custom._BaseWidget",
                "orderaccept.custom._BusCardTemplated", "dijit._Container",
                "orderaccept.prodofferaccept.util","../attrcard/ProductAttrCardWidget",
                "orderaccept.custom.TooltipDialog","orderaccept.common.js.ConstantsPool",
                "orderaccept.custom.popup", "orderaccept.common.dialog.MessageBox"],
        function(_Widget, _Templated, _Container, util, ProductAttrCardWidget, TooltipDialog, ConstantsPool,popup,messageBox) {
	        /**
			 * 创建主销售品订购时对应的widget
			 * 
			 * @class
			 * @requires ["dijit._Widget",
			 *           "orderaccept.custom._BusCardTemplated",
			 *           "orderaccept.prodofferaccept.util"]
			 * @module orderaccept.prodofferaccept.widget.serviceproduct.ServiceProductWidget
			 * @runtimeDependences $appContext$.prodOfferList
			 */
	        dojo.declare("orderaccept.prodofferaccept.widget.serviceproduct.ServiceProductWidget", [_Widget, _Templated,
	                        _Container], {
		                templatePath : dojo.moduleUrl("orderaccept.prodofferaccept.widget.serviceproduct",
		                        "template/serviceProductTpl.html"),
                    	constructor : function(){
                    		//this.inherited(arguments);
				            this.productId = arguments[0].productId;
				            this.prodOfferInfoVO = arguments[0].prodOfferInfoVO;
				            this.serviceCardWidget = arguments[0].serviceCardWidget;
				            this.serviceProdList = arguments[0].serviceProdList;	
				            this.prodOfferInst = arguments[0].prodOfferInst;			            
				            this.rowSize = 4;
				            this.serviceProdAttrList = [];
				            this.orderedProdList = {};
				            this.unorderedProdList = {};
                    	},
		                postMixInProperties : function() {
			                this.viewInitData = this.buildViewInitData();
		                },
		                destroyRecursive : function(){
		                	var serviceProdAttrList = this.serviceProdAttrList;
		                	if(!!serviceProdAttrList){
			                	dojo.forEach(serviceProdAttrList,function(attrWidget){
		                			if(!!attrWidget){
			                			attrWidget.destroyRecursive();
		                			}
			                	});
		                	}
							this.inherited(arguments);
		                },
		                /**
						 * 构建视图展现初始化数据
						 * 
						 * @method
						 */
		                buildViewInitData : function() {
		                	var prodWidget = this;
		                	var list = this.serviceProdList;
		                	var rowSize = this.rowSize;
			                var rowIndex = 0;
			                var roleInfo = [];
						    dojo.forEach(list,function(prodInfo){
						    	var attrList = !!prodInfo.productInfoVO?prodInfo.productInfoVO.attrList:[];
						    	var attrCardWidget = {};
						        var prodOfferInst = prodWidget.prodOfferInst;
						        var prodInstVO = null;
						        var accessProdInstId = !!prodWidget.serviceCardWidget.cardParam?prodWidget.serviceCardWidget.cardParam.userId:"";
						        if(!!prodOfferInst){						        	
							        var prodInstList = dojo.filter(prodOfferInst.prodInstList,function(prodInst){
											        	return prodInst.prodInstId == accessProdInstId;
											        })[0].prodInstList;
									if(!!prodInstList && prodInstList.length > 0){
								        prodInstVO = dojo.filter(prodInstList,function(prodInst){
											        	return prodInst.productId == prodInfo.productInfoVO.productId &&
											        				prodInst.prodFuncType != ConstantsPool.load("ProductFuncTypeConst").ProductFuncTypeConst.ACCESS;
											        })[0];
									}
						        }
						        prodInfo.prodInstInfo = prodInstVO;
						    	prodInfo.rowIndex = rowIndex;
						    	prodInfo.ifNextRow = false;
						    	prodInfo.ifShowAttr	= !!util.AttrUtil.checkedIfNeedShow(attrList)?1:0;	
						    	prodInfo.uniqueId = prodWidget.serviceCardWidget.metaData.uniqueId;
						    	prodInfo.ifNotNull = "";
						    	prodInfo.notNull = "display:none"; 
						    	if(!util.AttrUtil.checkIfNotNull(attrList)){
						    		prodInfo.ifNotNull = "display:none"; 
						    		prodInfo.notNull = ""; 
						    	}
						    	if(prodInfo.ifShowAttr == 1){	
						    		attrCardWidget = prodWidget.initServiceProdAttr(prodWidget,prodInfo,prodInstVO)
						        }
						        prodInfo.checkStr = prodWidget.checkProdSelectStatus(prodInfo,prodInstVO);
						        if(!!prodInfo.checkStr && prodInfo.checkStr!=""){						        	
				            		prodWidget.orderedProdList[""+prodInfo.productInfoVO.productId] = prodInfo;
						        }else{
				            		prodWidget.unorderedProdList[""+prodInfo.productInfoVO.productId] = prodInfo;
						        }
					       		//生成产品对象
					       		var productItem = {
						       		"rowIndex" : rowIndex,
								    "productInfo" : prodInfo,
								    "productAttrCard" : attrCardWidget.needRendering?attrCardWidget:null
								    //"checkedStatus" : true
						       	};	
						       	//判断是否有角色
						       	if(!!prodInfo.roleInfoVO){
						       		if(!!roleInfo[prodInfo.roleInfoVO.roleCD]){
						       			roleInfo[prodInfo.roleInfoVO.roleCD].push(productItem);
						       		}else{
						       			roleInfo[prodInfo.roleInfoVO.roleCD] = [];
						       			roleInfo[prodInfo.roleInfoVO.roleCD].push(productItem);
						       		}
						       	}
						        rowIndex++;
						    });
						    prodWidget.roleInfo = roleInfo;
						    if(!!list && list.length > 0){
						    	totalRows = Math.ceil(list.length/rowSize);
						    	for(var i = 1 ; i <= totalRows ; i++){	
					    			var index = i*rowSize-1;
					    			if(!!list[index]){
					    				list[index].ifNextRow = true;
					    			}
						    	}
						    }
			                tpContext = {			                	
				                "prodRowList" : list
			                };
			                return {
				                prodOfferViewData : tpContext				                
			                }
		                },	
		                initServiceProdAttr : function(prodWidget,productInfo,prodInstVO){
					        var serviceProdAttrWidget = new TooltipDialog({
						                id : 'serviceProdAttrWidget-'+prodWidget.serviceCardWidget.metaData.uniqueId+'-'+productInfo.rowIndex
					                });  
				            prodWidget.serviceProdAttrList[productInfo.rowIndex] = serviceProdAttrWidget;			        
			       			serviceProdAttrWidget.startup();					            
					        var commitButton = "<div style='text-align:center;vertical-align:middle'><a href='javascript:void(0);' dojoAttachEvent='onclick:elementclick' \
					        		dojoAttachTopic='/prodOfferDetailBtn'\ style='text-align:center;vertical-align:middle;'>关闭</a></div>";	
					        dojo.place(commitButton, serviceProdAttrWidget.containerNode, "last");					        
					        var tabContainer = new unieap.layout.TabContainer({
					        	height : 'auto' 
				        	});					        
					        serviceProdAttrWidget.tabContainer = tabContainer;	
					        serviceProdAttrWidget.rowData = {};
					        serviceProdAttrWidget.rowData.prodOfferInst = !!prodInstVO?{}:null;
					        serviceProdAttrWidget.rowData.prodInst = prodInstVO;
					        tabContainer.startup();      				            
					        var attrCardWidget = new ProductAttrCardWidget({
						                productInfoVO : productInfo.productInfoVO,
						                prodOfferInfoVO : prodWidget.prodOfferInfoVO
					                });
					        if (attrCardWidget.needRendering) {
					        	var contentPane = new unieap.layout.ContentPane({
						                title : "产品属性",
						                detailWidgetId : serviceProdAttrWidget.id
					                });
						        attrCardWidget.busCardInstance.setParent(serviceProdAttrWidget);
				        		attrCardWidget.renderCard(contentPane.domNode, "first");
						        tabContainer.addChild(contentPane);
					        }
				        	if(!!prodInstVO&& !!prodInstVO.prodInstAttrList && prodInstVO.prodInstAttrList.length > 0){
				        		util.SetAttrInst(prodInstVO.prodInstAttrList,attrCardWidget.busCardInstance);
				        	}					                        
			       		    serviceProdAttrWidget.enableEvtMsgPropagation(serviceProdAttrWidget.domNode);  
			        		dojo.place(tabContainer.domNode, serviceProdAttrWidget.containerNode, "first"); 
			        		serviceProdAttrWidget.attrCardWidget = attrCardWidget;
			        		return attrCardWidget;
		                },
		                /**
						 * 处理功能类产品选择
						 * 
						 * @method
						 */
		                handleServiceProduct : function(rowIndex,node){
		                	var prodWidget = this,
		                		checkStatus = node.checked,
				            	prodInfo = prodWidget.filterServiceProdByRowIndex(rowIndex);
				            var relaResult = prodWidget.checkProdRela(prodInfo,checkStatus);
	                		if(relaResult.warnInfo != ""){
	                			if(relaResult.flag == "-1"){
							       // messageBox.alert({
								       // title : "\u63d0\u793a\u4fe1\u606f",
								       // message : relaResult.warnInfo
							       // });	
							        messageBox.alert({
								           busiCode : "08410207",
								           infoList : [relaResult.warnInfo]
									 });  
							        return false;
	                			}else{
									messageBox.confirm({
										message : relaResult.warnInfo,
										onComplete: function(value){
											if(value == true){
												var durationTime = 2000;
												var addStartColor = "#C0ECF6";
												var delStartColor = "#FFD0D0";
												var endColor = '';
												for(var key in relaResult.deleteList){
													if(!relaResult.deleteList.hasOwnProperty(key)){													
														continue;
													}
													var prodInfoVO = relaResult.deleteList[key];
													var rowId = prodInfoVO.productInfoVO.productId+"-"+prodInfoVO.rowIndex;
													dojo.byId("serviceProdCheck-"+rowId).checked = false;
			           								prodWidget.handleOrderProdList(false,prodInfoVO);
													prodWidget.changeColor(dojo.byId("serviceProdName-"+rowId),delStartColor,endColor,durationTime);
												};
												for(var key in relaResult.addList){
													if(!relaResult.addList.hasOwnProperty(key)){													
														continue;
													}
													var prodInfoVO = relaResult.addList[key];
													var rowId = prodInfoVO.productInfoVO.productId+"-"+prodInfoVO.rowIndex;
													dojo.byId("serviceProdCheck-"+rowId).checked = true;
			           								prodWidget.handleOrderProdList(true,prodInfoVO);
													prodWidget.changeColor(dojo.byId("serviceProdName-"+rowId),addStartColor,endColor,durationTime);
												};	
												var rowIdArg = prodInfo.productInfoVO.productId+"-"+rowIndex;
												prodWidget.changeColor(dojo.byId("serviceProdName-"+rowIdArg),checkStatus==true?addStartColor:delStartColor,endColor,durationTime);
											}else{	
												node.checked = checkStatus==true?false:true;
											}			
										},
										//关闭右上角的"X"按钮时执行onComplete函数
										iconCloseComplete:false
									}, node);
	                			}
	                		}
       						prodWidget.handleOrderProdList(checkStatus,prodInfo);
		                },
		                filterServiceProdByRowIndex : function(rowIndex){		                	
		                	return dojo.filter(this.serviceProdList,function(serviceProd){
		                				return serviceProd.rowIndex == rowIndex;
	                			})[0];
		                },
		                handleOrderProdList : function(checkStatus,prodInfo){	
		                	var prodWidget = this;
           					if(checkStatus == true){
            					prodWidget.orderedProdList[""+prodInfo.productInfoVO.productId] = prodInfo;		
	           					if(!!prodWidget.unorderedProdList[""+prodInfo.productInfoVO.productId]){        	
            						delete prodWidget.unorderedProdList[""+prodInfo.productInfoVO.productId];	
	           					}
	           				}else{		
	           					if(!!prodWidget.orderedProdList[""+prodInfo.productInfoVO.productId]){
            						delete prodWidget.orderedProdList[""+prodInfo.productInfoVO.productId];	    
	           					}
	            				this.unorderedProdList[""+prodInfo.productInfoVO.productId] = prodInfo;	
	           				}
		                },
		                /**
		                 * 
						 * 获取功能类产品页面数据
						 * 
						 * @method
						 */
		                getPageData : function() {
				        	var prodWidget = this,
					    		serviceNode = prodWidget.domNode.parentNode.parentNode.parentNode,
				        		serviceProdList = this.serviceProdList,
				        		relaProdPageInfoList = [],
		        				flag = true;
			        		Array.prototype.push.apply(relaProdPageInfoList);
				        	//首先判断角色信息
				        	if(prodWidget.checkRole()){
				        		return false;
				        	}
				        	for(var key in serviceProdList){
				        		if(!serviceProdList.hasOwnProperty(key)){
				        			continue;
				        		}
				        		var productInfo = serviceProdList[key],
						    		rowIndex = productInfo.rowIndex,
				        			serviceProdAttrWidget = prodWidget.serviceProdAttrList[rowIndex],
				        			attrCardWidget = !!serviceProdAttrWidget?serviceProdAttrWidget.attrCardWidget:null;
				        		var checkBoxId = "serviceProdCheck-"+productInfo.productInfoVO.productId+"-"+rowIndex;
				        		var checkBoxDom = dojo.query("[id='"+checkBoxId+"']",prodWidget.domNode)[0];
				        		var rowId = productInfo.productInfoVO.productId+"-"+rowIndex;
				        		var serviveProdAttrBtn = dojo.query("[id='serviceProdOfferAttr-"+rowId+"']",prodWidget.domNode)[0];
			        			var checkStatus = checkBoxDom.checked;
			        			if(!!checkStatus || !!productInfo.prodInstInfo){		
			        				if(!!checkStatus && !!attrCardWidget){    	
					        			if(!prodWidget.checkNotNull(attrCardWidget.domNode,attrCardWidget.domNode,serviceNode,serviveProdAttrBtn)){//如果卡片有未填的必填属性，返回false
					        				flag = false;
					        				return flag;
					        			}	
				        			}
				        			var	productItemData = {
				        				"prodBasicInfo" :{
				        					"productId" : productInfo.productInfoVO.productId,
				        					"prodInstId" : !!productInfo.prodInstInfo?productInfo.prodInstInfo.prodInstId:null,
				        					"prodInstInfo" : !!productInfo.prodInstInfo?productInfo.prodInstInfo:null,
				        					"checkedStatus" : checkStatus
				        				},
				        				"prodAttrInfo" : !!attrCardWidget?attrCardWidget.getCardData(null, null, true):null,//属性信息数据
				        				"productInfoVO" : productInfo.productInfoVO,
				        				"uniqueId" : prodWidget.serviceCardWidget.metaData.uniqueId
				        			};        			
							       	relaProdPageInfoList.push(productItemData);		
			        			}
				        	
				        	}
				        		
			        		if(!flag) return flag;
			        		return relaProdPageInfoList;
		                	
		                },	
				        /**
				         * 判断产品是否默认是否选中
				         */
				        checkProdSelectStatus : function(offerProdRelaVO,prodInstVO){
				        	var str = "";
				        	if(offerProdRelaVO.productInfoVO.ifSelectAble == "1" || offerProdRelaVO.minCount > 0 ){
			        			return str = " checked='true' disabled='true'";
				        	}
				        	if (!!prodInstVO) {
			        			str = " checked='true' ";
				        	}else{
					        	if(offerProdRelaVO.ifDefault==1){
					        		str = " checked = 'true' ";
					        	}
				        	}
				        	return str;
				        },				        
				        /**
				         * 判断角色信息是否满足,roleInfo下面每个角色对应一个List,每个List下面存放的是具有该角色的产品集合
				         * 判断角色的最大和最小值
				         */
				        checkRole : function(){
				        	var prodWidget = this;
				        	return BusCard.exist(prodWidget.roleInfo,function(roleItemList){
				        		//找出该角色下选中的产品集合
				        		var roleList = dojo.filter(roleItemList,function(roleItem){
				        			 return dojo.query("[id='serviceProdCheck-"+roleItem.productInfo.productId+"-"+roleItem.rowIndex+"']",
				        			 prodWidget.domNode)[0].checked==true;
				        		});
				        		var minNum = roleItemList[0].productInfo.roleInfoVO.roleNumMin,
				        			maxNum = roleItemList[0].productInfo.roleInfoVO.roleNumMax;
				        			//roleName = roleItemList[0].productInfo.roleInfoVO.roleName;
				        		if(roleList.length<minNum||roleList.length>maxNum){
				        			var nameStr = [];
				        			dojo.forEach(roleItemList,function(item){
				        				nameStr.push(item.productInfo.productInfoVO.productName);
				        			});
							       /** MessageBox.alert({
								        title : "\u63d0\u793a\u4fe1\u606f",
								        message : nameStr.toString()+"\n\u6700\u5c11\u9700\u8981\u9009\u62e9"+minNum+"\u4e2a\uff1b\u6700\u591a\u53ef\u4ee5\u9009\u62e9"+maxNum+"\u4e2a！"
							        });*/
							        messageBox.alert({
										busiCode : "08410160",
										infoList : [ nameStr.toString(),minNum,maxNum ]
					 				});
				        			//alert(nameStr.toString()+"\n最少需要选择"+minNum+"个；最多可以选择"+maxNum+"个！");
				        			return true;
				        		}
				        		return false;
				        	});	
				        },
				        /**
						 * 检测页面信息不能为空项
						 * 
						 * @param {dom} 页面区域，用于递归
						 * @param {cardNode} 页面区域，用于全局查询
						 */
						checkNotNull : function(dom, cardNode, serviceNode, aroundNode) {
							var Me = this;
							try {
								var childNodes = dom.childNodes;
								var l = childNodes.length;
								for (var index = 0; index < l; index++) {
									var t = childNodes[index].nodeType;
									var n = childNodes[index].nodeName;
									var elem = childNodes[index];
									if (t == 1) {
										if (n == 'SELECT' || n == 'INPUT') {
											if ((elem.getAttribute("isNull")||elem.isNull) == "0" && !BusCard.util.trim(elem.value)) {
												var label = !!cardNode
															?dojo.query("[id='label_" + childNodes[index].id+"']", cardNode)[0]
															:dojo.byId("label_" + childNodes[index].id);
												var text = /<span(?:.*?)>(?:.*?)<\/span>(.+)(\：|\:)/i.exec(label.innerHTML)[1];
												var groupId = elem.getAttribute("groupId")||elem.groupId;
												if (groupId && groupId != "0") {
													if (Me.getTabPanel()) Me.getTabPanel().active(groupId);
												}
												try{										 	
							                		var toolTip = util.DomHelper.getParentWidget(cardNode,
									                					  "orderaccept.custom.TooltipDialog");	
									              	
											        var isHidden = /hidden\-elem/.test(serviceNode.className);
											        if (isHidden) {
												        dojo.toggleClass(serviceNode, "hidden-elem");			        					
											        }		
											        aroundNode.focus();
											        messageBox.alert({
												        title : "\u63d0\u793a\u4fe1\u606f",
												        message : "[" + text + "]\u4e0d\u80fd\u4e3a\u7a7a"
											        },aroundNode);
													//alert("[" + text + "]\u4e0d\u80fd\u4e3a\u7a7a");
									                orderaccept.custom.popup.open({
								                        widget : {
									                        popup : toolTip,
									                        around : aroundNode
								                        }
								                    });								                    
												    elem.focus();
												 
												}catch(e){
											        messageBox.alert({
												        title : "\u63d0\u793a\u4fe1\u606f",
												        message : e.message
											        },aroundNode);
												}
												return false;
					
											}
											else {
												var flag = arguments.callee.call(Me, elem, cardNode, serviceNode, aroundNode);
												if (flag === false) return false;
											}
					
										}
										else {
											var flag2 = arguments.callee.call(Me, elem, cardNode, serviceNode, aroundNode);
											if (flag2 === false) return false;
										}
					
									}
					
								}
					
							}
							catch (e) {
						        messageBox.alert({
							        title : "\u63d0\u793a\u4fe1\u606f",
							        message : e.message
						        },aroundNode);
								return false;
							}
							return true;
						},
				        /**
						 * 检测页面功能类产品依赖互斥关系
						 * 
						 * @param {prodInfo}  产品信息
						 * @param {ifOrdered} 是否勾选
						 */
						checkProdRela : function(prodInfo,ifOrdered){
		                	var prodWidget = this,
		                		warnInfo = "",
		                		orderedProdList = prodWidget.orderedProdList,
		                		unorderedProdList = prodWidget.unorderedProdList,
		                		REL_MUTEX = ConstantsPool.load("ProdRelaTypeConst").ProdRelaTypeConst.MUTEX, //互斥
		                		REL_DEPEND = ConstantsPool.load("ProdRelaTypeConst").ProdRelaTypeConst.DEPEND, //依赖
		                		REL_RELATION = ConstantsPool.load("ProdRelaTypeConst").ProdRelaTypeConst.RELATION, //关联		                		
		                		deleteList = {},
		                		addList = {};
							for(var key in prodInfo.productInfoVO.prodRelaList){
								if(!prodInfo.productInfoVO.prodRelaList.hasOwnProperty(key)){													
									continue;
								}
								var prodRelaVO = prodInfo.productInfoVO.prodRelaList[key];
	                			if(prodRelaVO.relaType == REL_DEPEND){//计算依赖关系
	                				if(ifOrdered){
	                					if(!!unorderedProdList[""+prodRelaVO.prodB] && 
	                								prodRelaVO.prodB != prodInfo.productInfoVO.productId){
	                						var productInfo = unorderedProdList[""+prodRelaVO.prodB];
	                						var productInfoVO = productInfo.productInfoVO;
	                						warnInfo += "产品["+productInfoVO.productName+"]与当前订购产品存在依赖关系,需订购此产品\n";
	                						addList[""+productInfoVO.productId] = productInfo;
	                					}
	                				}else{
	                					if(!!orderedProdList[""+prodRelaVO.prodA] && 
	                								prodRelaVO.prodA != prodInfo.productInfoVO.productId){
	                						var productInfo = orderedProdList[""+prodRelaVO.prodA];
	                						var productInfoVO = productInfo.productInfoVO;
	                						if(productInfo.productInfoVO.ifSelectAble == "1"){
	                							warnInfo = "产品["+productInfoVO.productName+"]与当前订购产品存在依赖关系,且["+productInfoVO.productName+"]为必选产品,不能退订当前产品";
	                							return {"flag":-1,"warnInfo":warnInfo,"deleteList":deleteList,"addList":addList};
	                						}
	                						warnInfo += "产品["+productInfoVO.productName+"]与当前订购产品存在依赖关系,需退订此产品\n";
	                						deleteList[""+productInfoVO.productId] = productInfo;
	                					}	                					
	                				}
	                			}else if(prodRelaVO.relaType == REL_MUTEX){//计算互斥关系
	                				if((!!orderedProdList[""+prodRelaVO.prodA] && prodRelaVO.prodA != prodInfo.productInfoVO.productId) || 
    										(!!orderedProdList[""+prodRelaVO.prodB] && prodRelaVO.prodB != prodInfo.productInfoVO.productId)){
	                					var productInfo = orderedProdList[""+prodRelaVO.prodA] || orderedProdList[""+prodRelaVO.prodB];
	                					var productInfoVO =productInfo.productInfoVO;
	                					deleteList[""+productInfoVO.productId] = productInfo;
	                					warnInfo += "产品["+productInfoVO.productName+"]与当前订购产品存在互斥关系,需退订此产品\n";
                						if(productInfo.productInfoVO.ifSelectAble == "1"){
                							warnInfo = "产品["+productInfoVO.productName+"]与当前订购产品存在互斥关系,且["+productInfoVO.productName+"]为必选产品,不能订购当前产品";
	                						return {"flag":-1,"warnInfo":warnInfo,"deleteList":deleteList,"addList":addList};
                						}
	                				}	                				
	                			}
	                			//郝自杰确认，产品间没有关联关系
	                			/*else if(prodRelaVO.relaType == REL_RELATION && prodRelaVO.prodA == prodInfo.productInfoVO.productId){//计算关联关系
                					if(ifOrdered && !!unorderedProdList[""+prodRelaVO.prodB] && 
                								prodRelaVO.prodB != prodInfo.productInfoVO.productId){
                						var productInfo = orderedProdList[""+prodRelaVO.prodB];
                						var productInfoVO = productInfo.productInfoVO;
                						warnInfo += "产品["+productInfoVO.productName+"]与当前订购产品存在关联关系,需订购此产品\n";
                						addList[""+productInfoVO.productId] = productInfo;
                					}	
                					else if(!ifOrdered && !!orderedProdList[""+prodRelaVO.prodB] && 
                								prodRelaVO.prodB != prodInfo.productInfoVO.productId){
                						var productInfo = orderedProdList[""+prodRelaVO.prodB];
                						var productInfoVO = productInfo.productInfoVO;
                						if(productInfo.productInfoVO.ifSelectAble == "1"){
                							warnInfo = "产品["+productInfoVO.productName+"]与当前订购产品存在关联关系,且["+productInfoVO.productName+"]为必选产品,不能退订当前产品";
                							return {"flag":-1,"warnInfo":warnInfo,"deleteList":deleteList,"addList":addList};
                						}
                						warnInfo += "产品["+productInfoVO.productName+"]与当前订购产品存在关联关系,需退订此产品\n";
                						deleteList[""+productInfoVO.productId] = productInfo;
                					}	 
	                			
	                			}*/
	                		};
	                		return {"flag":1,"warnInfo":warnInfo.substring(0,warnInfo.length-1),"deleteList":deleteList,"addList":addList};
						},
						changeColor : function(node,startColor,endColor,durationTime){						
							dojo.animateProperty({
								node: node,
								properties: {backgroundColor:{start:startColor,end:!!endColor?endColor:''}},
								duration: durationTime
							}).play();
						}
	                });
	        
        });