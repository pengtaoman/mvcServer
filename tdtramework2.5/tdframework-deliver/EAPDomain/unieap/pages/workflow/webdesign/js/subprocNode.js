//Get object method simplify 
function $(id){
	return document.getElementById(id);
};
//return checked radio value
function radioValue(name){
	 var names = document.getElementsByName(name);
    for(i=0;i<names.length;i++){
          if(names[i].checked==true)
          return names[i].value;    
    }
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
	
function setSelectchecked(id){
	var obj=document.getElementById(id);
	for(i=0;i<obj.length;i++){
		if(document.subprocNodeForm.assignRule.value==obj[i].value){
			obj[i].selected=true;
			return;
		}
	}
}
//When init pages,init checkBox
function checkBoxValue(name){
    var names = document.getElementsByName(name);
    var extend = document.subprocNodeForm.extendProperties.value
    for(i=0;i<names.length;i++){
      var checkValue=names[i].value
      if(extend.indexOf(checkValue)!=-1)   
          names[i].checked=true;
    }
}
//Get the resolve method
function getResoveMethod(){
    var names = $('reMethod')
	for(i=0;i<names.length;i++){
    	if(names[i].selected==true){ 
	   		return  names[i].value
    	}
    }
}

//Get the checkBox's value
function getCheckBoxValue(name){
	var names = document.getElementsByName(name);
	var checkBoxValue="";
	for(i=0;i<names.length;i++){
       checkValue=names[i].value;
		if(names[i].checked==true){
			checkBoxValue=checkBoxValue+checkValue+":"+"true;";
		}else{
			checkBoxValue=checkBoxValue+checkValue+":"+"false;";
		}
    }
    checkBoxValue=checkBoxValue.substring(0,checkBoxValue.length-1)
	return checkBoxValue;
}  
//Display the survival
function displaySurvival(){
    var dur=document.subprocNodeForm.duration.value;
    var aDur=document.subprocNodeForm.alertDuration.value;
    var vOD=document.subprocNodeForm.varOrDur.value;
    var aVOD=document.subprocNodeForm.alertVarOrDur.value;
    var aType=document.subprocNodeForm.actionType.value;
    var aAType=document.subprocNodeForm.alertActionType.value;
    var aAI=document.subprocNodeForm.alertActionInterval.value;
    var aA=document.subprocNodeForm.actionApplication.value;
    var aAA=document.subprocNodeForm.alertActionApplication.value;
    var v=document.subprocNodeForm.variable.value;
    var aV=document.subprocNodeForm.alertVariable.value;
    var exAn=document.subprocNodeForm.exActionName.value;
    var exAAN=document.subprocNodeForm.exAlertActionName.value;
    var openUrl="";
    var path=document.getElementById("path").value;
  	openUrl = path+"/unieap/pages/workflow/webdesign/attribute/subprocNodePages/expiration.jsp"+
  			  "?dur="+dur+"&aDur="+aDur+"&vOD="+vOD+"&aVOD="+aVOD+"&aType="+aType+"&aAType="+aAType+
  			  "&aAI="+aAI+"&aA="+aA+"&aAA="+aAA+"&v="+v+"&aV="+aV+"&exAn="+exAn+"&exAAN="+exAAN;
    var left = (window.screen.availWidth - 635) / 2+20;
    var top = (window.screen.availHeight - 420) /2;
  	if(document.all){			  
  		parameter='height=430, width=550, top='+top+', left='+left+', toolbar=no, menubar=no,scrollbars=no, resizable=no,location=no, status=no';
  	}else{
  		parameter='height=445, width=550, top='+top+', left='+left+', toolbar=no, menubar=no,scrollbars=no, resizable=no,location=no, status=no';
 	 }
	newWin=window.open(openUrl, 'expiration', parameter);  
};
//Open application dialog
function openApp(event){
	var obj=event.srcElement ? event.srcElement : event.target;
	var applicationPageName=obj.name
	var path=document.getElementById("path").value;
	var left = (window.screen.availWidth - 635) / 2+320;
    var top = (window.screen.availHeight - 420) /2;
	openUrl =path+"/unieap/pages/workflow/webdesign/attribute/appnewmgt/subprocList.jsp?"+"applicationPageName="+applicationPageName;
    newWin=window.open(openUrl, 'applicationPages', 'height=520, width=250,  top='+top+', left='+left);  
}
//clear up  application
function clearUp(){
	document.subprocNodeForm.application.value="";
}