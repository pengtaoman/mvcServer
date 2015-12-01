BusCard.define('/buscardapp/rela/js/card_105_10092.js',function(_buscard,cardParam){ 
var Me = this;
//add by liuzhongwei  查看权限设定受理方式下列列表的值  
//Me.$("agentInnet").style.visibility = "hidden";
//Me.$("agentInnet").parentNode.previousSibling.style.visibility = "hidden";
//Me.$("normalInnet").style.visibility = "hidden";
//Me.$("normalInnet").parentNode.previousSibling.style.visibility = "hidden";
//add by liuzhongwei start 212-5-10 
var executeRequest = _buscard.executeRequest;
//代理商入网权限判断
var parameter = "menuId=841ABWD";
var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "InnetCheck", parameter);
//普通入网权限判断
var parameterNormal = "menuId=841ABWC";
var resultJsonStrNormal = executeRequest("prodOfferSaleAjaxAction", "InnetCheck", parameterNormal);
if(resultJsonStr!="1"||resultJsonStrNormal!="1"){
		//代理商入网权限
	if(resultJsonStr=="1"){
		//this.$("agentInnet").value=1;
		this.$("acceptWay").value=3;
		var acceptWay = this.$("acceptWay");
		acceptWay.disabled=true;
		
	}
	//普通入网权限
	if(resultJsonStrNormal=="1"){
		//this.$("normalInnet").value=1;
		var acceptWayNormal = this.$("acceptWay");
		for(var i=0;i<acceptWayNormal.options.length;i++){
		    if(acceptWayNormal.options[i].value == "3")
		    {
		        acceptWayNormal.options.remove(i);  
		        break;
		    }
		}
		
	}

}
//batch accept permission
var batchAcceptPermission = executeRequest("prodOfferSaleAjaxAction", "InnetCheck", "menuId=841ABXG");
if(batchAcceptPermission!="1"){
	Me.$("batchFlag").style.display = 'none';
	Me.$("label_batchFlag").style.display = 'none';
}
//判断是不是预受理订单
var customerId = "customerId="+dojo.global.$appContext$.get("requestParam").customerData.custId;
var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "preOrderCheck", customerId);
if(resultJsonStr==1){
	var acceptWayByCust = this.$("acceptWay");
		for(var i=0;i<acceptWayByCust.options.length;i++){
		    if(acceptWayByCust.options[i].value == "3")
		    {
		        acceptWayByCust.options.remove(i);  
		        break;
		    }
		}
}else{
	var agentNumberCheck = executeRequest("prodOfferSaleAjaxAction", "agentNumberCheck", "");
	if(agentNumberCheck==1){
		this.$("acceptWay").value=3;
		var acceptWay = this.$("acceptWay");
		if(acceptWay.value != 3){
			alert("\u8BE5\u5DE5\u53F7\u4E3A\u4EE3\u7406\u5546\uFF0C\u4F46\u6CA1\u6709\u4EE3\u7406\u5546\u5165\u7F51\u6743\u9650");
		}
		acceptWay.disabled=true;
	}
}
//add by liuzhongwei end 212-5-10 
var viaIdKind = this.$("viaIdKind");
if(!!viaIdKind){
	this.$("viaId").onblur = function () {
	
		if (viaIdKind.value) {
			if (this.value) {
				if (!checkid_idencode_new("\u8bc1\u4ef6\u53f7\u7801", viaIdKind, this)) {
					return;
				}
			}
		}
	};
};
function checkid_idencode_new(alert_name,iden_kind,iden_value){
	if(!iden_kind.disabled){
		var result=check_identity_new("","",alert_name,iden_kind,iden_value)
		if (false==result.status){
			alert(result.message);
			iden_value.select();
			iden_value.focus();
			return false;
		}else{
			return true;
		}
	}else {
		return true;
	}
}
void function(){
var current = new Date();
var year =""+current.getFullYear();
var month = (current.getMonth()+1)<10?"0"+(current.getMonth()+1):""+ (current.getMonth()+1);
var date = ""+current.getDate();
if(!!this.$("effectDate")){
	this.$("effectDate").value = year+"-"+month+"-"+date;
}
}();

