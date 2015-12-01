BusCard.define('/orderaccept/attrapp/attr_prod_200022.js',function(_buscard,cardParam){
	       var prodOfferAcceptPageDispatch=function(){
				var Me = this;
				var cityChange = function(){
					if(!!Me.$("200022")){
						var provId = Me.$("200022").value;
						var indbCityList = BusCard.$remote("customerParamBO").getIndbCity(provId);
						BusCard.$rs(Me.$("200044"),indbCityList.list)
					}
				}
				if(!!Me.$("200022")){
					Me.$("200022").onchange = cityChange;
				}
				cityChange();
				//变更可选包的时候给200044赋值
				var prodInstVO = $ac$.get("mainProdOfferInstVO");
				if(!!prodInstVO){
				    var prodInstList=prodInstVO.prodInstList;
				    if(!!prodInstList){
				        for (var i=0;i<prodInstList.length;i++){
				        	var prodInstAttrList = prodInstList[i].prodInstAttrList;
							if(!!prodInstAttrList){
								var instVO = prodInstAttrList.find(function(inst) {
							    	return inst.attrId == 200044;
						    	});
						    	if(!!instVO&&instVO.attrValue!=""){
						    		Me.$("200044").value=instVO.attrValue;
						    		return;
						    	}
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
	        var batchPageDispatch = function() {};
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
