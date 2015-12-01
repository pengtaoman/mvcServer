BusCard.define('/orderaccept/attrapp/attr_prod_100851.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	        	var Me = this;
				
				if(Me.$('100851')){
					Me.$('100851').onchange = function(){
						var currentValue = Me.$('100851').value;
						if(currentValue == 1 ){
							Me.$('100852').value = 'ALL';
							Me.hidden('100852');
						}else if(currentValue ==2){
							Me.$('100852').value = "";
							Me.display('100852');
						}else if(currentValue ==3){
							Me.$('100852').value = 'OTHER';
							Me.hidden('100852');
						}
					};
					Me.$('100851').onchange();
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
