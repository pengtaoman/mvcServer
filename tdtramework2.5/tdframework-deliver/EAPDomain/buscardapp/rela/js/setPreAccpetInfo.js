BusCard.define('/buscardapp/rela/js/setPreAccpetInfo.js', function(_buscard, cardParam) {
	        var Me = this;
	        var a = arguments[0];
	        var b = arguments[1];
	        var executeRequest = _buscard.executeRequest;
            var uniqueId = b.uniqueId;
	        var unicoder = {
		        "KEY_NOT_BLANK" : "\u8bf7\u8f93\u5165\u67e5\u8be2\u5173\u952e\u8bcd"
	        };
	        Me.init = function() {	        	
				if (dojo.getObject("prodOfferAcceptLoader") != null && 
							prodOfferAcceptLoader.declaredClass == "orderaccept.prodofferaccept.loader.PreAcceptOrderLoader") {
					var preAcceptOrderVO = prodOfferAcceptLoader.preAcceptOrderVO;
				    var preAcceptOfferVO = prodOfferAcceptLoader.preAcceptOfferVO ;
				    if(!!preAcceptOrderVO){
				    	if(!!Me.$("serviceId") && !!preAcceptOrderVO.serviceId){				    	
				    		Me.$("serviceId").value = preAcceptOrderVO.serviceId;
                            BusCard.dispatchEvent(Me.$("serviceId"),"blur");
				    		setTimeout(function(){
				    				!!Me.$("serviceId").setPPPOEPwd?Me.$("serviceId").setPPPOEPwd():null;
				    			},3000);
							
				    	}
				    	if(!!Me.$("addrId")){	
				    		var addressId = preAcceptOrderVO.standardAddressId;
				    		var addressIdElem = Me.$("addrId");
                            var addrDetailElem = Me.$("addrDetail");
					        if (addressIdElem && !!addressId) {
						        addressIdElem.rvalue = addressId;
						        var addressIdText = a.$remote("mktGetAddressNameDAO").getAddressNameById(
						                preAcceptOrderVO.acceptCity, addressId);
						        if (addressIdText) {
							        addressIdText = addressIdText.replace(/"/g, "");
						        } 
						        if (addressIdText&&addressIdText != "null") {
							        addressIdElem.value = addressIdText;
                                    if(!!addrDetailElem){
                                        addrDetailElem.value = addressIdText;
                                    }
						        }else{
						        	addressIdElem.value = addressId ||"0";
						        }
					        } 		        
				    	}
				    	if(!!Me.$("bureauId") && !!preAcceptOrderVO.bureauId){
				    		Me.$("bureauId").value = preAcceptOrderVO.bureauId;
				    	}
				    	if(!!Me.$("branchNo") && !!preAcceptOrderVO.bureauNo){
				    		Me.$("branchNo").value = preAcceptOrderVO.bureauNo;				    		
				    	}
	                    var switchno = preAcceptOrderVO.switchId;
                        if(!!switchno){
                            setTimeout(function(){                                
						          var attrCardList = prodOfferAcceptLoader.serviceCardWidgetMap || [];
                                  var attrCard = attrCardList["serviceCardWidget_"+Me.uniqueId].attrCardWidget || {};
					              var targetAttr = !!attrCard.busCardInstance?attrCard.busCardInstance.$('60056'):null;
                                  !!targetAttr?targetAttr.value=switchno:null;
                                },3000);                            
                        }
				    }
				}
	        };
	        Me.init();
	        
        });
