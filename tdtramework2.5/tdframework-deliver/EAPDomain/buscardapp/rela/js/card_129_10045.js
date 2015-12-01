BusCard.define('/buscardapp/rela/js/card_129_10045.js',function(_buscard,cardParam){ 

var Me = this;
var a = arguments[0];
var b = arguments[1];
//for compatibility purpose
var customerData =function(){
	if(window.customerData){
		return window.customerData;
	}else{
		return dojo.global.$appContext$.get("requestParam").customerData;
	}

}();
//for compatibility
var executeRequest = _buscard.executeRequest;
Me.productId = b.productId;
Me.cityCode = b.cityCode;
Me.serviceOfferId = b.serviceOfferId;
Me.checkResource = function () {
	var E = Me.$("serviceId");
	var A = Me.$("serviceId").value;
	if (!A) {
		return true;
	}else if(A.substring(0,3)=="133"||A.substring(0,3)=="153"||A.substring(0,3)=="189"||A.substring(0,3)=="180"){
		var C = "serviceId=" + A + "&serviceOfferId=" + Me.serviceOfferId + "&productId=" + Me.productId + "&cityCode=" + Me.cityCode;
		var D = executeRequest("prodOfferSaleAjaxAction", "checkResource", C);
		var B = executeAjaxResult(D);
		if (B == false) {
			Me.resetServiceId();
			return;
		}
		Me.$("resInstId").value = B.split("&")[0];
	}else{
		return ;
	}
};
Me.resetServiceId = function () {
	Me.$("serviceId").value = "";
};
Me.returnBlank = function () {
	var A = (navigator.appname == "Netscape") ? event.which : event.keyCode;
	if (A != 32) {
		return true;
	} else {
		return false;
	}
};

Me.$("serviceId").onblur = function () {
	Me.checkResource();
};
Me.$("serviceId").onkeypress = function () {
	return Me.returnBlank();
}
/*handle num select */
void function(){
var inputElem = Me.$("serviceId");
inputElem.parentNode.className  = "buscard-el buscard-inline-buttom buscard-combobox-ctn";
var displayElem  = document.createElement("div");
displayElem.className = "buscard-combobox-display-ctn";
inputElem.parentNode.appendChild(displayElem);
var linkElem = Me.$("link_serviceId");
var preDefineOnclick = Me.$("link_serviceId").onclick;
Me.$("link_serviceId").onclick = function(){
	var serviceIdElemRawList = document.getElementsByName("serviceId");
	var serviceIdElemList = BusCard.util.findAll(
		serviceIdElemRawList,function(elem){
			return (elem!=inputElem)&&(elem.controlFieldName =="serviceId")
				&&(elem.value!=null&&elem.value!="");
		}
	);

var serviceList = a.$remote("serviceRelationDAO").query(
	{"customerId":parseInt(customerData.custId),
	 "cityCode":customerData.cityCode,
	 "ifValid":1
	});
var serviceRelaParamList = a.util.findAll(serviceList,function(vo){
	return vo.serviceKind ==8||vo.serviceKind ==10;
});
var valueParamList = a.util.map(serviceRelaParamList,function(vo){
	return {value:vo.serviceId};
});
var serviceTempList = a.$remote("accessProdItemInfoDAO").selectByProperties(
	{"customerId":parseInt(customerData.custId)}
	);
var serviceRelaParamTempList = BusCard.util.findAll(serviceTempList,function(vo){
	return vo.serviceKind ==8||vo.serviceKind ==10;
});
var valueParamTempList = BusCard.util.map(serviceRelaParamTempList,function(vo){
	return {value:vo.serviceId};
});

if(valueParamList!=null&&valueParamList.length>0){
	Array.prototype.push.apply(serviceIdElemList,valueParamList);
}
if(valueParamTempList!=null&&valueParamTempList.length>0){
	Array.prototype.push.apply(serviceIdElemList,valueParamTempList);
}
/*
 * 取页面的pstn号码
 **/
var pstnServiceIdElemList = null; 
try{pstnServiceIdElemList =ordermgr.accept.compnew._pstn_number_elem_list_; }catch(e){}
if(pstnServiceIdElemList){
	var prePstnList = [];
    var len = pstnServiceIdElemList.length;
    while(len--){
    	var serviceId = pstnServiceIdElemList[len].service.value;
        if(serviceId.length>0){
      	var vo ={};
			vo.value = serviceId;
		}
      	prePstnList.push(vo);
      }
    if(prePstnList!=null&&prePstnList.length>0){
	  Array.prototype.push.apply(valueParamList,prePstnList);
	}
  }


/*
 * 取页面的pstn号码
 **/
var cdmaServiceIdElemList = null; 
try{cdmaServiceIdElemList =ordermgr.accept.compnew._cdma_number_elem_list_; }catch(e){}
if(cdmaServiceIdElemList){
	var preCdmaList = [];
    var len = cdmaServiceIdElemList.length;
    while(len--){
    	var serviceId = pstnServiceIdElemList[len].service.value;
        if(serviceId.length>0){
      	var vo ={};
			vo.value = serviceId;
		}
      	preCdmaList.push(vo);
      }
    if(prePstnList!=null&&prePstnList.length>0){
	  Array.prototype.push.apply(valueParamList,preCdmaList);
	}
  }

/*
 * 对收集到的数据集合去重
 * */
var len = serviceIdElemList.length;
var resultList = [];
var flagArray = [];
for(var index=0;index<len;index++){
	if(flagArray[serviceIdElemList[index].value]!=1){
		resultList.push(serviceIdElemList[index]);
		flagArray[serviceIdElemList[index].value] = 1;        		
	}
}

if(resultList&&resultList.length>0){
if(confirm("\u662f\u5426\u4ece\u5176\u4ed6\u4e1a\u52a1\u751f\u6210\u53f7\u7801?"))
{
  displayElem.innerHTML = "";
  var formatDataList = BusCard.util.map(resultList,function(elem){
  return  {id:elem.value,name:elem.value};
  });
  var _serviceid_len = formatDataList.length;
  for (var index = 0; index < _serviceid_len; index++) {
		var span = a.$c("span");
		span.className = "buscard-combobox-item";
		span.value = formatDataList[index].id || formatDataList[index].ids;
		span.innerHTML = formatDataList[index].name;
		span.onclick = function() {
	    inputElem.value = this.innerHTML;
	    displayElem.style.display = "none";
	    displayElem.parentNode.style.zIndex = "0";
		 };
		span.onmouseover = function() {
		   this.className = "buscard-combobox-item buscard-combobox-item-over";
		 };
		span.onmouseout = function() {
		  this.className = "buscard-combobox-item buscard-combobox-item-out";
		 };
		displayElem.appendChild(span);
		}
	 displayElem.parentNode.style.zIndex = "10";
	 displayElem.style.display = "block";

}
else
preDefineOnclick.apply(linkElem,[event||window.event]);

}
else 
preDefineOnclick.apply(linkElem,[event||window.event]);
	
};
}();


});
