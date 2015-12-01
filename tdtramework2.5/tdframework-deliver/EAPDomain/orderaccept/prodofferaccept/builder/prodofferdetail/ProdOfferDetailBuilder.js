defineModule("orderaccept.prodofferaccept.builder.prodofferdetail.ProdOfferDetailBuilder", [
                "../../util",
                "../../../base/Controller",
                "../../widget/attrcard/ProductAttrCardWidget",
                "../../widget/attrcard/ProductOfferAttrCardWidget",
                "./ProdOfferAssureBuilder",
                "../../../custom/TooltipDialog",  
                "./Favour",   
                "orderaccept.common.js.ConstantsPool",  
				"orderaccept.common.dialog.MessageBox",
                "unieap.layout.TabContainer", "unieap.layout.ContentPane",
                "orderaccept.custom.popup",
                "unieap.form.ComboBox",
                "unieap.ds.DataStore"], function(
                util, Controller,
                ProductAttrCardWidget,
                ProductOfferAttrCardWidget, ProdOfferAssureBuilder, TooltipDialog, Favour, ConstantsPool,messageBox) {
	        /**
			 * 定义销售品详情整体构造器
			 * 
			 * @class
			 * @extends
			 */
	        dojo.declare("orderaccept.prodofferaccept.builder.prodofferdetail.ProdOfferDetailBuilder", [], {
	        	
		        /**
				 * 销售品属性卡片widget
				 */
	        	ProductOfferAttrCardWidgetClass : ProductOfferAttrCardWidget,
	        	
		        /**
				 * 产品属性卡片widget
				 */
	        	ProductAttrCardWidgetClass : ProductAttrCardWidget,
	        	
		        /**
				 * 构造器
				 * 
				 * @param {loader}
				 */
		        constructor : function(provider) {
		        	this.provider = provider
			        this.loader = this.provider.controller;
					//销售品详情widget集合，每个可选包对应集合中一个对象
			        this.prodOfferDetailWidgetList = [];
		        },
		        
		        /**
				 * 清理销售品详情组件
				 * 
				 * @param {}
				 */
		        destroy : function(){		     
		        	
			        // 清除之前订单详情中wideget信息
			        dojo.forEach(this.prodOfferDetailWidgetList,function(prodOfferDetailWidget) {
		                if (prodOfferDetailWidget) {
		                	if(!!prodOfferDetailWidget.prodOfferAttrCard){
		                		prodOfferDetailWidget.prodOfferAttrCard.destroyRecursive();//清除销售品详情信息
		                	}
			                prodOfferDetailWidget.destroyRecursive();
		                }
	                });
		        },
		        
		        /**
				 * 根据可选包表格行号，初始化销售品详情
				 * 
				 * @param {rowIndex} 可选包表格行号
				 */
		        initProdOfferDetail : function(rowIndex) {
			        var builder = this,
			        	loader = this.loader,	
			        	provider = this.provider,		        	
				        rowData = dojo.filter(provider.getSubGridBindingData(),function(bindingData){
				        	return bindingData.rowIndex == rowIndex;
				        })[0],
				        prodOfferInfo = rowData.subProdOfferInfo,	
				        prodOfferInst = rowData.prodOfferInst;				        
			        var prodOfferDetailWidget = new TooltipDialog({
				                id : 'prodOfferDetailDialog-'+provider.uniqueId+"-"+rowIndex
			                });    

			        this.prodOfferDetailWidgetList["" + rowIndex] = prodOfferDetailWidget;
			        
			        /****************可选包上的销售品详情信息初始化 start************/
			        prodOfferDetailWidget.rowData = rowData;
			        prodOfferDetailWidget.rowIndex = rowIndex;
			        prodOfferDetailWidget.builder = this;
			        prodOfferDetailWidget.prodOfferAttrCard = null;//销售品属性卡片        
			        prodOfferDetailWidget.favourBuilder = null;//亲情信息卡片
			        prodOfferDetailWidget.prodOfferAssureBuilder = null;
			        /****************可选包上的销售品详情信息初始化 end*************/
			        
			        prodOfferDetailWidget.startup();	
			        
			        prodOfferDetailWidget.setAttribute("rowIndex",rowIndex);
			        
			        prodOfferDetailWidget.domNode.setAttribute("dojoAttachEvent",
			                "onmouseout:elementmouseout");
			                
			        prodOfferDetailWidget.domNode.setAttribute("dojoAttachTopic",
			                "/prodOfferDetailDialog");			                
			        
			        var commitButton = "<div style='text-align:center;vertical-align:middle'><a href='javascript:void(0);' dojoAttachEvent='onclick:elementclick' \ rowIndex="+rowIndex+"\
			        		dojoAttachTopic='/prodOfferDetailBtn'\ style='text-align:center;vertical-align:middle;'>关闭</a></div>";	
			        dojo.place(commitButton, prodOfferDetailWidget.containerNode, "last");
			        
			        prodOfferDetailWidget.enableEvtMsgPropagation(prodOfferDetailWidget.domNode);	
			        
			        var tabContainer = new unieap.layout.TabContainer({
			        	height : 'auto',
			        	uniqueId : provider.uniqueId
		        	});
			        
			        prodOfferDetailWidget.tabContainer = tabContainer;
			        
			        tabContainer.startup();      
			        
			        this.initProdOfferAttr(prodOfferDetailWidget, rowData, tabContainer);  
			        			        
			        this.initProductAttr(prodOfferDetailWidget, rowData, tabContainer);
			        
			        this.initFamilyInfo(prodOfferDetailWidget, rowData, tabContainer);
			        
			        if(!prodOfferInst || (!prodOfferInst.prodOfferInstAssureList || prodOfferInst.prodOfferInstAssureList.length == 0)){
			        	this.initProdOfferAssure(prodOfferDetailWidget, rowData, tabContainer);
			        }
			        if(!!rowData.offerItemData){
						this.recoveryData(rowData);
					}					
	                //针对属性的展现特殊处理
	                this.specialDealAttr(prodOfferDetailWidget,prodOfferInfo,prodOfferInst);
					
			        prodOfferDetailWidget.handlePageData = dojo.hitch(prodOfferDetailWidget,
				        function() {
				        	var row = dojo.filter(provider.getSubGridBindingData(),function(bindingData){
						        	return bindingData.rowIndex == rowIndex;
						        })[0],
				        		prodOfferDetailWidget = this;
				        	//设置销售品属性信息
				        	if(!!prodOfferDetailWidget.prodOfferAttrCard){
				        		if(!builder.checkNotNull(prodOfferDetailWidget.prodOfferAttrCard.domNode, prodOfferDetailWidget.prodOfferAttrCard.domNode)){
				        			return false;
				        		}
				        		var prodOfferAttr = prodOfferDetailWidget.prodOfferAttrCard.getCardData(null, null, true);
				        		if(prodOfferAttr){
			           	    		dojo.mixin(row,{offerAttrPageInfoList:prodOfferAttr});
				        		}else{
				        			return false;
				        		}
				        		//设置定价参数信息
				        		var  pricingParamCardInfo = prodOfferDetailWidget.prodOfferAttrCard.getPageData();
				        		if(pricingParamCardInfo){
				        			dojo.mixin(row,{offerAttrPageInfoList:pricingParamCardInfo});
				        		}
				        	}
				        	//设置亲情信息
			           	    if(!!prodOfferDetailWidget.favourBuilder){
			           	  		dojo.mixin(row,{relaBusPageInfoList:prodOfferDetailWidget.favourBuilder.getAllFavourData()});
			           	    }
				        	//设置产品信息
			           	    var relaProdPageInfoList = builder.getProductData(rowIndex);
			           	    if(relaProdPageInfoList){
			           	    	dojo.mixin(row,{relaProdPageInfoList:relaProdPageInfoList});
			           	    }else{
			           	    	return false;
			           	    }
			           	    
			           	    //设置担保信息
			           	    if(!!prodOfferDetailWidget.assurePageData){
			           	    	var assureAttrList = [];
			           	    	var assureAttr = prodOfferDetailWidget.assureAttrCard.busCardInstance.getData();
			           	    	if(!assureAttr){
			           	    		return false;
			           	    	}
			           	    	for(var key in assureAttr){
									if (!assureAttr.hasOwnProperty(key)){
										continue;
									}
			           	    		assureAttrList.push({
			           	    			"attrId" : key,
			           	    			"attrValue" : assureAttr[key]
			           	    		});
			           	    	}
			           	    	prodOfferDetailWidget.assurePageData.assureAttrList = assureAttrList;
			           	    }
			           	    dojo.mixin(row,{prodOfferAssurePageInfoList:prodOfferDetailWidget.assurePageData});
		                
		                }
	                );
			        
		            dojo.mixin(rowData,{handlePageData:prodOfferDetailWidget.handlePageData});
			        dojo.place(tabContainer.domNode, prodOfferDetailWidget.containerNode, "first");
			        //特殊处理
					this.specialDealPageDisplay(prodOfferDetailWidget,provider,prodOfferInfo,prodOfferInst,rowData);
		        },
		        /**
				 * 初始化销售品属性（应用卡片初始化）
				 * 
				 * @param {prodOfferDetailWidget} 当前可选包销售品详情对应widget
				 * @param {prodOfferInfo} 销售品信息，规则层面数据
				 * @param {tabContainer} 销售品详情中的tab容器
				 */
		        initProdOfferAttr : function(prodOfferDetailWidget, rowData, tabContainer){
			        var loader = this.loader,
			            prodOfferInfo = rowData.subProdOfferInfo,
			            prodOfferInst = rowData.prodOfferInst,//实例数据 
				        prodOfferAttrCard = new this.ProductOfferAttrCardWidgetClass({
					                prodOfferInfoVO : prodOfferInfo
				                });
			        if (prodOfferAttrCard.needRendering) {
			        	var contentPane = new unieap.layout.ContentPane({
				                title : "销售品属性",
				                width : "400px",
			        			uniqueId : tabContainer.uniqueId,
			        			prodOfferId : prodOfferInfo.prodOfferId,
			        			detailWidgetId : prodOfferDetailWidget.id
			                });
			            tabContainer.addChild(contentPane);
				        prodOfferAttrCard.renderCard(contentPane.domNode, "first");
				        prodOfferAttrCard.busCardInstance.setParent(contentPane);
				        prodOfferDetailWidget.prodOfferAttrCard = prodOfferAttrCard;
				     
			        }
		        	if(prodOfferDetailWidget.prodOfferAttrCard && !!prodOfferInst&& !!prodOfferInst.offerInstAttrList && prodOfferInst.offerInstAttrList.length > 0){
		        		util.SetAttrInst(prodOfferInst.offerInstAttrList,prodOfferDetailWidget.prodOfferAttrCard.busCardInstance);
		        	}
		        	this.initPricingParamAttr(prodOfferAttrCard,prodOfferInst,prodOfferInfo);
		        		
		        },
		        /**
		         * 初始化定价参数实例信息（变更）
		         */
		        initPricingParamAttr : function(prodOfferAttrCard,prodOfferInst,prodOfferInfo){
		        	var builder = this,
		        		cardWidget = prodOfferAttrCard,
		        		pricingParamCard = cardWidget.pricingParamCard;//定价参数
		        	if (prodOfferInst&&pricingParamCard&& (attrInstList = prodOfferInst.offerInstAttrList)) {
		        		BusCard.each(attrInstList, function(pavo) {
		        			 attrVO = dojo.filter(prodOfferInfo.attrList||[],function(attrInfo){
		        			 	return attrInfo.attrCd ==pavo.attrCd;
		        			 })[0];        			 
							 if (attrVO&&attrVO.pricingParamAttr==1){//定价参数
							 	if(attrVO.unique==false){//多值
							 		var dom = dojo.query("[attrcd="+pavo.attrId+"]",pricingParamCard.dom)[0]
							 		if(/^\[.*\]$/i.test(pavo.attrValue)){
		                        		var attrInstValue = dojo.fromJson(pavo.attrValue);
		                        		BusCard.each(attrInstValue,function(value){
		                        			builder.initPricingParamAdd(cardWidget,pricingParamCard,dom,value);
		                        		})
		                        		
		                        	}else{
		                        		builder.initPricingParamAdd(cardWidget,pricingParamCard,dom,pavo.attrValue);
		                        	}
							 	}else{
	                        		pricingParamCard.$(pavo.attrCd).value = cardWidget.validateValue(pavo.attrValue)
		                                ? pavo.attrValue
		                                : '';
	                        	}
	                        	
                        	 }
	                        
                        });
		        	}
		        },
		        /**
		         * 生成定价参数实例信息（多值）
		         */
		        initPricingParamAdd : function(cardWidget, card, dom,value) {
	                var attrCd = dojo.attr(dom, "attrCd");
	                var elem = card.$(attrCd);
	                var option = dojo.filter(elem.options,function(op){return op.value==value})[0];
	                var cityText = option.text;
	                var tp = "<input type='checkbox'  style='margin-left:5px;margin-right:5px;vertical-align:baseline;' CHECKED class='pricing-city' value='${value}'><span name='text-${value}'>${text}</span>";
	                var container = dojo.query(".pricingParam-" + attrCd, card.dom)[0];
	                var columnNode = cardWidget.selectColumn(container);
	                dojo.place(BusCard.Template.create(tp).apply({
		                                value : value,
		                                text : cityText
	                                }), columnNode, "last");

	                
                },
		        /**
		         * 初始化产品属性，prodOfferDetailWidget 
		         * 1、在销售品关联的产品列表中，过滤非接入类集合，过滤不适用的产品集合，如果集合长度大于1，则需要显示产品属性页，供选择
		         * 2、循环产品集合，生成产品名称显示区域，生成属性卡片实例，如果卡片需要渲染则放在页面上
		         * 3、生成产品对象
		         */
		        initProductAttr : function(prodOfferDetailWidget,rowData, tabContainer){
		        	
		        	var builder = this,
		        		productItemList=[],
		        		roleInfo={},
		        		ifShow = false, 
		        		contentPane = new unieap.layout.ContentPane({
				        	title : "产品属性",
		        			uniqueId : tabContainer.uniqueId,
		        			detailWidgetId : prodOfferDetailWidget.id
			            });
			        //过滤非接入类
			        var prodList = this.filterRelaProdList(rowData);
			        
	        		dojo.forEach(prodList,function(offerProdRelaVO){
	        			
        				var productAttrHead = "<div class='title_top'>" +
        					"<input type='checkBox' "+builder.checkProdSelectStatus(offerProdRelaVO,rowData)+" id='sub-prod-"+
        					offerProdRelaVO.productInfoVO.productId+"-"+rowData.rowIndex+"\' "+
            				"dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/subProdSelect' >"+
        					"<span style='vertical-align: middle; margin-right: 10px'>"+"&nbsp产品名称&nbsp;&nbsp"
            				+"<span style='vertical-align: middle; margin-right: 30px'>"+offerProdRelaVO.productInfoVO.productName+"</span>"	                				
            				+"</div>";   
            			dojo.place(productAttrHead, contentPane.domNode, "last");	
            			//生成属性卡片	
                		var productAttrCard = new builder.ProductAttrCardWidgetClass({
				                productInfoVO : offerProdRelaVO.productInfoVO,
				                prodOfferInfoVO : rowData.subProdOfferInfo
			                });
			            if(prodList.length>0){            	
			            	ifShow = true;
			            }
			            //卡片需要渲染，并且有需要显示的属性
				        if (productAttrCard.needRendering&&BusCard.exist(offerProdRelaVO.productInfoVO.attrList,
				        		function(attrInfo) {if (attrInfo.ifDisplay == "1") return true;})) {
			                dojo.style(contentPane.domNode,"width","400px");
					        productAttrCard.renderCard(contentPane.domNode, "last");
					        ifShow = true;
			       		};
				       	if(ifShow){
				       		//生成产品对象
				       		var productItem = {
					       		"rowIndex" : rowData.rowIndex,
							    "productInfo" : offerProdRelaVO,
							    "productAttrCard" : productAttrCard.needRendering?productAttrCard:null
							    //"checkedStatus" : true
					       	};	
					       	productItemList.push(productItem);
					       	//判断是否有角色
					       	if(!!offerProdRelaVO.roleInfoVO){
					       		if(!!roleInfo[offerProdRelaVO.roleInfoVO.roleCD]){
					       			roleInfo[offerProdRelaVO.roleInfoVO.roleCD].push(productItem);
					       		}else{
					       			roleInfo[offerProdRelaVO.roleInfoVO.roleCD] = [];
					       			roleInfo[offerProdRelaVO.roleInfoVO.roleCD].push(productItem);
					       		}
					       	}
				     	 }
				       	       			             		
                		}
              	   	);
              	    if(ifShow) tabContainer.addChild(contentPane);
              	    prodOfferDetailWidget.enableEvtMsgPropagation(contentPane.domNode);
              	    prodOfferDetailWidget.productItemList = productItemList;
              	    prodOfferDetailWidget.roleInfo = roleInfo;
              	    
		        	//循环销售品下面选中的产品对象，对比相同ID的实例数据,为属性赋值
		    		if(!!rowData.prodOfferInst&&rowData.prodOfferInst.prodInstList&&rowData.prodOfferInst.prodInstList.length>0){
		        		dojo.forEach(prodOfferDetailWidget.productItemList,function(productItem){
			    			var offerProdRelaVO = productItem.productInfo,
			    				prodAttrCard = productItem.productAttrCard,
			    				prodInstInfo = dojo.filter(rowData.prodOfferInst.prodInstList,function(productInfo){
			    					return productItem.productInfo.productId == productInfo.productId;
			    				})[0];
			    				productItem.prodInstInfo = prodInstInfo;
		    				if(prodAttrCard && !!prodInstInfo && !!prodInstInfo.prodInstAttrList && prodInstInfo.prodInstAttrList.length > 0){
			    				util.initProdAttrInst(prodInstInfo.prodInstAttrList,prodAttrCard.getCard());	
			    			}			    			
		    			})
		        	}
		        },
		        /**
		         * 过滤关联的产品集合
		         */
		        filterRelaProdList : function(rowData){
		        	//过滤接入类产品
		        	var prodList = dojo.filter(rowData.subProdOfferInfo.offerProdRelaList,function(offerProdRelaVO){
			        	return offerProdRelaVO.productInfoVO.prodFuncType != 
							ConstantsPool.load("ProductFuncTypeConst").ProductFuncTypeConst.ACCESS;;
			        }); 
			        //通过使用号码的接入类产品过滤出适用的产品集合
			        return dojo.filter(prodList,function(prodInfo){
			        	return dojo.some(prodInfo.productInfoVO.prodRelaList,function(relaProdInfo){
			        			return (relaProdInfo.relaType == util.PRODOFFERTYPE.SUBORDINATE_TYPE)
			        				&&(relaProdInfo.prodA==rowData.showData.chooseNumberObj.productId);
			        		});
			        });
			        
		        },
		        /**
		         * 判断产品是否默认是否选中
		         */
		        checkProdSelectStatus : function(offerProdRelaVO,rowData){
		        	var str = "";
		        	if (!!rowData.prodOfferInst&&!!rowData.prodOfferInst.prodInstList
											&& rowData.prodOfferInst.prodInstList.length > 0) {
		        		if(dojo.some(rowData.prodOfferInst.prodInstList,function(prodInfo){
		        			return prodInfo.productId == offerProdRelaVO.productId;
		        		})){
		        			return str = " checked='true' ";
		        		}
		        		
		        	}else{	 
			        	if(offerProdRelaVO.ifDefault==1){
			        		str = " checked = 'true' ";
			        	}					
			        	if(offerProdRelaVO.productInfoVO.ifSelectAble == "1"){
		        			str += " disabled='true'";
			        	}
		        	}
		        	return str;
		        },
		        /**
				 * 初始化销售品担保信息
				 */
		        initProdOfferAssure : function(prodOfferDetailWidget,rowData, tabContainer){
		        	var builder = this,
			            prodOfferInfo = rowData.subProdOfferInfo;
			       	prodOfferDetailWidget.prodOfferAssureBuilder = new ProdOfferAssureBuilder({			        	
		                "detailBuilder" : builder,
			       		"prodOfferDetailWidget" : prodOfferDetailWidget,
		                "prodOfferInfo" : prodOfferInfo,
		                "tabContainer" : tabContainer
			        });
			         prodOfferDetailWidget.prodOfferAssureBuilder.initProdOfferAssure();
     
		        },

		        /**
		         * 获取产品数据
		         */
		        getProductData : function(rowIndex){		        	
		        	var builder = this;
		        	//首先判断角色信息
		        	if(builder.checkRole(rowIndex)) return false;
		        	var	prodOfferDetailWidget = builder.prodOfferDetailWidgetList[rowIndex],
		        		relaProdPageInfoList = [];
		        		Array.prototype.push.apply(relaProdPageInfoList),
		        		flag = true;
		        		
	        		BusCard.each(prodOfferDetailWidget.productItemList,function(productItem){
	        			var productInfo = productItem.productInfo;
	        			var checkStatus = dojo.query("[id='sub-prod-"+productInfo.productInfoVO.productId+"-"+rowIndex+"']",prodOfferDetailWidget.domNode)[0].checked;
		        		if(!!productItem.productAttrCard && !!checkStatus
		        					&& !builder.checkNotNull(productItem.productAttrCard.domNode, productItem.productAttrCard.domNode)){
	        				flag = false;
	        				return flag;
		        		}
	        			if(productItem.productAttrCard&&!productItem.productAttrCard.getCardData(null, null, true)){//如果卡片有未填的必填属性，返回false
	        				flag = false;
	        				return flag;
	        			}
	        			var	productItemData = {
	        				"prodBasicInfo" :{
	        					"productId" : productInfo.productId,
	        					"prodInstId" : !!productItem.prodInstInfo?productItem.prodInstInfo.prodInstId:null,
	        					"prodInstInfo" : !!productItem.prodInstInfo?productItem.prodInstInfo:null,
	        					"checkedStatus" : checkStatus
	        				},
	        				"prodAttrInfo" : productItem.productAttrCard?productItem.productAttrCard.getCardData(null, null, true):null,//属性信息数据
	        				"productInfo" : productInfo
	        			};        			
				       	relaProdPageInfoList.push(productItemData);
	        		});
	        		if(!flag) return flag;
	        		return relaProdPageInfoList;
		        	
		        },
		        /**
		         * 判断角色信息是否满足,roleInfo下面每个角色对应一个List,每个List下面存放的是具有该角色的产品集合
		         * 判断角色的最大和最小值
		         */
		        checkRole : function(rowIndex){
		        	var builder = this,
		        		prodOfferDetailWidget = builder.prodOfferDetailWidgetList[rowIndex];
		        	return BusCard.exist(prodOfferDetailWidget.roleInfo,function(roleItemList){
		        		//找出该角色下选中的产品集合
		        		var roleList = dojo.filter(roleItemList,function(roleItem){
		        			 return dojo.query("[id='sub-prod-"+roleItem.productInfo.productId+"-"+roleItem.rowIndex+"']",
		        			 prodOfferDetailWidget.domNode)[0].checked==true;
		        		});
		        		var minNum = roleItemList[0].productInfo.roleInfoVO.roleNumMin,
		        			maxNum = roleItemList[0].productInfo.roleInfoVO.roleNumMax;
		        			//roleName = roleItemList[0].productInfo.roleInfoVO.roleName;
		        		if(roleList.length<minNum||roleList.length>maxNum){
		        			var nameStr = [];
		        			dojo.forEach(roleItemList,function(item){
		        				nameStr.push(item.productInfo.productInfoVO.productName);
		        			});
					        /**MessageBox.alert({
						        title : "\u63d0\u793a\u4fe1\u606f",
						        message : nameStr.toString()+"\n\u6700\u5c11\u9700\u8981\u9009\u62e9"+minNum+"\u4e2a\uff1b\u6700\u591a\u53ef\u4ee5\u9009\u62e9"+maxNum+"\u4e2a！"
					        });*/
					         messageBox.alert({
								busiCode : "08410114",
								infoList : [ nameStr.toString(),minNum,maxNum ]
					 	    });
		        			//alert(nameStr.toString()+"\n最少需要选择"+minNum+"个；最多可以选择"+maxNum+"个！");
		        			return true;
		        		}
		        		return false;
		        	});	
		        },
		        /**
				 * 初始化亲情号码信息
				 * 
				 * @param {prodOfferDetailWidget} 当前可选包销售品详情对应widget
				 * @param {prodOfferInfo} 销售品信息，规则层面数据
				 * @param {tabContainer} 销售品详情中的tab容器
				 */
		        initFamilyInfo : function(prodOfferDetailWidget, rowData, tabContainer){
			        var loader = this.loader,
			        	FavourKindConst = ConstantsPool.load("FavourKindConst").FavourKindConst,
			            prodOfferInfo = rowData.subProdOfferInfo,
			            prodOfferInst = rowData.prodOfferInst,
			            showData = !!rowData?rowData.showData:null,
			            chooseNumberObj = !!showData?showData.chooseNumberObj:null,
						selfFavourRelaList = !!prodOfferInst?prodOfferInst.selfFavourRelaList:null,//自惠亲情
						favourRelaList = !!prodOfferInst?prodOfferInst.favourRelaList:null,//互惠亲情
						ocsSubseridInfoList = !!prodOfferInst?prodOfferInst.ocsSubseridInfoList:null,//ocs亲情
			       		webPath = dojo.byId("webPath").value;
					//判断该销售品是否含有销售品属性信息
			       	var favourType = this.checkIfShowFamily(prodOfferInfo);
					if(favourType === FavourKindConst.COMMON_FAVOUR|| favourType === FavourKindConst.SELF_FAVOUR ||　favourType === FavourKindConst.OCS_FAVOUR){//0互惠，1自惠,11OCS亲情
						familyHtml = "<div class='buscard-root' style='display:block;'>\
										 <div class='buscard-legend'>\
											<span class='buscard-legend-img'></span>\
											<span class='buscard-legend-text' id='buscard-name'>亲情信息</span>\
										 </div>";
						if(favourType == FavourKindConst.SELF_FAVOUR || favourType == FavourKindConst.OCS_FAVOUR || favourType === FavourKindConst.COMMON_FAVOUR){//自惠，添加亲情号码	
							var ocsGrpHtml = "";
							if(favourType == FavourKindConst.OCS_FAVOUR){
				       	 		var subGroupTypeList = util.ServiceFactory.getService("url:prodOfferSaleAjaxAction.do?method=getOcsSubGroupType");
				       	 		var subGroupTypeData = dojo.map(subGroupTypeList,function(subGroupType){
									       	 			return {
								       	 					"CODEVALUE" : subGroupType.subgroupType,
								       	 					"CODENAME"  : subGroupType.subgroupName,
								       	 					"maxNumber" : subGroupType.maxNumber
								       	 				}
									       	 		});
				       	 		var ocsGrpDateStoreId = "subGroupType";
								var ocsGrpDataStore = new unieap.ds.DataStore(ocsGrpDateStoreId,subGroupTypeData);
								dataCenter.addDataStore(ocsGrpDataStore);
								ocsGrpHtml = "<div class='buscard-row'> \
												<div class='buscard-item-label' style='width:40%;'>\
													<span class='buscard-label'>OCS亲情群组:</span>\
												</div>\
												<div class='buscard-item-el' style='width:50%;'>\
													<div dojoType=\"unieap.form.ComboBox\" class=\"buscard-item-label\"\
  														id=\"subGroupType\"  textValidate=\"true\" \
														dataProvider=\"{'store':'"+ocsGrpDateStoreId+"'}\"\
														rowIndex='"+prodOfferDetailWidget.rowIndex+"' \
														dataFilter=\"{searchAttr:['CODENAME'],spellAttr:'py'}\" width=\"60%\"></div>\
												</div>\
											 </div>";													
							}
							familyHtml += "<div class='buscard-content' style='border-bottom:1px silver dashed'>\
													"+ocsGrpHtml+" \
													<div class='buscard-row'> \
														<div class='buscard-item-label' style='width:40%;'>\
															<span class='buscard-label'>亲情号码:</span>\
														</div>\
														<div class='buscard-item-el' style='width:50%;'>\
															<input type='text' name='familyNumber' id='familyNumber'\
																	rowIndex='"+prodOfferDetailWidget.rowIndex+"' value='' style='width:50%;'/>\
															<img id='addNumber' name='addNumber'\
						                						dojoAttachEvent = 'onclick:elementclick'\
						                						dojoAttachTopic = '/familyNumber'\
																src='"+webPath+"/common/images/icon/plus_icon.png'\
																style='cursor: pointer; width: 15px; height: 15px;' />\
														</div>\
													</div>\
											</div>";
						}
						/*else if(favourType == FavourKindConst.COMMON_FAVOUR){//互惠，添加亲情单元	
					        var param = "serviceKind=" + (!!chooseNumberObj?chooseNumberObj.serviceKind:"") + 
					        			"&cityCode=" + loader.requestParam.customerData.cityCode + 
					        			"&method=getRelativeUnitInfo";
					        var relaUnitMap = util.ServiceFactory.getService("url:prodOfferSaleAjaxAction.do?" + param);
							var dataStoreId = "favour-"+(!!chooseNumberObj?chooseNumberObj.serviceKind:"")+
												"-"+loader.requestParam.customerData.cityCode;	
							var dataStore = new unieap.ds.DataStore(relaUnitMap.datastore.storeName,relaUnitMap.datastore.rowDatas);
							dataCenter.addDataStore(dataStore);
							familyHtml += "<div class='buscard-content'>\
												<div class='buscard-item-label' style='width:30%;'>\
													<span class='buscard-label'>亲情单元:</span>\
												</div>\
												<div class='buscard-item-el' style='width:60%;'>\
                                                    <div dojoType=\"unieap.form.ComboBox\" class=\"buscard-item-label\"\
														id=\"favourUnit\"  textValidate=\"true\"\
														dataProvider=\"{'store':'"+dataStoreId+"'}\"\
														rowIndex='"+prodOfferDetailWidget.rowIndex+"' \
														dataFilter=\"{searchAttr:['CODENAME'],spellAttr:'py'}\" width=\"75%\"></div>\
													<img id='addNumber' name='addNumber'\
				                						dojoAttachEvent = 'onclick:elementclick'\
				                						dojoAttachTopic = '/familyUnit'\
														src='"+webPath+"/custcontact/common/images/elbow-end-plus2.gif'\
														style='cursor: pointer; width: 15px; height: 15px;'/>\
												</div>\
											</div>";						
						}*/
						familyHtml += "<div class='buscard-content' id='prodFavourDiv'>\
										</div>\
									</div>\ ";
						var titleInfo = "亲情信息";						
						if(favourType == FavourKindConst.SELF_FAVOUR){
							titleInfo = "亲情自惠";
						}else if(favourType == FavourKindConst.OCS_FAVOUR){
							titleInfo = "OCS亲情";
						}else if(favourType == FavourKindConst.COMMON_FAVOUR){						
							titleInfo = "亲情互惠";
						}
						var contentPane = new unieap.layout.ContentPane({
				            title : titleInfo,
			                width : "500px",
		        			uniqueId : tabContainer.uniqueId,
		        			detailWidgetId : prodOfferDetailWidget.id
			            });									
						dojo.place(familyHtml,contentPane.domNode,"first")									
			      		dojo.parser.parse(contentPane.domNode);		
			       		prodOfferDetailWidget.enableEvtMsgPropagation(contentPane.domNode);	
			       		tabContainer.addChild(contentPane);
			       		//add by shanpa
			       		prodOfferDetailWidget.favourContentPane = contentPane;
			       		var hasFavourItemList = [];	
			       		if(favourType == FavourKindConst.SELF_FAVOUR){
			       			hasFavourItemList = selfFavourRelaList;
			       		}else if(favourType == FavourKindConst.COMMON_FAVOUR){
			       			hasFavourItemList = favourRelaList;
			       		}else if(favourType == FavourKindConst.OCS_FAVOUR){
			       			hasFavourItemList = ocsSubseridInfoList;
			       		}
			        	// 基础包区域表格中的接入类产品所属的dom节点集合
			        	var trs = dojo.query(".main-product-basic", loader.mainProdOfferWidget.domNode);
			        	var userId = 0;
			        	if(!!chooseNumberObj && !!chooseNumberObj.userId){
			        		userId = chooseNumberObj.userId;
			        	}
						prodOfferDetailWidget.favourBuilder = new Favour.FavourBuilder({
							"prodOfferDetailWidget" : prodOfferDetailWidget,
							"rowData" : rowData,
							"prodOfferInfoVO" : prodOfferInfo,
							"favourRelaInstList" : "",
							"selfFavorLimitList" : prodOfferInfo.selfFavorLimitList,
							"container" : dojo.query("[id=prodFavourDiv]",contentPane.domNode)[0],
							"favourType" : favourType,
							"hasFavourItemList" : hasFavourItemList,//亲情实例信息
							"userId" : userId
						});
						prodOfferDetailWidget.favourBuilder.init();
					}
	        		
		        },
		        /**
				 * 检测是否显示亲情号码信息
				 * 
				 * @param {prodOfferInfo} 销售品信息（规格层面）
				 */
		        checkIfShowFamily : function(prodOfferInfo){	
		        	var builder = this;
		        	var favourType = "";
			        var FavourKindConst = ConstantsPool.load("FavourKindConst").FavourKindConst;
					//usageTypeList--销售品适用
					if(prodOfferInfo.usageTypeList && prodOfferInfo.usageTypeList.length > 0){//亲情属性的判断
						var usageTypeList = prodOfferInfo.usageTypeList;
						dojo.forEach(usageTypeList, function(usageType){
							if(usageType == "1"){
								favourType = FavourKindConst.SELF_FAVOUR;
								return true;
							}
							if(usageType == "2"){
								favourType = FavourKindConst.COMMON_FAVOUR;
								return true;
							}
							if(usageType == "126"){
								favourType = FavourKindConst.OCS_FAVOUR;
								return true;
							}
						});
					}
					return favourType; 
		        },
		        /**
				 * 点击添加亲情号码图标检测
				 * 
				 * @param {familyNum} 亲情号码输入框dom控件
				 */
		        onFamilyNumberClick : function(familyNum){
			        if(!!familyNum){
						//获取亲情号码
					    var familyNumber = familyNum.value;
					    var prodOfferDetailWidget = this.prodOfferDetailWidgetList[""+familyNum.getAttribute("rowIndex")];
					    //亲情号码不为空的时候才进行增加
					    if(familyNumber =="" || familyNumber == null){
					        /**MessageBox.alert({
						        title : "\u63d0\u793a\u4fe1\u606f",
						        message : "\u4eb2\u60c5\u53f7\u7801\u4e3a\u7a7a\uff0c\u8bf7\u786e\u8ba4\uff01"
					        },familyNum);**/
					        //alert("亲情号码为空，请确认！");
					        messageBox.alert({
								busiCode : "08410115"
					 	 	},familyNum);
					        return false;
					    }
					    
					    if(prodOfferDetailWidget.favourBuilder != null){
					    	var subGroupTypeObj = null;
					    	var subGroupType = dojo.query("[id=subGroupType]",prodOfferDetailWidget.favourBuilder.container.parentNode)[0];
			        		var FavourKindConst = ConstantsPool.load("FavourKindConst").FavourKindConst;
					    	if(!!subGroupType){
					    		var subGroupTypeBox = dijit.getEnclosingWidget(subGroupType);
					    		if(!subGroupTypeBox.getValue() || subGroupTypeBox.getValue() == ""){	
							        messageBox.alert({
										busiCode : "08410203"
							 	 	},subGroupType);
							 	 	return false;
					    		}	
					    		subGroupTypeObj = {};
				    			subGroupTypeObj.value = subGroupTypeBox.getValue();
				    			subGroupTypeObj.name = subGroupTypeBox.getText();
					    	}
					    	//亲情号码的检测
					        if(!prodOfferDetailWidget.favourBuilder.doCheck(familyNumber,subGroupTypeObj)){
					           return false;
					        }
					        //构建亲情信息的html代码
					    	prodOfferDetailWidget.favourBuilder.createFavourNumberHtml(prodOfferDetailWidget.favourBuilder.getFavourReturnItem());
					    	
							if(!!prodOfferDetailWidget.rowData && !!prodOfferDetailWidget.rowData.prodOfferInst 
										&& prodOfferDetailWidget.favourBuilder.favourType == FavourKindConst.OCS_FAVOUR){
								var favourChkList = dojo.query("[type=checkbox]",prodOfferDetailWidget.favourBuilder.container);
								if(!!favourChkList){
									dojo.forEach(favourChkList,function(favourChk){
										favourChk.disabled = true;
									});
								}
							}
					    }
			        }
		        },
		        /**
				 * 点击添加亲情单元图标检测
				 * 
				 * @param {familyNum} 亲情号码输入框dom控件
				 */
		        onFavourUnitClick : function(favourUnit){
		        	
            		var favourUnit = util.DomHelper.getParentWidget(favourUnit,
	                					  "unieap.form.ComboBox");	
			        if(!!favourUnit){
						//获取亲情号码
					    var favourUnitVal = favourUnit.getValue();
					    var prodOfferDetailWidget = util.DomHelper.getParentWidget(favourUnit.domNode,
	                					  "orderaccept.custom.TooltipDialog");	
					    //亲情号码不为空的时候才进行增加
					    if(favourUnitVal =="" || favourUnitVal == null){
					       /** MessageBox.alert({
						        title : "\u63d0\u793a\u4fe1\u606f",
						        message : "\u4eb2\u60c5\u5355\u5143\u4e3a\u7a7a\uff0c\u8bf7\u786e\u8ba4\uff01"
					        },favourUnit.domNode);*/
					        //alert("亲情单元为空，请确认！");
					         messageBox.alert({
								busiCode : "08410116"
					 	 	 },favourUnit.domNode);
					        return false;
					    }
					    if(prodOfferDetailWidget.favourBuilder != null){
					        if(!prodOfferDetailWidget.favourBuilder.doCheck(favourUnitVal)){
					           return false;
					        }
					        //构建亲情信息的html代码
					    	prodOfferDetailWidget.favourBuilder.createFavourNumberHtml(prodOfferDetailWidget.favourBuilder.getFavourReturnItem());
					    }
			        }
		        },
		        /**
				 * 检测页面信息不能为空项
				 * 
				 * @param {dom} 页面区域，用于递归
				 * @param {cardNode} 页面区域，用于全局查询
				 */
				checkNotNull : function(dom, cardNode) {
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
					                		var tipTabWidget = toolTip.tabContainer;
					                		var tipPane = util.DomHelper.getParentWidget(cardNode,
							                					  "unieap.layout.ContentPane");	
							              	var detailFlag = null;
							              	if(toolTip.id.indexOf("mainProdOfferDetailDialog") >= 0 
							              				|| toolTip.id.indexOf("multipleProdOfferDetailDialog") >= 0){	
			              						detailFlag = dojo.byId("productList-key-"+toolTip.id.split("-")[1]);							              		
							              	}else{
							              		detailFlag = dojo.byId("prodOfferLink-key-"+toolTip.rowIndex);
							              	}
							              	if(toolTip.id.indexOf("multipleProdOfferDetailDialog") >= 0){
						                		var pane = util.DomHelper.getParentWidget(detailFlag,
								                					  "unieap.layout.ContentPane");	
						                		var tabWidget = pane.parentContainer;	
								              	tabWidget.selectChild(pane);
							              	}
							              	detailFlag.focus();
							                orderaccept.custom.popup.open({
						                        widget : {
							                        popup : toolTip,
							                        around : detailFlag
						                        }
						                    });
					                		tipTabWidget.selectChild(tipPane)	  
										    elem.focus();
										    
									       /** MessageBox.alert({
										        title : "\u63d0\u793a\u4fe1\u606f",
										        message : "[" + text + "]\u4e0d\u80fd\u4e3a\u7a7a"
									        });*/
									         messageBox.alert({
												busiCode : "08410117",
												infoList : [ text ]
						 	 	 			},elem);
											//alert("[" + text + "]\u4e0d\u80fd\u4e3a\u7a7a");
										 
										}catch(e){
									       /** MessageBox.alert({
										        title : "\u63d0\u793a\u4fe1\u606f",
										        message : e.message
									        });**/
									         messageBox.alert({
												busiCode : "08410118",
												infoList : [ e.message ]
					 	 	 				});
										}
										return false;
			
									}
									else {
										var flag = arguments.callee.call(Me, elem, cardNode);
										if (flag === false) return false;
									}
			
								}
								else {
									var flag2 = arguments.callee.call(Me, elem, cardNode);
									if (flag2 === false) return false;
								}
			
							}
			
						}
			
					}
					catch (e) {
				        /**MessageBox.alert({
					        title : "\u63d0\u793a\u4fe1\u606f",
					        message : e.message
				        });**/
				        messageBox.alert({
							busiCode : "08410118",
							infoList : [ e.message ]
 	 	 				});
						return false;
					}
					return true;
				},
				
				/**
				 * 针对页面的特殊处理
				 */
				specialDealPageDisplay : function(prodOfferDetailWidget,provider,prodOfferInfo,prodOfferInst,rowData){
					var subReserveFlag = false;
					//判断可选包是否是预约的标识
					if(!!prodOfferInst){
						//取实例时间
						var effDate = prodOfferInst.effDate;
						var expDate = prodOfferInst.expDate;
						var invalidDate = "2037-01-01 00:00:00";
						var sysDate = $ac$.requestParam.today;
						//判断是预约生效的还是预约取消的(判断规则:有效，生效时间大于当前时间或者失效时间小于2037年)
						if(util.DateHelper.compareDateValue(util.DateHelper.format(effDate),sysDate)||(util.DateHelper.compareDateValue(invalidDate,util.DateHelper.format(expDate))&&!!prodOfferInst.oldExpDate)){
							subReserveFlag = true;
						}
					}
					//subReserveFlag = 
					//判断是否有预约生效的主销售品变更
					var reserveFlag = false;
					if(provider.contentPane){
						if(!!$ac$.get("reserveMain"+provider.uniqueId)){
							reserveFlag = $ac$.get("reserveMain"+provider.uniqueId);
						}else{
							reserveFlag = util.ProdOfferHelper.doCheckMainProdOfferReserve(provider);
							$ac$.set("reserveMain"+provider.uniqueId,reserveFlag);
						}
					}else{
						if(!!$ac$.get("reserveMain")){
							reserveFlag = $ac$.get("reserveMain");
						}else{
							reserveFlag = util.ProdOfferHelper.doCheckMainProdOfferReserve(provider);
							$ac$.set("reserveMain",reserveFlag);
						}
					}
					//1.对于有预约生效的主销售品变更，普通附属销售品不允许进行变更
					//2.对于预约生效的可选包.不允许变更销售品详情中的数据
					if((!!reserveFlag&&(prodOfferInfo.prodOfferType == 3&&!!prodOfferInst))||(subReserveFlag&&!!prodOfferInst)){
						var rowIndex = rowData.rowIndex;
						//处理销售品属性
						if(!!prodOfferDetailWidget.prodOfferAttrCard){
							var offerAttrBusCardInstance = prodOfferDetailWidget.prodOfferAttrCard.busCardInstance;
							
							var attrList = prodOfferInfo.attrList||[];
							BusCard.each(attrList, function(attrVO) {
								if(!!offerAttrBusCardInstance.$(attrVO.attrCd)){
									offerAttrBusCardInstance.$(attrVO.attrCd).disabled = true;
								}
								
							});
							//设置定价参数
							if(!!prodOfferDetailWidget.prodOfferAttrCard.pricingParamCard){
								var pricingParamCardDom = prodOfferDetailWidget.prodOfferAttrCard.pricingParamCard;
								var pricingParamDom = dojo.query("input",pricingParamCardDom.dom)[0];
								dojo.forEach(pricingParamDom||[],function(inputElem){
									inputElem.disabled = true;
								});
							}
						}
						//处理产品及产品属性
						BusCard.each(prodOfferDetailWidget.productItemList||[],function(productItem){
							var productInfo = productItem.productInfo;
							//置灰所有的复选框，不允许进行操作
							dojo.query("[id='sub-prod-"+productInfo.productInfoVO.productId+"-"+rowIndex+"']",prodOfferDetailWidget.domNode)[0].disabled = true;
			        		if(!!productItem.productAttrCard){
			        			var prodAttrCard = productItem.productAttrCard.busCardInstance;
			        			var attrList = productInfo.productInfoVO.attrList || [];
			        			BusCard.each(attrList, function(attrVO) {
			        				if(!!prodAttrCard.$(attrVO.attrCd)){
										prodAttrCard.$(attrVO.attrCd).disabled = true;
			        				}
								});
			        		}
						});
						//处理亲情-获取亲情tab页中的所有input框，全置成disabled
						if(!!prodOfferDetailWidget.favourContentPane){
							var favourInputElems = dojo.query("input",prodOfferDetailWidget.favourContentPane.domNode);
							dojo.forEach(favourInputElems||[],function(inputElem){
								inputElem.disabled = true;
							});
						}
						//担保信息(因为担保信息不允许做变更，所以此处不做处理)
	        			
					}
					
					
				},
				
				recoveryData : function(rowData){					
			        var builder = this,
			        	loader = this.loader,	
			        	provider = this.provider,		        	
				        rowIndex = rowData.rowIndex,
				        prodOfferInfo = rowData.subProdOfferInfo,	
				        prodOfferInst = rowData.prodOfferInst,	
				        offerItemData = rowData.offerItemData,
				        prodInfoList = rowData.prodItemList,
				        offerInstAttrList = offerItemData.offerInstAttrList,
				        relaBusInfoList = offerItemData.relaBusInfoList,
			        	prodOfferDetailWidget = builder.prodOfferDetailWidgetList["" + rowIndex];
		        	
			    
			        	//设置销售品属性信息
			        	if(prodOfferDetailWidget.prodOfferAttrCard && offerItemData && offerItemData.length > 0){
			        		util.SetAttrInst(offerInstAttrList,prodOfferDetailWidget.prodOfferAttrCard.busCardInstance);
			        	}
			        	//设置亲情信息
		           	    if(!!prodOfferDetailWidget.favourBuilder){
							for(var i = 0;i < relaBusInfoList.length;i++){
								//暂时不考虑变更将所有已经保存的全部刷到页面上
								prodOfferDetailWidget.favourBuilder.favourItemList.push(relaBusInfoList[i]);
								prodOfferDetailWidget.favourBuilder.createFavourNumberHtmlByData(relaBusInfoList[i]);
							}
		           	    }
			        	//设置产品信息
			        	//循环销售品下面选中的产品对象，对比相同ID的实例数据,为属性赋值
			    		if(!!offerItemData&&prodInfoList&&prodInfoList.length>0){
			        		dojo.forEach(prodOfferDetailWidget.productItemList,function(productItem){
				    			var offerProdRelaVO = productItem.productInfo,
				    				prodAttrCard = productItem.productAttrCard,
				    				prodInstInfo = dojo.filter(prodInfoList,function(productInfo){
				    					return productItem.productInfo.productId == productInfo.productId;
				    				})[0];
				    				productItem.prodInstInfo = prodInstInfo;
			    				if(prodAttrCard && !!prodInstInfo.prodInstAttrList && prodInstInfo.prodInstAttrList.length > 0){
				    				dojo.forEach(prodInstInfo.prodInstAttrList,function(prodInstAttr){
				    					prodInstAttr.attrCd = !!prodInstAttr.attrCd?prodInstAttr.attrCd:prodInstAttr.attrId;
				    				})
				    				util.SetAttrInst(prodInstInfo.prodInstAttrList,prodAttrCard.getCard());	
				    			}			    			
			    			})
			        	} 			           	    
		           	    //设置担保信息
				},
                /**
                 * 针对费用属性的展现的特殊处理
                 */
                specialDealAttr : function(prodOfferDetailWidget,prodOfferInfo,prodOfferInst){
                	if(!!prodOfferInst && !!prodOfferInst.offerInstAttrList){
                		if(!!prodOfferDetailWidget.prodOfferAttrCard){
		                	var attrBusCard = prodOfferDetailWidget.prodOfferAttrCard.busCardInstance;
		                	dojo.forEach(prodOfferInfo.attrList,function(attrVO){
								if(attrVO.valueUnit == util.AttrUnitConst.unitConst 
										|| attrVO.valueUnit == util.AttrUnitConst.minuteConst){											
				                	if(!!attrBusCard.$(""+attrVO.attrCd)){
			                			var attrInstList = prodOfferInst.offerInstAttrList;
			                			var targetAttrInst = BusCard.jsonPath(attrInstList, "$[?(@.attrCd=="
					                        + attrVO.attrCd + ")]");
					                    if(!!targetAttrInst){
					                    	if(targetAttrInst[0].attrValue!=null&&targetAttrInst[0].attrValue!=""){
					                    		attrBusCard.$(""+attrVO.attrCd).value = (targetAttrInst[0].attrValue)/100;
					                    	}
					                    }			                		
				                	}
		                		}
		                	});
                		}
                	}
                	if(!!prodOfferInst){
	            		if(!!prodOfferDetailWidget.productItemList && prodOfferDetailWidget.productItemList.length > 0){
	            			dojo.forEach(prodOfferDetailWidget.productItemList,function(productItem){                				
					       		var offerProdRelaVO = productItem.productInfo;
								var attrBusCard = productItem.productAttrCard.busCardInstance;
			                	dojo.forEach(offerProdRelaVO.productInfoVO.attrList,function(attrVO){
									if(attrVO.valueUnit == util.AttrUnitConst.unitConst 
											|| attrVO.valueUnit == util.AttrUnitConst.minuteConst){											
					                	if(!!attrBusCard.$(""+attrVO.attrCd)){
				                			var attrInstList = productItem.prodInstInfo.prodInstAttrList;
				                			var targetAttrInst = BusCard.jsonPath(attrInstList, "$[?(@.attrCd=="
						                        + attrVO.attrCd + ")]");
						                    if(!!targetAttrInst){
						                    	if(targetAttrInst[0].attrValue!=null&&targetAttrInst[0].attrValue!=""){
						                    		attrBusCard.$(""+attrVO.attrCd).value = (targetAttrInst[0].attrValue)/100;
						                    	}
						                    }			                		
					                	}
			                		}
			                	});
	            			});
	            		} 
                	}
                }
		        	
        });
	});