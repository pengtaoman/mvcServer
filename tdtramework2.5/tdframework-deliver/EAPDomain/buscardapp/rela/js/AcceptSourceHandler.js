BusCard.define('/buscardapp/rela/js/AcceptSourceHandler.js',function(_buscard,cardParam){

    var Me = this;
	var util = dojo.require("orderaccept.prodofferaccept.util");
 	var ConstantsPool = dojo.require("orderaccept.common.js.ConstantsPool");
 	var PaymentModeConst = ConstantsPool.load("PaymentModeConst").PaymentModeConst;	 
	//服务信息widget
	var serviceCardWidget = util.DomHelper.getParentWidget(Me.$("acceptSource"),
									"orderaccept.prodofferaccept.widget.servicecard.ServiceCardWidget");
	var mainProdOfferInstVO = $ac$.mainProdOfferInstVO;
	var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
	var memberProdOfferInfo = null;
	if(!mainProdOfferInstVO || !mainProdOfferInstVO.prodOfferInstId){
		memberProdOfferInfo = dojo.filter(selectedMemberProdOfferList,function(memberOffer){
								if(!!serviceCardWidget &&!!serviceCardWidget.cardParam){
									return memberOffer.uniqueId == serviceCardWidget.cardParam.uniqueId
								}
								return false;
							})[0]
	}
	//add by liuzhongwei 2012-5-7  预登录复选框
    if(!!Me.$("acceptSource")){
    	if((!!mainProdOfferInstVO && !!mainProdOfferInstVO.prodOfferInstId)
    				||(!!memberProdOfferInfo && !!memberProdOfferInfo.prodInstId)){
    		Me.$("acceptSource").disabled = true;
    	}
    	var executeRequest = _buscard.executeRequest;
		//权限控制“预登录” 是否可用
		var parameter = "menuId=841ABWE";
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "InnetCheck", parameter);
		if(resultJsonStr != "1"){
			Me.$("acceptSource").disabled = true;
		}
		dojo.connect(Me.$("acceptSource"),"onclick",function(){
			if(!!Me.$("uimId") && Me.$("uimId").value != ""){
				Me.$("uimId").onblur();
			}
    		var ifPrePaid = false;	
			if(!!Me.$("paymentModeCd") 
					&& Me.$("paymentModeCd").value == PaymentModeConst.PREPAID){
				ifPrePaid = true;					
			}		
			//产品属性widget
			var prodAttrCardWidget = serviceCardWidget.attrCardWidget;
			var prodAttrCard = !!prodAttrCardWidget?prodAttrCardWidget.busCardInstance:null;
			//var label_100660 = dojo.query(".formRequested",prodAttrCard.$("label_100660"))[0];
			//if(!label_100660){
				//dojo.place("<span class=\"formRequested\">*</span>",prodAttrCard.$("label_100660"),"first");
				//label_100660 = dojo.query(".formRequested",prodAttrCard.$("label_100660"))[0];
			//}
			//dojo.style(label_100660,"display","none");
			//prodAttrCard.$("100660").setAttribute("isnull","1");
			if(Me.$("acceptSource").checked){
				Me.$("acceptSource").value="1";
				if(ifPrePaid == true && !!prodAttrCard){
					//prodAttrCard.$("100660").setAttribute("isnull","0")
					//dojo.style(label_100660,"display","");
					var subgroup = dojo.query("[id=subgroup_productAttrMore]",prodAttrCard.domNode)[0];
					if(!!subgroup){
						prodAttrCard.displaySubGroup(subgroup);
					}
				}
			}else{
				Me.$("acceptSource").value="0";
			}
		});
    }
	
});
