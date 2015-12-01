/**
 * @file common.js
 * @desription 公用函数
 * @version 1.0 2003.4.10
 * @author shaosl@neusoft.com
 */

//////////////////////////////////////////////////////////////////////////////
//寻找一个对象
/////////////////////////////////////////////////////////////////////////////
//n：要寻找的对象的id
//d：包容该对象的父对象，缺省为document
var DW_HIDDEN_EDITER_BEGIN = "hiddenEditer_";
function findObj(n, d) { //v4.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}
var currentActionName;
//////////////////////////////////////////////////////////////////////////////
//得到From中所有元素的ID和值，并组成GET请求中要求的[name]=[value]&...[name]=[value]串
//////////////////////////////////////////////////////////////////////////////
function getAlldata(obj){
    var data = "";
    for (i=0; i<obj.length; i++ ){
        if ( obj(i).type != "submit" && obj(i).type != "reset" && obj(i).type != "button"){
            if( obj(i).type == "select-multiple"){
                for(j=0; j<obj(i).length;j++){
                    if (obj(i).options[j].selected ){
                        data = data+obj(i).id+"="+replaceStr(obj(i).options[j].value)+"&";
                    }
                }
            }else if(obj(i).type =="radio" || obj(i).type =="checkbox"){
                if (obj(i).checked){
                    data=data+obj(i).id+"="+replaceStr(obj(i).value)+"&";
                }
            }else{
              
                data=data+obj(i).id+"="+replaceStr(obj(i).value)+"&";
            }
        }
    }
    return data;
}



//////////////////////////////////////////////////////////////////////////////
//对话框的提交
//////////////////////////////////////////////////////////////////////////////
function dialogSubmit(){
    top.returnValue = getAlldata(eval(unieap.FORM_NAME));
    top.close();
}

//////////////////////////////////////////////////////////////////////////////
//打开模态对话框
//////////////////////////////////////////////////////////////////////////////
function openModalDialog(action,method,para,width,height){
    var url = unieap.WEB_APP_NAME + "/" + action + ".do";
    if(method != null){
        url += "?method=" + method;
    }
    if(para != null){
        url += "&" + para;
    }
    var dialogStyle = "dialogWidth:" + width + ";dialogHeight:" + height + ";center:yes";

    return window.showModalDialog(url,window,dialogStyle);
}


function replaceStr(str)
{
   str = str.replace(/%/g,"%25");
   //str = str.replace(/\+/g,"%2B");   
    str = str.replace(/&/g,"%26");
    //str = str.replace(/\\/g,"&#92;");
    //str = str.replace(/</g,"&#60;");
    //str = str.replace(/>/g,"&#62;");
    //str = str.replace(/\"/g,"&#34;");
    //str = str.replace(/ /g,"&nbsp;");
    
    return str;
}
/**
*@description:      统一的局部刷新请求入口
*@param:            actionName        已配置的action
*@param:            actionMethod      action中的方法
*@param:            getParameter      利用get方法传递的参数
*@param:            postParameter     利用post方法传递的参数
*@param:            isSynch
*@return:           从服务器返回的字符串
*/
//function executeRequest(action,actionMethod,postParameter,isSynch){//modified by hyzou, remove parameter 'getParameter'
function executeRequest(actionName,actionMethod,postParameter,isAsynchronism){
    //判断是否使用局部刷新
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
    //增加局部刷新标示符
    if(flag) 
        strURL += "&isPartlyRefresh=true";
    else
        strURL += "?isPartlyRefresh=true";  
   
    if(postParameter == null) postParameter ="";
    //postParameter=replaceStr(postParameter);    //如果重复替换将会有问题
    //调试信息
    if(findObj("SendMsg")) findObj("SendMsg").innerText = postParameter;
    
    if(isAsynchronism == null) isAsynchronism = false;
    objXMLReq.open("POST", strURL, isAsynchronism);
    objXMLReq.send(postParameter);
    
    var result;
    if(isAsynchronism==false){
            result = objXMLReq.responseText;         
            //调试信息
            if(findObj("RetrieveMsg")) findObj("RetrieveMsg").innerText = result;           
            return result;
     }
}
/**
*@description:      统一的直接请求入口
*@param:            actionName        已配置的action
*@param:            actionMethod      action中的方法
*/
function executeDirectRequest(actionName,actionMethod){
    currentActionName = actionName;
    var strURL = unieap.WEB_APP_NAME + "/" + actionName + ".do";
    var formObj = findObj(unieap.FORM_NAME);
    if(formObj == null) return; 
    //指定action方法
    if(actionMethod != null && actionMethod != ""){
        for (i=0; i<formObj.length; i++ ){
            if ( formObj(i).type == "hidden" && formObj(i).id.toLowerCase() == "method" ){
                formObj(i).value = actionMethod;
                break;
            }
        }  
    }            
    //指定action
    formObj.action = strURL;
    formObj.submit();   
}
//////////////////////////////////////////////////////////////////////////////
//局部刷新请求代理
//////////////////////////////////////////////////////////////////////////////
function proxyRequest(action, method, parameter,isAsynchronism) {
    var objXMLReq = getObjXMLReq();
    var strURL = unieap.WEB_APP_NAME + "/" + action + ".do";
    var flag = false;
    if(method != null && method != ""){
        strURL += "?method=" + method;
        flag = true;
    }
    //if(parameter != null && parameter != ""){
    //    strURL += ("&" + parameter);
    //}
    if (parameter == null) parameter = "";
    
    if(flag)
    	strURL += "&isPartlyRefresh=true";
    else
      strURL += "?isPartlyRefresh=true"; 
    
    //同步'false'和异步'true'判断
    if(!isAsynchronism) isAsynchronism = false;
         
    objXMLReq.open("POST", strURL, isAsynchronism);
    objXMLReq.send(parameter);
    var strResult = objXMLReq.responseText;

    //调试
    //resutFromServer.innerText = strResult;

    //如果是局部刷新，返回内容会明确以"局部刷新："开头。
    //否则说明后台返回的是一个完整的界面。
    if(strResult.indexOf("PartRefresh:") == 0){
        eval(strResult.substring(12));
    }else{
        //先要清理界面所有元素
        document.createElement();
        document.write(strResult);
    }
}

//////////////////////////////////////////////////////////////////////////////
//菜单新增局部刷新请求代理 lixun
//////////////////////////////////////////////////////////////////////////////
function proxyMenuRequest(action, method, parameter) {
   
    var objXMLReq = getObjXMLReq();
    var strURL = unieap.WEB_APP_NAME + "/" + action + ".do";
    var flag = false;
   
    if(method != null && method != ""){
        strURL += "?method=" + method;
        flag = true;
    }
    
    if (parameter == null) parameter = "";
    
    if(flag)
        strURL += "&isPartlyRefresh=true";
    else
      strURL += "?isPartlyRefresh=true"; 
       
    objXMLReq.open("POST", strURL, false);
    objXMLReq.send(parameter);
   
    var strResult = objXMLReq.responseText;
    return strResult;
    
}

//////////////////////////////////////////////////////////////////////////////
//datastore从session中清除，为局部刷新，异步，onbeforeunload时调用
//////////////////////////////////////////////////////////////////////////////
function removeDataStoreFromSession()
{    
    return true;   
}

//////////////////////////////////////////////////////////////////////////////
//检查数据合法性
//////////////////////////////////////////////////////////////////////////////
function checkValue(formObj){
      if(unieap.DEBUG){
        return true;
    }
    
    var obj;
    var form = formObj == null ? findObj(unieap.FORM_NAME): formObj;
   
    for(var i=0;i<form.elements.length; i++){
        
         obj=form[i];
           
          if(obj.isUniEAP==true){
            if(obj.type != "submit" && obj.type != "reset" && obj.type != "button" && obj.id.indexOf(DW_HIDDEN_EDITER_BEGIN) < 0)
                //alert(obj.JSObjName);
                //alert(eapObjsMgr.onvalidate(obj));
               
                if(!(eapObjsMgr.onvalidate(obj))){
                    try{
                        obj.focus();
                    }catch(e){
                    
                    }
                    return false;
                 }
              
                

         }
    }   
    return true;
}


function checkValueChangeID(formObj){
   
    var obj;
    var form = formObj == null ? findObj(unieap.FORM_NAME): formObj;

    for(var i=0;i<form.elements.length; i++){//执行校验每个细粒度组件
      
         obj=form[i];
             
            if(obj.isUniEAP==true){
             if(obj.type != "submit" && obj.type != "reset" && obj.type != "button" && obj.id.indexOf(DW_HIDDEN_EDITER_BEGIN) < 0){
                //alert(obj.JSObjName);
                //alert(eapObjsMgr.onvalidate(obj));
            
                if(!(eapObjsMgr.onvalidate(obj))){//校验某个细粒度组件
                
                    
                    return obj.id
                    break;
               
               }
                 
             }    
            }
   }
   
   return "true";
}


//////////////////////////////////////////////////////////////////////////////
//设置actionMethod
//////////////////////////////////////////////////////////////////////////////
function setActionMethod(actionMethod){
    EAPForm.method.value = actionMethod;
}
//////////////////////////////////////////////////////////////////////////////
//获取xml控件
//return object/null(if exception catched)
//////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////
//用指定的XSL解析xml
// xml XML对象
// href XSL路径
//////////////////////////////////////////////////////////////////////////////
/**
*@description:      服务器返还结果常规处理函数
*@param:            result            局部刷新的返回结果字符串
*/
function commDealResult(result){
    //alert(result);    
  
    if(result == null || result == "UNIEAP_NOTING") return "UNIEAP_NOTING"; 

     if(result.indexOf("<!-- THE NOTE OF SESSION-TIMEOUT FOR PARTREFRESH -->")>=0){            
           window.top.location = window.top.location;
           return "UNIEAP_SESSION_TIMEOUT";
 	 } 
    //如果是定义好了不处理标识，直接显示
   
    if(result.indexOf(unieap.NOT_DEAL_INDENTIFIER) >= 0){
        document.createElement();
        document.write(result);
        return "UNIEAP_NOTING";
    }
                
    //如果是局部刷新，返回内容会明确以"局部刷新："开头。
    if(result.indexOf("局部刷新：") == 0){
   
        eval(result.substring(5));
        return "UNIEAP_NOTING";
    }

    var cmdArr =  result.split(unieap.resultSplit); 

    var cmdKind,cmd;
    var pos;    
    var isError = false;
    for(var i=0; i < cmdArr.length; i++){      
        if(cmdArr[i] == null || cmdArr[i] == "") continue;
        try{
            pos = cmdArr[i].indexOf("=");       
            if(pos < 0){
                 alert("开发人员注意：现在还不能处理"+cmdArr[i]);
                 return "UNIEAP_ERROR";
            }               
            cmdKind = cmdArr[i].substring(0,pos).toUpperCase();         
            cmd = cmdArr[i].substring(pos+1);           
            switch(cmdKind){
                case "ERRORMSG":                     
                    alert("错误信息："+cmd);         
                    isError = true;
                    break;
                case "MESSAGE":
                    alert(cmd);  
                    break;
                case "EXECUTE":
                    eval(cmd);
                    break;
                case "DATAOBJS":                            
                    refreshDataObjs(cmd);
                    break;
                default:
                    alert("开发人员注意：现在还不能处理"+cmdKind+"类型的返回结果" + cmdArr);
                    return "UNIEAP_ERROR";
            }       
        }
        catch(e){
            alert("开发人员注意：执行commDealResult()出错，\n错误信息："+e.message);
            return "UNIEAP_ERROR";
        }
    }
    if(isError) return "UNIEAP_ERROR";
    return "UNIEAP_NOTING";;
}
/**
*@description:      刷新某个dataObjs
*@param:            dataObjs 新的dataObjs字符串
*                   格式: <dataObjs... dwName="name" ...>...</dataObjs>
*/
function refreshDataObjs(dataObjsStr){  
    if(dataObjsStr == null) return; 
    var DWNAME_STRING = "dwName=\"";
    var pos = dataObjsStr.indexOf(DWNAME_STRING);   
    if(pos < 0) return;
    var tmpStr = dataObjsStr.substring(pos+DWNAME_STRING.length);   
    var pos1 = tmpStr.indexOf("\"");        
    var dwName = dataObjsStr.substring(pos+DWNAME_STRING.length,pos1+pos+DWNAME_STRING.length);     
    if(dwManager.getDW(dwName).nameRule.getXmlDiv() == null){
        alert("数据窗口刷新失败：界面上没有数据窗口("+dwName+")");
        return;
    }
    dataWindowRefresh(dwName,dataObjsStr,"dataObjs");
}
/**
*@description 协助局部刷新作forward
*@param forwardName  configed in struts-config.xml
*@param alertMsg   be alerted
*@param executeScript javaScript function generally;
*                     fowarding is stoped when "false" is returned by executeScript
*/
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

//恢复按钮的图片显示
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.style.backgroundImage=x.oSrc;
}
//查找一个html元素
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}
//替换按钮显示的图片
function MM_swapImage() { //v3.0

 var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)

  if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.style.backgroundImage; x.style.backgroundImage ="url("+a[i+2]+")" ;
  }
}

//以图片地址为参数显示图片。
function display_picture(picture_address){
   window.open (picture_address, "newwindow"); 

}
//取得XMLHttpRequest对象,基于AJAX技术
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

