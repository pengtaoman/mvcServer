function init(){
	var message = this.tabForm.document.forms[0].message.value;
	if(message != null && message != "" && message!="null"){
		alert(message);
	}
}
function doAdjustPower(treeName){
	var params = collectIframsParams('tab_param');		
	var path = this.tabForm.document.forms[0].webpath.value;
	this.tabForm.document.forms[0].action=path+"/om/EmployeeMaintanceAction.do?OperType=doAdjustPower"+params+"&treeName=menuTree";
	this.tabForm.document.forms[0].OperType.value="doAdjustPower";
	this.tabForm.document.forms[0].target="markpage";
	this.tabForm.document.forms[0].submit();

}