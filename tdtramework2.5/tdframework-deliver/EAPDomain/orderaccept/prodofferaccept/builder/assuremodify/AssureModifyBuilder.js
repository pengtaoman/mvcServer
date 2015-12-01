defineModule("orderaccept.prodofferaccept.builder.assuremodify.AssureModifyBuilder",
		["../../util","../../widget/assurecard/AssureCardWidget","orderaccept.common.js.ConstantsPool",
		"../../../custom/Grid","../../../custom/BusCardGrid","orderaccept.common.dialog.MessageBox","unieap.layout.Container","orderaccept.custom.popup"],
			function(util, AssureCardWidget,ConstantsPool,Grid,BusCardGrid,messageBox){
	
	/**
	 * 定义担保信息修改类
	 */
	dojo.declare("orderaccept.prodofferaccept.builder.assuremodify.AssureModifyBuilder",[],{
	
		assureCardWidgetClass : AssureCardWidget,
		constructor : function(args){
			this.currentCard = args.currentCard,
			this.detailBuild = args.detailBuilder,
			this.subRowIndex = args.subRowIndex,
			this.queryView = args.queryView,
			this.securityMethodCd = args.securityMethodCd
		},
		/**
		 * 担保方式常量
		 */
		AssureMethodConst : ConstantsPool.load("AssureMethodConst").AssureMethodConst,
		/**
		 * 初始化销售品担保信息
		 */
        initAssureQueryView : function(){
        var builder = this,
         	subRowIndex = builder.subRowIndex,
    		queryView = builder.queryView,
    		assureMethodCD = builder.securityMethodCd;
	        var assureView = builder.initAssureView(subRowIndex);
		    var container = new unieap.layout.Container({
		    	width : "600px"	
		    });  
	        dojo.place(assureView,container.domNode,"last");   
	        dojo.place(container.domNode,queryView.containerNode,"last"); 
			builder.showAssureQueryView();
        },
        /**
         * 初始化页面布局
         */
        initAssureView : function(rowIndex){
        	return "<div id='assureQuery"+rowIndex+"\' class='assureQuery"+rowIndex+"\'></div>" +
        		   "<div id='asshowAssureQueryViewsureResult"+rowIndex+"\'class='assureResult"+rowIndex+"\' width='100%'></div>" +
        		   "<div id='assureAcct"+rowIndex+"\' class='assureAcct"+rowIndex+"\' width='100%'></div>" +
        		   "<div id='assureProd"+rowIndex+"\' class='assureProd"+rowIndex+"\' width='100%'></div>";  
        },
        /**
     * 担保信息查询页面
     */
    showAssureQueryView : function(){
    	var builder = this,
	    	subRowIndex = builder.subRowIndex,
	    	detailWidget = builder.queryView,
	    	assureMethodCD = builder.securityMethodCd;
    	if(detailWidget.assureCardWidget){
    		detailWidget.assureCardWidget.destroy();
    	}
     	var	assureCardWidget = new AssureCardWidget({
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
      				|| assureMethodCD == builder.AssureMethodConst.ASSURE_ACCOUNT){//客户
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
							var productIdList = orderaccept.prodofferaccept.util.ServiceFactory.getService("url:custAcceptAjaxAction.do?method=getProductIdList"+ param);
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
     		var buttons = "<div style='text-align:center;vertical-align:middle' class='assure-buttons"+subRowIndex+"\'>" +
     			"<a href='javascript:void(0);' id = 'query"+subRowIndex+"\' dojoAttachEvent='onclick:elementclick' \ subRowIndex="+subRowIndex+
      		" dojoAttachTopic='/assureQuery'\ style='text-align:center;vertical-align:middle;color:red;'>&nbsp查询&nbsp</a>" +
      		"</div>";	 
      	dojo.place(buttons,dojo.byId("assureQuery"+subRowIndex),"last");
     	}
     	detailWidget.enableEvtMsgPropagation(dojo.byId("assureQuery"+subRowIndex));
     		
     	detailWidget.assureCardWidget = assureCardWidget;
    },

/**
 * 担保条件信息查询
 */
    assureQuery : function(subRowIndex){
     	var	assureCardWidget = this.queryView.assureCardWidget;
     	if(assureCardWidget.busCardInstance.$("assureQueryMethod").value == this.AssureMethodConst.ASSURE_CUST
     			||assureCardWidget.busCardInstance.$("assureQueryMethod").value == this.AssureMethodConst.ASSURE_ACCOUNT){
     		if(!assureCardWidget.busCardInstance.$("identityCode")||
     			assureCardWidget.busCardInstance.$("identityCode").value == ""){
     			messageBox.alert(
     				{
						busiCode : "08410113"
	 	 			}, 
	 	 			assureCardWidget.busCardInstance.$("identityCode")
	 	 		);
     				return false;
     			}
	this.assureCustView(subRowIndex);
     	}else if(assureCardWidget.busCardInstance.$("assureQueryMethod").value == this.AssureMethodConst.ASSURE_PRODUCT){
     		if(!assureCardWidget.busCardInstance.$("assureServiceId")||
     			assureCardWidget.busCardInstance.$("assureServiceId").value == ""){
	         messageBox.alert({
				busiCode : "08410112"
	 	 	}, assureCardWidget.busCardInstance.$("assureServiceId"));
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
     	var	assureCardWidget = this.queryView.assureCardWidget;
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
      this.queryView.assureCustGrid = grid;
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
      this.queryView.assureAccountGrid = grid;
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
     	var	assureCardWidget = this.queryView.assureCardWidget;
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
      this.queryView.assureProductGrid = grid;
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
     	var assureMethodCD = this.queryView.assureCardWidget.busCardInstance.$("assureQueryMethod").value;
     	var	custData = this.queryView.assureCustGrid.ds.getRawData()[rowIndex];
     	if(assureMethodCD == this.AssureMethodConst.ASSURE_CUST){
     		this.queryView.assureCustInfo = custData;	
     		this.onAssureCommitClick(rowIndex,subRowIndex);
     	}else if(assureMethodCD == this.AssureMethodConst.ASSURE_ACCOUNT){	
			this.assureAccountView(subRowIndex,custData);
     	}
     },
     /**
      * 担保帐户选择
      */
     onAssureAccountSelectClick : function(rowIndex,subRowIndex){
     	var assureMethodCD = this.queryView.assureCardWidget.busCardInstance.$("assureQueryMethod").value;
     	var	custData = this.queryView.assureAccountGrid.custData;
     	var	accountData = this.queryView.assureAccountGrid.ds.getRawData()[rowIndex];
    		this.queryView.assureCustInfo = custData;
     	this.queryView.assureAccountInfo = accountData;	
    		this.onAssureCommitClick(rowIndex,subRowIndex);
     },
     /**
      * 担保产品选择
      */
     onAssureProductSelectClick : function(rowIndex,subRowIndex){
     	var assureMethodCD = this.queryView.assureCardWidget.busCardInstance.$("assureQueryMethod").value;
     	var	productInfo = this.queryView.assureProductGrid.ds.getRawData()[rowIndex];
     	this.queryView.assureProductInfo = productInfo;	
    		this.onAssureCommitClick(rowIndex,subRowIndex);
     },
/**
     * 担保信息确认
     */
      onAssureCommitClick : function(rowIndex,subRowIndex){
      	var builder = this,
      		detailWidget = builder.queryView,
      		currentCard = builder.currentCard,
      		assureCustData = detailWidget.assureCustInfo,//担保客户信息			        	
	       	assureAccountInfo = detailWidget.assureAccountInfo,//担保帐户信息	    	
	       	assureProductInfo = detailWidget.assureProductInfo;//担保产品信息
      	if(builder.securityMethodCd ==  builder.AssureMethodConst.ASSURE_CUST){//客户担保
			assureAccountInfo = null;
			assureProductInfo = null;
			currentCard.$("securityObjId").value = assureCustData.custId;
			currentCard.$("securityCustName").value = assureCustData.custName + "[" + assureCustData.custId + "]";
		}else if(builder.securityMethodCd ==  builder.AssureMethodConst.ASSURE_ACCOUNT){//账户担保
			assureProductInfo = null;
			assureCustData = null;
			currentCard.$("securityObjId").value = assureAccountInfo.accountId;
			currentCard.$("securityAccountName").value = assureAccountInfo.accountName + "[" + assureAccountInfo.accountId + "]";
		}else if(builder.securityMethodCd == builder.AssureMethodConst.ASSURE_PRODUCT){//产品担保
			assureCustData = null;
			assureAccountInfo = null;
			currentCard.$("securityObjId").value = assureProductInfo.userId;
			currentCard.$("securityServiceId").value = assureProductInfo.serviceId + "[" + assureProductInfo.userId + "]";
		}
      //	this.clearView(dojo.query(".assureQuery"+subRowIndex)[0]);
		//this.clearView(dojo.query(".assureResult"+subRowIndex)[0]);
		//this.clearView(dojo.query(".assureAcct"+subRowIndex)[0]);
		//this.clearView(dojo.query(".assureProd"+subRowIndex)[0]);
		orderaccept.custom.popup.close({
					                widget : detailWidget
				                });
},

/**
   * 清空显示区域
   */
   clearView : function(node,flag){
   	while(node&&node.hasChildNodes()){
  		node.removeChild(node.firstChild);
  	}
  	if(node&&flag) node.parentNode.removeChild(node);
   }
	})
});