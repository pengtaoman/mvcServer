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
<%@page import="com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.workflowResourceForms.DataForm;"%>
<html:html locale="true">
<head>
    <base href='<%=basePath%>'>
    <title>流程变量</title>	
    <script type="text/javascript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
    <LINK href="<%=WorkflowManager.getWorkflowPath()%>/stylesheet/Style.css" rel=stylesheet>
    <script type="text/javascript">
    function LoadName(){ 
   			
          var action = '<%=request.getAttribute("close_flag")%>';
          
          if(action == "close"){   
             var xmlStr = document.dataForm.xmlStr.value;
             var id = '<%=request.getAttribute("id")%>';
             window.close();
             opener.callFlex(xmlStr, id);      
          }
       checkRadio();   
    }
    function radioValue(name){
	var names = document.getElementsByName(name);
		for(i=0;i<names.length;i++){
			if(names[i].checked == true){
				return names[i].value;
			}
		}
	}
   function submit_onclick(){
    document.dataForm.dataType.value=radioValue('dateRadio');
    document.dataForm.mergeRule.value=radioValue('mergeRadio');
}   
	function displayAdd(){
		document.getElementById('superadd').disabled=false;
		
	}
	function displayCover(){
		document.getElementById('superadd').disabled=true;
		document.getElementById('cover').checked=true;
	}
	function checkRadio(){
		if(document.getElementById('radioNum').checked==true) 
		displayCover();
	}
    </script>
</head>

<body  onLoad="LoadName()"><br>
  
  <html:form action="toData.do" >
   <div class="main_label_outline" style="width:560px">
  <fieldset style="width:460px;">
		<legend>属性</legend>
		  	<table style="width:550px" class="main_label_table">
				<tr>
					<td align="left" style="width:90px">名称:</td>
					<td>
					<html:text property="name" style="width:400px;" styleClass="input_text"  value='<%=((DataForm)request.getAttribute("DataForm")).getName()%>'>
					</html:text>
					</td>
				</tr>
				<tr>
					<td valign="top"  style="width:90px">描述:</td>
					<td><html:textarea property="desc" style="width:400px;height:50px" styleClass="input_text" value='<%=((DataForm)request.getAttribute("DataForm")).getDesc()%>'/></td>
				</tr>
				<table  class="main_label_table">
				<tr>
					<td style="height:30px;width:90px">变量类型:</td>
					<td>
						<input type="radio" name="dateRadio" class="rodio"  <%="1".equals(((DataForm)request.getAttribute("DataForm")).getDataType())?"checked":""%>  value="1" onclick="displayAdd()">字符串</input>
					</td>
					<td>
						<input type="radio" name="dateRadio" class="rodio" id="radioNum"   <%="0".equals(((DataForm)request.getAttribute("DataForm")).getDataType())?"checked":""%>  value="0"  onclick="displayCover()">数字</input>
					</td>
					<td>
						<input type="radio" name="dateRadio" class="rodio" id="radioXml"   <%="10".equals(((DataForm)request.getAttribute("DataForm")).getDataType())?"checked":""%>  value="10"  onclick="displayAdd()">XML</input>
					</td>
				</tr>
				<tr>
					<td style="height:30px;width:90px">合并方式:</td>
					<td style="width:50px"> 
						<input type="radio" name="mergeRadio" class="rodio" <%="1".equals(((DataForm)request.getAttribute("DataForm")).getMergeRule())?"checked":""%>  id="superadd" value="1" >追加</input>
					</td>
					<td style="width:50px">	
						<input type="radio" name="mergeRadio" class="rodio" <%="0".equals(((DataForm)request.getAttribute("DataForm")).getMergeRule())?"checked":""%>    id="cover" value="0">覆盖</input>
					</td>
				</tr>
				</table>
				<table style="width:550px" class="main_label_table">
				<tr>
					<td align="left" style="width:90px">缺省值:</td>
					<td>
					<html:text property="defaultValue" style="width:400px;" styleClass="input_text"  value='<%=((DataForm)request.getAttribute("DataForm")).getDefaultValue()%>'>
					</html:text>
					</td>
				</tr>
				<tr>
					<td align="left" style="width:90px">处理类:</td>
					<td>
					<html:text property="handleClass" style="width:400px;" styleClass="input_text"  value='<%=((DataForm)request.getAttribute("DataForm")).getHandleClass()%>'>
					</html:text>
					</td>
				</tr>
			</table>
			</fieldset>
	</table>	
		<table style="560px" class="main_button">
			<tr>
				<td style="width:560px" align="right"><html:submit value="提交" styleClass="button_normal" onclick="submit_onclick()"/>
				<input type="button" value="取消" Class="button_normal" onclick="window.close()"/></td>
			</tr>
		</table>

	<html:hidden  property="dataType"  value='<%=((DataForm)request.getAttribute("DataForm")).getDataType()%>'/> 	 	

	<html:hidden  property="mergeRule"  value='<%=((DataForm)request.getAttribute("DataForm")).getMergeRule()%>'/> 	 	
  		
  <html:hidden property="id" value='<%=id %>'/>
  <html:hidden property="xmlStr"  value='<%=xmlStr %>'/>
 </html:form>
  </body>
</html:html>