//Sent value to parent page
function setParentValue(){
	var sendDelayTime=sumDelayTime()//Delay time
	var sendAlertTime=sumAlertTime();//Alarm time
	var sendIntervalTime=sumIntervalTime();//Alarm interval time
	var sendDelayVar=radioValue('dRadio');//Delay radio
	var sendAlertVar=radioValue('alertRadio');//Alarm radio
	var sendDelayType=radioValue('delayType');//Delay type
	var sendAlertType=radioValue('alertType');//Alarm type
	var sendDA=$('actionApplication').value;//Delay application program
	var sendAA=$('alertActionApplication').value;//Alarm application program
	var sendExAn=$('delayApplication').value;//Alarm application program
	var sendExAAN=$('alertApplication').value;//Alarm application program
	var sendVariable=getSelectValue('select1');//Delay select variable
	var sendAlertVariable=getSelectValue('select2');//Alarm select variable
	if($('radioDelayTime').checked==true) {sendDelayTime="0";}
	if($('alertDelayTime').checked==true) {sendAlertTime="0";}
	window.opener.document.branchForm.exActionName.value =sendExAn;//send Delay Time
	window.opener.document.branchForm.exAlertActionName.value =sendExAAN;//send Delay Time
	window.opener.document.branchForm.duration.value =sendDelayTime;//send Delay Time
	window.opener.document.branchForm.alertDuration.value=sendAlertTime;//send Alert Time
	window.opener.document.branchForm.alertActionInterval.value=sendIntervalTime;//send alarm Interval Time
	window.opener.document.branchForm.varOrDur.value=sendDelayVar;//send delay radio variable choice
	window.opener.document.branchForm.alertVarOrDur.value=sendAlertVar;//send alerm radio variable choice
	window.opener.document.branchForm.actionType.value=sendDelayType;//send delay type
	window.opener.document.branchForm.alertActionType.value=sendAlertType;//send alarm type
	window.opener.document.branchForm.actionApplication.value=sendDA;//send Delay application program
	window.opener.document.branchForm.alertActionApplication.value=sendAA;//send Alarm application program
	window.opener.document.branchForm.variable.value=sendVariable;//send delay variable select choice
	window.opener.document.branchForm.alertVariable.value=sendAlertVariable;//send alarm variable select choice
	window.opener = null;
	window.close();
}
//Check radio's choice value
function radioValue(name){
	var names = document.getElementsByName(name);
		for(i=0;i<names.length;i++){
			if(names[i].checked == true){
				return names[i].value;
			}
		}
}
//Compute delay time
function sumDelayTime(){
	var delayTime= parseInt($("durationDay").value)*24*60+
				   parseInt($("durationHour").value)*60+
				   parseInt($("durationMin").value)
	return delayTime;
}
//Compute alarm time
function sumAlertTime(){
	var alertTime= parseInt($("alertDurationDay").value)*24*60+
				   parseInt($("alertDurationHour").value)*60+
				   parseInt($("alertDurationMin").value)
	return alertTime;
   }
//Compute interval time
function sumIntervalTime(){
    var intervalTime=parseInt($("intervalDay").value)*24*60+
   					 parseInt($("intervalHour").value*60)
	return intervalTime;
}
//Init page time of item
function displayDiv(){
   variableSelect('select1','variable')
   variableSelect('select2','alertVariable')
   var durationTime=parseInt($('duration').value);
   var alertDurationTime=parseInt($('alertDuration').value);
   if($('alertApp').checked==true) displayAlertApp();
   if($('delayApp').checked==true) displayDelayApp();
   if($('radioDelayTime').checked==true) displayDelayInput();
   if($('alertDelayTime').checked==true) displayAlertInput();
   $("durationDay").value=parseInt(durationTime/(24*60))
   $("durationHour").value=parseInt((durationTime-parseInt(durationTime/(24*60))*24*60)/60)
   $("durationMin").value=(durationTime-parseInt(durationTime/(24*60))*24*60)%60
   $("alertDurationDay").value=parseInt(alertDurationTime/(24*60))
   $("alertDurationHour").value=parseInt((alertDurationTime-parseInt(alertDurationTime/(24*60))*24*60)/60)
   $("alertDurationMin").value=(alertDurationTime-parseInt(alertDurationTime/(24*60))*24*60)%60
   var aInterval=$('alertActionInterval').value;
   $("intervalDay").value=parseInt(aInterval/(24*60))
   $("intervalHour").value=parseInt((aInterval-parseInt(aInterval/(24*60))*24*60)/60) 
}
//get the select's value
function getSelectValue(id){
	var obj=document.getElementById(id);
	for(i=0;i<obj.length;i++){
		if(obj[i].selected==true){
			return obj[i].innerHTML;
		}
	}
}
//Display delay time's frame
function displayDelayTime(){
    document.getElementById('delayTime').style.display="block";
    document.getElementById('delayVarSet').style.display="none"
}
//Display delay variable
function displayDelayInput(){
    if(document.getElementById('delayVarSet').style.display!="none"){
        return;
    }else{
         document.getElementById('delayTime').style.display="none";
        document.getElementById('delayVarSet').style.display="block"
    }
}
//Display alarm time's frame
function displayAlertTime(){
    document.getElementById('alertTime').style.display="block";
    document.getElementById('alertVarSet').style.display="none"
}
//Display alarm variable
function displayAlertInput(){
    if(document.getElementById('alertVarSet').style.display!="none"){
        return;
    }else{
         document.getElementById('alertTime').style.display="none";
        document.getElementById('alertVarSet').style.display="block"
    }
}

function $(id){
		return document.getElementById(id);
};
//Display delay application program's frame
function displayDelayApp(){
    if($('delayApp').checked==true){
		$('application1').style.display="block";
    }
    else{
         $('application1').style.display="none";
	}
}
//Display alarm application program's frame
function displayAlertApp(){
    if($('alertApp').checked==true){
		$('application2').style.display="block";
    }
    else{
        $('application2').style.display="none";
   }
}
//Judge the delay variable,which is selected
function variableSelect(id,hiddenId){
	var obj=document.getElementById(id);
    for(i=0;i<obj.length;i++){
		if(obj[i].innerHTML==$(hiddenId).value){
			obj[i].selected=true;
			
		}
	}
}
//Under the IE's value can only input number type
function ieNum(e){
    if(document.all){
		var key = window.event ? e.keyCode : e.which;
		var keychar = String.fromCharCode(key);
		reg = /\d/;
		return reg.test(keychar);
	}
}
//Under the FF's value can only input number type
function ffNum(id){
	if(document.all){}
	else{
		$(id).value=$(id).value.replace(/[^0-9]/g,'');
	}
}
//Open application dialog
function openApp(event){
	var obj=event.srcElement ? event.srcElement : event.target;
	var applicationPageName=obj.name
	var path=window.opener.document.getElementById("path").value;
	openUrl = path+"/unieap/pages/workflow/webdesign/attribute/appnewmgt/applicationManager.jsp?"+"applicationPageName="+applicationPageName;
    newWin=window.open(openUrl, 'applicationPages', 'height=520, width=250,  top=120, left=592,toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');  
}
//clear up  application
function clearUp(){
	document.getElementById("delayApplication").value="";
	document.getElementById("actionApplication").value="";
}
function clearUp1(){
	document.getElementById("alertApplication").value="";
	document.getElementById("alertActionApplication").value="";
}