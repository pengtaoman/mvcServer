BusCard.define('/buscardapp/rela/js/renderSubGroupInfo.js',function(_buscard,cardParam){ 
	Me = this;
	var a = arguments[0];
	var b = arguments[1];
	var executeRequest = _buscard.executeRequest;
	
	Me.getOrderSubGroup = function () {
		/*var parameter = "prodInstId=" + b.prodInstId+"&groupProdOfferInstId="+b.groupProdOfferInstId;
		var resultStr = executeRequest("orderDetailAction", "getOrderSubGroupId", parameter);*/
		var resultStr = b.alreadyMemberProdInst;
		//alert("\u5df2\u52a0\u5165\u5b50\u7fa4:"+resultStr);
		if (resultStr!=null && resultStr!="") {
			Me.$("prodInstId").value = resultStr;
			var option = BusCard.find(Me.$("prodInstId").options,function(option){
				if(option.value=="-1") return true;
			})
			Me.$("prodInstId").remove(option.index);
		}
	};
		
	Me.getOrderSubGroup();
});
