BusCard.define('/buscardapp/rela/js/getPSTNNumberAndRes.js', function(_buscard, cardParam) {
	try {
		var Me = this;
		var a = arguments[0];
		var b = arguments[1];
		// for compatibility
		var executeRequest = _buscard.executeRequest;
		Me.productId = b.productId;
		Me.serviceOfferId = b.serviceOfferId;
		Me.uniqueId = b.uniqueId;
		var messageBox = dojo.require("orderaccept.common.dialog.MessageBox");
		
		// 母局,自局变更回调
		void function() {
			if (!Me.postBureauOrBranchNoChangeHandleList) {
				Me.postBureauOrBranchNoChangeHandleList = [];
			}
			Me.postBureauOrBranchNoChangeHandleList.push(function() {
				        var serviceIdElem = Me.$("serviceId");
				        var resInstIdElem = Me.$("resInstId");
				        serviceIdElem && (serviceIdElem.value = "");
				        resInstIdElem && (resInstIdElem.value = "");
				        
			        });
			Me.postBureauOrBranchNoChangeHandle = function() {
				var handleList = Me.postBureauOrBranchNoChangeHandleList || [];
				var length = handleList.length;
				for (var bindex = 0; bindex < length; bindex++) {
					try {
						handleList[bindex].apply(Me);
					}
					catch (e) {

					}
				}
			};
			
		}();
		
		/**
		 * 防止资源实例为空
		 */
		Me.addPreDataBuilderAspect(function(ignoreCheck){
			if(window.prodOfferAcceptLoader!=null){
				dojo.require("orderaccept.prodofferaccept.util");
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
				}else{
					return true;
				}
			}else{
				return true;
			}
		});
		
		Me.getBureauId = function() {
			var node = Me.$("bureauId");
			return node && node.value || b.serviceRelation && b.serviceRelation.bureauId || "";
		};
		Me.getbranchNo = function() {
			var node = Me.$("branchNo");
			return node && node.value || b.serviceRelation && b.serviceRelation.branchNo || "";
		};
		
		/**
		 * 获取交换局id
		 */
		Me.getSwitchno = function() {
		  if(!!dojo.getObject("prodOfferAcceptLoader")
		  		&&prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_"+Me.uniqueId].attrCardWidget
		  		&&prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_"+Me.uniqueId].attrCardWidget.busCardInstance)
		    {
			  var targetAttr =prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_"+Me.uniqueId].attrCardWidget.busCardInstance.$('60056');
				if(!!targetAttr)
				  {
				    return targetAttr.value;
				  }
				return "";
			}else{
				 var switchno="";
				 BusCard.each(BusCard.query("[controlFieldName]",$("prodAttrCardContainer")),function(node){
					if(node.id=='60056'){
					  switchno=node.value;
					}
				  }); 
	             if(switchno=="" && !!b.serviceRelation){    
				 var list=a.$remote("prodInstCommFacadeBO").getProdInstAttrByProperties({prodInstId:b.serviceRelation.userId ,cityCode:b.cityCode,attrId:'60056',stateCd:'109999'});
				    if(list&&list.length>0){
				      switchno=list[0].attrValue;
				    }
		         }
		         if(switchno=="" && !!Me.$("switchNo")){//预订单特殊处理
		         	switchno = Me.$("switchNo").value;
		         }
				if (dojo.getObject("prodOfferAcceptLoader") != null && 
							prodOfferAcceptLoader.declaredClass == "orderaccept.prodofferaccept.loader.PreAcceptOrderLoader") {
					var preAcceptOrderVO = prodOfferAcceptLoader.preAcceptOrderVO;
		         	switchno = preAcceptOrderVO.switchno;
				}
			    	return switchno; 
			}
		}; 
		
		if (Me.$("lanId")) {
			Me.cityCode = Me.$("lanId").value;
		} else {
			Me.cityCode = b.cityCode;
		}
		Me.getChooseNumber = function() {
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
					cdmaServiceIdElemList = ordermgr.accept.compnew._pstn_number_elem_list_;
				}
				catch (e) {}
				var B = {
					"ServiceIdInterface" : new ServiceIdInterface({
						        "$" : function(id) {
							        return Me.$(id)
						        }
					        }),
					"cdmaServiceIdElemList" : cdmaServiceIdElemList,
					"bureauId" : Me.getBureauId(),
					"branchNo" : Me.getbranchNo()
				};
				var container2 = BusCard.$session.container2;
				var workNo = BusCard.$session.workNo;
				var endpassword = BusCard.$session.PASSWORD;
				var noDept = BusCard.$session.acceptDealer;
				if (Me.$("lanId")) {
					Me.cityCode = Me.$("lanId").value;
				} else {
					Me.cityCode = b.cityCode;
				}
				var webPath = container2 + "resource/interfacemanage/selectno/SelectNoMain.jsp?STAFFNO=" + workNo
				        + "&PASSWORD=" + endpassword + "&noDept=" + noDept + "&cityCode=" + Me.cityCode + "&productId="
				        + Me.productId + "&sortId=2"+"&bureauId=" + Me.getBureauId() + "&branchNo=" + Me.getbranchNo()+ "&switchNo=" + Me.getSwitchno();
				Me.windowResourceServiceId = window.showModalDialog(webPath, B,
				        "DialogWidth:1000px;DialogHeight:600px;status:no;location:no");
			} else {
				var oServiceId = Me.$("serviceId");
				oServiceId.value = result;
				oServiceId.onblur();
				oServiceId.readOnly = true;
			}
		};
		
		Me.checkResource = function() {
			var E = Me.$("serviceId");
			var A = Me.$("serviceId").value;

			if (!A) { return true; }
			if (Me.serviceOfferId == 9) {
				var C = "serviceId=" + A + "&serviceOfferId=" + Me.serviceOfferId + "&productId=" + Me.productId
				        + "&bureauId=" + Me.getBureauId() + "&branchNo=" + Me.getbranchNo() + "&cityCode="
				        + Me.cityCode+ "&switchOfficeId=" + Me.getSwitchno();
			} else {
				var C = "serviceId=" + A + "&serviceOfferId=" + Me.serviceOfferId + "&productId=" + Me.productId
				        + "&bureauId=" + Me.getBureauId() + "&branchNo=" + Me.getbranchNo() + "&cityCode="
				        + Me.cityCode + "&switchOfficeId=" + Me.getSwitchno();
			}
			if (!!dojo.getObject("prodOfferAcceptLoader")
			        && prodOfferAcceptLoader.declaredClass == "orderaccept.prodofferaccept.loader.PreAcceptOrderLoader") {
				if (!!prodOfferAcceptLoader.preAcceptOrderVO.serviceId
				        && prodOfferAcceptLoader.preAcceptOrderVO.serviceId == A) {
					C += "&ignoreCheck=1"
				}
			}
			var D = executeRequest("prodOfferSaleAjaxAction", "checkResource", C);
			var B = executeAjaxResult(D);
			if (B == false) {
				Me.resetServiceId();
				return;
			}
			
			// 提示靓号信息
			B = B.split("&");
			if (B[1]){
				if(B[1]!="false") {
					alert(B[1]);
				}
			}
			if(!!B[2]){
				//如果混合放号标识是1则提示信息
				if(B[2]==1){
					var tips = "\u6df7\u5408\u653e\u53f7\u7528\u6237\u4e0d\u53ef\u4ee5\u52a0\u5165vpn,ivpn";
					orderaccept.common.dialog.MessageBox.alert({
			        	message:tips
			        });
				}
				//将混合放号的标识设置到页面上
		        if(Me.$("ifFixedNo")){
		        	Me.$("ifFixedNo").value = B[2];
		        }
			}
			Me.$("resInstId").value = B[0];
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
			var pstnServiceIdElemList = null;
			try {
				pstnServiceIdElemList = ordermgr.accept.compnew._pstn_number_elem_list_;
			}
			catch (e) {}
			var chooseServiceId = Me.$("serviceId").value;
			if (pstnServiceIdElemList) {
				var len = pstnServiceIdElemList.length;
				var count = 0;
				while (len--) {
					var current = pstnServiceIdElemList[len].service.value;
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
		Me.resetServiceId = function() {
			Me.$("serviceId").value = "";
		};
		
		Me.$("link_serviceId").onclick = function() {
			Me.getChooseNumber();
		};
		
		Me.$("serviceId").onblur = function() {
			Me.checkResource();
		};
		Me.$("serviceId").onkeypress = function() {
			return Me.returnBlank();
		};
		Me.$("serviceId").onpropertychange = function() {
			Me.checkSameServiceId();
		};
		
		/* handle same addr */
		BusCard.Namespace.create("ordermgr.accept.compnew");
		ordermgr.accept.compnew._pstn_number_elem_list_ = ordermgr.accept.compnew._pstn_number_elem_list_ || [];
		var serviceObj = {};
		serviceObj.service = Me.$("serviceId");
		serviceObj.productId = Me.productId;
		ordermgr.accept.compnew._pstn_number_elem_list_.push(serviceObj);
	}
	catch (e) {
		alert(e.message);
	}
});
