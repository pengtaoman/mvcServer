BusCard.define('/orderaccept/attrapp/attr_prod_100534.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	        	var Me = this;
	        	var executeRequest = _buscard.executeRequest;
	        	var cityCode = BusCard.$session.homeCity;
	        	
				(function(){
					var getRandomPassword=function(){
						var selectChar=new Array(0,1,2,3,4,5,6,7,8,9);
						var password = "";
						for(var i = 0; i < 6;i++){
						    password +=""+selectChar[Math.floor(Math.random()*10)];
						}
						return password;
					}
					Me.$("100534").value = getRandomPassword();
					var parentDom = dijit.getEnclosingWidget(Me.getParent().dom);
					var model = parentDom.getModel();
	    			var serviceCardWidgetMap =  prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_" + model.cardParam.uniqueId];
	    			var selectedMemb = dojo.filter($ac$.get("selectedMemberProdOfferList")||[], function(memb) {
	                    return memb.uniqueId == model.cardParam.uniqueId;
	                })[0];
	                if(!!selectedMemb){
	                	var param = "cityCode=" + cityCode;
						var switch399 = executeRequest("prodOfferSaleAjaxAction", "getSwitchForManagePassword", param);
						var prodOfferIds = switch399.split(",");
						if(dojo.some(prodOfferIds||[],function(data){return data==selectedMemb.prodOfferId;})){
							
							Me.$("100534").readOnly = true;
						}
	                }
					
				})();
	        };
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	        /**
	         * 综合查询页面处理分支
	         * @method
	         */
	        var allInfoQueryPageDispatch = function() {
	        	var prodInstVO = cardParam.prodInstVO;
	        	var attrList = cardParam.productInfoVO.attrList;
	        	var attrVO = attrList.find(function(attrInfo){
	        		return attrInfo.attrId == 100534;
	        	});
	        	var param = "cityCode=" + prodInstVO.cityCode;
				var switch399 = executeRequest("prodOfferSaleAjaxAction", "getSwitchForManagePassword", param);
				var prodOfferIds = switch399.split(",");
				var offerInstVO = BusCard.$remote("prodInstCommFacadeBO").getOfferInstByProductId(prodInstVO.prodInstId);			
				if(dojo.some(prodOfferIds||[],function(data){return data==offerInstVO.prodOfferId;})){
					attrVO.valueShowType="pwd";
				}else{
					attrVO.valueShowType="text";
				}
	        };
	        /**
	         * 二次业务处理分支
	         * @method
	         */
	        var secondBusinessPageDispatch = function() {
	        };
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {};
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
})
