var OrderChange = function() {
	var Me = this;
	/**
	 * 初始化
	 */
	Me.init = function() {
		Me.initEvent();
		if($("custOrderId").value!=""){
			$('query').click();
		}
	}
	/**
	 * 绑定事件
	 */
	Me.initEvent = function() {
		$('query').onclick = function() {
			if (!BusCard.checkHaveOMRight(this)) {
				alert(BusCard.NO_OM_RIGHT_MSG);
				return false;
			}
			Me.queryByCustOrderId();
		}
		$('reset').onclick = function() {
			if (!BusCard.checkHaveOMRight(this)) {
				alert(BusCard.NO_OM_RIGHT_MSG);
				return false;
			}
			Me.resetOrderChange();
		}
	}
	
	/**
	 * 根据客户订单号进行查询
	 */
	Me.queryByCustOrderId = function() {
		var custOrderId = $('custOrderId').value;
		var path = $('webpath').value;
		if (custOrderId == "" || custOrderId == null) {
			alert("请先输入客户订单号再进行查询");
			return false;
		}
		// 检测当前客户订单是否可以进行改单
		var param = "&custOrderId=" + custOrderId;
		var _result_ = executeRequest("orderChangeAction", "doCheck", param);
		var jsonResultObj = null;
		try {
			jsonResultObj = (typeof _result_ == 'string') ? eval("(" + _result_ + ")") : _result_;
		}
		catch (e) {
			alert("查询检测失败！");
			return false;
		}
		if (jsonResultObj.flag == "-1") {
			alert(jsonResultObj.message);
			return false;
		}
		
		// 根据客户订单号查询订单暂存表，看是否有未受理完成的记录
		var resultInfo = executeRequest("orderChangeAction", "checkIfComplete", param);
		var result = executeAjaxResult(resultInfo);
		// 返回1代表有未受理完成的记录，如果返回的是0代表没有未受理完成的记录
		if (result == "1") {
			alert("该笔客户订单有未受理完成的记录，请受理完成！");
			var pagePath = path + "/orderChangeAction.do?method=initCompletePage&custOrderId=" + $('custOrderId').value;
			// var newWin = window.open("about:blank",
			// 'prodOfferSalePage',
			// 'status=1,resizable=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
			// document.myForm.target = "prodOfferSalePage";
			// document.myForm.submit();
			var title = '改单受理完成页面';
			var height = '600';
			var width = '1200';
			var data = {
				opener : window
			};
			var isComplete = new Boolean(false);
			openWinDialog(pagePath, title, height, width, data, isComplete);
			return false;
		}
		var custId = BusCard.$remote('custOrderBasicInfoDAO').query({
			        custOrderId : custOrderId
		        })[0].custId;
		param += "&custId=" + custId;
		document.forms[0].action = path + "/prodOfferSaleAction.do?method=processOrderChange&" + param;
		document.forms[0].target = "F_HeadFra";
		document.forms[0].submit();
	}
	
	/**
	 * 重置改单页面
	 */
	Me.resetOrderChange = function() {
		parent.top.top_page.MenuBar.activeTopMenuById('System84', '841', '841BB', "");
	}
	
}

window.onload = function() {
	var orderChange = new OrderChange();
	orderChange.init();
}