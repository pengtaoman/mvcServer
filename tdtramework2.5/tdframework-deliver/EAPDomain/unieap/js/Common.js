/**
 * @file common.js
 * @desription ���ú���
 * @version 1.0 2003.4.10
 * @author shaosl@neusoft.com
 */

//////////////////////////////////////////////////////////////////////////////
//Ѱ��һ������
/////////////////////////////////////////////////////////////////////////////
//n��ҪѰ�ҵĶ����id
//d�����ݸö���ĸ�����ȱʡΪdocument
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
//�õ�From������Ԫ�ص�ID��ֵ�������GET������Ҫ���[name]=[value]&...[name]=[value]��
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
//�Ի�����ύ
//////////////////////////////////////////////////////////////////////////////
function dialogSubmit(){
    top.returnValue = getAlldata(eval(unieap.FORM_NAME));
    top.close();
}

//////////////////////////////////////////////////////////////////////////////
//��ģ̬�Ի���
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
*@description:      ͳһ�ľֲ�ˢ���������
*@param:            actionName        �����õ�action
*@param:            actionMethod      action�еķ���
*@param:            getParameter      ����get�������ݵĲ���
*@param:            postParameter     ����post�������ݵĲ���
*@param:            isSynch
*@return:           �ӷ��������ص��ַ���
*/
//function executeRequest(action,actionMethod,postParameter,isSynch){//modified by hyzou, remove parameter 'getParameter'
function executeRequest(actionName,actionMethod,postParameter,isAsynchronism){
    //�ж��Ƿ�ʹ�þֲ�ˢ��
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
    //���Ӿֲ�ˢ�±�ʾ��
    if(flag) 
        strURL += "&isPartlyRefresh=true";
    else
        strURL += "?isPartlyRefresh=true";  
   
    if(postParameter == null) postParameter ="";
    //postParameter=replaceStr(postParameter);    //����ظ��滻����������
    //������Ϣ
    if(findObj("SendMsg")) findObj("SendMsg").innerText = postParameter;
    
    if(isAsynchronism == null) isAsynchronism = false;
    objXMLReq.open("POST", strURL, isAsynchronism);
    objXMLReq.send(postParameter);
    
    var result;
    if(isAsynchronism==false){
            result = objXMLReq.responseText;         
            //������Ϣ
            if(findObj("RetrieveMsg")) findObj("RetrieveMsg").innerText = result;           
            return result;
     }
}
/**
*@description:      ͳһ��ֱ���������
*@param:            actionName        �����õ�action
*@param:            actionMethod      action�еķ���
*/
function executeDirectRequest(actionName,actionMethod){
    currentActionName = actionName;
    var strURL = unieap.WEB_APP_NAME + "/" + actionName + ".do";
    var formObj = findObj(unieap.FORM_NAME);
    if(formObj == null) return; 
    //ָ��action����
    if(actionMethod != null && actionMethod != ""){
        for (i=0; i<formObj.length; i++ ){
            if ( formObj(i).type == "hidden" && formObj(i).id.toLowerCase() == "method" ){
                formObj(i).value = actionMethod;
                break;
            }
        }  
    }            
    //ָ��action
    formObj.action = strURL;
    formObj.submit();   
}
//////////////////////////////////////////////////////////////////////////////
//�ֲ�ˢ���������
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
    
    //ͬ��'false'���첽'true'�ж�
    if(!isAsynchronism) isAsynchronism = false;
         
    objXMLReq.open("POST", strURL, isAsynchronism);
    objXMLReq.send(parameter);
    var strResult = objXMLReq.responseText;

    //����
    //resutFromServer.innerText = strResult;

    //����Ǿֲ�ˢ�£��������ݻ���ȷ��"�ֲ�ˢ�£�"��ͷ��
    //����˵����̨���ص���һ�������Ľ��档
    if(strResult.indexOf("PartRefresh:") == 0){
        eval(strResult.substring(12));
    }else{
        //��Ҫ�����������Ԫ��
        document.createElement();
        document.write(strResult);
    }
}

//////////////////////////////////////////////////////////////////////////////
//�˵������ֲ�ˢ��������� lixun
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
//datastore��session�������Ϊ�ֲ�ˢ�£��첽��onbeforeunloadʱ����
//////////////////////////////////////////////////////////////////////////////
function removeDataStoreFromSession()
{    
    return true;   
}

