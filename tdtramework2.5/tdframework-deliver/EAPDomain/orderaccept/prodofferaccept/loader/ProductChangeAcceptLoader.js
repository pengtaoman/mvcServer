defineModule(
        "orderaccept.prodofferaccept.loader.ProductChangeAcceptLoader",
        ["../util", "./MainProdOfferChangeLoader", "orderaccept.common.dialog.MessageBox","./ProductChangeAcceptMultipleSubProdOfferHandler"],
        function(util, MainProdOfferChangeLoader,MessageBox,ProductChangeAcceptMultipleSubProdOfferHandler) {
	        /**
			 * 定义变更主销售品整体控制器
			 * 
			 * @class
			 * @extends
			 */
	        dojo.declare("orderaccept.prodofferaccept.loader.ProductChangeAcceptLoader", [MainProdOfferChangeLoader], {
		        layoutTemplateUrl : dojo.moduleUrl("orderaccept.prodofferaccept", "view/productChangeAcceptLayout.html"),
		      
		        
		      
		        postscript : function() {
			        return this.inherited(arguments);
		        },
		        _asynCallback : function() {
			        this.inherited(arguments);
			        var controller = this;
			        controller.initUserHasProdOfferData();

                    this.renderChangeParamList();
		        },
		        registerClass : function() {
			        this.inherited(arguments);
			        this.mainProdOfferWidgetClass = orderaccept.prodofferaccept.widget.mainprodofferchangemain.ProductChangeAcceptChgMainProdOfferWidget;
		        },
		        /**
				 * 设置区域值，并将其置灰，不可选择的状态
				 */
		        disableBelongCode : function() {
			        // 1.获取区域
			        var belongcode = this.getBelongCode();
			        // 2.给区域赋值，并且将区域置为不可以操作
			        if (belongcode != null) {
				        dojo.byId("common-belongcode").value = belongcode;
				        dojo.byId("common-belongcode").disabled = "disabled";
				        // 由于区域可能取的是乡镇的编码,这里取乡镇上一级的区域
				        try {
					        var commonRegionDAOStub = BusCard.$remote("commonRegionDAO", "om");
					        var commonRegionVO = commonRegionDAOStub.getCommonRegionVO(parseInt(belongcode + ""));
					        if (commonRegionVO.regionLevel == 5) {
						        dojo.byId("common-belongcode").value = commonRegionVO.upRegionId;
					        }
				        }
				        catch (e) {

				        }
				        
			        }
		        },
		        initAdvanceSearchWidget :function(){
		        	//屏蔽高级搜索
		        },
		        /**
				 * 异步加装的模块,这里的模块要尽量保证其所依赖的模块已经加装完毕
				 * 
				 * @method
				 */
		        _asynLoadSriptList : function() {
				        var _list = this.inherited(arguments);
				        _list.unshift("orderaccept.prodofferaccept.check.MainProdOfferChgCheck");
				        _list.unshift("orderaccept.prodofferaccept.behavior.MainProdOfferChgBehavior");
				        _list.unshift("orderaccept.prodofferaccept.behavior.MainProdOfferChgBehavior");
				        _list.unshift("orderaccept.prodofferaccept.widget.mainprodofferchangemain.ChgMainProdOfferWidget");
				        _list.push("orderaccept.prodofferaccept.behavior.ProductChangeAcceptBehavior");
				        _list.push("orderaccept.prodofferaccept.check.ProductChangeAcceptCheck");
				        _list.push("orderaccept.prodofferaccept.data.ProductChangeAcceptMainChangeDataBuilder");
				        _list.push("orderaccept.prodofferaccept.data.ProductChangeAcceptDataBuilder");
				        _list.push("orderaccept.prodofferaccept.widget.mainprodofferchangemain.ProductChangeAcceptChangeMainProdOfferWidget");
				        return _list;
		        },

		        /**
				 * 初始化多个可选包受理tab页面,主要用作自主版套餐受理
				 * 
				 * @method
				 */
		        initMultipleSubProdOfferHandler : function() {
			        this.multipleSubProdOfferHandler = new orderaccept.prodofferaccept.loader.ProductChangeAcceptMultipleSubProdOfferHandler(this);
		        },
		        initBehavior : function() {
			        this.behaviorInstance = new orderaccept.prodofferaccept.behavior.ProductChangeAcceptBehavior(this);
			        
		        },
		        initCheck : function() {
			        this.checkInstance = new orderaccept.prodofferaccept.check.ProductChangeAcceptCheck(this);
			        
		        },

		        getMainProdOfferInfo : function(){
		        	 var offerInfoVO = util.ProdOfferHelper.getMainProdOffer(dojo.global.$appContext$
				                .get("prodOfferList"))[0];
				     var offerInstVO = dojo.filter(dojo.global.$appContext$.get("userHasProdOfferInfoList"), function(
				                        userHasOffer) {
					                return userHasOffer.prodOfferId == offerInfoVO.prodOfferId;
				                })[0];
				       return {prodOfferInfoVO : offerInfoVO,prodOfferInstVO : offerInstVO};
		        },
		        renderMainProdOfferTree : function() {
			        
		        },
		        hotProdOffer :function(){
		        	
		        },
		        personalProdOffer:function(){
		        	
		        },
		        renderPeddleProdOffer :function
		        (){
		        	
		        },
		        renderPromotionLayout:function(){
		        	 
		        },
		        renderPromotionTree:function(){
		        	
		        },
		        /**
				 * 初始化区域
				 * 
				 * @method
				 */
		        renderChangeParamList : function() {
			        var changeParamList=this.requestParam.changeParamList;
			        var changeParamListObject=dojo.byId("changeParamList");
			        BusCard.$rs(changeParamListObject, changeParamList);
			        if(!changeParamList||changeParamList.length<1||(changeParamList.length==1&&(!changeParamList[0].id))){
			        	if(window.opener){
				        	unieap.getTopWin = function() {
								return window;
	
							};
						}
			        	MessageBox.confirm({
			        		busiCode:"08410229",
			        		onComplete:function(value ){
			        			if(value){
			        				if(window.opener){
			        					window.close();
			        				}
			        			}
			        		}
			        	},changeParamListObject);
			        }
                    dojo.forEach(changeParamListObject.options,function(option){
                        if(!!option && !!option.text){
                            option.title = option.text;
                        }
                    })
			        
		        },
		        renderShoppingCart : function() {
			        var loader = this;
			        if (this.shoppingCartWidgetInstance) {
				        this.shoppingCartWidgetInstance.destroyRecursive();
			        }
			        
			        var ProductChangeAcceptHelper=   dojo.declare("", [util.MainProdOfferChangeHelper], {
			        	needCheckSameOffer:function(){
		                	return false;
		                }
			        });
			        ProductChangeAcceptHelper.getInstance = function() {
				        return new this(arguments[0]);
			        };
			        ProductChangeAcceptHelper.getInstance({
				        prodOfferId : this.mainProdOfferId,
				        callback : function(processId, currentMainProdOfferInfoVO) {
					        loader.shoppingCartWidgetInstance = new loader.ShoppingCartWidgetClass();
					        // render
					        dojo.place(loader.shoppingCartWidgetInstance.domNode,
					                unieap.byId("shoppingCartPane").containerNode, "first");
				        }
			        }).dispatch();
			        
		        },
		        /**
				 * 初始化服务卡片
				 * 
				 * @param {String} uniqueId
				 * @param {Function} cb
				 * @method
				 */
		        addServiceCardWidget : function(uniqueId, cb) {

					   var   accessProdInstList = BusCard.jsonPath(dojo.global.$appContext$.get("userHasProdOfferInfoList")
			                        || [], "$[*].prodInstList[?(@.serviceRelationVO!=null)]");

				       var serviceRelation = accessProdInstList[0].serviceRelationVO;
			
			        var _cb = cb,
				        controller = this,
				        cb = function(dom, cardParam) {
					        dojo.require("orderaccept.common.js.ConstantsPool");
					        var cp = orderaccept.common.js.ConstantsPool;
					        cardParam.userId = dojo.attr(dom, "userId") || null;
					        if (cardParam.userId && dojo.attr(dom, "serviceId")) {
						        cardParam.serviceId = dojo.attr(dom, "serviceId");
					        }
					        cardParam.pageAction = dojo.attr(dom, "action") || null;
						    cardParam.serviceOfferId = 93;
					        if (_cb) {
						        _cb.apply(null, arguments);
					        }
				        },
				        param = dojo._toArray(arguments);
			        param[1] = cb;
			        return this.inherited(arguments, param);
			        
		        }
		     
	        });
        });