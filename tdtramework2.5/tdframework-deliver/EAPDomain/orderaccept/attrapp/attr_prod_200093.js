BusCard.define('/orderaccept/attrapp/attr_prod_200093.js',function(_buscard,cardParam){ 
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;	
	var executeRequest = _buscard.executeRequest;
	//scp  下拉框赋值
//	var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getScpSelect");
//	Me.$("200093").outerHTML=resultJsonStr;
	var data = BusCard.$remote("custOrderCommFacadeBO").getScpSelect(BusCard.$session.cityCode);
	BusCard.$rs(Me.$("200093"),data.list);
	//大于0的验证
	Me.numberCheck=function(attrId){
	    if(Me.$(attrId).value!=""){
			if(!/^([1-9]\d{0,}|0)$/i.test(Me.$(attrId).value)){
				//alert("只能录入大于0的数字");
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410170"});
				Me.$(attrId).value="";
			}
		}
	}
	//scp号码大于0的验证
	//Me.$("200093").onblur=function(){
	//	Me.numberCheck("200093");
	//};
	//闭合群数大于0的验证
	Me.$("200162").onblur=function(){
		Me.numberCheck("200162");
	};
	//用户数大于0的验证
	Me.$("200025").onblur=function(){
		Me.numberCheck("200025");
	};
	//信用度大于0的验证
	Me.$("200049").onblur=function(){
		if(!/^\d+(\.\d+)?$/.test(Me.$("200049").value)){
			orderaccept.common.dialog.MessageBox.alert({
				message:"请输入正确的数值！"
			});
			Me.$("200049").value = "";
		}
	};
	//缩位号码数大于0的验证
	Me.$("200139").onblur=function(){
		Me.numberCheck("200139");
	};
	//短号长度只能录入0-9之前的数字
	Me.$("200076").onblur=function(){
	    if(Me.$("200076").value!=""){
			if(!/^[3-7]$/i.test(Me.$("200076").value)){
				orderaccept.common.dialog.MessageBox.alert({
					message:"短号长度必须在3到7之间"
				});
				Me.$("200076").value="";
			}
		}
	};
	//话务员比率大于等于0小于等于1的校验
	Me.$("200075").onblur=function(){
	    if(Me.$("200075").value!=""){
			if(isNaN(Me.$("200075").value)){
				//alert("话务员比率大于等于0小于等于1");
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410172"});
				Me.$("200075").value="";
			}else{
				if(Me.$("200075").value<0||Me.$("200075").value>1){
					//alert("话务员比率大于等于0小于等于1");
					orderaccept.common.dialog.MessageBox.alert({busiCode:"08410172"});
					Me.$("200075").value="";
				}else{
					Me.$("200075").value=parseFloat(Me.$("200075").value);
				}
			}
		}
	};
	Me.$("200048").onblur=function(){
	 	if(Me.$("200048").value!=""){
	 		var password=Me.$("200048").value;
	 		if(password.length!=8){
	 			//alert("集团密码允许录入八位");
	 			orderaccept.common.dialog.MessageBox.alert({busiCode:"08410173"});
	 			Me.$("200048").value="";
	 		}
	 	}
	}
	//管理接入号码长度必须是3-7位的数字
	Me.$("200121").onblur=function(){
	    if(Me.$("200121").value!=""){
			if(/^[0-9]*$/i.test(Me.$("200121").value)){
				if(Me.$("200121").value.length<3||Me.$("200121").value.length>7){
					//alert("管理接入号码的长度必须在3到7位数字");
					orderaccept.common.dialog.MessageBox.alert({busiCode:"08410174"});
					Me.$("200121").value="";
				}
			}else{
				//alert("管理接入号码的长度必须在3到7位数字");
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08410174"});
				Me.$("200121").value="";
			}
		}
	};
	        };
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	        /**
	         * 综合查询页面处理分支
	         * @method
	         */
	        var allInfoQueryPageDispatch = function() {
	        	var prodInstVO = cardParam.prodInstVO;
	        	var prodInstAttrList = prodInstVO.prodInstAttrList;
	        	var instVO = prodInstAttrList.find(function(inst) {
	                return inst.attrId == 200093;
                });
	        	var Me = this;	
	        	var executeRequest = _buscard.executeRequest;
	        	//scp  下拉框赋值
	        	var list = BusCard.$remote("custOrderCommFacadeBO").getScpSelect(prodInstVO.cityCode).list;
	        	var attrValName = dojo.filter(list,function(obj){
		        	return obj.id == instVO.attrValue;
		        })[0];
		        $('200093').innerHTML=attrValName.name;
	        };
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
