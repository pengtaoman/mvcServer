//Get object method simplify 
function $(id){
	return document.getElementById(id);
};
function trim(str){ 
 	return str.replace(/\s/g, "");    
}
function submit_onclick(){
 if(trim(document.parallelForm.name.value)==""){
		document.parallelForm.name.focus();
	 	alert("名称不可以为空")
	 	document.parallelForm.name.value="";
		return false;
	}
    document.parallelForm.submit();
}
//Under the FF's value can only input number type
function ffNum(id){
	if(document.all){}
	else{
		$(id).value=$(id).value.replace(/[^0-9]/g,'');
	}
};
//Under the IE's value can only input number type
function ieNum(e){
    if(document.all){
		var key = window.event ? e.keyCode : e.which;
		var keychar = String.fromCharCode(key);
		reg = /\d/;
		return reg.test(keychar);
	}
};

//Display the survival
function displaySurvival(){
    var dur=document.parallelForm.duration.value;
    var aDur=document.parallelForm.alertDuration.value;
    var vOD=document.parallelForm.varOrDur.value;
    var aVOD=document.parallelForm.alertVarOrDur.value;
    var aType=document.parallelForm.actionType.value;
    var aAType=document.parallelForm.alertActionType.value;
    var aAI=document.parallelForm.alertActionInterval.value;
    var aA=document.parallelForm.actionApplication.value;
    var aAA=document.parallelForm.alertActionApplication.value;
    var v=document.parallelForm.variable.value;
    var aV=document.parallelForm.alertVariable.value;
    var exAn=document.parallelForm.exActionName.value;
    var exAAN=document.parallelForm.exAlertActionName.value;
    var openUrl="";
    var path=document.getElementById("path").value
  	openUrl = path+"/unieap/pages/workflow/webdesign/attribute/parallelNodePages/expiration.jsp"+
  			  "?dur="+dur+"&aDur="+aDur+"&vOD="+vOD+"&aVOD="+aVOD+"&aType="+aType+"&aAType="+aAType+
  			  "&aAI="+aAI+"&aA="+aA+"&aAA="+aAA+"&v="+v+"&aV="+aV+"&exAn="+exAn+"&exAAN="+exAAN;
  	if(document.all){			  
  		parameter='height=430, width=550, top=120, left=262, toolbar=no, menubar=no,scrollbars=no, resizable=no,location=no, status=no';
  	}else{
  		parameter='height=445, width=550, top=120, left=262, toolbar=no, menubar=no,scrollbars=no, resizable=no,location=no, status=no';
 	 }
	newWin=window.open(openUrl, 'expiration', parameter);  
};