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

/*选择客户信息时触发事件*/
function onRadio(custId,identityKind,identityCode,groupFlag,cityCode,serviceId,productId){
	//parent.window.opener.cust_Recognition_Head.showPassValidWindow(custId,identityKind,identityCode);
	//parent.window.close();
	if(parent && parent.unieap && parent.unieap.getDialog() && parent.unieap.getDialog().getObject().opener
		&&parent.unieap.getDialog().getObject().opener.cust_Recognition_Head){
		parent.unieap.getDialog().getObject().opener.WaitingBar.hideMe();
		
		//开关判断是否需要客户身份验证 0不需要1需要
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
					//alert("您使用的是"+result+"卡，可以先受理换补卡业务，免费领取新卡!");
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