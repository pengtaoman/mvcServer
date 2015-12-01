<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String xmlStr = ((String) request.getAttribute("xmlStr"));
	String id = ((String) request.getAttribute("id"));
%>


<%@page import="com.neusoft.workflow.model.Data"%>

<%@page
	import="com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.workflowResourceForms.AppForm;"%>
<html:html locale="true">
<head>
	<LINK
		href="<%=WorkflowManager.getWorkflowPath()%>/stylesheet/Style.css"
		rel=stylesheet>
	<base href='<%=basePath%>'>
	<title>App Attribute</title>
	<script type="text/javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
	<script type="text/javascript">
	 if(document.all){
    		self.resizeTo(635,440); 
    	}else{
    		self.resizeTo(635,440); 
    	}
    function LoadName(){ 
   
          var action = '<%=request.getAttribute("close_flag")%>';
          if(action == "close"){
             var xmlStr = document.appForm.xmlStr.value;
             var id = '<%=request.getAttribute("id")%>';
             var templateNodeType = '<%=request.getAttribute("templateNodeType") == null ? ""
								: request.getAttribute("templateNodeType")%>'
             window.close();      
			if(templateNodeType != '')
			{ 
				  //把jsp的编辑信息，回写到flex树上
				  opener.callFlexTree(xmlStr,id ,'',templateNodeType);
			}
			else
			{
					opener.callFlex(xmlStr , id);
			}
          }
    }
	function validateInput() {
	
		if (!((window.event.keyCode >= 48) && (window.event.keyCode <= 57))
				&& !((window.event.keyCode >= 65) && (window.event.keyCode <= 90))
				&& !((window.event.keyCode >= 97) && (window.event.keyCode <= 122))
				&& !(window.event.keyCode == 95)) {
			window.event.keyCode = 0;
		}
	}
	function displayURIInput(type){
	    if(type =="wform"){
	    	document.getElementById('textURI').style.display="none";
	         document.getElementById('formRUI').style.display="";
	        
	    }else{
	        document.getElementById('textURI').style.display="";
	         document.getElementById('formRUI').style.display="none";
	    }
	}
    </script>
</head>

<body onLoad="LoadName()" style="margin: 0px; padding: 10px">
	<br>
	<html:form action="toApp.do">
		<div class="main_label_outline" style="width: 570px;">
			<table style="font-size: 13px; width: 560px;">
				<tr>
					<td style="width: 90px;">
					</td>
					<td style="width: 60px">
					</td>
					<td style="width: 130px">
					</td>
					<td style="width: 90px">
					</td>
					<td>
					</td>
				</tr>
				<tr>
					<td>
						名称:
					</td>
					<td align="left" colspan="4">
						<html:text property="name" style="width:450px"
							value='<%=((AppForm) request.getAttribute("AppForm"))
									.getName()%>' />
					</td>
				</tr>
				<tr>
					<td valign="top">
						描述:
					</td>
					<td align="left" colspan="4">
						<html:textarea property="desc" style="width:450px;height:100px;"
							value='<%=((AppForm) request.getAttribute("AppForm"))
									.getDesc()%>' />
					</td>
				</tr>
				<tr>
					<td>
						信息:
					</td>
					<td>
						定义者:
					</td>
					<td align="left">
						<html:text property="builder" style="width:120px"
							value='<%=((AppForm) request.getAttribute("AppForm"))
									.getBuilder()%>' />
					</td>
					<td>
						创建时间:
					</td>
					<td align="left">
						<html:text property="buildTime" style="width:150px"
							readonly="true"
							value='<%=((AppForm) request.getAttribute("AppForm"))
									.getBuildTime()%>' />
					</td>
				</tr>
				<tr>
					<td>
						管理器:
					</td>
					<td align="left" colspan="4">
						<html:text property="appHost" style="width:450px"
							onkeypress="validateInput()"
							value='<%=((AppForm) request.getAttribute("AppForm"))
									.getAppHost()%>' />
					</td>
				</tr>
				<tr>
					<td>
						调用方式:
					</td>
					<td align="left" colspan="4">
						<input type="radio"
							<%=((AppForm) request.getAttribute("AppForm"))
									.getSynchMode().equals("1") ? "checked"
							: ""%>
							value="0" name="synchMode" />
						同步
						<input type="radio"
							<%=((AppForm) request.getAttribute("AppForm"))
									.getSynchMode().equals("0") ? "checked"
							: ""%>
							name="synchMode" value="1" />
						异步
					</td>
				</tr>
				<tr>
					<td>
						程序类型:
					</td>
					<td align="left" colspan="4">
						<!--<input type="radio" onclick="displayURIInput('wform')"
						<%=((AppForm) request.getAttribute("AppForm"))
									.getAppType().equals("wform") ? "checked"
							: ""%>
						value="wform" name="appType" />
					表单
					-->
						<input type="radio" onclick="displayURIInput('Java')"
							<%=((AppForm) request.getAttribute("AppForm"))
									.getAppType().equals("Java") ? "checked"
							: ""%>
							name="appType" value="Java" />
						Java
						<input type="radio" onclick="displayURIInput('url')"
							<%=((AppForm) request.getAttribute("AppForm"))
									.getAppType().equals("url") ? "checked"
							: ""%>
							name="appType" value="url" />
						URL
						<input type="radio" onclick="displayURIInput('EXE')"
							<%=((AppForm) request.getAttribute("AppForm"))
									.getAppType().equals("EXE") ? "checked"
							: ""%>
							name="appType" value="EXE" />
						EXE
						<!--<input type="radio" onclick="displayURIInput('Pageflow')"
						<%=((AppForm) request
											.getAttribute("AppForm"))
											.getAppType().equals("Pageflow") ? "checked"
									: ""%>
						name="appType" value="Pageflow" />
					页面流
				-->
					</td>
				</tr>
				<tr>
					<td>
						程序URI:
					</td>
					<td align="left" colspan="4">
						<div id="textURI">
							<table border="0" width="100%">
								<tr>
									<td>
										<html:text property="appUrl" style="width:450px"
											value='<%=((AppForm) request.getAttribute("AppForm"))
									.getAppUrl()%>' />
									</td>
								</tr>
							</table>
						</div>
						<div style="display: none" id="formRUI">
							<table>
								<tr>
									<td>
										<html:text property="appUrl" style="width:400px"
											value='<%=((AppForm) request.getAttribute("AppForm"))
									.getAppUrl()%>' />
									</td>
									<td>
										<input type="button" value="取消" class="button_normal"
											onclick="window.close()" />
									</td>
								</tr>
							</table>
						</div>

					</td>
				</tr>
			</table>
			<table style="font-size: 13px; width: 520px;">
				<tr>
					<td align="right">
						<input type="submit" value="提交" class="button_normal" />
						&nbsp;
						<input type="button" value="取消" class="button_normal"
							onclick="window.close()" />
					</td>
				</tr>
			</table>
		</div>
		<html:hidden property="id" value='<%=id%>' />
		<html:hidden property="xmlStr" value='<%=xmlStr%>' />
	</html:form>
</body>
</html:html>