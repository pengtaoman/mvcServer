var ProdOfferSaleLeftBuilder = function(args){
	var Me = this;
	var customerData = args["customerData"];
	var prodOfferId = args["prodOfferId"];//����ƷID
	var prodOfferInstId = args["prodOfferInstId"];// ����Ʒʵ��id�����������Ʒ��
	var serviceOfferId = args["serviceOfferId"];//�����ṩ
	var prodOfferTree = null;//������Ʒ��
	var hotProdOfferList = null;//�ȵ�����Ʒ
	/**
	 * �������һ������Ʒѡ��
	 * @field
	 */
	var currentProdOfferId = null;
	/**
	 * �������һ������ѡ��
	 * @field
	 */
	var currentBelongCode = null;
	
	var oldProdOfferInstInfo = null;//����Ʒʵ������
	
	
	Me.$ = function(id){
		return document.getElementById(id);
	}
	/**
	 * ��ʼ������
	 */
	Me.init = function(){
		Me.getProdOfferTree();//��ȡ������Ʒ��
		Me.initHotProdOfferList();//��ȡ�ȵ�����Ʒ
		Me.initBelongCode();//��ʼ������
		Me.initEvent();//��ʼ���¼�
		Me.initData();//��ʼ������
		initValueForCustOrderInfo();//��ʼ���ͻ���������
	};
	
	Me.initData = function(){
			currentBelongCode = $("belongCodeColl").value;
			currentProdOfferId = prodOfferId;
			
	};
	
	Me.getData = function(){
		return {prodOfferId:currentProdOfferId,belongCode:currentBelongCode};
	};
	 
	Me.getProdOfferTree = function(){
	 	var webPath = document.getElementsByTagName("contextPath")[0].value;
	 	var parameter = {
	 		nodedbClick : doOrderProdOffer,//ѡ������Ʒ�¼�
	 		prodOfferTreeContainer : Me.$("mainProdOfferTreeDiv"),
	 		customerData : customerData,
	 		webPath : webPath
	 	}
	 	prodOfferTree = new ProdOfferTree(parameter);
	 	prodOfferTree.init();
	 };
	 
	 /**
	 * ѡ������Ʒ
	 */
	var doOrderProdOffer = function(returnArgs){
		try{
			if(returnArgs){
				var prodOfferIdTree = returnArgs.prodOfferId;
				var prodOfferName = returnArgs.prodOfferName;
				var operName = returnArgs.operName;
				var commendFlag = returnArgs.commendFlag;
				custOrderInfo.ifPreOrderCall = ""; //ѡ������Ʒʱ��Ҫ�������һ��
				//��prodOfferId����ʱ˵���ǲ�Ʒ�������Դ˽��м��
				if(prodOfferId){
					//���prodOfferId�Ƿ���ͬ
					if(prodOfferId == prodOfferIdTree){
						if(serviceOfferId==320){
							custOrderInfo.ifPreOrderCall="sub";
						}else{
							return false;
						}
					}
					//���prodOfferId�Ƿ񻥳�
					if(!doCheckProdOfferMutual(prodOfferId,prodOfferIdTree)){
						return false;
					}
				}
				//�Ը����ղ�����Ʒ����ս�ԡ�ս����Ⱥ��֤,�˹���ע�͵����ǻ����汾�����õ�
				/*
				if(operName && operName == "selectPer"){
					if(!checkProdOffer(customerData,prodOfferIdTree)){
						return false;
					}
				}
				*/
				// ���浱ǰ�����������Ʒ��Ϣ
				Me.prodOfferData = BusCard.parse(getProdOfferInfo(prodOfferIdTree));
				// ���Ϊ������Ʒ���
				if (!checkNewProdOffer()) {
					alert("���ܱ��Ϊ�������Ʒ");
					return false;
				}
				currentProdOfferId = prodOfferIdTree;
				initValueForCustOrderInfo();
				initProdOffer();//��ʼ������Ʒ
				toggleLeftRegion();//��������Ʒҳ�������л��¼�
				
								
			}
		}catch(e){
			alert(e.message);
		}
	};
	/**
	 * ͨ���ͻ�ս�Է�Ⱥ��ս����Ⱥ�ж��Ƿ��ѡ�������Ʒ
	 */
	var checkProdOffer = function(customerData,prodOfferId){
		var custType = "-1";
		if(customerData && customerData.custType && customerData.custType != "null"){
			custType = customerData.custType;
		}
		var custId = customerData.custId;
		//�����⿪��
		if(ProdOfferRuleClient){
			if(!ProdOfferRuleClient({
				"ruleEventId":49,
				"cityCode":customerData.cityCode
			})){
				custType = "-1";
				custId = "";
			}
		}
		//����JAVA������
		var parameter = "custType="+custType+"&custId="+custId+"&cityCode="+customerData.cityCode+"&prodOfferId="+prodOfferId+"&belongCode="+$("belongCodeColl").value;
		var result = executeRequest("shoppingCartAction","doCheckProdOffer",parameter);
		if(result){
			if((!result.split("~")[0]) || result.split("~")[0] == 'false'){
				if(result.split("~")[1]){
					alert(result.split("~")[1]);
					return false;
				}else{
					alert("�ͻ�����ѡ����Ʒ���ڲ�ͬȺ��,����ѡ�������Ʒ!");
					return false;
				}
				alert(result.split("~")[1]);
				return false;
			}
		}
		return true;
	};
	/**
	 * �ж��Ƿ�����������Ʒ���
	 */
	var checkNewProdOffer = function() {
		if(!oldProdOfferInstInfo){
			return true;
		}
		var checkResult = false;
		var prodInstList = oldProdOfferInstInfo.prodInstList;//��ȡ����Ʒ����Ľ������Ʒ����
		BusCard.each(prodInstList||[],function(prodInst){
			if(findProductById(prodInst.productId)){
				checkResult = true;
				 return false;
			}		
		});
		return checkResult;
	};
	var findProductById = function(productId) {
		var productList = Me.prodOfferData.offerProdRelaList;//�޽�ɫ��Ʒ����
		if (productList != null && productList.length > 0) {
			for (var j = 0, lenj = productList.length; j < lenj; j++) {
				var productInfo = productList[j];
				if (productInfo.productId == productId) {
					return productInfo;
				}
			}
		};
		var roleInfoList = Me.prodOfferData.roleInfoList;//�н�ɫ��Ʒ����
		if (roleInfoList != null && roleInfoList.length > 0) {
			for (var i = 0, len = roleInfoList.length; i < len; i++) {
				var productList = roleInfoList[i].offerProdRelaList;
				if (productList != null && productList.length > 0) {
					for (var j = 0, lenj = productList.length; j < lenj; j++) {
						var productInfo = productList[j];
						if (productInfo.productId == productId) {
							return productInfo;
						}
					}
				}
			}
		}
		return null;
	};
	
	
	var getProdOfferInfo = function(prodOfferId) {
		var vParameter = "prodOfferId=" + prodOfferId;
		var resultData = executeRequest("shoppingCartAction", "clickSaleworkMainProd", vParameter);
		return resultData;
	};
	
	/**
	 * ����Ʒҳ�������л��¼�
	 */
	var toggleLeftRegion = function(){
		var leftRegion = $('switchLeftRegion');
		if(leftRegion)
		leftRegion.getElementsByTagName("IMG")[0].onclick();
	};
	var initValueForCustOrderInfo = function(){
		var shoppingCartData = Me.getData();
		window.custOrderInfo.belongCode = shoppingCartData.belongCode;
		window.custOrderInfo.prodOfferId =  shoppingCartData.prodOfferId;
	
	};
	//���Ⱪ¶�˽ӿ�
	Me.initValueForCustOrderInfo =  initValueForCustOrderInfo;
	//���õ�ǰѡ�������Ʒ
	Me.setCurrentProdOfferId = function(prodOfferId){
		currentProdOfferId = prodOfferId;
	};
	
	/**
	 * ���ݾ�������Ʒ��Ϣ��ʼ������������
	 */
	 Me.initBelongCode = function() {
		var belongCode = getBelongCodeByOldProdOffer();
		if (belongCode != null) {
			// ���������ֵ�����ҽ������������û�
			$("belongCodeColl").value = belongCode;
			$("belongCodeColl").disabled = "disabled";
		}
	};
	
	
	/**
	 * ���ݾ��е�����Ʒ��ȡ��������
	 */
	var getBelongCodeByOldProdOffer = function() {
		getOldProdOfferInstInfo();
		var belongCode = null;
		if (oldProdOfferInstInfo != null) {
			var prodInstList = oldProdOfferInstInfo.prodInstList;
			if (prodInstList) {
				for (var i = 0, len = prodInstList.length; i < len; i++) {
					var prodInstInfo = prodInstList[i];
					//���������Ĳ�Ʒ�п����ǹ����� ȡ�ǿ�ֵ
					if(prodInstInfo.serviceRelationVO&&prodInstInfo.serviceRelationVO.belongCode){
						return prodInstInfo.serviceRelationVO.belongCode;
					}
					
				}
			}
		}
		return belongCode;
	};
	
	
	/**
	 * ��������Ʒʵ��ID����ȡ���еĹ���
	 */
	var getOldProdOfferInstInfo = function() {
		if (prodOfferInstId) {
			var vParameter = "&offerInstId=" + prodOfferInstId;
			var result = executeRequest("prodOfferSaleAjaxAction", "getProdOfferInstDetail", vParameter);
			oldProdOfferInstInfo = eval("(" + result + ")");
		}
		return oldProdOfferInstInfo;
	};
	
	
	/**
	 * У����������Ʒ�Ƿ���ڻ����ϵ
	 */
	var doCheckProdOfferMutual = function(prodOfferId,prodOfferIdTree){
		//����Ʒ�����������򿪹�
		if(ProdOfferRuleClient){
			if(!ProdOfferRuleClient({
				"ruleEventId":RuleEventConst.offerMutux,
				"cityCode":customerData.cityCode
			})){
				return true;
			}
		}
		var parameters = "prodOfferId="+prodOfferId;
		parameters += "&newProdOfferId="+prodOfferIdTree;
		//����Ʒ������
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "doCheckProdOfferMutual", parameters);
		var resultJsonObj = Ext.decode(resultJsonStr);
		if(!resultJsonObj){
			if(confirm("����Ʒ������ʧ�ܣ���ȷ�ϣ�")){
				return true;
			}else{
				return false;
			}
		}
		if(resultJsonObj.code/1 < 0 && resultJsonObj.message){
			if(confirm(resultJsonObj.message)){
				return true;
			}else{
				return false;
			}
		}
		return true;
	};
	
	/**
	 * ��ʼ���ȵ�����Ʒ
	 */
	Me.initHotProdOfferList = function(){
		var parameter = {
			hotProdClick:doOrderProdOffer,//ѡ������Ʒ�¼�
			hotProdContainer:Me.$("showHotProdList"),//�ȵ�����
			peddleProdListContainer:Me.$("peddleProdList"),//��ҵ����
			personalCollectContainer:Me.$("showPersonalCollect"),//�����ղ�
			"customerData" : customerData
		}
		hotProdOfferList = new HotProductList(parameter);
		hotProdOfferList.init();
	};
	/**
	 * ��ʼ���¼�����������仯��Ҫˢ��������Ʒ�����ȵ�����Ʒ
	 */
	Me.initEvent = function(){
		Me.$("belongCodeColl").onchange = function(){
			prodOfferTree.initAllSaleWorkTree();//��ʼ��ȫ������Ʒ
			if(hotProdOfferList){
				hotProdOfferList.refresh();//ˢ���ȵ�����Ʒ
			}
			currentBelongCode = this.value;
		}
	};
	//��ȡԤ��¼�ύ��
	Me.getPostParamList = function(){
		var postparamvalue = "&custXml="+Ext.encode(window.customerData)+
				"&flag=1&prodOfferInstId="+prodOfferInstId+
				"&prodOfferId="+prodOfferId+
				"&custOrderId=&prodServiceOfferId=&serviceOfferId=320";
		return postparamvalue;
	};
}