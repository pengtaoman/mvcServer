var eccn = new ECCN("ec");
function init() {
	eccn.init();
	//resizeIframe();
}

function resizeIframe(){
	var ifraHeight = "400";
	if(document.body && document.body.scrollHeight){
		ifraHeight = document.body.scrollHeight + 170;
		ifraHeight = ifraHeight < 400 ? 400 : ifraHeight;
	}
	parent.window.resizeTo(1000,ifraHeight);
}

/*ѡ��ͻ���Ϣʱ�����¼�*/
function onRadio(custId,identityKind,identityCode,groupFlag,cityCode,serviceId,productId){
	//parent.window.opener.cust_Recognition_Head.showPassValidWindow(custId,identityKind,identityCode);
	//parent.window.close();
	if(parent && parent.unieap && parent.unieap.getDialog() && parent.unieap.getDialog().getObject().opener
		&&parent.unieap.getDialog().getObject().opener.cust_Recognition_Head){
		parent.unieap.getDialog().getObject().opener.WaitingBar.hideMe();
		
		//�����ж��Ƿ���Ҫ�ͻ������֤ 0����Ҫ1��Ҫ
		var paramerer = "cityCode=" + cityCode + "&objectValue=5566&serviceKind=-1&serviceOfferId=-1"; 
		var result = executeRequest("custAcceptAjaxAction", "doBusinessSwitch", paramerer);
		var doClose = parent.unieap.getDialog();
		var doDeal = parent.unieap.getDialog().getObject().opener;
		parent.unieap.getDialog().getObject().opener.$("serviceIdHidden").value=serviceId;
		parent.unieap.getDialog().getObject().opener.$("prodcutIdHidden").value=productId;
		if(result==1){
			parent.unieap.getDialog().getObject().opener.cust_Recognition_Head.showPassValidWindow(custId,identityKind,identityCode);
			doClose.close();
		}else{
			
			if(serviceId != ""){
				var paramerer = "cityCode=" + cityCode + "&serviceId=" + serviceId;
				var result = executeRequest("custAcceptAjaxAction", "doCheckUimKindIsOld", paramerer);
				if(result != "" && result != null){
					//alert("��ʹ�õ���"+result+"������������������ҵ�������ȡ�¿�!");
					orderaccept.common.dialog.MessageBox.alert({busiCode:"08410240",infoList:[result],
							onComplete:function(){
						doDeal.cust_Recognition_Head.DoNotValid_OnClick(custId,identityKind,identityCode);
						doClose.close();
					}});
				}else{
					doDeal.cust_Recognition_Head.DoNotValid_OnClick(custId,identityKind,identityCode);
					doClose.close();
				}
			}else{
				doDeal.cust_Recognition_Head.DoNotValid_OnClick(custId,identityKind,identityCode);
				doClose.close();
			}
			//parent.unieap.getDialog().getObject().opener.cust_Recognition_Head.DoCheckUimKind(cityCode,serviceId);
		}
		//parent.unieap.getDialog().close();
  	}
}