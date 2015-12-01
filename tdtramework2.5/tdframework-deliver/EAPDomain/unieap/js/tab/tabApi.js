
//����ָ����TAB
function disableTab(tab,id){
    tab = getTab(tab);
    var item = tab.getTabItemByIndex(id);
    item.setEnabled(false);
}
//�ָ�ָ����TAB
function undisableTab(tab,id){
    tab = getTab(tab);
    var item = tab.getTabItemByIndex(id);
    item.setEnabled(true);
}
//����ָ����TAB
function unvisibleTab(tab,id){
    tab = getTab(tab);
    var item = tab.getTabItemByIndex(id);
    item.setVisible(false);
}
//ʹָ����TAB����
function visibleTab(tab,id){
    tab = getTab(tab);
    var item = tab.getTabItemByIndex(id);
    item.setVisible(true);
}
//�õ���ǰ���TAB
function getActiveTab(tab){
    tab = getTab(tab);
    return tab.getActiveTab();
}
//���û��TAB
function setActiveTab(tab,id){
    tab = getTab(tab);
    tab.showTab(id);
}
//�õ���ǰ�TAB��URL
function getActiveTabUrl(tab){
    tab = getTab(tab);
    return tab.getActiveTabItem().url;
}
//�õ�ָ��TAB��URL
function getTabUrl(tab,id){
    tab = getTab(tab);
    return tab.getTabItemByIndex(id).url;
}
//��̬�趨��ǰ�TAB��HEIGHT
function setActiveTabHeight(tab,height){
    tab = getTab(tab);
    tab.getActiveTabItem().changeHeight(height);
    tab.getActiveTabItem().height = height;
}
//�õ���ǰ�TAB��DOCUMENT������
function getActiveTabDocument(tab){
    tab = getTab(tab);
    return  tab.getActiveTabDocument();
}
//�õ�TAB�ĸ���
function getItems(tab){
    tab = getTab(tab);
    return tab.getItems().length;
}
//���ݵ�ǰ��ҳ��λ���Զ��ҵ�TAB�������
function getTab(tab){
   var tabObj = eval("parent.parent." + tab);
   if(!tabObj){
        tabObj = eval("frames[0]." + tab);
   }
   if(!tabObj){
        tabObj = eval("window." + tab);
   }
   return tabObj;
}
//�õ�ָ��TAB������
function getDocuementByIndex(tab,id) {
   return getTab(tab).getTabDocuementByIndex(id);
}
//���TAB��ĳ����Ԫ�ص�ֵ
function getTabElementValue(tab,tabId,elementId){
    var obj = getDocuementByIndex(tab,tabId);
    var element=eval("obj.all." + elementId);
    return getValue(element);
}
//����TAB��ĳ����Ԫ�ص�ֵ
function setTabElementValue(tab,tabId,elementId,value){
    var obj = getDocuementByIndex(tab,tabId);
    var element=obj.getElementById(elementId);
    setValue(element, value);
}
//ȡ����������ĳ����Ԫ�ص�ֵ
function getContainerElementValue(id){
    var element = parent.parent.document.getElementById(id);
    return getValue(element);
}
//������������ĳ����Ԫ�ص�ֵ
function setContainerElementValue(id,value){
    var element = parent.parent.document.getElementById(id);
    setValue(element,value);
}
//���ñ������ֵ
function setValue(obj,value){
    if(obj.type=="checkbox" || obj.type=="radio")
        obj.checked = value;
    else
         obj.value = value;
}
//���ر������ֵ
function getValue(obj){
    if(obj){
        if(obj.length){
            for(var i=0; i<obj.length; i++){
                if(obj[i] && obj[i].checked){
                return obj[i].value;
                }
            }
        }
        else{
            return obj.value;
        }
    }
}
//����TAB��URL
function setUrl(tab,id,url){
    tab = getTab(tab).getTabItemByIndex(id);
    tab.setUrl(url);
    tab.url = url;
}
//�ֶ�����ָ����TABҳ
function loadTab(tab,id){
    tab = getTab(tab);
    tab.loadTab(id);
}
//ˢ��ָ����TAB
function reloadTab(tab,id){
    tab = getTab(tab).getTabItemByIndex(id);
    tab.getWindow().location.reload();
}
//�趨FORM�ύ��ָ����TAB
function setFormTarget(tab,id,obj){
    tab = getTab(tab);
    obj.target = tab.getTabItemByIndex(id).name;
}
//����ҳ�������Զ�����ҳ��߶�
function autoFitTabHeight(tab){
  setActiveTabHeight(tab,document.body.scrollHeight+26);
}




