BusCard.define('/buscardapp/rela/js/stopServiceHandler.js',function(_buscard,cardParam){
 var ConstantsPool = dojo.require("orderaccept.common.js.ConstantsPool");
 var ProductIdConst = ConstantsPool.load("ProductIdConst").ProductIdConst;	 
var Me = this;
var a = arguments[0];
var b = arguments[1];
var param=b.productId;
var serviceOfferIdObj = b.serviceOfferId;
var serviceParamBO = a.$remote("serviceParamBO");
try {
	if(b.productId==ProductIdConst.PRODUCT_ID)
	{
	   this.$('label_stopType').innerHTML='<span class="buscard-label">\u53bb\u6fc0\u6d3b\u7c7b\u578b<span class="formRequested">*</span></span>'
	}else
	{
	    if(b.serviceRelation)
	     {
	     param=b.serviceRelation.serviceKind;
	     }
	
	}
	var stopTypeElem =this.$("stopType");
	 if (stopTypeElem) {
       var stopTypeData = serviceParamBO.getStopType(param);
	   if (stopTypeData && stopTypeData.list) a.$rs(stopTypeElem, stopTypeData.list);
	}
	var getFusionNums = null;
	try{getFusionNums = ordermgr.accept.comp.getFusionNums}catch(e){alert(e.message)}
	stopTypeElem.onchange = function(){	
		if(stopTypeElem.value==210||stopTypeElem.value==212){
			//stopServiceStatusElem.style.display="none";
			//$("label_stopServiceStatus").style.display="none";
			if(stopTypeElem.value==212){
				getFusionNums.initCheckBox(false);
		     }else{
				getFusionNums.initCheckBox(false);
			}
			if(stopTypeElem.value==212){
		    	var parameters = "userId="+b.serviceRelation.userId;
				parameters += "&customerId="+b.serviceRelation.customerId;
				parameters += "&serviceId="+b.serviceRelation.serviceId;
				parameters += "&productId="+b.productId;
				parameters += "&cityCode="+ b.cityCode;
				parameters += "&serviceKind="+b.serviceRelation.serviceKind;
				parameters += "&serviceOfferId="+serviceOfferIdObj;
				executeRequest("secondAcceptAjaxAction", "checkIfHaveStopStatus", parameters);
			}
		}else{
			//stopServiceStatusElem.style.display="";
			//$("label_stopServiceStatus").style.display="";
			getFusionNums.initCheckBox(false);
		}
	}
	BusCard.Namespace.create("ordermgr.accept.compnew");
	ordermgr.accept.compnew.value = serviceOfferIdObj;
	
	this.$('sameStopNum').innerHTML =getFusionNums.getInnerHtml();
	getFusionNums.initCheckBox(false);
	this.$('sameStopNum').collectData =  function(){
	  	return  getFusionNums.collectData();
	}

	
}	
catch (e) {
	alert(e.message);
}


	
});
