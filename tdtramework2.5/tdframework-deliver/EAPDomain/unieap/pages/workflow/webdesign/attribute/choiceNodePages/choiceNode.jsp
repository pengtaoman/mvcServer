<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String xmlStr = ((String)request.getAttribute("xmlStr"));
String id = ((String)request.getAttribute("id"));
%>


<%@page import="com.neusoft.workflow.model.Data"%>
<%@page import="com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.choiceNodeForms.ChoiceNodeForm;"%>
<html:html locale="true">
<head>

    <title>属性页</title>	
    <script type="text/javascript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
    <LINK href="<%=WorkflowManager.getWorkflowPath()%>/stylesheet/Style.css" rel=stylesheet>
    <script type="text/javascript">
    function LoadName(){ 
   		if(document.all){
    		self.resizeTo(660,300); 
    	}else{
    		self.resizeTo(660,300); 
    	} 
          var action = '<%=request.getAttribute("close_flag")%>';
          
          if(action == "close"){
        
             var xmlStr = document.choiceNodeForm.xmlStr.value;
             var id = '<%=request.getAttribute("id")%>';
             window.close();
             opener.callFlex(xmlStr , id);
          }
          
    }
    function trim(str){ 
 		return str.replace(/\s/g, "");    
	} 
	function submit_onclick(){
		if(trim(document.choiceNodeForm.name.value)==""){
		alert("名称不可以为空") ;
		document.choiceNodeForm.name.value="";
		return false;
		} 
  		document.choiceNodeForm.action.value="submit";
     	document.choiceNodeForm.submit();
	}   
  

    </script>
</head>

<body  onLoad="LoadName()"><br>
  
  <html:form action="toChoice.do" >
  <div class="main_label_outline" style="width:570px">

	
		  	<table style="width:550px" class="main_label_table">
		  		<tr>
					<td align="left" style="width: 90px">
						ID:
					</td>
					<td>
						<html:text property="id" readonly="true" style="width:400px;"
							styleClass="input_underline"
							value='<%=((ChoiceNodeForm) request
										.getAttribute("ChoiceNodeForm"))
										.getId()%>'>
						</html:text>
					</td>
				</tr>
				<tr>
					<td align="left" style="width:90px"><bean:message bundle="uniflow" key="workflow.webdesign.name"/></td>
					<td>
					<html:text property="name" style="width:400px;" styleClass="input_underline"  value='<%=((ChoiceNodeForm)request.getAttribute("ChoiceNodeForm")).getName()%>'>
					</html:text>*
					</td>
				</tr>
				<tr>
					<td valign="top"  style="width:90px"><bean:message bundle="uniflow" key="workflow.webdesign.describe"/></td>
					<td><html:textarea property="desc" style="width:400px;" rows="5" styleClass="input_text"  value='<%=((ChoiceNodeForm)request.getAttribute("ChoiceNodeForm")).getDesc()%>'/></td>
				</tr>
			</table>
			<table style="width: 550px" class="main_label_table">
				<tr>
					<td style="width: 90px">
						<bean:message bundle="uniflow" key="workflow.webdesign.extendProperty" />
					</td>
					<td >
						<html:text property="extendProperties" style="width:400px;" value='<%=((ChoiceNodeForm) request
									.getAttribute("ChoiceNodeForm")).getExtendProperties()%>'/>
					</td>
				</tr>
			</table>

	</div>
		<table style="width:570px" class="main_button">
			<tr>
				<td style="width:570px" align="right"><input type="button" value="提交" class="button_normal" onclick="submit_onclick()"/>
				<html:cancel value="取消" styleClass="button_normal" onclick="window.close()"/></td>
			</tr>
		</table>
  <html:hidden property="id" value='<%=id %>'/>
  <html:hidden property="xmlStr"  value='<%=xmlStr %>'/>
  </html:form>
  </body>
</html:html>