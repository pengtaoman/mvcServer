BusCard.define('/orderaccept/attrapp/attr_prod_100853.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	        	var Me = this;
	        	
	        	/**
	        	 * ����������
	        	 */
	        	Me.createSelectOption = function(targetValue,selectDom){
	        		var options = selectDom.options;
	        		var op = document.createElement("option");
	        		op.value = targetValue;
					op.text  = targetValue;
					options.add(op);
	        	};
	        	
	        	/**
	        	 * �Ƴ�
	        	 */
	        	Me.removeSelectOption = function(targetValue,selectDom){
	        		var options = selectDom.options;
	        		for(var len =0 ;len<options.length;len++){
	        			if(options[len].value == targetValue){
	        				options.remove(len);
	        				break;
	        			}
	        		}
	        	};
	        	
				if(Me.$('100853')){
					Me.$('100853').onchange = function(){
						var currentValue = Me.$('100853').value;
						if(currentValue == 1 ){
							Me.removeSelectOption('OTHER',Me.$('100854'));
							Me.createSelectOption('ALL',Me.$('100854'));
							Me.$('100854').value = 'ALL';
							Me.hidden('100854');
							Me.hidden('100875');
							Me.$('100875').value = "";
							Me.$("100875").setAttribute('isnull',1);
							dojo.place("<span>\u65e5\u671f\u7f16\u7801\uff1a</span>",Me.$("label_100875"),"only");
						}else if(currentValue ==2){
							Me.removeSelectOption('OTHER',Me.$('100854'));
							Me.removeSelectOption('ALL',Me.$('100854'));
							Me.display('100854');
							Me.display('100875');
							Me.$('100875').value = "";
							Me.$("100875").setAttribute('isnull',0);
							dojo.place("<span class=\"formRequested\">*</span>"+"\u65e5\u671f\u7f16\u7801\uff1a",Me.$("label_100875"),"only");
						}else if(currentValue ==3){
							Me.createSelectOption('OTHER',Me.$('100854'));
							Me.removeSelectOption('ALL',Me.$('100854'));
							Me.$('100854').value = 'OTHER';
							Me.hidden('100854');
							Me.hidden('100875');
							Me.$('100875').value = "";
							Me.$("100875").setAttribute('isnull',1);
							dojo.place("<span>\u65e5\u671f\u7f16\u7801\uff1a</span>",Me.$("label_100875"),"only");
						}
					};
					Me.$('100853').onchange();
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
