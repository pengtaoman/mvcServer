<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>

<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>

<html:html locale="true">
<head>
<uniflow:style />
<script language="javascript">
function ok_onclick(){
	var length=0;
	var allfalg=false;
	var procreatorcheck=document.forms[0].proCreator;
	var manactorcheck=document.forms[0].manactor;
	var varcheck=document.forms[0].varpartis;
	
	length=procreatorcheck.length;
	for(var i=0;i<length;i++){
		if(procreatorcheck[i].checked){
			allfalg=true;
			break;
		}
	}
	if(manactorcheck!=null){
		length=manactorcheck.length;
		for(var i=0;i<length;i++){
			if(manactorcheck[i].checked){
				allfalg=true;
				break;
			}
	}
	}
	if(varcheck!=null){
		length=varcheck.length;
		for(var i=0;i<length;i++){
			if(varcheck[i].checked){
				allfalg=true;
				break;
			}
	}
	}
	
	var roleopts=document.forms[0].roleActparti.options;
	var personopts=document.forms[0].personActParti.options;
	var roleoptslength=roleopts.length;
	var personoptslength=personopts.length;
	for(var i=0;i<roleoptslength;i++){
			roleopts[i].selected=true;
	}
	for(var j=0;j<personoptslength;j++){
			personopts[j].selected=true;
	}
	if(roleoptslength>0||personoptslength>0){
		allfalg=true;
	}
	if(!allfalg){
		alert("<%=MessageUtil.getString("workflow.alt.participant.null",request.getSession())%>")
	}else{
		document.forms[0].action.value="update";
		document.forms[0].submit();
	}
}
function tab_onclick(){
	location.href="<%=request.getContextPath()%>/setcsActparti.do?activityid="+document.forms[0].actPartiId.value;
}
function addSelect(){
var selectId=document.frames["actsel"].getSelectedID();
var falg=true;
if(selectId==""){
	alert("<%=MessageUtil.getString("workflow.workitem.operation.adhoc.choice.checked",request.getSession())%>");
}
var parName=document.frames["actsel"].getSelectedName();
var parType=document.frames["actsel"].getSelectedType();
var parId=document.frames["actsel"].getSelectedID();
if(parType==1){
	var opts=document.forms[0].roleActparti.options;
	var length=opts.length;
	var falg=false;
	for(var i=0;i<length;i++){
		if(opts[i].value==parId){
			falg=true;
			break;
		}
	}
	if(!falg){
		opts[length]=new Option(parName,parId);
		falg=true;
	}else{
		alert("<%=MessageUtil.getString("workflow.workitem.operation.adhoc.choice.checked1",request.getSession())%>");
	}
}else if(parType==0){
	var opts=document.forms[0].personActParti.options;
	var length=opts.length;
	var falg=false;
	for(var i=0;i<length;i++){
		if(opts[i].value==parId){
			falg=true;
			break;
		}
	}
	if(!falg){
		opts[length]=new Option(parName,parId);
	}else{
	 	alert("<%=MessageUtil.getString("workflow.workitem.operation.reassign.choice.checked1",request.getSession())%>");
	}
}
}

function delSelect(){
	var roleopts=document.forms[0].roleActparti.options;
	var rolelength=roleopts.length;
	var personopts=document.forms[0].personActParti.options;
	var personlength=personopts.length;
	for(var i=0;i<rolelength;i++){
		var select=roleopts[i].selected;
		if(select){
			roleopts[i]=null;
			rolelength--;
			i--;
		}
	}
	for(var j=0;j<personlength;j++){
		var select=personopts[j].selected;
		if(select){
			personopts[j]=null;
			personlength--;
			j--;
		}
	}
}
</script>
</head>

