<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html>
	<head>
		<title>文件上传</title>
		<uniflow:style/>
	</head>
	<body bgcolor="#FFFFFF" text="#000000" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" class="input_text">
		<br>
		<form METHOD="POST" ACTION='<%=request.getContextPath()%>/fileUploads.do?fileid=<%=request.getParameter("fileid")%>' ENCTYPE="multipart/form-data">
			<table bgcolor="#FFFFFF" width="320" border="0" cellspacing="5" cellpadding="0" align="center">
				<tr>
					<td align="left" height="26" valign="middle" style="font-size:12;font-weight:bold">上传附件
					</td>
				</tr>
				<tr>
					<td bgcolor="#EEEEEE" height="60" style="border: 1px solid #C0C0C0" valign="top">
						<div align="center">
							<center>
								<br>
								<table width="280" border="1" cellspacing="0" cellpadding="5" bordercolor="#C0C0C0" style="border-collapse: collapse">
									<tr>
										<td bgcolor="#FFFFFF">
											<table width="280" border="0" cellspacing="2" cellpadding="2">
												<tr>
													<td width="40" class="input_text">
														路径
													</td>
													<td width="240" bgcolor="#FFFFFF">
														<input id="taxfile" type="file" name="taxfilename"/>
													</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
								<br>
							</center>
						</div>
					</td>
				<tr>
					<td align="right">
						<table width="100" border="0" cellspacing="3" cellpadding="0">
						   	<uniflow:button id="ok" action="document.forms[0].submit();" name="button.ok"></uniflow:button>
  							<uniflow:button id="cancel" action="window.close()" name="button.cancel"></uniflow:button>
						</table>
					</td>
				</tr>
			</table>
		</form>
	</body>
</html>