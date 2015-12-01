defineModule("orderaccept.prodofferaccept.widget.subprodoffernum.SubProdOfferNumWidget", [
                "orderaccept.custom.TooltipDialog"], function(TooltipDialog) {
	        
	        /**
			 * 可选包对应的选号的widget
			 * 
			 * @class
			 * @requires ["orderaccept.custom.TooltipDialog"]
			 * @module orderaccept.prodofferaccept.widget.subprodoffernum.SubProdOfferNumWidget
			 */
	        dojo.declare("orderaccept.prodofferaccept.widget.subprodoffernum.SubProdOfferNumWidget", [TooltipDialog], {
	        	constructor : function(){
		        	this.inherited(arguments);	        	
	        		this.chooseNumberList = arguments[0].chooseNumberList;
	        		this.subProdOfferDetail = arguments[0].subProdOfferDetail;
	        		this.subProdOfferCartDataProvider = arguments[0].subProdOfferCartDataProvider;
	        		this.bindingData = arguments[0].bindingData;
	        	},	        	
		        postscript : function(){
		        	this.inherited(arguments);
		        	var prodOfferId = this.subProdOfferDetail.prodOfferId;
	       			    
		        	var subBindingInfo = dojo.filter(this.bindingData,function(data){		        		
       					var showData = data.showData,
	       				    subProdOfferInfo = showData.subProdOfferInfo,
	       			        subProdOfferId = subProdOfferInfo.prodOfferId;
	       			        return prodOfferId == subProdOfferId;
		        	});
			        //页面头部信息
			        var renderHtml = "<div class='buscard-root' style='display:block'>\
										 <div class='buscard-legend'>\
											<span class='buscard-legend-img'></span>\
											<span class='buscard-legend-text' id='buscard-name'>号码信息</span>\
										 </div>\
										 <div class='buscard-content'>\ ";
					var index = 1;//标示，用于处理1行显示2个号码
			        dojo.forEach(this.chooseNumberList,function(numInfo){
			        	var subChosenHtml = "";
			        	if(index % 2 == 1){			        		
							renderHtml += "<div class='buscard-row'>";
			        	}
			        	var subProdOfferInfo = dojo.filter(subBindingInfo,function(data){		        		
	       					var showData = data.showData,
		       				    chooseNumberObj = showData.chooseNumberObj,
		       			        serviceKind = chooseNumberObj.serviceKind,
		       			        serviceKindIndex = chooseNumberObj.serviceKindIndex;
		       			        return serviceKind == numInfo.serviceKind && serviceKindIndex == numInfo.serviceKindIndex;
			        	});
			        	if(subProdOfferInfo && subProdOfferInfo.length > 0){
			        		subChosenHtml = " checked='checked' disabled=true ";
			        	}
			        	//拼可选号码HTML
						renderHtml +=" <span>\
										<input type='checkbox' class='subProdOfferNumBox' id='subProdOfferNumBox' "+subChosenHtml+"\
											name='subProdOfferNumBox' value='" + numInfo.serviceId + "' \
											serviceKind='"+numInfo.serviceKind+"' serviceKindIndex='"+numInfo.serviceKindIndex+"' \
											uniqueId ='"+numInfo.uniqueId+"' defaultNumber='"+numInfo.serviceId+"' productId='"+numInfo.productId+"' />:\
										<input type='text' disabled='disabled'  value='" + numInfo.serviceId + "' /> \
									</span>"
			        	if(index % 2 == 0){			        		
							renderHtml += "</div>";
			        	}
			        	index++;
			        });
					renderHtml += "</div></div>";
			        dojo.place(renderHtml, this.containerNode, "last");//将选号页面渲染到浮动框内
			        //增加确认按钮，点击确认，发布消息，处理对可选包的订购
			        var commitButton = "<div style='text-align:center;vertical-align:middle'><a href='javascript:void(0);' dojoAttachEvent='onclick:elementclick'\
			        		dojoAttachTopic='/subProdOfferNumBtn' toolTipId='"+this.id+"' style='text-align:center;vertical-align:middle;'>确定</a></div>";	
			        dojo.place(commitButton, this.containerNode, "last");
				    this.enableEvtMsgPropagation(this.containerNode);//传播事件发布的信息
		        }
	        });
	        
        });