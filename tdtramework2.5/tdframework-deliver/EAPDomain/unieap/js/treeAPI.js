

function getClosedFolderContent(treeFlag){
   return document.all(treeFlag+'closedFolderContent').value
}

function getOpenFolderContent(treeFlag){
   return document.all(treeFlag+'openFolderContent').value
}

function getCollapsedMidNodeContent(treeFlag){
   return document.all(treeFlag+'collapsedMidNodeContent').value
}

function getExpandedMidNodeContent(treeFlag){
   return document.all(treeFlag+'expandedMidNodeContent').value
}

function getCollapsedLastNodeContent(treeFlag){
   return document.all(treeFlag+'collapsedLastNodeContent').value
}

function getExpandedLastNodeContent(treeFlag){
   return document.all(treeFlag+'expandedLastNodeContent').value
}

function getNoChildrenMidNodeContent(treeFlag){
   return document.all(treeFlag+'noChildrenMidNodeContent').value
}		
		
function getNoChildrenLastNodeContent(treeFlag){
   return document.all(treeFlag+'noChildrenLastNodeContent').value
}	

function getNonFolderContent(treeFlag){
   return document.all(treeFlag+'nonFolderContent').value
}
		
function getTreestyle(treeFlag){
   return document.all(treeFlag+'treestyle').value
}

function getTextonclick(treeFlag){
   return document.all(treeFlag+'textonclick').value
}	

function getMode(treeFlag){
   return document.all(treeFlag+'mode').value
}	

function getVerticalLineContent(treeFlag){
   return document.all(treeFlag+'verticalLineContent').value
}	
	

function getBlankSpaceContent(treeFlag){
   return document.all(treeFlag+'blankSpaceContent').value
}

function getRoot(treeFlag){
   return document.all(treeFlag+'root').value
}		
		
function getReadOnly(treeFlag){
   return document.all(treeFlag+'readOnly').value
}	

function getCheckboxLogical(treeFlag){
   return document.all(treeFlag+'checkboxLogical').value
}

function getJsMethodForOnclick(treeFlag){
   return document.all(treeFlag+'jsMethodForOnclick').value
}
		
function getNode(treeFlag,treeid){
  return document.all(treeFlag+treeid);
}	

function getRightClickNode(){
  return document.all(tempid);
}
/**
*用于局部刷新时获取树中选中的节点
*/
function getTreeSelectedNodes(treeName){
   var objs = document.all("checked_node_"+treeName);
   if(!objs) return "";
   if(typeof objs.length=="undefined"){
      if(objs.checked) 
         return "&checked_node_"+treeName+"="+objs.value;
      else
         return "";
   }
   else{
	   var postParameter = "";
	   for(var i=0;i<objs.length;i++){
	       if(objs(i).checked)
	          postParameter+="&checked_node_"+treeName+"="+objs(i).value;	          
	   }
	   return postParameter;
   }
}




//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////点击文字张开或合拢节点/////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
*点击结点展开或收拢用于jsMethodForOnclick属性
*/	

function clicknodeforexpandorcollapse(treeflag,nodeid){
   var targetDiv= document.all(treeflag+nodeid);
   
   clearRightDisplay(treeflag,null);
   clearLeftDisplay(treeflag,null);
   if(targetDiv.hasChildren=="false"){
    //rightDisplay(treeflag,nodeid);
    
    leftDisplay(treeflag,treeflag+nodeid);
      return;
   }
   
   if(targetDiv.nodeState=='collapse'){
  api_onclickforexpand();
     
   }else{

   api_onclickforcollapse();
   }
   
   leftDisplay(treeflag,treeflag+nodeid);
}


		
function api_onclickforexpand(){//扩展
    
     var imgid=window.event.srcElement.id;
    
     if(imgid==null || imgid==""){
    
        imgid=window.event.srcElement.parentElement.id;
     }
       
     var id=imgid.substr(imgid.indexOf(':')+1);
 
     var div=document.all(id);
    
   clickforexpand(id,div);
    /* div.nodeState='expand';
     var treeFlag=div.treeFlag;
     var needCheckBox=div.needCheckBox;
      
     if(needCheckBox=='true'){
   
        var checkornot=document.all('checkbox:'+id).checked;
        if(div.isExpand=='false'){
     
       document.all(id).outerHTML=executeRequest('eaptree','partyFreshTree','expand='+id.substr(treeFlag.length)+'&treeFlag='+treeFlag+'&nodeDeepandSate='+calculateDeepAndState(treeFlag,id));
         document.all('checkbox:'+id).checked=checkornot;
         
           selectChildrenWithID(treeFlag,id);
         
        }else{
        
          var children=div.children;
          for(i=1;i<children.length;i++){
             children[i].style.display='';
           }
         
           changeToExpand(id);
        }
      
      }else{
      
        if(div.isExpand=='false'){
          
          document.all(id).outerHTML=executeRequest('eaptree','partyFreshTree','expand='+id.substr(treeFlag.length)+'&treeFlag='+treeFlag+'&nodeDeepandSate='+calculateDeepAndState(treeFlag,id));
        }else{
          
          var children=div.children;
          for(i=1;i<children.length;i++){
             children[i].style.display='';
           }
          
           changeToExpand(id);
        }
      
     }*/
      
}
////////////////////////////////////////////////////////////////////////////
function api_onclickforcollapse(){//收拢
     
      var imgid=window.event.srcElement.id;
      if(imgid==null || imgid==""){
    
        imgid=window.event.srcElement.parentElement.id;
     }
      var id=imgid.substr(imgid.indexOf(':')+1);
      var div=document.all(id);
      div.nodeState='collapse';
      var children=div.children;
      for(i=1;i<children.length;i++){
             children[i].style.display='none';
      }
     
      changeToCollapse(id);
 }	
	
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////重写onclickforcollapse调用onclickforcollapse_custom//////////////////
/////////////////来支持合龙所有子孙节点////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////


 
	  function onclickforcollapse_custom(oi){
     
     
   //  isinuse=true;
     var imgid=window.event.srcElement.id;
     
      var id=imgid.substr(imgid.indexOf(':')+1);
      if(oi){
      id=oi;
      }
      var div=document.all(id);
      div.nodeState='collapse';
     
      var children=div.children;
      var length=children.length
   
      for(var i=1;i<length;i++){
          //   alert(children[i].id);
          if(children[i].nodename){
           if(children[i].hasChildren=="false" ){
             
             children[i].style.display='none';
              continue;
            }
             
             if(children[i].hasChildren=="true" ){
                
                 onclickforcollapse_custom(children[i].id);//("eaptreea:"+children[i].id).fireEvent("onclick");
             }  
     
             children[i].style.display='none';
          
          }
          // alert(div.nodename); 
             
      }
      //alert(div.getElementsByTagName("DIV").length);
       changeToCollapse(id);
      // isinuse=false;

     /*
      var imgid=window.event.srcElement.id;
     
      var id=imgid.substr(imgid.indexOf(':')+1);
      var div=document.all(id);
      div.nodeState='collapse';
      var children=div.children;
   
      for(i=1;i<children.length;i++){
          //   alert(children[i].id);
          
             children[i].style.display='none';
      }
     
      
      */
 }	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////Some utility from wnc,modified  by wangzhb/////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//得到所有选中的结点
