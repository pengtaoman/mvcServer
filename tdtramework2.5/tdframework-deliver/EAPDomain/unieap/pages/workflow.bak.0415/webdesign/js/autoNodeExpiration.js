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
	if($('radioDelayTime').checked==true) {sendDelayTime="0";}else{if(checkDelayTime()==false) {alert("请输入正确的数字");return;}}
	if($('alertDelayTime').checked==true) {sendAlertTime="0";}else{if(checkAlertTime()==false) {alert("请输入正确的数字");return;}}
	if(checkIntervalTime()==false) {alert("请输入正确的数字");return;}
	window.opener.document.autoNodeForm.exActionName.value =sendExAn;//send Delay Time
	window.opener.document.autoNodeForm.exAlertActionName.value =sendExAAN;//send Delay Time
	window.opener.document.autoNodeForm.duration.value =sendDelayTime;//send Delay Time
	window.opener.document.autoNodeForm.alertDuration.value=sendAlertTime;//send Alert Time
	window.opener.document.autoNodeForm.alertActionInterval.value=sendIntervalTime;//send alarm Interval Time
	window.opener.document.autoNodeForm.varOrDur.value=sendDelayVar;//send delay radio variable choice
	window.opener.document.autoNodeForm.alertVarOrDur.value=sendAlertVar;//send alerm radio variable choice
	window.opener.document.autoNodeForm.actionType.value=sendDelayType;//send delay type
	window.opener.document.autoNodeForm.alertActionType.value=sendAlertType;//send alarm type
	window.opener.document.autoNodeForm.actionApplication.value=sendDA;//send Delay application program
	window.opener.document.autoNodeForm.alertActionApplication.value=sendAA;//send Alarm application program
	window.opener.document.autoNodeForm.variable.value=sendVariable;//send delay variable select choice
	window.opener.document.autoNodeForm.alertVariable.value=sendAlertVariable;//send alarm variable select choice
	window.opener = null;
	window.close();
}
function checkDelayTime(){
	if(($("durationDay").value.length>1&&$("durationDay").value.charAt(0)==0)||/[^\d+]/g.test($("durationDay").value)){
			$("durationDay").value="";
			$("durationDay").focus()
			return false;
		}
	else if(($("durationHour").value.length>1&&$("durationHour").value.charAt(0)==0)||/[^\d+]/g.test($("durationHour").value)){
			$("durationHour").value="";
			$("durationHour").focus()
			return false;
		}
	else if(($("durationMin").value.length>1&&$("durationMin").value.charAt(0)==0)||/[^\d+]/g.test($("durationMin").value)){
			$("durationMin").value="";
			$("durationMin").focus()
			return false;
		}
	else{
		return true;
	}
	}
function checkAlertTime(){
	if(($("alertDurationDay").value.length>1&&$("alertDurationDay").value.charAt(0)==0)||/[^\d+]/g.test($("alertDurationDay").value)){
			$("alertDurationDay").value="";
			$("alertDurationDay").focus()
			return false;
		}
	else if(($("alertDurationHour").value.length>1&&$("alertDurationHour").value.charAt(0)==0)||/[^\d+]/g.test($("alertDurationHour").value)){
			$("alertDurationHour").value="";
			$("alertDurationHour").focus()
			return false;
		}
	else if(($("alertDurationMin").value.length>1&&$("alertDurationMin").value.charAt(0)==0)||/[^\d+]/g.test($("alertDurationMin").value)){
			$("alertDurationMin").value="";
			$("alertDurationMin").focus()
			return false;
		}
	else{
		return true;
	}
	}
