<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	String roleTreeTab = path+"/views/om/organ/funcrole/RoleTreeTab.jsp";
    String childTreeTab = path+"/views/om/organ/funcrole/RoleTreeTab.jsp?operType=openChildPage";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>RoleManage.jsp</title>
    <link href="<%=path%>/common/css/td_style.css" rel=stylesheet type="text/css">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <script language="JavaScript">
      /* 
       *ҳ���ʼ������
       */
	  function load(){
	      buttonControl();
	  }
	  /* 
       *�޸İ�ť״̬����
       */
       function buttonControl(){
	      var arrayBtn=new Array(EAPForm.bAdd,EAPForm.bModify,EAPForm.bDelete,EAPForm.bGrant,EAPForm.bView,EAPForm.bApp);
		  for(var i=0;i<arrayBtn.length;i++){
		      if(arrayBtn[i].name!='bAdd')
		         arrayBtn[i].disabled=true;
		      else
		         arrayBtn[i].disabled=false;
		  }
	   }
	  /**
	   * ����
	   */
	   function bAddClick(){
           rname='';
           var nameDesc =window.showModalDialog('<%=path%>/views/om/organ/funcrole/AddRolePage.jsp',rname, 
          					"status:no;dialogWidth:300px;dialogHeight:160px");
           if(nameDesc == undefined){
               return;
           }
           
           var nameDescAry = nameDesc.split('`');
           var newNewRoleName = nameDescAry[0];
           var roleDesc = nameDescAry[1];
           
           if(newNewRoleName!=undefined){
	           EAPForm.roleName.value=newNewRoleName;
	           EAPForm.roleDesc.value=roleDesc;
	           
	           buttonControl();
	           
	           document.getElementById("EAPForm").target="RoleList";
	           document.getElementById("EAPForm").action="roleManage.do?method=doAddRoleInfo";
	           document.getElementById("EAPForm").submit();

          	   parent.RoleManage.location='<%=roleTreeTab%>';
	           //parent.ChildMenuTree.location='<%=childTreeTab%>';
	           parent.RoleButton.location='<%=path%>'+'/views/om/blank.html';
           }else{
         	   return;
           }
       }    
      /**
	   * �޸�
	   */
       function bModifyClick(){
      	  rname=EAPForm.roleName.value;
      	  var param = rname;
      	  rdesc=EAPForm.roleDesc.value;
      	  if(rdesc != 'undefined'){
	      	  param = rname+'`'+rdesc;
      	  }
      	  var nameDesc=window.showModalDialog('<%=path%>/views/om/organ/funcrole/AddRolePage.jsp',param, 
      	  					"status:no;dialogWidth:350px;dialogHeight:180px");
      	  if(nameDesc == undefined){
               return;
           }
      	  var nameDescAry = nameDesc.split('`');
          var newNewRoleName = nameDescAry[0];
          var roleDesc = nameDescAry[1];
          var priRoleName = nameDescAry[2];
          if(newNewRoleName!=undefined){
	          EAPForm.roleName.value=newNewRoleName;
	          EAPForm.roleDesc.value=roleDesc;
	          EAPForm.priRoleName.value = priRoleName;
	          
	          buttonControl();
	          
	          document.getElementById("EAPForm").target="RoleList";
	          document.getElementById("EAPForm").action="roleManage.do?method=doModifyRoleInfo";
	          document.getElementById("EAPForm").submit();
	          
	          parent.RoleManage.location='<%=roleTreeTab%>';
	          //parent.ChildMenuTree.location='<%=childTreeTab%>';
	          parent.RoleButton.location='<%=path%>'+'/views/om/blank.html';
          }else{
          	  return;
          }
       }
	  /**
	   * ɾ��
	   */
       function bDeleteClick(){
          if (!confirm('��ȷ��Ҫɾ��ô��'))	
          	  return;
          
		  buttonControl();
		  
          document.getElementById("EAPForm").target="RoleList";
          document.getElementById("EAPForm").action="roleManage.do?method=doDeleteRoleInfo";
          document.getElementById("EAPForm").submit();
          
          parent.RoleManage.location='<%=roleTreeTab%>';
	      //parent.ChildMenuTree.location='<%=childTreeTab%>';
	      parent.RoleButton.location='<%=path%>'+'/views/om/blank.html';
       } 
      /**
	   * ��Ȩ
	   */
       function bGrantClick(){           
          var roleId = EAPForm.roleId.value;
          
          parent.RoleManage.location='<%=path%>'+'/views/om/organ/funcrole/RoleTreeTab.jsp?operType=grantRole&roleId='+roleId;
   		  parent.RoleButton.location='<%=path%>'+'/views/om/organ/funcrole/RoleButton.jsp';
       }
      /**
	   * Ӧ�ø�Ȩ
	   */
       function bGrantApp(){
	      var roleId = EAPForm.roleId.value;
	      if(roleId == null){
	      	  alert("����ѡ���ɫ���ڽ���Ӧ�ø�Ȩ");
	      	  return;
	      }
	      var url = "<%=path%>/roleManage.do?method=grantAppRole&roleId="+roleId;
	      var result=window.showModalDialog(url,"window","status:no;dialogWidth:400px;dialogHeight:300px");
   	   } 
      /**
	   * �鿴��ɫ��Ϣ
	   */
       function bViewClick(){       
          var roleId = EAPForm.roleId.value;          
          parent.RoleManage.location='<%=path%>'+'/views/om/organ/funcrole/RoleTreeTab.jsp?operType=viewRole&roleId='+roleId;  
       } 
      /**
	   * ��ѯ��ɫ
	   */
       function bQueryClick(){  
      	  var roleName = EAPForm.qrolename.value;
      	  var roleDesc = EAPForm.qroledesc.value;
            document.getElementById("EAPForm").target="RoleList";
            document.getElementById("EAPForm").action="roleManage.do?method=queryRole";
            document.getElementById("EAPForm").submit();
      }
	 /**
	  * ���һس�����
	  */
	  function nas_enter(){
		  var scode=(navigator.appname=="Nwtscape")?event.which:event.keyCode;
		  if(scode == 13){
			  bQueryClick();
		  }
	  }
	 
	  function keyDown(){
     	  EAPForm.bQuery.disabled=false;
      }
