var eccn=new ECCN("ec");

function init(){
	//��ʹ��Ԥ��ȡ������ʹ�ô�ͳ��ʽ�ύform
	eccn.doPrep=false;
	// ��Ԥ��ȡ��ǰһҳ��
	eccn.doPrepPrev=false;
	eccn.init();
	
	var el = document.getElementsByTagName('input');
	var len = el.length;
	for(var i=0; i<len; i++)
	{
	    if((el[i].type=="hidden") && (el[i].name=="chkbx_tableName"))
	    {
	        //alert("el[i].value   "+ el[i].value);  
	    	el[i].value = "";
	    }
	}
}

function showTable(obj){
   if(document.all("helloworld").style.display=="none"){
       document.all("helloworld").style.display = "";
       obj.innerHTML = "hide";
   }
   else{
       document.all("helloworld").style.display = "none";
       obj.innerHTML = "show";
   }
}

function checkValues(){
    var ifHaveChoose = false;
	var allElements = document.body.getElementsByTagName("INPUT");
	for (var i = 0; i < allElements.length; i++) {
		var e = allElements[i];
		if (e.type == 'checkbox') {
			if (e.checked == true) {
			    i = allElements.length;
				ifHaveChoose = true;
			} 
		}
	}
	if (ifHaveChoose == false){
		alert("��ѡ����Ҫ�����Ļ������");
	}
	return ifHaveChoose;
}

function uncheckValues(){
	var allElements = document.body.getElementsByTagName("INPUT");
	//alert("allElements.length  " + allElements.length);
	for (var i = 0; i < allElements.length; i++) {
		var e = allElements[i];
		if (e.type == 'checkbox') {
			if (e.checked == true) {
				alert(e.valueOf());
			    e.checked = false;
			} 
		}
	}

}

/**
 *
 */
function validCachedObjectAll(valid){
	if(checkValues()){

	    //alert("catchManager()" + document.getElementById("chkbx_tableName").SelectedItem.length);
	    document.forms[0].action = "cacheObjectManagerAction.do?method=showCachePerformance&nav="+(Math.random()*100000);	    	
		document.forms[0].submit();
		
	}
}
