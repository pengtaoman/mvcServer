var webPath = document.getElementsByTagName("context")[0].path;
	/**
	* 主产品名称刷新事件
	*/
	 function getProductIdList(){
	    //根据业务号码局部刷新出对应的主产品名称
		var serviceId = $('serviceIdCondition').value;
		if (serviceId ==""){
			return;
		}
		
		var parameter = "serviceId="+serviceId+"&ifValid=1";			
		var result = executeRequest("custAcceptAjaxAction","getProductIdList",parameter);
		if(result==-1){
			var param = "serviceId="+serviceId;
			var resultStr = executeRequest("preAcceptAction","getOrderInfosByServiceId",param);
			if(resultStr != -1){
				getOpener().cust_Recognition_Head.preAcceptFlag = "1";
				getOpener().$("preRgsNo").value = resultStr;
				return;
			}else{
				var returnResult = executeRequest("custAcceptAjaxAction","getinfoFromselectNum",param); 
				if(!returnResult){
					orderaccept.common.dialog.MessageBox.alert({busiCode:"08410074"});
					//alert("查询失败！输入的业务号码不存在有效记录请重新输入！");
					$("serviceIdCondition").value='';
			    	$("productId").outerHTML = "<select name='productId' id='productId' ><option value=''>请选择</option></select>"
			    	$("serviceIdCondition").focus();
			    	return;
				}else{
					
					getOpener().$("npInfo").value = returnResult;
					return;
				}
		    }
		}
		getOpener().cust_Recognition_Head.preAcceptFlag = "";
		getOpener().$("preRgsNo").value = "";
		getOpener().$("npInfo").value = "";
	  	$("productId").outerHTML = result;
	}
	
	/* 证件号码检测方法 */
	function identityCodeCheck(){
			var identityKind = $('identityKindCondition');
			var identityCode = $('identityCodeCondition');
			if(identityKind.value){
				
				if(identityCode.value){
					//add-by-liurong-如果输入的证件号码为15位或者18位自动匹配证件类型为身份证
					if(identityCode.value.length==15 || identityCode.value.length==18){
						identityKind.value=1;
					}
					if(!checkid_iden_new("证件号码",identityKind,identityCode)){
						return;
					}
				}
			}
	}
	
	function focusName(){
		$('custNameCondition').focus();
	}
	
	/**
	* 点击精确查询按钮事件
	*/
	function doQuery(nicetyQuery){
		var nicetyQuery;
		if ($("chkNicetyQuery").checked) {
			nicetyQuery = "0";// 模糊查询
		} else {
			nicetyQuery = "1";// 精确查询
		}
	    var parameter="&queryMethod=COMPOUNDQUERY";
	    parameter+="&nicetyQuery="+nicetyQuery;//精确查询 1是精确查询 0是模糊查询

        parameter+="&queryCityCode="+$("cityCodeCondition").value;
        parameter+="&firstName="+$("custNameCondition").value;
        parameter+="&serviceId="+$("serviceIdCondition").value;
        parameter+="&productId="+$("productId").value;
        parameter+="&identityKind="+$("identityKindCondition").value;
        parameter+="&identityCode="+$("identityCodeCondition").value;
        parameter+="&custId="+$("custIdCondition").value;
        parameter+="&custAddress="+$("custAddressCondition").value;
        if($("custNameCondition").value==''&&$("serviceIdCondition").value==''&&$("custIdCondition").value==''&&$("identityCodeCondition").value==''&&$("custAddressCondition").value==''){
           	orderaccept.common.dialog.MessageBox.alert({busiCode:"08410075",onComplete:focusName});
           	//alert("不能所有值都为空");
           	return false;
        }
        
		//var pagePath = webPath+"/newCustRecognitionAction.do?method=doQuery&"+parameter;
		document.forms[0].action=webPath+"/newCustRecognitionAction.do?method=doQuery&"+parameter;
		document.forms[0].target="ifrCustList";
  		document.forms[0].submit();
		//document.getElementById("myIframe").src = pagePath;
	}
	
	function doReset(){
		document.forms[0].reset();
	}
	
	function doClose(){
		unieap.getDialog().close();
	}
	
	function getOpener(){
		var obj = opener;
		if(unieap && unieap.getDialog() && unieap.getDialog().getObject().opener){
  			obj = unieap.getDialog().getObject().opener;
		}
		return obj;
	}