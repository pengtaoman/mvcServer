BusCard.define('/orderaccept/attrapp/attr_prod_300092.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	
	Me.checkid_iden_new_attr = function(identity_length_array,identity_method_array,identity_kind_field_name,identity_kind_field,identity_code_field){
		var err_message=identity_kind_field_name+'\u8f93\u5165\u9519\u8bef!';
		var check_result = {};
		var select_value=identity_kind_field;
		var code_value=identity_code_field.value;
		if (!identity_length_array)
		{
			var identity_length_array = [];
			identity_length_array[1] = '18';
			identity_length_array[3] = '18';
			identity_length_array[5] = '20';
			identity_length_array[6] = '20';
			identity_length_array[7] = '20';
			identity_length_array[8] = '20';
		}
		if(typeof identity_length_array[select_value] === 'undefined'){
			check_result.status=true;
			check_result.message='';
			return check_result;
		}
		if (!identity_method_array){
			var identity_method_array = new Array();
			identity_method_array[1] = '1';
			//identity_method_array[2] = '1';
			//identity_method_array[3] = '1';
			//identity_method_array[4] = '1';
			//identity_method_array[5] = '1';--zhangzhenzhong
		}
		
		//如果是15位身份证而证件号码长度不为15位
		//alert(select_value);
		//alert(code_value.length);
		if (select_value==1 &&  code_value.length!=0)
		{
			if(code_value.length==18||code_value.length==15)
			{}else
			{
				err_message=identity_kind_field_name+'\u957f\u5ea6\u9519\u8bef!';
				check_result.status=false; 
				check_result.message=err_message; 
				identity_code_field.value="";
				return check_result; 	
			}
		}
		if (code_value.length>identity_length_array[select_value])
		{
			err_message=identity_kind_field_name+'\u957f\u5ea6\u8d85\u51fa\u6700\u5927\u9650\u5236\u957f\u5ea6!';
			check_result.status=false; 
			check_result.message=err_message; 
			identity_code_field.value="";
			return check_result; 	
		}
		
		//确定当前证件类型的校验规则
		//0	全为数字
		//1	全为数字，字母
		//2	任意字符组合
		if ( code_value.length!=0)
		{
			if (identity_method_array[select_value] == 0 || identity_method_array[select_value] == "0")
			{	var decimal_expr = /^[\d]+$/;	}
			else if  (identity_method_array[select_value]  == 1 || identity_method_array[select_value]  == "1")
			{	var decimal_expr = /^[\w]+$/;	}
			else if (identity_method_array[select_value]  == 2 || identity_method_array[select_value]  == "2")
			{	var decimal_expr = /^[*]+$/;	}
			
			var match_array = code_value.match(decimal_expr);
			
			if (match_array==null)
			{
				if (identity_method_array[select_value] == 0 || identity_method_array[select_value] == "0")
					{	err_message=identity_kind_field_name+'\u5e94\u8be5\u4e3a\u6570\u5b57!';	}
				else if  (identity_method_array[select_value]  == 1 || identity_method_array[select_value]  == "1")
					{	err_message=identity_kind_field_name+'\u5e94\u8be5\u4e3a\u6570\u5b57\u548c\u5b57\u6bcd\u7684\u7ec4\u5408!';	}
				else if (identity_method_array[select_value]  == 2 || identity_method_array[select_value]  == "2")
					{	err_message=identity_kind_field_name+'\u683c\u5f0f\u9519\u8bef!';	}
				else
					{	err_message=identity_kind_field_name+'\u683c\u5f0f\u9519\u8bef!';	}	
					
				check_result.status=false; 
				check_result.message=err_message; 
				identity_code_field.value="";
				return check_result; 	
			}
		}
		
		//判断15位身份证的日期是否正确
		if (select_value==1 && code_value.length==15)
		{	
			if(isNaN(parseInt(code_value))){
				var err_message = "15\u4f4d\u8eab\u4efd\u8bc1\u53f7\u7801\u5e94\u5168\u4e3a\u6570\u5b57";
				check_result.status=false; 
				check_result.message=err_message; 
				identity_code_field.value="";
				return check_result;
			}
			var year = code_value.substr(6,2);
			var month = code_value.substr(8,2);
			var day = code_value.substr(10,2);
			var new_year = "19" + year;
			var year_int=parseInt(new_year,10);
			var month_int=parseInt(month,10);
			var day_int=parseInt(day,10);
			
			if ((year_int%4==0)&&(year_int%100!=0) || (year_int%400==0)) 
			{
				var day_number=new Array(31,29,31,30,31,30,31,31,30,31,30,31);
			}
			else
			{
		    		var day_number=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
			}
			
			if (year_int<1900) 
			{
			var err_message = identity_kind_field_name+"\u7684\u5e74\u6ca1\u6709\u610f\u4e49！\u8bf7\u91cd\u65b0\u8f93\u5165！";
			check_result.status=false; 
			check_result.message=err_message; 
			identity_code_field.value="";
			return check_result;
			}	
		
			if (month_int<1 || month_int>12) 	
			{
			var err_message = identity_kind_field_name+"\u7684\u6708\u4efd\u4e0d\u6b63\u786e!";
			check_result.status=false; 
			check_result.message=err_message; 
			identity_code_field.value="";
			return check_result;
			}
		
			if (day_int<1 || day_int>day_number[(month-1)])	
			{
			var err_message = identity_kind_field_name+"\u7684\u65e5\u671f\u90e8\u5206\u4e0d\u6b63\u786e!";
			check_result.status=false; 
			check_result.message=err_message; 
			identity_code_field.value="";
			return check_result;
			}
		}		 	
		
		
		//判断18位身份证的日期是否正确
		if(select_value==1 && code_value.length==18)
		{	
			var decimal_expr = /^[0-9]{17}(x|([0-9]{1}))$/i;
			if(!decimal_expr.test(code_value)){
				var err_message = "18\u4f4d\u8eab\u4efd\u8bc1\u53f7\u7801\u5e94\u5168\u4e3a\u6570\u5b57\u6216\u6700\u540e\u4e00\u4f4d\u4e3ax";
				check_result.status=false; 
				check_result.message=err_message; 
				identity_code_field.value="";
				return check_result;
			}
			
			var year = code_value.substr(6,4);
			var month = code_value.substr(10,2);
			var day = code_value.substr(12,2);
			var year_int=parseInt(year,10);
			var month_int=parseInt(month,10);
			var day_int=parseInt(day,10);
			
			if ((year_int%4==0)&&(year_int%100!=0) || (year_int%400==0)) 
			{
				var day_number=new Array(31,29,31,30,31,30,31,31,30,31,30,31);
			}
			else
			{
		    		var day_number=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
			}
			
			if (year_int<1900) 
			{
			var err_message = identity_kind_field_name+"\u7684\u5e74\u6ca1\u6709\u610f\u4e49!";
			check_result.status=false; 
			check_result.message=err_message; 
			identity_code_field.value="";
			return check_result;
			}	
		
			if (month_int<1 || month_int>12) 	
			{
			var err_message = identity_kind_field_name+"\u7684\u6708\u4efd\u4e0d\u6b63\u786e!";
			check_result.status=false; 
			check_result.message=err_message; 
			identity_code_field.value="";
			return check_result;
			}
		
			if (day_int<1 || day_int>day_number[(month-1)])	
			{
			var err_message = identity_kind_field_name+"\u7684\u65e5\u671f\u90e8\u5206\u4e0d\u6b63\u786e!";
			check_result.status=false; 
			check_result.message=err_message; 
			identity_code_field.value="";
			return check_result;
			}
		}		 	
		
		check_result.status=true;
		check_result.message=""; 
		return check_result;		 		
		
	}
	

	
	Me.$("300092").onblur=function(){
		var identityCode = Me.$("300092");
		var resultobj = Me.checkid_iden_new_attr("","",'【证件号码】',1,Me.$("300092"));
		if(false==resultobj.status){
			//身份证18位  校验最后一位是否合法，公共方法中没有校验
			var identityCodeValue = Me.$("300092").value;
			var lastChar = identityCodeValue.substring(identityCodeValue.length-1).toUpperCase();
			if(!/\d|x|X/.test(lastChar)){
				//alert('【证件号码】输入错误！');
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08510139"});
				identityCode.value = '';
				identityCode.focus();
				return;
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
	        var secondBusinessPageDispatch = function() {};
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {};
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
