defineModule("orderaccept.prodofferaccept.loader", [], function() {
	/**
	 * 加装销售品订购处理类
	 * 
	 * @method
	 */
	orderaccept.prodofferaccept.loader.loadProdOfferNewLoader = function(requestParam) {
		var module = dojo.getObject("orderaccept.prodofferaccept.loader.ProdOfferNewLoader", false);
		BusCard.ScriptLoader.asynLoad(module ? [] : [dojo.moduleUrl("orderaccept.prodofferaccept.loader",
		                "ProdOfferNewLoader.js").toString()], function() {
			        try {
				        dojo.global.prodOfferAcceptLoader = new orderaccept.prodofferaccept.loader.ProdOfferNewLoader(requestParam);
			        }
			        finally {
				        BusCard.removeCoverLayer();
			        }
		        });
		
	};
	
	orderaccept.prodofferaccept.loader.loadProdOfferChangeLoader = function(requestParam) {
		var module = dojo.getObject("orderaccept.prodofferaccept.loader.ProdOfferChangeLoader", false);
		BusCard.ScriptLoader.asynLoad(module ? [] : [dojo.moduleUrl("orderaccept.prodofferaccept.loader",
		                "ProdOfferChangeLoader.js").toString()], function() {
			        try {
				        dojo.global.prodOfferAcceptLoader = new orderaccept.prodofferaccept.loader.ProdOfferChangeLoader(requestParam);
			        }
			        finally {
				        
			        }
			        
		        });
		
	};
	orderaccept.prodofferaccept.loader.loadMainProdOfferChangeLoader = function(requestParam) {
		var module = dojo.getObject("orderaccept.prodofferaccept.loader.MainProdOfferChangeLoader", false);
		BusCard.ScriptLoader.asynLoad(module ? [] : [dojo.moduleUrl("orderaccept.prodofferaccept.loader",
		                "MainProdOfferChangeLoader.js").toString()], function() {
			        try {
				        
				        dojo.global.prodOfferAcceptLoader = new orderaccept.prodofferaccept.loader.MainProdOfferChangeLoader(requestParam);
			        }
			        finally {
				        BusCard.removeCoverLayer();
			        }
		        });
		
	};
	orderaccept.prodofferaccept.loader.loadProdOfferPreAcceptLoader = function(requestParam) {
		var module = dojo.getObject("orderaccept.prodofferaccept.loader.ProdOfferPreAcceptLoader", false);
		BusCard.ScriptLoader.asynLoad(module ? [] : [dojo.moduleUrl("orderaccept.prodofferaccept.loader",
		                "ProdOfferPreAcceptLoader.js").toString()], function() {
			        try {
				        dojo.global.prodOfferAcceptLoader = new orderaccept.prodofferaccept.loader.ProdOfferPreAcceptLoader(requestParam);
			        }
			        finally {
				        BusCard.removeCoverLayer();
			        }
		        });
		
	};
	orderaccept.prodofferaccept.loader.loadProdOfferCancelLoader = function(requestParam) {
		var module = dojo.getObject("orderaccept.prodofferaccept.loader.ProdOfferCancelLoader", false);
		BusCard.ScriptLoader.asynLoad(module ? [] : [dojo.moduleUrl("orderaccept.prodofferaccept.loader",
		                "ProdOfferCancelLoader.js").toString()], function() {
			        try {
				        dojo.global.prodOfferAcceptLoader = new orderaccept.prodofferaccept.loader.ProdOfferCancelLoader(requestParam);
			        }
			        finally {
				        BusCard.removeCoverLayer();
			        }
		        });
		
	};
	orderaccept.prodofferaccept.loader.loadProdOfferProtocolAcceptLoader = function(requestParam) {
		var module = dojo.getObject("orderaccept.prodofferaccept.loader.ProdOfferProtocolAcceptLoader", false);
		BusCard.ScriptLoader.asynLoad(module ? [] : [dojo.moduleUrl("orderaccept.prodofferaccept.loader",
		                "ProdOfferProtocolAcceptLoader.js").toString()], function() {
			        try {
				        dojo.global.prodOfferAcceptLoader = new orderaccept.prodofferaccept.loader.ProdOfferProtocolAcceptLoader(requestParam);
			        }
			        finally {
				        BusCard.removeCoverLayer();
			        }
		        });
	};
	orderaccept.prodofferaccept.loader.loadShoppingCartNewLoader = function(requestParam) {
		var module = dojo.getObject("orderaccept.prodofferaccept.loader.ShoppingCartNewLoader", false);
		BusCard.ScriptLoader.asynLoad(module ? [] : [dojo.moduleUrl("orderaccept.prodofferaccept.loader",
		                "ShoppingCartNewLoader.js").toString()], function() {
			        try {
				        dojo.global.prodOfferAcceptLoader = new orderaccept.prodofferaccept.loader.ShoppingCartNewLoader(requestParam);
			        }
			        finally {
				        BusCard.removeCoverLayer();
			        }
		        });
	};
	orderaccept.prodofferaccept.loader.loadProdAddLoader = function(requestParam) {
		var module = dojo.getObject("orderaccept.prodofferaccept.loader.ProdAddLoader", false);
		BusCard.ScriptLoader.asynLoad(module ? [] : [dojo.moduleUrl("orderaccept.prodofferaccept.loader",
		                "ProdAddLoader.js").toString()], function() {
			        try {
				        dojo.global.prodOfferAcceptLoader = new orderaccept.prodofferaccept.loader.ProdAddLoader(requestParam);
			        }
			        finally {
				        BusCard.removeCoverLayer();
			        }
		        });
	};
	orderaccept.prodofferaccept.loader.loadPreOrderBackLoader = function(requestParam) {
		var module = dojo.getObject("orderaccept.prodofferaccept.loader.PreOrderBackLoader", false);
		BusCard.ScriptLoader.asynLoad(module ? [] : [dojo.moduleUrl("orderaccept.prodofferaccept.loader",
		                "PreOrderBackLoader.js").toString()], function() {
			        try {
				        dojo.global.prodOfferAcceptLoader = new orderaccept.prodofferaccept.loader.PreOrderBackLoader(requestParam);
			        }
			        finally {
				        BusCard.removeCoverLayer();
			        }
		        });
	};
	orderaccept.prodofferaccept.loader.loadProdInterChangeLoader = function(requestParam) {
		var module = dojo.getObject("orderaccept.prodofferaccept.loader.ProdInterChangeLoader", false);
		BusCard.ScriptLoader.asynLoad(module ? [] : [dojo.moduleUrl("orderaccept.prodofferaccept.loader",
		                "ProdInterChangeLoader.js").toString()], function() {
			        try {
				        dojo.global.prodOfferAcceptLoader = new orderaccept.prodofferaccept.loader.ProdInterChangeLoader(requestParam);
			        }
			        finally {
				        BusCard.removeCoverLayer();
			        }
		        });
		
	};
	orderaccept.prodofferaccept.loader.loadPromotionChangeLoader = function(requestParam) {
		var module = dojo.getObject("orderaccept.prodofferaccept.loader.PromotionChangeLoader", false);
		BusCard.ScriptLoader.asynLoad(module ? [] : [dojo.moduleUrl("orderaccept.prodofferaccept.loader",
		                "PromotionChangeLoader.js").toString()], function() {
			        try {
				        dojo.global.prodOfferAcceptLoader = new orderaccept.prodofferaccept.loader.PromotionChangeLoader(requestParam);
			        }
			        finally {
				        BusCard.removeCoverLayer();
			        }
		        });
		
	};
	orderaccept.prodofferaccept.loader.loadMemberOfferChangeLoader = function(requestParam) {
		var module = dojo.getObject("orderaccept.prodofferaccept.loader.MemberProdOfferAcceptLoader", false);
		BusCard.ScriptLoader.asynLoad(module ? [] : [dojo.moduleUrl("orderaccept.prodofferaccept.loader",
		                "MemberProdOfferAcceptLoader.js").toString()], function() {
			        try {
				        dojo.global.prodOfferAcceptLoader = new orderaccept.prodofferaccept.loader.MemberProdOfferAcceptLoader(requestParam);
			        }
			        finally {
				        
			        }
		        });
		
	};
	orderaccept.prodofferaccept.loader.loadProdChangeAcceptLoader = function(requestParam) {
		var module = dojo.getObject("orderaccept.prodofferaccept.loader.ProdChangeAcceptLoader", false);
		BusCard.ScriptLoader.asynLoad(module ? [] : [dojo.moduleUrl("orderaccept.prodofferaccept.loader",
		                "ProdChangeAcceptLoader.js").toString()], function() {
			        try {
				        dojo.global.prodOfferAcceptLoader = new orderaccept.prodofferaccept.loader.ProdChangeAcceptLoader(requestParam);
			        }
			        finally {
				        BusCard.removeCoverLayer();
			        }
		        });
		
	};
	
	orderaccept.prodofferaccept.loader.loadMemberOrderGroupProductLoader = function(requestParam) {
		var module = dojo.getObject("orderaccept.prodofferaccept.loader.MemberOrderGroupProductLoader", false);
		BusCard.ScriptLoader.asynLoad(module ? [] : [dojo.moduleUrl("orderaccept.prodofferaccept.loader",
		                "MemberOrderGroupProductLoader.js").toString()], function() {
			        try {
				        
				        dojo.global.prodOfferAcceptLoader = new orderaccept.prodofferaccept.loader.MemberOrderGroupProductLoader(requestParam);
			        }
			        finally {
				        BusCard.removeCoverLayer();
			        }
		        });
		
	};
	
	orderaccept.prodofferaccept.loader.loadProductChangeAcceptLoader = function(requestParam) {
		var module = dojo.getObject("orderaccept.prodofferaccept.loader.ProductChangeAcceptLoader", false);
		BusCard.ScriptLoader.asynLoad(module ? [] : [dojo.moduleUrl("orderaccept.prodofferaccept.loader",
		                "ProductChangeAcceptLoader.js").toString()], function() {
			        try {
				        dojo.global.prodOfferAcceptLoader = new orderaccept.prodofferaccept.loader.ProductChangeAcceptLoader(requestParam);
			        }
			        finally {
				        BusCard.removeCoverLayer();
			        }
		        });
		
	};
	
	orderaccept.prodofferaccept.loader.loadOrderChangeLoader = function(requestParam) {
		var module = dojo.getObject("orderaccept.prodofferaccept.loader.OrderChangeLoader", false);
		BusCard.ScriptLoader.asynLoad(module ? [] : [dojo.moduleUrl("orderaccept.prodofferaccept.loader",
		                "OrderChangeLoader.js").toString()], function() {
			        
			        try {
				        dojo.global.prodOfferAcceptLoader = new orderaccept.prodofferaccept.loader.OrderChangeLoader(requestParam);
			        }
			        finally {
				        BusCard.removeCoverLayer();
			        }
			        
		        });
		
	};
	
	orderaccept.prodofferaccept.loader.loadPreAcceptOrderLoader = function(requestParam) {
		var module = dojo.getObject("orderaccept.prodofferaccept.loader.PreAcceptOrderLoader", false);
		BusCard.ScriptLoader.asynLoad(module ? [] : [dojo.moduleUrl("orderaccept.prodofferaccept.loader",
		                "PreAcceptOrderLoader.js").toString()], function() {
			        try {
				        dojo.global.prodOfferAcceptLoader = new orderaccept.prodofferaccept.loader.PreAcceptOrderLoader(requestParam);
			        }
			        finally {
				        BusCard.removeCoverLayer();
			        }
		        });
		
	};
	
});