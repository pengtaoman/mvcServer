var APP_PATH = document.getElementsByTagName("contextPath")[0].value;
//alert(APP_PATH);
var refreshUrls=[];
function findObj(n, d) { //v4.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}
var currentActionName;

function replaceStr(str)
{
   str = str.replace(/%/g,"%25");
   str = str.replace(/&/g,"%26");
    
    return str;
}
function executeRequest(actionName,actionMethod,postParameter,isAsynchronism){
    var isPartlyRefresh;
    if(event!=null)
    {
    var srcObj = event.srcElement;   
    if(srcObj != null && srcObj.tagName.toUpperCase() == "INPUT"){      
        if(srcObj.isPartlyRefresh != null && srcObj.isPartlyRefresh.toUpperCase() == "FALSE"){                          
                executeDirectRequest(actionName,actionMethod);  
                return "UNIEAP_NOTING";                             
        }
    }
    }
    var objXMLReq = getObjXMLReq();
    var strURL = unieap.WEB_APP_NAME + "/" + actionName + ".do";
    currentActionName = actionName;
    
    var flag = false;
    if(actionMethod != null && actionMethod != ""){
        strURL += "?method=" + actionMethod;
        flag = true;
    }
    if(flag) 
        strURL += "&isPartlyRefresh=true";
    else
        strURL += "?isPartlyRefresh=true";  
   
    if(postParameter == null) postParameter ="";
    if(findObj("SendMsg")) findObj("SendMsg").innerText = postParameter;
    
    if(isAsynchronism == null) isAsynchronism = false;
    objXMLReq.open("POST", strURL, isAsynchronism);
    objXMLReq.send(postParameter);
    
    var result;
    if(isAsynchronism==false){
            result = objXMLReq.responseText;         
            if(findObj("RetrieveMsg")) findObj("RetrieveMsg").innerText = result;           
            return result;
     }
}
function executeDirectRequest(actionName,actionMethod){
    currentActionName = actionName;
    var strURL = unieap.WEB_APP_NAME + "/" + actionName + ".do";
    var formObj = findObj(unieap.FORM_NAME);
    if(formObj == null) return; 
    if(actionMethod != null && actionMethod != ""){
        for (i=0; i<formObj.length; i++ ){
            if ( formObj(i).type == "hidden" && formObj(i).id.toLowerCase() == "method" ){
                formObj(i).value = actionMethod;
                break;
            }
        }  
    }            
    formObj.action = strURL;
    formObj.submit();   
}
function getXMLActiveObj(){
    try{
        return new ActiveXObject("MSXML2.DOMDocument.4.0");
    }catch(e){
        if(confirm("您的机器上的XML解析器版本太低，您是否打算现在升级？")){
            document.location = unieap.WEB_APP_NAME + "/unieap/pages/datawindow/MsXML4.0.jsp";
        }
        return null;
    }
}
function forwardByPartlyRefresh(forwardName,alertMsg,executeScript){
    if(alertMsg != null && alertMsg != "") alert(alertMsg);
    
    if(executeScript != null && executeScript != ""){
        var executeScriptReturn = ""+eval(executeScript);
        if(executeScriptReturn.toLowerCase() == "false")
            return;
    }
    
    findObj("FORWARD_NAME_IN_PARTLY_REFRESH").value = forwardName;
    executeDirectRequest(currentActionName,"EAPForward");
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.style.backgroundImage=x.oSrc;
}
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}
function MM_swapImage() { //v3.0

 var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)

  if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.style.backgroundImage; x.style.backgroundImage ="url("+a[i+2]+")" ;
  }
}
function display_picture(picture_address){
   window.open (picture_address, "newwindow"); 

}
function getObjXMLReq(){
    var objXMLReq;
    // IE5 for the mac claims to support window.ActiveXObject, but throws an error when it's used
    if (window.ActiveXObject && !(navigator.userAgent.indexOf('Mac') >= 0 && navigator.userAgent.indexOf("MSIE") >= 0)){
        objXMLReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //for Mozilla and Safari etc.
    else if (window.XMLHttpRequest){
        objXMLReq = new XMLHttpRequest();
    }
    return objXMLReq;
}

function stopContextMenu(){
	var s=top.location+"";
	if(s.indexOf("debug=true")<10){
		return false;
	}
	return true;
}
document.oncontextmenu=stopContextMenu;

function $(id){
	var obj=document.getElementById(id);
	return obj;
}

function isValid(obj){
	if (obj==null || typeof(obj)=="undefined" ){
		return false;
	}else{
		return true;
	}
}

// 应用路径,如果使用jsp,则写成 var APP_PATH="＜％= request.getContextPath() ％＞";
//var APP_PATH="<%=path%>";
function deal_click_link(){
		
	//document.forms[0].ok_pass.value='0'
	var obj=event.srcElement;
	var linkId = "frameLeft.do?method=init&systemId=" + obj.id;
	top.currentSysNameValue=obj.title;
	parent.mainleft.location.href = linkId;
	top.main.location.href = APP_PATH+"/blank.html";
}

// 公告通知

window.marqueeMove=true;
window.marqueeSpeed=5;
window.marqueeTime=300;
function initMarquee(){
	var cm=document.getElementById("nav3");
	cm.style.paddingLeft="10px";
	cm.style.paddingRight="120px";
	window.setInterval(moveMarquee,window.marqueeTime);
}
function moveMarquee(){

	var cm=document.getElementById("nav3");
	var osl=cm.scrollLeft;
	var nsl=0;
	if (window.marqueeMove){
		cm.scrollLeft+=window.marqueeSpeed;
		nsl=cm.scrollLeft;
		if (nsl-osl<window.marqueeSpeed){
			cm.scrollLeft=0;
		}
	}
}

function setWarnTimer(){
 	setTimeout("setWarnTimer()",1800000);//30分钟间隔刷新公告, 30 * 60 * 1000(ms)
	var paramters = "";
	var result = executeRequest("pRWarnMsgAction","getWarnMsg",paramters);
   	var disContent = "";
   	var hrefString = "";
 
    //disContent =  "<marquee width='100%'  height='6'  direction='bottom' id='m1'  onmouseover='m1.stop();' style='cursor:hand'  onmouseout='m1.start();' scrollamount='3'> " + result + "</marquee>";
   // nav3.innerHTML = disContent ;
   nav3.innerHTML="<nobr>"+result+"</nobr>"
    nav3.style.display="block";
  
}
function warnDetail(obj){
  	window.showModalDialog('bulletinAction.do?method=getBulletinDetail&bulletinId='+obj.id, '', "status:no;dialogWidth:700px;dialogHeight:360px");
}

function showLeftMenu(id){
	top.DefaultHomePageId=id;
}

function customMenu(){
	var prop = "dialogWidth:600px;dialogHeight:500px;center:yes;scroll:yes;status:yes;resizable:yes;help:no";
	var url = APP_PATH + "/tdframework/mainframe/customtop.html";
	var datePopWin=window.showModalDialog(url, window, prop);
}

function showRightMenu(obj){
	obj.childNodes[0].style.display="inline";
}

function hideRightMenu(obj){
	obj.childNodes[0].style.display="none";

}

function showAllMenu(){
	if (MenuBar.zip){

		MenuBar.zip=false;
		MenuBar.buildTopMenu();
		event.srcElement.innerHTML="全部显示";
	}else{

		MenuBar.zip=true;
		MenuBar.buildTopMenu();
		event.srcElement.innerHTML="还原显示";
	}

}

var showLeft=false;

function doShowLeftBar(){
	if (showLeft){
			$("sleft").style.display="inline";
			$("sright").style.display="none";
			$("sleft").style.height="16px";
	}
}
function showLeftBar(){
	showLeft=true;
	window.setTimeout(doShowLeftBar,500);
}

function showRightBar(){
	showLeft=false;
	$("sleft").style.display="none";
	$("sright").style.display="inline";
	$("sright").style.height="16px";
	
}

function instantSearch(){
	var searchValue = $("searchValue").value;
	parent.main.location.href = APP_PATH + "/instantSearch.do?method=instantSearch&searchValue="+searchValue;

}

function updatePassword() {
	parent.main.location = APP_PATH + "/om/passwordupdateaction.do?OperTye=init";
}
		
//收藏夹管理
function favoriteAdmin(){	
	var systemId = parent.mainleft.myform.systemId.value;
	parent.main.location = APP_PATH + "/favoriteMenuAdmin.do?operType=query&systemId=" + systemId;
}
		
function relogin(){
	var ht=[];
	var cfilter="progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)";

	ht[0] = top.top_page.document.getElementsByTagName("body");
	ht[1] = top.mainleft.document.getElementsByTagName("body");
	ht[2] = top.work_items.document.getElementsByTagName("body");
	//ht[3] = top.main.document.getElementsByTagName("body");

	for (var i=0;i<ht.length ;i++ ){
		if(isValid(ht[i][0]) ) {
			ht[i][0].style.filter = cfilter;
		}
	}

	//ht[0].style.setAttribute("filter","Alpha(opacity=60)");
	if(confirm("确认要重新登陆吗?"))
	{
		var paramters = "storeValue=aa";
		var result = executeRequest("login","logout",paramters);
		for (var i=0;i<refreshUrls.length ;i++ ){
            if(refreshUrls[i].indexOf("channel")>0)
                                continue;
			new Ajax.Request( refreshUrls[i],{  onComplete: doNothing } );
		}
		top.location = APP_PATH + "/";
	}
	else
	{	
		for (var i=0;i<ht.length ;i++ ){
		if(isValid(ht[i][0]) ) {
			ht[i][0].style.filter = "";
		}
		}
	}
}

function doNothing(originalRequest){
var authResult=originalRequest.responseText;
var r=authResult.split("\n");
if (r.length>1){
	if (r[0].toLowerCase().indexOf("fail")>0){
		//alert("对不起,对 "+r[1].replace("<"+"!--","").replace("--"+">","")+"的认证失败!");
	}
}
}
		
function help(){
	//alert("CRM客户管理系统! \n版本:1.0");
	window.open("http://172.31.1.252/KMS_SYS.nsf/HBBSS_KTreeForBrow_FS?OpenFrameSet","handbook","top:70,left:50,width:200,height:200,scrollbars");
}


