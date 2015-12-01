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
		var priWorkNo = document.getElementById("priWorkNo").value;
		var priLogId = document.getElementById("priLogId").value;
		var url=path+"/om/empLoginTimeAction.do?method=modiInit&priWorkNo="+priWorkNo+"&priLogId="+priLogId+"&oper=modify";
	    var width = 550;
		var height = 250;
		var wleft=(screen.width-width)/2;
		var wtop=(screen.availHeight-height)/2-20;
		dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
		window.open(url,'markpage',dimensions);
	}
	function doDelete(path){	
		var priWorkNo = document.getElementById("priWorkNo").value;
		var priLogId = document.getElementById("priLogId").value;
		document.EAPForm.action=path+"/om/empLoginTimeAction.do?method=doDelete&priWorkNo="+priWorkNo+"&priLogId="+priLogId;
		document.EAPForm.target='list';
		document.EAPForm.submit();
	}
	function doAdd(path){
	    var url = path+ "/om/empLoginTimeAction.do?method=modiInit&oper=add";
		var width = 550;
		var height = 250;
		var wleft=(screen.width-width)/2;
		var wtop=(screen.availHeight-height)/2-20;
		dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
		window.open(url,'markpage',dimensions);
	}
</script>
</head>

<body class="mainBody" onload="init()">
<unieap:form  action="" method="post">
	<input type='hidden' name='path' value='<%=path%>'/>
	<input type="hidden" id="priWorkNo" value=""/>
	<input type="hidden" id="priLogId" value=""/>
	<div class="formButtonDIV" id="filebutton1" style="display:block"> 
	 	<button class="formButton" name="add" onclick="doAdd('<%=path%>')">新 增</button>
	 	<button class="formButton" name="modify" onclick="doModify('<%=path%>')">修 改</button>
	 	<button class="formButton" name="delete" onclick="doDelete('<%=path%>')">删 除</button>
	</div>
</unieap:form>
</body>
</html>
