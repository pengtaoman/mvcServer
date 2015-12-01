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

function submit_onclick(){
  	
     document.autoNodeForm.submit();
}

// Display the events
function displayEvents() {
	var events = document.autoNodeForm.events.value;
	var msgReceiver = document.autoNodeForm.msgReceiver.value;
	var openUrl = "";
	var path = document.getElementById("path").value;

	openUrl = path
			+ "/unieap/pages/workflow/webdesign/attribute/autoNodePages/events.jsp?events="
			+ events + "&msgReceiver=" + msgReceiver;
	var left = (window.screen.availWidth - 635) / 2 + 20;
	var top = (window.screen.availHeight - 420) / 2;
	if (document.all) {
		parameter = 'height=260, width=600, top=' + top + ', left=' + left
				+ ', toolbar=no, menubar=no, location=no, status=no';
	} else {
		parameter = 'height=275, width=610,  top=' + top + ', left=' + left
				+ ', toolbar=no, menubar=no, location=no, status=no';
	}
	newWin = window.open(encodeURI(encodeURI(openUrl)), 'events', parameter);
}

//Display the survival
function displaySurvival(){
    var dur=document.autoNodeForm.duration.value;
    var aDur=document.autoNodeForm.alertDuration.value;
    var vOD=document.autoNodeForm.varOrDur.value;
    var aVOD=document.autoNodeForm.alertVarOrDur.value;
    var aType=document.autoNodeForm.actionType.value;
    var aAType=document.autoNodeForm.alertActionType.value;
    var aAI=document.autoNodeForm.alertActionInterval.value;
    var aA=document.autoNodeForm.actionApplication.value;
    var aAA=document.autoNodeForm.alertActionApplication.value;
    var v=document.autoNodeForm.variable.value;
    var aV=document.autoNodeForm.alertVariable.value;
    var exAn=document.autoNodeForm.exActionName.value;
    var exAAN=document.autoNodeForm.exAlertActionName.value;
    var openUrl="";
  	var path=document.getElementById("projectPath").value	  
    var left = (window.screen.availWidth - 635) / 2+20;
    var top = (window.screen.availHeight - 420) /2;
  openUrl = path+"/unieap/pages/workflow/webdesign/attribute/autoNodePages/autoNodeExpiration.jsp"+
  			  "?dur="+dur+"&aDur="+aDur+"&vOD="+vOD+"&aVOD="+aVOD+"&aType="+aType+"&aAType="+aAType+
  			  "&aAI="+aAI+"&aA="+aA+"&aAA="+aAA+"&v="+v+"&aV="+aV+"&exAn="+exAn+"&exAAN="+exAAN;
  if(document.all){			  
  	parameter='height=430, width=550,   top='+top+', left='+left+', toolbar=no, menubar=no,scrollbars=no, resizable=no,location=no, status=no';
  }else{
  	parameter='height=455, width=550,   top='+top+', left='+left+', toolbar=no, menubar=no,scrollbars=no, resizable=no,location=no, status=no';
  }
  newWin=window.open(openUrl, 'autoNodeExpiration', parameter);  

};
//Open application dialog
function openApp(event){
	var obj=event.srcElement ? event.srcElement : event.target;
	var applicationPageName=obj.name
	var path=document.getElementById("projectPath").value
	var left = (window.screen.availWidth - 635) / 2+320;
    var top = (window.screen.availHeight - 420) /2;	 
	openUrl = path+"/unieap/pages/workflow/webdesign/attribute/appnewmgt/applicationManager.jsp?"+"applicationPageName="+applicationPageName;
    newWin=window.open(openUrl, 'applicationPages', 'height=520, width=250,    top='+top+', left='+left+',toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');  
}
//clear up  application
function clearUp(){
	document.autoNodeForm.applicationName.value="";
	document.autoNodeForm.application.value="";
}