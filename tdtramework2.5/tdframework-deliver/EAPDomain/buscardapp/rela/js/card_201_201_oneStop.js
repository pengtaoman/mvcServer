BusCard.define('/buscardapp/rela/js/card_201_201_oneStop.js',function(_buscard,cardParam){ 

var Me = this;
//for compatibility
var executeRequest = _buscard.executeRequest;
/**
 * 初始化事件
 */
Me.$('balanceSide').onchange = function(){
	var balanceSide = Me.$('balanceSide').value;
	var parameters = "cityCode=" + Me.$("balanceSide").value + "&tagName=balanceCity";
	//var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getIndbCity", parameters);
	var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getIndbCity", parameters);
	var result = executeAjaxResult(resultJsonStr);
	if (result == false) {
		return;
	}
	if (result != "-1") {
		Me.$("balanceCity").outerHTML = result;
	}
	Me.setStyle(Me.$("balanceCity"));
}
/**
* 设置样式
*/
Me.setStyle = function (obj) {
	obj.style.width = "100%";
};
});
