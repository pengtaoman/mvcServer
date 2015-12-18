function doQueryForm(formId, pageDataClass, actionUrl){

	dataCenter.setParameter("queryFormId", formId);
	dataCenter.setParameter("pageDataClass", pageDataClass);
	dataCenter.setParameter("queryFormActionUrl", actionUrl);
	
	var formData = unieap.byId(formId).getHelper().collectData();
	
	var changedData = new Object();
	for (var key in formData) {
		instanceAttributeMap(formData[key], key,changedData);
	}

	dataCenter.setParameter("queryFormData", changedData);
	dataCenter.setParameter("pageDataClass", pageDataClass);
	
	var dataStore = new unieap.ds.DataStore('queryFormDataStore');
	dataStore.setParameter("queryFormCondition",formData);
	
	dataCenter.addDataStore(dataStore);
	
	var responsedDataCenter = unieap.Action.requestData( {
		url : unieap.WEB_APP_NAME + actionUrl,
		sync : true,
		load : function(dataCenter) {
		}
	}, dataCenter);
    return responsedDataCenter;
}


//公共方法，后续添加到公共类库中
function instanceAttributeMap(fromData, splitKey, newData) {
    
    var subKeys = splitKey.split(".");
	if (subKeys.length > 2) {
	    var leastKey = splitKey.substring(subKeys[0] .length+1, splitKey.length);
	    if (subKeys[0] in newData) {
		    instanceAttributeMap(fromData, leastKey, newData[subKeys[0]]);
		} else {
		    var eData = new Object();
			newData[subKeys[0]] = eData;
			instanceAttributeMap(fromData, leastKey, eData);
		}
	} else if (subKeys.length > 1) {		    
	    if (subKeys[0] in newData) {
		    newData[subKeys[0]][subKeys[1]]=fromData;
		} else {
			var eData = new Object();
			eData[subKeys[1]]=fromData;
            newData[subKeys[0]] =eData;
		}
	} else {
	    newData[splitKey] = fromData;
	}
}

//辅助调试方法，后续删除掉
function allPrpos(obj) { 
    // 用来保存所有的属性名称和值 
    var props = ""; 
    // 开始遍历 
    for(var p in obj){  
        // 方法 
        if(typeof(obj[p])=="function"){  
            obj[p](); 
        }else{  
            // p 为属性名称，obj[p]为对应属性的值 
            props+= p + "=" + obj[p] + "       "; 
        }  
    }  
    alert(props);
}