BusCard.define('/orderaccept/attrapp/attr_prod_54',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this; 
	if(!prodOfferAcceptLoader.prodResRelaMap){
		prodOfferAcceptLoader.prodResRelaMap ={};
	}
	/**
	 * 业务号码后面的放大镜的点击事件
	 */
	Me.$("link_54").onclick = function(){
		Me.cityCode = prodOfferAcceptLoader.requestParam.customerData.cityCode;
		var B = {"ServiceIdInterface":new ServiceNumInterface({"$" : function(id) {return Me.$(id)}})};
		var container2 = BusCard.$session.container2;
		var workNo = BusCard.$session.workNo;
		var endpassword = BusCard.$session.PASSWORD;
		var noDept = BusCard.$session.acceptDealer;
		var webPath = container2 + "resource/interfacemanage/selectno/SelectNoMain.jsp?STAFFNO=" + workNo + "&PASSWORD=" + endpassword + "&noDept=" + noDept+ "&cityCode=" + Me.cityCode +"&sortId=4";
		Me.windowResourceServiceId = window.showModalDialog(webPath, B, "DialogWidth:1024px;DialogHeight:768px;status:no;location:no");
	};
	var ServiceNumInterface = function(oParameter){
		var Me=this;
		Me.$ = oParameter["$"];
		Me.setServiceId = function(param){
			var serviceId = param["serviceId"];
			var resInstId = param["resInstId"];
	        var imsi = param["subImsi"];
	        var esn = param["subEsn"];
			Me.$("54").value = serviceId;
			Me.$("55").value = imsi;
			Me.$("56").value = esn;
			prodOfferAcceptLoader.prodResRelaMap[serviceId] = {
				serviceId : serviceId,
				mktResInstId : resInstId,
				typeCd : 9
			};
			Me.$("54").focus();
		};
	};
	/**
	 * 业务号码的检测
	 */
	Me.$("54").onblur = function(){
		var productId = null;
		var parentDom = orderaccept.prodofferaccept.util.DomHelper.getParentWidget(this,"orderaccept.custom.TooltipDialog");
		var rowData = parentDom.rowData;
		if(rowData.showData.chooseNumberObj!=null){
			  productId = rowData.showData.chooseNumberObj.productId;
		}
		Me.checkResource(productId);
	};
	/**
	 * 
	 */
	Me.checkResource = function(productId){
		Me.cityCode = prodOfferAcceptLoader.requestParam.customerData.cityCode;
		var A = Me.$("54").value;
		if (!A) {
			return true;
		}
		var C = "serviceId=" + A + "&serviceOfferId=" + "301"  + "&cityCode=" + Me.cityCode+"&productId="+productId;
		var D = orderaccept.prodofferaccept.util.ServiceFactory.getService("url:prodOfferSaleAjaxAction.do?method=checkResourceOneCard2Num&"+ C);
		if(D.FLAG == "0" || D.FLAG == 0){
			alert(D.REMSG);
			Me.resetServiceId();
			return;
		}
		var B=D["INST_ID"]
		Me.$("55").value = D["IMSI"];
		Me.$("56").value = D["ESN"];
		prodOfferAcceptLoader.prodResRelaMap[serviceId] = {
			serviceId : A,
			mktResInstId : B,
			typeCd : 9
		};
	};
	Me.resetServiceId = function () {
		Me.$("54").value = "";
	};
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