//�ύ��1
function collectParams(name){
   collectIframsParams(name,false);
}


function collectIframsParams(name,reConstraction){
    if(reConstraction=="undefined"){
       reConstraction=false;
    }
 
    
    var result="";
    if(typeof name=="undefined"||name==''){
      
         var outeriframes =document.frames;
       
         for(var j=0;j<outeriframes.length;j++){
          
              var iframes = outeriframes(j).document.frames;
              
              for(var i=0;i<iframes.length;i++){//????iframe
              
                 
                 if(iframes(i).document.forms&&iframes(i).document.forms.length>0){
           
                  if(reConstraction){
                        var elements = iframes(i).document.forms[0];
                        result+="\n"+elements.innerHTML;
                       
                    }else{
                     var elements = iframes(i).document.forms[0].elements;
                      for(var p=0;p<elements.length;p++){
                           var element = elements[p];
                           if(element.tagName.toLowerCase()=="input"){
                                var type = element.type.toLowerCase();
                                if(type=="button"||type=="submit"||type=="reset"||type=="image") continue;
                                if((type=="checkbox"||type=="radio")&&!element.checked) continue;
                           }
                           if(element.name==null||element.name=="") continue;
                           result+="&"+element.name+"="+stringFilter(element.value);
                      }
                   }
               }
             
             }
               ///////////////////////////��??��????��?///////////////////////////////
              var exForm=outeriframes(j).document.forms;
                if(reConstraction){
                 for(var p=0;p<exForm.length;p++){
                   result+="\n"+exForm[p].innerHTML;
                 }
                }else{
                  for(var p=0;p<exForm.length;p++){
                     var ex=exForm[p];
                       for(var i=0;i<ex.length;i++){
                        var element = ex[i];
                          if(element.tagName.toLowerCase()=="iframe") continue;
                           if(element.tagName.toLowerCase()=="input"){
                                var type = element.type.toLowerCase();
                                if(type=="button"||type=="submit"||type=="reset"||type=="image") continue;
                                if((type=="checkbox"||type=="radio")&&!element.checked) continue;
                           }
                           if(element.name==null||element.name=="") continue;
                           result+="&"+element.name+"="+stringFilter(element.value);
                       }
                 } 
              
              
              
               }   
           }
       }
       
       
       
       else{
   
           var outeriframes =  document.frames;
           var iframes="undefined";
           var exForm;
         for(var j=0;j<outeriframes.length;j++){
       
          if(outeriframes(j).name==name){
           iframes = outeriframes(j).document.frames;
           exForm=outeriframes(j).document.forms;
           }
         }
         
         
         
         if(iframes=="undefined"){
           alert('?��?��??????'+name+'????iframe,??��?????');
           return "";
         }
           for(var i=0;i<iframes.length;i++){
        
          if(iframes(i).document.forms&&iframes(i).document.forms.length>0){
                     if(reConstraction){
                          result+="\n"+iframes(i).document.forms[0].innerHTML;
                             continue;
                        }
               
                    
                      var elements = iframes(i).document.forms[0].elements;
                      for(var j=0;j<elements.length;j++){
                           var element = elements[j];
                           if(element.tagName.toLowerCase()=="input"){
                                var type = element.type.toLowerCase();
                                if(type=="button"||type=="submit"||type=="reset"||type=="image") continue;
                                if((type=="checkbox"||type=="radio")&&!element.checked) continue;
                           }
                           if(element.name==null||element.name=="") continue;
                           result+="&"+element.name+"="+stringFilter(element.value);

                      }
          }
        }
       
           ///////////////////////////��??��????��?///////////////////////////////
           
              for(var p=0;p<exForm.length;p++){
              
                  var ex=exForm[p];
                  if(reConstraction){
                       result+="\n"+ex.innerHTML;
                       continue;
                  }
                  for(var i=0;i<ex.length;i++){
                        var element = ex[i];
                          if(element.tagName.toLowerCase()=="iframe") continue;
                           if(element.tagName.toLowerCase()=="input"){
                                var type = element.type.toLowerCase();
                                if(type=="button"||type=="submit"||type=="reset"||type=="image") continue;
                                if((type=="checkbox"||type=="radio")&&!element.checked) continue;
                           }
                            if(element.name==null||element.name=="") continue;
                           result+="&"+element.name+"="+stringFilter(element.value);
                  }
              } 
       
       }   
     if(reConstraction){
        
        return(parseScript(result));
     }
       
       return result;

}



