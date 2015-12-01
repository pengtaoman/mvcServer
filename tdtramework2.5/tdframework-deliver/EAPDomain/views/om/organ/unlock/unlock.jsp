<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String message = (String) request.getAttribute("message") == null ? ""
			: (String) request.getAttribute("message");
	String workno = (String) request.getAttribute("workno") == null ? ""
			: (String) request.getAttribute("workno");
	String lockFlag = (String) request.getAttribute("lockFlag");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<html>
	<head>
		<base href="<%=basePath%>">
		<title>My JSP 'unlock.jsp' starting page</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<link href="<%=basePath%>/common/css/td_style.css" rel=stylesheet
			type="text/css">
	</head>
	<body class="mainBody" onload="init();">
		<script type="text/javascript">
//初始化页面方法
function init(){
	var message = document.getElementById("message").value;
	var workno = document.getElementById("workno").value;
	var lockflag = document.getElementById("lockFlag").value;
	document.getElementById('unlockno').focus();
	if(message != null && message != ""){
		alert(message);
		return false;
	}
	document.getElementById("unlockno").value = workno;
	if(lockflag == "0"){
		document.getElementById('unlockno').disabled = true;
		document.getElementById('hintMessage').innerHTML = "<font color = 'red' size = '6'>输入的员工号没有被锁定！</font>";
		document.getElementById('backToQuery').style.display = '';
		document.getElementById('query').disabled = "true";
	}else if(lockflag == "1"){
		document.getElementById('unlockno').readonly = 'true';
		document.getElementById('hintMessage').innerHTML = "<font color ='red' size = '6'>点击帐号解锁为帐号解锁！</font>"
		document.getElementById('backToQuery').style.display = '';
		document.getElementById('query').disabled = "true";
		document.getElementById('unlock').disabled = false;
	}
}
//点击  返回查询时  重新开始查询
function doBack(){
	document.getElementById('query').disabled = false;
	document.getElementById('unlock').disabled = "true";
	document.getElementById('backToQuery').style.display = 'none';
	document.getElementById('unlockno').disabled = false;
	document.getElementById("unlockno").value = "";
	document.getElementById('unlockno').focus();
	document.getElementById('hintMessage').innerHTML = "";
}
//出去输入内容中的空格
function trim(strValue)
{	
  var myRegExp = / /gi;
  strValue = strValue.replace(myRegExp, "");
  return strValue;

}
//查看帐号是否已被锁
function doQuery(){
	var workno = trim(document.getElementById('unlockno').value);
	if(workno == null || workno == ""){
		alert("员工登陆帐号不能为空，请准确填写员工号！");
		document.getElementById('unlockno').value = workno;
		document.getElementById('unlockno').focus();
		return false;
	}else{
		thisform.action = "<%=path%>/unlock.do?method=query";
		thisform.submit();
	}
}
//解锁帐号
function doDel(){
	thisform.action = "<%=path%>/unlock.do?method=delLockStatus";
	thisform.submit();
}
</script>
		<form action="#" method="post" name="thisform">
			<input type="hidden" id="message" name="message"
				value="<%=message%>" />
			<input type="hidden" id="workno" name="workno" value="<%=workno%>" />
			<input type="hidden" id="lockFlag" name="lockFlag"
				value="<%=lockFlag%>" />
			<table cellspacing="0" border="0" width="100%" cellpadding="0"
				class="formTable">
				<tr class="tableTitleTR2">
					<td colspan="2">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">
									&#160;
								</td>
								<td class="tableTitle2">
									员工帐号解锁配置
								</td>
								<td class="tableTitleRight2">
									&#160;
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td class="formField" width= "50%">
						员工登陆帐号:
						<input type="text" name="unlockno" id="unlockno" />
					</td>
					<td  width="50%">
						<div>
							<button class="formButton" onclick="doQuery();" id="query">
								查询
							</button>
							<button class="formButton" onclick="doDel();" id="unlock"
								disabled="true">
								帐号解锁
							</button>
							<button class="formButton" onclick="doBack()" id="backToQuery"
								style="display:none; ">
								返回查询
							</button>
						</div>
					</td>
				</tr>
				<tr>
					<td colspan="2" align="center" id="hintMessage">
					</td>
				</tr>
			</table>
		</form>
	</body>

</html>
