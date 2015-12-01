BusCard.define('/buscardapp/rela/js/getCityCode.js',function(_buscard,cardParam){ 
var Me = this;
var a = arguments[0];
var b = arguments[1];
var path = a.path.contextPath;
Me.productId = b.productId;
Me.belongCode = b.belongCode;
Me.cityCode = b.cityCode;
Me.resetSelect = function(element, objectList, defaultValue){
	var options = element.options;
	for(var i = 0, len = options.length; i < len; i++) {
		element.remove(options[i]);
	}
	for(var i = 0, len = objectList.length; i < len; i++) {
		var info = objectList[i];
		var option = document.createElement("OPTION");
		option.text = info.name;
		option.value = info.id;
		if(info.id == defaultValue){
			option.selected = true;
		}
		element.add(option);
	}
}
Me.refreshCityCode = function(){
	var stub = BusCard.$remote("serviceParamBO");
	var result = stub.getCityCode(Me.cityCode, 4);
	if(result){
		var cityCodeList = result.list;
		if(cityCodeList){
			Me.resetSelect(Me.$("lanId"), cityCodeList, Me.cityCode);
		}
	}
	Me.$("lanId").onchange = function(){
		Me.cityCode = Me.$("lanId").value;
		Me.refreshBelongCode(Me.$("lanId").value);
	}
	Me.$("lanId").onchange();
}
Me.refreshBelongCode = function(cityCode){
	var stub = BusCard.$remote("serviceParamBO");
	var result = stub.getAreaByOperLevel(cityCode, 3);
	if(result){
		var belongCodeList = result.list;
		if(belongCodeList){
			Me.resetSelect(Me.$("belongCode"), belongCodeList, Me.belongCode);
		}
	}
	Me.$("belongCode").onchange = function(){
		Me.belongCode = Me.$("belongCode").value;
		Me.refreshBureauId(Me.$("belongCode").value, Me.$("lanId").value);
	}
	Me.$("belongCode").onchange();
}
Me.refreshBureauId = function(belongCode, cityCode){
	var stub = BusCard.$remote("serviceParamBO");
	var result = stub.getBureauId(4, belongCode, cityCode);
	if(result){
		var list = result.list;
		if(list){
			Me.resetSelect(Me.$("bureauId"), list);
		}
	}
	if(!Me.$("bureauId").onchange){
		Me.$("bureauId").onchange = function(){
			Me.refreshBranchNo(Me.$("branchNo").value, Me.$("lanId").value);
		}
	}
	Me.$("bureauId").onchange();
}
Me.refreshBranchNo = function(belongCode, cityCode){
	var stub = BusCard.$remote("serviceParamBO");
	var result = stub.getBureauId(5, belongCode, cityCode);
	if(result){
		var list = result.list;
		if(list){
			if(list.length == 0){
				if(Me.$("bureauId").selectedIndex >= 0){
					list.push({
						"id" : Me.$("bureauId").value,
						"name" : Me.$("bureauId").options[Me.$("bureauId").selectedIndex].text
					})
				}
			}
			Me.resetSelect(Me.$("branchNo"), list);
		}
	}
	if(Me.$("branchNo").onchange){
		Me.$("branchNo").onchange();
	}
}
Me.refreshCityCode();
var StandardAddressInterface = function(oParameter){
	var Me=this;
	Me.$=oParameter["$"];
	Me.setAddrDetail = function(param){
		var addrDetail = param["addrDetail"];
		var addrId = param["addrId"];
		Me.$("addrId").value = addrDetail;
		Me.$("addrId").rvalue = addrId;
		Me.$("addrDetail").value = addrDetail;
		Me.$("addrId").focus();
	};
	//Me.initDoc = xmlCore.initDoc;
	//Me.getDoc = xmlCore.getDoc;
};
Me.getStandardAddr = function () {
	var standardAddressInterface = new StandardAddressInterface({"$" : function(id) {return Me.$(id)}});
	var B = {"StandardAddInterface":standardAddressInterface};
	var C = BusCard.$session.container2;
	var D = BusCard.$session.workNo;
	var A = BusCard.$session.PASSWORD;
	var E = BusCard.$session.areaCode;
	var F = C + "resource/interfacemanage/standardadd/StandardAddrQuery.jsp?STAFFNO=" + D + "&PASSWORD=" + A + "&workNo=" + D + "&regionno=" + E + "&cityCode=" + Me.$("lanId").value + "&areaCode=" + Me.$("belongCode").value;
	Me.windowResourceStardardAddress = window.showModalDialog(F, B, "DialogWidth:1024px;DialogHeight:768px;status:no;location:no");
};
Me.$("link_addrId").onclick = function () {
	Me.getStandardAddr();
};
});
