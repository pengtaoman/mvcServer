defineModule("orderaccept.prodofferaccept.builder.prodofferdetail.ResRelaBuilder", ["../../util",
                "../../widget/resourcecard/ResourceCardWidget",
				"orderaccept.common.dialog.MessageBox"], function(util, ResourceCardWidget,messageBox) {
	        /**
			 * 定义营销资源信息整体构造器
			 * 
			 * @class
			 * @extends
			 */
	        dojo.declare("orderaccept.prodofferaccept.builder.prodofferdetail.ResRelaBuilder", [], { 
	        	
	        	resourceCardWidgetClass : ResourceCardWidget,
	        	
                constructor : function(args) {
		        	this.loader = args.loader,
	                this.prodOfferDetailWidget = args.prodOfferDetailWidget,
	                this.prodOfferInfo = args.prodOfferInfo,
	                this.tabContainer = args.tabContainer,
	                this.contentPane = args.contentPane,
	                this.resRelaKind = args.resRelaKind,	        	
		        	this.resRelaItemList = [],		        	
		        	this.resourceCardList = [],		        	
		        	this.couponsCardObj = null,		        	
		        	this.couponsList = [],		        	
		        	this.couponIndex = 0;
                },
		        initResourceAttr :function(){
		        	
			        var builder = this,
			        	loader = builder.loader,
			        	resourceCardWidgetClass = builder.resourceCardWidgetClass,
			        	prodOfferDetailWidget = this.prodOfferDetailWidget,
		                prodOfferInfo = this.prodOfferInfo,
		                tabContainer = this.tabContainer,
		                contentPane = this.contentPane;
			        if (prodOfferInfo.resRelaList && prodOfferInfo.resRelaList.length > 0) {
				        tabContainer.addChild(contentPane);
			        }
			        dojo.forEach(prodOfferInfo.resRelaList, function(resRelaInfo) {
				                // mktResCd --营销资源cd
				                if (!resRelaInfo || !resRelaInfo.mktResCd) { return; }
				                // 生成卡片参数对象
				                var initObj = {
					                productId : util.RES_RELA_CONST.DEFAULT_PRODUCT,// 产品id
					                serviceOfferId : resRelaInfo.mktResCd / -1,
					                cityCode : loader.requestParam.customerData.cityCode
					                // 地市编码
				                };
				                /** ***************************初始化卡片个性部分begin*********************************** */
				                if (resRelaInfo.mktResCd == util.RES_RELA_CONST.SUBSIDY_ACCEPT) {// 资源规格类型为补贴券
					                // 销售品属性
					                var attrList = prodOfferInfo.attrList;
					                for (var i = 0, len = attrList.length; i < len; i++) {
						                var attrInfo = attrList[i];
						                // 取属性的默认值
						                if (attrInfo.attrCd == util.RES_RELA_CONST.SUBSIDY_ATTR_CD) {
							                initObj.subsidyFee = attrInfo.defaultValue;
							                break;
						                }
					                }
				                }
				                if (resRelaInfo.mktResCd == util.RES_RELA_CONST.RENT_ACCEPT) {// 资源规格类型为CDMA租机促销
					                var attrList = prodOfferInfo.attrList;
					                for (var i = 0, len = attrList.length; i < len; i++) {
						                var attrInfo = attrList[i];
						                if (attrInfo.attrCd == util.RES_RELA_CONST.RENT_ATTR_CD) {
							                var defaultValue = attrInfo.defaultValue;
							                var attrObj = dojo.query("[id="+attrInfo.attrCd+"]",contentPane.domNode)[0];
							                if (attrObj) {
								                defaultValue = attrObj.value || "0";
								                // 给属性增加事件
								                dojo.connect(attrObj, "onblur", function() {
									                        var realFee = this.value;
									                        if (!realFee) { return; }
									                        if (dojo.query("[id=realFee]",contentPane.domNode)[0]) {
										                        dojo.query("[id=realFee]",contentPane.domNode)[0].value = realFee;
									                        }
								                        });
							                }
							                initObj.realFee = defaultValue;
							                initObj.mktResName = resRelaInfo.mktResName;// 营销资源名称
							                break;
						                }
					                }
				                }
				                /** ***************************初始化卡片个性部分end************************************* */
				                var resourceCardWidget = new resourceCardWidgetClass(initObj);
				                resourceCardWidget.renderCard(contentPane.domNode, "last");
			        			builder.resourceCardList.push(resourceCardWidget);
				                // 生成营销资源信息的集合
				                var resRelaItemInfo = {
					                "prodOfferInfoVO" : prodOfferInfo,
					                "productInfoVO" : "",
					                "resRelaInfo" : resRelaInfo,
					                "itemIndex" : resRelaInfo.mktResCd,
					                "acceptCardObj" : resourceCardWidget.busCardInstance
				                };
				                builder.resRelaItemList[resRelaInfo.mktResCd] = resRelaItemInfo;
				                // builder.resRelaItemList = resRelaItemList;
				                if (resRelaInfo.mktResCd == util.RES_RELA_CONST.GIFT_ACCEPT) {// 终端类型为话费礼券
			        
							        var addButton = "<div id='showCoupons' style='margin-left:0px;margin-right:0px'>\
														<input type='hidden' id='couponsInfo' name='couponsInfo' value='' />\
														<table width='100%' border='1' cellspacing='0' cellpadding='0' \
																bordercolor='#bce2f5' style='border-collapse: collapse;'> \
															<tr> \
																<td colspan='4' align='right'> \
																	<input type='button' name='addRecord' id='addRecord' value='\u6dfb\u52a0\'  \
																		dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/couponsAdd'\
																		rowIndex="+prodOfferDetailWidget.rowIndex+"\
																		style='cursor:pointer;text-align:center;vertical-align:middle;' class='button_l'/> \
																</td> \
															</tr> \
															<tr> \
																<td align='center'>\u793c\u5238\u7f16\u53f7</td> \
																<td align='center'>\u9884\u5b58\u6b3e</td> \
																<td align='center'>\u9884\u5b58\u751f\u6548\u65f6\u95f4</td> \
																<td align='center'>\u64cd\u4f5c</td> \
															</tr> \
															<tbody id='couponsData'></tbody> \
														</table> \
													</div>";	
							        dojo.place(addButton, contentPane.domNode, "last");
					                // 生成话费礼券的卡片
					                var resourceCardWidget = new resourceCardWidgetClass({
						                        "productId" : "-10000",
						                        "serviceOfferId" : "-1000",
						                        "cityCode" : loader.requestParam.cityCode
					                        });
					                resourceCardWidget.renderCard(contentPane.domNode, "last");
					                resourceCardWidget.busCardInstance.setParent(contentPane);
			        				builder.resourceCardList.push(resourceCardWidget);
			        				builder.couponsCardObj = resourceCardWidget.busCardInstance;
			    				    prodOfferDetailWidget.enableEvtMsgPropagation(contentPane.domNode);	
				                }
				                
		                });
		                prodOfferDetailWidget.resourceCardList = builder.resourceCardList;
		                prodOfferDetailWidget.resRelaItemList = builder.resRelaItemList;
		        },
		        
				/**
				 * 添加一行记录
				 */
				addRecord : function(couponsInfo,domNode){
					var builder = this;
					if(!couponsInfo){
				        /**MessageBox.alert({
					        title : "\u63d0\u793a\u4fe1\u606f",
					        message : "\u8bf7\u5148\u8f93\u5165\u793c\u5238\u7f16\u53f7\u67e5\u8be2\u793c\u5238\u4fe1\u606f!"
				        });*/
						//alert("请先输入礼券编号查询礼券信息!");
						messageBox.alert({
							busiCode : "08410119"
					 	 });
						return;
					}
					var couponsInfos = couponsInfo.split("~");
					var couponNo = couponsInfos[0];
					var payMent = couponsInfos[1];
					var effDate = couponsInfos[2];
					
					var ifHasCoupons = false;
					dojo.forEach(this.couponsList,function(coupons){
						if(coupons.couponNo == couponNo){
							ifHasCoupons = true;
						}
					})
					if(ifHasCoupons){
				        /**MessageBox.alert({
					        title : "\u63d0\u793a\u4fe1\u606f",
					        message : "\u6b64\u8bdd\u8d39\u793c\u5238\u53f7\u7801\u5df2\u9009\u7528"
				        });*/
						//alert("此话费礼券号码已选用");
						messageBox.alert({
							busiCode : "08410120"
					 	 });
						return false;
					}
					var name = "tr_"+this.couponIndex;
					var myBody = dojo.query("[id=couponsData]",domNode)[0];
					var myTr = myBody.insertRow();
					myTr.setAttribute("id",name);
					
					myTd = myTr.insertCell(0);
					myTd.setAttribute("align","center");
					myTd.innerHTML = couponNo;
					
					myTd = myTr.insertCell(1);
					myTd.setAttribute("align","center");
					myTd.innerHTML = payMent;
					
					myTd = myTr.insertCell(2);
					myTd.setAttribute("align","center");
					myTd.innerHTML = effDate;
					
					myTd = myTr.insertCell(3);
					myTd.setAttribute("align","center");
					myTd.innerHTML = "<a href='javascript:void(0);' id='href_"+this.couponIndex+"' trId='"+name+"'>\u5220\u9664</a>";
					
					var couponObj = {
						"couponNo" : couponNo,
						"payMent" : payMent,
						"myTrId" : name,
						"rowIndex" : this.couponIndex
					};
					
					this.couponsList.push(couponObj);
					
					$("href_"+this.couponIndex)
					dojo.query("[id=href_"+this.couponIndex+"]",domNode)[0].onclick = function(){
						builder.deleteRow(event.srcElement);
					}
					
					this.couponIndex++;
					
					//$("couponsInfo").value = "";
				},
				
				/**
				 * 删除记录
				 */
				deleteRow : function(thisObj){
					var name = event.srcElement.getAttribute("trId");
					//删除选定的记录
			        while (true) {
				        if (thisObj && (thisObj.tagName || "").toUpperCase() == 'TR') {	
				        	thisObj.parentNode.removeChild(thisObj);
					        break;
				        }
				        thisObj = thisObj.parentNode;
			        }
					for(var i=0;i<this.couponsList.length;i++){
						if(this.couponsList[i].myTrId == name){							
							//除去全局变量中的相同号码
							var current = this.couponsList[i].couponNo;
							var checkedcouponsList = null;
							try{checkedcouponsList = ordermgr.accept.compnew._coupon_no_list_ ;}catch(e){}
							if(checkedcouponsList){
								for(var j=0;j<checkedcouponsList.length;j++){
									var couponNo = checkedcouponsList[j].couponNO;
									if(couponNo.length>0 && couponNo == current){
										ordermgr.accept.compnew._coupon_no_list_.splice(j,1);
									}
								}
							}
							//删除已保存在集合中的数据
							this.couponsList.splice(i,1);
						}
					}
				},			
     
				/**
			     * 获取销售品营销资源相关数据
			     */
				getPageData : function(){
					var builder = this,
						prodOfferDetailWidget = this.prodOfferDetailWidget,
						prodOfferAttrCard = prodOfferDetailWidget.prodOfferAttrCard;
					builder.resRelaDataList = [];
					for (var p in builder.resRelaItemList) {
						if (!builder.resRelaItemList.hasOwnProperty(p)){
							continue;
						}
						var resRelaItemInfo = builder.resRelaItemList[p];
						if(resRelaItemInfo.resRelaInfo.mktResCd == util.RES_RELA_CONST.GIFT_ACCEPT){//话费礼券,礼券实例id特殊处理
							//遍历集合，获取所有的礼券实例ID
							var mktResInstIds = builder.getAllMktResInstId();
							resRelaItemInfo.acceptCardObj.$("mktResInstId").value = mktResInstIds;
						}
						var acceptCardData = resRelaItemInfo.acceptCardObj.getData();
						if(acceptCardData == false){
							if(resRelaItemInfo && resRelaItemInfo.resRelaInfo && resRelaItemInfo.resRelaInfo.mktResCd == util.RES_RELA_CONST.RENT_ACCEPT){
								resRelaItemInfo.acceptCardObj.$("deviceNo").focus();
							}
							builder.resRelaDataList = [];
							return false;
						}
						resRelaItemInfo.acceptCardData = acceptCardData;
						var resRelaData = {};
						resRelaData.mktResCd = resRelaItemInfo.resRelaInfo.mktResCd;
						if(acceptCardData.mktResInstId.indexOf("~") == -1){
							resRelaData.mktResInstId = acceptCardData.mktResInstId && typeof(acceptCardData.mktResInstId) != "undefined" ? acceptCardData.mktResInstId : "-1";
						}else{
							resRelaData.resinstIdStr = acceptCardData.mktResInstId && typeof(acceptCardData.mktResInstId) != "undefined" ? acceptCardData.mktResInstId : "-1";
						}
						if(resRelaItemInfo.resRelaInfo.mktResCd == util.RES_RELA_CONST.GIFT_ACCEPT){//话费礼券
							resRelaData.coupons = builder.getAllMktCouponNo();
						}
						resRelaData.relaType = resRelaItemInfo.resRelaInfo.relaType;
						resRelaData.mktResTypeCd = resRelaItemInfo.resRelaInfo.mktResTypeCd;
						resRelaData.resRelaKind = builder.resRelaKind;
						resRelaData.mktResId = acceptCardData.mktResId && typeof(acceptCardData.mktResId) != "undefined" ? acceptCardData.mktResId : "-1";
						resRelaData.verifyNo = acceptCardData.verifyNo && typeof(acceptCardData.verifyNo) != "undefined" ? acceptCardData.verifyNo : "-1";
						if(resRelaItemInfo.resRelaInfo.mktResCd == util.RES_RELA_CONST.SUBSIDY_ACCEPT){
							var modifyObj = {
								"operKind" : 0,
								"cardKind" : 1,
								"cardValue" : acceptCardData.subFee && typeof(acceptCardData.subFee) != "undefined" ? (acceptCardData.subFee/1)*100+"" : "0"
							};				
							resRelaData.modifyContent = dojo.toJson(modifyObj);
						}else if(resRelaItemInfo.resRelaInfo.mktResCd == util.RES_RELA_CONST.RENT_ACCEPT){
							var modifyObj = {
								"updateStatus" : "0",
								"saleMobilePrice" : acceptCardData.realFee && typeof(acceptCardData.realFee) != "undefined" ? (acceptCardData.realFee/1)*100+"" : "0"
							};				
							resRelaData.modifyContent = dojo.toJson(modifyObj);
						}else if(resRelaItemInfo.resRelaInfo.mktResCd == util.RES_RELA_CONST.GIFT_ACCEPT){//话费礼券
							var modifyObj = {
								"updateStatus" : "0"
							};
							resRelaData.modifyContent = dojo.toJson(modifyObj);
							//当营销资源为话费礼券时，话费礼券对应的终端实例id一起处理
							var deviceInstId = "-1";
							var deviceNo = "-1";
							if(builder.couponsCardObj){
								var deviceData = builder.couponsCardObj.getData();
								if(deviceData == false){
									builder.couponsCardObj.$("cdeviceNo").focus();
									builder.resRelaDataList = [];
									return false;
								}
								deviceInstId = deviceData.cmktResInstId && typeof(deviceData.cmktResInstId) != "undefined" ? deviceData.cmktResInstId : "-1";
								deviceNo = deviceData.cdeviceNo && typeof(deviceData.cdeviceNo) != "undefined" ? deviceData.cdeviceNo : "-1";
							}
							resRelaData.deviceInstId = deviceInstId;
							resRelaData.deviceNo = deviceNo;
							//计算多张话费礼券的预存款
							if(prodOfferAttrCard && prodOfferAttrCard.busCardInstance&& prodOfferAttrCard.busCardInstance.$('936')){
								builder.countCouponValue();
							}
						}else if(resRelaItemInfo.resRelaInfo.mktResCd == util.RES_RELA_CONST.INTERNET_CAT){//上网猫
							var modifyObj = {
								"updateStatus" : "0"
							};
							resRelaData.modifyContent = dojo.toJson(modifyObj);
						}else {
							resRelaData.modifyContent = "";
						}
						builder.resRelaDataList.push(resRelaData);
					}
					
					return builder.resRelaDataList;
				},				
	
				/**
				 * 计算多张话费礼券预存款总额
				 */
				countCouponValue : function(){
					var couponValueAll = 0,
						checkedCouponList = null,
						prodOfferDetailWidget = this.prodOfferDetailWidget,
						prodOfferAttrCard = prodOfferDetailWidget.prodOfferAttrCard;
					try{checkedCouponList = ordermgr.accept.compnew._coupon_no_list_ ;}catch(e){}
					if(checkedCouponList){
						for(var i=0;i<checkedCouponList.length;i++){
							var payMent = checkedCouponList[i].payMent;
							couponValueAll += parseInt(payMent);
						}
					}
					var attrElem = prodOfferAttrCard.busCardInstance.$('936');
					if(attrElem){
						attrElem.value = couponValueAll;
					}
				},
				
				/**
				 * 获取所有礼券实例id
				 */
				getAllMktResInstId : function(){
					var mktResInstIdStr = "";
					var checkedCouponList = null;
					try{checkedCouponList = ordermgr.accept.compnew._coupon_no_list_ ;}catch(e){}
					if(checkedCouponList){
						for(var i=0;i<checkedCouponList.length;i++){
							var flag = dojo.some(this.couponsList ||[],function(oneCoupon){
								return oneCoupon.couponNo == checkedCouponList[i].couponNO;
							});
							if(flag){
								var mktResInstId = checkedCouponList[i].mktResInstId;
								mktResInstIdStr += (mktResInstId+"~");
							}
							
						}
						mktResInstIdStr = mktResInstIdStr.substring(0,mktResInstIdStr.length-1);
					}
					return mktResInstIdStr;
				},
				
				/**
				 * 获取所有礼券编号
				 */
				getAllMktCouponNo : function(){
					var coupons = "";
					var checkedCouponList = null;
					try{checkedCouponList = ordermgr.accept.compnew._coupon_no_list_ ;}catch(e){}
					if(checkedCouponList){
						for(var i=0;i<checkedCouponList.length;i++){
							var flag = dojo.some(this.couponsList ||[],function(oneCoupon){
								return oneCoupon.couponNo == checkedCouponList[i].couponNO;
							});
							if(flag){
								var couponNo = checkedCouponList[i].couponNO;
								coupons += (couponNo+"~");
							}
						}
						coupons = coupons.substring(0,coupons.length-1);
					}
					return coupons;
				},
				
				/**
				 * 回显已选的值
				 */
				setCheckedValue : function(acceptCardObj,elementName,elementValue){
					if(acceptCardObj.$(elementName)){
						acceptCardObj.$(elementName).value = elementValue;
						if(elementName == 'cdeviceNo'){
							acceptCardObj.$("cdeviceNo").focus();
						}
						acceptCardObj.$(elementName).onblur();
					}
				}
			});
		});