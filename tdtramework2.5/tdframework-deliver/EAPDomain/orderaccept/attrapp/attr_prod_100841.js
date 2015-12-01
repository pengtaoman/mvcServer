BusCard.define('/orderaccept/attrapp/attr_prod_100841.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	        	var Me = this;
	        	
	        	var _attrIdlist_ = ["100842"];
	        	var _exAttrIdList_ = ["100843","100850","100844","100847","100845","100846","100848","100849"];
				if(Me.$('100841')){
					Me.$('100841').onchange = function(){
						var currentValue = Me.$('100841').value;
						if(currentValue == 1){
							dojo.forEach(_attrIdlist_||[],function(attrId){
								Me.display(attrId);
								Me.$(attrId).setAttribute('controlFieldName',attrId);
							});
							dojo.forEach(_exAttrIdList_||[],function(attrId){
								Me.hidden(attrId);
								Me.$(attrId).removeAttribute('controlFieldName');
							});
						}else if(currentValue == 2){
							dojo.forEach(_attrIdlist_||[],function(attrId){
								Me.hidden(attrId);
								Me.$(attrId).removeAttribute('controlFieldName');
							});
							dojo.forEach(_exAttrIdList_||[],function(attrId){
								Me.display(attrId);
								Me.$(attrId).setAttribute('controlFieldName',attrId);
							});
						}
					}
					Me.$('100841').onchange();
				}
	        };
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	        /**
	         * 综合查询页面处理分支
	         * @method
	         */
	        var allInfoQueryPageDispatch = function() {
	        
	        };
	        /**
	         * 二次业务处理分支
	         * @method
	         */
	        var secondBusinessPageDispatch = function() {
	           
	        };
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {};
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
})
