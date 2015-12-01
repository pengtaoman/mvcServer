defineModule(
		"orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget",
		[ "dijit._Widget", "dijit._Templated", "orderaccept.prodofferaccept.util", "orderaccept.custom.Grid",
				"orderaccept.common.dialog.MessageBox","unieap.dialog.DialogUtil","orderaccept.common.js.ConstantsPool"],
		function(_Widget, _Templated, util, Grid, messageBox,dialogUtil,constantsPool) {

			dojo
					.declare(
							"orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget",
							[ _Widget, _Templated ],
							{
								templatePath : dojo.moduleUrl("orderaccept.prodofferaccept.widget.payrelation",
										"template/PayRelationTemplate.html"),
								/**
								 * 模板中是否使用widgets
								 * 
								 * @field
								 */
								widgetsInTemplate : true,
								serviceInfoList : null,
								accountRelationIndex : 0,
								showMainInfoFlag:false,
								widgetPane:null,
								
								/**
								 * action返回参数
								 * 
								 * @field
								 */
								parameters : null,
								/**
								 * 客户信息
								 * 
								 * @field
								 */
								custInfo : null,
								/**
								 * 新增账户列表
								 * 
								 * @field
								 */
								accountInfoList : [],
								serviceInfoListDatastore:null,
								loader:null,
								/**
								 * 支付关系列表
								 * 
								 * @field
								 */
								payRelationInfoList : null,
								oldPayRelationQueryingFlag:false,
								oldPayRelationDatastore:null,
								ifCanUse : null,
								constructor : function(args) {
									if (args) {
										this.custInfo = args.custInfo;
										this.loader = args.loader;
										this.widgetPane=args.widgetPane;
									}
								},
								postMixInProperties : function() {
									//urgle override unieap getTopWin method
									unieap.getTopWin = function() {
										return window;

									};
									var widget = this;
									//调用ria方法获取初始化数据
									unieap.Action.requestData({
										url : unieap.WEB_APP_NAME + "/payRelationAction.do?method=init&custId="
												+ this.custInfo.custId,
										parameters : {
											"synLoadStatistics" : true
										},
										sync : true,
										load : function(dc) {
											for ( var datastore in dc.getDataStores()) {
												dataCenter.addDataStore(dc.getDataStores()[datastore]);
											}
											widget.parameters = dc.parameters;
										}
									});
									dataCenter.addDataStore(new unieap.ds.DataStore('accountQueryProductIdColl', [ {
										CODEVALUE : '',
										CODENAME : '请输入号码后选择'
									} ]));
									dataCenter.addDataStore(new unieap.ds.DataStore('customerAcountQueryColl', [ {
										CODEVALUE : '1',
										CODENAME : '客户资料'
									},{
										CODEVALUE : '2',
										CODENAME : '服务号码'
									} ]));

									this.serviceInfoListDatastore = new unieap.ds.DataStore('serviceInfoListDatastore',[]);
									dataCenter.addDataStore(this.serviceInfoListDatastore);
									this.allServiceInfoListDatastore = new unieap.ds.DataStore('allServiceInfoListDatastore',[]);
									dataCenter.addDataStore(this.allServiceInfoListDatastore);
									//初始化账户列表数据源
									var accountInfoListDatastore= new unieap.ds.DataStore('accountInfoListDatastore', []);
									dataCenter.addDataStore(accountInfoListDatastore);
									if(this.ifShowOperate()){
										//添加添加行记录刷新表格账户信息事件
										dojo.connect(accountInfoListDatastore.getRowSet(), 'onAfterAddRow', orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.refreshGridAccountInfoAfterAddRow);
									}
								},
								initFLag:false,
								isNeedInit :function (){
									if(!this.initFlag){
										this.initFlag=true;
										return true;
									}else{
										return false;
									}
								},
								initNewAccountForm :function(newAccountForm){
										var accountInfo = {
											accoWay : '4-0',
											accountFee : '0.00',
											ifDefault : "1",
											operKind:"1",
											accountName : this.custInfo.custName
										};
										if (this.parameters && this.parameters.defaultAccountCount > 0) {
											accountInfo.ifDefault = "2";
											unieap.byId("ifDefault").setDisabled(true);
										}else{
											for(var accountVO in this.accountInfoList){
												if(accountVO.ifDefault=="1"){
													accountInfo.ifDefault = "2";
													unieap.byId("ifDefault").setDisabled(true);
													break;
												}
											}
										}
										unieap.byId("creditControl").setDisabled(true);
										unieap.byId("creditControl").setValue(1);
										var newAccountDatastore = new unieap.ds.DataStore('newAccountDatastore',[accountInfo]);
										newAccountForm.getBinding().bind(newAccountDatastore.getRowSet().getRow(0));
								},
								setNewAccountId :function(){
										unieap.byId("accountId").setValue(this.getAccountId());
								},
								initNewAccountInfo:function(newAccountForm){

									if(!this.accountInfoList){
										this.accountInfoList = [];
									}
									var accountInfo= this.getNewAccountInfoFormData(newAccountForm);
									this.accountInfoList.push(accountInfo);
									return accountInfo;
								},
								getNewAccountInfoFormData :function(newAccountForm){
									var form=null;
									if(newAccountForm){
										form=newAccountForm;
									}else{
										form=this.getNewAccountForm();
									}
									form.getHelper().apply();
									return accountInfo= newAccountForm.getHelper().collectData();
								},
								postCreate : function() {
									
									
									var newAccountForm = this.getNewAccountForm();
									
									//如果页面上有新建账户的form则进行下列事件赋值
									if(newAccountForm){
										//初始化新建账户form
										this.initNewAccountForm(newAccountForm);
										//初始化号码信息
										this.initServiceInfoList();
										//隐藏继承账户tab页
										this.hideInheritAccountPane();
										//为点击新建账户的div赋事件
										this.query(".showNewAccountTab").onclick = function(thisObj) {
											return function() {
												thisObj.hideInheritAccountPane();
											};
										}(this);
										//为点击继承账户的div赋事件
										this.queryById(".showInheritAccountTab").onclick = function(thisObj) {
											return function() {
												//ocs号码禁止继承账户
												if(thisObj.checkIfOcs() == true){					
	        										messageBox.alert({
														busiCode : "08410206"
													}, thisObj.queryById(".showInheritAccountTab"));
	        										return false;
												}
												thisObj.hideNewAccountPane();
											};
										}(this);

									}
									//初始化支付关系中的账户信息
									this.initAccountInfoGroup();
									//初始化支付关系中的号码信息
									this.initServiceInfoGroup();
									
									if(newAccountForm){
									//监控卡片上的服务号码的变化及属性变化事件，如果发生了变化会触发widget实例的refreshServiceInfo方法刷新支付关系信息
									var widget=this;
									dojo.subscribe("/buscard/serviceId/change", function(event) {
										if(event.srcElement.value){
											if(widget.loader){
												var serviceInfoList =widget.loader.getNewServiceInfoList(true);
												widget.refreshServiceInfo(serviceInfoList);

												widget.openWidgetPane();
											}
										}
					                });
									dojo.subscribe("/buscard/serviceId/propertychange", function(event) {
										if(event.srcElement.value){
											if(widget.loader){
												var serviceInfoList =widget.loader.getNewServiceInfoList(true);
												widget.refreshServiceInfo(serviceInfoList);

												widget.openWidgetPane();
											}
										}
					                });
									
									}

								},
								/**
								 * 根据客户编号查询账户信息
								 * 
								 */
								queryAccountInfo : function(custId, cityCode) {
									this.getInheritAccountListPane().setHref(
											unieap.WEB_APP_NAME
													+ "/payRelationAction.do?method=getAccountInfoList&customerId="
													+ custId + "&cityCode=" + cityCode);
								
								},

								/**
								 * 检测是否OCS用户
								 */
								checkIfOcs : function() {
				       				var mainOfferInfoVO = $ac$.get("selectedMainProdOfferInfoVO");
 									var paymentModeConst = ConstantsPool.load("PaymentModeConst").PaymentModeConst;	 
 									var ifOcs = false;
 									if(!!mainOfferInfoVO && mainOfferInfoVO.feeType == paymentModeConst.PREPAID){
 										ifOcs = true; 									
 									}
 									return ifOcs;
								},

								/**
								 * 隐藏新建账户tab
								 */
								hideNewAccountPane : function() {
									if (this.parameters && this.parameters.accountCount > 0) {
										if(!this.getInheritAccountListPane().href){
											this.queryAccountInfo(this.custInfo.custId, this.custInfo.cityCode);
										}
									}
									
									this.query(".showNewAccountTab").className = "showNewAccountTab test";
									this.query(".showInheritAccountTab").className = "showInheritAccountTab selected-header";
									unieap.byId("customerAcountQueryFlag").setValue(1);
									this.getInheritAccountPane().show();
									this.getNewAccountPane().hide();
								},
								/**
								 * 获取新建账户tab
								 */
								getNewAccountPane : function() {

									return this.newAccountPane = this.newAccountPane || unieap.byId("newAccountPane");
								},
								/**
								 * 获取继承账户tab
								 */
								getInheritAccountPane : function() {

									return this.inheriteAccountPane = this.inheriteAccountPane
											|| unieap.byId("inheritAccountPane");
								},
								/**
								 * 获取
								 */
								getInheritAccountListPane : function() { 

									return this.inheriteAccountListPane = this.inheriteAccountListPane
											|| unieap.byId("inheritAccountListPane");
								},
								/**
								 * 隐藏继承账户tab
								 */
								hideInheritAccountPane : function() {
									this.query(".showNewAccountTab").className = "showNewAccountTab selected-header";
									this.query(".showInheritAccountTab").className = "showInheritAccountTab test";
									this.getNewAccountPane().show();
									this.getInheritAccountPane().hide();
									// this.getInheritAccountPane().toggle();

								},
								/**
								 * 点击集成账户页查询账户信息按钮触发事件
								 */
								queryCustAccountInfo : function() {
									var customerAcountQueryFlag = unieap.byId("customerAcountQueryFlag");


									switch (customerAcountQueryFlag.getValue()) {
									case "1": {

										var firstNameQuery = unieap.byId("firstNameQuery").getValue();
										var identityKindQuery = unieap.byId("identityKindQuery").getValue();
										var identityCodeQuery = unieap.byId("identityCodeQuery").getValue();
										if(!firstNameQuery&&!identityCodeQuery){
											messageBox.alert({
												busiCode : "08410231"
											});
											return;
										}

										var pagePath = unieap.WEB_APP_NAME
												+ "/customerAcceptAction.do?method=getCustomerInfoList&custIdQuery="
												+ "" + "&firstNameQuery=" + firstNameQuery
												+ "&identityKindQuery=" + identityKindQuery + "&identityCodeQuery="
												+ identityCodeQuery + "&cityCode=" + unieap.byId("queryAccountCustomerCityCode").getValue();
										pagePath += "&operFlag=newInheritAccount";
										var widget=this;
										DialogUtil.showDialog ({url:pagePath,
											title:"查询客户信息",
											height:700,
											width:1000,
											dialogData:null,
											onComplete:function(returnValue){
												if(returnValue){
													widget.queryAccountInfo(returnValue.customerId,returnValue.cityCode);
												}
											},
											iconCloseComplete: true

										});
										
									}break;
									case "2": {

										var accountQueryServiceId = unieap.byId("accountQueryServiceId");
										var accountQueryProductId = unieap.byId("accountQueryProductId");
										if (!accountQueryServiceId.getValue()) {
											messageBox.alert({
												busiCode : "08410005"
											});
											accountQueryServiceId.focus();
											return;
										}

										this.getInheritAccountListPane().setHref(
												unieap.WEB_APP_NAME

												+ "/payRelationAction.do?method=getAccountInfoList&queryFlag=" + "2"
														+ "&phoneNumber=" + accountQueryServiceId.getValue()
														+ "&productId=" + accountQueryProductId.getValue()
														+ "&cityCode=" + unieap.byId("queryAccountServiceCityCode").getValue());
										this.clearQueryAccountInfo();

									}
										break;
									default: {
										messageBox.alert({
											busiCode : "08410006"
										});
									}
										;
										break;

									}

								},
								/**
								 * 清空查询出来的账户信息
								 */
								clearQueryAccountInfo : function() {
									var listAccountId = dojo.query("#listAccountId")[0];
									if (listAccountId) {

										listAccountId.value = "";
									}
									var listAccountName = dojo.query("#listAccountName")[0];
									if (listAccountName) {

										listAccountName.value = "";
									}
								},
								/**
								 * 继承账户tab，查询方式变更时调用
								 */
								customerAcountQueryFlagChange : function(value) {
									if(value.getValue){
										value=value.getValue();
									}
									switch (value) {
									case "1": {
										dojo.query("#custQueryFlag")[0].style.display = "";
										dojo.query("#serviceIdQueryFlag")[0].style.display = "none";
										break;
									}
									case "2": {
										dojo.query("#custQueryFlag")[0].style.display = "none";
										dojo.query("#serviceIdQueryFlag")[0].style.display = "";
										break;
									}
									default: {

										messageBox.alert({
											busiCode : "08410007"
										});
										return false;
										break;
									}

									}
								},
								/**
								 * 获取新建账户tab的账户数据
								 */
								getNewAccountInfoData : function() {
									var newAccountForm = this.getNewAccountForm();
									if (!newAccountForm.validate(true)) {
										return false;
									}
									var accountInfoList=this.accountInfoList;
									var accountInfo=this.getNewAccountInfoFormData(newAccountForm);
//									if(accountInfoList&&accountInfoList.length>0){
//										for(var index=0,length=accountInfoList.length;index<length;index++){
//											if((accountInfo.accountId==accountInfoList[index].accountId)){
//												accountInfoList[index]=accountInfo;
//											}
//										}
//									}

									this.setNewAccountId();
									var accountInfo= this.initNewAccountInfo(newAccountForm);

									return accountInfo;
								},
								/**
								 * 获取页面选中的服务号码列表的索引
								 */
								getCheckedServiceListIndex : function() {
									var serviceInfoList = this.serviceInfoList;
									if (serviceInfoList&&serviceInfoList.length>0) {
										var returnList=[];
										for ( var length = serviceInfoList.length, index = 0; index < length; index++) {
											returnList.push(serviceInfoList[index].serviceInfoIndex);
										}
										return returnList;
									} else {
										messageBox.alert({
											busiCode : "08410001"
										});
										return false;
									}
								},
								/**
								 * 获取页面选中的服务号码列表的索引
								 */
								getCheckedAccountListIndex : function() {
									var accountInfoCheckBoxGroup = this.getAccountInfoCheckBoxGroup();
									var checkedValueString = accountInfoCheckBoxGroup.getValue();
									if (checkedValueString) {
										var checkedAccountInfoIndex = checkedValueString.split(',');
										return checkedAccountInfoIndex;
									} else {
										return false;
									}
								},
								/**
								 * 生成一条支付关系信息
								 */
								createPayRelation : function(checkedServiceInfoListIndex, accountInfo) {

									var payRelationGrid = this.getPayRelationGrid();
									var payRelationGridBinding = payRelationGrid.getBinding();

									for ( var length = this.allServiceInfoList.length, index = 0; index < length; index++) {

										var checkedServiceInfo = this.allServiceInfoList[index];
										if(checkedServiceInfo.serviceOfferId==301){
											var count = payRelationGridBinding.getRowCount();

											var ifDefaultAcctId = this.payrelationDefaultChecked(payRelationGridBinding,checkedServiceInfo.serviceInfoIndex) ? 0 : 1;
											var data={
													serviceInfoIndex : index,
													serviceId : checkedServiceInfo.serviceId,
													productId : checkedServiceInfo.productId,
													operateKind:1,
													acctItemTypeGroupId : 0,
													paymentLimitType : 0,
													paymentLimit : 0,
													priority :((ifDefaultAcctId==1)?999:1) ,
													ifDefaultAcctId : ifDefaultAcctId
												};
											var checkedAccountListIndex = this.getCheckedAccountListIndex();
											if(checkedAccountListIndex){
												data.accountId=checkedAccountListIndex[checkedAccountListIndex.length-1];
											}
											payRelationGridBinding.insertRow(data, count);
										}

									}

								},
								payrelationDefaultChecked : function(payRelationGridBinding, serviceInfoIndex) {
									var dataList = payRelationGridBinding.getRowSet().getData();

									for ( var index = 0, length = dataList.length; index < length; index++) {
										if (dataList[index].ifDefaultAcctId == 1
												&& serviceInfoIndex == dataList[index].serviceInfoIndex) {
											return true;
										}
									}
									return false;
								},
						
								/**
								 * 用新帐户添加支付关系
								 * 
								 * @method
								 */
								addNewAccount : function() {
									var checkedServiceListIndex = this.getCheckedServiceListIndex();
									if (!checkedServiceListIndex) {
										return false;
									}
									var accountInfo=this.getNewAccountInfoData();
									if(accountInfo){
										this.addAccountInfoList(accountInfo);
										return accountInfo;
									}else{
										return false;
									}
								},
								/**
								 * 用已有帐户添加支付关系
								 * 
								 * @method
								 */
								addInherateAccount : function(paramAccountInfo) {
									var checkedServiceListIndex = this.getCheckedServiceListIndex();
									if (!checkedServiceListIndex) {
										return false;
									}
									var accountInfo = paramAccountInfo;
									accountInfo.operKind=2;
									if (!accountInfo.accountId) {
										messageBox.alert({
											busiCode : "08410002"
										});
										return false;
									}
									var hasFlag=false;
									for( var index =0,length=this.accountInfoList.length;index<length;index++){
										if(this.accountInfoList[index].accountId==accountInfo.accountId){
											accountInfo= this.accountInfoList[index];
											hasFlag=true;
											break;
										} 
									}
									
									if(!hasFlag){

										this.accountInfoList.push(accountInfo);
										this.addAccountInfoList(accountInfo);

										this.createPayRelation(this.getCheckedServiceListIndex(), accountInfo);
									}
									
									return accountInfo;
									
								},
								hasAccountInfo :function(accountInfo){
									var hasFlag=false;
									for( var index =0,length=this.accountInfoList.length;index<length;index++){
										if(this.accountInfoList[index].accountId==accountInfo.accountId){
											hasFlag=true;
											break;
										} 
									}
									return hasFlag;
								},
								/**
								 * 添加一条账户信息
								 * 
								 * @method
								 */
								addAccountInfoList : function(accountInfo) {
									if (!this.accountInfoList) {
										this.accountInfoList = [];
									}
									this.initAccountInfoGroup(accountInfo);
									var accountInfoCheckBoxGroup = this.getAccountInfoCheckBoxGroup();
									var allCheckBox = accountInfoCheckBoxGroup.getChildren();
									dojo.map(allCheckBox || [], function(checkBox) {
										checkBox.setChecked(true);
										checkBox.setDisabled(true);
									});
									var changeFlag=false;
									var payRelationGrid=this.getPayRelationGrid();
									var payRelationInfoList = payRelationGrid.getBinding().getRowSet().getData();
									this.payRelationInfoList=payRelationInfoList;
									
									for(var index=0,length=payRelationInfoList.length;index<length;index++){
										var data=payRelationInfoList[index];
										
										if(!data.accountId){
											data.accountId=accountInfo.accountId;
											changeFlag=true;
										}
									}
									if(changeFlag){
										payRelationGrid.getManager('ViewManager').refresh();
									}

								},
								ifShowOperate:function(){
									return true;
								},
								/**
								 * 初始化账户显示列表
								 * 
								 * @method
								 */
								initAccountInfoGroup : function(accountInfo) {
									var widget=this;

									var accountInfoCheckBoxGroup = this.getAccountInfoCheckBoxGroup();
									var accountInfoListDatastore=dataCenter.getDataStore("accountInfoListDatastore");
									var rowset = accountInfoListDatastore.getRowSet();
									
									if(widget&&widget.accountInfoList){
										//if(rowset.getRowCount()==1){
											//if(rowset.getRow(0).getData().CODEVALUE==null){
												accountInfoListDatastore.getRowSet().deleteAllRows();
											//}
										//}
										for(var index=0,length=widget.accountInfoList.length;index<length;index++){
											var accountInfo=widget.accountInfoList[index];
											rowset.addRow(
													{
														CODEVALUE : accountInfo.accountId,
														CODENAME : (accountInfo.accountName + "(" + (accountInfo.accountId)
																+ ")[" + (accountInfo.operKind == 1 ? "新建" : "继承") + "]"),
														operKind:accountInfo.operKind,
														_s : true
													});
										}
									}else{
										accountInfoListDatastore.getRowSet().deleteAllRows();
										accountInfoListDatastore.getRowSet().addRow(
												{
													CODEVALUE : null,
													CODENAME : "无账户信息，请点击确定按钮添加账户",
													_s : true
												});
									}
									var cloneAccountGroup=accountInfoListDatastore.clone();
									dojo.connect(cloneAccountGroup.getRowSet(), 'onAfterDeleteRow', orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.refreshAccountGroup);
									
									dojo.map(
													cloneAccountGroup
															.getRowSet()
															.getData()
															|| [],
													function(data,inRowIndex) {
															var stringBuilder=[];
															if(widget.ifShowOperate()&&(data.CODEVALUE&&data.operKind==1)){
																stringBuilder.push("<img style='cursor:hand;' src='");
																stringBuilder.push( unieap.WEB_APP_NAME + "/common/images/button/delete_button.png' " );
																stringBuilder.push( "onclick=\"orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.deleteAccountGroup(event,'");
																stringBuilder.push(data.CODEVALUE?data.CODEVALUE:"");
																stringBuilder.push("','"+inRowIndex + "')\" />");
															}
															stringBuilder.push("<A accountId='"+data.CODEVALUE);
															stringBuilder.push("'  onmouseover='orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.showAccountInfo(this);'");
															stringBuilder.push("'  onmouseout='orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.hideAccountInfo(this);'>");
															stringBuilder.push( data.CODENAME+ "</A>");
															data.CODENAME=stringBuilder.join("");
													});
									accountInfoCheckBoxGroup.getDataProvider().setDataStore(cloneAccountGroup);
									var allCheckBox = accountInfoCheckBoxGroup.getChildren();
									dojo.map(allCheckBox || [], function(checkBox) {
										checkBox.setChecked(true);
										checkBox.setDisabled(true);
										checkBox.setDisplay("none");
									});
								},
								/**
								 * 初始化号码信息显示列表
								 * 
								 * @method
								 */
								initServiceInfoGroup : function() {
									if(this.allServiceInfoList){
										var length=this.allServiceInfoList.length;
										var serviceInfoList=this.allServiceInfoList;
										var serviceInfoListData= [];
										if(length>0){
											for ( var index = 0; index <length; index++) {
												var operateName="";
												var serviceInfo=serviceInfoList[index];
												if(serviceInfo.serviceOfferId==301){
													operateName="[新增]";
												}else{
													operateName="[已有]";
												}
												
												serviceInfoListData.push({
													CODEVALUE : index,
													CODENAME :serviceInfo.serviceId+" "+ serviceInfo.productName+operateName,
													serviceId:serviceInfo.serviceId,
													productId:serviceInfo.productId,
													_s : true
												});
											}
										}else{
											serviceInfoListData.push({
												CODEVALUE : null,
												CODENAME :"无号码信息",
												_s : true
											});
										}
										
										var newServiceGroupDatastore = new unieap.ds.DataStore('serviceInfoGroupDatastore',serviceInfoListData);
										var serviceInfoCheckBoxGroup = this.getServiceInfoCheckBoxGroup();
										serviceInfoCheckBoxGroup.getDataProvider().setDataStore(newServiceGroupDatastore);
										var allCheckBox = serviceInfoCheckBoxGroup.getChildren();
										dojo.map(allCheckBox || [], function(checkBox) {
												checkBox.setChecked(true);
												checkBox.setDisabled(true);
												checkBox.setDisplay("none");
										});
									}

								},
								/**
								 * 用老账户添加支付关系
								 * 
								 * @method
								 */
								addInheritAccountPayRelation : function() {
									
									var accountInfo = this.addInherateAccount();
									if (accountInfo) {

										this.createPayRelation(this.getCheckedServiceListIndex(), accountInfo);
									}

								},

								/**
								 * 清空填写支付关系及账户信息
								 * 
								 * @method
								 */
								clearPayRelation : function() {
									var accountRelationGrid = this.getPayRelationGrid();
									var accountRelationGridBinding = accountRelationGrid.getBinding();
									accountRelationGridBinding.clear();

								},
								/**
								 * 获取支付关系表格组件
								 * 
								 * @method
								 */
								getPayRelationGrid : function() {
									var grid=(this.payRelationGrid = this.payRelationGrid
											|| orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.getPayRelationGrid());
									grid.parentWidget=this;
									return grid;
								},
								/**
								 * 获取支付关系表格组件
								 * 
								 * @method
								 */
								getServiceInfoCheckBoxGroup : function() {
									return this.serviceInfoCheckBoxGroup = this.serviceInfoCheckBoxGroup
											|| unieap.byId('serviceInfoCheckBoxGroup');
								},
								/**
								 * 获取支付关系表格组件
								 * 
								 * @method
								 */
								getAccountInfoCheckBoxGroup : function() {
									return this.accountInfoCheckBoxGroup = this.accountInfoCheckBoxGroup
											|| unieap.byId('accountInfoCheckBoxGroup');
								},
								/**
								 *获取支付关系储值金额号码组件
								 *@method
								 *@author liuzhongwei
								 */
								getDefaultProdInstId : function() {
									return this.defaultProdInstId = this.defaultProdInstId
											|| unieap.byId("defaultProdInstId");
								},
								/**
								 * 获取账户付费号码
								 * 
								 * @method
								 */
								getAccountTel : function() {
									return this.accountTel = this.accountTel
											|| unieap.byId('accountTel');
								},
								/**
								 * 获取新建账户的表单组件
								 * 
								 * @method
								 */
								getNewAccountForm : function() {

									return this.newAccountForm = this.newAccountForm || unieap.byId('newAccountForm');
								},

								/**
								 * 获取支付关系表格组件的视图管理器
								 * 
								 * @method
								 */
								getPayRelationGridViewManager : function() {
									return this.payRelationGridViewManager = this.payRelationGridViewManager
											|| this.getPayRelationGrid().getManager('ViewManager');
								},
								
								showMainInfo :function(){
									
									if(!this.showMainInfoFlag){
										this.hideDiv("payRelationMainDiv");
										this.showDiv("payRelationPromptDiv");
									}else{
										this.showDiv("payRelationMainDiv");
										this.hideDiv("payRelationPromptDiv");
									}
								},
								/**
								 * 初始化页面的号码信息及账户信息，及号码下拉框，并生成新增号码的支付关系数据
								 * 
								 * @method
								 */
								initServiceInfoList : function() {
									this.showMainInfo();
									if(this.serviceInfoList.length<=0){
										return;
									}
									
									this.initAccountInfoGroup(this.accountInfoList[0]);
									this.initServiceInfoGroup();
									
									this.refreshAccountTelList();
									this.refreshServiceInfoList();
									if(this.ifShowOperate()){
										var selectService=this.getCheckedServiceListIndex();
										orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.refreshGridAccountInfo();
										if(selectService){
											this.createPayRelation(selectService);
										}
									}
								},
								/**
								 * 刷新号码的数据
								 * @author liuzhongwei
								 * @method
								 */
								refreshServiceInfoList : function() {
									
									
									this.serviceInfoListDatastore.getRowSet().reset();
									this.allServiceInfoListDatastore.getRowSet().reset();
									
									for ( var index = 0, length = this.serviceInfoList.length; index < length; index++) {
										//过滤掉不能展现在储值号码中的
										if(this.needStoreMoneyProduct(this.serviceInfoList[index].productId)){
											var data = {};
											data.CODEVALUE = index;
											data.CODENAME = this.serviceInfoList[index].serviceId + ' '
													+ this.serviceInfoList[index].productName;
											this.serviceInfoListDatastore.getRowSet().addRow(data);
										}
									}
									for ( var index = 0, length = this.allServiceInfoList.length; index < length; index++) {
										var data = {};
										data.CODEVALUE = index;
										data.CODENAME = this.allServiceInfoList[index].serviceId + ' '
												+ this.allServiceInfoList[index].productName;
										this.allServiceInfoListDatastore.getRowSet().addRow(data);
									}
									var saveMoneyServiceId = this.getDefaultProdInstId();
									if(saveMoneyServiceId){
										saveMoneyServiceId.getDataProvider().setDataStore(this.serviceInfoListDatastore);
										saveMoneyServiceId.setSelectedIndex([ 0 ]);
										for ( var i = 0, length = this.serviceInfoList.length; i < length; i++) {
											if (this.serviceInfoList[i].netType == 8
													|| this.serviceInfoList[i].netType == 10) {
												saveMoneyServiceId.setSelectedIndex([ i ]);
												break;
											}
										}
									}
									unieap.transcode.clear("allServiceInfoListDatastore");
									unieap.byId("payRelationGrid").getManager('ViewManager').refresh();
									
								},
								/**
								 *获取支付关系储值金额号码对应的serviceId
								 *@method
								 *@author liuzhongwei
								 */
								getDefaultServiceId : function(indexValue) {
									return this.serviceInfoList[indexValue].serviceId;
								},
								/**
								 *获取支付关系储值金额号码对应的productId
								 *@method
								 *@author liuzhongwei
								 */
								getDefaultProductId : function(indexValue) {
									return this.serviceInfoList[indexValue].productId;
								},
								/**
								 * 对外接口，清空支付关系输入列表，刷新号码列表,入参格式如[{serviceId:'13304000111'……}]
								 */
								refreshServiceInfo : function(serviceInfoList) {
									//判断是否需要展示支付关系信息，如果没有新增号码则不展示
									this.showMainInfo();
									//根据传入的号码列表生成号码信息及存在的支付关系信息（调用queryExistsPayRelationInfo方法将存在的支付关系放入grid列表，并将关联的账户信息查询出来），并将新增的号码赋值给widget的serviceInfoList属性
									this.generateServiceInfoList(serviceInfoList);
									//如果没有查询出旧账户则初始化一条新建账户信息
									if(!this.accountInfoList||this.accountInfoList.length==0){

										this.setNewAccountId();
										this.initNewAccountInfo(this.getNewAccountForm());
									}
									//情空当前的支付关系grid
									this.clearPayRelation();
									//初始化页面的号码信息及账户信息，及号码下拉框，并生成新增号码的支付关系数据
									this.initServiceInfoList();
									//存在旧信息而且有新增号码时才展示旧支付关系
									if(this.oldPayRelationDatastore){
										if((this.serviceInfoList.length>0)){

											var payRelationGrid = this.getPayRelationGrid();
											var payRelationGridBinding = payRelationGrid.getBinding();
											var oldPayRelationList = this.oldPayRelationDatastore.getRowSet().getData();
											for ( var length = oldPayRelationList.length, index = 0; index < length; index++) {
												var serviceInfoIndex=this.getServiceInfoIndexByServiceId(oldPayRelationList[index]);
												if(serviceInfoIndex!==null){
													oldPayRelationList[index].serviceInfoIndex=serviceInfoIndex;
													payRelationGridBinding.getDataStore().getRowSet().addRow(oldPayRelationList[index]);
												}
											}
										}
									}
									

								},
								showDiv :function(divName){

									var object= dojo.byId(divName);
									if(null!=object){
										object.style.display="";
									}
								},
								hideDiv:function(divName){
									var object= dojo.byId(divName);
									if(null!=object){
										object.style.display="none";
									}
								},
								getServiceInfoIndexByServiceId:function(payrelationInfo){
									var allServiceInfoList=this.allServiceInfoList;
									if(allServiceInfoList&&allServiceInfoList.length>0&&payrelationInfo){
										for ( var length = allServiceInfoList.length, index = 0; index < length; index++) {
											var serviceInfo=allServiceInfoList[index];
											if((serviceInfo.serviceId==payrelationInfo.serviceId)&&(payrelationInfo.productId==serviceInfo.productId)){
												return index;
											}
										}
									}
									return null;
								},
								/**
								 * 根据传入的号码裂变生成号码信息及存在的支付关系信息
								 */
								generateServiceInfoList:function (serviceInfoList){
									var newServiceList=[];
									var oldServiceList=[];
									for(var index=0,length=serviceInfoList.length; index<length;index++){
										if(serviceInfoList[index].serviceOfferId&&serviceInfoList[index].serviceOfferId==301){
											newServiceList.push(serviceInfoList[index]);
										}else{
											oldServiceList.push(serviceInfoList[index]);
										}
									}
									for(var index=0,length=newServiceList.length; index<length;index++){
										newServiceList[index].serviceInfoIndex=index;
									}
									this.serviceInfoList = newServiceList;
									
									if(newServiceList.length>0){
										this.showMainInfoFlag=true;
									}else{
										this.showMainInfoFlag=false;
									}
									this.allServiceInfoList = serviceInfoList;
									this.queryExistsPayRelationInfo();
								},
								/**
								 * 查询已有支付关系
								 */
								queryExistsPayRelationInfo:function(){
									if(!this.showMainInfoFlag||this.oldPayRelationQueryingFlag){
										return;
									}
									this.oldPayRelationQueryingFlag=true;
									var widget=this;
									var dataList =BusCard.jsonPath($ac$.get("userHasProdOfferInfoList"),"$[*].prodInstList[?(@.prodFuncType==101)]");
									if(dataList&&dataList.length>0){
										var dc = new unieap.ds.DataCenter();
										var ds = new unieap.ds.DataStore("oldServiceInfoList");
										var dataset=ds.getRowSet();
										for ( var length = dataList.length, index = 0; index < length; index++) {
											var data={};
											data.accNbr=dataList[index].accNbr;
											data.prodInstId=dataList[index].prodInstId;
											data.cityCode=dataList[index].cityCode;
											data.productId=dataList[index].productId;
											dataset.addRow(data);
										}
										dc.addDataStore('oldServiceInfoList',ds);

										unieap.Action.requestData({
											url : unieap.WEB_APP_NAME + "/payRelationAction.do?method=getExistsPayRelationInfo",
											parameters : {
												synLoadStatistics : true
											},
											sync : true,
											load : function(dc) {
												widget.oldPayRelationDatastore=dataCenter.getDataStore("existsPayRelationList");
												var oldAccountInfoList=dataCenter.getDataStore("existsAccountInfoList");
												
												if(oldAccountInfoList){
													var dataList=oldAccountInfoList.getRowSet().getData();
													for ( var length = dataList.length, index = 0; index < length; index++) {
														
														var accountInfo=dataList[index];
														if(!widget.hasAccountInfo(accountInfo)){
															accountInfo.operKind=2; 
															widget.accountInfoList.push(accountInfo);
														}
														
													}
												}
											}
										},dc);
									
									}
								},
								/**
								 * 判断号码是否需要出现在储值号码或付款号码中
								 * */
								needStoreMoneyProduct:function(productId){
									if (productId) {
										var isCombProduct = function(productId) {
											return !!(BusCard
													.jsonPath(
															$ac$.selectedMainProdOfferInfoVO.offerProdRelaList,
															"$[*].combProductId") || [])
													.find(function(p) {
														return p == productId;
													});
										}(productId);
										if (isCombProduct) {
											return false;
										} else {
											return true;
										}
									} else {
										return false;
									}
								},
								/**
								 * 刷新账户付费电话列表
								 */
								refreshAccountTelList : function() {
									var accountTelColl = [];
									for ( var index = 0, length = this.serviceInfoList.length; index < length; index++) {
										
										//过滤掉不能展现在付款号码中的
										if(this.needStoreMoneyProduct(this.serviceInfoList[index].productId)){
											var accountTel = {};
											accountTel.CODEVALUE = this.serviceInfoList[index].serviceId;
											accountTel.CODENAME = this.serviceInfoList[index].serviceId;
											accountTelColl.push(accountTel);
										}
									}
									var accountTel = this.getAccountTel();
									if(accountTel){
										accountTel.getDataProvider().setDataStore(
												new unieap.ds.DataStore('accountTelColl', accountTelColl));
	
										accountTel.setSelectedIndex([ 0 ]);
									}

								},
								/**
								 * 将页面上的账户信息更新到相同账户编号的内存中的数据里
								 */
								refreshCurrenAccountInfo :function(){
									var newAccountForm = this.getNewAccountForm();

									newAccountForm.getHelper().apply();
									
									var accountObject=newAccountForm.getHelper().collectData();
									if(this.accountInfoList&&this.accountInfoList.length>0){
										for(var index=0,length=this.accountInfoList.length;index<length;index++){
											if(this.accountInfoList[index].accountId==accountObject.accountId ){
												if (!newAccountForm.validate(true)) {
													return false;
												}
												this.accountInfoList[index]=accountObject;
												return accountObject;
											}
										}
									}
									
								},
								openWidgetPane :function(){
									if(this.widgetPane){
										if(!this.widgetPane.open){
											this.widgetPane.toggle();
										}
										
									}
								},
								/**
								 * 对外接口,将支付关系数据返回，格式如{accountInfo:{accountId:123……},payRelationInfo:[{accountId:123,serviceId:'13304000111'……}]}
								 */
								getData : function() {
									//如果支付关系组件没有展开，则展开
									this.openWidgetPane();
									//如果符合条件的号码为空，则返回空对象
									if(this.serviceInfoList.length<=0){
										return {};
									}
									//将新建账户里信息同步到内存中的同账户编号的信息中
									if(false===this.refreshCurrenAccountInfo()){
										return false;
									}
									//通过支付关系grid中自带的校验方法校验数据
									var returnAccountData=[];
									var payRelationGrid = this.getPayRelationGrid();
									var newAccountInfoList=[];
									
									var binding=payRelationGrid.getBinding();
									if(!binding.validate(true)){
										return false;
									} 
									//收集新建的账户信息，并将储值号码信息更新到账户信息中
									for(var index=0,length=this.accountInfoList.length;index<length;index++){
										var accountInfo=this.accountInfoList[index];
										if(accountInfo.operKind==1){
											newAccountInfoList.push(accountInfo);
											accountInfo.defaultServiceId = this.getDefaultServiceId(accountInfo.defaultProdInstId);
											accountInfo.defaultProductId = this.getDefaultProductId(accountInfo.defaultProdInstId);
										}
									}
									//收集支付关系数据
									var returnPayRelation=[];
									var payRelationInfoList = payRelationGrid.getBinding().getRowSet().getData();
									this.payRelationInfoList=payRelationInfoList;
									for(var index=0,length=payRelationInfoList.length;index<length;index++){
										var data=payRelationInfoList[index];
										if(data.operateKind==1){
											returnPayRelation.push(data);
										}else{
											continue;
										}
										var serviceInfoData=this.allServiceInfoList[data.serviceInfoIndex];
										data.serviceId=serviceInfoData.serviceId;
										data.productId=serviceInfoData.productId;
										
										for(var accountIndex=newAccountInfoList.length-1;accountIndex>=0;accountIndex--){
											var newAccountData=newAccountInfoList[accountIndex];
											if(newAccountData&&(newAccountData.accountId==data.accountId)){
												returnAccountData.push(newAccountData);
												newAccountInfoList[accountIndex]= null;
												break;
											}
										}
									}
									//将账户信息和支付关系信息拼装为返回对象
									var returnData={
											accountInfo : returnAccountData,
											payRelationInfo : returnPayRelation
									};
									//进行返回数据的校验
									if (!this.doCheck(returnData)) {
										return false;
									}
									//返回数据
									return returnData;
								},
								/**
								 * 检测账户付费电话是否满足业务限制
								 */
								doCheckAccountTel:function(accountInfo,payRelationInfo){
									if(accountInfo){
										for(var index = 0,length= accountInfo.length;index<length;index++){
											var account=accountInfo[index];
											var hasDefaultPayRelationFlag=false;
											if(account.accountTel){
												if(payRelationInfo){
													
													for(var indexPayRelation = 0,lengthPayRelation= payRelationInfo.length;indexPayRelation<lengthPayRelation;indexPayRelation++){
														
														var payRelationVO=payRelationInfo[indexPayRelation];
														if( (payRelationVO.serviceId== account.accountTel)&&(payRelationVO.accountId==account.accountId)&&(1==payRelationVO.ifDefaultAcctId)){
															hasDefaultPayRelationFlag=true;
															break;
														}
													};
													
												}
												if(!hasDefaultPayRelationFlag){
													messageBox.alert({
														busiCode : "08410222",
														infoList : [account.accountName+"("+account.accountId+")",account.accountTel ]
													});
													return false;
												}
											}
										};
									}
									return true;
								},
								/**
								 * 检测本组件收集到的数据是否符合业务逻辑
								 */
								doCheck : function(returnData) {
									if(!this.doCheckAccountTel(returnData.accountInfo,returnData.payRelationInfo)){
										return false;
									}

									var uncheckServiceInfo = [];
									var relatedServiceInfo = [];
									for ( var index = 0, length = this.payRelationInfoList.length; index < length; index++) {
										if (this.payRelationInfoList[index].ifDefaultAcctId == 1) {
											relatedServiceInfo.push(this.payRelationInfoList[index].serviceInfoIndex);
										}

									}
									uncheckServiceInfo = dojo.filter(this.allServiceInfoList, function(item, index) {
										var flag = true;
										if(item.operKind!=1){
											return false;
										}
										for ( var i = 0, length = relatedServiceInfo.length; i < length; i++) {
											if (index == relatedServiceInfo[i]) {
												flag = false;
											}
										}
										return flag;
									});

									if (uncheckServiceInfo.length > 0) {
										var serviceStr = "";
										dojo.map(uncheckServiceInfo, function(item, index) {
											serviceStr += item.serviceId;
											if (index < uncheckServiceInfo.length - 1) {
												serviceStr += ",";
											}
										});

										messageBox.alert({
											busiCode : "08410004",
											infoList : [ serviceStr ]
										});
										return false;
									}
									return true;
								},
								/**
								 * 通过序列后台获取账户Id
								 */
								getAccountId : function() {

									var resultJson = this.getAjaxInfoWithParamString("prodOfferSaleAjaxAction",
											"getId", "&idName=accountId");
									return resultJson.message;
								},
								getAjaxInfoWithParamString : function(actionName, methodName, paramString) {
									var timestamp=new Date();
									var param = "method=" + methodName + paramString+"&timestamp="+timestamp;
									var resultJson = util.ServiceFactory.getService("url:" + actionName + ".do?"
											+ param,null,{method:"post"});
									return resultJson;
								},
								/**
								 * 储值方式变更
								 */
								accountAreaGradeChange : function(value) {
									var accountAreaGrade = unieap.byId("accountAreaGrade");
									if (!value) {
										accountAreaGrade.setSelectedIndex([ 0 ]);
									}
									value = accountAreaGrade.getValue();
									var payMethodName = this.queryById("payMethodName");
									if (value != "12") {

										if (payMethodName)
											payMethodName.style.display = "";

									} else {

										if (payMethodName)
											payMethodName.style.display = "none";
									}

								},
								/**
								 * 储值方式变更
								 */
								accoWayChange : function(value) {
									var accoWay = unieap.byId("accoWay");
									if (!value) {
										accoWay.setSelectedIndex([ 0 ]);
									}
									value = accoWay.getValue();
									var bankInfo1 = this.queryById("bankInfo1");
									var bankInfo2 = this.queryById("bankInfo2");
									
									if (value.split("-")[1] == 1) {

//										this.getObject("creditControl").setValue(0);
										this.getObject("accountFee").setValue(0);
										this.getObject("accountFee").setDisabled(true);

										// this.nkIdChange(unieap.byId("accoWay").getValue());
										if (bankInfo1) {
											bankInfo1.style.display = "";
											this.getObject("nkId").setRequired(true);
										}

										if (bankInfo2) {
											bankInfo2.style.display = "";
											this.nkIdChange(this.getObject("nkId").getValue());


											this.getObject("nkAccount").setRequired(true);
											this.getObject("nkCharge").setRequired(true);
										}
									} else {

//										this.getObject("creditControl").setValue(1);
										this.getObject("accountFee").setDisabled(false);
										// 取消银行信息区域的显示
										if (bankInfo1) {
											bankInfo1.style.display = "none";
											this.getObject("nkId").setRequired(false);
											this.getObject("nkId").setValue("");
											this.getObject("nkAccount").setValue("");
											this.getObject("countName").setValue("");
											this.getObject("belongCodeBC").setValue("");
										}
										if (bankInfo2) {
											bankInfo2.style.display = "none";

											this.getObject("nkAccount").setRequired(false);
											this.getObject("nkAccount").setValue("");
											this.getObject("nkCharge").setRequired(false);
											this.getObject("nkCharge").setValue("");
											this.getObject("reementNo").setValue("");
										}
									}

								},
								/**
								 * 银行下拉框变更
								 */
								nkIdChange : function(value) {

									var belongCodeBC = this.getObject("belongCodeBC");
									this.getBankChargeInfo(value, belongCodeBC.getValue());
								},
								/**
								 * 使用区域变更
								 */
								belongCodeBCChange : function(value) {

									var nkId = this.getObject("nkId");
									this.getBankChargeInfo(nkId.getValue(), value);

								},
								/**
								 * 动态刷新获取托收行信息
								 */
								getBankChargeInfo : function(nkIdValue, belongCodeBCValue) {

									var parameter = "&BankChargeId=nkCharge&BankId=" + (nkIdValue ? nkIdValue : "")
											+ "&belongCodeBC=" + (belongCodeBCValue ? belongCodeBCValue : "");
									// 根据银行编号和托收行使用区域取得托收行下拉框,对页面局部刷新
									var resultJson = this.getAjaxInfoWithParamString("payRelationAction",
											"getBankChargeQuery", parameter);
									var belongCodeBCDatastore = new unieap.ds.DataStore('belongCodeBC', resultJson);
									var nkCharge = this.getObject("nkCharge");
									nkCharge.getDataProvider().setDataStore(belongCodeBCDatastore);
									nkCharge.setSelectedIndex([ 0 ]);
								},
								queryById : function(name) {
									var object = dojo.query("#" + name, this.domNode);
									if (object || object.length > 0) {
										return object[0];
									}

								},
								query : function(name) {
									var object = dojo.query(name, this.domNode);
									if (object || object.length > 0) {
										return object[0];
									}

								},
								
								getObject : function(name) {
									return unieap.byId(name);

								},
								testSubmit : function() {
									var data = this.getData();
									if (data) {
										this.data=data;
										unieap.debug(this);
									}
								},
								/**
								 * 继承账户tab页服务号码改变触发事件
								 */
								accountQueryServiceIdChange : function(serviceId) {
									var serviceIdObject = unieap.byId("accountQueryServiceId");
									var accountQueryProductId = unieap.byId("accountQueryProductId");
									if (serviceId == "" || !serviceIdObject) {
										return;
									}
									var result = this.getAjaxInfoWithParamString("payRelationAction", "getProductList",
											"&serviceId=" + serviceId + "&ifValid=1"
											+ "&cityCode=" + unieap.byId("queryAccountServiceCityCode").getValue());
									var accountQueryProductIdDatastore = null;
									if (result) {
										accountQueryProductIdDatastore = new unieap.ds.DataStore(
												'accountQueryProductIdColl', result);

									} else {
										messageBox.alert({
											id : 3,
											infoList : [ serviceId ]
										});
										accountQueryProductIdDatastore = new unieap.ds.DataStore(
												'accountQueryProductIdColl', [ {
													CODEVALUE : '',
													CODENAME : '请输入号码后选择'
												} ]);
										serviceIdObject.setValue("");
										serviceIdObject.focus();
									}

									accountQueryProductId.getDataProvider()
											.setDataStore(accountQueryProductIdDatastore);
									accountQueryProductId.setSelectedIndex([ 0 ]);

								},
								/**
								 * 支付额度展示
								 */
								showPaymentFormat : function(value) {

									var paymentLimit = this.getObject("paymentLimit");
									var formatter = paymentLimit.getDisplayFormatter();
									var validator = paymentLimit.getValidator();
									// 根据支付额度类型，控制支付是否显示百分号，以及支付额度是否可输入，非空
									// var paymentValue =
									// this.getObject("paymentLimitType");
									if (value == '1') {
										paymentLimit.setDisabled(false);
										paymentLimit.setRequired(true);
										formatter.setFormat("##％");
										paymentLimit.setValue(0);
										paymentLimit.range.min = 0;
										paymentLimit.range.max = 100;
										validator.errorMsg = "请正确输入百分百0-100";
									} else if (value == '0') {
										formatter.setFormat("");
										paymentLimit.setValue(0);
										paymentLimit.setDisabled(true);
										paymentLimit.setRequired(false);
										paymentLimit.range.min = 0;
										paymentLimit.range.max = Infinity;
									} else {
										formatter.setFormat("");
										paymentLimit.setValue(0);
										paymentLimit.setDisabled(false);
										paymentLimit.setRequired(true);
										paymentLimit.range.min = 0;
										paymentLimit.range.max = Infinity;
										validator.errorMsg = "请输入数字";
									}
								},
								payRelationInfoOnfocus :function(){
								}
							});
			/**
			 * 支付关系列表中是否默认支付关系单选按钮的formatter，保证一个号码只有一个单选按钮可以被选中
			 */
			orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.ifDefaultFormatter = function(value,
					inRowIndex) {
				var widget = this;
				var editorClass = widget.editor.editorClass;
				var rs = this.grid.getBinding().getRowSet();
				var editorProps = widget.editor.editorProps || (widget.editor.editorProps = {});
				var radioProps = {
					checkedValue : "1",
					uncheckedValue : "0"
				};
				widget["radioProps"] = dojo.mixin(radioProps, editorProps);
				editorProps["disabled"] = true;
				widget["serial"] = "cell_" + unieap.getUnique();
				window[widget["serial"]] = widget;
				widget.checkLogic = function(evt, inRowIndex) {
					evt = dojo.fixEvent(evt);
					var checkValue = this["radioProps"]["checkedValue"], uncheckedValue = this["radioProps"]["uncheckedValue"];
					var rs = this.grid.getBinding().getRowSet();
					for ( var index = 0, length = this.grid.getBinding().getRowCount(); index < length; index++) {
						if (evt.srcElement.name
								&& evt.srcElement.name == this.radionamePrefix
										+ rs.getItemValue(index, "serviceInfoIndex")) {
							rs.setItemValue(index, this.name, uncheckedValue);
						}
					}
					rs.setItemValue(inRowIndex, this.name, checkValue);
					this["radioProps"]["onClick"] && this["radioProps"]["onClick"](inRowIndex, checkValue);
					this["radioProps"]["onChange"] && this["radioProps"]["onChange"](inRowIndex, checkValue);

				};

				if (this.enable == false)
					return value;
				var checked = " ";
				var radionamePrefix = "radio_payrelation_";
				var radioName = radionamePrefix + rs.getItemValue(inRowIndex, "serviceInfoIndex");

				widget.radionamePrefix = radionamePrefix;

				if (String(value) == String(widget["radioProps"]["checkedValue"])) {
					checked = " checked ";
					widget.checked = true;
				}

				var result = [ "<input tabindex=\"-1\" type=\"radio\" " ], marginTop = Math.floor((this.grid.managers
						.get("RowManager").defaultRowHeight - 14) / 2)
						+ "px";
				result.push("name='");
				result.push(radioName);
				result.push("'");
				result.push(" serviceInfoIndex='");
				result.push(rs.getItemValue(inRowIndex, "serviceInfoIndex"));
				result.push("' ");
				// ie8和firefox单选框不居中显示
				if (dojo.isIE > 7 || dojo.isFF) {
					result.push(" style=\"margin-top:");
					result.push(marginTop + "\"");
				}
				result.push(checked);
				result.push("onclick=\"");
				result.push("window['");
				result.push(widget.serial);
				result.push("'].checkLogic(event,");
				result.push(inRowIndex);
				result.push(")\"");
				result.push(">");
				return result.join("");

			};
			/**
			 * 点击支付关系grid的添加按钮触发的事件，会删除当前支付关系，如果为默认的支付关系则进制删除
			 */
			orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.deleteRow= function(evt, inRowIndex) {
				var grid=orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.getPayRelationGrid();
				var editMan=grid.getManager("EditManager");
				editMan.apply();
				var rowData=grid.getBinding().getRow(inRowIndex);
				if(rowData.ifDefaultAcctId&&rowData.ifDefaultAcctId==1){
					messageBox.alert({
						busiCode : "08410010"
					});
					return ;
				}else{
					grid.getBinding().deleteRow(inRowIndex);
				}
			};
			/**
			 * 获取支付关系grid
			 */
			orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.getPayRelationGrid=function(){
				return unieap.byId('payRelationGrid');
			};
			/**
			 * 点击支付关系grid的添加按钮触发的事件，会向grid中复制一条数据
			 */
			orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.addRow= function(evt, inRowIndex) {
				var grid=orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.getPayRelationGrid();
				var binding=grid.getBinding();
				var count = binding.getRowCount();
				var data=unieap.fromJson(unieap.toJson(binding.getRow(inRowIndex)));
				if(data.ifDefaultAcctId==1){
					data.ifDefaultAcctId=0;
				}
				data.acctItemTypeGroupId=null;
				data.paymentLimit=0;
				data.priority=null;
				data.paymentLimitType=null;
				binding.insertRow(data,count);
				var editMan=grid.getManager("EditManager");
				editMan.apply();
				editMan.setEdit(count,"acctItemTypeGroupId");
			};
			/**
			 * 点击支付关系信息里的删除账户按钮时触发的事件，
			 */
			orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.deleteAccountGroup= function(evt, value,index) {
				var accountInfoCheckBoxGroup= unieap.byId('accountInfoCheckBoxGroup');
				var accountGroupDataStore=accountInfoCheckBoxGroup.getDataProvider().getDataStore();
				if(value){
					accountGroupDataStore.getRowSet().forEach(function(row,index,rowset){
						if(row.getData()&&row.getData().CODEVALUE==value){
							rowset.deleteRow(index);
							return ;
						}
					});
					if( accountGroupDataStore.getRowSet().getRowCount()==0){
						accountGroupDataStore.getRowSet().addRow(
								{
									CODEVALUE : null,
									CODENAME : "无账户信息，请添加账户",
									_s : true
								});
					}
					accountInfoCheckBoxGroup.getDataProvider().setDataStore(accountGroupDataStore);
					var allCheckBox = accountInfoCheckBoxGroup.getChildren();
					dojo.map(allCheckBox || [], function(checkBox) {
						checkBox.setChecked(true);
						checkBox.setDisabled(true);
						checkBox.setDisplay("none");
					});
					var newAccountInfoList=[];
					var widget=orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.getWidget();
					if(widget&&widget.accountInfoList){
						for ( var i = 0, length = widget.accountInfoList.length; i < length; i++) {
							if (widget.accountInfoList[i].accountId!=value) {
								newAccountInfoList.push(widget.accountInfoList[i]);
							}
						}
						widget.accountInfoList=newAccountInfoList;
					}
				}
			};
			/**
			 * 支付关系信息里的账户信息的数据发生变化时触发的事件，用来更新支付关系grid里的账户列表
			 */
			orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.refreshGridAccountInfo= function(row, rowset) {
				var payRelationGrid=orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.getPayRelationGrid();
				var cell = payRelationGrid.getCell("accountId");
				cell.setEditor("unieap.form.ComboBox", {
					textValidate : true,
					dataProvider : {
						store : 'accountInfoListDatastore'
					},
					dataFilter : {
						searchAttr : [ 'CODENAME' ],
						spellAttr : 'py'
					},
					title : '账户信息',
					required : true,
					hasDefault : true,
					dojoAttachEvent:"onclick:payRelationInfoOnfocus}"
				});
				if(row){
					var changeFlag=false;
					var payRelationInfoList = payRelationGrid.getBinding().getRowSet().getData();
					for(var index=0,length=payRelationInfoList.length;index<length;index++){
						var data=payRelationInfoList[index];
						
						if(data.accountId&&data.accountId==row.getData().CODEVALUE){
							data.accountId=null;
							changeFlag=true;
						}
					}
					if(changeFlag){
						payRelationGrid.getManager('ViewManager').refresh();
					}
				}
				unieap.transcode.clear("accountInfoListDatastore");

			};
			/**
			 * 添加账户信息后用来更新支付关系grid里的账户列表
			 */
			orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.refreshGridAccountInfoAfterAddRow= function(row, rowset) {
				var payRelationGrid=orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.getPayRelationGrid();
				var cell = payRelationGrid.getCell("accountId");
				cell.setEditor("unieap.form.ComboBox",{textValidate:true,dataProvider:{store:'accountInfoListDatastore'},dataFilter:{searchAttr:['CODENAME'],spellAttr:'py'},title:'账户信息',required:true,hasDefault:true});
				
				unieap.transcode.clear("accountInfoListDatastore");

			};
			/**
			 * 支付关系信息里的账户信息的数据发生变化时(删除了账户信息)触发的事件，用来更新支付关系grid里的账户列表
			 */
			orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.refreshAccountGroup= function(row, rowset) {
				var accountInfoListDataset=dataCenter.getDataStore("accountInfoListDatastore").getRowSet();
				dojo.map(accountInfoListDataset.getData()|| [],
						function(data,index) {
							if(data&&data.CODEVALUE==row.getData().CODEVALUE){

								accountInfoListDataset.deleteRow(index);
							}
						});
				orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.refreshGridAccountInfo(row);
			};


			/**
			 * 支付关系删除按钮的formater,用来生产添加和删除按钮,并为添加删除按钮添加声明响应事件
			 */
			orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.deleteBottonFormatter = function(value,
					inRowIndex) {

				var widget = this;
				widget.name = this.name;
				widget.grid = this.grid;

				var data=unieap.fromJson(unieap.toJson(widget.grid.getBinding().getRow(inRowIndex)));
				if(data.operateKind==2){
					return "";
				}
				
				widget.serial = "cell_" + unieap.getUnique();

				window[widget.serial] = widget;

				widget.deleteRow = function(evt, inRowIndex) {
					this.grid.getBinding().deleteRow(inRowIndex);

				};
				widget.addRow = function(evt, inRowIndex) {
					this.grid.getBinding().deleteRow(inRowIndex);

				};
				var img = "<div align='center'><img style='cursor:hand;' src='"
					+ unieap.WEB_APP_NAME
					+ "/common/images/button/add_button.png' onclick=\"orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.addRow(event,'"
					+ inRowIndex
					+ "')\" />"
					+ "&#160<img style='cursor:hand;' src='"
					+ unieap.WEB_APP_NAME
					+ "/common/images/button/reduce_button.png' onclick=\"orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.deleteRow(event,'"
					+ inRowIndex + "')\" /></div>";
				return img;
			};
			/**
			 * 当鼠标移动到账户信息时浮动提示账户信息的简要信息
			 */
			orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.showAccountInfo = function(object) {
				var widget=orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.getWidget();
				widget.refreshCurrenAccountInfo();
				if(widget&&widget.accountInfoList){
					for(var index=0,length=widget.accountInfoList.length;index<length;index++){
						if(widget.accountInfoList[index].accountId==object.accountId){
							var stringBuilder=[];
							stringBuilder.push("账户编号："+widget.accountInfoList[index].accountId+" 账户名称："+widget.accountInfoList[index].accountName);
							if(widget.accountInfoList[index].accountFee!==undefined){
								stringBuilder.push(" 预存款(元)："+widget.accountInfoList[index].accountFee );
							}
							
							unieap.showTooltip({inner:stringBuilder.join(""),autoClose:true},object);
						}
					}
				}
				
			};
			
			/**
			 * 当鼠标移出账户信息时关闭浮动提示账户信息的简要信息
			 */
			orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.hideAccountInfo = function(object) {
				var widget=orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.getWidget();
				widget.refreshCurrenAccountInfo();
				if(widget&&widget.accountInfoList){
					for(var index=0,length=widget.accountInfoList.length;index<length;index++){
						if(widget.accountInfoList[index].accountId==object.accountId){
							unieap.hideTooltip(object);
						}
					}
				}
				
			};
			
			/**
			 * 全局获取支付关系widget对象
			 */
			orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.getWidget = function() {
				return unieap.byId("orderaccept_prodofferaccept_widget_payrelation_PayRelationWidget_0");
			};
			/**
			 * 如果是销售品变更的产品支付关系禁止修改
			 */
			orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.payRelationGridBeforeEdit = function(index,cell) {
				var returnFlag=true;
				var grid=orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget.getPayRelationGrid();
				var binding=grid.getBinding();
				if(binding){
					var data=binding.getRow(index);
					if(data&&data.operateKind==2){
						returnFlag=false;
					}
					
				}
				return returnFlag;
			};
		});
