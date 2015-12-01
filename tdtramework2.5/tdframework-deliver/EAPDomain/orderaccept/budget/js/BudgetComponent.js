var BudgetComponent = (function() {
	var constants = {
		SHOULD_PAY : 'should_pay',
		HAVE_PAY : "have_pay",
		PAY_INFO_CONTAINER : 'payInfoContainer',
		PAY_INFO_REGION : 'payInfoRegion',
		PAY_MODE : 'pay_mode',
		DIBS_PAY : 'dibs_pay',
		chargeBtn : 'chargeBtn',
		printBtn : 'printBtn',
		submitBtn : 'submitBtn'
	};
	
	var webPath = function(){
		return BusCard.path.contextPath;
	};

	var currentBudgetGridCard = null;
	/**
	 * 获取预算数据
	 * 
	 * @method
	 */
	var getData = function() {
		var budgetParam = window._budget_._temp_._budgetParam_;
		var orderChangeFlag = _budget_._temp_._budgetParam_.orderChangeFlag;
		if (orderChangeFlag)
			orderChangeFlag = parseInt(orderChangeFlag.toString());
		else
			orderChangeFlag = -1;
		var authWorkNo = "";
		try {
			authWorkNo = window.ordermgr.budget.auth.authWorkNo;
		}
		catch (e) {}
		var budgetParamList = window._budget_._temp_._data_;
		return {
			authWorkNo : authWorkNo,
			orderChangeFlag : orderChangeFlag,
			custOrderId : parseInt(_budget_._temp_._custOrderId_.toString()),
			budgetParamList : budgetParamList
		};
	};
	/**
	 * 根据预算的账目信息创建特殊全局变量
	 * 
	 * @private
	 * @method
	 */
	var initData = function(budgetParamList, param) {
		BusCard.Namespace.create("_budget_._temp_._data_");
		BusCard.Namespace.create("_budget_._temp_._custOrderId_");
		BusCard.Namespace.create("_budget_._temp_._jsonData_");
		if (_budget_._temp_._budgetParam_ == null) {
			_budget_._temp_._budgetParam_ = param;
		}
		_budget_._temp_._data_ = budgetParamList;
		_budget_._temp_._jsonData_ = BusCard.util.toJson(budgetParamList);
		_budget_._temp_._custOrderId_ = param.custOrderId;
	};

	/* 给按钮增加事件 */
	var initEvent = function() {
		var chargeBtn = BusCard.util.$(constants.chargeBtn);
		var printBtn = BusCard.util.$(constants.printBtn);
		var submitBtn = BusCard.util.$(constants.submitBtn);
		if (printBtn) printBtn.onclick = function() {// 打印
			doPrint();
		};
		if (submitBtn) submitBtn.onclick = function() {// 提交
			doSubmit();
		};
		if (chargeBtn) chargeBtn.onclick = function() {// 缴费
			doCharge();
		};
	};
	/*
	 * 初始化优惠时的员工权限信息
	 */
	var initPerferSession = function(gridContainer) {
		var session = BusCard.util.doGet(webPath() + "/budgetComponentAction.do", {
					method : 'getSessionInfo'
				});
		var account = session.workno;
		var pwd = session.pwd;
		if (BusCard.util.trim(account) && BusCard.util.trim(pwd)) {
			var result = BusCard.util.doPost(webPath() + "/budgetComponentAction.do?method=feeModifyAuth", {
						account : account,
						pwd : pwd
					});
			if (result.flag == "-1") {
				return false;
			}
			else {
				unlock(gridContainer);
				BusCard.Namespace.create("ordermgr.budget.auth");
				ordermgr.budget.auth.authWorkNo = account;
			}
		} 
	};

	/*
	 * 缴费事件
	 */
	var doCharge = function() {
		var custOrderId = _budget_._temp_._custOrderId_.toString();
		if (opener && opener.parent.top) {
			opener.parent.top.top_page.MenuBar.activeTopMenuById('System84', '842', '842AA', "custOrderId=" + custOrderId);
			// opener.close();
			window.close();
			return;
		}
		if (parent.top) {
			parent.top.top_page.MenuBar.activeTopMenuById('System84', '842', '842AA', "custOrderId=" + custOrderId);
			return;
		}
	};

	/**
	 * 打印事件
	 */
	var doPrint = function() {
		var custOrderId = _budget_._temp_._custOrderId_.toString();
		var pagePath = webPath() + "/printAction.do?method=doPrintInit";
		var formElem = document.createElement("form");
		formElem.method = "post";
		formElem.action = pagePath;
		var custOrderIdElem = document.createElement("INPUT");
		custOrderIdElem.type = "hidden";
		custOrderIdElem.name = "custOrderId";
		custOrderIdElem.value = custOrderId;
		var billKindElem = document.createElement("INPUT");
		billKindElem.type = "hidden";
		billKindElem.name = "billKind";
		billKindElem.value = "3";
		var budgetParamListElem = document.createElement("INPUT");
		budgetParamListElem.type = "hidden";
		budgetParamListElem.name = "_feeInfo";
		budgetParamListElem.value = BusCard.util.toJson(BudgetComponent.getData().budgetParamList);
		formElem.appendChild(custOrderIdElem);
		formElem.appendChild(billKindElem);
		formElem.appendChild(budgetParamListElem);
		document.body.appendChild(formElem);
		window.open("", "orderPrint", "height=700,width=1000,status=no,scrollbars=yes,toolbar=no,menubar=no,location=no,top=10,left=10");
		formElem.target = "orderPrint";
		formElem.submit();
	};

	/**
	 * 提交事件
	 */
	var doSubmit = function() {
		BusCard.util.$(constants.submitBtn).disabled = "true";
		var resultJsonStr = BusCard.util.doPost(webPath() + "/orderDetailAction.do?method=doCompleteOrder", BudgetComponent.getData(), false, null,
				null, true);
		var result = resultJsonStr;
		if (result.flag < 0) {
			alert(result.message);
			BusCard.util.$(constants.submitBtn).disabled = "";
			return false;
		}
		alert("提交成功，客户订单编号为：" + result.message);
		var data = window._budget_._temp_._data_;
		var should_pay_value = 0;
		if (data.length > 0) {
			for (var i = 0; i < data.length; i++) {
				should_pay_value += parseInt(data[i].amount.toString()) - parseInt(data[i].favourValue.toString());// 取了应收费 不会取实收
			}
		}
		if (window.opener.saveCustOrderId) {
			window.opener.saveCustOrderId("");
		}
		if (should_pay_value == 0) {
			alert("没有产生费用将关闭当前窗口。");
			window.close();
		}
		else {
			BusCard.util.$(constants.chargeBtn).disabled = "";
		}
		return true;
	};

	var budgetContainerWrapperHTML = "<div class='block_div' style='width:100%'>\
			<table width='100%' cellpadding='0' cellspacing='0' border='0'>\
		<tr>\
			<td class='content_title'>\u8d39\u7528\u4fe1\u606f</td>\
		</tr>\
		<tr>\
			<td class='content_td'>\
			<div id='gridContainer' style='width: 100%;' class='budget-grid'></div>\
           <div style='position:relative;width:100%'>\
				<input type='button' id='feeModifyBtn' class='budget-feemodify-button' value='\u8d39\u7528\u8c03\u6574'/>\
				<div class='fee-modify-auth-page' id='feeModifyAuthPage' style='margin-top: 10px;text-align:center'>\
					<div class='budget-fee-modify-item'>\
						<label>\
							\u6388\u6743\u5de5\u53f7\
							<span style='color: red'>*</span>\
						</label>\
					</div>\
					<div class='budget-fee-modify-item'>\
						<input type='text' id='feeModifyAuth' name='feeModifyAuth'>\
					</div>\
					<div class='budget-fee-modify-item'>\
						<label>\
							\u5bc6\u7801\
							<span style='color: red'>*</span>\
						</label>\
					</div>\
					<div class='budget-fee-modify-item'>\
						<input type='password' id='feeModifyPassword' name='feeModifyPassword'>\
					</div>\
					<div style='margin-top: 10px;text-align:center'>\
						<div class='budget-fee-modify-item'>\
							<input type='button' id='budget-auth-btn' class='budget-auth-page-btn' value='\u9a8c\u8bc1\u6388\u6743'/>\
						</div>\
						<div id='budget-auth-close-btn' class='budget-fee-modify-item'>\
							<input type='button' class='budget-auth-page-btn' value='\u5173\u95ed'/>\
							</label>\
						</div>\
					</div>\
				</div>\
			</div>\
			</td>\
			</tr>\
			</table>\
		</div>"; 

	 var unlock = function(gridContainer) {
			BusCard.util.each(gridContainer.getElementsByTagName("INPUT"), function(dom) {
						// 0表示可以修改
						if (dom.ifModify != null && dom.ifModify == '0') {
							dom.disabled = false;
						}
					});
		};	
	var _init_sub_page = function(dom, gridContainer) {
		var $dom = function(id) {
			return BusCard.util.$(id, dom);
		};
	
		$dom("feeModifyBtn").onclick = function() {
			$dom("feeModifyAuthPage").style.display = "block";
			$dom("feeModifyAuthPage").parentNode.style.zIndex = 10;
		}
		$dom("budget-auth-close-btn").onclick = function() {
			$dom("feeModifyAuthPage").style.display = "none";
			$dom("feeModifyAuthPage").parentNode.style.zIndex = 0;
		}
		$dom("budget-auth-btn").onclick = function() {
			var account = $dom("feeModifyAuth").value;
			var pwd = $dom("feeModifyPassword").value;
			if (BusCard.util.trim(account) && BusCard.util.trim(pwd)) {
				var result = BusCard.util.doPost(webPath() + "/budgetComponentAction.do?method=feeModifyAuth", {
							account : account,
							pwd : pwd
						});
				if (result.flag == "0000") {
					alert("验证不通过,请核查");
					return false;
				}
				else {
					alert("验证成功");
					unlock(gridContainer);
					BusCard.Namespace.create("ordermgr.budget.auth");
					ordermgr.budget.auth.authWorkNo = account;

				}
			}
			else
				alert("工号或者密码不能为空");
		}

	};

	var initGridCard = function(gridContainer, data) {
		var card = BusCard.createInstance({gridData:data}, gridContainer, {
					gType : 3,
					fromURL : true,
					url : "/buscardapp/protocol/xml/card_pi_budget.xml"
				});
		card.init();
		return card;
	};
	/**
	 * 主要供弹出的预算页面使用,主要包括数据在全局中唯一引用的建立和事件的初始化
	 */
	var initBudget = function(budgetParamList, param) {
		initData(budgetParamList, param);
		initEvent();// wangyanping
	}
	/**
	 * <p> 开始预算 </p>
	 * 
	 * @method
	 */
	var doBudget = function(param) {
		var to_string = Object.prototype.toString;
		var data = BusCard.util.doPost(webPath() + "/budgetComponentAction.do?method=doBudget", param, false, null, null, true);
		BusCard.Namespace.create("_budget_._temp_._budgetParam_");
		BusCard.Namespace.create("_budget_._temp_._jsonBudgetParam_");
		_budget_._temp_._jsonBudgetParam_ = BusCard.util.toJson(param);
		_budget_._temp_._budgetParam_ = param;
		var typeDesc = to_string.apply(data, []);
		if (typeDesc.indexOf("Object") >= 0)
			throw new Error(data.message);
		else if (typeDesc.indexOf("Array") >= 0) initData(data, param);
		budgetBuilder.data = data;
		return budgetBuilder;

	};
	/**
	 * <p> 开始预算（其他费用） </p>
	 * 
	 * @method
	 */
	var doOtherFeeBudget = function(param) {
		var to_string = Object.prototype.toString;
		var data = BusCard.util.doPost(webPath() + "/budgetComponentAction.do?method=doOtherFeeBudget", param, false, null, null, true);
		BusCard.Namespace.create("_budget_._temp_._budgetParam_");
		BusCard.Namespace.create("_budget_._temp_._jsonBudgetParam_");
		_budget_._temp_._jsonBudgetParam_ = BusCard.util.toJson(param);
		_budget_._temp_._budgetParam_ = param;
		var typeDesc = to_string.apply(data, []);
		if (typeDesc.indexOf("Object") >= 0)
			throw new Error(data.message);
		else if (typeDesc.indexOf("Array") >= 0) initData(data, param);
		budgetBuilder.data = data;
		return budgetBuilder;

	};
	
			/**
	 * <p> 开始预算（龙卡押金） </p>
	 * 
	 * @method
	 */
	var doDragonPlanFeeBudget = function(param) {
		var to_string = Object.prototype.toString;
		var data = BusCard.util.doPost(webPath() + "/budgetComponentAction.do?method=doDragonPlanFeeBudget", param, false, null, null, true);
		BusCard.Namespace.create("_budget_._temp_._budgetParam_");
		BusCard.Namespace.create("_budget_._temp_._jsonBudgetParam_");
		_budget_._temp_._jsonBudgetParam_ = BusCard.util.toJson(param);
		_budget_._temp_._budgetParam_ = param;
		var typeDesc = to_string.apply(data, []);
		if (typeDesc.indexOf("Object") >= 0)
			throw new Error(data.message);
		else if (typeDesc.indexOf("Array") >= 0) initData(data, param);
		budgetBuilder.data = data;
		return budgetBuilder;

	};
	
	/**
		 * budgetBuilder封装与预算相关的交互动作,包括在本帧展现或在弹出页展现动作
		 * 
		 * @object
		 */
		var budgetBuilder = {
			data : "",
			render : function(dom) {
				dom.innerHTML = budgetContainerWrapperHTML;
				var gridContainer = BusCard.util.$("gridContainer", dom);
				// 视图由表格定义
				// createViewer(data).render(BusCard.util.$("gridContainer", dom));
				currentBudgetGridCard = initGridCard(gridContainer, this.data);
				// 初始化权限验证
				_init_sub_page(dom, gridContainer);
				// 初始化事件处理
				initEvent();
				// 初始化员工的session信息
				initPerferSession(gridContainer);
			},
			getData : function() {
				return this.data;
			},
			show : function() {
				var newWin = window.open(webPath() + "/budgetComponentAction.do?method=show", '_blank',
						'height=600px,width=1200px,status=yes,toolbar=no,menubar=no,location=no');
			}
		};

	return {
		/**
		 * <p>公共方法,调用此方法返回budgetBuilder对象</p>
		 * 
		 * @public
		 * @method
		 */
		doBudget : doBudget,
		doOtherFeeBudget : doOtherFeeBudget,
		doDragonPlanFeeBudget : doDragonPlanFeeBudget,

		/**
		 * <p>返回交互后的预算列表,如果有缴费信息,同时返回缴费信息</p>
		 */
		getData : getData,

		budgetContainerWrapperHTML : budgetContainerWrapperHTML,

		createViewer : function(data) {
			return {
				render : function(dom) {
					return initGridCard(dom, data);
				}
			}
		},
		initBudget : initBudget,

		_init_sub_page : _init_sub_page,

		getCard : function() {
			return currentBudgetGridCard
		}
	};

})();