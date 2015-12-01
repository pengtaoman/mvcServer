BusCard.define('/orderaccept/attrapp/attr_prod_200064.js', function(_buscard,
		cardParam) {
	var prodOfferAcceptPageDispatch = function() {
		var Me = this;
		var util = dojo.require("orderaccept.prodofferaccept.util");
		var ConstantsPool = dojo.require("orderaccept.common.js.ConstantsPool");
		var ProductIdConst = ConstantsPool.load("ProductIdConst").ProductIdConst;
		var detialWidget = unieap
				.byId(util.DomHelper.getParentWidget(Me.$("200064"),
						"unieap.layout.ContentPane").detailWidgetId);
		if (!!detialWidget && !!detialWidget.ifBatch) {
			dojo.style(Me.$("200064"), "display", "none");
			dojo.style(Me.$("label_200064"), "display", "none");
		}
	    //SVPN用户短号码
		if($ac$.groupProdInstInfo.productId == ProductIdConst.SVPN){
			Me.$("200064").readOnly = true;
			Me.$("200064").value==""?Me.$("200064").value=0:null;
		}
		Me.$("200064").onblur = function() {
			if (Me.$("200064").value!=""&&
				dojo.some($ac$.userHasGroupOfferInfoList,function(offerInst){
						return dojo.some(offerInst.prodInstList,function(prodInst){
							return dojo.some(prodInst.prodInstAttrList,function(prodInstAttr){
								return prodInstAttr.attrCd=="200064"&&prodInstAttr.attrValue==Me.$("200064").value;
							})
						})
				})) {
				return true;
			}
			if (!/^\d+$/i.test(Me.$("200064").value)) {
				orderaccept.common.dialog.MessageBox.alert({
							message : "用户短号码只能由数字组成!"
						});
				return Me.reset();
			}
			if (!!$ac$.get("groupShortNoInfoList")) {
				var groupShortNoInfoList = $ac$.get("groupShortNoInfoList");
			} else {
				var groupShortNoInfo = orderaccept.prodofferaccept.util.ServiceFactory
						.getService("spring:ivpnShortNoSegmentBO")
						.getShortNoInfoForNew($ac$.get("groupInfo").groupId);
				// 1、校验集团是否维护了短号段
				if (groupShortNoInfo.list && groupShortNoInfo.list.length == 0) {
					orderaccept.common.dialog.MessageBox.alert({
								message : "用户所属集团没有进行短号码维护，请先进行集团短号段维护！"
							});
					return Me.reset();
				}
				$ac$.set("groupShortNoInfoList", groupShortNoInfo.list);
				var groupShortNoInfoList = groupShortNoInfo.list;
			}
			var groupShortNoList = dojo.map(groupShortNoInfoList,
					function(info) {
						return {
							beginNo : info.beginNo,
							endNo : info.endNo
						}
					})
			// 2、校验短号有效性
			var flag = dojo.some(groupShortNoList, function(shortNoInfo) {
				return  parseInt(Me.$("200064").value, 10) >= parseInt(
								shortNoInfo.beginNo, 10)
						&& parseInt(Me.$("200064").value, 10) <= parseInt(
								shortNoInfo.endNo, 10)
			})
			if (!flag) {
				var message = "短号码输入有误，请在集团短号段中选择：";
				dojo.forEach(groupShortNoList, function(shortNoInfo) {
							message += "【" + shortNoInfo.beginNo + "~"
									+ shortNoInfo.endNo + "】"
						})
				orderaccept.common.dialog.MessageBox.alert({
							message : message
						});
				return Me.reset();
			}
			// 3、校验短号唯一性
			Me.checkUniqueNo();
		};
		Me.reset = function() {
			Me.$("200064").value = "";
			return false;
		}
		Me.checkUniqueNo = function() {
			var groupProdInstId = $ac$.groupProdInstInfo.accProdInstId;
			var count = orderaccept.prodofferaccept.util.ServiceFactory
					.getService("spring:prodInstRelaBO").getMemberShortNoCount(
							parseInt(groupProdInstId), Me.$("200064").value);
			if (count > 0) {
				orderaccept.common.dialog.MessageBox.alert({
							message : "短号码已被占用，请重新输入！"
						});
				Me.reset();
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
		var Me = this;
		dojo.style(Me.$("200064"), "display", "none");
		dojo.style(Me.$("label_200064"), "display", "none");
		Me.$("200064").isNull = "1";
	};

	// 调用具体分支处理逻辑
	return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
