var webPath = document.getElementsByTagName("context")[0].path;
	/**
	* ����Ʒ����ˢ���¼�
	*/
	 function getProductIdList(){
	    //����ҵ�����ֲ�ˢ�³���Ӧ������Ʒ����
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
					//alert("��ѯʧ�ܣ������ҵ����벻������Ч��¼���������룡");
					$("serviceIdCondition").value='';
			    	$("productId").outerHTML = "<select name='productId' id='productId' ><option value=''>��ѡ��</option></select>"
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
	
	/* ֤�������ⷽ�� */
	function identityCodeCheck(){
			var identityKind = $('identityKindCondition');
			var identityCode = $('identityCodeCondition');
			if(identityKind.value){
				
				if(identityCode.value){
					//add-by-liurong-��������֤������Ϊ15λ����18λ�Զ�ƥ��֤������Ϊ���֤
					if(identityCode.value.length==15 || identityCode.value.length==18){
						identityKind.value=1;
					}
					if(!checkid_iden_new("֤������",identityKind,identityCode)){
						return;
					}
				}
			}
	}
	
	function focusName(){
		$('custNameCondition').focus();
	}
	
	/**
	* �����ȷ��ѯ��ť�¼�
	*/
	function doQuery(nicetyQuery){
		var nicetyQuery;
		if ($("chkNicetyQuery").checked) {
			nicetyQuery = "0";// ģ����ѯ
		} else {
			nicetyQuery = "1";// ��ȷ��ѯ
		}
	    var parameter="&queryMethod=COMPOUNDQUERY";
	    parameter+="&nicetyQuery="+nicetyQuery;//��ȷ��ѯ 1�Ǿ�ȷ��ѯ 0��ģ����ѯ

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
           	//alert("��������ֵ��Ϊ��");
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