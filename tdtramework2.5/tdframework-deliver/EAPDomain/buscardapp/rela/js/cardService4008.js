BusCard.define('/buscardapp/rela/js/cardService4008.js',function(_buscard,cardParam){ 
	var Me = this;
	/**
	 * 4008业务必须以118955
	 */
	Me.$("serviceId").onblur = function(){
		var currentValue = Me.$("serviceId").value;
		if(!(currentValue.startWith("118955"))){
			orderaccept.common.dialog.MessageBox.alert({
				message:"\u53f7\u7801\u5934\u9519\u8bef,\u524d6\u4f4d\u4e0d\u662f118955!"
			});
			Me.$("serviceId").value="";
			return false;
		}
	};	
});
