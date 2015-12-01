/**
 * 展示销售品受理页面，采用unieap.showTooltip方式展示弹出框
 * @param prodOfferInstId 销售品实例id
 * @param prodOfferId 销售品id
 * @remark 弹出的操作选择页面，使用showTooltip显示iframe,由于存在多层iframe嵌套，弹出操作页面后，存在浏览器进度条一直loading问题
 * 为了解决这个问题，在弹出页面包含的iframe标签（ifraOrderDetail）中，设置src为空，增加onload方法,用window.setTimeout延时加载iframe的src
 */
function showOrderDetail(prodOfferInstId,prodOfferId,ifBundle,productId,obj){
	
	//var custXml=parent.parent.parent.document.getElementById("custXml").value;custXml="";
	var param = "&prodOfferInstId="+prodOfferInstId+"&prodOfferId="+prodOfferId+"&ifBundle="+ifBundle+"&productId="+productId;//+"&custXml="+custXml; 由于custXml中存在引号，并且需要做为参数传给setFrameSrc方法，所以移到setFrameSrc方法中拼接
	//如果单销售品需要检测
	if(ifBundle==0){
		var resultStr = executeRequest("serviceOfferAction", "getChangeServiceOfferCount", param);
		if(resultStr==0){
			//alert("该用户不能办理此业务！");
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08410223"});
			return;
		}
	}
	var path = document.getElementById("webPath").value + "/serviceOfferAction.do?method=getChangeServiceOffer"+param;
	var htmlStr = "<iframe id='ifraOrderDetail' src='' onload=\"setFrameSrc('ifraOrderDetail','"+path+"')\" frameborder='0' scrolling='no' width='400px' height='114px' />";
	unieap.showTooltip({inner:htmlStr,autoClose:true},obj,['above','below','before']);
	return false;
} 

/**
  * 延时加载指定iframe的src。解决浏览器进度条一直loading问题（IE BUG）
  * 该方法通过iframe的onload事件触发（能够避免该方法被调用时，iframe还没有被加载到页面导致找不到iframe的问题）
  */
function setFrameSrc(frameName,path){
	if($(frameName).src != ""){//如果已经加载过SRC，则清空onload方法
		$(frameName).onload = function(){};
		return;
	}
	var custXml=parent.parent.parent.document.getElementById("custXml").value;
	path = path + "&custXml=" + custXml;
	path = path.replace(/\"/g,"'");//双引号替换为单引号
	var runStr = "$('"+frameName+"').src = \"" + path + "\";";
	window.setTimeout(runStr,1);//延时加载iframe内容，解决浏览器进度条一直loading问题（IE BUG）
}

/**
 * 展示销售品受理页面:采用滑出方式展示弹出框，UI改造后不用此方法。
 * @param prodOfferInstId 销售品实例id
 * @param prodOfferId 销售品id
 */
function showOrderDetaBack(prodOfferInstId,prodOfferId,obj){
	var custXml=parent.parent.parent.document.getElementById("custXml").value;
	var param = "&prodOfferInstId="+prodOfferInstId+"&prodOfferId="+prodOfferId+"&custXml="+custXml;
	var src = document.getElementById("webPath").value + "/serviceOfferAction.do?method=getChangeServiceOffer"+param;

	document.getElementById("offerList").src  = src;	
	showProdWindow();
	var clientY = absoluteHeight(document.getElementById(obj.id))[1];
	var offerListHeigth = document.getElementById("offerList").clientHeight;
	var scrollHeight = document.body.scrollHeight;
	var scrollTop = document.documentElement.scrollTop;
	var relativeY = clientY - scrollTop;
	if(offerListHeigth>relativeY)
		document.getElementById("prodWindow").style.top = clientY+20;//弹出在下面
	else
		document.getElementById("prodWindow").style.top = clientY-88;//弹出在上面
	
	/*var custXml=parent.parent.parent.document.getElementById("custXml").value;
	var param = "&prodOfferInstId="+prodOfferInstId+"&prodOfferId="+prodOfferId+"&custXml="+custXml;
	var pagePath = document.getElementById("webPath").value + "/serviceOfferAction.do?method=getChangeServiceOffer"+param;
	parent.parent.document.getElementById("subForm").action = pagePath;
	var popupWin = window.open("about:blank", 'prodOfferSalePage', 'status=1,resizable=0,fullscreen=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
	parent.parent.document.getElementById("subForm").target = "prodOfferSalePage";
	parent.parent.document.getElementById("subForm").submit();*/
}

function absoluteHeight(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);
    return [valueL, valueT];
  }
  
