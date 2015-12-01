BusCard.define('/buscardapp/rela/js/groupProductHandler.js',function(_buscard,cardParam){ 
var a = arguments[0];
var b = arguments[1];
var Me = this;
Me.serviceId = b.serviceId;
if(!!Me.serviceId && !!Me.$("serviceId")){
	Me.$("serviceId").value = Me.serviceId ;
}
});
