defineModule("orderaccept.prodofferaccept.builder.promotiongrid.PromotionCartDataProvider", [
                "../../util","../../formatter/FormatterProvider"], function(
                util,FormatterProvider) {
	        /**
			 * 定义促销政策购物车数据处理的类
			 * 
			 * @class
			 * @extends
			 */
	        dojo.declare("orderaccept.prodofferaccept.builder.promotiongrid.PromotionCartDataProvider", [], {
		       	
		        controller : null,
		        
		        salesPromotionOrderGrid : null,
		        
		        mainProdOfferWidget : null,
	        	
		        constructor : function(controller) {
			        this.controller = controller;
			        this.salesPromotionOrderGrid = controller.salesPromotionOrderGrid;
			        this.mainProdOfferWidget = controller.mainProdOfferWidget;
		        },
		        
		        /**
		         * 变更时用，展示已经订购的有效的促销政策
		         */
		        showOrderedPromotion : function(){
		        	var builder = this;
		        	var orderPromotionList = dojo.global.$appContext$.orderPromotionList||[];
		        	var trs = dojo.query(".main-product-basic", builder.mainProdOfferWidget.domNode);
		        	var prodBasicTrs = dojo.filter(trs||[],function(oneTr){
		        		return dojo.query(".main-product-check", oneTr)[0].checked;
		        	});
		        	var orderPromotionList1 = dojo.filter(orderPromotionList||[],function(oneOrderPromotionInst){
		        		var userId = oneOrderPromotionInst.targetObjectInstId;
		        		var targetType = oneOrderPromotionInst.targetObjectType;
		        		return dojo.some(prodBasicTrs||[],function(oneProdBasicTr){
		        			return dojo.attr(oneProdBasicTr, "userId") == userId;
		        		}) && targetType == 2;
		        	});
			       	var	orderPromotionData = dojo.map(orderPromotionList1, function(orderPromotionInst) {
	       				var promotionDetail = util.ProdOfferHelper.getSalesPromotionDetail(orderPromotionInst.promotionId);
	       				var rowData = [];
	       				if(promotionDetail){
	       					rowData = util.ProdOfferHelper.createSalesPromotionRowDataForChg(promotionDetail,orderPromotionInst);
	       				}
	       				return {
	       					"rowData" : rowData,
	       					"detailData" : promotionDetail
	       				};
	                });
	                dojo.forEach(orderPromotionData||[],function(oneOldPromotionRowData){
	                	builder.salesPromotionOrderGrid.add(oneOldPromotionRowData.rowData);
	                	builder.controller.createTargetObjectNum(oneOldPromotionRowData.rowData,builder.controller.mainProdOfferId);
	                	//根据实例id更改作用对象
	                	var userId = oneOldPromotionRowData.rowData.showData.promotionInstInfo.targetObjectInstId;
	                	var prodBasicTrObj = dojo.filter(prodBasicTrs||[],function(oneBasicTr){
	                		return dojo.attr(oneBasicTr,"userId") == userId;
	                	})[0];
	                	var uniqueid = dojo.attr(prodBasicTrObj, "uniqueid");
	                	var rowIndex = oneOldPromotionRowData.rowData.rowIndex;
	                	var showServiceIdDiv = dojo
					                .query(".promotionTargetNum-" + rowIndex, builder.salesPromotionOrderGrid.domNode)[0];
					    var targetObject = dojo.filter(showServiceIdDiv.childNodes || [],function(oneNode){
					    	return oneNode.getAttribute("targetUniqueid") == uniqueid;
					    })[0];
					    targetObject.checked = true;
	                	builder.controller.dealPromotionRaiseSpeedInfo(oneOldPromotionRowData.detailData,oneOldPromotionRowData.rowData,true);
	                });
	                var orderPromotionRowData = builder.salesPromotionOrderGrid.ds.getRawData();
	                //查询所有已有的促销并置灰
	                dojo.query("input[promotionStyle=promotion-change]",builder.salesPromotionOrderGrid.domNode).each(function(node){
	                	node.disabled = true;
	                });
	                //将作用对象的选择按钮置灰
	                dojo.query("input[type=radio]",builder.salesPromotionOrderGrid.domNode).each(function(oneNode){
	                	oneNode.disabled = true;
	                });
	                //dojo.forEach(orderPromotionRowData||[],function(oneRowData){
	                //	dojo.query("[name=promotionChecked]",builder.salesPromotionOrderGrid.domNode)[0].disabled = true;
	                //});
		        }
        });
	});