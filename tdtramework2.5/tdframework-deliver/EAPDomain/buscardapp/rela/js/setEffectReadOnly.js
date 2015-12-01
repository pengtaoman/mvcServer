BusCard.define('/buscardapp/rela/js/setEffectReadOnly.js',function(_buscard,cardParam){ 
	try{
		var Me = this;
		var b = arguments[1];
		if(b.serviceOfferId=="9"){
			var effectDate = Me.$("effectDate");
			effectDate.disabled = true;
		}
	}catch(e){
		alert(e.message);
	}
});
