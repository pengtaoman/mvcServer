BusCard.define('/buscardapp/rela/js/card_105_10513.js',function(_buscard,cardParam){
	var Me = this;
	if($ac$.requestParam.linkName){
		Me.$("contactPeople").value = $ac$.requestParam.linkName;
	}
	if($ac$.requestParam.linkPhone){
		Me.$("contactPhone").value = $ac$.requestParam.linkPhone;
	}
	var pageLink = "/ordermgr/batchFlag";
	var session = BusCard.$session;
	var flag = BusCard.$remote("omInterfaceDAO").haveRight(session.workNo,session.workPwd,pageLink);
	if(!eval(flag)){
		Me.$("batchFlag").value=0;
		Me.$("batchFlag").disabled=true;
	}
});
