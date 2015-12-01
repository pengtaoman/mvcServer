BusCard.define('/orderaccept/attrapp/attr_prod_574.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch=function(){
	        	var Me=this;
	        	if($ac$.groupProdInstInfo){//成员订购
					var ProdInstAttrVOList = BusCard.$remote("prodInstAttrBO").
						getProdInstAttrByInstId($ac$.groupProdInstInfo.prodInstId,$ac$.groupProdInstInfo.cityCode);
					var attrInst = dojo.filter(ProdInstAttrVOList,function(prodInstAttr){
						return prodInstAttr.attrId == "1018";
					})[0];
					if(!!attrInst&&attrInst.attrValue==3){//外勤版，只能看见手机
						var op = BusCard.find(Me.$("574").options,function(option){
							return option.value==3;//哑终端
						})
						Me.$("574").remove(op.index);//去掉哑终端
					}
					//1手机 3哑终端
					//手机只能看见10、15，哑终端只能看见35、50
					if(!!Me.$("1023")){					
						var opList_3 = BusCard.findAll(Me.$("1023").options,function(option){
									return option.value==50||option.value==35;
								});
						var opList_1 = BusCard.findAll(Me.$("1023").options,function(option){
									return option.value==10||option.value==15;
								});		
						if(Me.$("574").value==1){
							var opList = BusCard.findAll(Me.$("1023").options,function(option){
								return option.value==50||option.value==35;
							});
							BusCard.each(opList,function(op){
								Me.$("1023").remove(op.index);
							})
						}else{
							var opList = BusCard.findAll(Me.$("1023").options,function(option){
								return option.value==10||option.value==15;
							});
							BusCard.each(opList,function(op){
								Me.$("1023").remove(op.index);
							})
						}


						Me.$("574").onchange = function(){
							if(Me.$("574").value==1){
								BusCard.each(opList_3,function(op){
									Me.$("1023").remove(op.index);
								})
								BusCard.each(opList_1,function(op){
									Me.$("1023").add(op);
								})
							}else{
								BusCard.each(opList_1,function(op){
									Me.$("1023").remove(op.index);
								})
								BusCard.each(opList_3,function(op){
									Me.$("1023").add(op);
								})
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
