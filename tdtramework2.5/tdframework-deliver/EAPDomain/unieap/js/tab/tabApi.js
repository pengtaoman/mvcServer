
//禁用指定的TAB
function disableTab(tab,id){
    tab = getTab(tab);
    var item = tab.getTabItemByIndex(id);
    item.setEnabled(false);
}
//恢复指定的TAB
function undisableTab(tab,id){
    tab = getTab(tab);
    var item = tab.getTabItemByIndex(id);
    item.setEnabled(true);
}
//隐藏指定的TAB
function unvisibleTab(tab,id){
    tab = getTab(tab);
    var item = tab.getTabItemByIndex(id);
    item.setVisible(false);
}
//使指定的TAB可用
function visibleTab(tab,id){
    tab = getTab(tab);
    var item = tab.getTabItemByIndex(id);
    item.setVisible(true);
}
//得到当前活动的TAB
function getActiveTab(tab){
    tab = getTab(tab);
    return tab.getActiveTab();
}
//设置活动的TAB
function setActiveTab(tab,id){
    tab = getTab(tab);
    tab.showTab(id);
}
//得到当前活动TAB的URL
function getActiveTabUrl(tab){
    tab = getTab(tab);
    return tab.getActiveTabItem().url;
}
//得到指定TAB的URL
function getTabUrl(tab,id){
    tab = getTab(tab);
    return tab.getTabItemByIndex(id).url;
}
//动态设定当前活动TAB的HEIGHT
function setActiveTabHeight(tab,height){
    tab = getTab(tab);
    tab.getActiveTabItem().changeHeight(height);
    tab.getActiveTabItem().height = height;
}
//得到当前活动TAB的DOCUMENT的引用
function getActiveTabDocument(tab){
    tab = getTab(tab);
    return  tab.getActiveTabDocument();
}
//得到TAB的个数
function getItems(tab){
    tab = getTab(tab);
    return tab.getItems().length;
}
//根据当前的页面位置自动找到TAB类的引用
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
//得到指定TAB的引用
function getDocuementByIndex(tab,id) {
   return getTab(tab).getTabDocuementByIndex(id);
}
//获得TAB中某个表单元素的值
function getTabElementValue(tab,tabId,elementId){
    var obj = getDocuementByIndex(tab,tabId);
    var element=eval("obj.all." + elementId);
    return getValue(element);
}
//设置TAB中某个表单元素的值
function setTabElementValue(tab,tabId,elementId,value){
    var obj = getDocuementByIndex(tab,tabId);
    var element=obj.getElementById(elementId);
    setValue(element, value);
}
//取得容器窗体某个表单元素的值
function getContainerElementValue(id){
    var element = parent.parent.document.getElementById(id);
    return getValue(element);
}
//设置容器窗体某个表单元素的值
function setContainerElementValue(id,value){
    var element = parent.parent.document.getElementById(id);
    setValue(element,value);
}
//设置表单对象的值
function setValue(obj,value){
    if(obj.type=="checkbox" || obj.type=="radio")
        obj.checked = value;
    else
         obj.value = value;
}
//返回表单对象的值
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
//设置TAB的URL
function setUrl(tab,id,url){
    tab = getTab(tab).getTabItemByIndex(id);
    tab.setUrl(url);
    tab.url = url;
}
//手动加载指定的TAB页
function loadTab(tab,id){
    tab = getTab(tab);
    tab.loadTab(id);
}
//刷新指定的TAB
function reloadTab(tab,id){
    tab = getTab(tab).getTabItemByIndex(id);
    tab.getWindow().location.reload();
}
//设定FORM提交到指定的TAB
function setFormTarget(tab,id,obj){
    tab = getTab(tab);
    obj.target = tab.getTabItemByIndex(id).name;
}
//根据页面内容自动调整页面高度
function autoFitTabHeight(tab){
  setActiveTabHeight(tab,document.body.scrollHeight+26);
}




//提交串1
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
               ///////////////////////////×??¨????·?///////////////////////////////
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
           alert('?í?ó??????'+name+'????iframe,??·?????');
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
       
           ///////////////////////////×??¨????·?///////////////////////////////
           
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

 *字符串转码

 */

function stringFilter(arg){

   return arg;

}
//移动

function nextPage(tabname,foc){
   goSomePage(tabname,1,1,foc);
  
   
}
function frontPage(tabname,foc){
   goSomePage(tabname,1,0,foc);
}


function goSomePage(tabname,num,direct,foc){//direct1为后0为前,foc为切换页后焦点到那个页面组件
 
  if(parent.manager.getTab(tabname)==null){
    //alert("无法跳转");
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
  var isSe=false;//是否是自定义
  var canDo=false;//下个页有没有权限
  
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
//////////////////////////////解决聚焦后标签没有显示的问题
  var cp=-1;//移动的个数
  var leftPo=parent.objTab.scrollPosition+1;//目前显示最左标签序号
  var displayCo=parent.objTab.displaycountwithbuttion;//能显示的标签个数
  var aimPo=number-100;//要跳到的标签的序号
  var maxPo=leftPo+displayCo-1;

  if(aimPo>=leftPo && aimPo<=maxPo){
    
      focusSome(foc,su,isSe);
      return;
  } 


  if(aimPo>maxPo){//右
 
     cp=aimPo-maxPo;
  
     for(var k=0;k<cp;k++){
       parent.document.all("__tab_scroll_right"+parent.objTab.controlid).fireEvent("onclick");
     }
   }else if(leftPo>aimPo){//左
     cp=leftPo-aimPo;
for(var k=0;k<cp;k++){
       parent.document.all("__tab_scroll_left"+parent.objTab.controlid).fireEvent("onclick");
     }
  }
 
//////////////////////////////////////////
   focusSome(foc,su,isSe);
  }
}


