BusCard.define('/buscardapp/rela/js/getProductChangeAccept.js', function(_buscard, cardParam) {
	        var Me = this;
	        var a = arguments[0];
	        var b = arguments[1];
	        Me.init = function(_buscard, cardParam) {
	            var accessProdInstList = BusCard.jsonPath(dojo.global.$appContext$.get("userHasProdOfferInfoList")
                        || [], "$[*].prodInstList[?(@.serviceRelationVO!=null)]");
			    if (accessProdInstList && accessProdInstList.length > 0) {
			    	this.serviceRelation= accessProdInstList[0].serviceRelationVO;
			    	cardParam.serviceRelation=this.serviceRelation;
			    }
		        if(this.serviceRelation){
		        	if(!this.serviceRelation.serviceId){
						this.serviceRelation.serviceId = this.serviceRelation.accNbr;									        	
		        	}
		        }
		        this.renderDefaultValue(this.serviceRelation);
		        (function() {
			        var addressId = Me.serviceRelation.addressId;
			        var addressIdElem = Me.$("addrId");
			        if (addressIdElem && !!addressId && parseInt(addressId) > 0) {
				        addressIdElem.rvalue = addressId;
				        var addressIdText = a.$remote("mktGetAddressNameDAO").getAddressNameById(
				                Me.serviceRelation.cityCode, addressId);
				        if (addressIdText) {
					        addressIdText = addressIdText.replace(/"/g, "");
				        } 
				        if (addressIdText&&addressIdText != "null"&&addressIdText != "\"\"") {
					        addressIdElem.value = addressIdText;
				        }else{
				        	addressIdElem.value = addressId ||"0";
				        }
			        } 		        
					
		        })();
		        if(!this.serviceRelation.bureauId){
		        	var bureauId=a.$remote("commResourceBO").getUpIdByBureauId(this.serviceRelation.cityCode,this.serviceRelation.branchNo);
		        	this.serviceRelation.bureauId=a.parse(bureauId);
		        }
			      
		        
	        };
	        Me.init(_buscard, cardParam);
	        
        });
