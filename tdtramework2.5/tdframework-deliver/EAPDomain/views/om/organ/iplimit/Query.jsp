<%@ page contentType="text/html;charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om"%>
<%
	String path = request.getContextPath();
%>
<html>
<head>
<TITLE>登录ip维护</TITLE>
<link href="<%=path%>/common/css/td_style.css" rel=stylesheet></link>
<script language="javascript">

	function init(){
		document.getElementById("modify").disabled="true";
		document.getElementById("delete").disabled="true";
	}	
	function doModify(path){
		var priStartAdd = document.getElementById("priStartAdd").value;
		var priEndAdd = document.getElementById("priEndAdd").value;
		var url=path+"/om/ipLimitAction.do?method=modiInit&ipStartAdd="+priStartAdd+"&ipEndAdd="+priEndAdd+"&oper=modify";
	    var style="status:no;dialogWidth:600px;dialogHeight:250px";
	    window.showModalDialog(url,window,style);
	}
	function doDelete(path){	
		var ipStartAdd = document.getElementById("priStartAdd").value;
		var ipEndAdd = document.getElementById("priEndAdd").value;
		document.EAPForm.action=path+"/om/ipLimitAction.do?method=doDelete&ipStartAdd="+ipStartAdd+"&ipEndAdd="+ipEndAdd;
		document.EAPForm.target='list';
		document.EAPForm.submit();
	}
	function doAdd(path){
		var url=path+"/om/ipLimitAction.do?method=modiInit&oper=add";
	    var style="status:no;dialogWidth:600px;dialogHeight:280px";
	    window.showModalDialog(url,window,style);
	}
</script>
</head>

<body class="mainBody" onload="init()">
<unieap:form  action="" method="post">
	<input type='hidden' name='path' value='<%=path%>'/>
	<input type="hidden" id="priStartAdd" value=""/>
	<input type="hidden" id="priEndAdd" value=""/>
	<div class="formButtonDIV" id="filebutton1" style="display:block"> 
	 	<button class="formButton" name="add" onclick="doAdd('<%=path%>')">新 增</button>
	 	<button class="formButton" name="modify" onclick="doModify('<%=path%>')">修 改</button>
	 	<button class="formButton" name="delete" onclick="doDelete('<%=path%>')">删 除</button>
	</div>
</unieap:form>
</body>
</html>
