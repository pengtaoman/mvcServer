BusCard.define('/orderaccept/attrapp/attr_prod_100539.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	        	var Me = this;
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
							Me.$("100539").setAttribute('isnull',1);
      						Me.$("100539").removeAttribute('controlFieldName');
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
