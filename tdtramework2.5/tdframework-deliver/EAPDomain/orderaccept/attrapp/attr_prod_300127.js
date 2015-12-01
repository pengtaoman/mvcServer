BusCard.define('/orderaccept/attrapp/attr_prod_300127.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	Me.checkInputChar =function(){
		if(!(event.keyCode>=47&&event.keyCode<=57))
		{
			alert("\u7535\u8bdd\u53f7\u7801\u53ea\u80fd\u8f93\u5165\u6570\u5b57\u548c/");
			event.srcElement.focus();
			return false;
		}
		return true;
	}	
	Me.checkTelephone = function(obj){
		var phoneNum = obj.value;
		var regexServiceKind = /[^\d||\/]/;
		var flagPhone = regexServiceKind.test(phoneNum);
		if(flagPhone){
			alert("\u7535\u8bdd\u53f7\u7801\u53ea\u80fd\u8f93\u5165\u6570\u5b57\u548c/");
			obj.value = "";
			obj.focus();
			return;
		}
	}
	Me.$("300127").onblur=function(){
		Me.checkTelephone(Me.$("300127"));
	}
	
	Me.$("300127").onkeypress = function(){
		return Me.checkInputChar();
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
