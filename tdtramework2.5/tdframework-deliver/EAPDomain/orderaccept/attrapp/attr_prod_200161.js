BusCard.define('/orderaccept/attrapp/attr_prod_200161.js', function(_buscard,
		cardParam) {
	var prodOfferAcceptPageDispatch = function() {
		var Me = this;
		// LNS隧道密码
		Me.$("200161").onblur = function() {
			if (!/^(\d|[a-z]|[A-Z]){6,8}$/.test(Me.$("200161").value)) {
				orderaccept.common.dialog.MessageBox.alert({
							message : "请输入6到8位数字或字母"
						});
				Me.$("200161").value = "";
				return false;
			}
		}
		// LNS服务器地址
		Me.$("200105").onblur = function() {
			if (!/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
					.test(Me.$("200105").value)) {
				orderaccept.common.dialog.MessageBox.alert({
							message : "请输入正确的服务器IP地址"
						});
				Me.$("200105").value = "";
				return false;
			}
		}
		if(Me.$("200256")){
			Me.$("200256").onblur = function(){
				if(!/^\d$/.test(Me.$("200256").value)){
					orderaccept.common.dialog.MessageBox.alert({
								message : "LNS编号只能输入0-9之间的1位数字"
							});
					Me.$("200256").value = "";
					return false;
				}
			}
		}

	};
	var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	/**
	 * 综合查询页面处理分支
	 * 
	 * @method
	 */
	var allInfoQueryPageDispatch = function() {
	};
	/**
	 * 二次业务处理分支
	 * 
	 * @method
	 */
	var secondBusinessPageDispatch = function() {
	};
	/**
	 * 批量页面处理分支
	 * 
	 * @method
	 */
	var batchPageDispatch = function() {
	};

	// 调用具体分支处理逻辑
	return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
