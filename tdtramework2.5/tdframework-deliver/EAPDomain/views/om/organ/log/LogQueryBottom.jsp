<%/* JSP�����Ҫ������Ϣ
**************************************************************
* ������		: LogQueryBottom.jsp
* ��������	: 2006-07-05
* ����		: liuxue
* ģ��		: ��־��ѯ
* ����		: ��־��ѯ�����ʾҳ��
* ��ע		: 
* ------------------------------------------------------------
* �޸���ʷ
* ���		����		�޸���			�޸�ԭ��
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
	<ec:exportXls fileName="��־��Ϣ.xls" />
	<ec:row ondblclick="showInfo('${log.workNo}','${log.operateDate}')">
	    <ec:column property="workNo" title="ְԱ�ʺ�" />
		<ec:column property="operateDate" title="����ʱ��" />
		<ec:column property="systemName" title="ϵͳ�˵�" />
		<ec:column property="menuName" title="���ܲ˵�" />
		<ec:column property="bottomName" title="��ť" />
		<ec:column property="loginHost" title="��¼ip" />
		<ec:column property="desciptionInfo" title="��ϸ����" style="width:200px">
			<span style="width:200px" class="ellipsis" onclick="showAllText(this)">${log.operateDesc}</span>
		</ec:column>
	</ec:row>
	</ec:table>
	<form name="OperForm" id="OperForm"  method="POST">
	<table width="100%" border="0" align="center">
		<tr align="right">
			<td width="100%" align="center">
				<div class="formButtonDIV" id="filebuttons" style="display:block">
					<button class="formButton" name="bExport" onClick="doExport();" title="����XSL">��&#160;&#160;��</button>
				</div>
			</td>
		</tr>
	</table> 
	<input type="hidden" name="queryInfo" value="<%=queryInfo %>"/>
	</form>
<%}%>
</body>
</html>