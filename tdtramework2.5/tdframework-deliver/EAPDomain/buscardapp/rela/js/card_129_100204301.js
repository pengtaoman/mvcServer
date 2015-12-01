BusCard.define('/buscardapp/rela/js/card_129_100204301.js',function(_buscard,cardParam){ 
	var Me = this;

	Me.controlServiceId = function () {
		if(!!Me.$("serviceId").getAttribute("isnull")){
			Me.$("serviceId").setAttribute("isnull","1");
			var label_serviceId = dojo.query(".formRequested",Me.$("label_serviceId"))[0];
			if(!label_serviceId){
				dojo.place("<span class=\"formRequested\">*</span>",Me.$("label_serviceId"),"first");
				//label_serviceId = dojo.query(".formRequested",Me.$("label_100660"))[0];
			}
			dojo.style(label_serviceId,"display","none");
		}
	};
	Me.controlServiceId();
});