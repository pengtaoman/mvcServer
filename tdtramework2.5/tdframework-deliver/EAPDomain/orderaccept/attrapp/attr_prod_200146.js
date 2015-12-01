BusCard.define('/orderaccept/attrapp/attr_prod_200146.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	if($ac$.groupProdInstInfo){//成员订购
		var ProdInstAttrVOList = BusCard.$remote("prodInstAttrBO").
			getProdInstAttrByInstId($ac$.groupProdInstInfo.prodInstId,$ac$.groupProdInstInfo.cityCode);
		var attrInst = dojo.filter(ProdInstAttrVOList,function(prodInstAttr){
			return prodInstAttr.attrId == "200146";
		})[0];
		Me.$("200146").value = attrInst.attrValue;
	}else{
		Me.$("200146").value = "HE"+eval(BusCard.$remote("serviceParamBO").getSpecGroupId());
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
	        	var Me = this;
        		var ProdInstAttrVOList = BusCard.$remote("prodInstAttrBO").
        			getProdInstAttrByInstId($("prodInstId").value,$("cityCode").value);
        		var attrInst = dojo.filter(ProdInstAttrVOList,function(prodInstAttr){
        			return prodInstAttr.attrId == "200146";
        		})[0];
        		Me.$("200146").value = attrInst.attrValue;
	        };
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
