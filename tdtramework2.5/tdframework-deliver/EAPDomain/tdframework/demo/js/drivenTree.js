
function saveDrivenTree(){
	parent.document.all("driven").value = document.all("driven").value;
}

function openDrivenTree(obj){
	var rqid = document.all("requestid").value;
	if(rqid==null){
    	return;
   	}
   	showTree_second(obj,'NULL','driven');
}