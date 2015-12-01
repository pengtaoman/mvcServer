<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.fileUpLoadForms.FileUpLoadForm"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String xmlStr = ((String)request.getAttribute("xmlStr"));
%>
<html:html locale="true">
<head>
    <title>上传流程文件</title>	
    <script type="text/javascript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
    <script type="text/javascript" src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/manualNode.js"></script>
	<LINK href="<%=WorkflowManager.getWorkflowPath()%>/stylesheet/Style.css" rel=stylesheet>
    <script type="text/javascript">
    function fileUpSumbit(){
    	document.fileUpLoadForm.action.value="close";
    	document.fileUpLoadForm.submit();
    }

   function LoadName(){ 
	    if(document.all){
    		self.resizeTo(520,150); 
    	}else{
    		self.resizeTo(520,175); 
    	}  
	    var flag='<%=(String)request.getAttribute("action")%>';
	    if(flag=="close"){
	 	if(document.all){
	 	opener.importXMLintoFlex(document.fileUpLoadForm.xmlStr.value);
	 	}else{
	 	opener.location="javascript:importXMLintoFlex("+document.fileUpLoadForm.xmlStr.value+")";
	 	}
	    window.close();
	    }
	}
    </script>
</head>
<body   onLoad="LoadName();"><br>
<html:form action="toFileUpLoad.do" enctype="MULTIPART/FORM-DATA">
<table border="1" width="450" cellpadding="4" cellspacing="2" bordercolor="#9BD7FF">
<tr><td width="100%" colspan="2">

                       <input type="file" size="40" id="fileUp" name="file1">

        </td></tr>
</table>
 <table width="450">

        <tr><td align="right" width="100%" colspan="2"><input type="button" name="Submit" class="button_normal"  onclick="fileUpSumbit()" value="开始上传"/></td></tr>

       </table>

<html:hidden  property="action" value=""/>
<html:hidden property="xmlStr"  value='<%=xmlStr %>'/>
</html:form>

</body>

</html:html>