BusCard.define('/orderaccept/attrapp/attr_prod_100855.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	        	var Me = this;
	        	
	        	
				
				if(Me.$('100855')){
					Me.$('100855').onchange = function(){
						var currentValue = Me.$('100855').value;
						if(currentValue == 1 ){
							Me.$('100856').value="ALL";
							Me.$('100857').value="ALL";
							Me.hidden('100857');
							Me.hidden('100856');
						}else if(currentValue ==2){
							Me.$('100856').value="";
							Me.$('100857').value="";
							Me.display('100857');
							Me.display('100856');
						}else if(currentValue ==3){
							Me.$('100856').value="OTHER";
							Me.$('100857').value="OTHER";
							Me.hidden('100857');
							Me.hidden('100856');
						}
					};
					Me.$('100855').onchange();
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
