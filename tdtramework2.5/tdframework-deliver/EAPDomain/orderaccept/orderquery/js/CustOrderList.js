
var CustOrderList = function (oParameter) {
	var Me = this;
	// ��ȡtBody����
	var tBodyProdOfferDiv = $("orderConfirmProdOfferList");//����Ʒ���������ɶ���
	var tBodyProdDiv = $("orderConfirmProdList");//��Ʒ���������ɶ���
	var tBodyAccountDiv = $("orderConfirmAccountList");//�˻�������ʡ�ɶ���
	var prodOfferTrList = {};
	var prodTrList = {};
	var accountTrList = {};
	// ��ȡcustOrderId
	var custOrderId = oParameter["custOrderId"];
	// ��������Ϣ
	var orderDetailListObj = [];
	//�����Ķ�������Ϣ--��������Ʒ�����Ȼ���ǲ�Ʒ�����Ȼ�����˻�������
	var newOrderDetailListObj = []; 
	// ��ҳ����
	var operatePageObj = {
		"TOTAL_SIZE" : 0,	//������
		"TOTAL_PAGE" : 0,	//��ҳ��
		"PAGE_SIZE" : 10,	//ҳ��
		"CURRENT_PAGE" : 0	//��ǰҳ
	};
	
	/**
	 * ����������
	 */
	var orderTypeObj = {
		"CUSTOMER" : "10",
		"ACCOUNT" : "11",
		"PRODUCT" : "13",
		"OFFER" : "12"
	};
	
	/**
	 * ��ʼ��������Ϣ
	 */
	Me.init = function () {
		initOrderDetailData();
		getOrderQueryHtml();
		initEvent();
	};
	
	/**
	 * ��ȡorderDetailListObj����
	 */
	Me.getOrderDetailList = function(){
		if(orderDetailListObj){
			return orderDetailListObj;
		}
		return [];
	};
	/**
	 * �����صĶ�����Ͻ�������
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
	 * ��ʼ������
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
		//������Ʒ�������Ʒ������˻��������������
		sortOrderDetail();
		//��ҳʱ�Ƴ���ǰҳ�������б���Ϣ
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
			//�ͻ�������
			var tddoc1 = document.createElement("TD");
			tddoc1.innerText = orderDetailInfo.custOrderId;
			trdoc.appendChild(tddoc1);
			//��������
			var tddoc2 = document.createElement("TD");
			tddoc2.innerText = orderDetailInfo.orderItemId;
			trdoc.appendChild(tddoc2);
			//����������
			var tddoc3 = document.createElement("TD");
			tddoc3.innerText=orderDetailInfo.orderItemCdDesc;
			trdoc.appendChild(tddoc3);
			//����Ʒ/��Ʒ����
			var tddoc4 = document.createElement("TD");
			tddoc4.innerText = orderDetailInfo.orderName;
			trdoc.appendChild(tddoc4);
			//�����ṩ
			var tddoc5 = document.createElement("TD");
			tddoc5.innerText = orderDetailInfo.serviceOfferDesc;
			trdoc.appendChild(tddoc5);
			//�������
			var tddoc6 = document.createElement("TD");
			tddoc6.innerText = orderDetailInfo.serviceId ? orderDetailInfo.serviceId : "";
			trdoc.appendChild(tddoc6);
			//����ʱ��
			var tddoc7 = document.createElement("TD");
			tddoc7.innerText = orderDetailInfo.handleTime;
			trdoc.appendChild(tddoc7);
			//����״̬
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
	 * �Ƴ�ҳ�����е��б���Ϣ
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