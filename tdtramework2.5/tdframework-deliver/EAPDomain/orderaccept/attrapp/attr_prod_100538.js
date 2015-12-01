BusCard.define('/orderaccept/attrapp/attr_prod_100538.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
				var Me = this;
				var util =dojo.require("orderaccept.prodofferaccept.util");
				
				Me.compareDate = function(targetDate){
				
					
					var SYSDATE = dojo.global.$appContext$.requestParam.today;
					var dateArr = SYSDATE.split(" ");
					var dateYMD = dateArr[0].split("-");
					var year = parseInt(dateYMD[0], 10);
					var month = parseInt(dateYMD[1], 10) - 1;
					var date = parseInt(dateYMD[2], 10);
					     
					var dateTargetYMD = targetDate.split("-");
					var yearTarget = parseInt(dateTargetYMD[0], 10);
					var monthTarget = parseInt(dateTargetYMD[1], 10) - 1;
					var dateTarget = parseInt(dateTargetYMD[2], 10);
					
					if(yearTarget<year){
						return true;
					}else if(yearTarget==year){
						if(monthTarget<month){
							return true;
						}else if(monthTarget==month){
							if(dateTarget<date){
								return true;
							}
						}
					}
					return false;
				};
				
				Me.getSystemDate = function(){
					var SYSDATE = dojo.global.$appContext$.requestParam.today;
					var dateArr = SYSDATE.split(" ");
					var dateYMD = dateArr[0].split("-");
					return dateYMD[0] + '-' + dateYMD[1] + '-' + dateYMD[2];
				};
				
				Me.$(util.SpecAttrCdConst.rateEffectDate+"").onblur = function(){
					if(Me.$(util.SpecAttrCdConst.rateEffectDate+"").value==""){
						return ;
					}
					var rateEffectDate = Me.$(util.SpecAttrCdConst.rateEffectDate+"").value;
					if(Me.compareDate(rateEffectDate)){
						var tips = "\u901f\u7387\u7684\u751f\u6548\u65f6\u95f4\u5fc5\u987b\u4e0d\u5c0f\u4e8e\u7cfb\u7edf\u65f6\u95f4,\u8bf7\u91cd\u65b0\u9009\u62e9";
						orderaccept.common.dialog.MessageBox.alert({
				        	message:tips
				        });
				        Me.$(util.SpecAttrCdConst.rateEffectDate+"").value = "";
				        return ;
					}
				};
				(function(){
					var parentDom = dijit.getEnclosingWidget(Me.getParent().dom);
					var model = parentDom.getModel();
			    	var serviceCardWidgetMap =  prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_" + model.cardParam.uniqueId];
			   		var busCardInstance = serviceCardWidgetMap.busCardInstance;
					var userId = busCardInstance.getCardRelationInfo().userId;
					if(userId){
						if($ac$.get("orderChangeFlag")== 1){
							
						}else{
							Me.$(util.SpecAttrCdConst.rateEffectDate+"").value = Me.getSystemDate();
						}
					}else{
						Me.$(util.SpecAttrCdConst.rateEffectDate+"").value = Me.getSystemDate();
						Me.$(util.SpecAttrCdConst.rateEffectDate+"").disabled = true;
					}
				})();
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
	          var Me=this;
	          var util =dojo.require("orderaccept.prodofferaccept.util");
	          var rateEffectDate = Me.$(util.SpecAttrCdConst.rateEffectDate+"").value;
	           Me.compareDate = function(targetDate){
					var SYSDATE=Me.getSysdate();
					var dateArr = SYSDATE.split(" ");
					var dateYMD = dateArr[0].split("-");
					var year = parseInt(dateYMD[0], 10);
					var month = parseInt(dateYMD[1], 10) - 1;
					var date = parseInt(dateYMD[2], 10);
					var dateTargetYMD = targetDate.split("-");
					var yearTarget = parseInt(dateTargetYMD[0], 10);
					var monthTarget = parseInt(dateTargetYMD[1], 10) - 1;
					var dateTarget = parseInt(dateTargetYMD[2], 10);
					if(yearTarget<year||monthTarget<month||dateTarget<date){
						return true;
					}
					return false;
				};
	          
	          Me.getSysdate=function(){
					 var sql={"sql":"select sysdate from dual"};
					 var SYSDATE=BusCard.$remote("sqlUtilBO").getValueBySql(sql);
					 var syd=BusCard.util.parse(SYSDATE);
					 return syd.substring(0,10);
				
				};
				Me.$(util.SpecAttrCdConst.rateEffectDate+"").value=Me.getSysdate();
	            Me.$(util.SpecAttrCdConst.rateEffectDate+"").onblur=function(){
	              if(Me.$("addrId")){
	                Me.$("addrId").disabled=false;
	              }
	              if( Me.$("link_addrId")){
	               Me.$("link_addrId").disabled=false;
	              }
	             if(Me.compareDate(rateEffectDate)){
						var tips = "速率的生效时间必须不小于系统时间,请重新选择";
						orderaccept.common.dialog.MessageBox.alert({
				        	message:tips
				        });
				        Me.$(util.SpecAttrCdConst.rateEffectDate+"").value = "";
				        return ;
					}
	           };
	          
	         };
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {};
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
