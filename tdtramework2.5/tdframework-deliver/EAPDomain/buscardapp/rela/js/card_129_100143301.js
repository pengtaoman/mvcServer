BusCard.define('/buscardapp/rela/js/card_129_100143301.js',function(_buscard,cardParam){ 
	var Me = this;
	var a = arguments[0];
	var b = arguments[1];

	Me.controlServiceId = function () {
		Me.$("link_serviceId").style.visibility = "hidden";
		Me.$("label_serviceId").innerHTML =Me.$("label_serviceId").innerHTML.replace("业务号码","业务号码(带区号)");
	};
	Me.controlServiceId();
	
	
});
