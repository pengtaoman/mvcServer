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
  <TITLE>��־��ѯ�����ʾ</TITLE>
  <!-- ��ֹ windows ������ss -->
	<meta http-equiv="MSThemeCompatible" content="no" />
	<!-- ��ֹ���� headers -->
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
	    <ec:column property="logId" title="��־���" />
		<ec:column property="areaName" title="��������" />
		<ec:column property="operName" title="��������" />		
		<ec:column property="employeeName" title="����Ա����" />
		<ec:column property="objName" title="����������" />
		<ec:column property="powerId" title="�˵����" />
		<ec:column property="powerName" title="�˵�����" />		
		<ec:column property="operateDate" title="����ʱ��" />
		<ec:column property="note" title="��ϸ����" />
	</ec:row>
	</ec:table>
	<form name="OperForm" id="OperForm"  method="POST">
	<input type="hidden" name="queryInfo" value="<%=queryInfo %>"/>
	</form>
<%}%>

</body>
</html>