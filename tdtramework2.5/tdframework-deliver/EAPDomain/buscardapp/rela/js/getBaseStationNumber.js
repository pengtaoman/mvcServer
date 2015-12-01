BusCard.define('/buscardapp/rela/js/getBaseStationNumber.js',function(_buscard,cardParam){ 
try{
	var Me = this;
	var b= arguments[1];
	Me.cityCode = b.cityCode;
	var baseStationElem = Me.$("baseStation");
	
	Me.controlServiceId = function () {
		Me.$("link_serviceId").style.visibility = "hidden";
		Me.$("serviceId").readOnly=true;
	};
	Me.controlServiceId();
	
}catch(e){
	alert(e.message);
}
});
