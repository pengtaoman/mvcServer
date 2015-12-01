BusCard.define('/orderaccept/attrapp/attr_prod_200165.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	var list = [Me.$("200148"),Me.$("200137"),Me.$("200128"),Me.$("200057"),Me.$("200056")];
	Me.$("200165").onclick = function(){
		if(Me.$("200165").checked){
			Me.changeStatus(list);
		}
	};
	Me.changeStatus = function(nodeList){
		dojo.forEach(nodeList,function(node){
			if(node.checked){
				node.checked=false;
			}
		})
	};
	dojo.forEach(list,function(node){
		node.onclick = function(){
			if(node.checked){
				Me.$("200165").checked = false;
			}
		}
	})
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
