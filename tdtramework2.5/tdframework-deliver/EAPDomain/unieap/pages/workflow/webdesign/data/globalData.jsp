<%@page import="com.neusoft.workflow.globaldatamodel.GlobalDatasDocument"%>
<%@page import="com.neusoft.uniflow.web.webdesign.data.beans.GlobalDataReadForm;"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
response.setHeader("Pragma","No-cache"); 
response.setHeader("Cache-Control","no-cache"); 
response.setDateHeader("Expires", 0); 
GlobalDataReadForm dataForm= (GlobalDataReadForm)request.getAttribute("globalDataReadForm");
GlobalDatasDocument datas = dataForm.getDatas();
out.println(datas.toString());
//System.out.print(datas.toString());
%>