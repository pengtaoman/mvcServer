BusCard.define('/buscardapp/rela/js/cardServiceForLan.js',function(_buscard,cardParam){ 
	try{
		var Me = this;
		var a = arguments[0];
		var b= arguments[1];
		var util = dojo.require("orderaccept.prodofferaccept.util");
		//for compatibility
		var executeRequest = _buscard.executeRequest;
		Me.productId = b.productId;
		Me.cityCode = b.cityCode;
		var serviceCard = util.DomHelper.getParentWidget(Me.dom,
							"orderaccept.prodofferaccept.widget.servicecard.ServiceCardWidget");
		if(!!serviceCard){
			Me.$("serviceId").setPPPOEPwd = function(){	
				if(!!serviceCard && !!serviceCard.attrCardWidget){
					var attrCardWidget = serviceCard.attrCardWidget;
					var pppoePwd = attrCardWidget.busCardInstance.$("100829");
					if(!!pppoePwd){
						var length = this.value.length;
						pppoePwd.value = this.value.substring(length-7,length);
					}
				}
			};
		}
		Me.returnBlank = function () {
			var A = (navigator.appname == "Netscape") ? event.which : event.keyCode;
			if (A != 32) {
				return true;
			} else {
				return false;
			}
		};
		
		/**
		 * 检测业务号码是否满足条件
		 */
		Me.checkServiceIdPattern = function(){
			var currentServiceId = Me.$("serviceId").value;
			var testPattern = /^[0-9a-zA-Z]*$/g;
			if(testPattern.test(currentServiceId)){
				return true;
			}
			orderaccept.common.dialog.MessageBox.alert({
    			message:"\u5bbd\u5e26\u4e1a\u52a1\u53f7\u7801\u53ea\u5141\u8bb8\u8f93\u5165\u5b57\u6bcd\u548c\u6570\u5b57,\u8bf7\u91cd\u65b0\u8f93\u5165!"
    		});
			Me.$("serviceId").value = "";
			Me.$("serviceId").focus();
			return false;
		};
		
		Me.checkSameServiceId = function(){
	    	var cdmaServiceIdElemList = null; 
		    try{cdmaServiceIdElemList =ordermgr.accept.compnew._other_number_elem_list_; }catch(e){}
		    var chooseServiceId = Me.$("serviceId").value;
		    if(cdmaServiceIdElemList){
		        var len = cdmaServiceIdElemList.length;
		        var count = 0;
		        while(len--){
		            var current = cdmaServiceIdElemList[len].service.value;
		            if(current.length>0&&chooseServiceId == current){
		                count++;
		            }
		        }
		        if(count>1){
		            alert("\u8be5\u4e1a\u52a1\u53f7\u7801\u5df2\u9009\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9\uff01");
		            Me.$("serviceId").value = "";
		        }
		    }
		};
		
		Me.$("link_serviceId").onclick = function () {
			
		};
		
		Me.$("serviceId").onkeypress = function () {
			return Me.returnBlank();
		};
		
		Me.$("serviceId").onblur = function(){
			//检测
//			if(!Me.checkServiceIdPattern()){
//				return false;
//			}
			if(!!Me.$("serviceId").setPPPOEPwd){
				Me.$("serviceId").setPPPOEPwd();
			}
			//处理账号信息
			if(!!Me.checkedCurrentNumForAcc){
				Me.checkedCurrentNumForAcc(Me.$("serviceId").value);
			}
		};
		
		Me.$("serviceId").onpropertychange = function(){
			//Me.checkSameServiceId();
		}; 
	
		BusCard.Namespace.create("ordermgr.accept.compnew");
		ordermgr.accept.compnew._other_number_elem_list_ = ordermgr.accept.compnew._other_number_elem_list_ || [];
		var serviceObj = {};
		serviceObj.service = Me.$("serviceId");
		serviceObj.productId = Me.productId;
		ordermgr.accept.compnew._other_number_elem_list_ .push(serviceObj);
	}catch(e){
		alert(e.message);
	}
});
