BusCard.define('/buscardapp/rela/js/card_129_10057.js', function(_buscard, cardParam) {
	var Me = this;
	var a = arguments[0];
	var b = arguments[1];
	Me.productId = b.productId;
	Me.cityCode = b.cityCode;
	Me.serviceOfferId = b.serviceOfferId;
	Me.uniqueId = b.uniqueId;
	Me.preCoopObj = {offerIdList:[],uimInstId:'',ifOrdered:false};
	// for compatibility
	var executeRequest = _buscard.executeRequest;
	var messageBox = dojo.require("orderaccept.common.dialog.MessageBox");
	var util = dojo.require("orderaccept.prodofferaccept.util");	
	// add by liuzhongwei start 20120611 检测是否为大客户集团和是否加入集团
	
	Me.checkIfBigGroup = function() {
		// var groupId=$("groupId").value;
		// if(groupId!=1){
		// alert("\u4e0d\u662f\u5927\u5ba2\u6237\u96c6\u56e2\uff0c\u4e0d\u80fd\u529e\u7406\u9ed1\u8393\u4e1a\u52a1");
		// Me.$("uimId").value = "";
		// return false;
		// }else{
		// 判断是否加入集团
		
		var prodOfferVO = $ac$.selectedMainProdOfferInfoVO;
		var feeType = prodOfferVO.feeType;
		if (feeType = 1200) {
			$("paymentModeCd").value = 1200;
			$("paymentModeCd").disabled = "true";
		} else {
			// alert("\u8ba2\u8d2d\u9ed1\u8393\u624b\u673a\u5957\u9910\uff0c\u4ed8\u8d39\u6a21\u5f0f\u5fc5\u987b\u4e3a\u540e\u4ed8\u8d39\u3002");
			messageBox.alert({
				        busiCode : "08410212"
			        });
			Me.$("uimId").value = "";
			$("paymentModeCd").disabled = false;
			return false;
		}
		// }
	};
	// 获取到黑莓的属性手机串号和手机实收价格并且赋值
	Me.setProdOfferProperties = function() {
		var resultJsonStr = null;
		try {
			var queryInfoObj = {
				"BIND_MOBILE_NO" : "0",
				"BIND_SUGGEST_PRICE" : "0"
			};
			var queryJsonInfo = BusCard.util.toJson(queryInfoObj);
			var parameter = "mktResId=" + Me.$("uimId").value;
			parameter += "&serviceOfferId=" + Me.serviceOfferId;
			parameter += "&mktResType=2";
			parameter += "&queryJsonInfo=" + queryJsonInfo;
			parameter += "&productId=" + Me.productId;
			resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getQueryResourceInfo", parameter);
			var jsonResultObj = (typeof resultJsonStr == 'string') ? eval("(" + resultJsonStr + ")") : resultJsonStr;
			if (jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1") {
				var mainProdOfferDetailWidget=null;
				//判断是不是自主版
				if(!!$ac$ &&(!!$ac$.selectedMainProdOfferInfoVO)&& (!!$ac$.selectedMainProdOfferInfoVO.bindType) &&($ac$.selectedMainProdOfferInfoVO.bindType==2)){
					var loader=dojo.getObject("prodOfferAcceptLoader");
					var providerMap = loader.multipleSubProdOfferHandler.subProdOfferOrderProviderMap;
					mainProdOfferDetailWidget = providerMap['subProdOfferTreeContainer' + Me.uniqueId].prodOfferInfoWidget.mainProdOfferDetailWidget;
				}else{
					if (dojo.getObject("prodOfferAcceptLoader.mainProdOfferDetailWidget.prodOfferAttrCard.busCardInstance")){
						mainProdOfferDetailWidget=prodOfferAcceptLoader.mainProdOfferDetailWidget;
					}
				}
				var phonePrice = mainProdOfferDetailWidget.prodOfferAttrCard.busCardInstance
				        .$("300014");
				if (phonePrice) {
					phonePrice.value = jsonResultObj.allId.BIND_SUGGEST_PRICE;
					// phonePrice.visible="false";
					phonePrice.style.display = "none";
					phonePrice.parentNode.previousSibling.style.display = "none";
				}
				var phoneNumber = mainProdOfferDetailWidget.prodOfferAttrCard.busCardInstance
				        .$("300013");
				if (phoneNumber) {
					phoneNumber.value = jsonResultObj.allId.BIND_MOBILE_NO;
				}
			}
		}
		catch (e) {
			throw new Error("\u83b7\u53d6\u9ed1\u8393\u4fe1\u606f\u9519\u8bef:" + resultJsonStr);
		}
	};
	
	Me.ifCanHeiMei = function() {
		var resultJsonStr = null;
		try {
			
			var prodOfferInfoVO = {};
			if ($ac$) {
				var prodOfferList = $ac$.get("prodOfferList" + Me.uniqueId);
				if (!prodOfferList) {
					prodOfferList = $ac$.get("prodOfferList");
				}
				prodOfferInfoVO = BusCard.find(prodOfferList || [], function(vo) {
					        return vo.prodOfferType == 1;
				        }) || {};
				
			}
			if (prodOfferInfoVO) {
				var resRelaList = prodOfferInfoVO.resRelaList;
				if (!resRelaList || !resRelaList.length) { return false; }
				
				var resIdList = [];
				for (var i = 0; i < resRelaList.length; i++) {
					resIdList.push(resRelaList[i].resourceKind);
				}
				var resId = resIdList.join("^");
				if (resId == "") {
					resId = "-1";
				}
				if (resId != "-1") {
					var validInfoObj = {
						"checkBlackberry" : resId
					};
					var validJsonInfo = BusCard.util.toJson(validInfoObj);
					var parameter = "mktResId=" + Me.$("uimId").value;
					parameter += "&serviceOfferId=" + Me.serviceOfferId;
					parameter += "&mktResType=2";
					parameter += "&productId=" + Me.productId;
					parameter += "&validJsonInfo=" + validJsonInfo;
					resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getValidResourceInfo", parameter);
					var jsonResultObj = (typeof resultJsonStr == 'string')
					        ? eval("(" + resultJsonStr + ")")
					        : resultJsonStr;
					if (jsonResultObj && jsonResultObj.flag) {
						if (jsonResultObj.flag == "-1") {
							// alert(jsonResultObj.message);
							messageBox.alert({
								        busiCode : "08410213",
								        infoList : [jsonResultObj.message]
							        });
							Me.$("uimId").value = "";
							return false;
						}
						// 黑莓流程
						if (jsonResultObj.flag == "99") {
							// 设置黑莓全局标识
							dojo.global.$appContext$.set("checkBlackberry", "99");
							Me.checkIfBigGroup();
							Me.setProdOfferProperties();
							
						}
					}
					
				}
				
			}
		}
		catch (e) {
			throw new Error("\u9ed1\u8393\u68c0\u6d4b\u9519\u8bef:" + e.message);
		}
	};
	
	// add by liuzhongwei end 2012061
	Me.$("label_writeCardBtn").innerHTML = "";
	
	Me.checkUim = function() {
		var E = Me.$("uimId");
		var A = Me.$("uimId").value;
		var serviceId = Me.$("serviceId").value;
		if (!A) { return true; }
		var ifCheckImsi = "1";
		if (!A || !serviceId) {
			ifCheckImsi = "0";
		}
		var C = "uimId=" + A + "&serviceOfferId=" + Me.serviceOfferId + "&productId=" + Me.productId + "&cityCode="
		        + Me.cityCode + "&serviceId=" + serviceId + "&checkImsi=" + ifCheckImsi;
		var D = executeRequest("prodOfferSaleAjaxAction", "checkUimResource", C);
		var B = executeAjaxResult(D);
		if (B == false) {
			Me.$("uimId").value = "";
			if (Me.$("serviceId").disabled == true) {
				Me.$("serviceId").value = "";
				Me.$("serviceId").disabled = false;
			}
			return;
		}
		Me.$("uimResInstId").value = B;
		if (Me.$("serviceId")) {
			var parameter = "objectId=" + A + "&serviceOfferId=" + Me.serviceOfferId + "&productId=" + Me.productId
			        + "&cityCode=" + Me.cityCode + "&getCoopFlag=UIM_COOP_FLAG";
			var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getCoopNumInfo", parameter);
			var resultJson = dojo.fromJson(resultJsonStr);
			if (!resultJson || resultJson.flag <= 0) { return; }
			//河北用户确认，预登陆用户可以选择非预配卡，此处添加开关:8881: 1:检测 ; 0:不检测
			var param = "&ServiceKind=8"+"&apply_event=-1"+"&infoId=8881";
			var result = util.ServiceFactory.getService("url:businessAcceptAction.do?method=getCityBusinessParamValue" + param);
			if (!!result && result == "1") {// 开关打开					
				if (resultJson.NUMBER == "-1" && !!Me.$("acceptSource") && Me.$("acceptSource").checked == true) {
					Me.$("uimId").value = "";
					messageBox.alert({
						        title : "\u63d0\u793a\u4fe1\u606f",
						        message : "\u9884\u767b\u5f55\u7528\u6237\u53ea\u80fd\u9009\u62e9\u9884\u914d\u53f7\u7801"
					        });
					return;
				}
			}
			if (!!Me.$("ifPreCoop")) {
				Me.$("ifPreCoop").value = !!resultJson.OPEN_STATUS ? resultJson.OPEN_STATUS : "";
			}
			if (resultJson.NUMBER != "-1") {// 预配卡
				if (Me.$("serviceId").value == "" || Me.$("serviceId").value != resultJson.NUMBER) {
					Me.$("serviceId").value = resultJson.NUMBER;
					Me.$("serviceId").onblur();
				}
			} else {// 非预配卡
				if (Me.$("serviceId").disabled == true) {
					Me.$("serviceId").value = "";
					Me.$("serviceId").disabled = false;
				}
			}
		}
		if (!!serviceId) {
			var parameter = "objectId=" + serviceId + "&serviceOfferId=" + Me.serviceOfferId + "&productId="
			        + Me.productId + "&cityCode=" + Me.cityCode + "&getCoopFlag=NO_COOP_FLAG";
			var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getCoopNumInfo", parameter);
			var resultJson = dojo.fromJson(resultJsonStr);
			if (!!resultJson || resultJson.flag <= 0) {
				if (resultJson.NUMBER != "-1" && serviceId != resultJson.NUMBER) {// 预配卡
					if (Me.$("uimId").value == "" || Me.$("uimId").value != resultJson.NUMBER) {
						MessageBox.confirm({
							message : "\u4e1a\u52a1\u53f7\u7801\u4e3a\u9884\u914d\u53f7\u7801\uff0c\u4f46\u4e0e\u5f53\u524dUIM\u5361\u53f7\u4e0d\u5339\u914d\uff0c\u662f\u5426\u4fdd\u7559\u9884\u914d\u5173\u7cfb?",
							onComplete : function(){
								return function(value) {
									if (value == true) {
										Me.$("serviceId").onblur();
									} else {
										Me.$("resInstId").value = "";
										Me.$("serviceId").value = "";
									}
								}
							}(),
							// 关闭右上角的"X"按钮时执行onComplete函数
							iconCloseComplete : false
						}, Me.$("serviceId"));
					}
				}
			}
		}
		
		if (Me.$("uimResInstId").value == "") {
			if (Me.$("uimId").value != "9999" && Me.$("uimId").value != "") {
				alert("\u8d44\u6e90\u5b9e\u4f8b\u4e3a\u7a7a");
				Me.$("uimId").value = "";
			}
		}
	};
	BusCard.addEventListener(Me.$("uimResInstId"),"propertychange",function(){
		Me.$("sourceName").innerHTML = "";
		if (Me.$("uimId").value != "" && Me.$("uimId").value != "9999") {
			var parameter = "&objectType=" + ConstantsPool.load("ResourceConst").ResourceConst.OBJECT_TYPE_NUMBER
			        + "&resourceType=" + ConstantsPool.load("ResourceConst").ResourceConst.RESOURCE_TYPE_SMART_CARD
			        + "&objectId=" + Me.$("uimId").value + "&cityCode=" + Me.cityCode;
			Me.$("sourceName").innerHTML = Me.getSourceName(parameter);
		}
	 	//调用PPM接口，返回可订购的可选包集合
		var uimResInstId = Me.$("uimResInstId").value;
		if(!(window.$ac$&&window.$ac$.get("orderChangeFlag"))&&dojo.getObject("prodOfferAcceptLoader.multipleSubProdOfferHandler")!=null){
			var _prodvider = prodOfferAcceptLoader.multipleSubProdOfferHandler.subProdOfferOrderProviderMap['subProdOfferTreeContainer'
				                + Me.getIfMultipleOffer()];
			if(!!_prodvider && !!uimResInstId){
				if(Me.preCoopObj.ifOrdered == false || Me.preCoopObj.uimInstId != uimResInstId){
					_prodvider.interFaceForCoopNum([]);
					//调用资源接口判断是否是预配的卡
					var coopJson = Me.checkIfCoopNum();
					var ifCoopNum = coopJson.UIM_COOP_FLAG;					
					if(ifCoopNum =='1'){						
						//调用PPM接口返回的可选包销售品，并且进行订购
						var prodOfferIdList = Me.getProdOfferListRel(coopJson.OTHER_INST_ID);
						_prodvider.interFaceForCoopNum(prodOfferIdList);						
						Me.preCoopObj.offerIdList = prodOfferIdList;
						Me.preCoopObj.uimInstId = uimResInstId;
						Me.preCoopObj.ifOrdered = true;
					}else{				
						Me.preCoopObj.offerIdList = [];
						Me.preCoopObj.uimInstId = uimResInstId;
						Me.preCoopObj.ifOrdered = false;
					}
				}		
			}
		}
		
	});
	
	/**
	 * 获取预配卡号关联的产品
	 */
	Me.getProdOfferListRel = function(uimResInstId){
		//由于取feeType比较麻烦，所以直接取prodOfferId
		var prodOfferId = null;
		if($ac$.selectedMainProdOfferInfoVO.bindType == 2){
			var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
    		var targetSelectMem = BusCard.find(selectedMemberProdOfferList||[],function(_data){
				return _data.uniqueId == Me.uniqueId;
			});
			prodOfferId = !!targetSelectMem?targetSelectMem.prodOfferId:-1;
		}else{
			prodOfferId = $ac$.selectedMainProdOfferInfoVO.prodOfferId;
		}
		var belongCode = function() {
	        try {
		        return prodOfferAcceptLoader.getBelongCode();
	        }
	        catch (e) {}
	    }();
		return util.ServiceFactory.getService(
            "url:orderDetailAction.do?method=getProdOfferForCoopNum&belongCode="
		                + (belongCode || "")+"&uimResInstId="+uimResInstId+ "&cityCode=" + Me.cityCode+"&prodOfferId="+prodOfferId);
	};
	
	/**
	 * 检测是e9自主版还是单套餐
	 */
	Me.getIfMultipleOffer = function(){
		if($ac$.selectedMainProdOfferInfoVO.bindType == 2){
			return Me.uniqueId;
		}else{
			return "";
		}
	};
	/**
	 * 判断是否是预配的号码
	 */
	Me.checkIfCoopNum = function(){
		var A = Me.$("uimId").value;
		var parameter = "objectId=" + A + "&serviceOfferId=" + Me.serviceOfferId + "&productId=" + Me.productId
		        + "&cityCode=" + Me.cityCode + "&getCoopFlag=UIM_COOP_FLAG";
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "doCheckIfCoopNum", parameter);
		var resultJson = dojo.fromJson(resultJsonStr);
		return resultJson.resourceInfo;
	};
	
	// 获取资源(ServiceID,UimID)所属代理商，在前台显示 add by wangying 2012-4-21
	Me.getSourceName = function(parameter) {
		var dealerName = executeRequest("prodOfferSaleAjaxAction", "getSourceName", parameter);
		return dealerName;
	};
	
	Me.$("uimId").onblur = function() {
		try {
			Me.checkUim();
			var returnValue = Me.$("uimResInstId").value;
			var valueArray = returnValue.split(",");
			var uimList = dojo.query("[id=uimId]", dojo.query(".main-prodoffer-table")[0]);
			dojo.forEach(uimList || [], function(oneUim) {
				        if (oneUim != Me.$("uimId") && valueArray[1] && valueArray[1] != "-1") {
					        oneUim.value = valueArray[1];
					        oneUim.disabled = true;
					        oneUim.onblur();
				        }
			        });
			Me.$("uimResInstId").value = valueArray[0];
			
			//获取uim卡的归属地域 -->局方确认校验去掉
			//Me.getUimBelongsInfo();
			
			if (Me.$("uimId").value != "" && Me.$("uimId").value != "9999") {
				var parameter = "&objectType=" + ConstantsPool.load("ResourceConst").ResourceConst.OBJECT_TYPE_NUMBER
				        + "&resourceType=" + ConstantsPool.load("ResourceConst").ResourceConst.RESOURCE_TYPE_SMART_CARD
				        + "&objectId=" + Me.$("uimId").value + "&cityCode=" + Me.cityCode;
				Me.$("sourceName").innerHTML = Me.getSourceName(parameter);
				// 检测是走黑莓流程还是正常流程
				//Me.ifCanHeiMei(); //delete by zhuguojun 20121231 辽宁老系统黑莓检测卡号相关的内容是在订单保存时检测的，并且不检测卡的绑定关系。所以在此处删除，由连旭在提交时增加规则
			}
		}
		catch (e) {
			throw new Error("\u5361\u68c0\u6d4b\u5931\u8d25:" + e.message);
		}
		
	};
	
	Me.getUimBelongsInfo = function(){
		if(Me.$("uimId").value!=""&&Me.$("uimId").value!="9999"){
			var queryInfoObj = {
				"UIM_KIND":"0",
				"BELONGS_TO" : "0"
			};
			var queryJsonInfo = BusCard.util.toJson(queryInfoObj);
			var parameter = "mktResId="+Me.$("uimId").value;
			parameter += "&serviceOfferId="+Me.serviceOfferId;	
			parameter += "&mktResType=2";
			parameter += "&queryJsonInfo="+queryJsonInfo;
			parameter += "&productId="+Me.productId;
			var resultJsonStr = executeRequest("prodOfferSaleAjaxAction","getQueryResourceInfo",parameter);
			var jsonResultObj =  (typeof resultJsonStr=='string')?eval("("+resultJsonStr+")"):resultJsonStr;
			if(jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1"){
				var uimBelongsTo = jsonResultObj.allId.BELONGS_TO;
				$ac$.set("belongsTO_"+Me.uniqueId,uimBelongsTo);
			}
		}
	};
	
	// 首次聚焦 判断是否有预选号 add by wangying 2012-5-7
	Me.$("serviceId").onfocus = function() {
		try {
			Me.getPreselectPhoneNo();
		}
		catch (e) {
			throw new Error("\u9884\u9009\u53f7\u5904\u7406\u9519\u8bef:" + e.message);
		}
		
	};
	
	// 判断是否有预选号 add by wangying 2012-4-26
	/**
	 * Me.getPreselectPhoneNo = function(){ var prodOfferAcceptLoader =
	 * dojo.getObject("prodOfferAcceptLoader"); var preselectPhoneNo =
	 * prodOfferAcceptLoader.requestParam.preselectPhoneNo;
	 * if(preselectPhoneNo!="" && preselectPhoneNo!=undefined){
	 * Me.$("serviceId").value = preselectPhoneNo;
	 * Me.$("serviceId").readOnly = "readonly";
	 * Me.$("link_serviceId").disabled = true; }
	 * prodOfferAcceptLoader.requestParam.preselectPhoneNo = ""; };
	 */
	Me.getPreselectPhoneNo = function() {
		var prodOfferAcceptLoader = dojo.getObject("prodOfferAcceptLoader");
		var preAcceptFlag = prodOfferAcceptLoader.requestParam.preAcceptFlag;
		var preselectPhoneNoSelected = prodOfferAcceptLoader.requestParam.preselectPhoneNoSelected;
		if (preAcceptFlag != 1 && preselectPhoneNoSelected != 1) {// 非预受理
			// 且
			// 未提示过
			// 是否有预选号
			// 不知道identityKind 和 identityCode 从何而来,暂时处理保证程序不报错/modify
			// by yusong
			var identityKind = prodOfferAcceptLoader.requestParam.identityKind;
			var identityCode = prodOfferAcceptLoader.requestParam.identityCode;
			if (!(identityKind && identityCode)) { return false; }
			var para = "&identityKind=" + identityKind + "&identityCode=" + identityCode;
			var resultJsonStr = executeRequest("newCustRecognitionAction", "getPreselectPhone", para);
			try {
				var jsonResultObj = (typeof resultJsonStr == "string")
				        ? eval("(" + resultJsonStr + ")")
				        : resultJsonStr;
				if (jsonResultObj) {
					prodOfferAcceptLoader.requestParam.preselectPhoneNoSelected = "1";
					var count = jsonResultObj.count;
					if (count > 0) {
						if (confirm("\u662f\u5426\u9009\u62e9\u9884\u9009\u53f7\u7801\u4f5c\u4e3a\u65b0\u53f7\u7801")) {
							Me.$("serviceId").value = jsonResultObj.serviceId;
						}
					}
				}
			}
			catch (e) {
				// alert(e.message);
				messageBox.alert({
					        busiCode : "08410213",
					        infoList : [e.message]
				        });
				
			}
		}
	};
	
	Me.getPreselectPhoneNo();
	
});
