<%@ page language="java" contentType="text/html;charset=gb2312" %>
<%
	String path = request.getContextPath(); 
	String tableId = request.getParameter("tableId")==null?"":request.getParameter("tableId");
	String mainColumn = request.getParameter("mainColumn"); 
	String query = "";
	if(mainColumn==null || mainColumn.equals("null")){
		query=path+"/om/filterRelManage.do?method=initAddPage&tableId="+tableId;
	}else{
		query=path+"/om/filterRelManage.do?method=initModifyPage&tableId="+tableId+"&mainColumn="+mainColumn;
	}
	String detail = path+"/views/om/organ/dataParamRole/filterRelation/hiddenPage.jsp";	
%>
<html>
<head>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="content-type" content="text/html; charset=gb2312">
<title></title>
</head>
<frameset id="myFrame" rows="130,*,0" frameborder="NO" border="0" framespacing="0">
  <frame name="query"  scrolling="NO" noresize src="<%=query%>"/>
  <frame name="list"   scrolling="auto" noresize src=""/>
  <frame name="detail" scrolling="no"  noresize src="<%=detail%>"/>
</frameset>
</html>
