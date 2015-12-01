BusCard.define('/orderaccept/attrapp/attr_prod_200169.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
				var Me = this;
				
				//Me.$("200169").value="";
				//Me.$("200117").value="";
				Me.$("200169").onblur=function(){
					if(Me.$("200169").value!=""){
						var  relationServiceId=Me.$("200169").value;
					    var param = {cityCode:BusCard.$session.cityCode,serviceId:relationServiceId,ifValid:1};		
						var serviceVOList = BusCard.$remote("prodInstCommFacadeBO").getNotInValidServiceRelationByProperties(param);
						if(serviceVOList.length<=0){
							orderaccept.common.dialog.MessageBox.alert({
								message:"\u5173\u8054\u7684\u0043\u7f51\u624b\u673a\u53f7\u7801\u5fc5\u987b\u662f\u6709\u6548\u7684\u0063\u7f51\u53f7\u7801"
							});
							Me.$("200169").value="";
						}else{
							var serviceVO=serviceVOList[0];
							var serviceKind=serviceVO.serviceKind;
							if(serviceKind!=8){
								orderaccept.common.dialog.MessageBox.alert({
									message:"\u5173\u8054\u7684\u0043\u7f51\u624b\u673a\u53f7\u7801\u5fc5\u987b\u662f\u6709\u6548\u7684\u0063\u7f51\u53f7\u7801"
								});
								Me.$("200169").value="";
							}else{
								$("200117").value=relationServiceId;
							}
						}
					}
				}
			
				Me.$("200117").onblur=function(){
					var defaultServiceId=Me.$("200117").value;
					if(defaultServiceId!=""){
					var param = {cityCode:BusCard.$session.cityCode,serviceId:defaultServiceId,ifValid:1};
					var serviceVOList = BusCard.$remote("prodInstCommFacadeBO").getNotInValidServiceRelationByProperties(param);
					if(serviceVOList.length<=0){
						orderaccept.common.dialog.MessageBox.alert({
								message:"\u9ed8\u8ba4\u5de5\u4f5c\u624b\u673a\u5fc5\u987b\u662f\u6709\u6548\u53f7\u7801"
							});
						Me.$("200117").value="";	
					}
					}
				}
				if(Me.$("200060")){
					Me.$("200060").onblur=function(){
						var defaultServiceId=Me.$("200060").value;
						if(defaultServiceId!=""){
							var param = {cityCode:BusCard.$session.cityCode,serviceId:defaultServiceId,ifValid:1};
							var serviceVOList = BusCard.$remote("prodInstCommFacadeBO").getNotInValidServiceRelationByProperties(param);
							if(serviceVOList.length<=0){
								orderaccept.common.dialog.MessageBox.alert({
										message:"\u9ED8\u8BA4\u5DE5\u4F5C\u53F7\u7801\u5fc5\u987b\u662f\u6709\u6548\u53f7\u7801"
									});
								Me.$("200060").value="";	
							}
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
	        var batchPageDispatch = function() {
	        	var Me = this;
	        	dojo.style(Me.$("200169"),"display","none");
	    		dojo.style(Me.$("label_200169"),"display","none");
	    		Me.$("200169").isNull = "1";
	        };
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
