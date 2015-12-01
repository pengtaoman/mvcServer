//var PRODOFFERTYPE = {
//	DEPEND_TYPE : "10" //������ϵ
//}

/**
 * ����Ʒ��
 */
var ProdOfferTree = function(args){
	var Me = this;
	var webPath = args.webPath;
	var nodedbClick = args.nodedbClick;
	var prodOfferTreeContainer = args.prodOfferTreeContainer;
	var customerData = args.customerData;
	var container = null;
	Me.$ = function(id){
		return document.getElementById(id);
	}
	/**
	 * ��ѯ��������Ʒ��url
	 */
	var allSaleworkTreePath = webPath + "/shoppingCartAction.do?method=doSaleworkTreeAllXml";
	Me.init = function(){
		initProdOfferTree();//��ʼ������ƷĿ¼��
		Me.searchKeyOper();//��ʼ����ѯ�����������
		Me.initAllSaleWorkTree();//��ʼ��ȫ������Ʒ
	}
	
	/**
	 * ��ʼ������ƷĿ¼��
	 */
	function initProdOfferTree(){
		var responseHTML = executeRequest("shoppingCartAction", "initSaleWorkTree", "cityCode="+customerData.cityCode+"&type=new");
		prodOfferTreeContainer.innerHTML = responseHTML;
		
	}
	
	/**
	 * ��ʼ��ȫ������Ʒ
	 */
	Me.initAllSaleWorkTree = function(){
		container = Me.$("comm_AllSaleWorkTree");
		var custType = "-1";
		if(customerData && customerData.custType && customerData.custType != "null"){
			custType = customerData.custType;
		}
		var custId = customerData.custId;
		if(ProdOfferRuleClient){//�����⿪��
			if(!ProdOfferRuleClient({
				"ruleEventId":49,
				"cityCode":customerData.cityCode
			})){
				custType = "-1";
				custId = "";
			}
		}
		var parameter = "&custType="+custType;
		parameter += "&cityCode="+customerData.cityCode+"&custId="+custId;
		var allTreePath = allSaleworkTreePath+parameter;
		Me.getProdOfferTree(allTreePath, "comm_AllSaleWorkTree");
	};
	
	/**
	 * ������
	 */
	Me.getProdOfferTree = function(xmlPath, containerName){
	    xmlPath += "&belongCode="+Me.$("belongCodeColl").value;
		Me.resetContainer();
		var oParamter={
			"path":xmlPath,
			"containerName":containerName,
			"nodedbClick":Me.onCheckProdOffer,
			"webPath":webPath
		};
		var xtree = new xTree(oParamter);
		xtree.init();
	};
	
	/**
	 * ����������
	 */
	Me.resetContainer = function(){
		container.innerHTML = "";
	};
	
	/**
	 * ѡ������Ʒʱ�����¼�
	 */
	Me.onCheckProdOffer = function(nodeValue, nodeAttributes){
		var args = {
			prodOfferId:nodeAttributes.id,
			prodOfferName:nodeAttributes.text,
			regionCode:Me.$("belongCodeColl").value
		};
		if(nodedbClick){
			nodedbClick.call(this, args);
		}
	};
	
	/**
	 * ��ѯ�����������
	 */
	Me.searchKeyOper = function(){
		var o=document.getElementById("searchKey");//��ѯ���
	    o.setAttribute("valueCache",o.value);
	    o.onblur = function(){
	        if(o.value==""){
	            o.valueCache="";
	            o.value=o.tips;
	            //������ʾ��޸���ʽ add
	            o.style.color="#cccccc";
	        }else{
	            o.valueCache=o.value;
	        }
	    }
	    o.onfocus = function(){
	        o.value=o.valueCache; 
	        //���ʼ�����������
	        var e = event.srcElement;
	        var r =e.createTextRange();
	        r.moveStart('character',e.value.length);
	        r.collapse(true);
	        r.select();
	        //��ʾ����ʧ���ָ���ʽ add
	        o.style.color="#000000";
	    }
	    o.onkeydown = function(){
	    	if(event.keyCode == 13){//��������Ʒ���ƽ���ģ����ѯ
	    		Me.queryByProdName();
	    	}
	    }
	    o.onblur();
	};
	
	/**
	 * ��������Ʒ����ģ����ѯ
	 */
	Me.queryByProdName = function(){
		var belongCode = Me.$("belongCodeColl").value;
		//�˴�ע�͵��������ȥ������Ҫ�޸ģ�����Ҫ���ղ�ͬ�������жϲ�ͬ�����µġ������֡�����
		/*
		if(belongCode == "210101"){
	 		alert("��ѡ���ѯ����");
	 		Me.$("belongCodeColl").focus();
	 		return false;
	 	}
	 	*/
		var custType = "-1";
		if(customerData && customerData.custType && customerData.custType != "null"){
			custType = customerData.custType;
		}
		var custId = customerData.custId;
		if(ProdOfferRuleClient){//�����⿪��
			if(!ProdOfferRuleClient({
				"ruleEventId":49,
				"cityCode":customerData.cityCode
			})){
				custType = "-1";
				custId = "";
			}
		}
		var prodName = Me.$("searchKey").value;//��ѯ�ı�
		var param = "&belongCode="+Me.$("belongCodeColl").value+"&prodName="+prodName+"&custType="+custType+"&cityCode="+customerData.cityCode+"&custId="+custId;
		var result = executeRequest("shoppingCartAction","getProdOfferInfoByName",param);
		var resultList = Ext.decode(result);
		var resultListHTML = Me.showResultList(resultList);//չʾģ����ѯ���
		Me.$("showProdOfferSearchList").innerHTML = resultListHTML;
		selectTagForNew("tagContent0_2",Me.$("searchResult"),"tags","selectTag");//�л�����������б�
		Me.addOnclickToResult();//����Ʒ�б����ӵ���¼�
	};
	
	/**
	  * չʾģ����ѯ���
	  */
	 Me.showResultList = function(resultList){
	 	 var resultListHTML = "<ul class='favori_ul'>";
	 	 for(var i=0;i<resultList.length;i++){
	 	 	var prodOfferData = resultList[i];
	 	 	resultListHTML += "<li name='selectLi' style='cursor:pointer' prodOfferId='"+prodOfferData.prodOfferId+"'>";
	 	 	resultListHTML +="<a href='#'>";
	 	 	resultListHTML += prodOfferData.prodOfferName;
	 	 	resultListHTML += "</a>";
	 	 	resultListHTML += "</li>";
	 	 }
	 	 resultListHTML += "</ul>";
	 	 return resultListHTML;
	 };
	 
	 /**
	  * ����Ʒ�б����ѡ���¼�
	  */
	 Me.addOnclickToResult = function(){
	 	var lis = document.getElementsByTagName("li");
	 	for(var i=0;i<lis.length;i++){
	 		if(lis[i].name=="selectLi"){
		 		lis[i].onclick=function(){//��ӵ���¼�
		 			Me.showSelectedProdOffer(this.prodOfferId,this.innerText);
		 		}
		 		lis[i].onmouseover = function(){//��꾭���¼�
		 			var prodOfferInfo = Me.getProdOfferDetail(this.prodOfferId);//��ȡ����Ʒ��ϸ��Ϣ
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
		 		lis[i].onmouseout = function(){//����Ƴ��¼�
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
	 Me.showSelectedProdOffer = function(prodOfferId,prodOfferName){
	 	var prodOfferData = Me.getProdOfferDetail(prodOfferId);//��ȡѡ������Ʒ����ϸ��Ϣ
	 	var prodOfferInfo = Ext.decode(prodOfferData);
	 	if(prodOfferInfo.prodOfferType == 1){//���ѡ��������Ʒ��������ʾ����
	 		var oParam = {
		 		"prodOfferId" : prodOfferId,
		 		"prodOfferName" : prodOfferName
		 	}
		 	if(nodedbClick){
				nodedbClick.call(this, oParam);
			}
	 	}else{
	 		var prodOfferRelaList = prodOfferInfo.prodOfferRelaList;//����Ʒ��ϵ�б�
	 		var prodOfferRelaId = "";
	 		var prodOfferRelaNameList = [];//��������Ʒ���Ƽ���
	 		var prodOfferRelaIndex = 0;
	 		var nameString = "";
	 		if(prodOfferRelaList && prodOfferRelaList.length>0){
	 			for(var p in prodOfferRelaList){
	 				var prodOfferRelaVO = prodOfferRelaList[p];
	 				if(prodOfferRelaVO.offerZId == prodOfferId && (prodOfferRelaVO.relationTypeCD == PRODOFFERTYPE.DEPEND_TYPE || prodOfferRelaVO.relationTypeCD == PRODOFFERTYPE.REL_TYPE)){//A��Ϊ������Ʒ
	 					prodOfferRelaId = prodOfferRelaVO.offerAId;//��������ƷId
	 				}else if(prodOfferRelaVO.offerAId == prodOfferId && (prodOfferRelaVO.relationTypeCD == PRODOFFERTYPE.DEPEND_TYPE || prodOfferRelaVO.relationTypeCD == PRODOFFERTYPE.REL_TYPE)){//Z��Ϊ������Ʒ
	 					prodOfferRelaId = prodOfferRelaVO.offerZId;//��������ƷId
	 				}
	 				if(prodOfferRelaId != ""){
	 					var prodOfferRelaInfo = Me.getProdOfferDetail(prodOfferRelaId);//��ȡ��������Ʒ����ϸ��Ϣ
	 					var prodOfferRelaVOInfo = Ext.decode(prodOfferRelaInfo); 
	 					if(prodOfferRelaVOInfo){
	 						var prodOfferRelaName = prodOfferRelaVOInfo.prodOfferName;
	 						prodOfferRelaNameList[prodOfferRelaIndex] = prodOfferRelaName;
	 						prodOfferRelaIndex++;
	 					}
	 					prodOfferRelaId = "";
	 				}
	 			}
	 		}
	 		for(var i=0;i<prodOfferRelaNameList.length;i++){
	 			var prodOfferName = prodOfferRelaNameList[i];
	 			if(prodOfferName){
	 				nameString += prodOfferName+",";
	 			}
	 		}
	 		nameString = nameString.substring(0,nameString.length-1);
	 		Ext.MessageBox.alert("��ʾ��Ϣ","����Ʒ��<font color=red>"+prodOfferInfo.prodOfferName+"</font>�������ڡ�<font color=red>"+nameString+"</font>��,����ֱ��ѡ��" +
	 				"������Ʒ!"
	 		);
	 	}
	 };
	 
	 /**
	  * ��ȡ����Ʒ����ϸ��Ϣ
	  */
	 Me.getProdOfferDetail = function(prodOfferId){
	 	var param = "prodOfferId="+prodOfferId;
	 	return returnData = executeRequest("orderDetailAction","getProdOfferDetail",param);
	 };
}