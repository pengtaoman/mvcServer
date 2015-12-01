var eccn = new ECCN("ec");


function init(){
	eccn.init();
	

	var flag=document.getElementById("flag");
	var message=document.getElementById("message").value;
	if((flag&&flag.value==-1)||(flag.value==0&&message)){
    	orderaccept.common.dialog.MessageBox.alert({message:message});
	}
}

onload = function(){
	init();
};

function postValue(accountId,accountName,cityCode){
	var unieap=parent.window.unieap;
	
	var payRelationWidget=unieap.byId("inheritAccountPane").parentContainer;
	var accountInfo={};
	accountInfo.accountId=accountId;
	accountInfo.accountName=accountName;
	accountInfo.cityCode=cityCode;
	var result = executeRequest("payRelationAction","checkIfHaveOcs","accountId="+accountInfo.accountId+"&cityCode="+accountInfo.cityCode);
	if(result==-1){
    	orderaccept.common.dialog.MessageBox.alert({message:"���˻��°�OCS���룬���ܼ̳�"});
	}else{
		payRelationWidget.addInherateAccount(accountInfo);
	}
	
}