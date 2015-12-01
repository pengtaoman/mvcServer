BusCard.define('/buscardapp/rela/js/getPSTNAdjustInfo.js',function(_buscard,cardParam){ 
	var Me = this;
	var a = arguments[0];
	var b = arguments[1];
	var c = b.serviceRelation.userId;
	var serviceId = b.serviceRelation.serviceId;
	//for compatibility
	var executeRequest = _buscard.executeRequest;
    //checkGoodNum
	
	var serviceParamBO = a.$remote("serviceParamBO");
	Me.productId = b.productId;
	if(Me.$("lanId")){
		Me.cityCode = Me.$("lanId").value;
	}else{
		Me.cityCode = b.cityCode;
	}
	if(Me.$("bureauId")){
		Me.bureauId = Me.$("bureauId").value;
	}else{
		Me.bureauId = b.serviceRelation.branchNo;
	}
	Me.getBureauId = function() {
			var node = Me.$("bureauId");
			return node && node.value || b.serviceRelation && b.serviceRelation.bureauId || "";
	};
	Me.getbranchNo = function() {
		var node = Me.$("branchNo");
		return node && node.value || b.serviceRelation && b.serviceRelation.branchNo || "";
	};
	
	/**
	 * 获取交换局id,如果页面上有，要从页面中取值，否则从实例表中取值
	 */
	Me.getSwitchno = function() {
	        var switchno="";
	        BusCard.each(BusCard.query("[controlFieldName]",$("prodAttrCardContainer")),function(node){
					if(node.id=='60056'){
					  switchno=node.value;
					}
				  }); 
	        if(switchno==""){    
				 var list=a.$remote("prodInstCommFacadeBO").getProdInstAttrByProperties({prodInstId:b.serviceRelation.userId ,cityCode:b.cityCode,attrId:'60056',stateCd:'109999'});
				    if(list&&list.length>0){
				      switchno=list[0].attrValue;
				    }
		     }
			return switchno;
	}; 
	Me.getChooseNumber = function () {
		var productId = Me.productId;
		var parameter = "productId=" + productId;
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getFixedNumber", parameter);
		var result = "-1";
		try {
			var jsonResultObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
			if (jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1") {
				result = jsonResultObj.message;
			}
		}
		catch (e) {
			alert("\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u53d6\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7\u539f\u951f\u65a4\u62f7\u4e3a\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u6377\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7");
			return false;
		}
		if (result == "-1") {
			var bureauId 			
			bureauId=Me.getBureauId();
			if(bureauId==""){
				bureauId = BusCard.$remote("commResourceBO").getUpIdByBureauId(b.cityCode,b.serviceRelation.branchNo);
				bureauId=a.parse(bureauId);
			}
			var B = {
				"ServiceIdInterface" : new ServiceIdInterface({
					        "$" : function(id) {
						        return Me.$(id)
					        }
				        }),
				"bureauId" : bureauId,
				"branchNo" : Me.getbranchNo()
			};
			var container2 = BusCard.$session.container2;
			var workNo = BusCard.$session.workNo;
			var endpassword = BusCard.$session.PASSWORD;
			var noDept = BusCard.$session.acceptDealer;
			
			if(Me.$("lanId")){
				Me.cityCode = Me.$("lanId").value;
			}else{
				Me.cityCode = b.cityCode;
			}

			var webPath = container2 + "resource/interfacemanage/selectno/SelectNoMain.jsp?STAFFNO=" + workNo 
			+ "&PASSWORD=" + endpassword + "&noDept=" + noDept+ "&cityCode=" + Me.cityCode + "&productId=" 
			+ Me.productId + "&sortId=2&bureauId="+ bureauId + "&branchNo=" + Me.getbranchNo()+ "&switchNo=" + Me.getSwitchno();
			Me.windowResourceServiceId = window.showModalDialog(webPath, B, "DialogWidth:1000px;DialogHeight:600px;status:no;location:no");
		} else {
			var oServiceId = Me.$("serviceId");
			oServiceId.value = result;
			oServiceId.onblur();
			oServiceId.readOnly = true;
		}
	};
	
	Me.getGoodNumInfo = function (serviceId) {
		var A = serviceId;
		if (!A) {
			if(Me.$("adjustKind")){
				Me.hidden("adjustKind");
			}
			if(Me.$("adjustMonths")){
				Me.hidden("adjustMonths");
			}
			if(Me.$("adjustFee")){
				Me.hidden("adjustFee");
			}
			if(Me.$("beforehandFee")){
				Me.hidden("beforehandFee");
			}
			return true;
		}
		var C = "serviceId=" + A + "&serviceOfferId=" + b.serviceOfferId + "&productId=" + b.productId + "&cityCode=" + b.cityCode+"&bureauId="+b.serviceRelation.branchNo;
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getGoodNumInfo", C);
	    var adjustKind=""; 
	    var adjustMonths="";
	    var adjustFee=""; 
	    var beforehandFee=""; 
	    var num=""; 
		try {
			var jsonResultObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
			if (jsonResultObj) {
			
	          adjustKind=jsonResultObj.ADJUST_KIND; 
	          adjustMonths=jsonResultObj.ADJUST_MONTHS; 
	          adjustFee=jsonResultObj.ADJUST_FEE==null?null:jsonResultObj.ADJUST_FEE/100; 
	          beforehandFee=jsonResultObj.BEFOREHAND_FEE==null?null:jsonResultObj.BEFOREHAND_FEE/100;
	          num=jsonResultObj.NUM_RULE_KIND;
	         
	          if(num>0){
		        if(Me.$("adjustKind")){
					 Me.display("adjustKind");
					 Me.$("adjustKind").innerHTML = adjustKind;
				}
				if(Me.$("adjustMonths")){
					Me.display("adjustMonths");
					Me.$("adjustMonths").innerHTML = adjustMonths;
				}
				if(Me.$("adjustFee")){
					Me.display("adjustFee");
					Me.$("adjustFee").innerHTML = adjustFee;
				}
				if(Me.$("beforehandFee")){
					Me.display("beforehandFee");
					Me.$("beforehandFee").innerHTML = beforehandFee;
				}

	          }else{
				if(Me.$("adjustKind")){
					Me.hidden("adjustKind");
				}
				if(Me.$("adjustMonths")){
					Me.hidden("adjustMonths");
				}
				if(Me.$("adjustFee")){
					Me.hidden("adjustFee");
				}
				if(Me.$("beforehandFee")){
					Me.hidden("beforehandFee");
				}
		      }
			}
		}catch (e) {
			return false;
		}

	
	};

	Me.initCard = function(){
		var serviceKind=b.serviceRelation.serviceKind;
		var userId=b.serviceRelation.userId;
		var productId=b.productId;
        var belongCode=b.serviceRelation.belongCode; 
        var note=b.serviceRelation.note;
        var branchNo=b.serviceRelation.branchNo; 
        var addressId=b.serviceRelation.addressId; 
        var addrDetail=b.serviceRelation.addrDetail;
		var parameter = "userId=" + c+ "&serviceKind=" + serviceKind+"&productId="+productId+
		"&branchNo="+branchNo+"&addressId="+addressId+"&addrDetail="+addrDetail+"&belongCode="+belongCode;

		var resultJsonStr = executeRequest("secondAcceptAjaxAction", "getChangeNumInfo", parameter);var cardId = "-1";

            
        var count="";
        var serviceId="";
        var productName="";
		try {
			var jsonResultObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
			if (jsonResultObj ) {
				productName=jsonResultObj.productName;
	            count=jsonResultObj.count;
	            belongCode=jsonResultObj.belongCode; 
	            if(count>0){
	            	if(confirm("\u662f\u5426\u9009\u62e9\u9884\u9009\u53f7\u7801\u4f5c\u4e3a\u65b0\u53f7\u7801")){
	            		serviceId=jsonResultObj.serviceId;
	            	}else{
						if(Me.$("adjustKind")){
							Me.hidden("adjustKind");
						}
						if(Me.$("adjustMonths")){
							Me.hidden("adjustMonths");
						}
						if(Me.$("adjustFee")){
							Me.hidden("adjustFee");
						}
						if(Me.$("beforehandFee")){
							Me.hidden("beforehandFee");
						}
	            		serviceId="";	            		
	            	}
	            }else{
	            	serviceId="";
	            }
			}
		}catch (e) {
			alert("\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u53d6\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7\u539f\u951f\u65a4\u62f7\u4e3a\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u6377\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7");
			return false;
		}
		if(!belongCode){
			Me.$("belongCode").innerHTML="";
		}else{
			Me.$("belongCode").innerHTML = belongCode;
		}
		if(!note){
			Me.$("note").innerHTML = "";
		}else{
			Me.$("note").innerHTML = note;
		}
		Me.$("productName").innerHTML = productName;
		Me.$("serviceId").value = serviceId;
		Me.getGoodNumInfo(serviceId);
	};
	Me.initCard();

	var inputElem = Me.$("serviceId");
	inputElem.parentNode.className  = "buscard-el buscard-inline-buttom buscard-combobox-ctn";
	var displayElem  = document.createElement("div");
	displayElem.className = "buscard-combobox-display-ctn";
	inputElem.parentNode.appendChild(displayElem);
	var linkElem = Me.$("link_serviceId");
	var preDefineOnclick = Me.$("link_serviceId").onclick;
	Me.$("link_serviceId").onclick = function () {
		var productId =b.productId;
		if(b.serviceRelation.serviceKind=="11"||b.serviceRelation.serviceKind=="55"){  //如果是XDSL新装
			var serviceIdElemRawList = document.getElementsByName("serviceId");
			var serviceIdElemList = BusCard.util.findAll(serviceIdElemRawList,function(elem){
				return (elem!=inputElem)&&(elem.controlFieldName =="serviceId")&&(elem.value!=null&&elem.value!="");
			});

			var serviceList = a.$remote("serviceRelationDAO").query({"customerId":parseInt(b.serviceRelation.customerId),"ifValid":1,"cityCode":b.serviceRelation.cityCode});
			var serviceRelaParamList = a.util.findAll(serviceList,function(vo){
				return vo.serviceKind ==10||vo.serviceKind == 8;
			});
			var valueParamList = a.util.map(serviceRelaParamList,function(vo){
				return {value:vo.serviceId};
			});
			if(valueParamList!=null&&valueParamList.length>0){
				Array.prototype.push.apply(serviceIdElemList,valueParamList);					
				/*
				 * 对收集到的数据集合去重
				 * */
				var len = serviceIdElemList.length;
				var resultList = [];
				var flagArray = [];
				for(var index=0;index<len;index++){
					if(flagArray[serviceIdElemList[index].value]!=1){
						resultList.push(serviceIdElemList[index]);
						flagArray[serviceIdElemList[index].value] = 1;        		
					}
				}
				
				if(resultList&&resultList.length>0){
					preDefineOnclick.apply(linkElem,[event||window.event]);				
				}
			}else{
			 Me.getChooseNumber();
			}
		}else{
			Me.getChooseNumber();
		}
	};
	
	
});