function parseScript(arg){

   var pos = arg.indexOf("<SCRIPT");

   while(pos>-1){

      arg =
arg.substring(0,pos)+arg.substring(arg.indexOf("/SCRIPT>",pos)+"/SCRIPT>".length);

      pos = arg.indexOf("<SCRIPT");

   }

   return arg;

}
/**

 *�ַ���ת��

 */

function stringFilter(arg){

   return arg;

}
//�ƶ�

function nextPage(tabname,foc){
   goSomePage(tabname,1,1,foc);
  
   
}
function frontPage(tabname,foc){
   goSomePage(tabname,1,0,foc);
}


function goSomePage(tabname,num,direct,foc){//direct1Ϊ��0Ϊǰ,focΪ�л�ҳ�󽹵㵽�Ǹ�ҳ�����
 
  if(parent.manager.getTab(tabname)==null){
    //alert("�޷���ת");
    return;
  };
  var item=parent.objTab.currentItem;
   var aVisibleItemNumbers=0;
    for (var i = 0; i <parent.objTab.aItems.length; i++) {
        if (parent.objTab.aItems[i].visible){
         aVisibleItemNumbers++;
        }
    }    
   num=num%aVisibleItemNumbers;
 
  var len=("tabitem"+tabname).length
  var number=parseInt(item.id.substr(len));
   var su;
 if(direct==1){
      
        number+=num;
    
  }else{
       for(var p=0;p<num;p++){
        number-=1;
       }
  }
  
  
    
    
  if(number<100){
     number=100+aVisibleItemNumbers-1-(100-number-1);
  }
  
  if(number>=100+aVisibleItemNumbers){
     number=number-aVisibleItemNumbers;
  }
 
  su="__tab_area"+tabname+(parseInt(number)-100);
  var id="tabitem"+tabname+number;
  var isSe=false;//�Ƿ����Զ���
  var canDo=false;//�¸�ҳ��û��Ȩ��
  
   for (var i = 0; i <parent.objTab.aItems.length; i++) {
        if (parent.objTab.aItems[i].visible && parent.objTab.aItems[i].enabled){
          if(parent.objTab.aItems[i].id==id){
           canDo=true;
               if(parent.objTab.aItems[i].url==""){
                    isSe=true;
               }
          }
        }
    }  
    
    
 if(canDo){

  parent.document.all(id + "_text").fireEvent("onmousedown");

  if(parent.objTab.tabMode==1){
    focusSome(foc,su,isSe);
    return;
  }
//////////////////////////////����۽����ǩû����ʾ������
  var cp=-1;//�ƶ��ĸ���
  var leftPo=parent.objTab.scrollPosition+1;//Ŀǰ��ʾ�����ǩ���
  var displayCo=parent.objTab.displaycountwithbuttion;//����ʾ�ı�ǩ����
  var aimPo=number-100;//Ҫ�����ı�ǩ�����
  var maxPo=leftPo+displayCo-1;

  if(aimPo>=leftPo && aimPo<=maxPo){
    
      focusSome(foc,su,isSe);
      return;
  } 


  if(aimPo>maxPo){//��
 
     cp=aimPo-maxPo;
  
     for(var k=0;k<cp;k++){
       parent.document.all("__tab_scroll_right"+parent.objTab.controlid).fireEvent("onclick");
     }
   }else if(leftPo>aimPo){//��
     cp=leftPo-aimPo;
for(var k=0;k<cp;k++){
       parent.document.all("__tab_scroll_left"+parent.objTab.controlid).fireEvent("onclick");
     }
  }
 
//////////////////////////////////////////
   focusSome(foc,su,isSe);
  }
}


