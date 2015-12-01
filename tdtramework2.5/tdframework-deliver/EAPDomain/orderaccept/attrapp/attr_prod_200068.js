BusCard.define('/orderaccept/attrapp/attr_prod_200068.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
  //��Ա�������Ų�Ʒ ��ҵӦ�������б����޸�
    var Me=this;
	BusCard.$rs(Me.$('200068'),BusCard.$remote("serviceParamDAO").getIndustryApplicationColl().list);
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
})
