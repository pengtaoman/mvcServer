BusCard.define('/orderaccept/attrapp/attr_prod_300086.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	
	Me.isTelString = function(fm,strName){
		var str = fm.value;
		var len = str.length;
		if(len==0){
			return true;
		}
		for(var i =0;i<len;i++){
			var c= str.charAt(i).charCodeAt();
			if((c<48||c>57)&&(c!=45)){
				
				if(typeof(window.orderaccept)!= 'undefined'){
			  		orderaccept.common.dialog.MessageBox.alert({busiCode:"08510166",infoList:[strName]});
			    }else{
			    	alert(strName+"不符合电话格式！");
			    }
				fm.focus();
				return false;
			}
		}
		return true;
	}
	
	Me.vilidateTel = function(obj,str){
		if(!Me.isTelString(obj,str)){
			obj.value='';
			obj.focus();
		}
	};
	
	


	
	Me.$("300086").onblur=function(){
		Me.vilidateTel(Me.$("300086"),'【传真号码】');
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
	        var secondBusinessPageDispatch = function() {};
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {};
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
