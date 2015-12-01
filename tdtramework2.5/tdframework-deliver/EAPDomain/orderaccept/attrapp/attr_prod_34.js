BusCard.define('/orderaccept/attrapp/attr_prod_34',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	//方便清除号码用
	Me.oldServiceId = null;
	if(!prodOfferAcceptLoader.prodResRelaMap){
		prodOfferAcceptLoader.prodResRelaMap ={};
	}
	/**
	 * 业务号码后面的放大镜的点击事件
	 */
	Me.$("link_34").onclick = function(){
		var parentDom = orderaccept.prodofferaccept.util.DomHelper.getParentWidget(this,"orderaccept.custom.TooltipDialog");
		var rowData = parentDom.rowData;
		if(rowData.showData.chooseNumberObj!=null){
			//传接入类产品id
			Me.productId = rowData.showData.chooseNumberObj.productId;
		}
		Me.cityCode = prodOfferAcceptLoader.requestParam.customerData.cityCode;
		var B = {"ServiceIdInterface":new ServiceNumInterface({"$" : function(id) {return Me.$(id)}})};
		var container2 = BusCard.$session.container2;
		var workNo = BusCard.$session.workNo;
		var endpassword = BusCard.$session.PASSWORD;
		var noDept = BusCard.$session.acceptDealer;
		var webPath = container2 + "resource/interfacemanage/selectno/SelectNoMain.jsp?STAFFNO=" + workNo + "&PASSWORD=" + endpassword + "&noDept=" + noDept+ "&cityCode=" + Me.cityCode + "&productId=" + Me.productId + "&sortId=2&coopFlag=1&auxiliaryFlag=1";
		Me.windowResourceServiceId = window.showModalDialog(webPath, B, "DialogWidth:1024px;DialogHeight:768px;status:no;location:no");
	};
	var ServiceNumInterface = function(oParameter){
		var Me=this;
		Me.$ = oParameter["$"];
		Me.setServiceId = function(param){
			var serviceId = param["serviceId"];
			var resInstId = param["resInstId"];
			Me.$("34").value = serviceId;
			//Me.$("35").value = resInstId;
			if(Me.oldServiceId==null){
				//如果没有旧的，则直接设置
				prodOfferAcceptLoader.prodResRelaMap[serviceId] = {
					serviceId : serviceId,
					mktResInstId : resInstId
				};
				Me.oldServiceId = serviceId;
			}else{
				//如果旧值不为空，则直接使用
				prodOfferAcceptLoader.prodResRelaMap[Me.oldServiceId] = {};
				prodOfferAcceptLoader.prodResRelaMap[serviceId] = {
					serviceId : serviceId,
					mktResInstId : resInstId
				};
				Me.oldServiceId = serviceId;
			}
			
			Me.$("34").focus();
		};
	};
	/**
	 * 业务号码的检测
	 */
	Me.$("34").onblur = function(){
		var parentDom = orderaccept.prodofferaccept.util.DomHelper.getParentWidget(this,"orderaccept.prodofferaccept.widget.attrcard.ProductAttrCardWidget");
		var productInfoVO = parentDom.getModel().productInfoVO;
		var dialogParentDom = orderaccept.prodofferaccept.util.DomHelper.getParentWidget(this,"orderaccept.custom.TooltipDialog");
		var rowData = dialogParentDom.rowData;
		//如果是用户已经有的号码，则不做检测
		if(Me.checkIfExistCurrentServiceId(rowData,productInfoVO)){
			if(Me.oldServiceId!=null){
				prodOfferAcceptLoader.prodResRelaMap[Me.oldServiceId] = {};
			}
			return;
		}
		Me.checkResource(productInfoVO);
	};
	
	/**
	 * 判断当前号码和是否是用户已经有的号码
	 */
	Me.checkIfExistCurrentServiceId = function(rowData,productInfoVO){
		
		//没有销售品实例不进行检测
		if(!!rowData.prodOfferInst){
			var serviceId = Me.$("34").value;
			//找出产品实例
			var prodInstVO = BusCard.find(rowData.prodOfferInst.prodInstList||[],function(prodInst){
				return productInfoVO.productId == prodInst.productId;
			});
			//首先找出和一机双号相关的产品属性实例信息
			if(!!prodInstVO){
				//获取实例属性
				var prodInstAttrList = prodInstVO.prodInstAttrList;
				//判断对应的属性值和当前的值是否一致
				var _flag_ = dojo.some(prodInstAttrList||[],function(prodInstAttr){
					return prodInstAttr.attrId==34&&prodInstAttr.attrValue == serviceId;
				})
				if(_flag_){
					return true;
				}
				return false;
			}
		}
		return false;
	};
	
	/**
	 * 
	 */
	Me.checkResource = function(productInfoVO){
		var resRelaList = productInfoVO.resRelaList;
		var resMktCd = "";
		//默认取第一个
		if(resRelaList!=null&&resRelaList.length>0){
			for(var p =0;p<resRelaList.length;p++){
				var resRelaVO = resRelaList[p];
				if(resMktCd!=""){
					resMktCd += "^"+resRelaVO.mktResCd;
				}else{
					resMktCd = resRelaVO.mktResCd;
				}
			}
			//resMktCd = resRelaList[0].mktResCd;
		}
		Me.cityCode = prodOfferAcceptLoader.requestParam.customerData.cityCode;
		var A = Me.$("34").value;
		if (!A) {
			return true;
		}
		var C = "serviceId=" + A + "&serviceOfferId=" + "301" + "&productId=" + productInfoVO.productId + "&cityCode=" + Me.cityCode+"&resId=" + resMktCd;
		var D = orderaccept.prodofferaccept.util.ServiceFactory.getService("url:prodOfferSaleAjaxAction.do?method=checkResourceViceNum&"+ C);
		var B = executeAjaxResult(D);
		if (B == false) {
			Me.resetServiceId();
			return;
		}
		//Me.$("35").value = B;
		if(Me.oldServiceId==null){
			//如果没有旧的，则直接设置
			prodOfferAcceptLoader.prodResRelaMap[A] = {
				serviceId : A,
				mktResInstId : B
			};
			Me.oldServiceId = A;
		}else{
			//如果旧值不为空，则直接使用
			prodOfferAcceptLoader.prodResRelaMap[Me.oldServiceId] = {};
			prodOfferAcceptLoader.prodResRelaMap[A] = {
				serviceId : A,
				mktResInstId : B
			};
			Me.oldServiceId = A;
		}
	};
	Me.resetServiceId = function () {
		Me.$("34").value = "";
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
