/**
 * չʾ����Ʒ����ҳ�棬����unieap.showTooltip��ʽչʾ������
 * @param prodOfferInstId ����Ʒʵ��id
 * @param prodOfferId ����Ʒid
 * @remark �����Ĳ���ѡ��ҳ�棬ʹ��showTooltip��ʾiframe,���ڴ��ڶ��iframeǶ�ף���������ҳ��󣬴��������������һֱloading����
 * Ϊ�˽��������⣬�ڵ���ҳ�������iframe��ǩ��ifraOrderDetail���У�����srcΪ�գ�����onload����,��window.setTimeout��ʱ����iframe��src
 */
function showOrderDetail(prodOfferInstId,prodOfferId,ifBundle,productId,obj){
	
	//var custXml=parent.parent.parent.document.getElementById("custXml").value;custXml="";
	var param = "&prodOfferInstId="+prodOfferInstId+"&prodOfferId="+prodOfferId+"&ifBundle="+ifBundle+"&productId="+productId;//+"&custXml="+custXml; ����custXml�д������ţ�������Ҫ��Ϊ��������setFrameSrc�����������Ƶ�setFrameSrc������ƴ��
	//���������Ʒ��Ҫ���
	if(ifBundle==0){
		var resultStr = executeRequest("serviceOfferAction", "getChangeServiceOfferCount", param);
		if(resultStr==0){
			//alert("���û����ܰ����ҵ��");
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
  * ��ʱ����ָ��iframe��src����������������һֱloading���⣨IE BUG��
  * �÷���ͨ��iframe��onload�¼��������ܹ�����÷���������ʱ��iframe��û�б����ص�ҳ�浼���Ҳ���iframe�����⣩
  */
function setFrameSrc(frameName,path){
	if($(frameName).src != ""){//����Ѿ����ع�SRC�������onload����
		$(frameName).onload = function(){};
		return;
	}
	var custXml=parent.parent.parent.document.getElementById("custXml").value;
	path = path + "&custXml=" + custXml;
	path = path.replace(/\"/g,"'");//˫�����滻Ϊ������
	var runStr = "$('"+frameName+"').src = \"" + path + "\";";
	window.setTimeout(runStr,1);//��ʱ����iframe���ݣ���������������һֱloading���⣨IE BUG��
}

/**
 * չʾ����Ʒ����ҳ��:���û�����ʽչʾ������UI������ô˷�����
 * @param prodOfferInstId ����Ʒʵ��id
 * @param prodOfferId ����Ʒid
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
		document.getElementById("prodWindow").style.top = clientY+20;//����������
	else
		document.getElementById("prodWindow").style.top = clientY-88;//����������
	
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
 * չʾ��Ʒ����ҳ�棺����unieap.showTooltip��ʽչʾ������
 * @param prodOfferInstId ����Ʒʵ��id
 * @param prodOfferId ����Ʒid
 * @param prodId ��Ʒid
 * @param productInstId ��Ʒʵ��id
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
 * չʾ��Ʒ����ҳ�棺���û�����ʽչʾ������UI������ô˷�����
 * @param prodOfferInstId ����Ʒʵ��id
 * @param prodOfferId ����Ʒid
 * @param prodId ��Ʒid
 * @param productInstId ��Ʒʵ��id
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
		document.getElementById("prodWindow").style.top = clientY+20;//����������
	else{
		var param = "productId="+prodId;
		var result = executeRequest("serviceOfferAction","getServiceOfferCount",param);
		if(result<=6)
			document.getElementById("prodWindow").style.top = clientY-94;//����������
		else
			document.getElementById("prodWindow").style.top = clientY-148;//����������
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

//����ҵ������ڶ����б��в�ѯ������Ϣ
function searchOrderByServiceId(){
	var serviceId = document.getElementById("serviceIdSearchInput").value;
	checkedOrderByServiceId(serviceId);
}

/*
 * ֧�ֻس���ѯ
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
		clearSearch();//����ϴεĲ�ѯ�������ɫ
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
			//alert("δ�鵽�ú���");
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08410224"});
		}
	}
}

//�����ѯ����еı���ɫ��ѡ������searchResult
function clearSearch(){
	if($("trSearchResult")){		
		$("trSearchResult").searchResult = false;
		mouseoutevent($("trSearchResult"));
		$("trSearchResult").id = "";
	}
}

//��껬��һ��ʱ��������ɫ�������ǰ�����û���������У���������ɫ��ͬʱ����Ҫ���䵱ǰ��ѡ�е����ԡ�
function setColor(obj){
	if(obj.style.backgroundColor == "#22b8dd" || obj.style.backgroundColor == "#22B8DD"){
		obj.id = "trSearchResult";
		obj.searchResult = true;
	}
	mouseoverevent(obj);
}
//��껬��ʱ�������ǰ����ѡ���У���ѱ���ɫ�ָ�Ϊ��ɫ
function resetColor(obj){
	if(obj.searchResult == true){
		obj.style.backgroundColor = "#22B8DD";
	}
	else{
		mouseoutevent(obj);
	}
}

//Ĭ��ѡ��һ������
function checkedOrder(){
	var queryMethod = document.getElementById("queryType").value;
	if(queryMethod == "SERVICEID"){
		var queryServiceId = document.getElementById("serviceIdShow").value;
		document.getElementById("serviceIdSearchInput").value = queryServiceId;
		searchOrderByServiceId();
	}
	if($("governmentCustCount").value!=0 &&$("serviceKindHidden").value!=12){
		//alert("����ͻ���ֻչ���û���Ϣ�����ܹ�����ҵ��!");
		orderaccept.common.dialog.MessageBox.alert({busiCode:"08410225"});
	}
	if(!!$("showNumberInfo") && $("showNumberInfo").value != ""){
		orderaccept.common.dialog.MessageBox.alert({
	        	message : $("showNumberInfo").value
	     	});
	}
	//add by licb date 20121204 for REQ2012032227839_XQ-20120319-0018_����������ʿ����������̻�����Ҫҵ�����̵����� begin
	if(!!$("oldCardMessage") && $("oldCardMessage").value != ""){
		orderaccept.common.dialog.MessageBox.alert({
	        	message : $("oldCardMessage").value
	     	});
	}
	//add by licb date 20121204 for REQ2012032227839_XQ-20120319-0018_����������ʿ����������̻�����Ҫҵ�����̵����� end
}
	
function showProdWindow(){
	jUtil.show(document.getElementById("prodWindow"), 1); 
}
function closeProdPage(){
	jUtil.hide(document.getElementById("prodWindow"),1);
};

function floatDivNone(){
	//��ֹ����
	if(parent&&parent.parent&&parent.parent.parent&&parent.parent.parent.$&&parent.parent.parent.$("float_div"))
   		parent.parent.parent.$("float_div").style.display = "none";
    return false;                               
}

//�������Ʒ��װ
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

//�������Ʒ���
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
//�������Ʒ����
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
