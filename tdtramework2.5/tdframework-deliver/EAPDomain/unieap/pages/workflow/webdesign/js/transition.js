//   	
function omit(){
	var priorityValue = document.transitionForm.priority;
	priorityValue.value = "-1";
	priorityValue.readOnly = true;
	priorityValue.disabled = true;
}
//
function usal(){
	var priority = document.transitionForm.priority;
	priority.value =  "0"
	priority.readOnly = false;
	priority.disabled = false;
}

function getTypeValue(){
	var names=document.getElementsByName("radioType");
	for(i=0;i<names.length;i++){
		if(names[i].checked==true){
			return names[i].value;
		}
	}
}
function trim(str){ 
 		return str.replace(/\s/g, "");    
} 
function submit_onclick(){
   if(trim(document.transitionForm.name.value)==""){
		document.transitionForm.name.focus();
	 	alert("名称不可以为空")
	 	document.transitionForm.name.value="";
		return false;
	}
	document.transitionForm.priority.disabled = false;
	document.transitionForm.transType.value=getTypeValue();
    document.transitionForm.submit();
}
