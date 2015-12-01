BusCard.define('/orderaccept/attrapp/attr_prod_47.js',function(_buscard,cardParam){ 
    var prodOfferAcceptPageDispatch=function(){
		var Me = this;
	 	var ConstantsPool = dojo.require("orderaccept.common.js.ConstantsPool");
	 	var PaymentModeConst = ConstantsPool.load("PaymentModeConst").PaymentModeConst;	 
		if(!!$ac$.selectedMainProdOfferInfoVO && !!$ac$.selectedMainProdOfferInfoVO.feeType
				&& $ac$.selectedMainProdOfferInfoVO.feeType == PaymentModeConst.PREPAID){
			Me.$("47").value = "1";
		}else{
			Me.$("47").value = "2";
		}
		
		(function(){
		
			var parentWidgetObj =orderaccept.prodofferaccept.util.DomHelper.
									getParentWidget(Me.$("47"),"orderaccept.custom.TooltipDialog");
			var rowData = parentWidgetObj.rowData;
			if(!!rowData.prodOfferInst){
				if(Me.$('36')){
					Me.$('36').disabled = true;
				}
				if(Me.$('37')){
					Me.$('37').disabled = true;
				}
				if(Me.$('38')){
					Me.$('38').disabled = true;
				}
				if(Me.$('39')){
					Me.$('39').disabled = true;
				}
				if(	Me.$('40')){
					Me.$('40').disabled = true;
				}
				if(Me.$('41')){
					Me.$('41').disabled = true;
				}
				if(	Me.$('42')){
					Me.$('42').disabled = true;
				}
				if(Me.$('43')){
					Me.$('43').disabled = true;
				}
				if(Me.$('44')){
					Me.$('44').disabled = true;
				}
				if(Me.$('45')){
					Me.$('45').disabled = true;
				}
				if(Me.$('46')){
					Me.$('46').disabled = true;
				}
				if(Me.$('48')){
					Me.$('48').disabled = true;
				}
				if(Me.$('49')){
					Me.$('49').disabled = true;
				}
			}
		})();
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
