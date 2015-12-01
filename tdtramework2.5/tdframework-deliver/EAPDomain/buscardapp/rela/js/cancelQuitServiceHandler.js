BusCard.define('/buscardapp/rela/js/cancelQuitServiceHandler.js',function(_buscard,cardParam){ 
	var Me = this;
	var serviceRealtion = Me.getCardRelationInfo().serviceRelation;
	this.$("serviceStopDate").value = serviceRealtion.serviceStopDate.substr(0,10);
	var parameter = "serviceKind=" + serviceRealtion.serviceKind+"&serviceStopDate="+serviceRealtion.serviceStopDate;
	var result = executeRequest("businessAcceptAction", "getQuitDate", parameter);
	this.$("enableStopDate").value = result;
	this.$("serviceStopDate").readOnly = true;
	this.$("enableStopDate").readOnly = true;
});