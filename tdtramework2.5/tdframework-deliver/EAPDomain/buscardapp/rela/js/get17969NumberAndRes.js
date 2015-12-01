BusCard.define('/buscardapp/rela/js/get17969NumberAndRes.js', function(_buscard, cardParam) {
	var Me = this;
	var a = arguments[0];
	var b = arguments[1];
    Me.$("serviceId").readOnly = true;
    
	Me.getChooseNumber = function() {
		var container2 = BusCard.$session.container2;
		var workNo = BusCard.$session.workNo;
		var endpassword = BusCard.$session.PASSWORD;
		var acceptDealer = BusCard.$session.acceptDealer;
        var serviceIdElem = Me.$("serviceId");
        var resInstIdElem = Me.$("resInstId");
		if (Me.$("lanId")) {
			Me.cityCode = Me.$("lanId").value;
		} else {
			Me.cityCode = b.cityCode;
		}
        var webPath = container2 +"/resource/interfacemanage/ecardselect/ECardSelectMain.jsp?STAFFNO=" + workNo
		        + "&PASSWORD=" + endpassword + "&acceptDealer=" + acceptDealer + "&cityCode=" + Me.cityCode;
		var windowResourceServiceId = window.showModalDialog(webPath, "",
		        "DialogWidth:1000px;DialogHeight:600px;status:no;location:no");
        if(!!windowResourceServiceId){
            windowResourceServiceId.replace(/^cardNo:(\d+?)instId:(\d+?)$/,function($0,$1,$2){
		        !!serviceIdElem?serviceIdElem.value = $1:null;
		        !!resInstIdElem?resInstIdElem.value = $2:null;
            })
        }
	};
        
    Me.$("link_serviceId").onclick = function() {
        Me.getChooseNumber();
    };
});
