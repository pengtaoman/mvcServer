
function init(){
	alert("onchange_Test_tab2");
    eapObjsMgr.onReady();
}
function alertCertificate2(obj){
   var paramters = "certificateType="+obj.value ;
   var result = executeRequest("demoPartRefresh","demo2",paramters);
   document.all("alterCertificate").innerHTML = result;
}
function alertCertificate(obj){
   alertCertificate2(obj);
   eapObjsMgr.getEAPObj(document.all("certificateNumber")).onReady();
}
function foucsto(){//???????
   if(window.event.keyCode=='13'){
     //nextPage('tab','username');
     nextPage('tab','hello');
   }
}	