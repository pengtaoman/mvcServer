BusCard.define('/buscardapp/rela/js/accountNbrHandler.js',function(_buscard,cardParam){ 
	var Me = this;
	dojo.require("orderaccept.prodofferaccept.util");
	var customerData =function(){
		return dojo.global.$appContext$.get("requestParam").customerData;
	}();
	var custId = customerData.custId;
	var currentUniqueId = cardParam.uniqueId;
	var tempNbrInfoList = [];
	var instNbrInfoLit = [];
	if(!dojo.global.$appContext$.get("pstnPlusCdmaNbrMap")){
//		// ��;�ĺ���
//		var tempPstnInfoList = BusCard.$remote("accessProdItemInfoDAO").selectByProperties({customerId:custId,serviceOfferId:301,serviceKind:10});
//		var tempCdmaInfoList =BusCard.$remote("accessProdItemInfoDAO").selectByProperties({customerId:custId,serviceOfferId:301,serviceKind:8});
//		// ʵ������
//		var instPstnInfoList = BusCard.$remote("serviceRelationDAO").query({customerId:custId,serviceKind:10,ifValue:1});
//		var instCdmaInfoList = BusCard.$remote("serviceRelationDAO").query({customerId:custId,serviceKind:8,ifValue:1});
//		
//		//�ϲ���ʱ���뵽һ��������
//		Array.prototype.push.apply(tempNbrInfoList,tempPstnInfoList);
//		Array.prototype.push.apply(tempNbrInfoList,tempCdmaInfoList);
//		
//		//�ϲ�ʵ�����뵽һ��������
//		Array.prototype.push.apply(instNbrInfoLit,instPstnInfoList);
//		Array.prototype.push.apply(instNbrInfoLit,instCdmaInfoList);
		//ҳ���Ż�
		var commAccNbrData = orderaccept.prodofferaccept.util.ServiceFactory.getService("url:orderDetailAction.do?method=getCommAccNbrList&custId=" + custId+"&cityCode="+customerData.cityCode);
		var pstnPlusCdmaNbrMap = {};
		tempNbrInfoList = commAccNbrData.tempAccessProdItemList;
		instNbrInfoLit = commAccNbrData.instServiceRelationList;
		tempNbrInfoList = dojo.filter(tempNbrInfoList||[],function(_temp){
			return !dojo.some(instNbrInfoLit||[],function(_instTemp){
				return _temp.userId== _instTemp.userId;
			});
		});
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
			obj.prodInstId = dojo.attr(prodBasicTr, "userId")||"",
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
	 * ���˵���;�ĺ�ʵ����Ϣ
	 */
	Me.filterOfInstAndTemp = function(tempNbrInfoList,instNbrInfoLit,currentNbrInfoList){
		return dojo.filter(currentNbrInfoList||[],function(info){
			return (!dojo.some(instNbrInfoLit||[],function(instInfo){
				return instInfo.userId == info.prodInstId;
			}))&&(!dojo.some(tempNbrInfoList||[],function(tempInfo){
				return tempInfo.userId == info.prodInstId;
			}));
		});
	};
	
	/**
	 * ����ѡ�����ҳ��
	 */
	Me.$("accountNbrChoose").onload = function(){
		Me.nbrUniqueId = orderaccept.prodofferaccept.util.CommUtils.generateUniqueId();
		var popWinTp  = BusCard.Template.create("<div id='nbr_selected_ctn'>\
	        		<fieldset  id='inst_nbr_fieldset'><legend>\u5b9e\u4f8b\u53f7\u7801</legend><div id='inst_nbr_div'>#{instItemList}</div></fieldset>			\
					<fieldset id='temp_nbr_fieldset'><legend>\u5728\u9014\u53f7\u7801</legend><div id='temp_nbr_div'>#{tempItemList}</div></fieldset>			\
					<fieldset id='current_nbr_fieldset'><legend>\u5f53\u524d\u53d7\u7406\u53f7\u7801</legend><div id='current_nbr_div'>#{currentItemList}</div></fieldset>			\
	        		</div>");
		var itemTp = BusCard.Template.create("<input type='checkbox' #{disableFlag} name='accServiceId-#{uniqueId}' targetUniqueId='#{targetUniqueId}' value='#{serviceId}' serviceId='#{serviceId}' sourceFlag='#{sourceFlag}' prodInstId ='#{prodInstId}' serviceKind='#{serviceKind}' serviceKindIndex='#{serviceKindIndex}'><span style='margin-right:5px'>#{serviceId}</span><tp:if $$.sourceFlag !=3><span style='color:#3399cc;font-weight:bold;'>[#{serviceKindDesc}]</span></tp:if>&nbsp;&nbsp;&nbsp;&nbsp;");
		//ѭ��ʵ�����룬���ɴ��в�Ʒʵ������ĸ�ѡ��Ĵ���
		var instItemList =BusCard.map(instNbrInfoLit,function(info){
			return itemTp.apply({
			serviceKind:info.serviceKind,
			serviceKindDesc : orderaccept.prodofferaccept.util.ServiceKindPrefixMap[info.serviceKind]?orderaccept.prodofferaccept.util.ServiceKindPrefixMap[info.serviceKind]+"\u53f7\u7801":"\u672a\u77e5\u7c7b\u578b\u53f7\u7801",
			sourceFlag:1,
			prodInstId : info.userId,
			disableFlag : "disabled",
			serviceId:info.serviceId,
			uniqueId : Me.nbrUniqueId
			});
		
		});
		instItemList = Me.dealDisplayOneRow(instItemList);
		//ѭ����;���룬���ɴ�����;����ĸ�ѡ��Ĵ���
		var tempItemList =BusCard.map(tempNbrInfoList,function(info){
			return itemTp.apply({
			serviceKind:info.serviceKind,
			serviceKindDesc : orderaccept.prodofferaccept.util.ServiceKindPrefixMap[info.serviceKind]?orderaccept.prodofferaccept.util.ServiceKindPrefixMap[info.serviceKind]+"\u53f7\u7801":"\u672a\u77e5\u7c7b\u578b\u53f7\u7801",
			sourceFlag:2,
			prodInstId : info.userId,
			disableFlag : "disabled",
			serviceId:info.serviceId,
			uniqueId :Me.nbrUniqueId
			});
		
		});
		tempItemList = Me.dealDisplayOneRow(tempItemList);
		//ѭ����ǰ���룬���ɴ��е�ǰ����ĸ�ѡ��Ĵ���
		var currentNbrInfoList = Me.getAccessServiceIdList();
		//���˵����еĺ���;��
		currentNbrInfoList = Me.filterOfInstAndTemp(tempNbrInfoList,instNbrInfoLit,currentNbrInfoList);
		var currentItemList =BusCard.map(currentNbrInfoList||[],function(info){
			return itemTp.apply({
			serviceKind:info.serviceKind,
			serviceKindDesc : "",
			sourceFlag:3,
			serviceId:info.serviceId,
			serviceKindIndex:info.serviceKindIndex,
			uniqueId :Me.nbrUniqueId,
			disableFlag : "disabled",
			prodInstId : info.prodInstId,
			targetUniqueId : info.uniqueId
			});
		
		});
		currentItemList = Me.dealDisplayOneRow(currentItemList);
		var accountNbrHtml = popWinTp.apply({
		instItemList:instItemList,
		tempItemList:tempItemList,
		currentItemList:currentItemList
		});
		
		this.innerHTML = accountNbrHtml;
		Me.$("subpage_wrapper_accountNbrChoose").style.width = '500px';
		Me.doGetAccNbrSameProductId();
		Me.selectAcctNbr();
	};
	
	Me.dealDisplayOneRow = function(instItemList){
		var returnStr = "";
		var index = 1;
		if(instItemList&&instItemList.length>0){
			for(var p=0;p<instItemList.length;p++){
				returnStr+=instItemList[p];
				if(index%2==0){
					returnStr+="<br>";
				}
				index++;
			}
		}
		return returnStr;
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
//	dojo.connect(Me.$("accountNbrChoose"),"click",function(){
//		Me.selectAcctNbr();
//		
//	});
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
			}else if(inputElem.getAttribute("sourceFlag") == 3){
				xdslNbrList.push(inputElem);
			}
			//��ÿ����ѡ�򶼰��¼�
			dojo.connect(inputElem,"click",function(event){
				Me.doCheckAccNbr(event);
			});
		});
		//���û��C�����룬��ѡ�й�������
		if(cdmaNbrList.length >0){
			var resultCDMA = dojo.filter(cdmaNbrList, function(cdmaInfo){
				return !dojo.some(Me.currentNbrInfoList, function(currentInfo){
					var data = currentInfo.data;
					return dojo.some(data,function(tempNbr){
						return tempNbr.serviceId == cdmaInfo.getAttribute("serviceId");
					});
					
				});
			})
			if(resultCDMA.length>0){
				resultCDMA[0].checked = true;
				return ;
			}
		}
		if(pstnNbrList.length > 0){
			var resultPSTN = dojo.filter(pstnNbrList, function(pstnInfo){
				return !dojo.some(Me.currentNbrInfoList, function(currentInfo){
					var data = currentInfo.data;
					return dojo.some(data,function(tempNbr){
						return tempNbr.serviceId == pstnInfo.getAttribute("serviceId");
					});
					
				});
			})
			if(resultPSTN.length>0){
				resultPSTN[0].checked = true;
				return ;
			}
		}
		if(xdslNbrList.length > 0){
			var resultADSL = dojo.filter(xdslNbrList, function(adslInfo){
				return !dojo.some(Me.currentNbrInfoList, function(currentInfo){
					var data = currentInfo.data;
					return dojo.some(data,function(tempNbr){
						return tempNbr.serviceId == adslInfo.getAttribute("serviceId");
					});
					
				});
			})
			if(resultADSL.length>0){
				resultADSL[0].checked = true;
				return ;
			}
		}
	};
	
	/**
	 * �˺ŵļ��
	 */
	Me.doCheckAccNbr = function(event){
		if(event.currentTarget.checked){
			
			var businessParamVO = BusCard.$remote("prodOfferSaleDataBO").getAccNbrSwitch(customerData.cityCode);
			//1.������ѡ��ͬһ������ 0����ѡ��
			if(!!businessParamVO&&businessParamVO.objectValue==1){
				Me.getCurrentNbrInfoList();
				var targetInstId = event.currentTarget.getAttribute("prodInstId");
				var serviceId = event.currentTarget.getAttribute("serviceId");
				//���ʵ������;����
				if(Me.checkInstList!=null&&Me.checkInstList.length>0){
					for(var p=0;p<Me.checkInstList.length;p++){
						var instData = Me.checkInstList[p];
						var flag = dojo.some(instData.data||[],function(instInfo){
							return instInfo.prodInstId == targetInstId;
						});
						if(flag&&event.currentTarget.checked){
							alert("\u5f53\u524d\u9009\u4e2d\u7684\u53f7\u7801["+event.currentTarget.getAttribute("serviceId")+"]\u5df2\u7ecf\u662f\u8be5\u5ba2\u6237\u4e0b\u7684\u5176\u4f59\u4ea7\u54c1["+instData.serviceId+"]\u7684\u8d26\u53f7\uff0c\u4e0d\u5141\u8bb8\u9009\u62e9\u4e3a\u5f53\u524d\u53f7\u7801\u8d26\u53f7!!!");
							event.currentTarget.checked = false;	
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
						if(flag&&event.currentTarget.checked){
							alert("\u5f53\u524d\u9009\u4e2d\u7684\u53f7\u7801["+event.currentTarget.getAttribute("serviceId")+"]\u5df2\u7ecf\u662f\u8be5\u5ba2\u6237\u4e0b\u7684\u5176\u4f59\u4ea7\u54c1["+instData.serviceId+"]\u7684\u8d26\u53f7\uff0c\u4e0d\u5141\u8bb8\u9009\u62e9\u4e3a\u5f53\u524d\u53f7\u7801\u8d26\u53f7!!!");
							event.currentTarget.checked = false;	
						}
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
		Me.checkInstList = [];
//		var instInfoList = BusCard.$remote("serviceRelationDAO").query({customerId:custId,productId:productId,ifValue:1});
//		
//		dojo.forEach(instInfoList, function(instInfo){
//			var data = BusCard.$remote("prodInstCommFacadeBO").getAccNbrInstByProdInstId(instInfo.userId);
//			
//			Me.checkInstList.push({
//				data : data,
//				serviceId : instInfo.serviceId
//			});
//		});
		var checkInstList = orderaccept.prodofferaccept.util.ServiceFactory.getService("url:orderDetailAction.do?method=doGetAccNbrSameProductId&custId=" + custId+"&productId="+productId+"&cityCode="+customerData.cityCode);
		for(var p in checkInstList){
			Me.checkInstList.push({
				data : checkInstList[p],
				serviceId : p
				});
		}
		Me.getCurrentNbrInfoList();
	};
	/**
	 * ѡ�е�ǰ����
	 */
	Me.checkedCurrentNumForAcc = function(targetAccServiceId){
		var accServiceIdInputs = dojo.query("[name=accServiceId-"+Me.nbrUniqueId+"]",dojo.query('#nbr_selected_ctn',Me.dom)[0]);
		 //��ȫ���Ķ����óɲ�ѡ
		 dojo.forEach(accServiceIdInputs||[], function(inputElem){
		  		inputElem.checked = false;
		 });
		var uniqueIdArray = [];
  		 //��ȡҳ���ϵĽ������������
		 var trs = dojo.query(".main-product-basic", prodOfferAcceptLoader.mainProdOfferWidget.domNode);
		 dojo.forEach(trs||[], function(prodBasicTr) {
		 	var uniqueId = dojo.attr(prodBasicTr, "uniqueId");
		 	var serviceKind = dojo.attr(prodBasicTr, "serviceKind") || "-1";
		 	if(prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_"+uniqueId].busCardInstance.$('serviceId').value == targetAccServiceId){
		 		uniqueIdArray.push({uniqueId : uniqueId,
		 						serviceKind : serviceKind});
		 	}
		 });
		 if(uniqueIdArray.length>0){
		 	//�Ƚ��й��ˣ�������ж��
		 	if(uniqueIdArray.length>1){
		 		var filterResult = dojo.filter(uniqueIdArray||[],function(_data_){
		 			return _data_.serviceKind == 8||_data_.serviceKind ==10;
		 		});
		 		if(filterResult.length>0){
		 			uniqueIdArray = filterResult;
		 		}
		 	}
		 	dojo.forEach(accServiceIdInputs||[], function(inputElem){
		 		if(uniqueIdArray[0].uniqueId == inputElem.getAttribute("targetUniqueId")){
	  				inputElem.checked = true;
	  			}
		 	});
		 }
	};
	/**
	 * ��ȡ��ǰͬ��Ʒ�Ѿ�ѡ����˺ź���
	 */
	Me.getCurrentNbrInfoList = function(){
		Me.currentNbrInfoList = [];
		var trs = dojo.query(".main-product-basic", prodOfferAcceptLoader.mainProdOfferWidget.domNode);
		dojo.forEach(trs,function(prodBasicTr){
			//�����Ʒidһ������ȡ�����õ��˺������Ϣ
			if(Me.productId == dojo.attr(prodBasicTr, "productId")&&currentUniqueId!=dojo.attr(prodBasicTr, "uniqueId")){
				var uniqueId = dojo.attr(prodBasicTr, "uniqueId");
				var viewId = dojo.attr(prodBasicTr, "viewId");
				
				var serviceId = dojo.query(".serviceId-" + viewId, prodBasicTr)[0].value;
				if(prodOfferAcceptLoader.serviceCardWidgetMap['serviceCardWidget_'+uniqueId].busCardInstance.dom){
					var tempDom = prodOfferAcceptLoader.serviceCardWidgetMap['serviceCardWidget_'+uniqueId].busCardInstance.dom;
					var nbrUniqueId =  prodOfferAcceptLoader.serviceCardWidgetMap['serviceCardWidget_'+uniqueId].busCardInstance.nbrUniqueId;
					var checkboxList  = dojo.query("[name=accServiceId-"+nbrUniqueId+"]",dojo.query('#nbr_selected_ctn',tempDom)[0]);
					_buscard.util.each(checkboxList, function(dom) {
						if(dom.checked){
							Me.currentNbrInfoList.push({
								data : [{
									serviceId : dom.getAttribute("serviceId")
								}],
								serviceId : serviceId
							});
						}
					});
				}
			}
		});
	};

});
