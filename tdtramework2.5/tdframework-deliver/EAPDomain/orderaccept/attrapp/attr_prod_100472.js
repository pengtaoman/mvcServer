BusCard.define('/orderaccept/attrapp/attr_prod_100472.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	var cityCode = BusCard.$session.cityCode;
	var cityCodeName = BusCard.$session.areaName;		
	var paramObject = {};
	paramObject.id = cityCode;
	paramObject.name = BusCard.$remote("serviceParamBO").getCityCode(cityCode,3).list[0].name;
	BusCard.$rs(Me.$('100472'),[paramObject]);
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
	        var secondBusinessPageDispatch = function() {
	         return prodOfferAcceptPageDispatch.apply(this,arguments);
	        };
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {};
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
