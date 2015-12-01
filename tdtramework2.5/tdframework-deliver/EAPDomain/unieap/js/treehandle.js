var CHECKBOX_NAME_PRE= "checked_node_";

var REMOVEFLAGS="removeflags";
var leftClick="baseLeftClick";


  
   var CONTENTTYPE_OPENFOLDER=1000;
   var CONTENTTYPE_CLOSEFOLDER=1001;
   var CONTENTTYPE_NONEFOLDER=1002;





function calculateDeepAndState(treeFlag,id){

   var lastChildrenQueue='';
   var obj=document.all(id)  //.parentid
   var count=0;
   var parentid=document.all(id).parentid;
  
   while(obj!=null&&obj.parentid.substr(treeFlag.length).toLowerCase()!='null'){
      count++
      
      if(obj.isLastChildren.toLowerCase()=='true'){
      lastChildrenQueue=lastChildrenQueue+'true;';
      }else{
      lastChildrenQueue=lastChildrenQueue+'false;';
      }
    
       obj=document.all(obj.parentid);
       
   }

  return parentid+';'+lastChildrenQueue;
}
function saveTreeNode(treeFlag,id,para){//返回为ok为成功否则为后台信息。
  
    return executeRequest('eaptree','saveTreeNode','saveNode='+id+'&treeFlag='+treeFlag+'&'+para);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function onclickforexpand(){//扩展
    
     var imgid=window.event.srcElement.id;
    

       
     var id=imgid.substr(imgid.indexOf(':')+1);
 
     var div=document.all(id);
     clickforexpand(id,div);
}


function getCustomPara(treeFlag,id){
   try{
 
    var para=customDefineparas(treeFlag,id);
    
    if(!para){
      return "";
    }
    
   }catch(e){
  
     return "";
   }
   if(para==""){
      return "";
   
   }
   
   
   if(para.substr(0,1)!="&"){
       alert("错误！cuostmDefineparas方法必须返回以'&'打头的字符串");
        return "";
   }
   
 
   
   return para;

}

function clickforexpand(id,div){



   
     div.nodeState='expand';
     var treeFlag=div.treeFlag;
     var needCheckBox=div.needCheckBox;
      
     if(needCheckBox=='true'){
   
        var checkornot=document.all('checkbox:'+id).checked;
        if(div.isExpand=='false'){
      var uu=document.all('checkbox:'+id).hasChanged;
       document.all(id).outerHTML=executeRequest('eaptree','partyFreshTree','expand='+id.substr(treeFlag.length)+'&treeFlag='+treeFlag+'&nodeDeepandSate='+calculateDeepAndState(treeFlag,id)+getCustomPara(treeFlag,id));
         restoreOriginClickState(treeFlag);
         document.all('checkbox:'+id).checked=checkornot;
         //document.all('checkbox:'+id).hasChanged="true";
         
          changeCheckboxState('checkbox:'+id,"true");
           if(uu=="true"){
           
           selectChildrenWithID(treeFlag,id);
           }
        }else{
        
          var children=div.children;
          for(i=1;i<children.length;i++){
             children[i].style.display='';
           }
         
           changeToExpand(id);
        }
      
      }else{
      
        if(div.isExpand=='false'){
          
          document.all(id).outerHTML=executeRequest('eaptree','partyFreshTree','expand='+id.substr(treeFlag.length)+'&treeFlag='+treeFlag+'&nodeDeepandSate='+calculateDeepAndState(treeFlag,id)+getCustomPara(treeFlag,id));
          restoreOriginClickState(treeFlag);
        
        }else{
          
          var children=div.children;
          for(i=1;i<children.length;i++){
             children[i].style.display='';
           }
          
           changeToExpand(id);
        }
      
     }
      
}
////////////////////////////////////////////////////////////////////////////
function onclickforcollapse(){//收拢
     
      var imgid=window.event.srcElement.id;
     
      var id=imgid.substr(imgid.indexOf(':')+1);
      var div=document.all(id);
      div.nodeState='collapse';
      var children=div.children;
      for(i=1;i<children.length;i++){
             children[i].style.display='none';
      }
     
      changeToCollapse(id);
 }
////////////////////////////////////////////////////////////////////////// 
 function changeToCollapse(id){//变成待扩展
  
     var div=document.all(id)
     var treeFlag=div.treeFlag;
     
     if(div.isLastChildren=='true'){
     
      //span.children['imgNodeSpan:'+id].innerHTML= " <img  id='imgNode:"+id+"' onclick=javascript:onclickforcollapse('"+id+"')   src='"+document.all('collapsedLastNodeContent').value+"' border='0' />";
     document.all('imgNode:'+id).outerHTML="<img  id='imgNode:"+id+"' onclick=javascript:onclickforexpand()   src='"+document.all(treeFlag+'collapsedLastNodeContent').value+"' border='0' />";
     }else{
      // span.children['imgNodeSpan:'+id].innerHTML= " <img  id='imgNode:"+id+"' onclick=javascript:onclickforcollapse('"+id+"')   src='"+document.all('collapsedMidNodeContent').value+"' border='0' />";
      document.all('imgNode:'+id).outerHTML=" <img  id='imgNode:"+id+"' onclick=javascript:onclickforexpand()   src='"+document.all(treeFlag+'collapsedMidNodeContent').value+"' border='0' />";
     }
    
     document.all('imgFolder:'+id).src=contentImg(treeFlag,CONTENTTYPE_CLOSEFOLDER,div) ;  //document.all(treeFlag+'closedFolderContent').value;
  
 }
 
 
 function contentImg(treeFlag,contenttype_int,div){
 
   var contenttype;
   var contentstring;
    
   switch(contenttype_int){
       case CONTENTTYPE_OPENFOLDER:contenttype="openFolder";contentstring="openFolderContent";break;
       case CONTENTTYPE_CLOSEFOLDER:contenttype="closeFolder";contentstring="closedFolderContent";break;
       case CONTENTTYPE_NONEFOLDER:contenttype="noneFolder";contentstring="nonFolderContent";break;
       default:alert("无"+contenttype+"类型");return;
   
   }
 
 
    var map=getGoupMapObj(treeFlag);
    var pureID=getPureId(treeFlag,div.id);
    var type=div.nodetype;
    
    if(map[pureID]!=null && map[pureID][contenttype]!=null && map[pureID][contenttype]!=""){
        return map[pureID][contenttype];
    }
    if(type){
      if(map[type]!=null && map[type][contenttype]!=null && map[type][contenttype]!=""){
        return map[type][contenttype];
      }
    }
    
    return document.getElementById(treeFlag+contentstring).value;
 }
 
 function getGoupMapObj(treeFlag){
    return window[treeFlag+"GroupMap"];
 }
 
 function getPureId(treeFlag,nodeid){
    return nodeid.substr(treeFlag.length);
 }
 
 
 //////////////////////////////////////////////////////////////////////////////////
  function changeToExpand(id){//变成待收拢
 
     var div=document.all(id);
     var treeFlag=div.treeFlag;
     var span=div.children[0];
    
     if(div.isLastChildren=='true'){
      
       document.all('imgNode:'+id).outerHTML="<img  id='imgNode:"+id+"' onclick=javascript:onclickforcollapse()   src='"+document.all(treeFlag+'expandedLastNodeContent').value+"' border='0' />";
     
     }else{
     
       document.all('imgNode:'+id).outerHTML="<img  id='imgNode:"+id+"' onclick=javascript:onclickforcollapse()   src='"+document.all(treeFlag+'expandedMidNodeContent').value+"' border='0' />";
      
     }
    
      document.all('imgFolder:'+id).src=contentImg(treeFlag,CONTENTTYPE_OPENFOLDER,div);//document.all(treeFlag+'openFolderContent').value;  
 }
 
 
 ////////////////////////////////////////////////////////////////////////////////////
 function removetreefromsession(){//清session中无用信息
  var treeFlag='';
  var flags=document.all(REMOVEFLAGS);
  if(flags.length){
  for(i=0;i<flags.length;i++){
       treeFlag=treeFlag+flags[i].value+'!';
  }
  }else{
  treeFlag=treeFlag+flags.value+'!';
  }
 
  try{
  
  var ss= executeRequest('eaptree','removeTreeFromSession','remove=true'+'&treeFlag='+treeFlag);
  }catch(e){
  }
/*  var treeFlag='';
   for(i=0;i<document.all.length;i++){
    if(document.all[i].id.indexOf('eaptreeforcomm:')!=-1){
       treeFlag=treeFlag+document.all[i].id.substr(document.all[i].id.indexOf(':')+1)+'!';
     }
   }
   try{
  var ss= executeRequest('eaptree','removeTreeFromSession','remove=true'+'&treeFlag='+treeFlag);
  }catch(e){
  }*/
 }
 
 
/////////////////////////////////////////////////////////////////////////////////////////////////
  
  
  function showTip(flag,id){//在页面加载的时候已经加载了对应的var oPopup = window.createPopup();//显示tip
    //alert(getLength(text));
   if(id=='undefined'||id==''||id=='null'){
        oPopup.hide();
        return;
   } 
   var text=document.all(id).nodetooltip;
   if(text=='undefined'||text==''||text=='null'){
   oPopup.hide();
   return
   }
   
   if(flag){
    oPopupBody.innerHTML ="<table border='0' cellspacing='0' cellpadding='0' bgcolor='#FF9933'><tr><td width='800' height='600' align='left' valign='top'>"+text+"</td></tr></table>"
    oPopup.show(x=document.body.scrollLeft+event.clientX,y=document.body.scrollTop+event.clientY ,getLength(text)*10-5,20, document.body);
   }
   else{
   oPopup.hide();
   }                                             //var oPopupBody = oPopup.document.body;
  }
  
////////////////////////////////////////////////////////////////////////////  
  function hiddenTip(){
	showTip(false)
  }
 /////////////////////////////////////////////////////////////////////
 function getLength(theelement)//???????????
{//获取长度
  if(theelement=='undefined'||theelement==''||theelement=='null'){
      return 0;
  }
  var length=0;

  text="abcdefghijklmnopqrstuvwxyz1234567890 ABCDEFGHIJKLMNOPQRSTUVWXYZ,/()!@$%&\#*~.;'_-";
  for(i=0;i<=theelement.length-1;i++)
  {
     char1=theelement.charAt(i);
     index=text.indexOf(char1);
    if(index==-1)
   {
       length=length+2;
     
    } else{
       length=length+1; 
    
    }
  }

  return length;
}
//////////////////////////////////////////////////////////////
 function noRight(){ return false;} 
 function restoreRight(){document.oncontextmenu='';}//onmouseleave
 
 
 var displaytextColor="black"

 /*
*修改结点的背景色
*/
function modifyNodeStyle(nodeId,color){
  var textNode=document.all("eaptreea:"+nodeId);

  if(textNode){
     textNode.style.color=displaytextColor;
     textNode.style.backgroundColor=color;
  }

   

}
/*
*清空结点的背景色
*/
function clearNodeStyle(nodeId){
   if(nodeId==null){
   return;
   }
   var textNode=document.getElementById("eaptreea:"+nodeId);
   if(textNode){
      textNode.style.color="";
     textNode.style.backgroundColor="";
   }
}


function rightDisplay(treeFlag,id){
   clearLeftDisplay(treeFlag,null);
   clearRightDisplay(treeFlag,id);
   modifyNodeStyle(id,getRightColor(treeFlag));
}

function leftDisplay(treeFlag,id){
   clearLeftDisplay(treeFlag,id);
   clearRightDisplay(treeFlag,null);
  
   modifyNodeStyle(id,getLeftColor(treeFlag));
}

function clearRightDisplay(treeFlag,id){//在节点id上清除，id最为最前节点
     var originIDRight=window[treeFlag+"originIDRight"];
     clearNodeStyle(originIDRight);
     window[treeFlag+"originIDRight"]=id;
}

function clearLeftDisplay(treeFlag,id){//在节点id上清除，id最为最前节点
 var originIDLeft=window[treeFlag+"originIDLeft"];
 clearNodeStyle(originIDLeft);
  window[treeFlag+"originIDLeft"]=id;
}

function  restoreOriginClickState(treeFlag){//恢复原来已选颜色
       if(window[treeFlag+"originIDRight"]){
        rightDisplay(treeFlag,window[treeFlag+"originIDRight"]);
        return;
       }
       if(window[treeFlag+"originIDLeft"]){
       leftDisplay(treeFlag,window[treeFlag+"originIDLeft"]);
       return;
       }
       if(window[treeFlag+'searchArray']){//恢复搜索结果颜色
       
       var ss=window[treeFlag+'searchArray'];
          for(var i=0;i<ss.length;i++){
             var nodeId=ss[i];
             try{
              modifyNodeStyle(nodeId,getSearchColor(treeFlag));
             }catch(e){
             
             }
           }
       
       
       }
       
      // alert("错误！左右键颜色相关信息丢失无法恢复");

}




function baseLeftClick(treeFlag,id){//id是不带treeFlag的节点id
   
	  leftDisplay(treeFlag,treeFlag+id);
}

function rightClick(id) {

 
 
   document.oncontextmenu=noRight;
   
  
   
   
   tempid=id;
   
   var treeFlag=document.all(tempid);
    
   if(treeFlag.length){
  
        for(var i=0;i<treeFlag.length;i++){
         
           if(treeFlag[i].treeFlag){
            var aa=treeFlag[i];
            treeFlag=aa;
        
            break;
           }
        }
   }

   treeFlag=treeFlag.treeFlag;

   rightDisplay(treeFlag,id);
   
   
   
   
   
   if(document.all(treeFlag+'readOnly').value=='true'){
      document.oncontextmenu='';
      return
   }
   x=document.body.scrollLeft+event.clientX; 
     y=document.body.scrollTop+event.clientY; 

	   if ((x+window.fw_menu_0.menuWidth)>250)
	   {	
	    	x=x-window.fw_menu_0.menuWidth;		
	   }
	   if ((y+(window.fw_menu_0.menuItemHeight * window.fw_menu_0.items.length)) > window.document.body.clientHeight)
	   {	
		    y=y-(window.fw_menu_0.menuItemHeight * window.fw_menu_0.items.length);
	   }
     window.FW_showMenu(window.fw_menu_0,x,y);
      return false;     
}
////////////////////////////////////////////////////
function fwLoadMenus() {

  if (window.fw_menu_0) return;
  window.fw_menu_0 = new Menu("root",59,21,"Georgia, Times New Roman, Times, serif",14,"#000000","#ffffff","#cccccc","#000084");
  fw_menu_0.addMenuItem("增加",'add_node_pre()');
  fw_menu_0.addMenuItem("删除",'delete_node_pre()');
  fw_menu_0.addMenuItem("修改",'modify_node_pre()');
  fw_menu_0.hideOnMouseOut=true;
  fw_menu_0.writeMenus();
} // fwLoadMenus()

 /*
<div  id='theFirmId' isLastChildren='true' isSelected='true' isExpand='false' hasChildren='false' parentid='New...'>
<table border='0' cellspacing='0' cellpadding='0'><tr>
<td> <img border='0' src='/eapdomain/example/images/eaptree/blankSpace.gif'></td>
<td>  <img border='0' src='/eapdomain/example/images/eaptree/verticalLine.gif'></td>
<td>  <img border='0' src='/eapdomain/example/images/eaptree/verticalLine.gif'></td>


<td><img id='imgNode:theFirmId' border='0' src='/eapdomain/example/images/eaptree/noChildrenLastNode.gif'>
<img  id='imgFolder:theFirmId' border='0' src='/eapdomain/example/images/eaptree/nonFolder.gif'></td>

<td><input type='checkbox'  id='checkbox:theFirmId' value='checkbox:theFirmId'checked/></td>


<td align='top'><a id='eaptreea:theFirmId' href='eaptree.do?method=begin&?select=theFirmId' onclick=';' oncontextmenu=rightClick('theFirmId'); 
onmouseenter=showTip('true',''); onmouseleave=hiddenTip('false','');><div><font 
style='Font-Size: 12px;'><b>The Firm</b></font></div></a></td>
</tr>
</table>
</div>
       */
       
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////      
function add_node_pre(){
   var divforuser=document.all(tempid);
   var addid="";
   var yid=tempid;
   
   
   var treeFlag=divforuser.treeFlag;
   clearRightDisplay(treeFlag,null);
   clearLeftDisplay(treeFlag,null);
  
   
   if(userAddPre(divforuser)){
    addid=add_node();
   }else{
  
   alert('增加失败');
   }
   document.oncontextmenu='';
   userAddEnd(addid,divforuser);
   
   
   rightDisplay(treeFlag,yid);
   
}  

function userAddEnd(addid,divforuser){

}

function userDeleteEnd(isSuccess,divforuser){

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function delete_node_pre(){
  var divforuser=document.all(tempid);
  var flag=true;
   if(userDeletePre(divforuser)){
  flag=delete_node();
   }else{
 flag=false;
   alert('删除失败');
   }
   document.oncontextmenu='';
  userDeleteEnd(flag,tempid)
} 





function userAddPre(divforuser){
     return true;
}

function userDeletePre(divforuser){
   return true;
} 
   
 /////////////////////////////////////////////////////////////////     
function  getExtentedAddPara(userdiv){
  return "&parentnodetype="+userdiv.nodetype;
}
  
       
function add_node(){

 var treeFlag=document.all(tempid).treeFlag;
var addid="";
var level=document.all(tempid).level;

if(level!=-1){
  level=parseInt(level)+1;
}






var extendString="&level="+level+getExtentedAddPara(document.all(tempid));

 if(document.all(tempid).hasChildren=='true'){//在文件夹中增加一个接点
   var re=executeRequest('eaptree','partyFreshTreeForAddHaveChildren','add='+tempid+'&treeFlag='+treeFlag+'&mode='+document.all(treeFlag+'mode').value+extendString); 
   var array=re.split('%');
 
     if(document.all(tempid).isExpand=='false'){
      if(array[0]=='OK'){
        if(document.all(tempid).nodeState=='collapse'){
        document.all( "imgNode:"+tempid).fireEvent("onclick");
        return array[1];
        }
       }else{
       alert("增加时发生错误");
        return addid;
       }
    
    }
    if(array[0]=='OK'){
 
   if(array[2]){
  // alert(array[2]);
   }else{
   alert("错误！无新增类型返回信息");
 
   }
    handleForAddHaveChildren(array[1],array[2]);
    addid=array[1];
  
    }else{
       alert("增加时发生错误");
    }
   }
  
  else{//把原来的结点放在一个文件中
   var re=executeRequest('eaptree','partyFreshTreeForAddNoChildren','add='+tempid+'&treeFlag='+treeFlag+'&mode='+document.all(treeFlag+'mode').value+extendString); 
   var array=re.split('%');
   if(array[0]=='OK'){
   
   if(array[2]){
      //alert(array[2]);
   }else{
       alert("错误！无新增类型返回信息");
  
   }
    handleForAddNoChildren(array[1],array[2]);
    addid=array[1];
    }else{
    alert("增加时发生错误");
    }
  }
  if(document.all(tempid).nodeState=='collapse'){
   document.all( "imgNode:"+tempid).fireEvent("onclick");
  }
  return addid
}
///////////////////////////////////////////////////////////////////////
var defaultNodeObject="";
function getDefaultNodeObject(){
  if(defaultNodeObject!=""){
        return defaultNodeObject;
  }
  var result="";
  var obj=document.all(tempid).nodeobject;
  var array=obj.split(SPLITOBJS);
  for(var i=0;i<array.length;i++){
         var temp=array[i].split(SPLITOBJSKEYANDVALUE);
         if(temp[0]==null || temp[0]==""){
             continue;
         }
         result=result+temp[0]+SPLITOBJSKEYANDVALUE+"null"+SPLITOBJS;
  }
  defaultNodeObject=result;

  return result;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function handleForAddHaveChildren(idser,newType){//为当前结点(有孩子结点且已经加载)克隆一个可用结点并做一些改变   
   
    if(!newType || newType=="null"){
     newType="";
    }

    var checkvalue=idser;
    var divT=document.all(tempid).children[1].cloneNode(true);
    divT.nodeState='collapse';
    var treeFlag=document.all(tempid).treeFlag;
     divT.id=treeFlag+idser
      divT.nodename=idser;
     divT.hasChildren='false';
     divT.isLastChildren='false';
     divT.isSelected='false';
     divT.isExpand='false';
     divT.parentid=tempid;
     divT.nodevalue=idser;
     divT.nodetooltip='';
     divT.nodeobject=getDefaultNodeObject();
     divT.nodetype=newType;
    if(divT.level!=-1){

      divT.level=parseInt(divT.level);
      
    }
     if(document.all(treeFlag+'mode').value.toLowerCase()=='allload'){
        divT.isExpand='true';
     }
    divT.innerHTML=divT.children[0].outerHTML;//去掉被克隆的孩子结点
    idser=treeFlag+idser;
    var tempchild=divT.children[0].all;//孩子div的table

   var jsMethodForOnclick=document.all(treeFlag+'jsMethodForOnclick').value;
   
      for(i=0;i<tempchild.length;i++){
       if(tempchild[i].id.indexOf('imgNodeTd:')!=-1){
            
            tempchild[i].id='imgNodeTd:'+idser;
            
            continue;
        }
     
       if(tempchild[i].id.indexOf('imgNode')!=-1){
            tempchild[i].id='imgNode:'+idser;
            tempchild[i].src=document.all(treeFlag+'noChildrenMidNodeContent').value;
            continue;
         }
         if(tempchild[i].id.indexOf('imgFolder')!=-1){
           tempchild[i].id='imgFolder:'+idser;
           tempchild[i].src=contentImg(treeFlag,CONTENTTYPE_NONEFOLDER,divT);
        
           continue;
         }
         if(tempchild[i].id.indexOf('eaptreea:')!=-1){
           tempchild[i].id='eaptreea:'+idser;
            tempchild[i].title='';
         
      
          tempchild[i].oncontextmenu="rightClick('"+idser+"')";
          tempchild[i].onclick=document.all(treeFlag+'textonclick').value+";"+leftClick+"('"+treeFlag+"','"+idser.substr(treeFlag.length)+"');"+jsMethodForOnclick+"('"+treeFlag+"','"+idser.substr(treeFlag.length)+"');";
          
           continue;
         }
         
         
         if(tempchild[i].id.indexOf('checkbox:')!=-1){
            tempchild[i].id='checkbox:'+idser;
            tempchild[i].value=checkvalue;
           tempchild[i].checked=false;
           continue;
         }
        
         if(i==(tempchild.length-1)){
         
           tempchild[i].parentElement.id="nodeText:"+treeFlag+idser.substr(treeFlag.length)
           tempchild[i].innerText=idser.substr(treeFlag.length);
           break;
         }
     
       }
    
       var tempIN=document.all(tempid).children[0].outerHTML+divT.outerHTML;
       
       for(i=1;i<document.all(tempid).children.length;i++){
        
         tempIN=tempIN+document.all(tempid).children[i].outerHTML;
      }
    
       document.all(tempid).innerHTML=tempIN;
       
       
         var targetid=tempid;
         var tempName='eaptreea:'+targetid;
       if(document.all(tempName).oncontextmenu==null){
         document.all(tempName).oncontextmenu=new Function("rightClick('"+targetid+"')");
         document.all(tempName).onclick=new Function(document.all(treeFlag+'textonclick').value+";"+leftClick+"('"+treeFlag+"','"+targetid.substr(treeFlag.length)+"');"+jsMethodForOnclick+"('"+treeFlag+"','"+targetid.substr(treeFlag.length)+"');");
       }
    
       for(i=1;i<document.all(tempid).children.length;i++){
        var targetid=document.all(tempid).children[i].id;
         var tempName='eaptreea:'+targetid;
         if(document.all(tempName).oncontextmenu==null){
         document.all(tempName).oncontextmenu=new Function("rightClick('"+targetid+"')");
         document.all(tempName).onclick=new Function(document.all(treeFlag+'textonclick').value+";"+leftClick+"('"+treeFlag+"','"+targetid.substr(treeFlag.length)+"');"+jsMethodForOnclick+"('"+treeFlag+"','"+targetid.substr(treeFlag.length)+"');");
         }
       }
   /*   for( i=0;i<document.all(tempid).children.length;i++){
         if(document.all(tempid).children[i].isLastChildren=='true'){
          var tem=document.all(tempid).children[i].children[0];
           for(j=0;j<tem.all.length;j++){
                 
               if(tem.all[j].id.indexOf('imgNode:')!=-1){
                  tem.all[j].src=document.all('noChildrenMidNodeContent').value;
                  break;
               }
          }
          break;
        }
      }*/
   
}



/////////////////////////////////////////////////////////////////////////////////////////

function handleForAddNoChildren(idser,newType){
   if(!newType || newType=="null"){
     newType="";
    }
   var checkvalue=idser;
   var treeFlag=document.all(tempid).treeFlag;
  
   var jsMethodForOnclick=document.all(treeFlag+'jsMethodForOnclick').value;
    var divTN=document.all(tempid);
    divTN.isExpand='false';
    divTN.nodeState='collapse';
    ////////////////////////////////////////////////////////////////////////////////////////
    
    if(document.all(treeFlag+'mode').value.toLowerCase()=='allload'){
     var index;
     divTN.isExpand='true';
     var divT=divTN.cloneNode(true);
     divT.nodevalue='';
     divT.nodetooltip='';
     divT.id=treeFlag+idser
     divT.nodename=idser;
     divT.hasChildren='false';
     divT.isLastChildren='true';
     divT.isSelected='false';
     divT.isExpand='true';
     divT.parentid=tempid;
     divT.nodeobject=getDefaultNodeObject();
     divT.nodetype=newType;
     if(divT.level!=-1){
      divT.level=divT.level+1;
    }
     idser=treeFlag+idser;
     var tempchild=divT.children[0].all;//孩子div的table
   
     var tempContent;
     var mytr;
    for(i=0;i<tempchild.length;i++){
    
      if(tempchild[i].id.indexOf('imgFolder:')!=-1){
      
                tempchild[i].id='imgFolder:'+idser;
                tempchild[i].src=contentImg(treeFlag,CONTENTTYPE_NONEFOLDER,divT) ;
               
      }
        
       if(tempchild[i].tagName.toLowerCase()=='tr'){
         mytr=tempchild[i]
        for(j=0;j<mytr.children.length;j++){
         
         if(mytr.children[j].id.indexOf('imgNodeTd:')!=-1){
                 index=j;
                 break;
         }
       }
      
      }
       
       if(tempchild[i].id.indexOf('imgNodeTd:')!=-1){
          tempContent=tempchild[i].cloneNode(true);
           tempContent.id='imgNodeTd:'+idser;
            for(j=0;j<tempContent.all.length;j++){
            
               if(tempContent.all[j].id.indexOf('imgNode:')!=-1){
                tempContent.all[j].id='imgNode:'+idser;
                tempContent.all[j].src=document.all(treeFlag+'noChildrenLastNodeContent').value;
                continue;
                }
                if(tempContent.all[j].id.indexOf('imgFolder:')!=-1){
                tempContent.all[j].id='imgFolder:'+idser;
                tempContent.all[j].src=contentImg(treeFlag,CONTENTTYPE_NONEFOLDER,divT);
                continue;
                }
            }
           tempchild[i].id='';
           var imgContent='';
           if(divTN.isLastChildren=='true'){
            imgContent=document.all(treeFlag+'blankSpaceContent').value;     
           }else{
            imgContent=document.all(treeFlag+'verticalLineContent').value;
           }
           var addjs="<img border='0' src='"+imgContent+"'>"
          tempchild[i].innerHTML=addjs;
           continue;
      }
        
      if(tempchild[i].id.indexOf('eaptreea:')!=-1){
           
           tempchild[i].id='eaptreea:'+idser;
           tempchild[i].title='';
          tempchild[i].oncontextmenu="rightClick('"+idser+"')";
          tempchild[i].onclick=document.all(treeFlag+'textonclick').value+";"+leftClick+"('"+treeFlag+"','"+idser.substr(treeFlag.length)+"');"+jsMethodForOnclick+"('"+treeFlag+"','"+idser.substr(treeFlag.length)+"');";
         continue;
         }
         
         
         if(tempchild[i].id.indexOf('checkbox:')!=-1){
            tempchild[i].id='checkbox:'+idser;
            tempchild[i].value=checkvalue;
            tempchild[i].checked=false;
            continue;
         }
        
         if(i==(tempchild.length-1)){
           tempchild[i].parentElement.id="nodeText:"+treeFlag+idser.substr(treeFlag.length)
           tempchild[i].innerText=idser.substr(treeFlag.length);
           break;
         }
     
       }
         var mytd=mytr.insertCell(index+1);
         mytd.id=tempContent.id;
         mytd.innerHTML=tempContent.innerHTML;
         //mytd.outerHTML=tempContent.outerHTML;
         document.all(tempid).innerHTML=document.all(tempid).innerHTML+divT.outerHTML;
         
        
        /////////////////////////////////////////////////////////////////////////////////////////
     }
  
    var tempchild=divTN.children[0].all;//孩子div的table
    for(i=0;i<tempchild.length;i++){
        if(tempchild[i].id.indexOf('imgNode:')!=-1){
           tempchild[i].onclick=onclickforexpand;
           if(divTN.isLastChildren=='false')
           tempchild[i].src=document.all(treeFlag+'collapsedMidNodeContent').value;
           else 
           tempchild[i].src=document.all(treeFlag+'collapsedLastNodeContent').value;
           continue;
         }
         if(tempchild[i].id.indexOf('imgFolder:')!=-1){
          tempchild[i].src=contentImg(treeFlag,CONTENTTYPE_CLOSEFOLDER,divTN) ;//document.all(treeFlag+'closedFolderContent').value;
         }
    }
    divTN.hasChildren='true';
    
    for(i=1;i<divTN.children.length;i++){
      divTN.children[i].style.display='none';
    }
    changeToCollapse(tempid);
   
 }


function ex_delete(treeFlag){
   var parent= document.all(tempid).parentNode ;
   var divT=document.all(tempid);
 
   if(parent.children.length==2){
      parent.hasChildren='false';
      document.all("imgFolder:"+parent.id).src=contentImg(treeFlag,CONTENTTYPE_NONEFOLDER,divT);
      if(parent.isLastChildren=='true'){
        document.all("imgNode:"+parent.id).outerHTML="<img  id='imgNode:"+parent.id+"' border='0' src='"+document.all(treeFlag+"noChildrenLastNodeContent").value+"'>";
      }else{
        document.all("imgNode:"+parent.id).outerHTML="<img  id='imgNode:"+parent.id+"' border='0' src='"+document.all(treeFlag+"noChildrenMidNodeContent").value+"'>";
      }
   
     parent.removeChild(parent.children[1]);
   
     return
   }  
  else{
  if(document.all(tempid).isLastChildren=='true'){
    
      var last=parent.children(parent.children.length-2);
     
      last.isLastChildren='true';
      var tempchild=last.children[0].all;
      var mytr;
      for(i=0;i<tempchild.length;i++){
        if(tempchild[i].tagName.toLowerCase()=='tr'){
          mytr=tempchild[i]
        }
      
      
        if(tempchild[i].id.indexOf('imgNode:')!=-1){
            if(last.hasChildren=='false'){
               tempchild[i].src=document.all(treeFlag+'noChildrenLastNodeContent').value;
            }
            else {
            
            if(last.nodeState=='expand'){
            tempchild[i].src=document.all(treeFlag+'expandedLastNodeContent').value;
            }else{
            tempchild[i].src=document.all(treeFlag+'collapsedLastNodeContent').value;
            }
             /* var children=last.children;
              for(j=1;j<children.length;j++){
               children[j].style.display='none';
              }
              changeToCollapse(last.id);
              tempchild[i].src=document.all(treeFlag+'collapsedLastNodeContent').value;*/
              var index;
              for(p=0;p<mytr.children.length;p++){
              if(mytr.children[p].id.indexOf('imgNodeTd:')!=-1){
                 index=p;
                 break;
                }
              }
              
              deleteExLine(last,treeFlag,index);
              
              /*var lastnodechildren=last.children;
              for(k=1;k<lastnodechildren.length;k++){
                 var lastnodechild=lastnodechildren[k].children[0];
              
                    for(m=0;m<lastnodechild.all.length;m++){
                      
                    if(lastnodechild.all[m+1].id.indexOf('imgNodeTd:')!=-1){
                             var mytr=lastnodechild.all[m];
                            
                             lastnodechild.all[m].src=document.all(treeFlag+'blankSpaceContent').value;
                             break;
                         }
                    }
              
              }*/
        }
            break;
        }
      }   
      
      
    }  
    
   } 

   document.all(tempid).outerHTML='';
  
      return;
}



////////////////////////////////////////////////////////////////////////////////////////////
function delete_node(){

   if(!window.confirm('将删掉该结点，是否继续？')) return false;
   
   var treeFlag=document.all(tempid).treeFlag;
   if(document.all(treeFlag+'root').value==tempid) {
   alert('不能删除根结点');
   return false;
   }
   if(document.all(treeFlag+'virtualcatalog').children.length==2&&document.all(tempid).parentElement.id==treeFlag+'virtualcatalog'){
     alert('非法操作！删除此结点会使页面树全部删除！');
     return false;
   }
   //////////
 /* if(document.all(treeFlag+'mode').value.toLowerCase()=='allload'){
        ex_delete(treeFlag);
        return;
  }*/
   //////////////////
   var message=executeRequest('eaptree','partyFreshTreeDelete','delete='+tempid+'&treeFlag='+treeFlag);
   
   if(message=='OK'){
       
       ex_delete(treeFlag);
  /* var parent= document.all(tempid).parentNode ;
   if(document.all(tempid).isLastChildren=='true'){
     var last=parent.children(parent.children.length-2);
     last.isLastChildren='true';
      var tempchild=last.children[0].all;
      for(i=0;i<tempchild.length;i++){
      if(tempchild[i].id.indexOf('imgNode:')!=-1){
         if(last.hasChildren=='false'){
               tempchild[i].src=document.all(treeFlag+'noChildrenLastNodeContent').value
          }
          else {
             var children=last.children;
              for(j=1;j<children.length;j++){
               children[j].style.display='none';
              }
              changeToCollapse(last.id);
             tempchild[i].src=document.all(treeFlag+'collapsedLastNodeContent').value;
               
            var lastnodechildren=last.all;
              for(k=1;k<lastnodechildren.length;k++){
                 var lastnodechild=lastnodechildren[k].children[0];
              
                    for(m=0;m<lastnodechild.all.length;m++){
                      
                    if(lastnodechild.all[m+1].id.indexOf('imgNodeTd:')!=-1){
                             var mytr=lastnodechild.all[m];
                             lastnodechild.all[m].src=document.all(treeFlag+'blankSpaceContent').value;
                             break;
                         }
                    }
              }
               
          }
            break;
         }
      }   
    }  
   document.all(tempid).outerHTML='';*/
   }else{
   alert(message);
   return false;
   }
 /*  if(){ 
    document.all(tempid).outerHTML='';
   }else{
    alert("删除失败！");
   }*/
   return true;
}

function deleteExLine(element,treeFlag,index){
  

  var lastnodechildren=element.all;
  var tr
  for(k=0;k<lastnodechildren.length;k++){
   // 
    if(lastnodechildren[k].tagName.toLowerCase()=='div'&& lastnodechildren[k].id.indexOf('nodeText:')==-1){
      var lastnodechild=lastnodechildren[k].children[0];
      for(m=0;m<lastnodechild.all.length;m++){
        if(lastnodechild.all[m].tagName.toLowerCase()=='tr'){
         tr=lastnodechild.all[m];
         tr.children[index].innerHTML="<img src='"+document.all(treeFlag+'blankSpaceContent').value+"' border='0'>";
         break;
        }
      }
    }
  }  
    
  
    /* if(lastnodechildren[k].hasChildren=='true'){
    
       var aa=lastnodechildren[k]
        deleteExLine(aa,treeFlag,index);   
    }
  }*/

             
}




function jsmethodforonclick(id){
 /* var aa=document.all(id);
  alert('id='+aa.id);
  alert('isSelected='+aa.isSelected);
  alert('hasChildren='+aa.hasChildren);
  alert('parentid='+aa.parentid);
  alert('nodevalue='+aa.nodevalue);
  alert('nodetooltip='+aa.nodetooltip);
  alert('nodeobject='+aa.nodeobject);
  alert('nodetype='+aa.nodetype);
  alert('nodename='+aa.nodename);
  alert('isExpand='+aa.isExpand);
 */
}

needStateCheckBox=true;

function changeCheckboxState(id,state){

if(!needStateCheckBox){
return;
}

if(document.all("checkbox:"+id)){
document.all("checkbox:"+id).hasChanged=state;
}else if(document.all(id)){
document.all(id).hasChanged=state;
}else if(id.type && id.type.toLowerCase()=="checkbox"){
   id.hasChanged=state
}else{
  alert("changeCheckboxState方法中参数非法：非法类型id:"+id);
}


/*if(!needStateCheckBox){

return ;
}

if(checkboxLogical==1){
   return;
}



var div=document.all(id);
var treeflag=div.treeFlag;


var mode=document.getElementById(treeflag+"mode").value.toUpperCase();//PARTLOAD
var ac=div.all(CHECKBOX_NAME_PRE+treeflag);



for(var i=0;i<ac.length;i++){
 ac[i].hasChanged=state;
}


if(checkboxLogical==2){


}*/



}

function selectChildren(){

var imgid=window.event.srcElement.id;
var id=imgid.substr(imgid.indexOf(':')+1);


var checkboxLogical=document.all(imgid).checkboxLogical;


changeCheckboxState(id,"true");






window.event.srcElement.hasChanged="true";

if(checkboxLogical=="custom"){

   
   customSelectChildren(imgid,id);
   return;

}




if(checkboxLogical==1){
   return;
}
if(checkboxLogical==2){
   selectParentandCancelChildren(imgid,id);
  return;
}
else{
   allSelectandallCancel(imgid,id);
}

 /* var divT=document.all(id);
   if(divT.hasChildren=='false'){
     if(document.all(imgid).checked){
      selectParents(id)
      }
      
       return;
   }
 if(!document.all(imgid).checked){
    var flag=true;
     for(i=1;i<divT.all.length;i++){
       if(divT.all[i].id=='checkbox:'+id){
  
        continue;
       }
      if(divT.all[i].id.indexOf('checkbox:')!=-1&&divT.all[i].checked!=true){
          flag=false;
          break;
       }
     } 
     if(flag){
       for(i=1;i<divT.all.length;i++){
         if(divT.all[i].id=='checkbox:'+id){
           continue;
         }
         if(divT.all[i].id.indexOf('checkbox:')!=-1){
            divT.all[i].checked=false;
         }
      } 
    }
     return
  }
  selectParents(imgid)
  for(i=1;i<divT.all.length;i++){
     if(divT.all[i].id=='checkbox:'+id){
  
        continue;
     }
     if(divT.all[i].id.indexOf('checkbox:')!=-1){
          
           divT.all[i].checked=true;
      }
  } */

}

function selectParentandCancelChildren(imgid,id){
  var divT=document.all(id);
  if(divT.hasChildren=='false'){
     if(document.all(imgid).checked){
      selectParents(id)
     }
      return;
   }
   
   
 if(!document.all(imgid).checked){
  
     allSelectandallCancel(imgid,id);
     return
  }
  

  selectParents(id)
}


function recursionCancel(id){
 if(id.indexOf("virtualcatalog")!=-1){  

 return;
 
 }
    var divT=document.all(id);


  
    var treeflag=divT.treeFlag;
    var size=divT.all(CHECKBOX_NAME_PRE+treeflag).length;
 
    var array=divT.all(CHECKBOX_NAME_PRE+treeflag);
 var flag=true;
 for(i=1;i<size;i++){
    if(array[i].checked){
     
       flag=false;
       break;
    }
 }
  if(flag){
   // alert(array[0].outerHTML);
    array[0].checked=false;
    changeCheckboxState(array[0].id,"true");
    document
    
    
    if(id!=document.all(treeflag+"root").value){  
       recursionCancel(divT.parentElement.id);
    }
  }
}

function  allSelectandallCancel(imgid,id){
  var divT=document.all(id);
  var treeflag=divT.treeFlag;
  
  var checkboxs=divT.all(CHECKBOX_NAME_PRE+treeflag);
  var boo=document.all(imgid).checked;
  if(checkboxs.length){
  for(i=0;i<checkboxs.length;i++){
       if(!checkboxs[i].disabled){
            checkboxs[i].checked=boo;
            changeCheckboxState(checkboxs[i].id,"true");
        }
  }
  }else{
  checkboxs.checked=boo;
  changeCheckboxState(checkboxs.id,"true");
  }
/*
if(!boo){
recursionCancel(divT.parentElement.id);

}
*/



  //CHECKBOX_NAME_PRE
  
  
  
  /* if(divT.hasChildren=='false'){
       return;
   }
 if(!document.all(imgid).checked){
 
       for(i=1;i<divT.all.length;i++){
         if(divT.all[i].id=='checkbox:'+id){
           continue;
         }
         if(divT.all[i].id.indexOf('checkbox:')!=-1){
               if(!divT.all[i].disabled){
            divT.all[i].checked=false;
           }
         }
      } 

     return
  }
  for(i=1;i<divT.all.length;i++){
     if(divT.all[i].id=='checkbox:'+id){
  
        continue;
     }
     if(divT.all[i].id.indexOf('checkbox:')!=-1){
        
              if(!divT.all[i].disabled){
            divT.all[i].checked=true;
           }
      }
  } */
}


function selectChildrenWithID(treeFlag,id){
  
  var checkboxLogical=document.all(treeFlag+"checkboxLogical").value;
  changeCheckboxState(id,"true");
   var imgid='checkbox:'+id;
  if(checkboxLogical=="custom"){

   
   customSelectChildren(imgid,id);
   return;


}
 
  
  if(checkboxLogical==1){
   return;
  }
  if(checkboxLogical==2){
   selectParentandCancelChildren(imgid,id);
    return;
  }
  else{
   allSelectandallCancel(imgid,id);
}
  /*var divT=document.all(id);
   if(divT.hasChildren=='false'){
     if(document.all('checkbox:'+id).checked){
      selectParents(id)
     }
       return;
   }
  for(i=1;i<divT.all.length;i++){
     if(divT.all[i].id=='checkbox:'+id){
    
        continue;
     }
     if(divT.all[i].id.indexOf('checkbox:')!=-1){
           divT.all[i].checked=true;
      }
  } */

}

function returnFalse(){
}


function selectParents(id){

  try{
    changeCheckboxState(id,"true");
    var parent=document.all(id).parentid;
    if( !document.all('checkbox:'+parent).disabled){
    document.all('checkbox:'+parent).checked=true;
    changeCheckboxState(parent,"true");
    }
   
    selectParents(parent);
    
   }catch(e){
     return;
   }
}





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////修改///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // 固定分割符号，注意前后台要一致，用于分割key和value
 var SPLITKEY="UNIEAP_COMMONTREE_SPLITKEY";
  // 固定分割符号，注意前后台要一致，用于分割多个key,value对之间
 var  SPLITCONTENT="UNIEAP_COMMONTREE_SPLITCONTENT";
  // 固定分割符号，注意前后台要一致，用于分割扩展属性中的key和value
 var SPLITOBJS="UNIEAP_COMMONTREE_SPLITOBJS";
  // 固定分割符号，注意前后台要一致，用于分割扩展属性中的key和value
 var SPLITOBJSKEYANDVALUE="UNIEAP_COMMONTREE_SPLITOBJ_KEYANDVALUE";
  //模态对话框所对应JSP
 var COMMONTREE_MODIFY_DIALOGJSP=unieap.WEB_APP_NAME+"/unieap/pages/commontree/commontree_modify_dialog.jsp"; 
   //弹出模态对话框的样式
 var COMMONTREE_DIALOGSTYLE="dialogHeight:500px;dialogWidth:500px";
  //定义标题
 var COMMONTREE_MODIFY_PAGE_TITLE="<font color=\"blue\">请修改结点属性</font>";
 //定义自定义按钮
 var COMMONTREE_MODIFY_PAGE_CUSTERMBUTTON="";


//保存和关闭按钮定义
  var COMMONTREE_MODIFY_PAGE_SAVEBUTTON_VALUE="保存";

  var COMMONTREE_MODIFY_PAGE_SAVEBUTTON_CLASS="";
  
  var COMMONTREE_MODIFY_PAGE_CLOSEBUTTON_VALUE="关闭";

  var COMMONTREE_MODIFY_PAGE_CLOSEBUTTON_CLASS="";

  var COMMONTREE_MODIFY_PAGE_REFERENCE_URL="";





function modify_node_pre(){
  var divforuser=document.all(tempid);
 var flag;
   if(userModifyPre(divforuser)){
     flag=modify_node();
   }else{
   flag=false;
   }
   document.oncontextmenu='';
   userModifyEnd(flag,divforuser)//flag可能为：true;false;"UNIEAP_COMMONTREE_CANCEL";
}


function userModifyPre(divforuser){
   return true;
}


function userModifyEnd(flag,divforuser){
   if(flag=="UNIEAP_COMMONTREE_CANCEL"){
      return;
   }
   if(flag){
     alert("修改成功");
   }else{
     alert("修改失败");
   }
}


function modify_node(){
   var divforuser=document.all(tempid);
   var para=getModifyPara(divforuser);
   var url=COMMONTREE_MODIFY_DIALOGJSP+"?para="+para;
   var flag=window.showModalDialog(url,window,COMMONTREE_DIALOGSTYLE);
 if(flag=="UNIEAP_COMMONTREE_OK"){
   return true;
 }else if(flag=="UNIEAP_COMMONTREE_FAIL"){
   return false;
 }else{
   return "UNIEAP_COMMONTREE_CANCEL";
 }
}

function getModifyPara(divT){
    var treeflag=divT.treeFlag;
    var id=divT.id.substr(treeflag.length);
    var name=divT.nodename;
    var tool=divT.nodetooltip;
    var value=divT.nodevalue;
    var type=divT.nodetype;
    var obj=divT.nodeobject;
    var parentid=divT.parentid.substr(treeflag.length);
    if(parentid.toLowerCase()=="null"){
       parentid="";
    }
    var para="parentid"+SPLITKEY+parentid+SPLITCONTENT;
    para=para+"treeflag"+SPLITKEY+treeflag+SPLITCONTENT+"trid"+SPLITKEY+id+SPLITCONTENT+"nodename"+SPLITKEY+name+SPLITCONTENT+"tooltip"+SPLITKEY+tool+SPLITCONTENT;
    para=para+"value"+SPLITKEY+value+SPLITCONTENT+"type"+SPLITKEY+type+SPLITCONTENT+"obj"+SPLITKEY+obj+SPLITCONTENT;
   
    return para;
}

 
function save(treeflag,oldid,trid,nodename,tooltip,value,obj,type,parentid){//可能返回的值,true,false,COMMON_TREE_WITHOUT_CHANGE

   var userdiv=document.all(treeflag+oldid);
   
   var para="parentid="+parentid+"&"+"oldid="+oldid+"&"+"level="+userdiv.level+"&";
   
   var originalName=userdiv.nodename;
   var originalValue=userdiv.nodevalue;
   var originalToolTip=userdiv.nodetooltip;
   var originalType=userdiv.nodetype;
   var originalObject=userdiv.nodeobject;
   
  
   var flag=false;
   
   if(obj!=null){
    para=para+"obj="+obj+"&";
    if(originalObject!=obj){
       flag=true;
    }
   }
   
   
   if(oldid!=trid){
     flag=true;
   }
   
   
    para=para+"name="+nodename+"&";
   if(originalName!=nodename){
     flag=true;
   }
   para=para+"value="+value+"&";
   if(originalValue!=value){
     flag=true;
   }
   para=para+"tooltip="+tooltip+"&";
   if(originalToolTip!=tooltip){
    flag=true;
   }
    para=para+"type="+type+"&";
   if(originalType!=type){
     flag=true;
   }
   if(!flag){
  // alert('没有任何改变！');
   return "COMMON_TREE_WITHOUT_CHANGE";
   }
   
 
//////////////////////////////////////////////////////////////
//持久化部分
  
   para=para.substr(0,para.length-1);
    
    var message=saveTreeNode(treeflag,trid,para).toLowerCase();
    if(message.toLowerCase()=='ok'){
      // alert("成功持久化到数据库!");
    }else{
      alert(message);
      return false;
    }
    
 ////////////////////////////////////////////////////////////////////////////////////   
   //反显  
     var divT=document.all(treeflag+oldid);
     divT.id=treeflag+trid;
     divT.nodename=nodename;
     divT.nodetooltip=tooltip;
     divT.nodevalue=value;
     divT.nodetype=type;
     divT.nodeobject=obj;
   
     //////////////////////////////////////////////////////////////////////////////////////////////
      var idser=treeflag+trid;
   
      var tempchild=divT.children[0].all;
     
      for(i=0;i<tempchild.length;i++){
       if(tempchild[i].id.indexOf('imgNode:')!=-1){
        
           tempchild[i].id='imgNode:'+idser;
            continue;
         }
         if(tempchild[i].id.indexOf('imgFolder')!=-1){
           tempchild[i].id='imgFolder:'+idser;
           tempchild[i].object="img:"+obj;
           var src=tempchild[i].src;
           if(divT.hasChildren=="true"){
              if(divT.nodeState=="collapse"){
              src=contentImg(treeflag,CONTENTTYPE_CLOSEFOLDER,divT);
              }else{
              src=contentImg(treeflag,CONTENTTYPE_OPENFOLDER,divT);
              }
              
              
           }else{
             src=contentImg(treeflag,CONTENTTYPE_NONEFOLDER,divT);
           }
           tempchild[i].src=src;
           continue;
        }
         if(tempchild[i].id.indexOf('eaptreea:')!=-1){
           tempchild[i].id='eaptreea:'+idser;
           tempchild[i].title=tooltip;
           var jsMethodForOnclick=document.all(treeflag+'jsMethodForOnclick').value;
     
        //  tempchild[i].oncontextmenu="rightClick('"+idser+"')";
         //  tempchild[i].onclick=document.all(treeflag+'textonclick').value+";"+leftClick+"('"+treeFlag+"','"+targetid.substr(treeFlag.length)+"');"+jsMethodForOnclick+"('"+treeflag+"','"+idser.substr(treeflag.length)+"');";
         
        tempchild[i].oncontextmenu=new Function("rightClick('"+idser+"');");
     
        tempchild[i].onclick=new Function(document.all(treeflag+'textonclick').value+";"+leftClick+"('"+treeflag+"','"+idser.substr(treeflag.length)+"');"+jsMethodForOnclick+"('"+treeflag+"','"+idser.substr(treeflag.length)+"');");
       
            continue;
        }
         if(tempchild[i].id.indexOf('checkbox:')!=-1){
            tempchild[i].id='checkbox:'+idser;
            continue;
         }
         if(tempchild[i].id.indexOf('nodeText:')!=-1){
           tempchild[i].id='nodeText:'+idser;
           var text="<font style='"+document.all(treeflag+'treestyle').value+"'>"+divT.nodename+"</font>";
           
           document.all(tempchild[i].id).innerHTML=text;
           break;
         }
      
         if(tempchild[i].id.indexOf('imgNodeTd:')!=-1){
            
            tempchild[i].id='imgNodeTd:'+idser;
         }
     
     }
 
 
       
         
     
 
 
   //如果修改父结点则需要更新所有孩子结点
   if(oldid!=trid){
   refreshALLChildrenID(divT); 
   }  
  return true;
}
function refreshALLChildrenID(divT){
  var children=divT.children;
  for(var i=0;i<children.length;i++){
      if(children[i].parentid){
         children[i].parentid=divT.id;
      }
  
  }

}

function checkmodify(tempdata){
return true;
}





function getLeftColor(treeName){
  if(document.getElementById(treeName+"leftDisplayColor")){
  return document.getElementById(treeName+"leftDisplayColor").value;
  }else{
    return "";
  }
}

function getRightColor(treeName){
   
  if(document.getElementById(treeName+"rightDisplayColor")){
  return document.getElementById(treeName+"rightDisplayColor").value;
  }else{
    return "";
  }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////GROUP DISPLAY//////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function GroupInfo(openFolder,closeFolder,noneFolder){

  
   this.openFolder=openFolder;
   this.closeFolder=closeFolder;
   this.noneFolder=noneFolder;
   
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////Search//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  var NODE_TYPE='nodetype';
    var NODE_NAME='nodename';
    var NODE_TOOLTIP='nodetooltip';
    var NODE_VALUE='nodevalue';
    var NODE_OBJECT='nodeobject';
    
 
 
 
 
 
 
	function getMode(treeflag){
	  return document.getElementById(treeflag+"mode").value;
	}
 
  function clearSearch(treeflag){
     var sa=getSearchHistoryArray(treeflag);
    
      if(!sa){
        return;
      }
      
     for(i=0;i<sa.length;i++){
        clearNodeStyle(sa[i]);   
     }
      
     window[treeflag+'searchArray']=null;
   }
   
   
   
   
   
   
 /*  function doSearchMultiply(treeflag,value,color,promptSu,promptFa){//复合查找
   
       if(!promptSu){
          promptSu="找到匹配节点!";
       }
       if(!promptFa){
          promptFa="未找到匹配节点!";
       }
      
      clearSearch(treeflag);
      var searchResult=searchCurrent(treeflag,value,null,false,null);
   
   }*/
   
   
   function setSearchColor(treeflag,color){
  
   window[treeflag+'searchColor']=color;  
   
   }
   
   
   function getSearchColor(treeFlag){

   if(window[treeFlag+'searchColor']){
       return window[treeFlag+'searchColor'];
   }else{
      return "";
   }
}
   
   function doSearch(treeflag,value,color,promptSu,promptFa,only){//只招最先匹配结果,未来可以传处理器让用户处理结果
   
     setSearchColor(treeflag,color);
        
       if(only==null){
         only=true;
       }
       
       if(!promptSu){
          promptSu="找到匹配节点!";
       }
       if(!promptFa){
          promptFa="未找到匹配节点!";
       }
      
      clearSearch(treeflag);
      var mode=getMode(treeflag);
      if(mode.toLowerCase( )=="partload" && !only){
      

      }else{
    
      var searchResult=searchCurrent(treeflag,value,null,only,null);
      }
  
       if(searchResult){
   
           if(only){
          
            displaySearch(treeflag,searchResult,color);
            alert(promptSu);
            return;
           }else{
              if(mode.toLowerCase( )=="allload"){
               
                for(i=0;i<searchResult.length;i++){
                 
                displaySearch(treeflag,searchResult[i],color);
                }
                
                alert(promptSu);
               
                return;
             }
           
           }  
            
       }
   
       
      
       if(mode.toLowerCase( )=="partload"){
       
          searchResult=searchUnload(treeflag,value,null,only,null);
         
          if(searchResult=="EAP_ERR"){
             clearSearch(treeflag);
             return;
          }
        
          if(searchResult){
             if(only){
             displaySearch(treeflag,searchResult,color);
             alert(promptSu);  
             return;
             }else{
            
             for(i=0;i<searchResult.length;i++){
              displaySearch(treeflag,searchResult[i],color);
             }
               alert(promptSu); 
               return; 
             }
          }
            
       }
        
       alert(promptFa);  

   }
   
   function searchUnload(treeflag,value,parent,onlyOne,searchAttribute){
    
       if(!treeflag){
          alert("致命错误!没有tree表示");
         return;
       }
		if(!parent){
		
		   parent=document.getElementById(treeflag+"root").value.substr(treeflag.length);
		}
		
		if(!parent){
		   alert("错误!根节点无ID");
		   return;
		}
		if(!value){
		   return;
		}
		if(onlyOne==null){
		   onlyOne=true;
		}
		if(!searchAttribute){
		searchAttribute=NODE_NAME;
		}
		var multi=!onlyOne;
		//alert('topId='+parent+'&treeFlag='+treeflag+'&value='+value+'&multiply='+multi+'&searchAttribute='+searchAttribute);
       var re=executeRequest('eaptree','searchTree','topId='+parent+'&treeFlag='+treeflag+'&value='+value+'&multiply='+multi+'&searchAttribute='+searchAttribute); 
       
       
       
       if(re=="EAP_ERR"){
         alert("在查找未加载节点时出现了错误!");
         return "EAP_ERR";
       }
       
       if(re=="EAP_NONE"){
       
         return null;
       }
       if(onlyOne){
       
         var array=re.split("%");
     
         re=loadUnLoadNode(treeflag,array);
         if(re=="EAP_ERR"){
         alert("在加载未加载节点时出现了错误!");
         return "EAP_ERR";
         }
          
          
          
          
          
          
          return document.getElementById(treeflag+array[0]);
        }else{
       
        var array=re.split("&&");
      
         var resu=[];
         for(var i=0;i<array.length;i++){
           if(!array[i]){
           continue;
           }else{
             var cell=array[i].split("%");
            
             re=loadUnLoadNode(treeflag,cell);
             
           if(re=="EAP_ERR"){
            alert("在加载未加载节点时出现了错误!");
            return "EAP_ERR";
           }
           
           resu[resu.length]=document.getElementById(treeflag+cell[0]);
           
         }
       
       }
       
            return resu;
      }
   }
   
   function loadUnLoadNode(treeflag,array){
     try{
        for(i=array.length-1;i>=1;i--){
          if(!array[i] || array[i]==""){
            continue;
          }
          
           var div=document.getElementById(treeflag+array[i]);
           if(div){
             if(div.nodeState=='collapse'){
                    document.getElementById("imgNode:"+treeflag+array[i]).fireEvent("onclick");
             }
           }  
        }
        return "EAP_OK";
      }catch(e){
        throw e;
        return"EAP_ERR";
      }  
   
   }
   
    function loadLoadNode(treeFlag,div){
       if(!div){
         return;
       }
       if(div.style.display!="none"){
           return;
       }
       parentid=div.parentid;
       if(!parentid){
          return;
       }
       try{
       if(document.getElementById(parentid).nodeState=='collapse'){
       document.getElementById("imgNode:"+parentid).fireEvent("onclick");
       }
       }catch(e){
         return;
       }
       loadLoadNode(treeFlag,document.getElementById(parentid));
    }
   
   
   
   function getSearchHistoryArray(treeflag){
   
       return window[treeflag+'searchArray'];
   
   }
   function displaySearch(treeflag,searchResult,color){//searchResult是div
      //clearSearch(treeflag);
   
      if(!searchResult){
         return;
      }
      if(!window[treeflag+'searchArray']){
       
       window[treeflag+'searchArray']=[];
      }
      
      var nodeId=searchResult.id;
      window[treeflag+'searchArray'][window[treeflag+'searchArray'].length]=nodeId;
      clearNodeStyle(nodeId);   
      modifyNodeStyle(nodeId,color);
    
   }
   
   function searchCurrent(treeflag,value,parent,onlyOne,attribute){
       if(!attribute){
          attribute=NODE_NAME;
       }
       if(!parent){
          parent=document;
       }
    
       var divs=parent.getElementsByTagName("DIV");
       var result=null;
       for(i=0;i<divs.length;i++){
           
           if(divs[i][attribute] && divs[i][attribute]==value){
              loadLoadNode(treeflag,divs[i]);
               
              if(onlyOne){
                 return divs[i];
              }
              if(!result){
                result=[];
              }
               result[result.length]=divs[i];
           }
       
       }
       return result;
    }

///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////局部加载下的提交///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
 
    function submitPart(treeflag,successSentence,failSentence){
   
       if(!successSentence){
       successSentence="提交成功！"
       }
        if(!failSentence){
       failSentence="提交失败！"
       }
       var submitString=renderPartLoadSumbitString(treeflag);
      
      
       var flag=executeRequest('eaptree','systemPartSubmit','treeFlag='+treeflag+submitString);
      
       if(flag=="OK"){
         alert(successSentence);
       }else{
         alert(failSentence);
       }
    }
    
    
    function renderPartLoadSumbitString(treeflag){
     var expandSelectedNodes=new Array();
       var allTreeNode=getAllTreeNode(treeflag);
       var unExpandNodesUnChanged=new Array();
       var unExpandNodesChanged=new Array();
       
       for(var j=0;j<allTreeNode.length;j++) {
          var treeNode=allTreeNode[j];
          var checkbox=document.getElementById("checkbox:"+treeNode.id);
          if(checkbox&&checkbox.checked==true){
            
             if(document.getElementById(treeNode.id).hasChildren=="true" && document.getElementById(treeNode.id).isExpand=="false" && checkbox.hasChanged=="false"){
                   var id=treeNode.id;
                   var index=id.indexOf(treeflag)+treeflag.length;
                   id=id.substr(index);
                   unExpandNodesUnChanged.push(id);
             }else if(document.getElementById(treeNode.id).hasChildren=="true" && document.getElementById(treeNode.id).isExpand=="false" && checkbox.hasChanged=="true"){
                   var id=treeNode.id;
                   var index=id.indexOf(treeflag)+treeflag.length;
                   id=id.substr(index);
                   unExpandNodesChanged.push(id);
             
             }else{
                   var id=treeNode.id;
                   var index=id.indexOf(treeflag)+treeflag.length;
                   id=id.substr(index);
                   expandSelectedNodes.push(id);
             }
             
           }
       }
       var submitString="";
      if(expandSelectedNodes.length!=0){
      
         submitString+="&expandSelect="+expandSelectedNodes;
      }
      
      if(unExpandNodesUnChanged.length!=0){
         submitString+="&unExpandSelectUnChanged="+unExpandNodesUnChanged;
      
      }
      
      if(unExpandNodesChanged.length!=0){
         submitString+="&unExpandSelectChanged="+unExpandNodesChanged;
      
      }
    return submitString;
    
    
    }
 
