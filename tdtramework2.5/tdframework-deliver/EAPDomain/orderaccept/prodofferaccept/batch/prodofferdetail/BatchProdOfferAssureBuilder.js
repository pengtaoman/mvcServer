defineModule(
		"orderaccept.prodofferaccept.batch.prodofferdetail.BatchProdOfferAssureBuilder",
		["../../util", "../../widget/assurecard/AssureCardWidget",
		 		"orderaccept.common.js.ConstantsPool",
				"../../../custom/Grid","../../../custom/BusCardGrid",
				"orderaccept.common.dialog.MessageBox","unieap.layout.ContentPane"], function(
				util, AssureCardWidget,ConstantsPool,Grid,BusCardGrid,messageBox) {
			/**
			 * 定义销售品担保类
			 */
			dojo.declare("orderaccept.prodofferaccept.batch.prodofferdetail.BatchProdOfferAssureBuilder",[],{
				assureCardWidgetClass : AssureCardWidget,
				constructor : function(args){
					this.detailBuild = args.detailBuilder,
					/**
					 * prodOfferDetailWidget-[assureInfoGrid:担保信息表格，assureCustInfo：选择的担保客户信息，assureAccountInfo:选择的账户信息，assurePageData:页面选择的担保信息]
					 */
					this.prodOfferDetailWidget = args.prodOfferDetailWidget,
					this.prodOfferInfo = args.prodOfferInfo,
		            this.tabContainer = args.tabContainer
				},
				/**
				 * 担保方式常量
				 */
				AssureMethodConst : ConstantsPool.load("AssureMethodConst").AssureMethodConst,
				/**
				 * 初始化销售品担保信息
				 */
		        initProdOfferAssure : function(){
		        	var builder = this,
		        		subRowIndex = builder.prodOfferDetailWidget.rowIndex,
		        		prodOfferAssureInfoList = builder.prodOfferInfo.prodOfferAssureDemandVO;
		        	if(!prodOfferAssureInfoList||prodOfferAssureInfoList.length==0){
		        		return;
		        	}
		        	var assureView = builder.initAssureView(subRowIndex);
		        		contentPane = new unieap.layout.ContentPane({
		                title : "担保信息",
		                width : "600px"
	                });  
	                dojo.place(assureView,contentPane.domNode,"last");   
	                
	                //初始化担保属性信息
		        	var	assureAttrCardWidget = new builder.assureCardWidgetClass({
		        		level : 4,
						cardMetaData:{
							gType:2,
			        		cardId : 222
						}
		        	});
		        	
		        	//添加回调
		        	assureAttrCardWidget.addCardCallback(function(){
		                builder.displaySomeAttributes();
			        });
		        	
		        	assureAttrCardWidget.renderCard(dojo.query(".assureAttr"+subRowIndex,contentPane.domNode)[0],"last");		        		
			        builder.prodOfferDetailWidget.assureAttrCard = assureAttrCardWidget;  

	                var data = [];
			        dojo.forEach(prodOfferAssureInfoList,function(assureInfo){
			        	var assureName = "";
			        	switch(assureInfo.securityMethodCD){
			        		case builder.AssureMethodConst.ASSURE_CASH : assureName = "现金担保";break;
			        		case builder.AssureMethodConst.ASSURE_PRODUCT : assureName = "产品担保";break;
			        		case builder.AssureMethodConst.ASSURE_ACCOUNT : assureName = "账户担保";break;
			        		case builder.AssureMethodConst.ASSURE_CUST : assureName = "客户担保";break;
			        		default : assureName = "未知的担保类型";break;
			        	}
						data.push({
							'assureName': assureName,
							'assureDesc':assureInfo.securityDesc,
							'assureValue':assureInfo.securityValue,
							'assureDate':assureInfo.securityDur,
							//ppm去掉下面三个信息
							//'mergeDemand':assureInfo.mergeDemand,
							//'assureNum':assureInfo.securityNum,
							//'assureUnit':assureInfo.securityUnitName,
							'assureMethodCD':assureInfo.securityMethodCD,
							'pOfferAssureDmdID':assureInfo.pOfferAssureDmdID
						});
			        });
			        //初始化表格
	                var cm = new BusCard.widget.grid.ColumnModel({
				                metaData : this.getOfferAssureColumns(subRowIndex)
			                });
			        var ds = new BusCard.widget.grid.DataSource(data, cm); 
			        var grid = new BusCardGrid({
			        		cm:cm,
			        		ds:ds
			        	},dojo.query(".assureInfo"+subRowIndex,contentPane.domNode)[0]);
                    builder.initEvent(subRowIndex,grid);
			        builder.tabContainer.addChild(contentPane);
			        builder.prodOfferDetailWidget.finalDataSource = ds;		   
			        builder.prodOfferDetailWidget.assureInfoGrid = grid;    

		        },
                /**
                 * 担保内容，担保时长，担保值数据收集及检测
                 */
		        initEvent : function(subRowIndex,grid){                    
                    var detailWidget = this.detailBuild.prodOfferDetailWidgetList[subRowIndex]; 
                    var assureDescList = dojo.query(".assureDescResult",grid.domNode);//担保内容对象input 
                    dojo.forEach(assureDescList,function(assureDescDom){            
                        dojo.connect(assureDescDom,"onblur",function(){    
                            var radio = dojo.query("#assureRadio"+assureDescDom.getAttribute("rindex"),grid.domNode)[0];
                            if(radio.checked == true && !!detailWidget.assurePageData){                   
                                detailWidget.assurePageData.securityDesc = assureDescDom.value;
                            }
                        }) 
                    })
                    var assureDateList = dojo.query(".assureDateResult",grid.domNode);//担保时长对象input
                    dojo.forEach(assureDateList,function(assureDateDom){            
                        dojo.connect(assureDateDom,"onblur",function(){    
                            if(!!assureDateDom.value && !/^\d+$/.test(assureDateDom.value)){                             
                                messageBox.alert({
                                    title : "\u63d0\u793a\u4fe1\u606f",
                                    message : "[\u62c5\u4fdd\u65f6\u957f]\u5e94\u4e3a\u5927\u4e8e\u7b49\u4e8e0\u7684\u6570\u5b57"
                                }, assureDateDom);   
                                assureDateDom.value = "";
                                return false;
                            }
                            var radio = dojo.query("#assureRadio"+assureDateDom.getAttribute("rindex"),grid.domNode)[0];
                            if(radio.checked == true && !!detailWidget.assurePageData){            
                                detailWidget.assurePageData.securityDur = assureDateDom.value;             
                            }                   
                            
                        }) 
                    })
                    var assureValueList = dojo.query(".assureValueResult",grid.domNode);//担保值对象input  
                    dojo.forEach(assureValueList,function(assureValueDom){                    
                        dojo.connect(assureValueDom,"onblur",function(){ 
                            if(!!assureValueDom.value && !/^\d+(\.\d+)?$/.test(assureValueDom.value)){                                
                                messageBox.alert({
                                    title : "\u63d0\u793a\u4fe1\u606f",
                                    message : "[\u62c5\u4fdd\u503c]\u5e94\u4e3a\u5927\u4e8e\u7b49\u4e8e0\u7684\u6570\u5b57"
                                }, assureValueDom);   
                                assureValueDom.value = "";
                                return false;
                            }  
                            var radio = dojo.query("#assureRadio"+assureValueDom.getAttribute("rindex"),grid.domNode)[0];
                            if(radio.checked == true && !!detailWidget.assurePageData){    
                                detailWidget.assurePageData.securityFee = assureValueDom.value;                         
                            }                     
                            
                        })
                    })
                },
		        /**
		         * 隐藏某些属性信息
		         */
		        displaySomeAttributes : function(){
		        	var assureAttrCard = this.prodOfferDetailWidget.assureAttrCard;
		        	assureAttrCard.busCardInstance.$("50034").style.display = "none";
		        	assureAttrCard.busCardInstance.$("label_50034").style.display = "none";
		        },
		        
		        /**
		         * 初始化页面布局
		         */
		        initAssureView : function(rowIndex){
		        	return "<div id='assureAttr"+rowIndex+"\' class='assureAttr"+rowIndex+"\'></div>"+
		        		   "<div id='assureInfo"+rowIndex+"\' class='assureInfo"+rowIndex+"\'></div>"+
		        		   "<div id='assureQuery"+rowIndex+"\' class='assureQuery"+rowIndex+"\'></div>" +
		        		   "<div id='asshowAssureQueryViewsureResult"+rowIndex+"\'class='assureResult"+rowIndex+"\'></div>" +
		        		   "<div id='assureAcct"+rowIndex+"\' class='assureAcct"+rowIndex+"\'></div>" +
		        		   "<div id='assureProd"+rowIndex+"\' class='assureProd"+rowIndex+"\'></div>";  
		        },
		        /**
		         * 销售品担保视图
		         */
		        getOfferAssureColumns : function(subRowIndex){
		        	var assureSelectFormatter = function(value,index, record){
		        		var data = this.getDataSource().getRawData()[index];
		        		var assureSelectHtml = "<div class='assureNameSelect" +index+"\'>"+
		        			"<input type = 'radio' id ='assureRadio" +index+ "' name = 'assureRadio"+subRowIndex+ "' assureMethodCD='"+data.assureMethodCD+"' class='assureRadio"+subRowIndex+
		        			"' rowIndex = '"+index+"'  subRowIndex = '"+subRowIndex+"' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/assureSelect'>" +
		        			"</div>";
		        		return assureSelectHtml;	
		        	}; 
		        	var	assureInfoFormatter = function(value,index){
		        		var assureInfoHtml = "<div class='assureInfoDiv" +index+"\'>"+
		        			"<span class = 'assureInfoResult"+index+"\'></span>"
		        			"</div>";
		        		return assureInfoHtml;			
		        	};
		        	var	assureObjFormatter = function(value,index){
		        		var assureInfoHtml = "<div class='assureObjDiv" +index+"\'>"+
		        			"<span class = 'assureObjResult"+index+"\'></span>"
		        			"</div>";
		        		return assureInfoHtml;			
		        	};
                    var assureDateFormatter = function(value,index){
                        var assureInfoHtml = "<input type='text' style='width:90%;text-align:center;float:center' value='"+value+"'\
                                class='buscard-el buscard-input-line assureDateResult assureDateResult"+index+"' rindex='"+index+"'/>";
                        return assureInfoHtml;  
                    };     
                    var assureDescFormatter = function(value,index){
                        var assureInfoHtml = "<input type='text' style='width:90%;text-align:center;float:center' value='"+value+"'\
                                class='buscard-el buscard-input-line assureDescResult assureDescResult"+index+"' rindex='"+index+"'/>";
                        return assureInfoHtml;  
                    };
                    var assureValueFormatter = function(value,index){
                        var assureValue = "";
                        if(!isNaN(parseFloat(value))){                                                  
                            assureValue = parseFloat(value)/100;
                        }
                        var assureInfoHtml = "<input type='text' style='width:90%;text-align:center;float:center' value='"+assureValue+"'\
                                class='buscard-el buscard-input-line assureValueResult assureValueResult"+index+"' rindex='"+index+"'/>";
                        return assureInfoHtml; 
                    };
		        	return cm = [{
				                width : '7%',
				                name : 'assureSelect',
				                text : '选择',
				                render : assureSelectFormatter
			                }, {
				                width : '10%',
				                name : 'assureName',
				                text : '担保方式',
				                value : "assureMethodCD"
			                }, {
				                width : '10%',
				                name : 'assureDesc',
				                text : '担保内容',
                                render : assureDescFormatter
			                }, {
				                width : '10%',
				                name : 'assureValue',
				                text : '担保值（元）',
				                render : assureValueFormatter
			                }, {
				                width : '10%',
				                name : 'assureDate',
				                text : '担保时长(月)',
                                render : assureDateFormatter
			                },{
				                width : '15%',
				                name : 'assureInfo',
				                text : '担保对象类型',
				                render : assureObjFormatter
			                },{
				                width : '20%',
				                name : 'assureInfo',
				                text : '担保对象标识',
				                render : assureInfoFormatter
			                }

			        ];
		        },
		        /**
		         * 担保信息查询页面
		         */
		        showAssureQueryView : function(rowIndex,subRowIndex,assureMethodCD){
		        	var builder = this,
		        		detailBuild = builder.detailBuild,
		        		detailWidget = detailBuild.prodOfferDetailWidgetList[subRowIndex];	
		        	//如果查询卡片已经存在，则销毁
		        	if(detailWidget.assureCardWidget){
		        		detailWidget.assureCardWidget.destroy();
		        	}
		        	if(assureMethodCD == builder.AssureMethodConst.ASSURE_CASH){
			        	//刷新表格数据源				
			        	detailWidget.assureInfoGrid.setDataSource(detailWidget.finalDataSource);
                        builder.initEvent(subRowIndex,detailWidget.assureInfoGrid);
						dojo.query("[id=assureRadio"+rowIndex+"]",detailWidget.domNode)[0].checked = true;
			        	builder.onAssureCommitClick(rowIndex,subRowIndex);
//	    				detailWidget.assureCustInfo = null;//担保客户信息			        	
//	        			detailWidget.assureAccountInfo = null;//担保帐户信息	    	
//	        			detailWidget.assureProductInfo = null;//担保产品信息
//	        			dojo.query(".assureInfoResult"+rowIndex,detailWidget.domNode)[0].innerText = "现金担保";//担保信息标识别span 
//	        			dojo.query(".assureObjResult"+rowIndex,detailWidget.domNode)[0].innerText = "现金";//担保信息对象span  
//						dojo.query(".assureInfoResult"+rowIndex,detailWidget.domNode)[0].parentNode.style.backgroundColor="#cae3ff";
//						dojo.query(".assureObjResult"+rowIndex,detailWidget.domNode)[0].parentNode.style.backgroundColor="#cae3ff";
		        	}else {
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
	                            	var assureProductId = busCardInst.$("assureProductId");
		                            var assureProdHTML = assureProductId.outerHTML;
		                            dojo.connect(busCardInst.$("assureServiceId"),"onblur",function(){
		                            	var productIdSelect = assureProdHTML;
		                            	if(busCardInst.$("assureServiceId").value != ""){
											var param = "&serviceId="+busCardInst.$("assureServiceId").value+"&ifValid=1";
											var productIdList = util.ServiceFactory.getService("url:custAcceptAjaxAction.do?method=getProductIdList"+ param);
											if(productIdList != "-1"){
												productIdSelect = productIdList.replace(/productId/g,"assureProductId");
											}
		                            	}
							       		busCardInst.$("assureProductId").outerHTML = productIdSelect;	
		                            });
					       		}
				        	}
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
		//		        		"<a href='javascript:void(0);' id = 'commit"+subRowIndex+"\' dojoAttachEvent='onclick:elementclick' \ subRowIndex="+subRowIndex+" rowIndex="+rowIndex+ 
		//		        		" dojoAttachTopic='/assureCommit'\ style='text-align:center;vertical-align:middle;color:red;'>&nbsp确定&nbsp</a>" +
		//		        		"<a href='javascript:void(0);' id = 'cancel"+subRowIndex+"\' dojoAttachEvent='onclick:elementclick' \ subRowIndex="+subRowIndex+" rowIndex="+rowIndex+
		//		        		" dojoAttachTopic='/assureCancel'\ style='text-align:center;vertical-align:middle;color:red;'>&nbsp取消</a>" +
				        		"</div>";	 
				        	dojo.place(buttons,dojo.byId("assureQuery"+subRowIndex),"last");
			        	}
			        	detailWidget.enableEvtMsgPropagation(dojo.byId("assureQuery"+subRowIndex));
			        		
			        	detailWidget.assureCardWidget = assureCardWidget;
		        	}
		        },
		        /**
		         * 清空显示区域
		         */
		         clearView : function(node,flag){
		         	while(node&&node.hasChildNodes()){
		        		node.removeChild(node.firstChild);
		        	}
		        	if(node&&flag) node.parentNode.removeChild(node);
		         },
		        /**
		         * 担保条件信息查询
		         */
		        assureQuery : function(subRowIndex){
		        	var	assureCardWidget = this.detailBuild.prodOfferDetailWidgetList[subRowIndex].assureCardWidget;
//		        	if(!assureCardWidget.busCardInstance.getData()) {
//		        		return;
//		        	}
		        	if(assureCardWidget.busCardInstance.$("assureQueryMethod").value == this.AssureMethodConst.ASSURE_CUST
		        			||assureCardWidget.busCardInstance.$("assureQueryMethod").value == this.AssureMethodConst.ASSURE_ACCOUNT){
		        		if(!assureCardWidget.busCardInstance.$("identityCode")||
		        			assureCardWidget.busCardInstance.$("identityCode").value == ""){
						        /**MessageBox.alert({
							        title : "\u63d0\u793a\u4fe1\u606f",
							        message : "[\u8bc1\u4ef6\u53f7\u7801]\u4e0d\u80fd\u4e3a\u7a7a"
						        }, assureCardWidget.busCardInstance.$("identityCode"));
		        				//alert("[证件号码]不能为空");*/
		        				 messageBox.alert({
									busiCode : "08410113"
						 	 	}, assureCardWidget.busCardInstance.$("identityCode"));
		        				return false;
		        			}
						this.assureCustView(subRowIndex);
		        	}else if(assureCardWidget.busCardInstance.$("assureQueryMethod").value == this.AssureMethodConst.ASSURE_PRODUCT){
		        		if(!assureCardWidget.busCardInstance.$("assureServiceId")||
		        			assureCardWidget.busCardInstance.$("assureServiceId").value == ""){
						        /**MessageBox.alert({
							        title : "\u63d0\u793a\u4fe1\u606f",
							        message : "[\u4e1a\u52a1\u53f7\u7801]\u4e0d\u80fd\u4e3a\u7a7a"
						        }, assureCardWidget.busCardInstance.$("assureServiceId"));*/
						         messageBox.alert({
									busiCode : "08410112"
						 	 	}, assureCardWidget.busCardInstance.$("assureServiceId"));
		        				//alert("[业务号码]不能为空");
		        				return false;
		        			}		        			
						this.assureProductView(subRowIndex);		        		
		        	}
		        },
		        /**
		         * 生成担保客户列表
		         */
		        assureCustView : function(subRowIndex){
		        	//清空查询结果
		        	this.clearView(dojo.query(".assureResult"+subRowIndex)[0]);
		        	this.clearView(dojo.query(".assureAcct"+subRowIndex)[0]);
		        	this.clearView(dojo.query(".assureProd"+subRowIndex)[0]);
		        	var	assureCardWidget = this.detailBuild.prodOfferDetailWidgetList[subRowIndex].assureCardWidget;
		        	//初始化表格
	                var cm = new BusCard.widget.grid.ColumnModel({
				                metaData : this.getAssureCustColumns(subRowIndex)
			                }),
			            totalProperty = BusCard.$remote("custIdentBO").getCustIdentCount({
		            		"identityCode":assureCardWidget.busCardInstance.$("identityCode").value,
		            		"identityKind":assureCardWidget.busCardInstance.$("identityKind").value
	            		});
			        	ds = new BusCard.widget.grid.JsonDataSource({
			           	 	loadData:function(param){
			           	 		 var list = BusCard.$remote("custIdentBO").getCustIdentPartInfo({
							            		"identityCode":assureCardWidget.busCardInstance.$("identityCode").value,
							            		"identityKind":assureCardWidget.busCardInstance.$("identityKind").value,
							            		"startRows" : param.start+1, //sqlmap中语句为 >=startRows <endRows,此方法为公共方法,故此+1
							            		"endRows" : param.end+1
						            		});
			           	 		return  {totalProperty:totalProperty,root:list};
			           		 }
			            }, cm); 
		        		grid  = new BusCardGrid({	        				
				               cm : cm,
				               ds : ds,
				               paging : true,
				               pageSize : 5
			               });		         
					dojo.place(grid.domNode,dojo.query(".assureResult"+subRowIndex)[0],"last");
			        //保存客户查询列表
			        this.detailBuild.prodOfferDetailWidgetList[subRowIndex].assureCustGrid = grid;
		        },
		        /**
		         * 生成查询结果担保客户表格
		         */
		        getAssureCustColumns : function(subRowIndex){
		        	var assureCustFormatter = function(value,index){
		        		var assureCustHtml = "<div class='assureCustSelect" +index+"\'>"+
		        			"<input type = 'radio' id ='assureCustRadio" +index+ "' name = 'assureCustRadio"+subRowIndex+
		        			"' rowIndex = '"+index+"'  subRowIndex = '"+subRowIndex+"' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/assureCustSelect'>" +
		        			"</div>";
		        		return assureCustHtml;	
		        	};
		        	return cm = [{
				                width : '7%',
				                name : 'custSelect',
				                text : '选择',
				                render : assureCustFormatter
			                }, {
				                width : '10%',
				                name : 'custId',
				                text : '客户编号'
			                }, {
				                width : '10%',
				                name : 'custName',
				                text : '客户名称'
			                }, {
				                width : '10%',
				                name : 'identityKind',
				                text : '证件类型'
			                }, {
				                width : '20%',
				                name : 'identityCode',
				                text : '证件号码'
			                },{
				                width : '30%',
				                name : 'custAddr',
				                text : '客户地址'
			                },{
				                width : '10%',
				                name : 'custStatus',
				                text : '客户状态'
			                }

			        ];
		        },
		        /**
		         * 生成担保帐户列表
		         */
		        assureAccountView : function(subRowIndex,custData){
		        	//清空查询结果
		        	this.clearView(dojo.query(".assureAcct"+subRowIndex)[0]);
		        	//初始化表格
	                var cm = new BusCard.widget.grid.ColumnModel({
				                metaData : this.getAssureAccountColumns(subRowIndex)
			                }),
			            totalProperty = BusCard.$remote("prodOfferSaleDataBO").getAccountCountByCustId(custData.custId,"");
			        	ds = new BusCard.widget.grid.JsonDataSource({
			           	 	loadData:function(param){
			           	 		 var list = BusCard.$remote("prodOfferSaleDataBO").getAccountListByCustId(
		           	 		 					custData.custId,
		           	 		 					"",
		           	 		 					param.start,
							            		param.end
						            		);
			           	 		return  {totalProperty:totalProperty,root:list};
			           		 }
			            }, cm);    
		        		grid  = new BusCardGrid({	        				
				               cm : cm,
				               ds : ds,				               
				               paging : true,
				               pageSize : 5
			               });		         
					dojo.place(grid.domNode,dojo.query(".assureAcct"+subRowIndex)[0],"last");
					grid.custData = custData;
			        //保存客户查询列表
			        this.detailBuild.prodOfferDetailWidgetList[subRowIndex].assureAccountGrid = grid;
		        },
		        /**
		         * 生成查询结果担保帐户表格
		         */
		        getAssureAccountColumns : function(subRowIndex){
		        	var assureAccountFormatter = function(value,index){
		        		var assureAccountHtml = "<div class='assureAccountSelect" +index+"\'>"+
		        			"<input type = 'radio' id ='assureAccountRadio" +index+ "' name = 'assureAccountRadio"+subRowIndex+
		        			"' rowIndex = '"+index+"'  subRowIndex = '"+subRowIndex+"' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/assureAccountSelect'>" +
		        			"</div>";
		        		return assureAccountHtml;	
		        	};
		        	return cm = [{
				                width : '7%',
				                name : 'accountSelect',
				                text : '选择',
				                render : assureAccountFormatter
			                }, {
				                width : '10%',
				                name : 'accountId',
				                text : '账户编号'
			                }, {
				                width : '10%',
				                name : 'accountName',
				                text : '账户名称'
			                }, {
				                width : '10%',
				                name : 'stateDesc',
				                text : '账户状态'
			                }, {
				                width : '20%',
				                name : 'ifDefaultDesc',
				                text : '是否默认帐户'
			                },{
				                width : '30%',
				                name : 'activeDate',
				                text : '账户生效时间'
			                },{
				                width : '10%',
				                name : 'accountTel',
				                text : '付费电话'
			                }
			        ];
		        },
		        /**
		         * 生成担保产品列表
		         */
		        assureProductView : function(subRowIndex){
		        	var	assureCardWidget = this.detailBuild.prodOfferDetailWidgetList[subRowIndex].assureCardWidget;
		        	//清空查询结果
		        	this.clearView(dojo.query(".assureProd"+subRowIndex)[0]);
		        	//初始化表格
	                var cm = new BusCard.widget.grid.ColumnModel({
				                metaData : this.getAssureProductColumns(subRowIndex)
			                }),
			            totalProperty = BusCard.$remote("prodInstCommFacadeBO").getServiceRelationCount({
			            					"serviceId":assureCardWidget.busCardInstance.$("assureServiceId").value,
			            					"productId":assureCardWidget.busCardInstance.$("assureProductId").value
			            				});
			        	ds = new BusCard.widget.grid.JsonDataSource({
			           	 	loadData:function(param){
			           	 		 var list = BusCard.$remote("prodInstCommFacadeBO").getServiceRelationByServiceIdPage({
				            					"serviceId":assureCardWidget.busCardInstance.$("assureServiceId").value,
				            					"productId":assureCardWidget.busCardInstance.$("assureProductId").value,				            					
							            		"startRows" : param.start, 
							            		"endRows" : param.end
			           	 					 });
			           	 		dojo.forEach(list,function(serviceRelationVO){
							        var productName = BusCard.$remote("innerInterfaceBO")
							                .getProductName(serviceRelationVO.productId);
					                serviceRelationVO.productName = eval("("+productName+")");			           	 		
			           	 		});			 
			           	 		return  {totalProperty:totalProperty,root:list};
			           		 }
			            }, cm);    
		        		grid  = new BusCardGrid({	        				
				               cm : cm,
				               ds : ds,				               
				               paging : true,
				               pageSize : 5
			               });		         
					dojo.place(grid.domNode,dojo.query(".assureProd"+subRowIndex)[0],"last");
			        //保存客户查询列表
			        this.detailBuild.prodOfferDetailWidgetList[subRowIndex].assureProductGrid = grid;
		        },
		        /**
		         * 生成查询结果担保产品表格
		         */
		        getAssureProductColumns : function(subRowIndex){
		        	var assureProductFormatter = function(value,index){
		        		var assureProductHtml = "<div class='assureProductSelect" +index+"\'>"+
		        			"<input type = 'radio' id ='assureProductRadio" +index+ "' name = 'assureProductRadio"+subRowIndex+
		        			"' rowIndex = '"+index+"'  subRowIndex = '"+subRowIndex+"' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/assureProductSelect'>" +
		        			"</div>";
		        		return assureProductHtml;	
		        	};
		        	return cm = [{
				                width : '7%',
				                name : 'prodSelect',
				                text : '选择',
				                render : assureProductFormatter
			                }, {
				                width : '10%',
				                name : 'userId',
				                text : '产品实例编号'
			                },{
				                width : '10%',
				                name : 'serviceId',
				                text : '业务号码'
			                }, {
				                width : '10%',
				                name : 'productName',
				                text : '产品名称'
			                }
			        ];
		        },
		        /**
		         * 担保客户选择
		         */
		        onAssureCustSelectClick : function(rowIndex,subRowIndex){
		        	var assureMethodCD = this.detailBuild.prodOfferDetailWidgetList[subRowIndex]
		        									.assureCardWidget.busCardInstance.$("assureQueryMethod").value;
		        	var	custData = this.detailBuild.prodOfferDetailWidgetList[subRowIndex].assureCustGrid.ds.getRawData()[rowIndex];
		        	if(assureMethodCD == this.AssureMethodConst.ASSURE_CUST){
		        		this.detailBuild.prodOfferDetailWidgetList[subRowIndex].assureCustInfo = custData;	
		        		this.onAssureCommitClick(rowIndex,subRowIndex);
		        	}else if(assureMethodCD == this.AssureMethodConst.ASSURE_ACCOUNT){	
						this.assureAccountView(subRowIndex,custData);
		        	}
		        },
		        /**
		         * 担保帐户选择
		         */
		        onAssureAccountSelectClick : function(rowIndex,subRowIndex){
		        	var assureMethodCD = this.detailBuild.prodOfferDetailWidgetList[subRowIndex]
		        									.assureCardWidget.busCardInstance.$("assureQueryMethod").value;
		        	var	custData = this.detailBuild.prodOfferDetailWidgetList[subRowIndex].assureAccountGrid.custData;
		        	var	accountData = this.detailBuild.prodOfferDetailWidgetList[subRowIndex].assureAccountGrid.ds.getRawData()[rowIndex];
	        		this.detailBuild.prodOfferDetailWidgetList[subRowIndex].assureCustInfo = custData;
		        	this.detailBuild.prodOfferDetailWidgetList[subRowIndex].assureAccountInfo = accountData;	
	        		this.onAssureCommitClick(rowIndex,subRowIndex);
		        },
		        /**
		         * 担保产品选择
		         */
		        onAssureProductSelectClick : function(rowIndex,subRowIndex){
		        	var assureMethodCD = this.detailBuild.prodOfferDetailWidgetList[subRowIndex]
		        									.assureCardWidget.busCardInstance.$("assureQueryMethod").value;
		        	var	productInfo = this.detailBuild.prodOfferDetailWidgetList[subRowIndex].assureProductGrid.ds.getRawData()[rowIndex];
		        	this.detailBuild.prodOfferDetailWidgetList[subRowIndex].assureProductInfo = productInfo;	
	        		this.onAssureCommitClick(rowIndex,subRowIndex);
		        },
		        /**
		         * 担保信息确认
		         */
		        onAssureCommitClick : function(rowIndex,subRowIndex){
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
                    builder.initEvent(subRowIndex,detailWidget.assureInfoGrid);	
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
						securityObjId = assureCustData.custId;
						assureInfoResult.innerText = "客户编号:"+assureCustData.custId;
						assureObjResult.innerText = "客户";						
					}else if(assurePageData.assureMethodCD ==  builder.AssureMethodConst.ASSURE_ACCOUNT){//账户担保
						assureProductInfo = null;
						securityObjId = assureAccountInfo.accountId;
						assureInfoResult.innerText = "帐户编号:"+assureAccountInfo.accountId;		
						assureObjResult.innerText = "帐户";				
					}else if(assurePageData.assureMethodCD == builder.AssureMethodConst.ASSURE_PRODUCT){//产品担保
						assureCustData = null;
						assureAccountInfo = null;
						securityObjId = assureProductInfo.userId;
						assureInfoResult.innerText = "产品实例编号:"+assureProductInfo.userId;	
						assureObjResult.innerText = "产品实例";			
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