</script>
  </head>
  <body onload="load()">
	<form method="POST" id="EAPForm" name="EAPForm">
		<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
			 <tr class="tableTitleTR2">
				<td colspan="4" >
					<table width="100%" border="0" cellpadding="0" cellspacing="0" >
			            <tr>
						<td class="tableTitleLeft2" >&#160;</td>
						<td class="tableTitle2">���ܽ�ɫ��Ϣ</td>
						<td class="tableTitleRight2" >&#160;</td>
						</tr>
					 </table>
				 </td>
			</tr>
			<tr> 
		       <td class="formTableL" >&#160;</td>
		       <td class="formTableC">		 	 			
					<table border="0" cellpadding="0" cellspacing="2" class="formTableCore">
						<tr>							
							<td class="formLabel" align="left">��ɫ����</td>
							<td align="center"  class="formField" >
								<input type="text" class="textType" name="qrolename" value="" onKeyDown="keyDown();nas_enter()" onFocus="keyDown()"/>
							</td>
						</tr>
						<tr>	
							<td class="formLabel" align="left">��ɫ����</td>
							<td align="center" >
								<input type="text" class="textType" name="qroledesc" value="" onKeyDown="keyDown();nas_enter()" onFocus="keyDown()"/>
							</td>									
							<td class="formField" colspan="2" align="center">
								<button class="formButton" name="bQuery" onClick="bQueryClick();return false;">��&#160;&#160;��</button>
							</td>           
						 </tr>		
					</table>
			   </td>
		       <td class="formTableR" >&#160;</td>
		    </tr> 
		    <tr> 
			   <td class="formTableLB">&#160;</td>
			   <td class="formTableB">
			   	    <input type="hidden" name="roleId" id="roleId"/>
   					<input type="hidden" name="roleName" id="roleName"/>
   					<input type="hidden" name="roleDesc" id="roleDesc"/>
   					<input type="hidden" name="priRoleName" id="priRoleName"/>
			   </td>
			   <td class="formTableRB">&#160;</td>
		    </tr>
		 </table>
		 
		 <div class="formButtonDIV" id="filebutton1" style="display:block"> 
			<button class="formButton" name="bAdd"    onClick="bAddClick();return false;">��&#160;&#160;��</button>
			<button class="formButton" name="bModify" onclick="bModifyClick();return false;">��&#160;&#160;��</button>
			<button class="formButton" name="bDelete" onClick="bDeleteClick();return false;">ɾ&#160;&#160;��</button>
		 </div>
		 <div class="formButtonDIV" id="filebutton2" style="display:block"> 
			<button class="formButton" name="bGrant" onclick="bGrantClick();return false;">��&#160;&#160;Ȩ</button>
			<button class="formButton" name="bApp"   onClick="bGrantApp();return false;">Ӧ�ø�Ȩ</button>
			<button class="formButton" name="bView"  onClick="bViewClick();return false;">�鿴Ȩ��</button>
		 </div>
	</form>
	</body>
</html>