function focusSome(textid,su,isSe){//suĿ����iframe��id isSe���Ƿ��Զ���


 if(parent.document.all(su).contentWindow.document.readyState!="complete"  && !isSe){
  
     setTimeout("focusSome('"+textid+"','"+su+"')",50);
     return;
   }
   
    

  if(textid==''||textid==undefined){

   return 
  }

   var itemname=parent.objTab.currentItem.name;
   var iframe=parent.document.all(itemname);
   iframe.blur();
   if(isSe){
     setTimeout("parent.document.all('"+itemname+"').contentWindow.document.all('"+textid+"').focus()",50);
   }else{

   iframe.contentWindow.document.all(textid).focus();
   }

 
}


function getSomePageID(tabname,num,direct){//direct1Ϊ��0ΪǰifparyloadΪ���Ŀ��ҳ��û�м����Ƿ����

  if(parent.manager.getTab(tabname)==null){
    //alert("�޷���ת");
    return;
  };
  var item=parent.objTab.currentItem;
   var aVisibleItemNumbers=0;

    for (var i = 0; i <parent.objTab.aItems.length; i++) {
        if (parent.objTab.aItems[i].visible){
         aVisibleItemNumbers++;
        }
        
    }    
   num=num%aVisibleItemNumbers;
 
  var len=("tabitem"+tabname).length

  var number=parseInt(item.id.substr(len));

   var su;
 if(direct==1){
      
        number+=num;
    
  }else{
       for(var p=0;p<num;p++){
        number-=1;
       }
  }
  
  

  if(number<100){
     number=100+aVisibleItemNumbers-1-(100-number-1);
  }
  
  if(number>=100+aVisibleItemNumbers){
     number=number-aVisibleItemNumbers;
  }
 
  su="__tab_area"+tabname+(parseInt(number)-100);

  if(!parent.document.all(su).contentWindow.document.body.innerHTML ){
      
  
             
           parent.document.all(su).src=parent.objTab.aItems[parseInt(number)-100].url;

            
   
   }
  
  return su;
 
}

function getValue(value){

  if(parent.document.all(value).readyState!='complete'){
     
    window.setTimeOut(getValue(value),500);
  } else{    

  return parent.document.all(value).contentWindow.document
  }
}



function focusFormOutSide(text,tabname,isSe,textid){//text,tab��ʾ������Ӧtaglib��text����;
                           //tabname��tab��������Ӧname���ԣ�isSe�Ƿ�Ϊ�Զ��壻textidĿ��tabҳ�۽�Ԫ��id.

  var doc=document.all(tabname).contentWindow;


   for (var i = 0; i <doc.objTab.aItems.length; i++) {
  
        if (doc.objTab.aItems[i].text==text){
         var len=("tabitem"+tabname).length
         var number=parseInt(doc.objTab.aItems[i].id.substr(len));
         var frameid="__tab_area"+tabname+(parseInt(number)-100);
         doc.document.all(doc.objTab.aItems[i].id + "_text").fireEvent("onmousedown");
         
         focusSomeFromOut(tabname,textid,frameid,isSe,doc);
         break;
        }
        
    }  


  
}
 
function focusSomeFromOut(tabname,textid,su,isSe){//suĿ����iframe��id isSe���Ƿ��Զ���

  var doc=document.all(tabname).contentWindow;


 if(doc.document.all(su).contentWindow.document.readyState!="complete"  && !isSe){

     setTimeout("focusSomeFromOut('"+tabname+"','"+textid+"','"+su+"',"+isSe+")",50);
     return;
   }
   
    

  if(textid==''||textid==undefined){

   return 
  }

   var itemname=doc.objTab.currentItem.name;
   
   var iframe=doc.document.all(itemname);

   iframe.blur();
   if(isSe){

     setTimeout("doc.document.all('"+itemname+"').contentWindow.document.all('"+textid+"').focus()",50);
   }else{

   iframe.contentWindow.document.all(textid).focus();
   }

 
} 

//checkOnTabSubmit(errid)
var errid=''; 

