<%@ page contentType="text/html;charset=GBK" language="java" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%
	String webpath=request.getContextPath();
	String needCheckBox = (String)request.getAttribute("needCheckBox");
	String message = (String)request.getAttribute("message");
	String roleId = (String)request.getAttribute("roleId");
	String employeeId = (String)request.getAttribute("employeeId");
	String nodeId = (String)request.getAttribute("nodeId");
	String childAccount = (String)request.getAttribute("childAccount");
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
    <link href="<%=webpath%>/common/css/td_style_tab.css" rel=stylesheet type="text/css">
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
  function init(needCheckBox){
       var message = document.forms[0].message.value;
       if(message != null && message != '' && message != 'null'){
           alert(message);
       }
       var childAccount = document.forms[0].childAccount.value;
       if(childAccount == 0){
           alert('�˽�ɫ��ʱû���κ�Ȩ��');
           return;
       }
         
       if(needCheckBox == 'true'){
       	   //parent.parent.parent.RoleButton.document.forms[0].bAdd.disabled = '';   
       	  // parent.parent.parent.RoleButton.document.forms[0].bSelectAll.disabled = '';
       	   //parent.parent.parent.RoleButton.document.forms[0].bDeleteAll.disabled = ''; 
       } 
   }   
    //ȫѡ��
    function selectAllMenus(treeId,status){
    	setAllNodeStatus(treeId,status);  
    }
    
    //ȫȡ��
    function deleteAllMenus(treeId,status){
	    setAllNodeStatus(treeId,status);
	}
	
	/**
	   * �ύ
	   */
	  function doSubmit(treeName){
	  		var employeeId = document.getElementById("employeeId").value;
	  		if(employeeId != null && employeeId!= "" && employeeId!="null"){
	  			document.forms[0].OperType.value='doAdjustPower';
		        document.forms[0].target = "RoleManage";
				document.forms[0].action = "<%=webpath%>/om/EmployeeMaintanceAction.do";
				document.forms[0].treeName.value = "childTree";
	  		}else{
		        document.forms[0].OperType.value='insertMenus';
		        document.forms[0].target = "RoleManage";
				document.forms[0].action = "<%=webpath%>/om/roleManage.do?method=insertMenus";
			}
			document.forms[0].submit();
	  }
	  
    /**
	   * ����MENU�˵���Ϣ
	  */
	  function doExport(){
	  	var roleId = document.getElementById("roleId").value;
	  	var employeeId = document.getElementById("employeeId").value;	
		document.myform.action = "<%=webpath%>/om/roleManage.do?method=doExport&roleId="+roleId+"&employeeId="+employeeId;
	  	var oldAction=document.myform.action;	
		var oldtarget=document.myform.target;	
		document.myform.target="grid";
		document.myform.submit();		
		document.myform.action=oldAction;
		document.myform.target=oldtarget;	
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
<body onload="init('<%=needCheckBox%>')">
<form name="myform" method="post">
<div id="treediv">
<unieap:tree  tree='childTree' includeRootNode="false" readOnly="true" needCheckBox='<%=needCheckBox%>' textClass="TreeNode" 
              jsMethodForOnclick="clicknodeforexpandorcollapse" checkboxLogical="3" />   
</div>
<input type='hidden' name='OperType' value=''/>                                             
<input type='hidden' name='message' value='<%=message%>'/>  
<input type='hidden' name='roleId' value='<%=roleId%>'/>
<input type='hidden' name='employeeId' value='<%=employeeId%>'/>
<input type='hidden' name='nodeId' value='<%=nodeId%>'/>   
<input type='hidden' name='childAccount' value='<%=childAccount%>'/>  
<input type='hidden' name='treeName'/>  
	<table width="100%" border="0" align="center">
		<tr align="right">
			<td width="100%" align="center">
				<div class="formButtonDIV" id="filebuttons" style="display:block">
					
					<%if(needCheckBox.equals("true")){%>
						<button class="formButton" name="bAdd" onClick="doSubmit('childTree');" title="ֻ�ύ�Ӳ˵����еĸ�Ȩ��Ϣ">��&#160;&#160;��</button>
						<button class="formButton" name="bSelectAll" onClick="selectAllMenus('childTree',true)" >ȫ&#160;&#160;ѡ</button>
						<button class="formButton" name="bDeleteAll"  onClick="deleteAllMenus('childTree',false)" >ȫ��ȡ��</button>
					<%}else{%>
						<button style="display:none" class="formButton" name="bExport" onClick="doExport();" title="����XSL">��&#160;&#160;��</button>
				
					<%} %>
				</div>
			</td>
		</tr>
	</table>                                                                        
</form>
</body>
</html>