//////////////////////////////////////////////////////////////////////////////
//������ݺϷ���
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

    for(var i=0;i<form.elements.length; i++){//ִ��У��ÿ��ϸ�������
      
         obj=form[i];
             
            if(obj.isUniEAP==true){
             if(obj.type != "submit" && obj.type != "reset" && obj.type != "button" && obj.id.indexOf(DW_HIDDEN_EDITER_BEGIN) < 0){
                //alert(obj.JSObjName);
                //alert(eapObjsMgr.onvalidate(obj));
            
                if(!(eapObjsMgr.onvalidate(obj))){//У��ĳ��ϸ�������
                
                    
                    return obj.id
                    break;
               
               }
                 
             }    
            }
   }
   
   return "true";
}


//////////////////////////////////////////////////////////////////////////////
//����actionMethod
//////////////////////////////////////////////////////////////////////////////
function setActionMethod(actionMethod){
    EAPForm.method.value = actionMethod;
}
//////////////////////////////////////////////////////////////////////////////
//��ȡxml�ؼ�
//return object/null(if exception catched)
//////////////////////////////////////////////////////////////////////////////
function getXMLActiveObj(){
    try{
        return new ActiveXObject("MSXML2.DOMDocument.4.0");
    }catch(e){
        if(confirm("���Ļ����ϵ�XML�������汾̫�ͣ����Ƿ��������������")){
            document.location = unieap.WEB_APP_NAME + "/unieap/pages/datawindow/MsXML4.0.jsp";
        }
        return null;
    }
}
//////////////////////////////////////////////////////////////////////////////
//��ָ����XSL����xml
// xml XML����
// href XSL·��
//////////////////////////////////////////////////////////////////////////////
/**
*@description:      ����������������洦����
*@param:            result            �ֲ�ˢ�µķ��ؽ���ַ���
*/
function commDealResult(result){
    //alert(result);    
  
    if(result == null || result == "UNIEAP_NOTING") return "UNIEAP_NOTING"; 

     if(result.indexOf("<!-- THE NOTE OF SESSION-TIMEOUT FOR PARTREFRESH -->")>=0){            
           window.top.location = window.top.location;
           return "UNIEAP_SESSION_TIMEOUT";
 	 } 
    //����Ƕ�����˲������ʶ��ֱ����ʾ
   
    if(result.indexOf(unieap.NOT_DEAL_INDENTIFIER) >= 0){
        document.createElement();
        document.write(result);
        return "UNIEAP_NOTING";
    }
                
    //����Ǿֲ�ˢ�£��������ݻ���ȷ��"�ֲ�ˢ�£�"��ͷ��
    if(result.indexOf("�ֲ�ˢ�£�") == 0){
   
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
                 alert("������Աע�⣺���ڻ����ܴ���"+cmdArr[i]);
                 return "UNIEAP_ERROR";
            }               
            cmdKind = cmdArr[i].substring(0,pos).toUpperCase();         
            cmd = cmdArr[i].substring(pos+1);           
            switch(cmdKind){
                case "ERRORMSG":                     
                    alert("������Ϣ��"+cmd);         
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
                    alert("������Աע�⣺���ڻ����ܴ���"+cmdKind+"���͵ķ��ؽ��" + cmdArr);
                    return "UNIEAP_ERROR";
            }       
        }
        catch(e){
            alert("������Աע�⣺ִ��commDealResult()����\n������Ϣ��"+e.message);
            return "UNIEAP_ERROR";
        }
    }
    if(isError) return "UNIEAP_ERROR";
    return "UNIEAP_NOTING";;
}
/**
*@description:      ˢ��ĳ��dataObjs
*@param:            dataObjs �µ�dataObjs�ַ���
*                   ��ʽ: <dataObjs... dwName="name" ...>...</dataObjs>
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
        alert("���ݴ���ˢ��ʧ�ܣ�������û�����ݴ���("+dwName+")");
        return;
    }
    dataWindowRefresh(dwName,dataObjsStr,"dataObjs");
}
/**
*@description Э���ֲ�ˢ����forward
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

//�ָ���ť��ͼƬ��ʾ
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.style.backgroundImage=x.oSrc;
}
//����һ��htmlԪ��
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}
//�滻��ť��ʾ��ͼƬ
function MM_swapImage() { //v3.0

 var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)

  if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.style.backgroundImage; x.style.backgroundImage ="url("+a[i+2]+")" ;
  }
}

//��ͼƬ��ַΪ������ʾͼƬ��
function display_picture(picture_address){
   window.open (picture_address, "newwindow"); 

}
//ȡ��XMLHttpRequest����,����AJAX����
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

