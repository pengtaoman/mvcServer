
var CustOrderList = function (oParameter) {
	var Me = this;
	// 获取tBody对象
	var tBodyProdOfferDiv = $("orderConfirmProdOfferList");//销售品订单项生成对象
	var tBodyProdDiv = $("orderConfirmProdList");//产品订单项生成对象
	var tBodyAccountDiv = $("orderConfirmAccountList");//账户订单项省成对象
	var prodOfferTrList = {};
	var prodTrList = {};
	var accountTrList = {};
	// 获取custOrderId
	var custOrderId = oParameter["custOrderId"];
	// 订单项信息
	var orderDetailListObj = [];
	//排序后的订单项信息--先是销售品订单项，然后是产品订单项，然后是账户订单项
	var newOrderDetailListObj = []; 
	// 分页对象
	var operatePageObj = {
		"TOTAL_SIZE" : 0,	//总行数
		"TOTAL_PAGE" : 0,	//总页数
		"PAGE_SIZE" : 10,	//页数
		"CURRENT_PAGE" : 0	//当前页
	};
	
	/**
	 * 订单项类型
	 */
	var orderTypeObj = {
		"CUSTOMER" : "10",
		"ACCOUNT" : "11",
		"PRODUCT" : "13",
		"OFFER" : "12"
	};
	
	/**
	 * 初始化订单信息
	 */
	Me.init = function () {
		initOrderDetailData();
		getOrderQueryHtml();
		initEvent();
	};
	
	/**
	 * 获取orderDetailListObj对象
	 */
	Me.getOrderDetailList = function(){
		if(orderDetailListObj){
			return orderDetailListObj;
		}
		return [];
	};
	/**
	 * 将返回的订单项集合进行排序
	 */
	var sortOrderDetail = function(){
		var index = 0;
		for(var i = 0 ;i<orderDetailListObj.length;i++){
			if(orderTypeObj.OFFER == orderDetailListObj[i].orderItemCd){
				newOrderDetailListObj[index] = orderDetailListObj[i];
				index++;
			}
		}
		for(var j =0 ;j<orderDetailListObj.length;j++){
			if(orderTypeObj.PRODUCT == orderDetailListObj[j].orderItemCd){
				newOrderDetailListObj[index] = orderDetailListObj[j];
				index++;
			}
		}
		for(var k=0;k<orderDetailListObj.length;k++){
			if(orderTypeObj.ACCOUNT == orderDetailListObj[k].orderItemCd){
				newOrderDetailListObj[index]=orderDetailListObj[k]
				index++;
			}
		}
	}
	/**
	 * 初始化数据
	 */
	var initOrderDetailData = function(){
		if (!custOrderId) {
			return;
		}
		var parameter = "custOrderId=" + custOrderId;
		var resultJsonStr = executeRequest("orderQueryAction", "init", parameter);
		try {
			orderDetailListObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
		}catch (e) {
			return;
		}
		
		var listSize = orderDetailListObj.length;
		operatePageObj["TOTAL_SIZE"] = listSize;
		operatePageObj["TOTAL_PAGE"] = parseInt(listSize/operatePageObj["PAGE_SIZE"]) + 1;
		operatePageObj["CURRENT_PAGE"] = 1;
	};
	
	var getOrderQueryHtml = function(){
		if(!orderDetailListObj){
			return;
		}
		/**
		for (var i = 0; i < operatePageObj["PAGE_SIZE"]; i++) {
			if($("tr"+i)){
				tBodyDiv.removeChild($("tr"+i));
			}
		}*/
		//按销售品订单项，产品订单项，账户订单项进行排序
		sortOrderDetail();
		//翻页时移除当前页订单项列表信息
		removeAllItem();
		var currentPageSize = operatePageObj["PAGE_SIZE"];
		if(operatePageObj["TOTAL_PAGE"] == operatePageObj["CURRENT_PAGE"]){
			currentPageSize = parseInt(operatePageObj["TOTAL_SIZE"]) % parseInt(operatePageObj["PAGE_SIZE"]);
		}
		for (var i = 0; i < currentPageSize; i++) {
			var index = operatePageObj["PAGE_SIZE"] * (operatePageObj["CURRENT_PAGE"]-1) + i;
			var orderDetailInfo = newOrderDetailListObj[index];
			var trdoc = document.createElement("TR");
			trdoc.className = "table_top";
			trdoc.id = "tr"+i;
			//客户订单号
			var tddoc1 = document.createElement("TD");
			tddoc1.innerText = orderDetailInfo.custOrderId;
			trdoc.appendChild(tddoc1);
			//订单项编号
			var tddoc2 = document.createElement("TD");
			tddoc2.innerText = orderDetailInfo.orderItemId;
			trdoc.appendChild(tddoc2);
			//订单项类型
			var tddoc3 = document.createElement("TD");
			tddoc3.innerText=orderDetailInfo.orderItemCdDesc;
			trdoc.appendChild(tddoc3);
			//销售品/产品名称
			var tddoc4 = document.createElement("TD");
			tddoc4.innerText = orderDetailInfo.orderName;
			trdoc.appendChild(tddoc4);
			//服务提供
			var tddoc5 = document.createElement("TD");
			tddoc5.innerText = orderDetailInfo.serviceOfferDesc;
			trdoc.appendChild(tddoc5);
			//接入号码
			var tddoc6 = document.createElement("TD");
			tddoc6.innerText = orderDetailInfo.serviceId ? orderDetailInfo.serviceId : "";
			trdoc.appendChild(tddoc6);
			//受理时间
			var tddoc7 = document.createElement("TD");
			tddoc7.innerText = orderDetailInfo.handleTime;
			trdoc.appendChild(tddoc7);
			//订单状态
			var tddoc8 = document.createElement("TD");
			tddoc8.innerText = orderDetailInfo.orderStatus;
			trdoc.appendChild(tddoc8);
			trdoc.className="table_content";
			if(orderTypeObj.OFFER == orderDetailInfo.orderItemCd){
				tBodyProdOfferDiv.appendChild(trdoc);
				prodOfferTrList[i] = i;
			}else if(orderTypeObj.PRODUCT == orderDetailInfo.orderItemCd){
				tBodyProdDiv.appendChild(trdoc);
				prodTrList[i]=i;
			}else if(orderTypeObj.ACCOUNT == orderDetailInfo.orderItemCd){
				tBodyAccountDiv.appendChild(trdoc);
				accountTrList[i]=i;
			}
		}
	};
	/**
	 * 移除页面现有的列表信息
	 */
	var removeAllItem = function(){
		for(var p in prodOfferTrList){
			if($("tr"+p)){
				tBodyProdOfferDiv.removeChild($("tr"+p));
			}
		}
		prodOfferTrList = {};
		for(var q in prodTrList){
			if($("tr"+q)){
				tBodyProdDiv.removeChild($("tr"+q));
			}
		}
		prodTrList = {};
		for(var k in accountTrList){
			if($("tr"+k)){
				tBodyAccountDiv.removeChild($("tr"+k));
			}
		}
		accountTrList = {};
	}
	
	var initEvent = function(){
		$("firstPage").onclick = function(){
			operatePageObj["CURRENT_PAGE"] = 1;
			getOrderQueryHtml();
		};
		$("nextPage").onclick = function(){
			if(operatePageObj["CURRENT_PAGE"] >= operatePageObj["TOTAL_PAGE"]){
				operatePageObj["CURRENT_PAGE"] = operatePageObj["TOTAL_PAGE"];
			}else{
				operatePageObj["CURRENT_PAGE"] += 1;
			}			
			getOrderQueryHtml();
		};
		$("frontPage").onclick = function(){
			if(operatePageObj["CURRENT_PAGE"] <= 1){
				operatePageObj["CURRENT_PAGE"] = 1;
			}else{
				operatePageObj["CURRENT_PAGE"] -= 1;
			}
			getOrderQueryHtml();
		};
		$("lastPage").onclick = function(){
			operatePageObj["CURRENT_PAGE"] = operatePageObj["TOTAL_PAGE"];
			getOrderQueryHtml();
		};
	};
};