function getAllSelectedNode(treeId){
   var selectedNodes=new Array();
   var allTreeNode=getAllTreeNode(treeId);
   for(var j=0;j<allTreeNode.length;j++) {
      var treeNode=allTreeNode[j];
      var checkbox=document.getElementById("checkbox:"+treeNode.id);
      if(checkbox&&checkbox.checked==true){
             selectedNodes.push(allTreeNode[j]);
      }
 }
   return selectedNodes;
} 
/*
*得到树的所有结点
*/
function getAllTreeNode(treeId){
  var allTreeNode=new Array();
  var allDivNode=document.getElementsByTagName("div");
  var re = new RegExp("^"+treeId);
  for(var i=0;i<allDivNode.length;i++){
      var nodeId=allDivNode[i].id;
     if(nodeId){
         if(re.test(nodeId)){
         allTreeNode.push(allDivNode[i]);
         }
      }
  }

  return allTreeNode;
}
/*
*设置所有结点的状态
*/
function setAllNodeStatus(treeId,status){
  var allTreeNode=getAllTreeNode(treeId)
  for(var j=0;j<allTreeNode.length;j++) {
      var treeNode=allTreeNode[j];
      setNodeStatus(treeNode.id,status);
  }
}
/*
*设置单个结点的状态
*/
function setNodeStatus(nodeId,status){
  var checkbox=document.getElementById("checkbox:"+nodeId);
  if(checkbox&&checkbox.checked!=status)
        checkbox.checked=status;
}
/*
*取消所有结点
*/
function unselectAllNode(treeId){
  setAllNodeStatus(treeId,false);
}
/*
*选中所有结点
*/
function selectAllNode(treeId){
 setAllNodeStatus(treeId,true);
}

/*
*得到父亲结点的第一个孩子
*/
function getFirstChildNode(parentNode){
    var childMenus=parentNode.childNodes;
    var result=null;
    for(var i=0;i<childMenus.length;i++){
      if(childMenus[i].nodeName=="DIV"){
          result=childMenus[i];
          break;
      }
   }
   return result;
}
/*
*得到父亲结点的最后一个孩子
*/
function getLastChildNode(parentNode){
    var childMenus=parentNode.childNodes;
    var result=null;
    for(var i=childMenus.length-1;i>=0;i--){
      if(childMenus[i].nodeName=="DIV"){
          result=childMenus[i];
          break;
      }
   }
   return result;
}
/*
*得到父亲的所有孩子
*/
function getChildMenus(parentNode){
  var childMenus=parentNode.childNodes;
    var result=[];
    for(var i=0;i<childMenus.length;i++){
      if(childMenus[i].nodeName=="DIV"){
          result.push(childMenus[i]);     
      }
   }
   return result;
}
/*
*得到结点的下一个兄弟结点
*/
function hasNextSiblingMenu(menuNode){
   var nextNode=menuNode.nextSibling;
   var isHas=false;
   while(nextNode!=null){
      if(nextNode.nodeName=="DIV"){
         isHas=true;
         break;
      }
      nextNode=nextNode.nextSibling;
   }
   return isHas;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function api_selectAllParent(imgid,id){
    var check=document.getElementById(imgid);
    var node=document.getElementById(id);
 
    var flag=check.checked;
    if(flag==true){
    var parentId=node.parentid;
    api_selectParent(parentId);
    }
    
}
function api_selectParent(parentid){
   if(parentid){
        var node=document.getElementById(parentid);
        if(node){
        var obj = document.getElementById("checkbox:"+node.id);
        
       if(obj&&obj.type=="checkbox"){
				obj.checked = true; 
	       }
	     api_selectParent(node.parentid);
        }
      }
    else{
       return ;
    }
   
}

function api_selectChildrenAndParent(imgid,id){

 api_selectAllParent(imgid,id);
 allSelectandallCancel(imgid,id);
}		




 

