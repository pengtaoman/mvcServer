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
		// ��;�ĺ���
		var tempPstnInfoList = BusCard.$remote("accessProdItemInfoDAO").selectByProperties({customerId:custId,serviceOfferId:301,serviceKind:10});
		var tempCdmaInfoList =BusCard.$remote("accessProdItemInfoDAO").selectByProperties({customerId:custId,serviceOfferId:301,serviceKind:8});
		// ʵ������
		var instPstnInfoList = BusCard.$remote("serviceRelationDAO").query({customerId:custId,serviceKind:10,ifValue:1});
		var instCdmaInfoList = BusCard.$remote("serviceRelationDAO").query({customerId:custId,serviceKind:8,ifValue:1});
		
		//�ϲ���ʱ���뵽һ��������
		Array.prototype.push.apply(tempNbrInfoList,tempPstnInfoList);
		Array.prototype.push.apply(tempNbrInfoList,tempCdmaInfoList);
		
		//�ϲ�ʵ�����뵽һ��������
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
	 * ��ȡҳ���ϵĽ������Ʒ����
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
//		//���ɹ����˺�ʱ��û�в�Ʒid
//		}else if(!Me.productId){
//			return currentNbrInfoList;
//		}else{
//			return dojo.filter(currentNbrInfoList||[], function(nbrInfo){
//				return nbrInfo.serviceKind != 11;
//			});
//		}
		
	};
	/**
	 * ����ѡ�����ҳ��
	 */
	Me.$("accountNbrChoose").onload = function(){
		Me.nbrUniqueId = orderaccept.prodofferaccept.util.CommUtils.generateUniqueId();
		var popWinTp  = BusCard.Template.create("<div id='nbr_selected_ctn'>\
	        		<fieldset  id='inst_nbr_fieldset'><legend>ʵ������</legend><div id='inst_nbr_div'>#{instItemList}</div></fieldset>			\
					<fieldset id='temp_nbr_fieldset'><legend>��;����</legend><div id='temp_nbr_div'>#{tempItemList}</div></fieldset>			\
					<fieldset id='current_nbr_fieldset'><legend>��ǰ�������</legend><div id='current_nbr_div'>#{currentItemList}</div></fieldset>			\
	        		</div>");
		var itemTp = BusCard.Template.create("<input type='checkbox' name='accServiceId-#{uniqueId}' targetUniqueId='#{targetUniqueId}' value='#{serviceId}' serviceId='#{serviceId}' sourceFlag='#{sourceFlag}' prodInstId ='#{prodInstId}' serviceKind='#{serviceKind}' serviceKindIndex='#{serviceKindIndex}'><span style='margin-right:5px'>#{serviceId}</span>");
		//ѭ��ʵ�����룬���ɴ��в�Ʒʵ������ĸ�ѡ��Ĵ���
		var instItemList =BusCard.map(instNbrInfoLit,function(info){
			return itemTp.apply({
			serviceKind:info.serviceKind,
			sourceFlag:1,
			prodInstId : info.userId,
			serviceId:info.serviceId,
			uniqueId : Me.nbrUniqueId
			});
		
		}).join("");
		//ѭ����;���룬���ɴ�����;����ĸ�ѡ��Ĵ���
		var tempItemList =BusCard.map(tempNbrInfoList,function(info){
			return itemTp.apply({
			serviceKind:info.serviceKind,
			sourceFlag:2,
			prodInstId : info.userId,
			serviceId:info.serviceId,
			uniqueId :Me.nbrUniqueId
			});
		
		}).join("");
		//ѭ����ǰ���룬���ɴ��е�ǰ����ĸ�ѡ��Ĵ���
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
	
	//��̬���µ�ǰ����ĺ���
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
	 * ѡ���˺���Ϣ
	 */
	Me.selectAcctNbr =  function(){
		var accServiceIdInputs = dojo.query("[name=accServiceId-"+Me.nbrUniqueId+"]",dojo.query('#nbr_selected_ctn',Me.dom)[0]);
		//�����жϵ�ǰ�Ƿ���ѡ�е��˺���Ϣ��������򲻴���
		if(dojo.some(accServiceIdInputs||[], function(inputElem){
			return inputElem.checked;
		})){
			return ;
		}
		//����ѡ��CDMA���룬���û��CDMA���룬��ѡ��PSTN����
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
			//��ÿ����ѡ�򶼰��¼�
			dojo.connect(inputElem,"click",function(event){
				Me.doCheckAccNbr(event);
			});
		});
		//���û��C�����룬��ѡ�й�������
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
	 * �˺ŵļ��
	 */
	Me.doCheckAccNbr = function(event){
		var businessParamVO = BusCard.$remote("prodOfferSaleDataBO").getAccNbrSwitch(cardParam.serviceRelation.cityCode);
		//1.������ѡ��ͬһ������ 0����ѡ��
		if(!!businessParamVO&&businessParamVO.objectValue==1){
			var targetInstId = event.currentTarget.getAttribute("prodInstId");
			var serviceId = event.currentTarget.getAttribute("serviceId");
			//���ʵ������;����
			if(Me.checkInstList!=null&&Me.checkInstList.length>0){
				for(var p=0;p<Me.checkInstList.length;p++){
					var instData = Me.checkInstList[p];
					var flag = dojo.some(instData.data||[],function(instInfo){
						return instInfo.prodInstId == targetInstId;
					});
					if(flag&&event.currentTarget.getAttribute("checked")){
						alert("��ǰѡ�еĺ���["+event.currentTarget.getAttribute("serviceId")+"]�Ѿ��Ǹÿͻ��µ������Ʒ["+instData.serviceId+"]���˺ţ�������ѡ��Ϊ��ǰ�����˺�!!!");
						event.currentTarget.getAttribute("checked") == false;	
					}
				}
			}
			//�����������ĺ���
			if(Me.currentNbrInfoList!=null&&Me.currentNbrInfoList.length>0){
				for(var p=0;p<Me.currentNbrInfoList.length;p++){
					var instData = Me.currentNbrInfoList[p];
					var flag = dojo.some(instData.data||[],function(instInfo){
						return instInfo.serviceId == serviceId;
					});
					if(flag&&event.currentTarget.getAttribute("checked")){
						alert("��ǰѡ�еĺ���["+event.currentTarget.getAttribute("serviceId")+"]�Ѿ��Ǹÿͻ��µ������Ʒ["+instData.serviceId+"]���˺ţ�������ѡ��Ϊ��ǰ�����˺�!!!");
						event.currentTarget.getAttribute("checked") == false;	
					}
				}
			}
		}
	};
	
	/**
	 * ��ͬ�ͻ���ͬһ����Ʒid�µ��˺Ų�������ͬ
	 */
	Me.doGetAccNbrSameProductId = function(){
        //��Ʒid
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
		//��ȡҳ���ϵ���ͬ�Ĳ�Ʒid��Ӧ���˺ź�����Ϣ
		Me.currentNbrInfoList = [];
		var trs = dojo.query(".main-product-basic", prodOfferAcceptLoader.mainProdOfferWidget.domNode);
		dojo.forEach(trs,function(prodBasicTr){
			//�����Ʒidһ������ȡ�����õ��˺������Ϣ
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
