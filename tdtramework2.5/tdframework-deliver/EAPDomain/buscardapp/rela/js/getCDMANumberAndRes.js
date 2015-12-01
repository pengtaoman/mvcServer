BusCard.define('/buscardapp/rela/js/getCDMANumberAndRes.js', function(_buscard, cardParam) {
	try {
		var Me = this;
		var a = arguments[0];
		var b = arguments[1];
		// for compatibility
		var executeRequest = _buscard.executeRequest;
		Me.productId = b.productId;
		Me.cityCode = b.cityCode;
		Me.serviceOfferId = b.serviceOfferId;
		Me.uniqueId = b.uniqueId;
		var messageBox = dojo.require("orderaccept.common.dialog.MessageBox");
		
		/**
		 * 防止资源实例为空
		 */
		Me.addPreDataBuilderAspect(function(ignoreCheck){
			if(window.prodOfferAcceptLoader!=null){
				dojo.require("orderaccept.prodofferaccept.util");
				//如果有值，则不进行检测，直接返回
				if(Me.serviceOfferId == prodOfferAcceptLoader
				                .getServiceOfferConfigVO(orderaccept.prodofferaccept.util.ACTION_CD_CONST.PRODUCT_INSTALL).serviceOfferId){
				
					if(!!ignoreCheck){
						return true;
					}
					var resInstNode = Me.$('resInstId');
					var serviceIdNode = Me.$('serviceId');
					if(resInstNode&&resInstNode.value==""&&serviceIdNode&&serviceIdNode.value!=""){
						//throw new Error("号码"+Me.$('serviceId').value+"资源实例不存在");
						messageBox.alert({
				        	message:"\u53f7\u7801"+Me.$('serviceId').value+"\u8d44\u6e90\u5b9e\u4f8b\u4e0d\u5b58\u5728,\u8bf7\u6838\u67e5\u9009\u62e9\u53f7\u7801\u7684\u6570\u636e\u4fe1\u606f"
				        });
						return false;
					}
					var serviceKindList = BusCard.$remote("productToServiceDAO").query({productId:Me.productId});
					if(serviceKindList&&serviceKindList.length>0){
						if(serviceKindList[0].netType!=70){
							var uimIdNode = Me.$('uimId');
							var uimResInstNode = Me.$('uimResInstId');
							if(uimResInstNode&&uimResInstNode.value==""&&uimIdNode&&uimIdNode.value!=""){
								//throw new Error("卡号"+Me.$('uimId').value+"资源实例不存在");
								messageBox.alert({
						        	message:"\u5361\u53f7"+Me.$('uimId').value+"\u8d44\u6e90\u5b9e\u4f8b\u4e0d\u5b58\u5728,\u8bf7\u6838\u67e5\u9009\u62e9\u5361\u53f7\u7684\u6570\u636e\u4fe1\u606f"
						        });
								return false;
							}
						}else{
							return true;
						}
					}
                }else{
                	return true;
                }
			}else{
				return true;
			}
		});
		
		//获取卡号归属并进行老系统代理商和受理点的处理
		Me.dealOldAgentSourceId=function(){
			//需要从资源组获取的参数	
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
				uimDealer=jsonResultObj.allId.BELONGS_TO;	
				//老系统代理商和受理点信息处理
				$("sourceId").value=jsonResultObj.allId.BELONGS_TO;	
			}	
		}
		
		
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
		
		
		
		
		
		
		
		
		
		// add by liuzhongwie start 20120613 给虚号码赋值
		Me.checkIfVirtual = function() {
			var queryInfoObj = {
				"IF_VIRTUAL" : "0"
			};
			var queryJsonInfo = BusCard.util.toJson(queryInfoObj);
			var parameter = "mktResId=" + Me.$("serviceId").value;
			parameter += "&serviceOfferId=" + Me.serviceOfferId;
			parameter += "&mktResType=1";
			parameter += "&queryJsonInfo=" + queryJsonInfo;
			parameter += "&productId=" + Me.productId;
			var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getQueryResourceInfo", parameter);
			var jsonResultObj = (typeof resultJsonStr == 'string') ? eval("(" + resultJsonStr + ")") : resultJsonStr;
			if (jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1") {
				
				if (jsonResultObj.allId.IF_VIRTUAL == "1") {
					if (_buscard.$("100690")) {
						_buscard.$("100690").value = 1;
						_buscard.$("100690").checked = true;
					}
					// 如果为虚号码，给uimid赋值9999
					Me.$("uimId").value = "9999";
					Me.$("uimId").disabled = true;
				} else {
					if (_buscard.$("100690")) {
						_buscard.$("100690").value = 0;
						_buscard.$("100690").checked = false;
					}
					
				}
			}
		}
		// add by liuzhongwei end 20120613
		Me.cardTypeFillValue = function() {
			var queryInfoObj = {
				"IF_GC_CARD" : "0"
			};
			var queryJsonInfo = BusCard.util.toJson(queryInfoObj);
			var param = "mktResType=2&mktResId=" + Me.$("uimId").value + "&productId=" + Me.productId
			        + "&serviceOfferId=" + Me.serviceOfferId + "&queryJsonInfo=" + queryJsonInfo;
			var resultJsonStr = executeRequest('prodOfferSaleAjaxAction', 'getQueryResourceInfo', param);
			var jsonResultObj = (typeof resultJsonStr == 'string') ? eval("(" + resultJsonStr + ")") : resultJsonStr;
			//modify by shanpa begin
			if(prodOfferAcceptLoader&&prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_"+Me.uniqueId].attrCardWidget.busCardInstance){
				var targetAttr =prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_"+Me.uniqueId].attrCardWidget.busCardInstance.$('300001');
				if(!!targetAttr){
					if (jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1") {
						targetAttr.value = jsonResultObj.allId.IF_GC_CARD;
					} else {
						targetAttr.value = "";
					}
				}
			}
			//modify by shanpa end
//			if (!!$("300001")) {
//				if (jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1") {
//					$("300001").value = jsonResultObj.allId.IF_GC_CARD;
//				} else {
//					attrCard.$("300001").value = "";
//				}
//			}
		}
		// add by liuzhongwei end 20120613
		
		Me.checkResource = function() {
			var E = Me.$("serviceId");
			var A = Me.$("serviceId").value;
			if (!A) { return true; }
			var C = "serviceId=" + A + "&serviceOfferId=" + Me.serviceOfferId + "&productId=" + Me.productId
			        + "&cityCode=" + Me.cityCode;
			if (!!dojo.getObject("prodOfferAcceptLoader")
			        && prodOfferAcceptLoader.declaredClass == "orderaccept.prodofferaccept.loader.PreAcceptOrderLoader") {
				if (!!prodOfferAcceptLoader.preAcceptOrderVO.serviceId
				        && prodOfferAcceptLoader.preAcceptOrderVO.serviceId == A) {
					C += "&ignoreCheck=1"
				}
			}
			var D = executeRequest("prodOfferSaleAjaxAction", "checkResourceDealerInfo", C);
			
			var B = executeAjaxResult(D);
			if (B == false) {
				Me.resetServiceId();
				if (Me.$("uimId").disabled == true) {
					Me.$("uimId").value = "";
					Me.$("uimId").disabled = false;
				}
				return;
			}
			
			// 提示靓号信息
			B = B.split("&");
			if (B[1]) {
				// alert(B[1]);
				if(B[1]!="false") {
					messageBox.alert({
						        busiCode : "08410215",
						        infoList : [B[1]]
					        });
					}
			}
			
			Me.$("resInstId").value = B[0];
			if (Me.$("uimId")) {
				var parameter = "objectId=" + A + "&serviceOfferId=" + Me.serviceOfferId + "&productId=" + Me.productId
				        + "&cityCode=" + Me.cityCode + "&getCoopFlag=NO_COOP_FLAG";
				var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getCoopNumInfo", parameter);
				var resultJson = dojo.fromJson(resultJsonStr);
				if (!resultJson || resultJson.flag <= 0) { return; }
				if (!!Me.$("ifPreCoop")) {
					Me.$("ifPreCoop").value = !!resultJson.OPEN_STATUS ? resultJson.OPEN_STATUS : "";
				}
				if (resultJson.NUMBER != "-1") {// 预配卡
					if (Me.$("uimId").value == "" || Me.$("uimId").value != resultJson.NUMBER) {
						Me.$("uimId").value = resultJson.NUMBER;
						Me.$("uimId").onblur();
						// Me.$("uimId").disabled = true;
					} else {
						Me.cardTypeFillValue();
						//Me.ifCanHeiMei(); //delete by zhuguojun 20121231 辽宁老系统黑莓检测卡号相关的内容是在订单保存时检测的，并且不检测卡的绑定关系。所以在此处删除，由连旭在提交时增加规则
						Me.dealOldAgentSourceId();
					}
				} else {// 非预配卡
					if (Me.$("uimId").disabled == true) {
						Me.$("uimId").value = "";
						Me.$("uimId").disabled = false;
					}
				}
			}
			if (!!Me.$("uimId") && !!Me.$("uimId").value) {
				var parameter = "objectId=" + Me.$("uimId").value + "&serviceOfferId=" + Me.serviceOfferId
				        + "&productId=" + Me.productId + "&cityCode=" + Me.cityCode + "&getCoopFlag=UIM_COOP_FLAG";
				var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getCoopNumInfo", parameter);
				var resultJson = dojo.fromJson(resultJsonStr);
				if (!!resultJson || resultJson.flag <= 0) {
					if (resultJson.NUMBER != "-1" && serviceId != resultJson.NUMBER) {// 预配卡
						if (Me.$("serviceId").value == "" || Me.$("serviceId").value != resultJson.NUMBER) {
							MessageBox.confirm({
								message : "UIM\u5361\u53f7\u4e3a\u9884\u914d\u5361\uff0c\u4f46\u4e0e\u5f53\u524d\u4e1a\u52a1\u4e0d\u5339\u914d\uff0c\u662f\u5426\u4fdd\u7559\u9884\u914d\u5173\u7cfb?",
								onComplete : function(){
									return function(value) {
										if (value == true) {
											Me.$("serviceId").value = "";
											Me.$("uimId").onblur();
											!!Me.checkUim ? Me.checkUim() : null;
										} else {
											Me.$("uimResInstId").value = "";
											Me.$("uimId").value = "";
										}
									}
								}(),
								// 关闭右上角的"X"按钮时执行onComplete函数
								iconCloseComplete : false
							}, Me.$("uimId"));
						}
					}
				}
			}
		};
		Me.getChooseNumber = function() {
			// 首次选择 判断是否有预选号 add by wangying 2012-5-7
			if (Me.getPreselectPhoneNo()) {
				// 执行Me.$("serviceId").onblur的方法
				Me.checkResource();
				Me.getProdOfferInfoListByInstId();
				return;
			}
			var productId = Me.productId;
			var parameter = "productId=" + productId;
			var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getFixedNumber", parameter);
			var result = "-1";
			try {
				var jsonResultObj = (typeof resultJsonStr == "string")
				        ? eval("(" + resultJsonStr + ")")
				        : resultJsonStr;
				if (jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1") {
					result = jsonResultObj.message;
				}
			}
			catch (e) {
				alert("\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u53d6\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7\u539f\u951f\u65a4\u62f7\u4e3a\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u6377\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7");
				return false;
			}
			if (result == "-1") {
				var cdmaServiceIdElemList = null;
				try {
					cdmaServiceIdElemList = ordermgr.accept.compnew._cdma_number_elem_list_;
				}
				catch (e) {}
				var B = {
					"ServiceIdInterface" : new ServiceIdInterface({
						        "$" : function(id) {
							        return Me.$(id)
						        }
					        }),
					"cdmaServiceIdElemList" : cdmaServiceIdElemList
				};
				var container2 = BusCard.$session.container2;
				var workNo = BusCard.$session.workNo;
				var endpassword = BusCard.$session.PASSWORD;
				var noDept = BusCard.$session.acceptDealer;
				var webPath = container2 + "resource/interfacemanage/selectno/SelectNoMain.jsp?STAFFNO=" + workNo
				        + "&PASSWORD=" + endpassword + "&noDept=" + noDept + "&cityCode=" + Me.cityCode + "&productId="
				        + Me.productId + "&sortId=1";
				Me.windowResourceServiceId = window.showModalDialog(webPath, B,
				        "DialogWidth:1024px;DialogHeight:768px;status:no;location:no");
			} else {
				var oServiceId = Me.$("serviceId");
				oServiceId.value = result;
				oServiceId.onblur();
				oServiceId.readOnly = true;
			}
			if (Me.$("serviceId").value != "") {
				Me.checkIfVirtual();
				Me.checkResource();
				
			}
			
		};
		Me.resetServiceId = function() {
			Me.$("serviceId").value = "";
		};
		Me.returnBlank = function() {
			var A = (navigator.appname == "Netscape") ? event.which : event.keyCode;
			if (A != 32) {
				return true;
			} else {
				return false;
			}
		};
		Me.checkSameServiceId = function() {
			var cdmaServiceIdElemList = null;
			try {
				cdmaServiceIdElemList = ordermgr.accept.compnew._cdma_number_elem_list_;
			}
			catch (e) {}
			var chooseServiceId = Me.$("serviceId").value;
			if (cdmaServiceIdElemList) {
				var len = cdmaServiceIdElemList.length;
				var count = 0;
				while (len--) {
					var current = cdmaServiceIdElemList[len].service.value;
					if (current.length > 0 && chooseServiceId == current) {
						count++;
					}
				}
				if (count > 1) {
					alert("\u8be5\u4e1a\u52a1\u53f7\u7801\u5df2\u9009\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9\uff01");
					Me.$("serviceId").value = "";
					Me.$("resInstId").value = "";
				}
			}
		};
		Me.$("link_serviceId").onclick = function() {
			try {
				Me.getChooseNumber();
			}
			catch (e) {
				throw new Error("\u9009\u53f7\u9519\u8bef:" + e.message);
			}
			
		};
		
		// 获取资源(ServiceID,UimID)所属代理商，在前台显示 add by wangying 2012-4-21
		Me.getSourceName = function(parameter) {
			var dealerName = executeRequest("prodOfferSaleAjaxAction", "getSourceName", parameter);
			return dealerName;
		};
		
		Me.$("serviceId").onblur = function() {
			Me.checkResource();
			Me.checkIfVirtual();
			Me.getProdOfferInfoListByInstId();
			Me.getDefaultPassWord();
			
			// add by xupeng 20120617 获取号码所属代理商 begin
			/*var parameter = "&objectType=" + ConstantsPool.load("ResourceConst").ResourceConst.OBJECT_TYPE_NUMBER
			        + "&resourceType=" + ConstantsPool.load("ResourceConst").ResourceConst.RESOURCE_TYPE_NUMBER
			        + "&objectId=" + Me.$("serviceId").value + "&cityCode=" + Me.cityCode + "&productId="
			        + Me.productId;
			Me.$("sourceName").innerHTML = Me.getSourceName(parameter);*/
			// add by xupeng 20120617 获取号码所属代理商 end
		};
		Me.getDefaultPassWord = function(){
			if(Me.$("serviceId").value!=""){
				var defaultPassWord = Me.$("serviceId").value.substr(Me.$("serviceId").value.length-6);
				Me.$("password").value = defaultPassWord;
				Me.$("passwordConfirm").value = defaultPassWord;
			}
		}
		
		Me.$("serviceId").onkeypress = function() {
			return Me.returnBlank();
		}
		Me.$("serviceId").onpropertychange = function() {
			Me.checkSameServiceId();
		};
		BusCard.Namespace.create("ordermgr.accept.compnew");
		ordermgr.accept.compnew._cdma_number_elem_list_ = ordermgr.accept.compnew._cdma_number_elem_list_ || [];
		var serviceObj = {};
		serviceObj.service = Me.$("serviceId");
		serviceObj.productId = Me.productId;
		ordermgr.accept.compnew._cdma_number_elem_list_.push(serviceObj);
		
		Me.getProdOfferInfoListByInstId = function() {
			var serviceInfoNewBuilder = Me.serviceInfoNewBuilder;
			if (!(serviceInfoNewBuilder && serviceInfoNewBuilder.subProductBuilder)) { return; }
			var subProductBuilder = serviceInfoNewBuilder.subProductBuilder;
			var productList = subProductBuilder.productList;
			var instSId = Me.$("resInstId").value;
			var mktResInterfaceBO = a.$remote("mktResInterfaceBO");
			var queryList = [];
			queryList.push("COOP_PRODUCTS");
			var resourceInfo = mktResInterfaceBO.getResourceInfo(Me.cityCode, 1, 1, instSId, "", null, Me.productId, 0,
			        queryList);
			var prodIdList = resourceInfo["COOP_PRODUCTS"];
			var productIdFromResList = [];
			if (prodIdList) {
				var doc = BusCard.xml.XMLoader.loadXML(prodIdList);
				if (doc.documentElement) {
					var productIdList = doc.documentElement.getElementsByTagName("productId") || [];
					Array.prototype.push.apply(productIdFromResList, BusCard.map(productIdList, function(node) {
						                return node.text;
					                }));
				}
			}
			BusCard.each(productIdFromResList, function(productId) {
				        var existFlag = BusCard.exist(productList, function(vo) {
					                return vo.productId == productId;
				                });
				        if (!existFlag) {
					        var result = BusCard.doGet(BusCard.path.contextPath + "/orderDetailAction.do", {
						                method : 'getProductDetail',
						                productId : productId
					                });
					        productList[productId] = result;
				        }
				        
			        });
			Me.productIdFromResList = productIdFromResList;
			subProductBuilder.showProductDetail();
			
		};
		
		Me.getPreselectPhoneNo = function() {
			var prodOfferAcceptLoader = dojo.getObject("prodOfferAcceptLoader");
			var preAcceptFlag = prodOfferAcceptLoader.requestParam.preAcceptFlag;
			var preselectPhoneNoSelected = prodOfferAcceptLoader.requestParam.preselectPhoneNoSelected;
			if (preAcceptFlag != 1 && preselectPhoneNoSelected != 1) {// 非预受理
				var identityKind = $ac$.requestParam.customerData.identityKind ;
                var identityCode = $ac$.requestParam.customerData.identityCode;
				if (!(identityKind && identityCode)) { return false; } 
				// 且
				// 未提示过
				// 是否有预选号
				var para = "&identityKind=" + identityKind + "&identityCode="
				        + identityCode;
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
								return true;
							} else {
								return false;
							}
						}
					}
				}
				catch (e) {
					alert(e.message);
					return false;
				}
			}
		};
	}  
	catch (e) {
		alert(e.message);
		
	}
	
});
