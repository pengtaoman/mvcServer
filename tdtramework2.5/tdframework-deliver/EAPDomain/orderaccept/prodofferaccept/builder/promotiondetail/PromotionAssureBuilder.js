defineModule("orderaccept.prodofferaccept.builder.promotiondetail.PromotionAssureBuilder",
		["../../util","../../widget/assurecard/AssureCardWidget","../prodofferdetail/ProdOfferAssureBuilder",
			"orderaccept.common.js.ConstantsPool","../../../custom/Grid","../../../custom/BusCardGrid","unieap.layout.ContentPane"],
			function(util,assureCardWidget,ProdOfferAssureBuilder,ConstantsPool,Grid,BusCardGrid){
	
	/**
	 * 定义促销政策担保信息类
	 */
	dojo.declare("orderaccept.prodofferaccept.builder.promotiondetail.PromotionAssureBuilder",[ProdOfferAssureBuilder],{
		constructor : function(args){
			this.promotionInfo = args.promotionInfo;
			this.inherited(arguments)
		},
		
		PromotionTypeConst : ConstantsPool.load("PromotionTypeConst").PromotionTypeConst,
		
		/**
		 * 初始化担保信息
		 */
		initProdOfferAssure : function(){
			var builder = this;
			this.inherited(arguments);
		},
		
		displaySomeAttributes : function(){
			var assureAttrCard = this.prodOfferDetailWidget.assureAttrCard;
			assureAttrCard.busCardInstance.$("50034").style.display = "";
			assureAttrCard.busCardInstance.$("label_50034").style.display = "";
		},
		
		showAssureQueryView : function(rowIndex,subRowIndex,assureMethodCD){
			var promotionInfo = this.promotionInfo;
			var builder = this;
			if(promotionInfo.promotionType == builder.PromotionTypeConst.DEVICE_RENT || promotionInfo.promotionType == builder.PromotionTypeConst.TELCHARGE_COUPON){//租机促销-->辽宁电信增加话费补贴
				detailBuild = builder.detailBuild,
	    		detailWidget = detailBuild.prodOfferDetailWidgetList[subRowIndex];	
	        	//如果查询卡片已经存在，则销毁
	        	if(detailWidget.assureCardWidget){
	        		detailWidget.assureCardWidget.destroy();
	        	}
	        	if(assureMethodCD == builder.AssureMethodConst.ASSURE_CASH || assureMethodCD == builder.AssureMethodConst.ASSURE_PROMOTION){
	        		//刷新表格数据源				
		        	detailWidget.assureInfoGrid.setDataSource(detailWidget.finalDataSource);
					dojo.query("[id=assureRadio"+rowIndex+"]",detailWidget.domNode)[0].checked = true;
		        	builder.onPromotionAssureCommitClick(rowIndex,subRowIndex);
	        	}else{
	        		var	assureCardWidget = new builder.assureCardWidgetClass({
		        		productId : "-20000",
						serviceOfferId : "-223"
		        	});
		        	assureCardWidget.addCardCallback(function(){
	                    //为担保对象类型初始化事件
		        		var busCardInst = this.busCardInstance;
			        	if(!!busCardInst.$("assureQueryMethod")){
			        		busCardInst.$("assureQueryMethod").disabled = true;
				        	busCardInst.$("assureQueryMethod").value = assureMethodCD;
	                            busCardInst.displaySubGroupByIndex(0,0);
				        	if(assureMethodCD == builder.AssureMethodConst.ASSURE_CUST
			        				|| busCardInst.$("assureQueryMethod").value== builder.AssureMethodConst.ASSURE_ACCOUNT){//客户
			        			busCardInst.displaySubGroupByIndex(1, 0);
	                            busCardInst.hiddenSubGroupByIndex(2,0);
			        		}else if(assureMethodCD == builder.AssureMethodConst.ASSURE_PRODUCT){//产品实例
			        			busCardInst.hiddenSubGroupByIndex(1, 0);
	                            busCardInst.displaySubGroupByIndex(2,0);
			        		}
				        };
		        	});
		        	assureCardWidget.renderCard(dojo.byId("assureQuery"+subRowIndex),"last");
		        	//查询按钮如果已经生成，则删除
		        	builder.clearView(dojo.query(".assure-buttons"+subRowIndex)[0],true);
		        	//查询客户结果列表如果已经生成，则删除
		        	builder.clearView(dojo.query(".assureResult"+subRowIndex)[0]);
		        	//查询帐户结果列表如果已经生成，则删除
		        	builder.clearView(dojo.query(".assureAcct"+subRowIndex)[0]);
		        	//查询产品结果列表如果已经生成，则删除
		        	builder.clearView(dojo.query(".assureProd"+subRowIndex)[0]);
		        	//操作按钮已经存在，则不生成
		        	if(assureMethodCD != builder.AssureMethodConst.ASSURE_CASH){
		        		var buttons = "<div style='text-align:left;vertical-align:middle' class='assure-buttons"+subRowIndex+"\'>" +
		        			"<a href='javascript:void(0);' id = 'query"+subRowIndex+"\' dojoAttachEvent='onclick:elementclick' \ subRowIndex="+subRowIndex+" rowIndex="+rowIndex+
			        		" dojoAttachTopic='/assureQuery'\ style='text-align:center;vertical-align:middle;color:red;'>&nbsp查询&nbsp</a>" +
	//		        		"<a href='#' id = 'commit"+subRowIndex+"\' dojoAttachEvent='onclick:elementclick' \ subRowIndex="+subRowIndex+" rowIndex="+rowIndex+ 
	//		        		" dojoAttachTopic='/assureCommit'\ style='text-align:center;vertical-align:middle;color:red;'>&nbsp确定&nbsp</a>" +
	//		        		"<a href='#' id = 'cancel"+subRowIndex+"\' dojoAttachEvent='onclick:elementclick' \ subRowIndex="+subRowIndex+" rowIndex="+rowIndex+
	//		        		" dojoAttachTopic='/assureCancel'\ style='text-align:center;vertical-align:middle;color:red;'>&nbsp取消</a>" +
			        		"</div>";	 
			        	dojo.place(buttons,dojo.byId("assureQuery"+subRowIndex),"last");
		        	}
		        	detailWidget.enableEvtMsgPropagation(dojo.byId("assureQuery"+subRowIndex));
		        		
		        	detailWidget.assureCardWidget = assureCardWidget;
	        	}
			}else{//其他促销方式
				this.inherited(arguments);
			}
		},
		
		onPromotionAssureCommitClick : function(rowIndex,subRowIndex){
			var builder = this,
        		detailBuild = this.detailBuild,
        		detailWidget = detailBuild.prodOfferDetailWidgetList[subRowIndex],
				radios = dojo.query(".assureRadio"+subRowIndex,detailWidget.domNode),
				radio = dojo.filter(radios,function(radio){
							return radio.checked == true;
						})[0],	        	
				rindex = radio.getAttribute("rowindex");
			
			//刷新表格数据源				
		    detailWidget.assureInfoGrid.setDataSource(detailWidget.finalDataSource);	
		    var assureCardWidget = detailWidget.assureCardWidget,//担保卡片
        		assureAttrCardWidget = detailWidget.assureAttrCard,
        		assureCustData = detailWidget.assureCustInfo,//担保客户信息			        	
	        	assureAccountInfo = detailWidget.assureAccountInfo,//担保帐户信息	    	
	        	assureProductInfo = detailWidget.assureProductInfo,//担保产品信息	
	        	assureInfoGrid = detailWidget.assureInfoGrid,//担保信息表格				        	
				assurePageData  = assureInfoGrid.ds.getRawData()[rindex],//担保页面信息
	        	assureInfoResult = dojo.query(".assureInfoResult"+rindex,detailWidget.domNode)[0],//担保信息标识别span 
	        	assureObjResult = dojo.query(".assureObjResult"+rindex,detailWidget.domNode)[0],//担保信息对象span  
				securityObjId = "";	
			if(assurePageData.assureMethodCD ==  builder.AssureMethodConst.ASSURE_CASH){//现金担保
				assureCustData = null;
				assureAccountInfo = null;
				assureProductInfo = null;
				assureInfoResult.innerText = "现金担保";
				assureObjResult.innerText = "现金";
			}else if(assurePageData.assureMethodCD ==  builder.AssureMethodConst.ASSURE_CUST){//客户担保
				assureAccountInfo = null;
				assureProductInfo = null;
				//securityObjId = assureCustData.custId;
				assureInfoResult.innerText = "客户担保";
				assureObjResult.innerText = "客户";
			}else if(assurePageData.assureMethodCD == builder.AssureMethodConst.ASSURE_PROMOTION){//租机担保
				assureAccountInfo = null;
				assureProductInfo = null;
				//securityObjId = assureCustData.custId;
				assureInfoResult.innerText = "租机担保";
				assureObjResult.innerText = "租机担保";
			}
			
			assureInfoResult.parentNode.style.backgroundColor="#cae3ff";
			assureObjResult.parentNode.style.backgroundColor="#cae3ff";
			dojo.query("[id=assureRadio"+rindex+"]",detailWidget.domNode)[0].checked = true;	
			this.clearView(dojo.query(".assureQuery"+subRowIndex)[0]);
			this.clearView(dojo.query(".assureResult"+subRowIndex)[0]);
			this.clearView(dojo.query(".assureAcct"+subRowIndex)[0]);
			this.clearView(dojo.query(".assureProd"+subRowIndex)[0]);
			
        	//将担保信息保存
			dojo.mixin(detailWidget,{
				assurePageData:{	
					"securityMethodCd" : assurePageData.assureMethodCD,							
					"securityObjId" : securityObjId,//客户ID，帐户ID，产品实例ID
					"securityObjTypeCd" : !!assureCardWidget?assureCardWidget.busCardInstance.$("assureQueryMethod").value:"",
					"securityDesc" : assurePageData.assureDesc,
					"securityFee" : assurePageData.assureValue,
					"securityDur" : assurePageData.assureDate,
					"assureAttrCard" : assureAttrCardWidget
				}
			});
		}
	})
});