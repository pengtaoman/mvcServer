BusCard.define('/orderaccept/attrapp/attr_prod_200051.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	if($ac$.groupProdInstInfo){//成员订购
		var ProdInstAttrVOList = BusCard.$remote("prodInstAttrBO").
			getProdInstAttrByInstId($ac$.groupProdInstInfo.prodInstId,$ac$.groupProdInstInfo.cityCode);
		var attrInst = dojo.filter(ProdInstAttrVOList,function(prodInstAttr){
			return prodInstAttr.attrId == "200051";
		})[0];
		Me.$("200051").value = attrInst.attrValue;
	}
	Me.$("200051").onchange = function(){
		if($ac$.groupProdInstInfo&&Me.$("200051").value!=attrInst.attrValue){
			orderaccept.common.dialog.MessageBox.alert({
				message:"SI编码不允许更改！"
			})
			Me.$("200051").value = attrInst.attrValue;
			return false;
		}
		if(Me.$("200028")){
			Me.$("200028").value="";
			dojo.byId("200028",Me.domNode).rvalue="";
			if(Me.$("200051").value!="90000001"){
				Me.$("200028").disabled = true;
				dojo.byId("search_200028").style.display = "";
			}else{
				Me.$("200028").disabled = false;
				dojo.byId("search_200028").style.display = "none";
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
        		var ProdInstAttrVOList = BusCard.$remote("prodInstAttrBO").
        			getProdInstAttrByInstId($("prodInstId").value,$("cityCode").value);
        		var attrInst = dojo.filter(ProdInstAttrVOList,function(prodInstAttr){
        			return prodInstAttr.attrId == "200051";
        		})[0];
        		Me.$("200051").value = attrInst.attrValue;

	        	Me.$("200051").onchange = function(){
	        		if(Me.$("200051").value!=attrInst.attrValue){
	        			orderaccept.common.dialog.MessageBox.alert({
	        				message:"SI编码不允许更改！"
	        			})
	        			Me.$("200051").value = attrInst.attrValue;
	        			return false;
	        		}
	        		if(Me.$("200028")){
	        			Me.$("200028").value="";
	        			dojo.byId("200028",Me.domNode).rvalue="";
	        			if(Me.$("200051").value!="90000001"){
	        				Me.$("200028").disabled = true;
	        				dojo.byId("search_200028").style.display = "";
	        			}else{
	        				Me.$("200028").disabled = false;
	        				dojo.byId("search_200028").style.display = "none";
	        			}
	        		}
	        	}
	        };
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
