BusCard.define('/orderaccept/attrapp/attr_prod_100765.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	var executeRequest = _buscard.executeRequest;
	var session = BusCard.$session;
	var cityCode = BusCard.$session.cityCode;	
	var paramObjColl = [];
	var commRegionList = BusCard.$remote("prodOfferSaleDataBO").doQueryCommRegionByCity({'cityCode':cityCode,'regionLevel':4});
	dojo.forEach(commRegionList,function(commRegionVO){		
		var paramObject = {};
		paramObject.id = commRegionVO.commonRegionId;
		paramObject.name = commRegionVO.regionName;
		paramObjColl.push(paramObject);
	});
	BusCard.$rs(this.$('100765'),paramObjColl);
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
