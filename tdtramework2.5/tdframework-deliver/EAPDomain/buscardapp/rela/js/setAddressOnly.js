BusCard.define('/buscardapp/rela/js/setAddressOnly.js',function(_buscard,cardParam){ 
var Me = this;
var a = arguments[0];
var b = arguments[1];
Me.belongCode = b.belongCode;
if(!Me.belongCode&&Me.getCardRelationInfo().serviceRelation)
Me.belongCode = Me.getCardRelationInfo().serviceRelation.belongCode;
Me.cityCode = b.cityCode;
Me.getStandardAddr = function () {
	var standardAddressInterface = new StandardAddressInterface({"$" : function(id) {return Me.$(id)}});
	var B = {"StandardAddInterface":standardAddressInterface};
	var C = BusCard.$session.container2;
	var D = BusCard.$session.workNo;
	var A = BusCard.$session.PASSWORD;
	var E = BusCard.$session.areaCode;
	var F = C + "resource/interfacemanage/standardadd/StandardAddrQuery.jsp?STAFFNO=" + D + "&PASSWORD=" + A + "&workNo=" + D + "&regionno=" + E + "&cityCode=" + Me.cityCode + "&areaCode=" + Me.belongCode;
	Me.windowResourceStardardAddress = window.showModalDialog(F, B, "DialogWidth:1024px;DialogHeight:768px;status:no;location:no");
};
Me.$("link_addrId").onclick = function () {
	Me.getStandardAddr();
};

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
});
