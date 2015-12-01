BusCard.define('/buscardapp/rela/js/getUseCust.js', function(_buscard, cardParam) {
	try {
		var webPath = $("webPath").value,
			useCustWin = function(witchOne) {
				var pagePath = webPath + "/custcontact/common/jsp/UseCust.jsp?witchOne=" + witchOne;
				window
				        .open(pagePath, "newWin",
				                'status=1,resizable=0,fullscreen=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
			},
			setSubscriberName = function(objName, objId) {
				if (objName) {
					objName.readOnly = true;
					if ($ac$) {
						var custObj = $ac$.requestParam.customerData;
						objName.value = custObj.custName;
						objId.value = custObj.custId;
					}
					
				}
			};
		setSubscriberName(this.$("subscriberName"), this.$("subscriberId"));
		this.$("link_subscriberName").onclick = function() {
			useCustWin(0);
		};
	}
	catch (e) {
		alert(e.message);
	}
});
