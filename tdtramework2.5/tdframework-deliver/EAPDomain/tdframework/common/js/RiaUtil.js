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


//����������������ӵ����������
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

//�������Է���������ɾ����
function allPrpos(obj) { 
    // �����������е��������ƺ�ֵ 
    var props = ""; 
    // ��ʼ���� 
    for(var p in obj){  
        // ���� 
        if(typeof(obj[p])=="function"){  
            obj[p](); 
        }else{  
            // p Ϊ�������ƣ�obj[p]Ϊ��Ӧ���Ե�ֵ 
            props+= p + "=" + obj[p] + "       "; 
        }  
    }  
    alert(props);
}