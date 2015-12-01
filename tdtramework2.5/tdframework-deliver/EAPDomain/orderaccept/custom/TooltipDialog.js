defineModule("orderaccept.custom.TooltipDialog", ["dijit.TooltipDialog", "./_BaseWidget","orderaccept.custom.popup","dijit._Container"], function(TooltipDialog,
                _baseWidget,popup,_Container) {
	        
	        dojo.declare("orderaccept.custom.TooltipDialog", [_baseWidget,TooltipDialog,_Container], {
		                
	        			constructor : function(){	
	        				this.noCloseBtn = !!arguments[0]?arguments[0].noCloseBtn:false;
	        			},
		                postCreate : function() {
		                	this.inherited(arguments);
		                	var toolTip = this;
		                	if(!!toolTip){
		                		//添加关闭按钮
				                if(!toolTip.noCloseBtn){
					                // 先加载css文件
					                loadCssModule("orderaccept.custom.resources.css.ToolTipCss");
				                	var closeHtml = "<div class='closeBtn'></div>";
			                		dojo.place(closeHtml,toolTip.containerNode.parentNode,'first');
									dojo.connect(
										dojo.query(".closeBtn",toolTip.domNode)[0],
										"onclick",
										function(){
							                popup.close({
						                        widget : unieap.byId(toolTip.id),
						                        notHandleData : true
					                        });
										}
									);
				                }
		                	}
		                },
						onClose : function() {
							var toolTip = this;
							var prodDetailClass = "orderaccept.prodofferaccept.builder.prodofferdetail.ProdOfferDetailBuilder";
							var mainProdDetailClass = "orderaccept.prodofferaccept.builder.prodofferdetail.MainProdOfferDetailBuilder";
							if(!!toolTip.builder && (toolTip.builder.declaredClass == prodDetailClass || toolTip.builder.declaredClass == mainProdDetailClass)){
								var requestedDomArray = dojo.query("[controlfieldname]",toolTip.domNode);
								var isFinish = this.checkIsFinish(requestedDomArray);
								var provider = this.builder.provider;
								var subProdOfferOrderGrid = !!provider?provider.subProdOfferOrderGrid:null;
								var gridDomNode = !!subProdOfferOrderGrid?subProdOfferOrderGrid.domNode:null;
								var finishImg = null;
								if(!!gridDomNode){								
									finishImg = dojo.query("[id=finishImg-"+this.rowIndex+"]",gridDomNode)[0];
								}else{
									finishImg = dojo.byId("finishImg-"+this.rowIndex);
								}
								if(!!finishImg){
									var requestedDom = dojo.query(".formRequested",finishImg.parentNode)[0];
			        				var isHidden = /hidden\-elem/.test(requestedDom.className);
									if(isFinish == true){
										dojo.style(finishImg,"display","");
										if(/hidden\-elem/.test(finishImg.className)){
											dojo.toggleClass(finishImg,"hidden-elem");
										}
				        				if(!isHidden){
											dojo.toggleClass(requestedDom,"hidden-elem");
										}
									}else{
										dojo.style(finishImg,"display","none");
				        				if(isHidden){
											dojo.toggleClass(requestedDom,"hidden-elem");
										}
									}
								}
							}
							if(!!toolTip.id && toolTip.id.indexOf("serviceProdAttrWidget-") == 0){
								var serProdImgId = toolTip.id.replace("serviceProdAttrWidget","serviceProdImg");
								var serProdImg =dojo.query("[id="+serProdImgId+"]")[0];
								var serProdSpanId = toolTip.id.replace("serviceProdAttrWidget","serviceProdSpan");
								var serProdSpan =dojo.query("[id="+serProdSpanId+"]")[0];
								
								var requestedDomArray = dojo.query("[controlfieldname]",toolTip.domNode);
								var isFinish = this.checkIsFinish(requestedDomArray);
								if(isFinish == true){
									!!serProdSpan?dojo.style(serProdSpan,"display","none"):null;
									!!serProdImg?dojo.style(serProdImg,"display",""):null;
								}else{
									!!serProdImg?dojo.style(serProdImg,"display","none"):null;
									!!serProdSpan?dojo.style(serProdSpan,"display",""):null;
								}
							}
				        	this.inherited(arguments);
						},
						checkIsFinish : function(requestedDomArray){						
							var isFinish = true;
							dojo.forEach(requestedDomArray,function(requestedDom){
								if(!!requestedDom.getAttribute("isnull") && requestedDom.getAttribute("isnull")=="0"){
									if(!requestedDom.value || BusCard.util.trim(requestedDom.value) == ""){
										var domWidget = dijit.getEnclosingWidget(requestedDom);											
										if(!domWidget || domWidget.domNode.style.display != "none"){
											isFinish = false;
										}
									}										
								}
							});
							return isFinish;
						}
	                }); 
	        
        }

);