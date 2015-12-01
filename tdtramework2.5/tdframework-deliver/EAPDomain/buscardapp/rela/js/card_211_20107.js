BusCard.define('/buscardapp/rela/js/card_211_20107.js',function(_buscard,cardParam){ 
var Me = this;
var groupTabpage = Me.getTabPanel().getHeaderByIndex(2);
groupTabpage.style.display = "none";
Me.$("groupFlag").onchange = function() {
	if(Me.$("groupFlag").value == "2"){
		groupTabpage.style.display = "";
		jTip.showAndAutoHide(groupTabpage,"\u63d0\u793a\u4fe1\u606f","\u70b9\u51fb\u6b64\u5904\u5f55\u5165\u96c6\u5355\u4f4d\u5ba2\u6237\u4fe1\u606f");
	}else{
		groupTabpage.style.display = "none";
	}
};
Me.$("apCertId").onblur = function() {
	if(Me.$('apCertId').value!=''){
		if(Me.$('apCertType').value!=''){
			if(!checkid_iden_new("\u8bc1\u4ef6\u53f7\u7801",Me.$("apCertType"),Me.$("apCertId"))){
				return;
			}
		}
	}
	return true;
};
});
