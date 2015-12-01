defineModule("orderaccept.prodofferaccept.data.ProdOfferProtocolDataBuilder", ["../util",
                "../../common/js/ConstantsPool", "./ProdOfferNewDataBuilder"], function(util, ConstantsPool,
                ProdOfferNewDataBuilder) {
	        dojo.declare("orderaccept.prodofferaccept.data.ProdOfferProtocolDataBuilder", [ProdOfferNewDataBuilder], {
		        buildCustOrderBasicAcceptInfoVO : function() {
			        var custOrderBasicAcceptInfoVO = this.inherited(arguments);
			        var rq = $ac$.get("requestParam");
			        custOrderBasicAcceptInfoVO.agreementId = "" + rq.protocolAcceptInfoVO.orderId;
			        custOrderBasicAcceptInfoVO.protocolProdOfferId = rq.protocolAcceptInfoVO.protocolProdOfferInfoVO.prodOfferId;
			        return custOrderBasicAcceptInfoVO;
		        }
		        
	        });
	        
        });