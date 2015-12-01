//var PRODOFFERTYPE = {
//	DEPEND_TYPE : "10" //依赖关系
//}

/**
 * 销售品树
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
	 * 查询所有销售品的url
	 */
	var allSaleworkTreePath = webPath + "/shoppingCartAction.do?method=doSaleworkTreeAllXml";
	Me.init = function(){
		initProdOfferTree();//初始化销售品目录树
		Me.searchKeyOper();//初始化查询组件操作方法
		Me.initAllSaleWorkTree();//初始化全部销售品
	}
	
	/**
	 * 初始化销售品目录树
	 */
	function initProdOfferTree(){
		var responseHTML = executeRequest("shoppingCartAction", "initSaleWorkTree", "cityCode="+customerData.cityCode+"&type=new");
		prodOfferTreeContainer.innerHTML = responseHTML;
		
	}
	
	/**
	 * 初始化全部销售品
	 */
	Me.initAllSaleWorkTree = function(){
		container = Me.$("comm_AllSaleWorkTree");
		var custType = "-1";
		if(customerData && customerData.custType && customerData.custType != "null"){
			custType = customerData.custType;
		}
		var custId = customerData.custId;
		if(ProdOfferRuleClient){//规则检测开关
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
	 * 生成树
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
	 * 重置树区域
	 */
	Me.resetContainer = function(){
		container.innerHTML = "";
	};
	
	/**
	 * 选择销售品时触发事件
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
	 * 查询组件操作方法
	 */
	Me.searchKeyOper = function(){
		var o=document.getElementById("searchKey");//查询组件
	    o.setAttribute("valueCache",o.value);
	    o.onblur = function(){
	        if(o.value==""){
	            o.valueCache="";
	            o.value=o.tips;
	            //出现提示语，修改样式 add
	            o.style.color="#cccccc";
	        }else{
	            o.valueCache=o.value;
	        }
	    }
	    o.onfocus = function(){
	        o.value=o.valueCache; 
	        //光标始终在文字最后
	        var e = event.srcElement;
	        var r =e.createTextRange();
	        r.moveStart('character',e.value.length);
	        r.collapse(true);
	        r.select();
	        //提示语消失，恢复样式 add
	        o.style.color="#000000";
	    }
	    o.onkeydown = function(){
	    	if(event.keyCode == 13){//根据销售品名称进行模糊查询
	    		Me.queryByProdName();
	    	}
	    }
	    o.onblur();
	};
	
	/**
	 * 根据销售品名称模糊查询
	 */
	Me.queryByProdName = function(){
		var belongCode = Me.$("belongCodeColl").value;
		//此处注释掉，如果不去掉，需要修改，这里要按照不同地市来判断不同地市下的“不区分”编码
		/*
		if(belongCode == "210101"){
	 		alert("请选择查询区域！");
	 		Me.$("belongCodeColl").focus();
	 		return false;
	 	}
	 	*/
		var custType = "-1";
		if(customerData && customerData.custType && customerData.custType != "null"){
			custType = customerData.custType;
		}
		var custId = customerData.custId;
		if(ProdOfferRuleClient){//规则检测开关
			if(!ProdOfferRuleClient({
				"ruleEventId":49,
				"cityCode":customerData.cityCode
			})){
				custType = "-1";
				custId = "";
			}
		}
		var prodName = Me.$("searchKey").value;//查询文本
		var param = "&belongCode="+Me.$("belongCodeColl").value+"&prodName="+prodName+"&custType="+custType+"&cityCode="+customerData.cityCode+"&custId="+custId;
		var result = executeRequest("shoppingCartAction","getProdOfferInfoByName",param);
		var resultList = Ext.decode(result);
		var resultListHTML = Me.showResultList(resultList);//展示模糊查询结果
		Me.$("showProdOfferSearchList").innerHTML = resultListHTML;
		selectTagForNew("tagContent0_2",Me.$("searchResult"),"tags","selectTag");//切换至搜索结果列表
		Me.addOnclickToResult();//销售品列表增加点击事件
	};
	
	/**
	  * 展示模糊查询结果
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
	  * 销售品列表添加选择事件
	  */
	 Me.addOnclickToResult = function(){
	 	var lis = document.getElementsByTagName("li");
	 	for(var i=0;i<lis.length;i++){
	 		if(lis[i].name=="selectLi"){
		 		lis[i].onclick=function(){//添加点击事件
		 			Me.showSelectedProdOffer(this.prodOfferId,this.innerText);
		 		}
		 		lis[i].onmouseover = function(){//鼠标经过事件
		 			var prodOfferInfo = Me.getProdOfferDetail(this.prodOfferId);//获取销售品详细信息
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
		 		lis[i].onmouseout = function(){//鼠标移出事件
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
	 Me.showSelectedProdOffer = function(prodOfferId,prodOfferName){
	 	var prodOfferData = Me.getProdOfferDetail(prodOfferId);//获取选择销售品的详细信息
	 	var prodOfferInfo = Ext.decode(prodOfferData);
	 	if(prodOfferInfo.prodOfferType == 1){//如果选中主销售品则正常显示处理
	 		var oParam = {
		 		"prodOfferId" : prodOfferId,
		 		"prodOfferName" : prodOfferName
		 	}
		 	if(nodedbClick){
				nodedbClick.call(this, oParam);
			}
	 	}else{
	 		var prodOfferRelaList = prodOfferInfo.prodOfferRelaList;//销售品关系列表
	 		var prodOfferRelaId = "";
	 		var prodOfferRelaNameList = [];//依赖销售品名称集合
	 		var prodOfferRelaIndex = 0;
	 		var nameString = "";
	 		if(prodOfferRelaList && prodOfferRelaList.length>0){
	 			for(var p in prodOfferRelaList){
	 				var prodOfferRelaVO = prodOfferRelaList[p];
	 				if(prodOfferRelaVO.offerZId == prodOfferId && (prodOfferRelaVO.relationTypeCD == PRODOFFERTYPE.DEPEND_TYPE || prodOfferRelaVO.relationTypeCD == PRODOFFERTYPE.REL_TYPE)){//A端为主销售品
	 					prodOfferRelaId = prodOfferRelaVO.offerAId;//依赖销售品Id
	 				}else if(prodOfferRelaVO.offerAId == prodOfferId && (prodOfferRelaVO.relationTypeCD == PRODOFFERTYPE.DEPEND_TYPE || prodOfferRelaVO.relationTypeCD == PRODOFFERTYPE.REL_TYPE)){//Z端为主销售品
	 					prodOfferRelaId = prodOfferRelaVO.offerZId;//依赖销售品Id
	 				}
	 				if(prodOfferRelaId != ""){
	 					var prodOfferRelaInfo = Me.getProdOfferDetail(prodOfferRelaId);//获取依赖销售品的详细信息
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
	 		Ext.MessageBox.alert("提示信息","销售品【<font color=red>"+prodOfferInfo.prodOfferName+"</font>】依赖于【<font color=red>"+nameString+"</font>】,不能直接选择" +
	 				"此销售品!"
	 		);
	 	}
	 };
	 
	 /**
	  * 获取销售品的详细信息
	  */
	 Me.getProdOfferDetail = function(prodOfferId){
	 	var param = "prodOfferId="+prodOfferId;
	 	return returnData = executeRequest("orderDetailAction","getProdOfferDetail",param);
	 };
}