Me.$("developerDealer").onquery = function () {
			var checkbox = this, _card = arguments[0], _buscard = arguments[1], _p = arguments[2];
			var value = _buscard.util.trim(this.value);
			if (!value) {
				alert("\u8bf7\u8f93\u5165\u67e5\u8be2\u5173\u952e\u8bcd");
				this.focus();
				return;
			}
			//客户提出,“发展渠道”应支持在全部范围内模糊查询，而不是限制在选定的“销售渠道”范围内查询。
			var saleWay = "-1";//_card.$("saleWay").value ? _card.$("saleWay").value : "";
			//var cityCodeVal = !!cardParam.cityCode?cardParam.cityCode:"";
			var cityCodeVal = BusCard.$session.cityCode;
			var belongCode = function() {
		        try {
			        return prodOfferAcceptLoader.getBelongCode();
		        }
		        catch (e) {}
		    }();
			var data = {productId:_p.productId,cityCode:cityCodeVal, regionCode:!!belongCode?belongCode:0, saleWay:saleWay, dealerName:value, fieldId:this.getAttribute("fieldId")};
			var jsonData = BusCard.util.native2ascii(_buscard.toJson(data));
			var requestParam = {jsonData:jsonData, method:"query"};
			return _buscard.util.doGet(_buscard.path.initPath, requestParam);
		};
	Me.$("developerDealer").onafterclick = function () {
		var item = this, _card = arguments[0], _buscard = arguments[1];
		var developerElem = _card.$("developer");
		var data = {cityCode:BusCard.$session.cityCode,dealerId:Me.$("developerDealer").rvalue, fieldId:developerElem.getAttribute("fieldId")};
		var jsonData = _buscard.toJson(data);
		var requestParam = {jsonData:jsonData, method:"query"};
		var dataList = _buscard.util.doGet(_buscard.path.initPath, requestParam);
		//没有默认值,添加【请选择】选项
		(dataList||[]).unshift({
	        name : '\u8bf7\u9009\u62e9',
	        ids : ''
	    });
		_buscard.$rs(_card.$("developer"), dataList);
	};
	if(!!this.$("viaPhone")){	
		this.$("viaPhone").onkeypress = function(){return checkInputChar();};
		this.$("viaPhone").onblur = function(){checkTelephone(Me.$("viaPhone"));};
	}
	this.$("contactPhone").onkeypress = function(){return checkInputChar();};
	this.$("contactPhone").onblur = function(){checkTelephone(Me.$("contactPhone"));};
	
	function checkInputChar(){
		if(!(event.keyCode>=47&&event.keyCode<=57))
		{
			alert("\u7535\u8bdd\u53f7\u7801\u53ea\u80fd\u8f93\u5165\u6570\u5b57\u548c/");
			event.srcElement.focus();
			return false;
		}
		return true;
	}	
	function checkTelephone(obj){
		var phoneNum = obj.value;
		var regexServiceKind = /[^\d||\/]/;
		var flagPhone = regexServiceKind.test(phoneNum);
		if(flagPhone){
			alert("\u7535\u8bdd\u53f7\u7801\u53ea\u80fd\u8f93\u5165\u6570\u5b57\u548c/");
			obj.value = "";
			obj.focus();
			return;
		}
	}
	
	
	//加载时判断预存款输入框是否可以修改
	if($("acceptWay").value=="3"){
		var ifPayCheck = false;
		var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
		if(!!selectedMemberProdOfferList){
			 dojo.forEach(selectedMemberProdOfferList, function(selectedMemberProdOffer) {
                var productId=selectedMemberProdOffer.productId;
                if(!!productId && ifPayCheck == false){
                	//获取产品大类
					var productInfo=BusCard.$remote('productToServiceDAO').queryById({productId:productId});
	                var netType=productInfo.netType;
	                if(netType==orderaccept.common.js.ConstantsPool.load(["ServiceKindCDConst"]).ServiceKindCDConst.CDMA_SERVICE_KIND){
	                	ifPayCheck = true;
	                }
                }
            });
		}
		if(ifPayCheck == true){
			var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "agentPayCheck");
			if(resultJsonStr=="1"){
				var acceptFee=prodOfferAcceptLoader.payRelationWidgetInstance.queryById("accountFee .u-form-field .u-form-textbox-field .u-form-textbox-input");
				if(!!acceptFee){
					acceptFee.value="0.00";
					acceptFee.disabled="true";
					//prodOfferAcceptLoader.payRelationWidgetInstance.queryById("accountFee .u-form-field .u-form-textbox-field .u-form-textbox-input").disabled=true;
					prodOfferAcceptLoader.refreshPayRelation() ;
				}
			}
		}
	}
	//改变受理方式下拉列表时候判断预存款是否可以修改
	this.$("acceptWay").onchange=function(){
		if($("acceptWay").value=="3"){
			var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "agentPayCheck");
			if(resultJsonStr=="1"){
				var acceptFee=prodOfferAcceptLoader.payRelationWidgetInstance.queryById("accountFee .u-form-field .u-form-textbox-field .u-form-textbox-input");
				if(!!acceptFee){
					acceptFee.value="0.00";
					acceptFee.disabled="true";
					//prodOfferAcceptLoader.payRelationWidgetInstance.queryById("accountFee .u-form-field .u-form-textbox-field .u-form-textbox-input").disabled=true;
					prodOfferAcceptLoader.refreshPayRelation() ;
				}
			}
			//判断一下开关是否打开
			var notAgentPstnCheck = executeRequest("prodOfferSaleAjaxAction", "notAgentPstnCheck", "");
			if(!!notAgentPstnCheck&&notAgentPstnCheck==1){
				//对于非代理商工号，选择了“代理商入网”，则限制不能做固网新装
				var agentNumberCheck = executeRequest("prodOfferSaleAjaxAction", "agentNumberCheck", "");
				//非代理商入网
				if(agentNumberCheck!=1){
					//不是固网新装
					var  selectedMemberProdOfferList=$ac$.selectedMemberProdOfferList;
					if(!!selectedMemberProdOfferList){
						 dojo.forEach(selectedMemberProdOfferList, function(selectedMemberProdOffer) {
			                var productId=selectedMemberProdOffer.productId;
			                if(!!productId){
			                	//获取产品大类
								var productInfo=BusCard.$remote('productToServiceDAO').queryById({productId:productId});
				                var netType=productInfo.netType;
				                if(netType==orderaccept.common.js.ConstantsPool.load(["ServiceKindCDConst"]).ServiceKindCDConst.PSTN_SERVICE_KIND){
				                	$("acceptWay").value=1;
				                	alert("\u975e\u4ee3\u7406\u5546\u5de5\u53f7\u002c\u9009\u62e9\u4e86\u4ee3\u7406\u5546\u5165\u7f51\u002c\u4e0d\u80fd\u505a\u56fa\u7f51\u65b0\u88c5");
				                }
			                }
		                });
					}
					
				}
			
			}
		}else{
			var acceptFee=prodOfferAcceptLoader.payRelationWidgetInstance.queryById("accountFee .u-form-field .u-form-textbox-field .u-form-textbox-input");
			if(!!acceptFee){
				acceptFee.disabled=false;
				prodOfferAcceptLoader.refreshPayRelation();
			}
		}
	}
	if(!!prodOfferAcceptLoader 
			&& prodOfferAcceptLoader.declaredClass == "orderaccept.prodofferaccept.loader.MemberOrderGroupProductLoader"){
		if(!!dojo.byId("label_developerDealer")){
			dojo.byId("label_developerDealer").style.display = 'none';
			if(!!dojo.byId("label_developerDealer").nextSibling){
				dojo.byId("label_developerDealer").nextSibling.style.display = 'none';
			}
		}
		if(!!dojo.byId("label_developer")){
			dojo.byId("label_developer").style.display = 'none';
			if(!!dojo.byId("label_developer").nextSibling){
				dojo.byId("label_developer").nextSibling.style.display = 'none';
			}
		}
	}
});
