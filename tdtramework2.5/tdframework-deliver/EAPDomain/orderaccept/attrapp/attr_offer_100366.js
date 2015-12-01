BusCard.define('/orderaccept/attrapp/attr_prod_100366.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	        	var Me = this;
	        	var executeRequest = _buscard.executeRequest;
	        	var cityCode = BusCard.$session.homeCity;
	        	var getRandomPassword=function(){
					var selectChar=new Array(0,1,2,3,4,5,6,7,8,9);
					var password = "";
					for(var i = 0; i < 6;i++){
					    password +=""+selectChar[Math.floor(Math.random()*10)];
					}
					return password;
				}
				(function(){
					var param = "cityCode=" + cityCode;
					var switch399 = executeRequest("prodOfferSaleAjaxAction", "getSwitchForManagePassword", param);
					var prodOfferIds = switch399.split(",");
					var parentWidget = orderaccept.prodofferaccept.util.DomHelper.
									getParentWidget(Me.$("100366"),"unieap.layout.ContentPane");
					if(dojo.some(prodOfferIds||[],function(data){return data==parentWidget.prodOfferId;})){
						Me.$("100366").value = getRandomPassword();
						Me.$("100366").readOnly = true;
					}
				})();
	        };
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	        /**
	         * 综合查询页面处理分支
	         * @method
	         */
	        var allInfoQueryPageDispatch = function() {
	        	
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
