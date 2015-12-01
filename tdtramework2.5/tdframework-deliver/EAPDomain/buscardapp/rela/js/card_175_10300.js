BusCard.define('/buscardapp/rela/js/card_175_10300.js',function(_buscard,cardParam){ 
Me = this;
var cardInfo = arguments[1];
var serviceOfferId = cardInfo.serviceOfferId;
//for compatibility
var executeRequest = _buscard.executeRequest;

var deviceTypeOld;//旧租机的终端类型

//701开关 判断是否清空
var switch701 = executeRequest("prodOfferSaleAjaxAction","ifClearDeviceNo","");

//815开关 判断是否检测新旧终端机器类型不同
var switch815 = executeRequest("prodOfferSaleAjaxAction","ifDifDeviceType","");

setSubGroupDisplay("none");


//获取手机串码
var param = "userId="+cardInfo.userId;
var resultStr = executeRequest("secondAcceptAjaxAction","getPhoneDeviceList",param);
var resultObj = _buscard.util.parse(resultStr);
var len = resultObj.length;
if(len==0){
	alert("没有手机串码信息或获取信息失败！");
	return;
}

Me.$("subgroup_0").innerHTML = joinPhoneStr(resultObj);
initRadioEvent(resultObj);

function joinPhoneStr(resultObj){
	var innerRadio = "<table width='100%' cellpadding='0' cellspacing='0' border='0'>";
	var len = resultObj.length;
	for(var i=0,len = resultObj.length;i<len;){
		innerRadio += "<tr width='80%' align='center'>";
		innerRadio += "<td><input type='radio' id='"+resultObj[i]["promInstId"]+"' /><span>"+resultObj[i]["deviceNo"]+"</span></td>";
		j = ++i;
		if(j<len)
			innerRadio += "<td><input type='radio' id='"+resultObj[j]["promInstId"]+"' /><span>"+resultObj[j]["deviceNo"]+"</span></td>";
		j = ++i;
		if(j<len)
			innerRadio += "<td><input type='radio' id='"+resultObj[j]["promInstId"]+"' /><span>"+resultObj[j]["deviceNo"]+"</span></td>";
		innerRadio += "</tr>";
	}
	innerRadio += "</table>";
	
	return innerRadio;
};

function initRadioEvent(resultObj){

	for(var i=0,len = resultObj.length;i<len;i++){
		var obj = resultObj[i];
		$(resultObj[i]["promInstId"]).onclick = function(){
			
			$("oldDeviceNo").value = obj["deviceNo"];
			//格式：受理编号~设备类型~实收价~成本价
			$("deviceInfoStr").value = obj["deviceInfoStr"];
			$("promotionInstId").value = obj["promInstId"];
			
			return function(){
				for(var j=0,size = resultObj.length;j<size;j++)
					resultObj[j].checked = false;
				this.checked = true;
				
				radioClick(obj["promInstId"]);
			}
		}(obj,resultObj);
	}
}

function radioClick(promInstId){
	
	deviceTypeOld="";
	/*alert(promInstId);
	alert("$(oldDeviceNo).value: "+$("oldDeviceNo").value)
	alert("$(deviceInfoStr).value: "+$("deviceInfoStr").value)*/
	var param = "promotionInstId="+promInstId;
	var resultStr = executeRequest("secondAcceptAjaxAction","getPromotionInfoByInstId",param);
	if(resultStr == ''){
		alert("获取促销政策信息失败！");
		return;
	}
	var resultObj = _buscard.util.parse(resultStr);
	$("leastCost").value = resultObj.LEAST_CONSUME||'';
	$("protocalValidDate").value = resultObj.BEGIN_DATE||'';
	$("protocalInvalidDate").value = resultObj.END_DATE||'';
	$("scheme").value = resultObj.SCHEME||'';
	
	var paramDeviceType = "scheme="+$("scheme").value;
	var resultStr = executeRequest("secondAcceptAjaxAction","getSchemeDesc",paramDeviceType);
	$("scheme").value = resultStr;
	var deviceInfoStr = $("deviceInfoStr").value||'';
	if(deviceInfoStr!=''){
		
		var temp = deviceInfoStr.split("~");
		$("registerNumber").value = temp[0];
		$("preDeviceNo").value = $("oldDeviceNo").value;
		
		//获取终端类型
		var paramDeviceType = "deviceNo="+ $("oldDeviceNo").value;
		var resultStr = executeRequest("secondAcceptAjaxAction","getDeviceTypeDesc",paramDeviceType);
		
		$("deviceTypeDesc").value = resultStr;   //---------------------需要调资源接口 返回汉字
		deviceTypeOld =temp[1];//获取旧的租机终端类型
				
		 if(temp[2]>1) {
		 $("realPrice").value = temp[2]/100;
		 }else {		 
		 $("realPrice").value = temp[2];
		 }

		
		 
		if(temp[2]!=null) {
		if(temp[3]>1) {
		 $("costPrice").value = temp[3]/100;
		 }else {
		 $("costPrice").value = temp[3];
		 }}else {
		 $("costPrice").value ="0";
		 }
	}
	
	setSubGroupDisplay("");
}


Me.$("deviceNo").onblur = function(){
	var deviceNo = this.value;
	if(deviceNo=='')
		return;
	
	//------------------------------调资源接口iri_mobile_kind_check_p 终端型号判断  返回[0] 是否省内终端标识  1.省内终端  0.省外终端 [1] 是否是特殊终端    1.特殊终端  0.非特殊终端
	
	//------------------------------根据返回结果，判断是否特殊终端，如果是 调资源接口iri_mobile_manage_check_p 进行检测

	
	//检测手机串号是否可有效、是否可销售
	var validInfoObj = {
		"checkSaleMobile" : "1"
	};
	var validJsonInfo = BusCard.util.toJson(validInfoObj);
	var parameter = "mktResId="+deviceNo;
	parameter += "&serviceOfferId="+serviceOfferId;	
	parameter += "&mktResType=4";
	parameter += "&productId="+cardInfo.productId;
	parameter += "&validJsonInfo="+validJsonInfo;
	var checkJsonStr = executeRequest("prodOfferSaleAjaxAction","getCheckResourceInfo",parameter);
	var checkResult = executeAjaxResult(checkJsonStr);
	if (checkResult == false) {
		if(switch701=='1')
			this.value = "";
		this.focus();
		return false;
	}
	
	//调资源接口 查询手机串号相关信息
	var queryInfoObj = {
		"MOBILE_SALE_PRICE" : "0",
		"BELONGS_TO" : "0",
		"MOBILE_SOURCE" : "0",
		"NEWOLD_STATUS" : "0",
		"RESOURCE_KIND" : "0",
		"DESC_BELONGS_TO" : "1",
		"DESC_MOBILE_SOURCE" : "1",
		"DESC_NEWOLD_STATUS" : "1",
		"DESC_RESOURCE_KIND" : "1"
	};
	var queryJsonInfo = BusCard.util.toJson(queryInfoObj);
	var parameter = "mktResId="+deviceNo;
	parameter += "&serviceOfferId="+serviceOfferId;	
	parameter += "&mktResType=4";
	parameter += "&queryJsonInfo="+queryJsonInfo;
	parameter += "&productId="+cardInfo.productId;
	
	var resultJsonStr = executeRequest("prodOfferSaleAjaxAction","getQueryResourceInfo",parameter);
	var jsonResultObj =  (typeof resultJsonStr=='string')?eval("("+resultJsonStr+")"):resultJsonStr;
	
	//渠道检测bd_source_dealer_check_p
	/*var parameter = "serviceOfferId="+serviceOfferId+"&resDealer="+jsonResultObj.allId.BELONGS_TO;
	var result = executeRequest("goodsSaleAcceptAction","doSourceDealerCheck",parameter);
	if(!!result){
		alert(result);
		return false;
	}*/
	
	if(jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1"){
		if(switch815=='1'&& deviceTypeOld!=jsonResultObj.allId.RESOURCE_KIND){
			
			alert("原终端类型与选择终端类型不匹配!");
			if(switch701=='1')
				this.value = "";
			this.focus();
			return false;
		}
		$("moblieSourse").value = jsonResultObj.allDesc.MOBILE_SOURCE||'';
		$("newoldStatus").value = jsonResultObj.allDesc.NEWOLD_STATUS||'';
		$("resourceKind").value = jsonResultObj.allDesc.RESOURCE_KIND||'';
		$("mobileAgent").value = jsonResultObj.allDesc.BELONGS_TO || '';
		
		$("moblieSourseId").value = jsonResultObj.allId.MOBILE_SOURCE||'';
		$("newoldStatusId").value = jsonResultObj.allId.NEWOLD_STATUS||'';
		$("resourceKindId").value = jsonResultObj.allId.RESOURCE_KIND||'';
		$("mobileAgentId").value = jsonResultObj.allId.BELONGS_TO || '';
	}else{
		alert("查询租机信息失败！");
		if(switch701=='1')
			this.value = "";
		this.focus();
		return false;
	}
};

Me.$("backPrice").onblur = function(){	
	if(Me.$("backPrice")==""||Me.$("backPrice")==null){
		alert("折旧费不能为空！");
		return false;
	}
	if(Me.$("realPrice")==""||Me.$("realPrice")==null){
		alert("合同机款为空，请核查！");
		return false;
	}
	var backPrice = parseFloat(Me.$("backPrice").value);
	var realPrice = parseFloat(Me.$("realPrice").value);
	if(backPrice>realPrice) {
	alert("折旧费不能高于合同机款！");
	Me.$("backPrice").value='';
		return;
	}
	if(backPrice=='')
		return;
	if(isNaN(backPrice)){
		alert("只能输入数字！");
		return;
	}
};

Me.$("backPrice").onkeypress = function(){
	return checkInputChar();
};

var checkInputChar = function(){
	if(!(event.keyCode>=48&&event.keyCode<=57)){
		return false;
	}
	return true;
}
		
		
function setSubGroupDisplay(dis){
	$("subgroup_17501").style.display = dis;
	$("subgroup_17502").style.display = dis;
};

Me.setObjDisabled = function (name) {
	if(name && Me.$(name) && Me.$(name).type == "text"){
		Me.$(name).readOnly = true;
	}
	return;
};


var cardInit = function(){
	/* set obj readOnly */
	Me.setObjDisabled("registerNumber");
	Me.setObjDisabled("preDeviceNo");
	Me.setObjDisabled("deviceTypeDesc");
	Me.setObjDisabled("realPrice");
	Me.setObjDisabled("costPrice");
	Me.setObjDisabled("leastCost");
	Me.setObjDisabled("protocalValidDate");
	Me.setObjDisabled("protocalInvalidDate");
	Me.setObjDisabled("scheme");
	
	Me.setObjDisabled("resourceKind");
	Me.setObjDisabled("newoldStatus");
	Me.setObjDisabled("moblieSourse");
	Me.setObjDisabled("mobileAgent");
	/* card init */
};

cardInit();




















/*var constObj = {
	NONE_BIND_SALE_KIND : '0',
	PHONE_ONLY : '1',
	PAY_BY_CASH : '0',
	PAY_BY_SUBSIDY : '1'
};

var list1 = [],list2 = [];
list1.push({id : 0,name : '租机'});
list1.push({id : 2,name : '售机'});
list2.push({id : 1,name : '裸机'});
Me.$("subsidySaleKind").disabled = true;
Me.$("subsidySaleKind").value=2;

//销售方式  初始值
BusCard.$rs(Me.$("saleType"),list2);
//隐藏绑定业务号码
Me.$("bindServiceId").style.display = "none";
Me.$("label_bindServiceId").style.display = "none";
Me.$("bindServiceId").isNull = '1';

Me.$("saleKind").onchange = function(){
	if(Me.$("saleKind").value=='0'){//非绑定销售
		BusCard.$rs(Me.$("saleType"),list2);
		
		Me.$("bindServiceId").style.display = "none";
		Me.$("label_bindServiceId").style.display = "none";
		Me.$("bindServiceId").isNull = '1';
		$("custInfoDIV").style.display = "none";
	}else{
		BusCard.$rs(Me.$("saleType"),list1);
		
		Me.$("bindServiceId").style.display = "";
		Me.$("label_bindServiceId").style.display = "";
		Me.$("bindServiceId").isNull = '0';
		$("custInfoDIV").style.display = "";
	}
};

Me.$("bindServiceId").onblur = function(){
	var bindServiceId = Me.$("bindServiceId").value;
	if(bindServiceId=='')
		return;
	var param = "&serviceId="+bindServiceId+"&mobileAgent="+$("mobileAgent").value+"&deviceNo="+$("deviceNo").value;
	var resultStr = executeRequest("goodsSaleAcceptAction","doCheckBindServiceId",param);
	var resultObj = Jscu.util.CommUtil.parse(resultStr);
	if(resultObj.flag=='0'){
		alert(resultObj.result);
		Me.$("bindServiceId").value = "";
		Me.$("bindServiceId").focus();
		return;
	}
	$("custInfoDIV").style.display = "";
	$("custName").value = resultObj.custName;
	$("custKind").value = resultObj.custKind;
	$("identityKind").value = resultObj.identityKind;
	$("identityCode").value = resultObj.identityCode;
};

Me.$("extentInfo").onchange = function(){
	var extentInfo = Me.$("extentInfo").value;
	var param = "extentInfo="+extentInfo;
	var jsonMapStr = executeRequest("businessAcceptAction","getRetailInfo",param);
	var jsonMapObj = Jscu.util.CommUtil.parse(jsonMapStr);
	BusCard.$rs($("retailInfo"),jsonMapObj.retailInfoColl);
};

Me.$("payType").onchange = function(){
	var payTypeVal = Me.$("payType").value;
	if(Me.$("payType")){
		Me.$("payTypeDesc").value = Me.$("payType").options[Me.$("payType").selectedIndex].text;
	}	
	if(payTypeVal == constObj.PAY_BY_CASH){
		Me.$("subsidyNo").isNull = '1';
		Me.$("subsidyPwd").isNull = '1';
		Me.setDisplayNone("subsidyNo");
		
		Me.setDisplayNone("payType");
		Me.setDisplayBlock("payType");
	}else{
		Me.$("subsidyNo").isNull = '0';
		Me.$("subsidyPwd").isNull = '0';
		Me.setDisplayBlock("subsidyNo");
		
		Me.setDisplayNone("payType");
		Me.setDisplayBlock("payType");
	}
};

Me.$("realFee").onkeypress = function(){
	return checkInputChar();
};

Me.$("realFee").onblur = function(){
	var subsidyFee = Me.$('subsidyFee').value||'';
	if(subsidyFee=='')
		Me.$('realLeftFee').value = Me.$('realFee').value;
	else{
		var switchPrice = Me.$("realFee").value - Me.$('realFee').value;
		Me.$('realLeftFee').value = switchPrice>=0?switchPrice:0;
	}
};

Me.$("realLeftFee").onkeypress = function(){
	return checkInputChar();
};

Me.$("realLeftFee").onblur = function(){
	var dValue = Me.$("realLeftFee").value-Me.$("realFee").value;
	if(dValue>0)
	{
		alert("剩余缴费金额不能大于实收价！");
		Me.$("realLeftFee").value = "";
		Me.$("realLeftFee").select();
	}
};

Me.$("subsidyNo").onblur = function(){
	var subsidyNo = Me.$("subsidyNo").value;
	var subsidyPwd = Me.$("subsidyPwd").value;
	if(subsidyNo == ""){
		return;
	}
	if(subsidyPwd == ""){
		Me.$("subsidyPwd").focus();
		return;
	}
	getSubsidyInfo(subsidyNo,subsidyPwd);
};


Me.$("subsidyPwd").onblur = function(){
	var subsidyNo = Me.$("subsidyNo").value;
	var subsidyPwd = Me.$("subsidyPwd").value;
	if(subsidyPwd == ""){
		return;
	}
	if(subsidyNo == ""){
		Me.$("subsidyNo").focus();
		return;
	}
	getSubsidyInfo(subsidyNo,subsidyPwd);
};

var getSubsidyInfo = function(subsidyNo,subsidyPwd){
	var validInfoObj = {
		"operKind" : 5,
		"cardKind" : 1,
		"pwd" : subsidyPwd
	};
	var validJsonInfo = BusCard.util.toJson(validInfoObj);
	var parameter = "mktResId="+subsidyNo;
	parameter += "&serviceOfferId=''";	
	parameter += "&mktResType=5";
	parameter += "&productId=''";
	parameter += "&validJsonInfo="+validJsonInfo;
	
	var checkJsonStr = executeRequest("prodOfferSaleAjaxAction","getCheckResourceInfo",parameter);
	var checkResult = executeAjaxResult(checkJsonStr);
	if (checkResult == false) {
		Me.$("subsidyNo").value = "";
		Me.$("subsidyPwd").value = "";
		Me.$("subsidyNo").focus();
		return false;
	}
	
	var queryInfoObj = {
		"CARD_VALUE" : "CARD_VALUE"
	};
	var queryJsonInfo = BusCard.util.toJson(queryInfoObj);
	var parameter = "mktResId="+subsidyNo;
	parameter += "&serviceOfferId=''";	
	parameter += "&mktResType=5";
	parameter += "&queryJsonInfo="+queryJsonInfo;
	parameter += "&productId=30281";
	var resultJsonStr = executeRequest("prodOfferSaleAjaxAction","getQueryResourceInfo",parameter);
	var result = "-1";
	try{
		var jsonResultObj =  (typeof resultJsonStr=='string')?eval("("+resultJsonStr+")"):resultJsonStr;
		if(jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1"){
			Me.$("subsidyFee").value = jsonResultObj.CARD_VALUE/100;
		}else{
			Me.$("subsidyNo").value = "";
			Me.$("subsidyPwd").value = "";
			Me.$("subsidyNo").focus();
			alert(jsonResultObj.message);
			return false;
		}
	}catch(e){
		Me.$("subsidyNo").value = "";
		Me.$("subsidyPwd").value = "";
		Me.$("subsidyNo").focus();
		alert(e);
		return false;
	}
	
	var realLeftFee = Me.$('realLeftFee').value||'';
	if(realLeftFee=='')
		Me.$('realLeftFee').value = '';
	else{
		var switchPrice = Me.$("realFee").value - Me.$('realFee').value;
		Me.$('realLeftFee').value = switchPrice>=0?switchPrice:0;
	}
	
	return ;
}

var checkInputChar = function(){
	if(!(event.keyCode>=47&&event.keyCode<=57)){
		return false;
	}
	return true;
}

Me.setDisplayNone = function (name) {
	Me.$(name).parentNode.parentNode.style.display = "none";
	Me.$("label_" + name).style.display = "none";
};

Me.setDisplayBlock = function (name) {
	Me.$(name).parentNode.parentNode.style.display = "";
	Me.$("label_" + name).style.display = "";
};

Me.setObjDisabled = function (name) {
	if(name && Me.$(name) && Me.$(name).type == "text"){
		Me.$(name).readOnly = true;
	}
	return;
};

var cardInit = function(){
	 set obj readOnly 
	Me.setObjDisabled("moblieSourse");
	Me.setObjDisabled("newoldStatus");
	Me.setObjDisabled("resourceKind");
	Me.setObjDisabled("shouldFee");
	Me.setObjDisabled("mobileAgent");
	Me.setObjDisabled("subsidyFee");
	 card init 
	Me.$("payType").onchange();
};

cardInit();*/
});
