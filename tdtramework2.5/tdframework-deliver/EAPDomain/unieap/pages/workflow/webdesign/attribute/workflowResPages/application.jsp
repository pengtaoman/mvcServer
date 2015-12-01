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
    		self.resizeTo(660,440); 
    	}else{
    		self.resizeTo(660,440); 
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
          else
          {
          //如果当前应用程序类型为表单，则显示表单的输入域
          	var types=document.getElementsByName("appType");
          	var typeValue="";
          	for(var i=0;i<types.length;i++){
          		var type=types[i];
          		if(type.checked)
          			typeValue=type.value;
          	}
          	
          	if(typeValue=="wform")
	      	{
      			document.getElementById('textURI').style.display="none";
	         	document.getElementById('formURI').style.display="";
	      	}
          }
    }
    
    function trim(str) {
		return str.replace(/\s/g, "");
	}
	
	function submit_onclick(){
	  	if (trim(document.appForm.name.value) == "") {
			document.appForm.name.focus();
			alert("名称不可以为空")
			document.appForm.name.value = "";
			return false;
		}
	    document.appForm.submit();
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
		document.appForm.appUrl.value = "";
		document.appForm.appName.value = "";
	    if(type =="wform"){
	    	document.getElementById('textURI').style.display="none";
	         document.getElementById('formURI').style.display="";
	        
	    }else{
	    	
	        document.getElementById('textURI').style.display="";
	         document.getElementById('formURI').style.display="none";
	    }
	}
	
	function openFormList(event) {
		var obj = event.srcElement ? event.srcElement : event.target;
		var applicationPageName = obj.name
		var path ='<%=path%>';
		var left = (window.screen.availWidth - 635) / 2 + 320;
		var top = (window.screen.availHeight - 420) / 2;
		openUrl = path+ "/unieap/pages/workflow/webdesign/attribute/appnewmgt/formList.jsp";
		newWin = window
				.open(
						openUrl,
						'applicationPages',
						'height=520, width=250,  top='
								+ top
								+ ', left='
								+ left
								+ ',toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
	}

	// 清楚表单列表
	function clearUp() {
		document.appForm.appUrl.value = "";
		document.appForm.appName.value = "";
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
					<td align="left" style="width: 90px">
						ID:
					</td>
					<td align="left" colspan="4">
						<html:text property="id" readonly="true" style="width:450px;"
							styleClass="input_underline"
							value='<%=((AppForm) request
										.getAttribute("AppForm"))
										.getId()%>'>
						</html:text>
					</td>
				</tr>
				<tr>
					<td>
						名称:
					</td>
					<td align="left" colspan="4">
						<html:text property="name" style="width:450px"
							value='<%=((AppForm) request.getAttribute("AppForm"))
									.getName()%>' />*
					</td>
				</tr>
				<tr>
					<td valign="top">
						描述:
					</td>
					<td align="left" colspan="4">
						<html:textarea property="desc" style="width:450px;height:100px;font-size:13"
							value='<%=((AppForm) request.getAttribute("AppForm"))
									.getDesc()%>' />
					</td>
				</tr>
				<tr>
					<td>
						定义者:
					</td>
					<td align="left">
						<html:text property="builder" style="width:154px"
							value='<%=((AppForm) request.getAttribute("AppForm"))
									.getBuilder()%>' />
					</td>
					<td>
						创建时间:
					</td>
					<td align="left">
						<html:text property="buildTime" style="width:154px"
							readonly="true"
							value='<%=((AppForm) request.getAttribute("AppForm"))
									.getBuildTime()%>' />
					</td>
				</tr>
				<tr>
					<td>
						处理器:
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
							value="1" name="synchMode" />
						同步
						<input type="radio"
							<%=((AppForm) request.getAttribute("AppForm"))
									.getSynchMode().equals("0") ? "checked"
							: ""%>
							name="synchMode" value="0" />
						异步
					</td>
				</tr>
				<tr>
					<td>
						程序类型:
					</td>
					<td align="left" colspan="4">
						<input type="radio" onclick="displayURIInput('wform')"
						<%=((AppForm) request.getAttribute("AppForm"))
									.getAppType().equals("wform") ? "checked"
							: ""%>
						value="wform" name="appType" />
					表单
					
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
						<div style="display: none" id="formURI">
							<table>
								<tr>
									<td>
										<html:text property="appName" readonly="true" style="width:320px;"
											styleClass="input_text"
											value='<%=((AppForm) request
													.getAttribute("AppForm")).getFormName()%>' />
										&nbsp;
										<input type="button" class="button_small"
											name="browser" onclick="openFormList(event)"
											value="浏览" />
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
						<input type="button" value="提交" class="button_normal" onclick="submit_onclick()" />
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