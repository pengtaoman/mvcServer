<%@ page language="java" contentType="text/html; charset=UTF-8"%><%
response.setHeader("Pragma","No-cache"); 
response.setHeader("Cache-Control","no-cache"); 
response.setDateHeader("Expires", 0); 
out.print((String)request.getAttribute("rootArrayStr"));
%>