<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om" %>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<%@ page import="java.util.*"%>
<% 	
	String path = request.getContextPath();
	List logList= (List)request.getAttribute("logList");
	String queryInfo = (String)request.getAttribute("queryInfo");
%>
<html>
  <head>
  <TITLE>日志查询结果显示</TITLE>
  <!-- 禁止 windows 主题风格ss -->
	<meta http-equiv="MSThemeCompatible" content="no" />
	<!-- 禁止缓存 headers -->
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="-1" />
	<meta http-equiv="Cache-Control" content="no-cache" />
	<link href="<%=path%>/common/css/td_style.css" rel=stylesheet>
	<link href="<%=path%>/common/css/td_style_ec.css" rel=stylesheet>
	<script language=javascript src="<%=path%>/common/js/eccn.js"> </script>
	<script language="javascript">
	    var eccn=new ECCN("ec");
	    function load() {
	       eccn.doPrep=false;
		   eccn.doPrepPrev=false;
		   eccn.init();
		   <% String str=(String)request.getAttribute("message");
			   if(str!=null&&!str.equals("")){
		   %>
			    var msg = '<%=str%>';
			    alert(msg);
		   <%}%>
					
		}
		
		function doExport(){
		    var queryInfo = document.getElementById("queryInfo").value;	    	
			document.OperForm.action = '<%=path%>/om/invalidLogAction.do?method=doExport'+queryInfo;
		  	var oldAction=document.OperForm.action;	
			var oldtarget=document.OperForm.target;	
			document.OperForm.target="grid";
			document.OperForm.submit();		
			document.OperForm.action=oldAction;
			document.OperForm.target=oldtarget;	
		
	  }
		
    </script>
</head>
  
<body onload="load()">
<%if (logList != null && !logList.isEmpty()) {%>	  
	<ec:table var="log" items="logList" pageSizeList="max:100,100" 
		action="invalidLogAction.do?method=getInvalidLogInfo">
	<ec:row >	
		<ec:column property="workNo" title="操作员工号" />
		<ec:column property="time" title="停用时间" />
	</ec:row>
	</ec:table>
	<form name="OperForm" id="OperForm"  method="POST">
	
	<table width="100%" border="0" align="center">
				<tr align="right">
					<td width="50%" align="center">
						<div class="formButtonDIV" id="filebuttons" style="display:block">
							<button class="formButton" name="bExport" onClick="doExport();" title="导出XSL">导&#160;&#160;出</button>
						</div>
					</td>
				</tr>
			</table>    
	<input type="hidden" name="queryInfo" value="<%=queryInfo %>"/>
	</form>
<%}%>

</body>
</html>