function checkBeforeSubmit(tabname,array){//��֧���Զ���HTML

   if(!checkLoad(tabname,array)){
      return false;
   }
   
    errid=''; 
    var doc=document.all(tabname).contentWindow;
    var jsmethod=doc.objTab.submitCheckJSMethod;
  
    if(jsmethod!=""){
        try{
         if(!eval(jsmethod+"('"+tabname+"');")){
            return false;
         }
        }catch(e){
           alert(jsmethod+"����ִ�д���ԭ���ǣ�"+e.message);
           return false;
        }
    }
    for (var i = 0; i <doc.objTab.aItems.length; i++) {
        
        
           if(doc.objTab.aItems[i].active){
                 if(!containIt(doc.objTab.aItems[i].iframeid,array)){
                          break;
                 } 
                 var check=doSubmitCheck(tabname,doc.objTab.aItems[i],doc);
                
                 if(!check){
                   return false;
                 }
                 break;
           }
    }
   
    for (var i = 0; i <doc.objTab.aItems.length; i++) {
     
       if(!doc.objTab.aItems.active){
         if(containIt(doc.objTab.aItems[i].iframeid,array)){
            var check=doSubmitCheck(tabname,doc.objTab.aItems[i],doc);
                 if(!check){
                   return false;
                 }
         }        
       }  
    }
      
     return true;
}  

function doSubmitCheck(tabname,item,doc){
      var len=("tabitem"+tabname).length
         var number=parseInt(item.id.substr(len));
         var frameid="__tab_area"+tabname+(parseInt(number)-100);
         if(item.autoCheckEAP){
           
        
           try{
           var autocheck=doc.document.all(frameid).contentWindow.checkValueChangeID();
           if(autocheck!="true"){
               doc.document.all(item.id + "_text").fireEvent("onmousedown");
               focusSomeFromOut(tabname,autocheck,frameid,false,doc);
               alert(item.text+"У��ʧ��");
               return false;
           }
           }catch(e){
           }
         
         
         
         }
         
    
         try{
           doc.document.all(frameid).contentWindow.checkOnTabSubmit();
     
           if(errid!=''){
           var resultid=errid;
           doc.document.all(item.id + "_text").fireEvent("onmousedown");
           focusSomeFromOut(tabname,resultid,frameid,false,doc);
           errid=''
           alert(item.text+"У��ʧ��");
           return false;
           }
         
         }catch(e){
    
         }
       return true;

}


 
function setIDForTop(id){
 parent.parent.errid=id;
}
function setCanPassForTop(flag){


 parent.cpass=flag;

}








function isAllLoadWithIframeid(tabname){//����û�м��ص�id 
 var doc=document.all(tabname).contentWindow;


   for (var i = 0; i <doc.objTab.aItems.length; i++) {
      try{
        if(doc.document.all(doc.objTab.aItems[i].iframeid).src=="about:blank"){
          return (doc.objTab.aItems[i].iframeid);
        }
      }catch(e){
      }  
   }  
  return "";
}

function getTextWithIframeid(tabname,id){


var doc=document.all(tabname).contentWindow;


   for (var i = 0; i <doc.objTab.aItems.length; i++) {
      try{
        if(doc.objTab.aItems[i].iframeid==id){
          return (doc.objTab.aItems[i].text);
        }
      }catch(e){
      }  
   }  
  return "";

}
/**************************************************************************************************************/
/**************************************************************************************************************/
/**************************************************************************************************************/
/**************************************************************************************************************/
/***************************************************************************************************************/
/**************************************************************************************************************/
/*********************************Э���ύAPI***************************************************************/
/**************************************************************************************************************/
/**************************************************************************************************************/
var  betweenDWandOther="unieap_tab_dw_other";//���ݴ��ںͷ����ݴ��ڷָ����Ҫ���̨һ��
var Tab_RESPONSE_DW="unieap_tab_dws";//���ݴ���֮��ָ�
var Tab_RESPONSE_DW_ID="tab_response_dw_id";//��λdwid
var TAB_OTHER_ERR="TAB_OTHER_ERR";//�����ݴ��ڲ��ָ���ʧ��
var RESPONSE_SEPARATOR="RESPONSE_SEPARATOR";
var Tab_RESPONSE_OTHER="unieap_tab_other";

/**************************************************************************************************************/
/*********************************��Ӧ*****************************************************************************/

