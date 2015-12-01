BusCard.define('/buscardapp/rela/js/getChangeSales.js', function(_buscard, cardParam) {
	        var Me = this;
	        var a = arguments[0];
	        var b = arguments[1];
	        var executeRequest = _buscard.executeRequest;
	        var unicoder = {
		        "KEY_NOT_BLANK" : "\u8bf7\u8f93\u5165\u67e5\u8be2\u5173\u952e\u8bcd"
	        };
	        Me.init = function() {
		        // alert(c)
		        // var productId=b.productId;
		        // var serviceId=b.serviceId;
		        // var parameter = "productId=" +
		        // productId+"&serviceId="+serviceId;
		        // var resultJsonStr =
		        // executeRequest("secondAcceptAjaxAction",
		        // "getOldSimCard", parameter);
	        	var contcatPhoneNode =   Me.$("contcatPhone");
	        	var addrIdNode = Me.$("addrId");
	        	var addrDetailNode = Me.$("addrDetail");
	        	var branchNoNode = Me.$("branchNo");
		        var serviceIdNode = Me.$("serviceId");
		        contcatPhoneNode&&(contcatPhoneNode.disabled = true);
		        addrIdNode&&(addrIdNode.disabled = true);
		        addrDetailNode &&(addrDetailNode.disabled = true);
		      	branchNoNode&&(branchNoNode.disabled = true);
		      	serviceIdNode&&(serviceIdNode.disabled = true);
		        //Me.$("paymentModeCd").disabled = true;
		        //Me.$("serviceGroupId").disabled = true;
		        this.serviceRelation = _buscard.$remote("prodInstCommFacadeBO").getServiceRelationByProperties({
			                userId : this.getCardRelationInfo().userId
		                })[0]||_buscard.$remote("prodInstDAO").queryById({prodInstId:parseInt(this.getCardRelationInfo().userId+"")});
		        if(this.serviceRelation){
		        	if(!this.serviceRelation.serviceId){
						this.serviceRelation.serviceId = this.serviceRelation.accNbr;									        	
		        	}
		        }
		        this.renderDefaultValue(this.serviceRelation);
		        if(!!Me.$("paymentModeCd")){
		       		Me.$("paymentModeCd").value = this.serviceRelation.billMode;
		        }
		        // handle stardard address
		        (function() {
			        var addressId = Me.serviceRelation.addressId;
			        var addressIdElem = Me.$("addrId");
			        if (addressIdElem) {
				        addressIdElem.rvalue = addressId;
				        var addressIdText = a.$remote("mktGetAddressNameDAO").getAddressNameById(
				                Me.serviceRelation.cityCode, addressId);
				        if (addressIdText) {
					        addressIdText = addressIdText.replace(/"/g, "");
				        } 
				        if (addressIdText&&addressIdText != "null") {
					        addressIdElem.value = addressIdText;
				        }else{
				        	addressIdElem.value = addressId ||"0";
				        }
			        } 		        
					var serGrpInfo = BusCard.$remote("prodInstCommFacadeBO").getUserRoleChangeHisInfo({"userId":(Me.serviceRelation.userId||Me.serviceRelation.prodInstId)})[0];
					if(!!serGrpInfo && !!serGrpInfo.serviceGroupId){
						var serviceGroupName =  BusCard.util.parse(BusCard.$remote("serviceParamBO").getServiceGroupName(serGrpInfo.cityCode,serGrpInfo.serviceGroupId,serGrpInfo.serviceKind));					
						Me.$("serviceGroupId").rvalue = serGrpInfo.serviceGroupId;
				        Me.$("serviceGroupId").value = serviceGroupName;
					}
		        })();
		        
	        };
	        Me.init();
//	        BusCard.each(BusCard.query(".formRequested", this.dom), function(d) {
//		                d.parentNode.removeChild(d);
//	                });
	        
        });
