BusCard.define('/buscardapp/rela/js/getBureauInfo.js',function(_buscard,cardParam){ 
	var Me = this;
	var a = arguments[0];
	var b = arguments[1];
	
	var serviceParamBO = a.$remote("serviceParamBO");
	Me.initCard = function(){

        var branchNo=b.serviceRelation.branchNo; 
        var addressId=b.serviceRelation.addressId; 
        var addrDetail=b.serviceRelation.addrDetail;
    	var addressIdElem = Me.$("addrId");
    	if(addrDetail&&Me.$('addrDetail'))
    	Me.$('addrDetail').value = addrDetail;
        if(addressId&&/^(\d+)$/.test(addressId.toString())){
          addressIdElem.rvalue = addressId;		
          var addressIdText  = a.$remote("mktGetAddressNameDAO").getAddressNameById(b.serviceRelation.cityCode,addressId);
          if(addressIdText)
        	  addressIdText = addressIdText.replace(/"/g,"");
          if(addressIdText!="null")
        	  addressIdElem.value = addressIdText;
        }
        if(Me.$("branchNo")){
	        var belongCode=b.serviceRelation.belongCode; 
	        var commonRegionDAOStub = BusCard.$remote("commonRegionDAO", "om");
				        var commonRegionVO = commonRegionDAOStub.getCommonRegionVO(parseInt(belongCode + ""));
				        if (commonRegionVO.regionLevel >= 5) {
					        belongCode=commonRegionVO.upRegionId+"";
				        }
	        //var bureaId=BusCard.$remote("commResourceBO").getUpIdByBureauId(b.serviceRelation.cityCode,b.serviceRelation.branchNo) + "";
	  	    var cdata = serviceParamBO.getBureauIdForChg(5, belongCode, b.serviceRelation.cityCode);
	
	  	     if (cdata && cdata.list){
		       var bureaParam=BusCard.find(cdata.list,function(data) {
		                     return data.id == b.serviceRelation.branchNo;
	                      });
	         }
		    if(bureaParam){
				Me.$("branchNo").innerHTML = bureaParam.name;
		    }
        }
//		Me.$("addressId").innerHTML = addressId;
	};
	Me.initCard();





	
});