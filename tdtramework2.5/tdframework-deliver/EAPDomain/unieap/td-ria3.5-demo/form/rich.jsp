<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="com.neusoft.tdframework.authorization.*" %>
<%@ page import="com.neusoft.tdframework.common.GlobalParameters" %>
<% 

AuthorizeVO authorizeVO = (AuthorizeVO)session.getAttribute(GlobalParameters.SESSION_INFO);

out.println("!!!!!!!!!!!!!!!! SESSION HOME-CITY-CODE :   " + authorizeVO.getHomeCity());

out.println("!!!!!!!!!!!!!!!! SESSION ID :   " + session.getId());
%>
