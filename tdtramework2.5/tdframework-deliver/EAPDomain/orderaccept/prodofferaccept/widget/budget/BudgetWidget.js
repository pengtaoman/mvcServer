/**
 * 此模块放置预算列表
 * 
 * @module
 */
defineModule("orderaccept.prodofferaccept.widget.budget.BudgetWidget", ["orderaccept.prodofferaccept.util",
                "orderaccept.custom._BaseWidget", "orderaccept.custom._BusCardTemplated", "dijit._Container",
                "orderaccept.common.js.ConstantsPool","unieap.layout.Container"],
        function(util, _Widget, _Templated, _Container, ConstantsPool) {
	        
	        dojo.declare("orderaccept.prodofferaccept.widget.budget.BudgetWidget", [_Widget, _Templated, _Container], {
		                
		                templatePath : dojo.moduleUrl("orderaccept.prodofferaccept.widget.budget",
		                        "template/budgetPage.html"),
		                
		                /**
						 * 客户订单号
						 */
		                custOrderId : null,
		                
		                batchRegNo : null,
		                
		                batchBudgetAcceptInfo : null,
		                
		               	batchBudget : -1,
		                
		                constructor : function(data) {
			                this.custOrderId = data.custOrderId;
			                this.batchRegNo = data.batchRegNo;
			                this.batchBudgetAcceptInfo = data.batchBudgetAcceptInfo;
			                if(!!data.batchBudgetAcceptInfo){
			                	this.batchBudget = data.batchBudgetAcceptInfo.batchBudget;
			                }
		                },
		                postMixInProperties : function() {
			                this.budgetData = this.getBudgetData();
		                },
		                postCreate : function() {
			                this.gridContainer = dojo.query(".budget-grid", this.domNode)[0];
			                // 1.初始化表格
			                this.initBudgetView();
			               //	this.initGridCard();
			                // 2.初始化页面控件
			                this._init_sub_page();
			                
			                // 3.初始化优惠时的员工权限信息
			                this.initPerferSession();
			                
		                },
		                initBudgetView : function(){
		               		var container = this.gridContainer;
		               		var budgetContainer = new unieap.layout.Container({
									id : "budgetContainer"
								});
							dojo.place(budgetContainer.domNode,container,"last");
							//预算列表
		    				var gridCardContainer = new unieap.layout.Container({
									id : "gridCardContainer"
								});
	        				dojo.place(gridCardContainer.domNode,budgetContainer.containerNode,"last");
	        				//总计金额
							var totalAmount = 0;
							var data = this.budgetData;
							for(var i = 0,j = data.length; i < j; i++){
								totalAmount += parseFloat(data[i].actualAmount.toString());
							}
							var totalAmountView = "<div class='totalAmount-class' id='totalAmountView'>\u5408\u8ba1："+this.fmoney(totalAmount,2)+"\u5143</div>";
	        				dojo.place(totalAmountView,budgetContainer.containerNode,"last");
	        				this.initGridCard(gridCardContainer.domNode,dojo.query(".totalAmount-class",this.domNode)[0]);
   						},
   						fmoney : function(s, n){//保留两位小数s:value,n:小数位数      
						    n = n > 0 && n <= 20 ? n : 2;   
						    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
						    /*
						    var l = s.split(".")[0].split("").reverse(),   
						    r = s.split(".")[1];   
						    t = "";   
						    for(i = 0; i < l.length; i ++ )   
						    {   
						    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
						    }  
						    return t.split("").reverse().join("") + "." + r;   
						    */
						    return s;
						}, 
		                initGridCard : function(gridCardContainer,totalAmountContainer) {
			                var card = BusCard.createInstance({
				                        gridData : this.budgetData,
				                        totalAmountContainer : totalAmountContainer
			                        }, gridCardContainer, {
				                        gType : 3,
				                        fromURL : true,
				                        url : "/buscardapp/protocol/xml/card_pi_budget.xml"
			                        });
			                card.init(function() {
				                        // this.dom.parentNode.style.height
										// =
										// (this.dom.parentNode.offsetHeight
										// + 60)+"px";
				                        
			                        });
			                return card;
		                },
		                initTotalAmount : function() {
		                	var data = this.budgetData;
		                	var totalAmount = 0;
		                	for(var i = 0, j = data.length; i < j; i++){
		                		totalAmount += parseFloat(data[i].actualAmount.replace(/[^\d\.-]/g, ""));
		                	}
		                	var totalAmountDom = document.createElement("div");
							totalAmountDom.className = "totalAmountName";
							totalAmountDom.id = "totalAmount";
							this.gridContainer.appendChild(totalAmountDom);
		                },
		                getBudgetData : function() {
			                var to_string = Object.prototype.toString;
			                /*
			                var accessProdItemList = null;
			                if(!!this.batchBudgetAcceptInfo){
			                	accessProdItemList = this.batchBudgetAcceptInfo.accessProdItemList;
			                }*/
			                var param = {
				                custOrderId : parseInt(this.custOrderId),
				                orderAlterId : $ac$.get("orderAlterId") ? $ac$.get("orderAlterId") : 0,
				                orderChangeFlag : !!$ac$.get('orderChangeFlag') ? $ac$.get('orderChangeFlag') : -1,
				                batchRegNo : this.batchRegNo,
				                batchBudget : this.batchBudget
			                };
			                var otherFeeList = [];
			                var selectedMemberProdOfferList = $ac$.get("selectedMemberProdOfferList");
			                if(!!selectedMemberProdOfferList){
			                	var userIdStr = [];
			                	var acctId = "";
			                	var cityCode = "";
	                			var state = ConstantsPool.load("StaticTypeConst").StaticTypeConst.PROD_INST_ACCT_STATE_1000;
				                var PROD_QUIT = ConstantsPool.load("ServiceOfferIDConst").ServiceOfferIDConst.PROD_QUIT;
				                dojo.forEach(selectedMemberProdOfferList,function(prodOfferInfo){
				                	if(prodOfferInfo.action == "quit"){
				                		var serviceRelation = !!prodOfferInfo.prodInstVO?prodOfferInfo.prodInstVO.serviceRelationVO:null;
				                		if(!!serviceRelation){
				                			//userIdStr = 
				                			userIdStr.push(serviceRelation.userId)
				                			cityCode = serviceRelation.cityCode;
				                			if(acctId == ""){
					                			acctId = BusCard.$remote("prodInstAcctBO").getProdInstAcct({
						                						"state" : state,
						                						"cityCode" : serviceRelation.cityCode,
						                						"prodInstId" : serviceRelation.userId,
						                						"ifOperate" : true
					                						});
				                			}
				                		}
				                	}
				                });
				                if(userIdStr.length > 0){
		                			var response = BusCard.$remote("acctBalanceInfoCaller").execute({
				                						"useMode" : 6,
				                						"objectType" : 3,
				                						"objectValue" : acctId,
				                						"cityCode":cityCode,
				                						"deviceNo" : "",
				                						"serviceKind" : 0,
				                						"servIdGroup" : userIdStr
			                						});
			                		if(!!response &&　!!response.acctBalancBundleGroup){
				                		dojo.forEach(response.acctBalancBundleGroup,function(acctBalancBundleGroup){
			                				var acctItemTypeId = BusCard.$remote("feeMgrFacadeBO").queryPayWayByKind(acctBalancBundleGroup.paymentMethod);
				                			var budgetParamVO = {
				                				"amount" : acctBalancBundleGroup.balance/100.0,
				                				"acctItemTypeId" : acctItemTypeId,
				                				"userId" : acctBalancBundleGroup.servId
				                			}
				                			otherFeeList.push(budgetParamVO);
				                			BusCard.$remote("prodOfferSaleDataBO").doInsertBusFeeBill(response.acctBalancBundleGroup,param.custOrderId,PROD_QUIT,acctId);
				                		});
			                		}
				                }
			                }
			                dojo.mixin(param,{"otherFeeList":otherFeeList});
			                if(this.batchBudget == 1){
			                	var budgetFunction = "/budgetComponentAction.do?method=doBatchBudgetforShow";
			                }else{
			                	var budgetFunction = "/budgetComponentAction.do?method=doBudget";
			                }
			                var budgetData = BusCard.util.doPost(BusCard.path.contextPath
			                                + budgetFunction, param, false, null, null,
			                        true);
			                if(budgetData.checkFeeAll != null){
			                	$ac$.set("errorFlag",-1);
			                	alert(budgetData.checkFeeAll.message);
			                }
			                if(budgetData.error != null){
			                	$ac$.set("errorFlag",-1);
				                alert(budgetData.error.message);
			                }
			                this.initData(budgetData.dataList, param);
					        return budgetData.dataList;
			                /*
			                var typeDesc = to_string.apply(budgetData.dataList, []);
			                if (typeDesc.indexOf("Object") >= 0) {
				                throw new Error(budgetData.message);
			                } else if (typeDesc.indexOf("Array") >= 0) {
				                this.initData(budgetData, param);
				                return budgetData;
			                }*/
			                
		                },
		                initData : function(budgetParamList, param) {
			                dojo.getObject("_budget_._temp_._data_", true);
			                _budget_._temp_._data_ = budgetParamList;
			                dojo.global.$appContext$.set("_budgetParamList_", budgetParamList);
			                dojo.global.$appContext$.set("_custOrderId_", param.custOrderId);
		                },
		                /**
						 * 获取费用信息的提交数据
						 */
		                getFeeConfirmData : function() {
			                var authWorkNo = "";
			                try {
				                authWorkNo = dojo.global.$appContext$.get("_authWorkNo_");
			                }
			                catch (e) {}
			                	var budgetParamList = dojo.global.$appContext$.get("_budgetParamList_");
			                	/*
			                	for(var i = 0; i < budgetParamList.length;i++){
			                		budgetParamList[i].actualAmount = parseFloat(budgetParamList[i].actualAmount.replace(/[^\d\.-]/g, ""));
									budgetParamList[i].manualFavourValue = parseFloat(budgetParamList[i].manualFavourValue.replace(/[^\d\.-]/g, ""));
									budgetParamList[i].favourValue = parseFloat(budgetParamList[i].favourValue.replace(/[^\d\.-]/g, ""));
									budgetParamList[i].amount = parseFloat(budgetParamList[i].amount.replace(/[^\d\.-]/g, ""));
			                	}*/
			                	if(!!dojo.global.$appContext$.get("_custOrderId_")){
			                		
			                	}
			                return {
				                authWorkNo : authWorkNo,
				                batchBudget : this.batchBudget,
				                batchRegNo : this.batchRegNo,
				                orderAlterId : $ac$.get("orderAlterId") ? $ac$.get("orderAlterId") : 0,
				                orderChangeFlag : !!$ac$.get('orderChangeFlag') ? $ac$.get('orderChangeFlag') : -1,
				                custOrderId : !!dojo.global.$appContext$.get("_custOrderId_") ? parseInt(dojo.global.$appContext$.get("_custOrderId_").toString()) : 0,
				                budgetParamList : budgetParamList
			                };
		                },
		                _init_sub_page : function() {
		                	if($ac$.get("errorFlag") == -1){
		                		dojo.global.$appContext$.set("_budgetcomputeAmountFlag_", false);
				                dojo.query(".fee-modify-class", this.domNode)[0].disabled = true;
				                dojo.query(".fee-confirm-class", this.domNode)[0].disabled = true;
		                	}else{
		                		var budgetComponent = this;
				                // 如果没有费用 费用调整和费用确认置灰
				                if (budgetComponent.computeAmount() == 0) {
					                // 供外部按钮设置使用
					                dojo.global.$appContext$.set("_budgetcomputeAmountFlag_", true);
					                dojo.query(".fee-modify-class", this.domNode)[0].disabled = true;
					                dojo.query(".fee-confirm-class", this.domNode)[0].disabled = true;
				                }
				                //如果没有可以修改的费用项，则也不可以修改
				                if(!budgetComponent._checkIfModify()){
				                	dojo.global.$appContext$.set("_budgetcomputeAmountFlag_", true);
				                	dojo.query(".fee-modify-class", this.domNode)[0].disabled = true;
					                dojo.query(".fee-confirm-class", this.domNode)[0].disabled = true;
				                }
		                	}
		                },
		                /**
		                 * 检测是否可以修改
		                 */
		                _checkIfModify : function(){
		                	var budgetComponent = this;
		                	var flag = false;
		                	var _data_ = budgetComponent.budgetData;
							if (_data_.length > 0) {
								for (var i = 0; i < _data_.length; i++) {
									if(_data_[i].ifModify == 0){
										flag = true;
										break;
									}
								}
							}
							return flag;
		                },
		                computeAmount : function() {
			                var data = dojo.global.$appContext$.get("_budgetParamList_");
			                var should_pay_value = 0;
			                if (data.length > 0) {
				                for (var i = 0; i < data.length; i++) {
					                should_pay_value += parseInt(data[i].amount.toString());
				                }
			                }
			                return should_pay_value;
		                },
		                initPerferSession : function() {
			                var budgetComponent = this;
			                var session = BusCard.util.doGet(BusCard.path.contextPath + "/budgetComponentAction.do", {
				                        method : 'getSessionInfo'
			                        });
			                var account = session.workno;
			                var pwd = session.pwd;
			                if (BusCard.util.trim(account) && BusCard.util.trim(pwd)) {
				                var result = BusCard.util.doPost(BusCard.path.contextPath + "/budgetComponentAction.do?method=feeModifyAuth",
				                        {
					                        account : account,
					                        pwd : pwd,
					                        pwdflag : "1"
				                        });
				                if (result.flag == "-1") {
				                	// 供外部按钮设置使用
					                dojo.global.$appContext$.set("_budgetcomputeAmountFlag_", true);
					                dojo.query(".fee-modify-class", this.domNode)[0].disabled = true;
					                dojo.query(".fee-confirm-class", this.domNode)[0].disabled = true;
//					                budgetComponent.setButton();
					                return false;
				                } else {
					                budgetComponent.unlock(this.gridContainer);
					                dojo.global.$appContext$.set("_authWorkNo_", account);
					                budgetComponent.setButton();
				                }
			                }
		                },
		                setButton : function() {

		                },
		                unlock : function(gridContainer) {
			                BusCard.util.each(gridContainer.getElementsByTagName("INPUT"), function(dom) {
				                        // 0表示可以修改
				   //                     var name = dom.getAttribute("name");
				                        var ifModify = dom.getAttribute("ifModify");
				                        if (ifModify != null && dom.ifModify == '0') {
											dom.disabled = false;
										}
				                        /*
				                        if (name == 'manualFavourValue' && ifModify == '0') {
					                        dom.disabled = false;
				                        }*/
			                        });
		                },
		                lock : function() {
			                BusCard.util.each(this.gridContainer.getElementsByTagName("INPUT"), function(dom) {
				                        var ifModify = dom.getAttribute("ifModify");
				                        if (ifModify != null) {
											dom.disabled = true;
										}
			                        });
		                },
		                
		                computeShouldPayValue : function() {
			                var data = dojo.global.$appContext$.get("_budgetParamList_");
			                var should_pay_value = 0;
			                if (data.length > 0) {
				                for (var i = 0; i < data.length; i++) {
					                should_pay_value += parseFloat(data[i].actualAmount.toString());
				                }
			                }
			                return should_pay_value;
		                }
		                
	                });
	        
        });