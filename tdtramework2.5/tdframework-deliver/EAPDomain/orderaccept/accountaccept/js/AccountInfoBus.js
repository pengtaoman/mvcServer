onload = function(){
	var customerXml = $("customerXml").value;
	var customerData = Jscu.util.CommUtil.parse(customerXml);
	var	oParameter = {
		"container" : $("accountInfo"),
		"customerName" : customerData.custName,
		"customerId" : customerData.custId
	};	
	var accountInfoBus = new AccountInfoBus(oParameter);
	accountInfoBus.init();
}

/**
 * 账户信息处理类
 */
var AccountInfoBus = function(oParameter){
	var Me = this;
	Me.container = oParameter["container"];
	Me.customerName = oParameter["customerName"];
	Me.customerId = oParameter["customerId"];
	Me.winObj = window;
	Me.tempAccountInfo = null;
	Me.pageDataInfo = null;

	Me.$=function(id){
		return getElementByIdWith(Me.container,id);
	};
	Me.$n=function(name){
		return getElementsByNameWith(Me.container,name);
	};
	
	/*
	 * 初始化帐户信息页面
	 */
	Me.init = function(){
		Me.initData();
		Me.initEvent();
	};
	
	/*
	 * 初始化页面数据
	 */
	Me.initData = function(){
		Me.$("accountName").value = Me.customerName;
		Me.$("leftFee").disabled = true;
		Me.pageDataInfo = new PageDataInfo();
	};
	
	/*
	 * 为页面数据赋值
	 */
	Me.setValue = function(obj, objValue){
		if(objValue != ""){
			obj.value = objValue;
		}
	};
	
	/*
	 * 初始化银行信息
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
	     	Me.$("nkAccount").isnullable = "false";//设置银行账号必填
			Me.$n("nkCharge")[0].isnullable = "false";//设置托收行必填
			Me.$n("nkCharge")[0].prompt = "托收行";
		}else{
			if($('bankInfo1').style.display != "none"){
				Me.saveTempAccountInfo();
			}
			$('bankInfo1').style.display="none";	
			$('bankInfo2').style.display="none";
			Me.clearAccountInfo();
			Me.$("nkAccount").isnullable = "true";//设置银行账号非必填
			Me.$n("nkCharge")[0].isnullable = "true";//设置托收行非必填
			Me.$n("nkCharge")[0].prompt = "托收行";
		}
	};
	
	/*
	 * 临时保存页面对象的值
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
	 * 清空页面对象的值
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
	 * 设置页面对象的值
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
	
	Me.doAccountInfoSubmit = function(){
		if(!Me.checkAccountInfo()){
			return;
		}
		var accountInfoXml = "<list>"+Me.getSubmitString()+"</list>";
		var parameter = "accountInfoXml="+accountInfoXml+"&customerId="+Me.customerId;
		var resultJsonStr = executeRequest("accountAcceptAction","doAccountInfoSubmit",parameter);
		var result = executeAjaxResult(resultJsonStr);
		if(result == false){
			return false;
		}
		window.opener.$('accountXml').value = "<accouInfoColl>"+Me.getSubmitString()+"</accouInfoColl>";
		window.opener.$('accountId').value = result;
		alert("增加账户信息成功，账户编号为："+result);
		Me.winObj.close();
	};
	
	Me.cancelAdd = function(){
		if(!Me.winObj.closed){
			Me.winObj.close();
		}
	};
	
	/*
	 * 是否显示集团收费方式
	 */
	Me.ifGroupPayMethod = function(){
		var par = Me.$('accountLevel').value;
		//省内账户
		if(par == "12"){
			$('payMethodName').style.display = 'none';
		}else{
			$('payMethodName').style.display = 'block';
		}
	};
	/*
	 * 初始化页面事件
	 */
	Me.initEvent = function(){
		Me.$n("accoWay")[0].onchange = function(){//付费方式事件
			Me.showBank();
		};
		Me.$n("nkId")[0].onchange = function(){//银行名称事件
			Me.chGroup();
		};
		Me.$n("belongCodeBC")[0].onchange = function(){//托收行使用区域事件
			Me.chGroup();
		};
		Me.$("addAccount").onclick = function(){
			Me.doAccountInfoSubmit()
		};
		Me.$("cancelAdd").onclick = function(){
			Me.cancelAdd();
		};
		Me.$("accountLevel").onchange = function(){
			Me.ifGroupPayMethod();
		};
	};
}