BusCard.define('/buscardapp/rela/js/globalEyeNumber.js',function(_buscard,cardParam){ 
	var Me = this;
	var b = arguments[1];
    Me.productId = b.productId;
    Me.belongCode = b.belongCode;
    Me.cityCode = b.cityCode;
	var executeRequest = _buscard.executeRequest;
	Me.getChooseNumber = function () {
		var parameter = "productId=" + Me.productId+"&cityCode="+Me.cityCode;
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getFixedNumber", parameter);
		var result = "-1";
		var areaId="-1";
		try {
			var jsonResultObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
			if (jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1") {
				result = jsonResultObj.message;
				var areaIdJsonStr=executeRequest("prodOfferSaleAjaxAction", "getAreaId", parameter);
				var jsonAreaIdObj = (typeof areaIdJsonStr == "string") ? eval("(" + areaIdJsonStr + ")") : areaIdJsonStr;
				if (jsonAreaIdObj && jsonAreaIdObj.flag && jsonAreaIdObj.flag == "1") {
				   areaId=jsonAreaIdObj.message;
				   result="18"+areaId.substring(0,4)+"0001"+result+"00";
				}
			}
		}
		catch (e) {
			alert("\u751f\u6210\u53f7\u7801\u51fa\u9519");
			return false;
		}
		var oServiceId = Me.$("serviceId");
		oServiceId.value = result;
		oServiceId.readOnly = true;
	};
	Me.$("link_serviceId").onclick = function () {
		Me.getChooseNumber();
		Me.$("link_serviceId").disabled=true;
	};

});
