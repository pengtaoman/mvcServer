BusCard.define('/orderaccept/attrapp/attr_prod_629.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	        	var Me = this;
	        	
	        	Me.getUniqueId = function(){ 
					var uniqueId = "";
					if($ac$.selectedMainProdOfferInfoVO.bindType == 2){
						var multipleMainProdOfferWidget =orderaccept.prodofferaccept.util.DomHelper.
											getParentWidget(Me.$("629"),"unieap.layout.ContentPane");
							uniqueId = multipleMainProdOfferWidget.uniqueId;			
					}else{
						var mainProdOfferWidget = prodOfferAcceptLoader.mainProdOfferWidget;
						if(!!mainProdOfferWidget){
							var prodBasicTRs = dojo.query(".main-product-basic",mainProdOfferWidget.domNode);
							if((!prodBasicTRs)||prodBasicTRs.length ==0){
								return;
							}
							//直接取第一个
							uniqueId = dojo.attr(prodBasicTRs[0],"uniqueId");
						}
					}
					return uniqueId;
				};

	        	
				(function(){
					var getRandomPassword=function(){
						var selectChar=new Array(0,1,2,3,4,5,6,7,8,9);
						var password = "";
						for(var i = 0; i < 6;i++){
						    password +=""+selectChar[Math.floor(Math.random()*10)];
						}
						return password;
					}
					var parentDom = orderaccept.prodofferaccept.util.DomHelper.getParentWidget(Me.$("629"),"orderaccept.prodofferaccept.widget.attrcard.ProductAttrCardWidget");
					var productInfoVO = parentDom.getModel().productInfoVO;
					var detailWidget = unieap.byId(orderaccept.prodofferaccept.util.DomHelper.getParentWidget(Me.$("629"),"unieap.layout.ContentPane").detailWidgetId);
					var rowData = detailWidget.rowData;
					if(rowData.prodOfferInst!=null){
						if(dojo.some(rowData.prodOfferInst.prodInstList||[],function(instVO){
							return instVO.productId == productInfoVO.productId;
						})){
							//不处理
						}else{
							Me.$("629").value = getRandomPassword();
						}
					}else{
						Me.$("629").value = getRandomPassword();
					}
				})();
	        };
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';

	        var allInfoQueryPageDispatch = function() {
	        	
	        };

	        var secondBusinessPageDispatch = function() {
	        };
			
	        var batchPageDispatch = function() {};
	      

	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
})
