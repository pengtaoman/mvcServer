BusCard.define('/buscardapp/rela/js/card_104_10016590',function(_buscard,cardParam){ 
	var Me = this;
	var a = arguments[0];
	var b = arguments[1];
	var c = b.serviceRelation.userId;
	var e = b.productId;
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
			sf.getService("url:orderDetailAction.do?method=getProductInfo&productId="+e+"&userId="+c,
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

	//getdata前回调
/*	this.addPreDataBuilderAspect(function(_buscard,param){
		//1.取默认密码
		var productId=b.productId;
		var parameter="productId="+productId;
		var resultJsonStr = executeRequest("secondAcceptAjaxAction", "getGlobalEyePassword", parameter);
		try {
			var jsonResultObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
			if (jsonResultObj ) {
				var password;
				password = jsonResultObj.password;
				//2.赋值
				if("100165".equals(productId)){
					Me.$("100366").value=password;
				}else if("100166".equals(productId)){
					Me.$("100098").value=password;
				}				
			}
		}
		catch (e) {
			alert("\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u53d6\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7\u539f\u951f\u65a4\u62f7\u4e3a\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u6377\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7");
			return false;
		}	
		//3.提交	
	});*/
	

});
