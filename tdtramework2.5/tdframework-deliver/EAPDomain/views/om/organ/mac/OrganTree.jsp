<%@ page contentType="text/html;charset=GBK" language="java" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%
	String webpath=request.getContextPath();
	String needCheckBox = "ture";
	String message = (String)request.getAttribute("message");
%>
<html>
<head>
   <title>Ȩ����Ϣ</title>
   <script  language=javascript src="<%=webpath%>/unieap/js/Globals.js"> </script>
   <script  language=javascript src="<%=webpath%>/unieap/js/treehandle.js"> </script>
   <script  language=javascript src="<%=webpath%>/unieap/js/Common.js"> </script>
   <script  language=javascript src="<%=webpath%>/unieap/js/treeAPI.js"> </script>   
   <script  language=javascript src="<%=webpath%>/common/js/tree/fw_menu.js"></script>
   <script  language=javascript src="<%=webpath%>/common/js/tree/fw_menuEvent.js"> </script>
   <script language=javascript>       
   /**
   *@author UNEAP
   *@descreption  Ϊ����ֲ������ύ���⣬
   *              �ھ������ٵ���ҵ������޸ĵ�����£�
   *              ͨ���޸����������ﵽ������������ǹ���������
   *
   */   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   //////////////////////////////////////UNIEAP MODIFY & ADD//////////////////////////////////////////////////
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   /**
   *@author UNEAP
   *@param none
   *@descreption ��������չ��ĳ���ڵ���������ڵ�ķ�����ע�Ȿ����ֻ���ھֲ����ض�Ŀ��ڵ��checkbox(checkboxLogical����Ϊ��)��δ���������������ʹ�á�  
   *
   */
   function onclickforexpandALL(){//????    
     var imgid=window.event.srcElement.id;       
     var id=imgid.substr(imgid.indexOf(':')+1);
     var div=document.all(id);   
     div.nodeState='expand';
     var treeFlag=div.treeFlag;
     var needCheckBox=div.needCheckBox;      
     if(needCheckBox=='true'){   
		var checkornot=document.all('checkbox:'+id).checked;
			if(div.isExpand=='false'){
			/*Ϊ������TreeAction�������ӷ������ڷ���������Ŀ��ڵ���������ڵ�*/
			document.all(id).outerHTML=executeRequest('eaptree','partyFreshTree','isall=ture&expand='+id.substr(treeFlag.length)+'&treeFlag='+treeFlag+'&nodeDeepandSate='+calculateDeepAndState(treeFlag,id));
			document.all('checkbox:'+id).checked=checkornot;
			/*���ո��ڵ��checkboxֵΪ����ڵ㸳ֵ*/
			selectChildrenWithID(treeFlag,id);         
        }
      }      
	}   
   var CHECKBOX_NAME_PRE="checked_node_";  
   /**
   *@author UNEAP
   *@param none
   *@descreption ����������д�������ǵ��checkbox����չ������ڵ�Ĵ�����
   *
   */
   function selectChildren(){	        	
		var imgid=window.event.srcElement.id;
		var id=imgid.substr(imgid.indexOf(':')+1);
		var checkboxLogical=document.all(imgid).checkboxLogical;		
	 	if(document.all(id).hasChildren=="true" && document.all(id).isExpand=="false"){	
		   /* ���checkbox����չ������ڵ����ڳ���*/
		   onclickforexpandALL();
		}
	 	allSelectandallCancel(imgid,id);
		selectParentandCancelChildren(imgid,id);
	}
	
   /**
   *@author UNEAP
   *@param imgid��checkboxѡ�д���Ԫ������idĿ��ڵ�id
   *@descreption ����������д��������ѡ�����и��׽ڵ����д�������÷����ܹ���ߣ�����Ч�ʡ�
   *
   */ 
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
	 
	/**
	   *@author UNEAP
	   *@param imgid��checkboxѡ�д���Ԫ������idĿ��ڵ�id
	   *@descreption ����������д��������ѡ�л�ȡ�����к��ӵ���д�������÷����ܹ���ߣ�����Ч�ʡ�
	   *
	   */ 
	function  allSelectandallCancel(imgid,id){
		var divT=document.all(id);
		var treeflag=divT.treeFlag;  
		var checkboxs=divT.all(CHECKBOX_NAME_PRE+treeflag);
		var boo=document.all(imgid).checked;
		if(checkboxs.length){
		  for(i=0;i<checkboxs.length;i++){
		       if(!checkboxs[i].disabled){
		            checkboxs[i].checked=boo;
		        }
		  }
		}else{
		checkboxs.checked=boo;
		}  
	}
   /**
   *@author UNEAP
   *@param none
   *@descreption ����������д��������ѡ��+��ʱ������������ڵ㡣
   *
   */ 
	function onclickforexpand(){
		var imgid=window.event.srcElement.id;
		var id=imgid.substr(imgid.indexOf(':')+1);
		var div=document.all(id);   
		div.nodeState='expand';
		var treeFlag=div.treeFlag;
		var needCheckBox=div.needCheckBox;      
		if(needCheckBox=='true'){   
			var checkornot=document.all('checkbox:'+id).checked;
			if(div.isExpand=='false'){       
				document.all(id).outerHTML=executeRequest('eaptree','partyFreshTree','isall=ture&expand='+id.substr(treeFlag.length)+'&treeFlag='+treeFlag+'&nodeDeepandSate='+calculateDeepAndState(treeFlag,id));
				document.all('checkbox:'+id).checked=checkornot;
				selectChildrenWithID(treeFlag,id);         
			}       
			div=document.all(id);
			var children=div.children;
			for(i=1;i<children.length;i++){
				children[i].style.display='';
			}         
			changeToExpand(id);      
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
		}      
	}
	var isinuse=false;
 function onclickforcollapse_custom(oi){
     
     
     isinuse=true;
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
       isinuse=false;

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
 
 
 
 
function onclickforcollapse(){

         onclickforcollapse_custom();
}
 
function api_onclickforcollapse(){
 
      var imgid=window.event.srcElement.parentElement.id;
    
      var id=imgid.substr(imgid.indexOf(':')+1);
      var div=document.all(id);
      div.nodeState='collapse';
      var children=div.children;
   
      for(i=1;i<children.length;i++){
          //   alert(children[i].id);
          
             children[i].style.display='none';
      }
     
      changeToCollapse(id);
  
}
//---------- add 20070209  ���� ȡ�����к��ӽڵ���Զ�ȡ���丸�ڵ�Ĺ���  -------

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
		array[0].checked=false;    
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
		    }
		}
	}else{
	checkboxs.checked=boo;
	}
 
	if(!boo){
	recursionCancel(divT.parentElement.id);
	 
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function init(){
       var message = document.forms[0].message.value;
       if(message != null && message != '' && message != 'null'){
           alert(message);
       }
       //var childAccount = document.forms[0].childAccount.value;
       //if(childAccount == 0){
       //    alert('�˽�ɫ��ʱû���κ�Ȩ��');
       //}    
       
       //makeBoxDisabled();   
   }   
   
   function makeBoxDisabled(){
       var allElements = document.body.getElementsByTagName("INPUT");
       for (var i = 0; i < allElements.length; i ++) {
			var e = allElements[i];
			if (e.type == 'checkbox') {
				e.disabled = 'disabled'
			}
	   }    
   }
   
   function clicknodeforexpandorcollapse(treeflag,nodeid){
	   var targetDiv= document.all(treeflag+nodeid);
	    
	   if(targetDiv.hasChildren=="false"){
	   	  childMenuPage(nodeid);
	   	  return;
	   }
	   
	  
	   if(targetDiv.nodeState=='collapse'){
	      api_onclickforexpand();   
	   }else{
	      api_onclickforcollapse();
	   }
	   
	}
	
    //�ر�ҳ��ʱ���session
    function removetreefromsession(){
	    var treeFlag="organTree";
	    executeRequest('eaptree','removeTreeFromSession','remove=true'+'&treeFlag='+treeFlag);
	}
   </script>
<style>
.TreeNode {
	padding:0px;
	margin:0px;
}
.TreeNode img { 
	border:0px
}
.TreeNode a:link {COLOR: Black; TEXT-DECORATION: none}
.TreeNode a:hover {COLOR: Yellow!important; TEXT-DECORATION: underline}
.TreeNode a:visited {COLOR: Black; TEXT-DECORATION: none}
.TreeNode a:active {COLOR: Green; TEXT-DECORATION: none}
</style>
</head>
<body onload="init()" onunload="removetreefromsession()">
<form method="post" id="TreeForm">
<div id="treediv">
<unieap:tree  tree='organTree' includeRootNode="false" readOnly="true" mode="ALLLOAD" 
			  needCheckBox='<%=needCheckBox%>' textClass="TreeNode" 
              jsMethodForOnclick="clicknodeforexpandorcollapse" checkboxLogical="3"/>   
</div>                                         
<input type='hidden' name='message' value='<%=message%>'/>                                                                         
</form>
</body>
</html>