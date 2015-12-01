defineModule("orderaccept.prodofferaccept.loader.OldUserAddedHandler", ["orderaccept.base.Controller", "../util",
                "orderaccept.prodofferaccept.widget.mainprodoffer.MultipleMainProdOfferWidget",
                "orderaccept.common.dialog.MessageBox"], function(Controller, util, MultipleMainProdOfferWidget,
                messageBox) {
	        dojo.declare("orderaccept.prodofferaccept.loader.OldUserAddedHandler", [Controller], {
		        quitTemplate : null,
		        controller : null,
		        constructor : function(controller) {
			        this.controller = controller;
		        },
		        getQuitTemplate : function() {
			        if (this.quitTemplate == null) {
				        this.quitTemplate = dojo._getText(dojo.moduleUrl("orderaccept.prodofferaccept",
				                "widget/mainprodoffer/template/quitProdOfferTpl.html"));
				        
			        }
			        return this.quitTemplate;
			        
		        },
		        /**
				 * 断定选择的老号码可用
				 * 
				 * @method
				 */
		        assertOldUserAvailable : function(prodOfferData, uniqueId) {
			        var handler = this,
				        ActionCDConst = util.ACTION_CD_CONST,
				        serviceCardWidget = this.controller.serviceCardWidgetMap["serviceCardWidget_" + uniqueId],
				        productDom = dojo.query("TR[uniqueId=" + uniqueId + "]",
				                handler.controller.mainProdOfferWidget.domNode)[0],
				        productId = dojo.attr(productDom, "productId"),
				        prodInstVO = BusCard.jsonPath(prodOfferData || [],
				                "$.userHasProdOfferInfoList[*].prodInstList[?(@.productId=='" + productId + "')]")[0],
				        searchNumberNode = dojo.query("[name=searchNumber]", productDom)[0];
			        if (prodInstVO) {
				        var prodInstId = prodInstVO.prodInstId;
				        var list = dojo.query("TR[prodInstId=" + prodInstId + "]", productDom.parentNode);
				        if (list && (list.length > 0)) {
					        unieap.showTooltip(
					                "<p style='color:red'>\u9009\u62e9\u7684\u8001\u7528\u6237\u5df2\u5b58\u5728</p>",
					                searchNumberNode, ["below", 'after']);
					        setTimeout(function() {
						                unieap.hideTooltip(searchNumberNode);
					                }, 4000);
					        return false;
					        
				        }
			        } else {
				        unieap
				                .showTooltip(
				                        "<p style='color:red'>\u9009\u62e9\u7684\u8001\u7528\u6237\u65e0\u6548,\u8bf7\u6838\u67e5\u6570\u636e</p>",
				                        searchNumberNode, ["below", 'after']);
				        setTimeout(function() {
					                unieap.hideTooltip(searchNumberNode);
				                }, 4000);
				        return false;
			        }
			        
		        },
		        addOldUser : function(config) {
			        if (!$ac$.get("_prodOfferInstMap")) {
				        $ac$.set("_prodOfferInstMap", {});
			        }
			        config = dojo.isString(config) ? dojo.fromJosn(config) : config;
			        var prodOfferInstId = config.prodOfferInstId,
				        serviceId = config.serviceId,
				        uniqueId = config.uniqueId,
				        handler = this;
			        if ($ac$.get("_prodOfferInstMap")[prodOfferInstId]) {
				        // alert("\u6b64\u53f7\u7801\u5df2\u7ecf\u52a0\u5165\u5230"
				        // +
				        // "\u4e86\u5f53\u524d\u53d7\u7406\u7684\u9500\u552e\u54c1,\u8bf7\u786e\u8ba4");
				        messageBox.alert({
					                busiCode : "08410155"
				                });
				        // return false;
			        }
			        BusCard.doGet(BusCard.path.contextPath + "/orderDetailAction.do", {
				                method : "doGetProdOfferListForChgMainProvider",
				                prodOfferInstId : prodOfferInstId
			                }, true, function(prodOfferData) {
				                // if
				                // (handler.assertOldUserAvailable(prodOfferData,
				                // uniqueId) === false) { return
				                // false; }
				                
				                $ac$.get("_prodOfferInstMap")[prodOfferInstId] = prodOfferData;
				                // 处理服务信息
				                handler.convertProductServiceInfo(uniqueId, prodOfferData);
				                // 处理退订销售品展现
				                handler.renderQuitTemplate(uniqueId, prodOfferInstId, prodOfferData);
				                
				                handler.updateSelectedMemberProdOfferList(prodOfferData, prodOfferInstId, uniqueId);
				                
				                //变更主销售品时，选已有号码，处理销售品属性周价的生效时间的页面展现
				                handler.dealOfferAttrDisplay(uniqueId);
				                //变更主销售品时，针对选择已有号码的，并且主套餐是新装的，设置时间展现
				                handler.dealMainOfferDateDisplay(uniqueId);
				                // 处理可选包相关内容
				                handler.doSubProdofferHandling(prodOfferData, uniqueId);
				                // 选择已有号码走变更流程则不展示管理账号
				                handler.dealAccManageDisplay();
			                });
			        
		        },
		        
		        /**
		         * 变更主销售品时，针对选择已有号码的，并且主套餐是新装的，设置时间展现
		         */
		        dealMainOfferDateDisplay : function(){
		        	//如果入口就是销售品变更，那么则不处理时间
		        	if(!!$ac$.mainProdOfferInstVO){
		        		return ;
		        	}
		        	//否则，说明主销售品是新装，要设置新主销售品的生效时间
		        	try{
			        	if(dojo.getObject("prodOfferAcceptLoader.mainProdOfferWidget.domNode")!=null){
			        	 	dojo.query(".startDate-class", prodOfferAcceptLoader.mainProdOfferWidget.domNode)[0].innerText = util.DateHelper
					                .getStringFirstDayOFNextMonth();
		        		}
		        	}catch(e){
		        		
		        	}
		        },
		        
		        /**
		         * 变更主销售品时，选已有号码，处理销售品属性周价的生效时间的页面展现
		         */
		        dealOfferAttrDisplay : function(uniqueId){
		        	if($ac$.selectedMainProdOfferInfoVO.bindType == 2){
						var subProdOfferOrderProviderMap = prodOfferAcceptLoader.multipleSubProdOfferHandler.subProdOfferOrderProviderMap;
						var targetProdvider = null;
						for(var key in subProdOfferOrderProviderMap){
							if (!subProdOfferOrderProviderMap.hasOwnProperty(key)) {
						        continue;
					        }
				    		if(key == ("subProdOfferTreeContainer"+uniqueId)){
								targetProdvider = subProdOfferOrderProviderMap[key];
								break;
				    		}
						}
						try{
							if(dojo.getObject("prodOfferInfoWidget.mainProdOfferDetailWidget.prodOfferAttrCard.busCardInstance",targetProdvider) != null){
								var targetDom = targetProdvider.prodOfferInfoWidget.mainProdOfferDetailWidget.prodOfferAttrCard.busCardInstance.$('300075');
								if(!!targetDom){
									targetDom.value = '2';
									targetDom.disabled = true;
								}
							}
						}catch(e){
							
						}
					}else{
						try{
							if (dojo.getObject("prodOfferAcceptLoader.mainProdOfferDetailWidget.prodOfferAttrCard.busCardInstance") != null) {
								var pricObj = prodOfferAcceptLoader.mainProdOfferDetailWidget.prodOfferAttrCard.busCardInstance
								        .$("300075");
								if(!!pricObj){
									pricObj.value = '2';
									pricObj.disabled = true;	
								}
							}
						}catch(e){
							
						}
					}
		        },
		        /**
				 * 处理管理账号的展示问题，走变更流程不展示
				 */
		        dealAccManageDisplay : function() {
			        var manageNbrInfoDom = dojo.query('#manageNbrInfo')[0];
			        if (manageNbrInfoDom.children.length > 0) {
				        if (dojo.attr(dojo.query('#manageNbrInfo')[0].children[0], 'ifCreateAcc') != 1) {
					        messageBox.alert({
						                busiCode : "08410226"
					                });
				        }
			        }
			        dojo.query(".userAccountButton")[0].style.display = "none";
			        dojo.byId('manageNbrInfo').style.display = "none";
			        dojo.byId('manageNbrInfo').innerHTML = "";
		        },
		        /**
				 * 同步更新原有选中的成员产品信息
				 * 
				 * @param {Array}
				 *            prodOfferData.userHasProdOfferInfoList
				 * @param {Array}
				 *            prodOfferData.userHasProdOfferMetaInfoList
				 * @param {Number} prodOfferInstId
				 * @param {Number} uniqueId
				 * @method
				 */
		        updateSelectedMemberProdOfferList : function(prodOfferData, prodOfferInstId, uniqueId) {
			        var mainProdOfferInstVO = BusCard.jsonPath(prodOfferData,
			                "$.userHasProdOfferInfoList[?(@.prodOfferInstId==" + prodOfferInstId + ")]")[0];
			        if (!mainProdOfferInstVO) { return false; }
			        var isNeedQuit = this._isNeedQuit(uniqueId, mainProdOfferInstVO);
			        var targetMember = BusCard.jsonPath($ac$.get('selectedMemberProdOfferList'), "$[?(@.uniqueId=="
			                        + uniqueId + ")]")[0];
			        targetMember.action = isNeedQuit ? "change" : "nochange";
			        targetMember.offerInstVO = mainProdOfferInstVO;
			        targetMember.prodOfferInstId = mainProdOfferInstVO.prodOfferInstId;
			        targetMember.prodInstVO = mainProdOfferInstVO.prodInstList[0];
			        targetMember.prodInstId = targetMember.prodInstVO.prodInstId;
			        targetMember.memberFromOldNumber = true;
			        this.updateTitleInfo(uniqueId,targetMember);
		        },
		        updateTitleInfo:function(uniqueId,memberInfo){
		        	try{
		        		var mainProdOfferWidget = this.controller.mainProdOfferWidget;
		        		var trNode = dojo.query("tr[uniqueId="+uniqueId+"]",mainProdOfferWidget.domNode)[0];
		        		var tabController = this.controller.multipleSubProdOfferHandler.subProdOfferTabContainer.tablist;
		        		var provider = this.controller.multipleSubProdOfferHandler.subProdOfferOrderProviderMap['subProdOfferTreeContainer'+uniqueId];
		        		var contentPane = provider.contentPane;
		        		var labelContainer = tabController.pane2button[contentPane].containerNode;
		        		var prodOfferInfoVO = $ac$.get("prodOfferList"+uniqueId).find(function(v){return v.prodOfferId==memberInfo.prodOfferId});
		        		labelContainer.innerHTML = prodOfferInfoVO.prodOfferName+"-\u6210\u5458\u52a0\u88c5";
		        		dojo.query(".product-action-span",trNode)[0].innerHTML = "\u6210\u5458\u52a0\u88c5";
		        	
		        	}catch(e){
		        	
		        	}
		        		
		        },
		        /**
				 * 把新装服务信息卡片转换为变更卡片
				 * 
				 * @param {Number} uniqueId
				 * @param {Array}
				 *            prodOfferData.userHasProdOfferInfoList
				 * @param {Array}
				 *            prodOfferData.userHasProdOfferMetaInfoList
				 * @method
				 */
		        convertProductServiceInfo : function(uniqueId, prodOfferData) {
			        var handler = this,
				        ActionCDConst = util.ACTION_CD_CONST,
				        serviceCardWidget = this.controller.serviceCardWidgetMap["serviceCardWidget_" + uniqueId],
				        attrCardWidget = serviceCardWidget.attrCardWidget,
				        serviceProductWidget = serviceCardWidget.serviceProductWidget,
				        productDom = dojo.query("TR[uniqueId=" + uniqueId + "]",
				                handler.controller.mainProdOfferWidget.domNode)[0],
				        productId = dojo.attr(productDom, "productId"),
				        prodInstVO = BusCard.jsonPath(prodOfferData,
				                "$.userHasProdOfferInfoList[*].prodInstList[?(@.productId=='" + productId + "')]")[0],
				        productChgServiceOfferId = this.controller
				                .getServiceOfferConfigVO(ActionCDConst.PRODUCT_CHANGE).serviceOfferId;
			        dojo.attr(productDom, {
				                userId : prodInstVO.prodInstId,
				                prodInstId : prodInstVO.prodInstId,
				                serviceId : prodInstVO.accNbr
			                });
			        if (serviceCardWidget) {
				        serviceCardWidget.destroyRecursive();
			        }
			        if (attrCardWidget) {
			        	if(!!attrCardWidget.busCardInstance.deleteReceiveMessagePath){
			        		attrCardWidget.busCardInstance.deleteReceiveMessagePath();
			        	}
				        attrCardWidget.destroyRecursive();
				        
			        }
			        if (serviceProductWidget) {
				        serviceProductWidget.destroyRecursive();
			        }
			        handler.updateProductBasicViewStatus(productDom);
			        // 转换成变更的服务卡片并初始化产品属性信息
			        this.controller.route("/self/addServiceCardWidget", [uniqueId, function(productDom, param) {
				                        param.userId = prodInstVO.prodInstId;
				                        param.serviceId = prodInstVO.accNbr;
				                        param.serviceOfferId = productChgServiceOfferId;
				                        // binding extend data
				                        return {
					                        attrCardBindingData : {
						                        prodInstVO : prodInstVO
					                        }
				                        };
				                        
			                        }, function() {
				                        var card = this.busCardInstance;
			                        }]);
		        },
		        updateProductBasicViewStatus : function(dom) {
			        var uniqueId = dojo.attr(dom, "uniqueId");
			        dojo.query("input[name=serviceId]", dom)[0].value = dojo.attr(dom, "serviceId");
			        dojo.forEach(dojo._toArray(dojo.query("input[name=serviceOper-" + dojo.attr(dom, "viewId") + "-"
			                        + uniqueId + "]")), function(radioDom) {
				                radioDom.disabled = true;
			                });
			        var productCheckDom = dojo.query(".main-product-check", dom)[0];
			        productCheckDom.checked = true;
			        productCheckDom.disabled = true;
			        
		        },
		        
		        _isNeedQuit : function(uniqueId, mainProdOfferInstVO) { 
			        var handler = this,
				        productDom = dojo.query("TR[uniqueId=" + uniqueId + "]",
				                handler.controller.mainProdOfferWidget.domNode)[0],
				        memberProdOfferElem = dojo.query(".member-main-prodoffer", productDom);
			        if (memberProdOfferElem[0] && mainProdOfferInstVO) {
				        if (memberProdOfferElem[0].value == mainProdOfferInstVO.prodOfferId) { return false; }
			        }
			        return true;
		        },
		        
		        /**
				 * 处理选择老号码的时间展示
				 */
		        dealNewAndOldTime : function(endDate, uniqueId, mainProdOfferInstVO) {
			        // 时间先设置成下月生效
			        endDate = util.DateHelper.getStringFirstDayOFNextMonth();
			        // 此处需要判断是e9自助版还是单套餐,设置新的销售品的开始时间
			        if ($ac$.currentMainProdOfferInfoVO.bindType == 2) {
				        var subProdOfferCartDataProvider = this.controller.multipleSubProdOfferHandler.subProdOfferOrderProviderMap['subProdOfferTreeContainer'
				                + uniqueId];
				        var contentPane = subProdOfferCartDataProvider.contentPane;
				        // 只有是新装的时候才初始化
				        if (contentPane.action == "new") {
					        dojo.query(".startDate-class", contentPane.domNode)[0].innerText = util.DateHelper
					                .getStringFirstDayOFNextMonth();
				        }
			        } else {
						//销售品实例是不存在的时候才对主销售品设置生效时间
						if(!$ac$.mainProdOfferInstVO){
					        dojo.query(".startDate-class", prodOfferAcceptLoader.mainProdOfferWidget.domNode)[0].innerText = util.DateHelper
					                .getStringFirstDayOFNextMonth();
						}
			        }
			        
			        //协议的生效时间和结束时间对象
			        var agreeDateObj = null;
			        // 如果旧的销售品是宽带协议套餐，则进行特殊处理,否则不特殊处理
			        if (mainProdOfferInstVO.offerStandardInstList
			                && mainProdOfferInstVO.offerStandardInstList.length > 0) {
				        //获取结束时间和开始时间
				        util.ProdOfferInstProvider.getBeginAndEndDateForAgreeMentLN(mainProdOfferInstVO);
				        agreeDateObj = $ac$.get("offerStandardStartDate_" + mainProdOfferInstVO.prodOfferInstId);
				        //设置旧的销售品的结束时间
				        endDate = agreeDateObj.oldOfferEndDate;
			            // 非自主版的时候
				        if ($ac$.currentMainProdOfferInfoVO.bindType == 0) {
					        dojo.query(".startDate-class", prodOfferAcceptLoader.mainProdOfferWidget.domNode)[0].innerText = agreeDateObj.beginDate;	
				        } else if($ac$.currentMainProdOfferInfoVO.bindType == 2){
					        var subProdOfferCartDataProvider = this.controller.multipleSubProdOfferHandler.subProdOfferOrderProviderMap['subProdOfferTreeContainer'
				                + uniqueId];
				        	var contentPane = subProdOfferCartDataProvider.contentPane;
					        dojo.query(".startDate-class", contentPane.domNode)[0].innerText = agreeDateObj.beginDate;
				        }
			        }
			        
			        //判断如果是单销售品，则直接更改销售品的协议开始时间和结束时间
			        if ($ac$.currentMainProdOfferInfoVO.bindType == 0&& $ac$.currentMainProdOfferInfoVO.offerAgreementVO.length > 0) {
				        prodOfferAcceptLoader.mainProdOfferDetailWidget.agreementAttrCardWidget
				                .resetOfferStandardTime(agreeDateObj.beginDate);
				    //TODO 判断如果是组合，则找到组合的协议对应的widget，进行更新销售品的开始时间和协议开始时间结束时间
			        }else if($ac$.currentMainProdOfferInfoVO.bindType == 2){
			        	//根据uniqueId获取成员销售品信息，判断成员销售品是否是协议销售品
				    	var memProdOfferWidget = prodOfferAcceptLoader.multipleSubProdOfferHandler.subProdOfferOrderProviderMap["subProdOfferTreeContainer"+uniqueId].prodOfferInfoWidget;
			        	var prodOfferInfoVO = memProdOfferWidget.prodOfferInfoVO;
			        	if(prodOfferInfoVO.offerAgreementVO.length > 0){
			        		//设置成员销售品的协议生效时间和失效时间
			        		memProdOfferWidget.mainProdOfferDetailWidget.agreementAttrCardWidget.resetOfferStandardTime(agreeDateObj.beginDate);
			        	}
			        }
		        },
		        
		        /**
				 * @param {Array}
				 *            prodOfferData.userHasProdOfferInfoList
				 * @param {Array}
				 *            prodOfferData.userHasProdOfferMetaInfoList
				 * @method
				 */
		        renderQuitTemplate : function(uniqueId, prodOfferInstId, prodOfferData) {
			        // logic same as
			        // ChgMainProdOfferWidget.buildQuitProdOfferViewInitData
			        // begin
			        var mainProdOfferInstVOQR = BusCard.jsonPath(prodOfferData,
			                "$.userHasProdOfferInfoList[?(@.prodOfferInstId==" + prodOfferInstId + ")]"),
				        templateInitData = null,
				        mainProdOfferInstVO = null;
			        if (mainProdOfferInstVOQR) {
				        mainProdOfferInstVO = mainProdOfferInstVOQR[0];
				        if (!this._isNeedQuit(uniqueId, mainProdOfferInstVO)) { return false; }
				        var prodOfferInfoVO = BusCard.jsonPath(prodOfferData,
				                "$.userHasProdOfferMetaInfoList[?(@.prodOfferId==" + mainProdOfferInstVO.prodOfferId
				                        + ")]")[0],
					        Me = this,
					        key = this.key,
					        viewId = key + "-" + prodOfferInfoVO.parentProdOfferId + prodOfferInfoVO.prodOfferId,
					        actionName = "\u9000\u8ba2",
					        productDateBuilder = util.ProdOfferHelper.getProductDateBuilder(prodOfferInfoVO, {
						                beginDate : mainProdOfferInstVO.effDate,
						                endDate : mainProdOfferInstVO.expDate,
						                changeKind : 3
					                }),
					        startDate = mainProdOfferInstVO.effDate,
					        endDate = productDateBuilder.getEndDate();
				        this.dealNewAndOldTime(endDate, uniqueId, mainProdOfferInstVO);
				        tpContext = {
					        "prodOfferInstId" : mainProdOfferInstVO.prodOfferInstId,
					        "prodOfferDetailFlag" : '0',
					        "viewId" : viewId,
					        "startDate" : startDate,
					        "endDate" : endDate,
					        "actionName" : actionName,
					        "displayStartEndTime" : "",
					        "prodOfferInfoVO" : prodOfferInfoVO
				        };
				        templateInitData = {
					        prodOfferViewData : tpContext,
					        // 经过讨论,主产品变更不处理退订的产品,检测部分需要
					        // 检测,变更后的销售品产品上要和老的销售品完全匹配
					        prodViewData : []
					                || this.buildQuitProductViewInitData(prodOfferInfoVO, mainProdOfferInstVO, {
						                        key : key
					                        })
					        
				        }
				        
			        }
			        // logic same as
			        // ChgMainProdOfferWidget.buildQuitProdOfferViewInitData
			        // end
			        if (templateInitData) {
				        var interpretedTemplate = BusCard.Template.create(this.getQuitTemplate())
				                .apply(templateInitData);
				        var _tempTableNode = document.createElement("TABLE");
				        trNode = dojo._toDom(interpretedTemplate);
				        _tempTableNode.appendChild(trNode);
				        var fragment = document.createDocumentFragment();
				        dojo.forEach(dojo._toArray(_tempTableNode.childNodes), function(node) {
					                fragment.appendChild(node);
					                
				                });
				        var childNodes = fragment.childNodes,
					        handler = this;
				        dojo.forEach(dojo._toArray(childNodes), function(node) {
					                if (node.nodeType == 1) {
						                handler.controller.mainProdOfferWidget.enableEvtMsgPropagation(node);
					                }
					                
				                });
				        dojo
				                .query("table.main-prodoffer-table",
				                        this.controller.mainProdOfferWidget.domNode.parentNode)[0]
				                .appendChild(fragment);
				        
			        }
			        
		        },
		        /**
				 * 处理可选包相关内容
				 * 
				 * @param {Array}
				 *            prodOfferData.userHasProdOfferInfoList
				 * @param {Array}
				 *            prodOfferData.userHasProdOfferMetaInfoList
				 * 
				 * @method
				 */
		        doSubProdofferHandling : function(prodOfferData, uniqueId) {
			        var subProdOfferCartDataProvider = null;
			        // 根据主销售品是否是e9自主版来决定subProdOfferCartDataProvider
			        var mainProdOfferInfoVO = util.ProdOfferHelper.getMainProdOffer(dojo.global.$appContext$
			                .get("prodOfferList"))[0];
			        //获取新的主销售品或成员销售品信息
			        var newMainProdOfferInfo = null;
			        if (mainProdOfferInfoVO.bindType == 2) {
			        	newMainProdOfferInfo = util.ProdOfferHelper.getMainProdOffer(dojo.global.$appContext$.get("prodOfferList" + uniqueId))[0];
				        subProdOfferCartDataProvider = this.controller.multipleSubProdOfferHandler.subProdOfferOrderProviderMap['subProdOfferTreeContainer'
				                + uniqueId];
				        var paneNode = null;
				        var prodOfferId = subProdOfferCartDataProvider.contentPane.prodOfferInfoVO.prodOfferId;
				        var prodOfferInstVO = dojo.filter(prodOfferData.userHasProdOfferInfoList, function(prodOffer) {
					                return prodOffer.prodOfferId == prodOfferId;
				                })[0];
				        var prodOfferInfoVO = dojo.filter(prodOfferData.userHasProdOfferMetaInfoList, function(
				                        prodOffer) {
					                return prodOffer.prodOfferId == prodOfferId;
				                })[0];
				        if (!!prodOfferInstVO && !!subProdOfferCartDataProvider
				                && !!subProdOfferCartDataProvider.prodOfferInfoWidget) {
				            subProdOfferCartDataProvider.contentPane.offerInstVO = prodOfferInstVO;
					        paneNode = subProdOfferCartDataProvider.prodOfferInfoWidget.domNode.parentNode;
					        subProdOfferCartDataProvider.prodOfferInfoWidget.destroyRecursive();
					        //删除原有的销售品详情widget
					        var attachDetailWidget = subProdOfferCartDataProvider.prodOfferInfoWidget.mainProdOfferDetailWidget;
					        attachDetailWidget&&attachDetailWidget.destroyRecursive();
					        subProdOfferCartDataProvider.prodOfferInfoWidget.mainProdOfferDetailWidget = null;
					        subProdOfferCartDataProvider.prodOfferInfoWidget = null;
					        var offerInfoWidget = new MultipleMainProdOfferWidget({
						                mainProdOfferInfoVO : prodOfferInfoVO,
						                prodOfferInstVO : prodOfferInstVO,
						                uniqueId : uniqueId,
                                        contentPane : subProdOfferCartDataProvider.contentPane
					                });
					        !!subProdOfferCartDataProvider
					                ? subProdOfferCartDataProvider.prodOfferInfoWidget = offerInfoWidget
					                : null;
					        dojo.place(offerInfoWidget.domNode, paneNode, "first");
					        //主动初始化销售品详情
					        this.controller.multipleSubProdOfferHandler.initMainProdOfferDetail(offerInfoWidget);
				        }
			        } else {
			        	newMainProdOfferInfo = util.ProdOfferHelper.getMainProdOffer(dojo.global.$appContext$.get("prodOfferList"))[0];
				        subProdOfferCartDataProvider = this.controller.multipleSubProdOfferHandler.subProdOfferOrderProviderMap['subProdOfferTreeContainer'];
			        }
			        // 获取可选包购物车中已经有的销售品信息
			        var subProdOfferCartData = subProdOfferCartDataProvider.getSubGridBindingData();
			        // 将购物车中已经有的可选包销售品绑定数据信息进行分类，将
			        var addProdOfferCartData = dojo.filter(subProdOfferCartData, function(data) {
				                return data.showData.prodOfferStyle == "prod-offer-add"||(data.showData.prodOfferStyle == "prod-offer-unorder"&&data.prodOfferInst == null);
			                });
			        // 用户已有的销售品实例数据信息
			        var userHasProdOfferInfoList = prodOfferData.userHasProdOfferInfoList;
			        // 用户已有的销售品数据PPM规格数据信息
			        var userHasProdOfferMetaInfoList = prodOfferData.userHasProdOfferMetaInfoList;
			        // 将用户已经有的信息放入PPM规格数据
			        var _oldHasUserHasProdOfferMetaInfoList = dojo.global.$appContext$["userHasProdOfferMetaInfoList"
			                + (subProdOfferCartDataProvider.uniqueId || '')];
			        if (_oldHasUserHasProdOfferMetaInfoList) {
				        Array.prototype.push.apply(_oldHasUserHasProdOfferMetaInfoList, userHasProdOfferMetaInfoList);
			        } else {
				        dojo.global.$appContext$.set("userHasProdOfferMetaInfoList"
				                        + (subProdOfferCartDataProvider.uniqueId || ''), userHasProdOfferMetaInfoList);
			        }
			        // 旧的主销售品信息
			        var oldMainProdOfferInfo = util.ProdOfferHelper.getMainProdOffer(userHasProdOfferMetaInfoList)[0];
			        // 计算保留的销售品和删除的销售品
			        var param = {
			        	newMainProdOfferInfo : newMainProdOfferInfo,
				        addProdOfferCartData : addProdOfferCartData,
				        userHasProdOfferInfoList : userHasProdOfferInfoList,
				        userHasProdOfferMetaInfoList : userHasProdOfferMetaInfoList
			        },
				        keepOrCancelProdOfferData = util.ProdOfferInstProvider.getKeepOrCancelProdOfferDataByPPM(param);
			        // 将要退订的和变更的数据展示到页面，供处理
			        var data = {
				        keepProdOfferInstList : keepOrCancelProdOfferData.keepProdOfferInstList,
				        cancelProdOfferInstList : keepOrCancelProdOfferData.cancelProdOfferInstList,
				        mainProdOfferInst : dojo.filter(userHasProdOfferInfoList, function(userHasProdOfferInfo) {
					                return userHasProdOfferInfo.prodOfferId == oldMainProdOfferInfo.prodOfferId;
				                })[0]
			        }
			        subProdOfferCartDataProvider.showChgOrderedProdOffer(data);
			        // 将要置成无效的设置页面状态（置成不选，不可选择，并且条目颜色变化,销售品详情置成不可点击状态）
			        var productDom = dojo.query("TR[uniqueId=" + uniqueId + "]")[0];
			        var serviceKind = dojo.attr(productDom, "serviceKind");
			        var serviceKindIndex = dojo.attr(productDom, "serviceKindIndex");
			        var serviceNumber = dojo.attr(productDom, "serviceId");
			        var invalidProdOfferCartData = dojo.filter(addProdOfferCartData, function(data) {
				                return dojo.some(keepOrCancelProdOfferData.keepProdOfferInstList, function(
				                                keepProdOfferInstVO) {
					                        if (data.showData.chooseNumberObj != null) {
						                        return data.subProdOfferInfo.prodOfferId == keepProdOfferInstVO.prodOfferId
						                                && data.showData.chooseNumberObj.serviceKind == serviceKind
						                                && data.showData.chooseNumberObj.serviceKindIndex == serviceKindIndex;
					                        } else {
						                        return data.subProdOfferInfo.prodOfferId == keepProdOfferInstVO.prodOfferId;
					                        }
				                        });
			                });
			        var leftProdOfferList = dojo.filter(addProdOfferCartData||[],function(_data_){
			        	var flag = dojo.some(invalidProdOfferCartData||[],function(data){
			        		return data.subProdOfferInfo.prodOfferId == _data_.subProdOfferInfo.prodOfferId
			        	});
			        	if(flag){
			        		return false;
			        	}else{
			        		return true;
			        	}
			        });
			        subProdOfferCartDataProvider.setInvalidProdOfferCartData(invalidProdOfferCartData);
			        // 通过页面上的serviceKind和serviceKindIndex更新可选包购物车中的使用号码
			        this.updataUseServiceId(serviceKind, serviceKindIndex, serviceNumber, subProdOfferCartDataProvider);
			        //更新页面上的订购的销售品信息(此处包含开始时间和样式)
			        this.updateAddReserveSubProdOffer(addProdOfferCartData,invalidProdOfferCartData,subProdOfferCartDataProvider);
		        	this.createResetSubProdOfferData(mainProdOfferInfoVO,leftProdOfferList,data,uniqueId);
		        },
		        
		        /**
		         * 创建重置数据
		         */
		        createResetSubProdOfferData : function(mainProdOfferInfoVO,leftProdOfferList,data,uniqueId){
		        	var leftProdOfferListInfo = dojo.map(leftProdOfferList||[],function(data){
		        		return data.subProdOfferInfo;
		        	}); 
		        	if(mainProdOfferInfoVO.bindType == 2){
			        	dojo.global.$appContext$.set("leftProdOfferList" + uniqueId, leftProdOfferListInfo);
			        	//保留的
				        dojo.global.$appContext$.set("keepProdOfferInstList" + uniqueId, data.keepProdOfferInstList);
					    //删除的
					    dojo.global.$appContext$.set("cancelProdOfferInstList" + uniqueId, data.cancelProdOfferInstList);
					    dojo.global.$appContext$.set("mainProdOfferInstVO"+uniqueId,data.mainProdOfferInst);
			        }else{
			        	dojo.global.$appContext$.set("leftProdOfferList", leftProdOfferListInfo);
			        	//保留的
				        dojo.global.$appContext$.set("keepProdOfferInstList", data.keepProdOfferInstList);
					    //删除的
					    dojo.global.$appContext$.set("cancelProdOfferInstList", data.cancelProdOfferInstList);
					    dojo.global.$appContext$.set("mainProdOfferInstVO",data.mainProdOfferInst);
			        }
		        },
		        /**
				 * 更新页面上的使用号码
				 */
		        updataUseServiceId : function(serviceKind, serviceKindIndex, serviceNumber,
		                subProdOfferCartDataProvider) {
			        var handler = this;
			        var subProdOfferOrderGridDom = subProdOfferCartDataProvider.subProdOfferOrderGrid.domNode;
			        // 获取可选包购物车中已经有的销售品信息
			        var subProdOfferCartData = subProdOfferCartDataProvider.getSubGridBindingData();
			        // 将购物车中已经有的可选包销售品绑定数据信息进行分类，将
			        var addProdOfferCartData = dojo.filter(subProdOfferCartData, function(data) {
				                return data.showData.prodOfferStyle == "prod-offer-add";
			                });
			        dojo.forEach(addProdOfferCartData, function(data) {
				        var chooseNumberObj = data.showData.chooseNumberObj;
				        var rowIndex = data.rowIndex;
				        if (chooseNumberObj != null && chooseNumberObj.serviceKind == serviceKind
				                && chooseNumberObj.serviceKindIndex == serviceKindIndex) {
					        data.showData.chooseNumberObj.serviceId = serviceNumber;
					        dojo.query(".choose_number_class_" + rowIndex, subProdOfferOrderGridDom)[0].childNodes[0].innerText = serviceNumber;
				        }
			        });
		        },
		        
		        /**
		         * 更新页面样式以及展示时间
		         */
		        updateAddReserveSubProdOffer : function(addProdOfferCartData,invalidProdOfferCartData,subProdOfferCartDataProvider){
		        	var subProdOfferOrderGrid = subProdOfferCartDataProvider.subProdOfferOrderGrid.domNode;
		        	var addOrResverList = dojo.filter(addProdOfferCartData||[],function(_addData_){
		        		return !dojo.some(invalidProdOfferCartData||[],function(_tempData_){
		        			return _addData_.rowIndex == _tempData_.rowIndex;
		        		});
		        	});
		        	//新的销售品的生效时间
		        	var newEffectDate = null;
		        	if(addOrResverList.length>0){
		        		newEffectDate = this.getNewOfferStardardDate(subProdOfferCartDataProvider);
		        	}
		        	dojo.forEach(addOrResverList||[],function(_data_){
		        		var rowIndex = _data_.showData.rowIndex;
		        	 	var viewId = _data_.showData.viewId;
		        	 	var subProdOfferDetailDiv = dojo.query(".subProdOfferDetail-"
				                                + rowIndex, subProdOfferOrderGrid)[0];
				        var subProdOfferStartDateDiv = dojo.query(".subProdOfferStartDate-"
				                                + rowIndex, subProdOfferOrderGrid)[0];
		                var chooseStartDateParentNode = dojo.query(
		                        ".productStartDateStyle", subProdOfferStartDateDiv)[0];
		                var subProdOfferEndDateDiv = dojo.query(".subProdOfferEndDate-"
		                                + rowIndex, subProdOfferOrderGrid)[0];
		                if(_data_.prodOfferInst == null){
		        	 		if(chooseStartDateParentNode){
		        	 			chooseStartDateParentNode.style.display = "none";
		        	 		}
		        	 		dojo.query(".start_date_class",subProdOfferStartDateDiv)[0].innerHTML = util.DateHelper.formatDate(util.DateHelper.getFirstDayAfterPeriod());
		        	 		//根据新的协议销售品的生效时间，更新订购的可选包的生效时间
		        	 		if(newEffectDate!=null){
		        	 			dojo.query(".start_date_class",subProdOfferStartDateDiv)[0].innerHTML = newEffectDate;
		        	 		}
		        	 		//更新时间
//		        	 		if(subProdOfferDetailDiv.childNodes[0].checked){
//			        	 		subProdOfferCartDataProvider.setSubGridCssStyle("prod-offer-reserve",_data_.rowIndex);
//			        	 		_data_.showData.prodOfferStyle = "prod-offer-reserve";
//		                	}
		        	 	}
		        	});
		        },
		        
		        /**
		         * 获取成员销售品实例信息
		         */
		        getNewOfferStardardDate : function(subProdOfferCartDataProvider){
		        	var uniqueId = subProdOfferCartDataProvider.uniqueId;
		        	var selectedMemberProdOfferList = $ac$.get('selectedMemberProdOfferList');
		        	var memberInstVO = null;
		        	if(uniqueId!=""){
		        		//成员销售品实例
		        		memberInstVO = BusCard.find(selectedMemberProdOfferList||[],function(selectedMemberProdOfferInfo){
		        			return selectedMemberProdOfferInfo.uniqueId == uniqueId;
		        		});
		        	}else{
		        		memberInstVO = selectedMemberProdOfferList[0];
		        	}
					if($ac$.get("offerStandardStartDate_"+memberInstVO.prodOfferInstId)){
						return $ac$.get("offerStandardStartDate_"+memberInstVO.prodOfferInstId).beginDate;
					}
					return null;
		        }
		        
	        })
	        
        });
