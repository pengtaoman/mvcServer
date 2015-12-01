try{
var Me = this;
var webpath="";
var APP_PATH = document.getElementsByTagName("contextPath")[0].value;
var colour='#666666';
BusCard.Namespace.create("OfferStandard.create");// 

//加载并初始化卡片
OfferStandard.create.init = function(){
	var card = BusCard.createInstance({},BusCard.$("custInfoDiv"),{
		gType:3,
		fromURL:true,
		url:"/orderaccept/offerstandardaccept/xml/OfferStandardAccept.xml"
	});
	card.init(function(){
		var Me = this;
	});
	Me.card = card;
	
	Me.initPage();
	Me.initEvent();
};

//初始化页面
Me.initPage = function(){
	webpath=document.all("webpath").value;
	Me.initAllSelect();
	Me.initAllValue();
	Me.initEvent();
	$("BPay").disabled = true;
	$("BPrint").disabled = true;
	$("BComplete").disabled = true;
};

//初始化所有下拉框
Me.initAllSelect = function(){
	var jsonMapStr = $("jsonMap").value;
	var jsonMapObj = Jscu.util.CommUtil.parse(jsonMapStr);
	Me.initSelect($("identityKindColl"),jsonMapObj.identityKindColl);
};
//初始化下拉框
Me.initSelect = function(container,collection){
	BusCard.$rs(container,collection);
};
Me.cityCode = "";
Me.custId = "";
Me.createDate = "";
Me.custOrderId = "";
//给卡片赋初值
Me.initAllValue = function(){
	var jsonMapStr = $("jsonCustInfo").value;
	var jsonMapObj = Jscu.util.CommUtil.parse(jsonMapStr);
	var custInfoVO = jsonMapObj.custInfoVO;
	var partyCertVO = jsonMapObj.partyCertVO;
	//基本信息
	Me.$("custName").value = custInfoVO.custName;
	Me.$("identityKindColl").value = custInfoVO.identityKind;
	Me.$("identityCode").value = custInfoVO.identityCode;
	Me.$("commuAddress").value = custInfoVO.custAddress;
	var strContactDefault = $("strContactDefault").value;//首选联系人
	if(strContactDefault != ""){
		var contactDefaultObj = strContactDefault.split("`");
		Me.$("linkManNameDefault").value = contactDefaultObj[0];
		Me.$("linkPhoneDefault").value = contactDefaultObj[1];
	}
	Me.$("identityAddress").value = partyCertVO.certiAddress;//certiAddress

	Me.cityCode = custInfoVO.cityCode;	
	Me.custId = custInfoVO.custId;
	Me.createDate = $("acceptDay").value;
};

Me.initEvent = function(){

	Me.$("BPrint").onclick = function(){
		Me.BPrint_onClick();
	},
	Me.$("BSubmit").onclick = function(){
		Me.BSubmit_onClick();
	},
	Me.$("BPay").onclick = function(){
		Me.BPay_onClick();
	},
	Me.$("BComplete").onclick = function(){
		Me.BComplete_onClick();
	}	

};

Me.newStandardInstList = [];

var addNewOfferStandardInst = function(TDId,prodOfferInstId,serviceId,prodInstId,productId,prodOfferId){
	
	var jsonMapStr = $("jsonCustInfo").value;
	var jsonMapObj = Jscu.util.CommUtil.parse(jsonMapStr);
	var custInfoVO = jsonMapObj.custInfoVO;

	
	var jsonMapStr = $("jsonOfferAcceptInfoVOList").value;
	var jsonMapObj = Jscu.util.CommUtil.parse(jsonMapStr);
	
	var acceptDay = $("acceptDay").value;//sysdate 格式yyyy-MM-dd

	var effDateStr = acceptDay;
	var expDateStr = "";
	
	//当前时间与已存在协议期实例比较,取最大时间作为新协议期的开始时间
	for(var i=0;i<jsonMapObj.length;i++){
		var offerAcceptInfoVO = jsonMapObj[i];
		for(var j=0;j<offerAcceptInfoVO.relaOfferStandardInstList.length;j++){
			if(prodOfferInstId==offerAcceptInfoVO.relaOfferStandardInstList[j].prodOfferInstId){
				effDateStr = effDateStr > offerAcceptInfoVO.relaOfferStandardInstList[j].sexpDate ? effDateStr : offerAcceptInfoVO.relaOfferStandardInstList[j].sexpDate;
			}
		}
	}	
	for(var i=0;i<Me.newStandardInstList.length;i++){
		if(prodOfferInstId==Me.newStandardInstList[i].prodOfferInstId){
			effDateStr = effDateStr > Me.newStandardInstList[i].expDate ? effDateStr : Me.newStandardInstList[i].expDate;
		}
	}	

	//调用PPM接口获取协议期信息
	var offerStandardDateBuilder;
	if(document.getElementById("detailOfferStandardInst"+TDId).value==""){
		var agreementJsonStr= executeRequest("OfferStandardAcceptAction","doProdOfferStandardInfoQuery","&prodOfferId="+prodOfferId);
		var agreementJsonObj = Jscu.util.CommUtil.parse(agreementJsonStr);
		offerStandardDateBuilder = new OfferStandardDateBuilder(agreementJsonObj.delayUnit,agreementJsonObj.delayTime,agreementJsonObj.feeValue/100,agreementJsonObj.ifPay);
		if(offerStandardDateBuilder.delayUnit!=1){
			//("协议期时长单位不是\"年\",不能识别，请通知管理员！");
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08410169"});
			return;
		}
		document.getElementById("detailOfferStandardInst"+TDId).value 
		= agreementJsonObj.delayUnit+"~"+agreementJsonObj.delayTime+"~"+agreementJsonObj.feeValue+"~"+agreementJsonObj.ifPay;
			
	}else{
		var temp = document.getElementById("detailOfferStandardInst"+TDId).value.split("~");
		offerStandardDateBuilder = new OfferStandardDateBuilder(temp[0],temp[1],temp[2]/100,temp[3]);	
	}

	
	//调用查询促销政策结束时间接口
	var promotionEndTime= executeRequest("OfferStandardAcceptAction","getPromotionEndTime","&prodOfferInstId="+prodOfferInstId);
	if(promotionEndTime != ""){		
		effDateStr = effDateStr > promotionEndTime ? effDateStr : promotionEndTime;
	}
	
	var effDate = new Date();
	var expDate = new Date();	

	var effYear = effDateStr.substring(0,effDateStr.indexOf ('-'));
	var effMonth = effDateStr.substring(5,effDateStr.lastIndexOf ('-'));
    var effDay = effDateStr.substring(effDateStr.length,effDateStr.lastIndexOf ('-')+1);   
    
	//生效日期
	effDate.setYear(effYear);
	effDate.setMonth(effMonth-1);
	effDate.setDate(effDay);
	//失效日期
	expDate.setYear((effYear/1)+(offerStandardDateBuilder.delayTime/1));
	expDate.setMonth(effMonth-1);
	expDate.setDate(effDay);

	//新的协议期实例
	var newOfferStandardInst = 
				new NewOfferStandardInst(prodOfferInstId,
										 serviceId,
										 prodInstId,
										 productId,
										 prodOfferId,
										 getSimpleDate(formatDate(effDate)),
										 getSimpleDate(formatDate(expDate)),
										 offerStandardDateBuilder.feeValue);//ppm单位改为“分”了
	
	Me.newStandardInstList.push(newOfferStandardInst);
	
	//新加协议期信息展示
	var newTr = document.createElement("TR");
	newTr.className="table_content";
	
    var newTd1=document.createElement("TD");
    newTd1.width="2%"
    newTd1.innerHTML="&nbsp;"; 
	newTr.appendChild(newTd1);
	
	var newTd2=document.createElement("TD"); 
	newTd2.width="20%"
    newTd2.innerHTML="<img src='common/dx20/images/down_3.gif' width='16' height='18' style='cursor:hand'>"; 
	newTr.appendChild(newTd2);
	
	var newTd3=document.createElement("TD"); 
    newTd3.innerHTML="&nbsp;"; 
    newTd3.width="13%"
	newTr.appendChild(newTd3);
	
	var newTd4=document.createElement("TD"); 
    newTd4.innerHTML="&nbsp;"; 
    newTd4.width="13%"
	newTr.appendChild(newTd4);
	
	var newTd5=document.createElement("TD"); 
    newTd5.innerHTML="<font style='font-weight: bold;'>"+newOfferStandardInst.effDate+"</font>"; 
    newTd5.width="13%"
	newTr.appendChild(newTd5);
	
	var newTd6=document.createElement("TD"); 
    newTd6.innerHTML="<font style='font-weight: bold;'>"+newOfferStandardInst.expDate+"</font>";
    newTd6.width="13%"
	newTr.appendChild(newTd6);
	
	var newTd7=document.createElement("TD"); 
    newTd7.innerHTML= "<font style='font-weight: bold;'>"+newOfferStandardInst.feeValue.toFixed(2)+"元</font>";	
    newTd7.width="13%"
	newTr.appendChild(newTd7);
	
	var newTd8=document.createElement("TD"); 
	newTd8.innerHTML="&nbsp;"; 
    newTd8.width="13%"
	newTr.appendChild(newTd8);
		
	document.getElementById("newOfferStandardInst"+TDId).appendChild(newTr);
	document.getElementById("deleteOfferStandardInst"+TDId).disabled = false;
};

//协议期信息
var detailOfferStandardInst = function (obj,TDId,prodOfferId){
	var htmlStr = "<div class='tooltip-wrapper' style='width: 200px;'>";
		htmlStr += "<div class='tooltip-title'>";
		htmlStr += "<span class='tooltip-title-text'>销售品协议信息</span>";
		htmlStr += "</div>";
		htmlStr += "<div class='tooltip-content' style='padding: 0 10 0 0;'>";
		htmlStr += "	<ul type=2>";
	if(document.getElementById("detailOfferStandardInst"+TDId).value==""){
		//调用PPM接口获取协议期信息
		var agreementJsonStr= executeRequest("OfferStandardAcceptAction","doProdOfferStandardInfoQuery","&prodOfferId="+prodOfferId);
		var agreementJsonObj = Jscu.util.CommUtil.parse(agreementJsonStr);
		var offerStandardDateBuilder = new OfferStandardDateBuilder(agreementJsonObj.delayUnit,agreementJsonObj.delayTime,agreementJsonObj.feeValue/100,agreementJsonObj.ifPay);
		if(offerStandardDateBuilder.delayUnit!=1){
			//("协议期时长单位不是\"年\",不能识别，请通知管理员！");
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08410169"});
			return;
		}
		document.getElementById("detailOfferStandardInst"+TDId).value 
			= agreementJsonObj.delayUnit+"~"+agreementJsonObj.delayTime+"~"+agreementJsonObj.feeValue+"~"+agreementJsonObj.ifPay;
			
		htmlStr += "<li>是否需要缴费："+(agreementJsonObj.ifPay==1?"是":"否")+"</li>";
		htmlStr += "<li>包周期费用(元)："+agreementJsonObj.feeValue/100+"</li>";
		htmlStr += "<li>协议周期："+agreementJsonObj.delayTime+"年</li>";			
	}else{
		var temp = document.getElementById("detailOfferStandardInst"+TDId).value.split("~");
		htmlStr += "<li>是否需要缴费："+(temp[3]==1?"是":"否")+"</li>";
		htmlStr += "<li>包周期费用(元)："+temp[2]/100+"</li>";
		htmlStr += "<li>协议周期："+temp[1]+"年</li>";						
	}
    htmlStr += "    </ul>";
	htmlStr += "</div>";
	htmlStr += "</div>";
	unieap.showTooltip({inner:htmlStr,autoClose:true},obj,['arround']);//below
	
};

var deleteOfferStandardInst = function (TDId,prodOfferInstId){
	var obj = document.getElementById("newOfferStandardInst"+TDId);
	if(obj.lastChild!=null){
		obj.removeChild(obj.lastChild);
	}
	if(obj.lastChild==null){
		document.getElementById("deleteOfferStandardInst"+TDId).disabled = true;
	}
	var lastexpDate = "";
	for(var i=0;i<Me.newStandardInstList.length;i++){
		if(prodOfferInstId==Me.newStandardInstList[i].prodOfferInstId){
			lastexpDate = lastexpDate > Me.newStandardInstList[i].expDate ? effDate : Me.newStandardInstList[i].expDate;
		}
	}	
	for(var i=0;i<Me.newStandardInstList.length;i++){
		if(prodOfferInstId==Me.newStandardInstList[i].prodOfferInstId && lastexpDate==Me.newStandardInstList[i].expDate){
			Me.newStandardInstList.splice(i,1);
			break;
		}
	}	
};

var NewOfferStandardInst = function(prodOfferInstId,serviceId,prodInstId,productId,prodOfferId,effDate,expDate,feeValue){
	var Me = this;
	Me.prodOfferInstId = prodOfferInstId;
	Me.serviceId = serviceId;
	Me.prodInstId = prodInstId;
	Me.productId = productId;
	Me.prodOfferId = prodOfferId;
	Me.effDate = effDate;
	Me.expDate = expDate;	
	Me.feeValue = feeValue;
};

var OfferStandardDateBuilder = function(delayUnit,delayTime,feeValue,ifPay){
	var Me = this;
	Me.delayUnit = delayUnit;
	Me.delayTime = delayTime;
	Me.feeValue = feeValue;
	Me.ifPay = ifPay;
};

function getSimpleDate(sDate){
	if(!sDate||sDate.ength<10){
		return sDate;
	}
	return sDate.substr(0,10);
};

function formatDate(date){
	var iMonth = date.getMonth() + 1;
	var sMonth = new String(iMonth);
	if (sMonth.length == 1) {
	 sMonth = "0" + sMonth;
	}
	var iDate = date.getDate();
	var sDate = new String(iDate);
	if (sDate.length == 1) {
	 sDate = "0" + sDate;
	}
	var iHour = date.getHours();
	var sHour = new String(iHour);
	if (sHour.length == 1) {
	 sHour = "0" + sHour;
	}
	var iMin = date.getMinutes();
	var sMin = new String(iMin);
	if (sMin.length == 1) {
	 sMin = "0" + sMin;
	}
	var iSec = date.getSeconds();
	var sSec = new String(iSec);
	if (sSec.length == 1) {
	 sSec = "0" + sSec;
	}
	return date.getYear() + '-' + sMonth + '-' + sDate + ' ' + sHour + ':' + sMin + ':' + sSec;
			                
};

function getReturnValue(){
	var result = "";
	for(var i=0;i<Me.newStandardInstList.length;i++){
		result += "&prodOfferInstId="+Me.newStandardInstList[i].prodOfferInstId
				 +"&serviceId="+Me.newStandardInstList[i].serviceId
				 +"&prodInstId="+Me.newStandardInstList[i].prodInstId
				 +"&productId="+Me.newStandardInstList[i].productId
				 +"&prodOfferId="+Me.newStandardInstList[i].prodOfferId
				 +"&effDate="+Me.newStandardInstList[i].effDate
				 +"&expDate="+Me.newStandardInstList[i].expDate
				 +"&feeValue="+Me.newStandardInstList[i].feeValue;
	}
	return result;
};

/**
 * 免填单打印
 */
Me.BPrint_onClick = function()
{
	var pagePath = webpath + "/printAction.do?method=doPrintInit&billKind=3&custOrderId="+Me.custOrderId;
	window.open(pagePath , 
	"orderPrint", "height=700,width=1000,status=no,scrollbars=yes,toolbar=no,menubar=no,location=no,top=10,left=10");
	$("BPrint").disabled = true;
};
/**
 * 保存订单 
 */
Me.BSubmit_onClick = function()
{	
	if(Me.newStandardInstList.length == 0){
		//未做任何续约！
		orderaccept.common.dialog.MessageBox.alert({busiCode:"08410166"});
		return;
	}
	var param = "&cityCode="+Me.cityCode
			  + "&custId="+Me.custId
			  + "&createDate="+Me.createDate
			  + "&acceptWay="+$("acceptWay").value
			  + Me.getReturnValue();	
	var result = executeRequest("OfferStandardAcceptAction","save",param);
	var resultObj = Jscu.util.CommUtil.parse(result);
	if(resultObj.flag == 1){
		//保存订单完成
		$("BSubmit").disabled = true;		
		$("BPrint").disabled = false;	
		Me.custOrderId = resultObj.message;		
		//费用预算
		Me.openPayFeeList();		
	}else{
		orderaccept.common.dialog.MessageBox.alert({busiCode:"08410168",infoList:[resultObj.message]});
	}
};
//受理完成
Me.BComplete_onClick = function()
{
	var param = "&custOrderId="+Me.custOrderId;	
	var result = executeRequest("OfferStandardAcceptAction","orderComplete",param);
	var resultObj = Jscu.util.CommUtil.parse(result);
	if(resultObj.flag == 1){
		//("受理完成！订单编号为："+resultObj.message);
		orderaccept.common.dialog.MessageBox.alert({busiCode:"08410167",infoList:[resultObj.message]});
		$("BComplete").disabled = true;		
		//缴费打开
		$("BPay").disabled = false;
	}else{
		orderaccept.common.dialog.MessageBox.alert({busiCode:"08410168",infoList:[resultObj.message]});
	}
};

var _BudgetWidget = dojo.require("orderaccept.prodofferaccept.widget.budget.BudgetWidget");
var TooltipDialog = dojo.require("orderaccept.custom.TooltipDialog");
var popup = dojo.require("orderaccept.custom.popup");

Me.openPayFeeList = function(){	
	//打开费用预算列表浮动窗口
	/**
	if(!Me.BudgetWidget){
		Me.BudgetWidget = new _BudgetWidget({"custOrderId":Me.custOrderId});
	       Me.payFeeListPop = new TooltipDialog({
	                id : 'payFeeList'
	               });   			        
	       Me.payFeeListPop.startup();	
	       dojo.place(Me.BudgetWidget.domNode, Me.payFeeListPop.containerNode, "first"); 
	}				
    popup.open({
             widget : {
              popup : Me.payFeeListPop,
              around : Me.$("BSubmit")
             }
	});
	*/
	var param = {
		custOrderId : parseInt(Me.custOrderId)
	};
	//executeRequest("budgetComponentAction","doBudget",param);
	BusCard.util.doPost(BusCard.path.contextPath+"/budgetComponentAction.do?method=doBudget", param, false, null, null, true);
	//受理完成打开	
	$("BComplete").disabled = false;
}


/**
 * 缴费
 */
Me.BPay_onClick = function()
{
	var custOrderId = Me.custOrderId;
	$("BPay").disabled = true;
	if (opener && opener.parent.top) {
		opener.parent.top.top_page.MenuBar.activeTopMenuById('System84', '842', '842AA', "custOrderId=" + custOrderId);
		// opener.close();
		window.close();
		return;
	}
	if (parent.top) {
		parent.top.top_page.MenuBar.activeTopMenuById('System84', '842', '842AA', "custOrderId=" + custOrderId);
		return;
	}
};



}catch(e){
	orderaccept.common.dialog.MessageBox.alert({busiCode:"08410168",infoList:[e.message]});
}