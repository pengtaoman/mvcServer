BusCard.define('/buscardapp/rela/js/card_129_10081.js',function(_buscard,cardParam){ 
try{
var Me = this;
var a = arguments[0];
var b = arguments[1];
var path = a.path.contextPath;
Me.productId = b.productId;
Me.belongCode = b.belongCode;
Me.cityCode = b.cityCode;
var messageBox = dojo.require("orderaccept.common.dialog.MessageBox");
//for compatibility purpose
var customerData =function(){
	if(window.customerData){
		return window.customerData;
	}else{
		if(dojo.global.$appContext$&&dojo.global.$appContext$.get("requestParam")){
		  return dojo.global.$appContext$.get("requestParam").customerData;
		}else{
		  return {custId:b.serviceRelation.customerId ,cityCode:b.serviceRelation.cityCode};
		}
		
		
	}

}();
var custId = 	customerData.custId;
var serviceList = null;
var serviceTempList = null;
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


/**
 * 重新设置标准地址，装机地址
 */
Me.resetAddrId = function(targetServiceId,targetProductId){
	var ifHasGetAddrIdInfo = false;//查找标识，查到了置为true
	if(serviceList!=null){
		for(var i = 0; i< serviceList.length;i++){
			var serviceInfo = serviceList[i];
			if(serviceInfo.serviceId == targetServiceId && serviceInfo.productId.toString() == targetProductId){
				//设置装机地址
				Me.$("addrDetail").value = serviceInfo.addrDetail;
				//设置标准地址
				try{
					var addrIdName = a.$remote("mktGetAddressNameDAO").getAddressNameById(serviceInfo.cityCode,serviceInfo.addressId);
					if(addrIdName!=null&&addrIdName!=""){
						Me.$("addrId").rvalue = serviceInfo.addressId;
						Me.$("addrId").value = addrIdName.replace(/"/g,"");	
					}
				}catch(e){
				}
				ifHasGetAddrIdInfo = true;
				break;
			}
		}
	}
	if(!ifHasGetAddrIdInfo){
		if(serviceTempList!=null){
			for(var i = 0; i< serviceTempList.length;i++){
				var serviceInfo = serviceTempList[i];
				if(serviceInfo.serviceId == targetServiceId && serviceInfo.productId.toString() == targetProductId){
					//设置装机地址
					Me.$("addrDetail").value = serviceInfo.addrDetail;
					//设置标准地址
					try{
						var addrIdName = a.$remote("mktGetAddressNameDAO").getAddressNameById(serviceInfo.cityCode,serviceInfo.addrId);
						if(addrIdName!=null&&addrIdName!=""){
							Me.$("addrId").rvalue = serviceInfo.addrId;
							Me.$("addrId").value = addrIdName.replace(/"/g,"");	
						}
					}catch(e){
					}
					break;
				}
			}
		}
	}
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
var serviceIdElemList = BusCard.util.findAll(serviceIdElemRawList,function(elem){
return (elem!=inputElem)&&(elem.controlFieldName =="serviceId")&&(elem.value!=null&&elem.value!="");
});

var serviceList = a.$remote("serviceRelationDAO").query({"customerId":parseInt(customerData.custId),"ifValid":1,"cityCode":customerData.cityCode});
var serviceRelaParamList = a.util.findAll(serviceList,function(vo){
return vo.serviceKind ==10||vo.serviceKind == 8;
});
var valueParamList = a.util.map(serviceRelaParamList,function(vo){
return {value:vo.serviceId};
});
 



if(valueParamList!=null&&valueParamList.length>0){
Array.prototype.push.apply(serviceIdElemList,valueParamList);
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
if(resultList && resultList.length == 0){
	messageBox.alert({
    	message:"\u5f53\u524d\u5ba2\u6237\u4e0b\u4e0d\u5b58\u5728\u624b\u673a\u53f7\u7801\u6216\u8005\u56fa\u8bdd\u53f7\u7801\uff0c\u8bf7\u624b\u52a8\u8f93\u5165\u4e1a\u52a1\u53f7\u7801"
    });
	return ;
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
		// add event listener for select item
		span.onclick = function() {
		   //inputElem.rvalue = this.getAttribute("value");
		   inputElem.value = this.innerHTML;
		   //set PPPEOE password
			if(!!inputElem.setPPPOEPwd){
				inputElem.setPPPOEPwd();
			}
		   displayElem.style.display = "none";
		   // when checkbox hidden ,decrease zindex for
		   // avoiding covering,for more details about
		   // zIndex,please see [stacking context]
		  displayElem.parentNode.style.zIndex = "0";
		  //应要求，选择号码要级联管理账号的号码选中
		  var accServiceIdInputs = dojo.query("[name=accServiceId-"+Me.nbrUniqueId+"]",dojo.query('#nbr_selected_ctn',Me.dom)[0]);
		  //先全置成不选中
		  dojo.forEach(accServiceIdInputs||[], function(inputElem){
		  		inputElem.checked = false;
		  });

		  var targetAccServiceId = this.innerHTML;
		  //是否重新查找标识
		  var _ifReFindFlag_ = false;
		  dojo.forEach(accServiceIdInputs||[], function(inputElem){
		  		if(inputElem.getAttribute("serviceid")==targetAccServiceId){
		  			_ifReFindFlag_ = true;
		  			inputElem.checked = true;
		  		}
		  });
		  //如果上述没找到，则进行重新找
		  if(!_ifReFindFlag_){
		  		 var uniqueIdArray = [];
		  		 //获取页面上的接入类的所有行
		  		 var prodOfferAcceptLoader = dojo.getObject("prodOfferAcceptLoader")
		  		 if(!!prodOfferAcceptLoader){
					 var trs = dojo.query(".main-product-basic", prodOfferAcceptLoader.mainProdOfferWidget.domNode);
					 dojo.forEach(trs||[], function(prodBasicTr) {
					 	var uniqueId = dojo.attr(prodBasicTr, "uniqueId");
					 	var serviceKind = dojo.attr(prodBasicTr, "serviceKind") || "-1";
					 	if(prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_"+uniqueId].busCardInstance.$('serviceId').value == targetAccServiceId){
					 		uniqueIdArray.push({uniqueId : uniqueId,
			 						serviceKind : serviceKind});
					 	}
					 });
				 }
				 if(uniqueIdArray.length>0){
				 	//先进行过滤，如果含有多个
				 	if(uniqueIdArray.length>1){
				 		var filterResult = dojo.filter(uniqueIdArray||[],function(_data_){
				 			return _data_.serviceKind == 8||_data_.serviceKind ==10;
				 		});
				 		if(filterResult.length>0){
				 			uniqueIdArray = filterResult;
				 		}
				 	}
				 	dojo.forEach(accServiceIdInputs||[], function(inputElem){
				 		if(uniqueIdArray[0].uniqueId == inputElem.getAttribute("targetUniqueId")){
			  				inputElem.checked = true;
			  			}
				 	});
				 }
				 
		  }
		  
		  
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

BusCard.Namespace.create("ordermgr.accept.compnew");
ordermgr.accept.compnew._xdsl_number_elem_list_ = [];
var serviceObj = {};
serviceObj.service = Me.$("serviceId");
serviceObj.productId = Me.productId;
ordermgr.accept.compnew._xdsl_number_elem_list_ .push(serviceObj);
}catch(e){
alert(e.message);
}
});
