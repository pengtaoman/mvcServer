
var HotProductList = function (args) {
	
	var Me = this;
	var tBodyDiv = args.hotProdContainer;
	var hotProdClick=args.hotProdClick;
	var customerData = args.customerData;
	var hotProdContainer = args.hotProdContainer;//热点销售品
	var peddleProdListContainer = args.peddleProdListContainer;//企业热推销售品
	var personalCollectContainer = args.personalCollectContainer;//个人收藏销售品
	var hotProdOfferInfo = "";//热点销售品信息
	var peddleProdOfferInfo = "";//企业热推销售品信息
	var hotProdArray=[];//热点销售品集合
	var peddleProdList=null;//企业热推销售品集合
	var standardCount = 6;//设定显示与隐藏的标准值
	Me.$ = function(id){
		return document.getElementById(id);
	};
	Me.init = function () {
		getHotProdList();//获取热点销售品
		getHotProdListHTML();//热点销售品转化
		getPeddleProdList();//获取企业热推销售品
		peddleProdList2HTML();//企业热推销售品转换
		showPersonalCollectList();//获取个人收藏销售品
		Me.initEvent();//初始化事件
	};
	Me.refresh = function(){
		Me.init();
	};
	
	/**
	 *获取热点销售品	
	 */
	var getHotProdList = function () {
		var parameter="belongCode=" + Me.$("belongCodeColl").value;//区域
		if(customerData){
			parameter += "&cityCode=" + customerData.cityCode;
		}
		//获取热点销售品集合
		var resultJsonStr = executeRequest("prodOfferQueryAction", "getHotProdList",parameter);
		try{
			hotProdArray = eval("(" + resultJsonStr + ")");
		}catch(e){
			alert("获取热点销售品失败！");
			return false;
		}
	}
	
	/**
	 * 热点销售品转化
	 */
	var getHotProdListHTML=function(){
		if(!hotProdArray){
			return;
		}
		//按照热点销售品描述排序，此排序方式需确认是否合理
		hotProdArray = hotProdArray.sort(function(a,b){
			if(a.hotDesc/1 > b.hotDesc/1){
				return -1;
			}else if(a.hotDesc/1 == b.hotDesc/1){
				return 0;
			}else{
				return 1;
			}
		});
		hotProdContainer.innerHTML = "";
		if(Me.checkListLength(hotProdArray)){//判断热点销售品集合长度是否大于页面显示标准长度
			Me.$("hotProdOfferMore").style.display = "block";//显示更多按钮
			hotProdOfferInfo = Me.showMoreHotProdOffer(hotProdArray);
			hotProdContainer.innerHTML = hotProdOfferInfo.split("~")[0];
			Me.$("showMoreHotProdList").innerHTML = hotProdOfferInfo.split("~")[1];
		}else{
			hotProdOfferInfo = Me.showProdArray(hotProdArray,"selectHot");
			hotProdContainer.innerHTML = hotProdOfferInfo;
		}
		Me.addOnclickToResult();
	}
	
	/**
	 * 获取企业热推销售品
	 */
	var getPeddleProdList = function(){
		var param = "belongCode="+Me.$("belongCodeColl").value+"&custType="+customerData.custType;
		var resultJosn = executeRequest("prodOfferQueryAction","getPeddleProdList",param);
		if(resultJosn && resultJosn != ""){
			peddleProdList = Ext.decode(resultJosn);
		}
	}
	
	/**
	 * 企业热推销售品转换
	 */
	var peddleProdList2HTML = function(){
		peddleProdListContainer.innerHTML = "";
		if(peddleProdList && peddleProdList.length>0){
			if(Me.checkListLength(peddleProdList)){//判断企业热推销售品集合长度是否大于标准长度
				Me.$("peddleProdOfferMore").style.display = "block";
				var peddleProdInfo = showMoreProdOfferList(peddleProdList,"selectPed");
				peddleProdListContainer.innerHTML = peddleProdInfo.split("~")[0];
				Me.$("showMorePeddleProdOffer").innerHTML = peddleProdInfo.split("~")[1];
			}else{
				showPeddleProdList();
				peddleProdListContainer.innerHTML = peddleProdOfferInfo;
			}
		}
		Me.addOnclickToResult();
	}
	
	/**
	 * 获取个人收藏销售品
	 */
	var showPersonalCollectList = function(){
		var jsonString = executeRequest("prodOfferSaleAjaxAction","getPersonalCollectProdOffer");
		if(jsonString==''){
			jsonString = "[]";
		}
		var personalCollectList = Ext.decode(jsonString);
		if(Me.checkListLength(personalCollectList)){
			Me.$("pcProdOfferMore").style.display = "block";
			var PCProdOfferInfo = showMoreProdOfferList(personalCollectList,"selectPer");
			personalCollectContainer.innerHTML = PCProdOfferInfo.split("~")[0];
			Me.$("showMorepcProdList").innerHTML = PCProdOfferInfo.split("~")[1];
		}else{
			personalCollectList2HTML(personalCollectList);
		}
		Me.addOnclickToResult();
	}
	
	/**
	 * 个人收藏列表转化
	 */
	var personalCollectList2HTML = function(personalCollectList){
		personalCollectContainer.innerHTML = "";
		var personalCollectInfo = "";
		if(personalCollectList && personalCollectList.length>0){
			personalCollectInfo = "<ul class='favori_ul'>";
			for(var p in personalCollectList){
				var personalCollectProdOffer = personalCollectList[p];
				if(personalCollectProdOffer && personalCollectProdOffer.prodOfferId){
					personalCollectInfo += "<li name='selectPer' style='cursor:pointer' prodOfferId='"+personalCollectProdOffer.prodOfferId+"'>";
					personalCollectInfo += "<a href='#'>";
					personalCollectInfo += personalCollectProdOffer.prodOfferName;
					personalCollectInfo += "</a></li>";
				}
			}
			personalCollectInfo += "</ul>";
		}
		personalCollectContainer.innerHTML = personalCollectInfo;
	}
	
	/**
	 * 热点销售品列表添加选择事件
	 */
	 Me.addOnclickToResult = function(){
	 	var lis = document.getElementsByTagName("li");
	 	for(var i=0;i<lis.length;i++){
	 		if(lis[i].name=="selectHot" || lis[i].name=="selectPed" || lis[i].name=="selectPer"){
		 		lis[i].onclick=function(){
		 			Me.showSelectedProdOffer(this.prodOfferId,this.innerText,this.name);
		 		}
		 		lis[i].onmouseover = function(){
		 			var prodOfferInfo = Me.getProdOfferDetail(this.prodOfferId);
		 			if(prodOfferInfo){
						var prodOfferDetail = Ext.decode(prodOfferInfo);
						var effDate = prodOfferDetail.effDate;
						var expDate = prodOfferDetail.expDate;
						var prodOfferDesc = prodOfferDetail.prodOfferDesc;//销售品描述信息
						if(prodOfferDesc && prodOfferDesc!=""){
							jTip.show(this,this.innerText,prodOfferDesc+"<br>"+"上架时间:"+effDate+"<br>"+"下架时间:"+expDate);
						}else{
							jTip.show(this,this.innerText,"上架时间:"+effDate+"<br>"+"下架时间:"+expDate);
						}
		 			}
		 		}
		 		lis[i].onmouseout = function(){
		 			jTip.hide(this);
		 		}
	 		}
	 	}
	 };
	 
	 /**
	 * 获取销售品详细信息
	 */
	 Me.getProdOfferDetail = function(prodOfferId){
		 var vParameter = "prodOfferId=" + prodOfferId;
		 var resultData = executeRequest("orderDetailAction", "getProdOfferDetail", vParameter);
		 return resultData;
	 };
	 
	 /**
	  * 选择事件
	  */
	 Me.showSelectedProdOffer = function(prodOfferId,prodOfferName,operName){
	 	var oParam = {
	 		"prodOfferId" : prodOfferId,
	 		"prodOfferName" : prodOfferName,
	 		"operName" : operName
	 	}
	 	if(hotProdClick){
			hotProdClick.call(this, oParam);
		}
	 };
	 
	 /**
	  * 将查询的结合形式销售品转换为列表形式(数组)
	  */
	 Me.showProdArray = function(prodOfferArray,liName){
	 	var prodOfferInfo = "";
	 	if(prodOfferArray){
	 		prodOfferInfo = "<ul class='favori_ul'>";
			var prodSize=prodOfferArray.length;
			for(var i=0;i<prodSize;i++){
				var prodOffer=prodOfferArray[i];
				if(prodOffer.hotType){
					if(prodOffer.hotType == "1"){//热点销售品
						prodOfferInfo += "<li name='"+liName+"' style='cursor:pointer' prodOfferId='"+prodOffer.productId+"'>";
						prodOfferInfo += "<a href='#'>";
						prodOfferInfo += prodOffer.productName;
						prodOfferInfo += "</a></li>";
					}
				}else{
					prodOfferInfo += "<li name='"+liName+"' style='cursor:pointer' prodOfferId='"+prodOffer.prodOfferId+"'>";
					prodOfferInfo += "<a href='#'>";
					prodOfferInfo += prodOffer.prodOfferName;
					prodOfferInfo += "</a></li>";
				}
			}
			prodOfferInfo += "</ul>";
	 	}
	 	return prodOfferInfo;
	 };
	 
	 /**
	  * 企业热推销售品转化为列表格式
	  */
	 var showPeddleProdList = function(){
	 	peddleProdOfferInfo = "<ul class='favori_ul'>";
	 	for(var p in peddleProdList){
	 		var peddleProdOffer = peddleProdList[p];
	 		if(peddleProdOffer && peddleProdOffer.prodOfferId){
	 			peddleProdOfferInfo += "<li name='selectPed' style='cursor:pointer' prodOfferId='"+peddleProdOffer.prodOfferId+"'>";
		 		peddleProdOfferInfo += "<a href='#'>";
		 		peddleProdOfferInfo += peddleProdOffer.prodOfferName;
		 		peddleProdOfferInfo += "</a></li>";
	 		}
	 	}
	 	peddleProdOfferInfo += "</ul>";
	 }
	 
	 /**
	  * 展示多于标准个数的销售品(list)
	  */
	 var showMoreProdOfferList = function(prodOfferList,liName){
	 	var prodOfferArray = [];
	 	var prodOfferIndex = 0;
	 	var prodOfferMoreArray = [];
	 	var prodOfferMoreIndex = 0;
	 	for(var p in prodOfferList){
	 		var prodOffer = prodOfferList[p];
	 		if(prodOffer && prodOffer.prodOfferId){
	 			if(prodOfferIndex<standardCount){
	 				prodOfferArray[prodOfferIndex] = prodOffer;
	 				prodOfferIndex++;
	 			}else{
	 				prodOfferMoreArray[prodOfferMoreIndex] = prodOffer;
	 				prodOfferMoreIndex++;
	 			}
	 		}
	 	}
	 	var prodOfferInfo = Me.showProdArray(prodOfferArray,liName);
	 	var prodOfferMoreInfo = Me.showProdArray(prodOfferMoreArray,liName);
	 	return prodOfferInfo+"~"+prodOfferMoreInfo;
	 }
	 
	 /**
	  * 判断获取销售品列表长度
	  */
	 Me.checkListLength = function(prodOfferList){
	 	var flag = false;
	 	if(prodOfferList){
	 		var listLength = prodOfferList.length;
	 		if(listLength>standardCount){
	 			flag = true;
	 		}
	 	}
	 	return flag;
	 };
	 
	 /**
	  * 多于标准个数销售品展示(array)
	  */
	 Me.showMoreHotProdOffer = function(hotProdOffer){
	 	if(!hotProdOffer){
	 		return;
	 	}
	 	var hotProdOfferArray = [];
	 	var hotProdOfferIndex = 0;
	 	var hotProdOfferMoreArray = [];
	 	var hotProdOfferMoreIndex = 0;
	 	for(var i=0;i<hotProdOffer.length;i++){
	 		if(i<standardCount){
	 			hotProdOfferArray[hotProdOfferIndex] = hotProdOffer[i];
	 			hotProdOfferIndex++;
	 		}else{
	 			hotProdOfferMoreArray[hotProdOfferMoreIndex] = hotProdOffer[i];
	 			hotProdOfferMoreIndex++;
	 		}
	 	}
	 	var hotProdOfferInfo = Me.showProdArray(hotProdOfferArray,"selectHot");
	 	var hotProdOfferMoreInfo = Me.showProdArray(hotProdOfferMoreArray,"selectHot");
	 	return hotProdOfferInfo+"~"+hotProdOfferMoreInfo;
	 };
	 
	 /**
	  * 展示与隐藏链接事件
	  */
	 Me.moreHrefOnclick = function(hrefId,divId){
	 	if(Me.$(hrefId).currentState == "show"){
	 		Me.$(hrefId).currentState = "hidd"
	 		Me.$(hrefId).innerText = "隐藏<<";
	 		Me.$(divId).style.display = "block";
	 	}else{
	 		Me.$(hrefId).currentState = "show"
	 		Me.$(hrefId).innerText = "更多>>";
	 		Me.$(divId).style.display = "none";
	 	}
	 };
	 
	 /**
	  * 初始化事件
	  */
	 Me.initEvent = function(){
	 	//企业热推销售品
	 	Me.$("peddleProdOfferMoreHref").onclick = function(){
	 		Me.moreHrefOnclick("peddleProdOfferMoreHref","showMorePeddleProdOffer");
	 	};
	 	//热点销售品
	 	Me.$("hotProdMoreHref").onclick = function(){
	 		Me.moreHrefOnclick("hotProdMoreHref","showMoreHotProdList");
	 	}
	 	//个人收藏
	 	Me.$("pcProdMoreHref").onclick = function(){
	 		Me.moreHrefOnclick("pcProdMoreHref","showMorepcProdList");
	 	};
	 };
}

