<%@ page buffer="none" isThreadSafe="true" contentType="text/html;charset=GBK" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<html>
<head>
<title>数据窗口查询条件</title>

<unieap:base/>

</head>
<body onLoad="window.dialogArguments.dwManager.getActiveDW().queryWinOnLoad(document,oneRecord);eapObjsMgr.onReady();">
<center>
<table width="100%">
<tr><td width="15"></td><td >
<div align="center" id="oneRecord">
</div></td></tr></table>
</center>
</body>
</html>