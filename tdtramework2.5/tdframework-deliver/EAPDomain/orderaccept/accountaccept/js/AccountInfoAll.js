/**
 * ����Ʒ����ҳ���˻���Ϣ������
 */
var AccountInfoAll = function(oParameter){
	var Me = this;
	Me.container = oParameter["container"];
	Me.tempAccountInfo = null;
	var pageDataInfo = oParameter["pageDataInfo"];
	var serviceList = oParameter["serviceList"];
	var customerData = oParameter["customerData"];
	Me.webPath = oParameter["webPath"];
	Me.cityCode = oParameter["cityCode"];
	var tempSaveAccountList = oParameter["tempSaveAccountList"];
	var tempSaveAccRelaList = oParameter["tempSaveAccRelaList"];
	Me.customerName = null;//�ͻ�����
	Me.customerId = null;//�ͻ����
	Me.accountList = [];//�����˻�����
	Me.accountRelationList = [];//���������ϵ
	var accountIndex = 0;
	var accountRelationIndex = 0;
	var myTbody = null;
	Me.checkAccountList = {};
	Me.ifCheckedCommAcct = false;
	Me.checkedObjs = [];
	var serviceInfoList = [];

	Me.$=function(id){
		return getElementByIdWith(Me.container,id);
	};
	Me.$n=function(name){
		return getElementsByNameWith(Me.container,name);
	};
	
	/*
	 * ��ʼ���ʻ���Ϣҳ��
	 */
	Me.init = function(){
		Me.initData();
		Me.initEvent();
	};
	/*
	 * �ⲿ�ӿڣ���ȡ�˻��ύ��Ϣҳ��
	 */
	Me.getAccountSubmitXML = function(){
		var accountXmlString = getAccountXml();
		var accountRelaXmlString = getAccountRelationXml();
		
		return accountXmlString+accountRelaXmlString;
	};
	
	/*
	 * ��ʼ��ҳ������
	 */
	Me.initData = function(){
		Me.customerName = customerData.custName;//�ͻ�����
		Me.customerId = customerData.custId;//�ͻ����
		Me.$("accountName").value = Me.customerName;
		//$("accountInfoListFrame").src = Me.webPath+"/accountAcceptAction.do?method=getAccountInfoList&customerId="+Me.customerId+"&cityCode="+Me.cityCode;
		var accountInfoCount=executeRequest("accountAcceptAction","getAccountInfoCount","customerId="+Me.customerId+"&cityCode="+Me.cityCode);
		if(accountInfoCount=="0"){
			Me.showDiv("accouInfoVO",Me.$("showNewAccount"));
		}else{
			Me.showDiv("inheritAccountInfoDiv",Me.$("showInheritAccount"));
		}
		myTbody = Me.$("dataTbody");
		Me.initPayMoneyNumber();
		if(serviceInfoList && serviceInfoList.length > 0){
			Me.$("accountServiceId").value = serviceInfoList[0].serviceId;
		}
		Me.setIfDefault(Me.customerId);
		if(tempSaveAccountList.length > 0){
			for(var i=0;i<tempSaveAccountList.length;i++){
				var tempSaveAccount = tempSaveAccountList[i];
				Me.$("accoWay").value = tempSaveAccount.accoWay;
				var accountXml = "<accouInfoVO>";
				accountXml += new LeafList(tempSaveAccount).toString();
				accountXml += "</accouInfoVO>";
				var accountObj = {
					"accountId" : tempSaveAccount.accountId,
					"accountName" : tempSaveAccount.accountName,
					"accoWay" : Me.$("accoWay").options[Me.$("accoWay").selectedIndex].text,
					"accountIndex" : accountIndex,
					"accountXml" : accountXml
				};
				Me.accountList.push(accountObj);
				accountIndex++;
			}
		}
		if(tempSaveAccRelaList.length > 0){
			for(var i=0;i<tempSaveAccRelaList.length;i++){
				var tempSaveAccRela = tempSaveAccRelaList[i];
				initAccountRelaBody(tempSaveAccRela);
			}
		}
		Me.showBank();
	};
	
	/*
	 * Ϊҳ�����ݸ�ֵ
	 */
	Me.setValue = function(obj, objValue){
		if(objValue != ""){
			obj.value = objValue;
		}
	};
	
	/*
	 * ��ʼ����ֵ����������
	 */
	Me.initPayMoneyNumber = function(){
		Me.getAllServiceInfo();
		var serviceIdTr = null;
		for(var i = 0;i < serviceInfoList.length;i ++){
			var serviceId = serviceInfoList[i].serviceId;
			var productId = serviceInfoList[i].productId;
			if((i+1)%4 == 1){
				serviceIdTr = $("serviceIdTbody").insertRow()
			}
			serviceChkTd = serviceIdTr.insertCell();
			serviceChkTd.className = "table_left";
			serviceChkTd.innerHTML = '<input type="checkbox" id="serChk'+i+'" name="serChk" value="'+serviceId+'" checked="checked" productId="'+productId+'" />';
			serviceChkTd = serviceIdTr.insertCell();
			serviceChkTd.className = "table_right";
			serviceChkTd.innerHTML = '<input type="text" id="serText'+i+'" value="'+serviceId+'" disabled="disabled" productId="'+productId+'" />';
		}
	};
	
	/*
	 * ��ȡ���еķ��������Ϣ��ʽΪ{serviceId:'',productId:''}
	 */
	Me.getAllServiceInfo = function(){
		for(var i=0;i<serviceList.length;i++){
			var serviceId = serviceList[i].getServiceId();
			var productId = serviceList[i].getProductId();
			if(serviceId.indexOf("~") == -1){
				var serviceInfo = {
					"serviceId" : serviceId,
					"productId" : productId
				};
				serviceInfoList.push(serviceInfo);
			}else{
				var serviceIdArray = serviceId.split("~");
				for(var j = 0;j < serviceIdArray.length; j++){
					if(serviceIdArray[j]){
						var serviceInfo = {
							"serviceId" : serviceIdArray[j],
							"productId" : productId
						};
						serviceInfoList.push(serviceInfo);
					}
				}
			}
		}
	}
	
	/*
	 * ��ʼ��������Ϣ
	 */
	Me.showBank = function(){
		if(Me.$n('accoWay')[0].value.split("-")[1]==1){
			Me.setAccountInfo();
			$('bankInfo1').style.display="block";	
			$('bankInfo2').style.display="block";
			var BankId = Me.$n('nkId')[0].value;
			var belongCodeBC = Me.$n('belongCodeBC')[0].value;
			var parameter= "BankChargeId=nkCharge&BankId="+BankId+"&belongCodeBC="+belongCodeBC;
			var resultJsonStr = executeRequest("prodOfferSaleAjaxAction","getBankChargeQuery",parameter);
			var result = executeAjaxResult(resultJsonStr);
			if(result == false){
				return;
			}
	     	Me.$n("nkCharge")[0].outerHTML = result;
	     	Me.$("nkAccount").isnullable = "false";//���������˺ű���
			Me.$n("nkCharge")[0].isnullable = "false";//���������б���
			Me.$n("nkCharge")[0].prompt = "������";
		}else{
			if($('bankInfo1').style.display != "none"){
				Me.saveTempAccountInfo();
			}
			$('bankInfo1').style.display="none";	
			$('bankInfo2').style.display="none";

			Me.clearAccountInfo();
			Me.$("nkAccount").isnullable = "true";//���������˺ŷǱ���
			Me.$n("nkCharge")[0].isnullable = "true";//���������зǱ���
			Me.$n("nkCharge")[0].prompt = "������";
		}
	};
	
	/*
	 * ��ʱ����ҳ������ֵ
	 */
	Me.saveTempAccountInfo = function(){
		Me.tempAccountInfo = {
			"nkId":Me.$n("nkId")[0].value,
			"nkAccount":Me.$("nkAccount").value,
			"countName":Me.$("countName").value,
			"belongCodeBC":Me.$n("belongCodeBC")[0].value,
			"nkCharge":Me.$n("nkCharge")[0].value,
			"reementNo":Me.$("reementNo").value
		}
	};
	
	/*
	 * ���ҳ������ֵ
	 */
	Me.clearAccountInfo = function(){
		Me.$n("nkId")[0].value = "";
		Me.$("nkAccount").value = "";
		Me.$("countName").value = "";
		Me.$n("belongCodeBC")[0].value = "";
		Me.$n("nkCharge")[0].value = "";
		Me.$("reementNo").value = "";
	};

	/*
	 * ����ҳ������ֵ
	 */
	Me.setAccountInfo = function(){
		if(Me.tempAccountInfo != null){
			Me.setValue(Me.$n("nkId")[0], Me.tempAccountInfo.nkId);
			Me.setValue(Me.$("nkAccount"), Me.tempAccountInfo.nkAccount);
			Me.setValue(Me.$("countName"), Me.tempAccountInfo.countName);
			Me.setValue(Me.$n("belongCodeBC")[0], Me.tempAccountInfo.belongCodeBC);
			Me.setValue(Me.$n("nkCharge")[0], Me.tempAccountInfo.nkCharge);
			Me.setValue(Me.$("reementNo"), Me.tempAccountInfo.reementNo);
		}
	};

	Me.chGroup = function(){
		var BankId = Me.$n('nkId')[0].value;
		var belongCodeBC = Me.$n('belongCodeBC')[0].value;
		var parameter= "BankChargeId=nkCharge&BankId="+BankId+"&belongCodeBC="+belongCodeBC;			
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction","getBankChargeQuery",parameter);
		var result = executeAjaxResult(resultJsonStr);
		if(result == false){
			return;
		}
	    Me.$n("nkCharge")[0].outerHTML = result;
	};
	
	Me.getSubmitString = function(){
		var accountDataInfo = new AccountDataInfo();
		var xml = Me.preDealAccountInfo(accountDataInfo.accountSubmitObject.build(Me.$));
		return xml;
	};
	
	Me.checkAccountInfo = function(){
		if(!jsCommon.checkNotNullByContainer(Me.container)){
			return false;
		}
		return true
	};
	
	Me.preDealAccountInfo = function(xmlString){
		if($('bankInfo1').style.display != "none"){
			return xmlString;
		}
		var doc = xmlCore.getDoc(xmlString);
		var accountInfoNode = doc.documentElement;
		accountInfoNode = Me.setElementValueByName(accountInfoNode, "nkId", "-1");
		return accountInfoNode.xml;
	};
	
	Me.setElementValueByName = function(doc, nodeName, nodeValue){
		doc.selectSingleNode(nodeName).text = nodeValue;
		return doc;
	};
	
	Me.showDiv = function(divId,selfObj){
		var tag = $("tags").getElementsByTagName("li");
		var taglength = tag.length;
		for(i=0; i<taglength; i++){
			tag[i].className = "";
		}
		selfObj.parentNode.className = "selectTag";
		Me.$("accouInfoVO").style.display = "none";
		Me.$("inheritAccountInfoDiv").style.display = "none";
		Me.$(divId).style.display = "block";
		if(divId == "inheritAccountInfoDiv"){
			if(document.frames["accountInfoListFrame"].document.body.innerHTML == ""){
				$("accountInfoListFrame").src = Me.webPath+"/accountAcceptAction.do?method=getAccountInfoList&customerId="+Me.customerId+"&cityCode="+Me.cityCode;
			}
			Me.$("addAccountSpan").style.display = "none";
			Me.$("addAccountRelationSpan").style.display = "block";
		}else{
			Me.$("addAccountSpan").style.display = "block";
			Me.$("addAccountRelationSpan").style.display = "none";
		}
	};
	
	Me.showCustomerList = function(){
		var custIdQuery = $("custIdQuery").value;
		var firstNameQuery = $("firstNameQuery").value;
		var identityKindQuery = $("identityKindQuery").value;
		var identityCodeQuery = $("identityCodeQuery").value;
		
		var selectType = $('queryFlag').value;
		if(selectType=='1'){ //�ͻ����ϲ�ѯ
			var pagePath = Me.webPath + "/customerAcceptAction.do?method=getCustomerInfoList&custIdQuery="+custIdQuery+"&firstNameQuery="+firstNameQuery+"&identityKindQuery="+identityKindQuery+"&identityCodeQuery="+identityCodeQuery;
			window.open(pagePath, "", 'status=1,resizable=0,fullscreen=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
		}else{
			if($("accountInfoListFrame")){
				$("accountInfoListFrame").src = Me.webPath + "/accountAcceptAction.do?method=getAccountInfoList&queryFlag="+$('queryFlag').value+"&phoneNumber="+$('phoneNumber').value+"&productId="+$('productId').value;
			}
		}
		
	};
	
	Me.queryAccountInfoByCustId = function(customerId,cityCode){
		if($("accountInfoListFrame")){
			$("accountInfoListFrame").src = Me.webPath+"/accountAcceptAction.do?method=getAccountInfoList&customerId="+customerId+"&cityCode="+cityCode;
		}
	};
	
	Me.addAccount = function(){
		Me.checkedObjs = getServiceIdObjs();
		if(!Me.checkedObjs){
			return false;
		}
		if(!checkAddAccount()){
			return false;
		}
		var accountId = getAccountId();
		if(!accountId){
			return false
		}
		Me.$("accountId").value = accountId;
		var accountXml = Me.getSubmitString();
		var accountObj = {
			"accountId" : accountId,
			"accountName" : Me.$("accountName").value,
			"accoWay" : Me.$("accoWay").options[Me.$("accoWay").selectedIndex].text,
			"accountIndex" : accountIndex,
			"accountXml" : accountXml
		};
		Me.accountList.push(accountObj);
		accountIndex++;
		
		for(var i = 0;i<Me.checkedObjs.length;i++){
			updatetBody(Me.checkedObjs[i],accountObj);
		}
	};
	
	Me.addAccountRelation = function(){
		if(Me.$("listAccountId").value == ""){
			alert("��ѡ��һ���˻���Ϣ��");
			return false;
		}
		Me.checkedObjs = getServiceIdObjs();
		if(!Me.checkedObjs){
			return false;
		}
		var accountObj = {
			"accountId" : Me.$("listAccountId").value,
			"accountName" : Me.$("listAccountName").value,
			"accoWay" : ""
		};
		for(var i = 0;i<Me.checkedObjs.length;i++){
			var accountRelaIndex = Me.checkedObjs[i].value+"_"+Me.checkedObjs[i].productId;
			//����ظ����
			for(var j=0;j<Me.accountRelationList.length;j++){
				if(Me.accountRelationList[j].accountRelaIndex == accountRelaIndex && Me.accountRelationList[j].accountId == accountObj.accountId){
					return false;
				}
			}
			updatetBody(Me.checkedObjs[i],accountObj);
		}
	};
	
	/**
	 * �ж��Ƿ����к��������������ϵ �ⲿ�ӿ�
	 */
	Me.checkAccount = function(){
		for(var i=0;i<serviceInfoList.length;i++){
			var ifHas = false;
			for(var j=0;j<Me.accountRelationList.length;j++){
				if(Me.accountRelationList[j].serviceId == serviceInfoList[i].serviceId){
					ifHas = true;
					break;
				}
			}
			if(ifHas){
				continue;
			}else{
				alert("ҵ�����"+serviceInfoList[i].serviceId+"δѡ�������˻�����ȷ�ϣ�");
				return false;
			}
		}
	};

	/*
	 * �Ƿ���ʾ�����շѷ�ʽ
	 */
	Me.ifGroupPayMethod = function(){
		var par = Me.$('accountLevel').value;
		//ʡ���˻�
		if(par == "12"){
			$('payMethodName').style.display = 'none';
		}else{
			$('payMethodName').style.display = 'block';
		}
	};	
	
	/*
	 * ���Ĳ�ѯ��ʽ
	 */
	Me.SelectType_OnCh = function(){
		var selectType = $('queryFlag').value;
		if(selectType=='1') //�ͻ����ϲ�ѯ
		{
			$('serviceIdQueryFlag').style.display="none";
			$('custQueryFlag').style.display="block";
		}
		else if(selectType=='2')//��Ʒʵ�������ѯ
		{
			$('serviceIdQueryFlag').style.display="block";
			$('custQueryFlag').style.display="none";

		}
	};
	
	
	//����ҵ�����ֲ�ˢ�³���Ӧ������Ʒ����
	Me.getProductIdList = function (obj){
		var serviceId = obj.value;
		if (serviceId ==""){
			return;
		}
		var parameter = "serviceId="+serviceId+"&ifValid=1";
		
		var result = executeRequest("custAcceptAjaxAction","getProductIdList",parameter);
		if(result==-1){
	  		alert("��ѯʧ�ܣ������ҵ����벻������Ч��¼���������룡");
	    	$("productId").outerHTML = "<select name='productId' id='productId' ><option value=''>��ѡ��</option></select>"
	    	$("phoneNumber").value="";
	    	$("phoneNumber").focus();
	    	return;
		}
  		$("productId").outerHTML = result;
	};
	
	
	
	
	
	/**
	 * �����Ƿ�Ĭ���ʻ�Ĭ��ֵ
	 */
	Me.setIfDefault = function(custId){
		var param = "custId="+custId;
	    var count = executeRequest("custAcceptAjaxAction","getCountOfDefaultAcc",param);
	    if(count>0){
	    	Me.$("ifDefault").value = "F";
	    	Me.$("ifDefault").disabled = true;
	    }
	};

	/*
	 * ��ʼ��ҳ���¼�
	 */
	Me.initEvent = function(){
		Me.$("showNewAccount").onclick = function(){//�½��˻���Ϣ�������¼�
			Me.showDiv("accouInfoVO",Me.$("showNewAccount"));
		};
		Me.$("showInheritAccount").onclick = function(){//�̳��˻���Ϣ�������¼�
			Me.showDiv("inheritAccountInfoDiv",Me.$("showInheritAccount"));
		};
		Me.$n("accoWay")[0].onchange = function(){//���ѷ�ʽ�¼�
			Me.showBank();
		};
		Me.$n("nkId")[0].onchange = function(){//���������¼�
			Me.chGroup();
		};
		Me.$n("belongCodeBC")[0].onchange = function(){//������ʹ�������¼�
			Me.chGroup();
		};
		Me.$("addAccount").onclick = function(){//�����˻���Ϣ��ť�¼�
			Me.addAccount();
		};
		Me.$("addAccountRelation").onclick = function(){//����������Ϣ��ť�¼�
			Me.addAccountRelation();
		};
		Me.$("accountLevel").onchange = function(){
			Me.ifGroupPayMethod();
		};
		Me.$("accountQuery").onclick = function(){
			Me.showCustomerList();
		};
		Me.$("paymentLimit").onblur = function(){
			if(Me.$("paymentLimit").value == ""){
				Me.$("paymentLimit").value = "0";
			};
		};
		Me.$("queryFlag").onchange= function(){
			Me.SelectType_OnCh();
		};
		Me.$("phoneNumber").onblur= function(){
			Me.getProductIdList(Me.$("phoneNumber"));
		};
	};
	
	/**
	 * ��ȡ�˻�Id
	 */
	var getAccountId = function(){
		var vParameter = "idName=accountId";
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getId", vParameter);
		var result = executeAjaxResult(resultJsonStr);
		return result;
	}
	
	var updatetBody = function(serviceIdObj,accountObj){
		var myTr = myTbody.insertRow();
		var name = "accountRelation"+accountRelationIndex;
		var accountRelaIndex = serviceIdObj.value+"_"+serviceIdObj.productId;
		myTr.setAttribute("id",name);
		myTr.className = "float_td_content";
																		
		myTd = myTr.insertCell();
		myTd.innerHTML = accountObj.accountId;
		
		myTd = myTr.insertCell();
		myTd.innerHTML = accountObj.accountName;
		
		myTd = myTr.insertCell();
		myTd.innerHTML = serviceIdObj.value;
		
		myTd = myTr.insertCell();
		myTd.innerHTML = Me.$("acctItemType").selectedIndex == -1 ? "" : Me.$("acctItemType").options[Me.$("acctItemType").selectedIndex].text;
		
		myTd = myTr.insertCell();
		myTd.innerHTML = Me.$("paymentLimitType").selectedIndex == -1 ? "" : Me.$("paymentLimitType").options[Me.$("paymentLimitType").selectedIndex].text;
		
		myTd = myTr.insertCell();
		myTd.innerHTML = Me.$("paymentLimit").value;
		
		myTd = myTr.insertCell();
		myTd.innerHTML = Me.$("priority").selectedIndex == -1 ? "" : Me.$("priority").options[Me.$("priority").selectedIndex].text;
		
		myTd = myTr.insertCell();
		myTd.innerHTML = '<input type="radio" id="'+serviceIdObj.value+accountRelationIndex+'" name="'+accountRelaIndex+'"/>';
		
		myTd = myTr.insertCell();
		myTd.innerHTML = '<input type="radio" id="'+accountRelaIndex+accountRelationIndex+'" index="'+accountRelationIndex+'" name="ifDefaultCommAcct"/>';
		
		myTd = myTr.insertCell();
		myTd.innerHTML = '<img id="img_'+accountRelationIndex+'" trId="'+name+'" style="cursor:hand;" src="'+Me.webPath+'/custcontact/common/images/delete.gif"/>';
		var accountRelationObj = {
			"accountId" : accountObj.accountId,
			"serviceId" : serviceIdObj.value,
			"ifDefault" : 0,
			"ifDefaultCommAcct" : 0,
			"index" : accountRelationIndex,
			"myTrId" : name,
			"acctItemType" : Me.$("acctItemType").value,
			"paymentLimitType" : Me.$("paymentLimitType").value,
			"paymentLimit" : Me.$("paymentLimit").value,
			"priority" : Me.$("priority").value,
			"radioId" : serviceIdObj.value+accountRelationIndex,
			"productId" : serviceIdObj.productId,
			"accountRelaIndex" : accountRelaIndex
		};
		Me.accountRelationList.push(accountRelationObj);
		
		/* ������ť��Ӽ����¼� */ 
		$(serviceIdObj.value+accountRelationIndex).onclick = function(){
			updateAllRelationsByRadio(serviceIdObj);
		};
		
		/* ������ť��Ӽ����¼� */ 
		$(accountRelaIndex+accountRelationIndex).onclick = function(){
			if(this.index){
				updateAllRelationsByIndex(this.index);	
			}
		};
		
		/* ɾ���¼� */
		$("img_"+accountRelationIndex).onclick = function(){
			deleteTheRow(event.srcElement);
		};
		objectId = serviceIdObj.value+accountRelationIndex;
		var commObjectId = accountRelaIndex+accountRelationIndex
		accountRelationIndex++;
		
		madeFirstChecked(accountRelationObj,accountRelaIndex,objectId,commObjectId);
	}
	
	/**
	 * �����ʻ���Ϣʱ���趨��һ��ΪĬ���ʻ�
	 */
	var madeFirstChecked = function(accountRelationObj, accountRelaIndex, objectId, commObjectId){
		if(!Me.checkAccountList[accountRelaIndex]){
			Me.checkAccountList[accountRelaIndex] = "1";
			$(objectId).checked = true;
			accountRelationObj.ifDefault = 1;
		}
		if(Me.ifCheckedCommAcct === false){
			$(commObjectId).checked = true;
			Me.ifCheckedCommAcct = true;
			accountRelationObj.ifDefaultCommAcct = 1;
		}
	}
	
	/**
     * ���ʱ����Ĭ�������ϵ
	 */
	 Me.isAnyAccountRelationChecked = function(){
		var serviceIds = "";
		Me.checkedObjs=getServiceIdObjs();
		for(var i=0;i<Me.checkedObjs.length;i++){
			var checkedServiceId = Me.checkedObjs[i].value;
			var checkedProductId = Me.checkedObjs[i].productId || "";
			var accountRelaIndex = checkedServiceId+"_"+checkedProductId;
			if(!Me.checkAccountList[accountRelaIndex]){
				serviceIds += checkedServiceId;
				serviceIds += ",";
			}else{
				continue;
			}
		}
		return serviceIds;
	}
	
	var deleteTheRow = function(thisObj){
		var name = event.srcElement.trId;
		for(var i=0;i<Me.accountRelationList.length;i++){
			if(Me.accountRelationList[i].myTrId == name){
				$(name).removeNode(true);
				var accountRelationVO = Me.accountRelationList[i];
				if(accountRelationVO.ifDefault == 1){
					Me.checkAccountList[accountRelationVO.accountRelaIndex] = null;
				}
				if(accountRelationVO.ifDefaultCommAcct == 1){
					Me.ifCheckedCommAcct = false;
				}
				//�������ϵ������ɾ��
				Me.accountRelationList.splice(i,1);
				//�������˻�������ɾ��
				delAccountInfoByAccountId(accountRelationVO.accountId);
				return true;
			}
		}
		return false;
	}
	
	/* ��ȡ��ѡ���еĶ������к� */
	var getAccountRelationVOIndex = function(serviceIdObj){
	    var accountRelationListt = Me.accountRelationList;
	    if(accountRelationListt){
	        for(var i=0; i<accountRelationListt.length;i++){
	            var accountRelationVO = accountRelationListt[i];
	            if($(serviceIdObj.value + accountRelationVO.index) && $(serviceIdObj.value + accountRelationVO.index).checked){
	                return accountRelationVO.index;
	            }
	        }
	    }
	    return;
	};
	
	/* ��ȡ��ѡ���еĶ������к� */
	var updateAllRelationsByIndex = function(index){
	    var accountRelationListt = Me.accountRelationList;
	    if(accountRelationListt){
	        for(var i=0; i<accountRelationListt.length;i++){
	            var accountRelationVO = accountRelationListt[i];
	            if(accountRelationVO.index == index){
	                Me.accountRelationList[i].ifDefaultCommAcct = 1;
	            }else{
	            	Me.accountRelationList[i].ifDefaultCommAcct = 0;
	            }
	        }
	    }
	    Me.ifCheckedCommAcct = true;
	    return;
	};
	
	/* ������ѡ��ť�޸�״̬ */
	var updateAllRelationsByRadio = function(serviceIdObj){
		var index = getAccountRelationVOIndex(serviceIdObj);
		var accountRelaIndex = serviceIdObj.value+"_"+serviceIdObj.productId;
		for(var i=0;i<Me.accountRelationList.length;i++){
			if(Me.accountRelationList[i].index == index){
				Me.accountRelationList[i].ifDefault = 1;
			}else{
				if(Me.accountRelationList[i].accountRelaIndex == accountRelaIndex){
					Me.accountRelationList[i].ifDefault = 0;
				}
			}
		}
		if(!Me.checkAccountList[accountRelaIndex]){
			Me.checkAccountList[accountRelaIndex] = "1";
		}
	}
	
	var getServiceIdObjs = function(){
		var serviceIdObjs = Me.$n("serChk");
		var checkObjs = [];
		var count = 0;
		for(var i = 0;i<serviceIdObjs.length;i++){
			if(serviceIdObjs[i].checked){
				checkObjs.push(serviceIdObjs[i]);
				count ++;
			}
		}
		if(count == 0){
			alert("��ѡ��ҵ����룡")
			if(serviceIdObjs[0]){
				serviceIdObjs[0].focus();
			}
			return false;
		}
		return checkObjs;
	}
	
	var getAccountRelationXml = function(){
//		if(Me.accountRelationList && Me.accountRelationList.length == 0){
//			alert("��ȡ������Ϣʧ�ܣ��뱣��������Ϣ��");
//			return "";
//		}
		var accountRelaXmlString = "<accountRelaList>";
		for(var i = 0;i<Me.accountRelationList.length;i++){
			var xmlString = "<accountRelaVO>";
			xmlString += "<accountId>"+Me.accountRelationList[i].accountId+"</accountId>";
			xmlString += "<serviceId>"+Me.accountRelationList[i].serviceId+"</serviceId>";
			xmlString += "<acctItemTypeGroupId>"+Me.accountRelationList[i].acctItemType+"</acctItemTypeGroupId>";
			xmlString += "<paymentLimitType>"+Me.accountRelationList[i].paymentLimitType+"</paymentLimitType>";
			xmlString += "<paymentLimit>"+Me.accountRelationList[i].paymentLimit+"</paymentLimit>";
			xmlString += "<priority>"+Me.accountRelationList[i].priority+"</priority>";
			xmlString += "<ifDefaultAcctId>"+Me.accountRelationList[i].ifDefault+"</ifDefaultAcctId>";
			xmlString += "<productId>"+Me.accountRelationList[i].productId+"</productId>";
			xmlString += "<ifDefaultCommAcctId>"+Me.accountRelationList[i].ifDefaultCommAcct+"</ifDefaultCommAcctId>";
			xmlString += "</accountRelaVO>";
			accountRelaXmlString += xmlString;
		}
		accountRelaXmlString += "</accountRelaList>";
		return accountRelaXmlString;
	}
	
	var getAccountXml = function(){
		if(Me.accountList && Me.accountList.length == 0){
			return "";
		}
		var accountXmlString = "<accouInfoColl>";
		for(var i = 0;i<Me.accountList.length;i++){
			accountXmlString += Me.accountList[i].accountXml;
		}
		accountXmlString += "</accouInfoColl>";
		return accountXmlString;
	}
	
	var delAccountInfoByAccountId = function(accountId){
		if(!accountId){
			return false;
		}
		for(var i=0;i<Me.accountRelationList.length;i++){
			if(Me.accountRelationList[i].accountId == accountId){
				return false;
			}
		}
		var index = -1;
		for(var m = 0;m < Me.accountList.length;m++){
			var accountInfoVO = Me.accountList[m];
			if(accountInfoVO.accountId == accountId){
				index = m;
			}
		}
		if(index != -1){
			Me.accountList.splice(index,1);
		}
	}
	
	/**
	 * �����ʻ�������Ϣʱ���ǿ���֤
	 */
	var checkAddAccount = function(){
		if(Me.$("accountName").value == null||Me.$("accountName").value == "")
		{
			alert("[�˻�����]����Ϊ��");
			return false;
		}
		if(Me.$("leftFee").value == null||Me.$("leftFee").value == "")
		{
			alert("[Ԥ���]����Ϊ��");
			return false;
		}
		return true;
	}
	
	var initAccountRelaBody = function(accountRelationObj){
		var myTr = myTbody.insertRow();
		var name = "accountRelation"+accountRelationIndex;
		var accountRelaIndex = accountRelationObj.serviceId+"_"+accountRelationObj.productId;
		myTr.setAttribute("id",name);
		myTr.className = "float_td_content";
																		
		myTd = myTr.insertCell();
		myTd.innerHTML = accountRelationObj.accountId;
		
		myTd = myTr.insertCell();
		myTd.innerHTML = Me.customerName;
		
		myTd = myTr.insertCell();
		myTd.innerHTML = accountRelationObj.serviceId;
		
		myTd = myTr.insertCell();
		Me.$("acctItemType").value = accountRelationObj.acctItemTypeGroupId;
		myTd.innerHTML = Me.$("acctItemType").selectedIndex == -1 ? "" : Me.$("acctItemType").options[Me.$("acctItemType").selectedIndex].text;
		
		myTd = myTr.insertCell();
		Me.$("paymentLimitType").value = accountRelationObj.paymentLimitType;
		myTd.innerHTML = Me.$("paymentLimitType").selectedIndex == -1 ? "" : Me.$("paymentLimitType").options[Me.$("paymentLimitType").selectedIndex].text;
		
		myTd = myTr.insertCell();
		myTd.innerHTML = accountRelationObj.paymentLimit;
		
		myTd = myTr.insertCell();
		Me.$("priority").value = accountRelationObj.priority;
		myTd.innerHTML = Me.$("priority").selectedIndex == -1 ? "" : Me.$("priority").options[Me.$("priority").selectedIndex].text;
		
		myTd = myTr.insertCell();
		var checked = '';
		if(accountRelationObj.ifDefaultAcctId == 1){
			checked = 'checked="checked" '
		}
		myTd.innerHTML = '<input type="radio" id="'+accountRelationObj.serviceId+accountRelationIndex+'" name="'+accountRelaIndex+'" '+checked+'/>';
		
		myTd = myTr.insertCell();
		var commonChecked = '';
		if(accountRelationObj.ifDefaultCommAcctId == 1){
			commonChecked = 'checked="checked" '
		}
		myTd.innerHTML = '<input type="radio" id="'+accountRelaIndex+accountRelationIndex+'" index="'+accountRelationIndex+'" name="ifDefaultCommAcct" '+commonChecked+'/>';
		
		myTd = myTr.insertCell();
		myTd.innerHTML = '<img id="img_'+accountRelationIndex+'" trId="'+name+'" style="cursor:hand;" src="'+Me.webPath+'/custcontact/common/images/delete.gif"/>';
		var accoRelationObj = {
			"accountId" : accountRelationObj.accountId,
			"serviceId" : accountRelationObj.serviceId,
			"ifDefault" : accountRelationObj.ifDefaultAcctId,
			"ifDefaultCommAcct" : accountRelationObj.ifDefaultCommAcctId,
			"index" : accountRelationIndex,
			"myTrId" : name,
			"acctItemType" : accountRelationObj.acctItemTypeGroupId,
			"paymentLimitType" : accountRelationObj.paymentLimitType,
			"paymentLimit" : accountRelationObj.paymentLimit,
			"priority" : accountRelationObj.priority,
			"radioId" : accountRelationObj.serviceId+accountRelationIndex,
			"productId" : accountRelationObj.productId,
			"accountRelaIndex" : accountRelaIndex
		};
		Me.accountRelationList.push(accoRelationObj);
		var serviceIdObj = {
			"value" : accountRelationObj.serviceId,
			"productId" : accountRelationObj.productId
		};		
		/* ������ť��Ӽ����¼� */ 
		$(serviceIdObj.value+accountRelationIndex).onclick = function(){
			updateAllRelationsByRadio(serviceIdObj);
		};
		
		/* ������ť��Ӽ����¼� */ 
		$(accountRelaIndex+accountRelationIndex).onclick = function(){
			if(this.index){
				updateAllRelationsByIndex(this.index);	
			}
		};
		
		/* ɾ���¼� */
		$("img_"+accountRelationIndex).onclick = function(){
			deleteTheRow(event.srcElement);
		};
		if(accountRelationObj.ifDefaultAcctId == 1){
			$(serviceIdObj.value+accountRelationIndex).click();
		}
		if(accountRelationObj.ifDefaultCommAcctId == 1){
			$(accountRelaIndex+accountRelationIndex).click();
		}
		accountRelationIndex++;
	}
}