<%/* JSP程序简要描述信息
**************************************************************
* 程序名		: LogQueryBottom.jsp
* 建立日期	: 2006-07-05
* 作者		: liuxue
* 模块		: 日志查询
* 描述		: 日志查询结果显示页面
* 备注		: 
* ------------------------------------------------------------
* 修改历史
* 序号		日期		修改人			修改原因
* 1   
* 2
**************************************************************
*/
%>
<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om" %>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<%@ page import="java.util.*"%>
<% 	
	String path = request.getContextPath();
	String partCity = (String)request.getAttribute("area");
	List logList= (List)request.getAttribute("LogList");
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
		   <% String str=(String)request.getAttribute("Message");
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
			//alert("showAll");
		}
		
		function showInfo(workNo,operTime) {
			var url = 'LogQueryAction.do?OperType=getLogInfo&f_work_no='+workNo+'&oper_time='+operTime+'&part_city=<%=partCity%>';
			window.showModalDialog(url,'mypackage', "scroll:no;status:no;dialogWidth:500px;dialogHeight:330px");	
		}		 	
		function doExport(){
			var queryInfo = document.getElementById("queryInfo").value;	    	
			document.OperForm.action = '<%=path%>/om/LogQueryAction.do?OperType=export'+queryInfo;
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
<%if (!logList.isEmpty()) {%>	  
	<ec:table var="log" items="LogList" pageSizeList="max:100,10,20,50,100,1000,all" 
		action="LogQueryAction.do?OperType=query">
	<ec:exportXls fileName="日志信息.xls" />
	<ec:row ondblclick="showInfo('${log.workNo}','${log.operateDate}')">
	    <ec:column property="workNo" title="职员帐号" />
		<ec:column property="operateDate" title="操作时间" />
		<ec:column property="systemName" title="系统菜单" />
		<ec:column property="menuName" title="功能菜单" />
		<ec:column property="bottomName" title="按钮" />
		<ec:column property="loginHost" title="登录ip" />
		<ec:column property="desciptionInfo" title="详细描述" style="width:200px">
			<span style="width:200px" class="ellipsis" onclick="showAllText(this)">${log.operateDesc}</span>
		</ec:column>
	</ec:row>
	</ec:table>
	<form name="OperForm" id="OperForm"  method="POST">
	<table width="100%" border="0" align="center">
		<tr align="right">
			<td width="100%" align="center">
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