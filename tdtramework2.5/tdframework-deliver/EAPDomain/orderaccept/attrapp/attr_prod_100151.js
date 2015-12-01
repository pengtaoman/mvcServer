BusCard.define('/orderaccept/attrapp/attr_prod_100151.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	//��ȫ�����˺ŷ���������Ĭ��ֵ
	var Me = this;
	Me.$("100151").value="";
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
