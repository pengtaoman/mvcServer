<%@ page buffer="none" isThreadSafe="true" contentType="text/html;charset=GBK" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<html>
<head>
<title>数据窗口操作</title>
<script language="JavaScript">
  //得到父窗体对象，以便其调用父窗体中的方法
  function getWindow(){
     return window.dialogArguments;
  } 
</script>
<unieap:base/>
</head>
<body onLoad="window.dialogArguments.dwManager.getActiveDW().popWinOnLoad(document,oneRecord);eapObjsMgr.onReady();">
<center>
<table width="100%">
<tr><td width="15"></td><td >
<div id="oneRecord">
</div>
</td></tr></table>
</center>
</body>
</html>