function focusSome(textid,su,isSe){//su目标子iframe的id isSe是是否自定义


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


function getSomePageID(tabname,num,direct){//direct1为后0为前ifparyload为如果目标页还没有加载是否加载

  if(parent.manager.getTab(tabname)==null){
    //alert("无法跳转");
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



function focusFormOutSide(text,tabname,isSe,textid){//text,tab显示名，对应taglib的text属性;
                           //tabname是tab容器名对应name属性；isSe是否为自定义；textid目标tab页聚焦元素id.

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
 
function focusSomeFromOut(tabname,textid,su,isSe){//su目标子iframe的id isSe是是否自定义

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

function checkBeforeSubmit(tabname,array){//不支持自定义HTML

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
           alert(jsmethod+"方法执行错误！原因是："+e.message);
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
               alert(item.text+"校验失败");
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
           alert(item.text+"校验失败");
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








function isAllLoadWithIframeid(tabname){//返回没有加载的id 
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
/*********************************协议提交API***************************************************************/
/**************************************************************************************************************/
/**************************************************************************************************************/
var  betweenDWandOther="unieap_tab_dw_other";//数据窗口和非数据窗口分割符，要与后台一致
var Tab_RESPONSE_DW="unieap_tab_dws";//数据窗口之间分割
var Tab_RESPONSE_DW_ID="tab_response_dw_id";//定位dwid
var TAB_OTHER_ERR="TAB_OTHER_ERR";//非数据窗口部分更新失败
var RESPONSE_SEPARATOR="RESPONSE_SEPARATOR";
var Tab_RESPONSE_OTHER="unieap_tab_other";

/**************************************************************************************************************/
/*********************************响应*****************************************************************************/

//响应
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
  
   	     if( !doResponseForDw(dw_other[0],tabName)){//更新数据窗口
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
 
 
function doResponseForDw(pre,tabName){//响应更新数据窗口

var flag=true;//数据窗口更新成功标识


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
      //下面是相应的更新操作，不要改变
      var currentManager=currentContent.dwManager;
      
      var cuf=currentContent.commDealResult(cmdArr[0]);//需要刷新数据窗口的数据所以不能用commDealResultForTab(result)
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
                 alert(cmdArr[i]);
                 continue;
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
                    alert("不能在commDealResultForTab处理数据窗口的数据回显示");                         
                    //refreshDataObjs(cmd);
                    break;
                default:
                    alert(cmdArr);
                    return "UNIEAP_ERROR";
            }       
        }
        catch(e){
            alert("开发人员注意：执行commDealResultForTab()出错，\n错误信息："+e.message);
            return "UNIEAP_ERROR";
        }
    }
    if(isError) return "UNIEAP_ERROR";
    return "UNIEAP_NOTING";
}


function checkAndDoResponseForOthers(others,tabName){//非数据窗口更新用户重写

 return doResponseForOthers(others,tabName);
 
}


function doResponseForOthers(others,tabName){//非数据窗口更新用户重写
  return true;
}


 function containIt(id,containArray){//判断id是否在该数据中
 
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
/////////////////////////提交串////////////////////////////////////////////////////////
 //协议提交串
 function getStringContainSome(name,containArray){
    
     if(containArray==null||containArray.length==0){                
     
        return "";
     }
      var outeriframes =document.frames;
         var iframes="undefined";
        var result="";//返回的字符串
         for(var j=0;j<outeriframes.length;j++){
        
          if(outeriframes(j).name==name){
           
           iframes = outeriframes(j).document.frames;
          
           break;
           }
         }
         
         if(iframes=="undefined"){
           alert('没有名字为'+name+'的tab');
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

//协议数据窗口提交串
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
   alert("获得默认数据窗口时出现错误！"+e.message);
   return new Array();
 } 
 return names 
}


function checkDwNameAndTabID(ifr,name){//校验iframe中是否真有名字为name的数据窗口
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

function getDWParameters(tabName,dwNameArr){//获得所有数据窗口的提交串，固定不要改变，dwNameArr数据窗口名数组，tabArray相对应的tab页
	
	var postParameter ="";//实际提交的值
	var tabdw='';//表示数据窗口名和tab页的对应关系
	//以下内容不要改变

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
	//收集Form中的参数	
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
   alert('定义数据窗口提交串不符合要求：tab的iframeid+:+数据窗口名,注意数据窗口名和tab的iframeid不能有冒号'); 
   return null;
 }
 var array=dwNameAtrr.split(':');
 if(array.length!=2){
   alert('定义数据窗口提交串不符合要求：tab的iframeid+:+数据窗口名,注意数据窗口名和tab的iframeid不能有冒号'); 
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
//////////////////////////////////////////提交和工具////////////////////////////////////////////////////////////////////
//获得某个tab页的iframe对象
function getTabIFrameObj(tabName,iframeid){
   return document.all(tabName).contentWindow.document.all(iframeid);
}
//获得某个tab页的iframe对象的window对象
function getCertainPageWindow(tabName,iframeid){
  return document.all(tabName).contentWindow.document.all(iframeid).contentWindow;
}


function tabSubmit(tabName,dws,others,actionName,actionMethod){//tab名，数据窗口ifamres,非数据窗口iframes，数据窗口名

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
      alert("提交时需要\""+getTextWithIframeid(tabName,tabArray[i])+"\",它未加载,请保证它加载");
      return false;
    }
   
    if(getTabIFrameObj(tabName,tabArray[i]).readyState!="complete"){
      alert("提交时需要\""+getTextWithIframeid(tabName,tabArray[i])+"\",它正在加载，请稍后提交");
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