BusCard.define('/orderaccept/attrapp/attr_prod_602.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
				var Me = this;
				if($ac$.groupProdInstInfo){//成员订购
					var ProdInstAttrVOList = BusCard.$remote("prodInstAttrBO").
						getProdInstAttrByInstId($ac$.groupProdInstInfo.prodInstId,$ac$.groupProdInstInfo.cityCode);
					var attrInst = dojo.filter(ProdInstAttrVOList,function(prodInstAttr){
						return prodInstAttr.attrId == "602";
					})[0];
					if(!!attrInst){
						Me.$("602").value = attrInst.attrValue;	
					}
				}
				Me.$("602").onchange = function(){
					if($ac$.groupProdInstInfo&&Me.$("602").value!=attrInst.attrValue){
						orderaccept.common.dialog.MessageBox.alert({
							message:"SI编码不允许更改！"
						})
						Me.$("602").value = attrInst.attrValue;
						return false;
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
        		var ProdInstAttrVOList = BusCard.$remote("prodInstAttrBO").
        			getProdInstAttrByInstId($("prodInstId").value,$("cityCode").value);
        		var attrInst = dojo.filter(ProdInstAttrVOList,function(prodInstAttr){
        			return prodInstAttr.attrId == "602";
        		})[0];
        		Me.$("602").value = attrInst.attrValue;

	        	Me.$("602").onchange = function(){
	        		if(Me.$("602").value!=attrInst.attrValue){
	        			orderaccept.common.dialog.MessageBox.alert({
	        				message:"SI编码不允许更改！"
	        			})
	        			Me.$("602").value = attrInst.attrValue;
	        			return false;
	        		}
	        		
	        	}
	        };
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
