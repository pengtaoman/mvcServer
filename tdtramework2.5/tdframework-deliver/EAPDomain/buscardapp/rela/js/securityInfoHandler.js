BusCard.define('/buscardapp/rela/js/securityInfoHandler.js',function(_buscard,cardParam){
	        var Me = this;
	        var securityMethodDom = Me.$("securityMethodCd");
			var requestParam = $ac$.get("requestParam");
			var util = dojo.require("orderaccept.prodofferaccept.util");
	        var ConstantsPool = dojo.require("orderaccept.common.js.ConstantsPool");
			var AssureMethodConst = ConstantsPool.load("AssureMethodConst").AssureMethodConst;
    		var removeOptions = [];	            
            dojo.style(Me.$("label_guaranteeType"),"display","none");
	        dojo.style(Me.$("guaranteeType"),"display","none");
	        dojo.forEach(securityMethodDom.options,function(option){
	            //只展现现金担保
	            if(option.value != AssureMethodConst.ASSURE_CASH){
	                removeOptions.push(option);
	            }
	        });
	        dojo.forEach(removeOptions,function(option){                
	            securityMethodDom.remove(option.index);
	        });
	        var options = securityMethodDom.options;
	        var op = document.createElement("option");
	        op.value='';
	        op.text='\u8bf7\u9009\u62e9';
	        op.selected = true;
	        options.add(op,0);
            
            var serviceCardWidget = dijit.getEnclosingWidget(Me.dom);
            var uniqueId = "";
            if(!!serviceCardWidget && serviceCardWidget.cardParam){
                uniqueId = serviceCardWidget.cardParam.uniqueId;
            }
            var selectedMemberList = $ac$.get("selectedMemberProdOfferList");
            var selectedMember = dojo.filter(selectedMemberList,function(selectedMember){
                                    return selectedMember.uniqueId == uniqueId;
                                })[0];
            var noChange = false;
            if(!!selectedMember && selectedMember.action == "nochange"){
                noChange = true;
            }
            if(!!noChange){
                dojo.style(Me.$("header-1002"),"display","none");
                dojo.style(Me.$("content-1002"),"display","none");
                securityMethodDom.value = "";
                
            }else{
                securityMethodDom.value = AssureMethodConst.ASSURE_CASH;
	        	Me.$("securityFee").onblur = function(){
	        		if(Me.$("securityFee").value != ""){
		        		var secFee = parseFloat(Me.$("securityFee").value);
		        		if(isNaN(secFee) || secFee != Me.$("securityFee").value || /^\.|\.$/.test(Me.$("securityFee").value)){
		        			alert("[\u62c5\u4fdd\u62bc\u91d1]\u9700\u4e3a\u6570\u5b57");
							Me.$("securityFee").value = "";
							Me.$("securityFee").focus();
							return false;
		        		}        			
	        		}
	        	};
	        	Me.$("securityDur").onblur = function(){
	        		if(Me.$("securityDur").value != ""){
		        		var secFee = parseInt(Me.$("securityDur").value);
		        		if(isNaN(secFee) || secFee != Me.$("securityDur").value || /^\.|\.$/.test(Me.$("securityDur").value)){
		        			alert("[\u62c5\u4fdd\u65f6\u957f]\u9700\u4e3a\u6574\u6570");
							Me.$("securityDur").value = "";
							Me.$("securityDur").focus();
							return false;
		        		}
	        		}
	        	};
	        	
				Me.$("identityCode").onblur = function(){
					var iden_kind = Me.$("identityKind");
					var iden_value = Me.$("identityCode");
					if(!iden_kind.disabled){
						var result=check_identity_new("","","\u8bc1\u4ef6\u53f7\u7801",iden_kind,iden_value)
						if (false==result.status){
							alert(result.message);
							iden_value.select();
							iden_value.focus();
							return false;
						}else{
							return true;
						}
					}else {
						return true;
					}
				}
            }
		});
