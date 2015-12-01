BusCard.define('/buscardapp/rela/js/getProdAttrInfo.js',function(_buscard,cardParam){ 
	var Me = this;
	var a = arguments[0];
	var b = arguments[1];
	var c = b.serviceRelation.userId;
	var e = '1081';//加密通信产品的产品ID
	var f = b.serviceOfferId;
	var executeRequest = _buscard.executeRequest;
    Me.getProdAttrInfo= function () {
		dojo.require("unieap.layout.TitlePane");
			dojo.require("orderaccept.prodofferaccept.util");
			dojo.require("orderaccept.prodofferaccept.widget.attrcard.ProductAttrCardWidgetForSecond");
			var pane = new unieap.layout.TitlePane({
				        title : '\u4ea7\u54c1\u5c5e\u6027\u8868\u683c'
			        });
			dojo.place(pane.domNode, document.getElementById("prodAttrCardContainer"), "first");
			var sf = orderaccept.prodofferaccept.util.ServiceFactory;
			sf.getService("url:orderDetailAction.do?method=getFuncProductInfo&productId="+e+"&userId="+c,
						function(
			                productInfoVO) {
				        attrCardWidget = new orderaccept.prodofferaccept.widget.attrcard.ProductAttrCardWidgetForSecond(
				                {
					                productInfoVO : productInfoVO.productInfoVO,
					                prodInstVO : productInfoVO.prodInstVO,
					                prodOfferInfoVO : null
				                });
				        attrCardWidget.renderCard(pane.containerNode, "last");
				        //代理商开关
				        if(productInfoVO.showFlag214 && productInfoVO.showFlag214==0){
				        	if($("sourceId")){
				        		$("sourceId").disabled=true;
				        	}
				        }
				        //装机地址开关
				        if(productInfoVO.showFlag845 && productInfoVO.showFlag845==0){
				        	if($("addrDetail")){
				        		card1.hiddenSubGroupByIndex(1,0);
				        	}
				        }else{
				        	if($("addrDetail")){
				        		card1.displaySubGroupByIndex(1, 0);
				        	}
				        }
			           BusCard.each(BusCard.query("[controlFieldName]",attrCardWidget.getCard().dom),function(node){
							node.disabled = true;
						});
						 prodAttrs.push(attrCardWidget);
		        });
		    
		
	}();

	
	

});
