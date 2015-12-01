<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import = "com.neusoft.uniflow.web.webdesign.data.beans.DataReadForm" %>
<%@ page import = "com.neusoft.workflow.model.ProcessContentDocument" %>
<%
response.setHeader("Pragma","No-cache"); 
response.setHeader("Cache-Control","no-cache"); 
response.setDateHeader("Expires", 0); 
DataReadForm DOF= (com.neusoft.uniflow.web.webdesign.data.beans.DataReadForm)request.getAttribute("datareadform");
ProcessContentDocument PCD = DOF.getEPDoc();
out.println(PCD.toString());
%>
