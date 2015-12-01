BusCard.define('/buscardapp/rela/js/subAccNbrHandler.js',function(_buscard,cardParam){ 
	var Me = this;
	dojo.require("orderaccept.prodofferaccept.util");
	var customerData =function(){
		return dojo.global.$appContext$.get("requestParam").customerData;
	}();
	var custId = customerData.custId;
	
	var tempNbrInfoList = [];
	var instNbrInfoLit = [];
	if(!dojo.global.$appContext$.get("pstnPlusCdmaNbrMap")){
		// 在途的号码
		var tempPstnInfoList = BusCard.$remote("accessProdItemInfoDAO").selectByProperties({customerId:custId,serviceOfferId:301,serviceKind:10});
		var tempCdmaInfoList =BusCard.$remote("accessProdItemInfoDAO").selectByProperties({customerId:custId,serviceOfferId:301,serviceKind:8});
		// 实例号码
		var instPstnInfoList = BusCard.$remote("serviceRelationDAO").query({customerId:custId,serviceKind:10,ifValue:1});
		var instCdmaInfoList = BusCard.$remote("serviceRelationDAO").query({customerId:custId,serviceKind:8,ifValue:1});
		
		//合并临时号码到一个集合中
		Array.prototype.push.apply(tempNbrInfoList,tempPstnInfoList);
		Array.prototype.push.apply(tempNbrInfoList,tempCdmaInfoList);
		
		//合并实例号码到一个集合中
		Array.prototype.push.apply(instNbrInfoLit,instPstnInfoList);
		Array.prototype.push.apply(instNbrInfoLit,instCdmaInfoList);
		var pstnPlusCdmaNbrMap = {};
		pstnPlusCdmaNbrMap.tempNbrInfoList = tempNbrInfoList;
		pstnPlusCdmaNbrMap.instNbrInfoLit = instNbrInfoLit;
		dojo.global.$appContext$.set("pstnPlusCdmaNbrMap",pstnPlusCdmaNbrMap);
	}else{
		tempNbrInfoList = dojo.global.$appContext$.get("pstnPlusCdmaNbrMap").tempNbrInfoList;
		instNbrInfoLit = dojo.global.$appContext$.get("pstnPlusCdmaNbrMap").instNbrInfoLit;
	}
	
	
	/**
	 * 获取页面上的接入类产品号码
	 */
	Me.getAccessServiceIdList =  function(){
		var currentNbrInfoList = [];
		try{
			if(!prodOfferAcceptLoader){
				return currentNbrInfoList;
			}
		}catch(e){
			return currentNbrInfoList;
		}
		if(prodOfferAcceptLoader.mainProdOfferWidget == null){
			return currentNbrInfoList;
		}
		var trs = dojo.query(".main-product-basic", prodOfferAcceptLoader.mainProdOfferWidget.domNode);
		dojo.forEach(trs,function(prodBasicTr){
			var obj = {};
			var viewId = dojo.attr(prodBasicTr, "viewId");
			obj.serviceId = dojo.query(".serviceId-" + viewId, prodBasicTr)[0].value;
			obj.uniqueId = dojo.attr(prodBasicTr, "uniqueId");
			obj.serviceKind = dojo.attr(prodBasicTr, "serviceKind");
			obj.serviceKindIndex = dojo.attr(prodBasicTr, "serviceKindIndex");
			obj.productId = dojo.attr(prodBasicTr, "productId") || "-1",
			currentNbrInfoList.push(obj);
			if(obj.productId == Me.productId){
				Me.serviceKind = obj.serviceKind;
			}
		});
		return currentNbrInfoList;
//		if(!!Me.serviceKind&&Me.serviceKind == 11){
//			return currentNbrInfoList;
//		//生成管理账号时，没有产品id
//		}else if(!Me.productId){
//			return currentNbrInfoList;
//		}else{
//			return dojo.filter(currentNbrInfoList||[], function(nbrInfo){
//				return nbrInfo.serviceKind != 11;
//			});
//		}
		
	};
	/**
	 * 加载选择号码页面
	 */
	Me.$("accountNbrChoose").onload = function(){
		Me.nbrUniqueId = orderaccept.prodofferaccept.util.CommUtils.generateUniqueId();
		var popWinTp  = BusCard.Template.create("<div id='nbr_selected_ctn'>\
	        		<fieldset  id='inst_nbr_fieldset'><legend>实例号码</legend><div id='inst_nbr_div'>#{instItemList}</div></fieldset>			\
					<fieldset id='temp_nbr_fieldset'><legend>在途号码</legend><div id='temp_nbr_div'>#{tempItemList}</div></fieldset>			\
					<fieldset id='current_nbr_fieldset'><legend>当前受理号码</legend><div id='current_nbr_div'>#{currentItemList}</div></fieldset>			\
	        		</div>");
		var itemTp = BusCard.Template.create("<input type='checkbox' name='accServiceId-#{uniqueId}' targetUniqueId='#{targetUniqueId}' value='#{serviceId}' serviceId='#{serviceId}' sourceFlag='#{sourceFlag}' prodInstId ='#{prodInstId}' serviceKind='#{serviceKind}' serviceKindIndex='#{serviceKindIndex}'><span style='margin-right:5px'>#{serviceId}</span>");
		//循环实例号码，生成带有产品实例号码的复选框的代码
		var instItemList =BusCard.map(instNbrInfoLit,function(info){
			return itemTp.apply({
			serviceKind:info.serviceKind,
			sourceFlag:1,
			prodInstId : info.userId,
			serviceId:info.serviceId,
			uniqueId : Me.nbrUniqueId
			});
		
		}).join("");
		//循环在途号码，生成带有在途号码的复选框的代码
		var tempItemList =BusCard.map(tempNbrInfoList,function(info){
			return itemTp.apply({
			serviceKind:info.serviceKind,
			sourceFlag:2,
			prodInstId : info.userId,
			serviceId:info.serviceId,
			uniqueId :Me.nbrUniqueId
			});
		
		}).join("");
		//循环当前号码，生成带有当前号码的复选框的代码
		var currentNbrInfoList = Me.getAccessServiceIdList();
		var currentItemList =BusCard.map(currentNbrInfoList||[],function(info){
			return itemTp.apply({
			serviceKind:info.serviceKind,
			sourceFlag:3,
			serviceId:info.serviceId,
			serviceKindIndex:info.serviceKindIndex,
			uniqueId :Me.nbrUniqueId,
			targetUniqueId : info.uniqueId
			});
		
		}).join("");
		
		var accountNbrHtml = popWinTp.apply({
		instItemList:instItemList,
		tempItemList:tempItemList,
		currentItemList:currentItemList
		});
		
		this.innerHTML = accountNbrHtml;
		Me.doGetAccNbrSameProductId();
		Me.selectAcctNbr();
	};
	
	Me.$("accountNbrChoose").collectData = function(cardInstance, _buscard, cardInfo) {
		var data = [];
		var radioboxList = this.getElementsByTagName("input");
		_buscard.util.each(radioboxList, function(dom) {
					if (dom.type && dom.type.toUpperCase() == 'CHECKBOX' && dom.checked) {
						var obj = {};
						obj.serviceId = dom.getAttribute("serviceId");
						obj.sourceFlag = dom.getAttribute("sourceFlag");
						obj.uniqueId = dom.getAttribute("targetUniqueId");
						obj.prodInstId = dom.getAttribute("prodInstId");
						obj.serviceKind = dom.getAttribute("serviceKind");
						obj.serviceKindIndex = dom.getAttribute("serviceKindIndex");
						data.push(obj);
					}
				});
		return data;
	};
	
	//动态更新当前受理的号码
	dojo.connect(Me.$("accountNbrChoose"),"click",function(){
		var itemTp = BusCard.Template.create("<input type='checkbox' name='accServiceId-#{uniqueId}' targetUniqueId='#{targetUniqueId}' value='#{serviceId}' serviceId='#{serviceId}' sourceFlag='#{sourceFlag}' prodInstId ='#{prodInstId}' serviceKind='#{serviceKind}' serviceKindIndex='#{serviceKindIndex}'><span style='margin-right:5px'>#{serviceId}</span>");
		var currentNbrInfoList = Me.getAccessServiceIdList();
		var currentItemList =BusCard.map(currentNbrInfoList||[],function(info){
			return itemTp.apply({
			serviceKind:info.serviceKind,
			sourceFlag:3,
			serviceId:info.serviceId,
			serviceKindIndex:info.serviceKindIndex,
			uniqueId : Me.nbrUniqueId,
			targetUniqueId : info.uniqueId
			});
		}).join("");
		Me.$("current_nbr_div").innerHTML = currentItemList;
		Me.selectAcctNbr();
		
	});
	/**
	 * 选中账号信息
	 */
	Me.selectAcctNbr =  function(){
		var accServiceIdInputs = dojo.query("[name=accServiceId-"+Me.nbrUniqueId+"]",dojo.query('#nbr_selected_ctn',Me.dom)[0]);
		//首先判断当前是否有选中的账号信息，如果有则不处理
		if(dojo.some(accServiceIdInputs||[], function(inputElem){
			return inputElem.checked;
		})){
			return ;
		}
		//优先选择CDMA号码，如果没有CDMA号码，则选择PSTN号码
		var cdmaNbrList = [];
		var pstnNbrList = [];
		var xdslNbrList = [];
		dojo.forEach(accServiceIdInputs||[], function(inputElem){
			if(inputElem.getAttribute("serviceKind") == 8 && inputElem.getAttribute("sourceFlag") == 3){
				cdmaNbrList.push(inputElem);
			}else if(inputElem.getAttribute("serviceKind") == 10 && inputElem.getAttribute("sourceFlag") == 3){
				pstnNbrList.push(inputElem);
			}else if(inputElem.getAttribute("serviceKind") == 11 && inputElem.getAttribute("sourceFlag") == 3){
				xdslNbrList.push(inputElem);
			}
			//给每个复选框都绑定事件
			dojo.connect(inputElem,"click",function(event){
				Me.doCheckAccNbr(event);
			});
		});
		//如果没有C网号码，则选中固网号码
		if(cdmaNbrList.length >0){
			cdmaNbrList[0].checked = true;
		}else if(pstnNbrList.length > 0){
			pstnNbrList[0].checked = true;
		}else if(xdslNbrList.length > 0){
			xdslNbrList[0].checked = true;
		}else{
			if(accServiceIdInputs.length>0){
				accServiceIdInputs[0].checked = true;
			}
			
		}
	};
	
	/**
	 * 账号的检测
	 */
	Me.doCheckAccNbr = function(event){
		var businessParamVO = BusCard.$remote("prodOfferSaleDataBO").getAccNbrSwitch(cardParam.serviceRelation.cityCode);
		//1.不可以选择同一个号码 0可以选择
		if(!!businessParamVO&&businessParamVO.objectValue==1){
			var targetInstId = event.currentTarget.getAttribute("prodInstId");
			var serviceId = event.currentTarget.getAttribute("serviceId");
			//检测实例和在途号码
			if(Me.checkInstList!=null&&Me.checkInstList.length>0){
				for(var p=0;p<Me.checkInstList.length;p++){
					var instData = Me.checkInstList[p];
					var flag = dojo.some(instData.data||[],function(instInfo){
						return instInfo.prodInstId == targetInstId;
					});
					if(flag&&event.currentTarget.getAttribute("checked")){
						alert("当前选中的号码["+event.currentTarget.getAttribute("serviceId")+"]已经是该客户下的其余产品["+instData.serviceId+"]的账号，不允许选择为当前号码账号!!!");
						event.currentTarget.getAttribute("checked") == false;	
					}
				}
			}
			//检测正在受理的号码
			if(Me.currentNbrInfoList!=null&&Me.currentNbrInfoList.length>0){
				for(var p=0;p<Me.currentNbrInfoList.length;p++){
					var instData = Me.currentNbrInfoList[p];
					var flag = dojo.some(instData.data||[],function(instInfo){
						return instInfo.serviceId == serviceId;
					});
					if(flag&&event.currentTarget.getAttribute("checked")){
						alert("当前选中的号码["+event.currentTarget.getAttribute("serviceId")+"]已经是该客户下的其余产品["+instData.serviceId+"]的账号，不允许选择为当前号码账号!!!");
						event.currentTarget.getAttribute("checked") == false;	
					}
				}
			}
		}
	};
	
	/**
	 * 将同客户下同一个产品id下的账号不允许相同
	 */
	Me.doGetAccNbrSameProductId = function(){
        //产品id
		var productId = Me.productId;
		var prodInstId = cardParam.serviceRelation.userId;
		var instInfoList = BusCard.$remote("serviceRelationDAO").query({customerId:custId,productId:productId,ifValue:1});
		Me.checkInstList = [];
		dojo.forEach(instInfoList, function(instInfo){
			if(instInfo.userId == prodInstId){
				return;
			}
			var data = BusCard.$remote("prodInstCommFacadeBO").getAccNbrInstByProdInstId(instInfo.userId);
			
			Me.checkInstList.push({
				data : data,
				serviceId : instInfo.serviceId
			});
		});
		//获取页面上的相同的产品id对应的账号号码信息
		Me.currentNbrInfoList = [];
		var trs = dojo.query(".main-product-basic", prodOfferAcceptLoader.mainProdOfferWidget.domNode);
		dojo.forEach(trs,function(prodBasicTr){
			//如果产品id一样，则取得设置的账号相关信息
			if(Me.productId == dojo.attr(prodBasicTr, "productId")){
				var uniqueId = dojo.attr(prodBasicTr, "uniqueId");
				var viewId = dojo.attr(prodBasicTr, "viewId");
				var serviceId = dojo.query(".serviceId-" + viewId, prodBasicTr)[0].value;
				if(prodOfferAcceptLoader.serviceCardWidgetMap['serviceCardWidget_uniqueId'].busCardInstance.dom){
					var tempDom = prodOfferAcceptLoader.serviceCardWidgetMap['serviceCardWidget_uniqueId'].busCardInstance.dom;
					var checkboxList  = dojo.query("[name=accServiceId-"+Me.nbrUniqueId+"]",dojo.query('#nbr_selected_ctn',tempDom)[0]);
					_buscard.util.each(checkboxList, function(dom) {
						if(dom.checked){
							Me.currentNbrInfoList.push({
								data : {
									serviceId : dom.getAttribute("serviceId")
								},
								serviceId : serviceId
							});
						}
					});
				}
			}
		});
	};

});
