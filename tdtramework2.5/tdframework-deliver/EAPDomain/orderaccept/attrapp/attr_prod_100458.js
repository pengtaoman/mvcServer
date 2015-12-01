BusCard.define('/orderaccept/attrapp/attr_prod_100458.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
				var Me = this;
				
				/**
				 * 比较开始时间和结束时间的大小
				 */
				Me.compareDate = function(startDate,endDate){
					var dateYMD = startDate.split("-");
					var year = parseInt(dateYMD[0], 10);
					var month = parseInt(dateYMD[1], 10);
					var day = parseInt(dateYMD[2], 10);
					
					var dateTargetYMD = endDate.split("-");
					var yearTarget = parseInt(dateTargetYMD[0], 10);
					var monthTarget = parseInt(dateTargetYMD[1], 10);
					var dayTarget = parseInt(dateTargetYMD[2], 10);

					if(year == yearTarget){
						if(month == monthTarget){
							if(day == dayTarget){
								return true;
							}else if(day > dayTarget){
								return false;
							}else if(day < dayTarget){
								return true;
							}
						}else if(month<monthTarget){
							return true;
						}else if(month>monthTarget){
							return false;
						}
					}
					else if(year>yearTarget){
						return false;
					}else if(year<yearTarget){
						return true;
					}
				}
				/**
				 * 信息开始时间和信息结束时间都存在时执行
				 */
				if(Me.$('100458')&&Me.$('100457')){
					Me.$('100458').onblur = function(){
						if(Me.$('100458').value==""||Me.$('100457').value==""){
							return ;
						}
						var startDate = Me.$('100458').value;
						var endDate = Me.$('100457').value;
						if(!Me.compareDate(startDate,endDate)){
							Me.$('100458').value = "";
							orderaccept.common.dialog.MessageBox.alert({
					        	message:"\u5f00\u59cb\u65f6\u95f4\u5fc5\u987b\u5c0f\u4e8e\u7ed3\u675f\u65f6\u95f4"
					        });
						}
					}
					
					Me.$('100457').onblur = function(){
						if(Me.$('100457').value==""||Me.$('100458').value==""){
							return ;
						}
						var startDate = Me.$('100458').value;
						var endDate = Me.$('100457').value;
						if(!Me.compareDate(startDate,endDate)){
							Me.$('100457').value = "";
							orderaccept.common.dialog.MessageBox.alert({
					        	message:"\u5f00\u59cb\u65f6\u95f4\u5fc5\u987b\u5c0f\u4e8e\u7ed3\u675f\u65f6\u95f4"
					        });
						}
					}
					
					
				}
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
