dojo.addOnLoad(function() {
	dojo.require("unieap.layout.TitlePane");
	dojo.require("orderaccept.prodofferaccept.util");
	dojo.require("orderaccept.prodofferaccept.widget.attrcard.ProductAttrCardWidget");
	var pane = new unieap.layout.TitlePane({
		        title : '产品属性表格'
	        });
	dojo.place(pane.domNode, document.body, "first");
	var sf = orderaccept.prodofferaccept.util.ServiceFactory;
	sf.getService("url:orderDetailAction.do?method=getProdOfferDetail&prodOfferId=30039", function(
	                prodOfferInfoVO) {
		        var productInfoVO = prodOfferInfoVO.offerProdRelaList[0].productInfoVO;
		        var attrCardWidget = new orderaccept.prodofferaccept.widget.attrcard.ProductAttrCardWidget(
		                {
			                productInfoVO : productInfoVO,
			                prodOfferInfoVO : prodOfferInfoVO
		                });
		        attrCardWidget.renderCard(pane.containerNode, "last");
	        });
	
});