//��Ӧ
function upData(postParameter,tabName,actionName,actionMethod){
 

  
  var flag=true;
  if(postParameter != ""){	
     
   	  var result =executeRequest(actionName,actionMethod,postParameter);   
       
   	  var temp=result.split(Tab_RESPONSE_DW);
      var othersString="";
   	  
   	  for(var i=0;i<temp.length;i++){
   	     if(temp[i]==null||temp[i]==""){
   	        continue
   	     }
   	     var handlePart=temp[i]
   	     if(handlePart.indexOf(Tab_RESPONSE_DW_ID)!=-1){
   	      if(! doResponseForDw(handlePart,tabName)){
   	         flag=false;
   	      }
   	     }else{
   	       var others=handlePart.split(RESPONSE_SEPARATOR);
   	       for (var j=0;j<others.length;j++){
   	            if(others[j]==null||others[j]==""){
   	                continue
   	             }
   	             var otherHandle=others[j];
   	             if(otherHandle.indexOf(Tab_RESPONSE_OTHER)!=-1){
   	             othersString=othersString+otherHandle.substr(Tab_RESPONSE_OTHER.length);
   	             }else{
   	              if(commDealResultForTab(otherHandle)=="UNIEAP_ERROR"){
   	                 flag=false;
   	              }
   	             }
   	       }
   	        
   	     }
   	   }
   	   if(othersString!=""){
   	      if(!checkAndDoResponseForOthers(othersString,tabName)){
   	        return false
   	      }
   	   }
   	  
   	 
   	/*  if(hasDataWindow && hasOthers){
   	     var dw_other=result.split(betweenDWandOther);
  
   	     if( !doResponseForDw(dw_other[0],tabName)){//�������ݴ���
          flag=false;
         }
         if(flag){
            if( !checkAndDoResponseForOthers(dw_other[1],tabName)){
               return false;
            }
            else{
            return true;
            }
         }
      
   	  }else if(hasDataWindow && !hasOthers){
   	       doResponseForDw(result,tabName)
   	  }else if(!hasDataWindow && hasOthers){
   	        checkAndDoResponseForOthers(result,tabName)
   	  }*/
 }
 return flag;
 }
 
 
function doResponseForDw(pre,tabName){//��Ӧ�������ݴ���

var flag=true;//���ݴ��ڸ��³ɹ���ʶ


var result="";
var iframeid="";

   var idAndcontent=pre.split(Tab_RESPONSE_DW_ID);
   if(idAndcontent.length!=2){
       return false;
   }
   var iframeid=idAndcontent[0].split(':')[0];
 
   result=idAndcontent[1];




var cmdArr =  result.split(unieap.resultSplit); 

  
      var currentContent=document.all(tabName).contentWindow.document.all(iframeid).contentWindow;
      //��������Ӧ�ĸ��²�������Ҫ�ı�
      var currentManager=currentContent.dwManager;
      
      var cuf=currentContent.commDealResult(cmdArr[0]);//��Ҫˢ�����ݴ��ڵ��������Բ�����commDealResultForTab(result)
      if(flag){
        flag=cuf;
        if(flag=="UNIEAP_ERROR"){
         flag=false;
        }else{
         flag=true;
        }
      }
return flag;
}
function commDealResultForTab(result){
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
                 alert(cmdArr[i]);
                 continue;
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
                    alert("������commDealResultForTab�������ݴ��ڵ����ݻ���ʾ");                         
                    //refreshDataObjs(cmd);
                    break;
                default:
                    alert(cmdArr);
                    return "UNIEAP_ERROR";
            }       
        }
        catch(e){
            alert("������Աע�⣺ִ��commDealResultForTab()����\n������Ϣ��"+e.message);
            return "UNIEAP_ERROR";
        }
    }
    if(isError) return "UNIEAP_ERROR";
    return "UNIEAP_NOTING";
}


function checkAndDoResponseForOthers(others,tabName){//�����ݴ��ڸ����û���д

 return doResponseForOthers(others,tabName);
 
}


