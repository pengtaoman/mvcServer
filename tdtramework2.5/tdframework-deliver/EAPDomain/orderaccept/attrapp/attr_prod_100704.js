BusCard.define('/orderaccept/attrapp/attr_prod_100704.js',function(_buscard,cardParam){	
	        var prodOfferAcceptPageDispatch=function(){
	//接入方式处理JS，1.过滤终端类型
	//FTTH 1 -> 57 光MODEM 
	//ADSL（传统宽带）10,TTB+DSL 6 -> AD MODEM 42
	//LAN 14,FTTB+LAN 7 -> LAN上行家庭网关 58
	var Me = this;	
	var mktResInterfaceBO = _buscard.$remote("mktResInterfaceBO");	
	var modermKind = Me.$("300004");
	var modermProvider = Me.$("100324");
	var modermProviderHTML = !!modermProvider?modermProvider.outerHTML:null;
	var authDomObj = Me.$("100705");
	var authDefaultValue = null;
	if(!!authDomObj){//认证方式：0:认证;1:非认证
		authDefaultValue = authDomObj.value;
	}
	Me.$("100704").onchange = function(){
		var accessMode = Me.$("100704").value;
		var resMode = "";
		switch(accessMode){
			case "1": resMode="57";break;
			case "6": 
			case "10": //resMode="42";break;//OSS接收到此信息会报错,故此先注释真实code
			case "7": 
			case "14": //resMode="58";break;//OSS接收到此信息会报错,故此先注释真实code
			default: break;
		}
		if(!!modermKind || !!modermProvider){
			if(resMode != ""){
				var modermKindColl = mktResInterfaceBO.getModermKindColl(resMode);
				if(!!modermKind && !!modermKindColl && !!modermKindColl.list){
					_buscard.$rs(modermKind,modermKindColl.list);
				}
				!!modermProvider?modermProvider.outerHTML = modermProviderHTML:null;
			}else{			
				!!modermKind?_buscard.$rs(modermKind,[{name:"\u8bf7\u9009\u62e9",id:""}]):null;
				!!modermProvider?_buscard.$rs(modermProvider,[{name:"\u8bf7\u9009\u62e9",id:""}]):null;
			}
		}
		if(!!authDomObj){
			if(accessMode == "1"){//接入方式是FTTH那么认证方式必须是认证 
				for(var i=0;i<authDomObj.options.length;i++){
				    if(authDomObj.options[i].value == "0"){
						Me.$('100705').disabled = true;
						Me.$('100705').value = "0";
				        break;
				    }
				}
			}else{
				Me.$('100705').disabled = false;
				Me.$('100705').value = authDefaultValue;//恢复默认值
			}
		}
	};
	Me.$("100704").onchange();
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
	             prodOfferAcceptPageDispatch.apply(this,arguments);
	             var widget = dijit.getEnclosingWidget(Me.dom);
	             var prodInstVO=widget.prodInstVO;
	             var prodInstAttrList = prodInstVO.prodInstAttrList;
	        	 var instVO = prodInstAttrList.find(function(inst) {
	                  return inst.attrId == 100704;
                  });
                 if(instVO){
                 Me.$('100704').value=instVO.attrValue;
                 }
                 if(Me.$('300004')){
	                 var instVO = prodInstAttrList.find(function(inst) {
		                  return inst.attrId == 300004;
	                  });
	                 if(instVO){
	                 Me.$('300004').value=instVO.attrValue;
	                 }
                } 
                 
	        };
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {};
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
