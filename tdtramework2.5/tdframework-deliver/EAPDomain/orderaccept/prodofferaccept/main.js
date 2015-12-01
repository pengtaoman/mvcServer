defineModule("orderaccept.prodofferaccept.main", ["orderaccept.prodofferaccept.util",
                "orderaccept.prodofferaccept.loader"], function(util, loader) {
	        var ACTION_CD_CONST = util.ACTION_CD_CONST,
		        dispatcherMap = {};
	        dispatcherMap[ACTION_CD_CONST.PRODUCT_INSTALL] = loader.loadProdOfferNewLoader;
	        dispatcherMap[ACTION_CD_CONST.PRODUCT_CHANGE] = loader.loadProdOfferChangeLoader;
	        dispatcherMap[ACTION_CD_CONST.PRODUCT_CHANGE_MAIN] = loader.loadMainProdOfferChangeLoader;
	        dispatcherMap[ACTION_CD_CONST.PRODOFFER_CANCEL_ACTION] = loader.loadProdOfferCancelLoader;
	        dispatcherMap[ACTION_CD_CONST.PROTOCOL_ACCEPT] = loader.loadProdOfferProtocolAcceptLoader;
	        dispatcherMap[ACTION_CD_CONST.SHOPPING_CART_ACCEPT] = loader.loadShoppingCartNewLoader;
	        dispatcherMap[ACTION_CD_CONST.PROD_ADD] = loader.loadProdAddLoader;
	        dispatcherMap[ACTION_CD_CONST.PRE_ORDER_BACK] = loader.loadPreOrderBackLoader;
	        dispatcherMap[ACTION_CD_CONST.PROD_INTERCHANGE] = loader.loadProdInterChangeLoader;
	        dispatcherMap[ACTION_CD_CONST.PROMOTION_CHANGE] = loader.loadPromotionChangeLoader;	        
	        dispatcherMap[ACTION_CD_CONST.MEMBER_OFFER_CHANGE] = loader.loadMemberOfferChangeLoader;
	        dispatcherMap[ACTION_CD_CONST.CHANGE_ACCEPT] = loader.loadProdChangeAcceptLoader;
	        dispatcherMap[ACTION_CD_CONST.MEMBER_ORDER_GROUP_PRODUCT] = loader.loadMemberOrderGroupProductLoader;// cheng yuan ding gou ji tuan chan pin 
	        dispatcherMap[ACTION_CD_CONST.PRODUCT_CHANGE_ACCEPT] = loader.loadProductChangeAcceptLoader;
            dispatcherMap[ACTION_CD_CONST.ORDER_CHANGE_ACCEPT] = loader.loadOrderChangeLoader;
	        dispatcherMap[ACTION_CD_CONST.PRE_ACCEPT] = loader.loadPreAcceptOrderLoader;     
	        var dispatch = function(requestParam) {
		        dojo.ready(function() {
			        (dispatcherMap[requestParam.actionCD](requestParam));
		        });
		         
	        };
	        orderaccept.prodofferaccept.main.dispatch = dispatch;
	        
        }); 