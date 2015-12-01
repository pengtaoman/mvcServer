BusCard.define('/buscardapp/rela/js/securityInfoModify.js',function(_buscard,cardParam){ 
	try { 
	/**
	 * 担保方式常量
	 */
	dojo.require("orderaccept.common.js.ConstantsPool");
	dojo.require("orderaccept.custom.TooltipDialog");
	dojo.require("orderaccept.custom.popup");
	var AssureMethodConst = orderaccept.common.js.ConstantsPool.load("AssureMethodConst").AssureMethodConst;
		var Me = this;
		Me.$('buscard-name').innerHTML = cardParam.prodOfferName + '\u62c5\u4fdd\u4fe1\u606f';
		var assureInfoVO = cardParam.assureInfo;
		if(assureInfoVO.securityMethodCd != null){
			Me.$('securityMethodCd').value = assureInfoVO.securityMethodCd;
			Me.$('securityMethodCd').disabled = true;
		}
		if(assureInfoVO.securityDesc != null){
			Me.$('securityDesc').value = assureInfoVO.securityDesc;
//			Me.$('securityDesc').disabled = true;
		}
		if(assureInfoVO.securityFee != null){
			Me.$('securityFee').value = parseFloat(parseFloat(assureInfoVO.securityFee)/100).toFixed(2);
			Me.$('securityFee').disabled = true;
		}else{
			Me.$('securityFee').value = parseFloat(0).toFixed(2);
			Me.$('securityFee').disabled = true;
		}
		if(assureInfoVO.securityDur != null){
			Me.$('securityDur').value = assureInfoVO.securityDur;
			Me.$('securityDur').disabled = true;
		}
		if(assureInfoVO.securityObjId != null){
			Me.$('securityObjId').value = assureInfoVO.securityObjId;
		}
		if(assureInfoVO.securityObjTypeCd != null){
			Me.$('securityObjTypeCd').value = assureInfoVO.securityObjTypeCd;
			Me.$('securityObjTypeCd').disabled = true;
		}else{
			if(assureInfoVO.securityMethodCd == AssureMethodConst.ASSURE_PRODUCT){
				Me.$('securityObjTypeCd').value = assureInfoVO.securityMethodCd;
				Me.$('securityObjTypeCd').disabled = true;
			}
			if(assureInfoVO.securityMethodCd == AssureMethodConst.ASSURE_ACCOUNT){
				Me.$('securityObjTypeCd').value = assureInfoVO.securityMethodCd;
				Me.$('securityObjTypeCd').disabled = true;
			}
			if(assureInfoVO.securityMethodCd == AssureMethodConst.ASSURE_CUST){
				Me.$('securityObjTypeCd').value = assureInfoVO.securityMethodCd;
				Me.$('securityObjTypeCd').disabled = true;
			}
		}
		if(assureInfoVO.prodOfferInstId != null){
			Me.$('prodOfferInstId').value = assureInfoVO.prodOfferInstId;
		}
		if(assureInfoVO.prodOfferInstAssureId != null){
			Me.$('prodOfferInstAssureId').value = assureInfoVO.prodOfferInstAssureId;
		}
		var assureAttrList = assureInfoVO.assureAttrList;
		var len = assureInfoVO.assureAttrList.length;
		for(var i = 0; i < len; i++){
			var assureAttrVO = assureAttrList[i];
//			if(assureInfoVO.securityObjId == null){
//					if(assureAttrVO.attrId == "50030" && !!(assureAttrVO.attrValue)){
//						Me.$('identityKind').value = assureAttrVO.attrValue;
//					}
//					if(assureAttrVO.attrId == "50031" && !!(assureAttrVO.attrValue)){
//						Me.$('identityCode').value = assureAttrVO.attrValue;
//					}
//			}else{
				if(assureInfoVO.securityMethodCd == AssureMethodConst.ASSURE_CASH || AssureMethodConst.ASSURE_PROMOTION){//现金担保 || 租机担保
					if(len == 3){
						Me.$('identityKind').style.display = "none";
						Me.$('identityKind').parentNode.previousSibling.style.display = "none";
						Me.$('identityCode').style.display = "none";
						Me.$('identityCode').parentNode.previousSibling.style.display = "none";
					}else{
						if(assureAttrVO.attrId == "50030" && !!(assureAttrVO.attrValue)){
							Me.$('identityKind').value = assureAttrVO.attrValue;
						}
						if(assureAttrVO.attrId == "50031" && !!(assureAttrVO.attrValue)){
							Me.$('identityCode').value = assureAttrVO.attrValue;
						}
					}
				}
				if(assureInfoVO.securityMethodCd == AssureMethodConst.ASSURE_PRODUCT){//产品担保
					if(assureAttrVO.attrId == "0" && !!(assureAttrVO.attrValue)){
						Me.$('securityServiceId').value = assureAttrVO.attrValue + "[" + assureInfoVO.securityObjId + "]";
					}
					Me.$("link_securityServiceId").onclick = function () {
					
						if(dijit.byId("queryView" + cardParam.subRowIndex)){
							dijit.byId("queryView" + cardParam.subRowIndex).destroy();
						}else{
							//添加查询表单
							var queryView = new orderaccept.custom.TooltipDialog({
								id : "queryView"+cardParam.subRowIndex
							});
							queryView.startup();
						    queryView.enableEvtMsgPropagation(queryView.domNode);
						    orderaccept.custom.popup.open({
						                widget : {
							                popup : queryView,
							                around : Me.$("link_securityServiceId")
						    	}
						    });
							initAssureInfo(Me,cardParam.subRowIndex,queryView,AssureMethodConst.ASSURE_PRODUCT);
						}
					};
				}
				if(assureInfoVO.securityMethodCd == AssureMethodConst.ASSURE_ACCOUNT){//账户担保
					if(assureAttrVO.attrId == "0" && !!(assureAttrVO.attrValue)){
						Me.$('securityAccountName').value = assureAttrVO.attrValue + "[" + assureInfoVO.securityObjId + "]";
					}
					Me.$("link_securityAccountName").onclick = function () {
					if(dijit.byId("queryView" + cardParam.subRowIndex)){
							dijit.byId("queryView" + cardParam.subRowIndex).destroy();
						}else{
						 //添加查询表单
						var queryView = new orderaccept.custom.TooltipDialog({
							id : "queryView"+cardParam.subRowIndex
						});
					    queryView.startup();
					    queryView.enableEvtMsgPropagation(queryView.domNode);
					    orderaccept.custom.popup.open({
					                widget : {
						                popup : queryView,
						                around : Me.$("link_securityAccountName")
					    	}
					    });
						initAssureInfo(Me,cardParam.subRowIndex,queryView,AssureMethodConst.ASSURE_ACCOUNT);
					}
					};
				}
				if(assureInfoVO.securityMethodCd == AssureMethodConst.ASSURE_CUST){//客户担保
					if(assureAttrVO.attrId == "0" && !!(assureAttrVO.attrValue)){
						Me.$('securityCustName').value = assureAttrVO.attrValue + "[" + assureInfoVO.securityObjId + "]";
					}
					Me.$("link_securityCustName").onclick = function () {
						if(dijit.byId("queryView" + cardParam.subRowIndex)){
							dijit.byId("queryView" + cardParam.subRowIndex).destroy();
						}else{
							 //添加查询表单
							var queryView = new orderaccept.custom.TooltipDialog({
								id : "queryView"+cardParam.subRowIndex
							});
							queryView.startup();
						    queryView.enableEvtMsgPropagation(queryView.domNode);
						    orderaccept.custom.popup.open({
						                widget : {
							                popup : queryView,
							                around : Me.$("link_securityCustName")
						    	}
						    });
							initAssureInfo(Me,cardParam.subRowIndex,queryView,AssureMethodConst.ASSURE_CUST);
						}
					};
				}
//			}
			if(assureAttrVO.attrId == "50032" && !!(assureAttrVO.attrValue)){
				Me.$('contactPhone').value = assureAttrVO.attrValue;
			}
			if(assureAttrVO.attrId == "50033" && !!(assureAttrVO.attrValue)){
				Me.$('contactAddress').value = assureAttrVO.attrValue;
			}
			/*
			if(assureAttrVO.attrId == "50035" && !!(assureAttrVO.attrValue)){
				Me.$('sercurityPersion').value = assureAttrVO.attrValue;
			}
			if(assureAttrVO.attrId == "50036" && !!(assureAttrVO.attrValue)){
				Me.$('sercurityPersionAddress').value = assureAttrVO.attrValue;
			}*/
		}
		/*
		var flag50035 = true;
		var flag50036 = true;
		for(var i = 0; i < len; i++){
			var assureAttrVO = assureAttrList[i];
			if(assureAttrVO.attrId == "50035"){
				flag50035 = false;
			}
			if(assureAttrVO.attrId == "50036"){
				flag50036 = false;
			}
		}
		if(flag50035){
			Me.$('sercurityPersion').style.display = "none";
			Me.$('sercurityPersion').parentNode.previousSibling.style.display = "none";
		}
		if(flag50036){
			Me.$('sercurityPersionAddress').style.display = "none";
			Me.$('sercurityPersionAddress').parentNode.previousSibling.style.display = "none";
		}*/
	}
	catch (e) {
		alert(e.message);
	}
});