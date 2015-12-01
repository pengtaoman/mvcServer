/**
 * 最晚激活时间属性处理
 * 
 * @class
 * @extends
 */
BusCard.define('/orderaccept/attrapp/attr_prod_100660.js',function(_buscard,cardParam){	
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	var util = dojo.require("orderaccept.prodofferaccept.util");
	var MessageBox = dojo.require("orderaccept.common.dialog.MessageBox");
 	var ConstantsPool = dojo.require("orderaccept.common.js.ConstantsPool");
	var prodOfferAcceptLoader = dojo.getObject("prodOfferAcceptLoader");
 	var PaymentModeConst = ConstantsPool.load("PaymentModeConst").PaymentModeConst;	 
	//获取产品属性widget
	var productAttrCardWidget = util.DomHelper.getParentWidget(Me.$("100660"),
									"orderaccept.prodofferaccept.widget.attrcard.ProductAttrCardWidget");
	//获取服务信息卡片实例
	var serviceCard = productAttrCardWidget.busCardInstance.getParent();
	if(!!serviceCard.$("acceptSource") && serviceCard.$("acceptSource").check == true
			&& !!serviceCard.$("paymentModeCd") && serviceCard.$("paymentModeCd").value == PaymentModeConst.PREPAID){
		if(!!Me.$("100660").getAttribute("isnull")){
			Me.$("100660").setAttribute("isnull","0")
			dojo.place("<span class=\"formRequested\">*</span>",Me.$("label_100660"),"first");
		}
	}
//	dojo.connect(Me.$("100660"),"onblur",function(){		
//		var activeDate = util.DateHelper.getDateFromString(Me.$("100660").value);
//        MessageBox.alert({
//	        title : "\u63d0\u793a\u4fe1\u606f",
//	        message : "das"
//        }, Me.$("100660"));
//	});
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
