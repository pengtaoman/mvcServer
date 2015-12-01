<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<contextPath value="<%=path%>"/>
		<script type="text/javascript">
		</script>
		
	</head>
<body class="unieap">
<div dojoType="unieap.layout.TitlePane" title="文本域" style="width:420;margin-bottom:3px;'">
    <form id='form02' jsId="form02" dojoType="unieap.form.Form" style="margin:0px;">	
        <table style="table-layout:fixed;font-size:12px;height:68px;">
            <tr>
				<td width="150">文本输入域：</td>
				<td width="240"><div dojoType="unieap.form.Textarea" width="230"></div></td>
				<td width="150"></td>
  				<td width="240"></td>
			</tr>
			<tr>
				<td width="150">必填文本域：</td>
				<td width="240"><div dojoType="unieap.form.Textarea" width="230" required="true"></div></td>
				<td width="150">只读文本域：</td>
				<td width="240"><div dojoType="unieap.form.Textarea" width="230" readOnly="true" value="aaaaaAAAAAA"></div></td>
			</tr>
			<tr>
				<td width="150">Disabled文本域：</td>
				<td width="240"><div dojoType="unieap.form.Textarea" width="230" Disabled="true"></div></td>
				<td width="150"></td>
				<td width="240"></td>
			</tr>
        </table>
    </form>
</div>
</body>
</html>	
	