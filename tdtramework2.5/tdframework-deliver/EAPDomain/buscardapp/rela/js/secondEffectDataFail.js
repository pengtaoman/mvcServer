BusCard.define('/buscardapp/rela/js/secondEffectDataFail',function(_buscard,cardParam){ 
	var Me = this;
	var a = arguments[0];
	var b = arguments[1];
	var executeRequest = _buscard.executeRequest;

	Me.init = function () {
		if($("effectDate")){
			$("effectDate").disabled=true;
		}
	};
	Me.init();

});
