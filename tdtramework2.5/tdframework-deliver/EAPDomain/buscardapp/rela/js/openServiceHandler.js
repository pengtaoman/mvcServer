BusCard.define('/buscardapp/rela/js/openServiceHandler.js',function(_buscard,cardParam){ 
 var ConstantsPool = dojo.require("orderaccept.common.js.ConstantsPool");
 var ServingStatusConst = ConstantsPool.load("ServingStatusConst").ServingStatusConst;
 var ProductIdConst = ConstantsPool.load("ProductIdConst").ProductIdConst;	
var Me = this;
var a = arguments[0];
var b = arguments[1];
var param=b.productId;
var servingStatus;
var cityCode;
var serviceParamBO = a.$remote("serviceParamBO");
try {

   if(b.serviceRelation){
   	servingStatus = b.serviceRelation.servingStatus;
   	cityCode = b.serviceRelation.cityCode;
   	
   	}else{
   	servingStatus=b.prodInst.stateCd;	
   	cityCode=b.prodInst.cityCode;	
   		
   	}
    if(b.serviceRelation){
	    if(b.productId!=ProductIdConst.PRODUCT_ID)
		{
		 param=b.serviceRelation.serviceKind;
		}
	}
	var getFusionNums = null;
	try{getFusionNums = ordermgr.accept.comp.getFusionNums}catch(e){alert(e)}
	this.$('sameOpenNum').innerHTML =getFusionNums.getInnerHtml();
	var openTypeElem =this.$("openType");
	if (openTypeElem) {
       var openTypeData = serviceParamBO.getOpenType(param);
	   if (openTypeData && openTypeData.list) a.$rs(openTypeElem, openTypeData.list);
	}
	
	
	if(servingStatus == ServingStatusConst.APPLY_CALL_LIMIT){
		for(var i=0;i<openTypeElem.length;i++){  
			 if(openTypeElem.options[i].value=="219"){  
			  	openTypeElem.options[i].selected=true;  
			  	getFusionNums.initCheckBox(false);
			  	break;  
			 	}  
			 }
	}else if(servingStatus ==ServingStatusConst.APPLY_STOP){
		for(var i=0;i<openTypeElem.length;i++){  
			 if(openTypeElem.options[i].value=="11"){  
			  	openTypeElem.options[i].selected=true;  
			  	getFusionNums.initCheckBox(false);
			  	break;  
			 	}  
			 }
	}else if(servingStatus ==ServingStatusConst.LOSS_STOP){
		for(var i=0;i<openTypeElem.length;i++){  
			 if(openTypeElem.options[i].value=="211"){  
			  	openTypeElem.options[i].selected=true;  
			  	getFusionNums.initCheckBox(false);
			  	break;  
			 	}  
			 }
	}else{
		for(var i=0;i<openTypeElem.length;i++){  
			 if(openTypeElem.options[i].value=="213"){  
			  	openTypeElem.options[i].selected=true;  
			  	getFusionNums.initCheckBox(false);
			  	break;  
			 	}  
			 }
	}
	openTypeElem.disabled = true; 
	
	function checkData(){
		var data = [];
		var checkboxList = document.getElementsByTagName("input");
		BusCard.util.each(checkboxList, function(dom) {
			if (dom.type && dom.type.toUpperCase() == 'CHECKBOX' && dom.checked) {
				var obj = {};
				obj.userId = dom.value;
				obj.serviceId = dom.serviceId;
				obj.cityCode = cityCode;
				obj.serviceOfferId = openTypeElem.value;
				data.push(obj);
			}
		})
		var result = BusCard.$remote("validOrderActionBO").checkOpenServiceWhenSelectReason(data);	
		var code = result.code;
		if(code < 0){
			return result;
		}
	}

	var checkboxList1 = document.getElementsByTagName("input");
	BusCard.util.each(checkboxList1, function(dom) {
		if (dom.type && dom.type.toUpperCase() == 'CHECKBOX') {
			dom.onclick = function(){
				var res = checkData();
				if(res){
					var list = res.userIdList;
					var userIdArray = list.split(",");
					if(userIdArray&&userIdArray.length>0){
						 for(var i = 0, len = userIdArray.length; i < len; i++){ 
     					 	if(userIdArray[i] == dom.value){
     					 		dom.disabled = true;
     					 		dom.checked = false;
     					 		alert(res.message);
     					 	}
     					 }
					}
				}
			}
		}
	})
	
	this.$('sameOpenNum').collectData =  function(){
	  	return  getFusionNums.collectData();
	}
}	
catch (e) {
	alert(e.message);
}


	
});
