var OrderChange = function() {
	var Me = this;
	/**
	 * ��ʼ��
	 */
	Me.init = function() {
		Me.initEvent();
		if($("custOrderId").value!=""){
			$('query').click();
		}
	}
	/**
	 * ���¼�
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
	 * ���ݿͻ������Ž��в�ѯ
	 */
	Me.queryByCustOrderId = function() {
		var custOrderId = $('custOrderId').value;
		var path = $('webpath').value;
		if (custOrderId == "" || custOrderId == null) {
			alert("��������ͻ��������ٽ��в�ѯ");
			return false;
		}
		// ��⵱ǰ�ͻ������Ƿ���Խ��иĵ�
		var param = "&custOrderId=" + custOrderId;
		var _result_ = executeRequest("orderChangeAction", "doCheck", param);
		var jsonResultObj = null;
		try {
			jsonResultObj = (typeof _result_ == 'string') ? eval("(" + _result_ + ")") : _result_;
		}
		catch (e) {
			alert("��ѯ���ʧ�ܣ�");
			return false;
		}
		if (jsonResultObj.flag == "-1") {
			alert(jsonResultObj.message);
			return false;
		}
		
		// ���ݿͻ������Ų�ѯ�����ݴ�����Ƿ���δ������ɵļ�¼
		var resultInfo = executeRequest("orderChangeAction", "checkIfComplete", param);
		var result = executeAjaxResult(resultInfo);
		// ����1������δ������ɵļ�¼��������ص���0����û��δ������ɵļ�¼
		if (result == "1") {
			alert("�ñʿͻ�������δ������ɵļ�¼����������ɣ�");
			var pagePath = path + "/orderChangeAction.do?method=initCompletePage&custOrderId=" + $('custOrderId').value;
			// var newWin = window.open("about:blank",
			// 'prodOfferSalePage',
			// 'status=1,resizable=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
			// document.myForm.target = "prodOfferSalePage";
			// document.myForm.submit();
			var title = '�ĵ��������ҳ��';
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
	 * ���øĵ�ҳ��
	 */
	Me.resetOrderChange = function() {
		parent.top.top_page.MenuBar.activeTopMenuById('System84', '841', '841BB', "");
	}
	
}

window.onload = function() {
	var orderChange = new OrderChange();
	orderChange.init();
}