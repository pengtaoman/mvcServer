BusCard.define('/orderaccept/attrapp/attr_prod_200042.js',function(_buscard,cardParam){ 
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;	
	Me.$("200042").onblur = function(){
		var  managerPassword=Me.$("200042").value;
		if(managerPassword.length!=6){
			alert("管理员密码只能输入6位数字");
			Me.$("200042").value="";
		}else{
			if(!/^[0-9]*$/i.test(Me.$("200042").value)){
				alert("管理员密码只能输入6位数字");
				Me.$("200042").value="";
			}
		}
	};
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