function checkIntervalTime(){
	if(($("intervalDay").value.length>1&&$("intervalDay").value.charAt(0)==0)||/[^\d+]/g.test($("intervalDay").value)){
			$("intervalDay").value="";
			$("intervalDay").focus()
			return false;
		}
	else if(($("intervalHour").value.length>1&&$("intervalHour").value.charAt(0)==0)||/[^\d+]/g.test($("intervalHour").value)){
			$("intervalHour").value="";
			$("intervalHour").focus()
			return false;
		}
	else if(($("intervalMin").value.length>1&&$("intervalMin").value.charAt(0)==0)||/[^\d+]/g.test($("intervalMin").value)){
			$("intervalMin").value="";
			$("intervalMin").focus()
			return false;
		}
	else{
		return true;
	}
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
	if($("durationDay").value==""){
		$("durationDay").value=0;
	}
	if($("durationHour").value==""){
		$("durationHour").value=0;
	}
	if($("durationMin").value==""){
		$("durationMin").value=0;
	}
	var delayTime= parseInt($("durationDay").value)*24*60+
				   parseInt($("durationHour").value)*60+
				   parseInt($("durationMin").value)
	return delayTime;
}
//Compute alarm time
function sumAlertTime(){
	if($("alertDurationDay").value==""){
		$("alertDurationDay").value=0;
	}
	if($("alertDurationHour").value==""){
		$("alertDurationHour").value=0;
	}
	if($("alertDurationMin").value==""){
		$("alertDurationMin").value=0;
	}
	var alertTime= parseInt($("alertDurationDay").value)*24*60+
				   parseInt($("alertDurationHour").value)*60+
				   parseInt($("alertDurationMin").value)
	return alertTime;
   }
//Compute interval time
function sumIntervalTime(){
	if($("intervalDay").value==""){
		$("intervalDay").value=0;
	}
	if($("intervalHour").value==""){
		$("intervalHour").value=0;
	}
	if($("intervalMin").value==""){
		$("intervalMin").value=0;
	}
    var intervalTime=parseInt($("intervalDay").value)*24*60+
   					 parseInt($("intervalHour").value*60)+
   					 parseInt($("intervalMin").value)
	return intervalTime;
}
//Init page time of item
function displayDiv(){
   createSelect();
   variableSelect1()
   variableSelect2()
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
   $("intervalMin").value=(aInterval-parseInt(aInterval/(24*60))*24*60)%60 
   $("delayApplication").value=window.opener.document.autoNodeForm.exActionName.value;
   $("alertApplication").value=window.opener.document.autoNodeForm.exAlertActionName.value;
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
function createSelect(){
	var str=window.opener.document.getElementById("variableSelect").value;
	var obj1=document.getElementById('select1');
	var obj2=document.getElementById('select2'); 
	var optionText="";
	var optionValue=""
	var node=str.split(";");	
	for(i=0;i<node.length-1;i++){
				optionText=node[i].split(",")[1];
				optionValue=node[i].split(",")[0];
            	obj1.options.add(new Option(optionText,optionValue));
            	obj2.options.add(new Option(optionText,optionValue));	
	}

}
function variableSelect1(){
	var obj=document.getElementById("select1");
    for(i=0;i<obj.length;i++){
		if(obj[i].innerHTML==window.opener.document.autoNodeForm.variable.value){
			obj[i].selected=true;
			
		}
	}
}
function variableSelect2(){
	var obj=document.getElementById("select2");
    for(i=0;i<obj.length;i++){
		if(obj[i].innerHTML==window.opener.document.autoNodeForm.alertVariable.value){
			obj[i].selected=true;
			
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
	var applicationPageName=obj.name;
	var path=window.opener.document.getElementById("projectPath").value	;
	var left = (window.screen.availWidth - 635) / 2+320;
    var top = (window.screen.availHeight - 420) /2;
	openUrl = path+"/unieap/pages/workflow/webdesign/attribute/appnewmgt/applicationManager.jsp?"+"applicationPageName="+applicationPageName;
    newWin=window.open(openUrl, 'applicationPages', 'height=520, width=250,  top='+top+', left='+left+',toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');  
}
//clear up  application
function clearUp1(){
	document.getElementById("delayApplication").value="";
	document.getElementById("actionApplication").value="";
}
function clearUp2(){
	document.getElementById("alertApplication").value="";
	document.getElementById("alertActionApplication").value="";
}