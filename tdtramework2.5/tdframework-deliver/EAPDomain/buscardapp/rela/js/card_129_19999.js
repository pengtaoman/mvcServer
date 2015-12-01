BusCard.define('/buscardapp/rela/js/card_129_19999.js',function(_buscard,cardParam){ 
var Me = this;
var a = arguments[0];
var b = arguments[1];
var path = a.path.contextPath;
Me.productId = b.productId;
Me.belongCode = b.belongCode;
Me.cityCode = b.cityCode;
//for compatibility purpose
var customerData =function(){
	if(window.customerData){
		return window.customerData;
	}else{
		return dojo.global.$appContext$.get("requestParam").customerData;
	}

}();
var custId = 	customerData.custId;
var checkPstnInTemp = function(num){
var custOrderId = window.custOrderInfo?(window.custOrderInfo.custOrderId):"";
if(custOrderId&&/^(\d+)$/.test(custOrderId))
{
  var stub = BusCard.$remote("accessProdItemInfoDAO");
  try
  {
    var resultList = stub.selectByProperties({custOrderId:parseInt(custOrderId),serviceKind:10});
    if(resultList&&resultList.length>0)
    {
      var len = resultList.length;
      while(len--)
      {
        if(resultList[len].serviceId==num)
        return true;
      }
      return false;
    }
    else 
    return false;
  }
  catch(e){
       return false;
  }
 
}
else
return false;
};
/*
Me.$("sameLineTel").onblur = function() {
	var pstnServiceIdElemList = null; 
	try{pstnServiceIdElemList =ordermgr.accept.compnew._pstn_number_elem_list_; }catch(e){}
	if(pstnServiceIdElemList)
	{
	   var len = pstnServiceIdElemList.length;
	   while(len--)
	   {
	      if(pstnServiceIdElemList[len].value==this.value)
	       return true;
	   }
	}
	if(checkPstnInTemp(this.value)==true)
	return true;
	if (this.value && BusCard.util.trim(this.value)) {
		var stub = BusCard.$remote("prodInstCommFacadeBO");
		var result = stub.checkPstn_AdslSameline(this.value, custId, Me.cityCode);
		if (result.flag != '-1') {
			if (window.confirm("\u662f\u5426\u5c06\u5171\u7ebf\u53f7\u7801\u8bbe\u7f6e\u4e3a\u4e1a\u52a1\u53f7\u7801\uff1f")) {
				Me.$("serviceId").value = this.value;
				if(result.addressId){
					Me.$("addrId").rvalue = result.addressId;
				}
				if(result.addrDetail){
					Me.$("addrId").value = result.addrDetail;
					Me.$("addrDetail").value = result.addrDetail;
				}
				if(!Me.$("sameLineTelUserId")){
					var sameTelUserId = document.createElement("input");
					sameTelUserId.id = "sameLineTelUserId";
					sameTelUserId.type = "hidden";
					sameTelUserId.setAttribute("controlFieldName", "sameLineTelUserId");
					this.parentNode.appendChild(sameTelUserId);
				}
				Me.$("sameLineTelUserId").value = result.userId;
			}
		}
		else {
			alert(result.message);
			this.focus();
		}
	}
 
	else
		this.value = "";

};
*/

var getSameInfo = function(){
	var stub = BusCard.$remote("serviceRelationDAO");
		var serviceList = stub.query({"customerId":parseInt(customerData.custId),"cityCode":customerData.cityCode});
		var serviceRelaParamList = BusCard.util.findAll(serviceList,function(vo){
			return vo.serviceKind ==11||vo.serviceKind == 55;
		});
		var valueParamList = BusCard.util.map(serviceRelaParamList,function(vo){
			var stubCache = BusCard.$remote("cacheDictBO");
			var dictParam = stubCache.getCacheDict({"attrCd":55043,"infoValue":vo.productId});
			if(dictParam){
				vo.productName = dictParam.columnsName;
			}
			return {id:vo.productId,name:vo.serviceId+"("+vo.productName+")"};
		});
		var stubTemp = BusCard.$remote("accessProdItemInfoDAO");
		var serviceTempList = stubTemp.selectByProperties({"customerId":parseInt(customerData.custId)});
		var serviceRelaParamTempList = BusCard.util.findAll(serviceTempList,function(vo){
			return vo.serviceKind ==11||vo.serviceKind == 55;
		});
		var valueParamTempList = BusCard.util.map(serviceRelaParamTempList,function(vo){
			var stubCache = BusCard.$remote("cacheDictBO");
			var dictParam = stubCache.getCacheDict({"attrCd":55043,"infoValue":vo.productId});
			if(dictParam){
				vo.productName = dictParam.columnsName;
			}
			return {id:vo.productId,name:vo.serviceId+"("+vo.productName+")"};
		});
		if(valueParamTempList!=null&&valueParamTempList.length>0){
			Array.prototype.push.apply(valueParamList,valueParamTempList);
		}
		var xdslServiceIdElemList = null; 
		try{xdslServiceIdElemList =ordermgr.accept.compnew._xdsl_number_elem_list_; }catch(e){}
		if(xdslServiceIdElemList){
			var preXdslList = [];
		    var len = xdslServiceIdElemList.length;
		    while(len--){
		    	var serviceId = xdslServiceIdElemList[len].service.value;
		        if(serviceId.length>0){
		      	var vo ={};
		      	var prodId = xdslServiceIdElemList[len].productId;
		      	vo.id = prodId;
		      	var stubCache = BusCard.$remote("cacheDictBO");
				var dictParam = stubCache.getCacheDict({"attrCd":55043,"infoValue":prodId});
				if(dictParam){
					vo.name = serviceId+"("+dictParam.columnsName+")";
				}
		      	preXdslList.push(vo);
		      }
		   }
		   Array.prototype.push.apply(valueParamList,preXdslList);
		}
		var len = valueParamList.length;
		valueParamList.sort(function(e1,e2){
			var name1 = e1.name;
			var name2 = e2.name;
			return name1>name2?1:((name1==name2)?0:-1);
		});
		var len = valueParamList.length;
		var resultList = [];
		var flagArray = [];
		for(var index=0;index<len;index++){
	    	if(flagArray[valueParamList[index].name]!=1){
	    		resultList.push(valueParamList[index]);
	    		flagArray[valueParamList[index].name] = 1;        		
	    	}
		}
		return resultList;	
	}

var initSameData = getSameInfo()[0];

if(initSameData&&initSameData.length>0){
	
Me.$("sameLineTel").value = initSameData.name;

Me.$("sameLineTel").rvalue =initSameData.name.split("(")[0];

Me.$("sameLineProdId").value = initSameData.id;
	
}

Me.$("sameLineTel").onquery = function () {
		return getSameInfo();
	};
	
Me.$("sameLineTel").onafterclick = function(){
		Me.$("sameLineProdId").value = Me.$("sameLineTel").rvalue;
		var str = Me.$("sameLineTel").value;
		var strArray = str.split("(");
		Me.$("sameLineTel").rvalue = strArray[0];
	};

/*
Me.$("sameAddrTel").onblur = function() {
	var pstnServiceIdElemList = null; 
	try{pstnServiceIdElemList =ordermgr.accept.compnew._pstn_number_elem_list_; }catch(e){}
	if(pstnServiceIdElemList)
	{
	   var len = pstnServiceIdElemList.length;
	   while(len--)
	   {
	      if(pstnServiceIdElemList[len].value==this.value)
	       return true;
	   }
	}
	if(checkPstnInTemp(this.value)==true)
	return true;
	if (this.value && BusCard.util.trim(this.value)) {
		var stub = BusCard.$remote("prodInstCommFacadeBO");
		var result = stub.checkPstn_AdslSameline(this.value, custId, Me.cityCode);
		if (result.flag == '-1') {
			alert(result.message);
			this.focus();
		}else{
			if(result.addressId){
				Me.$("addrId").rvalue = result.addressId;
			}
			if(result.addrDetail){
				Me.$("addrId").value = result.addrDetail;
				Me.$("addrDetail").value = result.addrDetail;
			}
			if(!Me.$("sameAddrTelUserId")){
				var sameTelUserId = document.createElement("input");
				sameTelUserId.id = "sameAddrTelUserId";
				sameTelUserId.type = "hidden";
				sameTelUserId.setAttribute("controlFieldName", "sameAddrTelUserId");
				this.parentNode.appendChild(sameTelUserId);
			}
			Me.$("sameAddrTelUserId").value = result.userId;
			Me.$("sameAddrProdId").value = result.productId;
		}
	}
	else
		this.value = "";

};
*/

Me.$("sameAddrTel").onquery = function(){
	if (this.value && BusCard.util.trim(this.value)) {
		var stub = BusCard.$remote("prodInstCommFacadeBO");
		var serviceId = this.value;
		if(serviceId.split("(")){
			serviceId = serviceId.split("(")[0];
		}
		var result = stub.checkPstn_AdslSameline(serviceId, custId, Me.cityCode);
		if (result.flag == '-1') {
			alert(result.message);
			this.focus();
		}else{
			if(result.sameAddrList){
				var sameAddrList = result.sameAddrList;
				var valueParamTempList = BusCard.util.map(sameAddrList,function(vo){
					var stubCache = BusCard.$remote("cacheDictBO");
					var dictParam = stubCache.getCacheDict({"attrCd":55043,"infoValue":vo.productId});
					if(dictParam){
						vo.productName = dictParam.columnsName;
					}
					return {
						id:vo.productId+"-"+vo.addressId+"-"+vo.addrDetail+"-"+vo.userId,
						name:vo.serviceId+"("+vo.productName+")"
						};
				});
				return valueParamTempList;
			}
		}
	}
};

Me.$("sameAddrTel").onafterclick = function(){
	var serInfo = Me.$("sameAddrTel").rvalue;
	var serInfoArray = serInfo.split("-");
	if(serInfoArray[0]){
		Me.$("sameAddrProdId").value = serInfoArray[0];
	}
	if(serInfoArray[1]){
		Me.$("addrId").rvalue = serInfoArray[1];
	}
	if(serInfoArray[2]){
		Me.$("addrId").value = serInfoArray[2];
		Me.$("addrDetail").value = serInfoArray[2];
	}
	if(!Me.$("sameAddrTelUserId")){
				var sameTelUserId = document.createElement("input");
				sameTelUserId.id = "sameAddrTelUserId";
				sameTelUserId.type = "hidden";
				sameTelUserId.setAttribute("controlFieldName", "sameAddrTelUserId");
				this.parentNode.appendChild(sameTelUserId);
	}
	if(serInfoArray[3]){
		Me.$("sameAddrTelUserId").value = serInfoArray[3];
	}
	var str = Me.$("sameAddrTel").value;
	var strArray = str.split("(");
	Me.$("sameAddrTel").rvalue = strArray[0];
};

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
var serviceIdElemList = BusCard.util.findAll(serviceIdElemRawList,function(elem){
return (elem!=inputElem)&&(elem.controlFieldName =="serviceId")&&(elem.value!=null&&elem.value!="");
});

var serviceList = a.$remote("serviceRelationDAO").query({"customerId":parseInt(customerData.custId),"cityCode":customerData.cityCode});
var serviceRelaParamList = a.util.findAll(serviceList,function(vo){
return vo.serviceKind ==10||vo.serviceKind == 8;
});
var valueParamList = a.util.map(serviceRelaParamList,function(vo){
return {value:vo.serviceId};
});
 



if(valueParamList!=null&&valueParamList.length>0){
Array.prototype.push.apply(serviceIdElemList,valueParamList);
}



if(serviceIdElemList&&serviceIdElemList.length>0){
if(confirm("\u662f\u5426\u4ece\u5176\u4ed6\u4e1a\u52a1\u751f\u6210\u53f7\u7801?"))
{
  displayElem.innerHTML = "";
  var formatDataList = BusCard.util.map(serviceIdElemList,function(elem){
  return  {id:elem.value,name:elem.value};
  });
  var _serviceid_len = formatDataList.length;
  for (var index = 0; index < _serviceid_len; index++) {
		var span = a.$c("span");
		span.className = "buscard-combobox-item";
		span.value = formatDataList[index].id || formatDataList[index].ids;
		span.innerHTML = formatDataList[index].name;
		// add event listener for select item
		span.onclick = function() {
		   //inputElem.rvalue = this.getAttribute("value");
		   inputElem.value = this.innerHTML;
		   displayElem.style.display = "none";
		   // when checkbox hidden ,decrease zindex for
		   // avoiding covering,for more details about
		   // zIndex,please see [stacking context]
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
							// when checkbox display, increase zindex for making
							// sure it visible
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
