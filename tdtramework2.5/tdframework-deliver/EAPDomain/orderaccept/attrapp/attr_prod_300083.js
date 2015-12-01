BusCard.define('/orderaccept/attrapp/attr_prod_300083.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	
	
	Me.nas_email_check_sirp = function(field_name,form_field,alert_flag)
	{   
		var err_message=field_name+'必须是有效的邮件地址！';
		if(alert_flag == null || alert_flag == ''){
			alert_flag = 1;
		}
		var mail_patten=/^[_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.){1,4}[a-z]{2,3}$/i; 
		var emailvalue=form_field.value;
		var matchArray = emailvalue.match(mail_patten);
		var check_result = new Array();
		
		if (emailvalue.length!=0&&matchArray==null)
		{
			if(alert_flag == 1){
				
				if(typeof(window.orderaccept)!= 'undefined'){
			  		orderaccept.common.dialog.MessageBox.alert({busiCode:"08510164",infoList:[err_message]});
			    }else{
			    	alert(err_message);	
			    }
				form_field.focus();
			}
			return false; 	
		}
		return true;
	}	


	Me.vilidateEmail = function(obj,str){
		if(!Me.nas_email_check_sirp(str,obj,'')){
			obj.value='';
			obj.focus();
		}
	};

	
	Me.$("300083").onblur=function(){
		Me.vilidateEmail(Me.$("300083"),'【Email地址】');
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
