<%@ page contentType="text/html;charset=GBK" language="java" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%
	String certificateType = (String)request.getAttribute("certificateType");
	if("sfz".equals(certificateType)){
    	certificateType = "IDCard" ;
    }else{
    	certificateType = "Number" ;
    }
%>
<unieap:input tcname="<%=certificateType%>" id="certificateNumber" name="certificateNumber" prompt="Ö¤¼þºÅÂë" isnullable="false"/>*