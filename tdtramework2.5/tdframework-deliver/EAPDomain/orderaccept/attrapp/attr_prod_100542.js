BusCard.define('/orderaccept/attrapp/attr_prod_100542.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	        	var Me = this;
	        	dojo.require("orderaccept.prodofferaccept.util");
	        	Me.$("100542").onchange = function(){
			   		if(orderaccept.prodofferaccept.util.ProdOfferHelper.judgeByWideAttrParamValue(Me.$('300000'),Me.$('100542'),Me.$('100081'))== false){
			   			 var tips = "\u5f53\u524d\u901f\u7387\u4e0e\u7528\u6237\u7c7b\u578b\u548c\u627f\u8f7d\u65b9\u5f0f\u4e0d\u5339\u914d\uff0c\u4f1a\u5f71\u54cd\u65bd\u5de5,\u8bf7\u91cd\u65b0\u9009\u62e9\u901f\u7387!";
			   			 orderaccept.common.dialog.MessageBox.alert({
							message: tips
						});
			   		}
				};
				
	        	(function(){
					var parentDom = dijit.getEnclosingWidget(Me.getParent().dom);
					var model = parentDom.getModel();
			    	var serviceCardWidgetMap =  prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_" + model.cardParam.uniqueId];
					if($ac$.get("orderChangeFlag")== 1){
						//��������
					}else{
						//�����Ϊ��װ���߻�����,���ύ���� 
						if(serviceCardWidgetMap.cardParam.serviceOfferId!=ConstantsPool.load("ServiceOfferIDConst").ServiceOfferIDConst.PROD_NEW
						&&serviceCardWidgetMap.cardParam.serviceOfferId!=ConstantsPool.load("ServiceOfferIDConst").ServiceOfferIDConst.PRODUCT_CHANGE_ACCEPT){
							Me.$("100542").setAttribute('isnull',1);
      						Me.$("100542").removeAttribute('controlFieldName');
						}
					}
				})();
        	};
	        
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	        /**
	         * �ۺϲ�ѯҳ�洦���֧
	         * @method
	         */
	        var allInfoQueryPageDispatch = function() {};
	        /**
	         * ����ҵ�����֧
	         * @method
	         */
	        var secondBusinessPageDispatch = function() {
	        };
	        /**
	         * ����ҳ�洦���֧
	         * @method
	         */
	        var batchPageDispatch = function() {};
	      
	        //���þ����֧�����߼�
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
