<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<html>
	<head>
	</head>
	<script language="javascript">
function onload()
{
  if(parent.dialogArguments)
  {}
  else
  {
    back.innerHTML="<a href='javascript:history.go(-1)'><bean:message bundle="uniflow" key='button.back'/></a>";
  }
}
</script>
	<body bgcolor="#ffffff" onload="onload()">
		<table>
			<tr height="20" valign="middle">
				<td style="font-weight: bold;font-size:15px;color:#000000">
					<bean:message bundle="uniflow" key="workflow.common.error.title" />
				</td>
			</tr>
			<tr height="10" valign="top">
				<td style="font-size:13px;color:#000000">
					文件格式不正确,请选择正确文件并重新上传。
				</td>
			</tr>
			<tr height="20" valign="bottom">
				<td id="back" style="font-weight: bold;font-size:12px;">
				</td>
			</tr>
		</table>

	</body>
</html>