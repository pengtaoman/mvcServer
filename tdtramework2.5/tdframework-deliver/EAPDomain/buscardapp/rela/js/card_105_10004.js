BusCard.define('/buscardapp/rela/js/card_105_10004.js',function(_buscard,cardParam){ 
var Me = this;
var viaIdKind = this.$("viaIdKind");
this.$("viaId").onblur = function () {
	if (viaIdKind.value) {
		if (this.value) {
			if (!checkid_iden_new("\u8bc1\u4ef6\u53f7\u7801", viaIdKind, this)) {
				return;
			}
		}
	}
};
	this.$("viaPhone").onkeypress = function(){return checkInputChar();};
	this.$("viaPhone").onblur = function(){checkTelephone(Me.$("viaPhone"));};
	function checkInputChar(){
		if(!(event.keyCode>=47&&event.keyCode<=57))
		{
			alert("\u7535\u8bdd\u53f7\u7801\u53ea\u80fd\u8f93\u5165\u6570\u5b57\u548c/");
			event.srcElement.focus();
			return false;
		}
		return true;
	}	
	function checkTelephone(obj){
		var phoneNum = obj.value;
		var regexServiceKind = /[^\d||\/]/;
		var flagPhone = regexServiceKind.test(phoneNum);
		if(flagPhone){
			alert("\u7535\u8bdd\u53f7\u7801\u53ea\u80fd\u8f93\u5165\u6570\u5b57\u548c/");
			obj.value = "";
			obj.focus();
			return;
		}
	};	

void function(){
var current = new Date();
var year =""+current.getFullYear();
var month = (current.getMonth()+1)<10?"0"+(current.getMonth()+1):""+ (current.getMonth()+1);
var date = ""+current.getDate();
this.$("effectDate").value = year+"-"+month+"-"+date;
var oldObj = null;
try{oldObj = ordermgr.accept.compnew.value}catch(e){}
if(oldObj){
	this.$("effectDate").disabled = true;
}
}();
});
