BusCard.define('/orderaccept/attrapp/attr_prod_100823.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	var executeRequest = _buscard.executeRequest;
	var session = BusCard.$session;	
	var provinceList = BusCard.$remote("customerParamDAO").getIndbProvince().list;
	BusCard.$rs(Me.$("100823"), provinceList);
	Me.$("100823").value = "018";
	Me.$("100823").onchange = function(){
		if(!!Me.$("100824")){
			var cityList = BusCard.$remote("customerParamDAO").getIndbCity(Me.$("100823").value).list;
			BusCard.$rs(Me.$('100824'),cityList);
		}
	}
	if(!!Me.$("100824")){
		Me.$("100823").onchange();
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
	        var secondBusinessPageDispatch = function() {
	             var Me=this;
	             prodOfferAcceptPageDispatch.apply(this,arguments);
	             var widget = dijit.getEnclosingWidget(Me.dom);
	             var prodInstVO=widget.prodInstVO;
	             var prodInstAttrList = prodInstVO.prodInstAttrList;
	        	 var instVO = prodInstAttrList.find(function(inst) {
	                  return inst.attrId == 100823;
                  });
                 Me.$('100823').value=instVO.attrValue;
                 Me.$("100823").onchange();
                  var instVO1 = prodInstAttrList.find(function(inst) {
	                  return inst.attrId == 100824;
                  });
                 Me.$("100824").value=instVO1.attrValue;
	            
	        };
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {};
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
