<%@ page contentType="text/html;charset=GBK" language="java" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%
  request.getSession().setAttribute("temptree", request.getSession().getAttribute("menuTree"));
  long now1=System.currentTimeMillis();
  String loadMode = (String) request.getAttribute("loadMode");
  String needCheckBox = (String) request.getAttribute("needCheckBox");
%>

<unieap:tree  tree='menuTree' includeRootNode="false" readOnly="true"  needCheckBox='<%=needCheckBox%>' textClass="TreeNode" 
              jsMethodForOnclick="clicknodeforexpandorcollapse" checkboxLogical="3" mode='<%=loadMode%>'/>                                                                            
<%
  request.getSession().setAttribute("menuTree", request.getSession().getAttribute("temptree"));
  request.getSession().removeAttribute("temptree");
%>
