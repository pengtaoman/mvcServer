BusCard.define('/buscardapp/rela/js/quitCommon.js',function(_buscard,cardParam){ 
try { 
	var Me = this;
	var a = arguments[0];
	var b = arguments[1];
	var D = BusCard.$session.workNo;
	var A = BusCard.$session.PASSWORD;
	var R = "";
	if($("localpath")){
	  R=$("localpath").value;
	}
	var container=BusCard.$remote("containerDAO").getAppContainer(3);
	var C = (typeof container == "string") ? eval("(" + container + ")") : container;
	$("exchangeBtn").onclick=function(){
		var F=R+C+"views/crmsystem/pointCust/pointexchange/pointExchangMain.jsp?STAFFNO=" + D + "&PASSWORD=" + A ;
		//F="http://136.142.27.87:8080/crm3/views/crmsystem/pointCust/pointexchange/pointExchangMain.jsp?STAFFNO=SL_HDS&PASSWORD=B4D16DDD05C0F60FF09A0185D078E41AF09A0185D078E41AF09A0185D078E41A";
	    //window.showModalDialog(F,"","DialogWidth:1024px;DialogHeight:768px;status:no;location:no");
	     window.open(F, "", 'status=1,resizable=0,fullscreen=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
	}
	if($("effectDate")){
		$("effectDate").onblur=function(){	
		  var effectDate = new Date();
		  var serviceStopDate=new Date();
		  var serviceStopDateArr=b.serviceRelation.serviceStopDate.substr(0,10).split("-");
		  var effectDateArr=$("effectDate").value.split("-");
		  serviceStopDate.setFullYear(parseInt(serviceStopDateArr[0],10), parseInt(serviceStopDateArr[1],10), parseInt(serviceStopDateArr[2],10));
		  effectDate.setFullYear(parseInt(effectDateArr[0],10), parseInt(effectDateArr[1],10), parseInt(effectDateArr[2],10));
			if(effectDate<serviceStopDate){
			   alert("\u751f\u6548\u65f6\u95f4\u4e0d\u80fd\u5c0f\u4e8e\u9884\u62c6\u673a\u7684\u751f\u6548\u65f6\u95f4");
		       $("effectDate").value="";
			    $("effectDate").focus();
			       return false;
				}
		
		
		}
  }
}
catch (e) {
	alert(e.message);
}
});