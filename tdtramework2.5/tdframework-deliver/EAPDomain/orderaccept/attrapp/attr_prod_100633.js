BusCard.define('/orderaccept/attrapp/attr_prod_100633.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch = function() {
	        	//见attr_prod_100628.js处理逻辑
	        };
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	        /**
			 * 综合查询页面处理分支
			 * 
			 * @method
			 */
	        var allInfoQueryPageDispatch = function() {};
	        /**
			 * 二次业务处理分支
			 * 
			 * @method
			 */
	        var secondBusinessPageDispatch = function() {
		        return prodOfferAcceptPageDispatch.apply(this, arguments);
	        };
	        /**
			 * 批量页面处理分支
			 * 
			 * @method
			 */
	        var batchPageDispatch = function() {};
	        
	        // 调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
        });