<body style="background-color:#EEEEEE;margin-left:20px;margin-top: 0px;margin-right:0px;margin-bottom: 0px;scrollbar-face-color: #D8E2E7;
scrollbar-shadow-color: #EEEEEE; scrollbar-highlight-color: #EEEEEE;scrollbar-3dlight-color: #EEEEEE;
scrollbar-darkshadow-color: #EEEEEE;scrollbar-track-color: #EEEEEE;scrollbar-arrow-color: #606D79;">
<uniflow:m_form action="setActparti.do">
<table width="440"  border="0" cellpadding="0" cellspacing="0" >
 <tr><td height="30" valign="middle" align="left" style="font-size:12;font-weight:bold">
	<logic:present name="setActPartiForm" property="name">
		<bean:write name="setActPartiForm" property="name"/>
	</logic:present>
 </td></tr>
 <tr>
 	<td>
 		<uniflow:tab>
 			<uniflow:tabElement selected="true" messageKey="workflow.participant.zhusong" action="javascript:tab_onclick()"></uniflow:tabElement>
 			<uniflow:tabElement selected="false" messageKey="workflow.participant.chaosong" action="javascript:tab_onclick()"></uniflow:tabElement>
 		</uniflow:tab>
 	</td>
 </tr>
 <tr><td><table border="0" cellpadding="0" width="440" cellspacing="0" bgcolor="#DDDDDD">
     <tr><td height="30" valign="middle">
	 <table width="440" cellspacing="0" border="0">
		<tr><td class="input_text">
			<html:multibox property="proCreator" value="1" />
			流程创建者
		</td>
		<td class="input_text">
			<html:multibox property="proCreator" value="2" />
			流程创建者上级
		</td>
		<td class="input_text">
		    <html:multibox property="proCreator" value="3" />
			前一节点
		</td>
		<td class="input_text">
			<html:multibox property="proCreator" value="4" />
			前一节点上级
		</td></tr>
	 </table>
	 </td></tr>
	 <tr><td height="180">
		<table width="440" height="180" border="0" cellspacing="0">
		   <tr><td height="180"><table  border="0" cellspacing="0">
		   		<tr><td height="30" align="left" valign="middle" width="220" style="font-size:12;font-weight:bold">
					节点
				</td></tr>
				<tr><td valign="middle"><div style="width:220;height:150;overflow:auto;background-color:#EEEEEE" id="actinsts">
					<table bgcolor="#EEEEEE">
					<logic:present name="setActPartiForm" property="actDefList">
						<logic:iterate id="manual" name="setActPartiForm" property="actDefList" type="com.neusoft.uniflow.web.participant.beans.ActDefbean">
							<tr><td class="input_text" nowrap="nowrap">
								<html:multibox property="manactor">
									<bean:write name="manual" property="id"/>
								</html:multibox>
								<img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/process_img/manual.png" width="16" height="16" border="0"/>
								<bean:write name="manual" property="name"/>
							</td></tr>
						</logic:iterate>
					</logic:present>
					<tr><td bgcolor="#EEEEEE">&nbsp;</td></tr>
					</table></div>
				</td></tr>
		   </table></td>
		   <td height="180"><table  border="0" cellspacing="0">
			    <tr><td height="30" align="left" valign="middle" width="220" style="font-size:12;font-weight:bold">
				    变量
				</td></tr>
				<tr><td valign="middle"><div style="width:220;height:150;overflow:auto;background-color:#EEEEEE" id="vars">
					<table bgcolor="#EEEEEE">
						<logic:present name="setActPartiForm" property="varPartisList">
							<logic:iterate id="varlist" name="setActPartiForm" property="varPartisList"type="com.neusoft.uniflow.web.participant.beans.VarPartiBean">
								<tr><td class="input_text">
									<html:multibox property="varpartis">
										<bean:write name="varlist" property="id"/>
									</html:multibox>
									<img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/process_img/variable.gif" width="16" height="16" border="0"/>
									<bean:write name="varlist" property="name"/>	
								</td></tr>
							</logic:iterate>
						</logic:present>
						<tr><td bgcolor="#EEEEEE">&nbsp;</td></tr>
					</table></div>
				</td></tr>
		   </table></td>
		   </tr>
		 </table>
	  </td></tr>	  	  
	  <tr><td height="260">
		<table width="440" height="260" border="0" cellspacing="0">
		   <tr><td height="260"><table  border="0" cellspacing="0">
		   		<tr><td height="30" align="left" valign="middle" width="200" style="font-size:12;font-weight:bold">
					组织机构
				</td></tr>
				<tr><td width="200" align="right" height="240">
					<iframe id="actsel" src="oneactorsel.do?selType=2" width="195" height="240" scrolling="yes" frameboder="0"></iframe>
				</td></tr>
		   </table></td>
		   <td><table  border="0" cellspacing="0">
		   		<tr><td align="center" width="40">
					<a href="javascript:addSelect()"><img name="add" src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/main_img/add.gif" alt="增加"width="16" height="16" border="0"></a>
				</td></tr>
				<tr><td align="center" width="40">
					<a href="javascript:delSelect()"><img name="del" src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/main_img/delete.gif"alt="删除" width="16" height="16" border="0"></a>
				</td></tr>
		   </table></td>
		   <td height="260" width="200" ><table  border="0" cellspacing="0">
			    <tr><td height="30" align="left" valign="middle" width="200" style="font-size:12;font-weight:bold">
				    角色
				</td></tr>
				<tr><td valign="middle">
					<table bgcolor="#DDDDDD">
					<tr><td class="input_text">
						<html:select name="setActPartiForm" property="roleActparti" size="7" multiple="true" style="font-family: Verdana, Arial, '宋体';font-size: 12px; color: #000000;width:200">
							<html:options collection="rolelist" property="value"labelProperty="label" />
						</html:select>
					</td></tr>
					</table>
				</td></tr>
				<tr><td height="24" align="left" valign="middle" width="200" style="font-size:12;font-weight:bold">
				    人员
				</td></tr>
				<tr><td valign="middle">
					<table bgcolor="#DDDDDD">
					<tr><td class="input_text">
						<html:select name="setActPartiForm" property="personActParti" size="7" multiple="true" style="font-family: Verdana, Arial, '宋体';font-size: 12px; color: #000000;width:200">
							<html:options collection="personlist" property="value"labelProperty="label" />
						</html:select>
					</td></tr>
					</table>
				</td></tr>
		   </table></td>
		   </tr>
		 </table>
	  </td></tr>	
</table>
</td></tr> 

<tr bgcolor="#EEEEEE"><td height="50" valign="middle"align="right">
<uniflow:m_button_table>
	<uniflow:button id="ok" name="button.ok"action="javascript:ok_onclick()"></uniflow:button>
</uniflow:m_button_table>
</td></tr>

</table>

<html:hidden property="actPartiId" />
<html:hidden property="action" />
<html:hidden property="sendType" />
</uniflow:m_form>
</body>
</html:html>