/**
 * 展示产品受理页面：采用unieap.showTooltip方式展示弹出框。
 * @param prodOfferInstId 销售品实例id
 * @param prodOfferId 销售品id
 * @param prodId 产品id
 * @param productInstId 产品实例id
 */
function showProdOrderDetail(prodOfferInstId,prodOfferId, prodId, productInstId, serviceId, cityCode,obj){
	//var custXml=parent.parent.parent.document.getElementById("custXml").value;
	var custOrderId= parent.parent.parent.document.getElementById("custOrderId").value;
	var param = "&prodOfferInstId="+prodOfferInstId+"&prodOfferId="+prodOfferId+"&productId="+prodId+"&userId="+productInstId+"&serviceId="+serviceId+"&custOrderId="+custOrderId+"&cityCode="+cityCode;//+"&custXml="+custXml;
	var custIdObj=$("custId");
	if(custIdObj){
		param+="&custId="+custIdObj.value;
	}
	var path = document.getElementById("webPath").value + "/serviceOfferAction.do?method=getServiceOffer"+param;
	var htmlStr = "<iframe id='ifraProdOrderDetail' src='' onload=\"setFrameSrc('ifraProdOrderDetail','"+path+"')\" frameborder='0' scrolling='no' width='400px' height='230px'/>";
	unieap.showTooltip({inner:htmlStr,autoClose:true},obj,['above','below','before']);
	return false;
}

/**
 * 展示产品受理页面：采用滑出方式展示弹出框，UI改造后不用此方法。
 * @param prodOfferInstId 销售品实例id
 * @param prodOfferId 销售品id
 * @param prodId 产品id
 * @param productInstId 产品实例id
 */
function showProdOrderDetailBack(prodOfferInstId,prodOfferId, prodId, productInstId, serviceId, cityCode,obj){
	var custXml=parent.parent.parent.document.getElementById("custXml").value;
	var custOrderId= parent.parent.parent.document.getElementById("custOrderId").value;
	var param = "&prodOfferInstId="+prodOfferInstId+"&prodOfferId="+prodOfferId+"&productId="+prodId+"&userId="+productInstId+"&serviceId="+serviceId+"&custOrderId="+custOrderId+"&cityCode="+cityCode+"&custXml="+custXml;
	var src = document.getElementById("webPath").value + "/serviceOfferAction.do?method=getServiceOffer"+param;
	
	document.getElementById("offerList").src  = src;	
	showProdWindow();
	var clientY = absoluteHeight(document.getElementById(obj.id))[1];
	var offerListHeigth = document.getElementById("offerList").clientHeight;
	var scrollHeight = document.body.scrollHeight;
	var scrollTop = document.documentElement.scrollTop;
	var relativeY = clientY - scrollTop;
	if(offerListHeigth>relativeY)
		document.getElementById("prodWindow").style.top = clientY+20;//弹出在下面
	else{
		var param = "productId="+prodId;
		var result = executeRequest("serviceOfferAction","getServiceOfferCount",param);
		if(result<=6)
			document.getElementById("prodWindow").style.top = clientY-94;//弹出在上面
		else
			document.getElementById("prodWindow").style.top = clientY-148;//弹出在上面
	}
	
	/*var custOrderId= parent.parent.parent.document.getElementById("custOrderId").value;
	var custXml=parent.parent.parent.document.getElementById("custXml").value;
	var param = "&productId="+prodId+"&userId="+productInstId+"&serviceId="+serviceId+"&custOrderId="+custOrderId+"&cityCode="+cityCode+"&custXml="+custXml;
	var pagePath = document.getElementById("webPath").value + "/serviceOfferAction.do?method=getServiceOffer"+param;
	parent.parent.document.getElementById("subForm").action = pagePath;
	var popupWin = window.open("about:blank", 'prodOfferSalePage', 'status=1,resizable=0,fullscreen=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
	parent.parent.document.getElementById("subForm").target = "prodOfferSalePage";
	parent.parent.document.getElementById("subForm").submit();*/
}

