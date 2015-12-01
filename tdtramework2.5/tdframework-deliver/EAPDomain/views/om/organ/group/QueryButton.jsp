<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
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
       *页面初始化方法
       */
	  function load(){
	      buttonControl();
	  }
	  /* 
       *修改按钮状态方法
       */
       function buttonControl(){        
         EAPForm.bView.disabled=false;
         EAPForm.bModify.disabled=false;
         EAPForm.bDelete.disabled=false;
         EAPForm.bGrant.disabled=false;

	   }
	   var webpath = '<%=path%>';
	  /**
	   * 增加
	   */
	   function bAddClick(){
		 	var url = webpath + "/views/om/organ/group/Modify.jsp?method=doAdd";
			var width =550;
			var height = 200;
			var wleft=(screen.width-width)/2;
			var wtop=(screen.availHeight-height)/2-20;
			dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
			window.open(url,'markpage',dimensions);
       }    
      /**
	   * 修改
	   */
       function bModifyClick(){
       		var groupId = document.getElementById('groupId').value;
		 	var url = webpath + "/om/groupAction.do?method=modifyInit&groupId="+groupId;
			var width =550;
			var height = 200;
			var wleft=(screen.width-width)/2;
			var wtop=(screen.availHeight-height)/2-20;
			dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
			window.open(url,'markpage',dimensions);       	
       }
	  /**
	   * 删除
	   */
       function bDeleteClick(){
          if (!confirm('您确定要删除么？'))	
          	  return;          
		  buttonControl();		  
          document.getElementById("EAPForm").target="GroupList";
          document.getElementById("EAPForm").action="groupAction.do?method=doDeleteGroup";
          document.getElementById("EAPForm").submit();    
       } 
      /**
	   * 赋权
	   */
       function bGrantClick(){           
          var groupId = document.getElementById('groupId').value;  
          parent.queryEmp.location='<%=path%>'+"/views/om/organ/group/QueryEmpButton.jsp?operType=search&groupId="+groupId;        
          parent.empList.location='<%=path%>'+'/om/groupAction.do?method=queryEmp&groupId='+groupId;
       }
      /**
	   * 查看角色信息
	   */
       function bViewClick(){       
          var groupId = document.getElementById('groupId').value;          
          parent.empList.location='<%=path%>'+'/om/groupAction.do?method=getEmp&groupId='+groupId;
          parent.queryEmp.location='<%=path%>'+"/views/om/organ/group/QueryEmpButton.jsp?operType=show"; 
       } 
      /**
	   * 查询角色
	   */
       function bQueryClick(){  
           document.getElementById("EAPForm").target="GroupList";
           document.getElementById("EAPForm").action="groupAction.do?method=getGroup";
           document.getElementById("EAPForm").submit();
      }
	 /**
	  * 查找回车动作
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
						<td class="tableTitle2">工号组信息</td>
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
							<td class="formLabel" align="left">组名称</td>
							<td align="center"  class="formField" >
								<input type="text" class="textType" name="groupNames" value="" onKeyDown="keyDown();nas_enter()" onFocus="keyDown()"/>
							</td>
							<td class="formField" colspan="2" align="center">
								<button class="formButton" name="bQuery" onClick="bQueryClick();return false;">查&#160;&#160;找</button>
							</td> 
						</tr>
					</table>
			   </td>
		       <td class="formTableR" >&#160;</td>
		    </tr> 
		    <tr> 
			   <td class="formTableLB">&#160;</td>
			   <td class="formTableB">
			   	    <input type="hidden" name="groupId" id="groupId" />
			   </td>
			   <td class="formTableRB">&#160;</td>
		    </tr>
		 </table>
		 
		 <div class="formButtonDIV" id="filebutton1" style="display:block"> 
			<button class="formButton" name="bAdd"    onClick="bAddClick();return false;">增&#160;&#160;加</button>
			<button class="formButton" name="bModify" onclick="bModifyClick();return false;">修&#160;&#160;改</button>
			<button class="formButton" name="bDelete" onClick="bDeleteClick();return false;">删&#160;&#160;除</button>
		 </div>
		 <div class="formButtonDIV" id="filebutton2" style="display:block"> 
			<button class="formButton" name="bGrant" onclick="bGrantClick();return false;">分配工号</button>
			<button class="formButton" name="bView"  onClick="bViewClick();return false;">查看组内工号</button>
		 </div>
	</form>
	</body>
</html>
