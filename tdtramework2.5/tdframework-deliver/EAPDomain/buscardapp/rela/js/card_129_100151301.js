BusCard.define('/buscardapp/rela/js/card_129_100151301.js', function(_buscard, cardParam) {
	        var Me = this,
		        rp = $ac$.get("requestParam"),
		        cityCode = cardParam.cityCode||rp.cityCode||rp.customerData.cityCode,
		        serviceParamDAOStub = BusCard.$remote("serviceParamDAO"),
		        cityCollection = serviceParamDAOStub.getCommonRegionByLevel(3).list || [],
		        cityCodeElem = Me.$("cityCode"),
		        belongCodeValue = cardParam.belongCode,
		        belongCode = Me.$("belongCode");
	        BusCard.$rs(cityCodeElem, dojo.map(cityCollection, function(paramObj) {
		                        return {
			                        id : paramObj.preserve_3,// cityCode
			                        name : paramObj.name
			                        
		                        };
	                        }));
	        cityCodeElem.value = cityCode;
	        cityCodeElem.onchange = function() {
		        var self = this,
			        value = this.value,
			        belongCodeColl = serviceParamDAOStub.getAreaCollByCityCode(value).list;
		        BusCard.$rs(belongCode, belongCodeColl);
		        var prodOfferAcceptLoader = dojo.getObject("prodOfferAcceptLoader");
		        if(!!prodOfferAcceptLoader && !!prodOfferAcceptLoader.getBelongCode){
		       		var selectedBelongCode = prodOfferAcceptLoader.getBelongCode();
		        	Me.renderDefaultValue({belongCode:belongCodeValue||selectedBelongCode});
		        }
		        BusCard.dispatchEvent(belongCode,"change");
	        };
	        BusCard.dispatchEvent(cityCodeElem,"change");  
        });
