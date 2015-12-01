BusCard.define('/orderaccept/attrapp/attr_prod_200069.js', function(_buscard, cardParam) {
	        var prodOfferAcceptPageDispatch=function(){
	dojo.require("orderaccept.prodofferaccept.util");
	var Me = this;
	Me.$("200069").onblur=function(){
		if(Me.$("200069").value!=""){
			var param = {
				custId:$ac$.requestParam.customerData.custId,
				status:"1100"
			};		
			var groupInfoVO = BusCard.$remote("groupInfoBO").getGroupInfoByCustId(param);
				if(groupInfoVO!=null){
				    var groupId=groupInfoVO.groupId;
				    var count=BusCard.$remote("groupUserInfoDAO").count({
					    	groupId:groupId,
					    	serviceId:Me.$("200069").value,
					    	ifValid:1
				    	});
				    if(!!count){
				    	if(count<=0){
				    		orderaccept.common.dialog.MessageBox.alert({
								message:"此号码不是有效的集团用户！"
							});
				   		 	Me.$("200069").value="";
				    	}
				    }else{
				   		 orderaccept.common.dialog.MessageBox.alert({
								message:"此号码不是有效的集团用户！"
							});
				   		 Me.$("200069").value="";
				    }
				}else{
					orderaccept.common.dialog.MessageBox.alert({
						message:"找不到有效的集团信息！"
					});
					Me.$("200069").value="";
				}
		}
	}
		//集团最大铃音数检测
	Me.$("200040").onblur=function(){
		if(!/^\d+$/i.test(Me.$("200040").value)){
				orderaccept.common.dialog.MessageBox.alert({
					message:"集团最大铃音数应该大于等于0"
				});
			Me.$("200040").value="";
		}
	}
	//验证是不是数字 并且保留小数点后两位的方法
	Me.$("200041").onblur=function(){
		if(Me.$("200041").value!=""){
			if(/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/i.test(Me.$("200041").value)){
			     if(!/^\d+$/i.test(Me.$("200041").value)){
			     	if(!/^\d+[.]?\d{1,2}$/i.test(Me.$("200041").value)){
						orderaccept.common.dialog.MessageBox.alert({
							message:"集团炫铃月租最多输入两位小数"
						});
						Me.$("200041").value="";
				    }
			     }
			}else{
				orderaccept.common.dialog.MessageBox.alert({
					message:"集团炫铃月租为数字"
				});
				Me.$("200041").value="";
			}
		}
	}
	Me.$("200090").onblur=function(){
		if(Me.$("200090").value!=""){
			if(/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/i.test(Me.$("200090").value)){
				if(!/^\d+$/i.test(Me.$("200090").value)){
					 if(!/^\d+[.]?\d{1,2}$/i.test(Me.$("200090").value)){
						orderaccept.common.dialog.MessageBox.alert({
							message:"成员月租最多输入两位小数"
						});
						Me.$("200090").value="";
				 	 }
				}
			}else{
				orderaccept.common.dialog.MessageBox.alert({
					message:"成员月租为数字"
				});
				Me.$("200090").value="";
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