//根据业务号码在订单列表中查询订单信息
function searchOrderByServiceId(){
	var serviceId = document.getElementById("serviceIdSearchInput").value;
	checkedOrderByServiceId(serviceId);
}

/*
 * 支持回车查询
 */
function enterSearch(){
	try{
		if(event.keyCode==13){
			trimField($("serviceIdSearchInput"));
			searchOrderByServiceId();
		}
    }
    catch(e){
        return;
    }
}

function checkedOrderByServiceId(serviceId){
	if(serviceId != null && serviceId != ""){
		var serviceIdTd = document.getElementById("serviceId-" + serviceId);
		clearSearch();//清除上次的查询结果背景色
		if(serviceIdTd){
			if(serviceIdTd.length){
				for(var i = 0;i < serviceIdTd.length; i++){
					serviceIdTd[i].parentNode.style.backgroundColor="#22B8DD";
					if(document.getElementById("serviceId-" + serviceId) && document.getElementById("serviceId-" + serviceId)[i]){
						document.getElementById("serviceId-" + serviceId)[i].focus();
					}	
				}
			}else{
				serviceIdTd.parentNode.style.backgroundColor="#22B8DD";
				if(document.getElementById("serviceId-" + serviceId)){
					document.getElementById("serviceId-" + serviceId).focus();
				}	
			}
		}
		else{
			//alert("未查到该号码");
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08410224"});
		}
	}
}

//清除查询结果行的背景色及选中属性searchResult
function clearSearch(){
	if($("trSearchResult")){		
		$("trSearchResult").searchResult = false;
		mouseoutevent($("trSearchResult"));
		$("trSearchResult").id = "";
	}
}

//鼠标滑过一行时，设置颜色，如果当前行是用户搜索结果行，在设置颜色的同时，需要记忆当前行选中的属性。
function setColor(obj){
	if(obj.style.backgroundColor == "#22b8dd" || obj.style.backgroundColor == "#22B8DD"){
		obj.id = "trSearchResult";
		obj.searchResult = true;
	}
	mouseoverevent(obj);
}
//鼠标滑出时，如果当前行是选中行，则把背景色恢复为蓝色
function resetColor(obj){
	if(obj.searchResult == true){
		obj.style.backgroundColor = "#22B8DD";
	}
	else{
		mouseoutevent(obj);
	}
}

//默认选中一条订单
function checkedOrder(){
	var queryMethod = document.getElementById("queryType").value;
	if(queryMethod == "SERVICEID"){
		var queryServiceId = document.getElementById("serviceIdShow").value;
		document.getElementById("serviceIdSearchInput").value = queryServiceId;
		searchOrderByServiceId();
	}
	if($("governmentCustCount").value!=0 &&$("serviceKindHidden").value!=12){
		//alert("政企客户，只展现用户信息，不能够办理业务!");
		orderaccept.common.dialog.MessageBox.alert({busiCode:"08410225"});
	}
	if(!!$("showNumberInfo") && $("showNumberInfo").value != ""){
		orderaccept.common.dialog.MessageBox.alert({
	        	message : $("showNumberInfo").value
	     	});
	}
	//add by licb date 20121204 for REQ2012032227839_XQ-20120319-0018_关于天翼国际卡换卡工作固化至主要业务流程的需求 begin
	if(!!$("oldCardMessage") && $("oldCardMessage").value != ""){
		orderaccept.common.dialog.MessageBox.alert({
	        	message : $("oldCardMessage").value
	     	});
	}
	//add by licb date 20121204 for REQ2012032227839_XQ-20120319-0018_关于天翼国际卡换卡工作固化至主要业务流程的需求 end
}
	
