<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import = "com.neusoft.uniflow.web.webdesign.data.beans.ActTempletsDocReadForm" %>
<%@ page import = "com.neusoft.workflow.ActTempletsDocument" %>
<%
response.setHeader("Pragma","No-cache"); 
response.setHeader("Cache-Control","no-cache"); 
response.setDateHeader("Expires", 0); 
ActTempletsDocReadForm ATDForm= (com.neusoft.uniflow.web.webdesign.data.beans.ActTempletsDocReadForm)request.getAttribute("actTempletsDocReadForm");
ActTempletsDocument actTempletsDoc = ATDForm.getATDoc();
out.println(actTempletsDoc.toString());
//System.out.print(actTempletsDoc.toString());
%>