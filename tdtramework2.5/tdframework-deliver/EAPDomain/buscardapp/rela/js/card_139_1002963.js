
BusCard.define("/buscardapp/rela/js/card_139_1002963.js", function (_buscard, cardParam) {
	Me = this;
	var a = arguments[0];
	Me.cityCode = $("cityCode").value;
	Me.employeeId = $("employeeId").value;
	Me.terminalTypeData;
	Me.agreementPlanData;
	
	if(Me.$("deviceCount")){
	  Me.$("deviceCount").value=1;
	  Me.$("deviceCount").disabled=true;
	}
	
	
	if (Me.$("dealerid")) {
		try {
			var commDealerAPIBO = BusCard.$remote("commDealerAPIBO");
			var data = commDealerAPIBO.doGetChnlNbrInfo(Me.cityCode, Me.employeeId);
			if (data && data.list) {
				a.$rs(Me.$("dealerid"), data.list);
			}
		}
		catch (e) {
			alert(e.message);
		}
	}
	if(Me.$("terminalType")){
	   try {
			var serviceParamBO = BusCard.$remote("serviceParamBO");
			terminalTypeData = serviceParamBO.getDragonPlanMobileFee(Me.cityCode);
			if (terminalTypeData && terminalTypeData.list) {
				a.$rs(Me.$("terminalType"), terminalTypeData.list);
			}
		}
		catch (e) {
			alert(e.message);
		}	
	}
	if(Me.$("agreementPlan")){
	   try {
			var serviceParamBO = BusCard.$remote("serviceParamBO");
			var agreementPlanData = serviceParamBO.getDragonplanContract(Me.cityCode);
			if (agreementPlanData && agreementPlanData.list) {
				a.$rs(Me.$("agreementPlan"), agreementPlanData.list);
			}
		}
		catch (e) {
			alert(e.message);
		}	
	}
	Me.$("agreementPlan").onchange=function(){
	   var val=Me.$("agreementPlan").value;
	   BusCard.each(agreementPlanData.list,function(vo){
							if(vo.id==val){
							  Me.$("agreementType").value=vo.preserve_1;
							  Me.$("validTime").value=vo.preserve_2;
							  Me.$("packagesLevel").value=vo.preserve_3;
							  return;
							}
						  });
	
	
	}
	Me.$("terminalType").onchange=function(){
	 var val=Me.$("terminalType").value;
	 BusCard.each(terminalTypeData.list,function(vo){
							if(vo.id==val){
							  Me.$("color").value=vo.preserve_1//颜色
							  Me.$("capacity").value=vo.preserve_2//容量
							  Me.$("orderSumFee").value=vo.preserve_3//费用
							   return;
							}
						  });
	
	}
	Me.readOnlyM=function(){
	 Me.$("agreementType").disabled=true;
	 Me.$("validTime").disabled=true;
	 Me.$("packagesLevel").disabled=true;
	 Me.$("color").disabled=true;
	 Me.$("capacity").disabled=true;
	 Me.$("orderSumFee").disabled=true;
	}
	Me.readOnlyM();
	Me.$("agreementPlan").onchange();
	Me.$("terminalType").onchange();
	
	
	
	if (Me.$("reserveOrderType")) {
		Me.$("reserveOrderType").onchange = function () {
			if ($("reserveOrderType").value == 1) {
				$("budgetBtn").disabled = false;
			} else {
				$("budgetBtn").disabled = true;
				$("print_Btn").disabled = false;
				$("commitBtn").disabled = false;
			}
		};
	}
	if ($("deviceCount")) {
		$("deviceCount").onblur = function () {
			var val = $("deviceCount").value;
			var parameter = "cityCode=" + Me.cityCode + "&serviceKind=8&objectId=822";
			var result = _buscard.executeRequest("businessAcceptAction", "getBusinessParam", parameter);
			if (result != "" && val > result) {
				
				alert("\u9f99\u8ba1\u5212\u53ef\u9884\u8ba2\u7ec8\u7aef\u6570\u91cf\u4e3a" + result + ",\u8bf7\u91cd\u65b0\u8f93\u5165\u3002");
				$("deviceCount").value = "";
				return false;
			}
		};
	}
   if($("certificateId")){
     $("certificateId").onblur=function(){
       var certificateIdKind=$("certificateType");
     if (!checkid_iden_new("\u8bc1\u4ef6\u53f7\u7801", certificateIdKind, this)) {
				return;
			}
     
     }
   
   
   
   }	
	
	
	
	
	
});

