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
		
		function showAllText(obj){
		    if(obj.style.width=="200px" && obj.className=="ellipsis"){
		    	obj.style.width="100%";
		    	obj.className="";
		    }
			else{
				obj.style.width="200px";
				obj.className="ellipsis";
			}
		}
		
		function showInfo(logId) {
			var url = 'datalogAction.do?method=getLogInfo&logId='+logId;
			window.showModalDialog(url,'mypackage', "scroll:no;status:no;dialogWidth:500px;dialogHeight:330px");	
		}	
    </script>
</head>
  
<body onload="load()">
<%if (logList != null && !logList.isEmpty()) {%>	  
	<ec:table var="log" items="logList" pageSizeList="max:100,10,20,50,100,1000,all" 
		action="powerLogAction.do?method=getPowerLogInfo">
	<ec:row >
	    <ec:column property="logId" title="日志编号" />
		<ec:column property="areaName" title="区域名称" />
		<ec:column property="operName" title="操作类型" />		
		<ec:column property="employeeName" title="操作员名称" />
		<ec:column property="objName" title="被操作对象" />
		<ec:column property="powerId" title="菜单编号" />
		<ec:column property="powerName" title="菜单名称" />		
		<ec:column property="operateDate" title="操作时间" />
		<ec:column property="note" title="详细描述" />
	</ec:row>
	</ec:table>
	<form name="OperForm" id="OperForm"  method="POST">
	<input type="hidden" name="queryInfo" value="<%=queryInfo %>"/>
	</form>
<%}%>

</body>
</html>