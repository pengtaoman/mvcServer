// 使用时，引入 prototypeajax.js 与 eccn.js
// prototypeajax从 prototype 提炼修改而来。
// 直接使用原版prototype也可，但将导致在firefox 下不能使用。
// 原因是原版 $()永远不会执行getElementsByName操作。

// 参数为 ec:table 的 id (实际为最终生成的 form的id)
var eccn=new ECCN("ec");
  
function init1(){
//不使用预读取技术，使用传统方式提交form
//eccn.doPrep=false;
// 不预读取“前一页”
//eccn.doPrepPrev=false;
//if(typeof (parent.query) != "undefined");
//	var temp;
	eccn.init();

	if (window.frameElement && window.frameElement.name.indexOf("_ecs_export_iframe")>0){
		alert("i am in a hidden iframe");
		return;
	}
//alert(parent.query);
//alert(window.location.pathname)

}

function init2(){
//不使用预读取技术，使用传统方式提交form
	eccn.doPrep=false;
// 不预读取“前一页”
//eccn.doPrepPrev=false;
	eccn.init();
//alert(window.location.pathname)

}

/*
useCustomCol="false"  
paginationLocation="bottom"
showRowsDisplayed="true" 
showGotoPage="true"
rowsDisplayed="10"
showExports="true"
sortable="false"
*/

function showTable(obj){
   if(document.all("helloworld").style.display=="none"){
       document.all("helloworld").style.display = "";
       obj.innerHTML = "hide"
   }
   else{
       document.all("helloworld").style.display = "none";
       obj.innerHTML = "show";
   }
}
function callback1(){
   document.forms.ec.action='demoExtremeTable.do?method=query';
   document.forms.ec.submit();
}

function callback2(){
	document.forms.ec.action='demoExtremeTable.do?method=queryAll';
	document.forms.ec.submit();
}

function deleteRecords(){
   var list=document.forms.ec.elements;
   for(var i=0;i<list.length;i++){
     var element=list[i];
     if(element.type=="hidden"){
       var name=element.name;
       if(name.substring(0,"chkbx_".length)=="chkbx_"){
         element.outerHTML="";
       
       }
     }
   }
   document.forms.ec.action='demoExtremeTable.do?method=delBatch';
   document.forms.ec.submit();
   
}

function modify1(name){     
	EccnUtil.noExport("ec");
	parent.myFrame.rows="120,0,*";
	document.forms.ec.action = "demoExtremeTable.do?method=modify&linkData="+name;
	document.forms.ec.target="end";	    	
	document.forms.ec.submit();                
	//var result = openModalDialog('demoExtremeTable','modify','linkData='+name,'800px','600px');
	//callback1();
}

function modify2(name){     
	EccnUtil.noExport("ec");                
	var result = openModalDialog('demoExtremeTable','modify','linkData='+name,'800px','600px');
	callback2();
}

function showAllText(obj){
    if(obj.style.width=="100px" && obj.className=="ellipsis"){
    	obj.style.width="100%";
    	obj.className="";
    }
	else{
		obj.style.width="100px";
		obj.className="ellipsis";
	}
	//alert("showAll");
}