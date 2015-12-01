BusCard.define('/orderaccept/attrapp/attr_prod_portSpeed.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	dojo.require("orderaccept.prodofferaccept.util");
	//保留旧的属性值
	Me.oldRateAttrValue = null;
	//产品实例属性
	Me.prodAttrInstList = null;
    //升速的全局对象
    if(!prodOfferAcceptLoader.rateAttrMap){
    	prodOfferAcceptLoader.rateAttrMap={};
    }
    //单个销售品关联升速的集合
    Me.relaAttrInfo=[];
    //根据dom对象获取参数对象
	var parentDom = dijit.getEnclosingWidget(Me.getParent().dom);
	var model = parentDom.getModel();
	//获取服务信息的map对象
    var serviceCardWidgetMap =  prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_" + model.cardParam.uniqueId];
   	//获取服务信息的卡片对象
   	var busCardInstance = serviceCardWidgetMap.busCardInstance;
   	//用户的接入类产品实例id
	var userId = busCardInstance.getCardRelationInfo().userId;
   	//获取属性卡片的对象
   	var attrCardWidgetModel = dijit.getEnclosingWidget(busCardInstance.getChildren()[0].dom);
   	//获取规格层面的属性集合
   	var prodAttrList = attrCardWidgetModel.productInfoVO.attrList;
	//获取当前产品id
   	var productId = attrCardWidgetModel.productInfoVO.productId;
   	
   	
   	/**
   	 * 资源确认需求
   	 */
   	Me.$('100081').onchange = function(){
   		var wideAttrCheckYip = false;
   		var tips = "\u5f53\u524d\u901f\u7387\u4e0e\u7528\u6237\u7c7b\u578b\u548c\u627f\u8f7d\u65b9\u5f0f\u4e0d\u5339\u914d\uff0c\u4f1a\u5f71\u54cd\u65bd\u5de5,\u8bf7\u91cd\u65b0\u9009\u62e9\u901f\u7387!";
   		if(orderaccept.prodofferaccept.util.ProdOfferHelper.judgeByWideAttrParamValue(Me.$('300000'),Me.$('100542'),Me.$('100081'))== false){
   			 wideAttrCheckYip = true;
   		}
   		
   		if(dojo.getObject("prodOfferAcceptLoader.serviceCardWidgetMap")!=null){
   			GetSwitchForAddr.initSwitch(BusCard.$session.cityCode);
   			if((!!$ac$.get("_switch8090_"))&&$ac$.get("_switch8090_")==0){
   				return ;
   			}
   			//判断是否支持多产品资源确认
   			if((!!$ac$.get("_switch8091_"))&&$ac$.get("_switch8091_")==0){
   				var _serviceCardWidget = prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_" + model.cardParam.uniqueId];
				if(_serviceCardWidget.cardParam.serviceOfferId == ConstantsPool.load("ServiceOfferIDConst").ServiceOfferIDConst.PROD_NEW){
					
					if(_serviceCardWidget.busCardInstance.$('addrId')){
						if(_serviceCardWidget.busCardInstance.$('addrId').value != ""){
							ifTip = true;
						}
						_serviceCardWidget.busCardInstance.$('addrId').value = "";
						_serviceCardWidget.busCardInstance.$('addrId').rvalue = "";
					}
					if(_serviceCardWidget.busCardInstance.$('addrDetail')){
						if(_serviceCardWidget.busCardInstance.$('addrDetail').value != ""){
							ifTip = true;
						}
						_serviceCardWidget.busCardInstance.$('addrDetail').value = "";
					}
		       	}
   			}else{
   				var serviceCardWidgetTempMap = prodOfferAcceptLoader.serviceCardWidgetMap;
	   			var ifTip = false;
		   		for(var key in serviceCardWidgetTempMap){
		   			if (!serviceCardWidgetTempMap.hasOwnProperty(key)) {
				        continue;
			       	}
			       	if(serviceCardWidgetTempMap[key].cardParam.serviceOfferId == ConstantsPool.load("ServiceOfferIDConst").ServiceOfferIDConst.PROD_NEW){
						if(serviceCardWidgetTempMap[key].busCardInstance.needResourceComfirm === false){
				       		continue;
				       	}
						if(serviceCardWidgetTempMap[key].busCardInstance.$('addrId')){
							if(serviceCardWidgetTempMap[key].busCardInstance.$('addrId').value != ""){
								ifTip = true;
							}
							serviceCardWidgetTempMap[key].busCardInstance.$('addrId').value = "";
							serviceCardWidgetTempMap[key].busCardInstance.$('addrId').rvalue = "";
						}
						if(serviceCardWidgetTempMap[key].busCardInstance.$('addrDetail')){
							if(serviceCardWidgetTempMap[key].busCardInstance.$('addrDetail').value != ""){
								ifTip = true;
							}
							serviceCardWidgetTempMap[key].busCardInstance.$('addrDetail').value = "";
						}
			       	}
		   		}	
   			}
   			if(wideAttrCheckYip&&ifTip){
   				orderaccept.common.dialog.MessageBox.alert({
		        	message: tips+",并且速率发生变化,请重新进行机线资源确认！"
		        });
   			}else if(ifTip){
		   		orderaccept.common.dialog.MessageBox.alert({
		        	message:"速率发生变化,请重新进行机线资源确认！"
		        });
	   		}else if(wideAttrCheckYip){
	   			orderaccept.common.dialog.MessageBox.alert({
		        	message:tips
		        });
	   		}
   		}
   	};
   	
   	
   	
	/**
     * 获取下拉框枚举值对象
     */
    Me.doGetAttrValueObj = function(relaAttrCd,relaAttrValue){
    	for(var p=0;p<prodAttrList.length;p++){
   			var attrVO = prodAttrList[p];
   			if(attrVO.attrCd == relaAttrCd){
   				var attrValueList = attrVO.attrValueList;
   				var resultAttrValueList = dojo.filter(attrValueList, function(attrValueVO){
												return attrValueVO.attrValue == relaAttrValue;
											});				                     
   				if(resultAttrValueList.length>0){
   					return resultAttrValueList[0];
   				}
   			}
   		}
   		return null;
    };
	/**
     * 创建不存在的升速属性下拉框值
     */
    Me.createNoExistOption = function(relaAttrCd,relaAttrValue,uniqueId){
    	var attrValueList = null;
    	//先判断当前的宽带速率下拉框中是否有对应的属性值
   		var attrValueVO = Me.doGetAttrValueObj(relaAttrCd,relaAttrValue);
   		//没有则从速率集合中获取
   		if(attrValueVO==null){
   			if(!!dojo.global.$appContext$.get("attrValueList" + uniqueId)){
   				//从缓存中获取速率枚举集合
				attrValueList = dojo.global.$appContext$.get("attrValueList" + uniqueId);
			}else{
				attrValueList = BusCard.$remote("innerInterfaceBO").getProductRateList({});
				//将速率集合放入缓存中
				dojo.global.$appContext$.set("attrValueList" + uniqueId, attrValueList);
			}
			//获取要升速的枚举信息，并且生成下拉框数据
			var resultAttrValueList  =dojo.filter(attrValueList, function(attrValueVO){
				return attrValueVO.attrValue == relaAttrValue;
			});
			if(resultAttrValueList.length==0){
				return;
			}
			attrValueVO = resultAttrValueList[0]; 				                                
			var op = document.createElement("option");
			op.value = attrValueVO.attrValue;
	        op.text = attrValueVO.attrValueName;
	        this.$(relaAttrCd+"").options.add(op);
   		}
		return attrValueVO;
    };
    /**
     * 变更时该方法有用(变更主销售品不走该方法)
     */
    void function(){
	   	//如果实例存在
	   	if(userId){
	   		//获取接入类产品信息
	    	var _qr = dojo.global.$appContext$.jsonPath("keepMainProdInstList[?(@.prodInstId=="+ userId + ")]");
		    if(!!_qr){
		    	//获取属性实例数据
		    	var prodInstAttrList = _qr[0].prodInstAttrList;
		    	Me.prodAttrInstList = prodInstAttrList;
		    	var relaAttrId = null;
		    	var attrValue = null;
		    	var relaAttrInstId =null;
		    	//获取升速的属性id
		    	for(var p=0;p<prodAttrList.length;p++){
		   			var attrVO = prodAttrList[p];
		   			var existAttrCd = dojo.filter(orderaccept.prodofferaccept.util.SpeedAttrArray||[],function(_attrCd){
			        	return attrVO.attrCd+"" == _attrCd;
			    	})[0];
			    	if(!!existAttrCd){
			    		relaAttrId = attrVO.attrId;
		   				break;
			    	}
		   		}
		   		if(relaAttrId==null){
		   			return;
		   		}
		   		//获取实例中的属性值
		   		for(var k=0;k<prodInstAttrList.length;k++){
		   			var prodAttrInfo = prodInstAttrList[k];
		   			if(prodAttrInfo.attrCd == relaAttrId){
		   				attrValue = prodAttrInfo.attrValue;
		   				relaAttrInstId = prodAttrInfo.prodInstAttrId;
		   				break;
		   			}
		   		}
		   		if(!!dojo.global.$appContext$.get("dealObjectAttrList" + model.cardParam.uniqueId)){
		   			//从缓存中获取升速枚举集合
					dealObjectAttrList = dojo.global.$appContext$.get("dealObjectAttrList" + model.cardParam.uniqueId);
				}else{
					//获取所有的升速历史对象			                                
			   		dealObjectAttrList = BusCard.$remote("dealObjectAttrDAO").query({
									                                instAttrId : relaAttrInstId,
									                                zobjInstId : userId
								                                });
					//将升速对象集合放入缓存中
					dojo.global.$appContext$.set("dealObjectAttrList" + model.cardParam.uniqueId, dealObjectAttrList);
				}
		   	}
	    }
    }();
    
    Me.getTargetDealObjectAttrList = function(){
    	var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
		var targetSelectMem = dojo.filter(selectedMemberProdOfferList||[],function(_data){
						return _data.uniqueId == model.cardParam.uniqueId;
					});
		userId = targetSelectMem[0].prodInstId;
		var prodInstAttrList = targetSelectMem[0].prodInstVO.prodInstAttrList;
	    	Me.prodAttrInstList = prodInstAttrList;
	    	var relaAttrId = null;
	    	var attrValue = null;
	    	var relaAttrInstId =null;
	    	//获取升速的属性id
	    	for(var p=0;p<prodAttrList.length;p++){
	   			var attrVO = prodAttrList[p];
	   			var existAttrCd = dojo.filter(orderaccept.prodofferaccept.util.SpeedAttrArray||[],function(_attrCd){
		        	return attrVO.attrCd+"" == _attrCd;
		    	})[0];
		    	if(!!existAttrCd){
		    		relaAttrId = attrVO.attrId;
	   				break;
		    	}
	   		}
	   		if(relaAttrId==null){
	   			return;
	   		}
	   		//获取实例中的属性值
	   		for(var k=0;k<prodInstAttrList.length;k++){
	   			var prodAttrInfo = prodInstAttrList[k];
	   			if(prodAttrInfo.attrCd == relaAttrId){
	   				attrValue = prodAttrInfo.attrValue;
	   				relaAttrInstId = prodAttrInfo.prodInstAttrId;
	   				break;
	   			}
	   		}
	   		if(!!dojo.global.$appContext$.get("dealObjectAttrList" + model.cardParam.uniqueId)){
	   			//从缓存中获取升速枚举集合
				dealObjectAttrList = dojo.global.$appContext$.get("dealObjectAttrList" + model.cardParam.uniqueId);
			}else{
				//获取所有的升速历史对象			                                
		   		dealObjectAttrList = BusCard.$remote("dealObjectAttrDAO").query({
								                                instAttrId : relaAttrInstId,
								                                zobjInstId : userId
							                                });
				//将升速对象集合放入缓存中
				dojo.global.$appContext$.set("dealObjectAttrList" + model.cardParam.uniqueId, dealObjectAttrList);
			}
    };
    
    Me.getDealObjectAttrList = function(){
    	if(userId==0){
    		Me.getTargetDealObjectAttrList();
    	}else if(userId){
	   		//获取接入类产品信息
	    	var _qr = dojo.global.$appContext$.jsonPath("keepMainProdInstList[?(@.prodInstId=="+ userId + ")]");
		    if(!!_qr){
		    	//获取属性实例数据
		    	var prodInstAttrList = _qr[0].prodInstAttrList;
		    	Me.prodAttrInstList = prodInstAttrList;
		    	var relaAttrId = null;
		    	var attrValue = null;
		    	var relaAttrInstId =null;
		    	//获取升速的属性id
		    	for(var p=0;p<prodAttrList.length;p++){
		   			var attrVO = prodAttrList[p];
		   			var existAttrCd = dojo.filter(orderaccept.prodofferaccept.util.SpeedAttrArray||[],function(_attrCd){
			        	return attrVO.attrCd+"" == _attrCd;
			    	})[0];
			    	if(!!existAttrCd){
			    		relaAttrId = attrVO.attrId;
		   				break;
			    	}
		   		}
		   		if(relaAttrId==null){
		   			return;
		   		}
		   		//获取实例中的属性值
		   		for(var k=0;k<prodInstAttrList.length;k++){
		   			var prodAttrInfo = prodInstAttrList[k];
		   			if(prodAttrInfo.attrCd == relaAttrId){
		   				attrValue = prodAttrInfo.attrValue;
		   				relaAttrInstId = prodAttrInfo.prodInstAttrId;
		   				break;
		   			}
		   		}
		   		if(!!dojo.global.$appContext$.get("dealObjectAttrList" + model.cardParam.uniqueId)){
		   			//从缓存中获取升速枚举集合
					dealObjectAttrList = dojo.global.$appContext$.get("dealObjectAttrList" + model.cardParam.uniqueId);
				}else{
					//获取所有的升速历史对象			                                
			   		dealObjectAttrList = BusCard.$remote("dealObjectAttrDAO").query({
									                                instAttrId : relaAttrInstId,
									                                zobjInstId : userId
								                                });
					//将升速对象集合放入缓存中
					dojo.global.$appContext$.set("dealObjectAttrList" + model.cardParam.uniqueId, dealObjectAttrList);
				}
		   	}else{
		   		Me.getTargetDealObjectAttrList();
		   	}
	    }
    };
    /**
     * 处理掉不用的属性枚举数据信息
     */
    Me.dealCurrentOption = function(relaAttrCd,relaAttrValue){
    	BusCard.$rs(Me.$(relaAttrCd+""),[]);
    	var attrValueList = null;
    	for(var p=0;p<prodAttrList.length;p++){
   			var attrVO = prodAttrList[p];
   			if(attrVO.attrCd == relaAttrCd){
   				attrValueList = attrVO.attrValueList;
   				break;
   			}
   		}
   		BusCard.$rs(Me.$(relaAttrCd+""), BusCard.map(attrValueList, function(valueVO) {
						                                return {
							                                id : valueVO.attrValue,
							                                name : valueVO.attrValueName
						                                };
					                                }));
		this.$(relaAttrCd+"").disabled = false;	
		this.$(relaAttrCd+"").value = Me.oldRateAttrValue;
    };
    
    /**
     * 从表中获取旧的属性值信息
     */
    Me.doGetOldAttrValueFromTable = function(){
    	
    	if((!dojo.global.$appContext$.get("dealObjectAttrList" + model.cardParam.uniqueId))||
    		dojo.global.$appContext$.get("dealObjectAttrList" + model.cardParam.uniqueId).length == 0){
    		Me.getDealObjectAttrList();
    	}
    	if((!dojo.global.$appContext$.get("dealObjectAttrList" + model.cardParam.uniqueId))||
    		dojo.global.$appContext$.get("dealObjectAttrList" + model.cardParam.uniqueId).length == 0){
    		return false;
    	}
    	return dojo.global.$appContext$.get("dealObjectAttrList" + model.cardParam.uniqueId)[0].oldAttrValue;
    };
    
    Me.doGetNewAttrValueFromTable = function(){
    	
    	if((!dojo.global.$appContext$.get("dealObjectAttrList" + model.cardParam.uniqueId))||
    		dojo.global.$appContext$.get("dealObjectAttrList" + model.cardParam.uniqueId).length == 0){
    		Me.getDealObjectAttrList();
    	}
    	if((!dojo.global.$appContext$.get("dealObjectAttrList" + model.cardParam.uniqueId))||
    		dojo.global.$appContext$.get("dealObjectAttrList" + model.cardParam.uniqueId).length == 0){
    		return false;
    	}
    	return dojo.global.$appContext$.get("dealObjectAttrList" + model.cardParam.uniqueId)[0].attrValue;
    };
    
    Me.deleteReceiveMessagePath = function(){
    	BusCard.messaging.unSubscribeByPath("/message/raiseSpeedHandleByCancelOld"+model.cardParam.uniqueId);
    	BusCard.messaging.unSubscribeByPath("/message/decreaseSpeedHandleByCancelOld"+model.cardParam.uniqueId);
    };
    
    //升速降速调用方法
    this.subscribe("/message/raiseSpeed"+model.cardParam.uniqueId);
    this.subscribe("/message/decreaseSpeed"+model.cardParam.uniqueId);
    this.subscribe("/message/decreaseSpeedHandleByCancelOld"+model.cardParam.uniqueId);
    this.subscribe("/message/raiseSpeedHandleByCancelOld"+model.cardParam.uniqueId);
    this.receive = function(message){
    	if(message.path == "/message/raiseSpeed"+model.cardParam.uniqueId){
    		Me.raiseSpeedHandle(message);
    	}else if(message.path == "/message/decreaseSpeed"+model.cardParam.uniqueId){
    		Me.decreaseSpeedHandle(message);
    	}else if(message.path == "/message/decreaseSpeedHandleByCancelOld"+model.cardParam.uniqueId){
    		Me.decreaseSpeedHandleByCancelOld(message);
    	}else if(message.path == "/message/raiseSpeedHandleByCancelOld"+model.cardParam.uniqueId){
    		Me.raiseSpeedHandleByCancelOld(message);
    	}
    };
    
    /**
     * 重新选中升速可选包的处理逻辑
     */
    Me.raiseSpeedHandleByCancelOld = function(message){
    	//获取降速对象
    	var raiseSpeedObj = message.data;
    	//升速后的属性值
   		var relaAttrValue = raiseSpeedObj.attrValue;
   		//销售品作用于产品的属性Cd
   		var relaAttrCd = raiseSpeedObj.relatedAttrCD;
   		//作用于哪个接入类升速的标识
   		var uniqueId = raiseSpeedObj.uniqueId;
	   	//有升速属性的销售品id
   		var prodOfferId = raiseSpeedObj.prodOfferId;
   		//当前升速销售品的绑定数据
   		var rowData = raiseSpeedObj.rowData;
   		//如果已经生效
   		if(!this.$(relaAttrCd+"")){
   			return;
   		}
   		//如果是预约生效的则不做控制
   		if(orderaccept.prodofferaccept.util.DateHelper.compareDateValue(orderaccept.prodofferaccept.util.DateHelper.format(rowData.prodOfferInst.effDate),$ac$.requestParam.today)){
   			
   		}else{
   			this.$(relaAttrCd+"").disabled = true;
   		}
   		if(!raiseSpeedObj.initStatus){
   			this.$(relaAttrCd+"").value = Me.oldPortSpeedAttrInstValue;
   		}
   		for(var p=0;p<Me.relaAttrInfo.length;p++){
			var relaAttr = Me.relaAttrInfo[p];
			if(relaAttr.prodOfferId == prodOfferId&&relaAttr.operKind == 3){
				Me.relaAttrInfo.splice(p,1);
				break;
			}
		}
    };
    /**
     * 退订导致速率下降
     */
    Me.decreaseSpeedHandleByCancelOld = function(message){
    	//获取降速对象
    	var raiseSpeedObj = message.data;
    	//升速后的属性值
   		var relaAttrValue = raiseSpeedObj.attrValue;
   		//销售品作用于产品的属性Cd
   		var relaAttrCd = raiseSpeedObj.relatedAttrCD;
   		//作用于哪个接入类升速的标识
   		var uniqueId = raiseSpeedObj.uniqueId;
	   	//有升速属性的销售品id
   		var prodOfferId = raiseSpeedObj.prodOfferId;
   		//当前升速销售品的绑定数据
   		var rowData = raiseSpeedObj.rowData;
   		if(!this.$(relaAttrCd+"")){
   			return;
   		}
   		Me.oldPortSpeedAttrInstValue = this.$(relaAttrCd+"").value;
   		this.$(relaAttrCd+"").disabled= false;
   		this.$(relaAttrCd+"").value = Me.doGetOldAttrValueFromTable();
   		Me.relaAttrInfo.push({
			prodOfferId : prodOfferId,
			oldAttrValue : Me.doGetOldAttrValueFromTable(),
			attrValue : relaAttrValue,
			operKind : 3
		});
		if(!prodOfferAcceptLoader.rateAttrMap[uniqueId]){
			prodOfferAcceptLoader.rateAttrMap[uniqueId] = Me.relaAttrInfo;	
		}
    };
    
    /**
     * 降速处理
     */
    Me.decreaseSpeedHandle = function(message){
    	if(Me.oldRateAttrValue==null){
    		return ;
    	}
    	//获取降速对象
    	var raiseSpeedObj = message.data;
    	//升速后的属性值
   		var relaAttrValue = raiseSpeedObj.attrValue;
   		//销售品作用于产品的属性Cd
   		var relaAttrCd = raiseSpeedObj.relatedAttrCD;
   		//作用于哪个接入类升速的标识
   		var uniqueId = raiseSpeedObj.uniqueId;
	   	//有升速属性的销售品id
   		var prodOfferId = raiseSpeedObj.prodOfferId;
   		//当前升速销售品的绑定数据
   		var rowData = raiseSpeedObj.rowData;
   		//速率属性的属性id
   		var relaAttrId = null;
   		//变更时属性的实例id
   		var relaAttrInstId = null;
		//从全局的升速对象中删除当前的销售品的升速信息
		for(var p=0;p<Me.relaAttrInfo.length;p++){
			var relaAttr = Me.relaAttrInfo[p];
			if(relaAttr.prodOfferId == prodOfferId&&relaAttr.operKind ==1){
				Me.relaAttrInfo.splice(p,1);
				break;
			}
		}
		//降速时，判断速率属性在规格数据中是否存在，存在则不删除，否则删除下拉框中的属性枚举值
		Me.dealCurrentOption(relaAttrCd,relaAttrValue);
    };
    
    /**
     * 温馨提示，提示带宽变化
     */
    Me.warmingtips = function(attrValueVO,rowData){
    	var tips = null;
    	var existAttrCd = dojo.filter(util.SpeedAttrArray||[],function(_attrCd){
			        	return !!Me.$(_attrCd+"");
			    })[0];
    	var selectedIndex = this.$(existAttrCd+"").selectedIndex;
    	tips = "销售品["+rowData.subProdOfferInfo.prodOfferName+"]导致产品属性[端口速率]由["+
    	this.$(existAttrCd+"")[selectedIndex].text+"]变为["+attrValueVO.attrValueName+"],请确认是否订购!";
    	orderaccept.common.dialog.MessageBox.alert({
        	message:tips
        });
    };
    
    /**
     * 升速处理
     */
    Me.raiseSpeedHandle = function(message){
    	Me.oldRateAttrValue = null;
    	//获取升速信息
    	var raiseSpeedObj = message.data;
    	//升速后的属性值
   		var relaAttrValue = raiseSpeedObj.attrValue;
   		//销售品作用于产品的属性Cd
   		var relaAttrCd = raiseSpeedObj.relatedAttrCD;
   		//作用于哪个接入类升速的标识
   		var uniqueId = raiseSpeedObj.uniqueId;
   		//有升速属性的销售品id
   		var prodOfferId = raiseSpeedObj.prodOfferId;
	   	//当前升速销售品的绑定数据
   		var rowData = raiseSpeedObj.rowData;
   		//relaAttrValue="20M2@18";
   		//2.看当前的下拉框中是否有新的升速值，如果没有创建新的option
   		var attrValueVO = Me.createNoExistOption(relaAttrCd,relaAttrValue,uniqueId);
   		//如果是改单，则直接返回
   		if($ac$.get("orderChangeFlag")== 1){
   			this.$(relaAttrCd+"").disabled = true;
   			return ;
   		}
   		//3.构建提示信息，提示用户升速带宽的值
   		Me.warmingtips(attrValueVO,rowData);
		//4.Me.oldRateAttrValue为保存原始值
		if(!Me.oldRateAttrValue){
			Me.oldRateAttrValue = this.$(relaAttrCd+"").value;
		}
		//5.设置成新的速率
		this.$(relaAttrCd+"").value = relaAttrValue;
		this.$(relaAttrCd+"").disabled = true;
		//生成提交数据对象
		Me.relaAttrInfo.push({
			prodOfferId : prodOfferId,
			zstandardObjId : productId,
			astandardObjId : prodOfferId,
			attrId : dojo.filter(prodAttrList, function(attrVO){
				return attrVO.attrCd == relaAttrCd;
			})[0].attrId,
			attrValueId : attrValueVO.attrValueId,
			oldAttrValueId : attrValueVO.attrValueId, 
			rateFlag : uniqueId,
			oldAttrValue : Me.oldRateAttrValue!=""?Me.oldRateAttrValue:relaAttrValue,
			attrValue : relaAttrValue,
			operKind : 1
		});
		if(!prodOfferAcceptLoader.rateAttrMap[uniqueId]){
			prodOfferAcceptLoader.rateAttrMap[uniqueId] = Me.relaAttrInfo;	
		}
    };
    //因为可选包比产品属性延迟加载出来，所以需要进行特殊处理  begin
    var tempObj = dojo.getObject("_temp.getObjectMap"+model.cardParam.uniqueId,true);
    dojo.forEach(tempObj.rateRelSubProdOfferArray||[], function(data){
    	if(data.data.rowData.prodOfferInst!=null&&data.data.rowData.showData.checkedOption!=""){
    		Me.raiseSpeedHandleByCancelOld(data);
    	}else if(data.data.rowData.prodOfferInst!=null&&data.data.rowData.showData.checkedOption==""){
    		Me.decreaseSpeedHandleByCancelOld(data);
    	}else{
    		Me.raiseSpeedHandle(data);
    	}
    });
    tempObj = {};
    //因为可选包比产品属性延迟加载出来，所以需要进行特殊处理  end
	        };
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	        /**
	         * 综合查询页面处理分支
	         * @method
	         */
	        var allInfoQueryPageDispatch = function() {};
	        /**
	         * 二次业务处理分支
	         * @method
	         */
	        var secondBusinessPageDispatch = function() {
	        };
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {};
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
