//Make the page on the top
var newWin=null;
window.onfocus=function (){  
 	if(newWin){
		if(!newWin.closed)
		newWin.focus();
	} 
};

window.document.onfocus=function (){  
	if(newWin){
		if(!newWin.closed)
		newWin.focus();
	} 
};

window.document.onclick=function (){  
	if(newWin){
		if(!newWin.closed)
		newWin.focus();
	} 
};

window.document.ondblclick=function (){  
	if(newWin){
		if(!newWin.closed)
		newWin.focus();
	} 
};

//Get object method simplify 
function $(id){
	return document.getElementById(id);
};
function trim(str){ 
 	return str.replace(/\s/g, "");    
} 
function checkNum(id){
	 var trimValue=trim($(id).value);
	 b = new RegExp("[^0-9]","g");
	 if(trimValue==""){
	 	$(id).value=0;
	 	return true;
	 }else if(b.exec(trimValue)==null){
	 	if(trimValue.length>=2){
	 		if(trimValue.substring(0,1)==0){
	 			$(id).focus();
	 			alert($(id).value+"为错误天数,"+"请重新设置正确天数")
	 			$(id).value="";
	 			return false
	 		}else{
	 			$(id).value=trimValue;
	 			return true
	 		}
	 	}else{
	 		return true;
	 	}
	 }else{
	 	$(id).focus();
	 	alert("请重新设置天数，只允许输入数字")
	 	$(id).value="";
	 	return false;
	 }
}

function submit_onclick(){
	if(trim(document.procForm.name.value)==""){
		document.procForm.name.focus();
	 	alert("名称不可以为空")
	 	document.procForm.name.value="";
		return false;
	}
     document.procForm.submit();
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

//Display the person page 
function displayPerson(flag){
	$('cType').value=flag;
	var left = (window.screen.availWidth - 635) / 2+20;
    var top = (window.screen.availHeight - 420) /2;
	openUrl = $('path').value+"/unieap/pages/workflow/webdesign/attribute/processPages/punitOrgTree.jsp"+"?&flag="+flag;;
    newWin=window.open(openUrl, 'expiration', 'height=460, width=650,  top='+top+', left='+left+',toolbar=no, menubar=no, scrollbars=0, resizable=no,location=no, status=no');  
}
function initPage(){
	//checkBoxValue('extendProperty');
	//accountDay();
	if (document.all) {
		self.resizeTo(660, 610);
	} else {
		self.resizeTo(660, 610);
	}
}

// Display the events
function displayEvents() {
	var events = document.procForm.events.value;
	var msgReceiver = document.procForm.msgReceiver.value;
	var openUrl = "";
	var path = document.getElementById("path").value;

	openUrl = path
			+ "/unieap/pages/workflow/webdesign/attribute/processPages/events.jsp?events="
			+ events + "&msgReceiver=" + msgReceiver;
	var left = (window.screen.availWidth - 635) / 2 + 20;
	var top = (window.screen.availHeight - 420) / 2;
	if (document.all) {
		parameter = 'height=245, width=600, top=' + top + ', left=' + left
				+ ', toolbar=no, menubar=no, location=no, status=no';
	} else {
		parameter = 'height=265, width=610,  top=' + top + ', left=' + left
				+ ', toolbar=no, menubar=no, location=no, status=no';
	}
	newWin = window.open(encodeURI(encodeURI(openUrl)), 'events', parameter);
}

function displaySurvival(){
    var dur=document.procForm.duration.value;
    var aDur=document.procForm.alertDuration.value;
    var vOD=document.procForm.varOrDur.value;
    var aVOD=document.procForm.alertVarOrDur.value;
    var aType=document.procForm.actionType.value;
    var aAType=document.procForm.alertActionType.value;
    var aAI=document.procForm.alertActionInterval.value;
    var aA=document.procForm.actionApplication.value;
    var aAA=document.procForm.alertActionApplication.value;
    var v=document.procForm.variable.value;
    var aV=document.procForm.alertVariable.value;
    var exAn=document.procForm.exActionName.value;
    var exAAN=document.procForm.exAlertActionName.value;
    var openUrl="";
  	var path=document.getElementById("path").value	  

  openUrl = path+"/unieap/pages/workflow/webdesign/attribute/processPages/processExpiration.jsp"+
  			  "?dur="+dur+"&aDur="+aDur+"&vOD="+vOD+"&aVOD="+aVOD+"&aType="+aType+"&aAType="+aAType+
  			  "&aAI="+aAI+"&aA="+aA+"&aAA="+aAA+"&v="+v+"&aV="+aV+"&exAn="+exAn+"&exAAN="+exAAN;
  	var left = (window.screen.availWidth - 635) / 2+20;
    var top = (window.screen.availHeight - 420) /2;
  if(document.all){			  
  	parameter='height=430, width=550, top='+top+', left='+left+', toolbar=no, menubar=no,scrollbars=no, resizable=no,location=no, status=no';
  }else{
  	parameter='height=455, width=550, top='+top+', left='+left+', toolbar=no, menubar=no,scrollbars=no, resizable=no,location=no, status=no';
  }
  newWin=window.open(openUrl, 'processExpiration', parameter);  

};

function displayVariableGrid(){
  var path=document.getElementById("path").value;
  var openUrl = path+"/unieap/pages/workflow/webdesign/attribute/processPages/variable.jsp";
  var left = (window.screen.availWidth - 635) / 2+20;
  var top = (window.screen.availHeight - 420) /2;
  
  if(document.all){			  
  	parameter='height=430, width=670, top='+top+', left='+left+', toolbar=no, menubar=no,scrollbars=no, resizable=no,location=no, status=no';
  }else{
  	parameter='height=455, width=670, top='+top+', left='+left+', toolbar=no, menubar=no,scrollbars=no, resizable=no,location=no, status=no';
  }
  newWin=window.open(openUrl, 'variable', parameter);  

};