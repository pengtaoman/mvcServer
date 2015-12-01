function init(){
	var message = this.tabForm.document.forms[0].message.value;
	if(message != null && message != "" && message!="null"){
		alert(message);
	}
}
function doAdjustPower(treeName){
	var employeeId = this.tabForm.document.forms[0].employeeId.value;
	var params = '&OperType=doAdjustPower&employeeId='+employeeId+'&treeName=menuTree';
	var param2= collectIframsParams('tab_param');		
    params = params+param2;
    var msg = executeRequest("EmployeePowerAdjustAction","powerAdjust",params);
    
    alert(msg);
}