function doResponseForOthers(others,tabName){//�����ݴ��ڸ����û���д
  return true;
}


 function containIt(id,containArray){//�ж�id�Ƿ��ڸ�������
 
 if(containArray==null){
   return false;
 }
  for(var i=0;i<containArray.length;i++){
    if(containArray[i]==id){
      return true;
    }
  }
  return false;
}
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////�ύ��////////////////////////////////////////////////////////
 //Э���ύ��
 function getStringContainSome(name,containArray){
    
     if(containArray==null||containArray.length==0){                
     
        return "";
     }
      var outeriframes =document.frames;
         var iframes="undefined";
        var result="";//���ص��ַ���
         for(var j=0;j<outeriframes.length;j++){
        
          if(outeriframes(j).name==name){
           
           iframes = outeriframes(j).document.frames;
          
           break;
           }
         }
         
         if(iframes=="undefined"){
           alert('û������Ϊ'+name+'��tab');
           return "";
         }
      
      for(var i=0;i<iframes.length;i++){
          
          if(!containIt(iframes[i].name,containArray)){
            continue;
          } 
       
          if(iframes(i).document.forms&&iframes(i).document.forms.length>0){
                      var elements = iframes(i).document.forms[0].elements;
                      for(var j=0;j<elements.length;j++){
                           var element = elements[j];
                           if(element.tagName.toLowerCase()=="input"){
                                var type = element.type.toLowerCase();
                                if(type=="button"||type=="submit"||type=="reset"||type=="image") continue;
                                if((type=="checkbox"||type=="radio")&&!element.checked) continue;
                           }
                           if(element.name==null||element.name=="") continue;
                           result+=iframes[i].name+element.name+"="+stringFilter(element.value)+"&";
                     }
          }
         
        }
       
        return result.substr(0,result.length-1);
 }

//Э�����ݴ����ύ��
function getDWString(tabName,names){//
  
  if(names==null||names.length==0){
     
       return "";
    
  }
  


  return getDWParameters(tabName,names);

}

function getDefaultNames(tabName,tabidArray){

 var names=new Array();
 try{
  for(var i=0;i<tabidArray.length;i++){
     var ifr=getTabIFrameObj(tabName,tabidArray[i]);
     names[names.length]=ifr.contentWindow.dwManager.getAllDW()[0].name;
     
  }
 }catch(e){
   alert("���Ĭ�����ݴ���ʱ���ִ���"+e.message);
   return new Array();
 } 
 return names 
}


function checkDwNameAndTabID(ifr,name){//У��iframe���Ƿ���������Ϊname�����ݴ���
  var dws=ifr.contentWindow.dwManager.getAllDW();
  for(var i=0;i<dws.length;i++){
    if(dws[i].name!=name){
      return false;
    }
  }
  return true
}

Array.prototype.contain=contain;

function contain(tar){
   for(var i=0;i<this.length;i++){
      if(this[i]==tar){
        return true;
      }
   }
   return false;
}

function getDWParameters(tabName,dwNameArr){//����������ݴ��ڵ��ύ�����̶���Ҫ�ı䣬dwNameArr���ݴ��������飬tabArray���Ӧ��tabҳ
	
	var postParameter ="";//ʵ���ύ��ֵ
	var tabdw='';//��ʾ���ݴ�������tabҳ�Ķ�Ӧ��ϵ
	//�������ݲ�Ҫ�ı�

	for(var i=0; i < dwNameArr.length; i++){	
	 
	  var tabAndDWNames=getTabAndDataWindowName(tabName,dwNameArr[i]);
	  if(tabAndDWNames==null){
	   
	      return "";
	  }
	  var tab=tabAndDWNames[0];
	 if( tab.contentWindow.findObj("dwNames")){
	     
	       tab.contentWindow.findObj("dwNames").value="";
	 }
	}
	
	var vistedarray=new Array();
	
	for(var i=0; i < dwNameArr.length; i++){	
	 
	  var tabAndDWNames=getTabAndDataWindowName(tabName,dwNameArr[i]);
	  if(tabAndDWNames==null){
	   
	      return "";
	  }
	  var tab=tabAndDWNames[0];
	  
	  var dwNameArray=tabAndDWNames[1];
   
    var currentContent=tab.contentWindow;
      var currentManager=currentContent.dwManager;
      var has=false;
      if( vistedarray.contain(tab)){
	    
	    has=true;
	  }else{
	    vistedarray[vistedarray.length]=tab;
	     currentManager.clearAllParameters()
	  }
	
      
     
     
	  if(currentContent.isCheckAll == null ||currentContent.isCheckAll == "undefined") currentContent.isCheckAll = false;
    	if(!currentManager.assambleDWDataForTab(dwNameArray,currentContent.isCheckAll,tab.name,tabName)) return "EAP_DataWindow_CHECK_ERR";
	//�ռ�Form�еĲ���	
	  if(has){
	    continue;
	  }
	
	 if(postParameter ==""){
	 
     postParameter =currentContent.getAlldata(currentContent.document.all(currentContent.unieap.FORM_NAME));   
     
     }else{
 
      postParameter = postParameter+currentContent.getAlldata(currentContent.document.all(currentContent.unieap.FORM_NAME));   
     }
  }
  
   return postParameter;
}

