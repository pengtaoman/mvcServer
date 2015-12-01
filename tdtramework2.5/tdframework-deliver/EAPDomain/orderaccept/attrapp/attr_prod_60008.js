BusCard.define('/orderaccept/attrapp/attr_prod_60008',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
				var Me = this;
				dojo.subscribe("/buscard/baseStation/propertychange",function(event){
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
			        
					var parentDom = dijit.getEnclosingWidget(Me.getParent().dom);
					var model = parentDom.getModel();
					var targetUniqueId = model.cardParam.uniqueId;

			        if(uniqueId == targetUniqueId){
			        	var targetDom = event.currentTarget;
			        	var baseStationId = targetDom.rvalue;
						//to do 调用基站接口来查询
						var baseStationList = BusCard.$remote("baseStationInfoDAO").selectByProperties({"stationId":baseStationId});
						if(!!baseStationList&&baseStationList.length>0){
							//赋值给基站编号和交换局编号
							if(Me.$('60008')){
								Me.$('60008').value = baseStationId;
							}
							if(Me.$('60056')){
								Me.$('60056').value = baseStationList[0].switchId;
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
