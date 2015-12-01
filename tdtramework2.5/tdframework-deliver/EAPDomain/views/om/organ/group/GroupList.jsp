<%@ page contentType="text/html;charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
<%@ page import="java.util.List"%>
<%@ page import="com.neusoft.om.dao.group.GroupVO"%>
<%
     String path =request.getContextPath();
     List groupList = (List)request.getAttribute("groupList");
     String message=(String)request.getAttribute("message");
     String action = path+"/om/groupAction.do?method=getGroup";
%>
<html>
<head>
<TITLE>功能角色维护</TITLE>
<link href="<%=path%>/common/css/td_style.css"    rel=stylesheet></link>
<link href="<%=path%>/common/css/td_style_ec.css" rel=stylesheet></link>
  
<script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
<script language="javascript" src="<%=path%>/common/js/titlebar.js"></script>
<script language="javascript" src="<%=path%>/unieap/js/Common.js"></script>
<script language="javascript" src="<%=path%>/unieap/js/Globals.js"></script>
<script language="javascript" src="<%=path%>/common/js/eccn.js"></script>
<script language="javascript" src="<%=path%>/common/js/waitingbar.js"></script>
<script language="javascript" src="<%=path%>/common/js/prototypeajax.js"></script>
<script language="javascript">
     var eccn=new ECCN("ec");
     
     function load() {
		 eccn.doPrep=false;
		 eccn.init();
	   
	     <%if(message!=null&&!message.equals("")){%>
	          var msg='<%=message%>';
	          alert(msg);
		 <%}%>
		 var EAPForm = parent.QueryButton.EAPForm;    

         EAPForm.bModify.disabled=true;
         EAPForm.bDelete.disabled=true;
		 EAPForm.bGrant.disabled=true;
		 EAPForm.bView.disabled=true;
		 parent.empList.location='<%=path%>'+"/views/om/blank.html";
	 }
	
	 var rid='';
	 var rname='';
	 
	 function radioOnclick(groupId,groupName,groupDesc){
	 	 var EAPForm = parent.QueryButton.EAPForm;         
         EAPForm.bView.disabled=false;
         EAPForm.bModify.disabled=false;
         EAPForm.bDelete.disabled=false;
         EAPForm.bGrant.disabled=false;
         EAPForm.groupId.value=groupId;
         EAPForm.bView.click();        
     }   		

</script>
</head>
<body onLoad="load()"  >	
<%if(groupList==null||groupList.isEmpty()) {%>
	<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
		<tr class="tableTitleTR2">
			<td colspan="4" >
			<table width="100%" border="0" cellpadding="0" cellspacing="0" >
	            <tr>
				<td class="tableTitleLeft2" >&#160;</td>
				<td class="tableTitle2">组信息&#160;</td>
				<td class="tableTitleRight2" >&#160;</td>
				</tr>
			 </table>
			 </td>
		</tr>
	    <tr> 
	       <td class="formTableL" >&#160;</td>
	       <td class="formTableC" align="center">
				<span style="font-size:20px;color:red;">无符合条件的组信息</span>
		   </td>
	       <td class="formTableR" >&#160;</td>
	    </tr> 
		<tr> 
		    <td class="formTableLB">&#160;</td>
		    <td class="formTableB">&#160;</td>
		    <td class="formTableRB">&#160;</td>
		</tr>        
	</table>
<%}else{%>

	<ec:table items="groupList" var="group" action="<%=action %>"> 
			<ec:row >
			    <ec:column property="recordId" title=" " width="15px">
                 <input type="radio" name="radio" class="radio" id="${group.groupId}" onclick="radioOnclick('${group.groupId}','${group.groupName}','${group.groupDesc}')" />
                </ec:column>
				<ec:column property="groupId" title="组编号">
				</ec:column>
				<ec:column property="groupName" title="组名称">
				</ec:column>
				<ec:column property="groupDesc" title="描述">
				</ec:column>
		   </ec:row>		   
	</ec:table>

<%}%>
</body>
</html>
