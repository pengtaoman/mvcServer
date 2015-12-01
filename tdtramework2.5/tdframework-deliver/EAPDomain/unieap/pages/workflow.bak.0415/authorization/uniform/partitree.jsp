<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="java.util.Vector"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<html>
<head>
<title></title>
<uniflow:style/>
<link rel ="stylesheet" type="text/css" href="<%=request.getContextPath()%>/unieap/pages/workflow/stylesheet/style1/treeview.css">
<script language="JavaScript" src="<%=request.getContextPath()%>/unieap/pages/workflow/js/TreeView.js"></script>
<script language="JavaScript">
var tree = new TreeView();
tree.setImagePath("<%=request.getContextPath()%>/unieap/pages/workflow/stylesheet/style1/tree_img/");
tree.add(1,0,"<%=MessageUtil.getString("workflow.authorization.uniform.tree.roleparticipant",session)%>","javascript:void(0)",null,null);
tree.add(2,1,"<%=MessageUtil.getString("workflow.authorization.uniform.tree.role",session)%>","javascript:void(0)",null,Icon.root1.src);
     <%
     Vector vroles = (Vector)request.getAttribute("roles");
	  for(int i=0;i<vroles.size();i++){
	    %>
	       <%=(String)vroles.elementAt(i)%>
    <%}%>
tree.add(1000,1,"<%=MessageUtil.getString("workflow.authorization.uniform.tree.person",session)%>","javascript:void(0)",null,Icon.root.src);
     <%
     Vector vuser = (Vector)request.getAttribute("users");
	  for(int i=0;i<vuser.size();i++){
	    %>
	        <%=(String)vuser.elementAt(i)%>
     <%}%>
	  tree.add(3000,1,"<%=MessageUtil.getString("workflow.authorization.uniform.tree.other",session)%>","javascript:void(0)",null,Icon.other.src);
    <%
     Vector vohters = (Vector)request.getAttribute("others");
	  for(int i=0;i<vohters.size();i++){
	    %>
	        <%=(String)vohters.elementAt(i)%>
     <%}%>
tree.setShowAll(false);
tree.setup();
var isFirst = false;
function clickOnNode(nodeValue){
  var indexLoc = nodeValue.indexOf("&");
  var personID = nodeValue.substring(0,indexLoc);
 if(parent.rightframe.obj_applet!=null){
   parent.rightframe.obj_applet.definitedUserAction("<%=request.getAttribute("activityid")%>",personID);
 }
   if(parent.rightframe.form_applet!=null){
   	  if(!isFirst){ 
      	parent.rightframe.setFormOperators("<%=(String)request.getAttribute("actparti")%>");
      	isFirst = true;
      }
      parent.rightframe.setOrgElementName(personID);
   }
}
var actparti;
function inits(){
	actparti = "<%=request.getAttribute("actparti")%>";
    parent.rightframe.location.href = "<%=request.getContextPath()%>/unieap/pages/form/eapformprivilege.jsp?formid=<%=request.getParameter("formid")%>&activityid=<%=request.getParameter("activityid")%>&participants=<%=new String((request.getParameter("participants")).getBytes("iso-8859-1"))%>";
}
</script>
<style>
body{ font:12px Arial;color:#000000;text-decoration:none;padding:10px}
</style>
</head>
<BODY leftmargin="0" topmargin="20" marginwidth="0" marginheight="20" onload="inits()">
<form name="frm" action="<%=request.getContextPath()%>/participantstree.do" target="_self" method="POST">
</form>

</body>
</html>
