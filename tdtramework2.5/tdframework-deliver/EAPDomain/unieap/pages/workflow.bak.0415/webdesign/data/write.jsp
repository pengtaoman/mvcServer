<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import = "com.neusoft.uniflow.web.webdesign.data.beans.DataWriteForm" %>
<%@ page import = "com.neusoft.workflow.model.ProcessContentDocument" %>
<%
response.setHeader("Pragma","No-cache");
response.setHeader("Cache-Control","no-cache");
response.setDateHeader("Expires", 0); 
DataWriteForm DWF= (com.neusoft.uniflow.web.webdesign.data.beans.DataWriteForm)request.getAttribute("datawriteform");
String hasError = DWF.getHasError();
out.print(hasError);
ProcessContentDocument PCD = DWF.getPCD();
//System.out.print(PCD.toString());
%>
