var SubProductBuilder = function(args){
	var Me = this;
	Me.args = args;
	Me.container = args.container;
	Me.mainProductId = args.productId;
	Me.webPath = args.webPath;
	Me.cityCode = args.cityCode;
	Me.selectProductInput = document.createElement("INPUT");
	Me.productList = {};
	
	Me.createProductElement = function(){
		var lebal = document.createElement("SPAN");
		lebal.style.marginLeft="10px";
		lebal.innerText = "功能产品：";
		Me.selectProductInput.setAttribute("type", "TEXT");
		//提到CSS中 beg
		Me.selectProductInput.style.width = "90%";
		Me.selectProductInput.style.border = "none";
		Me.selectProductInput.style.borderBottomStyle="solid";
		Me.selectProductInput.style.borderBottomColor="#8cbeef";
		Me.selectProductInput.style.borderBottomWidth="1px";
		Me.selectProductInput.disabled = true;
		//提到CSS中 end
		/**
		var productBtn = document.createElement("INPUT");
		productBtn.setAttribute("type", "BUTTON");
		productBtn.className = "button_l";
		productBtn.value = "更多功能产品";
		*/
		var productBtn = document.createElement("a");
		productBtn.href="#";
		var imgElement = document.createElement("img");
		imgElement.src = Me.webPath+"/common/dx20/images/Note.gif";
		imgElement.style.width ="16";
		imgElement.style.height = "16";
		productBtn.appendChild(imgElement);
		productBtn.onclick = function(){
			Me.showProductTree();
		}
		Me.container.appendChild(lebal);
		Me.container.appendChild(Me.selectProductInput);
		Me.container.appendChild(productBtn);
	}
	Me.showProductTree = function(){
		var dialogParam = {
			"productId" : Me.mainProductId,
			"productList" : Me.productList,
			"callBackFunc" : Me.showProductInfo,
			"cityCode" : Me.cityCode
		}
		var webPath = Me.webPath + "/custcontact/common/businessmodule/product/jsp/ProductInfo.jsp";
		showModalDialog(webPath, dialogParam, "DialogWidth:400px;DialogHeight:500px;status:no;location:no");
	}
	Me.showProductInfo = function(productData){
		Me.productList = productData;
		Me.showProductDetail();
	}
	Me.getProductInfo = function(productData){
		Me.productList[productData.productId] = productData;
	}
	Me.showProductDetail = function(){
		var productStr = [];
		for (var p in Me.productList) {
			productStr.push(Me.productList[p].productName);
		}
		if(productStr.length > 0){
			Me.selectProductInput.value = productStr.join("/");
		}else{
			Me.selectProductInput.value = "";
		}
	}
	Me.initDefaultProduct = function(){
		var result = executeRequest("orderDetailAction", "getDefaultProductList", "productId=" + Me.mainProductId);
		if(result){
			var defaultProductData = Ext.decode(result);
			for(var i = 0, len = defaultProductData.length; i < len; i++) {
				Me.getProductInfo(defaultProductData[i]);
			}
			Me.showProductDetail();
		}
	}
};
SubProductBuilder.prototype = {
	/**
	 * 入口函数，初始化所有信息
	 */
	init : function(){
		var Me = this;
		Me.createProductElement();
		Me.initDefaultProduct();
	},
	/**
	 * 获取产品信息XML串
	 */
	getData : function(){
		var Me = this;
		var outString = "<prodItemInfoList>";
		for (var p in Me.productList) {
			var productData = Me.productList[p];
			var productInfo = {
				"prodId":productData.productId,
				"prodInstId":-1,
				"prodType":productData.prodBundleType,
				"prodFuncType":productData.prodFuncType,
				"prodName":productData.productName,
				"operKind":1,
				"ifMainMember":0,
				"prodAttrInfoList":"",
				"resRelaInfoList":"",
				"userId":-1,
				"ifAdded":productData.ifAdded
			}
			outString += "<relaProdInfoVO>";
			outString += new LeafList(productInfo).toString();
			outString += "</relaProdInfoVO>";
		}
		outString += "</prodItemInfoList>";
		return outString;
	},
	getProductList:function(){
		var Me = this;
		return Me.productList;
	}
};
var SubProductChgBuilder = Ext.extend(SubProductBuilder,{
	userId : null,
	userHasProductInstList : [],
	userHasProductInfoList : [],
	/**
	 * 入口函数，初始化所有信息
	 */
	init : function(){
		var Me = this;
		Me.userId = Me.args.userId || "-1";
		Me.createProductElement();
		Me.initUserHasProduct();
	},
	initUserHasProduct : function(){
		var Me = this;
		var parameter = "productId=" + Me.mainProductId;
		parameter += "&userId=" + Me.userId;
		var result = executeRequest("orderDetailAction", "getUserHasProductList", parameter);
		if(result){
			var prodData = Ext.decode(result);
			if(prodData.productInfoList){
				Me.userHasProductInfoList = prodData.productInfoList;
			}
			if(prodData.userHasprodInstList){
				Me.userHasProductInstList = prodData.userHasprodInstList;
			}			
			for(var i = 0, len = Me.userHasProductInfoList.length; i < len; i++) {
				Me.getProductInfo(Me.userHasProductInfoList[i]);
			}
			Me.showProductDetail();
		}
	},
	/**
	 * 获取产品信息XML串
	 */
	getData : function(){
		var Me = this;
		var noneChangeProdList = {};
		var delProdList = {};
		var addProdList = {};
		Me.dealAllProductData(noneChangeProdList,delProdList,addProdList);//处理所有选中的产品
		var outString = "<prodItemInfoList>";
		for (var p in noneChangeProdList) {
			var noneProductData = noneChangeProdList[p];
			var productInfo = {
				"prodId":noneProductData.productId,
				"prodInstId":noneProductData.prodInstId,
				"prodType":noneProductData.prodBundleType,
				"prodFuncType":noneProductData.prodFuncType,
				"prodName":noneProductData.productName,
				"operKind":0,
				"ifMainMember":0,
				"prodAttrInfoList":"",
				"resRelaInfoList":"",
				"userId":Me.userId,
				"ifAdded":noneProductData.ifAdded
			}
			outString += "<relaProdInfoVO>";
			outString += new LeafList(productInfo).toString();
			outString += "</relaProdInfoVO>";
		}
		for (var p in delProdList) {
			var delProductData = delProdList[p];
			var productInfo = {
				"prodId":delProductData.productId,
				"prodInstId":delProductData.prodInstId,
				"prodType":delProductData.prodBundleType,
				"prodFuncType":delProductData.prodFuncType,
				"prodName":delProductData.productName,
				"operKind":3,
				"ifMainMember":0,
				"prodAttrInfoList":"",
				"resRelaInfoList":"",
				"userId":Me.userId,
				"ifAdded":delProductData.ifAdded
			}
			outString += "<relaProdInfoVO>";
			outString += new LeafList(productInfo).toString();
			outString += "</relaProdInfoVO>";
		}
		for (var p in addProdList) {
			var addProductData = addProdList[p];
			var productInfo = {
				"prodId":addProductData.productId,
				"prodInstId":-1,
				"prodType":addProductData.prodBundleType,
				"prodFuncType":addProductData.prodFuncType,
				"prodName":addProductData.productName,
				"operKind":1,
				"ifMainMember":0,
				"prodAttrInfoList":"",
				"resRelaInfoList":"",
				"userId":Me.userId,
				"ifAdded":addProductData.ifAdded
			}
			outString += "<relaProdInfoVO>";
			outString += new LeafList(productInfo).toString();
			outString += "</relaProdInfoVO>";
		}
		outString += "</prodItemInfoList>";
		return outString;
	},
	getProductList:function(){
		var Me = this;
		var noneChangeProdList = {};
		var delProdList = {};
		var addProdList = {};
		Me.dealAllProductData(noneChangeProdList,delProdList,addProdList);
		var newProductList = {};
		for (var p in noneChangeProdList) {
			newProductList[p] = noneChangeProdList[p];
		}
		for (var p in addProdList) {
			newProductList[p] = addProdList[p];
		}
		return newProductList;
	},
	dealAllProductData : function(noneChangeProdList,delProdList,addProdList){
		var Me = this;
		for (var p in Me.productList) {
			var productData = Me.productList[p];
			var prodInstinfo = Me.getProductInstInfo(productData.productId);
			if(prodInstinfo == null){//新增的产品
				addProdList[productData.productId] = productData;
			}else{
				productData.prodInstId = prodInstinfo.prodInstId;
				noneChangeProdList[productData.productId] = productData;
			}			
		}
		for(var i = 0, len = Me.userHasProductInfoList.length; i < len; i++) {
			var productInfo = Me.userHasProductInfoList[i];
			if(Me.ifDelProductInfo(productInfo.productId)){
				var prodInstinfo = Me.getProductInstInfo(productInfo.productId);
				productInfo.prodInstId = prodInstinfo.prodInstId;
				delProdList[productInfo.productId] = productInfo;
			}			
		}
	},
	getProductInstInfo : function(productId){
		var Me = this;
		if(!productId){
			return null;
		}
		for(var i = 0, len = Me.userHasProductInstList.length; i < len; i++) {
			var prodInstinfo = Me.userHasProductInstList[i];
			if(prodInstinfo.productId === productId){
				return prodInstinfo;
			}
		}
		return null;
	},
	ifDelProductInfo : function(productId){
		var Me = this;
		for(var p in Me.productList){
			var productData = Me.productList[p];
			if(productData.productId === productId){
				return false;
			}
		}
		return true;
	}
});