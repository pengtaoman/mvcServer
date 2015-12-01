<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>流程定义</title>
<LINK href="<%=WorkflowManager.getWorkflowPath()%>/stylesheet/Style.css" rel=stylesheet>
</head>
<body style="background:#EBEBEB">
<table class="main_label_table">
<tr>
<td align="left"><font color=red size="4"><b>操作提示</b></font></td>
</tr>
<br>
<tr>
<td align="left">1.双击节点，可修改节点属性。</td>
</tr>
<tr>
<td align="left">2.双击空白区，可修改流程属性。</td>
</tr>
<tr>
<td align="left">3.双击传输线，可修改传输线属性。</td>
</tr>
<tr>
<td align="left">4.单击【选择】按钮，可恢复鼠标选择状态。</td>
</tr>
<tr>
<td align="left">5.单击【增加节点】，鼠标悬停在传输线上且变色时，</td>
</tr>
<tr>
<td align="left">&nbsp;&nbsp;&nbsp;单击鼠标即可增加节点。</td>
</tr>
<tr>
<td align="left">6.单击【传输线】，鼠标会变化为"插头"状，</td>
</tr>
<tr>
<td align="left">&nbsp;&nbsp;&nbsp;在节点间拖拽鼠标，即可增加传输线。</td>
</tr>
<tr>
<td align="left">9.选择节点或传输线，单击工具栏上的删除</td>
</tr>
<tr>
<td align="left">&nbsp;&nbsp;&nbsp;即可实现节点或传输线的删除。</td>
</tr>
<br/>
</table>

</body>
</html>