BusCard.define('/orderaccept/attrapp/attr_prod_210',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
				var Me = this;
				
				/**
				 * 获取uniqueId唯一标识
				 */
				Me.getUniqueId = function(){ 
					var uniqueId = "";
					if($ac$.selectedMainProdOfferInfoVO.bindType == 2){
						var multipleMainProdOfferWidget =orderaccept.prodofferaccept.util.DomHelper.
											getParentWidget(Me.$("210"),"unieap.layout.ContentPane");
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
				
				Me.getServiceCardWidget = function(uniqueId){
			 		var serviceCardWidgetMap =  prodOfferAcceptLoader.serviceCardWidgetMap;
				    var serviceCardWidget = null;
			    	for(var p in serviceCardWidgetMap){
			    		if (!serviceCardWidgetMap.hasOwnProperty(p)) {
					        continue;
				        }
			    		if(p == ("serviceCardWidget_"+uniqueId)){
							serviceCardWidget = serviceCardWidgetMap[p];
							break;
			    		}
					}
					if(!serviceCardWidget){
						return null;
					}
					return serviceCardWidget;
				};
				
				(function(){
					var util = dojo.getObject("orderaccept.prodofferaccept.util");
					var detailWidget = unieap.byId(util.DomHelper.getParentWidget(Me.$("210"),"unieap.layout.ContentPane").detailWidgetId);
					var rowData = detailWidget.rowData;
					if(rowData.prodOfferInst!=null){
						return ;
					}
					var serviceCardWidget = Me.getServiceCardWidget(Me.getUniqueId());
					if(!!serviceCardWidget){
						if(!!serviceCardWidget.busCardInstance.$("serviceId")){	
							if(serviceCardWidget.busCardInstance.$("serviceId").value!=""){
								Me.$("210").value = serviceCardWidget.busCardInstance.$("serviceId").value+"@189.cn";
							}
						}
					}
					
				})();
				
				/**
				 * 校验电子账单是否是以@189.cn结尾的
				 */
				Me.$("210").onblur = function(){
					var tip = "只能输入189邮箱！格式为：phoneNumber@189.cn";
					var currentValue = Me.$("210").value;
					
					if(currentValue!=""&&currentValue.indexOf('@189.cn')<0){
						orderaccept.common.dialog.MessageBox.alert({
							message:tip
						});
						Me.$("210").value = "";
						return ;
					}
				};
				
				/**
				 * 和对应的业务号码级联
				 */
				dojo.subscribe("/buscard/serviceId/blur",function(event){		
					var prodBasicTR = function() {
				        var serviceTr = event.currentTarget;
				        while (true) {
					        serviceTr = serviceTr.parentNode;
					        if (serviceTr && (serviceTr.tagName || "").toUpperCase() == 'TR') {
						        break;
					        }
				        }
				        while (true) {
					        serviceTr = serviceTr.previousSibling;
					        if (serviceTr && (serviceTr.tagName || "").toUpperCase() == 'TR') {
						        break;
					        }
				        }
				        return serviceTr;		        
			        }();
			        var uniqueId = dojo.attr(prodBasicTR,"uniqueId");
			        if(Me.getUniqueId()==uniqueId){
			        	var serviceCardWidget = Me.getServiceCardWidget(uniqueId);
			        	if(!!serviceCardWidget){
							if(!!serviceCardWidget.busCardInstance.$("serviceId")){	
								if(serviceCardWidget.busCardInstance.$("serviceId").value!=""){
									Me.$("210").value = serviceCardWidget.busCardInstance.$("serviceId").value+"@189.cn";
								}
							}
						}
			        }
				});
	        };  
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	        /**
	         * 综合查询页面处理分支
	         * @method
	         */
	        var allInfoQueryPageDispatch = function() {};
	        /**
	         * 二次业务处理分支
	         * @method
	         */
	        var secondBusinessPageDispatch = function() {};
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {};
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
