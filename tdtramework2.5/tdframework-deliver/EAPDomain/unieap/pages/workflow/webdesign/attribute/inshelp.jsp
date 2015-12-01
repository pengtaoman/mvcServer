<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>基于流程实例的流程定义</title>
<LINK href="<%=WorkflowManager.getWorkflowPath()%>/stylesheet/Style.css" rel=stylesheet>
</head>
<body style="background:#EBEBEB">
<table class="main_label_table">
<tr>
<td align="left"><font color=red size="4"><b>操作提示</b></td>
</tr>
<br>

<tr>
<td align="left" valign="top" ><hr width='30' size='10' noshade color='#C6EDC3'></td>
<td align="left" >代表完成</td>
</tr>
<tr>
<td align="left" valign="top" ><hr width='30' size='10' noshade color='#84A9BF'></td>
<td align="left">代表运行</td><td>&nbsp;&nbsp;</td><td>&nbsp;&nbsp;</td>
</tr>
<tr>
<td align="left" valign="top" ><hr width='30' size='10' noshade color='#FFFFFF'></td>
<td align="left">代表未流转</td>
</tr>
<tr>
<td align="left" valign="top" ><hr width='30' size='10' noshade color='#D1D1D1'></td>
<td align="left">代表废弃</td>
</tr>
</table>
</body>
</html>