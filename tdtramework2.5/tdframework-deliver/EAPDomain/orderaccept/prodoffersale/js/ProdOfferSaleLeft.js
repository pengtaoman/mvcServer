var ProdOfferSaleLeftBuilder = function(args){
	var Me = this;
	var customerData = args["customerData"];
	var prodOfferId = args["prodOfferId"];//销售品ID
	var prodOfferInstId = args["prodOfferInstId"];// 销售品实例id，变更主销售品用
	var serviceOfferId = args["serviceOfferId"];//服务提供
	var prodOfferTree = null;//主销售品树
	var hotProdOfferList = null;//热点销售品
	/**
	 * 保存最近一次销售品选择
	 * @field
	 */
	var currentProdOfferId = null;
	/**
	 * 保存最近一次区域选择
	 * @field
	 */
	var currentBelongCode = null;
	
	var oldProdOfferInstInfo = null;//销售品实例详情
	
	
	Me.$ = function(id){
		return document.getElementById(id);
	}
	/**
	 * 初始化函数
	 */
	Me.init = function(){
		Me.getProdOfferTree();//获取主销售品树
		Me.initHotProdOfferList();//获取热点销售品
		Me.initBelongCode();//初始化区域
		Me.initEvent();//初始化事件
		Me.initData();//初始化数据
		initValueForCustOrderInfo();//初始化客户订单数据
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
	 		nodedbClick : doOrderProdOffer,//选购销售品事件
	 		prodOfferTreeContainer : Me.$("mainProdOfferTreeDiv"),
	 		customerData : customerData,
	 		webPath : webPath
	 	}
	 	prodOfferTree = new ProdOfferTree(parameter);
	 	prodOfferTree.init();
	 };
	 
	 /**
	 * 选购销售品
	 */
	var doOrderProdOffer = function(returnArgs){
		try{
			if(returnArgs){
				var prodOfferIdTree = returnArgs.prodOfferId;
				var prodOfferName = returnArgs.prodOfferName;
				var operName = returnArgs.operName;
				var commendFlag = returnArgs.commendFlag;
				custOrderInfo.ifPreOrderCall = ""; //选购销售品时需要重新清空一下
				//当prodOfferId存在时说明是产品变更，则对此进行检测
				if(prodOfferId){
					//检测prodOfferId是否相同
					if(prodOfferId == prodOfferIdTree){
						if(serviceOfferId==320){
							custOrderInfo.ifPreOrderCall="sub";
						}else{
							return false;
						}
					}
					//检测prodOfferId是否互斥
					if(!doCheckProdOfferMutual(prodOfferId,prodOfferIdTree)){
						return false;
					}
				}
				//对个人收藏销售品进行战略、战术分群验证,此功能注释掉，是基础版本测试用的
				/*
				if(operName && operName == "selectPer"){
					if(!checkProdOffer(customerData,prodOfferIdTree)){
						return false;
					}
				}
				*/
				// 保存当前点击的主销售品信息
				Me.prodOfferData = BusCard.parse(getProdOfferInfo(prodOfferIdTree));
				// 如果为主销售品变更
				if (!checkNewProdOffer()) {
					alert("不能变更为这个销售品");
					return false;
				}
				currentProdOfferId = prodOfferIdTree;
				initValueForCustOrderInfo();
				initProdOffer();//初始化销售品
				toggleLeftRegion();//调用销售品页面左右切换事件
				
								
			}
		}catch(e){
			alert(e.message);
		}
	};
	/**
	 * 通过客户战略分群、战术分群判断是否可选择该销售品
	 */
	var checkProdOffer = function(customerData,prodOfferId){
		var custType = "-1";
		if(customerData && customerData.custType && customerData.custType != "null"){
			custType = customerData.custType;
		}
		var custId = customerData.custId;
		//规则检测开关
		if(ProdOfferRuleClient){
			if(!ProdOfferRuleClient({
				"ruleEventId":49,
				"cityCode":customerData.cityCode
			})){
				custType = "-1";
				custId = "";
			}
		}
		//调用JAVA程序检测
		var parameter = "custType="+custType+"&custId="+custId+"&cityCode="+customerData.cityCode+"&prodOfferId="+prodOfferId+"&belongCode="+$("belongCodeColl").value;
		var result = executeRequest("shoppingCartAction","doCheckProdOffer",parameter);
		if(result){
			if((!result.split("~")[0]) || result.split("~")[0] == 'false'){
				if(result.split("~")[1]){
					alert(result.split("~")[1]);
					return false;
				}else{
					alert("客户与所选销售品处于不同群组,不能选择该销售品!");
					return false;
				}
				alert(result.split("~")[1]);
				return false;
			}
		}
		return true;
	};
	/**
	 * 判断是否允许主销售品变更
	 */
	var checkNewProdOffer = function() {
		if(!oldProdOfferInstInfo){
			return true;
		}
		var checkResult = false;
		var prodInstList = oldProdOfferInstInfo.prodInstList;//获取销售品下面的接入类产品集合
		BusCard.each(prodInstList||[],function(prodInst){
			if(findProductById(prodInst.productId)){
				checkResult = true;
				 return false;
			}		
		});
		return checkResult;
	};
	var findProductById = function(productId) {
		var productList = Me.prodOfferData.offerProdRelaList;//无角色产品集合
		if (productList != null && productList.length > 0) {
			for (var j = 0, lenj = productList.length; j < lenj; j++) {
				var productInfo = productList[j];
				if (productInfo.productId == productId) {
					return productInfo;
				}
			}
		};
		var roleInfoList = Me.prodOfferData.roleInfoList;//有角色产品集合
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
	 * 销售品页面左右切换事件
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
	//对外暴露此接口
	Me.initValueForCustOrderInfo =  initValueForCustOrderInfo;
	//设置当前选择的销售品
	Me.setCurrentProdOfferId = function(prodOfferId){
		currentProdOfferId = prodOfferId;
	};
	
	/**
	 * 根据旧有销售品信息初始化区域下拉框
	 */
	 Me.initBelongCode = function() {
		var belongCode = getBelongCodeByOldProdOffer();
		if (belongCode != null) {
			// 设置区域的值，并且将区域下拉框置灰
			$("belongCodeColl").value = belongCode;
			$("belongCodeColl").disabled = "disabled";
		}
	};
	
	
	/**
	 * 根据旧有的销售品获取所属区域
	 */
	var getBelongCodeByOldProdOffer = function() {
		getOldProdOfferInstInfo();
		var belongCode = null;
		if (oldProdOfferInstInfo != null) {
			var prodInstList = oldProdOfferInstInfo.prodInstList;
			if (prodInstList) {
				for (var i = 0, len = prodInstList.length; i < len; i++) {
					var prodInstInfo = prodInstList[i];
					//关联出来的产品有可能是功能类 取非空值
					if(prodInstInfo.serviceRelationVO&&prodInstInfo.serviceRelationVO.belongCode){
						return prodInstInfo.serviceRelationVO.belongCode;
					}
					
				}
			}
		}
		return belongCode;
	};
	
	
	/**
	 * 根据销售品实例ID来获取旧有的构成
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
	 * 校验两个销售品是否存在互斥关系
	 */
	var doCheckProdOfferMutual = function(prodOfferId,prodOfferIdTree){
		//销售品互斥规则检测规则开关
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
		//销售品互斥检测
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "doCheckProdOfferMutual", parameters);
		var resultJsonObj = Ext.decode(resultJsonStr);
		if(!resultJsonObj){
			if(confirm("销售品互斥检测失败，请确认！")){
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
	 * 初始化热点销售品
	 */
	Me.initHotProdOfferList = function(){
		var parameter = {
			hotProdClick:doOrderProdOffer,//选购销售品事件
			hotProdContainer:Me.$("showHotProdList"),//热点销售
			peddleProdListContainer:Me.$("peddleProdList"),//企业热推
			personalCollectContainer:Me.$("showPersonalCollect"),//个人收藏
			"customerData" : customerData
		}
		hotProdOfferList = new HotProductList(parameter);
		hotProdOfferList.init();
	};
	/**
	 * 初始化事件，销售区域变化需要刷新主销售品树及热点销售品
	 */
	Me.initEvent = function(){
		Me.$("belongCodeColl").onchange = function(){
			prodOfferTree.initAllSaleWorkTree();//初始化全部销售品
			if(hotProdOfferList){
				hotProdOfferList.refresh();//刷新热点销售品
			}
			currentBelongCode = this.value;
		}
	};
	//获取预登录提交串
	Me.getPostParamList = function(){
		var postparamvalue = "&custXml="+Ext.encode(window.customerData)+
				"&flag=1&prodOfferInstId="+prodOfferInstId+
				"&prodOfferId="+prodOfferId+
				"&custOrderId=&prodServiceOfferId=&serviceOfferId=320";
		return postparamvalue;
	};
}