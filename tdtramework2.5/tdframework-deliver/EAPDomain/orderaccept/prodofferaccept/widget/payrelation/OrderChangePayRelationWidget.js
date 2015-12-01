defineModule(
		"orderaccept.prodofferaccept.widget.payrelation.OrderChangePayRelationWidget",
		[ "./PayRelationWidget","orderaccept.prodofferaccept.util"],
		function(PayRelationWidget,util) {

			dojo.declare("orderaccept.prodofferaccept.widget.payrelation.OrderChangePayRelationWidget",
							[PayRelationWidget],
							{
								templatePath : dojo.moduleUrl("orderaccept.prodofferaccept.widget.payrelation",
										"template/OrderChangePayRelationTemplate.html"),
								/**
								 * 模板中是否使用widgets
								 * 
								 * @field
								 */
								widgetsInTemplate : true,
								prodInstAcctTempList:null,
								accessProdItemList:null,
								accountItemList:null,
								accountInfoListDatastore:null,
								accessProdInfoListDatastore:null,
								accountServiceInfoListDatastore:null,
								postMixInProperties:function(){

									this.inherited(arguments);

									
									this.accessProdInfoListDatastore = new unieap.ds.DataStore('accessProdInfoListDatastore', []);
									dataCenter.addDataStore(this.accessProdInfoListDatastore);
									
									this.accountServiceInfoListDatastore = new unieap.ds.DataStore('accountServiceInfoListDatastore', []);
									dataCenter.addDataStore(this.accountServiceInfoListDatastore);
										
								},
								postCreate : function() {
									this.inherited(arguments);
								},
								
								/**
								 * 获取支付关系表格组件
								 * 
								 * @method
								 */
								getAccountItemGrid : function() {
									return this.accountItemGrid = this.accountItemGrid
											|| unieap.byId('accountItemGrid');
								},
					
								initItemInfoGrid:function(){

									var widget=this;
									this.getPayRelationGrid().getBinding().setDataStore(new  unieap.ds.DataStore("payRelationDataStore",this.prodInstAcctTempList));
									
									dojo.map(this.accountItemList,function(accountItemVO){
										widget.getAccountItemGrid().getBinding().getDataStore().getRowSet().addRow(accountItemVO);
									});
								
								},
								ifShowOperate:function(){
									return false;
								},
								/**
								 * 对外接口，传入接入产品订单项和账户订单项列表
								 */
								initItemInfoList : function(accessProdItemList,accountItemList) {
									var widget=this;
									this.accessProdItemList=accessProdItemList;
									this.accountItemList=accountItemList||[];
									this.prodInstAcctTempList=[];
									this.generateServiceInfoList(accessProdItemList);
									dojo.map( accessProdItemList,function(accessProdItemVO,index){

										if(accessProdItemVO&&accessProdItemVO.accountRelaInfoList&&accessProdItemVO.accountRelaInfoList.length>0){
											
											var productInfoVO = util.ProdOfferHelper.getProductById(dojo.global.$appContext$.get("prodOfferList"), accessProdItemVO.productId);
											if(null!=productInfoVO){
												accessProdItemVO.productName=productInfoVO.productName;
											}
											dojo.map( accessProdItemVO.accountRelaInfoList,function(prodInstAcctTempVO){
												prodInstAcctTempVO.serviceInfoIndex=index;
												prodInstAcctTempVO.serviceId=accessProdItemVO.serviceId;
												widget.prodInstAcctTempList.push(prodInstAcctTempVO);
											});
											var data = {};
											data.CODEVALUE = accessProdItemVO.prodInstId;
											data.CODENAME = accessProdItemVO.serviceId + ' '+ accessProdItemVO.productName;
											
											widget.accessProdInfoListDatastore.getRowSet().addRow(data);
											var serviceData = {};
											serviceData.CODEVALUE = accessProdItemVO.serviceId;
											serviceData.CODENAME = accessProdItemVO.serviceId ;
											
											widget.accountServiceInfoListDatastore.getRowSet().addRow(serviceData);
										}
									});
									
									this.initServiceInfoList();
									dojo.map( accountItemList,function(accountItemVO){

										accountItemVO.accountFeeShow=accountItemVO.accountFee/100;
										dojo.map( accessProdItemList,function(accessProdItemVO,index){
											if(accountItemVO.defaultProdInstId==accessProdItemVO.prodInstId){
												accountItemVO.serviceInfoIndex=index;
												accountItemVO.operKind=1;
											}
										});
										widget.addAccountInfoList(accountItemVO);
									});
									this.initItemInfoGrid();

								},
								

								/**
								 * 视情况调用，返回账户订单项列表和支付关系列表
								 */
								getData : function() {
									var payRelationGrid = this.getPayRelationGrid();
									
									var payRelationGridBinding=payRelationGrid.getBinding();
									if(!payRelationGridBinding.validate(true)){
										return false;
									} 
									
									var accountRelaInfoList = payRelationGridBinding.getRowSet().getData();
									
									var accountItemGrid = this.getAccountItemGrid();
									
									var accountItemGridBinding=accountItemGrid.getBinding();
									if(!accountItemGridBinding.validate(true)){
										return false;
									} 
									
									var accountItemList = accountItemGridBinding.getRowSet().getData();
									dojo.map(accountItemList,function(accountItemVO){
										accountItemVO.accountFee=accountItemVO.accountFeeShow*100;
									});
									var returnData= {
										accountItemList : accountItemList,
										accountRelaInfoList : accountRelaInfoList
									};
									
									if (!this.doCheck(returnData)) {
										return false;
									}
									return returnData;
								},
								
								/**
								 * 检测本组件收集到的数据是否符合业务逻辑
								 */
								doCheck : function(returnData) {
									if(!this.doCheckAccountTel(returnData.accountItemList,returnData.accountRelaInfoList)){
										return false;
									}
									if(!this.doCheckDefaultProdInst(returnData.accountItemList,returnData.accountRelaInfoList)){
										return false;
									}
									
									return true;
								},
								/**
								 * 检测储值号码是否合法(可能存在撤单的情况)
								 */
								doCheckDefaultProdInst: function(){
									var accountItemGrid = this.getAccountItemGrid();
									var accountItemGridBinding=accountItemGrid.getBinding();
									var accountItemList = accountItemGridBinding.getRowSet().getData();
									
									for(var index=0,length=accountItemList.length;index<length;index++){
										var accountInfo=accountItemList[index];
										var matched=false;
										for(var indexProd=0,lengthProd=this.accessProdItemList.length;indexProd<lengthProd;indexProd++){
											if(this.accessProdItemList[indexProd].prodInstId==accountInfo.defaultProdInstId){
												matched=true;
												break;
											}
										}
										if(!matched){
											alert("请重新选择账户["+accountInfo.accountName+"("+accountInfo.accountId+")"+"]的储值号码");
											return false;
										}
										
									}
									return true;
								}
								

							});


		});
