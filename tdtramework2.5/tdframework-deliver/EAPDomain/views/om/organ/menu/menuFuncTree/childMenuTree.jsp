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
   <title>权限信息</title>
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
   *@descreption  为解决局部加载提交问题，
   *              在尽量减少电信业务代码修改的情况下，
   *              通过修改树自身代码达到电信需求包括非功能性需求
   *
   */   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   //////////////////////////////////////UNIEAP MODIFY & ADD//////////////////////////////////////////////////
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   /**
   *@author UNEAP
   *@param none
   *@descreption 本方法是展开某个节点所有子孙节点的方法，注意本方法只有在局部加载而目标节点带checkbox(checkboxLogical必须为三)且未被加载情况下在能使用。  
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
			/*为电信在TreeAction中新增加方法，在方法返回其目标节点所有子孙节点*/
			document.all(id).outerHTML=executeRequest('eaptree','partyFreshTree','isall=ture&expand='+id.substr(treeFlag.length)+'&treeFlag='+treeFlag+'&nodeDeepandSate='+calculateDeepAndState(treeFlag,id));
			document.all('checkbox:'+id).checked=checkornot;
			/*按照父节点的checkbox值为子孙节点赋值*/
			selectChildrenWithID(treeFlag,id);         
        }
      }      
	}   
   var CHECKBOX_NAME_PRE="checked_node_";  
   /**
   *@author UNEAP
   *@param none
   *@descreption 本方法是重写方法，是点击checkbox出发展开子孙节点的触发点
   *
   */
   function selectChildren(){	        	
		var imgid=window.event.srcElement.id;
		var id=imgid.substr(imgid.indexOf(':')+1);
		var checkboxLogical=document.all(imgid).checkboxLogical;		
	 	if(document.all(id).hasChildren=="true" && document.all(id).isExpand=="false"){	
		   /* 点击checkbox出发展开子孙节点的入口程序*/
		   onclickforexpandALL();
		}
	 	allSelectandallCancel(imgid,id);
		selectParentandCancelChildren(imgid,id);
	}
	
   /**
   *@author UNEAP
   *@param imgid：checkbox选中触发元素名；id目标节点id
   *@descreption 本方法是重写方法，是选中所有父亲节点的重写方法，该方法能够提高１０倍效率。
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
	   *@param imgid：checkbox选中触发元素名；id目标节点id
	   *@descreption 本方法是重写方法，是选中或取消所有孩子的重写方法，该方法能够提高１０倍效率。
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
   *@descreption 本方法是重写方法，当选中+号时加载所有子孙节点。
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
//---------- add 20070209  增加 取消所有孩子节点后自动取消其父节点的功能  -------

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
           alert('此角色暂时没有任何权限');
           return;
       }
         
       if(needCheckBox == 'true'){
       	   //parent.parent.parent.RoleButton.document.forms[0].bAdd.disabled = '';   
       	  // parent.parent.parent.RoleButton.document.forms[0].bSelectAll.disabled = '';
       	   //parent.parent.parent.RoleButton.document.forms[0].bDeleteAll.disabled = ''; 
       } 
   }   
    //全选中
    function selectAllMenus(treeId,status){
    	setAllNodeStatus(treeId,status);  
    }
    
    //全取消
    function deleteAllMenus(treeId,status){
	    setAllNodeStatus(treeId,status);
	}
	
	/**
	   * 提交
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
	   * 导出MENU菜单信息
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
						<button class="formButton" name="bAdd" onClick="doSubmit('childTree');" title="只提交子菜单树中的赋权信息">提&#160;&#160;交</button>
						<button class="formButton" name="bSelectAll" onClick="selectAllMenus('childTree',true)" >全&#160;&#160;选</button>
						<button class="formButton" name="bDeleteAll"  onClick="deleteAllMenus('childTree',false)" >全部取消</button>
					<%}else{%>
						<button style="display:none" class="formButton" name="bExport" onClick="doExport();" title="导出XSL">导&#160;&#160;出</button>
				
					<%} %>
				</div>
			</td>
		</tr>
	</table>                                                                        
</form>
</body>
</html>