function showProdWindow(){
	jUtil.show(document.getElementById("prodWindow"), 1); 
}
function closeProdPage(){
	jUtil.hide(document.getElementById("prodWindow"),1);
};

function floatDivNone(){
	//防止报错
	if(parent&&parent.parent&&parent.parent.parent&&parent.parent.parent.$&&parent.parent.parent.$("float_div"))
   		parent.parent.parent.$("float_div").style.display = "none";
    return false;                               
}

//组合销售品加装
function prodAdded(prodOfferInstId,prodOfferId){
	var custXml=parent.parent.parent.document.getElementById("custXml").value;
	var flag = parent.parent.parent.document.getElementById("batchFlag").value;
	var custOrderId = parent.parent.parent.document.getElementById("custOrderId").value;
	var param = "&custXml="+custXml+
				"&flag="+flag+
				"&prodOfferInstId="+prodOfferInstId+
				"&prodOfferId="+prodOfferId+
				"&custOrderId="+custOrderId;
				
	var pagePath = document.getElementById("webPath").value + "/prodOfferSaleAction.do?method=initProdAdded"+param;
	parent.parent.document.getElementById("subForm").action = pagePath;
	var popupWin = window.open("about:blank", 'prodOfferSalePage', 'status=1,resizable=0,fullscreen=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
	parent.parent.document.getElementById("subForm").target = "prodOfferSalePage";
	parent.parent.document.getElementById("subForm").submit();	
}

//组合销售品拆分
function prodSplit(prodOfferInstId,prodOfferId){
	var custXml=parent.parent.parent.document.getElementById("custXml").value;
	var flag = parent.parent.parent.document.getElementById("batchFlag").value;
	var custOrderId = parent.parent.parent.document.getElementById("custOrderId").value;
	var param = "&custXml="+custXml+
				"&flag="+flag+
				"&prodOfferInstId="+prodOfferInstId+
				"&prodOfferId="+prodOfferId+
				"&custOrderId="+custOrderId;
				
	var pagePath = document.getElementById("webPath").value + "/prodOfferSaleAction.do?method=initProdSplit"+param;
	parent.parent.document.getElementById("subForm").action = pagePath;
	var popupWin = window.open("about:blank", 'prodOfferSalePage', 'status=1,resizable=0,fullscreen=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
	parent.parent.document.getElementById("subForm").target = "prodOfferSalePage";
	parent.parent.document.getElementById("subForm").submit();
}
//组合销售品互换
function prodInterchange(prodOfferInstId,prodOfferId){
	var custXml=parent.parent.parent.document.getElementById("custXml").value;
	var flag = parent.parent.parent.document.getElementById("batchFlag").value;
	var custOrderId = parent.parent.parent.document.getElementById("custOrderId").value;
	var param = "&custXml="+custXml+
				"&prodOfferInstId="+prodOfferInstId+
				"&prodOfferId="+prodOfferId+
				"&flag="+flag+
				"&custOrderId="+custOrderId;
				
	var pagePath = document.getElementById("webPath").value + "/prodOfferSaleAction.do?method=initProdInterchange"+param;
	parent.parent.document.getElementById("subForm").action = pagePath;
	var popupWin = window.open("about:blank", 'prodOfferSalePage', 'status=1,resizable=0,fullscreen=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
	parent.parent.document.getElementById("subForm").target = "prodOfferSalePage";
	parent.parent.document.getElementById("subForm").submit();
}
