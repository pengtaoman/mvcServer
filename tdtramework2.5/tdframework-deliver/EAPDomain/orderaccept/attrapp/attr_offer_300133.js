BusCard.define('/orderaccept/attrapp/attr_offer_300133.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	        	var Me = this;
	        	var uniqueId = "";
		 		var serviceCardWidgetMap =  prodOfferAcceptLoader.serviceCardWidgetMap;
			    var serviceCardWidget = null;
				if($ac$.selectedMainProdOfferInfoVO.bindType == 2){
					var multipleMainProdOfferWidget =orderaccept.prodofferaccept.util.DomHelper.
										getParentWidget(Me.$("300133"),"unieap.layout.ContentPane");
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
		    	for(var p in serviceCardWidgetMap){
		    		if (!serviceCardWidgetMap.hasOwnProperty(p)) {
				        continue;
			        }
		    		if(p == ("serviceCardWidget_"+uniqueId)){
						serviceCardWidget = serviceCardWidgetMap[p];
						break;
		    		}
				}

				if(!!serviceCardWidget&&!!serviceCardWidget.busCardInstance.$("serviceId")){			
					Me.$("300133").value = serviceCardWidget.busCardInstance.$("serviceId").value;
				}
			   	
	        	Me.$("300133").onblur=function(){
					if(Me.$("300133").value!=""&&Me.$("300133").value!=serviceCardWidget.busCardInstance.$("serviceId").value){
						var  relationServiceId=Me.$("300133").value;
					    var param = {cityCode:BusCard.$session.cityCode,serviceId:relationServiceId,ifValid:1};		
						var serviceVOList = BusCard.$remote("prodInstCommFacadeBO").getNotInValidServiceRelationByProperties(param);
						if(serviceVOList.length<=0
							||(serviceVOList[0].serviceKind!=8&&serviceVOList[0].serviceKind!=10&&serviceVOList[0].serviceKind!=14)){
							orderaccept.common.dialog.MessageBox.alert({
								message:"体验到期提醒号码必须是本网有效号码！"
							});
							Me.$("300133").value="";
						}
					}
				}	        	
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