function getTabAndDataWindowName(tabName,dwNameAtrr){
 var index=dwNameAtrr.indexOf(':')
 if(index==-1){
   alert('�������ݴ����ύ��������Ҫ��tab��iframeid+:+���ݴ�����,ע�����ݴ�������tab��iframeid������ð��'); 
   return null;
 }
 var array=dwNameAtrr.split(':');
 if(array.length!=2){
   alert('�������ݴ����ύ��������Ҫ��tab��iframeid+:+���ݴ�����,ע�����ݴ�������tab��iframeid������ð��'); 
   return null;
 }
 var dwName=array[1];
 var dwIframe=getTabIFrameObj(tabName,array[0]);
 var result=new Array();
 result[result.length]=dwIframe;
 if(dwName.indexOf(';')!=-1){
     var dwNames=dwName.split(';');
     
     result[result.length]=dwNames;
     
 }else{
 var dwNames=new Array();
 dwNames[dwNames.length]=dwName
 result[result.length]=dwNames;

 }

 return result;
}


////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////�ύ�͹���////////////////////////////////////////////////////////////////////
//���ĳ��tabҳ��iframe����
function getTabIFrameObj(tabName,iframeid){
   return document.all(tabName).contentWindow.document.all(iframeid);
}
//���ĳ��tabҳ��iframe�����window����
function getCertainPageWindow(tabName,iframeid){
  return document.all(tabName).contentWindow.document.all(iframeid).contentWindow;
}


function tabSubmit(tabName,dws,others,actionName,actionMethod){//tab�������ݴ���ifamres,�����ݴ���iframes�����ݴ�����

   var dwfs=getDWframeid(dws);
   
   if(checkLoad(tabName,dwfs) && checkLoad(tabName,others)){
      
   }else{
     return false;
   }
   
   var postParameter=assemblePostString(tabName,dws,others);
   if(postParameter=="EAP_DataWindow_CHECK_ERR"){
       return false;
   }
 
 try{
 return upData(postParameter,tabName,actionName,actionMethod);
 }catch(e){
  alert(e.message);
  return false;
 }
}

function getDWframeid(dws){
  var array=new Array();
  for(var i=0;i<dws.length;i++){
    array[array.length]=dws[i].split(":")[0];
   }
   return array;
}

function checkLoad(tabName,tabArray){

  if(tabArray==null){
     return true;
  }
  
  for(var i=0;i<tabArray.length;i++){
   
    if(getTabIFrameObj(tabName,tabArray[i]).src=='about:blank'){
      alert("�ύʱ��Ҫ\""+getTextWithIframeid(tabName,tabArray[i])+"\",��δ����,�뱣֤������");
      return false;
    }
   
    if(getTabIFrameObj(tabName,tabArray[i]).readyState!="complete"){
      alert("�ύʱ��Ҫ\""+getTextWithIframeid(tabName,tabArray[i])+"\",�����ڼ��أ����Ժ��ύ");
      return false;
    }
  }
  return true;
}

function assemblePostString(tabName,dws,others){



  var dwString=getDWString(tabName,dws);
  if(dwString=="EAP_DataWindow_CHECK_ERR"){
      return "EAP_DataWindow_CHECK_ERR"
  }
  

  var otherString=getStringContainSome(tabName,others);

   if(otherString==""){
     otherString=getStringContainSome(tabName,getDWStringIframes(dws));
  }else{
   otherString=otherString +'&'+getStringContainSome(tabName,getDWStringIframes(dws)); 
  }
 
  
  return dwString+otherString;
}

function getDWStringIframes(dws){
  
   var result=new Array();
   for(var i=0;i<dws.length;i++){
        result[i]=dws[i].split(':')[0];
      
   }
   return result
   
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////