
var HotProductList = function (args) {
	
	var Me = this;
	var tBodyDiv = args.hotProdContainer;
	var hotProdClick=args.hotProdClick;
	var customerData = args.customerData;
	var hotProdContainer = args.hotProdContainer;//�ȵ�����Ʒ
	var peddleProdListContainer = args.peddleProdListContainer;//��ҵ��������Ʒ
	var personalCollectContainer = args.personalCollectContainer;//�����ղ�����Ʒ
	var hotProdOfferInfo = "";//�ȵ�����Ʒ��Ϣ
	var peddleProdOfferInfo = "";//��ҵ��������Ʒ��Ϣ
	var hotProdArray=[];//�ȵ�����Ʒ����
	var peddleProdList=null;//��ҵ��������Ʒ����
	var standardCount = 6;//�趨��ʾ�����صı�׼ֵ
	Me.$ = function(id){
		return document.getElementById(id);
	};
	Me.init = function () {
		getHotProdList();//��ȡ�ȵ�����Ʒ
		getHotProdListHTML();//�ȵ�����Ʒת��
		getPeddleProdList();//��ȡ��ҵ��������Ʒ
		peddleProdList2HTML();//��ҵ��������Ʒת��
		showPersonalCollectList();//��ȡ�����ղ�����Ʒ
		Me.initEvent();//��ʼ���¼�
	};
	Me.refresh = function(){
		Me.init();
	};
	
	/**
	 *��ȡ�ȵ�����Ʒ	
	 */
	var getHotProdList = function () {
		var parameter="belongCode=" + Me.$("belongCodeColl").value;//����
		if(customerData){
			parameter += "&cityCode=" + customerData.cityCode;
		}
		//��ȡ�ȵ�����Ʒ����
		var resultJsonStr = executeRequest("prodOfferQueryAction", "getHotProdList",parameter);
		try{
			hotProdArray = eval("(" + resultJsonStr + ")");
		}catch(e){
			alert("��ȡ�ȵ�����Ʒʧ�ܣ�");
			return false;
		}
	}
	
	/**
	 * �ȵ�����Ʒת��
	 */
	var getHotProdListHTML=function(){
		if(!hotProdArray){
			return;
		}
		//�����ȵ�����Ʒ�������򣬴�����ʽ��ȷ���Ƿ����
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
		if(Me.checkListLength(hotProdArray)){//�ж��ȵ�����Ʒ���ϳ����Ƿ����ҳ����ʾ��׼����
			Me.$("hotProdOfferMore").style.display = "block";//��ʾ���ఴť
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
	 * ��ȡ��ҵ��������Ʒ
	 */
	var getPeddleProdList = function(){
		var param = "belongCode="+Me.$("belongCodeColl").value+"&custType="+customerData.custType;
		var resultJosn = executeRequest("prodOfferQueryAction","getPeddleProdList",param);
		if(resultJosn && resultJosn != ""){
			peddleProdList = Ext.decode(resultJosn);
		}
	}
	
	/**
	 * ��ҵ��������Ʒת��
	 */
	var peddleProdList2HTML = function(){
		peddleProdListContainer.innerHTML = "";
		if(peddleProdList && peddleProdList.length>0){
			if(Me.checkListLength(peddleProdList)){//�ж���ҵ��������Ʒ���ϳ����Ƿ���ڱ�׼����
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
	 * ��ȡ�����ղ�����Ʒ
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
	 * �����ղ��б�ת��
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
	 * �ȵ�����Ʒ�б����ѡ���¼�
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
						var prodOfferDesc = prodOfferDetail.prodOfferDesc;//����Ʒ������Ϣ
						if(prodOfferDesc && prodOfferDesc!=""){
							jTip.show(this,this.innerText,prodOfferDesc+"<br>"+"�ϼ�ʱ��:"+effDate+"<br>"+"�¼�ʱ��:"+expDate);
						}else{
							jTip.show(this,this.innerText,"�ϼ�ʱ��:"+effDate+"<br>"+"�¼�ʱ��:"+expDate);
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
	 * ��ȡ����Ʒ��ϸ��Ϣ
	 */
	 Me.getProdOfferDetail = function(prodOfferId){
		 var vParameter = "prodOfferId=" + prodOfferId;
		 var resultData = executeRequest("orderDetailAction", "getProdOfferDetail", vParameter);
		 return resultData;
	 };
	 
	 /**
	  * ѡ���¼�
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
	  * ����ѯ�Ľ����ʽ����Ʒת��Ϊ�б���ʽ(����)
	  */
	 Me.showProdArray = function(prodOfferArray,liName){
	 	var prodOfferInfo = "";
	 	if(prodOfferArray){
	 		prodOfferInfo = "<ul class='favori_ul'>";
			var prodSize=prodOfferArray.length;
			for(var i=0;i<prodSize;i++){
				var prodOffer=prodOfferArray[i];
				if(prodOffer.hotType){
					if(prodOffer.hotType == "1"){//�ȵ�����Ʒ
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
	  * ��ҵ��������Ʒת��Ϊ�б��ʽ
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
	  * չʾ���ڱ�׼����������Ʒ(list)
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
	  * �жϻ�ȡ����Ʒ�б���
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
	  * ���ڱ�׼��������Ʒչʾ(array)
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
	  * չʾ�����������¼�
	  */
	 Me.moreHrefOnclick = function(hrefId,divId){
	 	if(Me.$(hrefId).currentState == "show"){
	 		Me.$(hrefId).currentState = "hidd"
	 		Me.$(hrefId).innerText = "����<<";
	 		Me.$(divId).style.display = "block";
	 	}else{
	 		Me.$(hrefId).currentState = "show"
	 		Me.$(hrefId).innerText = "����>>";
	 		Me.$(divId).style.display = "none";
	 	}
	 };
	 
	 /**
	  * ��ʼ���¼�
	  */
	 Me.initEvent = function(){
	 	//��ҵ��������Ʒ
	 	Me.$("peddleProdOfferMoreHref").onclick = function(){
	 		Me.moreHrefOnclick("peddleProdOfferMoreHref","showMorePeddleProdOffer");
	 	};
	 	//�ȵ�����Ʒ
	 	Me.$("hotProdMoreHref").onclick = function(){
	 		Me.moreHrefOnclick("hotProdMoreHref","showMoreHotProdList");
	 	}
	 	//�����ղ�
	 	Me.$("pcProdMoreHref").onclick = function(){
	 		Me.moreHrefOnclick("pcProdMoreHref","showMorepcProdList");
	 	};
	 };
}

