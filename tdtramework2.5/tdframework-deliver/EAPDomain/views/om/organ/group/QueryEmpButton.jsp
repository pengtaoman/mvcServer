<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	String operType = request.getParameter("operType");
	String groupId = request.getParameter("groupId");
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
			var operType = document.getElementById("operType").value;
			if(operType == "show"){
				document.getElementById("workNo").readOnly="true";
				document.getElementById("name").readOnly="true";
				document.getElementById("bQuery").disabled="true";
			}
		}
      /**
	   * 查询角色
	   */
       function bQueryClick(){  
           document.getElementById("EAPForm").target="empList";
           var groupId = document.getElementById("groupId").value;
           document.getElementById("EAPForm").action="groupAction.do?method=queryEmp&groupId="+groupId;
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
						<td class="tableTitle2">组内工号信息</td>
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
							<td class="formLabel" align="left">工号</td>
							<td align="center"  class="formField" >
								<input type="text" class="textType" name="workNo" value="" onKeyDown="keyDown();nas_enter()" onFocus="keyDown()"/>
							</td>
							<td class="formLabel" align="left">姓名</td>
							<td align="center"  class="formField" >
								<input type="text" class="textType" name="name" value="" onKeyDown="keyDown();nas_enter()" onFocus="keyDown()"/>
							</td>
						</tr>
					</table>
			   </td>
		       <td class="formTableR" >&#160;</td>
		    </tr> 
		    <tr> 
			   <td class="formTableLB">&#160;</td>
			   <td class="formTableB">
			   	    <input type="hidden" name="groupId" id="groupId" value=<%=groupId %> />
			   	    <input type="hidden" name="operType" value="<%=operType %>" />
			   </td>
			   <td class="formTableRB">&#160;</td>
		    </tr>
		 </table>
		 
		 <div class="formButtonDIV" id="filebutton1" style="display:block"> 
			<button class="formButton" name="bQuery" onClick="bQueryClick();return false;">查&#160;&#160;找</button>
		 </div>
	</form>
	</body>
</html>
