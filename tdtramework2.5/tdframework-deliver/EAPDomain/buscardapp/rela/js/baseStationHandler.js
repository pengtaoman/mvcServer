BusCard.define('/buscardapp/rela/js/baseStationHandler.js',function(_buscard,cardParam){ 
var Me = this;
var a = arguments[0];
var b = arguments[1];
var executeRequest = _buscard.executeRequest;
if(!!Me.$("baseStation")){
	Me.$("baseStation").onquery = function () {
		var _card = arguments[0], _buscard = arguments[1], _p = arguments[2];
		var value = _buscard.util.trim(this.value);
		if (!value) {
			alert("\u8bf7\u8f93\u5165\u67e5\u8be2\u5173\u952e\u8bcd");
			this.focus();
			return false;
		}
		//调用基站接口来查询
		var baseStationList = BusCard.$remote("baseStationInfoDAO").queryStationSelect({
								"stationName":value,
								"cityCode":BusCard.$session.cityCode,
								"ifRented":"0"
							});
		var stationList = [];
		if(!!baseStationList&&baseStationList.length>0){    
			stationList = BusCard.util.map(baseStationList,function(vo){
				return {
					id:vo.stationId,
					name:vo.stationName
					};
			});
		}
		return stationList;
	};	
	Me.$("baseStation").onafterclick = function () {
    	var baseStationId = Me.$("baseStation").rvalue;
		//调用基站接口来查询
		var baseStationList = BusCard.$remote("baseStationInfoDAO").query({"stationId":baseStationId});
		if(!!baseStationList&&baseStationList.length>0){
			//赋值给业务号码
			Me.$("serviceId").value = baseStationId+"@"+ baseStationList[0].switchId;
		}
	};
}
});
