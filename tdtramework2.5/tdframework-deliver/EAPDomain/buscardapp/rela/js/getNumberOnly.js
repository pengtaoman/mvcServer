BusCard.define('/buscardapp/rela/js/getNumberOnly.js',function(_buscard,cardParam){ 
try{
	var Me = this;
	var a = arguments[0];
	var b= arguments[1];
	var util = dojo.require("orderaccept.prodofferaccept.util");
	//for compatibility
	var executeRequest = _buscard.executeRequest;
	Me.productId = b.productId;
	Me.cityCode = b.cityCode;
	var serviceCard = util.DomHelper.getParentWidget(Me.dom,
						"orderaccept.prodofferaccept.widget.servicecard.ServiceCardWidget");
	if(!!serviceCard){
		Me.$("serviceId").setPPPOEPwd = function(){	
			if(!!serviceCard && !!serviceCard.attrCardWidget){
				var attrCardWidget = serviceCard.attrCardWidget;
				var pppoePwd = attrCardWidget.busCardInstance.$("100829");
				if(!!pppoePwd){
					var length = this.value.length;
					pppoePwd.value = this.value.substring(length-7,length);
				}
			}
		};
	}
	Me.getChooseNumber = function () {
		var parameter = "productId=" + Me.productId+"&cityCode="+Me.cityCode;
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getFixedNumber", parameter);
		var result = "-1";
		try {
			var jsonResultObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
			if (jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1") {
    			result = jsonResultObj.message;

			}
		}
		catch (e) {
			alert("\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u53d6\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7\u539f\u951f\u65a4\u62f7\u4e3a\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u6377\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7");
			return false;
		}
		var oServiceId = Me.$("serviceId");
		if(result != null && result != ""){
			oServiceId.value = result;
			oServiceId.readOnly = true;
		}
		if(!!Me.$("serviceId").setPPPOEPwd){
			Me.$("serviceId").setPPPOEPwd();
		}
		//处理账号信息
		if(!!Me.checkedCurrentNumForAcc){
			Me.checkedCurrentNumForAcc(Me.$("serviceId").value);
		}
	};
	Me.returnBlank = function () {
		var A = (navigator.appname == "Netscape") ? event.which : event.keyCode;
		if (A != 32) {
			return true;
		} else {
			return false;
		}
	};
	Me.checkSameServiceId = function(){
    var cdmaServiceIdElemList = null; 
	    try{cdmaServiceIdElemList =ordermgr.accept.compnew._other_number_elem_list_; }catch(e){}
	    var chooseServiceId = Me.$("serviceId").value;
	    if(cdmaServiceIdElemList){
	        var len = cdmaServiceIdElemList.length;
	        var count = 0;
	        while(len--){
	            var current = cdmaServiceIdElemList[len].service.value;
	            if(current.length>0&&chooseServiceId == current){
	                count++;
	            }
	        }
	        if(count>1){
	            alert("\u8be5\u4e1a\u52a1\u53f7\u7801\u5df2\u9009\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9\uff01");
	            Me.$("serviceId").value = "";
	        }
	    }
	};
	Me.$("link_serviceId").onclick = function () {
		Me.getChooseNumber();
	};
	Me.$("serviceId").onkeypress = function () {
		return Me.returnBlank();
	};
	Me.$("serviceId").onblur = function(){
		if(!!Me.$("serviceId").setPPPOEPwd){
			Me.$("serviceId").setPPPOEPwd();
		}
		//处理账号信息
		if(!!Me.checkedCurrentNumForAcc){
			Me.checkedCurrentNumForAcc(Me.$("serviceId").value);
		}
	};
	Me.$("serviceId").onpropertychange = function(){
		Me.checkSameServiceId();
	}; 

BusCard.Namespace.create("ordermgr.accept.compnew");
ordermgr.accept.compnew._other_number_elem_list_ = ordermgr.accept.compnew._other_number_elem_list_ || [];
var serviceObj = {};
serviceObj.service = Me.$("serviceId");
serviceObj.productId = Me.productId;
ordermgr.accept.compnew._other_number_elem_list_ .push(serviceObj);
}catch(e){
alert(e.message);
}
});
