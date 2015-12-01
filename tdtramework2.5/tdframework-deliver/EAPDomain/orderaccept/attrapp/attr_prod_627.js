BusCard.define('/orderaccept/attrapp/attr_prod_627',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	        	var Me=this;
	        	var ConstantsPool = dojo.require("orderaccept.common.js.ConstantsPool");
	 			var ServingStatusConst = ConstantsPool.load("ServingStatusConst").ServingStatusConst;	
	 			var ProductIdConst = ConstantsPool.load("ProductIdConst").ProductIdConst;
	 			var AttrCDConst = ConstantsPool.load("AttrCDConst").AttrCDConst;
	 			var custId = !!$ac$.groupInfo?$ac$.groupInfo.custId:$ac$.requestParam.customerData.custId;
	 			var cityCode = !!$ac$.groupInfo?$ac$.groupInfo.cityCode:$ac$.requestParam.customerData.cityCode;
	        	//查询客户下订购的商务领航客户账号
	        	var prodInstInfo = BusCard.$remote("prodInstCommFacadeBO").getProdInstByProperties({
	        		ownerCustId : custId,
	        		cityCode : cityCode,
	        		stateCd : ServingStatusConst.ON_USING,
	        		productId : ProductIdConst.PILOTAGE
	        	})[0];
	        	if(!!prodInstInfo){
	        		var prodInstAttrInfo = BusCard.$remote("prodInstCommFacadeBO").getProdInstAttrByInstIdAndAttrCd(
	        			prodInstInfo.prodInstId,cityCode,AttrCDConst.PILOTAGE_ID
	        		);
	        		if(!!prodInstAttrInfo){
	        			Me.$("627").value = prodInstAttrInfo.attrValue;
	        			Me.$("627").readOnly = true;
	        		}
	        	}
	        };
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	        /**
	         * 综合查询页面处理分支
	         * @method
	         */
	        var allInfoQueryPageDispatch = function() {};
	        /**
	         * 二次业务处理分支
	         * @method
	         */
	        var secondBusinessPageDispatch = function() {};
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {	        	
	        	var Me=this;
	        	var ConstantsPool = dojo.require("orderaccept.common.js.ConstantsPool");
	 			var ServingStatusConst = ConstantsPool.load("ServingStatusConst").ServingStatusConst;	
	 			var ProductIdConst = ConstantsPool.load("ProductIdConst").ProductIdConst;
	 			var AttrCDConst = ConstantsPool.load("AttrCDConst").AttrCDConst;
	 			var custId = document.getElementById("custId").value;
	 			var cityCode = document.getElementById("cityCode").value;
	        	//查询客户下订购的商务领航客户账号
	        	var prodInstInfo = BusCard.$remote("prodInstCommFacadeBO").getProdInstByProperties({
	        		ownerCustId : custId,
	        		cityCode : cityCode,
	        		stateCd : ServingStatusConst.ON_USING,
	        		productId : ProductIdConst.PILOTAGE
	        	})[0];
	        	if(!!prodInstInfo){
	        		var prodInstAttrInfo = BusCard.$remote("prodInstCommFacadeBO").getProdInstAttrByInstIdAndAttrCd(
	        			prodInstInfo.prodInstId,cityCode,AttrCDConst.PILOTAGE_ID
	        		);
	        		if(!!prodInstAttrInfo){
	        			Me.$("627").value = prodInstAttrInfo.attrValue;
	        			Me.$("627").readOnly = true;
	        		}
	        	}
	       
	        };
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
