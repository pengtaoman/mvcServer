

window.onload = function(event) {
	var obj = {
			controller : {}
		}
	window.prodOfferDetailBuilder = new orderaccept.prodofferaccept.batch.prodofferdetail.BatchProdOfferDetailBuilder(obj);
	var behavior = new orderaccept.prodofferaccept.behavior.ProdOfferNewBehavior({});
	$('prodOfferLink-'+51326).onclick = function() {
		//亲情   21191
		//担保   300527
		//销售品属性 1031100
		//产品属性 51326
		var subProdOfferInfo = orderaccept.prodofferaccept.util.ProdOfferHelper
				.getProdOfferDetail('' + 51326);
				var tooltipId = "prodOfferLink-"+ 51326 + "_dropdown",
				        tooltip = dojo.query("DIV[id='" + tooltipId + "']")[0],
				        detailWidgetList = prodOfferDetailBuilder.prodOfferDetailWidgetList,
				        prodOfferDetailWidget = detailWidgetList["" + subProdOfferInfo.prodOfferId];
			        if (!prodOfferDetailWidget) {
			        	/**
			        	 * 这里入参需要注释一下
			        	 * subProdOfferInfo--销售品规格数据
			        	 * prodOfferInst--销售品实例，变更才有
			        	 * showData--随便拼个
			        	 * today拼数据库时间s
			        	 */
				        prodOfferDetailBuilder.initProdOfferDetail({
							subProdOfferInfo : subProdOfferInfo,
							prodOfferInst : null,
							showData :{
								chooseNumberObj : {serviceId:158426520}
							
							},
							today : new Date()
						});
				        var prodOfferDetailWidget = detailWidgetList[""+ subProdOfferInfo.prodOfferId];
			        };
			        if (tooltip && tooltip.style.display != "none") {
				        orderaccept.custom.popup.close({
					                widget : prodOfferDetailWidget,
					                notHandleData : true
				                });
			        } else {
				        orderaccept.custom.popup.open({
					                widget : {
						                popup : prodOfferDetailWidget,
						                around : $('prodOfferLink-'+51326),
						                onCancel : function() {
							                orderaccept.custom.popup.close({
								                        widget : prodOfferDetailWidget,
								                        notHandleData : true
							                        });
						                }
					                }
				                });
			        }

	}
}